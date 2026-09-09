import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "home");
export default function Page() {
  return <HomePage locale="en" />;
}
