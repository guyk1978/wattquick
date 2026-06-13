import type { CalculatorSlug } from "@/data/calculators";
import type { CalculatorContentSection } from "@/data/calculator-types";
import {
  getCalculatorDefinition,
  type CalculatorId,
} from "@/lib/calculators";

/**
 * Per-tool SEO content for the desktop Content Section.
 * Add one entry per calculator slug to inject unique copy.
 */
export const calculatorContent: Partial<
  Record<CalculatorSlug, CalculatorContentSection>
> = {
  "ah-to-wh": {
    title: "How to calculate Wh from Ah",
    formula:
      "Watt-hours (Wh) measure total energy stored in a battery. Multiply amp-hours (Ah) by nominal voltage (V): Wh = Ah × V. For example, 100 Ah at 12 V equals 1,200 Wh (1.2 kWh).",
    example:
      "A 100 Ah 12 V deep-cycle battery stores 1,200 Wh. Powering a 400 W load from that pack gives roughly 3 hours of runtime at full discharge — though real-world usable capacity is lower once depth of discharge and efficiency losses are accounted for.",
  },
};

export const CALCULATOR_CONTENT_HEADINGS = {
  formula: "The Formula",
  example: "Practical Example",
} as const;

/** Resolve content for a tool: custom entry first, then SEO metadata fallback. */
export function getCalculatorContentSection(
  id: CalculatorId
): CalculatorContentSection {
  const custom = calculatorContent[id];
  if (custom) return custom;

  const { title, description, seo } = getCalculatorDefinition(id);
  return {
    title: `How to use the ${title}`,
    formula: seo.sections[0]?.body ?? description,
    example:
      seo.sections[1]?.body ??
      `Enter your values in the calculator above for an instant ${title.toLowerCase()} result.`,
  };
}
