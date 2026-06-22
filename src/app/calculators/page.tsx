import type { Metadata } from "next";
import { CalculatorsBlueprintPage } from "@/components/calculators/calculators-blueprint-page";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const calculators = getAllCalculatorMeta();

const activeCategoryCount = CATEGORY_DISPLAY_ORDER.filter((cat) =>
  calculators.some((c) => c.category === cat)
).length;

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description: `Browse ${calculators.length} free battery, solar, EV, and power micro-calculators. Featured spotlight, recent history, and the full tool directory.`,
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <CalculatorsBlueprintPage
      allIds={[...CALCULATOR_SLUGS]}
      calculatorCount={calculators.length}
      categoryCount={activeCategoryCount}
    />
  );
}
