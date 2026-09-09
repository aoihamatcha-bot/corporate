import { TextLink } from "@/components/editorial";
import { RevealText } from "@/components/motion/reveal-text";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
export function NotFoundPage({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  return (
    <section className="container not-found">
      <p className="page-en" aria-hidden="true">
        <RevealText>404</RevealText>
      </p>
      <h1 tabIndex={-1}>
        <RevealText kind="subtitle">{c.notFound.title}</RevealText>
      </h1>
      <p>
        <RevealText kind="body">{c.notFound.description}</RevealText>
      </p>
      <TextLink href={localizedPath("/", locale)}>{c.notFound.back}</TextLink>
    </section>
  );
}
