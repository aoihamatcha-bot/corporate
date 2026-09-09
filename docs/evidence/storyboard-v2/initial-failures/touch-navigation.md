# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> cut-in ends in place across scrolling, touch has no pointer effect
- Location: tests\e2e\site.spec.ts:186:5

# Error details

```
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator: locator('.wonder-section')
Expected: not "true"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "not toHaveAttribute" locator('.wonder-section') with timeout 10000ms
  - waiting for locator('.wonder-section')

```

```yaml
- link "本文へスキップ":
  - /url: "#main"
- banner:
  - link "MYSTENA トップ":
    - /url: /
    - img "MYSTENA"
  - navigation "表示言語":
    - text: 日本語
    - link "English":
      - /url: /en/about
  - button "メニューを開く": メニュー
- complementary:
  - strong: 内容確認用
  - text: 事業説明は採用候補の原稿です。提供状況・法人情報は確認中です。
- main:
  - paragraph:
    - link "トップ":
      - /url: /
    - text: / 私たちについて
  - paragraph: About
  - heading "私たちについて" [level=1]
  - paragraph: 楽しさを考え、使いやすいかたちに。MYSTENAが大切にする考え方をご紹介します。
  - paragraph: 私たちについて
  - heading "楽しさを考え、 使いやすいかたちに。" [level=2]
  - paragraph: MYSTENAは、人と商品・コンテンツの新しい出会いをつくることを目指しています。心が動くアイデアを、実際に使えるサービスへ育てていく。そのために、企画、開発、表現を一つの体験として考えます。
  - figure "アイデアがかたちになる机。企画・開発・制作のつながりを描いたイラストです。":
    - img "ノート、開発用PC、カメラ、商品見本、スマートフォンが並ぶ架空の制作机のイラスト"
    - text: アイデアがかたちになる机。企画・開発・制作のつながりを描いたイラストです。
  - heading "私たちが大切にすること" [level=2]
  - list:
    - listitem:
      - text: "01"
      - heading "好奇心を大切にする。" [level=3]
      - paragraph: まだ知らない魅力に目を向け、新しい出会いのきっかけを探します。
    - listitem:
      - text: "02"
      - heading "分かりやすく伝える。" [level=3]
      - paragraph: 使う人が迷わない言葉と、操作しやすい画面を目指します。
    - listitem:
      - text: "03"
      - heading "信頼を積み重ねる。" [level=3]
      - paragraph: サービスの内容や条件を丁寧に伝え、いただいた声を改善につなげます。
  - paragraph: お問い合わせ
  - heading "新しい可能性は、 ひとつの会話から。" [level=2]
  - paragraph: お問い合わせ窓口は現在準備中です。
  - link "お問い合わせ":
    - /url: /contact
- contentinfo:
  - paragraph: エンターテインメント × テクノロジー
  - navigation "フッターナビゲーション":
    - link "私たちについて":
      - /url: /about
    - link "事業紹介":
      - /url: /business
    - link "お知らせ":
      - /url: /news
    - link "会社概要":
      - /url: /company
    - link "お問い合わせ":
      - /url: /contact
  - link "ページ先頭へ":
    - /url: "#main"
  - link "MYSTENA トップ":
    - /url: /
    - img "MYSTENA"
  - text: © MYSTENA
  - link "プライバシーポリシー":
    - /url: /privacy
- alert: 私たちについて | MYSTENA
```

# Test source

