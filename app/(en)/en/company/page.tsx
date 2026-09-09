import { CompanyPage } from "@/components/pages/company";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "company");
export default function Page() {
  return <CompanyPage locale="en" />;
}
