# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gradient-surfaces.spec.ts >> section colors keep their authored palette and background washes remain soft
- Location: tests\e2e\gradient-surfaces.spec.ts:3:5

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 0.28
Received: 0

Expected precision:    2
Expected difference: < 0.005
Received difference:   0.28
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "本文へスキップ" [ref=e2]:
    - /url: "#main"
    - generic [ref=e3]:
      - generic [ref=e4]: 本文へスキップ
      - generic [aria-hidden]: 本文へスキップ
  - banner [ref=e5]:
    - link "MYSTENA トップ" [ref=e6]:
      - /url: /
      - img "MYSTENA" [ref=e8]
    - text: 事業紹介 私たちについて 会社概要
    - navigation "表示言語" [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e12]:
          - generic [ref=e13]: 日本語
          - generic [aria-hidden]: 日本語
        - link "English" [ref=e14]:
          - /url: /en/about
          - generic [ref=e15]:
            - generic [ref=e16]: English
            - generic [aria-hidden]: English
    - button "メニューを開く" [ref=e18] [cursor=pointer]:
      - generic [ref=e19]:
        - generic [ref=e20]: メニュー
        - generic [aria-hidden]: メニュー
  - text: 閉じる 01 Home トップ 02 About 私たちについて 03 Business 事業紹介 04 News お知らせ 05 Company 会社概要 06 Contact お問い合わせ 日本語 English MYSTENAの事業と会社情報 お問い合わせ プライバシーポリシー MYSTENA MYSTENAの事業をご紹介します。
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]:
        - paragraph [ref=e25]:
          - link "トップ" [ref=e26]:
            - /url: /
            - generic [ref=e27]:
              - generic [ref=e28]: トップ
              - generic [aria-hidden]: トップ
          - generic [ref=e29]:
            - generic [ref=e30]: /
            - generic [aria-hidden]: /
          - generic [ref=e31]:
            - generic [ref=e32]: 私たちについて
            - generic [aria-hidden]: 私たちについて
        - paragraph [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: About
            - generic [aria-hidden]: About
        - heading "私たちについて" [level=1] [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]: 私たちについて
            - generic [aria-hidden]: 私たちについて
        - paragraph [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e41]: MYSTENAがサービスづくりで大切にする考え方をご紹介します。
            - generic [aria-hidden]: MYSTENAがサービスづくりで大切にする考え方をご紹介します。
      - generic [ref=e43]:
        - paragraph [ref=e44]:
          - generic [ref=e45]:
            - generic [ref=e46]: 私たちについて
            - generic [aria-hidden]: 私たちについて
        - generic [ref=e47]:
          - heading "楽しさと使いやすさを 大切にしたサービスづくり" [level=2] [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: 楽しさと使いやすさを 大切にしたサービスづくり
              - generic [aria-hidden]: 楽しさと使いやすさを 大切にしたサービスづくり
          - paragraph [ref=e52]:
            - generic [ref=e53]:
              - generic [ref=e54]: MYSTENAは、商品やコンテンツを楽しめるサービスづくりを目指しています。企画から開発、映像や文章による紹介まで、利用する人にとって分かりやすく、使いやすいかを考えます。
              - generic [aria-hidden]: MYSTENAは、商品やコンテンツを楽しめるサービスづくりを目指しています。企画から開発、映像や文章による紹介まで、利用する人にとって分かりやすく、使いやすいかを考えます。
          - figure "企画・開発・制作で使う道具を描いたイラストです。" [ref=e55]:
            - img "ノート、開発用PC、カメラ、商品見本、スマートフォンが並ぶ架空の制作机のイラスト" [ref=e59]
            - generic [ref=e61]:
              - generic [ref=e62]: 企画・開発・制作で使う道具を描いたイラストです。
              - generic [aria-hidden]: 企画・開発・制作で使う道具を描いたイラストです。
      - generic [ref=e64]:
        - heading "私たちが大切にすること" [level=2] [ref=e65]:
          - generic [ref=e66]:
            - generic [ref=e67]: 私たちが大切にすること
            - generic [aria-hidden]: 私たちが大切にすること
        - list [ref=e68]:
          - listitem [ref=e69]:
            - generic [ref=e71]:
              - generic [ref=e72]: "01"
              - generic [aria-hidden]: "01"
            - heading "好奇心を大切にする。" [level=3] [ref=e73]:
              - generic [ref=e74]:
                - generic [ref=e75]: 好奇心を大切にする。
                - generic [aria-hidden]: 好奇心を大切にする。
            - paragraph [ref=e76]:
              - generic [ref=e77]:
                - generic [ref=e78]: 新しい商品や表現、技術に関心を持ち、企画やサービスづくりに生かします。
                - generic [aria-hidden]: 新しい商品や表現、技術に関心を持ち、企画やサービスづくりに生かします。
          - listitem [ref=e79]:
            - generic [ref=e81]:
              - generic [ref=e82]: "02"
              - generic [aria-hidden]: "02"
            - heading "分かりやすく伝える。" [level=3] [ref=e83]:
              - generic [ref=e84]:
                - generic [ref=e85]: 分かりやすく伝える。
                - generic [aria-hidden]: 分かりやすく伝える。
            - paragraph [ref=e86]:
              - generic [ref=e87]:
                - generic [ref=e88]: 使う人が迷わない言葉と、操作しやすい画面を目指します。
                - generic [aria-hidden]: 使う人が迷わない言葉と、操作しやすい画面を目指します。
          - listitem [ref=e89]:
            - generic [ref=e91]:
              - generic [ref=e92]: "03"
              - generic [aria-hidden]: "03"
            - heading "信頼を積み重ねる。" [level=3] [ref=e93]:
              - generic [ref=e94]:
                - generic [ref=e95]: 信頼を積み重ねる。
                - generic [aria-hidden]: 信頼を積み重ねる。
            - paragraph [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]: サービスの内容や条件を丁寧に伝え、いただいた声を改善につなげます。
                - generic [aria-hidden]: サービスの内容や条件を丁寧に伝え、いただいた声を改善につなげます。
      - generic [ref=e100]:
        - paragraph [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: お問い合わせ
            - generic [aria-hidden]: お問い合わせ
        - generic [ref=e104]:
          - heading "お問い合わせについて" [level=2] [ref=e105]:
            - generic [ref=e106]:
              - generic [ref=e107]: お問い合わせについて
              - generic [aria-hidden]: お問い合わせについて
          - generic [ref=e108]:
            - paragraph [ref=e109]:
              - generic [ref=e110]:
                - generic [ref=e111]: 企画・開発・映像制作・協業に関する窓口を準備しています。
                - generic [aria-hidden]: 企画・開発・映像制作・協業に関する窓口を準備しています。
            - link "お問い合わせ" [ref=e112]:
              - /url: /contact
              - generic [ref=e113]:
                - generic [ref=e114]: お問い合わせ
                - generic [aria-hidden]: お問い合わせ
  - contentinfo [ref=e118]:
    - generic [ref=e119]:
      - generic [ref=e120]:
        - paragraph [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]: エンターテインメント × テクノロジー
            - generic [aria-hidden]: エンターテインメント × テクノロジー
        - navigation "フッターナビゲーション" [ref=e124]:
          - link "私たちについて" [ref=e125]:
            - /url: /about
            - generic [ref=e126]:
              - generic [ref=e127]: 私たちについて
              - generic [aria-hidden]: 私たちについて
          - link "事業紹介" [ref=e128]:
            - /url: /business
            - generic [ref=e129]:
              - generic [ref=e130]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - link "お知らせ" [ref=e131]:
            - /url: /news
            - generic [ref=e132]:
              - generic [ref=e133]: お知らせ
              - generic [aria-hidden]: お知らせ
          - link "会社概要" [ref=e134]:
            - /url: /company
            - generic [ref=e135]:
              - generic [ref=e136]: 会社概要
              - generic [aria-hidden]: 会社概要
          - link "お問い合わせ" [ref=e137]:
            - /url: /contact
            - generic [ref=e138]:
              - generic [ref=e139]: お問い合わせ
              - generic [aria-hidden]: お問い合わせ
        - link "ページ先頭へ" [ref=e140]:
          - /url: "#main"
      - link "MYSTENA トップ" [ref=e143]:
        - /url: /
        - img "MYSTENA" [ref=e145]
      - generic [ref=e146]:
        - generic [ref=e147]:
          - generic [ref=e148]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "プライバシーポリシー" [ref=e149]:
          - /url: /privacy
          - generic [ref=e150]:
            - generic [ref=e151]: プライバシーポリシー
            - generic [aria-hidden]: プライバシーポリシー
  - alert [ref=e152]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("section colors keep their authored palette and background washes remain soft", async ({ page }) => {
  4  |   const surfaces: string[] = [];
  5  |   for (const seed of [0.01, 0.99]) {
  6  |     await page.addInitScript((value) => { Math.random = () => value; }, seed);
  7  |     await page.goto("/about");
  8  |     const intro = page.locator(".page-intro");
  9  |     await expect(intro).toHaveClass(/scene-entered/);
  10 |     await expect(intro).toHaveAttribute("data-palette", "mint");
  11 |     const result = await intro.evaluate((el) => {
  12 |       const lead = el.querySelector(".color-lead")!;
  13 |       const animation = lead.getAnimations()[0];
  14 |       const effect = animation.effect as KeyframeEffect;
  15 |       const frames = effect.getKeyframes();
  16 |       return {
  17 |         background: getComputedStyle(el).backgroundImage,
  18 |         mask: getComputedStyle(lead).maskImage,
  19 |         peak: Math.max(...frames.map((frame) => Number(frame.opacity))),
  20 |         final: frames.at(-1)?.opacity,
  21 |         iterations: effect.getTiming().iterations,
  22 |       };
  23 |     });
  24 |     surfaces.push(result.background);
  25 |     expect(result.background).toContain("radial-gradient");
  26 |     expect(result.mask).toContain("linear-gradient");
> 27 |     expect(result.peak).toBeCloseTo(0.28, 2);
     |                         ^ Error: expect(received).toBeCloseTo(expected, precision)
  28 |     expect(Number(result.final)).toBe(0);
  29 |     expect(result.iterations).toBe(1);
  30 |     await expect(intro.locator(".color-lead")).toHaveCSS("opacity", "0");
  31 |     await expect(intro).toHaveAttribute("data-palette", "mint");
  32 |   }
  33 |   expect(surfaces[0]).toBe(surfaces[1]);
  34 | });
  35 | 
  36 | test("all Hero copy has static gradient ink with a single readable image shade", async ({ page }) => {
  37 |   await page.emulateMedia({ reducedMotion: "reduce" });
  38 |   for (const route of ["/", "/en"]) {
  39 |     await page.goto(route);
  40 |     const hero = page.locator(".hero");
  41 |     await expect(hero.locator(".hero-shade")).toHaveCount(1);
  42 |     const result = await hero.evaluate((el) => ({
  43 |       after: getComputedStyle(el, "::after").content,
  44 |       shade: getComputedStyle(el.querySelector(".hero-shade")!).backgroundImage,
  45 |       text: [...el.querySelectorAll(".reveal-source")].map((source) => ({
  46 |         text: source.textContent?.trim(),
  47 |         gradient: getComputedStyle(source).backgroundImage,
  48 |         clip: getComputedStyle(source).backgroundClip,
  49 |         opacity: getComputedStyle(source).opacity,
  50 |       })),
  51 |       animations: el.getAnimations({ subtree: true }).length,
  52 |     }));
  53 |     expect(result.after).toBe("none");
  54 |     expect(result.shade).toContain("linear-gradient");
  55 |     expect(result.text.length).toBeGreaterThanOrEqual(12);
  56 |     for (const source of result.text) {
  57 |       expect(source.text).toBeTruthy();
  58 |       expect(source.gradient).toContain("linear-gradient");
  59 |       expect(source.clip).toBe("text");
  60 |       expect(source.opacity).toBe("1");
  61 |     }
  62 |     expect(result.animations).toBe(0);
  63 |   }
  64 |   await page.emulateMedia({ forcedColors: "active" });
  65 |   for (const source of await page.locator(".hero .reveal-source").all()) {
  66 |     await expect(source).toHaveCSS("background-image", "none");
  67 |     expect(await source.evaluate((el) => getComputedStyle(el).webkitTextFillColor)).not.toBe("rgba(0, 0, 0, 0)");
  68 |   }
  69 | });
  70 | 
  71 | test("body color cancels safely on reduced motion and animation API failure", async ({ page }) => {
  72 |   await page.goto("/about");
  73 |   const text = page.locator(".page-description .reveal-text");
  74 |   await expect(text).toHaveAttribute("data-reveal-state", "running");
  75 |   await page.emulateMedia({ reducedMotion: "reduce" });
  76 |   await expect(text).toHaveAttribute("data-reveal-state", "settled");
  77 |   await expect(text.locator(".reveal-source")).toHaveCSS("opacity", "1");
  78 |   expect(await text.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  79 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  80 |   await page.addInitScript(() => {
  81 |     Element.prototype.animate = () => { throw new Error("Synthetic animation API failure"); };
  82 |   });
  83 |   const errors: string[] = [];
  84 |   page.on("pageerror", (error) => errors.push(error.message));
  85 |   await page.reload();
  86 |   await expect(text).toHaveAttribute("data-reveal-state", "settled");
  87 |   await expect(text.locator(".reveal-source")).toBeVisible();
  88 |   await expect(text.locator(".reveal-color")).toHaveCSS("opacity", "0");
  89 |   await expect(text.locator(".reveal-source")).toHaveCSS("clip-path", "none");
  90 |   expect(errors).toEqual([]);
  91 | });
  92 | 
```