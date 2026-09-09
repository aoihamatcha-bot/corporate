import { BusinessPage } from "@/components/pages/business";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "business");
export default function Page() {
  return <BusinessPage locale="en" />;
}
