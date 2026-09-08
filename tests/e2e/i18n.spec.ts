import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getDictionary } from "../../content/dictionaries";
import { pagePaths, localizedPath, type PageKey } from "../../content/i18n";

test("English pages have localized headings, metadata, controls and server HTML", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const c = getDictionary("en");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [key, path] of Object.entries(pagePaths)) {
    const url = localizedPath(path, "en");
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page).toHaveTitle(
      new RegExp(
        c.pages[key as PageKey].title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      ),
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      c.pages[key as PageKey].description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(
      page.locator('link[rel="canonical"], link[hreflang]'),
    ).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Footer navigation" }),
    ).toBeVisible();
    expect(await page.locator("main").innerText()).not.toMatch(
      /[ぁ-ゟァ-ヿ一-鿿]/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      url,
    ).toBe(true);
    const html = await (await request.get(url)).text();
    expect(html).toContain('lang="en"');
  }
  expect(errors).toEqual([]);
});

test("language switching preserves each page and business anchors, including menu navigation and Back", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of Object.values(pagePaths)) {
    await page.goto(path);
    await page
      .locator(".site-header .language-switcher")
      .getByRole("link", { name: "English", exact: true })
      .click();
    await expect(page).toHaveURL(
      "http://127.0.0.1:3017" + localizedPath(path, "en"),
    );
    await page
      .locator(".site-header .language-switcher")
      .getByRole("link", { name: "日本語", exact: true })
      .click();
    await expect(page).toHaveURL("http://127.0.0.1:3017" + path);
  }
  for (const anchor of ["platform", "systems", "creative", "marketing"]) {
    await page.goto("/business#" + anchor);
    await page
      .locator(".site-header .language-switcher")
      .getByRole("link", { name: "English", exact: true })
      .click();
    await expect(page).toHaveURL("http://127.0.0.1:3017/en/business#" + anchor);
    await expect(page.locator("#" + anchor)).toBeInViewport();
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    await dialog
      .locator(".language-switcher")
      .getByRole("link", { name: "日本語", exact: true })
      .click();
    await expect(page).toHaveURL("http://127.0.0.1:3017/business#" + anchor);
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    expect(await page.evaluate(() => document.body.style.position)).toBe("");
    await page.goBack();
    await expect(page).toHaveURL("http://127.0.0.1:3017/en/business#" + anchor);
    await expect(page.getByRole("dialog")).not.toBeVisible();
    expect(await page.evaluate(() => document.body.style.position)).toBe("");
  }
});

test("unpublished English articles and missing routes return localized 404 with honest translation choices", async ({
  page,
}) => {
  for (const path of [
    "/en/missing-page",
    "/en/news/unpublished",
    "/en/news/nonexistent",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main h1")).toHaveText(
      getDictionary("en").notFound.title,
    );
    await expect(page).toHaveTitle(/Page not found/);
  }
  await page.goto("/news/unpublished");
  const switcher = page.locator(".site-header .language-switcher");
  await expect(switcher).toContainText("English version unavailable");
  await expect(
    switcher.getByRole("link", { name: "English", exact: true }),
  ).toHaveCount(0);
  await switcher
    .getByRole("link", { name: "English news", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/news$/);
  await expect(page.locator("main")).toContainText(
    getDictionary("en").news.emptyTitle,
  );
});

test("English contact remains disabled, reports no send, and protects unsent drafts before language navigation", async ({
  page,
  request,
}) => {
  await page.goto("/en/contact");
  await expect(
    page.getByLabel("Email address", { exact: false }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", {
      name: getDictionary("en").contact.disabledSubmit,
    }),
  ).toBeDisabled();
  const response = await request.post("/api/contact?lang=en", {
    data: { message: "SYNTHETIC TEST ONLY" },
  });
  expect(response.status()).toBe(503);
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(response.headers()["content-language"]).toBe("en");
  expect(await response.json()).toEqual({
    error: "CONTACT_NOT_CONFIGURED",
    message: getDictionary("en").contact.unconfigured,
  });
  // Exercise the generic navigation guard without enabling the real disabled form.
  await page.evaluate(() => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.value = "SYNTHETIC UNSENT DRAFT";
    form.append(input);
    document.querySelector("main")!.append(form);
  });
  let prompted = false;
  page.once("dialog", async (dialog) => {
    prompted = true;
    expect(dialog.message()).toBe(getDictionary("en").common.unsavedPrompt);
    await dialog.dismiss();
  });
  await page
    .locator(".site-header .language-switcher")
    .getByRole("link", { name: "日本語", exact: true })
    .click();
  expect(prompted).toBe(true);
  await expect(page).toHaveURL(/\/en\/contact$/);
  expect(page.url()).not.toContain("SYNTHETIC");
});

test("320px layouts keep both languages and menu controls within the screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["ja", "en"] as const) {
    const c = getDictionary(locale);
    for (const path of Object.values(pagePaths)) {
      await page.goto(localizedPath(path, locale));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        locale + path,
      ).toBe(true);
      const title = page.locator("main h1");
      await expect(title).toBeVisible();
      expect(
        await title.evaluate((el) => el.scrollWidth <= el.clientWidth),
        locale + path,
      ).toBe(true);
    }
    await page.getByRole("button", { name: c.common.menuOpen }).click();
    const dialog = page.getByRole("dialog");
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press(i % 3 ? "Tab" : "Shift+Tab");
      expect(
        await page.evaluate(() => !!document.activeElement?.closest("dialog")),
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: c.common.menuOpen }),
    ).toBeFocused();
  }
});

test("English pause survives language navigation and images are optional to understanding the company", async ({
  page,
}) => {
  await page.route("**/_next/image**", (route) => route.abort());
  await page.goto("/en");
  await expect(page.locator("main")).toContainText(
    "service development, video production, and marketing",
  );
  await expect(page.locator(".business-preview > a")).toHaveCount(4);
  await expect(page.locator(".concept-nodes > li")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page
    .locator(".site-header .language-switcher")
    .getByRole("link", { name: "日本語", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  for (const target of [".hero h1", ".wonder-type", ".business-preview h3"]) {
    for (const element of await page.locator(target).all()) {
      await element.scrollIntoViewIfNeeded();
      await expect(element.locator(".reveal-source").first()).toHaveCSS(
        "opacity",
        "1",
      );
      await expect(element.locator(".reveal-color").first()).toHaveCSS(
        "opacity",
        "0",
      );
    }
  }
  await page.goto("/en/company");
  await expect(page.locator(".company-table > div")).toHaveCount(1);
  await expect(page.locator(".company-table dt")).toHaveText(
    getDictionary("en").company.fields.brand,
  );
  await expect(page.locator(".company-table")).toContainText("MYSTENA");
});

test("English pages and menu pass WCAG 2.2 AA and work without JavaScript", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/en",
    "/en/business",
    "/en/company",
    "/en/contact",
    "/en/privacy",
  ]) {
    await page.goto(path);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
      path,
    ).toEqual([]);
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:3017",
  });
  const noJs = await context.newPage();
  await noJs.goto("/en");
  await expect(noJs.locator("html")).toHaveAttribute("lang", "en");
  await expect(noJs.locator("main h1")).toBeVisible();
  await noJs
    .getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Company information" })
    .click();
  await expect(noJs).toHaveURL(/\/en\/company$/);
  await noJs
    .locator(".site-header .language-switcher")
    .getByRole("link", { name: "日本語", exact: true })
    .click();
  await expect(noJs).toHaveURL(/\/company$/);
  await expect(noJs.locator("html")).toHaveAttribute("lang", "ja");
  await context.close();
});
