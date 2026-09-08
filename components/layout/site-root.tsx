import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { RevealText } from "@/components/motion/reveal-text";
import { getDictionary } from "@/content/dictionaries";
import { navigationFor } from "@/content/navigation";
import { articleLanguageAvailability } from "@/content/news";
import { editorialReview } from "@/content/editorial-review";
import type { Locale } from "@/content/i18n";
import "@/app/globals.css";

export function SiteRoot({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const c = getDictionary(locale);
  return (
    <html lang={locale} data-scroll-behavior="smooth">
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
        {editorialReview.status === "review" && (
          <aside className="review-notice">
            <div className="container">
              <strong>
                <RevealText kind="utility">{c.review.label}</RevealText>
              </strong>
              <RevealText kind="utility">{c.review.notice}</RevealText>
            </div>
          </aside>
        )}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
