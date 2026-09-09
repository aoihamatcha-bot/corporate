import { ArticlePage } from "@/components/pages/article";
import { articleMetadata } from "@/content/metadata";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return articleMetadata("en", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <ArticlePage locale="en" slug={(await params).slug} />;
}
