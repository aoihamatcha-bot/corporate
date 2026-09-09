# 日英コンテンツ実装の検証記録

## 対象

- 日付: 2026-09-08
- Starting HEAD / 開始時およびpush前のorigin/main: `e3bab814c9db4ec5fde12ad8f2ed932deca5f99e`
- 検証対象コード: `40ab8d96ef24029bc28b3df3e53ca9f615f8de43`
- Branch: `feat/corporate-content-ja-en-v1`
- 環境: Windows、Node 22.14.0、Next 16.3.4、React 19.2.8。ローカルproduction buildを127.0.0.1:3017で実行。
- この記録とJSONの追加は上記コードの後続コミット。アプリ・スタイル・辞書・テスト本体は検証対象から変更していない。
- 独立セキュリティ監査ではなく、実装担当による機能・表示・回帰検証。

## 実行結果

| チェック | 結果 |
| --- | --- |
| `npm run build` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | 11 / 11 PASS |
| `npm run test:e2e` | 78 / 78 PASS、skip 0、unexpected 0、flaky 0、retry 0 |
| `git diff --check` | PASS |
| agent-browser: 日本語・英語トップ | 表示・操作要素・console errorsを確認、エラーなし |
| 画面採取時のpageerror | 0件 |

E2E最終実行: 2026-09-08T08:52:54.460Z開始、約140秒。Chromium desktop / Chromium mobile / WebKit mobileで各26件。サマリーは [e2e-summary.json](evidence/content-review/e2e-summary.json)。

## 確認範囲

- JA7ページ・EN7ページの表示、メタデータ、noindex、HTML lang、言語別UI。記事/不明URLの404。
- ヘッダーと全画面メニューからの言語変更。同一ページを維持し、4つの事業アンカーも日英往復で維持。
- メニューの開閉、Tab / Shift+Tab、Escape、連続開閉、短い画面高、戻る操作、閉じた後のフォーカスとスクロール復帰。
- 未翻訳記事の英語フォールバック禁止、言語ごとの公開境界・未来日時・草稿・空本文・不正slug。実際の公開記事は0件のため、記事公開境界の内容検証にはテスト内の明示的な合成データを使用。
- 会社の未確認値が出ないこと、確認済みの数値・日付・識別子の日英一致、未確認の英文名や住所を補完しないこと。
- フォームの無効状態と503、英語の未送信メッセージ、入力破棄前の案内。外部送信は未実施。
- 320px / 390px / PCの表示、720px・768px・360pxの既存回帰。両言語のメニューと主要ページでaxe WCAG 2.2 AA違反0件。
- 画像を失敗させても本文・4領域・概念図を読めること。JavaScript無効、動き停止、OS reduced motion、Animation API失敗時の可読性。
- 文字・サムネイル・メニューのグラデーション、独立した時間差、8系統の配色、余韻400–600ms、背景終了後の黒への滑らかな復帰。単発カットインが上下スクロールで追従・再実行されないこと。
- `styles/tokens.css`、`styles/motion.css`、`reveal-text.tsx`、`text-rhythm.ts`、`scene.tsx`、`entrance.ts`、`menu-ink.tsx` は基準mainとの差分なし。

## 初回の失敗と対応

初回は71 PASS / 7 FAIL。3環境に共通する2件と、WebKitのスクロール復帰1件でした。

1. 既存の画面外テキスト検証が旧「About」ブロックの長さを前提としていた。新配置では段落が初期位置から見えたため、テストの開始スクロール位置を「シーンだけ見え、対象本文は画面外」に調整。画面外の未再生・表示後の再生・最終黒色・再スクロール後の非再実行という検証内容と閾値は保持。
2. 新規英語テストが会社表の見出しを `Brand name` と仮定したが、辞書は `Brand`。辞書の実際のラベルとの厳密一致へ修正。会社名や値の検証は保持。
3. WebKitで保存位置650pxに対し閉じた後596pxを観測。単独での再確認では再現しないケースもあった。ロック解除→dialog close→preventScrollフォーカスの順序を保持し、次フレームでトリガーにフォーカスが残っている場合だけ保存位置を一度復元する処理を追加。新しいフォーカス対象、再オープン、別ページ遷移には適用しない。最終の全78件は修正後のコードで実行してPASS。

assertion削除、skip、xfail、閾値緩和、リトライでの成功扱いは行っていません。

## 画面と素材の境界

[画面一覧](evidence/content-review/screens/)には日英のPCトップ、390pxトップ、320pxメニュー・会社概要、事業カード、中央コピーを保存。画面はローカルで撮影し、静止状態の確認用にreduced motionを使用。通常モーションは別途E2Eで実時間確認しています。

実際の開発画面、会社写真、動画は未提供です。枠・HTML概念図と既存の抽象画像だけを使用。画面素材の掲載許可や事業実績の証明を、このUI検証で代替していません。

## GitHub / Vercel の確認範囲

開始時のGitHub mainは資料の基準コミットと一致し、対象リポジトリのopen PRは0件。元の `corporate` チェックアウトは変更せず、専用worktreeで実装しました。

既存Vercelプロジェクト `corporate`（`prj_gvvHjgASUpQX7YzqhsjduAY9bcRU`）のproduction deployment `dpl_6u8FRzP4pdncf3A5mkGBpw57sXWx` は、読み取り時のメタデータでREADY、GitHub SHA `e3bab814...` と一致。既存URLの取得はVercel SSOへ302となり、この環境ではその本番ページの描画を閲覧していません。サイト障害と判断した記録ではありません。

提出先はDraft PR。PreviewのURLと最新の自動ビルド状態はPRに記録します。この記録のテスト結果はすべてLOCALで、Hosted画面の合格を意味しません。Vercelの手動デプロイ、環境変数・保護・共有・ドメイン設定の変更、Production昇格は行っていません。

Ready化・merge・正式公開はこの実装依頼の完了条件に含めていません。法人・事業状況・窓口・実素材の確定と原稿レビューが次の判断事項です。[未確定情報一覧](content-review-ja-en-v1.md#未確定情報)を参照してください。
