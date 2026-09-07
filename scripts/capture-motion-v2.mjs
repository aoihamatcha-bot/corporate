import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve(
  process.argv[2] ?? `.local/motion-capture-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
if ((await fs.readdir(output)).length)
  throw new Error(
    "Use an empty output directory to preserve previous evidence.",
  );
const temp = path.resolve(`.local/video-${Date.now()}`);
const browser = await chromium.launch();
const notes = {
  capturedAt: new Date().toISOString(),
  environment:
    "LOCAL production build, Windows, Chromium, emulated desktop/mobile; not Hosted or field CWV",
  captures: [],
  measurements: [],
};
for (const mobile of [false, true]) {
  const name = mobile ? "mobile" : "desktop";
  const viewport = mobile
    ? { width: 390, height: 844 }
    : { width: 1440, height: 900 };
  const context = await browser.newContext({
    viewport,
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
    recordVideo: { dir: temp, size: viewport },
  });
  await context.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0, longTasks: [], interactions: [] };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__metrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) window.__metrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        window.__metrics.longTasks.push(e.duration);
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (e.interactionId) window.__metrics.interactions.push(e.duration);
    }).observe({ type: "event", buffered: true, durationThreshold: 16 });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3017", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1900);
  await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
  const started = await page.evaluate(() => performance.now());
  await page.getByRole("button", { name: "メニューを開く" }).click();
  // These are live captures, not animations rewound or artificially frozen.
  await page.waitForTimeout(230);
  await page.screenshot({
    path: path.join(output, `${name}-menu-opening.png`),
  });
  notes.captures.push({
    name,
    frame: "menu-opening",
    elapsedFromBeforeClickMs: await page.evaluate(
      (start) => performance.now() - start,
      started,
    ),
  });
  await page.waitForTimeout(1600);
  await page.screenshot({
    path: path.join(output, `${name}-menu-settled.png`),
  });
  if (!mobile) {
    await page
      .getByRole("dialog")
      .getByRole("link", { name: /About 私たちについて/ })
      .hover();
    await page.waitForTimeout(900);
  }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(430);
  await page.locator("#about .section-heading").scrollIntoViewIfNeeded();
  await page.waitForTimeout(230);
  await page.screenshot({
    path: path.join(output, `${name}-text-opening.png`),
  });
  await page.waitForTimeout(1700);
  await page.screenshot({
    path: path.join(output, `${name}-text-settled.png`),
  });
  await page.locator(".wonder-type").scrollIntoViewIfNeeded();
  await page.waitForTimeout(240);
  await page.screenshot({ path: path.join(output, `${name}-cut-opening.png`) });
  await page.waitForTimeout(1700);
  await page.screenshot({ path: path.join(output, `${name}-cut-settled.png`) });
  await page.locator(".business-visual").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(230);
  await page.screenshot({
    path: path.join(output, `${name}-image-opening.png`),
  });
  await page.waitForTimeout(1700);
  if (!mobile) {
    const card = page.locator(".business-preview > a").first();
    for (let i = 0; i < 4; i++) {
      await card.hover();
      await page.waitForTimeout(400);
      const palette = await card
        .locator(".gradient-image")
        .getAttribute("data-palette");
      await page.screenshot({
        path: path.join(output, `image-${palette}.png`),
      });
      await page.mouse.move(10, 10);
      await page.waitForTimeout(340);
    }
  } else {
    await page.locator(".business-visual").last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
  }
  await page.locator(".contact-band h2").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  notes.measurements.push({
    name,
    viewport,
    metrics: await page.evaluate(() => window.__metrics),
    errors,
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: path.join(output, `${name}-home.png`),
    fullPage: true,
  });
  const video = page.video();
  await context.close();
  await video.saveAs(path.join(output, `${name}-motion.webm`));
}
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
for (const route of [
  "about",
  "business",
  "company",
  "news",
  "contact",
  "privacy",
]) {
  await page.goto(`http://127.0.0.1:3017/${route}`);
  await page.waitForTimeout(1900);
  await page.screenshot({
    path: path.join(output, `${route}.png`),
    fullPage: true,
  });
}
await page.setViewportSize({ width: 720, height: 450 });
await page.goto("http://127.0.0.1:3017");
await page.getByRole("button", { name: "メニューを開く" }).click();
await page.waitForTimeout(2000);
await page.screenshot({
  path: path.join(output, "menu-effective-200-percent.png"),
});
await browser.close();
await fs.writeFile(
  path.join(output, "lab-measurements.json"),
  JSON.stringify(notes, null, 2),
);
console.log(JSON.stringify({ output, notes }, null, 2));
