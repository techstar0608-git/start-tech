import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Services & Pricing",
  robots: { index: false, follow: true },
};

export default function ServicesPricingPage() {
  return <ComingSoon title="Services & Pricing" />;
}
