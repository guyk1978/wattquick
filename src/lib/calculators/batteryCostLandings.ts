import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_COST_TOOL_PATH =
  "/tools/energy-cost/battery-cost/" as const;

export const BATTERY_COST_TOOL_HREF = getCalculatorHref("battery-cost", "cost");

const BASE_CALCULATOR_ID = "battery-cost" as const;

export type BatteryCostLandingSlug =
  | "battery-pack-cost-calculator"
  | "calculate-battery-cost-per-watt-hour"
  | "estimate-custom-battery-pack-pricing";

export const BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG =
  "battery-pack-cost-calculator" as const;

export const CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG =
  "calculate-battery-cost-per-watt-hour" as const;

export const ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG =
  "estimate-custom-battery-pack-pricing" as const;

export const BATTERY_COST_LANDING_SLUGS = [
  BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG,
  CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG,
  ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG,
] as const satisfies readonly BatteryCostLandingSlug[];

export const BATTERY_PACK_COST_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_BATTERY_COST_PER_WATT_HOUR_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG);

export const ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG);

export type BatteryCostGuideDefinition = GuideLandingDefinition & {
  slug: BatteryCostLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_PACK_COST_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery pack cost calculator: estimate total pack price from amp-hours, voltage, and $/Wh—compare LiFePO4, AGM, and custom builds on equal watt-hour basis.",
  heroSubtitle:
    "Battery pack quotes mix Ah, voltage, and chemistry—fair comparison starts with watt-hours and $/Wh. This guide walks through the battery pack cost calculator: capacity in Ah, nominal voltage, price per Wh, and total estimated pack cost.",
  benefits: [
    "Total cost = Ah × V × $/Wh (energy × unit price).",
    "Normalizes different voltage packs to Wh for apples-to-apples deal checks.",
    "Typical LiFePO4 range $0.10–$0.25/Wh built into the workflow.",
  ],
  howItWorks: [
    "Enter pack capacity in amp-hours (Ah) from the spec sheet or label.",
    "Add nominal voltage (12 V, 24 V, 48 V, etc.) and your $/Wh quote or market rate.",
    "Read estimated pack cost and implied Wh—compare against retail listings.",
  ],
  faq: [
    {
      q: "How do I calculate battery pack cost?",
      a: "Pack cost ≈ Ah × V × $/Wh. Example: 100 Ah × 12 V = 1,200 Wh; at $0.15/Wh → 1,200 × 0.15 = $180. Same energy at 24 V would be 50 Ah × 24 V = 1,200 Wh—same cost at the same $/Wh.",
    },
    {
      q: "What is a good $/Wh for LiFePO4 packs?",
      a: "Complete LiFePO4 packs with BMS often land around $0.10–$0.25/Wh depending on form factor, brand, and shipping. DIY cells can be lower; turnkey RV or solar racks may be higher. Enter the $/Wh you were quoted to sanity-check the total.",
    },
    {
      q: "Why use Wh instead of Ah alone?",
      a: "Amp-hours alone ignore voltage—a 100 Ah 12 V pack is 1,200 Wh; 100 Ah at 48 V is 4,800 Wh and costs far more energy. Multiplying Ah × V gives Wh so $/Wh comparisons work across system voltages.",
    },
  ],
  technicalSpecs: [
    "Wh = Ah × V.",
    "Pack cost $ = Wh × price_per_Wh.",
    "Implied $/Wh from retail = list_price ÷ rated_Wh.",
    "Related: battery-cost, ah-to-wh, solar-battery-bank.",
  ],
};

