import { TextLink } from "@/components/editorial";
export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="page-en">
        404<span>.</span>
      </p>
      <h1 tabIndex={-1}>ページが見つかりません。</h1>
      <p>
        URLが変更されたか、まだ公開されていない可能性があります。
        <br />
        トップページから、もう一度お探しください。
      </p>
      <TextLink href="/">トップへ戻る</TextLink>
    </section>
  );
}
