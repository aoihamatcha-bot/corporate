import { test, expect } from "@playwright/test";

test("body, labels and navigation use readable static text across both languages", async ({
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
        // Retain coverage of authored copy. RevealText sources now include
        // static body/labels as well as the separate animated heading sources.
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
    const staticText = await page
      .locator('.reveal-text:not([data-motion-kind="heading"])')
      .evaluateAll((elements) =>
        elements
          .filter((el) => !el.closest('[aria-hidden="true"], dialog:not([open])'))
          .map((el) => {
            const source = el.querySelector(".reveal-source")!;
            const style = getComputedStyle(source);
            return {
              text: source.textContent?.trim(),
              kind: el.getAttribute("data-motion-kind"),
              motion: el.getAttribute("data-text-motion"),
              opacity: style.opacity,
              visibility: style.visibility,
              clipPath: style.clipPath,
              mask: style.maskImage,
              decorations: el.querySelectorAll(
                ".reveal-color, .reveal-bands, .reveal-band",
              ).length,
              animations: el.getAnimations({ subtree: true }).length,
            };
          }),
      );
    expect(staticText.length, route).toBeGreaterThan(0);
    expect(staticText.some((entry) => entry.kind === "body"), route).toBe(true);
    for (const entry of staticText) {
      expect(entry.text, route).toBeTruthy();
      expect(entry, `${route}: ${entry.text}`).toMatchObject({
        motion: "static",
        opacity: "1",
        visibility: "visible",
        clipPath: "none",
        mask: "none",
        decorations: 0,
        animations: 0,
      });
    }
  }
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.locator(".menu-ink-color, .nav-en-color, .menu-ink-band"),
  ).toHaveCount(0);
  await expect(
    dialog.locator('.nav-ja .menu-ink[data-text-motion="static"]'),
  ).toHaveCount(6);
  await expect(
    dialog.locator('.nav-number .menu-ink[data-text-motion="static"]'),
  ).toHaveCount(6);
  await expect(
    dialog.locator('.nav-en[data-text-motion="static"]'),
  ).toHaveCount(6);
  // The requested removal of the motion toggle leaves the privacy link.
  await expect(
    dialog.locator('.nav-aux .menu-ink[data-text-motion="static"]'),
  ).toHaveCount(1);
  await expect(
    dialog.locator('.nav-aux a[href="/privacy"]'),
  ).toHaveAccessibleName("プライバシーポリシー");
  await expect(
    dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-base'),
  ).toHaveText("プライバシーポリシー");
  await expect(dialog.locator(".motion-control")).toHaveCount(0);
});

test("heading color outlasts its decorative band and fades while menu labels stay static", async ({
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
  await page.getByRole("button", { name: "メニューを開く" }).click();
  const menu = await page.getByRole("dialog").locator(".nav-en").evaluateAll((elements) =>
    elements.map((el) => {
      const style = getComputedStyle(el.querySelector(".nav-en-base")!);
      return { motion: el.getAttribute("data-text-motion"), opacity: style.opacity, clipPath: style.clipPath, animations: el.getAnimations({ subtree: true }).length };
    }),
  );
  expect(menu).toHaveLength(6);
  expect(menu).toEqual(Array.from({ length: 6 }, () => ({ motion: "static", opacity: "1", clipPath: "none", animations: 0 })));
});

test("heading and band palettes stay fixed across random seeds while the hero stays still", async ({
  browser,
}) => {
  const colors: string[] = [];
  // Scene and image effects may still choose palettes randomly. Headings and
  // their bands must keep their authored palettes at either end of that range.
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
    const philosophy = page.locator("#about .wonder-type > .reveal-text");
    await expect(philosophy).toHaveCount(1);
    await philosophy.scrollIntoViewIfNeeded();
    await expect(philosophy).toHaveAttribute("data-entered", "true");
    await expect(philosophy).toHaveAttribute("data-reveal-state", "running");
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
