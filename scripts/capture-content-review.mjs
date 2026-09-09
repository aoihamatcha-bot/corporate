import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
// New captures are separate from the historical evidence checked into Git.
const output = path.resolve(
  process.argv[2] ?? `.local/content-review-${Date.now()}/screens`,
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const errors = [];
for (const [locale, width] of [
  ["ja", 1440],
  ["en", 1440],
  ["ja", 390],
  ["en", 390],
]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3017" + (locale === "ja" ? "/" : "/en"));
  await page
    .getByRole("button", {
      name: locale === "ja" ? "メニューを開く" : "Open menu",
    })
    .waitFor();
  await page.locator(".hero-art img").evaluate(async (img) => {
    if (!img.complete)
      await new Promise((resolve) =>
        img.addEventListener("load", resolve, { once: true }),
      );
  });
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (img) => {
        img.loading = "eager";
        try {
          await img.decode();
        } catch {}
      }),
    );
  });
  await page.screenshot({
    path: path.join(output, "home-" + locale + "-" + width + ".png"),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(output, "hero-" + locale + "-" + width + ".png"),
  });
  if (width === 390) {
    await page
      .locator(".business-preview > a")
      .first()
      .screenshot({
        path: path.join(output, "business-card-" + locale + "-390.png"),
      });
    await page.locator(".wonder-section").screenshot({
      path: path.join(output, "philosophy-" + locale + "-390.png"),
    });
    await page.setViewportSize({ width: 320, height: 850 });
    await page.goto(
      "http://127.0.0.1:3017" + (locale === "ja" ? "/company" : "/en/company"),
    );
    await page.screenshot({
      path: path.join(output, "company-" + locale + "-320.png"),
      fullPage: true,
    });
    await page
      .getByRole("button", {
        name: locale === "ja" ? "メニューを開く" : "Open menu",
      })
      .click();
    await page.screenshot({
      path: path.join(output, "menu-" + locale + "-320.png"),
    });
  }
  await context.close();
}
await browser.close();
console.log(
  JSON.stringify({ output, errors, files: await fs.readdir(output) }),
);
if (errors.length) process.exitCode = 1;
