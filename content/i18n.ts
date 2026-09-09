export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const pagePaths = {
  home: "/",
  about: "/about",
  business: "/business",
  company: "/company",
  news: "/news",
  contact: "/contact",
  privacy: "/privacy",
} as const;
export type PageKey = keyof typeof pagePaths;
export function localizedPath(path: string, locale: Locale) {
  const clean =
    path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
  return locale === "ja" ? clean : clean === "/" ? "/en" : `/en${clean}`;
}
export type TranslationAvailability = Record<string, Locale[]>;
export function languageDestination(
  path: string,
  locale: Locale,
  available: TranslationAvailability = {},
) {
  const clean = localizedPath(path, "ja");
  const match = /^\/news\/([^/]+)\/?$/.exec(clean);
  if (match && !available[match[1]]?.includes(locale)) {
    return { href: localizedPath("/news", locale), available: false };
  }
  return { href: localizedPath(clean, locale), available: true };
}
