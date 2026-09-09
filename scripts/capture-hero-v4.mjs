import { chromium, devices } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const out = "docs/evidence/hero-v4";
const records = [];
for (const mobile of [false, true]) {
  for (const locale of ["ja", "en"]) {
    const name = (mobile ? "mobile" : "desktop") + "-" + locale;
    const viewport = mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 };
    const context = await browser.newContext({
      ...(mobile ? devices["Pixel 7"] : {}),
      viewport,
      baseURL: "http://127.0.0.1:3017",
      recordVideo: { dir: out + "/.recordings", size: viewport },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(locale === "ja" ? "/" : "/en", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(
      () => document.querySelector(".site-opening")?.dataset.phase === "hold",
    );
    await page.screenshot({ path: out + "/" + name + "-hold.png" });
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "docking",
    );
    await page.waitForTimeout(650);
    await page.screenshot({ path: out + "/" + name + "-handoff.png" });
    await page.waitForFunction(
      () => document.documentElement.dataset.intro === "done",
    );
    await page.waitForTimeout(1800);
    await page.screenshot({ path: out + "/" + name + "-hero.png" });
    const initial = await page.evaluate(() => ({
      businessTop: document.querySelector("#business").getBoundingClientRect()
        .top,
      viewport: innerHeight,
      animations: document
        .querySelector(".hero")
        .getAnimations({ subtree: true }).length,
    }));
    await page.locator(".hero-scroll-cue").click();
    await page.waitForFunction(
      () =>
        document.querySelector("#business .section-heading .reveal-text")
          ?.dataset.entered === "true",
    );
    await page.waitForTimeout(180);
    await page.screenshot({ path: out + "/" + name + "-business-entry.png" });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: out + "/" + name + "-business-settled.png" });
    records.push({ name, initial, errors, url: page.url() });
    await context.close();
    await fs.copyFile(
      await page.video().path(),
      out + "/" + name + "-flow.webm",
    );
  }
}
await fs.writeFile(
  out + "/visual-record.json",
  JSON.stringify(records, null, 2),
);
await browser.close();
