import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteRoot } from "@/components/layout/site-root";
import { rootMetadata } from "@/content/metadata";
export const metadata = rootMetadata("en");
export const viewport: Viewport = { themeColor: "#f4f9ff" };
// Evaluate editorial and article publication state on every request.
export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: ReactNode }) {
  return <SiteRoot locale="en">{children}</SiteRoot>;
}
