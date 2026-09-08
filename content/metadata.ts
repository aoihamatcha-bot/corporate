import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { localizedPath, pagePaths, type Locale, type PageKey } from "./i18n";
import { site } from "./site";
import { editorialReview } from "./editorial-review";
import { articleLanguageAvailability, publishedArticle } from "./news";
export const reviewRobots = { index: false, follow: false, nocache: true };
export function localizedAlternates(
  path: string,
  available: readonly Locale[],
  origin: string | null,
) {
  if (!origin) return undefined;
  try {
    const url = new URL(origin);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return undefined;
    return {
      canonical: new URL(path, url.origin).href,
      languages: Object.fromEntries(
        available.map((locale) => [
          locale,
          new URL(localizedPath(path, locale), url.origin).href,
        ]),
      ),
    };
  } catch {
    return undefined;
  }
}
function alternates(path: string, available: readonly Locale[]) {
  return site.contentStatus === "published" &&
    editorialReview.status === "approved"
    ? localizedAlternates(path, available, site.canonicalOrigin)
    : undefined;
}
export function rootMetadata(locale: Locale): Metadata {
  const c = getDictionary(locale);
  return {
    title: {
      default: `${site.brand} — ${c.pages.home.title}`,
      template: `%s | ${site.brand}`,
    },
    description: c.pages.home.description,
    robots: reviewRobots,
    icons: { icon: "/icon.svg" },
  };
}
export function pageMetadata(locale: Locale, key: PageKey): Metadata {
  const page = getDictionary(locale).pages[key];
  return {
    title:
      key === "home"
        ? { absolute: `${site.brand} — ${page.title}` }
        : page.title,
    description: page.description,
    alternates: alternates(localizedPath(pagePaths[key], locale), ["ja", "en"]),
  };
}
export function articleMetadata(locale: Locale, slug: string): Metadata {
  const article = publishedArticle(slug, locale);
  if (!article)
    return {
      title: getDictionary(locale).notFound.title,
      robots: reviewRobots,
    };
  return {
    title: article.title,
    description: article.summary,
    alternates: alternates(
      localizedPath(`/news/${slug}`, locale),
      articleLanguageAvailability()[slug],
    ),
  };
}
