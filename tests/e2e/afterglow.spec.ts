import { test, expect } from "@playwright/test";

test("authored text retains gradients except the intentionally static hero band and scroll cue", async ({
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
        // The HERO band and cue are intentionally static in v4. All other
        // authored copy retains the original gradient-layer coverage.
        if (
          parent.closest(
            ".reveal-source, .menu-ink-base, script, style, option, .sr-only, [aria-hidden='true'], nextjs-portal, .hero[data-motion-static] .hero-capabilities, .hero[data-motion-static] .hero-scroll-cue",
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
  }
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".nav-ja .menu-ink-color")).toHaveCount(6);
  await expect(dialog.locator(".nav-number .menu-ink-color")).toHaveCount(6);
  // The requested removal of the motion toggle leaves the privacy link.
  await expect(dialog.locator(".nav-aux .menu-ink-color")).toHaveCount(1);
  await expect(
    dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-color'),
  ).toHaveAttribute("data-text", "プライバシーポリシー");
  await expect(
    dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-base'),
  ).toHaveText("プライバシーポリシー");
  await expect(dialog.locator(".motion-control")).toHaveCount(0);
});

test("independent text rhythms keep color after the background passes, then fade slowly to black", async ({
  page,
}) => {
  await page.goto("/");
  const title = page.locator(".wonder-type > .reveal-text").first();
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
  // Sample at least 400ms after the last band, once the scene echo finishes.
  // Near-zero opacity in the echo's final frame is still an active animation.
  // These animations run in real time; no seeking or freezing is used.
  const sample = await title.evaluate(async (el) => {
    const background = el.closest(".scene")!.querySelector(".color-echo")!;
    const backgroundFinished = Promise.all(
      background.getAnimations().map((animation) => animation.finished),
    );
    const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
      band.getAnimations(),
    );
    await Promise.all(bands.map((animation) => animation.finished));
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 400)),
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
  await page.getByRole("button", { name: "メニューを開く" }).click();
  const menu = await page.locator(".nav-en-color").evaluateAll((elements) =>
    elements.map((el) => {
      const style = getComputedStyle(el);
      return { duration: style.animationDuration, delay: style.animationDelay };
    }),
  );
  expect(new Set(menu.map((m) => m.delay)).size).toBeGreaterThanOrEqual(4);
  expect(new Set(menu.map((m) => m.duration)).size).toBeGreaterThanOrEqual(4);
});

test("scrolled headings vary palettes without hydration mismatch while the hero stays still", async ({
  browser,
}) => {
  const colors: string[] = [];
  // Exercise both ends of the random selector deterministically. This verifies
  // selection behavior without making a flaky claim that random draws differ.
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
    const title = page.locator(".hero h1 .reveal-text").first();
    await expect(title).toHaveAttribute("data-entered", "true");
    await expect(page.locator(".site-opening")).not.toBeVisible();
    expect(
      await title.evaluate((el) => el.getAnimations({ subtree: true }).length),
    ).toBe(0);
    await expect(title.locator(".reveal-band")).toHaveCount(0);
    await expect(title).toHaveAttribute("data-palette", "sky");
    const philosophy = page.locator(".wonder-type > .reveal-text").first();
    await philosophy.scrollIntoViewIfNeeded();
    await expect(philosophy).toHaveAttribute("data-entered", "true");
    colors.push((await philosophy.getAttribute("data-palette"))!);
    const bandPalette = await philosophy
      .locator(".reveal-band")
      .first()
      .getAttribute("data-palette");
    expect(bandPalette).not.toBe(await philosophy.getAttribute("data-palette"));
    expect(errors).toEqual([]);
    await context.close();
  }
  expect(new Set(colors).size).toBe(2);
});
