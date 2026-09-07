import { RevealText } from "@/components/motion/reveal-text";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: site.title, template: "%s | MYSTENA" },
  description: site.description,
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#f4f9ff" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          <RevealText kind="utility">本文へスキップ</RevealText>
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
