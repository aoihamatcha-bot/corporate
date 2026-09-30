import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const [stage, expectedBuild, builtSource] = process.argv.slice(2);
if (!['before', 'final'].includes(stage) || !expectedBuild || !/^[a-f0-9]{40}$/.test(builtSource ?? '')) throw new Error('Usage: before|final BUILD_ID BUILT_SOURCE_SHA');
const output = `docs/evidence/text-entrance-20260930/${stage}`;
await fs.mkdir(output, { recursive: true });
if (await fs.stat(`${output}/record.json`).catch(() => null)) throw new Error('Evidence exists; do not overwrite');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function runtime() {
  const buildId = (await fs.readFile('.next/BUILD_ID', 'utf8')).trim();
  if (buildId !== expectedBuild) throw new Error(`Unexpected build ${buildId}`);
  async function walk(directory) {
    const result = [];
    for (const item of await fs.readdir(directory, { withFileTypes: true })) {
      const file = path.posix.join(directory, item.name);
      result.push(...item.isDirectory() ? await walk(file) : [file]);
    }
    return result;
  }
  const digest = createHash('sha256');
  for (const file of [...await walk('.next/static'), ...await walk('.next/server'), '.next/BUILD_ID'].sort()) digest.update(file + '\0').update(await fs.readFile(file)).update('\0');
  return { buildId, sha256: digest.digest('hex'), scope: 'Sorted .next/static, .next/server, BUILD_ID paths + NUL + bytes + NUL' };
}
if (stage === 'final' && (git('rev-parse', 'HEAD') !== builtSource || git('diff', '--name-only', '--', 'app', 'components', 'styles', 'content', 'public'))) throw new Error('Final source is not frozen');
const report = { stage, builtSource, startedAt: new Date().toISOString(), gitHead: git('rev-parse', 'HEAD'), sourceChanges: git('diff', '--name-only'), runtimeBefore: await runtime(), conditions: 'LOCAL Chromium, normal motion, 1440x1000 / 390x844, scale1. Entry PNGs seek only decorative band/color effects; settled Hero is natural. Videos use natural timing without overrides. No performance claim.', screenshots: [], videos: [], errors: [], servedFiles: {} };
const browser = await chromium.launch();
const responses = [];
function listen(page) {
  page.on('pageerror', (error) => report.errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') report.errors.push(message.text()); });
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.pathname.startsWith('/_next/static/') && /\.(js|css)$/.test(url.pathname)) responses.push((async () => {
      const bytes = await response.body();
      const file = '.next/' + url.pathname.slice('/_next/'.length);
      const matches = hash(bytes) === hash(await fs.readFile(file));
      report.servedFiles[url.pathname] = { sha256: hash(bytes), matches };
      if (!matches) throw new Error(`Served runtime mismatch ${file}`);
    })());
  });
}
async function finished(page, selector) {
  await page.locator(selector).evaluate(async (el) => {
    await Promise.all(el.getAnimations({ subtree: true }).filter((a) => Number.isFinite(Number(a.effect?.getComputedTiming().endTime))).map((a) => a.finished.catch(() => {})));
  });
}
async function entry(page, selector) {
  return page.locator(selector).evaluate((el) => {
    const bands = [...el.querySelectorAll('.reveal-band-soft, .menu-ink-band')];
    for (const band of bands) for (const animation of band.getAnimations()) {
      const timing = animation.effect.getTiming();
      animation.pause(); animation.currentTime = Number(timing.delay) + Number(timing.duration) * .45;
    }
    for (const color of el.querySelectorAll('.reveal-color, .menu-ink-color')) for (const animation of color.getAnimations()) {
      const effect = animation.effect, timing = effect.getTiming(), frames = effect.getKeyframes();
      animation.pause();
      animation.currentTime = animation.animationName === 'ink-color-fade' ? 0 : Number(timing.delay) + Number(timing.duration) * (frames.length > 2 ? (frames[1].computedOffset + frames[2].computedOffset) / 2 : 1);
    }
    return { bandCount: bands.length, bands: bands.map((band) => ({ opacity: getComputedStyle(band).opacity, gradient: getComputedStyle(band).backgroundImage })), sources: [...el.querySelectorAll('.reveal-source, .menu-ink-base')].map((source) => ({ text: source.textContent, opacity: getComputedStyle(source).opacity, color: getComputedStyle(source).color, clip: getComputedStyle(source).clipPath })) };
  });
}
for (const width of [1440, 390]) {
  const viewport = { width, height: width === 390 ? 844 : 1000 };
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
  const page = await context.newPage(); listen(page);
  for (const locale of ['ja', 'en']) {
    const prefix = locale === 'ja' ? '' : '/en';
    await page.goto(`http://127.0.0.1:3017${prefix}/about`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.page-description .reveal-text').waitFor();
    await page.waitForFunction(() => document.querySelector('.page-description .reveal-text')?.getAttribute('data-reveal-state') === 'running');
    const state = await entry(page, '.page-description');
    const filename = `${locale}-${width}-body-entry-diagnostic.png`;
    await page.screenshot({ path: `${output}/${filename}` });
    report.screenshots.push({ filename, state });
  }
  await page.goto('http://127.0.0.1:3017/about');
  await page.getByRole('button', { name: 'メニューを開く' }).click();
  const state = await entry(page, '.fullscreen-nav');
  const filename = `ja-${width}-menu-entry-diagnostic.png`;
  await page.screenshot({ path: `${output}/${filename}` }); report.screenshots.push({ filename, state });
  await page.keyboard.press('Escape');
  await page.goto('http://127.0.0.1:3017/');
  await page.waitForFunction(() => document.documentElement.dataset.intro === 'done');
  await finished(page, '.hero');
  const heroFile = `ja-${width}-hero-settled.png`;
  await page.screenshot({ path: `${output}/${heroFile}` }); report.screenshots.push({ filename: heroFile });
  if (stage === 'final') {
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    const state = await entry(page, '.site-footer');
    const filename = `ja-${width}-footer-entry-diagnostic.png`;
    await page.screenshot({ path: `${output}/${filename}` }); report.screenshots.push({ filename, state });
  }
  await context.close();
  if (stage === 'final') {
    const videoContext = await browser.newContext({ viewport, reducedMotion: 'no-preference', recordVideo: { dir: `${output}/.recordings`, size: viewport } });
    const videoPage = await videoContext.newPage(); listen(videoPage);
    await videoPage.goto('http://127.0.0.1:3017/about');
    await videoPage.waitForFunction(() => document.querySelector('.page-description .reveal-text')?.getAttribute('data-reveal-state') === 'running');
    await finished(videoPage, '.page-intro');
    await videoPage.getByRole('button', { name: 'メニューを開く' }).click();
    await finished(videoPage, '.fullscreen-nav');
    await videoPage.keyboard.press('Escape');
    await videoPage.getByRole('dialog').waitFor({ state: 'hidden' });
    const video = videoPage.video(); await videoContext.close();
    const filename = `ja-${width}-body-menu-natural.webm`;
    await video.saveAs(`${output}/${filename}`); report.videos.push({ filename });
  }
}
await Promise.all(responses); await browser.close();
report.runtimeAfter = await runtime();
if (report.runtimeAfter.sha256 !== report.runtimeBefore.sha256) throw new Error('Runtime drift');
report.finishedAt = new Date().toISOString();
await fs.writeFile(`${output}/record.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ screenshots: report.screenshots.length, videos: report.videos.length, errors: report.errors, runtime: report.runtimeAfter, served: Object.keys(report.servedFiles).length }));
