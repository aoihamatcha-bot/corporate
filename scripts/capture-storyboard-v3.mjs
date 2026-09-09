import { chromium, devices } from "@playwright/test";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
const out = path.resolve("docs/evidence/storyboard-v3");
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
try {
  for (const mobile of [false, true]) {
    const name = mobile ? "mobile" : "desktop";
    const viewport = mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 };
    const context = await browser.newContext({
      ...(mobile ? devices["Pixel 7"] : {}),
      viewport,
      baseURL: "http://127.0.0.1:3017",
      recordVideo: { dir: path.join(out, ".recordings"), size: viewport },
    });
    const page = await context.newPage();
    const record = { name, pageErrors: [], captures: [] };
    page.on("pageerror", (error) => record.pageErrors.push(error.message));
    async function capture(label) {
      const file = `${name}-${label}.png`;
      await page.screenshot({ path: path.join(out, file) });
      const state = await page.evaluate(() => ({
        time: performance.now(),
        phase: document.querySelector(".site-opening")?.dataset.phase,
        intro: document.documentElement.dataset.intro,
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollY,
      }));
      record.captures.push({ file, state });
    }
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.querySelector(".site-opening")?.dataset.phase === "hold",
    );
    await capture("01-completed-handwriting");
    await page.waitForFunction(
      () =>
        document.querySelector(".site-opening")?.dataset.phase === "docking",
    );
    await page.waitForTimeout(450);
    await capture("02-handoff");
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "done",
    );
    await page
      .locator("#hero-title")
      .evaluate((el) =>
        Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished)),
      );
    await capture("03-hero");
    await context.close();
    await copyFile(
      await page.video().path(),
      path.join(out, `${name}-opening.webm`),
    );
    records.push(record);
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    baseURL: "http://127.0.0.1:3017",
  });
  const page = await context.newPage();
  for (const [route, selector] of [
    ["/company", ".company-illustration"],
    ["/about", ".about-illustration"],
    ["/business", ".business-detail-frame"],
    ["/en/business", ".concept-diagram"],
    ["/en/#current-work", ".material-slots"],
    ["/#business", ".collaboration-cta"],
  ]) {
    await page.goto(route);
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2300);
    await page.screenshot({
      path: path.join(
        out,
        `${route.includes("/en") ? "en" : "ja"}-${selector.slice(1)}.png`,
      ),
    });
  }
  await page.goto("/about");
  await page.waitForTimeout(3500);
  await page.mouse.move(650, 300);
  await page.mouse.move(820, 460, { steps: 14 });
  await page.mouse.move(1120, 320, { steps: 14 });
  await page.screenshot({ path: path.join(out, "desktop-cursor-trail.png") });
  await context.close();
} finally {
  await browser.close();
  await writeFile(
    path.join(out, "capture-record.json"),
    JSON.stringify(
      { environment: "LOCAL production build, Chromium", records },
      null,
      2,
    ) + "\n",
  );
}
