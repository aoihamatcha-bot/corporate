# 本番の共有画像URL修正

画像採用PR #2のマージ後、公開ページはHTTP 200だったが、OGP画像が認証保護された固有deployment URLを参照していた。日本語・英語とも画像URLがVercel SSOへ302となることを実測した。

- Starting HEAD: `22bcd0f19be471b9e9e53d3234f70a76779e58ac`
- 公開ページ: `https://corporate-sandy-delta.vercel.app/` / `/en` — HTTP 200
- 旧画像host: `corporate-a3xvo9u6s-mystena.vercel.app` — 画像取得は `vercel.com/sso-api` へHTTP 302
- 修正: 本番のmetadataBaseは、Vercelが自動設定する公開ドメイン `VERCEL_PROJECT_PRODUCTION_URL` を使用。Previewはそのブランチの `VERCEL_URL` を維持する。明示した `site.canonicalOrigin` の優先順位は維持する。
- [Vercel公式資料](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url) にあるOG画像URL用途に従う。env設定・認証保護設定・デプロイ設定は変更しない。

全画像の採用、push・mergeの依頼に含まれる共有画像の動作修正。画像・デザイン・本文・アニメーションは変更しない。

ローカル検証: build / typecheck / lint PASS、単体12/12（production / preview / local / 明示originの分岐を含む）、画像・OGPのfocused E2E 6/6（Chromium desktop/mobile・WebKit mobile）。親PRの全体回帰90/90の後、今回のメタデータ変更に絞って再確認した。
