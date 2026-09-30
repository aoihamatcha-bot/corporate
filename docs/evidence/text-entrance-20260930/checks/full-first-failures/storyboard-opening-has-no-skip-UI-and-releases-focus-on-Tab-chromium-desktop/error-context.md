# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: storyboard.spec.ts >> opening has no skip UI and releases focus on Tab
- Location: tests\e2e\storyboard.spec.ts:62:7

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('#main')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - Expect "toBeFocused" locator('#main') with timeout 10000ms
  - waiting for locator('#main')
    23 × locator resolved to <main id="main" tabindex="-1">…</main>
       - unexpected value "inactive"

```

```yaml
- main:
  - region "好奇心が、 世界を変える。"
  - paragraph: 01 事業紹介
  - heading "MYSTENAの4つの事業" [level=2]
  - paragraph: 各事業の概要をご紹介します。取り組む内容や共同企画のテーマは、事業紹介でご覧いただけます。
  - link "ネットショップで商品を選ぶ女性の2Dイラスト 事業領域 01 エンターテインメントEC 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。 詳しく見る":
    - /url: /business#platform
  - link "コードを書きながらウェブUIを開発する二人の2Dイラスト 事業領域 02 サービス・システム開発 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。 詳しく見る":
    - /url: /business#systems
  - link "商品撮影用カメラと動画編集画面のAI生成イメージ 事業領域 03 映像・コンテンツ制作 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。 詳しく見る":
    - /url: /business#creative
  - link "クリエイターと商品の魅力を発信する共同企画の2Dイラスト 事業領域 04 マーケティング・ コラボレーション 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。 詳しく見る":
    - /url: /business#marketing
  - paragraph: 02 取り組み
  - heading "現在の取り組み" [level=2]
  - paragraph: オンライン販売サービスで、商品を紹介する事業者と、商品を探す利用者がどのように関わるかをご紹介します。
  - figure "事業者と利用者の関係 オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。"
  - link "事業の考え方を見る":
    - /url: /business#approach
  - paragraph: 03 考え方
  - heading "私たちが大切にすること" [level=2]
  - paragraph: 好奇心を持つこと、分かりやすく伝えること、信頼を積み重ねること。この3つを、サービスの企画や開発で大切にしています。
  - link "私たちの考え方を見る":
    - /url: /about
  - region "数字で見るMYSTENA"
  - paragraph: 04 協業・コラボレーション
  - heading "共同企画・開発・制作について" [level=2]
  - paragraph: 商品の共同企画、販売サービスの開発、紹介動画の制作などが、協業の主なテーマです。
  - paragraph: 企画する商品や、開発・制作するものに合わせて、次のような取り組みを考えます。
  - list
  - paragraph: 協業に関するお問い合わせ窓口は、現在準備中です。
  - link "お問い合わせについて":
    - /url: /contact
  - paragraph: 05 お知らせ
  - paragraph: 現在、公開中のお知らせはありません。
  - paragraph: お知らせがある場合は、このページに掲載します。
  - link "お知らせ一覧を見る":
    - /url: /news
  - paragraph: 06 会社概要
  - link "MYSTENAを運営する事業者についてご案内します。 会社概要を見る":
    - /url: /company
  - paragraph: お問い合わせ
  - heading "お問い合わせについて" [level=2]
  - paragraph: 企画・開発・映像制作・協業に関する窓口を準備しています。
  - link "お問い合わせ":
    - /url: /contact
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("opening writes the exact phrase with no ink dots before each pen stroke", async ({
  4   |   page,
  5   | }) => {
  6   |   const errors: string[] = [];
  7   |   page.on("pageerror", (error) => errors.push(error.message));
  8   |   await page.goto("/", { waitUntil: "domcontentloaded" });
  9   |   const opening = page.getByRole("dialog", { name: "MYSTENA オープニング" });
  10  |   await expect(opening).toBeVisible();
  11  |   await expect(page.locator("html")).toHaveAttribute("data-intro", "running");
  12  |   await expect(opening.locator(".sr-only")).toHaveText(
  13  |     "好奇心が、世界を変える。",
  14  |   );
  15  |   await expect(opening.locator("button")).toHaveCount(0);
  16  |   await expect(page.locator(".motion-control, .opening-skip")).toHaveCount(0);
  17  |   await expect(
  18  |     page.locator(".hero h1 > .reveal-text").first(),
  19  |   ).not.toHaveAttribute("data-entered", "true");
  20  |   const strokes = page.locator(".handwriting-stroke");
  21  |   expect(await strokes.count()).toBeGreaterThan(40);
  22  |   await expect
  23  |     .poll(() =>
  24  |       strokes.first().evaluate((el) => getComputedStyle(el).strokeDashoffset),
  25  |     )
  26  |     .toBe("0px");
  27  |   // Future strokes are fully transparent masks, including round start caps.
  28  |   const future = await strokes.evaluateAll((paths) =>
  29  |     paths
  30  |       .filter((path) => {
  31  |         const animation = path.getAnimations()[0];
  32  |         return (
  33  |           animation &&
  34  |           Number(animation.currentTime) <
  35  |             Number(animation.effect!.getTiming().delay)
  36  |         );
  37  |       })
  38  |       .map((path) => getComputedStyle(path).opacity),
  39  |   );
  40  |   expect(future.length).toBeGreaterThan(20);
  41  |   expect(future.every((opacity) => opacity === "0")).toBe(true);
  42  |   await strokes
  43  |     .last()
  44  |     .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  45  |   await expect(strokes.last()).toHaveCSS("opacity", "1");
  46  |   await expect(strokes.last()).toHaveCSS("stroke-dashoffset", "0px");
  47  |   await expect(opening).not.toBeVisible();
  48  |   await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  49  |   await expect(page.locator(".hero-motion-art")).toHaveAttribute(
  50  |     "data-hero-active",
  51  |     "false",
  52  |   );
  53  |   await expect(page.locator(".hero-art img")).toHaveAttribute(
  54  |     "src",
  55  |     /a08-brand-keyvisual/,
  56  |   );
  57  |   await expect(page.locator(".hero-video")).toHaveCount(0);
  58  |   expect(errors).toEqual([]);
  59  | });
  60  | 
  61  | for (const action of ["Tab", "Escape", "scroll"] as const) {
  62  |   test(`opening has no skip UI and releases focus on ${action}`, async ({
  63  |     page,
  64  |   }) => {
  65  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  66  |     await expect(page.locator(".site-opening")).toBeVisible();
  67  |     if (action === "scroll")
  68  |       await page.evaluate(() =>
  69  |         window.scrollTo({ top: 500, behavior: "instant" }),
  70  |       );
  71  |     else await page.keyboard.press(action);
  72  |     await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  73  |     await expect(page.locator(".site-opening")).not.toBeVisible();
> 74  |     await expect(page.locator("#main")).toBeFocused();
      |                                         ^ Error: expect(locator).toBeFocused() failed
  75  |     expect(
  76  |       await page.evaluate(() => document.querySelector(":modal")),
  77  |     ).toBeNull();
  78  |     await page.getByRole("button", { name: "メニューを開く" }).click();
  79  |     await expect(
  80  |       page.getByRole("button", { name: "メニューを閉じる" }),
  81  |     ).toBeVisible();
  82  |     await expect(page.locator(".motion-control")).toHaveCount(0);
  83  |   });
  84  | }
  85  | 
  86  | test("opening replays on reload and full home navigation in both languages", async ({
  87  |   page,
  88  | }) => {
  89  |   await page.goto("/");
  90  |   await expect(page.locator(".site-opening")).toBeVisible();
  91  |   await page.keyboard.press("Escape");
  92  |   // A value from the previous first-session-only implementation is ignored.
  93  |   await page.evaluate(() =>
  94  |     sessionStorage.setItem("mystena-opening-v2", "seen"),
  95  |   );
  96  |   await page.reload();
  97  |   await expect(page.locator(".site-opening")).toBeVisible();
  98  |   await page.keyboard.press("Escape");
  99  |   for (const path of ["/about", "/", "/en"]) {
  100 |     await page.goto(path);
  101 |     if (path !== "/about") {
  102 |       await expect(page.locator(".site-opening")).toBeVisible();
  103 |       await page.keyboard.press("Escape");
  104 |     }
  105 |     await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  106 |     await expect(page.locator(".site-opening")).not.toBeVisible();
  107 |     await expect(page.locator("main h1")).toBeVisible();
  108 |     await expect(page.locator(".motion-control")).toHaveCount(0);
  109 |   }
  110 | });
  111 | 
  112 | test("device preferences and direct anchors work; the removed saved toggle has no effect", async ({
  113 |   page,
  114 | }) => {
  115 |   await page.emulateMedia({ reducedMotion: "reduce" });
  116 |   await page.goto("/");
  117 |   await expect(page.locator(".site-opening")).not.toBeVisible();
  118 |   await expect(page.locator(".hero-light")).not.toBeVisible();
  119 |   await expect(page.locator(".story-card-media").last()).toHaveCSS(
  120 |     "opacity",
  121 |     "1",
  122 |   );
  123 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  124 |   await page.goto("/#business");
  125 |   await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  126 |   await expect(page.locator("#business")).toBeInViewport();
  127 |   await page.evaluate(() =>
  128 |     localStorage.setItem("mystena-corporate-motion", "paused"),
  129 |   );
  130 |   await page.goto("/");
  131 |   await expect(page.locator(".site-opening")).toBeVisible();
  132 |   await page.keyboard.press("Escape");
  133 |   await expect(page.locator(".hero-motion-art")).toHaveAttribute(
  134 |     "data-hero-active",
  135 |     "false",
  136 |   );
  137 | });
  138 | 
  139 | test("changing reduced motion during the opening releases the native modal", async ({
  140 |   page,
  141 | }) => {
  142 |   await page.goto("/", { waitUntil: "domcontentloaded" });
  143 |   await expect(page.locator(".site-opening")).toBeVisible();
  144 |   await page.emulateMedia({ reducedMotion: "reduce" });
  145 |   await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  146 |   expect(
  147 |     await page.evaluate(() => document.querySelector(":modal")),
  148 |   ).toBeNull();
  149 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  150 |   await expect(
  151 |     page.getByRole("button", { name: "メニューを閉じる" }),
  152 |   ).toBeVisible();
  153 | });
  154 | 
  155 | test("thumbnails wait transparent offscreen, fade and travel on entry, then stay settled", async ({
  156 |   page,
  157 | }) => {
  158 |   await page.goto("/");
  159 |   await expect(page.locator(".site-opening")).not.toBeVisible();
  160 |   const card = page.locator(".story-card-media").first();
  161 |   await expect(card).not.toHaveAttribute("data-story-entered", "true");
  162 |   await expect(card).toHaveCSS("opacity", "0");
  163 |   // Moving ink stays inside the reserved image frame, clear of the copy.
  164 |   await expect(page.locator(".story-card-frame").first()).toHaveCSS(
  165 |     "overflow",
  166 |     "clip",
  167 |   );
  168 |   const frames = await card.evaluate(async (el) => {
  169 |     const result: { opacity: number; transform: string; top: number }[] = [];
  170 |     el.scrollIntoView({ block: "center", behavior: "instant" });
  171 |     const start = performance.now();
  172 |     await new Promise<void>((resolve) => {
  173 |       function sample() {
  174 |         const style = getComputedStyle(el);
```