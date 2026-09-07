# グラデーション・出現演出の改訂検証

2026-09-08 JST。LOCALのproduction buildを対象とする。今回の依頼は、参考サイトの公開実装を調べ、文字・背景・画像の色とメニューの開く演出を強めること。[技術調査](reference-technology-analysis.md) と [初回の記録](verification.md) を区別する。

- Starting HEAD: `6cab3232799804bdb9181e634b478d792e30b58d`
- 検証対象のアプリケーションHEAD: `c4d582b3fe9f13bc608ddf70a3c51f4f9dfe0056`
- branch: `feat/corporate-afterglow-v1`
- [Draft PR #1](https://github.com/aoihamatcha-bot/corporate/pull/1)
- この後の証跡・ドキュメントのコミットは、アプリケーションを変更しない。

## 変更内容

文字は、実際の折り返し行に合わせた色の帯と文字用グラデーションを別々に動かす。帯の後ろから文字が現れ、最後は黒へ戻る。暗いヒーローは最後に白へ戻る。表示開始は要素単位で判定し、画面の下にある本文の演出をセクション進入時に消費しない。

メニューには独立した2枚の背景色面と各項目の文字・帯を追加した。リンクの当たり判定は動かさず、キーボードフォーカス中の項目は帯・文字マスクを解除する。閉じるときには短いワイプで戻る。

支給のAfterglow / Daylightを事業紹介の抽象ビジュアルとして利用する。画像の再ホバー・フォーカスでSky / Mint / Apricot / Irisが一巡する。暗い画像はscreen、明るい画像はmultiplyで色を重ねる。初回の色面は自動で抜け、操作を止めた画像で無限アニメーションは発生しない。

色・時間・本文の色の濃さは [tokens.css](../styles/tokens.css)、動きのスタイルは [motion.css](../styles/motion.css)。追加のアニメーションライブラリや外部データ接続はない。

## 実行結果

| 検証 | 結果 |
|---|---|
| ESLint / 型 / production build | PASS |
| 公開条件・会社情報のunit | 4 / 4 PASS |
| Chromium PC 1440×900 | E2E 16 / 16 PASS |
| Chromium SP 390×844 | E2E 16 / 16 PASS |
| WebKit SP 390×844 | E2E 16 / 16 PASS |
| 全体 | 48 / 48、skip 0、retry 0、flaky 0 |
| axe WCAG 2.2 AAタグ | 主要ページとメニュー、自動検出違反0 |

従来の33件に、要素別の出現開始、文字マスクと黒への収束、メニューを開き直した際の演出、画像4配色とキーボード操作、途中停止、幅変更、アニメーションAPIの部分失敗を確認する15件を加えた。画面遷移・戻る・フォーカス循環・スクロール復元・短い画面・JS無効・404・問い合わせ503も維持する。

最初の実行は43 / 48だった。390×500のテストでは対象文の先端が表示範囲に入っており、「画面外」の前提を満たしていなかったため、390×420の実際に画面外となる条件に修正した。アプリにはヒーロー内の移動要素をクリップする修正を加え、一時的な横幅のはみ出しを解消した。同時にWebKitで発生したスクロール復元の21px差も再現しなくなり、元の復元精度は変更していない。9件の絞った再確認を経て全48件が通過。その後、録画確認で帯より先に文字が見える瞬間を修正し、最終版でも全48件を再実行して通過した。

再現コマンド: `npm run lint`、`npm run typecheck`、`npm test`、`npm run build`、`npm run test:e2e`。詳しい実行結果は [e2e-summary.json](evidence/motion-v2/e2e-summary.json)。

## 画面・動画

- [PC動画 19.96秒](evidence/motion-v2/desktop-motion.webm) / [SP動画 15.72秒](evidence/motion-v2/mobile-motion.webm)
- [PCメニュー途中](evidence/motion-v2/desktop-menu-opening.png) / [SPメニュー完了](evidence/motion-v2/mobile-menu-settled.png)
- [文字の出現途中](evidence/motion-v2/desktop-text-opening.png) / [黒へ収束](evidence/motion-v2/desktop-text-settled.png)
- 同じ画像の4配色: [Sky](evidence/motion-v2/image-sky.png) / [Mint](evidence/motion-v2/image-mint.png) / [Apricot](evidence/motion-v2/image-apricot.png) / [Iris](evidence/motion-v2/image-iris.png)
- [PCホーム全体](evidence/motion-v2/desktop-home.png) / [SPホーム全体](evidence/motion-v2/mobile-home.png)

動画は実時間のブラウザ操作。アニメーションを巻き戻した合成動画ではない。スクリーンショットのopeningという名前は途中の状態を表し、正確な250msフレーム等を意味しない。メニュー操作前からスクリーンショット取得完了までの経過時間は [lab-measurements.json](evidence/motion-v2/lab-measurements.json) に保存する。実装中の停止フレームによる調整確認はGit対象外に分けた。

## 可読性・性能・確認の限界

動画の時系列フレームとPC/SPの途中・終了画面を確認し、色面、文字の出現、黒への収束を確認した。最終採取のローカルLCPはPC 248ms / SP 216ms、CLSはいずれも0。SPでは104msのlong taskを1件検出した。記録された操作時間の最大はPC 40ms / SP 24msであり、field INPの値ではない。

文字用12色と背景23色の組み合わせを1%刻みで計算。本文用の色は明度係数0.82を適用し、最小4.527:1、大きな文字は3.464:1、黒文字は9.435:1、補助本文は4.605:1。詳しくは [contrast.json](evidence/motion-v2/contrast.json)。色の帯による短時間の部分的な遮蔽は文字色の測定対象外で、写真背景・アンチエイリアス・未測定の表示装置も含まない。自動axeとこの計算だけで、実機を含むアクセシビリティ認証を主張しない。

ローカル計測のLCP・CLS・long task・操作時間は上記JSONに保存する。ローカルの高速応答はHostedやfield Core Web Vitalsの達成を示さない。画面外・非表示イベントの停止処理は実装上の境界として備えるが、実機のバックグラウンド復帰やOS操作による検証は未実施。実機iPhone / Android、Hosted環境での計測、全ての支援技術での手動確認は残る。

## 履歴と公開境界

初回の `docs/evidence/`、`verification.md`、`reference-analysis.md` は変更していない。対象ソースと既存証跡の保持確認は [source-manifest.json](evidence/motion-v2/source-manifest.json)、今回の証跡のハッシュは [manifest.json](evidence/motion-v2/manifest.json)。

Vercelは今回もread-onlyで確認した。MYSTENAチームで見つかったのはoripajp用プロジェクトのみで、corporate専用Previewは未接続だった。Hosted mutation、Production deploy、環境変数・ドメイン・DNS、DB / Auth / Vault操作は実施していない。

到達点はデザインレビュー用の実装とDraft PR。正式原稿・法人情報・Privacy・問い合わせ接続・ドメイン・実機確認は従来どおり確認待ち。検索除外を保持し、Ready / merge / 本番公開は行わない。
