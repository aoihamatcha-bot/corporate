import { CompanyPage } from "@/components/pages/company";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "company");
export default function Page() {
  return <CompanyPage locale="ja" />;
}
