import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const output = path.resolve("docs/evidence");
const temp = path.resolve(".local/capture");
await fs.mkdir(output, { recursive: true });
await fs.mkdir(temp, { recursive: true });
const browser = await chromium.launch();
const results = {
  capturedAt: new Date().toISOString(),
  environment:
    "LOCAL production build, Chromium, Windows; emulated viewports; not field CWV",
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
      for (const entry of list.getEntries())
        window.__metrics.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__metrics.longTasks.push(Math.round(entry.duration));
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (entry.interactionId)
          window.__metrics.interactions.push(entry.duration);
    }).observe({ type: "event", buffered: true, durationThreshold: 16 });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:3017", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(output, `${name}-menu.png`) });
  if (!mobile) {
    await page
      .getByRole("dialog")
      .getByRole("link", { name: /About 私たちについて/ })
      .hover();
    await page.waitForTimeout(800);
  }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  for (const selector of [
    "#about",
    ".wonder-section",
    ".business-section",
    ".home-news",
    ".contact-band",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    if (selector === ".wonder-section") {
      await page.screenshot({ path: path.join(output, `${name}-cut-in.png`) });
      if (!mobile) {
        await page.mouse.move(250, 400);
        await page.mouse.move(1000, 450, { steps: 20 });
        await page.waitForTimeout(1100);
      }
    }
  }
  await page.evaluate(() => window.scrollTo({top:0, behavior:"instant"}));
  await page.screenshot({
    path: path.join(output, `${name}-home.png`),
    fullPage: true,
  });
  results.measurements.push({
    name,
    viewport,
    metrics: await page.evaluate(() => window.__metrics),
    errors,
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
  await page.goto(`http://127.0.0.1:3017/${route}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(output, `${route}.png`),
    fullPage: true,
  });
}
// A 720 CSS-pixel layout corresponds to the usable width of a 1440px desktop at 200% zoom.
await page.setViewportSize({ width: 720, height: 450 });
await page.goto("http://127.0.0.1:3017");
await page.getByRole("button", { name: "メニューを開く" }).click();
await page.waitForTimeout(900);
await page.screenshot({
  path: path.join(output, "menu-effective-200-percent.png"),
});
await browser.close();
const css = await fs.readFile("styles/tokens.css", "utf8");
const values = Object.fromEntries(
  [...css.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi)].map((m) => [m[1], m[2]]),
);
function luminance(hex) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function ratio(a, b) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
const backgrounds = Object.entries(values).filter(([key]) =>
  /^(sky|mint|apricot|iris)-[1-4]$/.test(key),
);
results.contrast = {
  method:
    "Conservative palette endpoint matrix. Text interpolation and alpha on white do not introduce a lighter foreground than these text endpoints. Photo pixels and antialiasing require visual review.",
  normalText: Math.min(...backgrounds.map(([, bg]) => ratio(values.ink, bg))),
  mutedText: Math.min(...backgrounds.map(([, bg]) => ratio(values.muted, bg))),
  largeGradientText: Math.min(
    ...backgrounds.flatMap(([, bg]) =>
      ["ink", "text-blue", "text-purple", "text-cyan"].map((key) =>
        ratio(values[key], bg),
      ),
    ),
  ),
};
await fs.writeFile(
  path.join(output, "lab-measurements.json"),
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
