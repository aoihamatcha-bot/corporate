# 事業画像8枚とサムネイルのホバー動作

2026-09-08。4事業領域に各2枚のオリジナル画像を制作し、日本語・英語のトップと事業詳細へ組み込みました。

## 画像

青・シアン・控えめなラベンダーのガラス表現で統一しました。Aは濃紺背景の一覧用、Bは明るい背景の詳細用です。画像に文字やロゴは含めず、日英共通で使用します。

| 領域                             | A：一覧用                                                               | B：事業詳細用                                                                   |
| -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| エンターテインメントEC           | [箱から広がる発見](../public/images/business/platform-card-v1.webp)     | [商品との出会いをつなぐ展示](../public/images/business/platform-detail-v1.webp) |
| サービス・システム開発           | [つながるモジュール](../public/images/business/systems-card-v1.webp)    | [整然と重なる仕組み](../public/images/business/systems-detail-v1.webp)          |
| 映像・コンテンツ制作             | [映像フレームとレンズ](../public/images/business/creative-card-v1.webp) | [連続する表現](../public/images/business/creative-detail-v1.webp)               |
| マーケティング・コラボレーション | [結び合うリボン](../public/images/business/marketing-card-v1.webp)      | [異なる形をつなぐ協業](../public/images/business/marketing-detail-v1.webp)      |

[8枚の一覧](evidence/business-thumbnails-v1/asset-gallery.png)

- 保存先：`public/images/business/`。各画像の日本語・英語altは辞書に記録。
- WebP、横幅1586〜1600px、1枚78,484〜116,120 bytes、8枚計754,950 bytes。
- 選定した元PNG計13,900,028 bytesから約94.6%削減。Sharp quality 84 / effort 6 / 最大横幅1600px、拡大なし。
- `next/image` の `sizes` / `srcset` と遅延読み込みを維持。主要な立体が中央に収まるよう、事業画像の表示位置を中央に変更。
- Built-in `image_gen` を使用。素材は事業の象徴表現であり、実サービス画面・実績・会社写真ではありません。
- 初回生成時の不要な背景透過は、同じ画像生成ツールで背景だけ修正しました。最終8枚は透過なし。形式変換・縮小はSharpで実行。
- 全プロンプト、補正プロンプト、生成ファイル識別子、SHA-256、サイズは[制作マニフェスト](business-thumbnails-v1.json)に記録。
- 原寸PNGは生成元と `.local/business-thumbnails-v1/originals/*-final.png` に保持。配布用ZIPは `.local/business-thumbnails-v1/MYSTENA-business-thumbnails-v1.zip`。

## 動作

事業一覧・事業詳細の8つの画像に `trigger="hover"` を指定しました。画像部分への細かいポインターの進入時にグラデーションが入り、退出時に滑らかに消えます。既存の8配色を順に使用し、元画像は切り替えません。

読み込み・スクロール・再スクロール・キーボードフォーカス・タップでは画像アニメーションを開始しません。カードのテキスト部分へのホバーも対象外です。カードのリンクとフォーカス表示は維持します。動き停止・OSの動き抑制設定にも対応します。

ヒーローの画像演出、背景・本文・見出し・メニューの演出は維持しています。文字の余韻0.4〜0.6秒を定めるtokens / text-rhythm / reveal-textに変更はありません。

## ローカル検証

- `npm run build`、`npm run typecheck`、`npm run lint`：PASS。
- `npm test`：11/11 PASS。
- `npm run test:e2e`：84/84 PASS、失敗・再試行・スキップなし。
- Chromium desktop/mobile、WebKit mobileで日英全8画像の読み込み・スクロール時の静止・タップ時の静止・フォーカス・動き停止を検証。desktopで8配色とフォーカス中のカーソル退出、詳細画像のホバーを検証。
- 既存の文字0.4〜0.6秒、全表示文字への適用、メニュー、言語切り替え、WCAG 2.2 AA、JS無効、画像失敗、未接続問い合わせ、noindexの回帰を含む。
- 起動後のagent-browser確認：ページ・ナビゲーション・見出し表示、エラーオーバーレイなし、ページエラーなし。
- 全8枚の画像とPC/390pxの描画を目視確認。最終WebPは透過なし、異なる8ファイル。

[テスト記録](evidence/business-thumbnails-v1/e2e-summary.json) / [画面採取条件](evidence/business-thumbnails-v1/capture.json)

[一覧PC](evidence/business-thumbnails-v1/cards-ja-1440.png) / [一覧390px](evidence/business-thumbnails-v1/cards-ja-390.png) / [詳細390px](evidence/business-thumbnails-v1/detail-en-390.png) / [ホバー](evidence/business-thumbnails-v1/thumbnail-hover.png)

画面はローカルのproduction serverから採取しました。静止レイアウトは動き抑制設定を使用し、縦長セクションを欠けずに採取するため撮影時のみ画面の高さを拡張・固定ヘッダーを非表示にしています。ホバー画像は通常の動作設定です。Hosted描画の証拠ではありません。

再採取は `node scripts/capture-business-thumbnails.mjs`。既定では日時別の `.local/` に保存し、今回の証跡を上書きしません。

## Gitと反映範囲

- Starting HEAD：`882f1e0d2205bf8632976ca42b3e42dd9f7d567c`
- アプリ・画像・テストのcommit：`99df79f07e5c0d265676af423b52b12bc28841e7`
- Branch：`feat/corporate-content-ja-en-v1`
- [既存Draft PR #2](https://github.com/aoihamatcha-bot/corporate/pull/2)に追加。後続commitはREADMEと制作・検証記録のみです。
- アプリのコードは検証後に変更していません。画面採取スクリプトの描画範囲を補正し、再採取済みです。
- Ready化・merge・Production deploy・Vercel設定変更は対象外です。既存Git連携によるPreviewの最新状態はPRに記録します。
- 以前の日英コンテンツ・モーションの検証記録は変更していません。法人情報・提供状況・公開窓口などの未確定状態も維持しています。
