import { pagePaths, localizedPath, type Locale, type PageKey } from "./i18n";
import { getDictionary } from "./dictionaries";
const keys: PageKey[] = [
  "home",
  "about",
  "business",
  "news",
  "company",
  "contact",
];
export type NavigationItem = { href: string; label: string; english: string };
export function navigationFor(locale: Locale): NavigationItem[] {
  const copy = getDictionary(locale),
    english = getDictionary("en");
  return keys.map((key) => ({
    href: localizedPath(pagePaths[key], locale),
    label: copy.pages[key].menu,
    english: english.pages[key].short,
  }));
}
