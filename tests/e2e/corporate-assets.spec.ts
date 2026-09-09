import { test, expect } from "@playwright/test";
import { getDictionary } from "../../content/dictionaries";

test("adopted concepts and illustrations load in both languages without implying real screens or a playable video", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["ja", "en"] as const) {
    const prefix = locale === "en" ? "/en" : "";
    const c = getDictionary(locale);
    for (const [path, ids] of [
      ["/", ["A01", "A02", "A06", "A07"]],
      ["/business", ["A06"]],
      ["/company", ["A03"]],
      ["/about", ["A04"]],
      ["/news", ["A09"]],
    ] as const) {
      await page.goto(prefix + path);
      for (const id of ids) {
        const img = page.locator(`img[data-asset-id="${id}"]`);
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
          .toBeGreaterThan(0);
        const rect = await img.boundingBox();
        expect(rect!.width).toBeLessThanOrEqual(
          await page.evaluate(() => innerWidth),
        );
        expect(await img.getAttribute("alt")).toBeTruthy();
        if (["A01", "A02", "A06", "A07", "A09"].includes(id))
          expect(
            decodeURIComponent((await img.getAttribute("src"))!),
          ).toContain(`-${locale}.`);
      }
      const logo = page.locator(".site-header .brand-wordmark img");
      await expect(logo).toHaveAttribute("src", /a10-wordmark-light-fit\.svg$/);
      await expect(
        page.locator(".site-footer .brand-wordmark img"),
      ).toHaveAttribute("src", /a10-wordmark-dark-fit\.svg$/);
      await expect(
        page.locator(".wordmark .spark, .footer-wordmark .spark"),
      ).toHaveCount(0);
      if (path === "/") {
        await expect(page.locator(".hero-art img")).toHaveAttribute(
          "src",
          /a08-brand-keyvisual/,
        );
        await expect(
          page.locator(".material-section .editorial-note"),
        ).toHaveCount(0);
        await expect(page.locator(".review-notice, .draft-badge")).toHaveCount(
          0,
        );
        await expect(page.locator(".service-poster")).toContainText(
          c.assets.posterTitle,
        );
        for (const id of ["A01", "A02", "A06", "A07"]) {
          expect(
            decodeURIComponent(
              (await page
                .locator(`img[data-asset-id="${id}"]`)
                .getAttribute("src"))!,
            ),
          ).toContain(`-v4-${locale}.webp`);
        }
        await expect(
          page.locator(".service-poster button, .service-poster video"),
        ).toHaveCount(0);
        for (const link of await page.locator(".asset-expand").all()) {
          await expect(link).toHaveAttribute("target", "_blank");
          expect(
            (await request.get((await link.getAttribute("href"))!)).status(),
          ).toBe(200);
        }
      }
      if (path === "/company") {
        await expect(page.locator(".company-illustration")).toContainText(
          c.company.photoNote,
        );
        await expect(page.locator(".company-table > div")).toHaveCount(1);
      }
      if (path === "/news") {
        await expect(page.locator("main")).toContainText(c.news.emptyTitle);
        await expect(page.locator(".news-list li")).toHaveCount(0);
      }
    }
  }
});

test("social cards use the correct language, full image URLs and a news-specific cover", async ({
  page,
  request,
}) => {
  for (const prefix of ["", "/en"]) {
    const locale = prefix ? "en" : "ja";
    for (const path of ["/", "/about", "/news"]) {
      await page.goto(prefix + path);
      const stem = path === "/news" ? "a09-news-template" : "a05-social-share";
      const og = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      expect(new URL(og!).pathname).toBe(
        `/images/corporate/${stem}-${locale}.png`,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        og!,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      const response = await request.get(og!);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  }
});
