import type { Metadata } from "next";
import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { Scene } from "@/components/motion/scene";
import { pages } from "@/content/pages";
import { business } from "@/content/business";
export const metadata: Metadata = {
  title: pages.business.ja,
  description: pages.business.description.replace("\n", ""),
};
export default function Business() {
  return (
    <>
      <PageIntro {...pages.business} palette="iris" />
      {business.map((b, i) => (
        <Scene
          key={b.id}
          id={b.id}
          className="business-detail-section"
          palette={i === 0 ? "sky" : "mint"}
          direction={i === 0 ? "left" : "right"}
        >
          <div className="container editorial-grid">
            <SectionLabel number={b.index}>{b.verb}</SectionLabel>
            <div>
              <h2 className="business-title" data-reveal="left">
                {b.en[0]}
                <br />
                {b.en[1]}
              </h2>
              <p className="business-subtitle" data-reveal="right">
                {b.title}
              </p>
              <div className="prose">
                <p>{b.description}</p>
                <p>{b.value}</p>
              </div>
              <div className="tags">
                {b.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="business-direction">
                <h3>一緒に、広げていきたいこと。</h3>
                <p>{b.collaboration}</p>
              </div>
            </div>
          </div>
        </Scene>
      ))}
      <ContactBand />
    </>
  );
}
