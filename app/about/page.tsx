import type { Metadata } from "next";
import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
export const metadata: Metadata = {
  title: pages.about.ja,
  description: pages.about.description.replace("\n", ""),
};
export default function About() {
  const copy = pages.about;
  return (
    <>
      <PageIntro {...copy} palette="mint" />
      <Scene className="page-section" palette="mint">
        <div className="container editorial-grid">
          <SectionLabel>OUR MISSION</SectionLabel>
          <div>
            <h2 className="section-heading">
              <RevealText palette="sky">{site.about.lines[0]}</RevealText>
              <RevealText palette="iris" direction="right">
                {site.about.lines[1]}
              </RevealText>
            </h2>
            <div className="prose">
              {site.about.paragraphs.map((p, i) => (
                <p key={p}>
                  <RevealText palette={i === 0 ? "mint" : "apricot"}>
                    {p}
                  </RevealText>
                </p>
              ))}
            </div>
          </div>
        </div>
      </Scene>
      <Scene className="page-section" palette="sky" direction="right">
        <div className="container editorial-grid">
          <SectionLabel>OUR APPROACH</SectionLabel>
          <div>
            <h2 className="section-heading" style={{ whiteSpace: "pre-line" }}>
              <RevealText palette="sky" direction="right">
                {copy.approach.title}
              </RevealText>
            </h2>
            <div className="prose">
              {copy.approach.paragraphs.map((p) => (
                <p key={p}>
                  <RevealText palette="iris">{p}</RevealText>
                </p>
              ))}
            </div>
          </div>
        </div>
      </Scene>
      <section className="page-section">
        <div className="container">
          <SectionLabel>OUR VALUES</SectionLabel>
          <h2 className="section-heading" style={{ marginTop: 28 }}>
            私たちが、大切にすること。
          </h2>
          <ol className="values-list">
            {copy.values.map((v, i) => (
              <li key={v.title}>
                <span className="value-number">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
