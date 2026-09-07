import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedArticle } from "@/content/news";
import { TextLink } from "@/components/editorial";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = publishedArticle((await params).slug);
  if (!article) return { title: "ページが見つかりません" };
  return { title: article.title, description: article.summary };
}
export default async function Article({ params }: Props) {
  const article = publishedArticle((await params).slug);
  if (!article) notFound();
  return (
    <article className="container news-article page-section">
      <time dateTime={article.publishedAt!}>
        {article.publishedAt!.slice(0, 10).replaceAll("-", ".")}
      </time>
      <h1 tabIndex={-1}>{article.title}</h1>
      <div className="prose">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <TextLink href="/news">お知らせ一覧へ</TextLink>
    </article>
  );
}
