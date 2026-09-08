import { PrivacyPage } from "@/components/pages/privacy";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "privacy");
export default function Page() {
  return <PrivacyPage locale="ja" />;
}
