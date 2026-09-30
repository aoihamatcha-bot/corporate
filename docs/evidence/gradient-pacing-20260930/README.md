# 淡い配色と読み取れる速度への修正

開始HEAD `a2b6ab2fe7dbce7d765e0ca0dab4ee34c01a5436`、実装・テストsource `227680aff364cad1b2aebbf19458d53c78555d15`。`feat/corporate-readability-20260922` / Draft PR #6。LOCAL production buildの記録。

## 見た目の比較

| 対象 | 修正前 | 修正候補 |
| --- | --- | --- |
| PC・自然再生 | [動画](before/ja-1440-body-menu-natural.webm) | [動画](candidate/ja-1440-body-menu-natural.webm) |
| スマホ・自然再生 | [動画](before/ja-390-body-menu-natural.webm) | [動画](candidate/ja-390-body-menu-natural.webm) |
| PC本文の帯 | [画像](before/ja-1440-body-natural.png) | [画像](candidate/ja-1440-body-natural.png) |
| スマホ本文の帯 | [画像](before/ja-390-body-natural.png) | [画像](candidate/ja-390-body-natural.png) |
| スマホの文字色のみ | — | [動画3秒地点のフレーム](candidate/ja-390-body-color-video-frame.png) |
| PCメニュー | [画像](before/ja-1440-menu-natural.png) | [画像](candidate/ja-1440-menu-natural.png) |
| Hero・スマホ | — | [帯](candidate/ja-390-hero-band.png) / [文字色](candidate/ja-390-hero-color.png) / [通常色](candidate/ja-390-hero-settled.png) |
| Hero・PC | — | [帯](candidate/ja-1440-hero-band.png) / [文字色](candidate/ja-1440-hero-color.png) / [通常色](candidate/ja-1440-hero-settled.png) |

動画・画像取得中のanimationにはseek / pause / 速度変更 / CSS上書きをしていない。`body-color-video-frame.png`だけは自然録画の3秒地点からffmpegで抽出した静止画。スクリーンショット取得の間にも再生は進む。`candidate/`は最終実装と同じsource/runtimeで、Ownerによる見た目の採用を意味しない。

## 原因と修正

本文の短い帯に全体の強いease-outがかかり、見える時間が冒頭に圧縮されていた。見出しの帯には、淡い背景用とは別の鮮やかな画像用の色が使われていた。

帯を約1.5–1.93秒にし、40–65%の区間を保持。文字は480msで現れ、帯の後にも約1秒残り、約1.3–1.9秒で通常色に戻る。文字の彩度を抑え、全種の文字帯に以前の8系統の淡い配色を使う。32個のパステル色値は `f4ce8c8` と一致。文字用の濃度、暗い面の明るい文字、常に読める原文を保つ。

代表本文のopacity > 0.45の実測区間は、修正前PC約22ms / スマホ約83ms、修正候補PC約1133ms / スマホ約1201ms。最大opacityも0.5→0.85へ変更したので、この比率を速度だけの改善率や実機性能と解釈しない。自然再生サンプルは各record.jsonに全件保存し、相対ピーク90%の比較もsource bindingに記録する。

## 検証

- build / lint / typecheck: PASS。
- 対象回帰57件: PASS、FAIL / FLAKY / SKIP 0、retry 0。Chromium PC/mobile・WebKit mobile、全テキスト、本文の実際の表示時間、8配色、メニュー再生、数字、JA/EN Hero、動き抑制・強制色・API失敗・resize。
- 読みやすさ・操作15件: PASS、FAIL / FLAKY / SKIP 0、retry 0。320px、日英14ページの200%文字拡大、メニューfocus/keyboard/連続操作、主要ページとメニューのaxe WCAG 2.2 AA検査（Reduced Motion条件）。
- 色の数値検査: 色付き本文の最小4.6236、色付き大文字3.5572。CSSの彩度・明度処理を含む既存パレットの保守的な計算であり、写真やアンチエイリアス・実機表示の証明ではない。
- 今回は全スイートの再実行ではない。過去のFAIL/FLAKYは以前の記録のまま。未変更の原稿・素材・公開条件・opening本体の詳細検査を重複実施したとは扱わない。Independent Review・実機・正式な読解ユーザーテストはNOT RUN。

57件の完全なlistログは保存。JSON出力先の環境変数と明示設定の優先順位を取り違え、次の実行時に元の一時JSONを失ったため、元のJSONと個別attachmentは未保存。`focused-first-log-summary.json`は残存ログからの集計と明記する。15件の元JSONは保存。経緯と今後の出力手順は [CORP-011](../../KNOWN_FAILURE_PATTERNS.md#corp-011--reporter-output-names-do-not-override-an-explicit-output-file) に記録し、未保存のファイルを創作したり、同じ高コスト試験を記録の都合だけで再実行したりしない。

## 再現・状態の結び付け

`scripts/capture-gradient-pacing.mjs` と `checks/capture-hero-natural.mjs` が自然再生の取得手順。[source binding](source-binding.json)、[artifact hashes](artifact-sha256.json)、[修正前](before/record.json)、[修正候補](candidate/record.json)、[Hero](candidate/hero-record.json) にbuild ID、source、配信JS/CSS一致、runtime hashを保存。自然再生は1440×1000 / 390×844、Chromium。

Corporate Hosted READ / MUTATION・直接deploy・Ready・mergeはNOT RUN。CIとGit連動Preview結果はNOT OBSERVED。未実施の独立レビュー・視覚採用・Production公開をLOCAL PASSで代替しない。
