import type { ComponentType } from "react";
import type { CalculatorCategory } from "@/data/calculator-types";
import { ConvertCalculatorsGuideIllustration } from "@/components/category/visual-guides/convert-calculators-guide-illustration";

export interface CategoryVisualGuideConfig {
  categoryTitle: string;
  caption: string;
  Illustration: ComponentType<{ className?: string }>;
}

export const CATEGORY_VISUAL_GUIDES: Partial<
  Record<CalculatorCategory, CategoryVisualGuideConfig>
> = {
  convert: {
    categoryTitle: "Convert Calculators",
    caption:
      "Each converter follows the same pattern: enter the source quantity and any required context (voltage for Ah↔Wh, power factor for kVA↔kW), apply the physical formula, and read the target unit. Battery energy uses Wh = Ah × V; AC real power uses kW = kVA × PF; mechanical power uses HP = kW × 1.341. All formulas run in reverse for the opposite direction.",
    Illustration: ConvertCalculatorsGuideIllustration,
  },
};

export function hasCategoryVisualGuide(category: CalculatorCategory): boolean {
  return category in CATEGORY_VISUAL_GUIDES;
}
