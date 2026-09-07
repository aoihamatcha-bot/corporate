import { test, expect } from "@playwright/test";

test("all authored visible text has a gradient layer, including small labels and menu copy", async ({
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
        // Native select choices and assistive-only/icon text are deliberately
        // left native. The rest includes notices, table values and form labels.
        if (
          parent.closest(
            ".reveal-source, .menu-ink-base, script, style, option, .sr-only, [aria-hidden='true'], nextjs-portal",
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
  await page.getByRole("button", { name: "メニューを開く" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".nav-ja .menu-ink-color")).toHaveCount(6);
  await expect(dialog.locator(".nav-number .menu-ink-color")).toHaveCount(6);
  await expect(dialog.locator(".nav-aux .menu-ink-color")).toHaveCount(2);
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
  expect(envelope.holdAfterBand).toBeGreaterThanOrEqual(1500);
  expect(envelope.holdAfterBand).toBeLessThanOrEqual(2200);
  expect(envelope.fade).toBeGreaterThanOrEqual(1000);
  // Real elapsed time: the section background is gone but the headline is
  // still fully colored. No seeking or freezing is used for this assertion.
  await expect
    .poll(() =>
      page
        .locator(".wonder-section .color-echo")
        .evaluate((el) => el.getAnimations().some((animation) => animation.playState === "finished") && getComputedStyle(el).opacity === "0"),
    )
    .toBe(true);
  await page.waitForTimeout(600);
  expect(
    Number(
      await title
        .locator(".reveal-color")
        .evaluate((el) => getComputedStyle(el).opacity),
    ),
  ).toBeGreaterThan(0.95);
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

test("reload can select a different headline palette without server hydration mismatch", async ({
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
    colors.push((await title.getAttribute("data-palette"))!);
    const bandPalette = await title
      .locator(".reveal-band")
      .first()
      .getAttribute("data-palette");
    expect(bandPalette).not.toBe(colors.at(-1));
    expect(errors).toEqual([]);
    await context.close();
  }
  expect(new Set(colors).size).toBe(2);
});
