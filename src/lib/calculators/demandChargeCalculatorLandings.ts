import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const DEMAND_CHARGE_CALCULATOR_TOOL_PATH =
  "/tools/time-of-use-rates/demand-charge-calculator/" as const;

export const DEMAND_CHARGE_CALCULATOR_TOOL_HREF = getCalculatorHref(
  "demand-charge-calculator",
  "tou"
);

const BASE_CALCULATOR_ID = "demand-charge-calculator" as const;

export type DemandChargeCalculatorLandingSlug =
  | "commercial-demand-charge-calculator"
  | "calculate-peak-kw-demand-charges"
  | "reduce-business-demand-charges-calculator";

export const COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG =
  "commercial-demand-charge-calculator" as const;

export const CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG =
  "calculate-peak-kw-demand-charges" as const;

export const REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG =
  "reduce-business-demand-charges-calculator" as const;

export const DEMAND_CHARGE_CALCULATOR_LANDING_SLUGS = [
  COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG,
  CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG,
  REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly DemandChargeCalculatorLandingSlug[];

export const COMMERCIAL_DEMAND_CHARGE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_PEAK_KW_DEMAND_CHARGES_GUIDE_HREF = getGuideLandingHref(
  CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG
);

export const REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG);

export type DemandChargeCalculatorGuideDefinition = GuideLandingDefinition & {
  slug: DemandChargeCalculatorLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const COMMERCIAL_DEMAND_CHARGE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Commercial demand charge calculator: estimate monthly and annual demand charges from peak kW and $/kW tariff—separate from energy kWh billing for shops, offices, and light industrial sites.",
  heroSubtitle:
    "Commercial demand charges bill your highest power spike—not total energy use. This guide walks through the commercial demand charge calculator: peak kW from interval data or equipment totals, $/kW from your tariff rider, and monthly plus annual demand line items.",
  benefits: [
    "Simple formula: monthly demand charge = peak kW × $/kW.",
    "Annual line scales monthly demand cost for budgeting and peak-shaving ROI.",
    "Isolates demand billing from energy kWh charges—two separate bill components.",
  ],
  howItWorks: [
    "Find billing peak kW from your utility interval report or demand meter.",
    "Enter the demand charge rate ($/kW) from your commercial tariff schedule.",
    "Read monthly demand charge and annual total—the adder on top of energy costs.",
  ],
  faq: [
    {
      q: "How do I calculate a commercial demand charge?",
      a: "Monthly demand charge ≈ peak kW × $/kW. Example: 85 kW billing peak × $12/kW → $1,020/mo demand charge (~$12,240/yr). One 15-minute interval during the month often sets that peak—equipment startups and HVAC staging matter.",
    },
    {
      q: "What is the difference between demand charges and energy charges?",
      a: "Energy charges bill kWh consumed over time. Demand charges bill the highest kW power draw in a billing window—capacity you needed from the grid at once. A efficient site with a short spike can pay more demand than a steady lower peak with the same monthly kWh.",
    },
    {
      q: "How can I lower commercial demand charges?",
      a: "Stagger motor and HVAC startups, shed non-critical load during peaks, add battery peak shaving, or upgrade to variable-frequency drives. Each kW removed from the billing peak saves $/kW every month—rerun the calculator with a lower kW target to see dollars.",
    },
  ],
  technicalSpecs: [
    "Monthly demand $ = peak_kW × demand_charge_per_kW.",
    "Annual demand $ ≈ monthly_demand × 12.",
    "Billing peak is usually the highest 15-min average kW in the cycle.",
    "Related: demand-charge-calculator, tou-shifting-savings, peak-shaving-potential.",
  ],
};

const COMMERCIAL_DEMAND_CHARGE_CALCULATOR_GUIDE: DemandChargeCalculatorGuideDefinition =
  {
    slug: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_GUIDE_HREF,
    toolHref: DEMAND_CHARGE_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Commercial demand charge calculator",
    title: "Commercial Demand Charge Calculator",
    description: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "commercial demand charge calculator",
      "demand charge calculator",
      "peak kw demand charge",
      "commercial electricity demand fee",
      "kw demand billing calculator",
    ],
    seo: {
      sections: [
        {
          heading: "One spike sets the month",
          body: "Demand tariffs punish the tallest 15-minute power pulse, not average use. A bakery oven preheat overlapping AC compressor start can print 90 kW once—and that number rides the whole billing cycle. Interval meter exports beat guessing from nameplate amps when you negotiate peak shaving.",
        },
        {
          heading: "Demand dollars are linear in kW",
          body: "At $12/kW, every 5 kW trimmed from the billing peak saves $60/month ($720/year) before energy kWh math changes. That linearity is why batteries and load controllers target kW, while TOU shifting targets kWh. Run both calculators when your tariff has energy and demand riders.",
        },
        {
          heading: "Ratchet clauses can extend the pain",
          body: "Some utilities apply annual or seasonal ratchets—a summer peak sets a demand floor for months. This tool models the current-cycle peak × rate; check your rider for minimum billing demand rules. A one-month spike under a ratchet tariff hurts longer than a single calculator line shows.",
        },
      ],
    },
    content: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_CONTENT,
  };

