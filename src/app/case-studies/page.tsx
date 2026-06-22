import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Case studies",
  robots: { index: false, follow: true },
};

export default function CaseStudiesPage() {
  return <ComingSoon title="Case studies" />;
}
