# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: afterglow.spec.ts >> all authored visible text has a gradient layer, including small labels and menu copy
- Location: tests\e2e\afterglow.spec.ts:3:5

# Error details

```
Error: /

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 7

- Array []
+ Array [
+   "下へスクロール",
+   "企画",
+   "開発",
+   "表現",
+   "販売促進",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "本文へスキップ" [ref=e2] [cursor=pointer]:
    - /url: "#main"
    - generic [ref=e3]:
      - generic [ref=e4]: 本文へスキップ
      - generic [aria-hidden]: 本文へスキップ
  - banner [ref=e5]:
    - link "MYSTENA トップ" [ref=e6] [cursor=pointer]:
      - /url: /
      - img "MYSTENA" [ref=e8]
    - navigation "メインナビゲーション" [ref=e9]:
      - link "会社概要" [ref=e10] [cursor=pointer]:
        - /url: /company
        - generic [ref=e11]:
          - generic [ref=e12]: 会社概要
          - generic [aria-hidden]: 会社概要
      - link "お問い合わせ" [ref=e13] [cursor=pointer]:
        - /url: /contact
        - generic [ref=e14]:
          - generic [ref=e15]: お問い合わせ
          - generic [aria-hidden]: お問い合わせ
    - navigation "表示言語" [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e19]:
          - generic [ref=e20]: 日本語
          - generic [aria-hidden]: 日本語
        - link "English" [ref=e21] [cursor=pointer]:
          - /url: /en
          - generic [ref=e22]:
            - generic [ref=e23]: English
            - generic [aria-hidden]: English
    - button "メニューを開く" [ref=e25] [cursor=pointer]:
      - generic [ref=e26]:
        - generic [ref=e27]: メニュー
        - generic [aria-hidden]: メニュー
  - text: 閉じる 01 Top トップ 02 About 私たちについて 03 Business 事業紹介 04 News お知らせ 05 Company 会社概要 06 Contact お問い合わせ 日本語 English 心が動く。 世界がひらく。 お問い合わせ プライバシーポリシー MYSTENA 好奇心から、次の出会いへ。
  - main [ref=e31]:
    - generic [ref=e32]:
      - dialog "MYSTENA オープニング" [active] [ref=e33]:
        - img "MYSTENA" [ref=e34]
        - paragraph [ref=e35]: 好奇心が、世界を変える。
      - region [ref=e161]:
        - generic [ref=e166]:
          - paragraph [ref=e167]:
            - generic [ref=e169]:
              - generic [ref=e170]: エンターテインメント × テクノロジー
              - text: エンターテインメント × テクノロジー
          - heading "好奇心が、 世界を変える。" [level=1] [ref=e171]:
            - generic [ref=e172]:
              - generic [ref=e173]: 好奇心が、
              - text: 好奇心が、
            - generic [ref=e174]:
              - generic [ref=e175]: 世界を変える。
              - text: 世界を変える。
          - paragraph [ref=e176]:
            - generic [ref=e177]:
              - generic [ref=e178]: MYSTENAは、エンターテインメントとテクノロジーを軸に、サービス開発、映像制作、マーケティングを手がける会社です。商品との出会いを楽しむオンラインサービスから、事業者を支えるシステム、ブランドやクリエイターとの共同企画まで。企画・開発・表現・販売促進をつなぎ、新しい体験を生み出します。
              - text: MYSTENAは、エンターテインメントとテクノロジーを軸に、サービス開発、映像制作、マーケティングを手がける会社です。商品との出会いを楽しむオンラインサービスから、事業者を支えるシステム、ブランドやクリエイターとの共同企画まで。企画・開発・表現・販売促進をつなぎ、新しい体験を生み出します。
          - generic [ref=e179]:
            - link "事業紹介を見る" [ref=e180] [cursor=pointer]:
              - /url: /business
              - generic [ref=e181]:
                - generic [ref=e182]: 事業紹介を見る
                - text: 事業紹介を見る
            - link "会社概要を見る" [ref=e186] [cursor=pointer]:
              - /url: /company
              - generic [ref=e187]:
                - generic [ref=e188]: 会社概要を見る
                - text: 会社概要を見る
        - generic [ref=e192]:
          - generic [ref=e194]:
            - generic [ref=e195]: 好奇心から、次の出会いへ。
            - text: 好奇心から、次の出会いへ。
          - link "下へスクロール" [ref=e196] [cursor=pointer]:
            - /url: "#business"
        - list "企画・開発・表現・販売促進をつなぐ、4つの領域。" [ref=e201]:
          - listitem [ref=e202]:
            - generic [ref=e203]: 企画
          - listitem [ref=e206]:
            - generic [ref=e207]: 開発
          - listitem [ref=e210]:
            - generic [ref=e211]: 表現
          - listitem [ref=e214]:
            - generic [ref=e215]: 販売促進
      - generic [ref=e217]:
        - generic [ref=e218]:
          - paragraph [ref=e219]:
            - generic [ref=e220]:
              - generic [ref=e221]: "01"
              - generic [aria-hidden]: "01"
            - generic [ref=e222]:
              - generic [ref=e223]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - generic [ref=e224]:
            - heading "商品との出会いを、 もっと楽しく。" [level=2] [ref=e225]:
              - generic [ref=e226]:
                - generic [ref=e227]: 商品との出会いを、 もっと楽しく。
                - generic [aria-hidden]: 商品との出会いを、 もっと楽しく。
            - paragraph [ref=e228]:
              - generic [ref=e229]:
                - generic [ref=e230]: 企画・開発・表現・販売促進をつなぐ、4つの領域。
                - generic [aria-hidden]: 企画・開発・表現・販売促進をつなぐ、4つの領域。
            - paragraph [ref=e231]:
              - generic [ref=e232]:
                - generic [ref=e233]: 商品やサービスをつくることから、魅力を伝え、利用につなげることまで。4つの領域を組み合わせ、新しい体験を考えます。
                - generic [aria-hidden]: 商品やサービスをつくることから、魅力を伝え、利用につなげることまで。4つの領域を組み合わせ、新しい体験を考えます。
        - generic [ref=e234]:
          - link "ネットショップで商品を選ぶ女性の2Dイラスト 事業領域 01 エンターテインメントEC 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。 楽しさのある販売サービスを企画したい" [ref=e235] [cursor=pointer]:
            - /url: /business#platform
            - img "ネットショップで商品を選ぶ女性の2Dイラスト" [ref=e239]
            - generic [ref=e241]:
              - generic [ref=e242]: 事業領域 01
              - generic [aria-hidden]: 事業領域 01
            - heading "エンターテインメントEC" [level=3] [ref=e243]:
              - generic [ref=e244]:
                - generic [ref=e245]: エンターテインメントEC
                - generic [aria-hidden]: エンターテインメントEC
            - paragraph [ref=e246]:
              - generic [ref=e247]:
                - generic [ref=e248]: 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。
                - generic [aria-hidden]: 楽しさを取り入れたオンライン販売サービスを企画・開発・運営します。商品との出会いや、買い物そのものを楽しめる体験を考えます。
            - generic [ref=e251]:
              - generic [ref=e252]: 楽しさのある販売サービスを企画したい
              - generic [aria-hidden]: 楽しさのある販売サービスを企画したい
          - link "コードを書きながらウェブUIを開発する二人の2Dイラスト 事業領域 02 サービス・システム開発 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。 販売サービスや運営の仕組みを開発したい" [ref=e255] [cursor=pointer]:
            - /url: /business#systems
            - img "コードを書きながらウェブUIを開発する二人の2Dイラスト" [ref=e259]
            - generic [ref=e261]:
              - generic [ref=e262]: 事業領域 02
              - generic [aria-hidden]: 事業領域 02
            - heading "サービス・システム開発" [level=3] [ref=e263]:
              - generic [ref=e264]:
                - generic [ref=e265]: サービス・システム開発
                - generic [aria-hidden]: サービス・システム開発
            - paragraph [ref=e266]:
              - generic [ref=e267]:
                - generic [ref=e268]: 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。
                - generic [aria-hidden]: 事業者向けサービス、販売・運営管理の仕組み、ウェブサービスを開発します。事業の進め方に合わせ、使いやすい仕組みをかたちにします。
            - generic [ref=e271]:
              - generic [ref=e272]: 販売サービスや運営の仕組みを開発したい
              - generic [aria-hidden]: 販売サービスや運営の仕組みを開発したい
          - link "商品撮影用カメラと動画編集画面のAI生成イメージ 事業領域 03 映像・コンテンツ制作 サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。 商品やサービスの紹介動画をつくりたい" [ref=e275] [cursor=pointer]:
            - /url: /business#creative
            - img "商品撮影用カメラと動画編集画面のAI生成イメージ" [ref=e279]
            - generic [ref=e281]:
              - generic [ref=e282]: 事業領域 03
              - generic [aria-hidden]: 事業領域 03
            - heading "映像・コンテンツ制作" [level=3] [ref=e283]:
              - generic [ref=e284]:
                - generic [ref=e285]: 映像・コンテンツ制作
                - generic [aria-hidden]: 映像・コンテンツ制作
            - paragraph [ref=e286]:
              - generic [ref=e287]:
                - generic [ref=e288]: サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。
                - generic [aria-hidden]: サービス内の演出映像、商品紹介動画、広告素材、デジタルコンテンツを制作します。伝えたい魅力に合う表現を考え、映像やコンテンツへ育てます。
            - generic [ref=e291]:
              - generic [ref=e292]: 商品やサービスの紹介動画をつくりたい
              - generic [aria-hidden]: 商品やサービスの紹介動画をつくりたい
          - link "クリエイターと商品の魅力を発信する共同企画の2Dイラスト 事業領域 04 マーケティング・ コラボレーション 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。 ブランドやクリエイターと商品を共同企画したい" [ref=e295] [cursor=pointer]:
            - /url: /business#marketing
            - img "クリエイターと商品の魅力を発信する共同企画の2Dイラスト" [ref=e299]
            - generic [ref=e301]:
              - generic [ref=e302]: 事業領域 04
              - generic [aria-hidden]: 事業領域 04
            - heading "マーケティング・ コラボレーション" [level=3] [ref=e303]:
              - generic [ref=e304]:
                - generic [ref=e305]: マーケティング・ コラボレーション
                - generic [aria-hidden]: マーケティング・ コラボレーション
            - paragraph [ref=e306]:
              - generic [ref=e307]:
                - generic [ref=e308]: 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。
                - generic [aria-hidden]: 販売促進の企画、SNS施策、インフルエンサーとのタイアップ、ブランド・クリエイターとの共同企画を考えます。商品監修や限定商品の共同企画、映像制作、販売企画まで、魅力の届け方を組み立てます。
            - generic [ref=e311]:
              - generic [ref=e312]: ブランドやクリエイターと商品を共同企画したい
              - generic [aria-hidden]: ブランドやクリエイターと商品を共同企画したい
      - generic [ref=e316]:
        - generic [ref=e317]:
          - paragraph [ref=e318]:
            - generic [ref=e319]:
              - generic [ref=e320]: "02"
              - generic [aria-hidden]: "02"
            - generic [ref=e321]:
              - generic [ref=e322]: 現在の取り組み
              - generic [aria-hidden]: 現在の取り組み
          - heading "現在の取り組み" [level=2] [ref=e324]:
            - generic [ref=e325]:
              - generic [ref=e326]: 現在の取り組み
              - generic [aria-hidden]: 現在の取り組み
        - figure "エンターテインメントECのつながり 商品を届ける事業者と、新しいものを探す人をつなぎます。" [ref=e327]:
          - generic [ref=e328]:
            - heading "エンターテインメントECのつながり" [level=3] [ref=e329]:
              - generic [ref=e330]:
                - generic [ref=e331]: エンターテインメントECのつながり
                - generic [aria-hidden]: エンターテインメントECのつながり
            - paragraph [ref=e332]:
              - generic [ref=e333]:
                - generic [ref=e334]: 商品を届ける事業者と、新しいものを探す人をつなぎます。
                - generic [aria-hidden]: 商品を届ける事業者と、新しいものを探す人をつなぎます。
          - 'link "画像を拡大する（新しいタブ）: 商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図" [ref=e335] [cursor=pointer]':
            - /url: /images/corporate/a06-business-concept-v4-ja.webp
            - img "商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図" [ref=e338]
            - generic [ref=e340]:
              - generic [ref=e341]: 画像を拡大する（新しいタブ）
              - generic [aria-hidden]: 画像を拡大する（新しいタブ）
          - list [ref=e344]:
            - listitem [ref=e345]:
              - generic [ref=e347]:
                - generic [ref=e348]: "01"
                - generic [aria-hidden]: "01"
              - heading "商品を届ける事業者" [level=4] [ref=e349]:
                - generic [ref=e350]:
                  - generic [ref=e351]: 商品を届ける事業者
                  - generic [aria-hidden]: 商品を届ける事業者
              - paragraph [ref=e352]:
                - generic [ref=e353]:
                  - generic [ref=e354]: 商品・コンテンツの魅力
                  - generic [aria-hidden]: 商品・コンテンツの魅力
            - listitem [ref=e355]:
              - generic [ref=e357]:
                - generic [ref=e358]: "02"
                - generic [aria-hidden]: "02"
              - heading "MYSTENAのサービス" [level=4] [ref=e359]:
                - generic [ref=e360]:
                  - generic [ref=e361]: MYSTENAのサービス
                  - generic [aria-hidden]: MYSTENAのサービス
              - paragraph [ref=e362]:
                - generic [ref=e363]:
                  - generic [ref=e364]: 出会い方と利用体験を設計
                  - generic [aria-hidden]: 出会い方と利用体験を設計
            - listitem [ref=e365]:
              - generic [ref=e367]:
                - generic [ref=e368]: "03"
                - generic [aria-hidden]: "03"
              - heading "新しいものを探す人" [level=4] [ref=e369]:
                - generic [ref=e370]:
                  - generic [ref=e371]: 新しいものを探す人
                  - generic [aria-hidden]: 新しいものを探す人
              - paragraph [ref=e372]:
                - generic [ref=e373]:
                  - generic [ref=e374]: 発見する楽しさ
                  - generic [aria-hidden]: 発見する楽しさ
        - generic [ref=e376]:
          - figure "サービス紹介 01 コレクションとの、新しい出会い。 トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを届けます。" [ref=e377]:
            - 'link "画像を拡大する（新しいタブ）: ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図" [ref=e378] [cursor=pointer]':
              - /url: /images/corporate/a01-service-overview-v4-ja.webp
              - img "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図" [ref=e381]
              - generic [ref=e383]:
                - generic [ref=e384]: 画像を拡大する（新しいタブ）
                - generic [aria-hidden]: 画像を拡大する（新しいタブ）
            - generic [ref=e387]:
              - paragraph [ref=e388]:
                - generic [ref=e389]:
                  - generic [ref=e390]: サービス紹介 01
                  - generic [aria-hidden]: サービス紹介 01
              - heading "コレクションとの、新しい出会い。" [level=3] [ref=e391]:
                - generic [ref=e392]:
                  - generic [ref=e393]: コレクションとの、新しい出会い。
                  - generic [aria-hidden]: コレクションとの、新しい出会い。
              - paragraph [ref=e394]:
                - generic [ref=e395]:
                  - generic [ref=e396]: トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを届けます。
                  - generic [aria-hidden]: トレーディングカード、ブランドファッション、精密機器。ミステリーボックスを通じて、商品を探す楽しさを届けます。
          - figure "体験の流れ 02 知って、選んで、ひらく。 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。" [ref=e397]:
            - 'link "画像を拡大する（新しいタブ）: 商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図" [ref=e398] [cursor=pointer]':
              - /url: /images/corporate/a02-experience-flow-v4-ja.webp
              - img "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図" [ref=e401]
              - generic [ref=e403]:
                - generic [ref=e404]: 画像を拡大する（新しいタブ）
                - generic [aria-hidden]: 画像を拡大する（新しいタブ）
            - generic [ref=e407]:
              - paragraph [ref=e408]:
                - generic [ref=e409]:
                  - generic [ref=e410]: 体験の流れ 02
                  - generic [aria-hidden]: 体験の流れ 02
              - heading "知って、選んで、ひらく。" [level=3] [ref=e411]:
                - generic [ref=e412]:
                  - generic [ref=e413]: 知って、選んで、ひらく。
                  - generic [aria-hidden]: 知って、選んで、ひらく。
              - paragraph [ref=e414]:
                - generic [ref=e415]:
                  - generic [ref=e416]: 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。
                  - generic [aria-hidden]: 商品情報や条件を確認して選び、ボックスを開封し、届く商品を詳しく知る。安心して楽しめる体験の流れを描いています。
        - figure "サービス紹介 コレクションに出会う。ボックスをひらく。" [ref=e417]:
          - 'link "画像を拡大する（新しいタブ）: ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案" [ref=e418] [cursor=pointer]':
            - /url: /images/corporate/a07-video-poster-v4-ja.webp
            - img "ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案" [ref=e421]
            - generic [ref=e423]:
              - generic [ref=e424]: 画像を拡大する（新しいタブ）
              - generic [aria-hidden]: 画像を拡大する（新しいタブ）
          - generic [ref=e427]:
            - paragraph [ref=e428]:
              - generic [ref=e429]:
                - generic [ref=e430]: サービス紹介
                - generic [aria-hidden]: サービス紹介
            - heading "コレクションに出会う。ボックスをひらく。" [level=3] [ref=e431]:
              - generic [ref=e432]:
                - generic [ref=e433]: コレクションに出会う。ボックスをひらく。
                - generic [aria-hidden]: コレクションに出会う。ボックスをひらく。
      - generic [ref=e435]:
        - paragraph [ref=e436]:
          - generic [ref=e437]:
            - generic [ref=e438]: "03"
            - generic [aria-hidden]: "03"
          - generic [ref=e439]:
            - generic [ref=e440]: 私たちが大切にすること
            - generic [aria-hidden]: 私たちが大切にすること
        - heading "小さなときめきが、 世界を変えていく。" [level=2] [ref=e441]:
          - generic [ref=e442]:
            - generic [ref=e443]: 小さなときめきが、
            - generic [aria-hidden]: 小さなときめきが、
          - generic [ref=e444]:
            - generic [ref=e445]: 世界を変えていく。
            - generic [aria-hidden]: 世界を変えていく。
        - generic [ref=e446]:
          - paragraph [ref=e448]:
            - generic [ref=e449]:
              - generic [ref=e450]: 思いがけない出会いが、毎日を少し豊かにする。私たちは、そのきっかけを技術とアイデアでつくっていきます。
              - generic [aria-hidden]: 思いがけない出会いが、毎日を少し豊かにする。私たちは、そのきっかけを技術とアイデアでつくっていきます。
          - link "私たちの考え方を見る" [ref=e451] [cursor=pointer]:
            - /url: /about
            - generic [ref=e452]:
              - generic [ref=e453]: 私たちの考え方を見る
              - generic [aria-hidden]: 私たちの考え方を見る
        - region [ref=e457]:
          - heading "数字で見るMYSTENA" [level=3] [ref=e458]:
            - generic [ref=e459]:
              - generic [ref=e460]: 数字で見るMYSTENA
              - generic [aria-hidden]: 数字で見るMYSTENA
          - generic [ref=e461]:
            - generic [ref=e462]:
              - term [ref=e463]:
                - generic [ref=e464]:
                  - generic [ref=e465]: 提携者数
                  - generic [aria-hidden]: 提携者数
              - definition [ref=e466]:
                - generic [ref=e467]:
                  - generic [ref=e468]: "2"
                  - generic [aria-hidden] [ref=e469]:
                    - generic [ref=e470]: "2"
                    - generic: "2"
                - generic [ref=e472]:
                  - generic [ref=e473]: 社
                  - generic [aria-hidden]: 社
            - generic [ref=e474]:
              - term [ref=e475]:
                - generic [ref=e476]:
                  - generic [ref=e477]: 出店者数
                  - generic [aria-hidden]: 出店者数
              - definition [ref=e478]:
                - generic [ref=e479]:
                  - generic [ref=e480]: "10"
                  - generic [aria-hidden] [ref=e481]:
                    - generic [ref=e482]: "10"
                    - generic: "10"
                - generic [ref=e484]:
                  - generic [ref=e485]: 店
                  - generic [aria-hidden]: 店
            - generic [ref=e486]:
              - term [ref=e487]:
                - generic [ref=e488]:
                  - generic [ref=e489]: 登録ユーザー数
                  - generic [aria-hidden]: 登録ユーザー数
              - definition [ref=e490]:
                - generic [ref=e491]:
                  - generic [ref=e492]: 1,000
                  - generic [aria-hidden] [ref=e493]:
                    - generic [ref=e494]: 1,000
                    - generic: 1,000
                - generic [ref=e496]:
                  - generic [ref=e497]: 人
                  - generic [aria-hidden]: 人
          - paragraph [ref=e498]:
            - generic [ref=e499]:
              - generic [ref=e500]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
              - generic [aria-hidden]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
      - generic [ref=e502]:
        - paragraph [ref=e503]:
          - generic [ref=e504]:
            - generic [ref=e505]: 協業・コラボレーション
            - generic [aria-hidden]: 協業・コラボレーション
        - generic [ref=e506]:
          - heading "商品やコンテンツの、 新しい届け方を一緒に。" [level=2] [ref=e507]:
            - generic [ref=e508]:
              - generic [ref=e509]: 商品やコンテンツの、 新しい届け方を一緒に。
              - generic [aria-hidden]: 商品やコンテンツの、 新しい届け方を一緒に。
          - generic [ref=e510]:
            - paragraph [ref=e511]:
              - generic [ref=e512]:
                - generic [ref=e513]: 商品、コンテンツ、技術。それぞれの強みを持ち寄り、新しい体験の可能性を考えます。
                - generic [aria-hidden]: 商品、コンテンツ、技術。それぞれの強みを持ち寄り、新しい体験の可能性を考えます。
            - paragraph [ref=e514]:
              - generic [ref=e515]:
                - generic [ref=e516]: 商品を共同企画したい、販売サービスを開発したい、紹介動画をつくりたい。企画・開発・表現・販売促進をつなぐ相談の入口をご用意します。
                - generic [aria-hidden]: 商品を共同企画したい、販売サービスを開発したい、紹介動画をつくりたい。企画・開発・表現・販売促進をつなぐ相談の入口をご用意します。
          - list [ref=e517]:
            - listitem [ref=e518]:
              - generic [ref=e520]:
                - generic [ref=e521]: "01"
                - generic [aria-hidden]: "01"
              - generic [ref=e522]:
                - generic [ref=e523]: 商品・限定商品の共同企画や監修
                - generic [aria-hidden]: 商品・限定商品の共同企画や監修
            - listitem [ref=e524]:
              - generic [ref=e526]:
                - generic [ref=e527]: "02"
                - generic [aria-hidden]: "02"
              - generic [ref=e528]:
                - generic [ref=e529]: 販売サービスや事業者向けシステムの開発
                - generic [aria-hidden]: 販売サービスや事業者向けシステムの開発
            - listitem [ref=e530]:
              - generic [ref=e532]:
                - generic [ref=e533]: "03"
                - generic [aria-hidden]: "03"
              - generic [ref=e534]:
                - generic [ref=e535]: 商品紹介動画・広告素材の制作
                - generic [aria-hidden]: 商品紹介動画・広告素材の制作
            - listitem [ref=e536]:
              - generic [ref=e538]:
                - generic [ref=e539]: "04"
                - generic [aria-hidden]: "04"
              - generic [ref=e540]:
                - generic [ref=e541]: SNS施策やインフルエンサーとのタイアップ
                - generic [aria-hidden]: SNS施策やインフルエンサーとのタイアップ
          - link "協業についてのお問い合わせ" [ref=e542] [cursor=pointer]:
            - /url: /contact
            - generic [ref=e544]:
              - generic [ref=e545]: 協業についてのお問い合わせ
              - generic [aria-hidden]: 協業についてのお問い合わせ
      - generic [ref=e550]:
        - paragraph [ref=e551]:
          - generic [ref=e552]:
            - generic [ref=e553]: "05"
            - generic [aria-hidden]: "05"
          - generic [ref=e554]:
            - generic [ref=e555]: お知らせ
            - generic [aria-hidden]: お知らせ
        - generic [ref=e556]:
          - generic [ref=e557]:
            - paragraph [ref=e558]:
              - generic [ref=e559]:
                - generic [ref=e560]: 現在、公開中のお知らせはありません。
                - generic [aria-hidden]: 現在、公開中のお知らせはありません。
            - paragraph [ref=e561]:
              - generic [ref=e562]:
                - generic [ref=e563]: 新しいお知らせを、こちらでお届けします。
                - generic [aria-hidden]: 新しいお知らせを、こちらでお届けします。
          - link "お知らせ一覧を見る" [ref=e564] [cursor=pointer]:
            - /url: /news
            - generic [ref=e565]:
              - generic [ref=e566]: お知らせ一覧を見る
              - generic [aria-hidden]: お知らせ一覧を見る
      - generic [ref=e571]:
        - paragraph [ref=e572]:
          - generic [ref=e573]:
            - generic [ref=e574]: "06"
            - generic [aria-hidden]: "06"
          - generic [ref=e575]:
            - generic [ref=e576]: 会社概要
            - generic [aria-hidden]: 会社概要
        - link "運営主体の基本情報をご案内します。 会社概要を見る" [ref=e577] [cursor=pointer]:
          - /url: /company
          - heading "運営主体の基本情報をご案内します。" [level=2] [ref=e578]:
            - generic [ref=e579]:
              - generic [ref=e580]: 運営主体の基本情報をご案内します。
              - generic [aria-hidden]: 運営主体の基本情報をご案内します。
          - generic [ref=e582]:
            - generic [ref=e583]: 会社概要を見る
            - generic [aria-hidden]: 会社概要を見る
      - generic [ref=e587]:
        - paragraph [ref=e588]:
          - generic [ref=e589]:
            - generic [ref=e590]: お問い合わせ
            - generic [aria-hidden]: お問い合わせ
        - generic [ref=e591]:
          - heading "新しい可能性は、 ひとつの会話から。" [level=2] [ref=e592]:
            - generic [ref=e593]:
              - generic [ref=e594]: 新しい可能性は、
              - generic [aria-hidden]: 新しい可能性は、
            - generic [ref=e595]:
              - generic [ref=e596]: ひとつの会話から。
              - generic [aria-hidden]: ひとつの会話から。
          - generic [ref=e597]:
            - paragraph [ref=e598]:
              - generic [ref=e599]:
                - generic [ref=e600]: 企画・開発・映像制作・協業のご相談について。
                - generic [aria-hidden]: 企画・開発・映像制作・協業のご相談について。
            - link "お問い合わせ" [ref=e601] [cursor=pointer]:
              - /url: /contact
              - generic [ref=e602]:
                - generic [ref=e603]: お問い合わせ
                - generic [aria-hidden]: お問い合わせ
  - contentinfo [ref=e607]:
    - generic [ref=e608]:
      - generic [ref=e609]:
        - paragraph [ref=e610]:
          - generic [ref=e611]:
            - generic [ref=e612]: エンターテインメント × テクノロジー
            - generic [aria-hidden]: エンターテインメント × テクノロジー
        - navigation "フッターナビゲーション" [ref=e613]:
          - link "私たちについて" [ref=e614] [cursor=pointer]:
            - /url: /about
            - generic [ref=e615]:
              - generic [ref=e616]: 私たちについて
              - generic [aria-hidden]: 私たちについて
          - link "事業紹介" [ref=e617] [cursor=pointer]:
            - /url: /business
            - generic [ref=e618]:
              - generic [ref=e619]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - link "お知らせ" [ref=e620] [cursor=pointer]:
            - /url: /news
            - generic [ref=e621]:
              - generic [ref=e622]: お知らせ
              - generic [aria-hidden]: お知らせ
          - link "会社概要" [ref=e623] [cursor=pointer]:
            - /url: /company
            - generic [ref=e624]:
              - generic [ref=e625]: 会社概要
              - generic [aria-hidden]: 会社概要
          - link "お問い合わせ" [ref=e626] [cursor=pointer]:
            - /url: /contact
            - generic [ref=e627]:
              - generic [ref=e628]: お問い合わせ
              - generic [aria-hidden]: お問い合わせ
        - link "ページ先頭へ" [ref=e629] [cursor=pointer]:
          - /url: "#main"
      - link "MYSTENA トップ" [ref=e632] [cursor=pointer]:
        - /url: /
        - img "MYSTENA" [ref=e634]
      - generic [ref=e635]:
        - generic [ref=e636]:
          - generic [ref=e637]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "プライバシーポリシー" [ref=e638] [cursor=pointer]:
          - /url: /privacy
          - generic [ref=e639]:
            - generic [ref=e640]: プライバシーポリシー
            - generic [aria-hidden]: プライバシーポリシー
  - alert [ref=e641]
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
> 50  |     expect(uncovered, route).toEqual([]);
      |                              ^ Error: /
  51  |   }
  52  |   await page.goto("/");
  53  |   await page.getByRole("button", { name: "メニューを開く" }).click();
  54  |   const dialog = page.getByRole("dialog");
  55  |   await expect(dialog.locator(".nav-ja .menu-ink-color")).toHaveCount(6);
  56  |   await expect(dialog.locator(".nav-number .menu-ink-color")).toHaveCount(6);
  57  |   // The requested removal of the motion toggle leaves the privacy link.
  58  |   await expect(dialog.locator(".nav-aux .menu-ink-color")).toHaveCount(1);
  59  |   await expect(
  60  |     dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-color'),
  61  |   ).toHaveAttribute("data-text", "プライバシーポリシー");
  62  |   await expect(
  63  |     dialog.locator('.nav-aux a[href="/privacy"] .menu-ink-base'),
  64  |   ).toHaveText("プライバシーポリシー");
  65  |   await expect(dialog.locator(".motion-control")).toHaveCount(0);
  66  | });
  67  | 
  68  | test("independent text rhythms keep color after the background passes, then fade slowly to black", async ({
  69  |   page,
  70  | }) => {
  71  |   await page.goto("/");
  72  |   const title = page.locator(".wonder-type > .reveal-text").first();
  73  |   await title.scrollIntoViewIfNeeded();
  74  |   await expect(title).toHaveAttribute("data-reveal-state", "running");
  75  |   const envelope = await title.evaluate((el) => {
  76  |     const overlay = el.querySelector(".reveal-color")!;
  77  |     const glow = overlay
  78  |       .getAnimations()
  79  |       .find(
  80  |         (a) =>
  81  |           a.effect instanceof KeyframeEffect &&
  82  |           a.effect
  83  |             .getKeyframes()
  84  |             .some((frame) => frame.opacity === 0 || frame.opacity === "0"),
  85  |       )!;
  86  |     const effect = glow.effect as KeyframeEffect;
  87  |     const timing = effect.getTiming();
  88  |     const frames = effect.getKeyframes();
  89  |     const plateau = frames[1].computedOffset! * Number(timing.duration);
  90  |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  91  |       band.getAnimations(),
  92  |     );
  93  |     const bandEnd = Math.max(
  94  |       ...bands.map((a) => Number(a.effect!.getComputedTiming().endTime)),
  95  |     );
  96  |     return {
  97  |       delay: Number(timing.delay),
  98  |       duration: Number(timing.duration),
  99  |       holdAfterBand: Number(timing.delay) + plateau - bandEnd,
  100 |       fade: Number(timing.duration) - plateau,
  101 |     };
  102 |   });
  103 |   expect(envelope.holdAfterBand).toBeGreaterThanOrEqual(400);
  104 |   expect(envelope.holdAfterBand).toBeLessThanOrEqual(600);
  105 |   expect(envelope.fade).toBeGreaterThanOrEqual(1000);
  106 |   // Sample at least 400ms after the last band, once the scene echo finishes.
  107 |   // Near-zero opacity in the echo's final frame is still an active animation.
  108 |   // These animations run in real time; no seeking or freezing is used.
  109 |   const sample = await title.evaluate(async (el) => {
  110 |     const background = el.closest(".scene")!.querySelector(".color-echo")!;
  111 |     const backgroundFinished = Promise.all(
  112 |       background.getAnimations().map((animation) => animation.finished),
  113 |     );
  114 |     const bands = [...el.querySelectorAll(".reveal-band")].flatMap((band) =>
  115 |       band.getAnimations(),
  116 |     );
  117 |     await Promise.all(bands.map((animation) => animation.finished));
  118 |     await Promise.all([
  119 |       new Promise((resolve) => setTimeout(resolve, 400)),
  120 |       backgroundFinished,
  121 |     ]);
  122 |     return {
  123 |       color: Number(
  124 |         getComputedStyle(el.querySelector(".reveal-color")!).opacity,
  125 |       ),
  126 |       background: getComputedStyle(background).opacity,
  127 |     };
  128 |   });
  129 |   expect(sample.background).toBe("0");
  130 |   expect(sample.color).toBeGreaterThan(0.95);
  131 |   await expect(title).toHaveAttribute("data-reveal-state", "settled");
  132 |   await expect(title.locator(".reveal-source")).toHaveCSS(
  133 |     "color",
  134 |     "rgb(20, 25, 31)",
  135 |   );
  136 |   await page.getByRole("button", { name: "メニューを開く" }).click();
  137 |   const menu = await page.locator(".nav-en-color").evaluateAll((elements) =>
  138 |     elements.map((el) => {
  139 |       const style = getComputedStyle(el);
  140 |       return { duration: style.animationDuration, delay: style.animationDelay };
  141 |     }),
  142 |   );
  143 |   expect(new Set(menu.map((m) => m.delay)).size).toBeGreaterThanOrEqual(4);
  144 |   expect(new Set(menu.map((m) => m.duration)).size).toBeGreaterThanOrEqual(4);
  145 | });
  146 | 
  147 | test("scrolled headings vary palettes without hydration mismatch while the hero stays still", async ({
  148 |   browser,
  149 | }) => {
  150 |   const colors: string[] = [];
```