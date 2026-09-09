import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { localizedPath, pagePaths, type Locale, type PageKey } from "./i18n";
import { site } from "./site";
import { editorialReview } from "./editorial-review";
import { articleLanguageAvailability, publishedArticle } from "./news";
import { corporateAsset } from "./corporate-assets";
export const reviewRobots = { index: false, follow: false, nocache: true };
export function socialImageOrigin(
  canonicalOrigin: string | null,
  environment: Record<string, string | undefined>,
) {
  // Unique deployment URLs can require SSO even when the production alias is public.
  const host =
    environment.VERCEL_ENV === "production"
      ? environment.VERCEL_PROJECT_PRODUCTION_URL || environment.VERCEL_URL
      : environment.VERCEL_URL;
  return new URL(
    canonicalOrigin || (host ? `https://${host}` : "http://127.0.0.1:3017"),
  );
}
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
    metadataBase: socialImageOrigin(site.canonicalOrigin, process.env),
    title: {
      default: `${site.brand} — ${c.pages.home.title}`,
      template: `%s | ${site.brand}`,
    },
    description: c.pages.home.description,
    robots: reviewRobots,
    icons: { icon: "/icon.svg" },
    ...socialMetadata(locale, c.pages.home.title, c.pages.home.description),
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
    ...socialMetadata(locale, page.title, page.description, key === "news"),
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
    ...socialMetadata(locale, article.title, article.summary, true),
  };
}

function socialMetadata(
  locale: Locale,
  title: string,
  description: string,
  news = false,
): Metadata {
  const asset = corporateAsset(news ? "A09" : "A05", locale);
  const images = [
    {
      url: asset.path,
      width: asset.width,
      height: asset.height,
      alt: asset.alt,
    },
  ];
  return {
    openGraph: {
      title,
      description,
      siteName: site.brand,
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
