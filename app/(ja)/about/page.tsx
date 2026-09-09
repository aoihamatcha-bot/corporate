import { AboutPage } from "@/components/pages/about";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "about");
export default function Page() {
  return <AboutPage locale="ja" />;
}
