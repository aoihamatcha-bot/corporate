import { RevealText } from "@/components/motion/reveal-text";
import { PageIntro } from "@/components/editorial";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";
export function ContactPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="contact" palette="apricot" />
      <section className="page-section">
        <div className="container contact-frame">
          <div className="notice" id="contact-status">
            <strong>
              <RevealText kind="subtitle">{c.contact.noticeTitle}</RevealText>
            </strong>
            <RevealText kind="body">{c.contact.notice}</RevealText>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>
    </>
  );
}
