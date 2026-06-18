import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const EV_CHARGING_COST_TOOL_PATH =
  "/tools/ev-charging/ev-charging-cost/" as const;

export const EV_CHARGING_COST_TOOL_HREF = getCalculatorHref(
  "ev-charging-cost",
  "ev"
);

const BASE_CALCULATOR_ID = "ev-charging-cost" as const;

export type EvChargingCostLandingSlug =
  | "ev-charging-cost-calculator"
  | "cost-to-charge-electric-car-at-home"
  | "home-ev-charging-cost-estimator";

export const EV_CHARGING_COST_CALCULATOR_LANDING_SLUG =
  "ev-charging-cost-calculator" as const;

export const COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG =
  "cost-to-charge-electric-car-at-home" as const;

export const HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG =
  "home-ev-charging-cost-estimator" as const;

export const EV_CHARGING_COST_LANDING_SLUGS = [
  EV_CHARGING_COST_CALCULATOR_LANDING_SLUG,
  COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG,
  HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EvChargingCostLandingSlug[];

export const EV_CHARGING_COST_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  EV_CHARGING_COST_CALCULATOR_LANDING_SLUG
);

export const COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_GUIDE_HREF = getGuideLandingHref(
  COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG
);

export const HOME_EV_CHARGING_COST_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG
);

export type EvChargingCostGuideDefinition = GuideLandingDefinition & {
  slug: EvChargingCostLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const EV_CHARGING_COST_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "EV charging cost calculator: estimate home charging cost from kWh delivered and your electricity rate. Compare sessions, time-of-use blocks, and monthly EV bills—free, instant.",
  heroSubtitle:
    "Home EV charging cost is kWh times your utility rate—but the kWh must be what the meter sees, not only what lands in the battery. This guide walks through the EV charging cost calculator before you plan off-peak schedules or Level 2 installs.",
  benefits: [
    "Simple formula: cost = kWh × $/kWh using delivered energy from the wall.",
    "Works for single sessions or monthly totals when you know average kWh per charge.",
    "Pairs with EV charge-time and appliance-cost tools for full home energy planning.",
  ],
  howItWorks: [
    "Enter energy delivered in kWh (from charger display, smart plug, or utility meter).",
    "Set your electricity rate in $/kWh—use off-peak or blended average as appropriate.",
    "Review session or period cost; rerun with peak vs. off-peak rates for time-of-use tariffs.",
  ],
  faq: [
    {
      q: "How do I calculate EV home charging cost?",
      a: "Multiply kWh drawn from the grid by your $/kWh rate. Example: 45 kWh at $0.14/kWh costs about $6.30. Use wall-meter kWh (including charging losses) for the closest match to your bill.",
    },
    {
      q: "Should I use battery kWh or wall kWh?",
      a: "Wall kWh is more accurate for your electric bill. Onboard charger and cable losses mean the grid supplies slightly more energy than the pack stores—typically a few percent on Level 2 home charging.",
    },
    {
      q: "How do time-of-use rates affect EV charging cost?",
      a: "Run the calculator twice: once with off-peak $/kWh for overnight charging and once with peak rates if you charge midday. Smart schedules that shift load to cheap blocks can cut monthly cost without changing miles driven.",
    },
  ],
  technicalSpecs: [
    "Formula: cost = kWh × rate ($/kWh).",
    "Inputs: positive kWh and rate values.",
    "Output: currency total with kWh × rate detail string.",
    "Planning: pair with EV charge-time for session duration at your charger kW.",
  ],
};

const EV_CHARGING_COST_CALCULATOR_GUIDE: EvChargingCostGuideDefinition = {
  slug: EV_CHARGING_COST_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "ev",
  href: EV_CHARGING_COST_CALCULATOR_GUIDE_HREF,
  toolHref: EV_CHARGING_COST_TOOL_HREF,
  guideLinkLabel: "EV charging cost calculator",
  title: "EV Charging Cost Calculator",
  description: EV_CHARGING_COST_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "ev charging cost calculator",
    "electric car charging cost calculator",
    "home ev charging cost",
    "ev electricity cost per charge",
    "calculate ev charging bill",
  ],
  seo: {
    sections: [
      {
        heading: "Delivered kWh drives the bill",
        body: "Utilities bill energy at the meter, not state-of-charge gained in the pack. Level 1 and Level 2 home charging both incur conversion losses. When in doubt, use the kWh figure from your charger app, a submeter, or a whole-home monitor during the session.",
      },
      {
        heading: "Monthly cost from driving habits",
        body: "Multiply average kWh per day (or per charge) by your rate and charging frequency. A commuter adding 12 kWh nightly at $0.12/kWh spends about $1.44 per night—roughly $43 per month before taxes and fixed charges. Adjust for weekends and seasonal HVAC load on the same panel.",
      },
    ],
  },
  content: EV_CHARGING_COST_CALCULATOR_CONTENT,
};

const COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_CONTENT: GuideLandingContent = {
  metaDescription:
    "Cost to charge electric car at home: estimate per-session and monthly bills from kWh used and your utility rate. Level 1 vs. Level 2, time-of-use, and charging losses explained.",
  heroSubtitle:
    "What does it actually cost to fill up in your garage? Home charging is usually cheaper than public DC fast charging—but the number depends on kWh from the meter, your $/kWh rate, and when you plug in.",
  benefits: [
    "Translates kWh per charge into dollars using your real utility rate.",
    "Clarifies Level 1 outlet vs. Level 2 wallbox—same math, different session length.",
    "Shows how off-peak scheduling changes monthly cost without changing miles driven.",
  ],
  howItWorks: [
    "Note kWh added per session from your EV app, charger, or home energy monitor.",
    "Apply your electricity rate—off-peak overnight if your tariff has time-of-use blocks.",
    "Multiply by charges per week or month for a household fuel budget you can compare to gas.",
  ],
  faq: [
    {
      q: "How much does it cost to charge an electric car at home?",
      a: "Cost = kWh × $/kWh. A typical 50 kWh session at $0.15/kWh is about $7.50. Smaller top-ups (15–20 kWh) often run $2–4 at the same rate. Use delivered kWh from the wall for bill accuracy.",
    },
    {
      q: "Is home charging cheaper than gas?",
      a: "Often yes at residential rates—especially off-peak. Compare $/kWh × kWh per mile to $/gallon ÷ mpg for your vehicle. Local fuel and electricity prices, plus charging losses, determine the break-even.",
    },
    {
      q: "Does Level 2 cost more per kWh than Level 1?",
      a: "The utility rate is the same per kWh; Level 2 delivers energy faster, not at a higher $/kWh. Losses may differ slightly by equipment, but total cost still follows kWh drawn × rate.",
    },
  ],
  technicalSpecs: [
    "Cost: session_$ = kWh_delivered × rate_$/kWh.",
    "kWh source: charger display, OEM app, or submeter preferred over pack SOC delta.",
    "TOU: run separate calculations for peak and off-peak blocks.",
    "Related: EV charge-time for hours per session at your charger kW.",
  ],
};

const COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_GUIDE: EvChargingCostGuideDefinition = {
  slug: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "ev",
  href: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_GUIDE_HREF,
  toolHref: EV_CHARGING_COST_TOOL_HREF,
  guideLinkLabel: "Cost to charge electric car at home",
  title: "Cost to Charge Electric Car at Home",
  description: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_CONTENT.metaDescription,
  keywords: [
    "cost to charge electric car at home",
    "home ev charging cost per month",
    "how much to charge ev at home",
    "electric car home charging bill",
    "level 2 home charging cost",
  ],
  seo: {
    sections: [
      {
        heading: "Per charge vs. monthly budget",
        body: "Single-session cost helps you understand one plug-in event. Monthly budgeting multiplies average kWh per night by days charged and your effective rate. Families with two EVs should sum each vehicle's kWh—or use whole-home monitor data during charging windows.",
      },
      {
        heading: "Hidden line items on the bill",
        body: "Energy charges are only part of the utility bill; fixed customer charges and demand fees (rare on residential) do not scale per kWh. For EV fuel comparisons, focus on marginal energy rate—the cents per kWh for the block when your car charges.",
      },
    ],
  },
  content: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_CONTENT,
};

