# 実装・検証結果

2026-09-08 JST。これはLOCALの実装担当による検証記録であり、独立監査、Hosted検証、法務承認、正式公開承認ではない。

## 判定

| 領域 | 状態 |
| --- | --- |
| 本格実装 | 完了。7固定ページ＋実記事のみの詳細ルート、404、共通レイアウト |
| ローカル画面・操作検証 | PASS。下記環境・範囲に限定 |
| デザイン確認 | Owner確認待ち |
| 正式情報・原稿 | 差し替え待ち |
| 問い合わせ | UI・状態・接続境界を用意。実送信は未接続 |
| Vercel専用Preview | 専用プロジェクト未接続。ローカルURLと手順を用意 |
| 本番公開準備 | 未完了。原稿、Privacy、窓口、実機確認、Hosted確認、ドメイン等が残る |

## 開始点と再現

開始時のリポジトリは公開・空、HEADなし。最小README初期化後の基準は `32e51beba8c757af5abd02a1f206edb6d03265e6`。実装ブランチは `feat/corporate-afterglow-v1`。mainは初期化後に変更していない。

最終HEADはDraft PRとGitコミットで確認する。検証に用いたソース・証跡ファイルのSHA256は [evidence/manifest.json](evidence/manifest.json) に記録する。検証終了後の変更は文書・証跡・採取スクリプトの整理のみ。

Node.js 22.14.0 / npm 10.9.2 / Next.js 16.3.4 / React 19.2.8 / TypeScript 6.0.3 / Playwright 1.63.0 / axe-core Playwright 4.13.0。依存関係はexact versionとlockfileで固定。導入時npm auditは0 vulnerabilities。

```sh
npm ci
npm run lint
npm run typecheck
npm test
npx playwright install chromium webkit
npm run build
npm run test:e2e
```

確認用URL: http://127.0.0.1:3017 。停止後は `npm run start` で再開（ビルド未作成時は先に `npm run build`）。

## 検証結果

| 検証 | 結果 |
| --- | --- |
| ESLint | PASS |
| next typegen + tsc --noEmit | PASS |
| unit: 公開状態・日時境界・会社情報 | 4/4 PASS |
| Next.js production build | PASS |
| Playwright Chromium PC / Chromium SP / WebKit SP | 33/33 PASS、skip 0、retry 0、flaky 0 |
| axe WCAG 2.2 AA（自動検出範囲） | Top・Contact・Company・Privacy・全画面メニューで違反0、3環境 |
| JS無効・Animation API失敗 | 本文の可視性とナビゲーション代替導線を確認 |
| 未公開・不存在記事、404 | HTTP404と専用表示を確認 |
| 問い合わせ | フィールドと送信ボタンdisabled、直接POSTも503、成功の偽装なし |
| SEO確認 | 全ページnoindex、HTTP header、robots.txt。架空canonicalなし |
| ZIP整合性 | manifestの12ファイルすべて一致 |

最終E2E実行: 2026-09-07 19:47:42 UTC開始、約63秒。生の実行結果と失敗traceは `test-results/` / `.local/` に保存し、公開リポジトリには環境固有の生ログを含めない。

### 操作の確認範囲

- 1440×900、390×844、360px、768px、720px。短い高さ360×420でもメニュー下部へ到達。
- Enterで開く、Tab / Shift+Tabの循環、Escapeで閉じる、トリガーへのフォーカスと元スクロール位置の復元。
- 開閉連打、閉じる途中のEscape、メニューからのページ遷移、開いたままの幅変更、ブラウザBack後のロック解除。
- 英字カットインは一度だけ出現し、終了後はtransform=none。上下スクロール後も定位置。
- 動き停止の保持、OS reduce優先、touchでポインター演出なし。
- サーバーHTMLに本文を保持し、JS無効時はフッターの通常リンクから各ページへ移動可能。

## 見つかった問題と対応

