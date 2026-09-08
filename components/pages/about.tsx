import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";
export function AboutPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="about" palette="mint" />
      <section className="page-section">
        <div className="container editorial-grid">
          <SectionLabel>{c.pages.about.title}</SectionLabel>
          <div>
            <h2 className="section-heading">
              <RevealText>{c.about.heading}</RevealText>
            </h2>
            <div className="prose">
              {c.about.paragraphs.map((p) => (
                <p key={p}>
                  <RevealText kind="body">{p}</RevealText>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Scene className="page-section" palette="iris">
        <div className="container">
          <h2 className="section-heading">
            <RevealText>{c.about.valuesTitle}</RevealText>
          </h2>
          <ol className="values-list">
            {c.about.values.map((value, i) => (
              <li key={value.title}>
                <span className="value-number">
                  <RevealText kind="label">
                    {String(i + 1).padStart(2, "0")}
                  </RevealText>
                </span>
                <h3>
                  <RevealText kind="subtitle">{value.title}</RevealText>
                </h3>
                <p>
                  <RevealText kind="body">{value.description}</RevealText>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Scene>
      <ContactBand locale={locale} />
    </>
  );
}
