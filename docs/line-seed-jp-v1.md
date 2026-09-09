# LINE Seed JP 採用・検証記録

2026-09-09。ユーザーが書体比較のA案「LINE Seed JP」を採用したため、日本語・英語のサイト本文、見出し、メニュー、補助ラベル、フォームへ反映しました。ローカル実装の記録です。

## 変更内容

- 共通の `SiteRoot` から `next/font/google` の `LINE_Seed_JP` を一度定義し、両言語で利用。
- Regular（400）とBold（700）の2ウェイトを配信。旧500／600の指定は、見出し・強調として700へ整理。
- フォントはビルド時に取得し、`/_next/static/media/` から同一オリジンで配信。Google Fontsへのブラウザからの直接通信は不要。
- `preload: false` とし、日本語の分割ファイルを大量に先読みせず、表示される文字に応じて読み込む。比較見本で使った固定文章だけのフォントではなく、元の文字範囲を保つGoogle Fontsの分割配信を使用。
- 読み込み中は代替書体で本文を表示。文字グラデーションの帯は `document.fonts.ready` 後に行位置を計測し、書体切り替えによる位置ずれを防ぐ。待機中にコンポーネントが破棄された場合は再生しない。
- ヘッダー・フッターのロゴにはArial系を明示し、既存の字形と太さを維持。
- LINE Seed JPのOFL 1.1ライセンスと著作権表記を追加。

本文・見出しのサイズ、字間、行間、原稿、画像の選択・比率は今回変更していません。文字の余韻0.4〜0.6秒とフェード速度、サムネイルのホバー時のみのグラデーションも維持しています。

## 検証

| 確認 | 結果 |
| --- | --- |
| `npm run build` | PASS。下記のフォント補正値に関する警告1件あり |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | 11/11 PASS |
| `npm run test:e2e` | 最終84/84 PASS（Chromium desktop/mobile、WebKit mobile）。skip・retryなし |
| 追加の書体・表示確認 | 15画面条件、横はみ出し0、ページ例外0 |
| 実際の描画書体 | Chromiumの12箇所で確認。本文・見出し・メニュー等は配信されたLINE Seed JP、ロゴは既存Arial系 |
| スマートフォン相当 | 390px・320pxで日英表示。WebKit 390pxでもRegular／Boldの読み込みと横はみ出しなしを確認 |
| 読み込みを遅らせた場合 | 実フォントのリクエストを保留し、本文が読める状態で帯が待機することを確認。通信再開後に再生・完了 |
| フォント取得失敗 | フォントを全件遮断したローカル試験でも本文・メニューが使え、帯が残らないことを確認 |

フォント追加に関係する画面確認は、[書体の検証データ](evidence/line-seed-jp-v1/font-verification.json) に保存しています。遅延・失敗の確認はローカルブラウザで通信を制御した試験であり、Hostedの障害試験ではありません。

[最終E2E結果](evidence/line-seed-jp-v1/e2e-final-summary.json)：2026-09-09T11:42:31.412Z開始、約154秒。既存84件の全体を再実行し、文字の余韻・ホバー動作・日英遷移・メニュー・アクセシビリティ・JS無効時の表示を確認しました。

### スクロール位置テストの計測タイミング

初回の全体E2Eは83/84でした。WebKit mobileのメニュー復帰テストで、期待650pxに対して649pxを観測しました。変更なしの単独3回再実行は2/3で、1回は631pxとなりました。

失敗した両方のtraceを調べると、メニューを開いた時点の保存位置がそれぞれ649px・631pxで、閉じた後はその保存位置に戻っていました。テストがフォントの読み込み完了前に650pxを測定し、開くまでの表示変化をメニュー閉鎖の問題として判定できてしまう手順でした。

`tests/e2e/site.spec.ts` の該当テストだけに `document.fonts.ready` の待機を加え、フォント確定後に650pxへスクロールして計測するようにしました。650pxの設定、Tab／Shift+Tab、Escape、フォーカス、復帰位置の差0.5px未満という判定は変更していません。メニューの復帰処理にも変更はありません。修正後の同テストは3回連続PASSです。

