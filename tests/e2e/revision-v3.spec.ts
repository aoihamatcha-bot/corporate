import { test, expect } from "@playwright/test";
import { getDictionary } from "../../content/dictionaries";

test("completed handwriting holds for a second then lands on the hero line boxes", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const opening = page.locator(".site-opening");
  await expect(opening).toHaveAttribute("data-phase", "writing");
  const measured = await opening.evaluate(async (dialog) => {
    let hold = 0,
      dock = 0;
    const landing: number[] = [];
    return await new Promise<{ holdDuration: number; landing: number[] }>(
      (resolve) => {
        function sample() {
          const phase = (dialog as HTMLElement).dataset.phase;
          const now = performance.now();
          if (phase === "hold" && !hold) hold = now;
          if (phase === "docking") {
            if (!dock) dock = now;
            const rows = Array.from(
              dialog.querySelectorAll<SVGGElement>("[data-handwriting-row]"),
            );
            const time = Number(rows[0].getAnimations()[0]?.currentTime);
            if (time > 1080 && landing.length === 0) {
              const targets = document.querySelectorAll(
                "#hero-title .reveal-source",
              );
              rows.forEach((row, i) => {
                const range = document.createRange();
                range.selectNodeContents(targets[i]);
                const target = range.getBoundingClientRect(),
                  actual = row.getBoundingClientRect();
                landing.push(
                  Math.max(
                    ...["left", "top", "width", "height"].map((key) =>
                      Math.abs(
                        (actual[key as keyof DOMRect] as number) -
                          (target[key as keyof DOMRect] as number),
                      ),
                    ),
                  ),
                );
              });
            }
          }
          if (phase === "complete")
            resolve({ holdDuration: dock - hold, landing });
          else requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      },
    );
  });
  expect(measured.holdDuration).toBeGreaterThanOrEqual(970);
  expect(measured.holdDuration).toBeLessThan(1350);
  expect(measured.landing).toHaveLength(2);
  measured.landing.forEach((error) => expect(error).toBeLessThan(3));
  await expect(opening).not.toBeVisible();
  await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
  await expect(page.locator("#hero-title")).toHaveText(
    "好奇心が、世界を変える。",
  );
  expect(await page.locator("#hero-title .reveal-band").count()).toBe(0);
  await page.evaluate(() =>
    window.scrollTo({ top: 1300, behavior: "instant" }),
  );
  await page.reload();
  await expect(opening).toHaveAttribute("data-phase", "writing");
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

for (const route of ["company", "business", "about"]) {
  test(`${route} thumbnails in both languages wait offscreen and fade with travel`, async ({
    page,
  }) => {
    for (const prefix of ["", "/en"]) {
      await page.goto(`${prefix}/${route}`);
      const images = page.locator(".story-card-media");
      const last = images.last();
      await expect(last).toHaveCSS("opacity", "0");
      await expect(last).not.toHaveAttribute("data-story-entered", "true");
      const samples = await last.evaluate(async (el) => {
        el.parentElement!.scrollIntoView({
          block: "center",
          behavior: "instant",
        });
        const samples: { opacity: number; transform: string }[] = [];
        const start = performance.now();
        await new Promise<void>((resolve) => {
          function sample() {
            const style = getComputedStyle(el);
            samples.push({
              opacity: Number(style.opacity),
              transform: style.transform,
            });
            if (performance.now() - start < 1450) requestAnimationFrame(sample);
            else resolve();
          }
          requestAnimationFrame(sample);
        });
        return samples;
      });
      expect(
        samples.some(
          (frame) =>
            frame.opacity > 0.05 &&
            frame.opacity < 0.9 &&
            frame.transform !== "none",
        ),
      ).toBe(true);
      await expect(last).toHaveCSS("opacity", "1");
      expect(await last.evaluate((el) => el.getAnimations().length)).toBe(0);
      await expect(last.locator("img")).toBeVisible();
      if (route === "company")
        await expect(page.locator("main")).toContainText(
          getDictionary(prefix ? "en" : "ja").company.notice,
        );
    }
  });
}

test("production copy has a prominent localized collaboration CTA and no draft notices", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["ja", "en"] as const) {
    const c = getDictionary(locale),
      prefix = locale === "en" ? "/en" : "";
    await page.goto(prefix + "/");
    await expect(page.locator("main")).not.toContainText(c.review.notice);
    await expect(page.locator("main")).not.toContainText(c.review.stage);
    await expect(page.locator("main")).not.toContainText(c.assets.note);
    await expect(page.locator("main")).not.toContainText(c.collaboration.note);
    const cta = page.locator(".collaboration-cta");
    await expect(cta).toHaveText(c.collaboration.button);
    await expect(cta).toHaveAttribute("href", prefix + "/contact");
    await cta.scrollIntoViewIfNeeded();
    expect((await cta.boundingBox())!.height).toBeGreaterThan(90);
    await cta.click();
    await expect(page).toHaveURL(new RegExp(prefix + "/contact$"));
    await expect(page.locator("main")).toContainText(c.contact.notice);
  }
});

test("cursor trails remain removed on mouse, touch and reduced motion", async ({
  page,
}) => {
  await page.goto("/about");
  await page.mouse.move(80, 160);
  await page.mouse.move(300, 250, { steps: 14 });
  await expect(page.locator(".cursor-trail")).toHaveCount(0);
  await page.mouse.move(630, 400, { steps: 14 });
  await expect(page.locator(".cursor-trail")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(200, 500, { steps: 14 });
  await expect(page.locator(".cursor-trail")).toHaveCount(0);
});
