import { RevealText } from "@/components/motion/reveal-text";
import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial";
import { ContactForm } from "@/components/contact-form";
import { pages } from "@/content/pages";
export const metadata: Metadata = {
  title: pages.contact.ja,
  description:
    "MYSTENAへのお問い合わせについて。現在、お問い合わせ窓口を準備しています。",
};
export default function Contact() {
  return (
    <>
      <PageIntro {...pages.contact} palette="apricot" />
      <section className="page-section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="notice" id="contact-status">
            <strong>
              <RevealText kind="subtitle">
                {pages.contact.noticeTitle}
              </RevealText>
            </strong>
            <RevealText kind="body">{pages.contact.notice}</RevealText>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
