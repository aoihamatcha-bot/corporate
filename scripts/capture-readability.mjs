import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

// Re-run from the implementation checkout against its already-built local server.
// BASE_URL=http://127.0.0.1:3018 SOURCE_DIR=<baseline checkout> PHASE=before
// BASE_URL=http://127.0.0.1:3017 SOURCE_DIR=<implementation checkout> PHASE=after
// A phase directory is never overwritten. Use a new PHASE for a new observation.
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3017";
const sourceDir = path.resolve(process.env.SOURCE_DIR ?? ".");
const phase = process.env.PHASE ?? "after";
const captureMode = process.env.CAPTURE_MODE ?? "all";
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error("Invalid PHASE");
if (!["all", "visual"].includes(captureMode)) throw new Error("Invalid CAPTURE_MODE");
const output = path.resolve(process.env.EVIDENCE_ROOT ?? "docs/evidence/readability-20260922", phase);
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.mkdir(output);

function git(...args) {
  return execFileSync("git", ["-C", sourceDir, ...args], { encoding: "utf8" }).trim();
}

async function sourceIdentity() {
  const files = git("ls-files", "--cached", "--others", "--exclude-standard", "app", "components", "content", "styles", "public", "package.json", "package-lock.json", "next.config.ts").split("\n").filter(Boolean);
  const digest = createHash("sha256");
  for (const file of files.sort()) {
    digest.update(file + "\0");
    try {
      digest.update(await fs.readFile(path.join(sourceDir, file)));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      digest.update("<DELETED>");
    }
    digest.update("\0");
  }
  return {
    head: git("rev-parse", "HEAD"),
    headTree: git("rev-parse", "HEAD^{tree}"),
    branch: git("branch", "--show-current") || "DETACHED",
    sourceDigestSha256: digest.digest("hex"),
    sourceDigestScope: "Sorted tracked and untracked, non-ignored app/components/content/styles/public/package.json/package-lock.json/next.config.ts paths + NUL + current bytes (or <DELETED>) + NUL",
    sourceFiles: files.length,
    dirtyTrackedFiles: git("diff", "--name-only").split("\n").filter(Boolean),
    node: process.version,
    sourceDir,
    nextBuildId: (await fs.readFile(path.join(sourceDir, ".next/BUILD_ID"), "utf8")).trim(),
  };
}

const identity = await sourceIdentity();
const browser = await chromium.launch();
const report = {
  phase,
  captureMode,
  startedAt: new Date().toISOString(),
  baseURL,
  identity,
  browser: browser.version(),
  visualConditions: {
    browser: "Headless Chromium; desktop browser viewport emulation, not real devices",
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    fonts: "document.fonts.ready + fonts.status loaded",
    images: "All images within each captured target are decoded; lazy loading is exercised by scrolling through target",
    animation: "Reduced Motion; finite active animations settled; screenshot animations disabled",
    elementCapture: "Full document clip of target bounds; fixed header visibility hidden for isolated element screenshots only (no layout change). Viewport screenshots show the header normally.",
    palette: "Reduced Motion suppresses random entrance palettes; DOM data-palette values recorded per capture",
    network: "Unthrottled localhost, separate browser context for each locale/viewport",
  },
  screenshots: [],
  performance: [],
  limits: [
    "One cold/warm local diagnostic pair, not a statistical performance comparison or field Core Web Vitals acceptance.",
    "No field INP data: UNKNOWN. No synthetic interaction value is presented as INP.",
    "Cold means new browser HTTP cache; local production server and image optimizer were primed by visual captures.",
    "Field LCP/CLS and real-user p75: UNKNOWN. Local LCP and CLS cover only the stated observation window.",
  ],
};

function collectErrors(page) {
  const errors = { pageErrors: [], consoleErrors: [], failedRequests: [], httpErrors: [] };
  page.on("pageerror", (error) => errors.pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => errors.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.httpErrors.push({ url: response.url(), status: response.status() });
  });
  return errors;
}

