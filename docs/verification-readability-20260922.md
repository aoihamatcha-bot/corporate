# Corporate 可読性改修 — 2026-09-22

実装担当。対象は `aoihamatcha-bot/corporate`。レビュー資料の提案と今回の「改修してください」という依頼を区別し、青・白、LINE Seed JP、Hero「好奇心が、世界を変える。」を保持する推奨案を実装した。資料末尾の依頼例や過去のREAD-ONLY条件を、今回の作業指示・公開承認として扱っていない。

## State / binding

- Starting HEAD / 開始時origin/main: `7ebe25888dec5f2f1e97da6cf5001e81bcdef55c`。レビュー対象と一致。開始時open PRは0件。
- Initial source commit: `76d149ccdb0e09d732130285f5a7c23457e4f8ab`。
- Final source commit: `95187af52e92934b8df85059f4f820989be226c4`。図の見出し2言語の短縮と検証前提を追加修正。components/app/styles/public/依存は初回source commitと同一。
- Branch: `feat/corporate-readability-20260922`。
- Isolated worktree: `C:/Users/taisa/Desktop/corporate-readability-20260922`。
- Dependency: Node 22.14.0 / npm 10.9.2 / Next 16.3.4 / React 19.2.8。既存package-lockを使用、依存更新なし。
- [Final source binding](evidence/readability-20260922/final-source-binding.json)にsource digest・build ID・変更しない境界との同一性・各runの件数を記録。After採取後に133ファイルのdigestを再計算し一致を確認した。
- Final delivery HEADはEvidence追加commitで確定する。source commitとのruntime/test tree equalityを納品時に確認する。

## 12項目の対応

| Review | 実装・判断 | 状態 |
| --- | --- | --- |
| CR-01 原稿 | Hero以外の見出しと本文を具体化。JA/EN・metadataを同時更新。25項目は[原稿対応表](readability-copy-20260922.md)。 | 実装 |
| CR-02 情報量 | `summary`をTop専用に新設。相談例と詳細文はBusinessへ。TopはHTML関係図1つ、A01/A02/A06/A07はBusinessの補助資料へ集約。 | 実装 |
| CR-03 スマホ図解 | 誰が関わり何をするかをHTML見出し・本文・3ノードで表示。PC横配置、mobile縦配置。取引・決済・物流の新しい関係は追加なし。 | 実装 |
| CR-04 文字・余白 | 本文16px/1.8、注記13px、操作14px以上を基準にtokens化。改修selectorの重複を整理。200%文字拡大の実不具合も修正。 | 実装 |
| CR-05 演出 | 本文・補足・ラベル・ナビは静的。不要なhook/overlayを作らない。見出しの指定paletteと一度の登場、画像の演出を保持。 | 実装 |
| CR-06 素材 | 4領域の既存画像・共通cropを保持。描画方式の統一や実績素材の生成・差替えは行わない。 | 既存素材KEEP、差替えVisual Gate |
| CR-07 Opening | 毎回再生・Skipなし・手書き53画・完成後保持・着地・failsafeの現行契約を保持。 | KEEP。頻度変更は別判断 |
| CR-08 窓口 | 協業CTAとContactBandに準備中を明示。Contact到達先の無効フォーム・503・Privacyを維持。 | 表示整合を実装、接続NOT RUN |
| CR-09 会社/実績 | 確定情報を創作しない。仮数値と「実績ではない」注記を保持。 | 正式情報は未提供、公開Gate継続 |
| CR-10 導線 | PC常設ナビに事業・考え方・会社。mobile headerをコンパクト化し、拡大時は折返す。 | 実装 |
| CR-11 編集 | 協業を04に統一、重複番号/見出しを整理、英語Home、空Newsを簡潔に。 | 実装 |
| CR-12 証跡 | 同条件Before/After、実source digest、local cold/warm診断、3ブラウザー構成の回帰。 | 結果は下記 |

## 採用・公開の境界

今回の実装候補は `copyRevisionReview.status = review` に記録。2026-09-10の過去の原稿承認は書き換えていない。本文の即読化と構成は今回の推奨方針で実装したが、Productionの採用・公開を完了したとは扱わない。

会社情報の公開、正式な提供段階、実績化、問い合わせ送信、Privacy確定、noindex解除、独自ドメイン、DNS・環境変数・Production変更は行っていない。仮数値2社/10店/1,000人の値と注記は保持している。

## 素材と原稿の照合

画像ファイル・台帳・寸法・SHA-256・altは変更なし。新規生成画像なし。4事業画像は一覧/詳細で従来の同じ素材を使用。A01/A02/A06/A07の既存画像内文字はBusinessの補助資料に残り、近接HTMLで内容と構想である旨を読める。

A05 JAのOGP実画像には以前の「楽しさをつくる。魅力を届ける。」が残っている。今回更新したHTML Heroと同文と主張しない。既存共有画像の日英一括差替えはVisual Acceptanceの残件。手書きHeroは現在の主コピーを保持。画像内文言の全面改訂を今回完了したとは扱わない。

## 検証結果

LOCAL production build / lint / typecheck / content 12件: PASS。buildには既存のLINE Seed JP fallback metadata warningがある。

初回focused: **7 PASS / 1 FAIL / 0 FLAKY / 0 SKIP**。200%文字拡大で、非表示Wordmark装飾と固定3列の数値欄が横あふれを起こした。不要DOMの除去・文字サイズに応じたgrid折返しで修正した。原因とsemantic siblingは[失敗パターン](KNOWN_FAILURE_PATTERNS.md)に記録。初回結果は上書きしていない。

