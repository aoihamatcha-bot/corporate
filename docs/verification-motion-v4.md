# Motion v4 検証記録

2026-09-08 JST。LOCALのproduction buildを対象とする。今回の変更は配色と余韻の微調整。[文字全体への適用方針と前回の検証](verification-motion-v3.md)は履歴として保持する。

- Starting HEAD: `379d46c9b12a4b2ca46210778fbd91b92a8349a1`
- 検証対象のアプリケーションHEAD: `f4ce8c8fb8a8c507c062e0c2eef6fd22b9617117`
- branch: `feat/corporate-afterglow-v1`
- [Draft PR #1](https://github.com/aoihamatcha-bot/corporate/pull/1)
- 後続コミットはREADME・本記録・証跡のみ。

## 色と時間

8系統の配色を保ち、背景・メニュー背景のHSL彩度を1.08倍、明度を0.8ポイント上げた。帯・画像用の色は彩度1.075倍、明度0.6ポイント、文字用は彩度1.06倍、明度0.3ポイント。彩度は100%を上限とし、結果を通常の16進カラーとして保存する。文字の下地となる通常色は変更していない。

文字の帯・画像のワイプ・メニュー項目の帯に、最大不透明度14%の白い光を薄く重ねた。文字色そのものには白を重ねず、読みやすさを維持する。

帯が抜けてから色を保つ時間を約0.8〜1.6秒に短縮した。要素ごとの差は既存のリズムに従う。

| 文字の役割 | 帯の終了後の保持時間 |
| --- | --- |
| 見出し | 1.380〜1.597秒 |
| サブタイトル | 1.230〜1.447秒 |
| 本文 | 1.050〜1.267秒 |
| ラベル | 0.800〜1.017秒 |

帯を伴わない操作名は0.900〜1.117秒の保持設定。保持後に通常色へ戻るフェードは従来の約0.95〜1.55秒を保つ。開始待ち、帯の速度、画像の時間、8系統からの配色選択、入口演出の初回だけの再生、メニューの開閉動作は変更していない。

## 検証結果

| 項目 | 結果 |
| --- | --- |
| ESLint / 型 / production build | PASS |
| 公開条件・会社情報 unit | 4 / 4 PASS |
| Chromium PC / Chromium SP / WebKit SP | 各19 / 19 PASS |
| 最終E2E合計 | 57 / 57、skip 0、retry 0、flaky 0 |
| 主要ページ・メニューのaxe自動検出 | 違反0 |
| 今回のPC・SP採取中のpageerror | 0 |

最初の全体実行は55 / 57。短くなった保持時間に対し、旧テストの「背景終了をポーリングした後、さらに600ms待つ」方法ではフェード開始後を測る場合があり、Chromiumの2ケースで色の不透明度が約0.949となった。実際の最後の帯の終了を待ち、その800ms後を測る方法へ修正した。色の不透明度が0.95を超える条件、背景終了、最終的な通常色への収束は維持し、巻き戻し・停止・閾値の緩和はしていない。保持時間の契約は今回の要望に合わせ800〜1600msへ更新した。最終全体実行は57 / 57で通過した。

再現コマンド: `npm run lint`、`npm run typecheck`、`npm test`、`npm run build`、`npm run test:e2e`。[最終E2E結果](evidence/motion-v4/e2e-summary.json)に全ケースを記録する。

## PC・SPの画面と動画

- [PC動画 18.56秒](evidence/motion-v4/desktop-motion.webm) / [SP動画 17.84秒](evidence/motion-v4/mobile-motion.webm)
- [帯が現れる状態](evidence/motion-v4/desktop-text-wipe.png) / [文字の色が残る状態](evidence/motion-v4/desktop-text-color.png) / [通常色へ戻った状態](evidence/motion-v4/desktop-text-settled.png)
- [SPメニューの色](evidence/motion-v4/mobile-menu-color.png) / [問い合わせ導線の小さな文字](evidence/motion-v4/mobile-small-copy-color.png) / [通常色へ戻った状態](evidence/motion-v4/mobile-small-copy-settled.png)
- [画像のグラデーション](evidence/motion-v4/desktop-image-color.png)

production serverを起動し、`node scripts/capture-motion-v4.mjs` で新しい日時付きディレクトリへ再採取できる。PCは1440×900、SPは390×844、動画は25fps。実時間で採取し、乱数固定・演出の停止・巻き戻しはしていない。途中画面の名前は厳密な時刻や全要素の同一状態を保証しない。[採取情報](evidence/motion-v4/capture.json)、[動画メタデータ](evidence/motion-v4/video-metadata.json)。

## 可読性・証跡・残作業

文字24色と背景39色の端点・補間の計算で、本文は最小4.538:1、大きな文字3.464:1、通常の黒文字9.581:1、補助文字4.676:1。[計算結果](evidence/motion-v4/contrast.json)。写真、アンチエイリアス、短い帯の遮蔽、未計測の表示環境は対象外。PC・SPの途中と終了の画像も目視確認した。

今回はLCP・CLS・INP等を再計測していない。実機iPhone/Android、支援技術での手動確認、Hosted性能評価は未実施。

開始HEADのdocs配下117ファイルはバイト単位で保持した。[ソースと履歴の確認](evidence/motion-v4/source-manifest.json)、[今回の証跡25ファイルのハッシュ](evidence/motion-v4/manifest.json)。

今回のHosted操作・deploy・Ready・mergeは未実施。会社情報、原稿、問い合わせ受付、公開状態は変更していない。到達点はローカルのデザイン確認用実装・検証記録・既存Draft PRの更新。正式原稿・法人情報・Privacy・問い合わせ基盤・ドメイン・実機確認は従来どおり残る。
