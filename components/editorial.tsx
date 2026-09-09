import Link from "@/components/site-link";
import { Arrow } from "./icons";
import { Scene } from "./motion/scene";
import { RevealText } from "./motion/reveal-text";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale, type PageKey } from "@/content/i18n";
import type { Palette } from "./motion/entrance";

export function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: string;
}) {
  return (
    <p className="section-label">
      {number && <RevealText kind="label">{number}</RevealText>}
      <RevealText kind="label">{children}</RevealText>
    </p>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link className="text-link" href={href}>
      <RevealText kind="label">{children}</RevealText>
      <span className="arrow-circle">
        <Arrow />
      </span>
    </Link>
  );
}
export function DraftBadge({ children }: { children: string }) {
  return (
    <span className="draft-badge">
      <RevealText kind="label">{children}</RevealText>
    </span>
  );
}
export function ContactBand({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <Scene className="contact-band" palette="apricot" story="contact">
      <div className="container">
        <SectionLabel>{c.pages.contact.title}</SectionLabel>
        <div className="contact-band-inner">
          <h2>
            {c.contactBand.title.map((line, i) => (
              <RevealText
                key={line}
                palette={i ? "iris" : "apricot"}
                direction={i ? "right" : "left"}
              >
                {line}
              </RevealText>
            ))}
          </h2>
          <div>
            <p>
              <RevealText kind="body">{c.contactBand.description}</RevealText>
            </p>
            <TextLink href={localizedPath("/contact", locale)}>
              {c.pages.contact.title}
            </TextLink>
          </div>
        </div>
      </div>
    </Scene>
  );
}
export function PageIntro({
  locale,
  page,
  palette = "sky",
}: {
  locale: Locale;
  page: Exclude<PageKey, "home">;
  palette?: Palette;
}) {
  const c = getDictionary(locale);
  return (
    <Scene className="page-intro" palette={palette}>
      <div className="container">
        <p className="breadcrumb">
          <Link href={localizedPath("/", locale)}>
            <RevealText kind="label">{c.common.home}</RevealText>
          </Link>
          <RevealText kind="label">/</RevealText>
          <RevealText kind="label">{c.pages[page].title}</RevealText>
        </p>
        {locale === "ja" && (
          <p className="page-kicker" lang="en">
            <RevealText kind="label">{c.pages[page].short}</RevealText>
          </p>
        )}
        <h1 className="page-title" tabIndex={-1}>
          <RevealText palette={palette}>{c.pages[page].title}</RevealText>
        </h1>
        <p className="page-description">
          <RevealText kind="body" palette={palette} direction="right">
            {c.pages[page].description}
          </RevealText>
        </p>
      </div>
    </Scene>
  );
}
