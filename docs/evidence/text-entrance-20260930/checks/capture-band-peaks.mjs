import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Supplemental diagnostic. Keep the original captures; their 45% clock sample
// was already past the eased band's peak, and footer entry had not started.
const root = 'docs/evidence/text-entrance-20260930';
const output = `${root}/band-peaks`;
const source = '6ced095e453ef9a6633979591211e1d347de2081';
const prior = JSON.parse(await fs.readFile(`${root}/final/record.json`, 'utf8'));
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
if (git('diff', source, '--name-only', '--', 'app', 'components', 'styles', 'content', 'public', 'package.json', 'package-lock.json', 'next.config.ts')) throw new Error('Production source drift');
if ((await fs.readFile('.next/BUILD_ID', 'utf8')).trim() !== prior.runtimeAfter.buildId) throw new Error('Build drift');
if (await fs.stat(`${output}/record.json`).catch(() => null)) throw new Error('Existing evidence must not be overwritten');
await fs.mkdir(output, { recursive: true });
const report = { source, buildId: prior.runtimeAfter.buildId, startedAt: new Date().toISOString(), method: 'LOCAL Chromium, scale1, normal motion. Wait for real entrance, seek each decorative band at 1% intervals to its effective opacity maximum, freeze decorative playback at rate 0 and the color plateau, then finish unrelated animations for legible surroundings. Rate 0 also prevents the scheduled color resume from advancing during screenshot capture. Verify effective band opacity again after capture. Diagnostic stills only; natural videos remain under final/.', screenshots: [], errors: [], servedFiles: {} };
const responses = [];
const browser = await chromium.launch();
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  page.on('response', response => {
    const pathname = new URL(response.url()).pathname;
    if (pathname.startsWith('/_next/static/') && /\.(js|css)$/.test(pathname)) responses.push((async () => {
      const digest = sha256(await response.body());
      const matches = digest === sha256(await fs.readFile('.next/' + pathname.slice('/_next/'.length)));
      report.servedFiles[pathname] = { sha256: digest, matches };
      if (!matches) throw new Error('Served runtime mismatch');
    })());
  });
  for (const target of [
    { name: 'ja-body', route: '/about', selector: '.page-description' },
    { name: 'en-body', route: '/en/about', selector: '.page-description' },
    { name: 'ja-footer', route: '/about', selector: '.site-footer' },
    { name: 'ja-hero', route: '/', selector: '.hero' },
  ]) {
    await page.goto('http://127.0.0.1:3017' + target.route);
    await page.evaluate(() => document.fonts.ready);
    const element = page.locator(target.selector);
    if (target.name.endsWith('footer')) await element.scrollIntoViewIfNeeded();
    await page.waitForFunction(selector => [...document.querySelectorAll(`${selector} .reveal-band-soft`)].some(band => band.getAnimations().length > 0), target.selector);
    const state = await element.evaluate(el => {
      const selected = new Set();
      const bands = [...el.querySelectorAll('.reveal-band-soft')];
      const peaks = bands.map(band => {
        const animation = band.getAnimations()[0];
        if (!animation) return null;
        selected.add(animation);
        animation.updatePlaybackRate(0);
        animation.pause();
        const timing = animation.effect.getTiming();
        let peak = -1, peakTime = 0;
        for (let i = 0; i <= 100; i++) {
          animation.currentTime = Number(timing.delay) + Number(timing.duration) * i / 100;
          const opacity = Number(getComputedStyle(band).opacity);
          if (opacity > peak) { peak = opacity; peakTime = Number(animation.currentTime); }
        }
        animation.currentTime = peakTime;
        return { peak, peakTime, layerOpacity: getComputedStyle(band.parentElement).opacity, gradient: getComputedStyle(band).backgroundImage };
      }).filter(Boolean);
      for (const color of el.querySelectorAll('.reveal-color')) for (const animation of color.getAnimations()) {
        selected.add(animation); animation.updatePlaybackRate(0); animation.pause();
        const timing = animation.effect.getTiming(), frames = animation.effect.getKeyframes();
        animation.currentTime = Number(timing.delay) + Number(timing.duration) * (frames[1].computedOffset + frames[2].computedOffset) / 2;
      }
      for (const animation of document.getAnimations()) if (!selected.has(animation) && Number.isFinite(Number(animation.effect?.getComputedTiming().endTime))) animation.finish();
      return { peaks, sources: [...el.querySelectorAll('.reveal-source')].map(source => ({ text: source.textContent, opacity: getComputedStyle(source).opacity, color: getComputedStyle(source).color, clip: getComputedStyle(source).clipPath })) };
    });
    if (!state.peaks.length || state.peaks.some(peak => peak.peak < .49)) throw new Error('No actual band peak captured');
    const filename = `${target.name}-${width}-peak.png`;
    await page.screenshot({ path: `${output}/${filename}` });
    const afterCapture = await element.locator('.reveal-band-soft').evaluateAll(bands => bands.map(band => Number(getComputedStyle(band).opacity)));
    if (afterCapture.length !== state.peaks.length || afterCapture.some(opacity => opacity < .49)) throw new Error('Decorative peak drifted during screenshot');
    report.screenshots.push({ filename, state, afterCapture });
  }
  await context.close();
}
await Promise.all(responses); await browser.close();
report.finishedAt = new Date().toISOString();
await fs.writeFile(`${output}/record.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ images: report.screenshots.length, errors: report.errors, servedFiles: Object.keys(report.servedFiles).length }));
