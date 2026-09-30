import { test, expect } from "@playwright/test";

for (const route of ["/", "/en"]) {
  test(`${route} lands once, stays still and saves business effects for scrolling`, async ({
    page,
    isMobile,
  }, testInfo) => {
    if (!isMobile) await page.setViewportSize({ width: 1440, height: 1200 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    // A fresh context with delayed real font responses exercises the handoff's
    // font readiness, without replacing the browser font API or seeking time.
    await page.route(/\.woff2(?:\?|$)/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".site-opening")).toHaveAttribute(
      "data-phase",
      "writing",
    );
    const evidence = await page.evaluate(async () => {
      const hero = document.querySelector<HTMLElement>(".hero")!;
      const title = document.querySelector<HTMLElement>("#hero-title")!;
      const cue = document.querySelector(".hero-scroll-cue path")!;
      const business = document.querySelector<HTMLElement>("#business")!;
      let cueStarted = false,
        cueAfterOpening = false,
        doneAt = 0;
      const frames: {
        font: string;
        rect: string;
        animations: number;
        color: string;
        businessTop: number;
      }[] = [];
      await new Promise<void>((resolve) => {
        function sample() {
          const intro = document.documentElement.dataset.intro;
          const cueRunning = cue
            .getAnimations()
            .some((a) => a.playState === "running");
          if (intro === "docking" && cueRunning) cueStarted = true;
          if (intro === "done") {
            if (!doneAt) doneAt = performance.now();
            cueAfterOpening ||= cueRunning;
            const box = title.getBoundingClientRect();
            const style = getComputedStyle(title);
            frames.push({
              font: style.font,
              rect: JSON.stringify([box.x, box.y, box.width, box.height]),
              color: getComputedStyle(title.querySelector(".reveal-source")!)
                .color,
              animations: hero
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
              businessTop: business.getBoundingClientRect().top,
            });
            if (performance.now() - doneAt > 2300) return resolve();
          }
          requestAnimationFrame(sample);
        }
        sample();
      });
      return {
        cueStarted,
        cueAfterOpening,
        frames,
        height: innerHeight,
        scroll: scrollY,
        fonts: document.fonts.status,
      };
    });
    await testInfo.attach("landing-samples", {
      body: JSON.stringify(evidence),
      contentType: "application/json",
    });
    expect(evidence.cueStarted).toBe(true);
    expect(evidence.cueAfterOpening).toBe(false);
    expect(evidence.fonts).toBe("loaded");
    expect(evidence.scroll).toBe(0);
    expect(evidence.frames.length).toBeGreaterThan(20);
    expect(new Set(evidence.frames.map((frame) => frame.font)).size).toBe(1);
    expect(new Set(evidence.frames.map((frame) => frame.rect)).size).toBe(1);
    expect(new Set(evidence.frames.map((frame) => frame.color)).size).toBe(1);
    expect(evidence.frames.every((frame) => frame.animations === 0)).toBe(true);
    expect(
      evidence.frames.every((frame) => frame.businessTop >= evidence.height),
    ).toBe(true);
    const business = page.locator("#business");
    const title = business.locator(".section-heading .reveal-text");
    await expect(business).not.toHaveClass(/scene-entered/);
    await expect(business).not.toHaveAttribute("data-story-entered", "true");
    await expect(title).not.toHaveAttribute("data-entered", "true");
    await expect(page.locator(".hero .reveal-band, .cursor-trail")).toHaveCount(
      0,
    );
    await page.mouse.move(200, 400, { steps: 8 });
    expect(
      await page
        .locator(".hero")
        .evaluate((el) => el.getAnimations({ subtree: true }).length),
    ).toBe(0);
    await title.scrollIntoViewIfNeeded();
    await expect(business).toHaveClass(/scene-entered/);
    await expect(title).toHaveAttribute("data-reveal-state", "running");
    expect(
      await title
        .locator(".reveal-color")
        .evaluate((el) => el.getAnimations().length),
    ).toBeGreaterThan(0);
    await expect(title).toHaveAttribute("data-reveal-state", "settled");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await title.scrollIntoViewIfNeeded();
    expect(
      await title.evaluate((el) => el.getAnimations({ subtree: true }).length),
    ).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("viewport-sized hero and static business band fit short, tall and narrow screens", async ({
  page,
  isMobile,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const sizes = isMobile
    ? [
        { width: 320, height: 568 },
        { width: 390, height: 844 },
        { width: 844, height: 390 },
      ]
    : [
        { width: 1366, height: 768 },
        { width: 1440, height: 1200 },
        { width: 1920, height: 1440 },
      ];
  const evidence = [];
  for (const size of sizes) {
    await page.setViewportSize(size);
    for (const route of ["/", "/en"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        top: document.querySelector("#business")!.getBoundingClientRect().top,
        height: innerHeight,
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        items: [...document.querySelectorAll(".hero-capabilities li")].map(
          (el) => {
            const range = document.createRange();
            range.selectNodeContents(el.querySelector("span")!);
            const text = range.getBoundingClientRect();
            const box = el.getBoundingClientRect();
            return {
              left: text.left,
              right: text.right,
              boxLeft: box.left,
              boxRight: box.right,
            };
          },
        ),
      }));
      evidence.push({ size, route, layout });
      expect(layout.top).toBeGreaterThanOrEqual(layout.height);
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
      expect(layout.items).toHaveLength(4);
      layout.items.forEach((item) => {
        expect(item.left).toBeGreaterThanOrEqual(item.boxLeft);
        expect(item.right).toBeLessThanOrEqual(item.boxRight);
      });
      await expect(page.locator(".hero-capabilities")).toBeVisible();
      await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
    }
  }
  await testInfo.attach("viewport-layout", {
    body: JSON.stringify(evidence),
    contentType: "application/json",
  });
});
