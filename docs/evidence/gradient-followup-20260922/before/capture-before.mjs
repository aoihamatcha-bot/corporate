import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve("docs/evidence/gradient-followup-20260922/before");
const builtSourceHead = "fa9a7b4738395b2f4e205d410e7837ac0f5c1e64";
const expectedBuildId = "b19YiBrdl0VSoKHyvQe0Q";
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const browser = await chromium.launch();
const report = {
  startedAt: new Date().toISOString(),
  baseURL: "http://127.0.0.1:3017",
  builtSourceHead,
  builtSourceBinding: "Existing production build supplied by implementation owner; current editable source is not used as runtime identity. Immutable runtime files and served JS/CSS are hashed below.",
  currentGitHeadAtStart: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  browser: browser.version(),
  conditions: {
    viewport: "1440x1000 and 390x844; desktop Chromium viewport emulation; deviceScaleFactor=1",
    motion: "no-preference; no CSS animation disabling",
    random: "Math.random overridden to return 0.99 by page init script before application JavaScript",
    hero: "Natural opening complete; fonts ready and image decode; finite hero animations settled",
    pageIntro: "Scene entry observed; all finite animations settled; infinite animations not awaited",
    activeBackground: "Finite text animations settled, then scene-colors animations sought to delay + 45% duration and paused via WAAPI; this is a diagnostic illustration of the actual normal-motion background animation, not elapsed-time evidence",
    network: "Unthrottled localhost; no performance claim",
  },
  screenshots: [],
  servedRuntimeFiles: [],
  errors: [],
};

async function runtimeIdentity() {
  const buildId = (await fs.readFile(".next/BUILD_ID", "utf8")).trim();
  if (buildId !== expectedBuildId) throw new Error(`Unexpected build: ${buildId}`);
  async function walk(directory) {
    const result = [];
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const name = path.posix.join(directory, entry.name);
      if (entry.isDirectory()) result.push(...await walk(name));
      else result.push(name);
    }
    return result;
  }
  const names = [...await walk(".next/static"), ...await walk(".next/server"), ".next/BUILD_ID"].sort();
  const digest = createHash("sha256");
  const files = [];
  for (const name of names) {
    const bytes = await fs.readFile(name);
    files.push({ path: name, bytes: bytes.length, sha256: hash(bytes) });
    digest.update(name + "\0").update(bytes).update("\0");
  }
  return { buildId, digestScope: "Sorted .next/static, .next/server and BUILD_ID paths + NUL + actual file bytes + NUL; no current source files", aggregateSha256: digest.digest("hex"), files };
}

