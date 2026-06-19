import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const APPLIANCE_MONTHLY_ENERGY_TOOL_PATH =
  "/tools/home-appliances/appliance-monthly-energy/" as const;

export const APPLIANCE_MONTHLY_ENERGY_TOOL_HREF = getCalculatorHref(
  "appliance-monthly-energy",
  "appliance"
);

const BASE_CALCULATOR_ID = "appliance-monthly-energy" as const;

export type ApplianceMonthlyEnergyLandingSlug =
  | "appliance-monthly-energy-consumption-calculator"
  | "convert-appliance-watts-to-monthly-kwh"
  | "calculate-electricity-cost-per-appliance";

export const APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG =
  "appliance-monthly-energy-consumption-calculator" as const;

export const CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG =
  "convert-appliance-watts-to-monthly-kwh" as const;

export const CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG =
  "calculate-electricity-cost-per-appliance" as const;

export const APPLIANCE_MONTHLY_ENERGY_LANDING_SLUGS = [
  APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG,
  CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG,
  CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG,
] as const satisfies readonly ApplianceMonthlyEnergyLandingSlug[];

export const APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG);

export const CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_GUIDE_HREF =
  getGuideLandingHref(CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG);

export const CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG);

export type ApplianceMonthlyEnergyGuideDefinition = GuideLandingDefinition & {
  slug: ApplianceMonthlyEnergyLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Appliance monthly energy consumption calculator: convert watts and hours per day into monthly kWh for fridges, dryers, heaters, and more—stack loads before sizing solar or reading your bill.",
    heroSubtitle:
      "Monthly kWh per appliance is the building block of any home energy audit. This guide walks through the appliance monthly energy consumption calculator—watts × daily hours × 30—before you sum loads, compare tariffs, or size rooftop solar.",
    benefits: [
      "Clear formula: monthly kWh = (watts × hours/day × 30) ÷ 1000.",
      "Works for any plug load—fridge, dishwasher, space heater, EV charger segment.",
      "Pairs with daily cost and whole-house budget tools to roll appliance kWh into bills.",
    ],
    howItWorks: [
      "Find nameplate or measured watts for the appliance (label, manual, or smart plug).",
      "Estimate realistic hours per day—duty cycles matter for fridges and HVAC fans.",
      "Read monthly kWh; repeat for each major load and sum for household totals.",
    ],
    faq: [
      {
        q: "How do I calculate appliance monthly energy consumption?",
        a: "Monthly kWh ≈ (watts × hours per day × 30) ÷ 1000. Example: 900 W microwave used 0.5 h/day → 900 × 0.5 × 30 ÷ 1000 = 13.5 kWh/month. A 150 W fridge running 24 h → 150 × 24 × 30 ÷ 1000 = 108 kWh/month.",
      },
      {
        q: "Should I use nameplate watts or measured draw?",
        a: "Measured is better—nameplates quote max ratings. Compressors and motors cycle on and off; a kill-a-watt or smart plug over a week beats assuming 24 h at full watts. Enter average watts when you have logging data.",
      },
      {
        q: "Why multiply by 30 days?",
        a: "Thirty days is a standard monthly shorthand. For annual planning use 365; for billing alignment use your utility’s average days per month (often 30.4). The calculator uses 30 for quick estimates—scale if you need exact bill cycles.",
      },
    ],
    technicalSpecs: [
      "Monthly kWh = (watts × hours/day × 30) ÷ 1000.",
      "Daily kWh = (watts × hours/day) ÷ 1000.",
      "Annual kWh ≈ monthly kWh × 12 (or daily kWh × 365).",
      "Related: appliance-daily-cost, whole-house-energy-budget, energy-consumption.",
    ],
  };

const APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_GUIDE: ApplianceMonthlyEnergyGuideDefinition =
  {
    slug: APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_GUIDE_HREF,
    toolHref: APPLIANCE_MONTHLY_ENERGY_TOOL_HREF,
    guideLinkLabel: "Appliance monthly energy consumption calculator",
    title: "Appliance Monthly Energy Consumption Calculator",
    description:
      APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "appliance monthly energy consumption calculator",
      "monthly kwh appliance calculator",
      "watts hours to kwh per month",
      "home appliance energy use calculator",
      "kwh per month fridge dryer",
    ],
    seo: {
      sections: [
        {
          heading: "One appliance at a time",
          body: "Utility bills hide which device drove the spike. Running monthly kWh for each major appliance—fridge, water heater element, dryer, desktop rig—surfaces the top contributors. Sum the kWh lines before you blame the whole house on one mystery load.",
        },
        {
          heading: "From kWh to dollars and solar",
          body: "Monthly kWh is the bridge to cost (× $/kWh) and to solar sizing (daily Wh from appliance stacks). A 15 kWh/month reduction on an old freezer is the same headroom as adding panel watts—this calculator gives the kWh side of that tradeoff.",
        },
      ],
    },
    content: APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_CONTENT,
  };

const CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_CONTENT: GuideLandingContent = {
  metaDescription:
    "Convert appliance watts to monthly kWh: enter power draw and daily run hours to get kWh per month for any household device—fridge, TV, heater, or washer.",
  heroSubtitle:
    "Watts on the label are only half the story—you also need how long the device runs each day. This guide shows how to convert appliance watts to monthly kWh with a simple formula before you stack loads or compare to your utility bill.",
  benefits: [
    "Direct conversion: watts + hours/day → monthly kWh in one step.",
    "Clarifies the ÷ 1000 step that turns watt-hours into kilowatt-hours.",
    "Useful for comparing two appliances with different duty cycles on the same bill line.",
  ],
  howItWorks: [
    "Note appliance watts from the nameplate, spec sheet, or meter reading.",
    "Enter hours per day the load is actually on—not always 24 h for cycling devices.",
    "Apply monthly kWh = (watts × hours × 30) ÷ 1000; sum across appliances for household use.",
  ],
  faq: [
    {
      q: "How do I convert appliance watts to monthly kWh?",
      a: "Multiply watts by hours per day and days per month, then divide by 1000. Formula: monthly kWh = (W × h/day × 30) ÷ 1000. Example: 1,200 W space heater × 4 h/day × 30 ÷ 1000 = 144 kWh/month.",
    },
    {
      q: "Why divide by 1000 when converting watts to kWh?",
      a: "Watts are power; kWh are energy. One kWh = 1,000 Wh. Multiplying watts × hours gives watt-hours (Wh); dividing by 1,000 converts Wh to kWh—the unit on your electricity bill.",
    },
    {
      q: "What if my appliance cycles on and off?",
      a: "Use average watts × effective hours on per day, not nameplate max × 24 h. A fridge rated 180 W might average 80 W over 24 h as the compressor cycles—or measure with a plug meter and enter the logged daily kWh × 30 for monthly kWh directly.",
    },
  ],
  technicalSpecs: [
    "Wh/day = watts × hours/day.",
    "Monthly kWh = Wh/day × 30 ÷ 1000.",
    "kW = watts ÷ 1000 (power); kWh = kW × hours (energy).",
    "Related: watts-to-amps, appliance-daily-cost, energy-consumption.",
  ],
};

const CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_GUIDE: ApplianceMonthlyEnergyGuideDefinition =
  {
    slug: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_GUIDE_HREF,
    toolHref: APPLIANCE_MONTHLY_ENERGY_TOOL_HREF,
    guideLinkLabel: "Convert appliance watts to monthly kWh",
    title: "Convert Appliance Watts to Monthly kWh",
    description: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_CONTENT.metaDescription,
    keywords: [
      "convert appliance watts to monthly kwh",
      "watts to kwh per month",
      "appliance watts monthly kwh formula",
      "w to kwh calculator appliance",
      "monthly kilowatt hours from watts",
    ],
    seo: {
      sections: [
        {
          heading: "Power vs. energy",
          body: "Watts describe how hard an appliance pulls right now; kWh describe how much you bought over time. Converting watts to monthly kWh requires a time factor—hours per day and days per month. Skip either input and the number will not match your meter.",
        },
        {
          heading: "Stack conversions for the whole home",
          body: "Run the conversion for each major load, then add the monthly kWh lines. That total should land in the ballpark of your bill (minus HVAC and seasonal swings). Gaps point to missing loads or underestimated duty cycles—not bad math on the formula itself.",
        },
      ],
    },
    content: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_CONTENT,
  };

const CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate electricity cost per appliance: get monthly kWh from watts and daily hours, then multiply by your $/kWh rate to see what each fridge, heater, or TV adds to your bill.",
  heroSubtitle:
    "Dollar cost per appliance starts with monthly kWh—watts and run hours first, tariff second. This guide shows how to calculate electricity cost per appliance using monthly energy use before you compare upgrades or chase standby waste.",
  benefits: [
    "Monthly kWh = (watts × hours/day × 30) ÷ 1000—the energy input for cost math.",
    "Monthly cost ≈ monthly kWh × $/kWh; stack appliances to rank bill contributors.",
    "Pairs with appliance daily cost for per-day estimates at the same tariff.",
  ],
  howItWorks: [
    "Enter appliance watts and realistic hours per day in the monthly energy calculator.",
    "Read monthly kWh for that load; multiply by your blended or TOU $/kWh rate.",
    "Repeat per device; sum monthly costs to see which appliances dominate your bill.",
  ],
  faq: [
    {
      q: "How do I calculate electricity cost per appliance?",
      a: "Step 1: monthly kWh ≈ (watts × hours/day × 30) ÷ 1000. Step 2: monthly cost = monthly kWh × $/kWh. Example: 200 W device × 8 h/day → 48 kWh/month. At $0.16/kWh → about $7.68/month for that appliance alone.",
    },
    {
      q: "Do I need monthly kWh before I can get cost?",
      a: "Yes—utilities bill energy (kWh), not watts. Watts × time gives kWh; rate converts kWh to dollars. This tool outputs monthly kWh; apply your bill’s $/kWh (total cost ÷ total kWh) for a quick cost line per appliance.",
    },
    {
      q: "Should I use one rate for all appliances?",
      a: "Start with a blended $/kWh from your statement. On time-of-use tariffs, heavy evening loads (dryer, oven) may cost more—rerun cost with peak rate for those hours, or use the appliance daily cost tool for day-level TOU splits.",
    },
  ],
  technicalSpecs: [
    "Monthly kWh = (watts × hours/day × 30) ÷ 1000.",
    "Monthly cost ≈ monthly kWh × $/kWh.",
    "Daily cost ≈ (watts × hours/day ÷ 1000) × $/kWh.",
    "Related: appliance-daily-cost, electricity-bill, vampire-power-cost.",
  ],
};

const CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_GUIDE: ApplianceMonthlyEnergyGuideDefinition =
  {
    slug: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "appliance",
    href: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_GUIDE_HREF,
    toolHref: APPLIANCE_MONTHLY_ENERGY_TOOL_HREF,
    guideLinkLabel: "Calculate electricity cost per appliance",
    title: "Calculate Electricity Cost per Appliance",
    description: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_CONTENT.metaDescription,
    keywords: [
      "calculate electricity cost per appliance",
      "appliance electricity cost calculator",
      "monthly cost to run appliance",
      "kwh cost per device",
      "how much does appliance cost per month",
    ],
    seo: {
      sections: [
        {
          heading: "kWh first, dollars second",
          body: "Sticker shock on the bill rarely names the culprit device. Monthly kWh per appliance isolates energy use; your tariff turns that into cost. A 40 kWh/month old freezer at $0.18/kWh is $7.20/month—easy to compare against a 25 kWh/month efficient unit before you buy.",
        },
        {
          heading: "Rank loads before you upgrade",
          body: "Summing per-appliance monthly cost surfaces where rebates and replacements pay off fastest. Small wins on always-on loads (DVR, router, aquarium pump) can match one big-ticket HVAC change—if you measure watts and hours honestly first.",
        },
      ],
    },
    content: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  ApplianceMonthlyEnergyLandingSlug,
  ApplianceMonthlyEnergyGuideDefinition
> = {
  [APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG]:
    APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_GUIDE,
  [CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG]:
    CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_GUIDE,
  [CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG]:
    CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_GUIDE,
};

export const APPLIANCE_MONTHLY_ENERGY_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG,
      href: APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_GUIDE_HREF,
      label: "Appliance Monthly Energy Consumption Calculator",
    },
    {
      slug: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_LANDING_SLUG,
      href: CONVERT_APPLIANCE_WATTS_TO_MONTHLY_KWH_GUIDE_HREF,
      label: "Convert Appliance Watts to Monthly kWh",
    },
    {
      slug: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_LANDING_SLUG,
      href: CALCULATE_ELECTRICITY_COST_PER_APPLIANCE_GUIDE_HREF,
      label: "Calculate Electricity Cost per Appliance",
    },
  ];

export function isApplianceMonthlyEnergyLandingSlug(
  slug: string
): slug is ApplianceMonthlyEnergyLandingSlug {
  return (APPLIANCE_MONTHLY_ENERGY_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getApplianceMonthlyEnergyLanding(
  slug: ApplianceMonthlyEnergyLandingSlug = APPLIANCE_MONTHLY_ENERGY_CONSUMPTION_CALCULATOR_LANDING_SLUG
): ApplianceMonthlyEnergyGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllApplianceMonthlyEnergyLandings(): ApplianceMonthlyEnergyGuideDefinition[] {
  return APPLIANCE_MONTHLY_ENERGY_LANDING_SLUGS.map((slug) =>
    getApplianceMonthlyEnergyLanding(slug)
  );
}

/** Static footer links derived from APPLIANCE_MONTHLY_ENERGY_FOOTER_RESOURCES. */
export function getApplianceMonthlyEnergyToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return APPLIANCE_MONTHLY_ENERGY_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as APPLIANCE_MONTHLY_ENERGY_CALCULATOR_ID };
