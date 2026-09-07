# 原稿・公開情報の差し替え表

すべてレビュー用。ブランドMYSTENAは使用するが、法人名・実績・個人情報は作らない。

| 項目 | 編集場所 | 現在 | 正式公開前 |
| --- | --- | --- | --- |
| Topの主原稿・ミッション | content/site.ts | 概念原稿 / contentStatus=draft | Owner確認後に確定 |
| Aboutの考え方・価値観 | content/pages.ts | 編集可能な概念原稿 | Owner確認 |
| 事業領域・名称・説明 | content/business.ts | 目指す領域。nameStatus=working | 公開可能な名称・範囲を確認 |
| ナビゲーション | content/navigation.ts | 要求された6項目 | 実ページと整合確認 |
| 正式法人名・法人種別 | content/company.ts | null / unpublished | 必須の掲載内容をOwner決定 |
| 代表者・所在地・設立・資本金 | content/company.ts | null / unpublished | 掲載可否と正式値を確認 |
| 電話・問い合わせ先 | content/company.ts | null / unpublished | 公開窓口を確定 |
| ニュース | content/news/index.ts | 0件 | 任意。実記事だけ追加 |
| 問い合わせ目的・案内 | content/pages.ts | 4種類 / unconfigured | 窓口に合わせて確認 |
| 問い合わせ実送信 | app/api/contact/route.ts、lib/contact-contract.ts | 503 / adapter未接続 | サーバー検証・実配送・重複/迷惑送信対策を実装 |
| Privacy本文 | content/pages.ts の privacy | null / unpublished、掲載準備中 | 正式な方針をheading/paragraphsで追加しpublishedへ変更 |
| 確定URL・検索公開方針 | app/layout.tsx、next.config.ts、app/robots.ts | noindex、ドメインなし | 全3か所を整合させて切替 |
| canonical・sitemap・構造化データ | 未追加 | 未設定 | 実URL・実法人情報の確定後に追加 |
| SNS・採用・計測・SNS画像 | 未追加 | 方針未確定 | 必要な場合のみ別途決定 |

## 会社情報

`publicationStatus="unpublished"` の間は値を入力しても表示しない。正式値のレビュー後に `published` へ変更する。nullが残る項目は「公開準備中」と表示されるため、正式公開前に全行を確認する。ブランド表記は法人名の欄に流用しない。

## ニュース

NewsArticleにslug、title、summary、body（段落配列）、status、publishedAtを設定する。slugは英小文字・数字・ハイフン。公開には `status="published"` と有効なISO日時（現在時刻以前）が必要。下書き・未来日時・無効日時は一覧・Top・詳細すべてで除外する。本文はReactの文字列として描画し、任意のHTMLを注入しない。

初期0件の自然な表示を維持できるため、公開日やニュースを埋め草として創作しない。テスト用記事はtests/にのみ存在する。

## 正式公開に向けた原稿確認

contentStatusを変更するだけでは検索公開・送信開始にならない。会社情報の掲載、Privacy本文の実装、メタデータ、問い合わせの実送信、ドメインの各工程は独立して確認する。窓口未設定のままフォームだけを有効化しない。