async function settle(page, selector) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator(selector).evaluate(async (element) => {
    await Promise.all([...element.querySelectorAll("img")].map(async (image) => {
      if (!image.complete) await new Promise((resolve, reject) => { image.addEventListener("load", resolve, { once: true }); image.addEventListener("error", reject, { once: true }); });
      if (!image.naturalWidth) throw new Error("Image failed: " + image.currentSrc);
      await image.decode();
    }));
    await Promise.all(element.getAnimations({ subtree: true }).filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map((animation) => animation.finished.catch(() => {})));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function screenshot(page, filename, selector, extra = {}) {
  const state = await page.locator(selector).evaluate((element) => {
    const describe = (node) => {
      const css = getComputedStyle(node);
      return { tag: node.tagName, classes: node.className, palette: node.getAttribute("data-palette"), backgroundImage: css.backgroundImage, backgroundColor: css.backgroundColor, opacity: css.opacity, transform: css.transform, color: css.color, color1: css.getPropertyValue("--color-1"), color2: css.getPropertyValue("--color-2"), color3: css.getPropertyValue("--color-3"), color4: css.getPropertyValue("--color-4") };
    };
    return {
      url: location.href, viewport: { width: innerWidth, height: innerHeight }, fontStatus: document.fonts.status,
      fontFamily: getComputedStyle(document.body).fontFamily, intro: document.documentElement.dataset.intro,
      openingPhase: document.querySelector(".site-opening")?.dataset.phase ?? null,
      scrollY, bounds: element.getBoundingClientRect().toJSON(), root: describe(element),
      backgroundLayers: [...element.querySelectorAll(".scene-colors > *, .hero-shade, .hero-art")].map(describe),
      palettes: [...new Set([...element.querySelectorAll("[data-palette]")].map((node) => node.getAttribute("data-palette")))],
      images: [...element.querySelectorAll("img")].map((image) => ({ src: image.currentSrc, complete: image.complete, width: image.naturalWidth, height: image.naturalHeight })),
      animations: element.getAnimations({ subtree: true }).map((animation) => ({ name: animation.animationName ?? null, target: animation.effect?.target?.className ?? null, playState: animation.playState, currentTime: animation.currentTime, timing: animation.effect?.getComputedTiming() })),
    };
  });
  await page.screenshot({ path: path.join(output, filename) });
  report.screenshots.push({ filename, selector, ...extra, ...state });
}

async function seekBackground(page, selector) {
  return page.locator(selector).evaluate(async (element) => {
    const animations = element.querySelector(".scene-colors").getAnimations({ subtree: true });
    const details = animations.map((animation) => {
      const timing = animation.effect.getTiming();
      const before = { name: animation.animationName ?? null, target: animation.effect.target.className, playState: animation.playState, currentTime: animation.currentTime, timing };
      animation.pause();
      animation.currentTime = Number(timing.delay) + Number(timing.duration) * 0.45;
      return { ...before, pausedAtMs: animation.currentTime };
    });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return details;
  });
}

const responseTasks = [];
const runtimeSeen = new Set();
async function capture(locale, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  await context.addInitScript(() => { Math.random = () => 0.99; });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const errors = { locale, viewport, pageErrors: [], consoleMessages: [], failedRequests: [], httpErrors: [] };
  report.errors.push(errors);
  page.on("pageerror", (error) => errors.pageErrors.push(error.message));
  page.on("console", (message) => errors.consoleMessages.push({ type: message.type(), text: message.text() }));
  page.on("requestfailed", (request) => errors.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.httpErrors.push({ url: response.url(), status: response.status() });
    const url = response.url();
    if (!url.includes("/_next/static/") || !/\.(css|js)(?:\?|$)/.test(url) || runtimeSeen.has(url)) return;
    runtimeSeen.add(url);
    responseTasks.push((async () => {
      const bytes = await response.body();
      const localPath = ".next/" + new URL(url).pathname.split("/_next/")[1];
      const localBytes = await fs.readFile(localPath);
      report.servedRuntimeFiles.push({ url, localPath, bytes: bytes.length, servedSha256: hash(bytes), localSha256: hash(localBytes), exactMatch: bytes.equals(localBytes) });
    })());
  });
  const suffix = `${locale}-${viewport.width}`;
  await page.goto(report.baseURL + (locale === "ja" ? "/" : "/en"), { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector(".site-opening")?.dataset.phase === "complete" && document.documentElement.dataset.intro === "done");
  await settle(page, ".hero");
  await screenshot(page, `${suffix}-hero.png`, ".hero");
  if (locale === "ja" && viewport.width === 1440) {
    await page.locator("#about").evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 100, behavior: "instant" }));
    await page.waitForFunction(() => document.querySelector("#about")?.classList.contains("scene-entered"));
    await settle(page, "#about");
    const seek = await seekBackground(page, "#about");
    await screenshot(page, "ja-1440-home-about-active-diagnostic.png", "#about", { diagnosticSeek: seek });
  }
  await page.goto(report.baseURL + (locale === "ja" ? "/about" : "/en/about"), { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector(".page-intro")?.classList.contains("scene-entered"));
  await settle(page, ".page-intro");
  await screenshot(page, `${suffix}-about-intro.png`, ".page-intro");
  if (locale === "ja" && viewport.width === 1440) {
    const seek = await seekBackground(page, ".page-intro");
    await screenshot(page, "ja-1440-about-intro-active-diagnostic.png", ".page-intro", { diagnosticSeek: seek });
  }
  await context.close();
}

try {
  report.runtimeBefore = await runtimeIdentity();
  const results = await Promise.allSettled(["ja", "en"].flatMap((locale) => [{ width: 1440, height: 1000 }, { width: 390, height: 844 }].map((viewport) => capture(locale, viewport))));
  for (const result of results) if (result.status === "rejected") throw result.reason;
  await Promise.all(responseTasks);
  report.runtimeAfter = await runtimeIdentity();
  report.runtimeUnchanged = report.runtimeBefore.aggregateSha256 === report.runtimeAfter.aggregateSha256;
  report.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(output, "record.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({ screenshots: report.screenshots.length, runtimeUnchanged: report.runtimeUnchanged, runtimeDigest: report.runtimeBefore.aggregateSha256, servedFiles: report.servedRuntimeFiles.length, servedFilesMatch: report.servedRuntimeFiles.every((file) => file.exactMatch), errors: report.errors }, null, 2));
} catch (error) {
  report.captureError = { message: error.message, stack: error.stack };
  await fs.writeFile(path.join(output, "partial-record.json"), JSON.stringify(report, null, 2) + "\n");
  throw error;
} finally {
  await browser.close();
}
