import { RevealText } from "@/components/motion/reveal-text";
import Link from "@/components/site-link";
import { navigation } from "@/content/navigation";
import { Arrow, Spark } from "@/components/icons";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p>
            <RevealText kind="label">
              {"ENTERTAINMENT\nMEETS TECHNOLOGY."}
            </RevealText>
          </p>
          <nav aria-label="フッターナビゲーション">
            {navigation.slice(1).map((n) => (
              <Link key={n.href} href={n.href}>
                <RevealText kind="label">{n.ja}</RevealText>
              </Link>
            ))}
          </nav>
          <a href="#main" className="back-top" aria-label="ページ先頭へ">
            <Arrow diagonal />
          </a>
        </div>
        <Link href="/" className="footer-wordmark" aria-label="MYSTENA トップ">
          <RevealText kind="heading">MYSTENA</RevealText>
          <Spark />
        </Link>
        <div className="footer-bottom">
          <RevealText kind="label">© MYSTENA</RevealText>
          <Link href="/privacy">
            <RevealText kind="label">プライバシーポリシー</RevealText>
          </Link>
        </div>
      </div>
    </footer>
  );
}
