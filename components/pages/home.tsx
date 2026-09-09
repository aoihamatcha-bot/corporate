import Link from "@/components/site-link";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { GradientImage } from "@/components/motion/gradient-image";
import {
  SectionLabel,
  TextLink,
  ContactBand,
  DraftBadge,
} from "@/components/editorial";
import {
  BusinessCards,
  CurrentWork,
  Collaboration,
  NewsListing,
} from "@/components/content-blocks";
import { Arrow } from "@/components/icons";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
import { corporateAsset } from "@/content/corporate-assets";
export function HomePage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <GradientImage
          src={corporateAsset("A08", locale).path}
          sizes="100vw"
          preload
          className="hero-art"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            <RevealText kind="label">{c.common.tagline}</RevealText>
          </p>
          <h1 id="hero-title" tabIndex={-1}>
            {c.home.heroLines.map((line, i) => (
              <RevealText
                key={line}
                palette={i ? "iris" : "sky"}
                direction={i ? "right" : "left"}
              >
                {line}
              </RevealText>
            ))}
          </h1>
          <p className="hero-description">
            <RevealText kind="body">{c.home.description}</RevealText>
          </p>
          <div className="hero-actions">
            <TextLink href={localizedPath("/business", locale)}>
              {c.home.businessButton}
            </TextLink>
            <TextLink href={localizedPath("/company", locale)}>
              {c.home.companyButton}
            </TextLink>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>
            <RevealText kind="label">{c.common.brandNote}</RevealText>
          </span>
          <a href="#business" className="scroll-link">
            <RevealText kind="label">{c.home.scroll}</RevealText>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <Scene
        id="business"
        className="section-space business-section"
        palette="iris"
        direction="right"
      >
        <div className="container">
          <div className="section-top">
            <SectionLabel number="01">{c.pages.business.title}</SectionLabel>
            <div>
              <DraftBadge>{c.review.candidate}</DraftBadge>
              <h2 className="section-heading">
                <RevealText palette="iris" direction="right">
                  {c.home.businessTitle}
                </RevealText>
              </h2>
              <p className="section-description">
                <RevealText kind="subtitle">
                  {c.home.businessStructure}
                </RevealText>
              </p>
              <p className="section-description">
                <RevealText kind="body">
                  {c.home.businessDescription}
                </RevealText>
              </p>
            </div>
          </div>
          <BusinessCards locale={locale} />
        </div>
      </Scene>
      <CurrentWork locale={locale} />
      <Scene id="about" className="wonder-section about-section" palette="sky">
        <div className="container">
          <SectionLabel number="03">{c.home.philosophyLabel}</SectionLabel>
          <h2 className="wonder-type">
            {c.home.philosophyLines.map((line, i) => (
              <RevealText
                key={line}
                cut
                palette={i ? "iris" : "sky"}
                direction={i ? "right" : "left"}
              >
                {line}
              </RevealText>
            ))}
          </h2>
          <div className="philosophy-bottom">
            <div className="prose">
              <p>
                <RevealText kind="body">
                  {c.home.philosophyDescription}
                </RevealText>
              </p>
            </div>
            <TextLink href={localizedPath("/about", locale)}>
              {c.home.aboutButton}
            </TextLink>
          </div>
        </div>
      </Scene>
      <Collaboration locale={locale} />
      <section className="home-news">
        <div className="container editorial-grid">
          <SectionLabel number="05">{c.pages.news.title}</SectionLabel>
          <div>
            <NewsListing locale={locale} limit={3} />
            <TextLink href={localizedPath("/news", locale)}>
              {c.news.all}
            </TextLink>
          </div>
        </div>
      </section>
      <Scene className="home-company" palette="sky">
        <div className="container">
          <SectionLabel number="06">{c.pages.company.title}</SectionLabel>
          <Link
            href={localizedPath("/company", locale)}
            className="company-link"
          >
            <h2>
              <RevealText kind="heading">
                {c.home.companyDescription}
              </RevealText>
            </h2>
            <span>
              <RevealText kind="label">{c.home.companyButton}</RevealText>
              <Arrow diagonal />
            </span>
          </Link>
        </div>
      </Scene>
      <ContactBand locale={locale} />
    </>
  );
}
