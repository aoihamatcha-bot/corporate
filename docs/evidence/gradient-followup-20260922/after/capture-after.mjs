import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve("docs/evidence/gradient-followup-20260922/after");
const builtSourceHead = "4af58a7d7ff7320f3bd6f7568c1b3b1d7042cdbd";
const expectedBuildId = "D2vAG0ZJlMvj2UBuAZMt_";
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
  videos: [],
  servedRuntimeFiles: [],
  errors: [],
};

async function sourceIdentity() {
  const names = execFileSync("git", ["ls-files", "app", "components", "content", "styles", "public", "package.json", "package-lock.json", "next.config.ts"], { encoding: "utf8" }).trim().split("\n").sort();
  const digest = createHash("sha256");
  for (const name of names) digest.update(name + "\0").update(await fs.readFile(name)).update("\0");
  return { head: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), sourceFiles: names.length, digestScope: "Sorted tracked app/components/content/styles/public/package.json/package-lock.json/next.config.ts paths + NUL + bytes + NUL; no tests/docs", sha256: digest.digest("hex"), trackedChanges: execFileSync("git", ["diff", "--name-only"], { encoding: "utf8" }).trim() };
}

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

async function textState(page, selector, sourceSelector, overlaySelector) {
  return page.locator(selector).evaluate((element, selectors) => {
    const source = element.querySelector(selectors.source);
    const overlay = element.querySelector(selectors.overlay);
    const sourceStyle = getComputedStyle(source);
    const overlayStyle = getComputedStyle(overlay);
    const pseudo = getComputedStyle(overlay, "::before");
    return { text: source.textContent, palette: element.dataset.palette, source: { opacity: sourceStyle.opacity, visibility: sourceStyle.visibility, display: sourceStyle.display, clipPath: sourceStyle.clipPath, maskImage: sourceStyle.maskImage, transform: sourceStyle.transform, color: sourceStyle.color, animations: source.getAnimations().length }, overlay: { opacity: overlayStyle.opacity, backgroundImage: pseudo.backgroundImage, backgroundClip: pseudo.backgroundClip, filter: pseudo.filter }, allAnimations: overlay.getAnimations().map((animation) => ({ name: animation.animationName ?? null, playState: animation.playState, currentTime: animation.currentTime, timing: animation.effect.getComputedTiming() })) };
  }, { source: sourceSelector, overlay: overlaySelector });
}

async function textDiagnostics(page, viewport) {
  const bodySelector = ".page-description .reveal-text[data-motion-kind='body']";
  await page.goto(report.baseURL + "/about", { waitUntil: "domcontentloaded" });
  await page.waitForFunction((selector) => document.querySelector(selector)?.querySelector(".reveal-color")?.getAnimations().some((animation) => animation.playState === "running"), bodySelector);
  const bodySeek = await page.locator(bodySelector).evaluate((element) => {
    const animation = element.querySelector(".reveal-color").getAnimations()[0];
    const timing = animation.effect.getTiming();
    const plateau = animation.effect.getKeyframes().filter((frame) => Number(frame.opacity) === 1).map((frame) => frame.computedOffset);
    animation.pause();
    animation.currentTime = Number(timing.delay) + Number(timing.duration) * ((plateau[0] + plateau.at(-1)) / 2);
    return { timing, plateauOffsets: plateau, pausedAt: animation.currentTime };
  });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".page-intro").evaluate(async (element) => {
    await Promise.all(element.getAnimations({ subtree: true }).filter((animation) => animation.playState !== "paused" && Number.isFinite(animation.effect?.getComputedTiming().endTime)).map((animation) => animation.finished.catch(() => {})));
  });
  await screenshot(page, `ja-${viewport.width}-body-color-plateau-diagnostic.png`, ".page-intro", { diagnosticText: await textState(page, bodySelector, ".reveal-source", ".reveal-color"), diagnosticSeek: bodySeek });
  await page.locator(".site-header .menu-trigger").click();
  await page.locator("#site-navigation").waitFor({ state: "visible" });
  const menuSeek = await page.locator("#site-navigation").evaluate(async (element) => {
    const records = [];
    for (const overlay of element.querySelectorAll(".menu-ink-color")) {
      const animations = overlay.getAnimations();
      const appear = animations.find((animation) => animation.animationName === "ink-color-appear");
      const fade = animations.find((animation) => animation.animationName === "ink-color-fade");
      if (!appear || !fade) continue;
      const appearTiming = appear.effect.getTiming();
      const fadeTiming = fade.effect.getTiming();
      const time = (Number(appearTiming.delay) + Number(appearTiming.duration) + Number(fadeTiming.delay)) / 2;
      for (const animation of animations) { animation.pause(); animation.currentTime = time; }
      records.push({ text: overlay.getAttribute("data-text"), plateauAtMs: time, appearTiming, fadeTiming });
    }
    await Promise.all([...element.querySelectorAll(".nav-curtains")].flatMap((node) => node.getAnimations({ subtree: true })).map((animation) => animation.finished.catch(() => {})));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return records;
  });
  // Record all source/overlay nodes without changing source styles, masks, or hit targets.
  const menuStates = await page.locator("#site-navigation .menu-ink").evaluateAll((elements) => elements.map((element) => {
    const base = element.querySelector(".menu-ink-base");
    const overlay = element.querySelector(".menu-ink-color");
    const baseStyle = getComputedStyle(base);
    return { text: base.textContent, sourceOpacity: baseStyle.opacity, sourceVisibility: baseStyle.visibility, sourceClipPath: baseStyle.clipPath, sourceMaskImage: baseStyle.maskImage, sourceTransform: baseStyle.transform, sourceAnimations: base.getAnimations().length, overlayOpacity: getComputedStyle(overlay).opacity, gradient: getComputedStyle(overlay, "::before").backgroundImage };
  }));
  await screenshot(page, `ja-${viewport.width}-menu-label-color-plateau-diagnostic.png`, "#site-navigation", { diagnosticSeek: menuSeek, menuStates });
}

