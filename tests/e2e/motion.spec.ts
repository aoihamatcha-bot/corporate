import { test, expect } from "@playwright/test";

test("body text is readable without masks before entering the viewport and after scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 420 });
  await page.goto("/");
  const target = page.locator(
    '#about .prose p .reveal-text[data-motion-kind="body"]',
  );
  await expect(target).toHaveCount(1);
  expect(
    await target.evaluate((el) => el.getBoundingClientRect().top > innerHeight),
  ).toBe(true);
  const assertReadableBody = async () => {
    await expect(target).toHaveAttribute("data-text-motion", "color");
    await expect(
      target.locator(".reveal-band, .reveal-bands"),
    ).toHaveCount(0);
    await expect(target.locator(".reveal-color")).toHaveCount(1);
    await expect(target.locator(".reveal-color")).toHaveAttribute("aria-hidden", "true");
    await expect(target.locator(".reveal-source")).toBeVisible();
    const state = await target.evaluate((el) => {
      const source = el.querySelector(".reveal-source")!;
      const style = getComputedStyle(source);
      const hiddenAncestors: string[] = [];
      for (let node = source.parentElement; node; node = node.parentElement) {
        const ancestor = getComputedStyle(node);
        if (
          ancestor.opacity !== "1" ||
          ancestor.visibility !== "visible" ||
          ancestor.clipPath !== "none"
        )
          hiddenAncestors.push(node.className);
      }
      return {
        opacity: style.opacity,
        clipPath: style.clipPath,
        mask: style.maskImage,
        animations: el.getAnimations().length + source.getAnimations().length,
        hiddenAncestors,
      };
    });
    expect(state).toEqual({
      opacity: "1",
      clipPath: "none",
      mask: "none",
      animations: 0,
      hiddenAncestors: [],
    });
  };
  await assertReadableBody();
  await expect(target).not.toHaveAttribute("data-entered");
  await target.scrollIntoViewIfNeeded();
  await expect(target).toBeInViewport();
  await expect(target).toHaveAttribute("data-reveal-state", "running");
  await assertReadableBody();
  const color = await target.evaluate((el) => {
    const overlay = el.querySelector(".reveal-color")!;
    const animation = overlay.getAnimations()[0];
    const effect = animation.effect as KeyframeEffect;
    const timing = effect.getTiming();
    const frames = effect.getKeyframes();
    // Sample the real effect in its full-color plateau, without sleeping.
    animation.pause();
    animation.currentTime = Number(timing.delay) +
      (frames[1].computedOffset! + frames[2].computedOffset!) / 2 * Number(timing.duration);
    const result = {
      opacity: getComputedStyle(overlay).opacity,
      gradient: getComputedStyle(overlay, "::before").backgroundImage,
      duration: Number(timing.duration),
      iterations: timing.iterations,
      sourceTransform: getComputedStyle(el.querySelector(".reveal-source")!).transform,
    };
    animation.play();
    return result;
  });
  expect(color.opacity).toBe("1");
  expect(color.gradient).toContain("linear-gradient");
  expect(color.duration).toBeGreaterThanOrEqual(2000);
  expect(color.duration).toBeLessThanOrEqual(3500);
  expect(color.iterations).toBe(1);
  expect(color.sourceTransform).toBe("none");
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  await expect(target.locator(".reveal-color")).toHaveCSS("opacity", "0");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await target.scrollIntoViewIfNeeded();
  await assertReadableBody();
  expect(await target.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
});

test("menu curtains animate behind immediately readable navigation text on each opening", async ({
  page,
}) => {
  await page.goto("/");
  for (let opening = 0; opening < 2; opening++) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    const dialog = page.getByRole("dialog");
    const animations = await dialog.evaluate((el) =>
      el.getAnimations({ subtree: true }).map((a) => ({
        name: (a as CSSAnimation).animationName,
        state: a.playState,
      })),
    );
    expect(
      animations.filter(
        (a) => a.name === "curtain-pass" && a.state === "running",
      ),
    ).toHaveLength(2);
    await expect(
      dialog.locator(".menu-ink-band"),
    ).toHaveCount(0);
    const labels = await dialog.locator(".menu-ink").evaluateAll((elements) =>
      elements
        .filter((el) => !el.closest('[aria-hidden="true"]'))
        .map((el) => {
          const source = el.querySelector(".menu-ink-base")!;
          const style = getComputedStyle(source);
          return {
            text: source.textContent?.trim(),
            motion: el.getAttribute("data-text-motion"),
            opacity: style.opacity,
            clipPath: style.clipPath,
            mask: style.maskImage,
            visibility: style.visibility,
            animations: el.getAnimations().length + source.getAnimations().length,
            colorLayers: el.querySelectorAll('.menu-ink-color[aria-hidden="true"]').length,
          };
        }),
    );
    expect(labels.length).toBeGreaterThan(6);
    for (const label of labels) {
      expect(label.text).toBeTruthy();
      expect(label).toMatchObject({
        motion: "color",
        opacity: "1",
        clipPath: "none",
        mask: "none",
        visibility: "visible",
        animations: 0,
        colorLayers: 1,
      });
    }
    await expect(dialog.locator(".nav-en-base")).toHaveCount(6);
    await expect(
      dialog.locator('.nav-layout nav a[href="/business"] .nav-en-base'),
    ).toHaveText("Business");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

test("pausing during the entrance clears decorative bands and images without hiding copy", async ({
  page,
}) => {
  await page.goto("/");
  const target = page.locator("#about .wonder-type > .reveal-text");
  await expect(target).toHaveCount(1);
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-reveal-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  await expect(target.locator(".reveal-band")).toHaveCount(0);
  expect(
    await target
      .locator(".reveal-source")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  expect(
    await target.evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page.getByRole("button", { name: "メニューを開く" }).click();
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const image = page.locator(".business-visual").first();
  await image.scrollIntoViewIfNeeded();
  await expect(image).not.toHaveAttribute("data-entered", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      image.evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBe(0);
  await expect(image.locator("img")).toBeVisible();
});

test("resize and a partially failing animation API cannot strand a colored cover", async ({
  page,
}) => {
  await page.goto("/");
  const target = page.locator("#about .wonder-type > .reveal-text");
  await expect(target).toHaveCount(1);
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-reveal-state", "running");
  await page.setViewportSize({ width: 360, height: 640 });
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  await expect(target.locator(".reveal-band")).toHaveCount(0);
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    let calls = 0;
    Element.prototype.animate = function (...args: Parameters<typeof animate>) {
      if (++calls % 2 === 0)
        throw new Error("Synthetic partial animation failure");
      return animate.apply(this, args);
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.reload();
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  await expect(target.locator(".reveal-band")).toHaveCount(0);
  expect(await target.evaluate((el) => getComputedStyle(el).transform)).toBe(
    "none",
  );
  await expect(target.locator(".reveal-source")).toBeVisible();
  expect(errors).toEqual([]);
});
