import type {
  GuideLandingContent,
  GuideLandingDefinition,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

export type RemainingBatteryCapacityLandingSlug =
  "remaining-battery-capacity-percentage";

export const REMAINING_BATTERY_CAPACITY_LANDING_SLUG =
  "remaining-battery-capacity-percentage" as const;

export const REMAINING_BATTERY_CAPACITY_LANDING_SLUGS = [
  REMAINING_BATTERY_CAPACITY_LANDING_SLUG,
] as const satisfies readonly RemainingBatteryCapacityLandingSlug[];

export const REMAINING_BATTERY_CAPACITY_GUIDE_HREF = getGuideLandingHref(
  REMAINING_BATTERY_CAPACITY_LANDING_SLUG
);

const BASE_CALCULATOR_ID = "battery-percentage" as const;

export type RemainingBatteryCapacityGuideDefinition = GuideLandingDefinition & {
  slug: RemainingBatteryCapacityLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const REMAINING_BATTERY_CAPACITY_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate remaining battery capacity percentage from present charge and rated capacity. Linear SoC formula for Li-ion, LiFePO₄, and lead-acid—free, instant, no signup.",
  heroSubtitle:
    "Turn amp-hour or milliamp-hour readings into a clear remaining capacity percentage. Built for technicians, fleet operators, and storage engineers who need defensible SoC numbers before dispatch or maintenance.",
  benefits: [
    "Expresses leftover energy as a percentage: (remaining charge ÷ rated capacity) × 100—aligned with how BMS dashboards and warranty logs report state of charge.",
    "Works with any chemistry when you know present and full capacity in the same unit—ideal for cross-checking shunt readings, coulomb counters, or bench tests.",
    "Flags over-capacity inputs so QA teams catch unit mix-ups before they reach commissioning reports or customer handoffs.",
  ],
  howItWorks: [
    "Measure or estimate the remaining charge stored in the pack (mAh or Ah).",
    "Enter the manufacturer-rated full capacity in the same unit.",
    "The tool returns remaining capacity percentage to one decimal place, with ratio detail for your audit trail.",
  ],
  faq: [
    {
      q: "What is remaining battery capacity percentage?",
      a: "It is the fraction of rated capacity still available, expressed as a percent. If a 100 Ah pack holds 72 Ah, remaining capacity is 72%. This is equivalent to state-of-charge (SoC) when rated capacity matches the nameplate value.",
    },
    {
      q: "How is this different from a voltage-based SoC estimate?",
      a: "Capacity-percent methods use charge quantities (Ah/mAh). Voltage curves infer SoC from open-circuit voltage and temperature. Use capacity percentage when you have trusted coulomb data; use voltage guides when the pack has been at rest and OEM OCV tables are available.",
    },
    {
      q: "Should I derate capacity for aged cells?",
      a: "Yes for accurate remaining energy. Replace the rated capacity input with your aged capacity estimate (e.g., after cycle-life testing) so the percentage reflects usable charge versus present pack capability, not the original datasheet figure.",
    },
  ],
  technicalSpecs: [
    "Formula: remaining capacity (%) = (Q_remaining ÷ Q_rated) × 100; clamped 0–100%.",
    "Inputs: positive numeric values; Q_remaining and Q_rated must share the same unit (mAh or Ah).",
    "Output: percentage to ±0.1%, capacity ratio detail string, over-capacity advisory when Q_remaining > Q_rated.",
    "Reference: pairs with IEC 62619 pack documentation and field coulomb-counting validation workflows.",
  ],
};

const REMAINING_BATTERY_CAPACITY_GUIDE: RemainingBatteryCapacityGuideDefinition = {
  slug: REMAINING_BATTERY_CAPACITY_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: REMAINING_BATTERY_CAPACITY_GUIDE_HREF,
  toolHref: getCalculatorHref(BASE_CALCULATOR_ID, "battery"),
  guideLinkLabel: "Calculate remaining battery capacity percentage",
  title: "Calculate Remaining Battery Capacity Percentage",
  description: REMAINING_BATTERY_CAPACITY_CONTENT.metaDescription,
  keywords: [
    "calculate remaining battery capacity percentage",
    "remaining battery capacity",
    "battery capacity percentage",
    "remaining charge percentage",
    "battery SoC from capacity",
  ],
  seo: {
    sections: [
      {
        heading: "Remaining charge vs. rated nameplate",
        body: "Remaining capacity percentage answers a simple question: how much of the rated bucket is still full? It does not, by itself, account for temperature, Peukert effect, or internal resistance—pair results with load tests when sizing runtime-critical applications.",
      },
      {
        heading: "When to recalculate after partial cycles",
        body: "After shallow cycles, remaining percentage from coulomb counting tracks well. After long storage or deep discharge, verify against a full charge/discharge benchmark or BMS calibration routine so drift does not accumulate in fleet logs.",
      },
    ],
  },
  content: REMAINING_BATTERY_CAPACITY_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  RemainingBatteryCapacityLandingSlug,
  RemainingBatteryCapacityGuideDefinition
> = {
  [REMAINING_BATTERY_CAPACITY_LANDING_SLUG]: REMAINING_BATTERY_CAPACITY_GUIDE,
};

export function isRemainingBatteryCapacityLandingSlug(
  slug: string
): slug is RemainingBatteryCapacityLandingSlug {
  return (REMAINING_BATTERY_CAPACITY_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getRemainingBatteryCapacityLanding(
  slug: RemainingBatteryCapacityLandingSlug = REMAINING_BATTERY_CAPACITY_LANDING_SLUG
): RemainingBatteryCapacityGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllRemainingBatteryCapacityLandings(): RemainingBatteryCapacityGuideDefinition[] {
  return REMAINING_BATTERY_CAPACITY_LANDING_SLUGS.map((slug) =>
    getRemainingBatteryCapacityLanding(slug)
  );
}
