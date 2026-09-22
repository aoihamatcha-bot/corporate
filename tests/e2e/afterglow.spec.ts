import { test, expect } from "@playwright/test";

test("all authored text has a decorative color layer with readable sources in both languages", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/about",
    "/business",
    "/company",
    "/news",
    "/contact",
    "/privacy",
    "/missing-page",
    "/en",
    "/en/about",
    "/en/business",
    "/en/company",
    "/en/news",
    "/en/contact",
    "/en/privacy",
    "/en/missing-page",
  ]) {
    await page.goto(route);
    if (route === "/" || route === "/en") {
      // Opening deliberately conceals page content while its modal is active.
      // Check normal reading only after that retained lifecycle has completed.
      await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
      await expect(page.locator(".site-opening")).not.toBeVisible();
    }
    const uncovered = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      const missing: string[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim()) continue;
        const parent = node.parentElement!;
        // Hero copy, its capabilities and its cue use the same authored-text
        // wrappers. Native input content and inaccessible decoration stay exempt.
        if (
          parent.closest(
            ".reveal-source, .menu-ink-base, script, style, input, textarea, option, .sr-only, [aria-hidden='true'], nextjs-portal",
          )
        )
          continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        if (range.getBoundingClientRect().width > 0)
          missing.push(node.textContent.trim());
      }
      return missing;
    });
    expect(uncovered, route).toEqual([]);
    const colorText = await page
      .locator('.reveal-text:not([data-motion-kind="heading"])')
      .evaluateAll((elements) =>
        elements
          .filter((el) => !el.closest('[aria-hidden="true"], dialog:not([open])'))
          .map((el) => {
            const source = el.querySelector(".reveal-source")!;
            const overlay = el.querySelector(".reveal-color")!;
            const style = getComputedStyle(source);
            const rootStyle = getComputedStyle(el);
            return {
              text: source.textContent,
              kind: el.getAttribute("data-motion-kind"),
              motion: el.getAttribute("data-text-motion"),
              opacity: style.opacity,
              visibility: style.visibility,
              clipPath: style.clipPath,
              mask: style.maskImage,
              transform: style.transform,
              rootClipPath: rootStyle.clipPath,
              rootMask: rootStyle.maskImage,
              rootTransform: rootStyle.transform,
              rootAnimations: el.getAnimations().length,
              sourceAnimations: source.getAnimations().length,
              overlays: el.querySelectorAll(".reveal-color").length,
              overlayHidden: overlay.getAttribute("aria-hidden"),
              overlayText: overlay.getAttribute("data-text"),
              gradient: getComputedStyle(overlay, "::before").backgroundImage,
              bands: el.querySelectorAll(".reveal-bands, .reveal-band").length,
              animations: overlay.getAnimations().map((animation) => {
                const timing = animation.effect!.getComputedTiming();
                const frames = (animation.effect as KeyframeEffect).getKeyframes();
                return {
                  finite: Number.isFinite(Number(timing.endTime)),
                  iterations: timing.iterations,
                  duration: Number(timing.duration),
                  colorOnly: frames.every((frame) =>
                    !["clipPath", "maskImage", "transform", "translate", "backgroundPosition"].some(
                      (property) => property in frame,
                    ),
                  ),
                };
              }),
            };
          }),
      );
    expect(colorText.length, route).toBeGreaterThan(0);
    expect(colorText.some((entry) => entry.kind === "body"), route).toBe(true);
    for (const entry of colorText) {
      expect(entry.text, route).toBeTruthy();
      expect(entry, `${route}: ${entry.text}`).toMatchObject({
        motion: "color",
        opacity: "1",
        visibility: "visible",
        clipPath: "none",
        mask: "none",
        transform: "none",
        rootClipPath: "none",
        rootMask: "none",
        rootTransform: "none",
        rootAnimations: 0,
        sourceAnimations: 0,
        overlays: 1,
        overlayHidden: "true",
        overlayText: entry.text,
        bands: 0,
      });
      expect(entry.gradient, `${route}: ${entry.text}`).toContain("linear-gradient");
      for (const animation of entry.animations) {
        expect(animation).toMatchObject({ finite: true, iterations: 1, colorOnly: true });
        expect(animation.duration).toBeGreaterThan(0);
      }
    }
  }
});

