import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { ImageEntrance } from "@/components/motion/image-entrance";
import { GradientImage } from "@/components/motion/gradient-image";
import { ConceptDiagram, Collaboration } from "@/components/content-blocks";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";
import { business } from "@/content/business";
export function BusinessPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="business" palette="iris" />
      {business.map((item, i) => {
        const copy = c.business.areas[item.id];
        return (
          <Scene
            key={item.id}
            id={item.id}
            className="business-detail-section"
            palette={i % 2 ? "mint" : "sky"}
            direction={i % 2 ? "right" : "left"}
          >
            <div className="container editorial-grid">
              <SectionLabel number={item.index}>{copy.role}</SectionLabel>
              <div>
                <ImageEntrance className="business-detail-frame">
                  <GradientImage
                    src={item.detailVisual}
                    blend={item.detailVisualBlend}
                    trigger="hover"
                    sizes="(max-width: 700px) 90vw, 60vw"
                    className="business-detail-visual"
                    palette={i % 2 ? "iris" : "sky"}
                    alt={copy.detailVisualAlt}
                  />
                </ImageEntrance>
                <h2 className="business-title">
                  <RevealText>{copy.title}</RevealText>
                </h2>
                <div className="prose">
                  <p>
                    <RevealText kind="body">{copy.description}</RevealText>
                  </p>
                </div>
                <div className="business-direction">
                  <h3>
                    <RevealText kind="label">
                      {c.business.consultationLabel}
                    </RevealText>
                  </h3>
                  <p>
                    <RevealText kind="subtitle">{copy.consultation}</RevealText>
                  </p>
                </div>
              </div>
            </div>
          </Scene>
        );
      })}
      <section className="page-section">
        <div className="container">
          <h2 className="section-heading">
            <RevealText>{c.business.factsTitle}</RevealText>
          </h2>
          <dl className="business-facts">
            {[
              [c.business.audienceLabel, c.business.audience],
              [c.business.deliverableLabel, c.business.deliverable],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>
                  <RevealText kind="label">{label}</RevealText>
                </dt>
                <dd>
                  <RevealText kind="body">{value}</RevealText>
                </dd>
              </div>
            ))}
          </dl>
          <ConceptDiagram locale={locale} />
        </div>
      </section>
      <Collaboration locale={locale} />
      <ContactBand locale={locale} />
    </>
  );
}