1. ネイティブdialogだけではブラウザのTab循環に差があったため、可視リンク・ボタンを使う明示的な循環を追加。WebKitのリンクを省略する順序にも対応した。
2. ページ表示直後にハンドラー未準備のMENUを操作できる問題を防ぐため、hydration前は無効化。操作準備後のキーボード経路を確認した。
3. WebKitで先読みの中断に起因するアクセス制御エラーを捕捉。小規模な記事サイトとしてリンクの投機的先読みを止め、通常の遷移は維持した。
4. カットインのテストはIntersectionObserver開始前のtransform=noneを完了と誤認していたため、実際の進入開始後に完了を確認するよう修正。スクロール復元もブラウザの完了を待って元の値と照合し、数値の許容範囲は緩めていない。
5. 動く文字の透明度を1に固定し、補助文字の色を濃くした。通常本文4.5:1、大文字3:1の基準を動きの途中でも損なわない設計とした。

最終版の自動テストに未解決の失敗はない。独立Security Reviewは実施していない。

## 画面・動画

- [PCホーム全体](evidence/desktop-home.png) / [SPホーム全体](evidence/mobile-home.png)
- [PCメニュー](evidence/desktop-menu.png) / [SPメニュー](evidence/mobile-menu.png)
- [PCカットイン](evidence/desktop-cut-in.png) / [SPカットイン](evidence/mobile-cut-in.png)
- [PC録画 13.44秒](evidence/desktop-motion.webm) / [SP録画 10.92秒](evidence/mobile-motion.webm)
- [About](evidence/about.png)、[Business](evidence/business.png)、[Company](evidence/company.png)、[News](evidence/news.png)、[Contact](evidence/contact.png)、[Privacy](evidence/privacy.png)
- [200%相当の有効幅でのメニュー](evidence/menu-effective-200-percent.png)

画像を目視確認し、録画の連続フレームと実ブラウザ操作で色と文字の進入・収束を確認した。静止画だけから滑らかさを認定していない。演出の強さ・好みの最終判断はOwnerの動画・画面確認に残す。

## 可読性とラボ測定

[lab-measurements.json](evidence/lab-measurements.json)。本文のInkと背景用パレットの最小コントラストは約7.94:1、補助文字は約4.74:1、大きなグラデーション文字は約3.81:1。トークン端点の組合せによる保守的な数値確認であり、画像背景のすべてのピクセルや支援技術全体の適合認定ではない。

| ローカル測定 | PC 1440px | SP 390px |
| --- | --- | --- |
| LCP | 216ms | 124ms |
| CLS | 0 | 0 |
| 記録されたEvent Timingの最大値 | 32ms | 24ms |
| 50ms超のLong Task | 1件 / 110ms | 0件 |

録画を伴う非スロットリングのループバック測定。PCのLong Taskは初期読込を含むため、スクロール中の詰まりと同一視しない。Event Timingの限られたサンプルはfield INPではない。[Core Web Vitals](https://web.dev/articles/vitals)の実利用p75や、Hosted・低速回線・低性能端末の達成を主張しない。

## 未確認の範囲

実機iPhone/Android、Safari製品版、Firefox、VoiceOver/TalkBack/NVDAの読み上げ、端末温度・省電力下の描画、Hostedネットワーク、実送信、正式なPrivacy内容。200%は1440px画面の有効幅に対応する720 CSS pxでのリフロー確認であり、製品ブラウザUIのズーム操作や実機画面拡大の全条件ではない。

継続的なWebGL/ambientループは採用していない。[motion-lifecycle.json](evidence/motion-lifecycle.json)では、ポインター停止後のrequestAnimationFrameが130回で収束し、追加500msでも増えずpending=0、離脱時data-pointer=falseを確認した。閉じる途中のリンク選択も、遷移先H1へのフォーカス・dialog解除・bodyロック解除を確認した。

画面外・非表示時の停止処理はコードで確認。headlessのタブ切替ではvisibilityがvisibleのままだったため、実際の非表示状態への遷移の検証として扱わない。モバイルOSのバックグラウンド停止・復帰も実機確認が残る。

STOP: Draft PRでのデザイン・原稿確認へ。詳細は [content-checklist.md](content-checklist.md) と [operations.md](operations.md)。