const HOME_EV_CHARGING_COST_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Home EV charging cost estimator: project monthly and annual fuel spend from kWh per charge, driving frequency, and utility rates. Plan Level 2 installs and off-peak schedules with clear $ estimates.",
  heroSubtitle:
    "Estimating home EV fuel cost means combining how often you charge, how many kWh each session adds, and what your utility charges per kWh—especially across peak and off-peak blocks.",
  benefits: [
    "Builds monthly estimates from average kWh per charge × charges per month × $/kWh.",
    "Supports blended or split peak/off-peak rates for time-of-use tariffs.",
    "Outputs comparable dollar figures for budgeting next to gas or public charging.",
  ],
  howItWorks: [
    "Estimate kWh per typical charge from your EV app or odometer-driven efficiency.",
    "Count how many home charges you expect per week or month.",
    "Multiply total kWh by your effective $/kWh rate—or run peak and off-peak scenarios separately.",
  ],
  faq: [
    {
      q: "How do I estimate monthly home EV charging cost?",
      a: "Monthly cost ≈ (kWh per charge) × (charges per month) × ($/kWh). Example: 18 kWh × 20 charges × $0.13/kWh ≈ $47/month. Adjust kWh for winter HVAC draw on the same circuit if relevant.",
    },
    {
      q: "What kWh should I use for the estimate?",
      a: "Use delivered kWh from the wall when possible. If you only know miles driven, multiply miles by kWh/mile (from your trip meter), then add ~5% for charging losses before applying your rate.",
    },
    {
      q: "Can I estimate cost before installing a Level 2 charger?",
      a: "Yes. The $/kWh rate is the same; Level 2 changes how fast energy arrives, not the utility price per kWh. Estimate total kWh from your weekly miles, then use the estimator with your expected charging pattern.",
    },
  ],
  technicalSpecs: [
    "Monthly: cost ≈ Σ(kWh_session × rate) or total_kWh × blended_$/kWh.",
    "Annual: monthly_estimate × 12 with seasonal rate or kWh adjustments.",
    "TOU: split kWh into peak vs. off-peak buckets when schedules are known.",
    "Validation: compare one month of utility meter delta during charge windows.",
  ],
};

const HOME_EV_CHARGING_COST_ESTIMATOR_GUIDE: EvChargingCostGuideDefinition = {
  slug: HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "ev",
  href: HOME_EV_CHARGING_COST_ESTIMATOR_GUIDE_HREF,
  toolHref: EV_CHARGING_COST_TOOL_HREF,
  guideLinkLabel: "Home EV charging cost estimator",
  title: "Home EV Charging Cost Estimator",
  description: HOME_EV_CHARGING_COST_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "home ev charging cost estimator",
    "estimate monthly ev charging cost",
    "home electric car fuel cost",
    "ev charging budget calculator",
    "project ev electricity bill",
  ],
  seo: {
    sections: [
      {
        heading: "From miles to kWh to dollars",
        body: "Many owners start with miles per week. Vehicle efficiency (kWh/100 mi or mi/kWh) converts driving into energy need. Add home-charging share versus workplace or public DCFC, then price only the kWh you buy at home. The estimator ties those steps to a single monthly dollar figure.",
      },
      {
        heading: "Seasonal swings",
        body: "Cold weather increases pack kWh per mile and may push charging into more expensive peak hours if you plug in immediately after evening commutes. Re-run estimates with winter kWh/mile and your actual TOU window to avoid surprise January bills.",
      },
    ],
  },
  content: HOME_EV_CHARGING_COST_ESTIMATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  EvChargingCostLandingSlug,
  EvChargingCostGuideDefinition
> = {
  [EV_CHARGING_COST_CALCULATOR_LANDING_SLUG]: EV_CHARGING_COST_CALCULATOR_GUIDE,
  [COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG]:
    COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_GUIDE,
  [HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG]:
    HOME_EV_CHARGING_COST_ESTIMATOR_GUIDE,
};

export const EV_CHARGING_COST_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: EV_CHARGING_COST_CALCULATOR_LANDING_SLUG,
    href: EV_CHARGING_COST_CALCULATOR_GUIDE_HREF,
    label: "EV Charging Cost Calculator",
  },
  {
    slug: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_LANDING_SLUG,
    href: COST_TO_CHARGE_ELECTRIC_CAR_AT_HOME_GUIDE_HREF,
    label: "Cost to Charge Electric Car at Home",
  },
  {
    slug: HOME_EV_CHARGING_COST_ESTIMATOR_LANDING_SLUG,
    href: HOME_EV_CHARGING_COST_ESTIMATOR_GUIDE_HREF,
    label: "Home EV Charging Cost Estimator",
  },
];

export function isEvChargingCostLandingSlug(
  slug: string
): slug is EvChargingCostLandingSlug {
  return (EV_CHARGING_COST_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEvChargingCostLanding(
  slug: EvChargingCostLandingSlug = EV_CHARGING_COST_CALCULATOR_LANDING_SLUG
): EvChargingCostGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEvChargingCostLandings(): EvChargingCostGuideDefinition[] {
  return EV_CHARGING_COST_LANDING_SLUGS.map((slug) =>
    getEvChargingCostLanding(slug)
  );
}

/** Static footer links derived from EV_CHARGING_COST_FOOTER_RESOURCES. */
export function getEvChargingCostToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return EV_CHARGING_COST_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as EV_CHARGING_COST_CALCULATOR_ID };
