import type { Metadata } from "next";
import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { GradientImage } from "@/components/motion/gradient-image";
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
              <GradientImage
                src={b.visual}
                blend={b.visualBlend}
                sizes="(max-width: 700px) 90vw, 60vw"
                className="business-detail-visual"
                palette={i === 0 ? "sky" : "iris"}
              />
              <h2 className="business-title">
                <RevealText palette={i === 0 ? "sky" : "iris"}>
                  {b.en.join("\n")}
                </RevealText>
              </h2>
              <p className="business-subtitle">
                <RevealText palette="mint" direction="right">
                  {b.title}
                </RevealText>
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
