import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const WHOLE_HOUSE_ENERGY_BUDGET_TOOL_PATH =
  "/tools/home-appliances/whole-house-energy-budget/" as const;

export const WHOLE_HOUSE_ENERGY_BUDGET_TOOL_HREF = getCalculatorHref(
  "whole-house-energy-budget",
  "appliance"
);

const BASE_CALCULATOR_ID = "whole-house-energy-budget" as const;

export type WholeHouseEnergyBudgetLandingSlug =
  | "whole-house-energy-budget-calculator"
  | "calculate-home-electricity-usage-by-category"
  | "estimate-monthly-and-annual-electricity-costs";

export const WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG =
  "whole-house-energy-budget-calculator" as const;

export const CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG =
  "calculate-home-electricity-usage-by-category" as const;

export const ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG =
  "estimate-monthly-and-annual-electricity-costs" as const;

export const WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS = [
  WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG,
  CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG,
  ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG,
] as const satisfies readonly WholeHouseEnergyBudgetLandingSlug[];

export const WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG);

export const ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG);

export type WholeHouseEnergyBudgetGuideDefinition = GuideLandingDefinition & {
  slug: WholeHouseEnergyBudgetLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Whole house energy budget calculator: sum daily kWh by HVAC, water heating, kitchen, laundry, and other loads—then estimate monthly and annual electricity cost. Free home energy planning tool.",
  heroSubtitle:
    "A useful home energy budget starts with category-level kWh, not a single guess at the total bill. This guide walks through the whole house energy budget calculator before you size solar, compare tariffs, or chase standby loads.",
  benefits: [
    "Splits daily use into HVAC, water heater, kitchen, laundry, and other—mirroring how bills actually stack up.",
    "Converts daily kWh to monthly and annual cost with your $/kWh rate in one pass.",
    "Pairs with vampire-power and appliance-cost tools to refine the “other” category.",
  ],
  howItWorks: [
    "Estimate daily kWh for each major category (climate, hot water, cooking, laundry, lights/EV/electronics).",
    "Enter your blended or average electricity rate in $/kWh.",
    "Review daily kWh total, monthly kWh, and monthly/annual dollar cost.",
  ],
  faq: [
    {
      q: "How do I build a whole house energy budget?",
      a: "Assign kWh/day to each load group. Example: HVAC 25 + water heater 12 + kitchen 8 + laundry 3 + other 10 = 58 kWh/day. At $0.14/kWh that is about $243/month (58 × 30 × 0.14). Adjust categories for gas heat or absent AC.",
    },
    {
      q: "What is a typical home daily kWh?",
      a: "U.S. averages often fall between 25–35 kWh/day, but climate, EV charging, and pool pumps swing totals widely. Use 12 months of utility data when available instead of national averages alone.",
    },
    {
      q: "Should I use one rate or time-of-use blocks?",
      a: "Start with a blended $/kWh from your bill (total cost ÷ total kWh). For TOU tariffs, rerun with weighted peak/off-peak rates once category kWh is known—or shift flexible loads to cheaper blocks.",
    },
  ],
  technicalSpecs: [
    "Daily kWh = HVAC + water heater + kitchen + laundry + other.",
    "Monthly kWh ≈ daily kWh × 30; annual kWh ≈ daily kWh × 365.",
    "Monthly cost = monthly kWh × $/kWh; annual cost = annual kWh × $/kWh.",
    "Related: vampire-power-cost, electricity-bill, appliance-monthly-energy.",
  ],
};

const WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_GUIDE: WholeHouseEnergyBudgetGuideDefinition =
  {
    slug: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_GUIDE_HREF,
    toolHref: WHOLE_HOUSE_ENERGY_BUDGET_TOOL_HREF,
    guideLinkLabel: "Whole house energy budget calculator",
    title: "Whole House Energy Budget Calculator",
    description: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "whole house energy budget calculator",
      "home energy budget calculator",
      "monthly electricity budget calculator",
      "home kwh estimate",
      "annual electricity cost estimate",
    ],
    seo: {
      sections: [
        {
          heading: "Category buckets beat one big number",
          body: "HVAC and water heating dominate many homes; kitchen and laundry spike on schedule; “other” hides EV chargers, always-on electronics, and lighting. Splitting kWh by category makes errors visible—you can reconcile each bucket against a submeter, bill segment, or smart-plug audit.",
        },
        {
          heading: "From budget to action",
          body: "Once daily kWh is credible, compare against solar yield tools, battery backup sizing, or tariff optimizers. A 10% reduction in HVAC kWh or shifting EV kWh to off-peak blocks shows up directly in the monthly cost line this calculator produces.",
        },
      ],
    },
    content: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_CONTENT,
  };

const CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate home electricity usage by category: estimate daily kWh for HVAC, water heating, kitchen, laundry, and other loads—then roll up monthly and annual use and cost.",
    heroSubtitle:
      "Your utility bill is one number; your home is five or six load groups. This guide shows how to calculate electricity usage by category before you prioritize upgrades, shift schedules, or size solar.",
    benefits: [
      "Maps common household loads to five editable kWh/day buckets.",
      "Totals daily kWh transparently—easy to cross-check against a smart meter or bill.",
      "Extends category kWh to monthly/annual energy and cost at your $/kWh rate.",
    ],
    howItWorks: [
      "Assign daily kWh to HVAC, water heater, kitchen, laundry, and other (EV, lighting, standby).",
      "Sum categories for total daily kWh; compare to average home benchmarks or your meter.",
      "Apply your electricity rate to see monthly and annual dollar impact per category share.",
    ],
    faq: [
      {
        q: "How do I calculate home electricity usage by category?",
        a: "Estimate kWh/day per load group. Example: HVAC 20, water heater 14, kitchen 6, laundry 4, other 12 → 56 kWh/day total. Each category’s share is its kWh ÷ total—kitchen is about 11% in this example.",
      },
      {
        q: "Which category uses the most electricity?",
        a: "In many climates HVAC is largest; electric water heaters and EV charging in “other” can rival it. Category math reveals where audits pay off—don't assume the bill is evenly spread.",
      },
      {
        q: "What goes in the “other” category?",
        a: "Lighting, electronics, home office, pool pumps, EV charging, and standby loads. Use a vampire-power audit or plug meters to refine “other” instead of leaving it as a catch-all guess.",
      },
    ],
    technicalSpecs: [
      "Categories: HVAC, water heater, kitchen, laundry, other (kWh/day each).",
      "Total daily kWh = sum of category inputs.",
      "Monthly kWh ≈ total daily × 30; cost = kWh × $/kWh.",
      "Validation: compare total to utility bill kWh ÷ days in period.",
    ],
  };

const CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_GUIDE: WholeHouseEnergyBudgetGuideDefinition =
  {
    slug: CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_GUIDE_HREF,
    toolHref: WHOLE_HOUSE_ENERGY_BUDGET_TOOL_HREF,
    guideLinkLabel: "Calculate home electricity usage by category",
    title: "Calculate Home Electricity Usage by Category",
    description:
      CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_CONTENT.metaDescription,
    keywords: [
      "calculate home electricity usage by category",
      "home electricity by category",
      "kwh by load category",
      "hvac kitchen laundry kwh estimate",
      "break down home energy use",
    ],
    seo: {
      sections: [
        {
          heading: "Why categories matter",
          body: "A single monthly kWh figure cannot tell you whether to tune the thermostat, replace the water heater, or add panel capacity for an EV. Category breakdowns turn the bill into actionable slices—each with its own duty cycle and upgrade path.",
        },
        {
          heading: "Reconciling with the meter",
          body: "After estimating categories, compare the sum to whole-home meter data for the same season. If totals diverge by more than 10–15%, revisit the largest bucket first—usually HVAC or water heating—or expand “other” with plug-level measurements.",
        },
      ],
    },
    content: CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_CONTENT,
  };

const ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Estimate monthly and annual electricity costs from daily kWh by category and your $/kWh rate. Plan home budgets, compare tariffs, and sanity-check utility bills.",
    heroSubtitle:
      "Daily kWh is the input; monthly and annual dollars are what you pay. This guide shows how to estimate electricity costs over a month and a full year from category-level use and your utility rate.",
    benefits: [
      "Rolls daily category kWh into monthly (~×30) and annual (~×365) totals automatically.",
      "Applies your $/kWh rate to produce monthly and yearly cost in one view.",
      "Useful for budgeting, solar payback checks, and before/after upgrade comparisons.",
    ],
    howItWorks: [
      "Enter daily kWh for HVAC, water heating, kitchen, laundry, and other loads.",
      "Set your electricity rate—blended average or seasonal estimate from recent bills.",
      "Read monthly kWh, annual kWh, monthly cost, and annual cost from the calculator output.",
    ],
    faq: [
      {
        q: "How do I estimate monthly electricity cost?",
        a: "Sum daily kWh across categories, multiply by ~30 for monthly kWh, then multiply by $/kWh. Example: 55 kWh/day → ~1,650 kWh/month; at $0.15/kWh that is about $248/month before fixed utility charges.",
      },
      {
        q: "How do I estimate annual electricity cost?",
        a: "Annual kWh ≈ daily kWh × 365; annual cost ≈ annual kWh × rate. Seasonal HVAC swings mean a single winter-week estimate can under- or over-shoot—use category kWh tuned to each season when precision matters.",
      },
      {
        q: "Does this include taxes and fixed fees?",
        a: "The calculator shows energy charges (kWh × rate). Customer charges, demand fees, and taxes are added on your bill separately—treat this result as the variable energy portion you can shift with efficiency or load scheduling.",
      },
    ],
    technicalSpecs: [
      "Monthly kWh ≈ daily kWh × 30; monthly cost = monthly kWh × $/kWh.",
      "Annual kWh ≈ daily kWh × 365; annual cost = annual kWh × $/kWh.",
      "Inputs: five category kWh/day fields + positive rate.",
      "Related: electricity-bill, appliance-monthly-energy, solar-payback-roi.",
    ],
  };

const ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_GUIDE: WholeHouseEnergyBudgetGuideDefinition =
  {
    slug: ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_GUIDE_HREF,
    toolHref: WHOLE_HOUSE_ENERGY_BUDGET_TOOL_HREF,
    guideLinkLabel: "Estimate monthly and annual electricity costs",
    title: "Estimate Monthly and Annual Electricity Costs",
    description:
      ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_CONTENT.metaDescription,
    keywords: [
      "estimate monthly and annual electricity costs",
      "monthly electricity cost estimate",
      "annual home electricity cost",
      "kwh to monthly bill calculator",
      "yearly power bill estimate",
    ],
    seo: {
      sections: [
        {
          heading: "Monthly vs. annual framing",
          body: "Budgeting and bill shock usually happen on a monthly cadence; solar ROI and efficiency upgrades often compare annual totals. The same daily kWh model feeds both—monthly uses a 30-day factor for quick planning, annual uses 365 for long-range comparisons.",
        },
        {
          heading: "Rate assumptions matter",
          body: "A single blended $/kWh works for first-pass estimates. If your tariff has summer/winter tiers or time-of-use blocks, rerun with the rate that applies to most of your kWh in each season—or weight peak and off-peak separately once category schedules are known.",
        },
      ],
    },
    content: ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  WholeHouseEnergyBudgetLandingSlug,
  WholeHouseEnergyBudgetGuideDefinition
> = {
  [WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG]:
    WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_GUIDE,
  [CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG]:
    CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_GUIDE,
  [ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG]:
    ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_GUIDE,
};

export const WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG,
      href: WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_GUIDE_HREF,
      label: "Whole House Energy Budget Calculator",
    },
    {
      slug: CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_LANDING_SLUG,
      href: CALCULATE_HOME_ELECTRICITY_USAGE_BY_CATEGORY_GUIDE_HREF,
      label: "Calculate Home Electricity Usage by Category",
    },
    {
      slug: ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_LANDING_SLUG,
      href: ESTIMATE_MONTHLY_AND_ANNUAL_ELECTRICITY_COSTS_GUIDE_HREF,
      label: "Estimate Monthly and Annual Electricity Costs",
    },
  ];

export function isWholeHouseEnergyBudgetLandingSlug(
  slug: string
): slug is WholeHouseEnergyBudgetLandingSlug {
  return (WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getWholeHouseEnergyBudgetLanding(
  slug: WholeHouseEnergyBudgetLandingSlug = WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_LANDING_SLUG
): WholeHouseEnergyBudgetGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllWholeHouseEnergyBudgetLandings(): WholeHouseEnergyBudgetGuideDefinition[] {
  return WHOLE_HOUSE_ENERGY_BUDGET_LANDING_SLUGS.map((slug) =>
    getWholeHouseEnergyBudgetLanding(slug)
  );
}

/** Static footer links derived from WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES. */
export function getWholeHouseEnergyBudgetToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return WHOLE_HOUSE_ENERGY_BUDGET_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as WHOLE_HOUSE_ENERGY_BUDGET_CALCULATOR_ID };
