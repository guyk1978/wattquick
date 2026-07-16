import type { Metadata } from "next";
import { CalculatorsGridHub } from "@/components/grid-modal/calculators-grid-hub";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of use for WattQuick battery and power micro-calculators.",
  path: "/terms",
});

/** Terms opens inside LegalModal over the category grid (no standalone page). */
export default function TermsPage() {
  return (
    <div className="landing-page landing-page--grid-modal">
      <CalculatorsGridHub initialLegalDoc="terms" />
    </div>
  );
}
