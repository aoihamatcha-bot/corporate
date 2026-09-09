import { NewsPage } from "@/components/pages/news";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "news");
export default function Page() {
  return <NewsPage locale="en" />;
}
