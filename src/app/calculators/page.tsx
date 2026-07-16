import type { Metadata } from "next";
import { CalculatorsGridHub } from "@/components/grid-modal/calculators-grid-hub";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const calculators = getAllCalculatorMeta();

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description: `Browse ${calculators.length} free battery, solar, EV, and power micro-calculators by category.`,
  path: "/calculators",
});

export default function CalculatorsPage() {
  return <CalculatorsGridHub />;
}
