import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ELECTRICITY_BILL_TOOL_PATH =
  "/tools/energy-cost/electricity-bill/" as const;

export const ELECTRICITY_BILL_TOOL_HREF = getCalculatorHref(
  "electricity-bill",
  "cost"
);

const BASE_CALCULATOR_ID = "electricity-bill" as const;

export type ElectricityBillLandingSlug =
  | "electricity-bill-estimator"
  | "calculate-electricity-cost-from-kwh"
  | "monthly-electricity-bill-calculator";

export const ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG =
  "electricity-bill-estimator" as const;

export const CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG =
  "calculate-electricity-cost-from-kwh" as const;

export const MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG =
  "monthly-electricity-bill-calculator" as const;

export const ELECTRICITY_BILL_LANDING_SLUGS = [
  ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG,
  CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG,
  MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly ElectricityBillLandingSlug[];

export const ELECTRICITY_BILL_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG
);

export const CALCULATE_ELECTRICITY_COST_FROM_KWH_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG);

export const MONTHLY_ELECTRICITY_BILL_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG);

export type ElectricityBillGuideDefinition = GuideLandingDefinition & {
  slug: ElectricityBillLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ELECTRICITY_BILL_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electricity bill estimator: calculate your utility bill from monthly kWh usage and $/kWh rate—quick energy-only estimate before fixed fees, tiers, and taxes.",
  heroSubtitle:
    "Your bill starts with energy: kilowatt-hours times your rate per kWh. This guide walks through the electricity bill estimator—total monthly kWh from your meter or bill summary, your utility energy rate, and the estimated bill before delivery charges and fixed fees.",
  benefits: [
    "Simple formula: bill = kWh × $/kWh.",
    "Works with any billing period—enter the kWh shown on your statement.",
    "Baseline check before comparing appliances, TOU rates, or solar offset.",
  ],
  howItWorks: [
    "Find total kWh used for the billing period on your utility bill or smart meter.",
    "Enter your energy rate in $/kWh from the rate schedule or bill line item.",
    "Read the estimated bill—energy charges only, excluding fixed fees and taxes.",
  ],
  faq: [
    {
      q: "How do I estimate my electricity bill?",
      a: "Bill ≈ kWh × $/kWh. Example: 850 kWh at $0.14/kWh → 850 × 0.14 = $119.00 energy charge. Add your utility's fixed monthly fee, delivery rider, and taxes for the full statement—this tool isolates the energy math.",
    },
    {
      q: "Where do I find my $/kWh rate?",
      a: "Check the energy charge line on your bill—divide energy dollars by kWh for an effective rate. Tiered or time-of-use plans may blend multiple rates; use a weighted average or your highest tier if you are stress-testing summer usage.",
    },
    {
      q: "Why is my real bill higher than the estimate?",
      a: "Most bills include a fixed customer charge, distribution/delivery fees, state taxes, and sometimes demand or fuel adjustments. Tiered rates bill higher kWh blocks at higher $/kWh. This estimator covers energy rate × usage only—the core variable you control with efficiency.",
    },
  ],
  technicalSpecs: [
    "Energy bill $ = kWh × rate_$/kWh.",
    "Effective rate = energy_charge $ ÷ kWh (from statement).",
    "Annual energy $ ≈ monthly kWh × 12 × $/kWh (flat-rate assumption).",
    "Related: electricity-bill, appliance-monthly-energy, energy-consumption.",
  ],
};

