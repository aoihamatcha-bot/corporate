# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero-v4.spec.ts >> / lands once, stays still and saves business effects for scrolling
- Location: tests\e2e\hero-v4.spec.ts:4:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 20
Received:   19
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
          - /url: /en
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
      - region [ref=e23]:
        - generic [ref=e28]:
          - paragraph [ref=e29]:
            - generic [ref=e31]:
              - generic [ref=e32]: エンターテインメント × テクノロジー
              - text: エンターテインメント × テクノロジー
          - heading "好奇心が、 世界を変える。" [level=1] [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35]: 好奇心が、
              - text: 好奇心が、
            - generic [ref=e36]:
              - generic [ref=e37]: 世界を変える。
              - text: 世界を変える。
          - paragraph [ref=e38]:
            - generic [ref=e39]:
              - generic [ref=e40]: MYSTENAは、オンラインサービス、システム開発、映像制作、販売促進に取り組んでいます。販売・運営を支えるシステムや商品紹介動画、ブランド・クリエイターとの共同企画など、4つの領域をご紹介します。
              - text: MYSTENAは、オンラインサービス、システム開発、映像制作、販売促進に取り組んでいます。販売・運営を支えるシステムや商品紹介動画、ブランド・クリエイターとの共同企画など、4つの領域をご紹介します。
          - generic [ref=e41]:
            - link "事業紹介を見る" [ref=e42]:
              - /url: /business
              - generic [ref=e43]:
                - generic [ref=e44]: 事業紹介を見る
                - text: 事業紹介を見る
            - link "会社概要を見る" [ref=e48]:
              - /url: /company
              - generic [ref=e49]:
                - generic [ref=e50]: 会社概要を見る
                - text: 会社概要を見る
        - generic [ref=e54]:
          - generic [ref=e56]:
            - generic [ref=e57]: MYSTENAの事業をご紹介します。
            - text: MYSTENAの事業をご紹介します。
          - link "下へスクロール" [ref=e58]:
            - /url: "#business"
            - generic [ref=e59]:
              - generic [ref=e60]: 下へスクロール
              - text: 下へスクロール
        - list "企画・開発・映像制作・販売促進" [ref=e64]:
          - listitem [ref=e65]:
            - generic [ref=e66]:
              - generic [ref=e67]: 企画
              - text: 企画
          - listitem [ref=e70]:
            - generic [ref=e71]:
              - generic [ref=e72]: 開発
              - text: 開発
          - listitem [ref=e75]:
            - generic [ref=e76]:
              - generic [ref=e77]: 映像制作
              - text: 映像制作
          - listitem [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: 販売促進
              - text: 販売促進
      - generic [ref=e84]:
        - generic [ref=e85]:
          - paragraph [ref=e86]:
            - generic [ref=e87]:
              - generic [ref=e88]: "01"
              - generic [aria-hidden]: "01"
            - generic [ref=e89]:
              - generic [ref=e90]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - generic [ref=e91]:
            - heading "MYSTENAの4つの事業" [level=2] [ref=e92]:
              - generic [ref=e93]:
                - generic [ref=e94]: MYSTENAの4つの事業
                - generic [aria-hidden]: MYSTENAの4つの事業
            - paragraph [ref=e95]:
              - generic [ref=e96]:
                - generic [ref=e97]: 各事業の概要をご紹介します。取り組む内容や共同企画のテーマは、事業紹介でご覧いただけます。
                - generic [aria-hidden]: 各事業の概要をご紹介します。取り組む内容や共同企画のテーマは、事業紹介でご覧いただけます。
        - generic [ref=e98]:
          - link "ネットショップで商品を選ぶ女性の2Dイラスト 事業領域 01 エンターテインメントEC 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。 詳しく見る" [ref=e99]:
            - /url: /business#platform
            - img "ネットショップで商品を選ぶ女性の2Dイラスト" [ref=e103]
            - generic [ref=e105]:
              - generic [ref=e106]: 事業領域 01
              - generic [aria-hidden]: 事業領域 01
            - heading "エンターテインメントEC" [level=3] [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: エンターテインメントEC
                - generic [aria-hidden]: エンターテインメントEC
            - paragraph [ref=e110]:
              - generic [ref=e111]:
                - generic [ref=e112]: 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。
                - generic [aria-hidden]: 商品を選ぶ過程も楽しめる、オンライン販売サービスの企画・開発・運営。
            - generic [ref=e115]:
              - generic [ref=e116]: 詳しく見る
              - generic [aria-hidden]: 詳しく見る
          - link "コードを書きながらウェブUIを開発する二人の2Dイラスト 事業領域 02 サービス・システム開発 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。 詳しく見る" [ref=e119]:
            - /url: /business#systems
            - img "コードを書きながらウェブUIを開発する二人の2Dイラスト" [ref=e123]
            - generic [ref=e125]:
              - generic [ref=e126]: 事業領域 02
              - generic [aria-hidden]: 事業領域 02
            - heading "サービス・システム開発" [level=3] [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: サービス・システム開発
                - generic [aria-hidden]: サービス・システム開発
            - paragraph [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]: 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。
                - generic [aria-hidden]: 事業者向けのウェブサービスや、販売・運営を管理するシステムの開発。
            - generic [ref=e135]:
              - generic [ref=e136]: 詳しく見る
              - generic [aria-hidden]: 詳しく見る
          - link "商品撮影用カメラと動画編集画面のAI生成イメージ 事業領域 03 映像・コンテンツ制作 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。 詳しく見る" [ref=e139]:
            - /url: /business#creative
            - img "商品撮影用カメラと動画編集画面のAI生成イメージ" [ref=e143]
            - generic [ref=e145]:
              - generic [ref=e146]: 事業領域 03
              - generic [aria-hidden]: 事業領域 03
            - heading "映像・コンテンツ制作" [level=3] [ref=e147]:
              - generic [ref=e148]:
                - generic [ref=e149]: 映像・コンテンツ制作
                - generic [aria-hidden]: 映像・コンテンツ制作
            - paragraph [ref=e150]:
              - generic [ref=e151]:
                - generic [ref=e152]: 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。
                - generic [aria-hidden]: 商品紹介動画、サービス内の演出映像、広告素材、デジタルコンテンツの制作。
            - generic [ref=e155]:
              - generic [ref=e156]: 詳しく見る
              - generic [aria-hidden]: 詳しく見る
          - link "クリエイターと商品の魅力を発信する共同企画の2Dイラスト 事業領域 04 マーケティング・ コラボレーション 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。 詳しく見る" [ref=e159]:
            - /url: /business#marketing
            - img "クリエイターと商品の魅力を発信する共同企画の2Dイラスト" [ref=e163]
            - generic [ref=e165]:
              - generic [ref=e166]: 事業領域 04
              - generic [aria-hidden]: 事業領域 04
            - heading "マーケティング・ コラボレーション" [level=3] [ref=e167]:
              - generic [ref=e168]:
                - generic [ref=e169]: マーケティング・ コラボレーション
                - generic [aria-hidden]: マーケティング・ コラボレーション
            - paragraph [ref=e170]:
              - generic [ref=e171]:
                - generic [ref=e172]: 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。
                - generic [aria-hidden]: 販売促進の企画やSNS施策、ブランド・クリエイターとの共同企画。
            - generic [ref=e175]:
              - generic [ref=e176]: 詳しく見る
              - generic [aria-hidden]: 詳しく見る
      - generic [ref=e180]:
        - generic [ref=e181]:
          - paragraph [ref=e182]:
            - generic [ref=e183]:
              - generic [ref=e184]: "02"
              - generic [aria-hidden]: "02"
            - generic [ref=e185]:
              - generic [ref=e186]: 取り組み
              - generic [aria-hidden]: 取り組み
          - generic [ref=e187]:
            - heading "現在の取り組み" [level=2] [ref=e188]:
              - generic [ref=e189]:
                - generic [ref=e190]: 現在の取り組み
                - generic [aria-hidden]: 現在の取り組み
            - paragraph [ref=e191]:
              - generic [ref=e192]:
                - generic [ref=e193]: オンライン販売サービスで、商品を紹介する事業者と、商品を探す利用者がどのように関わるかをご紹介します。
                - generic [aria-hidden]: オンライン販売サービスで、商品を紹介する事業者と、商品を探す利用者がどのように関わるかをご紹介します。
        - figure "事業者と利用者の関係 オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。" [ref=e194]:
          - generic [ref=e195]:
            - heading "事業者と利用者の関係" [level=3] [ref=e196]:
              - generic [ref=e197]:
                - generic [ref=e198]: 事業者と利用者の関係
                - generic [aria-hidden]: 事業者と利用者の関係
            - paragraph [ref=e199]:
              - generic [ref=e200]:
                - generic [ref=e201]: オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。
                - generic [aria-hidden]: オンライン販売サービスに関わる人と、MYSTENAが考えるサービスの役割です。
          - generic [ref=e202]:
            - strong [ref=e203]:
              - generic [ref=e204]:
                - generic [ref=e205]: この図が示すこと
                - generic [aria-hidden]: この図が示すこと
            - paragraph [ref=e206]:
              - generic [ref=e207]:
                - generic [ref=e208]: 商品の紹介方法と、商品を探し、選ぶときの使いやすさを考えるための関係図です。
                - generic [aria-hidden]: 商品の紹介方法と、商品を探し、選ぶときの使いやすさを考えるための関係図です。
          - list [ref=e209]:
            - listitem [ref=e210]:
              - generic [ref=e212]:
                - generic [ref=e213]: "01"
                - generic [aria-hidden]: "01"
              - heading "商品を届ける事業者" [level=4] [ref=e214]:
                - generic [ref=e215]:
                  - generic [ref=e216]: 商品を届ける事業者
                  - generic [aria-hidden]: 商品を届ける事業者
              - paragraph [ref=e217]:
                - generic [ref=e218]:
                  - generic [ref=e219]: 商品やコンテンツを紹介する
                  - generic [aria-hidden]: 商品やコンテンツを紹介する
            - listitem [ref=e220]:
              - generic [ref=e222]:
                - generic [ref=e223]: "02"
                - generic [aria-hidden]: "02"
              - heading "MYSTENAのサービス" [level=4] [ref=e224]:
                - generic [ref=e225]:
                  - generic [ref=e226]: MYSTENAのサービス
                  - generic [aria-hidden]: MYSTENAのサービス
              - paragraph [ref=e227]:
                - generic [ref=e228]:
                  - generic [ref=e229]: 商品の紹介方法とサービスの使い方を設計する
                  - generic [aria-hidden]: 商品の紹介方法とサービスの使い方を設計する
            - listitem [ref=e230]:
              - generic [ref=e232]:
                - generic [ref=e233]: "03"
                - generic [aria-hidden]: "03"
              - heading "商品を探す利用者" [level=4] [ref=e234]:
                - generic [ref=e235]:
                  - generic [ref=e236]: 商品を探す利用者
                  - generic [aria-hidden]: 商品を探す利用者
              - paragraph [ref=e237]:
                - generic [ref=e238]:
                  - generic [ref=e239]: 商品やコンテンツを知り、選ぶことを楽しむ
                  - generic [aria-hidden]: 商品やコンテンツを知り、選ぶことを楽しむ
        - link "事業の考え方を見る" [ref=e240]:
          - /url: /business#approach
          - generic [ref=e241]:
            - generic [ref=e242]: 事業の考え方を見る
            - generic [aria-hidden]: 事業の考え方を見る
      - generic [ref=e247]:
        - paragraph [ref=e248]:
          - generic [ref=e249]:
            - generic [ref=e250]: "03"
            - generic [aria-hidden]: "03"
          - generic [ref=e251]:
            - generic [ref=e252]: 考え方
            - generic [aria-hidden]: 考え方
        - heading "私たちが大切にすること" [level=2] [ref=e253]:
          - generic [ref=e254]:
            - generic [ref=e255]: 私たちが大切にすること
            - generic [aria-hidden]: 私たちが大切にすること
        - generic [ref=e256]:
          - paragraph [ref=e258]:
            - generic [ref=e259]:
              - generic [ref=e260]: 好奇心を持つこと、分かりやすく伝えること、信頼を積み重ねること。この3つを、サービスの企画や開発で大切にしています。
              - generic [aria-hidden]: 好奇心を持つこと、分かりやすく伝えること、信頼を積み重ねること。この3つを、サービスの企画や開発で大切にしています。
          - link "私たちの考え方を見る" [ref=e261]:
            - /url: /about
            - generic [ref=e262]:
              - generic [ref=e263]: 私たちの考え方を見る
              - generic [aria-hidden]: 私たちの考え方を見る
        - region [ref=e267]:
          - heading "数字で見るMYSTENA" [level=3] [ref=e268]:
            - generic [ref=e269]:
              - generic [ref=e270]: 数字で見るMYSTENA
              - generic [aria-hidden]: 数字で見るMYSTENA
          - generic [ref=e271]:
            - generic [ref=e272]:
              - term [ref=e273]:
                - generic [ref=e274]:
                  - generic [ref=e275]: 提携者数
                  - generic [aria-hidden]: 提携者数
              - definition [ref=e276]:
                - generic [ref=e277]:
                  - generic [ref=e278]: "2"
                  - generic [aria-hidden] [ref=e279]:
                    - generic [ref=e280]: "2"
                    - generic: "2"
                - generic [ref=e282]:
                  - generic [ref=e283]: 社
                  - generic [aria-hidden]: 社
            - generic [ref=e284]:
              - term [ref=e285]:
                - generic [ref=e286]:
                  - generic [ref=e287]: 出店者数
                  - generic [aria-hidden]: 出店者数
              - definition [ref=e288]:
                - generic [ref=e289]:
                  - generic [ref=e290]: "10"
                  - generic [aria-hidden] [ref=e291]:
                    - generic [ref=e292]: "10"
                    - generic: "10"
                - generic [ref=e294]:
                  - generic [ref=e295]: 店
                  - generic [aria-hidden]: 店
            - generic [ref=e296]:
              - term [ref=e297]:
                - generic [ref=e298]:
                  - generic [ref=e299]: 登録ユーザー数
                  - generic [aria-hidden]: 登録ユーザー数
              - definition [ref=e300]:
                - generic [ref=e301]:
                  - generic [ref=e302]: 1,000
                  - generic [aria-hidden] [ref=e303]:
                    - generic [ref=e304]: 1,000
                    - generic: 1,000
                - generic [ref=e306]:
                  - generic [ref=e307]: 人
                  - generic [aria-hidden]: 人
          - paragraph [ref=e308]:
            - generic [ref=e309]:
              - generic [ref=e310]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
              - generic [aria-hidden]: ※ 数値は表示イメージのための仮置きです。実際の実績を示すものではありません。
      - generic [ref=e312]:
        - paragraph [ref=e313]:
          - generic [ref=e314]:
            - generic [ref=e315]: "04"
            - generic [aria-hidden]: "04"
          - generic [ref=e316]:
            - generic [ref=e317]: 協業・コラボレーション
            - generic [aria-hidden]: 協業・コラボレーション
        - generic [ref=e318]:
          - heading "共同企画・開発・制作について" [level=2] [ref=e319]:
            - generic [ref=e320]:
              - generic [ref=e321]: 共同企画・開発・制作について
              - generic [aria-hidden]: 共同企画・開発・制作について
          - generic [ref=e322]:
            - paragraph [ref=e323]:
              - generic [ref=e324]:
                - generic [ref=e325]: 商品の共同企画、販売サービスの開発、紹介動画の制作などが、協業の主なテーマです。
                - generic [aria-hidden]: 商品の共同企画、販売サービスの開発、紹介動画の制作などが、協業の主なテーマです。
            - paragraph [ref=e326]:
              - generic [ref=e327]:
                - generic [ref=e328]: 企画する商品や、開発・制作するものに合わせて、次のような取り組みを考えます。
                - generic [aria-hidden]: 企画する商品や、開発・制作するものに合わせて、次のような取り組みを考えます。
          - list [ref=e329]:
            - listitem [ref=e330]:
              - generic [ref=e332]:
                - generic [ref=e333]: "01"
                - generic [aria-hidden]: "01"
              - generic [ref=e334]:
                - generic [ref=e335]: 商品・限定商品の共同企画や監修
                - generic [aria-hidden]: 商品・限定商品の共同企画や監修
            - listitem [ref=e336]:
              - generic [ref=e338]:
                - generic [ref=e339]: "02"
                - generic [aria-hidden]: "02"
              - generic [ref=e340]:
                - generic [ref=e341]: 販売サービスや事業者向けシステムの開発
                - generic [aria-hidden]: 販売サービスや事業者向けシステムの開発
            - listitem [ref=e342]:
              - generic [ref=e344]:
                - generic [ref=e345]: "03"
                - generic [aria-hidden]: "03"
              - generic [ref=e346]:
                - generic [ref=e347]: 商品紹介動画・広告素材の制作
                - generic [aria-hidden]: 商品紹介動画・広告素材の制作
            - listitem [ref=e348]:
              - generic [ref=e350]:
                - generic [ref=e351]: "04"
                - generic [aria-hidden]: "04"
              - generic [ref=e352]:
                - generic [ref=e353]: SNS施策やインフルエンサーとのタイアップ
                - generic [aria-hidden]: SNS施策やインフルエンサーとのタイアップ
          - paragraph [ref=e354]:
            - generic [ref=e355]:
              - generic [ref=e356]: 協業に関するお問い合わせ窓口は、現在準備中です。
              - generic [aria-hidden]: 協業に関するお問い合わせ窓口は、現在準備中です。
          - link "お問い合わせについて" [ref=e357]:
            - /url: /contact
            - generic [ref=e359]:
              - generic [ref=e360]: お問い合わせについて
              - generic [aria-hidden]: お問い合わせについて
      - generic [ref=e365]:
        - paragraph [ref=e366]:
          - generic [ref=e367]:
            - generic [ref=e368]: "05"
            - generic [aria-hidden]: "05"
          - generic [ref=e369]:
            - generic [ref=e370]: お知らせ
            - generic [aria-hidden]: お知らせ
        - generic [ref=e371]:
          - generic [ref=e372]:
            - paragraph [ref=e373]:
              - generic [ref=e374]:
                - generic [ref=e375]: 現在、公開中のお知らせはありません。
                - generic [aria-hidden]: 現在、公開中のお知らせはありません。
            - paragraph [ref=e376]:
              - generic [ref=e377]:
                - generic [ref=e378]: お知らせがある場合は、このページに掲載します。
                - generic [aria-hidden]: お知らせがある場合は、このページに掲載します。
          - link "お知らせ一覧を見る" [ref=e379]:
            - /url: /news
            - generic [ref=e380]:
              - generic [ref=e381]: お知らせ一覧を見る
              - generic [aria-hidden]: お知らせ一覧を見る
      - generic [ref=e386]:
        - paragraph [ref=e387]:
          - generic [ref=e388]:
            - generic [ref=e389]: "06"
            - generic [aria-hidden]: "06"
          - generic [ref=e390]:
            - generic [ref=e391]: 会社概要
            - generic [aria-hidden]: 会社概要
        - link "MYSTENAを運営する事業者についてご案内します。 会社概要を見る" [ref=e392]:
          - /url: /company
          - heading "MYSTENAを運営する事業者についてご案内します。" [level=2] [ref=e393]:
            - generic [ref=e394]:
              - generic [ref=e395]: MYSTENAを運営する事業者についてご案内します。
              - generic [aria-hidden]: MYSTENAを運営する事業者についてご案内します。
          - generic [ref=e397]:
            - generic [ref=e398]: 会社概要を見る
            - generic [aria-hidden]: 会社概要を見る
      - generic [ref=e402]:
        - paragraph [ref=e403]:
          - generic [ref=e404]:
            - generic [ref=e405]: お問い合わせ
            - generic [aria-hidden]: お問い合わせ
        - generic [ref=e406]:
          - heading "お問い合わせについて" [level=2] [ref=e407]:
            - generic [ref=e408]:
              - generic [ref=e409]: お問い合わせについて
              - generic [aria-hidden]: お問い合わせについて
          - generic [ref=e410]:
            - paragraph [ref=e411]:
              - generic [ref=e412]:
                - generic [ref=e413]: 企画・開発・映像制作・協業に関する窓口を準備しています。
                - generic [aria-hidden]: 企画・開発・映像制作・協業に関する窓口を準備しています。
            - link "お問い合わせ" [ref=e414]:
              - /url: /contact
              - generic [ref=e415]:
                - generic [ref=e416]: お問い合わせ
                - generic [aria-hidden]: お問い合わせ
  - contentinfo [ref=e420]:
    - generic [ref=e421]:
      - generic [ref=e422]:
        - paragraph [ref=e423]:
          - generic [ref=e424]:
            - generic [ref=e425]: エンターテインメント × テクノロジー
            - generic [aria-hidden]: エンターテインメント × テクノロジー
        - navigation "フッターナビゲーション" [ref=e426]:
          - link "私たちについて" [ref=e427]:
            - /url: /about
            - generic [ref=e428]:
              - generic [ref=e429]: 私たちについて
              - generic [aria-hidden]: 私たちについて
          - link "事業紹介" [ref=e430]:
            - /url: /business
            - generic [ref=e431]:
              - generic [ref=e432]: 事業紹介
              - generic [aria-hidden]: 事業紹介
          - link "お知らせ" [ref=e433]:
            - /url: /news
            - generic [ref=e434]:
              - generic [ref=e435]: お知らせ
              - generic [aria-hidden]: お知らせ
          - link "会社概要" [ref=e436]:
            - /url: /company
            - generic [ref=e437]:
              - generic [ref=e438]: 会社概要
              - generic [aria-hidden]: 会社概要
          - link "お問い合わせ" [ref=e439]:
            - /url: /contact
            - generic [ref=e440]:
              - generic [ref=e441]: お問い合わせ
              - generic [aria-hidden]: お問い合わせ
        - link "ページ先頭へ" [ref=e442]:
          - /url: "#main"
      - link "MYSTENA トップ" [ref=e445]:
        - /url: /
        - img "MYSTENA" [ref=e447]
      - generic [ref=e448]:
        - generic [ref=e449]:
          - generic [ref=e450]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "プライバシーポリシー" [ref=e451]:
          - /url: /privacy
          - generic [ref=e452]:
            - generic [ref=e453]: プライバシーポリシー
            - generic [aria-hidden]: プライバシーポリシー
  - alert [ref=e454]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | for (const route of ["/", "/en"]) {
  4   |   test(`${route} lands once, stays still and saves business effects for scrolling`, async ({
  5   |     page,
  6   |     isMobile,
  7   |   }, testInfo) => {
  8   |     if (!isMobile) await page.setViewportSize({ width: 1440, height: 1200 });
  9   |     const errors: string[] = [];
  10  |     page.on("pageerror", (error) => errors.push(error.message));
  11  |     // A fresh context with delayed real font responses exercises the handoff's
  12  |     // font readiness, without replacing the browser font API or seeking time.
  13  |     await page.route(/\.woff2(?:\?|$)/, async (route) => {
  14  |       await new Promise((resolve) => setTimeout(resolve, 800));
  15  |       await route.continue();
  16  |     });
  17  |     await page.goto(route, { waitUntil: "domcontentloaded" });
  18  |     await expect(page.locator(".site-opening")).toHaveAttribute(
  19  |       "data-phase",
  20  |       "writing",
  21  |     );
  22  |     const evidence = await page.evaluate(async () => {
  23  |       const hero = document.querySelector<HTMLElement>(".hero")!;
  24  |       const title = document.querySelector<HTMLElement>("#hero-title")!;
  25  |       const cue = document.querySelector(".hero-scroll-cue path")!;
  26  |       const business = document.querySelector<HTMLElement>("#business")!;
  27  |       let cueStarted = false,
  28  |         cueAfterOpening = false,
  29  |         doneAt = 0;
  30  |       const frames: {
  31  |         font: string;
  32  |         rect: string;
  33  |         animations: number;
  34  |         color: string;
  35  |         businessTop: number;
  36  |       }[] = [];
  37  |       await new Promise<void>((resolve) => {
  38  |         function sample() {
  39  |           const intro = document.documentElement.dataset.intro;
  40  |           const cueRunning = cue
  41  |             .getAnimations()
  42  |             .some((a) => a.playState === "running");
  43  |           if (intro === "docking" && cueRunning) cueStarted = true;
  44  |           if (intro === "done") {
  45  |             if (!doneAt) doneAt = performance.now();
  46  |             cueAfterOpening ||= cueRunning;
  47  |             const box = title.getBoundingClientRect();
  48  |             const style = getComputedStyle(title);
  49  |             frames.push({
  50  |               font: style.font,
  51  |               rect: JSON.stringify([box.x, box.y, box.width, box.height]),
  52  |               color: getComputedStyle(title.querySelector(".reveal-source")!)
  53  |                 .color,
  54  |               animations: hero
  55  |                 .getAnimations({ subtree: true })
  56  |                 .filter((a) => a.playState === "running").length,
  57  |               businessTop: business.getBoundingClientRect().top,
  58  |             });
  59  |             if (performance.now() - doneAt > 2300) return resolve();
  60  |           }
  61  |           requestAnimationFrame(sample);
  62  |         }
  63  |         sample();
  64  |       });
  65  |       return {
  66  |         cueStarted,
  67  |         cueAfterOpening,
  68  |         frames,
  69  |         height: innerHeight,
  70  |         scroll: scrollY,
  71  |         fonts: document.fonts.status,
  72  |       };
  73  |     });
  74  |     await testInfo.attach("landing-samples", {
  75  |       body: JSON.stringify(evidence),
  76  |       contentType: "application/json",
  77  |     });
  78  |     expect(evidence.cueStarted).toBe(true);
  79  |     expect(evidence.cueAfterOpening).toBe(false);
  80  |     expect(evidence.fonts).toBe("loaded");
  81  |     expect(evidence.scroll).toBe(0);
> 82  |     expect(evidence.frames.length).toBeGreaterThan(20);
      |                                    ^ Error: expect(received).toBeGreaterThan(expected)
  83  |     expect(new Set(evidence.frames.map((frame) => frame.font)).size).toBe(1);
  84  |     expect(new Set(evidence.frames.map((frame) => frame.rect)).size).toBe(1);
  85  |     expect(new Set(evidence.frames.map((frame) => frame.color)).size).toBe(1);
  86  |     expect(evidence.frames.every((frame) => frame.animations === 0)).toBe(true);
  87  |     expect(
  88  |       evidence.frames.every((frame) => frame.businessTop >= evidence.height),
  89  |     ).toBe(true);
  90  |     const business = page.locator("#business");
  91  |     const title = business.locator(".section-heading .reveal-text");
  92  |     await expect(business).not.toHaveClass(/scene-entered/);
  93  |     await expect(business).not.toHaveAttribute("data-story-entered", "true");
  94  |     await expect(title).not.toHaveAttribute("data-entered", "true");
  95  |     await expect(page.locator(".hero .reveal-band, .cursor-trail")).toHaveCount(
  96  |       0,
  97  |     );
  98  |     await page.mouse.move(200, 400, { steps: 8 });
  99  |     expect(
  100 |       await page
  101 |         .locator(".hero")
  102 |         .evaluate((el) => el.getAnimations({ subtree: true }).length),
  103 |     ).toBe(0);
  104 |     await title.scrollIntoViewIfNeeded();
  105 |     await expect(business).toHaveClass(/scene-entered/);
  106 |     await expect(title).toHaveAttribute("data-reveal-state", "running");
  107 |     expect(
  108 |       await title
  109 |         .locator(".reveal-color")
  110 |         .evaluate((el) => el.getAnimations().length),
  111 |     ).toBeGreaterThan(0);
  112 |     await expect(title).toHaveAttribute("data-reveal-state", "settled");
  113 |     await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  114 |     await title.scrollIntoViewIfNeeded();
  115 |     expect(
  116 |       await title.evaluate((el) => el.getAnimations({ subtree: true }).length),
  117 |     ).toBe(0);
  118 |     expect(errors).toEqual([]);
  119 |   });
  120 | }
  121 | 
  122 | test("viewport-sized hero and static business band fit short, tall and narrow screens", async ({
  123 |   page,
  124 |   isMobile,
  125 | }, testInfo) => {
  126 |   await page.emulateMedia({ reducedMotion: "reduce" });
  127 |   const sizes = isMobile
  128 |     ? [
  129 |         { width: 320, height: 568 },
  130 |         { width: 390, height: 844 },
  131 |         { width: 844, height: 390 },
  132 |       ]
  133 |     : [
  134 |         { width: 1366, height: 768 },
  135 |         { width: 1440, height: 1200 },
  136 |         { width: 1920, height: 1440 },
  137 |       ];
  138 |   const evidence = [];
  139 |   for (const size of sizes) {
  140 |     await page.setViewportSize(size);
  141 |     for (const route of ["/", "/en"]) {
  142 |       await page.goto(route);
  143 |       await page.evaluate(() => document.fonts.ready);
  144 |       const layout = await page.evaluate(() => ({
  145 |         top: document.querySelector("#business")!.getBoundingClientRect().top,
  146 |         height: innerHeight,
  147 |         width: innerWidth,
  148 |         scrollWidth: document.documentElement.scrollWidth,
  149 |         items: [...document.querySelectorAll(".hero-capabilities li")].map(
  150 |           (el) => {
  151 |             const range = document.createRange();
  152 |             range.selectNodeContents(el.querySelector("span")!);
  153 |             const text = range.getBoundingClientRect();
  154 |             const box = el.getBoundingClientRect();
  155 |             return {
  156 |               left: text.left,
  157 |               right: text.right,
  158 |               boxLeft: box.left,
  159 |               boxRight: box.right,
  160 |             };
  161 |           },
  162 |         ),
  163 |       }));
  164 |       evidence.push({ size, route, layout });
  165 |       expect(layout.top).toBeGreaterThanOrEqual(layout.height);
  166 |       expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
  167 |       expect(layout.items).toHaveLength(4);
  168 |       layout.items.forEach((item) => {
  169 |         expect(item.left).toBeGreaterThanOrEqual(item.boxLeft);
  170 |         expect(item.right).toBeLessThanOrEqual(item.boxRight);
  171 |       });
  172 |       await expect(page.locator(".hero-capabilities")).toBeVisible();
  173 |       await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
  174 |     }
  175 |   }
  176 |   await testInfo.attach("viewport-layout", {
  177 |     body: JSON.stringify(evidence),
  178 |     contentType: "application/json",
  179 |   });
  180 | });
  181 | 
```