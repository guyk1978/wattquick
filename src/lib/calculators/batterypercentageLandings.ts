import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import {
  getGuideLandingHref,
} from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical guide slug — must match /landing/{slug}/ */
export type BatteryPercentageLandingSlug = "battery-percentage";

export const BATTERY_PERCENTAGE_LANDING_SLUG = "battery-percentage" as const;

export const BATTERY_PERCENTAGE_LANDING_SLUGS = [
  BATTERY_PERCENTAGE_LANDING_SLUG,
] as const satisfies readonly BatteryPercentageLandingSlug[];

export const BATTERY_PERCENTAGE_GUIDE_HREF = getGuideLandingHref(
  BATTERY_PERCENTAGE_LANDING_SLUG
);

const BASE_CALCULATOR_ID = "battery-percentage" as const;

export const BATTERY_PERCENTAGE_TOOL_HREF = getCalculatorHref(
  BASE_CALCULATOR_ID,
  "battery"
);

export type BatteryPercentageGuideDefinition = GuideLandingDefinition & {
  slug: BatteryPercentageLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_PERCENTAGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate battery charge percentage from current and rated capacity. IEC-aligned linear SoC formula for Li-ion, LiFePO₄, and lead-acid packs. Free, instant, no signup.",
  heroSubtitle:
    "Derive state-of-charge (SoC) as a precise percentage from measured capacity inputs. Built for engineers, installers, and fleet operators who need repeatable numbers—not guesswork.",
  benefits: [
    "Deterministic SoC output: (current charge ÷ rated capacity) × 100, capped at 100% with over-capacity flagging for QA review.",
    "Unit-consistent inputs (mAh or Ah) reduce field errors and align with datasheet ratings used in IEC 62619 and UN 38.3 pack documentation.",
    "Immediate ROI visibility: quantify usable energy before dispatch, maintenance windows, or warranty claims—no spreadsheets required.",
  ],
  howItWorks: [
    "Enter current charge and full rated capacity in the same unit (mAh or Ah).",
    "The calculator applies SoC% = (Q_current / Q_rated) × 100 and returns charge level to one decimal place.",
    "Review the detail line for capacity ratio and over-capacity warnings before logging results to your project or BOM.",
  ],
  faq: [
    {
      q: "How accurate is a linear battery charge percentage?",
      a: "Linear SoC is exact when both inputs share the same unit and rated capacity matches the manufacturer datasheet. Real BMS devices apply voltage curves and coulomb counting; this tool gives a baseline ratio for planning, commissioning, and cross-checking field measurements.",
    },
    {
      q: "Can I use this for lithium, lead-acid, and stationary storage?",
      a: "Yes. The formula is chemistry-agnostic. For warranty and compliance documentation, always pair SoC results with temperature, cycle count, and the applicable standard (e.g., IEC 62619 for industrial Li-ion, IEC 60896 for stationary lead-acid).",
    },
    {
      q: "Why does my phone show a different percentage?",
      a: "Consumer devices blend voltage lookup tables, usage history, and aging models. This calculator intentionally uses a transparent linear model so technical teams can reproduce the same figure across sites, shifts, and audit trails.",
    },
  ],
  technicalSpecs: [
    "Formula: SoC (%) = (Q_current ÷ Q_rated) × 100; result precision ±0.1%.",
    "Accepted inputs: positive numeric values; identical units required on both fields.",
    "Output: percentage (0–100%), capacity ratio detail string, over-capacity cap at 100% with advisory note.",
  ],
};

const BATTERY_PERCENTAGE_GUIDE: BatteryPercentageGuideDefinition = {
  slug: BATTERY_PERCENTAGE_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: BATTERY_PERCENTAGE_GUIDE_HREF,
  toolHref: BATTERY_PERCENTAGE_TOOL_HREF,
  guideLinkLabel: "Read the Guide",
  title: "Battery Charge Percentage Calculator",
  description: BATTERY_PERCENTAGE_CONTENT.metaDescription,
  keywords: [
    "battery charge percentage calculator",
    "battery percentage",
    "state of charge",
    "battery SoC calculator",
  ],
  seo: {
    sections: [
      {
        heading: "How battery percentage works",
        body: "Percentage = (current charge ÷ full capacity) × 100. Use the same unit for both values—milliamp-hours (mAh) or amp-hours (Ah).",
      },
      {
        heading: "Why estimates differ from your phone",
        body: "Devices estimate state-of-charge with voltage curves and usage history. This calculator gives a simple linear ratio useful for pack planning and quick checks.",
      },
    ],
  },
  content: BATTERY_PERCENTAGE_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  BatteryPercentageLandingSlug,
  BatteryPercentageGuideDefinition
> = {
  [BATTERY_PERCENTAGE_LANDING_SLUG]: BATTERY_PERCENTAGE_GUIDE,
};

/** Footer Resources entries — link to guide pages, not calculator tools. */
export const BATTERY_PERCENTAGE_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_PERCENTAGE_LANDING_SLUG,
      href: BATTERY_PERCENTAGE_GUIDE_HREF,
      label: "Battery Percentage Calculator",
    },
  ];

export function isBatteryPercentageLandingSlug(
  slug: string
): slug is BatteryPercentageLandingSlug {
  return (BATTERY_PERCENTAGE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryPercentageLanding(
  slug: BatteryPercentageLandingSlug = BATTERY_PERCENTAGE_LANDING_SLUG
): BatteryPercentageGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryPercentageLandings(): BatteryPercentageGuideDefinition[] {
  return BATTERY_PERCENTAGE_LANDING_SLUGS.map((slug) =>
    getBatteryPercentageLanding(slug)
  );
}
