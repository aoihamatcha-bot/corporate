import type { Locale } from "../i18n";
import { ja } from "./ja";
import { en } from "./en";
export type { Dictionary } from "./ja";
export function getDictionary(locale: Locale) {
  return locale === "en" ? en : ja;
}
