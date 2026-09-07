# Motion v3 検証記録

2026-09-08 JST。LOCALのproduction buildを対象とする。[今回の設計](motion-design-v3.md)、[前回の検証](verification-motion-v2.md)と区別する。

- Starting HEAD: `4f622bb860617759aee2e6739c251183e9e54f15`
- 検証対象のアプリケーションHEAD: `f5d5cef59e8f58935b2eb484b5f22240577b1b96`
- branch: `feat/corporate-afterglow-v1`
- [Draft PR #1](https://github.com/aoihamatcha-bot/corporate/pull/1)
- 後続コミットはREADME・本記録・証跡のみ。アプリケーションは変更しない。

## 変更と確認

8系統から文字と帯を別々に選び、同じ見出しにもページ更新で配色の変化が出るようにした。画像のホバー・キーボードフォーカスは8系統を一巡する。見出し・サブタイトル・本文・ラベル・操作名で開始待ち、帯、保持、退色の時間を分けた。通常の文字は帯が抜けてから約1.6〜2.1秒保持し、さらに約0.95〜1.55秒かけて通常色へ戻る。暗い面では元の明るい文字色へ戻る。

会社情報、問い合わせ導線の説明文、メニューの日本語と番号、フォームラベル、フッターまで適用。ネイティブselectの選択肢や入力値、アイコン、読み上げ専用の文字は対象外。全ページの可視テキストノードを走査し、これらの明示した例外以外の適用漏れがないことを確認した。

スクロール再入場で再生するという参考サイトの観察はOwnerから訂正されたため、入口演出は引き続き初回だけ。メニューを開き直す演出と画像への再ホバーは維持する。本文・会社情報・公開状態・問い合わせ接続先は変更していない。

## 検証結果

| 項目 | 結果 |
| --- | --- |
| ESLint / 型 / production build | PASS |
| 公開条件・会社情報 unit | 4 / 4 PASS |
| Chromium PC | 19 / 19 PASS |
| Chromium SP | 19 / 19 PASS |
| WebKit SP | 19 / 19 PASS |
| 最終E2E合計 | 57 / 57、skip 0、retry 0、flaky 0 |
| axe WCAG 2.2 AAタグ | 主要ページとメニューの自動検出違反0 |

既存の回帰に、細かな文字の適用漏れ、背景が終了した後の色保持と緩やかな退色、メニュー項目の独立した時間、異なる乱数入力での配色選択とhydration、画像8系統の検証を加えた。フォーカス循環、Escape、戻る、短い画面、横幅、途中停止、JS無効、描画APIの部分失敗、404、問い合わせ503も通過している。

最初の全体実行は56 / 57。WebKitでメニューを閉じた後の位置が650pxから586pxへずれるケースを確認した。単独3回の確認では再現しなかったが、native dialogのフォーカス復元時に固定されたbodyの位置を参照させないよう、bodyの復元をclose()より前へ移した。次の全体実行でこの操作は通過した。

その実行では、別のカットイン確認が開始待ち中のtransform:noneを再生終了と誤認し、56 / 57になった。新しい開始待ちに合わせ、実際の入口演出が終了したことを待ってから逆方向スクロールを検査する前提に修正した。スクロール位置の許容差・通常色への収束・動き停止などの検査は緩めていない。最終全体実行は57 / 57で通過した。

再現コマンド: `npm run lint`、`npm run typecheck`、`npm test`、`npm run build`、`npm run test:e2e`。[最終E2E結果](evidence/motion-v3/e2e-summary.json)に各ケースと所要時間を記録する。

## 確認用の画面・動画

- [PC動画 43.40秒](evidence/motion-v3/desktop-motion.webm) / [SP動画 33.48秒](evidence/motion-v3/mobile-motion.webm)
- [PCメニューの余韻](evidence/motion-v3/desktop-menu-afterglow.png) / [SPメニューの余韻](evidence/motion-v3/mobile-menu-afterglow.png)
- [文字の余韻](evidence/motion-v3/desktop-text-afterglow.png) / [通常色に戻った状態](evidence/motion-v3/desktop-text-settled.png)
- [小さな説明文と問い合わせ導線](evidence/motion-v3/mobile-small-copy-afterglow.png)
- 同じ見出しの実際の更新: [1回目](evidence/motion-v3/reload-1.png) / [2回目](evidence/motion-v3/reload-2.png) / [3回目](evidence/motion-v3/reload-3.png)
- 画像の追加色: [Lagoon](evidence/motion-v3/image-lagoon.png) / [Rose](evidence/motion-v3/image-rose.png) / [Honey](evidence/motion-v3/image-honey.png) / [Twilight](evidence/motion-v3/image-twilight.png)

動画と途中画面は実時間で採取し、演出の巻き戻し・停止・乱数の固定はしていない。見出し2行の更新結果はHoney/Twilight → Honey/Iris → Apricot/Irisで、同じ系統が再び選ばれる場合も観測できた。動画は25fps。各途中画面は正確な時刻のフレームを保証する名前ではない。撮影情報は[採取記録](evidence/motion-v3/lab-measurements.json)と[動画メタデータ](evidence/motion-v3/video-metadata.json)を参照。

## 可読性・性能・限界

文字24色、背景39色の端点・補間を計算し、小さな文字は最小4.527:1、大きな文字3.464:1、通常の黒文字9.435:1、補助文字4.605:1を確認した。追加色のうち2色はこの確認後に少し濃く調整した。[計算結果](evidence/motion-v3/contrast.json)。写真、アンチエイリアス、色の帯による短い遮蔽は計算対象外。PC/SPの途中・終了画面でレイアウトと可読性も確認した。

最終採取のローカルLCPはPC 228ms / SP 192ms、CLSは両方0。PCのlong taskは0件、SPは104msを1件。記録された操作時間の最大はPC 48ms / SP 24ms。これらはLOCALの実験値で、Hosted計測やfield INP/CWV達成を示さない。実機iPhone/Android、OSのバックグラウンド復帰、支援技術での手動確認は未実施。

## 履歴と公開境界

開始HEADに存在したdocs配下の63ファイルはバイト単位で保持した。[ソースと履歴の確認](evidence/motion-v3/source-manifest.json)、[今回の証跡51ファイルのハッシュ](evidence/motion-v3/manifest.json)。

Vercelはread-only確認のみ。対象チームにはoripajp用プロジェクトだけが見つかり、corporate用Previewは未接続。Hosted mutation、DB/Auth/Vault、環境変数、ドメイン/DNS、手動deployは実施していない。検索除外と問い合わせ受付準備中を維持する。

到達点はデザイン確認用の実装・証跡・既存Draft PRの更新。Ready / merge / 本番公開は行わない。正式原稿・法人情報・Privacy・問い合わせ基盤・ドメイン・実機確認は従来どおり次の判断事項として残る。
