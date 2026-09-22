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
    await expect(target).toHaveAttribute("data-text-motion", "static");
    await expect(target).not.toHaveAttribute("data-entered");
    await expect(target).not.toHaveAttribute("data-reveal-state");
    await expect(
      target.locator(".reveal-band, .reveal-bands, .reveal-color"),
    ).toHaveCount(0);
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
        animations: el.getAnimations({ subtree: true }).length,
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
  await target.scrollIntoViewIfNeeded();
  await expect(target).toBeInViewport();
  await assertReadableBody();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await target.scrollIntoViewIfNeeded();
  await assertReadableBody();
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
      dialog.locator(".menu-ink-color, .nav-en-color, .menu-ink-band"),
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
            animations: el.getAnimations({ subtree: true }).length,
          };
        }),
    );
    expect(labels.length).toBeGreaterThan(6);
    for (const label of labels) {
      expect(label.text).toBeTruthy();
      expect(label).toMatchObject({
        motion: "static",
        opacity: "1",
        clipPath: "none",
        mask: "none",
        visibility: "visible",
        animations: 0,
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
