import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const output = path.resolve(
  process.argv[2] ?? `.local/business-thumbnails-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const errors = [];
// Paint the full crop; fixed page chrome is hidden only in asset-layout captures.
async function captureSection(page, section, filename) {
  const width = page.viewportSize().width;
  const height =
    Math.ceil(
      await section.evaluate((el) => el.getBoundingClientRect().height),
    ) + 240;
  await page.setViewportSize({ width, height });
  await section.evaluate((el) =>
    window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - 120,
      behavior: "instant",
    }),
  );
  await section.screenshot({
    path: path.join(output, filename),
    style: ".site-header, .skip-link { visibility: hidden !important; }",
  });
  await page.setViewportSize({ width, height: 900 });
}
const areas = [
  ["platform", "01 エンターテインメントEC"],
  ["systems", "02 サービス・システム開発"],
  ["creative", "03 映像・コンテンツ制作"],
  ["marketing", "04 マーケティング・コラボレーション"],
];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:3017/");
    const cards = page.locator(".business-preview");
    await cards.locator("img").evaluateAll(async (images) => {
      for (const img of images) img.loading = "eager";
      await Promise.all(images.map((img) => img.decode()));
    });
    await captureSection(page, cards, `cards-ja-${width}.png`);
    await page.goto("http://127.0.0.1:3017/en/business#platform");
    await page.locator("#platform img").evaluate((img) => img.decode());
    await captureSection(
      page,
      page.locator("#platform"),
      `detail-en-${width}.png`,
    );
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:3017/");
  const image = page.locator(".business-visual").first();
  await image.scrollIntoViewIfNeeded();
  await image.locator("img").evaluate((img) => img.decode());
  await image.screenshot({ path: path.join(output, "thumbnail-normal.png") });
  await image.hover();
  await image
    .locator(".image-wash")
    .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  await image.screenshot({ path: path.join(output, "thumbnail-hover.png") });
  const hover = await image.evaluate((el) => ({
    trigger: el.dataset.imageTrigger,
    state: el.dataset.imageState,
    palette: el.dataset.palette,
    washOpacity: getComputedStyle(el.querySelector(".image-wash")).opacity,
  }));
  await context.close();

  const panels = areas
    .map(
      ([id, label]) =>
        `<section><h2>${label}</h2><div>${["card", "detail"]
          .map((kind) => {
            const file = path.resolve(
              "public/images/business",
              id + "-" + kind + "-v1.webp",
            );
            const src = path.relative(output, file).replaceAll("\\", "/");
            return `<figure><img src="${src}" alt="${label} ${kind}"><figcaption>${kind === "card" ? "A · 一覧用 / Afterglow" : "B · 詳細用 / Daylight"}</figcaption></figure>`;
          })
          .join("")}</div></section>`,
    )
    .join("");
  const html = `<!doctype html><html lang="ja"><meta charset="utf-8"><title>MYSTENA — Business visuals</title><style>*{box-sizing:border-box}body{margin:0;padding:40px;background:#f4f8fd;color:#14191f;font-family:Arial,"Yu Gothic",sans-serif}header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:28px}h1{font-size:30px;letter-spacing:.04em;margin:0}header p{color:#5b6b81;font-size:14px}section{margin:0 0 28px}h2{font-size:18px;font-weight:500;margin:0 0 12px}section>div{display:grid;grid-template-columns:1fr 1fr;gap:20px}figure{margin:0}img{display:block;width:100%;height:330px;object-fit:contain;background:#fff}figure:first-child img{background:#061126}figcaption{font-size:12px;color:#5b6b81;margin-top:10px}</style><header><h1>MYSTENA</h1><p>Business visuals · 4 areas × 2 scenes</p></header>${panels}</html>`;
  const gallery = path.join(output, "gallery.html");
  await fs.writeFile(gallery, html);
  const galleryPage = await browser.newPage({
    viewport: { width: 1200, height: 900 },
  });
  await galleryPage.goto(pathToFileURL(gallery).href);
  await galleryPage
    .locator("img")
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  await galleryPage.screenshot({
    path: path.join(output, "asset-gallery.png"),
    fullPage: true,
  });
  await fs.writeFile(
    path.join(output, "capture.json"),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        source: "LOCAL production server",
        staticScreens:
          "LOCAL layout crops; reduced-motion enabled; viewport height expanded to paint full sections; fixed header and skip link hidden only in section captures",
        hoverScreen: hover,
        errors,
      },
      null,
      2,
    ) + "\n",
  );
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(output);
} finally {
  await browser.close();
}
