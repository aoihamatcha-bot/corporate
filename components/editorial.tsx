import Link from "@/components/site-link";
import { Arrow } from "./icons";
import { Scene } from "./motion/scene";
import { RevealText } from "./motion/reveal-text";
import { site } from "@/content/site";
export function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      {number && <span>{number}</span>}
      {children}
    </p>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
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
            <p>{site.contact.description}</p>
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
  palette?: "sky" | "mint" | "apricot" | "iris";
}) {
  return (
    <Scene className="page-intro" palette={palette}>
      <div className="container">
        <p className="breadcrumb">
          <Link href="/">TOP</Link>
          <span>/</span>
          {en.toUpperCase()}
        </p>
        <p className="page-en" aria-hidden="true">
          <RevealText palette={palette}>{en + "."}</RevealText>
        </p>
        <h1 tabIndex={-1}>
          <RevealText palette={palette}>{ja}</RevealText>
        </h1>
        {description && (
          <p className="page-description">
            <RevealText palette={palette} direction="right">
              {description}
            </RevealText>
          </p>
        )}
      </div>
    </Scene>
  );
}
