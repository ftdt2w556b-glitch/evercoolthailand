import type { Metadata } from "next";
import PlaceholderPage from "@/components/public/PlaceholderPage";

export const metadata: Metadata = { title: "Book Service" };

export default function BookPage() {
  return <PlaceholderPage title="Book Service" />;
}
