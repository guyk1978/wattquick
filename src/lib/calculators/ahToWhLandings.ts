import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const AH_TO_WH_TOOL_PATH =
  "/tools/unit-conversion/ah-to-wh/" as const;

export const AH_TO_WH_TOOL_HREF = getCalculatorHref("ah-to-wh", "convert");

const BASE_CALCULATOR_ID = "ah-to-wh" as const;

export type AhToWhLandingSlug =
  | "ah-to-wh-converter"
  | "calculate-watt-hours-from-amp-hours"
  | "battery-capacity-ah-to-wh-calculator";

export const AH_TO_WH_CONVERTER_LANDING_SLUG = "ah-to-wh-converter" as const;

export const CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG =
  "calculate-watt-hours-from-amp-hours" as const;

export const BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG =
  "battery-capacity-ah-to-wh-calculator" as const;

export const AH_TO_WH_LANDING_SLUGS = [
  AH_TO_WH_CONVERTER_LANDING_SLUG,
  CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG,
  BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly AhToWhLandingSlug[];

export const AH_TO_WH_CONVERTER_GUIDE_HREF = getGuideLandingHref(
  AH_TO_WH_CONVERTER_LANDING_SLUG
);

export const CALCULATE_WATT_HOURS_FROM_AMP_HOURS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG);

export const BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG);

export type AhToWhGuideDefinition = GuideLandingDefinition & {
  slug: AhToWhLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const AH_TO_WH_CONVERTER_CONTENT: GuideLandingContent = {
  metaDescription:
    "Ah to Wh converter: multiply amp-hours by battery voltage for watt-hours—compare packs fairly, size solar storage, and match Ah-rated banks to watt-based loads.",
  heroSubtitle:
    "Amp-hours alone do not tell you stored energy—voltage completes the picture. This guide walks through the Ah to Wh converter: capacity in Ah, nominal voltage, and watt-hours for apples-to-apples battery comparisons.",
  benefits: [
    "Core formula: Wh = Ah × V.",
    "Normalizes 12 V, 24 V, and 48 V packs to the same energy unit.",
    "First step before runtime, cost-per-Wh, and load-matching math.",
  ],
  howItWorks: [
    "Enter battery capacity in amp-hours (Ah) from the label or spec sheet.",
    "Add nominal voltage (12 V, 24 V, 48 V, 3.7 V per cell, etc.).",
    "Read watt-hours (Wh)—the energy number for cross-voltage comparisons.",
  ],
  faq: [
    {
      q: "How do I convert Ah to Wh?",
      a: "Wh = Ah × V. Example: 100 Ah at 12 V → 100 × 12 = 1,200 Wh. The same 100 Ah at 48 V is 4,800 Wh—four times the energy despite identical amp-hour ratings.",
    },
    {
      q: "Why convert amp-hours to watt-hours?",
      a: "Loads and inverters are often rated in watts; utilities and appliances use kWh. Wh is the common energy unit for comparing LiFePO4, AGM, and lithium packs at different voltages before runtime or cost math.",
    },
    {
      q: "Can I convert mAh to Wh?",
      a: "Yes—convert mAh to Ah first (÷ 1,000), then multiply by voltage. Example: 5,000 mAh at 3.7 V → 5 Ah × 3.7 V = 18.5 Wh. Phone and e-bike cells are usually quoted in mAh; Wh reveals true energy next to a 12 V bank.",
    },
  ],
  technicalSpecs: [
    "Wh = Ah × nominal_V.",
    "mAh → Ah: divide by 1,000.",
    "kWh = Wh ÷ 1,000.",
    "Related: ah-to-wh, wh-to-ah, battery-runtime, battery-cost.",
  ],
};

const AH_TO_WH_CONVERTER_GUIDE: AhToWhGuideDefinition = {
  slug: AH_TO_WH_CONVERTER_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: AH_TO_WH_CONVERTER_GUIDE_HREF,
  toolHref: AH_TO_WH_TOOL_HREF,
  guideLinkLabel: "Ah to Wh converter",
  title: "Ah to Wh Converter",
  description: AH_TO_WH_CONVERTER_CONTENT.metaDescription,
  keywords: [
    "ah to wh converter",
    "amp hours to watt hours",
    "ah wh battery calculator",
    "convert ah to wh",
    "battery energy converter",
  ],
  seo: {
    sections: [
      {
        heading: "Ah is charge; Wh is energy",
        body: "Amp-hours describe how much current a battery can deliver over time at a given voltage—but the voltage sets how much work that charge represents. A 200 Ah 12 V bank and a 50 Ah 48 V bank both store 2,400 Wh. Without multiplying by volts, the higher-Ah pack looks bigger when it is not.",
      },
      {
        heading: "Compare batteries on Wh, not Ah alone",
        body: "Retail listings love big amp-hour numbers at 12 V. Solar installers and EV packs often think in kilowatt-hours. Convert every candidate to Wh before runtime estimates, $/Wh cost checks, or inverter sizing. Enter each pack's Ah and V in the converter and sort by Wh—the ranking often flips what looked like a bargain on Ah.",
      },
      {
        heading: "Bridge Ah-rated banks to watt-based loads",
        body: "A 1,500 W inverter load needs energy in Wh, not Ah. Once you know bank Wh, divide by load watts for rough runtime hours (before efficiency and depth-of-discharge). Pair this converter with Battery Runtime or Wh to Ah when you are working backward from a watt-hour budget to required amp-hours at your bus voltage.",
      },
    ],
  },
  content: AH_TO_WH_CONVERTER_CONTENT,
};

const CALCULATE_WATT_HOURS_FROM_AMP_HOURS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate watt-hours from amp-hours: Wh = Ah × V step-by-step for any battery voltage—RV, solar, LiFePO4, and lithium packs before runtime and cost math.",
  heroSubtitle:
    "Watt-hours are not printed on every label—you derive them from amp-hours and voltage. This guide shows how to calculate watt-hours from amp-hours with the nominal volts your pack actually runs at.",
  benefits: [
    "Formula: Wh = Ah × nominal voltage.",
    "Works for 12 V AGM, 48 V solar, and 3.7 V lithium cells.",
    "Reverse check: Ah = Wh ÷ V when sizing from an energy target.",
  ],
  howItWorks: [
    "Read amp-hours from the battery nameplate or datasheet.",
    "Multiply by nominal system voltage—not peak charge voltage alone.",
    "Read watt-hours; divide by 1,000 for kWh on large banks.",
  ],
  faq: [
    {
      q: "How do I calculate watt-hours from amp-hours?",
      a: "Wh = Ah × V. Example: 280 Ah LiFePO4 at 12.8 V nominal → 280 × 12.8 = 3,584 Wh (3.584 kWh). Use the voltage the load sees during discharge, typically nominal pack voltage.",
    },
    {
      q: "Should I use fully charged or nominal voltage?",
      a: "Use nominal or average discharge voltage for energy estimates—12.8 V for LiFePO4 12 V packs, 12 V for lead-acid, 48 V for a 48 V nominal bus. Full-charge voltage overstates Wh slightly; nominal is standard for sizing comparisons.",
    },
    {
      q: "What if my spec only lists mAh?",
      a: "Convert to Ah first: mAh ÷ 1,000. Then Wh = Ah × V. A 10,000 mAh 11.1 V (3S) pack → 10 Ah × 11.1 V = 111 Wh. Same math, smaller numbers.",
    },
  ],
  technicalSpecs: [
    "Wh = Ah × nominal_V.",
    "kWh = (Ah × V) ÷ 1,000.",
    "Usable Wh ≈ rated Wh × depth_of_discharge.",
    "Related: ah-to-wh-converter, wh-to-ah, battery-bank-size.",
  ],
};

