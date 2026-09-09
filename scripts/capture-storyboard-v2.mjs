import { chromium, devices } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("docs/evidence/storyboard-v2");
const baseURL = process.env.STORYBOARD_BASE_URL || "http://127.0.0.1:3017";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
try {
  for (const mobile of [false, true]) {
    const label = mobile ? "mobile" : "desktop";
    const viewport = mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 };
    const context = await browser.newContext({
      ...(mobile ? devices["Pixel 7"] : {}),
      viewport,
      baseURL,
      recordVideo: { dir: path.join(out, ".recordings"), size: viewport },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const record = { label, viewport, pageErrors: errors, captures: [] };
    const state = () =>
      page.evaluate(() => ({
        scrollY,
        timestamp: performance.now(),
        intro: document.documentElement.dataset.intro,
        thumbnails: [...document.querySelectorAll(".story-card-media")].map(
          (el) => ({
            opacity: getComputedStyle(el).opacity,
            transform: getComputedStyle(el).transform,
            top: el.getBoundingClientRect().top,
            entered: el.dataset.storyEntered || null,
          }),
        ),
      }));
    const capture = async (name) => {
      const file = `${label}-${name}.png`;
      const before = await state();
      await page.screenshot({ path: path.join(out, file) });
      record.captures.push({ file, before, after: await state() });
    };
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "running",
    );
    await capture("01-logo");
    await page
      .locator(".handwriting-stroke")
      .first()
      .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    await capture("02-early-ink");
    await page
      .locator(".handwriting-stroke")
      .last()
      .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    await capture("03-handwriting");
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "done",
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1700);
    await capture("04-hero");
    const card = page.locator(".story-card-media").first();
    await card.evaluate((el) =>
      window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - innerHeight + 36,
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(300);
    await capture("05-thumbnail-waiting");
    // Real scroll + real animation time. No animation seeking or CSS overrides.
    await card.evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "smooth" }),
    );
    await page.waitForFunction(
      () => {
        const el = document.querySelector(".story-card-media");
        const opacity = Number(getComputedStyle(el).opacity);
        return opacity > 0 && opacity < 0.6;
      },
      null,
      { polling: "raf" },
    );
    await capture("06-thumbnail-fading");
    await card.evaluate((el) =>
      Promise.all(el.getAnimations().map((a) => a.finished)),
    );
    await page.waitForTimeout(600);
    await capture("07-thumbnail-settled");
    for (const [name, selector] of [
      ["08-business-lower", ".business-preview > a:last-child"],
      ["09-assembly", "#current-work .concept-diagram"],
      ["10-philosophy", "#about"],
      ["11-collaboration", ".collaboration-section"],
      ["12-news", ".home-news"],
      ["13-company", ".home-company"],
      ["14-contact", ".contact-band"],
    ]) {
      const destination = await page
        .locator(selector)
        .evaluate((el) =>
          Math.min(
            document.documentElement.scrollHeight - innerHeight,
            el.getBoundingClientRect().top + scrollY - 100,
          ),
        );
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "smooth" }),
        destination,
      );
      await page.waitForFunction(
        (top) => Math.abs(scrollY - top) < 2,
        destination,
      );
      await page.waitForTimeout(1200);
      await capture(name);
    }
    record.horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    record.removedControls = await page
      .locator(".motion-control, .opening-skip")
      .count();
    const video = page.video();
    await context.close();
    record.video = `${label}-walkthrough.webm`;
    await video.saveAs(path.join(out, record.video));
    await video.delete();
    records.push(record);
  }
} finally {
  await browser.close();
}
await writeFile(
  path.join(out, "visual-check.json"),
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      baseURL,
      evidence:
        "LOCAL production build. Real-time animation; capture intervals include before/after measurements.",
      records,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    records.map(
      ({
        label,
        pageErrors,
        horizontalOverflow,
        removedControls,
        captures,
        video,
      }) => ({
        label,
        pageErrors,
        horizontalOverflow,
        removedControls,
        frames: captures.length,
        video,
      }),
    ),
    null,
    2,
  ),
);
