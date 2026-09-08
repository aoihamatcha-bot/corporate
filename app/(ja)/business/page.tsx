import { BusinessPage } from "@/components/pages/business";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "business");
export default function Page() {
  return <BusinessPage locale="ja" />;
}