test("body color appears and finishes while its source stays readable and stationary", async ({ page }) => {
  await page.goto("/about");
  const body = page.locator('.page-description [data-motion-kind="body"]');
  await body.scrollIntoViewIfNeeded();
  await expect(body).toHaveAttribute("data-reveal-state", "running");
  const result = await body.evaluate(async (el) => {
    const source = el.querySelector(".reveal-source")!;
    const overlay = el.querySelector(".reveal-color")!;
    const animations = overlay.getAnimations();
    const animation = animations[0];
    const timing = animation.effect!.getComputedTiming();
    const frames = (animation.effect as KeyframeEffect).getKeyframes();
    const initial = source.getBoundingClientRect();
    const failures: string[] = [];
    let samples = 0;
    let maxColorOpacity = 0;
    let raf = 0;
    const sample = () => {
      samples++;
      const style = getComputedStyle(source);
      const bounds = source.getBoundingClientRect();
      if (style.opacity !== "1" || style.visibility !== "visible") failures.push("hidden source");
      if (style.clipPath !== "none" || style.maskImage !== "none") failures.push("masked source");
      if (source.getAnimations().length || el.getAnimations().length) failures.push("animated source or root");
      if (Math.abs(bounds.x - initial.x) > 0.5 || Math.abs(bounds.y - initial.y) > 0.5) failures.push("moving source");
      maxColorOpacity = Math.max(maxColorOpacity, Number(getComputedStyle(overlay).opacity));
      raf = requestAnimationFrame(sample);
    };
    sample();
    await animation.finished;
    cancelAnimationFrame(raf);
    return {
      animations: animations.length,
      finite: Number.isFinite(Number(timing.endTime)),
      iterations: timing.iterations,
      opacityFrames: frames.map((frame) => Number(frame.opacity)),
      samples,
      maxColorOpacity,
      failures,
    };
  });
  expect(result).toMatchObject({ animations: 1, finite: true, iterations: 1, failures: [] });
  expect(result.opacityFrames).toEqual([0, 1, 1, 0]);
  expect(result.samples).toBeGreaterThan(1);
  expect(result.maxColorOpacity).toBeGreaterThan(0.95);
  await expect(body).toHaveAttribute("data-reveal-state", "settled");
  await expect(body.locator(".reveal-color")).toHaveCSS("opacity", "0");
  await expect(body.locator(".reveal-source")).toBeVisible();
});