async function captureNaturalVideo(kind) {
  const viewport = { width: 390, height: 844 };
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: path.join(output, ".recordings"), size: viewport } });
  await context.addInitScript(() => { Math.random = () => 0.99; });
  const page = await context.newPage();
  const errors = { video: kind, pageErrors: [], consoleMessages: [], failedRequests: [], httpErrors: [] };
  report.errors.push(errors);
  page.on("pageerror", (error) => errors.pageErrors.push(error.message));
  page.on("console", (message) => errors.consoleMessages.push({ type: message.type(), text: message.text() }));
  page.on("requestfailed", (request) => errors.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("response", (response) => { if (response.status() >= 400) errors.httpErrors.push({ url: response.url(), status: response.status() }); });
  const video = page.video();
  await page.goto(report.baseURL + "/about", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".page-description [data-text-motion='color']")?.dataset.revealState === "settled");
  await settle(page, ".page-intro");
  if (kind === "menu") {
    await page.locator(".site-header .menu-trigger").click();
    await page.locator("#site-navigation").waitFor({ state: "visible" });
    await page.locator("#site-navigation").evaluate(async (element) => {
      await Promise.all(element.getAnimations({ subtree: true }).filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map((animation) => animation.finished.catch(() => {})));
    });
    await page.keyboard.press("Escape");
    await page.locator("#site-navigation").waitFor({ state: "hidden" });
  }
  await context.close();
  const filename = `ja-390-${kind}-natural.webm`;
  await fs.copyFile(await video.path(), path.join(output, filename));
  report.videos.push({ filename, kind, viewport, conditions: "Natural normal motion; no WAAPI seek/pause or style overrides; random fixed at 0.99; body includes page load through finite text completion; menu includes load, open, natural completion, Escape close" });
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
  if (locale === "ja") await textDiagnostics(page, viewport);
  await context.close();
}

try {
  report.sourceBefore = await sourceIdentity();
  report.runtimeBefore = await runtimeIdentity();
  const results = await Promise.allSettled(["ja", "en"].flatMap((locale) => [{ width: 1440, height: 1000 }, { width: 390, height: 844 }].map((viewport) => capture(locale, viewport))));
  for (const result of results) if (result.status === "rejected") throw result.reason;
  console.log(JSON.stringify({ stage: "screenshots-complete", screenshots: report.screenshots.length }));
  await captureNaturalVideo("body");
  await captureNaturalVideo("menu");
  await Promise.all(responseTasks);
  report.runtimeAfter = await runtimeIdentity();
  report.runtimeUnchanged = report.runtimeBefore.aggregateSha256 === report.runtimeAfter.aggregateSha256;
  report.sourceAfter = await sourceIdentity();
  report.sourceUnchanged = report.sourceBefore.sha256 === report.sourceAfter.sha256;
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
