# 指定Production版への文字演出復元

2026-09-30、Implementation。開始HEAD `722d4357f69d86251975b0ee3b0077382d37a799`、branch `feat/corporate-readability-20260922`。Ownerの最新依頼は「指定のProductionの基本的な制御・仕様に文字グラデーションだけを戻す。改修済み文言・配置・サイト構成は維持」である。以前の候補の速度・配色を再提案する依頼ではない。

## 基準の実確認

- 指定ID: `dpl_HY3wMMRaTmLkKkfwcySZmw9XUYVA`。
- Vercelによる環境: `production`、状態 `READY`、Corporate project `prj_gvvHjgASUpQX7YzqhsjduAY9bcRU`。
- 元Git: `aoihamatcha-bot/corporate`、`main`、`7ebe25888dec5f2f1e97da6cf5001e81bcdef55c`。
- 固有URLはVercel Authenticationへ遷移するため、公開alias `https://corporate-sandy-delta.vercel.app` を使用。aliasをVercelで別途解決し、同じdeployment IDへの対応を確認。保護の解除・共有トークン発行はしていない。
- 公開aliasをPC 1440×1000 / スマホ390×844で閲覧し、実際の文字・帯・メニューのkeyframe、時間、配色、Hero停止状態、配信JS/CSS hash、自然再生動画を保存。閲覧によるHosted READのみ。

## 戻した制御

| 項目 | 指定Productionと同じ挙動 |
| --- | --- |
| 文字の登場 | 実際の折り返し行ごとに帯が横切り、clip-pathによって文字が現れる。本文は横移動せず、見出しのみ指定方向へ入る |
| 配色 | 初回表示時に8系統から文字色を選択。各帯はその文字色とは別の系統。メニューは開くたび前回と違う系統を選ぶ |
| 文字色 | 180%幅のグラデーションを0%→65%→100%へ動かし、保持後に通常色へフェード。彩度45%加工・色の480ms立ち上げ・停止した色保持は撤去 |
| 時間 | 見出し: 帯720ms / 保持460ms / 退色1250ms。本文: 帯520ms / 保持420ms / 退色1050ms。字幕・ラベル・操作名も元の値。文字列から決める8段階の差、複数行最大260ms差も同じ計算 |
| メニュー | 文字と帯の別配色、glyph-reveal / type-band / nav-ink-settle、hover/focusの色変化。キーボードフォーカスした項目はmaskを解除 |
| 操作名 | utility文字は元どおり色のみ。文字を隠す帯や位置移動は付けない |
| 数字 | 元のカウントアップとランダム文字色・500ms保持・1100ms退色。今回追加した背景帯は撤去 |
| Hero | 手書きからの一度の着地後は文字・画像の追加ワイプなし。再表示用の帯・文字色を出さない |
| 終了条件 | 要素ごとの初回進入のみ。画面外・resize・非表示・動き抑制・API失敗で片付け、通常文字を残す |

`reveal-text.tsx` / `menu-ink.tsx` / `text-rhythm.ts` / `count-up.tsx` / `entrance.ts` / `hero-headline.tsx` / `styles/motion.css` は指定SHAと完全一致。tokens内の文字演出値・見出しの移動量・600px以下の移動量も一致。Headerはメニュー配色選択の処理だけを戻し、今回のナビ項目・配置を維持。storyboard CSSはHeroの文字装飾抑制だけを復元する。

## 今回の改修を保った部分

文言、日英辞書、ページ構成、Topの要約・Business詳細、HTML図、素材、余白、本文サイズ、レスポンシブ、ナビ構成、Heroのサイズ・説明文・ボタン配置、穏やかなセクション背景は維持。ロゴは現在のSVGで、旧版の隠しテキスト複製によるロゴ装飾は再導入しない（以前の文字拡大時overflow原因、CORP-001）。入力値・選択肢・アイコンはネイティブ表示。会社情報・問い合わせ無効/503・noindex・Privacy・仮数値等の公開条件にも変更なし。

以前の「本文をmaskしない」「固定配色」「長いパステル帯」の候補は、今回のProduction仕様復元では採用しない。テストの期待値もその明示的な変更に合わせる。画像・全画面背景のランダム化は復元範囲に含めない。

## 検証・公開との境界

[Evidence](evidence/production-text-restore-20260930/README.md)に結果を記録する。Hostedの実測とGit一致、改修版のLOCAL回帰・自然動画は異なる証拠として区別する。以前の結果やFAIL/FLAKYは変更しない。Independent Review、実機性能、正式な読解ユーザーテストは別。

Hosted READは上記の参照のみ。Hosted MUTATION、直接deploy、Ready、mergeは実施しない。CI・Git連動Preview結果はNOT OBSERVED。Productionへの反映は別のOwner Gate。
