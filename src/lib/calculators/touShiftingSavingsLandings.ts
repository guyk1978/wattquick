import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const TOU_SHIFTING_SAVINGS_TOOL_PATH =
  "/tools/time-of-use-rates/tou-shifting-savings/" as const;

export const TOU_SHIFTING_SAVINGS_TOOL_HREF = getCalculatorHref(
  "tou-shifting-savings",
  "tou"
);

const BASE_CALCULATOR_ID = "tou-shifting-savings" as const;

export type TouShiftingSavingsLandingSlug =
  | "time-of-use-electricity-savings-calculator"
  | "calculate-savings-from-peak-load-shifting"
  | "peak-vs-off-peak-energy-cost-calculator";

export const TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG =
  "time-of-use-electricity-savings-calculator" as const;

export const CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG =
  "calculate-savings-from-peak-load-shifting" as const;

export const PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG =
  "peak-vs-off-peak-energy-cost-calculator" as const;

export const TOU_SHIFTING_SAVINGS_LANDING_SLUGS = [
  TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG,
  CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG,
  PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly TouShiftingSavingsLandingSlug[];

export const TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG);

export const CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG);

export const PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG);

export type TouShiftingSavingsGuideDefinition = GuideLandingDefinition & {
  slug: TouShiftingSavingsLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Time of use electricity savings calculator: estimate monthly and annual dollars from shifting kWh from peak to off-peak rates—EV charging, laundry, and dishwasher load shifting math.",
  heroSubtitle:
    "Time-of-use tariffs reward moving flexible loads out of expensive peak hours. This guide walks through the time of use electricity savings calculator: shiftable kWh per month, peak $/kWh, off-peak $/kWh, and the spread that becomes real bill savings.",
  benefits: [
    "Simple formula: monthly savings = shiftable kWh × (peak rate − off-peak rate).",
    "Annual savings line scales monthly results for budget and ROI decisions.",
    "Energy-rate only—no demand charges—so results match residential TOU shifting.",
  ],
  howItWorks: [
    "Estimate how many kWh per month you can move from peak to off-peak windows.",
    "Enter your utility peak and off-peak $/kWh from the rate schedule.",
    "Read monthly and annual savings plus the $/kWh spread driving the result.",
  ],
  faq: [
    {
      q: "How do I calculate time-of-use electricity savings?",
      a: "Monthly savings ≈ shiftable kWh × (peak $/kWh − off-peak $/kWh). Example: 350 kWh/mo moved from $0.42 peak to $0.11 off-peak → spread $0.31/kWh → 350 × 0.31 ≈ $108.50/mo (~$1,302/yr). Only count kWh you can realistically reschedule.",
    },
    {
      q: "What loads are good candidates for TOU shifting?",
      a: "EV charging, dishwashers, clothes dryers, pool pumps, and water-heater timers are common shift targets. Fixed loads—refrigerators, always-on networking—stay wherever they run. Sum flexible kWh from smart plugs or interval data when you have it.",
    },
    {
      q: "Does this include demand charges or flat-rate comparison?",
      a: "No—this tool isolates energy-rate savings from moving kWh between TOU periods. Commercial demand charges and flat vs. TOU plan choice are separate calculators. Use this when you are already on TOU and want dollars from behavior change.",
    },
  ],
  technicalSpecs: [
    "Savings per kWh = peak_rate − off_peak_rate (≥ 0).",
    "Monthly savings = shiftable_kWh × savings_per_kWh.",
    "Annual savings ≈ monthly_savings × 12.",
    "Related: tou-shifting-savings, peak-shaving-potential, electricity-rate-plan.",
  ],
};

const TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_GUIDE: TouShiftingSavingsGuideDefinition =
  {
    slug: TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_GUIDE_HREF,
    toolHref: TOU_SHIFTING_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Time of use electricity savings calculator",
    title: "Time of Use Electricity Savings Calculator",
    description:
      TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "time of use electricity savings calculator",
      "tou savings calculator",
      "peak off peak savings",
      "load shifting savings calculator",
      "time of use rate savings",
    ],
    seo: {
      sections: [
        {
          heading: "The spread is the whole story",
          body: "TOU savings are not mystical—they are kWh moved across a price gap. A wide peak-to-off-peak spread with many shiftable kWh prints large monthly dollars. A narrow spread or mostly fixed load prints small savings even on the same tariff. Enter real rates from your bill rider, not a national average.",
        },
        {
          heading: "Shiftable kWh is a habit number",
          body: "Do not count every monthly kWh as movable. Refrigerators and baseline HVAC stay put. EV charging from 11 p.m. to 6 a.m., delayed dishwasher starts, and laundry after 9 p.m. are the numerator. Underestimate first, then add kWh as automations prove out—optimistic shifting math disappoints on the first real bill.",
        },
        {
          heading: "Annual line funds automation",
          body: "A $90/month TOU win is $1,080/year—enough to justify a smart EV charger schedule, timer plugs, or a few hours wiring a load controller. The calculator’s annual savings line turns behavior into a budget line item so peak shaving competes fairly with bulb swaps and insulation on payback.",
        },
      ],
    },
    content: TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_CONTENT,
  };

const CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate savings from peak load shifting: move flexible kWh off expensive peak periods to off-peak rates and see monthly and annual bill reductions—step-by-step TOU peak shaving math.",
  heroSubtitle:
    "Peak load shifting is scheduling flexible electricity use away from high-rate windows. This guide shows how to calculate savings from peak load shifting with shiftable monthly kWh, peak vs. off-peak tariffs, and the dollar spread per shifted kilowatt-hour.",
  benefits: [
    "Quantifies peak shaving as kWh removed from the peak rate block.",
    "Monthly savings = shifted kWh × (peak $/kWh − off-peak $/kWh).",
    "Pairs with EV, laundry, and pool-pump scheduling for realistic shift targets.",
  ],
  howItWorks: [
    "Identify kWh per month that currently run during peak hours but could move.",
    "Enter peak and off-peak $/kWh from your utility TOU schedule.",
    "Multiply shifted kWh by the rate spread for monthly and annual savings.",
  ],
  faq: [
    {
      q: "How do I calculate savings from peak load shifting?",
      a: "Savings per shifted kWh = peak $/kWh − off-peak $/kWh. Monthly savings = shiftable kWh × that spread. Example: 280 kWh/mo moved off a $0.38 peak block to $0.12 off-peak → $0.26/kWh spread → 280 × 0.26 ≈ $72.80/mo (~$874/yr). Count only kWh you will actually reschedule.",
    },
    {
      q: "What is peak load shifting vs. peak shaving?",
      a: "Peak load shifting moves the same energy to a cheaper time slot—total kWh stays similar, but fewer kWh bill at peak rates. Peak shaving can also mean lowering instantaneous demand (kW) for commercial demand charges. This calculator focuses on energy-rate shifting between TOU periods.",
    },
    {
      q: "How much load can I realistically shift off peak?",
      a: "Start with discretionary loads: EV charging (often 200–400 kWh/mo), dishwasher and dryer cycles, pool pumps, and water-heater elements. Smart plugs or interval meter data help estimate peak-hour kWh. Fixed baseload—fridges, routers—usually stays put.",
    },
  ],
  technicalSpecs: [
    "Rate spread = peak_rate − off_peak_rate.",
    "Shifted monthly savings = shiftable_kWh × rate_spread.",
    "Annual savings ≈ monthly_savings × 12.",
    "Related: time-of-use-electricity-savings-calculator, peak-shaving-potential.",
  ],
};

const CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_GUIDE: TouShiftingSavingsGuideDefinition =
  {
    slug: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_GUIDE_HREF,
    toolHref: TOU_SHIFTING_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Calculate savings from peak load shifting",
    title: "Calculate Savings from Peak Load Shifting",
    description: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_CONTENT.metaDescription,
    keywords: [
      "calculate savings from peak load shifting",
      "peak load shifting savings",
      "peak shaving savings calculator",
      "shift load off peak savings",
      "tou peak shifting calculator",
    ],
    seo: {
      sections: [
        {
          heading: "Peak hours are a price zone, not a mystery",
          body: "Your utility publishes when peak rates apply—often late afternoon through evening. Peak load shifting means running the same dishwasher or EV charge outside that window. Savings are the kWh that leave the expensive zone multiplied by the rate gap. No magic, just scheduling against the tariff clock.",
        },
        {
          heading: "Build shiftable kWh from named appliances",
          body: "List flexible loads with monthly kWh: EV at 12 kWh/night × 22 nights, dryer at 3 kWh × 12 runs, pool pump at 1.5 kW × 4 h × 20 days. Sum only the portion currently on peak. That inventory becomes the shiftable kWh input—concrete beats guessing half your bill is movable.",
        },
        {
          heading: "Automation turns one-time math into recurring savings",
          body: "Calculated savings assume the shift repeats every month. A one-off laundry change does not print $70 forever—charger schedules, utility rate apps, and timer plugs do. Use the annual line to compare against a $50 smart switch or free EV schedule before buying hardware.",
        },
      ],
    },
    content: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_CONTENT,
  };

const PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Peak vs off-peak energy cost calculator: compare $/kWh between peak and off-peak TOU blocks, see the rate spread, and estimate monthly savings when you shift flexible loads to cheaper hours.",
  heroSubtitle:
    "The same kilowatt-hour costs different dollars depending on the clock. This guide walks through the peak vs off-peak energy cost calculator—peak rate, off-peak rate, shiftable kWh, and how the spread converts into monthly and annual bill savings.",
  benefits: [
    "Side-by-side peak and off-peak $/kWh with the savings spread per shifted kWh.",
    "Cost comparison: what the same kWh costs on peak vs. off-peak before shifting.",
    "Monthly and annual savings when flexible load moves to the cheaper block.",
  ],
  howItWorks: [
    "Look up peak and off-peak energy rates ($/kWh) on your utility TOU schedule.",
    "Note how many kWh per month you can run during off-peak instead of peak.",
    "Apply savings = shiftable kWh × (peak rate − off-peak rate) for bill impact.",
  ],
  faq: [
    {
      q: "How do I compare peak vs off-peak energy cost?",
      a: "Subtract off-peak $/kWh from peak $/kWh to get the spread. Example: $0.45 peak vs. $0.13 off-peak → $0.32/kWh spread. One kWh on peak costs $0.45; the same kWh off-peak costs $0.13—a $0.32 difference per kWh shifted. Multiply the spread by monthly shiftable kWh for savings.",
    },
    {
      q: "Why is peak electricity more expensive than off-peak?",
      a: "Utilities price peak hours when grid demand is highest—generation and transmission are stressed. Off-peak nights and mid-day solar-heavy windows often have surplus supply, so rates drop to encourage load shifting. TOU tariffs pass that price signal to your bill.",
    },
    {
      q: "Can I use this for shoulder or mid-peak rates?",
      a: "This tool models a two-block peak vs. off-peak spread—the core TOU comparison. If your tariff has shoulder periods, use the highest rate you are shifting away from as peak, or try the electricity rate plan calculator for three-tier splits.",
    },
  ],
  technicalSpecs: [
    "Peak energy cost = peak_kWh × peak_rate.",
    "Off-peak energy cost = off_peak_kWh × off_peak_rate.",
    "Savings per shifted kWh = peak_rate − off_peak_rate.",
    "Related: calculate-savings-from-peak-load-shifting, electricity-rate-plan.",
  ],
};

const PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_GUIDE: TouShiftingSavingsGuideDefinition =
  {
    slug: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_GUIDE_HREF,
    toolHref: TOU_SHIFTING_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Peak vs off-peak energy cost calculator",
    title: "Peak vs Off-Peak Energy Cost Calculator",
    description: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "peak vs off-peak energy cost calculator",
      "peak off peak rate comparison",
      "tou peak off peak cost",
      "compare peak and off peak electricity rates",
      "off peak vs peak kwh cost",
    ],
    seo: {
      sections: [
        {
          heading: "Two prices for the same electron",
          body: "A kilowatt-hour is a kilowatt-hour—but your tariff tags it with a time stamp. Running a 3 kWh dryer cycle at 6 p.m. on a $0.44 peak block costs about $1.32; the same cycle at 10 p.m. on $0.12 off-peak costs $0.36. The peak vs off-peak gap is why scheduling matters more than buying a slightly more efficient dryer.",
        },
        {
          heading: "Spread × shiftable kWh = your savings budget",
          body: "Wide spreads reward aggressive shifting; narrow spreads reward patience or staying on flat rate. Enter your actual rider rates—not a blog average—and honest shiftable kWh. The calculator multiplies the two; if the product looks small, the fix is either more movable load or a tariff change, not fancier math.",
        },
        {
          heading: "Read the bill in blocks, not blends",
          body: "Blended $/kWh on a summary line hides peak pain. Interval data or utility apps show kWh by period. Once you see 180 kWh on peak last month, multiply by your peak rate and compare to what those kWh would cost off-peak—that before/after picture motivates timers better than a generic save-money tip.",
        },
      ],
    },
    content: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  TouShiftingSavingsLandingSlug,
  TouShiftingSavingsGuideDefinition
> = {
  [TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG]:
    TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_GUIDE,
  [CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG]:
    CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_GUIDE,
  [PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG]:
    PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_GUIDE,
};

export const TOU_SHIFTING_SAVINGS_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG,
      href: TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_GUIDE_HREF,
      label: "Time of Use Electricity Savings Calculator",
    },
    {
      slug: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_LANDING_SLUG,
      href: CALCULATE_SAVINGS_FROM_PEAK_LOAD_SHIFTING_GUIDE_HREF,
      label: "Calculate Savings from Peak Load Shifting",
    },
    {
      slug: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_LANDING_SLUG,
      href: PEAK_VS_OFF_PEAK_ENERGY_COST_CALCULATOR_GUIDE_HREF,
      label: "Peak vs Off-Peak Energy Cost Calculator",
    },
  ];

export function isTouShiftingSavingsLandingSlug(
  slug: string
): slug is TouShiftingSavingsLandingSlug {
  return (TOU_SHIFTING_SAVINGS_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getTouShiftingSavingsLanding(
  slug: TouShiftingSavingsLandingSlug = TIME_OF_USE_ELECTRICITY_SAVINGS_CALCULATOR_LANDING_SLUG
): TouShiftingSavingsGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllTouShiftingSavingsLandings(): TouShiftingSavingsGuideDefinition[] {
  return TOU_SHIFTING_SAVINGS_LANDING_SLUGS.map((slug) =>
    getTouShiftingSavingsLanding(slug)
  );
}

/** Static footer links derived from TOU_SHIFTING_SAVINGS_FOOTER_RESOURCES. */
export function getTouShiftingSavingsToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return TOU_SHIFTING_SAVINGS_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as TOU_SHIFTING_SAVINGS_CALCULATOR_ID };