[初回全体結果](evidence/line-seed-jp-v1/e2e-first-run-summary.json) と [再確認の記録](evidence/line-seed-jp-v1/menu-timing-verification.json) を保存。失敗時の動画・traceは `.local/line-seed-jp-v1/e2e-first-run/` と `menu-rerun/` に保持しています。

### 読み込み量

同じローカルホームページを新しいChromiumコンテキストで読み込んだとき、初期導入設定では122件のfont preloadにより146ファイル・2,592,468 bytesのフォント転送が発生しました。先読みを無効にした最終設定は **42ファイル・712,668 bytes、font preload 0件**でした。比較相手は導入中の初期設定であり、フォント配信のなかった変更前サイトとの比較ではありません。表示文字・キャッシュ・ページによって転送量は変わります。

### ビルド警告の扱い

Next.js 16.3.4 / Turbopackは `LINE Seed JP` 用の自動フォールバック補正値を持っておらず、`Failed to find font override values` を1件出力しました。フォント取得・ビルドは成功しています。`adjustFontFallback: false` とCSSの日本語代替書体を指定し、実フォントの描画と取得失敗時の可読性を別途確認しました。レイアウトシフトが完全にゼロという主張はしていません。

## 画面

- [日本語トップ・PC](evidence/line-seed-jp-v1/home-ja-1440.png)
- [事業カード・PC](evidence/line-seed-jp-v1/business-ja-1440.png)
- [英語トップ・PC](evidence/line-seed-jp-v1/home-en-1440.png)
- [日本語トップ・390px](evidence/line-seed-jp-v1/home-ja-390.png)
- [メニュー・390px](evidence/line-seed-jp-v1/menu-ja-390.png)
- [英語の事業説明・390px](evidence/line-seed-jp-v1/business-en-390.png)
- [日本語トップ・WebKit 390px](evidence/line-seed-jp-v1/home-ja-webkit-390.png)

静止画はモーションを抑制したローカル表示から取得しました。モーション自体は別途、通信遅延の試験と既存E2Eで確認しました。

## 作業範囲・Git

- Starting HEAD / Final HEAD：`092c3d99172acc903fb8e3a22766c3d53959c1d7`。
- branch：`feat/corporate-content-ja-en-v1`。
- 開始時のorigin feature HEAD：同上。origin main：`e3bab814c9db4ec5fde12ad8f2ed932deca5f99e`。
- [PR #2](https://github.com/aoihamatcha-bot/corporate/pull/2) は開始時にOpen / Draftを確認。PR状態変更なし。
- アプリ変更：`components/layout/site-root.tsx`、`app/globals.css`、`components/motion/entrance.ts`。
- テスト変更：`tests/e2e/site.spec.ts` のスクロール位置計測前にフォント読み込み完了を待機。assertion・閾値・対象ブラウザは維持。
- 文書・素材：README、本記録、検証ファイル、`public/fonts/line-seed-jp/OFL.txt`。
- 前回の事業画像置換・原稿・素材台帳・サムネイルテストの未commit変更を維持。モーションの色・速度定義も開始時のハッシュと一致。[範囲確認](evidence/line-seed-jp-v1/scope-verification.json)
- commit / push / Ready / merge / Hosted mutation / deploy：なし。ローカルサーバーのみ最新ビルドで再起動。
- 停止点：書体変更の実装・ローカル検証・表示確認。公開やマージの工程は今回実行しない。

## 出典・ライセンス

- [LINE Seed公式](https://seed.line.me/index_jp.html)
- [Google FontsのLINE Seed JP配信情報](https://github.com/google/fonts/blob/main/ofl/lineseedjp/METADATA.pb)
- [同梱したOFL 1.1](../public/fonts/line-seed-jp/OFL.txt) — © LY Corporation
- Next.jsの実装時はインストール済み16.3.4の `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` とFont APIリファレンスを確認。

前回の比較・調査書は調査時点の記録として保持しています。現在の採用書体については本記録とREADMEを参照してください。
