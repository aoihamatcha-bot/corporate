import { chromium, devices } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("docs/evidence/storyboard-v1");
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
    const capture = async (name) => {
      const file = `${label}-${name}.png`;
      await page.screenshot({ path: path.join(out, file) });
      record.captures.push({
        file,
        scrollY: await page.evaluate(() => scrollY),
      });
    };
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "running",
    );
    await capture("01-logo");
    await page
      .locator(".handwriting-stroke")
      .last()
      .evaluate((el) =>
        Promise.all(el.getAnimations().map((animation) => animation.finished)),
      );
    await capture("02-handwriting");
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "done",
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1700);
    await capture("03-hero");
    const scenes = [
      ["04-business", ".business-preview"],
      ["05-assembly", "#current-work .concept-diagram"],
      ["06-philosophy", "#about"],
      ["07-collaboration", ".collaboration-section"],
      ["08-news", ".home-news"],
      ["09-company", ".home-company"],
      ["10-contact", ".contact-band"],
    ];
    for (const [name, selector] of scenes) {
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
      await page.waitForTimeout(1000);
      await capture(name);
    }
    record.horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
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
      evidence: "LOCAL production build, real-time animations",
      records,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(records, null, 2));
