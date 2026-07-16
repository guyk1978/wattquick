import type { Metadata } from "next";
import { CalculatorsGridHub } from "@/components/grid-modal/calculators-grid-hub";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How WattQuick handles data when you use our free battery and power calculators.",
  path: "/privacy",
});

/** Privacy opens inside LegalModal over the category grid (no standalone page). */
export default function PrivacyPage() {
  return (
    <div className="landing-page landing-page--grid-modal">
      <CalculatorsGridHub initialLegalDoc="privacy" />
    </div>
  );
}
