# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: afterglow.spec.ts >> body, labels and navigation use readable static text across both languages
- Location: tests\e2e\afterglow.spec.ts:3:5

# Error details

```
Error: /: 本文へスキップ

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

@@ -3,7 +3,7 @@
    "clipPath": "none",
    "decorations": 0,
    "mask": "none",
    "motion": "static",
    "opacity": "1",
-   "visibility": "visible",
+   "visibility": "hidden",
  }
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "本文へスキップ" [ref=e2]:
    - /url: "#main"
  - banner [ref=e5]:
    - link "MYSTENA トップ" [ref=e6]:
      - /url: /
      - img "MYSTENA" [ref=e8]
    - navigation "表示言語" [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e11]: 日本語
        - link "English" [ref=e14]:
          - /url: /en
    - button "メニューを開く" [ref=e18] [cursor=pointer]:
      - generic [ref=e19]: メニュー
  - main [ref=e21]:
    - generic [ref=e22]:
      - dialog "MYSTENA オープニング" [active] [ref=e23]:
        - img "MYSTENA" [ref=e24]
        - paragraph [ref=e25]: 好奇心が、世界を変える。
      - region [ref=e151]:
        - generic [ref=e156]:
          - paragraph [ref=e157]:
            - generic [ref=e159]: エンターテインメント × テクノロジー
          - heading "好奇心が、 世界を変える。" [level=1] [ref=e161]:
            - generic [ref=e162]:
              - generic [ref=e163]: 好奇心が、
              - text: 好奇心が、
            - generic [ref=e164]:
              - generic [ref=e165]: 世界を変える。
              - text: 世界を変える。
          - paragraph [ref=e166]:
            - generic [ref=e167]: MYSTENAは、オンラインサービス、システム開発、映像制作、販売促進に取り組んでいます。販売・運営を支えるシステムや商品紹介動画、ブランド・クリエイターとの共同企画など、4つの領域をご紹介します。
          - generic [ref=e169]:
            - link "事業紹介を見る" [ref=e170]:
              - /url: /business
            - link "会社概要を見る" [ref=e176]:
              - /url: /company
        - generic [ref=e182]:
          - generic [ref=e183]: MYSTENAの事業をご紹介します。
          - link "下へスクロール" [ref=e186]:
            - /url: "#business"
        - list "企画・開発・映像制作・販売促進" [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: 企画
          - listitem [ref=e196]:
            - generic [ref=e197]: 開発
          - listitem [ref=e200]:
            - generic [ref=e201]: 映像制作
          - listitem [ref=e204]:
            - generic [ref=e205]: 販売促進
      - generic [ref=e207]:
        - generic [ref=e208]:
          - paragraph [ref=e209]:
            - generic [ref=e210]: "01"
            - generic [ref=e212]: 事業紹介
          - generic [ref=e214]:
            - heading "MYSTENAの4つの事業" [level=2] [ref=e215]:
              - generic [ref=e216]:
                - generic [ref=e217]: MYSTENAの4つの事業
                - generic [aria-hidden]: MYSTENAの4つの事業
            - paragraph [ref=e218]:
              - generic [ref=e219]: 各事業の概要をご紹介します。取り組む内容や共同企画のテーマは、事業紹介でご覧いただけます。
        - generic [ref=e221]:
          - link "ネットショップで商品を選ぶ女性の2Dイラスト 事業領域 01 エンターテインメントEC 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。 詳しく見る" [ref=e222]:
            - /url: /business#platform
            - img "ネットショップで商品を選ぶ女性の2Dイラスト" [ref=e226]
            - generic [ref=e227]: 事業領域 01
            - heading "エンターテインメントEC" [level=3] [ref=e230]:
              - generic [ref=e231]:
                - generic [ref=e232]: エンターテインメントEC
                - generic [aria-hidden]: エンターテインメントEC
            - paragraph [ref=e233]:
              - generic [ref=e234]: 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。
            - generic [ref=e236]: 詳しく見る
          - link "コードを書きながらウェブUIを開発する二人の2Dイラスト 事業領域 02 サービス・システム開発 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。 詳しく見る" [ref=e242]:
            - /url: /business#systems
            - img "コードを書きながらウェブUIを開発する二人の2Dイラスト" [ref=e246]
            - generic [ref=e247]: 事業領域 02
            - heading "サービス・システム開発" [level=3] [ref=e250]:
              - generic [ref=e251]:
                - generic [ref=e252]: サービス・システム開発
                - generic [aria-hidden]: サービス・システム開発
            - paragraph [ref=e253]:
              - generic [ref=e254]: 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。
            - generic [ref=e256]: 詳しく見る
          - link "商品撮影用カメラと動画編集画面のAI生成イメージ 事業領域 03 映像・コンテンツ制作 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。 詳しく見る" [ref=e262]:
            - /url: /business#creative
            - img "商品撮影用カメラと動画編集画面のAI生成イメージ" [ref=e266]
            - generic [ref=e267]: 事業領域 03
            - heading "映像・コンテンツ制作" [level=3] [ref=e270]:
              - generic [ref=e271]:
                - generic [ref=e272]: 映像・コンテンツ制作
                - generic [aria-hidden]: 映像・コンテンツ制作
            - paragraph [ref=e273]:
              - generic [ref=e274]: 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。
            - generic [ref=e276]: 詳しく見る
          - link "クリエイターと商品の魅力を発信する共同企画の2Dイラスト 事業領域 04 マーケティング・ コラボレーション 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。 詳しく見る" [ref=e282]:
            - /url: /business#marketing
            - img "クリエイターと商品の魅力を発信する共同企画の2Dイラスト" [ref=e286]
            - generic [ref=e287]: 事業領域 04
            - heading "マーケティング・ コラボレーション" [level=3] [ref=e290]:
              - generic [ref=e291]:
                - generic [ref=e292]: マーケティング・ コラボレーション
                - generic [aria-hidden]: マーケティング・ コラボレーション
            - paragraph [ref=e293]:
              - generic [ref=e294]: 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。
            - generic [ref=e296]: 詳しく見る
      - generic [ref=e303]:
        - generic [ref=e304]:
          - paragraph [ref=e305]:
            - generic [ref=e306]: "02"
            - generic [ref=e308]: 取り組み
          - generic [ref=e310]:
            - heading "現在の取り組み" [level=2] [ref=e311]:
              - generic [ref=e312]:
                - generic [ref=e313]: 現在の取り組み
                - generic [aria-hidden]: 現在の取り組み
            - paragraph [ref=e314]:
              - generic [ref=e315]: オンライン販売サービスで、商品を紹介する事業者と、商品を探す利用者がどのように関わるかをご紹介します。
        - figure "事業者・MYSTENA・利用者の関係 オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。" [ref=e317]:
          - generic [ref=e318]:
            - heading "事業者・MYSTENA・利用者の関係" [level=3] [ref=e319]
            - paragraph [ref=e322]:
              - generic [ref=e323]: オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。
          - generic [ref=e325]:
            - strong [ref=e326]:
              - generic [ref=e327]: この図が示すこと
            - paragraph [ref=e329]:
              - generic [ref=e330]: 商品の紹介方法と、商品を探し、選ぶときの使いやすさを考えるための関係図です。
          - list [ref=e332]:
            - listitem [ref=e333]:
              - generic [ref=e334]: "01"
              - heading "商品を届ける事業者" [level=4] [ref=e337]
              - paragraph [ref=e340]:
                - generic [ref=e341]: 商品やコンテンツを紹介する
            - listitem [ref=e343]:
              - generic [ref=e344]: "02"
              - heading "MYSTENAのサービス" [level=4] [ref=e347]
              - paragraph [ref=e350]:
                - generic [ref=e351]: 商品の紹介方法とサービスの使い方を設計する
            - listitem [ref=e353]:
              - generic [ref=e354]: "03"
              - heading "商品を探す利用者" [level=4] [ref=e357]
              - paragraph [ref=e360]:
                - generic [ref=e361]: 商品やコンテンツを知り、選ぶことを楽しむ
        - link "事業の考え方を見る" [ref=e363]:
          - /url: /business#approach
      - generic [ref=e370]:
        - paragraph [ref=e371]:
          - generic [ref=e372]: "03"
          - generic [ref=e374]: 考え方
        - heading "私たちが大切にすること" [level=2] [ref=e376]:
          - generic [ref=e377]:
            - generic [ref=e378]: 私たちが大切にすること
            - generic [aria-hidden]: 私たちが大切にすること
        - generic [ref=e379]:
          - paragraph [ref=e381]:
            - generic [ref=e382]: 好奇心を持つこと、分かりやすく伝えること、信頼を積み重ねること。この3つを、サービスの企画や開発で大切にしています。
          - link "私たちの考え方を見る" [ref=e384]:
            - /url: /about
        - region [ref=e390]:
          - heading "数字で見るMYSTENA" [level=3] [ref=e391]
          - generic [ref=e394]:
            - generic [ref=e395]:
              - term [ref=e396]:
                - generic [ref=e397]: 提携者数
              - definition [ref=e399]:
                - generic [ref=e400]:
                  - generic [ref=e401]: "2"
                  - generic [aria-hidden] [ref=e402]:
                    - generic [ref=e403]: "2"
                    - generic: "2"
                - generic [ref=e404]: 社
            - generic [ref=e407]:
              - term [ref=e408]:
                - generic [ref=e409]: 出店者数
              - definition [ref=e411]:
                - generic [ref=e412]:
                  - generic [ref=e413]: "10"
                  - generic [aria-hidden] [ref=e414]:
                    - generic [ref=e415]: "10"
                    - generic: "10"
                - generic [ref=e416]: 店
            - generic [ref=e419]:
              - term [ref=e420]:
                - generic [ref=e421]: 登録ユーザー数
              - definition [ref=e423]:
                - generic [ref=e424]:
                  - generic [ref=e425]: 1,000
                  - generic [aria-hidden] [ref=e426]:
                    - generic [ref=e427]: 1,000
                    - generic: 1,000
                - generic [ref=e428]: 人
          - paragraph [ref=e431]:
            - generic [ref=e432]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
      - generic [ref=e435]:
        - paragraph [ref=e436]:
          - generic [ref=e437]: "04"
          - generic [ref=e439]: 協業・コラボレーション
        - generic [ref=e441]:
          - heading "共同企画・開発・制作について" [level=2] [ref=e442]:
            - generic [ref=e443]:
              - generic [ref=e444]: 共同企画・開発・制作について
              - generic [aria-hidden]: 共同企画・開発・制作について
          - generic [ref=e445]:
            - paragraph [ref=e446]:
              - generic [ref=e447]: 商品の共同企画、販売サービスの開発、紹介動画の制作などが、協業の主なテーマです。
            - paragraph [ref=e449]:
              - generic [ref=e450]: 企画する商品や、開発・制作するものに合わせて、次のような取り組みを考えます。
          - list [ref=e452]:
            - listitem [ref=e453]:
              - generic [ref=e455]: "01"
              - generic [ref=e457]: 商品・限定商品の共同企画や監修
            - listitem [ref=e459]:
              - generic [ref=e461]: "02"
              - generic [ref=e463]: 販売サービスや事業者向けシステムの開発
            - listitem [ref=e465]:
              - generic [ref=e467]: "03"
              - generic [ref=e469]: 商品紹介動画・広告素材の制作
            - listitem [ref=e471]:
              - generic [ref=e473]: "04"
              - generic [ref=e475]: SNS施策やインフルエンサーとのタイアップ
          - paragraph [ref=e477]:
            - generic [ref=e478]: 協業に関するお問い合わせ窓口は、現在準備中です。
          - link "お問い合わせについて" [ref=e480]:
            - /url: /contact
      - generic [ref=e488]:
        - paragraph [ref=e489]:
          - generic [ref=e490]: "05"
          - generic [ref=e492]: お知らせ
        - generic [ref=e494]:
          - generic [ref=e495]:
            - paragraph [ref=e496]:
              - generic [ref=e497]: 現在、公開中のお知らせはありません。
            - paragraph [ref=e499]:
              - generic [ref=e500]: お知らせがある場合は、このページに掲載します。
          - link "お知らせ一覧を見る" [ref=e502]:
            - /url: /news
      - generic [ref=e509]:
        - paragraph [ref=e510]:
          - generic [ref=e511]: "06"
          - generic [ref=e513]: 会社概要
        - link "MYSTENAを運営する事業者についてご案内します。 会社概要を見る" [ref=e515]:
          - /url: /company
          - heading "MYSTENAを運営する事業者についてご案内します。" [level=2] [ref=e516]:
            - generic [ref=e517]:
              - generic [ref=e518]: MYSTENAを運営する事業者についてご案内します。
              - generic [aria-hidden]: MYSTENAを運営する事業者についてご案内します。
          - generic [ref=e519]: 会社概要を見る
      - generic [ref=e525]:
        - paragraph [ref=e526]:
          - generic [ref=e527]: お問い合わせ
        - generic [ref=e529]:
          - heading "お問い合わせについて" [level=2] [ref=e530]:
            - generic [ref=e531]:
              - generic [ref=e532]: お問い合わせについて
              - generic [aria-hidden]: お問い合わせについて
          - generic [ref=e533]:
            - paragraph [ref=e534]:
              - generic [ref=e535]: 企画・開発・映像制作・協業に関する窓口を準備しています。
            - link "お問い合わせ" [ref=e537]:
              - /url: /contact
  - contentinfo [ref=e543]:
    - generic [ref=e544]:
      - generic [ref=e545]:
        - paragraph [ref=e546]:
          - generic [ref=e547]: エンターテインメント × テクノロジー
        - navigation "フッターナビゲーション" [ref=e549]:
          - link "私たちについて" [ref=e550]:
            - /url: /about
          - link "事業紹介" [ref=e553]:
            - /url: /business
          - link "お知らせ" [ref=e556]:
            - /url: /news
          - link "会社概要" [ref=e559]:
            - /url: /company
          - link "お問い合わせ" [ref=e562]:
            - /url: /contact
        - link "ページ先頭へ" [ref=e565]:
          - /url: "#main"
      - link "MYSTENA トップ" [ref=e568]:
        - /url: /
        - img "MYSTENA" [ref=e570]
      - generic [ref=e571]:
        - generic [ref=e572]: © MYSTENA
        - link "プライバシーポリシー" [ref=e574]:
          - /url: /privacy
  - alert [ref=e577]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("body, labels and navigation use readable static text across both languages", async ({
  4   |   page,
  5   | }) => {
  6   |   for (const route of [
  7   |     "/",
  8   |     "/about",
  9   |     "/business",
  10  |     "/company",
  11  |     "/news",
  12  |     "/contact",
  13  |     "/privacy",
  14  |     "/missing-page",
  15  |     "/en",
  16  |     "/en/about",
  17  |     "/en/business",
  18  |     "/en/company",
  19  |     "/en/news",
  20  |     "/en/contact",
  21  |     "/en/privacy",
  22  |     "/en/missing-page",
  23  |   ]) {
  24  |     await page.goto(route);
  25  |     const uncovered = await page.evaluate(() => {
  26  |       const walker = document.createTreeWalker(
  27  |         document.body,
  28  |         NodeFilter.SHOW_TEXT,
  29  |       );
  30  |       const missing: string[] = [];
  31  |       while (walker.nextNode()) {
  32  |         const node = walker.currentNode;
  33  |         if (!node.textContent?.trim()) continue;
  34  |         const parent = node.parentElement!;
  35  |         // Retain coverage of authored copy. RevealText sources now include
  36  |         // static body/labels as well as the separate animated heading sources.
  37  |         if (
  38  |           parent.closest(
  39  |             ".reveal-source, .menu-ink-base, script, style, option, .sr-only, [aria-hidden='true'], nextjs-portal, .hero[data-motion-static] .hero-capabilities, .hero[data-motion-static] .hero-scroll-cue",
  40  |           )
  41  |         )
  42  |           continue;
  43  |         const range = document.createRange();
  44  |         range.selectNodeContents(node);
  45  |         if (range.getBoundingClientRect().width > 0)
  46  |           missing.push(node.textContent.trim());
  47  |       }
  48  |       return missing;
  49  |     });
  50  |     expect(uncovered, route).toEqual([]);
  51  |     const staticText = await page
  52  |       .locator('.reveal-text:not([data-motion-kind="heading"])')
  53  |       .evaluateAll((elements) =>
  54  |         elements
  55  |           .filter((el) => !el.closest('[aria-hidden="true"], dialog:not([open])'))
  56  |           .map((el) => {
  57  |             const source = el.querySelector(".reveal-source")!;
  58  |             const style = getComputedStyle(source);
  59  |             return {
  60  |               text: source.textContent?.trim(),
  61  |               kind: el.getAttribute("data-motion-kind"),
  62  |               motion: el.getAttribute("data-text-motion"),
  63  |               opacity: style.opacity,
  64  |               visibility: style.visibility,
  65  |               clipPath: style.clipPath,
  66  |               mask: style.maskImage,
  67  |               decorations: el.querySelectorAll(
  68  |                 ".reveal-color, .reveal-bands, .reveal-band",
  69  |               ).length,
  70  |               animations: el.getAnimations({ subtree: true }).length,
  71  |             };
  72  |           }),
  73  |       );
  74  |     expect(staticText.length, route).toBeGreaterThan(0);
  75  |     expect(staticText.some((entry) => entry.kind === "body"), route).toBe(true);
  76  |     for (const entry of staticText) {
  77  |       expect(entry.text, route).toBeTruthy();
> 78  |       expect(entry, `${route}: ${entry.text}`).toMatchObject({
      |                                                ^ Error: /: 本文へスキップ
  79  |         motion: "static",
  80  |         opacity: "1",
  81  |         visibility: "visible",
  82  |         clipPath: "none",
  83  |         mask: "none",
  84  |         decorations: 0,
  85  |         animations: 0,
  86  |       });
  87  |     }
  88  |   }
  89  |   await page.goto("/");
  90  |   await page.getByRole("button", { name: "メニューを開く" }).click();
  91  |   const dialog = page.getByRole("dialog");
  92  |   await expect(
  93  |     dialog.locator(".menu-ink-color, .nav-en-color, .menu-ink-band"),
  94  |   ).toHaveCount(0);
  95  |   await expect(
  96  |     dialog.locator('.nav-ja .menu-ink[data-text-motion="static"]'),
  97  |   ).toHaveCount(6);
  98  |   await expect(
  99  |     dialog.locator('.nav-number .menu-ink[data-text-motion="static"]'),
  100 |   ).toHaveCount(6);
  101 |   await expect(
  102 |     dialog.locator('.nav-en[data-text-motion="static"]'),
  103 |   ).toHaveCount(6);
  104 |   // The requested removal of the motion toggle leaves the privacy link.
  105 |   await expect(
  106 |     dialog.locator('.nav-aux .menu-ink[data-text-motion="static"]'),
  107 |   ).toHaveCount(1);
  108 |   await expect(
  109 |     dialog.locator('.nav-aux a[href="/privacy"]'),
  110 |   ).toHaveAccessibleName("プライバシーポリシー");
  111 |   await expect(
  112 |     dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-base'),
  113 |   ).toHaveText("プライバシーポリシー");
  114 |   await expect(dialog.locator(".motion-control")).toHaveCount(0);
  115 | });
  116 | 
  117 | test("heading color outlasts its decorative band and fades while menu labels stay static", async ({
  118 |   page,
  119 | }) => {
  120 |   await page.goto("/");
  121 |   const title = page.locator("#about .wonder-type > .reveal-text");
  122 |   await expect(title).toHaveCount(1);
  123 |   await title.scrollIntoViewIfNeeded();
  124 |   await expect(title).toHaveAttribute("data-reveal-state", "running");
  125 |   const envelope = await title.evaluate((el) => {
  126 |     const overlay = el.querySelector(".reveal-color")!;
  127 |     const glow = overlay
  128 |       .getAnimations()
  129 |       .find(
  130 |         (a) =>
  131 |           a.effect instanceof KeyframeEffect &&
  132 |           a.effect
  133 |             .getKeyframes()
  134 |             .some((frame) => frame.opacity === 0 || frame.opacity === "0"),
  135 |       )!;
  136 |     const effect = glow.effect as KeyframeEffect;
  137 |     const timing = effect.getTiming();
  138 |     const frames = effect.getKeyframes();
  139 |     const plateau = frames[1].computedOffset! * Number(timing.duration);
  140 |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  141 |       band.getAnimations(),
  142 |     );
  143 |     const bandEnd = Math.max(
  144 |       ...bands.map((a) => Number(a.effect!.getComputedTiming().endTime)),
  145 |     );
  146 |     return {
  147 |       delay: Number(timing.delay),
  148 |       duration: Number(timing.duration),
  149 |       holdAfterBand: Number(timing.delay) + plateau - bandEnd,
  150 |       fade: Number(timing.duration) - plateau,
  151 |     };
  152 |   });
  153 |   expect(envelope.holdAfterBand).toBeGreaterThanOrEqual(400);
  154 |   expect(envelope.holdAfterBand).toBeLessThanOrEqual(600);
  155 |   expect(envelope.fade).toBeGreaterThanOrEqual(1000);
  156 |   // The timing envelope above proves the hold is 400–600ms. Sample after both
  157 |   // decorative layers finish, using their actual completion instead of a sleep.
  158 |   const sample = await title.evaluate(async (el) => {
  159 |     const background = el.closest(".scene")!.querySelector(".color-echo")!;
  160 |     const backgroundFinished = Promise.all(
  161 |       background.getAnimations().map((animation) => animation.finished),
  162 |     );
  163 |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  164 |       band.getAnimations(),
  165 |     );
  166 |     await Promise.all([
  167 |       ...bands.map((animation) => animation.finished),
  168 |       backgroundFinished,
  169 |     ]);
  170 |     return {
  171 |       color: Number(
  172 |         getComputedStyle(el.querySelector(".reveal-color")!).opacity,
  173 |       ),
  174 |       background: getComputedStyle(background).opacity,
  175 |     };
  176 |   });
  177 |   expect(sample.background).toBe("0");
  178 |   expect(sample.color).toBeGreaterThan(0.95);
```