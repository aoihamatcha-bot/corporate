import { RevealText } from "@/components/motion/reveal-text";
import type { Metadata } from "next";
import Link from "@/components/site-link";
import { PageIntro, TextLink } from "@/components/editorial";
import { Spark, Arrow } from "@/components/icons";
import { pages } from "@/content/pages";
import { publishedNews } from "@/content/news";
export const metadata: Metadata = {
  title: pages.news.ja,
  description: pages.news.description,
};
// Publication checks run on each request so future-dated entries cannot leak via static output.
export const dynamic = "force-dynamic";
export default function News() {
  const articles = publishedNews();
  return (
    <>
      <PageIntro {...pages.news} />
      <section className="page-section">
        <div className="container">
          {articles.length ? (
            <ul className="news-list">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/news/${a.slug}`}>
                    <time dateTime={a.publishedAt!}>
                      <RevealText kind="label">
                        {a.publishedAt!.slice(0, 10).replaceAll("-", ".")}
                      </RevealText>
                    </time>
                    <h2>
                      <RevealText kind="subtitle">{a.title}</RevealText>
                    </h2>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-news">
              <Spark />
              <h2>
                <RevealText kind="subtitle">{pages.news.emptyTitle}</RevealText>
              </h2>
              <p style={{ whiteSpace: "pre-line" }}>
                <RevealText kind="body">
                  {pages.news.emptyDescription}
                </RevealText>
              </p>
              <TextLink href="/">トップへ戻る</TextLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
