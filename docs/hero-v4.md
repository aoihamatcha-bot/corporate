# MYSTENA HERO / scroll revision v4

2026-09-10。カーソル追従の廃止、HEROの静止化、01事業紹介のスクロール後表示に関する依頼のローカル実装。v1〜v3の文書・Evidenceは過去時点の記録として変更しない。

## 変更

- サイト共通の CursorTrail 呼び出し、コンポーネント、CSSを撤去。
- HEROだけを `data-motion-static` とし、本文・ラベル・ボタン・画像の登場時グラデーション／帯を停止。背景イラストの拡大移動と光の周回を撤去。通常の矢印ホバー操作は維持。
- 手書き53画とスマイルの完成後1000ms保持し、読み込み済みフォントの行に1200msで着地する既存処理を維持。通常文字は着地中にクロスフェードし、着地後はサイズ・位置・色が変化しない。着地後に始まる文字グラデーションを撤去。
- HERO下部のスクロール案内に短い手書き線を追加。着地と同時に700msで一度描き、着地完了までに静止する。追加の待ち時間、無限ループ、表示切替UIは設けない。
- HEROの高さ820px上限を撤去し、ヘッダー＋HEROが画面高さ以上になるように変更。自然なコンテンツ高さを確保し、小さい横長画面や長文でも切り取らない。
- HERO下部に静止した「企画 → 開発 → 表現 → 販売促進」の帯を追加。英語は Planning / Development / Creative / Promotion。幅480px以下は2列。
- TOPの01事業紹介にはオープニング完了とスクロール位置の条件を追加。最初の画面ではセクション・文字・サムネイルの登場演出を消費せず、スクロール後、それぞれの表示位置に応じて開始する。直接アンカー遷移・履歴位置復元も利用できる。
- HERO以外の配色、文字グラデーション、画像のホバー配色、サムネイルの移動を伴うフェード、会社概要の注記は維持。

## 原因の確認

変更前の1440×1200の実ブラウザーで、01事業紹介の上端が916pxにあり、初期画面内に入ることを確認。HERO着地後も背景の拡大移動、光の周回、文字色、画像色、本文の帯が動いていた。一方、今回の実測では見出しのフォントと高さは一定だったため、フォント切り替えを原因とは断定しない。生データは `evidence/hero-v4/before.json`。

## ファイル

- `components/pages/home.tsx` / `content/dictionaries/ja.ts` / `en.ts`：静止HERO、帯、日英ラベル。
- `components/motion/hero-headline.tsx`：通常文字へのクロスフェード。
- `components/motion/hero-art.tsx`：静止背景。
- `components/motion/hero-scroll-cue.tsx`：一度だけ描くスクロール線。
- `components/motion/entrance.ts` / `scene.tsx` / `home-story.tsx`：HEROの演出除外とスクロール条件。
- `components/layout/site-root.tsx`：カーソル追従の呼び出し撤去。
- `styles/storyboard.css`：HERO高、静止帯、スクロール線。手書きの字形とマスク設定は維持。
- `tests/e2e/hero-v4.spec.ts`：着地後の安定性、実フォント応答遅延、スクロール条件、各画面サイズの検証。
- `scripts/capture-hero-v4.mjs`：ローカルの動作動画・スクリーンショット取得。

`handwriting.ts` と `handwriting-ink.ts` は添付v3と引き続き同一SHA-256。`site-opening.tsx` の筆順、余韻、着地計測、リロード再生、操作時解除、破棄済み非同期処理のガードは変更していない。

## 状態・Evidence

- Starting / Final HEAD: `016105c648e7f20d10c674b3671d69d1a0ed486e`。
- Branch: `feat/corporate-motion-storyboard-v1`。開始前からの未コミット変更を維持した追加修正。
- origin/main は同一HEAD、対象feature branchはリモートに存在しない。GitHub CLIは未認証のためPR状態を取得できない。PRの作成・更新は行っていない。
- commit / push / Hosted mutation / deploy / Ready / merge：いずれも未実施。
- 動画素材は未完成。現在は静止画像を使用し、`content/hero-media.ts` は予約設定として保持。設定値だけで動画再生が有効になる構成ではない。
- ローカル production build、型確認、lint、コンテンツテスト12件がPASS。既存のLINE Seed JPのfallback metadata警告は継続。
- PC focused検証の初回は25件中24 PASS / 1 FAIL。「すべての文字にグラデーション層がある」という旧仕様のテストが、新しい静止帯・スクロールラベルを検出した。今回静止化したHEROの2要素を明示的に区別し、それ以外のテキスト層検証を維持。HERO全体が着地後に動かないことは別の実時間テストで検証。初回生レポートを `focused-results.json` に保持。
- 最終回帰は単一実行で159件すべてPASS（Chromium PC 53 / Chromium mobile 53 / WebKit mobile 53、skip・retryなし）。日英それぞれの着地後フレームでフォント・文字領域・色は一定、HEROの実行中アニメーションは0。生レポートと計測値を `evidence/hero-v4/verification.json` と `full-results.json` に記録。
- ブラウザーによる確認はLOCALのみ。PC / mobile、JA / EN の画面と動作動画、フレーム計測を `evidence/hero-v4/` に保存。実機スマホやHosted環境での確認を実施済みとは扱わない。

## 確認用

- ローカル: http://127.0.0.1:3017/
- 英語: http://127.0.0.1:3017/en
- PC動画: `evidence/hero-v4/desktop-ja-flow.webm`
- スマホ動画: `evidence/hero-v4/mobile-ja-flow.webm`

実装・ローカル検証後、見た目のレビュー待ちで停止する。
