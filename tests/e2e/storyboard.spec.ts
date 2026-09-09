import { test, expect } from "@playwright/test";

test("opening writes the exact phrase with no ink dots before each pen stroke", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const opening = page.getByRole("dialog", { name: "MYSTENA オープニング" });
  await expect(opening).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-intro", "running");
  await expect(opening.locator(".sr-only")).toHaveText(
    "好奇心が、世界を変える。",
  );
  await expect(opening.locator("button")).toHaveCount(0);
  await expect(page.locator(".motion-control, .opening-skip")).toHaveCount(0);
  await expect(
    page.locator(".hero h1 > .reveal-text").first(),
  ).not.toHaveAttribute("data-entered", "true");
  const strokes = page.locator(".handwriting-stroke");
  expect(await strokes.count()).toBeGreaterThan(40);
  await expect
    .poll(() =>
      strokes.first().evaluate((el) => getComputedStyle(el).strokeDashoffset),
    )
    .toBe("0px");
  // Future strokes are fully transparent masks, including round start caps.
  const future = await strokes.evaluateAll((paths) =>
    paths
      .filter((path) => {
        const animation = path.getAnimations()[0];
        return (
          animation &&
          Number(animation.currentTime) <
            Number(animation.effect!.getTiming().delay)
        );
      })
      .map((path) => getComputedStyle(path).opacity),
  );
  expect(future.length).toBeGreaterThan(20);
  expect(future.every((opacity) => opacity === "0")).toBe(true);
  await strokes
    .last()
    .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  await expect(strokes.last()).toHaveCSS("opacity", "1");
  await expect(strokes.last()).toHaveCSS("stroke-dashoffset", "0px");
  await expect(opening).not.toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  await expect(page.locator(".hero-motion-art")).toHaveAttribute(
    "data-hero-active",
    "false",
  );
  await expect(page.locator(".hero-art img")).toHaveAttribute(
    "src",
    /a08-brand-keyvisual/,
  );
  await expect(page.locator(".hero-video")).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const action of ["Tab", "Escape", "scroll"] as const) {
  test(`opening has no skip UI and releases focus on ${action}`, async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".site-opening")).toBeVisible();
    if (action === "scroll")
      await page.evaluate(() =>
        window.scrollTo({ top: 500, behavior: "instant" }),
      );
    else await page.keyboard.press(action);
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
    await expect(page.locator(".site-opening")).not.toBeVisible();
    await expect(page.locator("#main")).toBeFocused();
    expect(
      await page.evaluate(() => document.querySelector(":modal")),
    ).toBeNull();
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await expect(
      page.getByRole("button", { name: "メニューを閉じる" }),
    ).toBeVisible();
    await expect(page.locator(".motion-control")).toHaveCount(0);
  });
}

test("opening replays on reload and full home navigation in both languages", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.keyboard.press("Escape");
  // A value from the previous first-session-only implementation is ignored.
  await page.evaluate(() =>
    sessionStorage.setItem("mystena-opening-v2", "seen"),
  );
  await page.reload();
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.keyboard.press("Escape");
  for (const path of ["/about", "/", "/en"]) {
    await page.goto(path);
    if (path !== "/about") {
      await expect(page.locator(".site-opening")).toBeVisible();
      await page.keyboard.press("Escape");
    }
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
    await expect(page.locator(".site-opening")).not.toBeVisible();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".motion-control")).toHaveCount(0);
  }
});

test("device preferences and direct anchors work; the removed saved toggle has no effect", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".site-opening")).not.toBeVisible();
  await expect(page.locator(".hero-light")).not.toBeVisible();
  await expect(page.locator(".story-card-media").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#business");
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  await expect(page.locator("#business")).toBeInViewport();
  await page.evaluate(() =>
    localStorage.setItem("mystena-corporate-motion", "paused"),
  );
  await page.goto("/");
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".hero-motion-art")).toHaveAttribute(
    "data-hero-active",
    "false",
  );
});

test("changing reduced motion during the opening releases the native modal", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  expect(
    await page.evaluate(() => document.querySelector(":modal")),
  ).toBeNull();
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await expect(
    page.getByRole("button", { name: "メニューを閉じる" }),
  ).toBeVisible();
});

test("thumbnails wait transparent offscreen, fade and travel on entry, then stay settled", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".site-opening")).not.toBeVisible();
  const card = page.locator(".story-card-media").first();
  await expect(card).not.toHaveAttribute("data-story-entered", "true");
  await expect(card).toHaveCSS("opacity", "0");
  // Moving ink stays inside the reserved image frame, clear of the copy.
  await expect(page.locator(".story-card-frame").first()).toHaveCSS(
    "overflow",
    "clip",
  );
  const frames = await card.evaluate(async (el) => {
    const result: { opacity: number; transform: string; top: number }[] = [];
    el.scrollIntoView({ block: "center", behavior: "instant" });
    const start = performance.now();
    await new Promise<void>((resolve) => {
      function sample() {
        const style = getComputedStyle(el);
        result.push({
          opacity: Number(style.opacity),
          transform: style.transform,
          top: el.getBoundingClientRect().top,
        });
        if (performance.now() - start < 1500) requestAnimationFrame(sample);
        else resolve();
      }
      requestAnimationFrame(sample);
    });
    return result;
  });
  expect(
    frames.some(
      (frame) =>
        frame.opacity > 0 && frame.opacity < 0.9 && frame.transform !== "none",
    ),
  ).toBe(true);
  await expect(card).toHaveCSS("opacity", "1");
  expect(await card.evaluate((el) => el.getAnimations().length)).toBe(0);
  await expect(page.locator(".story-card-media").last()).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator("#business > .scene-colors")).toHaveCount(1);
  await expect(page.locator("#business > .story-accent")).toBeVisible();
  // Entrance opacity is on the wrapper; the adopted image gradient is hover-only.
  expect(
    await card
      .locator(".gradient-image")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS("opacity", "1");
  expect(await card.evaluate((el) => el.getAnimations().length)).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("an active image fade settles on OS change and a focused waiting card is immediately readable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".site-opening")).not.toBeVisible();
  const card = page.locator(".story-card-media").first();
  await card.scrollIntoViewIfNeeded();
  await expect
    .poll(() => card.evaluate((el) => el.getAnimations().length))
    .toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("opacity", "1");
  await expect
    .poll(() => card.evaluate((el) => el.getAnimations().length))
    .toBe(0);
  await expect(page.locator(".story-card-media").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator("#business > .story-accent")).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const last = page.locator(".story-card-media").last();
  await expect(last).toHaveCSS("opacity", "0");
  await last.evaluate((el) => el.closest("a")!.focus());
  await expect(last).toHaveCSS("opacity", "1");
  expect(await last.evaluate((el) => el.getAnimations().length)).toBe(0);
});

test("no JavaScript, forced colors and failed image animation all expose readable thumbnails", async ({
  page,
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator(".story-card-media").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await context.close();
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  await expect(page.locator(".site-opening")).not.toBeVisible();
  await expect(page.locator(".story-card-media").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.emulateMedia({ forcedColors: "none" });
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args: Parameters<typeof animate>) {
      if (this.classList.contains("story-card-media"))
        throw new Error("Synthetic image animation failure");
      return animate.apply(this, args);
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#business");
  const card = page.locator(".story-card-media").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-story-entered", "true");
  await expect(card).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});