const ELECTRICITY_BILL_ESTIMATOR_GUIDE: ElectricityBillGuideDefinition = {
  slug: ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: ELECTRICITY_BILL_ESTIMATOR_GUIDE_HREF,
  toolHref: ELECTRICITY_BILL_TOOL_HREF,
  guideLinkLabel: "Electricity bill estimator",
  title: "Electricity Bill Estimator",
  description: ELECTRICITY_BILL_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "electricity bill estimator",
    "electricity bill calculator",
    "kwh bill estimate",
    "utility bill calculator",
    "estimate electric bill from kwh",
  ],
  seo: {
    sections: [
      {
        heading: "kWh is the usage number on every bill",
        body: "Utilities meter energy in kilowatt-hours—the same unit on your dishwasher label scaled to a month. Whether you read 650 kWh from a winter bill or 1,100 kWh from a summer AC spike, multiply by your energy rate to see the variable portion of what you owe. That is the number efficiency upgrades and solar offset actually move.",
      },
      {
        heading: "$/kWh is your energy price line",
        body: "Rates vary by state, provider, and plan type. A $0.12/kWh flat residential rate makes 900 kWh cost $108 in energy; at $0.22/kWh the same usage is $198. Enter the rate from your tariff or derive it from last month's energy charge ÷ kWh. The estimator does not guess your rate—you bring the number your utility publishes.",
      },
      {
        heading: "Energy math is the baseline for every savings project",
        body: "Before LED retrofits, heat-pump quotes, or EV charging schedules, know what one kWh costs you today. Subtract 50 kWh from shifting laundry off-peak only matters once you can multiply saved kWh by your rate. Run your actual usage through the bill estimator, then pair results with Appliance Monthly Energy or Whole House Energy Budget to find where those kWh come from.",
      },
    ],
  },
  content: ELECTRICITY_BILL_ESTIMATOR_CONTENT,
};

const CALCULATE_ELECTRICITY_COST_FROM_KWH_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate electricity cost from kWh: multiply kilowatt-hours by your $/kWh rate for energy dollars—monthly bills, appliance loads, and annual budgets from usage alone.",
  heroSubtitle:
    "Every kWh on your meter has a dollar value once you know your rate. This guide shows how to calculate electricity cost from kWh—usage from bills or appliance math, your utility $/kWh, and the energy charge before fixed fees and taxes.",
  benefits: [
    "Core formula: cost $ = kWh × $/kWh.",
    "Works for one appliance, one day, or a full billing period.",
    "Reverse check: kWh = energy cost $ ÷ $/kWh when validating a bill line.",
  ],
  howItWorks: [
    "Total your kWh—meter reading, bill summary, or watts × hours ÷ 1,000.",
    "Multiply by your energy rate in $/kWh from the tariff or effective bill rate.",
    "Read energy cost in dollars—add fixed charges separately for the full statement.",
  ],
  faq: [
    {
      q: "How do I calculate electricity cost from kWh?",
      a: "Cost $ = kWh × $/kWh. Example: 320 kWh at $0.16/kWh → 320 × 0.16 = $51.20 energy charge. For a single load: 1.5 kWh (1,500 Wh) at $0.14/kWh → 1.5 × 0.14 = $0.21 per cycle.",
    },
    {
      q: "How do I get kWh from appliance wattage?",
      a: "kWh = watts × hours ÷ 1,000. A 1,500 W heater for 4 hours → 1,500 × 4 ÷ 1,000 = 6 kWh. Multiply by your $/kWh for that run's cost, or use Appliance Monthly Energy for recurring loads.",
    },
    {
      q: "Can I calculate cost without my full bill?",
      a: "Yes—if you know kWh and rate, energy cost is pure multiplication. You still need your utility's fixed customer charge, delivery rider, and taxes for the total amount due. This math isolates the variable energy portion you control with usage.",
    },
  ],
  technicalSpecs: [
    "Energy cost $ = kWh × rate_$/kWh.",
    "kWh from watts = W × hrs ÷ 1,000.",
    "Effective $/kWh = energy_charge $ ÷ billed_kWh.",
    "Related: electricity-bill-estimator, appliance-monthly-energy, energy-consumption.",
  ],
};