async function settleTarget(page, selector) {
  // Walk tall targets to let native lazy images load before an element screenshot.
  await page.locator(selector).evaluate(async (element) => {
    const targetTop = element.getBoundingClientRect().top + scrollY;
    const targetBottom = targetTop + element.getBoundingClientRect().height;
    for (let y = targetTop; y < targetBottom; y += Math.max(1, innerHeight * 0.75)) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    element.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForFunction((target) => [...document.querySelector(target).querySelectorAll("img")].every((image) => image.complete && image.naturalWidth > 0), selector);
  await page.locator(selector).evaluate(async (element) => {
    await document.fonts.ready;
    await Promise.all([...element.querySelectorAll("img")].map((image) => image.decode()));
    await Promise.all(element.getAnimations({ subtree: true }).filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map((animation) => animation.finished.catch(() => {})));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function captureVisual(locale, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce", baseURL });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const errors = collectErrors(page);
  await page.goto(locale === "ja" ? "/" : "/en", { waitUntil: "load" });
  await page.waitForFunction(() => document.documentElement.dataset.intro === "done");
  const label = `${locale}-${viewport.width}`;
  const targets = [
    { name: "hero", selector: ".hero", viewportShot: true },
    { name: "business-start", selector: "#business", viewportShot: true },
    { name: "business-cards", selector: ".business-preview" },
    { name: "concept", selector: ".concept-diagram" },
    { name: "contact-cta", selector: ".contact-band" },
  ];
  for (const target of targets) {
    await settleTarget(page, target.selector);
    if (target.name === "hero") await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    if (target.name === "business-start") await page.locator(target.selector).evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 110, behavior: "instant" }));
    const filename = `${label}-${target.name}.png`;
    const screenshotOptions = { path: path.join(output, filename), animations: "disabled" };
    if (target.viewportShot) await page.screenshot(screenshotOptions);
    else {
      const clip = await page.locator(target.selector).evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return { x: bounds.x + scrollX, y: bounds.y + scrollY, width: bounds.width, height: bounds.height };
      });
      // Element screenshots can clip the tail of a target that fits the viewport
      // height but is held below a sticky header by scroll-margin. A document
      // clip preserves its complete bounds without resizing the layout viewport.
      await page.screenshot({ ...screenshotOptions, fullPage: true, clip, style: ".site-header { visibility: hidden !important; }" });
    }
    const state = await page.locator(target.selector).evaluate((element) => ({
      fontStatus: document.fonts.status,
      bodyFont: getComputedStyle(document.body).fontFamily,
      targetRect: element.getBoundingClientRect().toJSON(),
      scrollY,
      pageHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      images: [...element.querySelectorAll("img")].map((image) => ({ src: image.currentSrc, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight })),
      palettes: [...new Set([...element.querySelectorAll("[data-palette]")].map((node) => node.getAttribute("data-palette")))].sort(),
    }));
    report.screenshots.push({ filename, locale, viewport, target: target.selector, screenshotType: target.viewportShot ? "viewport" : "full element", ...state });
  }
  report.screenshots.push({ label, errors });
  await context.close();
}

