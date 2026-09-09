import type { ReactNode } from "react";
import { LINE_Seed_JP } from "next/font/google";
import { Header } from "./header";
import { Footer } from "./footer";
import { RevealText } from "@/components/motion/reveal-text";
import { getDictionary } from "@/content/dictionaries";
import { navigationFor } from "@/content/navigation";
import { articleLanguageAvailability } from "@/content/news";
import { HomeStory } from "@/components/motion/home-story";
import type { Locale } from "@/content/i18n";
import "@/app/globals.css";
import "@/styles/storyboard.css";

const lineSeed = LINE_Seed_JP({
  weight: ["400", "700"],
  // Japanese Unicode chunks load on demand, without preloading the full family.
  preload: false,
  display: "swap",
  variable: "--font-line-seed-jp",
  adjustFontFallback: false,
});

export function SiteRoot({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const c = getDictionary(locale);
  return (
    <html
      lang={locale}
      className={lineSeed.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#main">
          <RevealText kind="utility">{c.common.skip}</RevealText>
        </a>
        <Header
          locale={locale}
          labels={c.common}
          navigation={navigationFor(locale)}
          privacyLabel={c.pages.privacy.menu}
          available={articleLanguageAvailability()}
        />
        <main id="main" tabIndex={-1}>
          <HomeStory>{children}</HomeStory>
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
