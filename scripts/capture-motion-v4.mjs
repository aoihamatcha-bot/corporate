import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve(
  process.argv[2] ?? `.local/motion-v4-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
if ((await fs.readdir(output)).length)
  throw new Error("Use an empty evidence directory.");
const browser = await chromium.launch();
const notes = {
  capturedAt: new Date().toISOString(),
  environment:
    "LOCAL production build; real elapsed-time capture; random palette selection unchanged",
  captures: [],
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
    recordVideo: { dir: `.local/v4-video-${Date.now()}`, size: viewport },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const shot = async (label) =>
    page.screenshot({ path: path.join(output, `${name}-${label}.png`) });
  await page.goto("http://127.0.0.1:3017");
  await page.waitForTimeout(1400);
  await shot("hero-color");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.waitForTimeout(1450);
  await shot("menu-color");
  await page.waitForTimeout(3100);
  await shot("menu-settled");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(420);
  await page.locator(".wonder-type").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot("text-wipe");
  await page.waitForTimeout(1100);
  await shot("text-color");
  await page.waitForTimeout(3100);
  await shot("text-settled");
  await page.locator(".business-visual").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1100);
  await shot("image-color");
  await page.locator(".contact-band-inner > div").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  await shot("small-copy-color");
  await page.waitForTimeout(2400);
  await shot("small-copy-settled");
  notes.captures.push({ name, viewport, errors });
  const video = page.video();
  await context.close();
  await video.saveAs(path.join(output, `${name}-motion.webm`));
}
await browser.close();
await fs.writeFile(
  path.join(output, "capture.json"),
  JSON.stringify(notes, null, 2),
);
console.log(JSON.stringify({ output, notes }, null, 2));
