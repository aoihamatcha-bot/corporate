# 文字・背景グラデーションの追加調整 — 2026-09-22

実装担当。開始HEAD `fa9a7b4738395b2f4e205d410e7837ac0f5c1e64`、branch `feat/corporate-readability-20260922`、Draft PR #6。ユーザーの追加依頼は「タイトル以外も全文章にグラデーション」「背景が仕様か、適切かを確認して修正」。前の原稿・構成改修に重ねて実装し、過去の採用・検証記録は書き換えない。

## 仕様の確認と今回の変更

[motion-design-v3](motion-design-v3.md)では、文字と背景のパステル、初回の色演出、背景の8配色ランダム選択が採用されていた。[Hero v4](hero-v4.md)ではHero着地後の動きと色変化を止めている。背景グラデーション自体は意図した仕様であり、その存在を不具合とは扱わない。

今回のBeforeは、既存buildのファイルhashと実配信JS/CSSを照合して採取した。`Math.random=0.99`でAboutの指定mintがtwilightに変わり、静止したpage-intro背景も紫系へ変わる。Home aboutは固定Sky/Iris背景に別paletteの帯・SVG軌跡が重なる。Hero下部は全面shadeと追加の白gradientが重なり、mobile下端の白スクリーンは約97%相当になる。これは画像の白さを含む実測値ではなく、2つのalphaの合成値 `1-(1-0.65)*(1-0.92)`。

今回のデザイン判断は次のとおり。

- 本文・サブタイトル・補足・ラベル・ナビ・フォーム説明・フッターまで文字色の出現→保持→退色を復帰。文字用の濃い色と明るい背景用の色を分け、指定paletteを安定して使用する。画像のホバー用8配色は維持。
- 本文は原文の位置・opacity・clipを変えず、aria-hiddenの色層だけを動かす。`ColorText`と`MenuInk`は静的paletteを文字幅100%に展開し、background-positionを動かさずopacityだけで出現・保持・退色する。旧方式の文字を隠す帯と横移動は見出しに限定。本文は約2.5〜3.2秒の有限演出で、スクロール再入場では繰り返さない。メニューは開くたびに再生する。
- Hero内の見出し・説明・操作名・事業帯・スクロールラベルは静的グラデーションにし、着地後の動き0を維持する。ロゴSVG、手書きの字形、OSが描く入力値/選択肢、アイコン、読み上げ専用テキストは装飾対象にしない。
- Sceneは指定paletteを保持し、表示開始時にセクション全体を再配色しない。静止背景を白主体の32%前後の淡いtintへ揃え、背景帯の最大opacityは0.7→0.28。中間スクリーンショットで縦の矩形端が見えたため、上下だけのlinear maskを全周が透明へ抜けるradial featherへ変更する。Contactの補助ribbonは0.2→0.08。固定面・帯・軌跡が重なっても色面が強くなりすぎないよう整理する。
- Heroの全面shadeを1層残し、下部の重複した `::after` を除去。本文の下地とcapabilitiesの白い面は維持し、スクロールcueには小さなsky-paper色のpill下地を加える。

Reduced Motion・Forced Colors・JS無効・Animation API失敗・resize時の可読性を維持。Heroの静的グラデーションはReduced Motionでも静止表示し、Forced Colors/printでは通常文字色へ戻す。

## 範囲・検証記録

原稿、会社情報、問い合わせ無効/503、Privacy、noindex、素材、依存、openingの再生頻度・保持・着地・failsafeは変更しない。今回の色調整は見た目の候補でありProduction公開承認ではない。

### 中間検証と追加修正の根拠

`4af58a7d7ff7320f3bd6f7568c1b3b1d7042cdbd`での初回全体検証は195件中189 PASS / 6 FAIL（自動retryなし）。内訳は、本文と装飾層の文字列比較で片側だけをtrimしたharness不備が3件、WebKitのCSS変数keyframeの取得値と実効opacityの違いが1件、WebKit HeroのrAF採取数不足が2件。前者4件のharness修正は[CORP-005](KNOWN_FAILURE_PATTERNS.md#corp-005--webkit-keyframe-serialization-can-differ-from-effective-paint)に分け、必要な文中空白や実効opacityの要件は変えていない。

Heroだけをsource変更なしで再実行した結果は1 PASS / 1 FAIL。JAは手動再試行で回復したためFLAKY、ENはFAILのままと記録する。初回結果は `checks/e2e-full-first.json` / `failure-summary.json`、再現結果は `checks/hero-source-unchanged.json` に保存し、後の結果で上書きしない。

動画付きWebKit診断ではHeroの位置は一定で、Hero自身のactive animationは0だった。一方、sticky headerの文字色層にはbackground-positionのアニメーションが残っていた。同条件のrAF採取は従来19回/2318ms、header色層を隠した診断では101回/2308ms。実際のWAAPI keyframeからbackgroundPositionだけを外し、opacity・offset・easing・timingを維持すると36回/2322msになった。filter除去、`will-change: opacity`、headerの背景を不透明にする変更には同様の改善が見られず、採用した修正は色層を残すopacityのみの演出とした。原因とshared componentへの修正を[CORP-006](KNOWN_FAILURE_PATTERNS.md#corp-006--moving-text-gradients-in-the-sticky-header-reduce-webkit-frame-sampling)に記録する。

診断JSONは `checks/webkit-header-color-video-ab-4af58a7.json`、`checks/webkit-header-compositing-ab-4af58a7.json`、`checks/webkit-header-opacity-only-4af58a7.json`。これらはローカルの診断条件下で原因を切り分けた記録であり、最終実装のAcceptance、実機性能、field性能、INPの証明ではない。色層の非表示は診断専用であり採用していない。Heroの採取数・安定性のassertionは維持する。

`after/`の比較画像とruntime bindingは中間版`4af58a7`の記録。`after/ja-1440-home-about-active-diagnostic.png`に見える縦の端を根拠とした全周feather、scroll cueの下地、opacityのみの演出は、その記録の後に加えた修正である。中間画像を最終版の証拠として再利用せず、最終captureと検証は別のsource bindingに結び付ける。

### 最終検証

最終sourceは `a58d9d7ef97fa218506a4feb5e364cd11d31d424`。build / lint / typecheck / content 12件はPASS。修正後のHero 9ケース、文字・背景・読みやすさのfocused 54ケースがPASS（各runのFAIL/FLAKY/SKIPは0、自動retryなし）。日英、320/390/768/1440px、200%文字拡大、メニュー、動き抑制・強制色・API失敗時の表示を確認した。初回195件全体を最終sourceでも再実行したという意味ではなく、前の不変面の検証と今回の変更面のfocused検証を区別する。過去のFLAKY/FAILは上記のまま保持する。

最終sourceに紐付く14 PNGと自然動画2本を `final/` に保存した。PC背景・Hero、スマホ本文・メニュー等を目視確認。独立READ-ONLYレビューは初回差分・追加差分とも重要finding 0。検証内訳・制限・source/runtime hashは [Evidence](evidence/gradient-followup-20260922/README.md) と [final source binding](evidence/gradient-followup-20260922/final-source-binding.json) を参照。

Hosted READ/MUTATION、直接deploy、Ready、mergeはNOT RUN。CI・Git連動Previewの結果はNOT OBSERVED、監視・完了待機は行わない。次のGateは今回の文字色・背景の見た目の採用判断であり、Production公開承認とは分ける。