const CALCULATE_PEAK_KW_DEMAND_CHARGES_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate peak kW demand charges: find your billing peak kilowatts, multiply by $/kW from your tariff, and get monthly and annual demand fees—step-by-step commercial power spike math.",
  heroSubtitle:
    "Peak kW demand charges start with one number—the highest power draw your site hit in the billing window. This guide shows how to calculate peak kW demand charges from interval meter data, demand charge rates, and the monthly dollar line that sits beside energy kWh costs.",
  benefits: [
    "Walkthrough: billing peak kW × $/kW = monthly demand charge.",
    "Clarifies 15-minute interval peaks vs. instantaneous amp readings.",
    "Annual demand total for comparing peak-shaving projects and load staging.",
  ],
  howItWorks: [
    "Pull the highest kW interval from your utility portal or demand meter export.",
    "Enter the demand charge ($/kW) from your commercial rate schedule rider.",
    "Multiply peak kW by $/kW for monthly demand charges; scale × 12 for annual.",
  ],
  faq: [
    {
      q: "How do I calculate peak kW demand charges?",
      a: "Demand charge = billing peak kW × $/kW per month. Example: interval data shows 72 kW max in a 15-minute window → 72 × $14/kW = $1,008/mo demand charge (~$12,096/yr). Use the utility’s billing peak definition—often the highest 15-min average kW in the cycle.",
    },
    {
      q: "Where do I find billing peak kW?",
      a: "Commercial interval meters and utility customer portals list kW by timestamp. Sort for the maximum interval in the billing month. If you lack interval data, sum running equipment kW for a conservative estimate—but metered peaks are what utilities bill.",
    },
    {
      q: "Does lowering peak kW reduce demand charges proportionally?",
      a: "Yes—demand charges scale linearly with billing peak kW at a fixed $/kW rate. Shaving 10 kW from a 80 kW peak at $12/kW saves $120/month every month that peak stays lower. Rerun the calculator with before/after kW to quantify battery or load-control ROI.",
    },
  ],
  technicalSpecs: [
    "Billing peak kW = max(15-min average kW) in billing period (typical).",
    "Monthly demand charge = peak_kW × $/kW.",
    "Annual demand charge ≈ monthly_demand × 12.",
    "Related: commercial-demand-charge-calculator, peak-shaving-potential.",
  ],
};

const CALCULATE_PEAK_KW_DEMAND_CHARGES_GUIDE: DemandChargeCalculatorGuideDefinition =
  {
    slug: CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: CALCULATE_PEAK_KW_DEMAND_CHARGES_GUIDE_HREF,
    toolHref: DEMAND_CHARGE_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Calculate peak kW demand charges",
    title: "Calculate Peak kW Demand Charges",
    description: CALCULATE_PEAK_KW_DEMAND_CHARGES_CONTENT.metaDescription,
    keywords: [
      "calculate peak kw demand charges",
      "peak kw demand charge formula",
      "how to calculate demand charges",
      "kw demand billing calculation",
      "commercial peak demand fee",
    ],
    seo: {
      sections: [
        {
          heading: "kW is power, not energy",
          body: "Demand charges use kilowatts—power at an instant averaged over an interval—not kilowatt-hours. A 70 kW peak for fifteen minutes can cost more in demand fees than thousands of kWh spread evenly. When you calculate peak kW demand charges, you are pricing capacity the grid had to serve at one moment.",
        },
        {
          heading: "Find the interval the utility bills",
          body: "Most tariffs use the highest 15-minute average kW in the month. Some use 30-minute windows or coincident peaks with the utility’s system peak. Download interval CSVs and filter to the billing period before multiplying by $/kW—guessing from a single amp clamp reading often misses the true spike.",
        },
        {
          heading: "Model before-and-after kW for projects",
          body: "Peak shaving ROI is the delta in kW times $/kW. Enter current billing peak, then a target peak after staggered HVAC, a battery discharge cap, or shedding EV chargers during noon pulses. The calculator’s annual line turns kW engineering into a dollar budget line finance teams understand.",
        },
      ],
    },
    content: CALCULATE_PEAK_KW_DEMAND_CHARGES_CONTENT,
  };

const REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Reduce business demand charges calculator: model monthly and annual savings from lowering billing peak kW—peak shaving, staged HVAC, batteries, and load control ROI at your $/kW rate.",
  heroSubtitle:
    "Cutting business demand charges means lowering the kW spike the utility bills—not necessarily using less total energy. This guide walks through the reduce business demand charges calculator: current vs. target peak kW, $/kW tariff, and dollars saved each month when peaks shrink.",
  benefits: [
    "Quantify savings: (old peak kW − new peak kW) × $/kW per month.",
    "Pairs peak-shaving tactics with linear demand-charge math for ROI checks.",
    "Annual savings line for batteries, VFDs, and load-staging project budgets.",
  ],
  howItWorks: [
    "Enter current billing peak kW from interval data or your last utility bill.",
    "Set a lower target peak kW after planned peak-shaving measures.",
    "Multiply kW reduction by $/kW—or run both peaks in the tool—to see monthly savings.",
  ],
  faq: [
    {
      q: "How do I reduce business demand charges?",
      a: "Lower the billing peak kW: stagger equipment startups, shed discretionary load during spike windows, add battery peak shaving, or upgrade motors with VFDs. Savings ≈ kW reduced × $/kW/mo. Example: 88 kW → 73 kW at $11/kW → 15 × $11 = $165/mo (~$1,980/yr) if the new peak holds each cycle.",
    },
    {
      q: "What peak-shaving strategies work for small businesses?",
      a: "Sequence HVAC and kitchen equipment so they do not start together, shift EV fleet charging off opening hours, cap simultaneous compressor runs, and use demand-response signals if your utility offers them. Interval logs show which 15-minute window to target first.",
    },
    {
      q: "How does the calculator show reduction savings?",
      a: "Run once at current peak kW and once at your target peak with the same $/kW rate. The difference in monthly demand charge is your savings from peak reduction. Energy kWh may stay similar—demand savings are about power spikes, not total consumption.",
    },
  ],
  technicalSpecs: [
    "Monthly savings = (peak_kW_before − peak_kW_after) × $/kW.",
    "Annual savings ≈ monthly_savings × 12.",
    "Target peak must hold across billing intervals to realize savings.",
    "Related: calculate-peak-kw-demand-charges, peak-shaving-potential, battery-arbitrage-roi.",
  ],
};

const REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_GUIDE: DemandChargeCalculatorGuideDefinition =
  {
    slug: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "tou",
    href: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_GUIDE_HREF,
    toolHref: DEMAND_CHARGE_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Reduce business demand charges calculator",
    title: "Reduce Business Demand Charges Calculator",
    description: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "reduce business demand charges calculator",
      "lower commercial demand charges",
      "peak shaving demand charge savings",
      "reduce kw demand fee business",
      "demand charge reduction calculator",
    ],
    seo: {
      sections: [
        {
          heading: "Trim kW, not necessarily kWh",
          body: "A retailer can use the same monthly energy but pay less demand if opening procedures stop AC, ovens, and compressors from hitting one 15-minute crest. Reduction strategies attack coincidence—how many big loads run at once—not always total efficiency. The calculator prices kW deltas so operations changes get credit separate from LED retrofits.",
        },
        {
          heading: "Prove ROI before buying hardware",
          body: "Battery vendors quote kW discharge; facilities teams quote staggered start schedules for free. Enter a realistic post-project peak—conservative if unsure—and compare monthly demand dollars. If $140/month savings does not cover a $40k battery, staging startups might be the first move with math you can show the owner.",
        },
        {
          heading: "Sustain the new peak every month",
          body: "One good week after a controls upgrade is not savings—a reverted schedule prints the old 90 kW again. Automate sequences, alarm on interval exceedances, and review utility portal peaks monthly. Demand charge reduction is recurring discipline; the calculator’s annual line assumes the lower kW becomes the new normal.",
        },
      ],
    },
    content: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  DemandChargeCalculatorLandingSlug,
  DemandChargeCalculatorGuideDefinition
> = {
  [COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG]:
    COMMERCIAL_DEMAND_CHARGE_CALCULATOR_GUIDE,
  [CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG]:
    CALCULATE_PEAK_KW_DEMAND_CHARGES_GUIDE,
  [REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG]:
    REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_GUIDE,
};

export const DEMAND_CHARGE_CALCULATOR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG,
      href: COMMERCIAL_DEMAND_CHARGE_CALCULATOR_GUIDE_HREF,
      label: "Commercial Demand Charge Calculator",
    },
    {
      slug: CALCULATE_PEAK_KW_DEMAND_CHARGES_LANDING_SLUG,
      href: CALCULATE_PEAK_KW_DEMAND_CHARGES_GUIDE_HREF,
      label: "Calculate Peak kW Demand Charges",
    },
    {
      slug: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_LANDING_SLUG,
      href: REDUCE_BUSINESS_DEMAND_CHARGES_CALCULATOR_GUIDE_HREF,
      label: "Reduce Business Demand Charges Calculator",
    },
  ];

export function isDemandChargeCalculatorLandingSlug(
  slug: string
): slug is DemandChargeCalculatorLandingSlug {
  return (DEMAND_CHARGE_CALCULATOR_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getDemandChargeCalculatorLanding(
  slug: DemandChargeCalculatorLandingSlug = COMMERCIAL_DEMAND_CHARGE_CALCULATOR_LANDING_SLUG
): DemandChargeCalculatorGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllDemandChargeCalculatorLandings(): DemandChargeCalculatorGuideDefinition[] {
  return DEMAND_CHARGE_CALCULATOR_LANDING_SLUGS.map((slug) =>
    getDemandChargeCalculatorLanding(slug)
  );
}

/** Static footer links derived from DEMAND_CHARGE_CALCULATOR_FOOTER_RESOURCES. */
export function getDemandChargeCalculatorToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return DEMAND_CHARGE_CALCULATOR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as DEMAND_CHARGE_CALCULATOR_ID };
