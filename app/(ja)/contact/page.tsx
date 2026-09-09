import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "contact");
export default function Page() {
  return <ContactPage locale="ja" />;
}
