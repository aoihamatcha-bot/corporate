"use client";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type MouseEvent } from "react";
import {
  languageDestination,
  locales,
  type Locale,
  type TranslationAvailability,
} from "@/content/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { RevealText } from "@/components/motion/reveal-text";
import { MenuInk } from "@/components/motion/menu-ink";

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}
const readHash = () => window.location.hash;
const serverHash = () => "";

function hasUnsavedInput() {
  return Array.from(
    document.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >("form input, form textarea, form select"),
  ).some((field) => {
    if (field.matches(":disabled")) return false;
    if (
      field instanceof HTMLInputElement &&
      ["checkbox", "radio"].includes(field.type)
    )
      return field.checked !== field.defaultChecked;
    if (field instanceof HTMLSelectElement) {
      const defaults = Array.from(field.options).filter(
        (option) => option.defaultSelected,
      );
      const initial = defaults[0]?.value ?? field.options[0]?.value ?? "";
      return field.value !== initial;
    }
    return (
      field.value !==
      (field as HTMLInputElement | HTMLTextAreaElement).defaultValue
    );
  });
}

export function LanguageSwitcher({
  locale,
  labels,
  available,
  menu = false,
  onNavigate,
}: {
  locale: Locale;
  labels: Dictionary["common"];
  available: TranslationAvailability;
  menu?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const Ink = menu ? MenuInk : RevealText;
  const targetLocale = locale === "ja" ? "en" : "ja";
  const destination = languageDestination(pathname, targetLocale, available);
  const unavailable =
    targetLocale === "en" ? labels.unavailable : labels.japaneseUnavailable;
  function switchLanguage(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (hasUnsavedInput() && !window.confirm(labels.unsavedPrompt)) {
      event.preventDefault();
      return;
    }
    onNavigate?.();
  }
  return (
    <nav className="language-switcher" aria-label={labels.language}>
      <div className="language-options">
        {locales.map((language) => {
          const label = language === "ja" ? labels.japanese : labels.english;
          return language === locale ? (
            <span key={language} lang={language} aria-current="true">
              <Ink kind="utility">{label}</Ink>
            </span>
          ) : destination.available ? (
            <a
              key={language}
              lang={language}
              hrefLang={language}
              href={destination.href + hash}
              onClick={switchLanguage}
            >
              <Ink kind="utility">{label}</Ink>
            </a>
          ) : (
            <span
              key={language}
              lang={language}
              className="language-unavailable"
            >
              <Ink kind="utility">{label}</Ink>
            </span>
          );
        })}
      </div>
      {!destination.available && (
        <div className="translation-notice" lang={targetLocale}>
          <span>
            <Ink kind="utility">{unavailable}</Ink>
          </span>
          <a
            href={destination.href}
            hrefLang={targetLocale}
            onClick={switchLanguage}
          >
            <Ink kind="utility">
              {targetLocale === "en" ? labels.englishNews : labels.japaneseNews}
            </Ink>
          </a>
        </div>
      )}
    </nav>
  );
}
