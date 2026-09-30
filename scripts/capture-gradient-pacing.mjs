import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const [stage, expectedBuild, builtSource] = process.argv.slice(2);
if (!['before', 'candidate', 'final'].includes(stage) || !expectedBuild || !/^[a-f0-9]{40}$/.test(builtSource ?? '')) throw new Error('Usage: before|candidate|final BUILD_ID BUILT_SOURCE_SHA');
const output = `docs/evidence/gradient-pacing-20260930/${stage}`;
await fs.mkdir(output, { recursive: true });
if (await fs.stat(`${output}/record.json`).catch(() => null)) throw new Error('Preserve existing evidence');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function runtime() {
  const buildId = (await fs.readFile('.next/BUILD_ID', 'utf8')).trim();
  if (buildId !== expectedBuild) throw new Error(`Wrong build: ${buildId}`);
  async function walk(directory) {
    const files = [];
    for (const item of await fs.readdir(directory, { withFileTypes: true })) {
      const file = path.posix.join(directory, item.name);
      files.push(...item.isDirectory() ? await walk(file) : [file]);
    }
    return files;
  }
  const digest = createHash('sha256');
  for (const file of [...await walk('.next/static'), ...await walk('.next/server'), '.next/BUILD_ID'].sort()) digest.update(file + '\0').update(await fs.readFile(file)).update('\0');
  return { buildId, sha256: digest.digest('hex'), scope: 'Sorted .next/static, .next/server, BUILD_ID paths + NUL + bytes + NUL' };
}
if (stage !== 'before' && (git('rev-parse', 'HEAD') !== builtSource || git('diff', '--name-only', '--', 'app', 'components', 'styles', 'content', 'public'))) throw new Error('Source must be frozen');
const report = { stage, builtSource, gitHead: git('rev-parse', 'HEAD'), startedAt: new Date().toISOString(), runtimeBefore: await runtime(), conditions: 'LOCAL Chromium, JA 1440x1000 / 390x844. Natural timing, no seek, pause or playback overrides. requestAnimationFrame samples paint; this is not a performance benchmark. PNGs taken during natural motion may span adjacent frames.', captures: [], errors: [], servedFiles: {} };
if (stage === 'before') {
  const previous = JSON.parse(await fs.readFile('docs/evidence/text-entrance-20260930/source-binding.json', 'utf8'));
  if (previous.productionSource !== builtSource || previous.runtimeSha256 !== report.runtimeBefore.sha256) throw new Error('Baseline runtime does not match its prior binding');
}
const browser = await chromium.launch();
const responses = [];
for (const width of [1440, 390]) {
  const viewport = { width, height: width === 390 ? 844 : 1000 };
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference', recordVideo: { dir: `${output}/.recordings`, size: viewport } });
  await context.addInitScript(() => {
    window.__pacing = { samples: [], done: false };
    let start;
    const sample = () => {
      const root = document.querySelector('.page-description [data-motion-kind="body"]');
      if (root?.getAttribute('data-reveal-state') === 'running') {
        start ??= performance.now();
        const band = Math.max(0, ...[...root.querySelectorAll('.reveal-band')].map(el => Number(getComputedStyle(el).opacity)));
        const color = Number(getComputedStyle(root.querySelector('.reveal-color')).opacity);
        window.__pacing.samples.push({ ms: performance.now() - start, band, color });
      }
      if (root?.getAttribute('data-reveal-state') === 'settled' && start !== undefined) { window.__pacing.done = true; return; }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('response', response => {
    const url = new URL(response.url());
    if (url.pathname.startsWith('/_next/static/') && /\.(js|css)$/.test(url.pathname)) responses.push((async () => {
      const bytes = await response.body();
      const file = '.next/' + url.pathname.slice('/_next/'.length);
      const matches = hash(bytes) === hash(await fs.readFile(file));
      report.servedFiles[url.pathname] = { sha256: hash(bytes), matches };
      if (!matches) throw new Error(`Runtime mismatch: ${file}`);
    })());
  });
  await page.goto('http://127.0.0.1:3017/about', { waitUntil: 'domcontentloaded' });
  const threshold = stage === 'before' ? 0.4 : 0.84;
  await page.waitForFunction(t => window.__pacing.samples.some(s => s.band > t), threshold);
  await page.screenshot({ path: `${output}/ja-${width}-body-natural.png` });
  await page.waitForFunction(() => window.__pacing.done);
  const pacing = await page.evaluate(() => window.__pacing);
  const durationAbove = (key, value) => {
    const samples = pacing.samples.filter(s => s[key] > value);
    return samples.length ? samples.at(-1).ms - samples[0].ms : 0;
  };
  await page.screenshot({ path: `${output}/ja-${width}-body-settled.png` });
  await page.getByRole('button', { name: 'メニューを開く' }).click();
  await page.waitForFunction(t => [...document.querySelectorAll('.menu-ink-band')].some(el => Number(getComputedStyle(el).opacity) > t), threshold);
  await page.screenshot({ path: `${output}/ja-${width}-menu-natural.png` });
  await page.locator('.fullscreen-nav').evaluate(async el => {
    await Promise.all(el.getAnimations({ subtree: true }).filter(a => Number.isFinite(Number(a.effect?.getComputedTiming().endTime))).map(a => a.finished.catch(() => {})));
  });
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  const video = page.video();
  await context.close();
  const filename = `ja-${width}-body-menu-natural.webm`;
  await video.saveAs(`${output}/${filename}`);
  report.captures.push({ width, filename, visibleBandAbove45Ms: durationAbove('band', .45), fullBandAbove80Ms: durationAbove('band', .8), colorAbove95Ms: durationAbove('color', .95), pacing });
}
await Promise.all(responses);
await browser.close();
report.runtimeAfter = await runtime();
if (report.runtimeBefore.sha256 !== report.runtimeAfter.sha256) throw new Error('Runtime drift');
report.finishedAt = new Date().toISOString();
await fs.writeFile(`${output}/record.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ captures: report.captures.map(({ pacing, ...rest }) => ({ ...rest, samples: pacing.samples.length })), errors: report.errors, runtime: report.runtimeAfter, servedFiles: Object.keys(report.servedFiles).length }, null, 2));
