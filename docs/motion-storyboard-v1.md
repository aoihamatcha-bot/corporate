# 好奇心の一筆 — 実装・確認記録

2026-09-10 / LOCAL 実装

採用済みの絵コンテを、現行の日本語・英語トップページへ実装。ユーザー指定の文字グラデーション、背景の色帯・残光、基本配色、LINE Seed JP と本文の配置を引き継ぎ、セクションの背景と画像枠を動かす。

## Git と実施範囲

- 作業ディレクトリ: `C:/Users/taisa/Desktop/corporate-motion-storyboard-v1`
- Branch: `feat/corporate-motion-storyboard-v1`
- Starting / Final HEAD: `016105c648e7f20d10c674b3671d69d1a0ed486e`
- 開始時の origin/main も上記 SHA。PR #4 の merge 後から専用 worktree を作成。
- 今回の変更はローカルの未 commit 差分。commit / push / PR 作成 / Ready / merge / Hosted mutation / deploy は未実施。
- 実装者によるセルフレビュー。独立監査・Hosted 検証の完了を示す記録ではない。

## 実装した流れ

| 場面 | 動き |
| --- | --- |
| 初回の導入 | 白地の正式ワードマーク → 「好奇心が、世界を変える。」をオリジナル SVG の一画ずつで描画 → 光の線 → 700ms のフェード。全体約3.6秒。 |
| ヒーロー | 採用済み A08 の微細なカメラ移動と光。導入終了後に、既存の文字グラデーション演出を開始。 |
| 事業紹介 | 各画像枠が画面に入った時に、左右の傾きと小さな移動から整列。ホバーで最大4px浮く。既存画像の8色循環は画像上のポインター操作のみ。 |
| 現在の取り組み | 各構想画像の枠が小さな移動から収まり、背景に淡い軌跡。大きなセクション内でも、下方の画像は自身の登場まで待つ。 |
| 理念 | 既存の大きな文字・カットイン・残光・カウンターを保ち、背景へ薄い波紋と軌跡を追加。 |
| 共創 | 左右からの線が出会う。相談テーマの各行が小さく立ち上がる。 |
| お知らせ | 淡い罫線と各行の小さな登場。記事未登録時は現行の掲載準備文を維持。 |
| 会社概要 | 線が矩形の枠を描き、情報の周りで静止。 |
| 問い合わせ | 光の弧で終端を結び、CTA の矢印がホバーで小さく進む。既存の窓口準備中表示を維持。 |

通常の縦スクロールを使用。モバイルは横移動と傾きを省き、上下16px程度の登場へ縮小する。追加の連続背景アニメーションは画面外・非表示タブで止める。

## 既存デザインの保持

次のファイルは Starting HEAD と差分なし。新しい演出は `styles/storyboard.css` と専用コンポーネントへ追加した。

- `app/globals.css`
- `styles/tokens.css`, `styles/motion.css`
- `components/motion/reveal-text.tsx`, `text-rhythm.ts`
- `components/motion/gradient-image.tsx`, `count-up.tsx`

共通の `observeEntrance` には導入終了を待つ条件と通知だけを追加した。既存のアニメーション時間、色、黒文字へ戻る条件は変更していない。会社情報・原稿案・仮置き実績値・お問い合わせ API・公開設定・画像素材も変更していない。

## 導入と操作

- スキップボタン、Escape、スクロール、タッチで本編へ進む。
- 導入中は native dialog を使用し、Tab はスキップに留める。明示的なスキップ後は本文へフォーカス。
- 同じタブのセッション内で一度表示。再読込・ページ間移動・言語切替では繰り返さない。
- 直接のアンカーアクセス、戻る操作、保存済みの動きOFF、OS の reduced motion / forced colors は導入を省略。
- JavaScript なしでも本文・リンクを表示。描画 API の失敗時は本編を表示。初期化に失敗しても6秒で覆いを解除する。
- React Strict Mode の effect 再実行では導入を再初期化し、実際の unmount では覆いを解除する。

## ヒーロー動画

ユーザー回答: 完成動画は未確定。使える素材がなければ動画の挿入なしでよい。

この版は動画を挿入せず、採用済み A08 を使用。`content/hero-media.ts` の `heroVideo` は `null`。完成後は、配信する動画パスと形式を設定して差し替えられる。動画は無音・インライン再生とし、動きOFFや画面外で停止、再生できない場合は A08 を維持する。

実際の完成動画を使った再生・クロスブラウザー検証は、素材確定後に行う。この版で完了した検証に含めない。

## 検証と修正履歴

- `npm run build`: PASS。既存の LINE Seed JP fallback metadata 警告は残る。
- `npm run typecheck`: PASS。
- `npm test`: 12 / 12 PASS。
- `npm run lint`: PASS。0 errors / 0 warnings。
- Playwright: **123 / 123 PASS**。Chromium PC / Chromium mobile / WebKit mobile。通常回帰99件と新規導入・各セクションテスト24件。skipped / flaky / retries は0。最終結果は `evidence/storyboard-v1/full-final.json` と `verification.json`。
- 確認用画面: 1440×900 と390×844、各10画面。`visual-check.json` に page error と横あふれの実測結果を記録。

初回の全体実行は、画像枠の Flex 幅と導入フォーカス周りの失敗を検出した時点で中断。画像枠の display / width と導入の Tab 制御を修正した。

旧来の2テストは、導入中に背面へ programmatic focus を設定していた。導入終了を待つセットアップを加え、元のメニューフォーカス・スクロール位置・8色ホバー循環の assertions はすべて維持した。この修正前の focused 実行は9 PASS / 6 FAIL。次の実行は14 PASS / 1 FAILで、PCの hover animation に AbortError を検出。フォーカスされたリンクの画像枠まで登場で動かさないよう、祖先リンクのフォーカスを判定するガードを追加した。これらの途中結果も Evidence に残す。

スキップ・xfail・断言削除・許容値緩和・自動リトライによる green 化は行っていない。

その後の全体実行は122 PASS / 1 FAIL。WebKitで、初期化前のスクロールでは本文へのフォーカス移譲が欠けていた。Traceの `data-intro="pending"` → `done` を確認し、初期化前にスクロール済みの場合も同じフォーカス移譲を行うよう修正した。修正前の全体結果は `full-before-early-scroll-fix.json`。

初期化前スクロールの修正後は、対象3環境の focused 3 / 3 PASS、続く最終全体実行123 / 123 PASS。追加修正を残さず、ローカルでの実装・検証を終了した。

## ローカル確認

`npm run build` → `npm run start`、`http://127.0.0.1:3017/` で表示。

確認用の実時間収録は `evidence/storyboard-v1/desktop-walkthrough.webm` と `mobile-walkthrough.webm`。これは実装サイトの操作記録であり、ヒーロー用映像ではない。

再収録: サーバー起動中に `node scripts/capture-storyboard.mjs`。

次の確認はユーザーによる演出の速度・強さのレビュー。公開操作はこの作業に含まない。
