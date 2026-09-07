import Link from "@/components/site-link";
import { navigation } from "@/content/navigation";
import { Arrow, Spark } from "@/components/icons";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p>
            ENTERTAINMENT
            <br />
            MEETS TECHNOLOGY.
          </p>
          <nav aria-label="フッターナビゲーション">
            {navigation.slice(1).map((n) => (
              <Link key={n.href} href={n.href}>
                {n.ja}
              </Link>
            ))}
          </nav>
          <a href="#main" className="back-top" aria-label="ページ先頭へ">
            <Arrow diagonal />
          </a>
        </div>
        <Link href="/" className="footer-wordmark" aria-label="MYSTENA トップ">
          MYSTENA
          <Spark />
        </Link>
        <div className="footer-bottom">
          <span>© MYSTENA</span>
          <Link href="/privacy">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
}