async function capturePerformance() {
  const conditions = {
    locale: "ja",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    browserEmulation: "Desktop Chromium UA, mobile-sized layout, touch enabled; not device hardware emulation",
    reducedMotion: "no-preference",
    cpuSlowdownMultiplier: 4,
    network: { latencyMs: 150, downloadBytesPerSecond: 200000, uploadBytesPerSecond: 93750 },
    observationWindowMs: 30000,
    interaction: "None; no scroll, click, key press, or dismissal; opening natural completion/failsafe is observed separately",
    palette: "Unmodified production random selection; initial viewport hero is static after opening",
    warm: "Same page/context, HTTP cache enabled, full navigation to the same URL after cold observation",
  };
  const context = await browser.newContext({ viewport: conditions.viewport, deviceScaleFactor: 1, hasTouch: true, reducedMotion: "no-preference", baseURL });
  await context.addInitScript(() => {
    const metrics = window.__readabilityMetrics = { lcp: [], shifts: [], opening: [], fontEvents: [], cls: 0, session: { value: 0, first: 0, last: 0 } };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) metrics.lcp.push({ startTime: entry.startTime, renderTime: entry.renderTime, loadTime: entry.loadTime, size: entry.size, element: entry.element?.tagName ?? null, id: entry.element?.id ?? null, url: entry.url ?? null });
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        metrics.shifts.push({ startTime: entry.startTime, value: entry.value });
        const session = metrics.session;
        if (!session.first || entry.startTime - session.last > 1000 || entry.startTime - session.first > 5000) {
          session.value = entry.value;
          session.first = entry.startTime;
        } else session.value += entry.value;
        session.last = entry.startTime;
        metrics.cls = Math.max(metrics.cls, session.value);
      }
    }).observe({ type: "layout-shift", buffered: true });
    window.addEventListener("mystena:intro-end", () => metrics.opening.push({ event: "intro-end", at: performance.now(), phase: document.querySelector(".site-opening")?.dataset.phase ?? null }));
    const observer = new MutationObserver(() => {
      const state = document.documentElement?.dataset.intro;
      if (state && metrics.opening.at(-1)?.state !== state) metrics.opening.push({ state, at: performance.now() });
    });
    observer.observe(document, { subtree: true, attributes: true, attributeFilter: ["data-intro"] });
    document.addEventListener("DOMContentLoaded", () => {
      metrics.fontEvents.push({ event: "DOMContentLoaded", status: document.fonts.status, at: performance.now() });
      document.fonts.ready.then(() => metrics.fontEvents.push({ event: "fonts-ready", status: document.fonts.status, at: performance.now() }));
      document.fonts.addEventListener("loadingdone", () => metrics.fontEvents.push({ event: "loadingdone", status: document.fonts.status, at: performance.now() }));
    });
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: false });
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: conditions.network.latencyMs, downloadThroughput: conditions.network.downloadBytesPerSecond, uploadThroughput: conditions.network.uploadBytesPerSecond, connectionType: "cellular3g" });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: conditions.cpuSlowdownMultiplier });
  let requests = new Map();
  cdp.on("Network.responseReceived", ({ requestId, type, response }) => requests.set(requestId, { type, url: response.url, status: response.status, fromDiskCache: response.fromDiskCache ?? false, fromServiceWorker: response.fromServiceWorker ?? false, encodedDataLength: response.encodedDataLength ?? 0 }));
  cdp.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    if (requests.has(requestId)) requests.get(requestId).encodedDataLength = encodedDataLength;
  });
  const allErrors = collectErrors(page);
  for (const cache of ["cold", "warm"]) {
    requests = new Map();
    const errorOffsets = Object.fromEntries(Object.entries(allErrors).map(([key, entries]) => [key, entries.length]));
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForFunction((duration) => performance.now() >= duration, conditions.observationWindowMs, { timeout: 60000 });
    const measured = await page.evaluate(() => ({
      ...window.__readabilityMetrics,
      observationEndedAtMs: performance.now(),
      fontStatus: document.fonts.status,
      bodyFont: getComputedStyle(document.body).fontFamily,
      openingState: document.documentElement.dataset.intro,
      openingPhase: document.querySelector(".site-opening")?.dataset.phase ?? null,
      resourceTiming: performance.getEntriesByType("resource").map((entry) => ({ name: entry.name, initiatorType: entry.initiatorType, startTime: entry.startTime, duration: entry.duration, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize })),
      navigation: performance.getEntriesByType("navigation")[0]?.toJSON(),
    }));
    const resourceRows = [...requests.values()];
    const errors = Object.fromEntries(Object.entries(allErrors).map(([key, entries]) => [key, entries.slice(errorOffsets[key])]));
    report.performance.push({ cache, conditions, ...measured, localLcpMs: measured.lcp.at(-1)?.startTime ?? null, localClsMaxSession: measured.cls, inpField: "UNKNOWN", networkEncodedBytes: resourceRows.reduce((total, row) => total + row.encodedDataLength, 0), networkRows: resourceRows, errors });
  }
  await context.close();
}

try {
  for (const locale of ["ja", "en"]) {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      await captureVisual(locale, viewport);
    }
  }
  if (captureMode === "all") await capturePerformance();
  report.identityAfter = await sourceIdentity();
  report.sourceUnchangedDuringCapture = report.identity.sourceDigestSha256 === report.identityAfter.sourceDigestSha256;
  report.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(output, "record.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({ phase, output, screenshots: report.screenshots.filter((item) => item.filename).length, sourceUnchangedDuringCapture: report.sourceUnchangedDuringCapture, performance: report.performance.map(({ cache, localLcpMs, localClsMaxSession, networkEncodedBytes, fontStatus, openingState }) => ({ cache, localLcpMs, localClsMaxSession, networkEncodedBytes, fontStatus, openingState })) }, null, 2));
} catch (error) {
  report.error = { message: error.message, stack: error.stack };
  await fs.writeFile(path.join(output, "partial-record.json"), JSON.stringify(report, null, 2) + "\n");
  throw error;
} finally {
  await browser.close();
}
