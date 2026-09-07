import Link from "@/components/site-link";
import { Scene } from "@/components/motion/scene";
import { RevealText } from "@/components/motion/reveal-text";
import { GradientImage } from "@/components/motion/gradient-image";
import { SectionLabel, TextLink, ContactBand } from "@/components/editorial";
import { Arrow, Spark } from "@/components/icons";
import { site } from "@/content/site";
import { business } from "@/content/business";
import { publishedNews } from "@/content/news";
export const dynamic = "force-dynamic";
export default function Home() {
  const articles = publishedNews().slice(0, 3);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <GradientImage
          src="/images/afterglow.webp"
          sizes="100vw"
          preload
          className="hero-art"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            ENTERTAINMENT × TECHNOLOGY
          </p>
          <h1 id="hero-title" tabIndex={-1}>
            {site.hero.lines.map((line, i) => (
              <RevealText
                key={line}
                light
                palette={i === 0 ? "sky" : "iris"}
                direction={i === 0 ? "left" : "right"}
              >
                {line}
              </RevealText>
            ))}
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <TextLink href="/about">MYSTENAについて</TextLink>
        </div>
        <div className="container hero-bottom">
          <span>
            BE CURIOUS.
            <br />
            FIND YOUR NEXT.
          </span>
          <a href="#about" className="scroll-link">
            SCROLL TO EXPLORE<span aria-hidden="true">↓</span>
          </a>
          <span className="hero-side-note">THE POSSIBILITIES AHEAD</span>
        </div>
      </section>
      <Scene id="about" className="about-section section-space" palette="mint">
        <div className="container editorial-grid">
          <SectionLabel number="01">ABOUT US</SectionLabel>
          <div>
            <p className="kicker">
              <RevealText palette="mint">{site.about.kicker}</RevealText>
            </p>
            <h2 className="section-heading">
              <RevealText palette="sky">{site.about.lines[0]}</RevealText>
              <RevealText palette="iris" direction="right">
                {site.about.lines[1]}
              </RevealText>
            </h2>
            <div className="prose">
              {site.about.paragraphs.map((p, i) => (
                <p key={p}>
                  <RevealText palette={i === 0 ? "mint" : "apricot"}>
                    {p}
                  </RevealText>
                </p>
              ))}
            </div>
            <TextLink href="/about">私たちについて</TextLink>
            <p className="signoff">
              <Spark />A LITTLE CURIOSITY. A NEW POSSIBILITY.
            </p>
          </div>
        </div>
      </Scene>
      <Scene className="wonder-section" palette="sky">
        <div className="container">
          <p className="eyebrow">THE MYSTENA SPIRIT</p>
          <h2 className="wonder-type">
            <RevealText cut palette="sky">
              A LITTLE WONDER
            </RevealText>
            <RevealText cut palette="iris" direction="right">
              CHANGES EVERYTHING.
            </RevealText>
          </h2>
          <p className="wonder-caption">小さなときめきが、世界を変えていく。</p>
        </div>
      </Scene>
      <Scene
        className="section-space business-section"
        palette="iris"
        direction="right"
      >
        <div className="container">
          <div className="section-top">
            <SectionLabel number="02">OUR BUSINESS</SectionLabel>
            <div>
              <h2 className="section-heading">
                <RevealText palette="iris" direction="right">
                  楽しさを、
                </RevealText>
                <RevealText palette="mint">次のかたちへ。</RevealText>
              </h2>
              <p className="section-description">
                MYSTENAが目指す、2つの領域。
              </p>
            </div>
          </div>
          <div className="business-preview">
            {business.map((item, i) => (
              <Link key={item.id} href={`/business#${item.id}`}>
                <GradientImage
                  src={item.visual}
                  blend={item.visualBlend}
                  sizes="(max-width: 700px) 90vw, 44vw"
                  className="business-visual"
                  palette={i === 0 ? "sky" : "iris"}
                />
                <span className="business-index">
                  {item.index} / {item.verb}
                </span>
                <h3>
                  <RevealText palette={i === 0 ? "sky" : "iris"}>
                    {item.en.join("\n")}
                  </RevealText>
                </h3>
                <div>
                  <span>{item.title}</span>
                  <Arrow diagonal />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Scene>
      <section className="home-news">
        <div className="container editorial-grid">
          <div>
            <SectionLabel number="03">LATEST NEWS</SectionLabel>
            <h2>お知らせ</h2>
          </div>
          <div>
            {articles.length ? (
              <ul className="news-list">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/news/${article.slug}`}>
                      <time dateTime={article.publishedAt!}>
                        {article.publishedAt!.slice(0, 10).replaceAll("-", ".")}
                      </time>
                      <h3>{article.title}</h3>
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="eyebrow muted">STAY CURIOUS.</p>
                <p className="empty-title">新しい一歩を、ここから。</p>
                <p className="muted">
                  お知らせは、公開の準備が整い次第お届けします。
                </p>
              </>
            )}
            <TextLink href="/news">お知らせ一覧</TextLink>
          </div>
        </div>
      </section>
      <Scene className="home-company" palette="sky">
        <div className="container">
          <SectionLabel number="04">COMPANY</SectionLabel>
          <Link href="/company" className="company-link">
            <h2>私たちのこと。</h2>
            <span>
              会社情報
              <Arrow diagonal />
            </span>
          </Link>
        </div>
      </Scene>
      <ContactBand />
    </>
  );
}
