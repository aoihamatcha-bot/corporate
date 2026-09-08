import { PageIntro, TextLink } from "@/components/editorial";
import { NewsListing } from "@/components/content-blocks";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
export function NewsPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="news" />
      <section className="page-section">
        <div className="container">
          <NewsListing locale={locale} />
          <TextLink href={localizedPath("/", locale)}>{c.news.home}</TextLink>
        </div>
      </section>
    </>
  );
}