```ts
  113 |     .getByRole("dialog")
  114 |     .getByRole("link", { name: /06 Contact/ });
  115 |   await contact.scrollIntoViewIfNeeded();
  116 |   await contact.click();
  117 |   await expect(page).toHaveURL(/\/contact$/);
  118 |   expect(await page.evaluate(() => document.body.style.position)).toBe("");
  119 | });
  120 | 
  121 | test("contact cannot collect or falsely report sending; unpublished articles return 404", async ({
  122 |   page,
  123 |   request,
  124 | }) => {
  125 |   await page.goto("/contact");
  126 |   await expect(
  127 |     page.getByRole("button", { name: "お問い合わせ受付の準備中です" }),
  128 |   ).toBeDisabled();
  129 |   await expect(
  130 |     page.getByLabel("メールアドレス", { exact: false }),
  131 |   ).toBeDisabled();
  132 |   const contact = await request.post("/api/contact", {
  133 |     data: { message: "Synthetic test only" },
  134 |   });
  135 |   expect(contact.status()).toBe(503);
  136 |   expect((await contact.json()).error).toBe("CONTACT_NOT_CONFIGURED");
  137 |   for (const path of [
  138 |     "/news/unpublished",
  139 |     "/news/nonexistent",
  140 |     "/missing-page",
  141 |   ]) {
  142 |     const response = await page.goto(path);
  143 |     expect(response?.status()).toBe(404);
  144 |     await expect(page.locator("main h1")).toContainText(
  145 |       "ページが見つかりません",
  146 |     );
  147 |   }
  148 |   await page.goto("/news");
  149 |   await expect(
  150 |     page.getByText("現在、公開中のお知らせはありません。", { exact: false }),
  151 |   ).toBeVisible();
  152 | });
  153 | 
  154 | test("device reduced-motion persists on reload and keeps content visible without site controls", async ({
  155 |   page,
  156 | }) => {
  157 |   await page.goto("/");
  158 |   await page.emulateMedia({ reducedMotion: "reduce" });
  159 |   await expect(page.locator(".motion-control")).toHaveCount(0);
  160 |   expect(
  161 |     await page.evaluate(
  162 |       () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  163 |     ),
  164 |   ).toBe(true);
  165 |   await page.reload();
  166 |   await expect(page.locator(".motion-control")).toHaveCount(0);
  167 |   expect(
  168 |     await page.evaluate(
  169 |       () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  170 |     ),
  171 |   ).toBe(true);
  172 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  173 |   await expect(page.getByRole("dialog")).toBeVisible();
  174 |   await page.keyboard.press("Escape");
  175 |   await page.emulateMedia({ reducedMotion: "reduce" });
  176 |   await page.locator(".wonder-section").scrollIntoViewIfNeeded();
  177 |   await expect(page.locator(".wonder-type")).toBeVisible();
  178 |   expect(
  179 |     await page
  180 |       .locator(".wonder-type > span")
  181 |       .first()
  182 |       .evaluate((el) => getComputedStyle(el).transform),
  183 |   ).toBe("none");
  184 | });
  185 | 
  186 | test("cut-in ends in place across scrolling, touch has no pointer effect", async ({
  187 |   page,
  188 |   isMobile,
  189 | }) => {
  190 |   await page.goto("/");
  191 |   const line = page.locator(".wonder-type > span").first();
  192 |   await line.scrollIntoViewIfNeeded();
  193 |   await expect(page.locator(".wonder-section")).toHaveClass(/scene-entered/);
  194 |   // Each line now has its own start delay. An initial transform:none can mean
  195 |   // "waiting", so verify that the actual entrance has finished before scrolling.
  196 |   await expect(line).toHaveAttribute("data-entered", "true");
  197 |   await expect(line).toHaveAttribute("data-reveal-state", "settled");
  198 |   await expect
  199 |     .poll(() => line.evaluate((el) => getComputedStyle(el).transform))
  200 |     .toBe("none");
  201 |   await page.evaluate(() => window.scrollBy({ top: 230, behavior: "instant" }));
  202 |   expect(await line.evaluate((el) => getComputedStyle(el).transform)).toBe(
  203 |     "none",
  204 |   );
  205 |   await page.evaluate(() =>
  206 |     window.scrollBy({ top: -230, behavior: "instant" }),
  207 |   );
  208 |   expect(await line.evaluate((el) => getComputedStyle(el).transform)).toBe(
  209 |     "none",
  210 |   );
  211 |   if (isMobile) {
  212 |     await page.locator(".wonder-section").tap();
> 213 |     await expect(page.locator(".wonder-section")).not.toHaveAttribute(
      |                                                       ^ Error: expect(locator).not.toHaveAttribute(expected) failed
  214 |       "data-pointer",
  215 |       "true",
  216 |     );
  217 |   }
  218 | });
  219 | 
  220 | test("360, 768, and effective 200% desktop zoom have no clipped controls", async ({
  221 |   page,
  222 | }) => {
  223 |   for (const width of [360, 768, 720]) {
  224 |     await page.setViewportSize({ width, height: 900 });
  225 |     await page.goto("/");
  226 |     expect(
  227 |       await page.evaluate(
  228 |         () => document.documentElement.scrollWidth <= innerWidth,
  229 |       ),
  230 |       String(width),
  231 |     ).toBe(true);
  232 |     await page.getByRole("button", { name: "メニューを開く" }).click();
  233 |     const dialog = page.getByRole("dialog");
  234 |     expect(
  235 |       await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
  236 |       String(width),
  237 |     ).toBe(true);
  238 |     await page.getByRole("button", { name: "メニューを閉じる" }).click();
  239 |     await expect(dialog).not.toBeVisible();
  240 |   }
  241 | });
  242 | 
  243 | test("key pages and the full-screen menu pass axe WCAG 2.2 AA", async ({
  244 |   page,
  245 | }) => {
  246 |   for (const path of ["/", "/contact", "/company", "/privacy"]) {
  247 |     await page.goto(path);
  248 |     await page.emulateMedia({ reducedMotion: "reduce" });
  249 |     expect(
  250 |       (
  251 |         await new AxeBuilder({ page })
  252 |           .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  253 |           .analyze()
  254 |       ).violations,
  255 |       path,
  256 |     ).toEqual([]);
  257 |   }
  258 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  259 |   expect(
  260 |     (
  261 |       await new AxeBuilder({ page })
  262 |         .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  263 |         .analyze()
  264 |     ).violations,
  265 |   ).toEqual([]);
  266 | });
  267 | 
  268 | test("without JavaScript all copy and footer routes remain available", async ({
  269 |   browser,
  270 | }) => {
  271 |   const context = await browser.newContext({
  272 |     javaScriptEnabled: false,
  273 |     baseURL: "http://127.0.0.1:3017",
  274 |   });
  275 |   const page = await context.newPage();
  276 |   await page.goto("/");
  277 |   await expect(page.locator("main h1")).toBeVisible();
  278 |   await expect(page.locator(".wonder-type")).toBeVisible();
  279 |   await page
  280 |     .getByRole("navigation", { name: "フッターナビゲーション" })
  281 |     .getByRole("link", { name: "会社概要" })
  282 |     .click();
  283 |   await expect(page.locator("main h1")).toHaveText("会社概要");
  284 |   await context.close();
  285 | });
  286 | 
  287 | test("animation API failure leaves readable content and working navigation", async ({
  288 |   page,
  289 | }) => {
  290 |   await page.addInitScript(() => {
  291 |     Element.prototype.animate = () => {
  292 |       throw new Error("Synthetic animation failure");
  293 |     };
  294 |   });
  295 |   await page.goto("/");
  296 |   await page.locator(".wonder-section").scrollIntoViewIfNeeded();
  297 |   await expect(page.locator(".wonder-type")).toBeVisible();
  298 |   expect(
  299 |     await page
  300 |       .locator(".wonder-type > span")
  301 |       .first()
  302 |       .evaluate((el) => getComputedStyle(el).opacity),
  303 |   ).toBe("1");
  304 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  305 |   await expect(page.getByRole("dialog")).toBeVisible();
  306 | });
  307 | 
```