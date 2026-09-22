# 文字・背景グラデーション — LOCAL Evidence

追加依頼の開始HEADは `fa9a7b4738395b2f4e205d410e7837ac0f5c1e64`。最終実装・テストは `a58d9d7ef97fa218506a4feb5e364cd11d31d424`、branch `feat/corporate-readability-20260922`、[Draft PR #6](https://github.com/aoihamatcha-bot/corporate/pull/6)。最終検証後の変更はEvidenceと説明文書だけに限定する。

本文・補足・ナビ・メニュー・フッターにも、原文を常に読める状態でグラデーションの出現・保持・退色を戻した。Heroは静的グラデーションとし、着地後の静止を保持する。背景は既存仕様だったが、Sceneのランダム配色が静止背景も変える構成、濃い色面、Hero下部の二重の白い層を整理した。[仕様確認・判断・変更範囲](../../gradient-followup-20260922.md)。

## 画面と実行元

| 記録 | 対象 | 用途 |
| --- | --- | --- |
| [Before](before/README.md) | `fa9a7b4`の既存production build | 修正前10 PNG、配信JS/CSSとbuild hash照合 |
| [中間After](after/README.md) | `4af58a7` | 14 PNG・自然動画2本。全周feather等の最終修正前として保持 |
| [最終画面](final/README.md) | `a58d9d7` | 14 PNG・自然動画2本、最終source/runtime/配信hash照合 |

最終source digestは `3b4b9891385eac5f5609e6501e81e55d62f1084755ffd9b6cc70d3b82493efc5`、Build IDは `Wdc_zTNX4t7zHF0FLGcpR`。runtime digestは `304d4550fb7817c812a498bc25dedc4f7bb9e6e9572ac347e3e8ce8b99b2ac9c`。対象パスと保存条件は [final-source-binding.json](final-source-binding.json) と [capture record](final/record.json) に記録する。中間版の [source-binding.json](source-binding.json) は上書きしない。

同じ条件のJA/EN、1440×1000 / 390×844、通常モーションで比較。背景の途中フレームと文字色plateauは実際の装飾animationをseek/pauseした診断画像であり、自然な経過時間や性能の証拠ではない。動画2本はseek/pauseなしの自然な演出。代表的なPC背景、PC Hero、スマホHero・本文・メニュー・英語Aboutを目視し、背景帯の縦の境目の解消、文字の可読性、cueの下地を確認した。

## 検証と履歴

全試行で自動retryは0。初回のFAILと手動再実行結果を後のPASSで置き換えない。

| 検証 | source | 結果 | 記録 |
| --- | --- | --- | --- |
| 初回全回帰 | `4af58a7` | 189 PASS / 6 FAIL / reporter FLAKY 0 / SKIP 0 | [JSON](checks/e2e-full-first.json)、[log](checks/e2e-full-first.log)、[6件の詳細](checks/failure-summary.json)、[trace等](checks/full-first-failures/) |
| Hero変更なし再現 | `4af58a7` | JA PASS / EN FAIL。JAは手動再試行回復のため履歴上FLAKY | [JSON](checks/hero-source-unchanged.json)、[log](checks/hero-source-unchanged.log)、[失敗artifact](checks/hero-source-unchanged-failures/) |
| 最終WebKit Hero日英 | `a58d9d7`相当の同一source | 2 PASS / FAIL・FLAKY・SKIP 0 | [log](checks/remediation-first.log)。次run開始前にJSONを退避できず、JSON/採取frame数の個別値は保存なし |
| 最終Chromium PC/mobile Hero | `a58d9d7`相当の同一source | 6 PASS / FAIL・FLAKY・SKIP 0 | [JSON](checks/hero-final.json)、[log](checks/hero-final.log) |
| 最終WebKit Hero viewport | `a58d9d7`相当の同一source | 1 PASS / FAIL・FLAKY・SKIP 0 | [JSON](checks/hero-viewport-final.json)、[log](checks/hero-viewport-final.log) |
| 最終focused回帰 | `a58d9d7` | 54 PASS / FAIL・FLAKY・SKIP 0 | [JSON](checks/focused-final.json)、[log](checks/focused-final.log) |

最終変更面は合計63ケースPASS。これは各focused runの合計で、195件を最終sourceで再実行したという意味ではない。初回全回帰で確認した不変面に対し、変更した共通文字・背景・Heroと読みやすさを再検証した。最終focusedには日英16ルートの文字層監査（404含む）、320/390/768/1440px、日英14ページの200%文字拡大、メニュー再開閉、Reduced Motion・Forced Colors・Animation API失敗・resize時の可読性を含む。

- 最終build / lint / typecheck / content 12件: PASS。記録は `checks/build-final.log`、`lint-final.log`、`typecheck-final.log`、`content-final.log`。既存のLINE Seed JP fallback metadata warningあり。
- 色tokenの計算上の最小contrast: 本文4.5387、large text3.4646。[計算条件](checks/contrast.json)。最終修正でtoken値は変えていない。画像背景・アンチエイリアス・実機表示はこの計算の対象外。
- 独立READ-ONLY差分レビュー: `fa9a7b4..4af58a7` と追加差分 `4af58a7..a58d9d7` とも重要finding 0。ソースレビューであり、Hosted・実機・Ownerの見た目採用判断を代替しない。

ソースと手書き文書の `git diff --check` はPASS。採取logは既存 `.gitattributes` のEvidence保存方針に従いCRLF・末尾空白を含む元のbytesを保持しており、全raw logを含めた同チェックは空白を報告する。

初回6件の内訳は、非対称trimによる文字列比較3件、WebKitのCSS変数keyframe取得と実効opacityの違い1件、WebKitのHero採取frame不足2件。前4件は検査方法を修正し、実際の文字列・最大opacity 0.28の要件は維持した。後2件は変更なし再現を経て、固定header内のbackground-position animationを原因として絞り込み、共通ColorTextとMenuInkをopacityのみの有限演出へ変更した。Heroの元のframe数・静止assertionやtimeout/retry設定は変更していない。[CORP-005/006](../../KNOWN_FAILURE_PATTERNS.md)に再利用可能な知見を記録。

`checks/webkit-*-4af58a7.json` は診断専用。色層非表示・style override・WAAPI overrideの比較を含むが、製品実装のAcceptanceや実機FPS/INPとして扱わない。

## 納品境界

追加依頼で原稿、会社情報、素材、依存、contact無効/503、noindex、Privacy、openingの再生頻度/Skip/保持/failsafeは変更していない。各既存の公開GateとA05共有画像内の旧コピー残件は前回記録のまま。

Hosted READ/MUTATION、直接deploy、Ready、merge: **NOT RUN**。CIとGit連動Preview結果: **NOT OBSERVED**。監視・完了待機は行わない。次のGateは、今回の文字色・背景の見た目の採用判断。Production公開は別承認。