test("all menu text receives finite color effects that restart without masking navigation", async ({ page }) => {
  for (const prefix of ["", "/en"]) {
    await page.goto(`${prefix}/about`);
    const open = page.getByRole("button", { name: prefix ? "Open menu" : "メニューを開く" });
    await open.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.locator('.nav-en[data-text-motion="color"]')).toHaveCount(6);
    await expect(dialog.locator('.nav-number .menu-ink[data-text-motion="color"]')).toHaveCount(6);
    await expect(dialog.locator('.nav-ja .menu-ink[data-text-motion="color"]')).toHaveCount(prefix ? 0 : 6);
    await expect(dialog.locator('.close-trigger .menu-ink[data-text-motion="color"]')).toHaveCount(1);
    await expect(dialog.locator('.language-options .menu-ink[data-text-motion="color"]')).toHaveCount(2);
    await expect(dialog.locator('.nav-aux .menu-ink[data-text-motion="color"]')).toHaveCount(1);
    await expect(dialog.locator('.nav-bottom .menu-ink[data-text-motion="color"]')).toHaveCount(2);
    await expect(dialog.locator(".menu-ink-wipe, .menu-ink-band, .motion-control")).toHaveCount(0);
    await expect(dialog.locator(`.nav-aux a[href="${prefix}/privacy"]`)).toHaveAccessibleName(prefix ? "Privacy policy" : "プライバシーポリシー");
    const menu = await dialog.locator(".menu-ink").evaluateAll((elements) =>
      elements.map((el) => {
        const source = el.querySelector(".menu-ink-base")!;
        const overlay = el.querySelector(".menu-ink-color")!;
        const style = getComputedStyle(source);
        return {
          visible: source.getClientRects().length > 0,
          motion: el.getAttribute("data-text-motion"),
          text: source.textContent,
          overlayText: overlay.getAttribute("data-text"),
          overlays: el.querySelectorAll(".menu-ink-color").length,
          overlayHidden: overlay.getAttribute("aria-hidden"),
          gradient: getComputedStyle(overlay, "::before").backgroundImage,
          opacity: style.opacity,
          visibility: style.visibility,
          clipPath: style.clipPath,
          mask: style.maskImage,
          transform: style.transform,
          rootAnimations: el.getAnimations().length,
          sourceAnimations: source.getAnimations().length,
          animations: overlay.getAnimations().map((animation) => {
            const timing = animation.effect!.getComputedTiming();
            return {
              finite: Number.isFinite(Number(timing.endTime)),
              iterations: timing.iterations,
              duration: Number(timing.duration),
              backgroundMotion: (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "backgroundPosition" in frame),
            };
          }),
        };
      }),
    );
    for (const entry of menu) {
      expect(entry).toMatchObject({ motion: "color", overlays: 1, overlayHidden: "true", overlayText: entry.text, opacity: "1", visibility: "visible", clipPath: "none", mask: "none", transform: "none", rootAnimations: 0, sourceAnimations: 0 });
      expect(entry.gradient).toContain("linear-gradient");
      if (entry.visible) expect(entry.animations).toHaveLength(2);
      for (const animation of entry.animations) {
        expect(animation).toMatchObject({ finite: true, iterations: 1, backgroundMotion: false });
        expect(animation.duration).toBeGreaterThan(0);
      }
    }
    const closeColor = dialog.locator(".close-trigger .menu-ink-color");
    const previous = await closeColor.evaluateHandle((el) => el.getAnimations()[0]);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await open.click();
    const restart = await closeColor.evaluate((el, old) => {
      const animations = el.getAnimations();
      return {
        count: animations.length,
        renewed: animations.every((animation) => animation !== old),
        running: animations.some((animation) => animation.playState === "running"),
      };
    }, previous);
    expect(restart).toEqual({ count: 2, renewed: true, running: true });
    await previous.dispose();
    // Filled CSS effects remain after completion; completion is finite even
    // though getAnimations() retains these finished objects.
    await closeColor.evaluate(async (el) => {
      await Promise.all(el.getAnimations().map((animation) => animation.finished));
    });
    await expect(closeColor).toHaveCSS("opacity", "0");
    await expect(dialog.locator(".close-trigger .menu-ink-base")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  }
});

test("heading color outlasts its decorative band and then fades", async ({
  page,
}) => {
  await page.goto("/");
  const title = page.locator("#about .wonder-type > .reveal-text");
  await expect(title).toHaveCount(1);
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute("data-reveal-state", "running");
  const envelope = await title.evaluate((el) => {
    const overlay = el.querySelector(".reveal-color")!;
    const glow = overlay
      .getAnimations()
      .find(
        (a) =>
          a.effect instanceof KeyframeEffect &&
          a.effect
            .getKeyframes()
            .some((frame) => frame.opacity === 0 || frame.opacity === "0"),
      )!;
    const effect = glow.effect as KeyframeEffect;
    const timing = effect.getTiming();
    const frames = effect.getKeyframes();
    const plateau = frames[1].computedOffset! * Number(timing.duration);
    const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
      band.getAnimations(),
    );
    const bandEnd = Math.max(
      ...bands.map((a) => Number(a.effect!.getComputedTiming().endTime)),
    );
    return {
      delay: Number(timing.delay),
      duration: Number(timing.duration),
      holdAfterBand: Number(timing.delay) + plateau - bandEnd,
      fade: Number(timing.duration) - plateau,
    };
  });
  expect(envelope.holdAfterBand).toBeGreaterThanOrEqual(400);
  expect(envelope.holdAfterBand).toBeLessThanOrEqual(600);
  expect(envelope.fade).toBeGreaterThanOrEqual(1000);
  // The timing envelope above proves the hold is 400–600ms. Sample after both
  // decorative layers finish, using their actual completion instead of a sleep.
  const sample = await title.evaluate(async (el) => {
    const background = el.closest(".scene")!.querySelector(".color-echo")!;
    const backgroundFinished = Promise.all(
      background.getAnimations().map((animation) => animation.finished),
    );
    const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
      band.getAnimations(),
    );
    await Promise.all([
      ...bands.map((animation) => animation.finished),
      backgroundFinished,
    ]);
    return {
      color: Number(
        getComputedStyle(el.querySelector(".reveal-color")!).opacity,
      ),
      background: getComputedStyle(background).opacity,
    };
  });
  expect(sample.background).toBe("0");
  expect(sample.color).toBeGreaterThan(0.95);
  await expect(title).toHaveAttribute("data-reveal-state", "settled");
  await expect(title.locator(".reveal-source")).toHaveCSS(
    "color",
    "rgb(20, 25, 31)",
  );
});

