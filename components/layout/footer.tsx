import { RevealText } from "@/components/motion/reveal-text";
import Link from "@/components/site-link";
import { navigationFor } from "@/content/navigation";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
import { Arrow } from "@/components/icons";
import { Wordmark } from "@/components/wordmark";
export function Footer({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p>
            <RevealText kind="label">{c.common.tagline}</RevealText>
          </p>
          <nav aria-label={c.common.footerNav}>
            {navigationFor(locale)
              .slice(1)
              .map((n) => (
                <Link key={n.href} href={n.href}>
                  <RevealText kind="label">{n.label}</RevealText>
                </Link>
              ))}
          </nav>
          <a href="#main" className="back-top" aria-label={c.common.backTop}>
            <Arrow diagonal />
          </a>
        </div>
        <Link
          href={localizedPath("/", locale)}
          className="footer-wordmark"
          aria-label={c.common.homeLink}
        >
          <Wordmark dark />
        </Link>
        <div className="footer-bottom">
          <RevealText kind="label">{c.common.copyright}</RevealText>
          <Link href={localizedPath("/privacy", locale)}>
            <RevealText kind="label">{c.pages.privacy.menu}</RevealText>
          </Link>
        </div>
      </div>
    </footer>
  );
}