const CALCULATE_ELECTRICITY_COST_FROM_KWH_GUIDE: ElectricityBillGuideDefinition = {
  slug: CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: CALCULATE_ELECTRICITY_COST_FROM_KWH_GUIDE_HREF,
  toolHref: ELECTRICITY_BILL_TOOL_HREF,
  guideLinkLabel: "Calculate electricity cost from kWh",
  title: "Calculate Electricity Cost from kWh",
  description: CALCULATE_ELECTRICITY_COST_FROM_KWH_CONTENT.metaDescription,
  keywords: [
    "calculate electricity cost from kwh",
    "kwh to cost calculator",
    "electricity cost per kwh",
    "convert kwh to dollars",
    "energy cost from usage",
  ],
  seo: {
    sections: [
      {
        heading: "kWh is the bridge between physics and dollars",
        body: "Your utility does not bill watts directly—it bills energy over time. One kWh is 1,000 watt-hours: a 100 W bulb for 10 hours, or a 2,000 W dryer for half an hour. Once usage is in kWh, cost is one multiplication. That is how you price a single laundry load, a weekend of EV charging, or an entire month from the meter.",
      },
      {
        heading: "Build cost from the bottom up",
        body: "Start with device kWh: space heater 6 kWh/night × $0.18/kWh = $1.08/night. Stack five loads and you have $5.40 before HVAC and baseline loads. Sum category kWh from Appliance Monthly Energy, then multiply the total by your rate for a usage-driven bill estimate—more accurate than guessing a dollar amount when you already know where the kWh go.",
      },
      {
        heading: "Reverse the formula to audit your bill",
        body: "If energy charges were $142.80 and usage was 840 kWh, implied rate = 142.80 ÷ 840 = $0.17/kWh effective. Compare that to your published tariff—tier jumps and blended TOU periods often raise the effective rate above the off-peak sticker. Calculating cost from kWh forward and dividing backward catches billing surprises before they repeat next month.",
      },
    ],
  },
  content: CALCULATE_ELECTRICITY_COST_FROM_KWH_CONTENT,
};

const MONTHLY_ELECTRICITY_BILL_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Monthly electricity bill calculator: estimate this month's energy charge from kWh usage and $/kWh rate—budget recurring utility costs and compare winter vs. summer bills.",
  heroSubtitle:
    "Most households think in monthly bills, not isolated kWh blocks. This guide walks through the monthly electricity bill calculator—one billing period's total kWh, your energy rate, and the variable energy charge you pay each month before fixed fees.",
  benefits: [
    "Monthly energy charge = monthly kWh × $/kWh.",
    "Scale one month to annual: energy $ × 12 for flat-rate budgeting.",
    "Compare bills month-over-month when only usage changes—not your base rate.",
  ],
  howItWorks: [
    "Enter total kWh for the billing month from your statement or smart-meter export.",
    "Add your $/kWh energy rate from the tariff or last bill's effective rate.",
    "Read estimated monthly energy cost—add fixed customer and delivery charges for total due.",
  ],
  faq: [
    {
      q: "How do I calculate my monthly electricity bill?",
      a: "Monthly energy charge ≈ kWh × $/kWh. Example: 720 kWh in March at $0.15/kWh → 720 × 0.15 = $108.00 energy portion. If your utility charges a $12 fixed fee, budget ~$120 total before taxes and delivery riders.",
    },
    {
      q: "Why does my monthly bill change when my rate stays the same?",
      a: "Usage drives the variable portion—summer AC, winter heat strips, and holiday lighting spike kWh. Same $0.14/kWh rate on 600 kWh ($84) vs. 1,000 kWh ($140) is a $56 swing with no tariff change. Track monthly kWh to separate rate hikes from behavior.",
    },
    {
      q: "Can I estimate next month's bill?",
      a: "Use last year's same-month kWh if you have history—weather patterns repeat. Or enter a stress-test kWh (e.g., +200 kWh for heat-wave AC) and multiply by your rate. Fixed fees stay constant; only the kWh × rate line moves with consumption.",
    },
  ],
  technicalSpecs: [
    "Monthly energy $ = monthly_kWh × rate_$/kWh.",
    "Annual energy $ ≈ monthly_kWh × 12 × $/kWh (flat usage assumption).",
    "Month-over-month delta $ = ΔkWh × $/kWh (constant rate).",
    "Related: electricity-bill-estimator, whole-house-energy-budget, appliance-monthly-energy.",
  ],
};