const BATTERY_PACK_COST_CALCULATOR_GUIDE: BatteryCostGuideDefinition = {
  slug: BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: BATTERY_PACK_COST_CALCULATOR_GUIDE_HREF,
  toolHref: BATTERY_COST_TOOL_HREF,
  guideLinkLabel: "Battery pack cost calculator",
  title: "Battery Pack Cost Calculator",
  description: BATTERY_PACK_COST_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "battery pack cost calculator",
    "battery price calculator",
    "cost per wh battery",
    "lifepo4 pack cost estimate",
    "ah voltage battery cost",
  ],
  seo: {
    sections: [
      {
        heading: "Ah and V tell the energy story",
        body: "Vendors advertise amp-hours; your wallet pays for watt-hours. A 280 Ah 12 V bank and a 140 Ah 24 V bank both store 3,360 Wh—enter both in the calculator at the same $/Wh and the total matches. That is how you spot whether a higher-Ah 12 V quote is actually a better deal.",
      },
      {
        heading: "$/Wh is the unit price line",
        body: "Divide any sticker price by rated Wh to get implied $/Wh, then compare quotes. A $899 pack at 5,120 Wh is about $0.18/Wh; a $650 pack at 2,400 Wh is $0.27/Wh—the cheaper sticker is not the cheaper energy. The calculator runs the forward direction when you already know your $/Wh target.",
      },
      {
        heading: "Upfront cost is not lifetime cost",
        body: "Low $/Wh AGM may win day one; higher-cycle LiFePO4 wins over years. This tool estimates pack purchase price only—pair results with cycle life, warranty, and BMS quality before sizing solar or RV banks. Cost per usable Wh over warranted cycles is the next comparison step.",
      },
    ],
  },
  content: BATTERY_PACK_COST_CALCULATOR_CONTENT,
};

const CALCULATE_BATTERY_COST_PER_WATT_HOUR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate battery cost per watt-hour: derive $/Wh from pack price and rated Wh, compare chemistries fairly, and estimate total cost with Ah × V × $/Wh—LiFePO4, AGM, and DIY builds.",
  heroSubtitle:
    "Cost per watt-hour ($/Wh) is how you compare battery deals on equal energy—not amp-hours alone. This guide shows how to calculate battery cost per watt-hour from listings, then use Ah, voltage, and $/Wh in the estimator for total pack price.",
  benefits: [
    "Formula: $/Wh = pack price ÷ rated Wh (Ah × V).",
    "Forward check: total cost = Wh × $/Wh in the interactive tool.",
    "Benchmark LiFePO4, AGM, and NMC quotes on one unit-price line.",
  ],
  howItWorks: [
    "Compute rated Wh = amp-hours × nominal voltage from the spec label.",
    "Divide sticker or quote price by Wh to get cost per watt-hour.",
    "Enter that $/Wh with Ah and V in the calculator to verify total pack cost.",
  ],
  faq: [
    {
      q: "How do I calculate battery cost per watt-hour?",
      a: "$/Wh = pack price ÷ rated Wh. Rated Wh = Ah × V. Example: $420 for 100 Ah × 12 V → 1,200 Wh → $420 ÷ 1,200 = $0.35/Wh. Use that $/Wh to compare other packs or multiply by any target Wh for budget estimates.",
    },
    {
      q: "What is a typical $/Wh for home storage batteries?",
      a: "Complete LiFePO4 packs often run $0.10–$0.25/Wh retail; AGM may look similar upfront but higher cycle cost. Premium branded rack batteries can exceed $0.30/Wh. Always divide quoted price by nameplate Wh—marketing Ah at one voltage can hide expensive $/Wh.",
    },
    {
      q: "Should I use nominal or usable Wh for $/Wh?",
      a: "Use nameplate rated Wh for comparing vendor quotes apples-to-apples. For bank sizing, apply depth-of-discharge—usable Wh may be 80–90% of rated for LiFePO4. Cost per usable Wh = price ÷ (rated Wh × DoD) when modeling runtime budgets.",
    },
  ],
  technicalSpecs: [
    "Rated Wh = Ah × V.",
    "$/Wh = pack_price ÷ rated_Wh.",
    "Pack cost $ = rated_Wh × $/Wh.",
    "Related: battery-pack-cost-calculator, ah-to-wh, wh-to-ah.",
  ],
};

