# 接続・公開までの残作業

## 今回の境界

コーポレート専用リポジトリに実装し、ローカルproduction build、画面・操作確認、作業ブランチへのpush、Draft PRを用意する。mainは最小のREADME初期コミットのみ。Ready・merge・正式公開はレビュー後の判断。

2026-09-08 JSTのVercel read-only確認では、MYSTENAチームに存在したのは `oripajp` に紐づく `mystena-web-demo` のみ。corporate専用プロジェクトは未接続だった。依頼書§13に従い、今回の確認環境はローカルとし、専用プロジェクトの新規接続・Hosted deployは実行していない。

## Vercel専用Previewを作る際

1. Vercelで `aoihamatcha-bot/corporate` を専用プロジェクトへImport。既存のプロダクト用プロジェクトを選ばない。
2. Framework=Next.js、Root Directory=リポジトリroot、Node.js=22系、Install=`npm ci`、Build=`npm run build`、Output=Next.js既定。初期実装に外部環境変数は不要。
3. READMEだけのmainはアプリではない。feature branchをPreviewとしてデプロイし、Productionへの統合・昇格は別途判断する。接続時の自動デプロイ条件も確認する。
4. Previewは検索除外を保持し、必要に応じてVercelのアクセス保護を設定する。noindexはアクセス制限ではない。
5. 対象branch/SHA、Preview URL、deployment ID、source、target、stateを記録し、Draft PRへ追加する。接続後のGit pushが自動Previewを発生させる場合も、直接deployと区別する。
6. Hostedでメニュー・ページ遷移・404・503・静的画像・レスポンシブを再確認する。

確認した公式情報: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)、[Vercel Projects](https://vercel.com/docs/projects)、[Vercel Git](https://vercel.com/docs/git)。

## 問い合わせを接続する際

- 正式な送信先、サービス、個人情報の取り扱いをOwnerが確定。
- サーバーで目的/氏名/メール/本文/長さ/同意を検証。クライアント検証だけに依存しない。
- `ContactDelivery` の実装をserver-only境界に配置し、実際の配送成功時にだけ成功を返す。
- idempotency、レート制限、迷惑送信対策、originの確認、実送信の成功/失敗を検証する。
- 名前・メール・本文などの個人情報を通常ログやEvidenceへ保存しない。
- その後、フォームのdisabled状態、必要な同意欄、案内、APIを一緒に切り替える。

## 正式公開前

デザイン確認、原稿・法人情報・事業範囲の確定、Privacy正式本文、問い合わせ接続、実機iPhone/Androidでの操作確認、Hosted計測、URL・ドメイン・DNS決定を行う。検索公開に進む場合はmeta robots、X-Robots-Tag、robots.txtを一緒に変更する。canonical / sitemap / 法人構造化データは実在する確定情報だけで生成する。

ドメイン取得、DNS変更、Production deploy、環境変数変更、DB/Auth/Vault操作は今回未実施。