test("heading and band palettes stay fixed across random seeds while the hero stays still", async ({
  browser,
}) => {
  const colors: string[] = [];
  // Image effects may choose palettes randomly. Text and section backgrounds
  // retain their authored palettes at either end of that range.
  for (const seed of [0.01, 0.99]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await context.addInitScript((value) => {
      Math.random = () => value;
    }, seed);
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:3017/");
    const heroLines = page.locator(".hero h1 .reveal-text");
    await expect(heroLines).toHaveCount(2);
    await expect(heroLines.nth(0)).toHaveAttribute("data-entered", "true");
    await expect(heroLines.nth(1)).toHaveAttribute("data-entered", "true");
    await expect(page.locator(".site-opening")).not.toBeVisible();
    expect(
      await heroLines.evaluateAll((elements) => elements.map((el) => el.getAnimations({ subtree: true }).length)),
    ).toEqual([0, 0]);
    await expect(heroLines.locator(".reveal-band")).toHaveCount(0);
    await expect(heroLines.nth(0)).toHaveAttribute("data-palette", "sky");
    await expect(heroLines.nth(1)).toHaveAttribute("data-palette", "iris");
    const heroSources = await page.locator(".hero .reveal-source").evaluateAll((elements) =>
      elements.map((el) => ({
        gradient: getComputedStyle(el).backgroundImage,
        clipPath: getComputedStyle(el).clipPath,
        animations: el.getAnimations().length,
      })),
    );
    expect(heroSources.length).toBeGreaterThan(2);
    for (const source of heroSources) {
      expect(source.gradient).toContain("linear-gradient");
      expect(source.clipPath).toBe("none");
      expect(source.animations).toBe(0);
    }
    const philosophy = page.locator("#about .wonder-type > .reveal-text");
    await expect(philosophy).toHaveCount(1);
    await philosophy.scrollIntoViewIfNeeded();
    await expect(philosophy).toHaveAttribute("data-entered", "true");
    await expect(philosophy).toHaveAttribute("data-reveal-state", "running");
    await expect(page.locator("#about")).toHaveAttribute("data-palette", "sky");
    await expect(page.locator("#business")).toHaveAttribute("data-palette", "iris");
    colors.push((await philosophy.getAttribute("data-palette"))!);
    const bandPalettes = await philosophy.locator(".reveal-band").evaluateAll((elements) => elements.map((el) => el.getAttribute("data-palette")));
    expect(bandPalettes.length).toBeGreaterThan(0);
    expect(bandPalettes.every((palette) => palette === "sky")).toBe(true);
    await expect(philosophy).toHaveAttribute("data-reveal-state", "settled");
    await expect(philosophy.locator(".reveal-band")).toHaveCount(0);
    await expect(philosophy.locator(".reveal-source")).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  }
  expect(colors).toEqual(["sky", "sky"]);
});
