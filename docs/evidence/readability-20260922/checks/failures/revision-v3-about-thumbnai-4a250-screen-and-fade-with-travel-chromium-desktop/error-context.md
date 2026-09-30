# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: revision-v3.spec.ts >> about thumbnails in both languages wait offscreen and fade with travel
- Location: tests\e2e\revision-v3.spec.ts:75:7

# Error details

```
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  locator('.story-card-media').last()
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" locator('.story-card-media').last() with timeout 10000ms
  - waiting for locator('.story-card-media').last()
    23 × locator resolved to <span class="story-card-media" data-story-entered="true">…</span>
       - unexpected value "true"

```

```yaml
- img "An imaginary creative workbench with a notebook, development laptop, camera, product sample and phone"
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { getDictionary } from "../../content/dictionaries";
  3   | 
  4   | test("completed handwriting holds for a second then lands on the hero line boxes", async ({
  5   |   page,
  6   | }) => {
  7   |   await page.goto("/", { waitUntil: "domcontentloaded" });
  8   |   const opening = page.locator(".site-opening");
  9   |   await expect(opening).toHaveAttribute("data-phase", "writing");
  10  |   const measured = await opening.evaluate(async (dialog) => {
  11  |     let hold = 0,
  12  |       dock = 0;
  13  |     const landing: number[] = [];
  14  |     return await new Promise<{ holdDuration: number; landing: number[] }>(
  15  |       (resolve) => {
  16  |         function sample() {
  17  |           const phase = (dialog as HTMLElement).dataset.phase;
  18  |           const now = performance.now();
  19  |           if (phase === "hold" && !hold) hold = now;
  20  |           if (phase === "docking") {
  21  |             if (!dock) dock = now;
  22  |             const rows = Array.from(
  23  |               dialog.querySelectorAll<SVGGElement>("[data-handwriting-row]"),
  24  |             );
  25  |             const time = Number(rows[0].getAnimations()[0]?.currentTime);
  26  |             if (time > 1080 && landing.length === 0) {
  27  |               const targets = document.querySelectorAll(
  28  |                 "#hero-title .reveal-source",
  29  |               );
  30  |               rows.forEach((row, i) => {
  31  |                 const range = document.createRange();
  32  |                 range.selectNodeContents(targets[i]);
  33  |                 const target = range.getBoundingClientRect(),
  34  |                   actual = row.getBoundingClientRect();
  35  |                 landing.push(
  36  |                   Math.max(
  37  |                     ...["left", "top", "width", "height"].map((key) =>
  38  |                       Math.abs(
  39  |                         (actual[key as keyof DOMRect] as number) -
  40  |                           (target[key as keyof DOMRect] as number),
  41  |                       ),
  42  |                     ),
  43  |                   ),
  44  |                 );
  45  |               });
  46  |             }
  47  |           }
  48  |           if (phase === "complete")
  49  |             resolve({ holdDuration: dock - hold, landing });
  50  |           else requestAnimationFrame(sample);
  51  |         }
  52  |         requestAnimationFrame(sample);
  53  |       },
  54  |     );
  55  |   });
  56  |   expect(measured.holdDuration).toBeGreaterThanOrEqual(970);
  57  |   expect(measured.holdDuration).toBeLessThan(1350);
  58  |   expect(measured.landing).toHaveLength(2);
  59  |   measured.landing.forEach((error) => expect(error).toBeLessThan(3));
  60  |   await expect(opening).not.toBeVisible();
  61  |   await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
  62  |   await expect(page.locator("#hero-title")).toHaveText(
  63  |     "好奇心が、世界を変える。",
  64  |   );
  65  |   expect(await page.locator("#hero-title .reveal-band").count()).toBe(0);
  66  |   await page.evaluate(() =>
  67  |     window.scrollTo({ top: 1300, behavior: "instant" }),
  68  |   );
  69  |   await page.reload();
  70  |   await expect(opening).toHaveAttribute("data-phase", "writing");
  71  |   expect(await page.evaluate(() => scrollY)).toBe(0);
  72  | });
  73  | 
  74  | for (const route of ["company", "business", "about"]) {
  75  |   test(`${route} thumbnails in both languages wait offscreen and fade with travel`, async ({
  76  |     page,
  77  |   }) => {
  78  |     for (const prefix of ["", "/en"]) {
  79  |       await page.goto(`${prefix}/${route}`);
  80  |       const images = page.locator(".story-card-media");
  81  |       const last = images.last();
  82  |       await expect(last).toHaveCSS("opacity", "0");
> 83  |       await expect(last).not.toHaveAttribute("data-story-entered", "true");
      |                              ^ Error: expect(locator).not.toHaveAttribute(expected) failed
  84  |       const samples = await last.evaluate(async (el) => {
  85  |         el.parentElement!.scrollIntoView({
  86  |           block: "center",
  87  |           behavior: "instant",
  88  |         });
  89  |         const samples: { opacity: number; transform: string }[] = [];
  90  |         const start = performance.now();
  91  |         await new Promise<void>((resolve) => {
  92  |           function sample() {
  93  |             const style = getComputedStyle(el);
  94  |             samples.push({
  95  |               opacity: Number(style.opacity),
  96  |               transform: style.transform,
  97  |             });
  98  |             if (performance.now() - start < 1450) requestAnimationFrame(sample);
  99  |             else resolve();
  100 |           }
  101 |           requestAnimationFrame(sample);
  102 |         });
  103 |         return samples;
  104 |       });
  105 |       expect(
  106 |         samples.some(
  107 |           (frame) =>
  108 |             frame.opacity > 0.05 &&
  109 |             frame.opacity < 0.9 &&
  110 |             frame.transform !== "none",
  111 |         ),
  112 |       ).toBe(true);
  113 |       await expect(last).toHaveCSS("opacity", "1");
  114 |       expect(await last.evaluate((el) => el.getAnimations().length)).toBe(0);
  115 |       await expect(last.locator("img")).toBeVisible();
  116 |       if (route === "company")
  117 |         await expect(page.locator("main")).toContainText(
  118 |           getDictionary(prefix ? "en" : "ja").company.notice,
  119 |         );
  120 |     }
  121 |   });
  122 | }
  123 | 
  124 | test("production copy has a prominent localized collaboration CTA and no draft notices", async ({
  125 |   page,
  126 | }) => {
  127 |   await page.emulateMedia({ reducedMotion: "reduce" });
  128 |   for (const locale of ["ja", "en"] as const) {
  129 |     const c = getDictionary(locale),
  130 |       prefix = locale === "en" ? "/en" : "";
  131 |     await page.goto(prefix + "/");
  132 |     await expect(page.locator("main")).not.toContainText(c.review.notice);
  133 |     await expect(page.locator("main")).not.toContainText(c.review.stage);
  134 |     await expect(page.locator("main")).not.toContainText(c.assets.note);
  135 |     await expect(page.locator("main")).not.toContainText(c.collaboration.note);
  136 |     const cta = page.locator(".collaboration-cta");
  137 |     await expect(cta).toHaveText(c.collaboration.button);
  138 |     await expect(cta).toHaveAttribute("href", prefix + "/contact");
  139 |     await cta.scrollIntoViewIfNeeded();
  140 |     expect((await cta.boundingBox())!.height).toBeGreaterThan(90);
  141 |     await cta.click();
  142 |     await expect(page).toHaveURL(new RegExp(prefix + "/contact$"));
  143 |     await expect(page.locator("main")).toContainText(c.contact.notice);
  144 |   }
  145 | });
  146 | 
  147 | test("cursor trails remain removed on mouse, touch and reduced motion", async ({
  148 |   page,
  149 | }) => {
  150 |   await page.goto("/about");
  151 |   await page.mouse.move(80, 160);
  152 |   await page.mouse.move(300, 250, { steps: 14 });
  153 |   await expect(page.locator(".cursor-trail")).toHaveCount(0);
  154 |   await page.mouse.move(630, 400, { steps: 14 });
  155 |   await expect(page.locator(".cursor-trail")).toHaveCount(0);
  156 |   await page.emulateMedia({ reducedMotion: "reduce" });
  157 |   await page.mouse.move(200, 500, { steps: 14 });
  158 |   await expect(page.locator(".cursor-trail")).toHaveCount(0);
  159 | });
  160 | 
```