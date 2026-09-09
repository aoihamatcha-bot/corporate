import { RevealText } from "@/components/motion/reveal-text";
import { PageIntro, TextLink } from "@/components/editorial";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
export function PrivacyPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <PageIntro locale={locale} page="privacy" palette="iris" />
      <section className="page-section">
        <div className="container privacy-frame">
          <div className="notice">
            <strong>
              <RevealText kind="subtitle">{c.privacy.status}</RevealText>
            </strong>
            <RevealText kind="body">{c.privacy.notice}</RevealText>
          </div>
          <p>
            <RevealText kind="body">{c.privacy.explanation}</RevealText>
          </p>
          <TextLink href={localizedPath("/contact", locale)}>
            {c.privacy.contact}
          </TextLink>
        </div>
      </section>
    </>
  );
}
