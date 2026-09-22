// Additional same-viewport comparison of one detail area and its contact destination.
// Run from repository root after starting baseline:3018 and modified source:3017.
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
const output = "docs/evidence/readability-20260922/details";
await fs.mkdir(output);
const browser = await chromium.launch();
const record = { browser: browser.version(), reducedMotion: "reduce", deviceScaleFactor: 1, captures: [] };
try {
  for (const [phase, port, sourceDir] of [
    ["before", 3018, "C:/Users/taisa/Desktop/corporate-readability-baseline-20260922"],
    ["after", 3017, "C:/Users/taisa/Desktop/corporate-readability-20260922"],
  ]) {
    const head = execFileSync("git", ["-C", sourceDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    for (const locale of ["ja", "en"]) for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const [route, selector] of [["business", "#systems"], ["contact", ".contact-frame"]]) {
        await page.goto(`http://127.0.0.1:${port}/${locale === "en" ? "en/" : ""}${route}`);
        const target = page.locator(selector);
        await target.scrollIntoViewIfNeeded();
        await target.evaluate(async (el) => {
          await document.fonts.ready;
          await Promise.all([...el.querySelectorAll("img")].map((img) => img.decode()));
        });
        const clip = await target.evaluate((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height };
        });
        const file = `${phase}-${locale}-${width}-${route}.png`;
        await page.screenshot({ path: path.join(output, file), fullPage: true, clip, animations: "disabled", style: ".site-header { visibility: hidden !important; }" });
        record.captures.push({ phase, head, locale, width, route, file, clip, fontStatus: await page.evaluate(() => document.fonts.status), errors: [...errors] });
      }
      await page.close();
    }
  }
  await fs.writeFile(path.join(output, "record.json"), JSON.stringify(record, null, 2) + "\n");
  console.log(JSON.stringify({ captures: record.captures.length, errors: record.captures.flatMap((item) => item.errors) }));
} finally { await browser.close(); }
