import Link from "@/components/site-link";
import { Arrow } from "./icons";
import { Scene } from "./motion/scene";
import { RevealText } from "./motion/reveal-text";
import { site } from "@/content/site";
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
export function ContactBand() {
  return (
    <Scene className="contact-band" palette="apricot">
      <div className="container">
        <SectionLabel>GET IN TOUCH</SectionLabel>
        <div className="contact-band-inner">
          <h2>
            <RevealText palette="apricot">{site.contact.lines[0]}</RevealText>
            <RevealText palette="iris" direction="right">
              {site.contact.lines[1]}
            </RevealText>
          </h2>
          <div>
            <p>
              <RevealText kind="body">{site.contact.description}</RevealText>
            </p>
            <TextLink href="/contact">お問い合わせ</TextLink>
          </div>
        </div>
      </div>
    </Scene>
  );
}
export function PageIntro({
  en,
  ja,
  description,
  palette = "sky",
}: {
  en: string;
  ja: string;
  description?: string;
  palette?: Palette;
}) {
  return (
    <Scene className="page-intro" palette={palette}>
      <div className="container">
        <p className="breadcrumb">
          <Link href="/">
            <RevealText kind="label">TOP</RevealText>
          </Link>
          <RevealText kind="label">/</RevealText>
          <RevealText kind="label">{en.toUpperCase()}</RevealText>
        </p>
        <p className="page-en" aria-hidden="true">
          <RevealText palette={palette}>{en + "."}</RevealText>
        </p>
        <h1 tabIndex={-1}>
          <RevealText kind="subtitle" palette={palette}>
            {ja}
          </RevealText>
        </h1>
        {description && (
          <p className="page-description">
            <RevealText kind="body" palette={palette} direction="right">
              {description}
            </RevealText>
          </p>
        )}
      </div>
    </Scene>
  );
}
