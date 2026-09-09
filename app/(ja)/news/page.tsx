import { NewsPage } from "@/components/pages/news";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("ja", "news");
export default function Page() {
  return <NewsPage locale="ja" />;
}