const CALCULATE_BATTERY_COST_PER_WATT_HOUR_GUIDE: BatteryCostGuideDefinition = {
  slug: CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: CALCULATE_BATTERY_COST_PER_WATT_HOUR_GUIDE_HREF,
  toolHref: BATTERY_COST_TOOL_HREF,
  guideLinkLabel: "Calculate battery cost per watt-hour",
  title: "Calculate Battery Cost per Watt-Hour",
  description: CALCULATE_BATTERY_COST_PER_WATT_HOUR_CONTENT.metaDescription,
  keywords: [
    "calculate battery cost per watt-hour",
    "battery cost per wh",
    "price per wh calculator",
    "battery $/wh comparison",
    "cost per kilowatt hour battery storage",
  ],
  seo: {
    sections: [
      {
        heading: "Divide price by energy, not by Ah",
        body: "A 200 Ah 12 V listing sounds bigger than 100 Ah 24 V—but both are 2,400 Wh. Cost per watt-hour exposes which sticker is cheaper per unit of stored energy. Retail shoppers who only sort by Ah often overpay for voltage they do not need or underbuy energy they do.",
      },
      {
        heading: "Build a $/Wh table from three quotes",
        body: "For each candidate: Wh = Ah × V, then $/Wh = price ÷ Wh. Sort ascending. The winner on $/Wh may still lose on form factor, warranty, or shipping— but you start from comparable economics. Enter the best $/Wh into the calculator with your target bank Ah and V to project total install cost.",
      },
      {
        heading: "From $/Wh to project budget",
        body: "Planning 10 kWh (10,000 Wh) at $0.16/Wh implies ~$1,600 in cells before BMS, cables, and labor. Multiplying Wh × $/Wh scales a unit price learned from one pack to a whole bank. Reverse the math on a vendor quote to see if their $/Wh beats your spreadsheet benchmark.",
      },
    ],
  },
  content: CALCULATE_BATTERY_COST_PER_WATT_HOUR_CONTENT,
};

const ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate custom battery pack pricing: budget DIY LiFePO4 or assembled banks from target Ah, voltage, and $/Wh—cells, BMS, and enclosure costs before you build RV, solar, or e-bike packs.",
  heroSubtitle:
    "Custom packs start with a target voltage and capacity—not a retail SKU. This guide walks through how to estimate custom battery pack pricing with amp-hours, nominal volts, and a realistic $/Wh for cells plus BMS before wires and labor.",
  benefits: [
    "Scales DIY cell $/Wh to your series/parallel Ah and V target.",
    "Same Ah × V × $/Wh math as turnkey packs—compare build vs. buy.",
    "Useful for quoting 12 V, 24 V, or 48 V banks from one unit-price assumption.",
  ],
  howItWorks: [
    "Define pack Ah and voltage (e.g., 4S2P 280 Ah 12.8 V LiFePO4).",
    "Pick $/Wh from cell quotes—often lower than complete packs before BMS and case.",
    "Run the estimator for base cell cost; add BMS, busbars, and labor separately.",
  ],
  faq: [
    {
      q: "How do I estimate custom battery pack pricing?",
      a: "Cell cost ≈ Ah × V × $/Wh. Example: 280 Ah × 12.8 V = 3,584 Wh; cells at $0.12/Wh → ~$430 before BMS ($50–$150), enclosure, and labor. Compare that total to a retail 280 Ah pack sticker price to see if DIY wins.",
    },
    {
      q: "What $/Wh should I use for DIY LiFePO4 cells?",
      a: "Raw prismatic or cylindrical cells often quote $0.08–$0.15/Wh in bulk; add 10–30% for BMS, holders, and nickel strip. Complete DIY packs with quality BMS commonly land near $0.12–$0.20/Wh all-in—enter your blended $/Wh in the tool.",
    },
    {
      q: "Does the calculator include BMS and assembly?",
      a: "The tool models energy cost at $/Wh × rated Wh only. Add BMS, fuses, enclosure, and labor on top—or bump $/Wh to a blended rate that includes those line items. Compare that all-in $/Wh to retail packs for a fair build-vs-buy call.",
    },
  ],
  technicalSpecs: [
    "Rated Wh = Ah × nominal_V.",
    "Cell stack cost ≈ Wh × cell_$/Wh.",
    "All-in DIY ≈ cell_cost + BMS + hardware + labor.",
    "Related: battery-pack-cost-calculator, solar-battery-bank, battery-bank-size.",
  ],
};

const ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_GUIDE: BatteryCostGuideDefinition = {
  slug: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "cost",
  href: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_GUIDE_HREF,
  toolHref: BATTERY_COST_TOOL_HREF,
  guideLinkLabel: "Estimate custom battery pack pricing",
  title: "Estimate Custom Battery Pack Pricing",
  description: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_CONTENT.metaDescription,
  keywords: [
    "estimate custom battery pack pricing",
    "diy battery pack cost",
    "custom lifepo4 pack price",
    "build vs buy battery bank",
    "battery pack quote estimator",
  ],
  seo: {
    sections: [
      {
        heading: "Design voltage and Ah first",
        body: "Custom builds follow your bus voltage—12 V RV, 48 V solar hybrid, 36 V e-bike—not whatever Amazon lists. Once series count sets nominal V and your runtime target sets Ah, Wh is fixed. Pricing starts there: multiply Wh by a cell $/Wh you can actually source, then layer BMS and hardware.",
      },
      {
        heading: "Blended $/Wh beats forgetting line items",
        body: "Quoting cells at $0.09/Wh and stopping understates the pack. Either add BMS and case dollars explicitly or use a blended $/Wh that averaged your last three DIY builds. Enter that blended rate in the calculator so the total matches what you would wire—not an optimistic cell-only fantasy.",
      },
      {
        heading: "Build vs. buy on the same Wh",
        body: "Run retail pack $/Wh against your DIY blended $/Wh on identical Ah × V. If DIY saves 15% but needs a weekend and warranty is on you, the sticker premium may be rational. The estimator gives the cell-energy baseline; your time and risk tolerance finish the decision.",
      },
    ],
  },
  content: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_CONTENT,
};

const GUIDES_BY_SLUG: Record<BatteryCostLandingSlug, BatteryCostGuideDefinition> =
  {
    [BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG]: BATTERY_PACK_COST_CALCULATOR_GUIDE,
    [CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG]:
      CALCULATE_BATTERY_COST_PER_WATT_HOUR_GUIDE,
    [ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG]:
      ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_GUIDE,
  };

export const BATTERY_COST_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG,
    href: BATTERY_PACK_COST_CALCULATOR_GUIDE_HREF,
    label: "Battery Pack Cost Calculator",
  },
  {
    slug: CALCULATE_BATTERY_COST_PER_WATT_HOUR_LANDING_SLUG,
    href: CALCULATE_BATTERY_COST_PER_WATT_HOUR_GUIDE_HREF,
    label: "Calculate Battery Cost per Watt-Hour",
  },
  {
    slug: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_LANDING_SLUG,
    href: ESTIMATE_CUSTOM_BATTERY_PACK_PRICING_GUIDE_HREF,
    label: "Estimate Custom Battery Pack Pricing",
  },
];

export function isBatteryCostLandingSlug(
  slug: string
): slug is BatteryCostLandingSlug {
  return (BATTERY_COST_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryCostLanding(
  slug: BatteryCostLandingSlug = BATTERY_PACK_COST_CALCULATOR_LANDING_SLUG
): BatteryCostGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryCostLandings(): BatteryCostGuideDefinition[] {
  return BATTERY_COST_LANDING_SLUGS.map((slug) => getBatteryCostLanding(slug));
}

/** Static footer links derived from BATTERY_COST_FOOTER_RESOURCES. */
export function getBatteryCostToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_COST_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_COST_CALCULATOR_ID };
