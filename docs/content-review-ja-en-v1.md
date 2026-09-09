# MYSTENA 日英原稿・構成レビュー v1

この資料は今回の実装と、正式掲載までに必要な確認をまとめた引き継ぎです。過去の `docs/verification*.md`、`docs/operations.md`、既存のモーション証跡は当時の記録として保持しています。

## 採用した入力と変更範囲

- 基準: `MYSTENA_CORPORATE_CONTENT_REVIEW_JA_EN_v0_1.md`。資料の提案と確定事実を区別し、レビュー版として実装。
- 開始 HEAD / 開始時の GitHub main: `e3bab814c9db4ec5fde12ad8f2ed932deca5f99e`。
- 作業ブランチ: `feat/corporate-content-ja-en-v1`。
- 後から受領した Owner の掲載原稿案を優先し、資料の「主事業＋支援的な取り組み」案を4領域に更新。
- 対象は `aoihamatcha-bot/corporate` のみ。新規依存、データベース、外部送信、Vercel設定変更は含めない。

## 原稿と情報構成

トップの主見出しは「楽しさをつくる。魅力を届ける。」。会社の説明、4領域、取り組みと素材枠、考え方、協業、ニュース、会社概要、問い合わせの順に再構成しています。

| 領域 | 相談例 | 維持・追加したアンカー |
| --- | --- | --- |
| エンターテインメントEC | 楽しさのある販売サービスを企画したい | `/business#platform` |
| サービス・システム開発 | 販売サービスや運営の仕組みを開発したい | `/business#systems` |
| 映像・コンテンツ制作 | 商品・サービスの紹介動画をつくりたい | `/business#creative` |
| マーケティング・コラボレーション | ブランドやクリエイターと商品を共同企画したい | `/business#marketing` |

インフルエンサー施策は、タイアップに加え、商品監修・限定商品の共同企画・映像制作・販売企画を含む原稿案です。業務の提供実績、正式な受託可否、受付中の契約とは断定しません。

日本語では主見出しを日本語に変更し、短い英語は補助的な表記として使用。英語版は英語の本文・見出しを使い、日本語の本文へフォールバックしません。

## 日英の公開URL

| 日本語 | English |
| --- | --- |
| `/` | `/en` |
| `/about` | `/en/about` |
| `/business` | `/en/business` |
| `/company` | `/en/company` |
| `/news` | `/en/news` |
| `/news/[slug]` | `/en/news/[slug]` |
| `/contact` | `/en/contact` |
| `/privacy` | `/en/privacy` |

- 共通テンプレート: `components/pages/`。日英辞書: `content/dictionaries/`。
- 2つのルートグループで公開URLを維持し、サーバーHTMLから `lang="ja"` / `lang="en"` を正しく出力。
- ヘッダーと全画面メニューに「日本語 / English」。同じページと事業のハッシュを維持。所在地・IP・ブラウザー言語による転送はなし。
- 言語をまたぐ移動は通常のページ読み込み。フォームに変更がある場合は移動前に確認し、入力内容をURL・ストレージへ書き込まない。現在の問い合わせ欄は無効。
- 記事は同一slugに日英それぞれの公開状態・日時を持つ。英訳未公開なら英語記事URLは404。「English version unavailable」と英語一覧へのリンクを表示。実記事はまだ0件。
- 固定ページ名、本文、パンくず、alt、ARIA、フォーム、404、メタデータ、状態文言を辞書化。

## 編集データと掲載状態

| ファイル | 用途 |
| --- | --- |
| `content/dictionaries/ja.ts` / `en.ts` | 日英の掲載原稿案とUI文言 |
| `content/editorial-review.ts` | 原稿確認状態・現在の提供状況・協業・窓口・方針の未確定項目 |
| `content/company.ts` | 確認済みの会社情報。正式名・住所は日英別、数値・日付は共通 |
| `content/news/index.ts` | 記事、言語ごとの公開状態と公開日時 |
| `content/assets.ts` | 素材の種類、入手元、許可、alt、差し替え状態 |
| `content/site.ts` / `metadata.ts` | サイト状態と正式ドメイン・canonical / hreflangの組み立て |

