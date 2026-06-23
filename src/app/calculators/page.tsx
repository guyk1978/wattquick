import type { Metadata } from "next";
import { CalculatorsBlueprintPage } from "@/components/calculators/calculators-blueprint-page";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const calculators = getAllCalculatorMeta();

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description: `Browse ${calculators.length} free battery, solar, EV, and power micro-calculators. Featured spotlight, recent history, and the full tool directory.`,
  path: "/calculators",
});

export default function CalculatorsPage() {
  return <CalculatorsBlueprintPage allIds={[...CALCULATOR_SLUGS]} />;
}
