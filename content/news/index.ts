import { locales, type Locale, type TranslationAvailability } from "../i18n";
export type NewsTranslation = {
  title: string;
  summary: string;
  body: string[];
  status: "draft" | "published";
  publishedAt: string | null;
};
export type NewsArticle = {
  slug: string;
  translations: Partial<Record<Locale, NewsTranslation>>;
};
export type PublishedArticle = NewsTranslation & {
  slug: string;
  locale: Locale;
  publishedAt: string;
};
// Only real, approved articles belong here. Tests use separate synthetic fixtures.
export const news: readonly NewsArticle[] = [];
export function publishedNews(
  locale: Locale = "ja",
  articles: readonly NewsArticle[] = news,
  now = new Date(),
): PublishedArticle[] {
  return articles
    .flatMap((article) => {
      const copy = article.translations[locale];
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) ||
        !copy ||
        copy.status !== "published" ||
        !copy.title.trim() ||
        !copy.summary.trim() ||
        !copy.body.length ||
        !copy.body.every((paragraph) => paragraph.trim()) ||
        !copy.publishedAt ||
        !Number.isFinite(Date.parse(copy.publishedAt)) ||
        Date.parse(copy.publishedAt) > now.getTime()
      )
        return [];
      return [
        { ...copy, publishedAt: copy.publishedAt, slug: article.slug, locale },
      ];
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
export function publishedArticle(
  slug: string,
  locale: Locale = "ja",
  articles: readonly NewsArticle[] = news,
  now = new Date(),
) {
  return publishedNews(locale, articles, now).find(
    (article) => article.slug === slug,
  );
}
export function articleLanguageAvailability(
  articles: readonly NewsArticle[] = news,
  now = new Date(),
): TranslationAvailability {
  const result: TranslationAvailability = {};
  for (const locale of locales)
    for (const article of publishedNews(locale, articles, now)) {
      (result[article.slug] ??= []).push(locale);
    }
  return result;
}
