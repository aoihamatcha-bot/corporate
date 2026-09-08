import { RevealText } from "@/components/motion/reveal-text";
import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { getDictionary } from "@/content/dictionaries";
import { company, publicCompanyRows } from "@/content/company";
import type { Locale } from "@/content/i18n";
export function CompanyPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="company" />
      <section className="page-section">
        <div className="container editorial-grid">
          <SectionLabel>{c.pages.company.title}</SectionLabel>
          <div>
            {company.publicationStatus === "unpublished" && (
              <p className="notice">
                <RevealText kind="body">{c.company.notice}</RevealText>
              </p>
            )}
            <dl className="company-table">
              {publicCompanyRows(locale).map((row) => (
                <div key={row.key}>
                  <dt>
                    <RevealText kind="label">
                      {c.company.fields[row.key]}
                    </RevealText>
                  </dt>
                  <dd>
                    <RevealText kind="body">{row.value}</RevealText>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="company-photo-slot">
              <h2>
                <RevealText kind="subtitle">{c.company.photoTitle}</RevealText>
              </h2>
              <p>
                <RevealText kind="body">{c.company.photoNote}</RevealText>
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