独立READ-ONLYソースレビュー: `7ebe2588..76d149c` に対し actionable finding 0件。日英原稿の整合、Topと詳細の役割、CTA準備中、responsive CSS、静止本文・motion fallback、既存公開境界を確認。担当者はproduction sourceを変更していない。最終E2E・After画面・実機・Hosted acceptanceはこのソースレビューの証明範囲外。

全回帰初回: **175 PASS / 2 FAIL / 0 FLAKY / 0 SKIP**、177件、8.0分、retryなし。2件は以下の検証前提不足で、本体のmotionを変更せず修正した。

- EN Aboutが短くなり、1440×900で画像が初期表示の登場範囲に入った。画面外を前提とする旧テストに、600px高の明示fixtureと実測位置assertを追加し、初期画面内なら自動登場する別ケースも追加。
- WebKitがopeningのpending段階で本文スキップリンクのvisibilityを確認した。既存のopening完了を実状態で待ってから可読性を確認する。固定sleepやvisible-only除外は追加なし。

FAILのJSON/log/screenshot/trace/videoは `checks/e2e-full-first.*` と `checks/failures/` に保持。[失敗パターン](KNOWN_FAILURE_PATTERNS.md)にも追記した。

`76d149c..95187af` の限定した独立差分レビューも指摘なし。見出しの意味・言語整合、検証前提の妥当性と検証の維持を確認。前回から不変の実装に全面レビューを繰り返していない。

最終focused E2E: **48 PASS / 0 FAIL / 0 FLAKY / 0 SKIP**、2.7分、retryなし。afterglow / revision-v3 / readability の3ファイルをChromium PC・Chromium mobile・WebKit mobileで実行。320/390/768/1440px、14ページの日英・200%文字拡大、静止本文とナビ、画像登場と既存opening、Top→詳細→Contactを含む。未変更範囲の初回全回帰PASSと合わせて確認し、同一実装の全177件を理由なく繰り返していない。初回FAILをPASSに書き換えたり、異なるrunを単一180件PASSと表現したりしない。

最終sourceのbuild/typecheck/content12件と、変更ファイルのlintもPASS。記録は `checks/*-delta.log` / `build-final.log`。

## 画面・性能の条件

Beforeの正式比較画像は[evidence/readability-20260922/before/visual-complete/](evidence/readability-20260922/before/visual-complete/)。最初のelement screenshotにはmobile関係図末尾の採取側clipがあり、旧画像を保持して完全版を追加した。詳細は[Before README](evidence/readability-20260922/before/README.md)。

JA/EN、PC1440×1000/mobile390×844、Chromium、フォント完了・画像decode完了、Reduced Motionで静止比較。320/390/768/1440px・200%文字拡大のDOM検証と、通常motionの回帰は別に記録する。実機確認ではない。

[Before/After一覧](evidence/readability-20260922/README.md)にTopの5対象×日英×PC/mobileを収録。Before完全版20枚、After20枚に加え、Businessのシステム開発詳細とContact到達先の比較16枚を保存した。採取中のsource digestは不変。Afterの20画面で横あふれなし、page/console/request/HTTP errorは0件。詳細比較16枚も記録対象errorは0件。

目視では、390pxの図が縦配置で最後まで読めること、4事業の要約と詳細へのリンクが区別できること、問い合わせリンクの手前に準備中の案内があること、BusinessとContact到達先の説明が対応することを確認した。Topの文書高は同条件でJA PC 9,312→6,916px、JA mobile 9,742→8,249px、EN PC 9,341→7,144px、EN mobile 10,326→8,917px。情報の移動による構成差の参考値であり、理解度の合格基準ではない。

性能診断は390×844、通常motion、down1.6Mbps/up750kbps/latency150ms、CPU4倍、30秒の観測、cold/warm各1回。HTTPキャッシュのcold/warmを区別し、サーバー/画像optimizerは画面採取でwarm。LCPとopening終了を別々に記録する。単発LOCAL診断をフィールド値・実ユーザーp75・改善の統計的証明としない。

| LOCAL単発診断 | LCP (ms) | CLS | 転送bytes | font ready (ms) | opening complete (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Before cold | 2,436 | 0.000471 | 1,169,154 | 6,679.8 | 13,878.6 |
| After cold | 2,196 | 0.000630 | 1,096,137 | 6,013.2 | 11,542.0 |
| Before warm | 548 | 0 | 83,073 | 881.4 | 7,481.2 |
| After warm | 652 | 0 | 77,576 | 1,061.2 | 7,991.1 |

Before coldでは12,789.2msのdocking段階にもfailsafe由来の最初の `intro-end` があり、表は後続の `phase=complete` を使っている。Afterでcold LCPと転送量は小さかった一方、warm LCPとopening完了は遅かった。openingの頻度・時間・Skip契約は変更しておらず、待ち時間の解決を主張しない。詳細なイベント列とエラー記録は各 `record.json` に保存。

フィールドLCP/CLS/INP: UNKNOWN。実機iPhone/Android、実スクリーンリーダー、正式な読解ユーザーテスト: NOT RUN。Codexの目視評価を一般読者全員の理解度証明としない。

## Delivery / next gate

Hosted READ / Hosted MUTATION / direct deploy / Ready / merge: NOT RUN。Git pushで発生し得るGit連動Previewは直接deployと区別する。CI完了待機・監視・cancel/rerunは行わず、結果はNOT OBSERVEDとする。

納品対象はcommit / push / Draft PR。最終commit、remote branch SHAとPR URLはGitの納品記録・最終報告に結び付ける。GitHub側の実行結果はこのLOCAL Evidenceから推測しない。

次のGateは改修案の見た目・原稿の採用確認。独立ソースレビューは完了しているが、Production、検索公開、窓口開通は別のOwner判断。正式会社情報、実績の根拠、問い合わせ接続、画像内コピーの改訂、opening頻度の変更、実機・読解テストは今回完了した範囲に含めない。
