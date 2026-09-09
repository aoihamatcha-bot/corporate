import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "home");
export default function Page() {
  return <HomePage locale="ja" />;
}
