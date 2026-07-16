import type { Metadata } from "next";
import { CalculatorsGridHub } from "@/components/grid-modal/calculators-grid-hub";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const calculatorCount = getAllCalculatorMeta().length;

export const metadata: Metadata = createPageMetadata({
  title: "WattQuick — Battery & Power Calculators",
  description:
    "Professional battery, solar, EV, and power micro-calculators. Instant engineering-grade results with minimal inputs — free, no sign-up.",
  path: "",
});

export default function HomePage() {
  return (
    <div className="landing-page landing-page--grid-modal">
      <CalculatorsGridHub />
      <p className="sr-only">
        WattQuick offers {calculatorCount} free calculators for batteries, solar,
        EV charging, and electrical power.
      </p>
    </div>
  );
}
