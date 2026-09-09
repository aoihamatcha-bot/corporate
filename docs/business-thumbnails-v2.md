# 選定した事業画像4枚の反映

2026-09-09。Ownerの選定（01 A1 / 03 R2 / 04 A1）と、02の新規2Dイラスト制作依頼を反映しました。各領域の1枚を、日本語・英語のトップ一覧と事業詳細で共通利用します。

| 事業 | 採用内容 | 画像 |
| --- | --- | --- |
| 01 エンターテインメントEC | 比較案A1：オンラインで商品を選ぶ2Dイラスト | [platform-a1-v2.webp](../public/images/business/platform-a1-v2.webp) |
| 02 サービス・システム開発 | 新規：コードエディターとUIプレビュー、モバイル画面を使って開発する2Dイラスト | [systems-programming-v2.webp](../public/images/business/systems-programming-v2.webp) |
| 03 映像・コンテンツ制作 | 比較案R2：商品撮影用カメラと映像編集画面 | [creative-r2-v2.webp](../public/images/business/creative-r2-v2.webp) |
| 04 マーケティング・コラボレーション | 比較案A1：クリエイターと商品の魅力を発信する共同企画 | [marketing-a1-v2.webp](../public/images/business/marketing-a1-v2.webp) |

## 制作と組み込み

- 内蔵 `image_gen` で制作。01・03・04は選定済みWebPをバイト単位で同一のままコピー。02は新規生成し、Sharp quality 84 / effort 6でWebP化しました。
- 4枚とも1586×992px、透過なし。合計658,114 bytes。原本PNGは `.local/business-thumbnails-v2/originals/` と生成元に保持。
- 全プロンプト、元画像識別子、選定内容、寸法・容量・SHA-256は[制作マニフェスト](business-thumbnails-v2.json)に記録。
- 架空の人物・商品・制作環境・デモ画面による事業イメージです。03もAI生成で、実在の社員・会社設備・稼働サービスの記録写真ではありません。
- `content/business.ts` の画像参照と、日英のalt・素材台帳を更新。旧v1画像と過去の制作記録は保持しています。
- 一覧は16:10、詳細は16:9の既存レイアウト。各領域の画像を共通化し、同じ素材を再利用します。`next/image` の画面幅に応じた配信・遅延読み込みを維持。
- 明るい背景の選定画像に合わせ、一覧のグラデーション合成を詳細と同じmultiplyにしました。画像へのホバーだけで再生する条件、8配色、開始・終了時間、文字の0.4〜0.6秒の余韻は変更していません。

## 検証

- `npm run build` / `npm run typecheck` / `npm run lint`：PASS。
- `npm test`：11/11 PASS。
- `npm run test:e2e`：83/84 PASS。画像関連9/9はChromium desktop/mobile、WebKit mobileで成功。日英の全8掲載箇所、再スクロール時の静止、ホバー8配色、タップ・フォーカス時の静止、動き停止を検証しました。
- E2Eの画像参照を今回の4つの選定ファイルに更新し、4画像を8掲載箇所で共用する仕様に合わせました。8掲載箇所・日英alt・全ホバー条件のassertionは保持しています。
- 全体回帰の1件は、変更していない `tests/e2e/i18n.spec.ts:171` のWebKit mobileによる問い合わせ画面の未送信入力ガード確認で、`prompted` がfalseとなりました。
- 同じテストをコード・assertionを変えず、1 workerで3回単独再実行した結果は3/3 PASS。初回の失敗は取り消していません。原因および既存不具合かどうかは未確定です。問い合わせ機能・テストの修正には範囲を広げていません。
- [初回E2E結果](evidence/business-thumbnails-v2/e2e-first-run-summary.json) / [単独再実行結果](evidence/business-thumbnails-v2/contact-rerun-summary.json)。初回の全結果・失敗時の画面・traceは `.local/business-thumbnails-v2/full-e2e-first-run/` に保持。
- 起動後にagent-browserでページ・ナビゲーション・選定画像参照を確認。ページエラー・エラーオーバーレイなし。
- PCの4領域一覧、新規02のPC/390px詳細、03の390px詳細、02のホバー色を目視確認。画像の主要な内容は各サイズで収まっています。

## ローカル画面

[4領域一覧PC](evidence/business-thumbnails-v2/cards-ja-1440.png) / [一覧390px](evidence/business-thumbnails-v2/cards-ja-390.png) / [英語一覧390px](evidence/business-thumbnails-v2/cards-en-390.png)

[02詳細PC](evidence/business-thumbnails-v2/detail-ja-systems-1440.png) / [02詳細390px](evidence/business-thumbnails-v2/detail-ja-systems-390.png) / [03詳細390px](evidence/business-thumbnails-v2/detail-ja-creative-390.png) / [02ホバー](evidence/business-thumbnails-v2/systems-hover-1440.png)

[採取条件](evidence/business-thumbnails-v2/capture.json)。LOCAL production serverで撮影し、Hosted画面は未確認です。静止画ではOSの動き抑制を有効にし、セクション全体が収まる高さまでviewportを拡張しています。DOMやスタイルの撮影用変更は行っていません。ホバー画像は通常の動作設定です。

## Gitと反映範囲

- Starting HEAD / Final HEAD：`092c3d99172acc903fb8e3a22766c3d53959c1d7`。
- Branch：`feat/corporate-content-ja-en-v1`。開始時点でoriginの同branchと一致、[PR #2](https://github.com/aoihamatcha-bot/corporate/pull/2)はDraft。
- 今回の差分はローカル未commit。commit・push・Ready・merge・Hosted mutation・deployは未実施です。
- ローカル確認先：`http://127.0.0.1:3017/business#systems`。
- 残る確認事項：採用画像を反映した画面レビュー。上記の問い合わせテスト1件の非再現失敗は記録を残しており、全体E2Eを完全成功とは扱いません。
