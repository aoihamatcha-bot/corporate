import { RevealText } from "@/components/motion/reveal-text";
import { TextLink } from "@/components/editorial";
export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="page-en">
        <RevealText kind="heading">404.</RevealText>
      </p>
      <h1 tabIndex={-1}>
        <RevealText kind="subtitle">ページが見つかりません。</RevealText>
      </h1>
      <p>
        <RevealText kind="body">
          {
            "URLが変更されたか、まだ公開されていない可能性があります。\nトップページから、もう一度お探しください。"
          }
        </RevealText>
      </p>
      <TextLink href="/">トップへ戻る</TextLink>
    </section>
  );
}
