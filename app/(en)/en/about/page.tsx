import { AboutPage } from "@/components/pages/about";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "about");
export default function Page() {
  return <AboutPage locale="en" />;
}
