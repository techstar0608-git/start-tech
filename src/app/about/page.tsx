import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "About us",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return <ComingSoon title="About us" />;
}