const MONTHLY_ELECTRICITY_BILL_CALCULATOR_GUIDE: ElectricityBillGuideDefinition = {
  slug: MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: MONTHLY_ELECTRICITY_BILL_CALCULATOR_GUIDE_HREF,
  toolHref: ELECTRICITY_BILL_TOOL_HREF,
  guideLinkLabel: "Monthly electricity bill calculator",
  title: "Monthly Electricity Bill Calculator",
  description: MONTHLY_ELECTRICITY_BILL_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "monthly electricity bill calculator",
    "monthly electric bill estimate",
    "calculate monthly utility bill",
    "average monthly electricity cost",
    "monthly kwh bill calculator",
  ],
  seo: {
    sections: [
      {
        heading: "Budget in billing months, not calendar guesses",
        body: "Utilities bill on 28–35 day cycles that rarely align with calendar months. Use the kWh total printed on your statement—that is the period your rate applied to. Enter that number in the monthly bill calculator with your energy rate and you have the variable line item landlords, roommates, and household budgets actually need to plan around.",
      },
      {
        heading: "Seasonal swings are a usage story",
        body: "A $95 January bill and a $185 August bill on the same tariff usually mean kWh doubled—not that your provider raised rates mid-year. Plot monthly kWh from twelve statements; multiply each by today's rate to see what the same usage would cost now. That separates inflation on the rate from inflation on the thermostat.",
      },
      {
        heading: "From one month to a yearly picture",
        body: "Flat-rate math makes annual energy cost ≈ average monthly kWh × 12 × $/kWh—but real homes are not flat. Sum actual monthly kWh × rate for each bill when you have history, or use one representative month and note the assumption. Pair monthly estimates with Whole House Energy Budget when you are building category-level kWh instead of reading the meter total.",
      },
    ],
  },
  content: MONTHLY_ELECTRICITY_BILL_CALCULATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  ElectricityBillLandingSlug,
  ElectricityBillGuideDefinition
> = {
  [ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG]: ELECTRICITY_BILL_ESTIMATOR_GUIDE,
  [CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG]:
    CALCULATE_ELECTRICITY_COST_FROM_KWH_GUIDE,
  [MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG]:
    MONTHLY_ELECTRICITY_BILL_CALCULATOR_GUIDE,
};

export const ELECTRICITY_BILL_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG,
    href: ELECTRICITY_BILL_ESTIMATOR_GUIDE_HREF,
    label: "Electricity Bill Estimator",
  },
  {
    slug: CALCULATE_ELECTRICITY_COST_FROM_KWH_LANDING_SLUG,
    href: CALCULATE_ELECTRICITY_COST_FROM_KWH_GUIDE_HREF,
    label: "Calculate Electricity Cost from kWh",
  },
  {
    slug: MONTHLY_ELECTRICITY_BILL_CALCULATOR_LANDING_SLUG,
    href: MONTHLY_ELECTRICITY_BILL_CALCULATOR_GUIDE_HREF,
    label: "Monthly Electricity Bill Calculator",
  },
];

export function isElectricityBillLandingSlug(
  slug: string
): slug is ElectricityBillLandingSlug {
  return (ELECTRICITY_BILL_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getElectricityBillLanding(
  slug: ElectricityBillLandingSlug = ELECTRICITY_BILL_ESTIMATOR_LANDING_SLUG
): ElectricityBillGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllElectricityBillLandings(): ElectricityBillGuideDefinition[] {
  return ELECTRICITY_BILL_LANDING_SLUGS.map((slug) =>
    getElectricityBillLanding(slug)
  );
}

/** Static footer links derived from ELECTRICITY_BILL_FOOTER_RESOURCES. */
export function getElectricityBillToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ELECTRICITY_BILL_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ELECTRICITY_BILL_CALCULATOR_ID };
