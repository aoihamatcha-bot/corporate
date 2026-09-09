import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = [
  "/",
  "/about",
  "/business",
  "/company",
  "/news",
  "/contact",
  "/privacy",
];

test("all real pages render, stay out of search and have no horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      path,
    ).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("menu traps Tab and Shift+Tab, closes with Escape and restores scroll and focus", async ({
  page,
}) => {
  await page.goto("/");
  // The new opening is a modal. Establish background keyboard focus only
  // after its handoff; all menu focus/scroll assertions below stay unchanged.
  await expect(page.locator(".site-opening")).not.toBeVisible();
  const trigger = page.getByRole("button", { name: "メニューを開く" });
  // Hydration can request more font glyphs. Wait for the actual menu to become
  // interactive before settling fonts and measuring its saved scroll position.
  await expect(trigger).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  // Focus can scroll in WebKit. Establish keyboard focus before positioning
  // the page so the baseline describes the moment immediately before opening.
  await trigger.focus();
  await page.evaluate(() => window.scrollTo({ top: 650, behavior: "instant" }));
  const originalY = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 17; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press("Shift+Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect
    .poll(() => page.evaluate(() => Math.abs(scrollY)))
    .toBeCloseTo(originalY, 0);
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});

test("menu navigation focuses destination and Back leaves no lock", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /About 私たちについて/ })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("main h1")).toBeFocused();
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});

test("rapid close, reopen, resizing and short-height navigation remain usable", async ({
  page,
}) => {
  await page.goto("/");
  for (let i = 0; i < 3; i++) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page.getByRole("button", { name: "メニューを閉じる" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.setViewportSize({ width: 360, height: 420 });
  const contact = page
    .getByRole("dialog")
    .getByRole("link", { name: /06 Contact/ });
  await contact.scrollIntoViewIfNeeded();
  await contact.click();
  await expect(page).toHaveURL(/\/contact$/);
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});

test("contact cannot collect or falsely report sending; unpublished articles return 404", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: "お問い合わせ受付の準備中です" }),
  ).toBeDisabled();
  await expect(
    page.getByLabel("メールアドレス", { exact: false }),
  ).toBeDisabled();
  const contact = await request.post("/api/contact", {
    data: { message: "Synthetic test only" },
  });
  expect(contact.status()).toBe(503);
  expect((await contact.json()).error).toBe("CONTACT_NOT_CONFIGURED");
  for (const path of [
    "/news/unpublished",
    "/news/nonexistent",
    "/missing-page",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toContainText(
      "ページが見つかりません",
    );
  }
  await page.goto("/news");
  await expect(
    page.getByText("現在、公開中のお知らせはありません。", { exact: false }),
  ).toBeVisible();
});

test("device reduced-motion persists on reload and keeps content visible without site controls", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".motion-control")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await page.reload();
  await expect(page.locator(".motion-control")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".wonder-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".wonder-type")).toBeVisible();
  expect(
    await page
      .locator(".wonder-type > span")
      .first()
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
});

test("cut-in ends in place across scrolling, touch has no pointer effect", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const line = page.locator(".wonder-type > span").first();
  await line.scrollIntoViewIfNeeded();
  await expect(page.locator(".wonder-section")).toHaveClass(/scene-entered/);
  // Each line now has its own start delay. An initial transform:none can mean
  // "waiting", so verify that the actual entrance has finished before scrolling.
  await expect(line).toHaveAttribute("data-entered", "true");
  await expect(line).toHaveAttribute("data-reveal-state", "settled");
  await expect
    .poll(() => line.evaluate((el) => getComputedStyle(el).transform))
    .toBe("none");
  await page.evaluate(() => window.scrollBy({ top: 230, behavior: "instant" }));
  expect(await line.evaluate((el) => getComputedStyle(el).transform)).toBe(
    "none",
  );
  await page.evaluate(() =>
    window.scrollBy({ top: -230, behavior: "instant" }),
  );
  expect(await line.evaluate((el) => getComputedStyle(el).transform)).toBe(
    "none",
  );
  if (isMobile) {
    // The section's center can be its /about link. Exercise touch on text so
    // the target section remains on this page for the pointer assertion.
    await page.locator(".wonder-type").tap();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator(".wonder-section")).not.toHaveAttribute(
      "data-pointer",
      "true",
    );
  }
});

test("360, 768, and effective 200% desktop zoom have no clipped controls", async ({
  page,
}) => {
  for (const width of [360, 768, 720]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      String(width),
    ).toBe(true);
    await page.getByRole("button", { name: "メニューを開く" }).click();
    const dialog = page.getByRole("dialog");
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
      String(width),
    ).toBe(true);
    await page.getByRole("button", { name: "メニューを閉じる" }).click();
    await expect(dialog).not.toBeVisible();
  }
});

test("key pages and the full-screen menu pass axe WCAG 2.2 AA", async ({
  page,
}) => {
  for (const path of ["/", "/contact", "/company", "/privacy"]) {
    await page.goto(path);
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
      path,
    ).toEqual([]);
  }
  await page.getByRole("button", { name: "メニューを開く" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("without JavaScript all copy and footer routes remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:3017",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".wonder-type")).toBeVisible();
  await page
    .getByRole("navigation", { name: "フッターナビゲーション" })
    .getByRole("link", { name: "会社概要" })
    .click();
  await expect(page.locator("main h1")).toHaveText("会社概要");
  await context.close();
});

test("animation API failure leaves readable content and working navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Element.prototype.animate = () => {
      throw new Error("Synthetic animation failure");
    };
  });
  await page.goto("/");
  await page.locator(".wonder-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".wonder-type")).toBeVisible();
  expect(
    await page
      .locator(".wonder-type > span")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
