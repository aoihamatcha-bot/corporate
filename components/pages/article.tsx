import { notFound } from "next/navigation";
import { RevealText } from "@/components/motion/reveal-text";
import { TextLink } from "@/components/editorial";
import { publishedArticle } from "@/content/news";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
import { CorporateImage } from "@/components/corporate-image";
export function ArticlePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const article = publishedArticle(slug, locale);
  if (!article) notFound();
  return (
    <article className="container news-article page-section">
      <time dateTime={article.publishedAt}>
        <RevealText kind="label">
          {new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }).format(new Date(article.publishedAt))}
        </RevealText>
      </time>
      <h1 tabIndex={-1}>
        <RevealText>{article.title}</RevealText>
      </h1>
      <CorporateImage id="A09" locale={locale} className="news-cover" />
      <div className="prose">
        {article.body.map((p, i) => (
          <p key={i}>
            <RevealText kind="body">{p}</RevealText>
          </p>
        ))}
      </div>
      <TextLink href={localizedPath("/news", locale)}>
        {getDictionary(locale).news.back}
      </TextLink>
    </article>
  );
}
