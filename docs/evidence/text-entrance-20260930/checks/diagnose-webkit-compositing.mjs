import { webkit, devices } from '@playwright/test';
import fs from 'node:fs/promises';
const scope = process.argv[2] ?? 'layers';
const output = `docs/evidence/text-entrance-20260930/checks/webkit-compositing-${scope}-31be953.json`;
if (await fs.stat(output).catch(() => null)) throw new Error('Do not overwrite evidence');
const cases = scope === 'hold' ? [
  ['pause-constant-color-hold', '', 'pause-hold'],
] : scope === 'structure' ? [
  ['promote-reading-roots', '.reveal-text[data-text-motion="band-color"] { will-change:opacity; }'],
  ['contain-color-paint', '.reveal-color { contain:paint; }'],
  ['direct-gradient-text', '', 'direct-text'],
] : scope === 'scope' ? [
  ['without-new-isolation', '.reveal-text[data-text-motion="band-color"] { isolation:auto; }'],
  ['hide-header-color', '.site-header .reveal-color { display:none !important; }'],
  ['hide-hero-color', '.hero .reveal-color { display:none !important; }'],
  ['hide-all-color', '.reveal-color { display:none !important; }'],
] : [
  ['baseline', ''],
  ['hide-soft-bands', '.reveal-band-soft { display:none !important; }'],
  ['promote-color', '.reveal-color { will-change:opacity; transform:translateZ(0); }'],
  ['promote-band-and-color', '.reveal-color { will-change:opacity; transform:translateZ(0); } .reveal-band-soft { will-change:transform,opacity; }'],
  ['without-pseudo-filter', '.reveal-color::before { filter:none !important; }'],
];
const report = { source: '31be953093a1c769b84825c866e89d35d57a4352', build: (await fs.readFile('.next/BUILD_ID', 'utf8')).trim(), recordedAt: new Date().toISOString(), conditions: 'Diagnostic overrides only; no product acceptance. Sequential WebKit iPhone 13 390x844 DPR3, 800ms real font-response delay, default Playwright video capture, natural opening and 2300ms rAF sample window. Same conditions across cases.', cases: [] };
const browser = await webkit.launch();
for (const [name, css, mode] of cases) {
  const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, recordVideo: { dir: '.local/text-band-diagnostics' } });
  if (mode === 'pause-hold') await context.addInitScript(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function(frames, options) {
      const animation = animate.call(this, frames, options);
      if (this.matches('.reveal-color') && Array.isArray(frames) && frames.length === 4) {
        const start = Number(options.delay) + Number(options.duration) * frames[1].offset;
        const end = Number(options.delay) + Number(options.duration) * frames[2].offset;
        let resume = 0;
        const pause = setTimeout(() => {
          const now = Number(animation.currentTime);
          if (animation.playState !== 'running' || now >= end) return;
          animation.pause(); animation.currentTime = start;
          resume = setTimeout(() => {
            if (animation.playState !== 'paused') return;
            animation.currentTime = end; animation.play();
          }, end - now);
        }, start);
        animation.addEventListener('cancel', () => { clearTimeout(pause); clearTimeout(resume); });
      }
      return animation;
    };
  });
  if (css) await context.addInitScript(value => {
    const install = () => { const style = document.createElement('style'); style.textContent = value; document.head.append(style); };
    if (document.head) install(); else document.addEventListener('DOMContentLoaded', install, { once: true });
  }, css);
  if (mode === 'direct-text') await context.addInitScript(() => {
    window.addEventListener('mystena:intro-end', () => {
      for (const color of document.querySelectorAll('.reveal-color')) {
        const style = getComputedStyle(color, '::before');
        for (const property of ['background-image', 'background-size', 'background-position', 'background-clip', '-webkit-background-clip', 'color', '-webkit-text-fill-color', 'filter']) color.style.setProperty(property, style.getPropertyValue(property));
        color.textContent = color.getAttribute('data-text');
      }
      const style = document.createElement('style');
      style.textContent = '.reveal-color::before { content:none !important; }';
      document.head.append(style);
    }, { once: true });
  });
  const page = await context.newPage();
  await page.route(/\.woff2(?:\?|$)/, async route => { await new Promise(resolve => setTimeout(resolve, 800)); await route.continue(); });
  await page.goto('http://127.0.0.1:3017/', { waitUntil: 'domcontentloaded' });
  const sample = await page.evaluate(async () => {
    const title = document.querySelector('#hero-title');
    const frames = []; let start = 0;
    await new Promise(resolve => {
      function frame() {
        if (document.documentElement.dataset.intro === 'done') {
          if (!start) start = performance.now();
          const box = title.getBoundingClientRect();
          frames.push({ time: performance.now() - start, rect: [box.x, box.y, box.width, box.height], animations: document.querySelector('.hero').getAnimations({ subtree: true }).filter(a => a.playState === 'running').length });
          if (performance.now() - start > 2300) return resolve();
        }
        requestAnimationFrame(frame);
      }
      frame();
    });
    return { frameCount: frames.length, duration: frames.at(-1).time, positions: new Set(frames.map(frame => JSON.stringify(frame.rect))).size, frames };
  });
  report.cases.push({ name, css, ...sample });
  console.log(JSON.stringify({ name, frames: sample.frameCount, duration: sample.duration, positions: sample.positions }));
  await context.close();
}
await browser.close();
await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
