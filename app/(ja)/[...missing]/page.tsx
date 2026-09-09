import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
export const metadata = { title: getDictionary("ja").notFound.title };
export default function Missing() {
  notFound();
}
