import Link from "@/components/site-link";
import { Arrow } from "./icons";
import { Scene } from "./motion/scene";
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
          <h2 data-reveal="left">
            {site.contact.lines[0]}
            <br />
            {site.contact.lines[1]}
          </h2>
          <div data-reveal="right">
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
        <p className="page-en" aria-hidden="true" data-reveal="left">
          {en}
          <span>.</span>
        </p>
        <h1 tabIndex={-1} data-reveal="left">
          {ja}
        </h1>
        {description && (
          <p className="page-description" data-reveal="right">
            {description}
          </p>
        )}
      </div>
    </Scene>
  );
}