const CALCULATE_WATT_HOURS_FROM_AMP_HOURS_GUIDE: AhToWhGuideDefinition = {
  slug: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_GUIDE_HREF,
  toolHref: AH_TO_WH_TOOL_HREF,
  guideLinkLabel: "Calculate watt-hours from amp-hours",
  title: "Calculate Watt-Hours from Amp-Hours",
  description: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_CONTENT.metaDescription,
  keywords: [
    "calculate watt-hours from amp-hours",
    "ah to wh formula",
    "amp hours to watt hours calculation",
    "battery wh from ah",
    "how many wh in ah battery",
  ],
  seo: {
    sections: [
      {
        heading: "Multiply two numbers you already have",
        body: "Every deep-cycle label lists amp-hours. Your system architecture sets voltage—12 V RV, 24 V boat, 48 V off-grid. Watt-hours are the product. No lookup table required: 100 Ah × 12 V is always 1,200 Wh. The calculation is linear, so double Ah or double V and Wh doubles.",
      },
      {
        heading: "Pick the voltage that matches discharge",
        body: "A 12 V lead-acid bank spends most of its useful cycle near 12.0–12.6 V under load; LiFePO4 12 V packs nominal at 12.8 V. Using 14.4 V full-charge float inflates Wh versus what the inverter actually draws down. For conservative runtime, some planners use minimum discharge voltage—document your assumption when comparing quotes.",
      },
      {
        heading: "From Wh to actionable planning numbers",
        body: "Once Wh is calculated, divide by load watts for hours of runtime, or by $/Wh for pack cost. A 3,584 Wh bank feeding 400 W average load yields ~8.96 h before empty—before inverter loss and BMS cutoff. Calculate Wh from Ah first; every downstream battery spreadsheet starts there.",
      },
    ],
  },
  content: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_CONTENT,
};

const BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery capacity Ah to Wh calculator: convert nameplate amp-hours and system voltage to watt-hours—size RV, marine, and solar banks and compare LiFePO4 vs. AGM on equal energy.",
  heroSubtitle:
    "Battery shopping starts with capacity in amp-hours—but energy planning needs watt-hours. This guide walks through the battery capacity Ah to Wh calculator: rated Ah, bus voltage, and stored Wh for fair pack and bank comparisons.",
  benefits: [
    "Rated Wh = capacity Ah × nominal system voltage.",
    "Compare 12 V, 24 V, and parallel/series banks on one energy scale.",
    "Input for runtime, $/Wh cost, and inverter autonomy estimates.",
  ],
  howItWorks: [
    "Enter nameplate amp-hour capacity (per bank or single pack).",
    "Add nominal bus voltage your loads connect to.",
    "Read total watt-hours—use for cross-listing and bank sizing checks.",
  ],
  faq: [
    {
      q: "How do I convert battery capacity from Ah to Wh?",
      a: "Wh = Ah × V. Example: two 100 Ah 12 V batteries in parallel → 200 Ah × 12 V = 2,400 Wh bank. In series (same 100 Ah cells): 100 Ah × 24 V = still 2,400 Wh—Ah and V trade off but Wh stays the product.",
    },
    {
      q: "Does chemistry change the Ah to Wh formula?",
      a: "No—Wh = Ah × V regardless of LiFePO4, AGM, or lithium-ion. Chemistry affects usable depth-of-discharge and cycle life, not the conversion. Apply DoD after rated Wh: 1,200 Wh rated × 80% DoD ≈ 960 Wh usable.",
    },
    {
      q: "Why do retailers list Ah instead of Wh?",
      a: "Deep-cycle and starter batteries historically marketed amp-hours at a standard voltage—often 12 V or 20 hr rate. Wh makes cross-voltage shopping honest. Run every quote through Ah × V before comparing a 300 Ah 12 V deal to a 150 Ah 24 V rack.",
    },
  ],
  technicalSpecs: [
    "Bank Wh = total_Ah × bus_V.",
    "Parallel: Ah add, V unchanged. Series: V add, Ah unchanged.",
    "Usable Wh = rated Wh × DoD fraction.",
    "Related: battery-bank-size, battery-cost, wh-to-ah.",
  ],
};

const BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_GUIDE: AhToWhGuideDefinition = {
  slug: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_GUIDE_HREF,
  toolHref: AH_TO_WH_TOOL_HREF,
  guideLinkLabel: "Battery capacity Ah to Wh calculator",
  title: "Battery Capacity Ah to Wh Calculator",
  description: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "battery capacity ah to wh calculator",
    "battery ah to wh",
    "convert battery capacity to watt hours",
    "deep cycle ah wh calculator",
    "lifepo4 capacity wh",
  ],
  seo: {
    sections: [
      {
        heading: "Nameplate Ah is only half the capacity story",
        body: "A 400 Ah sticker at 12 V is 4,800 Wh. A 200 Ah sticker at 24 V is also 4,800 Wh—same energy, different wiring. Battery capacity Ah to Wh math exposes that parity before you buy four heavy 12 V boxes when two 24 V units would store identical energy with less parallel cabling.",
      },
      {
        heading: "Banks in series and parallel",
        body: "Parallel strings add amp-hours at constant voltage; series strings add voltage at constant amp-hours. Wh is conserved in both layouts when cell count and chemistry match. Enter the bank totals—not single cell specs—into the calculator. A 4×100 Ah 12 V parallel bank is 400 Ah × 12 V = 4,800 Wh; verify your BMS and inverter voltage match that bus.",
      },
      {
        heading: "From rated Wh to what you can actually use",
        body: "Rated Wh from Ah × V is the full tank; usable Wh depends on chemistry and BMS cutoff. LiFePO4 may safely deliver 80–90% of rated Wh; lead-acid often 50%. Multiply rated Wh by your planned DoD before runtime math. This calculator gives rated energy—the next step is Battery Bank Size or Runtime with your real discharge floor.",
      },
    ],
  },
  content: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<AhToWhLandingSlug, AhToWhGuideDefinition> = {
  [AH_TO_WH_CONVERTER_LANDING_SLUG]: AH_TO_WH_CONVERTER_GUIDE,
  [CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG]:
    CALCULATE_WATT_HOURS_FROM_AMP_HOURS_GUIDE,
  [BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG]:
    BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_GUIDE,
};

export const AH_TO_WH_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: AH_TO_WH_CONVERTER_LANDING_SLUG,
    href: AH_TO_WH_CONVERTER_GUIDE_HREF,
    label: "Ah to Wh Converter",
  },
  {
    slug: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_LANDING_SLUG,
    href: CALCULATE_WATT_HOURS_FROM_AMP_HOURS_GUIDE_HREF,
    label: "Calculate Watt-Hours from Amp-Hours",
  },
  {
    slug: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_LANDING_SLUG,
    href: BATTERY_CAPACITY_AH_TO_WH_CALCULATOR_GUIDE_HREF,
    label: "Battery Capacity Ah to Wh Calculator",
  },
];

export function isAhToWhLandingSlug(slug: string): slug is AhToWhLandingSlug {
  return (AH_TO_WH_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getAhToWhLanding(
  slug: AhToWhLandingSlug = AH_TO_WH_CONVERTER_LANDING_SLUG
): AhToWhGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllAhToWhLandings(): AhToWhGuideDefinition[] {
  return AH_TO_WH_LANDING_SLUGS.map((slug) => getAhToWhLanding(slug));
}

/** Static footer links derived from AH_TO_WH_FOOTER_RESOURCES. */
export function getAhToWhToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return AH_TO_WH_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as AH_TO_WH_CALCULATOR_ID };
