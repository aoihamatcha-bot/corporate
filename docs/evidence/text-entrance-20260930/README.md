# 全文の帯・文字色・通常色への復帰 — LOCAL Evidence

開始HEAD `12fbd2811749d1d4d26290efcc10252fa10a379e`、最終実装・テストsource `6ced095e453ef9a6633979591211e1d347de2081`、branch `feat/corporate-readability-20260922`、[Draft PR #6](https://github.com/aoihamatcha-bot/corporate/pull/6)。[今回の仕様・参考サイトの確認](../../text-entrance-20260930.md)。

前回は本文の文字色だけを戻し、背景の帯は見出しにしか付かなかった。今回、本文・補足・常設ナビ・メニュー・カウントアップにも淡い帯を加えた。Heroも手書きの着地後に一度だけ同じ流れで表示し、通常の黒系文字へ戻す。原文の位置と可視性を装飾に依存させず、暗いfooterでは明るい通常文字を保つ。画面全体の背景は前回整理した、固定配色・白を基調にした仕様を維持する。

## 画面・動画

| 記録 | 対象 | 条件 |
| --- | --- | --- |
| [Before record](before/record.json) | 開始HEADと同じproduction source | 8 PNG、旧Build ID `Wdc_zTNX4t7zHF0FLGcpR`。既存buildと配信JS/CSSのhash照合 |
| [中間候補](initial-candidate/record.json) | `31be953` | 10 PNG・自然動画2本。Build ID `Gov2FtiCaMIShrbgyWBXK`。描画負荷調整前として保持 |
| [Final record](final/record.json) | `6ced095` | 10 PNG・自然動画2本、Build ID `0kzQ47Q7Ci4cZtUSZq538`。最終配信JS/CSSとbuild照合 |
| [帯の最大濃度の補足](band-peaks/record.json) | 同一source/build | 実際の帯の最大opacityを測定してseekした診断画像。初回画像を上書きしない |

- 自然動画: [スマホ390px](final/ja-390-body-menu-natural.webm)、[PC1440px](final/ja-1440-body-menu-natural.webm)。本文の自然な登場・退色後、メニューを開き、演出終了後に閉じる。seek/pauseや再生速度の変更なし。
- 本文: [JAスマホ](band-peaks/ja-body-390-peak.png)、[JA PC](band-peaks/ja-body-1440-peak.png)、[ENスマホ](band-peaks/en-body-390-peak.png)、[EN PC](band-peaks/en-body-1440-peak.png)。
- メニュー: [スマホ](final/ja-390-menu-entry-diagnostic.png)、[PC](final/ja-1440-menu-entry-diagnostic.png)。
- 通常色に戻ったHero: [スマホ](final/ja-390-hero-settled.png)、[PC](final/ja-1440-hero-settled.png)。
- 登場時のHero: [スマホ](band-peaks/ja-hero-390-peak.png)、[PC](band-peaks/ja-hero-1440-peak.png)。
- 暗いfooterの帯: [スマホ](band-peaks/ja-footer-390-peak.png)、[PC](band-peaks/ja-footer-1440-peak.png)。

LOCAL Chromium、通常motion、scale 1、1440×1000 / 390×844。PNGの帯と色は装飾effectだけをseek/pauseした診断用。通常の `*body-entry-diagnostic.png` は時計時間45%で採取するため、easing後には帯が既に薄い（opacity約0.052）。通常のfooter画像はIntersectionObserverの発火前になる場合がある。これらを帯の最大濃度の証拠とせず保持し、補足では実際の登場を待ち、1%刻みで実効opacityを測定して最大値で採取する。補足の周囲は他の有限animationを終了させている。最終補足は装飾のplaybackRateも0にし、予定された退色の再開で撮影中に進まないよう固定し、撮影後にも全ての対象帯がopacity 0.5で残ることを確認した。footerは親層0.2を掛けた実効0.1。撮影後の検査を加える前の補足8枚も [band-peaks-initial](band-peaks-initial/record.json) に保持する。PNGから自然な速度や性能は判断しない。

最終画面は通常10 PNG + 補足8 PNG、自然動画2本（PC9.88秒 / mobile9.84秒）。両採取でpage/console error 0、配信JS/CSS 13件のhash一致。日英本文、メニュー、Heroの登場時/通常色、暗いfooterを目視し、帯と文字色の分離、読みやすい原文、PCとmobileの改行を確認した。動的背景を診断のため停止したPNGと、操作・時間を変更しない自然動画は用途を分ける。

source/runtime digest、build/testと納品の対応は [source-binding.json](source-binding.json)、保存artifactのhashは [artifact-sha256.json](artifact-sha256.json) に記録する。実装・テストsourceの後に加えるのは文書・Evidenceのみ。

## 検証

全198ケースの初回は **196 PASS / 2 FAIL / reporter FLAKY 0 / SKIP 0**、自動retry 0・workers 2の既存設定。初回focused 11 PASSは途中のworking treeに対する結果で、最終sourceの全回帰と混同しない。過去の2026-09-22のFAIL/FLAKYとEvidenceは変更しない。

| 試行 | source | 結果 | 記録 |
| --- | --- | --- | --- |
| 初回全回帰 | `31be953` | 196 PASS / 2 FAIL、13.1分 | [JSON](checks/e2e-full-first.json)、[log](checks/e2e-full-first.log)、[失敗artifact](checks/full-first-failures/) |
| Tab変更なし再現 | `31be953` | Chromium PC・WebKit mobile 2 PASS。PCは手動回復のため履歴上FLAKY | [JSON](checks/source-unchanged-reproduction.json) |
| Hero変更なし再現 | `31be953` | WebKit JA/EN 2 FAIL | [JSON](checks/hero-source-unchanged.json)、[失敗artifact](checks/hero-source-unchanged-failures/) |
| 最終WebKit Hero・操作受付 | `6ced095` | 5 PASS / FAIL・FLAKY・SKIP 0 | [JSON](checks/hold-remediation-first.json) |
| 最終共通面focused | `6ced095` | 69 PASS / FAIL・FLAKY・SKIP 0、3.7分 | [JSON](checks/focused-final.json)、[log](checks/focused-final.log) |
| 最終Chromium PC/mobile Hero・操作受付 | `6ced095` | 10 PASS / FAIL・FLAKY・SKIP 0 | [JSON](checks/hero-opening-final.json) |

Tabの初回traceでは、CSSのカバーが見える `pending` 時点でキーを送り、その後openingが自然終了した。Tab/Escape/scrollの検査に、実際のnative modalと入力受付が始まったことの前提を追加した。ハンドラー開始前のキーを取り消せるという証明にはせず、opening本体は変更していない。[時系列](checks/opening-tab-trace-timeline.json)、[CORP-008](../../KNOWN_FAILURE_PATTERNS.md)。

Heroは位置とフォントが一定でも、WebKitでrAF採取が不足した。帯の非表示、描画層の昇格、filterの除去、直接文字への置換では改善せず、すべての文字色層を除いた診断だけが77サンプルになった。色一定の区間だけを休止する診断は28サンプル（同条件baseline 17）。共通ColorTextで一定の保持区間を休止し、元の時刻に退色を再開する修正を採用した。帯・色・rise/hold/fade時間・原文を維持し、Heroの >20サンプル条件は緩めていない。[CORP-009](../../KNOWN_FAILURE_PATTERNS.md)、`checks/webkit-compositing-*.json`。これらの介入は診断であり、製品版や実機FPSのAcceptanceではない。

最終変更面は **84ケースPASS**（上記5 + 69 + 10）、各runのFAIL/FLAKY/SKIP 0、自動retry 0。198件を最終sourceで再実行したという意味ではなく、不変面の初回PASSと、修正した共通面の再検証を分けて報告する。最終WebKit Heroの日英rAFサンプルは51 / 42、位置は各1種類。[採取数と失敗の一覧](checks/failure-and-hero-samples.json)。

build / lint / typecheck / content、自然な帯と色の同時表示、終了後の通常色、日英16ルートの文字層、320/390/768/1440px、200%文字拡大、メニュー開閉とfocus、Reduced Motion / Forced Colors / JS無効 / resize / 部分的なAnimation API失敗を確認する。Heroの位置・フォント・手書き保持・着地・rAF採取条件、後続節のスクロール開始条件は維持し、今回の明示依頼に合わせ有限の文字色だけを許容する。

最終build / lint / typecheckはPASS。記録は `checks/build-hold-final.log`、`lint-final.log`、`typecheck-final.log`。content検査12件PASSは今回の初期run [content.log](checks/content.log) の結果を再利用し、content・検査実装・依存が変更されていないことを照合した。

既存のLINE Seed JP fallback metadata warningは残る。[色tokenのcontrast計算](checks/contrast.json) は本文最小4.5387、大きな文字3.4646。画像背景・アンチエイリアス・実機表示を含まない。ブラウザーエミュレーションや自動accessibility検査を、実機性能・フィールドCore Web Vitals・正式な読解ユーザーテストの証明としない。

ソースと手書き文書の `git diff --check` はPASS。採取logは既存 `.gitattributes` のEvidence保存方針に従いCRLF・末尾空白を含む元のbytesを保持しており、全raw logを含めた同チェックの空白報告とは区別する。

今回の役割はImplementation。差分セルフレビューと実装検証を行う。2026-09-22の独立レビューを今回のsourceへ転用せず、今回の独立レビューは **NOT RUN**。

## 境界・次のGate

原稿、会社情報、素材、依存、contact無効/503、noindex、Privacy、openingの字形/再生頻度/Skip/保持/failsafeは変更していない。共有画像内の旧コピーA05と公開準備の残件は従来どおり。

参考サイトWhateverのHosted READのみ実施。Corporate Hosted READ/MUTATION、直接deploy、Ready、merge: **NOT RUN**。CI・Git連動Preview結果: **NOT OBSERVED**。CI監視・完了待機は行わない。次のGateは、この演出と読みやすさの見た目の採用確認。Production公開は別承認。
