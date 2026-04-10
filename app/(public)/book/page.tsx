import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "@/components/public/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Book AC installation, repair, maintenance, or IAQ consultation in Bangkok, Koh Tao, and Surat Thani.",
};

export default function BookPage() {
  return (
    <Suspense>
      <BookingWizard />
    </Suspense>
  );
}
