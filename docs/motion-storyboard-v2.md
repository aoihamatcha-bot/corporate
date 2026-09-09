# Motion revision v2 — 手書きと画像の登場

2026-09-10。ユーザーの修正依頼に基づくローカル実装。
この文書が現行の演出仕様。`motion-storyboard-v1.md` と `evidence/storyboard-v1/` は初回実装時の記録として保持する。

## 修正内容

- 導入の文言を「好奇心が、世界を変える。」に固定。表示は絵コンテと同じ2行構成。
- 導入の文字は専用の手描きSVG。整った均一線から、右上がり・非対称の字形、筆圧の強弱、細く抜ける払いへ変更。既存の本文フォントを変更せず、外部の手書きフォントにも依存しない。
- 文字の輪郭をペンの軌跡で順に開示。未着手の描画マスクは透明度0で、丸い線端のドットも表示しない。
- ロゴから手書きへ移り、書き終わりを約650ms保持して本編へフェード。全体は約4.15秒。
- 「演出をスキップ」とサイト独自の動きON/OFFを削除。以前のlocalStorageの動きOFF設定は参照しない。
- OSの動きを減らす設定と強制配色には自動対応。キーボード操作・スクロール操作では本文へ進める。非表示のモーダルで本文を操作不能にしない。
- セッション内の初回だけ導入を再生。修正版のセッションキーは `mystena-opening-v2`。アンカー直行・戻る操作では導入を省略する。
- サムネイルは画面外で透明度0。画面下端から8%内側へ画像が入ってから、透明度0→1・移動・縮尺・PCでの軽い回転を約1.1秒で再生。PCの並列画像は120msずらす。
- 画像の登場は初回のみ。表示済みの画像は、その後のスクロールで再び消さない。静止した外枠を監視し、画像自身の移動で登場判定が揺れる問題を避ける。
- 画像の外枠で移動をクリップし、登場途中も下の説明文に重ならないようにする。キーボードでリンクにフォーカスした場合は即座に表示。
- JavaScript無効・OSの動き抑制・描画APIの失敗時も画像を表示。初期化失敗時の非表示は6秒で解除する。

## 維持したデザイン

本文の文字グラデーション、文字の背景帯、通常フォント、配色トークン、画像ホバーの8色循環は維持。画像の登場フェードは外側のラッパーに限定する。

`app/globals.css`、`styles/tokens.css`、`styles/motion.css`、`reveal-text.tsx`、`text-rhythm.ts`、`gradient-image.tsx`、`count-up.tsx`、package/lockの9ファイルをHEADとのGit blob比較で確認する。非表示になった旧コントロール向けの未使用CSSを理由に、採用済みの共通スタイルを整理し直すことはしていない。

完成ヒーロー動画は引き続き未挿入。採用済みA08の表示を維持し、`content/hero-media.ts` に完成動画を設定できる。以下の動画はサイト操作の記録であり、ヒーロー動画素材ではない。

## 画面と確認方法

- ローカルサイト: http://127.0.0.1:3017/
- PCの手書き: [画像](evidence/storyboard-v2/desktop-03-handwriting.png)
- スマートフォンの手書き: [画像](evidence/storyboard-v2/mobile-03-handwriting.png)
- 描き始め（後続のドットなし）: [画像](evidence/storyboard-v2/desktop-02-early-ink.png)
- サムネイル登場途中: [PC](evidence/storyboard-v2/desktop-06-thumbnail-fading.png) / [スマートフォン](evidence/storyboard-v2/mobile-06-thumbnail-fading.png)
- サムネイル登場完了: [画像](evidence/storyboard-v2/desktop-07-thumbnail-settled.png)
- 実時間操作記録: [PC動画](evidence/storyboard-v2/desktop-walkthrough.webm) / [スマートフォン動画](evidence/storyboard-v2/mobile-walkthrough.webm)

PC 1440×900 / スマートフォン390×844。各14枚。画像の透明度・座標の収録前後の値を `visual-check.json` に記録。収録のためにアニメーションをシークしたり、CSSを上書きしたりしていない。再収録はローカルサーバー起動中に `node scripts/capture-storyboard-v2.mjs`。

## 検証記録

ビルド・型検査・LintはPASS。内容テスト12/12 PASS。既存のLINE Seed JP fallback metadata警告は残る。

ブラウザー検証はPC Chromium・モバイルChromium・モバイルWebKit。最終確認は全体実行126 PASSと、テストの確認方法を直した3件のfocused再実行PASSの組み合わせ。全129項目の最終結果がPASS、skip・flaky・retryは0。詳細は `evidence/storyboard-v2/verification.json`、原記録は `full-before-pseudo-text-test-fix.json` と `focused-final.json`。

全体実行で残った3件は同一の文字レイヤーテストで、CSSの疑似要素が `data-text` から表示する文字を空のDOMテキストとして読んでいた。属性と読み上げ用の本文レイヤーを確認するよう修正し、3環境で再検証した。アプリ本体の変更は行っていない。

PC・スマートフォン各14枚と実時間動画を収録。画面エラー0・横あふれなし・削除した操作UIは0個。サムネイルは待機時opacity=0、登場中0<opacity<1、完了後opacity=1／transform=noneを実測。

初回の修正箇所のPCテストは10/10 PASS。その後の全体回帰は125 PASS / 4 FAIL（`full-before-review-fixes.json`）。この実行で、削除したON/OFFボタンを含むメニュー補助項目数（旧2個）のテストが残っていた。残るプライバシーリンクの文字グラデーションと、削除した操作UIが存在しないことを確認する内容へ更新した。

また、モバイルのタッチテストがセクション中央の案内リンクをタップし、`/about`へ遷移したことを失敗時DOMで確認。非リンクの見出しをタップ対象に固定し、pointer効果が付かないという元の検証を維持する。

画像枠のクリップは実画面レビューで追加。登場中の画像が本文へはみ出さないようにする。

## Git / 公開状態

- Branch: `feat/corporate-motion-storyboard-v1`
- Starting HEAD: `016105c648e7f20d10c674b3671d69d1a0ed486e`
- Final HEAD: `016105c648e7f20d10c674b3671d69d1a0ed486e`
- 先行実装の未コミット差分を保持し、その上で今回の修正を実施。
- commit / push / PR作成 / Ready / merge / Hosted mutation / deployは未実施。
- ローカルでの修正と検証まで。次はユーザーによる見た目・速度の確認。
