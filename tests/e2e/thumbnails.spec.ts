import { test, expect, type Locator } from "@playwright/test";

const selectedAssets = [
  "platform-a1-v2.webp",
  "systems-programming-v2.webp",
  "creative-r2-v2.webp",
  "marketing-a1-v2.webp",
];

async function expectStatic(image: Locator) {
  await expect(image).toHaveAttribute("data-image-trigger", "hover");
  await expect(image).not.toHaveAttribute("data-entered", "true");
  await expect
    .poll(() =>
      image.evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBe(0);
  await expect(image.locator(".image-wash")).toHaveCSS("opacity", "0");
  await expect(image.locator(".image-echo")).toHaveCSS("opacity", "0");
}

test("four selected assets load in all eight business placements in both languages and stay static on scroll", async ({
  page,
}) => {
  const sources = new Set<string>();
  const alts: Record<string, string[]> = {};
  for (const locale of ["ja", "en"]) {
    alts[locale] = [];
    for (const detail of [false, true]) {
      const path =
        (locale === "en" ? "/en" : "") + (detail ? "/business" : "/");
      await page.goto(path);
      const visuals = page.locator(
        detail ? ".business-detail-visual" : ".business-visual",
      );
      await expect(visuals).toHaveCount(4);
      for (const [index, fileName] of selectedAssets.entries()) {
        const image = visuals.nth(index);
        await image.scrollIntoViewIfNeeded();
        const img = image.locator("img");
        await expect
          .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
          .toBeGreaterThan(0);
        await img.evaluate((el: HTMLImageElement) => el.decode());
        await expectStatic(image);
        const asset = "/images/business/" + fileName;
        const src = await img.getAttribute("src");
        expect(src).toContain(encodeURIComponent(asset));
        sources.add(asset);
        const alt = await img.getAttribute("alt");
        expect(alt?.length).toBeGreaterThan(10);
        alts[locale].push(alt!);
        await expect(img).toHaveAttribute("loading", "lazy");
        await expect(img).toHaveAttribute("srcset", /640w/);
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await visuals.first().scrollIntoViewIfNeeded();
      await expectStatic(visuals.first());
    }
  }
  // One selected image per area is shared by its card and detail placement.
  expect(sources.size).toBe(4);
  expect(new Set(alts.ja).size).toBe(8);
  expect(new Set(alts.en).size).toBe(8);
  expect(alts.en).not.toEqual(alts.ja);
});

test("only the thumbnail cursor hover cycles eight palettes; focus and touch remain static", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "メニューを開く" })).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  const link = page.locator(".business-preview > a").first();
  const image = link.locator(".gradient-image");
  // Set focus before scrolling; browser focus scrolling must not move the
  // thumbnail out from under the cursor while its hover animation is awaited.
  await link.focus();
  await image.scrollIntoViewIfNeeded();
  await expect(link).toBeFocused();
  await expectStatic(image);
  const source = await image.locator("img").getAttribute("src");

  if (isMobile) {
    await image.tap();
    await expect(page).toHaveURL(/\/business#platform$/);
    const detail = page.locator("#platform .business-detail-visual");
    await detail.scrollIntoViewIfNeeded();
    await detail.tap();
    await expectStatic(detail);
  } else {
    // Hovering the text portion of the focused card must not color the image.
    await link.locator("h3").hover();
    await expectStatic(image);
    const colors: string[] = [];
    for (let cycle = 0; cycle < 8; cycle++) {
      await image.hover();
      await expect(image).toHaveAttribute("data-image-state", "hover");
      const wash = image.locator(".image-wash");
      await wash.evaluate((el) =>
        Promise.all(el.getAnimations().map((animation) => animation.finished)),
      );
      await expect(wash).toHaveCSS("opacity", "0.9");
      colors.push(
        await wash.evaluate((el) => getComputedStyle(el).backgroundImage),
      );
      await page.mouse.move(5, 5);
      // The link remains keyboard-focused, but cursor exit still clears the wash.
      await expect(link).toBeFocused();
      await expectStatic(image);
    }
    expect(new Set(colors).size).toBe(8);
    expect(await image.locator("img").getAttribute("src")).toBe(source);
  }
});

test("detail image hover honors motion pause and reduced motion without changing the hero entrance", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-image-trigger",
    "entrance",
  );
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-entered",
    "true",
  );
  await page.goto("/business#creative");
  const image = page.locator("#creative .business-detail-visual");
  await image.scrollIntoViewIfNeeded();
  await expectStatic(image);
  if (!isMobile) {
    await image.hover();
    await expect(image).toHaveAttribute("data-image-state", "hover");
  } else {
    await image.tap();
    await expectStatic(image);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expectStatic(image);
  await expect(image.locator("img")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "動きを止める", exact: true }).click();
  await image.scrollIntoViewIfNeeded();
  if (!isMobile) await image.hover();
  else await image.tap();
  await expectStatic(image);
  await page.getByRole("button", { name: /動きを再生する/ }).click();
  await image.scrollIntoViewIfNeeded();
  await expectStatic(image);
  if (!isMobile) {
    await page.mouse.move(5, 5);
    await image.hover();
    await expect(image).toHaveAttribute("data-image-state", "hover");
  }
});
