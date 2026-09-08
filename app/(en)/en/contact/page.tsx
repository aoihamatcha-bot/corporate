import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "contact");
export default function Page() {
  return <ContactPage locale="en" />;
}