会社情報は未確認の任意項目を表から省略し、ブランド名と一つの説明を表示します。架空の法人名、英文社名、代表者、日付、資本金を補完しません。金額は日英で同じJPY値を使い、通貨換算しません。

「現在、開発を進めています」という段落は資料の原稿案として、近接したラベルと説明で確認中と明示。英語版も同じ状態です。

問い合わせは未接続。入力欄・送信ボタンを無効にし、`POST /api/contact` は本文を読み取らず503を返します。`?lang=en` は英語の未送信メッセージを返すための言語指定だけです。成功表示は出しません。正式なプライバシーポリシーは作成・公開していません。

レビュー版のnoindexはmeta、HTTP header、robots.txtで維持。正式ドメインは未設定のためcanonical / hreflangは現在出力しません。`localizedAlternates` は正式公開時に各ページの自己参照canonicalと、公開済み翻訳だけのhreflangを生成できます。正式公開には原稿・ドメイン・検索設定の別途確認が必要です。

## 素材

- 既存の抽象生成画像2枚はブランド表現として継続利用。
- 事業説明図はHTML。対象・提供内容の概念案と明記し、未確認の契約・支払・物流の矢印はなし。
- 実際の開発画面2枠と会社・代表者写真の枠を作成。実物が未提供のため空き枠のまま。
- 実画面が届いたら、素材台帳に作者・入手元・掲載許可・日英alt・寸法を記録し、`MaterialSlots` / 会社写真枠へ差し替える。未公開情報と権利を確認したうえで画像サイズを予約する。
- 動画は素材未提供のため追加なし。サービス説明動画を追加する段階で、実画面、日英字幕、任意再生、停止、静止画の代替を準備する。
- 架空の管理画面、実績数値、オフィス、人物を掲載していない。

## 維持した動き

余韻0.4〜0.6秒、黒へ戻るカーブ、8系統の配色、各文字・画像・メニューの異なるタイミング、初回のみのカットインを維持。本文のスクロール追従はなし。

新しいヘッダーでは、閉じる際にスクロールロックを先に解除し、ネイティブdialogのフォーカス復帰後にも保存位置を一度確認・復元します。再オープン・別ページへの遷移・別要素へ移ったフォーカスは妨げません。

## 未確定情報

| 必要な確認 | 現在 |
| --- | --- |
| 正式法人名・確認済み英文表記、設立状況・日付 | 未提供 |
| 代表者・役職・日英表記、公開所在地 | 未提供 |
| 資本金・法人番号・電話番号の公開可否と値 | 未提供 |
| 各事業の実際の提供状況、公開サービス名、受託可否 | 掲載原稿案のみ受領 |
| 対象者・提供物・収益モデルの正式な公開説明 | 未確定 |
| 受付可能な協業テーマ・募集状況 | 掲載原稿案のみ受領 |
| 公開用窓口、対応言語、個人情報の取扱運用 | 未提供 |
| 公開できる開発画面・会社/代表者写真・動画 | 未提供 |

ここが確定してから日英の原稿を同時に確定し、問い合わせ受付や正式公開を別途判断します。

## ローカル表示・画面

`npm ci` → `npm run build` → `npm run start`。日本語は http://127.0.0.1:3017/ 、英語は http://127.0.0.1:3017/en 。

[日本語 PC](evidence/content-review/screens/home-ja-1440.png) / [英語 PC](evidence/content-review/screens/home-en-1440.png)
[日本語 390px](evidence/content-review/screens/home-ja-390.png) / [英語 390px](evidence/content-review/screens/home-en-390.png)
[日本語メニュー 320px](evidence/content-review/screens/menu-ja-320.png) / [英語メニュー 320px](evidence/content-review/screens/menu-en-320.png)
[会社概要 320px](evidence/content-review/screens/company-ja-320.png) / [Company 320px](evidence/content-review/screens/company-en-320.png)

スクリーンショットは読みやすさの確認用にreduced motionを使用しています。アニメーションの実時間検証はE2Eの結果を参照してください。再採取は `node scripts/capture-content-review.mjs` で新しい `.local/` の日時別フォルダーに保存します。

検証結果・対象コード・Previewの確認範囲は [verification-content-review.md](verification-content-review.md) に記録します。
