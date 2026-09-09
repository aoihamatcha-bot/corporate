# MYSTENA Corporate

青・水色・白を中心にしたMYSTENAのコーポレートサイト。日本語と英語の原稿を確認するレビュー版です。Next.js App Router / TypeScript / Reactを使用します。

## 起動

Node.js 22.14以上。バージョンはpackage.json / package-lock.jsonで固定しています。

```sh
npm ci
npm run dev
```

日本語: http://127.0.0.1:3017/
English: http://127.0.0.1:3017/en

本番相当のローカル確認:

```sh
npm run build
npm run start
```

## 検証

```sh
npm run lint
npm run typecheck
npm test
npx playwright install chromium webkit
npm run build
npm run test:e2e
```

E2Eは3017番のproduction serverを自動起動します。同じポートに別のチェックアウトやdev serverがある場合は先に止めてください。結果はtest-results/（Git対象外）に保存します。

今回の画面はproduction server起動後に `node scripts/capture-content-review.mjs` で再採取できます。日時別の `.local/` ディレクトリへ保存し、過去の証跡は上書きしません。

## 日英対応と編集

`/`、`/about`、`/business`、`/company`、`/news`、`/contact`、`/privacy` と、それぞれの `/en` 版を用意しています。`/news/[slug]` は言語ごとの公開条件を満たした実記事だけを表示します。

- 最新の原稿・構成・未確定情報: [日英コンテンツの引き継ぎ](docs/content-review-ja-en-v1.md)
- 最新の検証・画面: [日英コンテンツ検証](docs/verification-content-review.md)
- 選定した事業画像4枚とホバー動作: [画像制作・検証 v2](docs/business-thumbnails-v2.md)
- 日英辞書: [content/dictionaries/](content/dictionaries/)
- 共通ページ: [components/pages/](components/pages/)
- 会社の確定情報: [content/company.ts](content/company.ts)
- 原稿確認状態: [content/editorial-review.ts](content/editorial-review.ts)
- 素材台帳: [content/assets.ts](content/assets.ts)
- 色と動き: [styles/tokens.css](styles/tokens.css)

問い合わせは未接続です。入力欄・送信ボタンは無効、POST /api/contactも503を返し、本文を読み取り・保存・転送しません。正式な法人情報・プライバシーポリシーは未確定です。公開前の検索除外をmeta、HTTP header、robots.txtで維持しています。

8系統から文字・帯・画像の色を選び、ページ更新で配色が入れ替わります。同じ色が選ばれる場合もあります。余韻は0.4〜0.6秒。本文の入口演出は初回だけなので、見直すときはページを再読み込みしてください。動きの停止操作とOSの動き抑制設定を利用できます。

事業画像は、01・04に選定済みの2Dイラスト、02にプログラミングとUI開発の新規2Dイラスト、03に選定済みのリアルな撮影・編集イメージを使用しています。各領域の1枚を一覧と詳細で共通利用します。サムネイルのグラデーションは画像部分へのカーソルのホバーで動作し、読み込み・スクロール・キーボードフォーカス・タップでは再生しません。

## 書体

日本語・英語ともにLINE Seed JPを使用します。本文はRegular（400）、見出し・強調はBold（700）です。`next/font/google` がビルド時にフォントを取得し、サイト自身から配信します。大量の日本語分割ファイルを一括で先読みしないよう `preload: false` とし、表示に必要な文字に応じて読み込みます。

ビルド時はGoogle Fontsへの接続が必要ですが、閲覧者のブラウザからGoogle Fontsへの通信は発生しません。フォントが読み込めない場合も本文は端末の代替書体で表示されます。文字のグラデーション帯はフォント読み込み完了後に行位置を計測します。ロゴの字形、文字の余韻0.4〜0.6秒、サムネイルのホバー動作は維持しています。

LINE Seed JP © LY Corporation / SIL Open Font License 1.1。詳細は [ライセンス](public/fonts/line-seed-jp/OFL.txt) と [変更・検証記録](docs/line-seed-jp-v1.md) を参照してください。

## 過去の記録

以下は各実装時点の記録です。現在のGitHub / Vercel状態は、最新の検証資料を参照してください。

- [初回実装](docs/verification.md) / [旧原稿差し替え表](docs/content-checklist.md)
- [参考サイトの技術調査](docs/reference-technology-analysis.md)
- [文字への適用方針 v3](docs/motion-design-v3.md)
- [検証 v2](docs/verification-motion-v2.md) / [v3](docs/verification-motion-v3.md) / [v4](docs/verification-motion-v4.md)
- [初回運用引き継ぎ](docs/operations.md)

## 採用画像アセット v2

全10種類の採用素材を反映しています。ヒーロー、サービスの構想図2点、商品と人の関係図、会社・Aboutのイラスト、動画表紙の静止画、日英OGP、ニュース共通表紙、記号なしワードマークを使用します。細かい図版は新しいタブで原寸を確認できます。

図版は構想、人物とオフィスはイラストであることを明記しています。動画本編・架空ニュース・実在ブランドのロゴは追加していません。正式な会社情報と窓口の確認状態、noindex、無効な問い合わせフォームは維持しています。

OGPは日英で切り替わり、ニュースには共通表紙を使用します。画像URLの基準は設定済みの `site.canonicalOrigin` を優先し、未設定なら本番ではVercelの公開ドメイン `VERCEL_PROJECT_PRODUCTION_URL`、Previewでは `VERCEL_URL`、ローカルでは `http://127.0.0.1:3017` を使用します。これだけではcanonicalタグや検索公開を有効にしません。

[採用・検証記録](docs/asset-adoption-v2.md) / [採用ファイルとSHA-256](docs/asset-adoption-v2.json)。以前のレビュー資料は各時点の記録として保存しています。他社サイトの画像・文言・実装コード、および旧Sitesのホスティング設定は含めていません。
