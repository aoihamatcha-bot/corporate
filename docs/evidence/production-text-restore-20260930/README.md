# 指定Productionの文字演出へ復元

Implementation、2026-09-30。開始 `722d4357f69d86251975b0ee3b0077382d37a799`。基準はOwner指定の `dpl_HY3wMMRaTmLkKkfwcySZmw9XUYVA`。

## Productionを確認した証拠

[deployment binding](deployment-binding.json) は、指定IDと公開aliasを別々にVercelで照合した結果。両方ともCorporate、`production`、`READY`、Git `7ebe25888dec5f2f1e97da6cf5001e81bcdef55c` に一致した。固有URLの認証保護は変更せず、同じIDを指す公開aliasを閲覧した。Hosted MUTATIONなし。

[Production実測](production/record.json) に、実ブラウザのkeyframe / duration / delay / easing / 配色 / CSS / 配信アセットhashを記録。字幕・本文の原稿は変更前のものなので、文字列から求める微小な時間差や改行数は改修版と異なる。仕様の一致は固定秒数だけでなく、同じ計算規則・keyframe・制御コードで確認する。

| 画面 | 指定Production | 文言・構成を維持した復元版 |
| --- | --- | --- |
| PC自然再生 | [動画](production/1440-natural.webm) | [動画](local/1440-natural.webm) |
| スマホ自然再生 | [動画](production/390-natural.webm) | [動画](local/390-natural.webm) |
| PC・通常表示 | [画像](production/1440-body-settled.png) | [画像](local/1440-body-settled.png) |
| スマホ・通常表示 | [画像](production/390-body-settled.png) | [画像](local/390-body-settled.png) |
| PC・Hero着地後 | [画像](production/1440-hero.png) | [画像](local/1440-hero.png) |
| スマホ・Hero着地後 | [画像](production/390-hero.png) | [画像](local/390-hero.png) |

PC 1440×1000 / スマホ390×844、Chromiumの自然再生。seek・pause・速度変更・CSS上書きなし。スクリーンショットは動作中に取得するため、文字の登場前を含む。色は元どおりランダムに選ぶので、比較画像の色そのものが同じになることを要件にはしない。

`390-video-*.png` は、保存した自然再生動画の開始0.9秒 / 1.7秒（ファイル名に記載）から抽出した確認用フレーム。録画開始から表示準備までの時間はネットワーク等で異なるため、同じ動画時刻が同じアニメーション段階を示すとは限らない。

## 復元と保持

主要7ファイルは指定ProductionのGit blobと完全一致。本文・字幕・ラベルを含むワイプ、文字の動くグラデーション、8配色の選択、別色の帯、文字列別の時間差、初回のみの表示、メニュー再生、数字の色変化、Heroの追加演出抑制を戻した。文字演出のtokensも元値。

改修済み文言・配置・構成・余白・レスポンシブ・図版・素材は保持。SVGロゴと、改修後の穏やかなセクション背景も維持。Headerはランダム配色処理のみ、storyboard CSSはHeroの文字装飾抑制のみ変更。詳しくは [復元仕様](../../production-text-restore-20260930.md)。

## 検証と状態

実装・テストsource、検証結果、runtimeと配信アセットの一致は [source binding](source-binding.json)、ファイルhashは [artifact hashes](artifact-sha256.json)。取得スクリプトは `scripts/inspect-text-motion.mjs`。

build / lint / typecheck / content 12件: PASS。既存のLINE Seed JP fallback metadata warningあり。文字色の数値検査は本文最小4.5387、大文字最小3.4646（[計算条件](checks/contrast.json)）。写真・アンチエイリアス・実機の表示品質を証明するものではない。

実装・テストsourceは `f74b7957de8842c8f4a1f18331ac5fed831c6917`。全体回帰は201件PASS、FAIL / FLAKY / SKIPは各0、retry 0（[機械可読結果](checks/e2e-full-first.json)、[実行ログ](checks/e2e-full-first.log)）。Chromium PC / mobile・WebKit mobileで実施し、所要472.98秒。以前のFAIL/FLAKYは変更しない。元のProductionと一致するよう仕様期待値を更新した箇所と、変更していないフォールバック・操作・原稿・レイアウトの回帰を区別する。タイムアウト・retry・Heroの描画サンプル数条件は変更していない。

Hosted READはProduction参照のみ。Hosted MUTATION・直接deploy・Ready・merge・Independent Review・実機検証はNOT RUN。CI / Git連動Preview結果はNOT OBSERVED。LOCAL検証はProduction反映や採用承認ではない。
