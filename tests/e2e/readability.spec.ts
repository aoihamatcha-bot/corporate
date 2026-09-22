import { test, expect } from "@playwright/test";
import { getDictionary } from "../../content/dictionaries";

const routes = ["", "/about", "/business", "/company", "/news", "/contact", "/privacy"];

for (const width of [320, 390, 768, 1440]) {
  test(`readable page structure fits ${width}px in both languages`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const prefix of ["", "/en"]) {
      for (const route of routes) {
        const url = `${prefix}${route}` || "/";
        await page.goto(url);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("main h1")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), url).toBe(true);
        const clipped = await page.locator("main h1, main h2, main h3, main p, .site-header a, .menu-trigger").evaluateAll((elements) =>
          elements.filter((el) => {
            if (!(el instanceof HTMLElement) || !el.getClientRects().length) return false;
            return el.scrollWidth > el.clientWidth + 1;
          }).map((el) => el.textContent?.trim()),
        );
        expect(clipped, url).toEqual([]);
      }
    }
  });
}

test("200 percent text enlargement keeps all pages readable and the menu usable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const prefix of ["", "/en"]) {
    for (const route of routes) {
      const url = `${prefix}${route}` || "/";
      await page.goto(url);
      await page.evaluate(async () => {
        await document.fonts.ready;
        // Snapshot before changing styles: inherited sizes must not compound.
        const sizes = [...document.querySelectorAll<HTMLElement>("body *")].map((el) => {
          const css = getComputedStyle(el);
          return { el, font: parseFloat(css.fontSize), line: parseFloat(css.lineHeight) };
        });
        for (const { el, font, line } of sizes) {
          el.style.fontSize = `${font * 2}px`;
          if (Number.isFinite(line)) el.style.lineHeight = `${line * 2}px`;
        }
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), url).toBe(true);
      expect(await page.locator("main h1, main h2, main h3, main p").evaluateAll((elements) =>
        elements.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent?.trim()),
      ), url).toEqual([]);
      await page.getByRole("button", { name: prefix ? "Open menu" : "メニューを開く" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }
  }
});

test("home summaries lead to additional detail and contact availability is clear before navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["ja", "en"] as const) {
    const prefix = locale === "en" ? "/en" : "";
    const c = getDictionary(locale);
    await page.goto(prefix || "/");
    for (const [id, copy] of Object.entries(c.business.areas)) {
      const card = page.locator(`.business-preview > a[href="${prefix}/business#${id}"]`);
      await expect(card).toContainText(copy.summary);
      await expect(card).not.toContainText(copy.description);
    }
    await expect(page.locator(".concept-relationship")).toContainText(c.diagram.relationshipDescription);
    await expect(page.locator(".concept-nodes > li")).toHaveCount(3);
    await expect(page.locator(".current-work img")).toHaveCount(0);
    await expect(page.locator(".contact-availability")).toHaveText(c.collaboration.contactStatus);
    await expect(page.locator(".contact-band")).toContainText(c.contactBand.description);
    await page.locator(`.business-preview > a[href="${prefix}/business#systems"]`).click();
    await expect(page.locator("#systems")).toBeInViewport();
    await expect(page.locator("#systems")).toContainText(c.business.areas.systems.description);
    await expect(page.locator("#systems")).toContainText(c.business.areas.systems.consultation);
    await page.locator(".collaboration-cta").click();
    await expect(page.locator("#contact-status")).toContainText(c.contact.noticeTitle);
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  }
});
