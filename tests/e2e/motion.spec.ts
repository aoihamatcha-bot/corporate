import { test, expect } from "@playwright/test";

test("text below the viewport keeps its entrance until visible, then settles to black once", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 420 });
  await page.goto("/");
  const target = page.locator("#about .prose p").last().locator(".reveal-text");
  await page
    .locator("#about")
    .evaluate((el) =>
      el.scrollIntoView({ block: "start", behavior: "instant" }),
    );
  await expect(page.locator("#about")).toHaveClass(/scene-entered/);
  expect(
    await target.evaluate((el) => el.getBoundingClientRect().top > innerHeight),
  ).toBe(true);
  await expect(target).not.toHaveAttribute("data-entered", "true");
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-entered", "true");
  await expect(target).toHaveAttribute("data-reveal-state", "running");
  const bands = await target.locator(".reveal-band").evaluateAll((elements) =>
    elements.map((el) => ({
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
      gradient: getComputedStyle(el).backgroundImage,
      animated: el.getAnimations().length > 0,
    })),
  );
  expect(bands.length).toBeGreaterThan(1);
  expect(
    await target
      .locator(".reveal-source")
      .evaluate((el) =>
        el
          .getAnimations()
          .some((animation) =>
            animation.effect instanceof KeyframeEffect && animation.effect
              .getKeyframes()
              .some(
                (frame) => frame.clipPath && frame.clipPath !== "inset(0px)",
              ),
          ),
      ),
  ).toBe(true);
  expect(
    bands.every(
      (band) =>
        band.width > 0 &&
        band.height > 0 &&
        band.gradient.includes("linear-gradient") &&
        band.animated,
    ),
  ).toBe(true);
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  await expect(target.locator(".reveal-band")).toHaveCount(0);
  expect(
    await target
      .locator(".reveal-color")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("0");
  expect(
    await target
      .locator(".reveal-source")
      .evaluate((el) => getComputedStyle(el).color),
  ).toBe("rgb(20, 25, 31)");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-reveal-state", "settled");
  expect(
    await target.evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("opening the menu starts two color curtains and separate text wipes, then clears them", async ({
  page,
}) => {
  await page.goto("/");
  for (let opening = 0; opening < 2; opening++) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    const animations = await page.getByRole("dialog").evaluate((el) =>
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
    expect(
      animations.some((a) => a.name === "type-band" && a.state === "running"),
    ).toBe(true);
    expect(
      animations.some(
        (a) => a.name === "nav-ink-settle" && a.state === "running",
      ),
    ).toBe(true);
    const ink = page.locator(".nav-en-color").last();
    await expect
      .poll(() => ink.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("0");
    expect(
      await page
        .locator(".nav-en-base")
        .first()
        .evaluate((el) => getComputedStyle(el).color),
    ).toBe("rgb(20, 25, 31)");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

test("image interactions show four distinct gradients for keyboard and retain the same image", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const link = page.locator(".business-preview > a").first();
  const image = link.locator(".gradient-image");
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("data-entered", "true");
  await expect(image).toHaveAttribute("data-image-state", "settled");
  const source = await image.locator("img").getAttribute("src");
  const colors = [];
  for (let i = 0; i < 4; i++) {
    await link.focus();
    await expect(image).toHaveAttribute("data-image-state", "hover");
    colors.push(
      await image
        .locator(".image-wash")
        .evaluate((el) => getComputedStyle(el).backgroundImage),
    );
    await link.evaluate((el) => el.blur());
    await expect
      .poll(() =>
        image
          .locator(".image-wash")
          .evaluate((el) => getComputedStyle(el).opacity),
      )
      .toBe("0");
  }
  expect(new Set(colors).size).toBe(4);
  expect(await image.locator("img").getAttribute("src")).toBe(source);
  await expect(image.locator("i")).toHaveCount(3);
  if (!isMobile) {
    await link.hover();
    await expect(image).toHaveAttribute("data-image-state", "hover");
    await page.mouse.move(5, 5);
    await expect
      .poll(() =>
        image
          .locator(".image-wash")
          .evaluate((el) => getComputedStyle(el).opacity),
      )
      .toBe("0");
  }
});

test("pausing during the entrance clears decorative bands and images without hiding copy", async ({
  page,
}) => {
  await page.goto("/");
  const target = page.locator(".wonder-type > .reveal-text").first();
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-reveal-state", "running");
  await page.getByRole("button", { name: "動きを止める", exact: true }).click();
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
  await page.getByRole("button", { name: /動きを再生する/ }).click();
  const image = page.locator(".business-visual").first();
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("data-entered", "true");
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
  const target = page.locator(".wonder-type > .reveal-text").first();
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
