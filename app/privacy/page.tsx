import { RevealText } from "@/components/motion/reveal-text";
import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/editorial";
import { pages } from "@/content/pages";
export const metadata: Metadata = {
  title: pages.privacy.ja,
  description:
    "MYSTENAの個人情報の取り扱いに関するご案内。正式な方針は掲載準備中です。",
};
export default function Privacy() {
  return (
    <>
      <PageIntro en={pages.privacy.en} ja={pages.privacy.ja} palette="iris" />
      <section className="page-section">
        <div className="container privacy-frame">
          {pages.privacy.status === "published" &&
          pages.privacy.body?.length ? (
            <div className="prose">
              {pages.privacy.body.map((section) => (
                <section key={section.heading} style={{ marginBottom: 36 }}>
                  <h2 style={{ fontSize: 22, marginBottom: 16 }}>
                    <RevealText kind="subtitle">{section.heading}</RevealText>
                  </h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>
                      <RevealText kind="body">{paragraph}</RevealText>
                    </p>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <>
              <div className="notice">
                <strong>
                  <RevealText kind="subtitle">掲載準備中</RevealText>
                </strong>
                <RevealText kind="body">{pages.privacy.notice}</RevealText>
              </div>
              <p>
                <RevealText kind="body">{pages.privacy.explanation}</RevealText>
              </p>
            </>
          )}
          <TextLink href="/contact">お問い合わせについて</TextLink>
        </div>
      </section>
    </>
  );
}
