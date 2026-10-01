import type { Metadata } from "next";
import { PantryTemplate } from "@/components/templates/pantry/PantryTemplate";

export const metadata: Metadata = {
  title: "Pantry — website style demo",
  description:
    "An editorial, product-led website style for food and artisan brands — a live demo template by S.T.A.R.",
  // demo brand: keep it out of search results
  robots: { index: false, follow: true },
};

export default function PantryTemplatePage() {
  return <PantryTemplate />;
}
