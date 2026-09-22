# 文字・背景グラデーションの追加調整 — 2026-09-22

実装担当。開始HEAD `fa9a7b4738395b2f4e205d410e7837ac0f5c1e64`、branch `feat/corporate-readability-20260922`、Draft PR #6。ユーザーの追加依頼は「タイトル以外も全文章にグラデーション」「背景が仕様か、適切かを確認して修正」。前の原稿・構成改修に重ねて実装し、過去の採用・検証記録は書き換えない。

## 仕様の確認と今回の変更

[motion-design-v3](motion-design-v3.md)では、文字と背景のパステル、初回の色演出、背景の8配色ランダム選択が採用されていた。[Hero v4](hero-v4.md)ではHero着地後の動きと色変化を止めている。背景グラデーション自体は意図した仕様であり、その存在を不具合とは扱わない。

今回のBeforeは、既存buildのファイルhashと実配信JS/CSSを照合して採取した。`Math.random=0.99`でAboutの指定mintがtwilightに変わり、静止したpage-intro背景も紫系へ変わる。Home aboutは固定Sky/Iris背景に別paletteの帯・SVG軌跡が重なる。Hero下部は全面shadeと追加の白gradientが重なり、mobile下端の白スクリーンは約97%相当になる。これは画像の白さを含む実測値ではなく、2つのalphaの合成値 `1-(1-0.65)*(1-0.92)`。

今回のデザイン判断は次のとおり。

- 本文・サブタイトル・補足・ラベル・ナビ・フォーム説明・フッターまで文字色の出現→保持→退色を復帰。文字用の濃い色と明るい背景用の色を分け、指定paletteを安定して使用する。画像のホバー用8配色は維持。
- 本文は原文の位置・opacity・clipを変えず、aria-hiddenの色層だけを動かす。旧方式の文字を隠す帯と横移動は見出しに限定。本文は約2.5〜3.2秒の有限演出で、スクロール再入場では繰り返さない。メニューは開くたびに再生する。
- Hero内の見出し・説明・操作名・事業帯・スクロールラベルは静的グラデーションにし、着地後の動き0を維持する。ロゴSVG、手書きの字形、OSが描く入力値/選択肢、アイコン、読み上げ専用テキストは装飾対象にしない。
- Sceneは指定paletteを保持し、表示開始時にセクション全体を再配色しない。静止背景を白主体の32%前後の淡いtintへ揃え、背景帯の最大opacityは0.7→0.28、上下の縁をぼかす。Contactの補助ribbonは0.2→0.08。固定面・帯・軌跡が重なっても色面が強くなりすぎないよう整理する。
- Heroの全面shadeを1層残し、下部の重複した `::after` を除去。本文の下地とcapabilitiesの白い面は維持する。

Reduced Motion・Forced Colors・JS無効・Animation API失敗・resize時の可読性を維持。Heroの静的グラデーションはReduced Motionでも静止表示し、Forced Colors/printでは通常文字色へ戻す。

## 範囲・検証記録

原稿、会社情報、問い合わせ無効/503、Privacy、noindex、素材、依存、openingの再生頻度・保持・着地・failsafeは変更しない。今回の色調整は見た目の候補でありProduction公開承認ではない。

比較・検証の生記録は [Evidence](evidence/gradient-followup-20260922/)。最終結果とsource bindingはEvidence納品時に追記する。Hosted READ/MUTATION、直接deploy、Ready、mergeはNOT RUN。CI・Git連動Previewの結果はNOT OBSERVED、監視・完了待機は行わない。
