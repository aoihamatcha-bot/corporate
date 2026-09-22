import { test, expect } from "@playwright/test";

test("section colors keep their authored palette and background washes remain soft", async ({ page }) => {
  const surfaces: string[] = [];
  for (const seed of [0.01, 0.99]) {
    await page.addInitScript((value) => { Math.random = () => value; }, seed);
    await page.goto("/about");
    const intro = page.locator(".page-intro");
    await expect(intro).toHaveClass(/scene-entered/);
    await expect(intro).toHaveAttribute("data-palette", "mint");
    const result = await intro.evaluate((el) => {
      const lead = el.querySelector(".color-lead")!;
      const animation = lead.getAnimations()[0];
      const effect = animation.effect as KeyframeEffect;
      const frames = effect.getKeyframes();
      return {
        background: getComputedStyle(el).backgroundImage,
        mask: getComputedStyle(lead).maskImage,
        peak: Math.max(...frames.map((frame) => Number(frame.opacity))),
        final: frames.at(-1)?.opacity,
        iterations: effect.getTiming().iterations,
      };
    });
    surfaces.push(result.background);
    expect(result.background).toContain("radial-gradient");
    expect(result.mask).toContain("linear-gradient");
    expect(result.peak).toBeCloseTo(0.28, 2);
    expect(Number(result.final)).toBe(0);
    expect(result.iterations).toBe(1);
    await expect(intro.locator(".color-lead")).toHaveCSS("opacity", "0");
    await expect(intro).toHaveAttribute("data-palette", "mint");
  }
  expect(surfaces[0]).toBe(surfaces[1]);
});

test("all Hero copy has static gradient ink with a single readable image shade", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/en"]) {
    await page.goto(route);
    const hero = page.locator(".hero");
    await expect(hero.locator(".hero-shade")).toHaveCount(1);
    const result = await hero.evaluate((el) => ({
      after: getComputedStyle(el, "::after").content,
      shade: getComputedStyle(el.querySelector(".hero-shade")!).backgroundImage,
      text: [...el.querySelectorAll(".reveal-source")].map((source) => ({
        text: source.textContent?.trim(),
        gradient: getComputedStyle(source).backgroundImage,
        clip: getComputedStyle(source).backgroundClip,
        opacity: getComputedStyle(source).opacity,
      })),
      animations: el.getAnimations({ subtree: true }).length,
    }));
    expect(result.after).toBe("none");
    expect(result.shade).toContain("linear-gradient");
    expect(result.text.length).toBeGreaterThanOrEqual(12);
    for (const source of result.text) {
      expect(source.text).toBeTruthy();
      expect(source.gradient).toContain("linear-gradient");
      expect(source.clip).toBe("text");
      expect(source.opacity).toBe("1");
    }
    expect(result.animations).toBe(0);
  }
  await page.emulateMedia({ forcedColors: "active" });
  for (const source of await page.locator(".hero .reveal-source").all()) {
    await expect(source).toHaveCSS("background-image", "none");
    expect(await source.evaluate((el) => getComputedStyle(el).webkitTextFillColor)).not.toBe("rgba(0, 0, 0, 0)");
  }
});

test("body color cancels safely on reduced motion and animation API failure", async ({ page }) => {
  await page.goto("/about");
  const text = page.locator(".page-description .reveal-text");
  await expect(text).toHaveAttribute("data-reveal-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(text).toHaveAttribute("data-reveal-state", "settled");
  await expect(text.locator(".reveal-source")).toHaveCSS("opacity", "1");
  expect(await text.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    Element.prototype.animate = () => { throw new Error("Synthetic animation API failure"); };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(text).toHaveAttribute("data-reveal-state", "settled");
  await expect(text.locator(".reveal-source")).toBeVisible();
  await expect(text.locator(".reveal-color")).toHaveCSS("opacity", "0");
  await expect(text.locator(".reveal-source")).toHaveCSS("clip-path", "none");
  expect(errors).toEqual([]);
});
