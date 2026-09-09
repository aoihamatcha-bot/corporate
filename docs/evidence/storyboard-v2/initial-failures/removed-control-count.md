# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: afterglow.spec.ts >> all authored visible text has a gradient layer, including small labels and menu copy
- Location: tests\e2e\afterglow.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('dialog').locator('.nav-aux .menu-ink-color')
Expected: 2
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" getByRole('dialog').locator('.nav-aux .menu-ink-color') with timeout 10000ms
  - waiting for getByRole('dialog').locator('.nav-aux .menu-ink-color')
    23 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=f16e1]:
  - link "本文へスキップ" [ref=f16e2] [cursor=pointer]:
    - /url: "#main"
    - generic [ref=f16e3]:
      - generic [ref=f16e4]: 本文へスキップ
      - generic [aria-hidden]: 本文へスキップ
  - banner [ref=f16e5]:
    - link "MYSTENA トップ" [ref=f16e6] [cursor=pointer]:
      - /url: /
      - img "MYSTENA" [ref=f16e8]
    - navigation "メインナビゲーション" [ref=f16e9]:
      - link "会社概要" [ref=f16e10] [cursor=pointer]:
        - /url: /company
        - generic [ref=f16e11]:
          - generic [ref=f16e12]: 会社概要
          - generic [aria-hidden]: 会社概要
      - link "お問い合わせ" [ref=f16e13] [cursor=pointer]:
        - /url: /contact
        - generic [ref=f16e14]:
          - generic [ref=f16e15]: お問い合わせ
          - generic [aria-hidden]: お問い合わせ
    - navigation "表示言語" [ref=f16e16]:
      - generic [ref=f16e17]:
        - generic [ref=f16e19]:
          - generic [ref=f16e20]: 日本語
          - generic [aria-hidden]: 日本語
        - link "English" [ref=f16e21] [cursor=pointer]:
          - /url: /en
          - generic [ref=f16e22]:
            - generic [ref=f16e23]: English
            - generic [aria-hidden]: English
    - button "メニューを開く" [expanded] [ref=f16e25] [cursor=pointer]:
      - generic [ref=f16e26]:
        - generic [ref=f16e27]: メニュー
        - generic [aria-hidden]: メニュー
  - dialog [ref=f16e31]:
    - generic [ref=f16e32]:
      - link "MYSTENA トップ" [active] [ref=f16e33] [cursor=pointer]:
        - /url: /
        - img "MYSTENA" [ref=f16e35]
      - button "メニューを閉じる" [ref=f16e36] [cursor=pointer]:
        - generic [ref=f16e37]:
          - generic [ref=f16e38]: 閉じる
          - generic [aria-hidden]: 閉じる
        - generic [aria-hidden] [ref=f16e39]: ×
    - heading "サイトナビゲーション" [level=2] [ref=f16e40]
    - generic [ref=f16e41]:
      - navigation "メインナビゲーション" [ref=f16e42]:
        - list [ref=f16e43]:
          - listitem [ref=f16e44]:
            - link "01 Top トップ" [ref=f16e45] [cursor=pointer]:
              - /url: /
              - generic [ref=f16e47]:
                - generic [ref=f16e48]: "01"
                - generic [aria-hidden]: "01"
              - generic [ref=f16e50]:
                - generic [ref=f16e51]: Top
                - generic [aria-hidden]: Top
              - generic [ref=f16e53]:
                - generic [ref=f16e54]: トップ
                - generic [aria-hidden]: トップ
          - listitem [ref=f16e57]:
            - link "02 About 私たちについて" [ref=f16e58] [cursor=pointer]:
              - /url: /about
              - generic [ref=f16e60]:
                - generic [ref=f16e61]: "02"
                - generic [aria-hidden]: "02"
              - generic [ref=f16e63]:
                - generic [ref=f16e64]: About
                - generic [aria-hidden]: About
              - generic [ref=f16e66]:
                - generic [ref=f16e67]: 私たちについて
                - generic [aria-hidden]: 私たちについて
          - listitem [ref=f16e70]:
            - link "03 Business 事業紹介" [ref=f16e71] [cursor=pointer]:
              - /url: /business
              - generic [ref=f16e73]:
                - generic [ref=f16e74]: "03"
                - generic [aria-hidden]: "03"
              - generic [ref=f16e76]:
                - generic [ref=f16e77]: Business
                - generic [aria-hidden]: Business
              - generic [ref=f16e79]:
                - generic [ref=f16e80]: 事業紹介
                - generic [aria-hidden]: 事業紹介
          - listitem [ref=f16e83]:
            - link "04 News お知らせ" [ref=f16e84] [cursor=pointer]:
              - /url: /news
              - generic [ref=f16e86]:
                - generic [ref=f16e87]: "04"
                - generic [aria-hidden]: "04"
              - generic [ref=f16e89]:
                - generic [ref=f16e90]: News
                - generic [aria-hidden]: News
              - generic [ref=f16e92]:
                - generic [ref=f16e93]: お知らせ
                - generic [aria-hidden]: お知らせ
          - listitem [ref=f16e96]:
            - link "05 Company 会社概要" [ref=f16e97] [cursor=pointer]:
              - /url: /company
              - generic [ref=f16e99]:
                - generic [ref=f16e100]: "05"
                - generic [aria-hidden]: "05"
              - generic [ref=f16e102]:
                - generic [ref=f16e103]: Company
                - generic [aria-hidden]: Company
              - generic [ref=f16e105]:
                - generic [ref=f16e106]: 会社概要
                - generic [aria-hidden]: 会社概要
          - listitem [ref=f16e109]:
            - link "06 Contact お問い合わせ" [ref=f16e110] [cursor=pointer]:
              - /url: /contact
              - generic [ref=f16e112]:
                - generic [ref=f16e113]: "06"
                - generic [aria-hidden]: "06"
              - generic [ref=f16e115]:
                - generic [ref=f16e116]: Contact
                - generic [aria-hidden]: Contact
              - generic [ref=f16e118]:
                - generic [ref=f16e119]: お問い合わせ
                - generic [aria-hidden]: お問い合わせ
      - complementary [ref=f16e122]:
        - navigation "表示言語" [ref=f16e123]:
          - generic [ref=f16e124]:
            - generic [ref=f16e126]:
              - generic [ref=f16e127]: 日本語
              - generic [aria-hidden]: 日本語
            - link "English" [ref=f16e128] [cursor=pointer]:
              - /url: /en
              - generic [ref=f16e129]:
                - generic [ref=f16e130]: English
                - generic [aria-hidden]: English
        - paragraph [ref=f16e131]:
          - generic [ref=f16e132]:
            - generic [ref=f16e133]: 心が動く。 世界がひらく。
            - generic [aria-hidden]: 心が動く。 世界がひらく。
        - link "お問い合わせ" [ref=f16e134] [cursor=pointer]:
          - /url: /contact
          - generic [ref=f16e135]:
            - generic [ref=f16e136]: お問い合わせ
            - generic [aria-hidden]: お問い合わせ
        - link "プライバシーポリシー" [ref=f16e140] [cursor=pointer]:
          - /url: /privacy
          - generic [ref=f16e141]:
            - generic [ref=f16e142]: プライバシーポリシー
            - generic [aria-hidden]: プライバシーポリシー
    - generic [ref=f16e143]:
      - generic [ref=f16e144]:
        - generic [ref=f16e145]: MYSTENA
        - generic [aria-hidden]: MYSTENA
      - generic [ref=f16e146]:
        - generic [ref=f16e147]: 好奇心から、次の出会いへ。
        - generic [aria-hidden]: 好奇心から、次の出会いへ。
  - complementary [ref=f16e148]:
    - generic [ref=f16e149]:
      - strong [ref=f16e150]:
        - generic [ref=f16e151]:
          - generic [ref=f16e152]: 内容確認用
          - generic [aria-hidden]: 内容確認用
      - generic [ref=f16e153]:
        - generic [ref=f16e154]: 事業説明は採用候補の原稿です。提供状況・法人情報は確認中です。
        - generic [aria-hidden]: 事業説明は採用候補の原稿です。提供状況・法人情報は確認中です。
  - main [ref=f16e155]:
    - generic [ref=f16e156]:
      - region [ref=f16e157]:
        - generic [ref=f16e162]:
          - paragraph [ref=f16e163]:
            - generic [ref=f16e165]:
              - generic [ref=f16e166]: エンターテインメント × テクノロジー
              - generic [aria-hidden]: エンターテインメント × テクノロジー
          - heading "楽しさをつくる。 魅力を届ける。" [level=1] [ref=f16e167]:
            - generic [ref=f16e168]:
              - generic [ref=f16e169]: 楽しさをつくる。
              - generic [aria-hidden]: 楽しさをつくる。
            - generic [ref=f16e170]:
              - generic [ref=f16e171]: 魅力を届ける。
              - generic [aria-hidden]: 魅力を届ける。
          - paragraph [ref=f16e172]:
            - generic [ref=f16e173]:
              - generic [ref=f16e174]: MYSTENAは、エンターテインメントとテクノロジーを軸に、サービス開発、映像制作、マーケティングを手がける会社です。商品との出会いを楽しむオンラインサービスから、事業者を支えるシステム、ブランドやクリエイターとの共同企画まで。企画・開発・表現・販売促進をつなぎ、新しい体験を生み出します。
              - generic [aria-hidden]: MYSTENAは、エンターテインメントとテクノロジーを軸に、サービス開発、映像制作、マーケティングを手がける会社です。商品との出会いを楽しむオンラインサービスから、事業者を支えるシステム、ブランドやクリエイターとの共同企画まで。企画・開発・表現・販売促進をつなぎ、新しい体験を生み出します。
          - generic [ref=f16e175]:
            - link "事業紹介を見る" [ref=f16e176] [cursor=pointer]:
              - /url: /business
              - generic [ref=f16e177]:
                - generic [ref=f16e178]: 事業紹介を見る
                - generic [aria-hidden]: 事業紹介を見る
            - link "会社概要を見る" [ref=f16e182] [cursor=pointer]:
              - /url: /company
              - generic [ref=f16e183]:
                - generic [ref=f16e184]: 会社概要を見る
                - generic [aria-hidden]: 会社概要を見る
        - generic [ref=f16e188]:
          - generic [ref=f16e190]:
            - generic [ref=f16e191]: 好奇心から、次の出会いへ。
            - generic [aria-hidden]: 好奇心から、次の出会いへ。
          - link "下へスクロール" [ref=f16e192] [cursor=pointer]:
            - /url: "#business"
            - generic [ref=f16e193]:
              - generic [ref=f16e194]: 下へスクロール
              - generic [aria-hidden]: 下へスクロール
            - generic [aria-hidden] [ref=f16e195]: ↓
      - generic [ref=f16e197]:
        - generic [ref=f16e198]:
          - paragraph [ref=f16e199]:
            - generic [ref=f16e200]:
              - generic [ref=f16e201]: "01"
              - generic [aria-hidden]: "01"
            - generic [ref=f16e202]:
              - generic [ref=f16e203]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - generic [ref=f16e204]:
            - generic [ref=f16e206]:
              - generic [ref=f16e207]: 原稿案
              - generic [aria-hidden]: 原稿案
            - heading "商品との出会いを、 もっと楽しく。" [level=2] [ref=f16e208]:
              - generic [ref=f16e209]:
                - generic [ref=f16e210]: 商品との出会いを、 もっと楽しく。
                - generic [aria-hidden]: 商品との出会いを、 もっと楽しく。
            - paragraph [ref=f16e211]:
              - generic [ref=f16e212]:
                - generic [ref=f16e213]: 企画・開発・表現・販売促進をつなぐ、4つの領域。
                - generic [aria-hidden]: 企画・開発・表現・販売促進をつなぐ、4つの領域。
            - paragraph [ref=f16e214]:
              - generic [ref=f16e215]:
                - generic [ref=f16e216]: 商品やサービスをつくることから、魅力を伝え、利用につなげることまで。4つの領域を組み合わせ、新しい体験を考えます。
                - generic [aria-hidden]: 商品やサービスをつくることから、魅力を伝え、利用につなげることまで。4つの領域を組み合わせ、新しい体験を考えます。
        - generic [ref=f16e217]:
          - link "ネットショップで商品を選ぶ女性の2Dイラスト 事業領域 01 エンターテインメントEC 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。 楽しさのある販売サービスを企画したい" [ref=f16e218] [cursor=pointer]:
            - /url: /business#platform
            - img "ネットショップで商品を選ぶ女性の2Dイラスト" [ref=f16e221]
            - generic [ref=f16e223]:
              - generic [ref=f16e224]: 事業領域 01
              - generic [aria-hidden]: 事業領域 01
            - heading "エンターテインメントEC" [level=3] [ref=f16e225]:
              - generic [ref=f16e226]:
                - generic [ref=f16e227]: エンターテインメントEC
                - generic [aria-hidden]: エンターテインメントEC
            - paragraph [ref=f16e228]:
              - generic [ref=f16e229]:
                - generic [ref=f16e230]: 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。
                - generic [aria-hidden]: 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。
            - generic [ref=f16e233]:
              - generic [ref=f16e234]: 楽しさのある販売サービスを企画したい
              - generic [aria-hidden]: 楽しさのある販売サービスを企画したい
          - link "コードを書きながらウェブUIを開発する二人の2Dイラスト 事業領域 02 サービス・システム開発 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。 販売サービスや運営の仕組みを開発したい" [ref=f16e237] [cursor=pointer]:
            - /url: /business#systems
            - img "コードを書きながらウェブUIを開発する二人の2Dイラスト" [ref=f16e240]
            - generic [ref=f16e242]:
              - generic [ref=f16e243]: 事業領域 02
              - generic [aria-hidden]: 事業領域 02
            - heading "サービス・システム開発" [level=3] [ref=f16e244]:
              - generic [ref=f16e245]:
                - generic [ref=f16e246]: サービス・システム開発
                - generic [aria-hidden]: サービス・システム開発
            - paragraph [ref=f16e247]:
              - generic [ref=f16e248]:
                - generic [ref=f16e249]: 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。
                - generic [aria-hidden]: 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。
            - generic [ref=f16e252]:
              - generic [ref=f16e253]: 販売サービスや運営の仕組みを開発したい
              - generic [aria-hidden]: 販売サービスや運営の仕組みを開発したい
          - link "商品撮影用カメラと動画編集画面のAI生成イメージ 事業領域 03 映像・コンテンツ制作 サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。 商品やサービスの紹介動画をつくりたい" [ref=f16e256] [cursor=pointer]:
            - /url: /business#creative
            - img "商品撮影用カメラと動画編集画面のAI生成イメージ" [ref=f16e259]
            - generic [ref=f16e261]:
              - generic [ref=f16e262]: 事業領域 03
              - generic [aria-hidden]: 事業領域 03
            - heading "映像・コンテンツ制作" [level=3] [ref=f16e263]:
              - generic [ref=f16e264]:
                - generic [ref=f16e265]: 映像・コンテンツ制作
                - generic [aria-hidden]: 映像・コンテンツ制作
            - paragraph [ref=f16e266]:
              - generic [ref=f16e267]:
                - generic [ref=f16e268]: サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。
                - generic [aria-hidden]: サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。
            - generic [ref=f16e271]:
              - generic [ref=f16e272]: 商品やサービスの紹介動画をつくりたい
              - generic [aria-hidden]: 商品やサービスの紹介動画をつくりたい
          - link "クリエイターと商品の魅力を発信する共同企画の2Dイラスト 事業領域 04 マーケティング・ コラボレーション 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。 ブランドやクリエイターと商品を共同企画したい" [ref=f16e275] [cursor=pointer]:
            - /url: /business#marketing
            - img "クリエイターと商品の魅力を発信する共同企画の2Dイラスト" [ref=f16e278]
            - generic [ref=f16e280]:
              - generic [ref=f16e281]: 事業領域 04
              - generic [aria-hidden]: 事業領域 04
            - heading "マーケティング・ コラボレーション" [level=3] [ref=f16e282]:
              - generic [ref=f16e283]:
                - generic [ref=f16e284]: マーケティング・ コラボレーション
                - generic [aria-hidden]: マーケティング・ コラボレーション
            - paragraph [ref=f16e285]:
              - generic [ref=f16e286]:
                - generic [ref=f16e287]: 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。
                - generic [aria-hidden]: 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。
            - generic [ref=f16e290]:
              - generic [ref=f16e291]: ブランドやクリエイターと商品を共同企画したい
              - generic [aria-hidden]: ブランドやクリエイターと商品を共同企画したい
      - generic [ref=f16e295]:
        - generic [ref=f16e296]:
          - paragraph [ref=f16e297]:
            - generic [ref=f16e298]:
              - generic [ref=f16e299]: "02"
              - generic [aria-hidden]: "02"
            - generic [ref=f16e300]:
              - generic [ref=f16e301]: 現在の取り組み
              - generic [aria-hidden]: 現在の取り組み
          - generic [ref=f16e302]:
            - generic [ref=f16e304]:
              - generic [ref=f16e305]: 開発中を想定した原稿案
              - generic [aria-hidden]: 開発中を想定した原稿案
            - heading "現在の取り組み" [level=2] [ref=f16e306]:
              - generic [ref=f16e307]:
                - generic [ref=f16e308]: 現在の取り組み
                - generic [aria-hidden]: 現在の取り組み
            - paragraph [ref=f16e310]:
              - generic [ref=f16e311]:
                - generic [ref=f16e312]: 現在、商品との新しい出会いを生み出すオンラインサービスの開発を進めています。内容や提供時期は、準備が整い次第お知らせします。
                - generic [aria-hidden]: 現在、商品との新しい出会いを生み出すオンラインサービスの開発を進めています。内容や提供時期は、準備が整い次第お知らせします。
            - paragraph [ref=f16e313]:
              - generic [ref=f16e314]:
                - generic [ref=f16e315]: 上記は開発中を想定した説明案です。実際の提供状況・公開範囲は確認中です。
                - generic [aria-hidden]: 上記は開発中を想定した説明案です。実際の提供状況・公開範囲は確認中です。
        - figure "エンターテインメントECの構想図 対象と提供内容を整理するための概念案です。実際の事業範囲は確認中です。" [ref=f16e316]:
          - generic [ref=f16e317]:
            - heading "エンターテインメントECの構想図" [level=3] [ref=f16e318]:
              - generic [ref=f16e319]:
                - generic [ref=f16e320]: エンターテインメントECの構想図
                - generic [aria-hidden]: エンターテインメントECの構想図
            - paragraph [ref=f16e321]:
              - generic [ref=f16e322]:
                - generic [ref=f16e323]: 対象と提供内容を整理するための概念案です。実際の事業範囲は確認中です。
                - generic [aria-hidden]: 対象と提供内容を整理するための概念案です。実際の事業範囲は確認中です。
          - 'link "画像を拡大する（新しいタブ）: 商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図" [ref=f16e324] [cursor=pointer]':
            - /url: /images/corporate/a06-business-concept-v3-ja.webp
            - img "商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図" [ref=f16e325]
            - generic [ref=f16e327]:
              - generic [ref=f16e328]: 画像を拡大する（新しいタブ）
              - generic [aria-hidden]: 画像を拡大する（新しいタブ）
          - list [ref=f16e331]:
            - listitem [ref=f16e332]:
              - generic [ref=f16e334]:
                - generic [ref=f16e335]: "01"
                - generic [aria-hidden]: "01"
              - heading "商品を届ける事業者" [level=4] [ref=f16e336]:
                - generic [ref=f16e337]:
                  - generic [ref=f16e338]: 商品を届ける事業者
                  - generic [aria-hidden]: 商品を届ける事業者
              - paragraph [ref=f16e339]:
                - generic [ref=f16e340]:
                  - generic [ref=f16e341]: 商品・コンテンツの魅力
                  - generic [aria-hidden]: 商品・コンテンツの魅力
            - listitem [ref=f16e342]:
              - generic [ref=f16e344]:
                - generic [ref=f16e345]: "02"
                - generic [aria-hidden]: "02"
              - heading "MYSTENAのサービス" [level=4] [ref=f16e346]:
                - generic [ref=f16e347]:
                  - generic [ref=f16e348]: MYSTENAのサービス
                  - generic [aria-hidden]: MYSTENAのサービス
              - paragraph [ref=f16e349]:
                - generic [ref=f16e350]:
                  - generic [ref=f16e351]: 出会い方と利用体験を設計
                  - generic [aria-hidden]: 出会い方と利用体験を設計
            - listitem [ref=f16e352]:
              - generic [ref=f16e354]:
                - generic [ref=f16e355]: "03"
                - generic [aria-hidden]: "03"
              - heading "新しいものを探す人" [level=4] [ref=f16e356]:
                - generic [ref=f16e357]:
                  - generic [ref=f16e358]: 新しいものを探す人
                  - generic [aria-hidden]: 新しいものを探す人
              - paragraph [ref=f16e359]:
                - generic [ref=f16e360]:
                  - generic [ref=f16e361]: 発見する楽しさ
                  - generic [aria-hidden]: 発見する楽しさ
        - generic [ref=f16e362]:
          - generic [ref=f16e363]:
            - figure "サービス構想 01 コレクションとの、新しい出会い。 トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを考えるサービス構想です。" [ref=f16e364]:
              - 'link "画像を拡大する（新しいタブ）: ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図" [ref=f16e365] [cursor=pointer]':
                - /url: /images/corporate/a01-service-overview-v3-ja.webp
                - img "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図" [ref=f16e366]
                - generic [ref=f16e368]:
                  - generic [ref=f16e369]: 画像を拡大する（新しいタブ）
                  - generic [aria-hidden]: 画像を拡大する（新しいタブ）
              - generic [ref=f16e372]:
                - paragraph [ref=f16e373]:
                  - generic [ref=f16e374]:
                    - generic [ref=f16e375]: サービス構想 01
                    - generic [aria-hidden]: サービス構想 01
                - heading "コレクションとの、新しい出会い。" [level=3] [ref=f16e376]:
                  - generic [ref=f16e377]:
                    - generic [ref=f16e378]: コレクションとの、新しい出会い。
                    - generic [aria-hidden]: コレクションとの、新しい出会い。
                - paragraph [ref=f16e379]:
                  - generic [ref=f16e380]:
                    - generic [ref=f16e381]: トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを考えるサービス構想です。
                    - generic [aria-hidden]: トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを考えるサービス構想です。
            - figure "体験の構想 02 知って、選んで、ひらく。 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。" [ref=f16e382]:
              - 'link "画像を拡大する（新しいタブ）: 商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図" [ref=f16e383] [cursor=pointer]':
                - /url: /images/corporate/a02-experience-flow-v3-ja.webp
                - img "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図" [ref=f16e384]
                - generic [ref=f16e386]:
                  - generic [ref=f16e387]: 画像を拡大する（新しいタブ）
                  - generic [aria-hidden]: 画像を拡大する（新しいタブ）
              - generic [ref=f16e390]:
                - paragraph [ref=f16e391]:
                  - generic [ref=f16e392]:
                    - generic [ref=f16e393]: 体験の構想 02
                    - generic [aria-hidden]: 体験の構想 02
                - heading "知って、選んで、ひらく。" [level=3] [ref=f16e394]:
                  - generic [ref=f16e395]:
                    - generic [ref=f16e396]: 知って、選んで、ひらく。
                    - generic [aria-hidden]: 知って、選んで、ひらく。
                - paragraph [ref=f16e397]:
                  - generic [ref=f16e398]:
                    - generic [ref=f16e399]: 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。
                    - generic [aria-hidden]: 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。
          - paragraph [ref=f16e400]:
            - generic [ref=f16e401]:
              - generic [ref=f16e402]: 図版はサービスの構想を伝えるイメージです。実際の取扱商品・画面・提供内容は、確定後にご案内します。
              - generic [aria-hidden]: 図版はサービスの構想を伝えるイメージです。実際の取扱商品・画面・提供内容は、確定後にご案内します。
        - figure "サービス紹介の構想 コレクションに出会う。ボックスをひらく。 商品との出会いと開封の流れを伝える、紹介動画の表紙イメージです。現在は静止画のみで、動画本編は準備中です。" [ref=f16e403]:
          - 'link "画像を拡大する（新しいタブ）: ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案" [ref=f16e404] [cursor=pointer]':
            - /url: /images/corporate/a07-video-poster-v3-ja.webp
            - img "ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案" [ref=f16e405]
            - generic [ref=f16e407]:
              - generic [ref=f16e408]: 画像を拡大する（新しいタブ）
              - generic [aria-hidden]: 画像を拡大する（新しいタブ）
          - generic [ref=f16e411]:
            - paragraph [ref=f16e412]:
              - generic [ref=f16e413]:
                - generic [ref=f16e414]: サービス紹介の構想
                - generic [aria-hidden]: サービス紹介の構想
            - heading "コレクションに出会う。ボックスをひらく。" [level=3] [ref=f16e415]:
              - generic [ref=f16e416]:
                - generic [ref=f16e417]: コレクションに出会う。ボックスをひらく。
                - generic [aria-hidden]: コレクションに出会う。ボックスをひらく。
            - paragraph [ref=f16e418]:
              - generic [ref=f16e419]:
                - generic [ref=f16e420]: 商品との出会いと開封の流れを伝える、紹介動画の表紙イメージです。現在は静止画のみで、動画本編は準備中です。
                - generic [aria-hidden]: 商品との出会いと開封の流れを伝える、紹介動画の表紙イメージです。現在は静止画のみで、動画本編は準備中です。
      - generic [ref=f16e422]:
        - paragraph [ref=f16e423]:
          - generic [ref=f16e424]:
            - generic [ref=f16e425]: "03"
            - generic [aria-hidden]: "03"
          - generic [ref=f16e426]:
            - generic [ref=f16e427]: 私たちが大切にすること
            - generic [aria-hidden]: 私たちが大切にすること
        - heading "小さなときめきが、 世界を変えていく。" [level=2] [ref=f16e428]:
          - generic [ref=f16e429]:
            - generic [ref=f16e430]: 小さなときめきが、
            - generic [aria-hidden]: 小さなときめきが、
          - generic [ref=f16e431]:
            - generic [ref=f16e432]: 世界を変えていく。
            - generic [aria-hidden]: 世界を変えていく。
        - generic [ref=f16e433]:
          - paragraph [ref=f16e435]:
            - generic [ref=f16e436]:
              - generic [ref=f16e437]: 思いがけない出会いが、毎日を少し豊かにする。私たちは、そのきっかけを技術とアイデアでつくっていきます。
              - generic [aria-hidden]: 思いがけない出会いが、毎日を少し豊かにする。私たちは、そのきっかけを技術とアイデアでつくっていきます。
          - link "私たちの考え方を見る" [ref=f16e438] [cursor=pointer]:
            - /url: /about
            - generic [ref=f16e439]:
              - generic [ref=f16e440]: 私たちの考え方を見る
              - generic [aria-hidden]: 私たちの考え方を見る
        - region [ref=f16e444]:
          - heading "数字で見るMYSTENA" [level=3] [ref=f16e445]:
            - generic [ref=f16e446]:
              - generic [ref=f16e447]: 数字で見るMYSTENA
              - generic [aria-hidden]: 数字で見るMYSTENA
          - generic [ref=f16e448]:
            - generic [ref=f16e449]:
              - term [ref=f16e450]:
                - generic [ref=f16e451]:
                  - generic [ref=f16e452]: 提携者数
                  - generic [aria-hidden]: 提携者数
              - definition [ref=f16e453]:
                - generic [ref=f16e454]:
                  - generic [ref=f16e455]: "2"
                  - generic [aria-hidden] [ref=f16e456]:
                    - generic [ref=f16e457]: "2"
                    - generic: "2"
                - generic [ref=f16e459]:
                  - generic [ref=f16e460]: 社
                  - generic [aria-hidden]: 社
            - generic [ref=f16e461]:
              - term [ref=f16e462]:
                - generic [ref=f16e463]:
                  - generic [ref=f16e464]: 出店者数
                  - generic [aria-hidden]: 出店者数
              - definition [ref=f16e465]:
                - generic [ref=f16e466]:
                  - generic [ref=f16e467]: "10"
                  - generic [aria-hidden] [ref=f16e468]:
                    - generic [ref=f16e469]: "10"
                    - generic: "10"
                - generic [ref=f16e471]:
                  - generic [ref=f16e472]: 店
                  - generic [aria-hidden]: 店
            - generic [ref=f16e473]:
              - term [ref=f16e474]:
                - generic [ref=f16e475]:
                  - generic [ref=f16e476]: 登録ユーザー数
                  - generic [aria-hidden]: 登録ユーザー数
              - definition [ref=f16e477]:
                - generic [ref=f16e478]:
                  - generic [ref=f16e479]: 1,000
                  - generic [aria-hidden] [ref=f16e480]:
                    - generic [ref=f16e481]: 1,000
                    - generic: 1,000
                - generic [ref=f16e483]:
                  - generic [ref=f16e484]: 人
                  - generic [aria-hidden]: 人
          - paragraph [ref=f16e485]:
            - generic [ref=f16e486]:
              - generic [ref=f16e487]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
              - generic [aria-hidden]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
      - generic [ref=f16e489]:
        - paragraph [ref=f16e490]:
          - generic [ref=f16e491]:
            - generic [ref=f16e492]: 相談テーマ案
            - generic [aria-hidden]: 相談テーマ案
        - generic [ref=f16e493]:
          - heading "商品やコンテンツの、 新しい届け方を一緒に。" [level=2] [ref=f16e494]:
            - generic [ref=f16e495]:
              - generic [ref=f16e496]: 商品やコンテンツの、 新しい届け方を一緒に。
              - generic [aria-hidden]: 商品やコンテンツの、 新しい届け方を一緒に。
          - generic [ref=f16e497]:
            - paragraph [ref=f16e498]:
              - generic [ref=f16e499]:
                - generic [ref=f16e500]: 商品、コンテンツ、技術。それぞれの強みを持ち寄り、新しい体験の可能性を考えます。
                - generic [aria-hidden]: 商品、コンテンツ、技術。それぞれの強みを持ち寄り、新しい体験の可能性を考えます。
            - paragraph [ref=f16e501]:
              - generic [ref=f16e502]:
                - generic [ref=f16e503]: 商品を共同企画したい、販売サービスを開発したい、紹介動画をつくりたい。企画・開発・表現・販売促進をつなぐ相談の入口をご用意します。
                - generic [aria-hidden]: 商品を共同企画したい、販売サービスを開発したい、紹介動画をつくりたい。企画・開発・表現・販売促進をつなぐ相談の入口をご用意します。
          - list [ref=f16e504]:
            - listitem [ref=f16e505]:
              - generic [ref=f16e507]:
                - generic [ref=f16e508]: "01"
                - generic [aria-hidden]: "01"
              - generic [ref=f16e509]:
                - generic [ref=f16e510]: 商品・限定商品の共同企画や監修
                - generic [aria-hidden]: 商品・限定商品の共同企画や監修
            - listitem [ref=f16e511]:
              - generic [ref=f16e513]:
                - generic [ref=f16e514]: "02"
                - generic [aria-hidden]: "02"
              - generic [ref=f16e515]:
                - generic [ref=f16e516]: 販売サービスや事業者向けシステムの開発
                - generic [aria-hidden]: 販売サービスや事業者向けシステムの開発
            - listitem [ref=f16e517]:
              - generic [ref=f16e519]:
                - generic [ref=f16e520]: "03"
                - generic [aria-hidden]: "03"
              - generic [ref=f16e521]:
                - generic [ref=f16e522]: 商品紹介動画・広告素材の制作
                - generic [aria-hidden]: 商品紹介動画・広告素材の制作
            - listitem [ref=f16e523]:
              - generic [ref=f16e525]:
                - generic [ref=f16e526]: "04"
                - generic [aria-hidden]: "04"
              - generic [ref=f16e527]:
                - generic [ref=f16e528]: SNS施策やインフルエンサーとのタイアップ
                - generic [aria-hidden]: SNS施策やインフルエンサーとのタイアップ
          - paragraph [ref=f16e529]:
            - generic [ref=f16e530]:
              - generic [ref=f16e531]: 受付可能な相談テーマは確認中です。お問い合わせ窓口は現在準備しています。
              - generic [aria-hidden]: 受付可能な相談テーマは確認中です。お問い合わせ窓口は現在準備しています。
          - link "協業についてのお問い合わせ" [ref=f16e532] [cursor=pointer]:
            - /url: /contact
            - generic [ref=f16e533]:
              - generic [ref=f16e534]: 協業についてのお問い合わせ
              - generic [aria-hidden]: 協業についてのお問い合わせ
      - generic [ref=f16e539]:
        - paragraph [ref=f16e540]:
          - generic [ref=f16e541]:
            - generic [ref=f16e542]: "05"
            - generic [aria-hidden]: "05"
          - generic [ref=f16e543]:
            - generic [ref=f16e544]: お知らせ
            - generic [aria-hidden]: お知らせ
        - generic [ref=f16e545]:
          - generic [ref=f16e546]:
            - paragraph [ref=f16e547]:
              - generic [ref=f16e548]:
                - generic [ref=f16e549]: 現在、公開中のお知らせはありません。
                - generic [aria-hidden]: 現在、公開中のお知らせはありません。
            - paragraph [ref=f16e550]:
              - generic [ref=f16e551]:
                - generic [ref=f16e552]: 確認済みのお知らせから、こちらでお届けします。
                - generic [aria-hidden]: 確認済みのお知らせから、こちらでお届けします。
          - link "お知らせ一覧を見る" [ref=f16e553] [cursor=pointer]:
            - /url: /news
            - generic [ref=f16e554]:
              - generic [ref=f16e555]: お知らせ一覧を見る
              - generic [aria-hidden]: お知らせ一覧を見る
      - generic [ref=f16e560]:
        - paragraph [ref=f16e561]:
          - generic [ref=f16e562]:
            - generic [ref=f16e563]: "06"
            - generic [aria-hidden]: "06"
          - generic [ref=f16e564]:
            - generic [ref=f16e565]: 会社概要
            - generic [aria-hidden]: 会社概要
        - link "運営主体の基本情報をご案内します。 会社概要を見る" [ref=f16e566] [cursor=pointer]:
          - /url: /company
          - heading "運営主体の基本情報をご案内します。" [level=2] [ref=f16e567]:
            - generic [ref=f16e568]:
              - generic [ref=f16e569]: 運営主体の基本情報をご案内します。
              - generic [aria-hidden]: 運営主体の基本情報をご案内します。
          - generic [ref=f16e571]:
            - generic [ref=f16e572]: 会社概要を見る
            - generic [aria-hidden]: 会社概要を見る
      - generic [ref=f16e576]:
        - paragraph [ref=f16e577]:
          - generic [ref=f16e578]:
            - generic [ref=f16e579]: お問い合わせ
            - generic [aria-hidden]: お問い合わせ
        - generic [ref=f16e580]:
          - heading "新しい可能性は、 ひとつの会話から。" [level=2] [ref=f16e581]:
            - generic [ref=f16e582]:
              - generic [ref=f16e583]: 新しい可能性は、
              - generic [aria-hidden]: 新しい可能性は、
            - generic [ref=f16e584]:
              - generic [ref=f16e585]: ひとつの会話から。
              - generic [aria-hidden]: ひとつの会話から。
          - generic [ref=f16e586]:
            - paragraph [ref=f16e587]:
              - generic [ref=f16e588]:
                - generic [ref=f16e589]: お問い合わせ窓口は現在準備中です。
                - generic [aria-hidden]: お問い合わせ窓口は現在準備中です。
            - link "お問い合わせ" [ref=f16e590] [cursor=pointer]:
              - /url: /contact
              - generic [ref=f16e591]:
                - generic [ref=f16e592]: お問い合わせ
                - generic [aria-hidden]: お問い合わせ
  - contentinfo [ref=f16e596]:
    - generic [ref=f16e597]:
      - generic [ref=f16e598]:
        - paragraph [ref=f16e599]:
          - generic [ref=f16e600]:
            - generic [ref=f16e601]: エンターテインメント × テクノロジー
            - generic [aria-hidden]: エンターテインメント × テクノロジー
        - navigation "フッターナビゲーション" [ref=f16e602]:
          - link "私たちについて" [ref=f16e603] [cursor=pointer]:
            - /url: /about
            - generic [ref=f16e604]:
              - generic [ref=f16e605]: 私たちについて
              - generic [aria-hidden]: 私たちについて
          - link "事業紹介" [ref=f16e606] [cursor=pointer]:
            - /url: /business
            - generic [ref=f16e607]:
              - generic [ref=f16e608]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - link "お知らせ" [ref=f16e609] [cursor=pointer]:
            - /url: /news
            - generic [ref=f16e610]:
              - generic [ref=f16e611]: お知らせ
              - generic [aria-hidden]: お知らせ
          - link "会社概要" [ref=f16e612] [cursor=pointer]:
            - /url: /company
            - generic [ref=f16e613]:
              - generic [ref=f16e614]: 会社概要
              - generic [aria-hidden]: 会社概要
          - link "お問い合わせ" [ref=f16e615] [cursor=pointer]:
            - /url: /contact
            - generic [ref=f16e616]:
              - generic [ref=f16e617]: お問い合わせ
              - generic [aria-hidden]: お問い合わせ
        - link "ページ先頭へ" [ref=f16e618] [cursor=pointer]:
          - /url: "#main"
      - link "MYSTENA トップ" [ref=f16e621] [cursor=pointer]:
        - /url: /
        - img "MYSTENA" [ref=f16e623]
      - generic [ref=f16e624]:
        - generic [ref=f16e625]:
          - generic [ref=f16e626]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "プライバシーポリシー" [ref=f16e627] [cursor=pointer]:
          - /url: /privacy
          - generic [ref=f16e628]:
            - generic [ref=f16e629]: プライバシーポリシー
            - generic [aria-hidden]: プライバシーポリシー
  - alert [ref=f16e630]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("all authored visible text has a gradient layer, including small labels and menu copy", async ({
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
  35  |         // Native select choices and assistive-only/icon text are deliberately
  36  |         // left native. The rest includes notices, table values and form labels.
  37  |         if (
  38  |           parent.closest(
  39  |             ".reveal-source, .menu-ink-base, script, style, option, .sr-only, [aria-hidden='true'], nextjs-portal",
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
  51  |   }
  52  |   await page.goto("/");
  53  |   await page.getByRole("button", { name: "メニューを開く" }).click();
  54  |   const dialog = page.getByRole("dialog");
  55  |   await expect(dialog.locator(".nav-ja .menu-ink-color")).toHaveCount(6);
  56  |   await expect(dialog.locator(".nav-number .menu-ink-color")).toHaveCount(6);
> 57  |   await expect(dialog.locator(".nav-aux .menu-ink-color")).toHaveCount(2);
      |                                                            ^ Error: expect(locator).toHaveCount(expected) failed
  58  | });
  59  | 
  60  | test("independent text rhythms keep color after the background passes, then fade slowly to black", async ({
  61  |   page,
  62  | }) => {
  63  |   await page.goto("/");
  64  |   const title = page.locator(".wonder-type > .reveal-text").first();
  65  |   await title.scrollIntoViewIfNeeded();
  66  |   await expect(title).toHaveAttribute("data-reveal-state", "running");
  67  |   const envelope = await title.evaluate((el) => {
  68  |     const overlay = el.querySelector(".reveal-color")!;
  69  |     const glow = overlay
  70  |       .getAnimations()
  71  |       .find(
  72  |         (a) =>
  73  |           a.effect instanceof KeyframeEffect &&
  74  |           a.effect
  75  |             .getKeyframes()
  76  |             .some((frame) => frame.opacity === 0 || frame.opacity === "0"),
  77  |       )!;
  78  |     const effect = glow.effect as KeyframeEffect;
  79  |     const timing = effect.getTiming();
  80  |     const frames = effect.getKeyframes();
  81  |     const plateau = frames[1].computedOffset! * Number(timing.duration);
  82  |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  83  |       band.getAnimations(),
  84  |     );
  85  |     const bandEnd = Math.max(
  86  |       ...bands.map((a) => Number(a.effect!.getComputedTiming().endTime)),
  87  |     );
  88  |     return {
  89  |       delay: Number(timing.delay),
  90  |       duration: Number(timing.duration),
  91  |       holdAfterBand: Number(timing.delay) + plateau - bandEnd,
  92  |       fade: Number(timing.duration) - plateau,
  93  |     };
  94  |   });
  95  |   expect(envelope.holdAfterBand).toBeGreaterThanOrEqual(400);
  96  |   expect(envelope.holdAfterBand).toBeLessThanOrEqual(600);
  97  |   expect(envelope.fade).toBeGreaterThanOrEqual(1000);
  98  |   // Sample at least 400ms after the last band, once the scene echo finishes.
  99  |   // Near-zero opacity in the echo's final frame is still an active animation.
  100 |   // These animations run in real time; no seeking or freezing is used.
  101 |   const sample = await title.evaluate(async (el) => {
  102 |     const background = el.closest(".scene")!.querySelector(".color-echo")!;
  103 |     const backgroundFinished = Promise.all(
  104 |       background.getAnimations().map((animation) => animation.finished),
  105 |     );
  106 |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  107 |       band.getAnimations(),
  108 |     );
  109 |     await Promise.all(bands.map((animation) => animation.finished));
  110 |     await Promise.all([
  111 |       new Promise((resolve) => setTimeout(resolve, 400)),
  112 |       backgroundFinished,
  113 |     ]);
  114 |     return {
  115 |       color: Number(
  116 |         getComputedStyle(el.querySelector(".reveal-color")!).opacity,
  117 |       ),
  118 |       background: getComputedStyle(background).opacity,
  119 |     };
  120 |   });
  121 |   expect(sample.background).toBe("0");
  122 |   expect(sample.color).toBeGreaterThan(0.95);
  123 |   await expect(title).toHaveAttribute("data-reveal-state", "settled");
  124 |   await expect(title.locator(".reveal-source")).toHaveCSS(
  125 |     "color",
  126 |     "rgb(20, 25, 31)",
  127 |   );
  128 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  129 |   const menu = await page.locator(".nav-en-color").evaluateAll((elements) =>
  130 |     elements.map((el) => {
  131 |       const style = getComputedStyle(el);
  132 |       return { duration: style.animationDuration, delay: style.animationDelay };
  133 |     }),
  134 |   );
  135 |   expect(new Set(menu.map((m) => m.delay)).size).toBeGreaterThanOrEqual(4);
  136 |   expect(new Set(menu.map((m) => m.duration)).size).toBeGreaterThanOrEqual(4);
  137 | });
  138 | 
  139 | test("reload can select a different headline palette without server hydration mismatch", async ({
  140 |   browser,
  141 | }) => {
  142 |   const colors: string[] = [];
  143 |   // Exercise both ends of the random selector deterministically. This verifies
  144 |   // selection behavior without making a flaky claim that random draws differ.
  145 |   for (const seed of [0.01, 0.99]) {
  146 |     const context = await browser.newContext({
  147 |       viewport: { width: 1440, height: 900 },
  148 |     });
  149 |     await context.addInitScript((value) => {
  150 |       Math.random = () => value;
  151 |     }, seed);
  152 |     const page = await context.newPage();
  153 |     const errors: string[] = [];
  154 |     page.on("pageerror", (error) => errors.push(error.message));
  155 |     await page.goto("http://127.0.0.1:3017/");
  156 |     const title = page.locator(".hero h1 .reveal-text").first();
  157 |     await expect(title).toHaveAttribute("data-entered", "true");
```