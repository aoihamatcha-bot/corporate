# MYSTENA Corporate

青・水色・白を中心にしたAfterglowのコーポレートサイト。正式原稿の差し替え前のレビュー版です。Next.js App Router / TypeScript / Reactを使用します。

## 起動

Node.js 22.14以上を使用します。採用バージョンはpackage.jsonとpackage-lock.jsonで固定しています。

```sh
npm ci
npm run dev
```

http://127.0.0.1:3017 を開いてください。

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

E2Eは3017番のproduction serverを自動起動します。同じポートにdev serverがある場合は先に止めてください。実行結果はtest-results/（Git対象外）に保存します。

今回の画面・録画の再採取はproduction server起動後に `node scripts/capture-motion-v4.mjs` で行えます。新しい日時付きの `.local/` ディレクトリへ保存し、既存の証跡を上書きしません。文字用グラデーションのコントラスト確認は `node scripts/verify-motion-contrast.mjs`。動きが停止中の場合はヘッダーの「動き」から再生できます。OSの動き抑制設定は優先されます。8系統から文字・帯・画像の色を選び、ページ更新で配色が入れ替わります。同じ系統が再び選ばれる場合もあります。本文の入口演出は初回だけなので、見直すときはページを再読み込みしてください。

## ページと編集場所

`/`、`/about`、`/business`、`/company`、`/news`、`/contact`、`/privacy`。`/news/[slug]` は公開条件を満たした実記事だけを表示し、存在しないURLには404を返します。

- 原稿と公開状態: [content/](content/)、[原稿差し替え表](docs/content-checklist.md)
- 色と動き: [styles/tokens.css](styles/tokens.css)
- 文字全体への適用方針（v3）: [motion-design-v3.md](docs/motion-design-v3.md)
- 参考サイトの技術調査: [reference-technology-analysis.md](docs/reference-technology-analysis.md)
- 今回の色・余韻の微調整と検証: [verification-motion-v4.md](docs/verification-motion-v4.md)
- 文字全体への適用と検証: [verification-motion-v3.md](docs/verification-motion-v3.md)
- 前回の検証記録: [verification-motion-v2.md](docs/verification-motion-v2.md)
- 初回実装の記録: [reference-analysis.md](docs/reference-analysis.md) / [verification.md](docs/verification.md)
- Vercel接続と正式公開の残作業: [operations.md](docs/operations.md)

問い合わせは未接続です。入力欄・送信ボタンは無効、POST /api/contactも503を返し、本文を読み取り・保存・転送しません。公開前の検索除外をmeta、HTTP header、robots.txtで設定しています。canonical / sitemap / 法人構造化データは未設定です。

元モックの生成画像を2枚利用しています。他社サイトの画像・文言・実装コード、および旧Sitesのホスティング設定は含めていません。
