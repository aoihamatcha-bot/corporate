import { test, expect } from "@playwright/test";

test("late font readiness cannot restart a dismissed opening after a device preference change", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".site-opening")).toHaveAttribute(
    "data-phase",
    "hold",
  );
  await page.evaluate(() => {
    const state = window as Window & {
      releaseFonts?: () => void;
      waitingFonts?: boolean;
      introStates?: string[];
    };
    const wait = new Promise<void>((resolve) => {
      state.releaseFonts = resolve;
    });
    Object.defineProperty(document.fonts, "ready", {
      configurable: true,
      get() {
        state.waitingFonts = true;
        return wait;
      },
    });
    state.introStates = [];
    new MutationObserver(() =>
      state.introStates!.push(document.documentElement.dataset.intro!),
    ).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });
  });
  await page.waitForFunction(
    () => (window as Window & { waitingFonts?: boolean }).waitingFonts,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  const states = await page.evaluate(async () => {
    const state = window as Window & {
      releaseFonts?: () => void;
      introStates?: string[];
    };
    state.releaseFonts!();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    return state.introStates;
  });
  expect(states).not.toContain("docking");
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  await expect(page.locator(".site-opening")).not.toBeVisible();
  await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate(() => document.querySelector(":modal") !== null),
  ).toBe(false);
});
