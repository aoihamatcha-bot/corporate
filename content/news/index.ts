export type NewsArticle = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  status: "draft" | "published";
  publishedAt: string | null;
};
// Add real, approved articles here. Keep draft and scheduled articles unpublished.
export const news: readonly NewsArticle[] = [];
export function publishedNews(
  articles: readonly NewsArticle[] = news,
  now = new Date(),
): NewsArticle[] {
  return articles
    .filter(
      (article) =>
        article.status === "published" &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) &&
        article.publishedAt !== null &&
        Number.isFinite(Date.parse(article.publishedAt)) &&
        Date.parse(article.publishedAt) <= now.getTime(),
    )
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!));
}
export function publishedArticle(
  slug: string,
  articles: readonly NewsArticle[] = news,
  now = new Date(),
) {
  return publishedNews(articles, now).find((article) => article.slug === slug);
}
