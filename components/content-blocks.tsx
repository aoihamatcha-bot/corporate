import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
import { business } from "@/content/business";
import { publishedNews } from "@/content/news";
import { RevealText } from "@/components/motion/reveal-text";
import { GradientImage } from "@/components/motion/gradient-image";
import { Scene } from "@/components/motion/scene";
import { Arrow } from "@/components/icons";
import { SectionLabel, TextLink } from "@/components/editorial";
import Link from "@/components/site-link";
import { CorporateImage } from "@/components/corporate-image";
import { StoryAccent } from "@/components/motion/story-accent";

export function BusinessCards({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <div className="business-preview">
      {business.map((item, i) => {
        const copy = c.business.areas[item.id];
        return (
          <Link
            key={item.id}
            href={localizedPath("/business", locale) + "#" + item.id}
          >
            <div className="story-card-frame">
              <div className="story-card-media">
                <GradientImage
                  src={item.visual}
                  blend={item.visualBlend}
                  trigger="hover"
                  sizes="(max-width: 700px) 90vw, 44vw"
                  className="business-visual"
                  palette={i % 2 ? "iris" : "sky"}
                  alt={copy.visualAlt}
                />
              </div>
            </div>
            <span className="business-index">
              <RevealText kind="label">{copy.role}</RevealText>
            </span>
            <h3>
              <RevealText kind="heading">{copy.title}</RevealText>
            </h3>
            <p>
              <RevealText kind="body">{copy.summary}</RevealText>
            </p>
            <div className="card-consultation">
              <span>
                <RevealText kind="label">{c.common.businessDetails}</RevealText>
              </span>
              <Arrow diagonal />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export function ConceptDiagram({
  locale,
  illustration = false,
}: {
  locale: Locale;
  illustration?: boolean;
}) {
  const c = getDictionary(locale);
  return (
    <figure className="concept-diagram">
      <figcaption>
        <h3>
          <RevealText kind="subtitle">{c.diagram.title}</RevealText>
        </h3>
        <p>
          <RevealText kind="body">{c.diagram.caption}</RevealText>
        </p>
      </figcaption>
      <div className="concept-relationship">
        <strong><RevealText kind="subtitle">{c.diagram.relationshipLabel}</RevealText></strong>
        <p><RevealText kind="body">{c.diagram.relationshipDescription}</RevealText></p>
      </div>
      <ul className="concept-nodes">
        {c.diagram.nodes.map((node, i) => (
          <li key={node.title}>
            <span className="concept-index">
              <RevealText kind="label">
                {String(i + 1).padStart(2, "0")}
              </RevealText>
            </span>
            <h4>
              <RevealText kind="subtitle">{node.title}</RevealText>
            </h4>
            <p>
              <RevealText kind="body">{node.description}</RevealText>
            </p>
          </li>
        ))}
      </ul>
      {illustration && (
        <CorporateImage id="A06" locale={locale} sizes="90vw" expandable />
      )}
    </figure>
  );
}
export function ServiceConcepts({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <div className="material-section">
      <p className="editorial-note"><RevealText kind="body">{c.assets.note}</RevealText></p>
      <div className="material-slots">
        {c.assets.slots.map((slot, index) => (
          <figure className="material-slot" key={slot.label}>
            <CorporateImage
              id={index === 0 ? "A01" : "A02"}
              locale={locale}
              sizes="(max-width: 700px) 90vw, 44vw"
              expandable
            />
            <figcaption>
              <SectionLabel>{slot.label}</SectionLabel>
              <h3>
                <RevealText kind="subtitle">{slot.title}</RevealText>
              </h3>
              <p>
                <RevealText kind="body">{slot.description}</RevealText>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
export function Collaboration({ locale, number }: { locale: Locale; number?: string }) {
  const c = getDictionary(locale);
  return (
    <Scene
      className="collaboration-section section-space"
      palette="mint"
      story="collaboration"
    >
      <div className="container editorial-grid">
        <SectionLabel number={number}>{c.collaboration.label}</SectionLabel>
        <div>
          <h2 className="section-heading">
            <RevealText>{c.collaboration.title}</RevealText>
          </h2>
          <div className="prose">
            <p>
              <RevealText kind="body">{c.collaboration.intro}</RevealText>
            </p>
            <p>
              <RevealText kind="body">{c.collaboration.description}</RevealText>
            </p>
          </div>
          <ul className="collaboration-themes">
            {c.collaboration.themes.map((theme, i) => (
              <li key={theme}>
                <span aria-hidden="true">
                  <RevealText kind="label">
                    {String(i + 1).padStart(2, "0")}
                  </RevealText>
                </span>
                <RevealText kind="subtitle">{theme}</RevealText>
              </li>
            ))}
          </ul>
          <p className="contact-availability"><RevealText kind="body">{c.collaboration.contactStatus}</RevealText></p>
          <Link
            className="collaboration-cta"
            href={localizedPath("/contact", locale)}
          >
            <span>
              <RevealText kind="subtitle" light>
                {c.collaboration.button}
              </RevealText>
            </span>
            <span className="collaboration-cta-arrow" aria-hidden="true">
              <Arrow diagonal />
            </span>
          </Link>
        </div>
      </div>
    </Scene>
  );
}
export function CurrentWork({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <section
      className="current-work section-space"
      id="current-work"
      data-story="assembly"
    >
      <StoryAccent beat="assembly" />
      <div className="container">
        <div className="editorial-grid">
          <SectionLabel number="02">{c.home.workingLabel}</SectionLabel>
          <div>
            <h2 className="section-heading">
              <RevealText>{c.home.workingTitle}</RevealText>
            </h2>
            <p className="section-description"><RevealText kind="body">{c.home.workingDescription}</RevealText></p>
          </div>
        </div>
        <ConceptDiagram locale={locale} />
        <TextLink href={localizedPath("/business", locale) + "#approach"}>
          {c.home.workingButton}
        </TextLink>
      </div>
    </section>
  );
}
export function ServicePoster({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <figure className="service-poster">
      <CorporateImage id="A07" locale={locale} expandable />
      <figcaption>
        <SectionLabel>{c.assets.posterLabel}</SectionLabel>
        <h3><RevealText kind="subtitle">{c.assets.posterTitle}</RevealText></h3>
      </figcaption>
    </figure>
  );
}
export function NewsListing({
  locale,
  limit,
}: {
  locale: Locale;
  limit?: number;
}) {
  const c = getDictionary(locale);
  const all = publishedNews(locale);
  const articles = limit ? all.slice(0, limit) : all;
  return articles.length ? (
    <ul className="news-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={localizedPath("/news/" + article.slug, locale)}>
            <time dateTime={article.publishedAt}>
              <RevealText kind="label">
                {new Intl.DateTimeFormat(locale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                }).format(new Date(article.publishedAt))}
              </RevealText>
            </time>
            <h3>
              <RevealText kind="subtitle">{article.title}</RevealText>
            </h3>
            <Arrow />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className="news-empty-copy">
      <p className="empty-title">
        <RevealText kind="subtitle">{c.news.emptyTitle}</RevealText>
      </p>
      <p className="muted">
        <RevealText kind="body">{c.news.emptyDescription}</RevealText>
      </p>
    </div>
  );
}
