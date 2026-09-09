# MYSTENA motion / content revision v3

2026-09-10。今回のユーザー依頼に基づくローカル実装。v1 / v2 の記録は過去時点のEvidenceとして保持。

## 反映内容

- 会社概要・事業紹介・私たちについてを含む各ページの画像を、静止した外枠と動く画像に分離。画面に入るまで透明に保ち、移動・拡大・回転を伴う約1.1秒のフェードインを適用。スマホでは回転・横移動を省き、縦移動を44pxに縮小。表示後は可読状態を維持。
- 全ページ共通の監視を SiteRoot 内に配置。クライアント側のページ遷移でも画像の監視対象を更新する。元の画像グラデーションは内側の GradientImage に残し、ホバー時だけ動作する。
- JA / EN のサムネイル A01・A02・A06・A07 を v4 に更新。日本語版は下端の確認用注記を除去、英語版は日本語版の構図に揃えた英語ラベルの画像へ置換。元の素材は削除せず、生成元・寸法・ハッシュは asset-revisions-v4.json に記録。
- 原稿案バッジ、サイト共通の内容確認用バナー、開発中を想定した説明、事業提供状況の確認行、協業テーマの確認注記などを表示から除去。空になった領域と余白を整理。会社概要の法人情報と会社数値の仮置き注記は維持。
- 協業のお問い合わせを、濃紺の背景・グラデーションのアクセント線・大きな矢印を備えた CTA に変更。JA / EN それぞれのお問い合わせページへ遷移。
- ヒーローを JA「好奇心が、／世界を変える。」、EN「Curiosity changes／the world.」に統一。
- PC のマウスに追従する細い線を追加。既存配色の青・シアン・ミント・紫・オレンジを移動距離に応じて補間する。軌跡は約460msで消える。タッチ端末・幅700px以下には表示しない。

## オープニング

1. ロゴが現れ、上方へ移動。
2. 添付 mystena-handwriting-v3.zip の53画を順番に描く。完成字形と筆圧付き輪郭を同じバージョンで採用。未来の画のマスクは opacity: 0 とし、開始前の点が見えないようにする。
3. 文字と添付のスマイル矢印がすべて描き終わった後、Animation.finished を待ってから1000ms保持。
4. 実際のフォント読み込み後に見出し2行の位置を測定し、SVGの各行を約1200msで重ねる。白い背景・ロゴ・矢印は薄れ、通常の見出しがフェードイン。着地後は採用済みの文字グラデーションがゆっくり消える。
5. セッション保存による初回限定処理を撤去。TOPへのフルナビゲーション・リロードで再生し、途中までスクロールしたページのリロードでも先頭へ戻して開始する。履歴で戻る場合や直接アンカーへの遷移は閲覧位置を優先する。

スキップボタン・動きON/OFFスイッチは追加しない。スクロール・キー操作・画面サイズ変更などの際はページを開放する。OSの動き軽減・強制カラー、JavaScript無効、アニメーションAPI失敗でも本文と操作を利用できるようにする。

### ファイル

- `components/motion/handwriting.ts`：添付の筆順・中心線・配置・描画タイミング。
- `components/motion/handwriting-ink.ts`：添付の完成字形（筆圧を含むSVG輪郭）。
- `components/motion/site-opening.tsx`：筆順再生・保持・見出しへの移動。
- `components/motion/hero-headline.tsx`：見出しへのクロスフェードと既存のグラデーション。保持1000ms、移動1200msの定数。
- `styles/storyboard.css`：`.site-opening`、`.opening-handwriting`、`.handwriting-ink`、`.handwriting-stroke`、画像外枠、CTA、追従線。
- `components/motion/home-story.tsx` / `image-entrance.tsx`：全ページの画像登場処理。
- `components/motion/cursor-trail.tsx`：PC用追従線。

添付と同一の SHA-256:

| File | SHA-256 |
| --- | --- |
| handwriting.ts | 3a9dda4ff29797b984ff4fec70f54f7f802e3506d938ddbfcefdce816af30be8 |
| handwriting-ink.ts | bf0dc5ee89be60d62b765a25d9e4816ef297493cbd6b74b5f08ea4392349e27b |

再生成用の `scripts/build-handwriting-v3.mjs` も同梱。ホストのNode 22.14では `node --experimental-strip-types scripts/build-handwriting-v3.mjs` を使用する。古い `scripts/build-handwriting.ts` は同じ生成器へ委譲する。生成器を読み取り専用で評価し、全53画が添付の輪郭と一致することを確認。

## 状態と検証

- Starting HEAD / branch: `016105c648e7f20d10c674b3671d69d1a0ed486e` / `feat/corporate-motion-storyboard-v1`。
- 本依頼で commit / push / PR作成 / Ready / merge / Hosted操作 / deploy は実施しない。
- 原稿の採用とサイト公開は別の状態。公開ドメイン未設定・検索除外、会社情報の未確認値、お問い合わせの未接続状態、未承認の個人情報方針は保持する。CTAはお問い合わせページへの導線であり、送信機能の新規開通ではない。
- ヒーロー動画は未完成のため引き続き採用済み画像の動くヒーローを使用。
- 初回のPC個別テスト6件、lint、型確認、コンテンツテスト12件、production buildがPASS。全147件の回帰は142 PASS / 5 FAIL（新しい演出と旧期待値の不一致）。文字色のランダム選択を引き継ぎ、ヒーローの登場演出に関する期待値を更新し、背景帯と文字色の独立性は別の既存見出しで引き続き検証。修正対象63件を再実行し全件PASS。
- 最終点検で、フォント待機中にOSの動き軽減へ切り替えた後、古い非同期処理が演出を再開する問題をローカルブラウザーで再現。破棄済みeffectからの再開を防ぎ、新規の再現テスト3件を含む24件が全件PASS。再ビルド・lintもPASS。
- 各ケースの最新結果を集計すると150件すべてPASS（単一実行の150件PASSではない）。実行別の生レポート、問題と修正内容、未実施の操作を `docs/evidence/storyboard-v3/verification.json` に記録。
- `docs/evidence/storyboard-v3/` に実ブラウザーのスクリーンショット、PC・スマホのオープニング動画、取得時の状態を保存。LOCAL production build の証拠であり、Hosted visual verification ではない。
- build の既存警告：LINE Seed JP のfallback font metadataが見つからない。新規エラーではない。
