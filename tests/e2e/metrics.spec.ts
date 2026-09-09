import { test, expect } from "@playwright/test";

test("the counter progresses once without shifting its width or announcing intermediate numbers", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "メニューを開く" })).toBeEnabled();
  const counter = page.locator('[data-metric="users"] .count-up');
  await expect(counter).toHaveAttribute("data-counter-state", "static");
  await expect(counter.locator(".sr-only")).toHaveText("1,000");
  const result = await counter.evaluate(async (el) => {
    const values: number[] = [];
    const widths: number[] = [];
    return new Promise<{ values: number[]; widths: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => { observer.disconnect(); reject(new Error("Counter did not settle")); }, 9000);
      const observer = new MutationObserver(() => {
        const value = Number(el.querySelector(".count-up-digits")!.textContent!.replaceAll(",", ""));
        if (values.at(-1) !== value) values.push(value);
        widths.push(el.getBoundingClientRect().width);
        if ((el as HTMLElement).dataset.counterState === "settled") {
          observer.disconnect();
          clearTimeout(timeout);
          resolve({ values, widths });
        }
      });
      observer.observe(el, { subtree: true, childList: true, attributes: true, characterData: true });
      el.scrollIntoView({ block: "center", behavior: "instant" });
    });
  });
  expect(result.values.length).toBeGreaterThan(3);
  expect(result.values[0]).toBe(0);
  expect(result.values.at(-1)).toBe(1000);
  expect(result.values.every((value, i) => i === 0 || value >= result.values[i - 1])).toBe(true);
  expect(Math.max(...result.widths) - Math.min(...result.widths)).toBeLessThan(0.5);
  await expect(counter.locator(".count-up-color")).toHaveCSS("opacity", "0");
  await expect(counter.locator(".sr-only")).toHaveText("1,000");
  await expect(counter.locator(".count-up-visual")).toHaveAttribute("aria-hidden", "true");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await counter.scrollIntoViewIfNeeded();
  await expect(counter).toHaveAttribute("data-counter-state", "settled");
  expect(await counter.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
});

test("pausing an active counter shows its final value and stops the number and color animation", async ({ page }) => {
  await page.goto("/");
  const counter = page.locator('[data-metric="users"] .count-up');
  await counter.scrollIntoViewIfNeeded();
  await expect(counter).toHaveAttribute("data-counter-state", "running");
  await page.getByRole("button", { name: "動きを止める", exact: true }).click();
  await expect(counter).toHaveAttribute("data-counter-state", "settled");
  await expect(counter.locator(".count-up-digits")).toHaveText("1,000");
  expect(await counter.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  await page.getByRole("button", { name: /動きを再生する/ }).click();
  await expect(counter).toHaveAttribute("data-counter-state", "settled");
  await expect(counter.locator(".count-up-digits")).toHaveText("1,000");
});

test("both languages label the example figures and preserve readable values without motion or JavaScript", async ({ page, browser }) => {
  for (const route of ["/", "/en"]) {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const metrics = page.locator(".company-metrics");
    await expect(metrics).toHaveAttribute("data-metrics-status", "illustrative");
    await expect(metrics.locator("dt")).toHaveText(route === "/"
      ? ["提携者数", "出店者数", "登録ユーザー数"]
      : ["Partners", "Participating stores", "Registered users"]);
    await expect(metrics.locator("#metrics-note")).toContainText(route === "/" ? "仮置き" : "illustrative placeholders");
    for (const counter of await metrics.locator(".count-up").all()) {
      await counter.scrollIntoViewIfNeeded();
      await expect(counter).toHaveAttribute("data-counter-state", "static");
    }
    await expect(metrics.locator(".count-up-digits")).toHaveText(["2", "10", "1,000"]);
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noScript = await context.newPage();
  for (const route of ["/", "/en"]) {
    await noScript.goto(route);
    const metrics = noScript.locator(".company-metrics");
    await expect(metrics.locator(".count-up-digits")).toHaveText(["2", "10", "1,000"]);
    await metrics.scrollIntoViewIfNeeded();
    await expect(metrics.locator("#metrics-note")).toBeVisible();
  }
  await context.close();
});
