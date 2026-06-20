import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_COST_PER_KM_TOOL_PATH =
  "/tools/e-scooter/escooter-cost-per-km/" as const;

export const ESCOOTER_COST_PER_KM_TOOL_HREF = getCalculatorHref(
  "escooter-cost-per-km",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-cost-per-km" as const;

export type EscooterCostPerKmLandingSlug =
  | "e-scooter-cost-per-kilometer-calculator"
  | "e-scooter-vs-public-transit-cost-comparison"
  | "electric-scooter-commute-savings-calculator";

export const ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG =
  "e-scooter-cost-per-kilometer-calculator" as const;

export const ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG =
  "e-scooter-vs-public-transit-cost-comparison" as const;

export const ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG =
  "electric-scooter-commute-savings-calculator" as const;

export const ESCOOTER_COST_PER_KM_LANDING_SLUGS = [
  ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG,
  ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG,
  ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly EscooterCostPerKmLandingSlug[];

export const ESCOOTER_COST_PER_KILOMETER_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG);

export const ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG);

export const ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG);

export type EscooterCostPerKmGuideDefinition = GuideLandingDefinition & {
  slug: EscooterCostPerKmLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_COST_PER_KILOMETER_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter cost per kilometer calculator: $/km from Wh/km and electricity rate—compare weekly scooter spend vs. public transit and estimate annual commute savings.",
  heroSubtitle:
    "Marginal ride cost is mostly wall electricity, not fuel. This e-scooter cost per kilometer calculator turns Wh/km and your $/kWh rate into cents per km—then stacks weekly commute distance against transit fares for a simple savings picture.",
  benefits: [
    "Cost per km = (Wh/km ÷ 1000) × electricity rate—transparent commute economics.",
    "Weekly scooter cost from your actual commute km, not brochure range claims.",
    "Transit comparison at 10 trips/week with annual savings estimate.",
  ],
  howItWorks: [
    "Enter consumption in Wh/km (from range calculator or app, often ~12–18).",
    "Set local electricity rate ($/kWh) and weekly commute distance (km).",
    "Add typical transit fare per trip—read $/km, weekly costs, and annual savings.",
  ],
  faq: [
    {
      q: "What does an e-scooter cost per kilometer calculator show?",
      a: "It converts energy use (Wh/km) and your utility rate into dollars per kilometre, then multiplies by weekly commute km. It also compares against public transit fares to estimate weekly and annual savings—not full TCO with tyres and depreciation.",
    },
    {
      q: "How do I get Wh/km for the calculator?",
      a: "Use measured consumption from your app, or the E-Scooter Range / tyre-pressure tools with your mass and inflation. Commuter planning often starts near 12–18 Wh/km on flat urban routes.",
    },
    {
      q: "Example cost per km at default inputs?",
      a: "At 15 Wh/km and $0.14/kWh: cost/km = 0.015 × 0.14 = $0.0021 (~0.21¢). Forty weekly km ≈ $0.08 electricity vs. $25 transit (10 × $2.50 fare)—before maintenance.",
    },
    {
      q: "Should I include maintenance in $/km?",
      a: "This tool isolates electricity marginal cost. Tyres, brake pads, and depreciation add to long-term TCO—pair results with tyre-wear and maintenance-schedule calculators for full ownership cost.",
    },
  ],
  technicalSpecs: [
    "Cost/km ($) = (Wh/km ÷ 1000) × rate ($/kWh).",
    "Weekly scooter cost = cost/km × weekly km.",
    "Weekly transit = fare × 10 trips; annual savings = (transit − scooter) × 52.",
    "Example: 15 Wh/km, $0.14/kWh, 40 km/wk, $2.50 fare → ~$0.0021/km.",
    "Related: escooter-range, escooter-charge-time, escooter-tire-wear.",
  ],
};

const ESCOOTER_COST_PER_KILOMETER_CALCULATOR_GUIDE: EscooterCostPerKmGuideDefinition =
  {
    slug: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_COST_PER_KM_TOOL_HREF,
    guideLinkLabel: "E-scooter cost per kilometer calculator",
    title: "E-Scooter Cost per Kilometer Calculator",
    description: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter cost per kilometer calculator",
      "escooter cost per km",
      "scooter electricity cost per km",
      "commute savings scooter vs transit",
      "wh per km cost",
      "escooter marginal cost",
    ],
    seo: {
      sections: [
        {
          heading: "Marginal cost is mostly kWh",
          body: "An e-scooter cost per kilometer calculator makes the energy line item explicit: Wh per km times your tariff. Riders surprised by low electricity bills often underestimate how cheap each km is—and how much transit multipliers (daily fares, zones) dominate weekly spend.",
        },
        {
          heading: "Wh/km drives the number",
          body: "Soft tyres, cold weather, and hills raise Wh/km silently. Feed measured or modelled consumption, not brochure range divided by pack Wh alone. A 20 % Wh/km penalty is a 20 % cost/km penalty at the same utility rate.",
        },
        {
          heading: "Transit comparison is planning, not accounting",
          body: "The default ten trips per week is a commute template—adjust mentally for your pass, partial remote days, or multi-modal legs. Use annual savings as an order-of-magnitude; add maintenance km costs from tyre and brake tools for ownership TCO.",
        },
      ],
    },
    content: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_CONTENT,
  };

const ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter vs public transit cost comparison: weekly electricity spend vs. fare × trips—annual commute savings from Wh/km, utility rate, and your typical bus or metro ticket.",
  heroSubtitle:
    "Transit fares multiply by every tap; scooter cost scales with kWh. This e-scooter vs public transit cost comparison stacks weekly electricity against ten commute fares—then annualises the gap so you can sanity-check scooter economics before buying a pass.",
  benefits: [
    "Weekly scooter cost from measured Wh/km × electricity rate × commute km.",
    "Weekly transit baseline: fare per trip × 10 (adjust mentally for your pass).",
    "Annual savings = (weekly transit − weekly scooter) × 52 weeks.",
  ],
  howItWorks: [
    "Enter Wh/km, $/kWh, and weekly commute distance for scooter electricity cost.",
    "Add your typical single-trip transit fare (bus, metro, tram).",
    "Compare weekly totals and read estimated annual savings—not including scooter purchase price.",
  ],
  faq: [
    {
      q: "How does an e-scooter vs public transit cost comparison work?",
      a: "The tool computes weekly scooter electricity cost from Wh/km and your tariff, then compares to weekly transit spend modeled as fare × 10 trips. Annual savings multiplies the weekly difference by 52. It is marginal operating cost, not full TCO with hardware and maintenance.",
    },
    {
      q: "Why ten transit trips per week?",
      a: "Ten round-trip days is a common five-day commute template (two taps per day). If you use a monthly pass, compare pass price directly to weekly scooter cost instead of per-tap fare.",
    },
    {
      q: "Example with default calculator inputs?",
      a: "15 Wh/km, $0.14/kWh, 40 km/week → ~$0.08/week electricity. Transit at $2.50 × 10 → $25/week. Difference ≈ $24.92/week → ~$1,296/year savings before tyres and depreciation.",
    },
    {
      q: "When might transit still win?",
      a: "Heavy subsidised passes, very short commutes where fare caps are low, or weather forcing mixed modes can narrow the gap. Add maintenance from tyre-wear tools if you need ownership TCO, not electricity alone.",
    },
  ],
  technicalSpecs: [
    "Weekly scooter $ = (Wh/km ÷ 1000) × $/kWh × weekly km.",
    "Weekly transit $ = fare × 10 trips (template).",
    "Annual savings $ = (transit − scooter) × 52.",
    "Example: $25 transit vs. ~$0.08 scooter → ~$1,296/yr nominal.",
    "Related: e-scooter-cost-per-kilometer-calculator, escooter-range.",
  ],
};

const ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_GUIDE: EscooterCostPerKmGuideDefinition =
  {
    slug: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_GUIDE_HREF,
    toolHref: ESCOOTER_COST_PER_KM_TOOL_HREF,
    guideLinkLabel: "E-scooter vs public transit cost comparison",
    title: "E-Scooter vs Public Transit Cost Comparison",
    description: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_CONTENT.metaDescription,
    keywords: [
      "e-scooter vs public transit cost comparison",
      "scooter vs bus fare savings",
      "commute cost scooter transit",
      "annual savings escooter",
      "electricity vs transit fare",
      "micromobility commute economics",
    ],
    seo: {
      sections: [
        {
          heading: "Fares compound; kWh trickles",
          body: "An e-scooter vs public transit cost comparison highlights different cost curves: transit charges per tap or pass period; scooters charge mostly for wall energy spread across kilometres. Weekly templates make that asymmetry visible before you annualise.",
        },
        {
          heading: "Match the comparison to your ticket",
          body: "Single-ride fares exaggerate transit cost versus monthly passes—and partial remote weeks shrink both legs. Use the fare field as your typical out-of-pocket trip cost, then adjust the ten-trip template mentally for two-tap days, zone upgrades, or unlimited passes.",
        },
        {
          heading: "Savings is not payback period",
          body: "Annual savings ignores deck purchase, tyres, and insurance. After the comparison, add maintenance km from tyre and brake tools and divide hardware cost by years of ownership if you need true break-even versus transit—not just operating margin.",
        },
      ],
    },
    content: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_CONTENT,
  };

const ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electric scooter commute savings calculator: annual $ saved from low Wh/km electricity vs. transit fares—weekly commute km, utility rate, and typical ticket price in one estimate.",
  heroSubtitle:
    "Commute savings start with how cheap each kilometre is to charge—and how expensive each transit tap feels. This electric scooter commute savings calculator annualises the gap between weekly electricity and weekly fares so you can budget the scooter leg of a multi-modal commute.",
  benefits: [
    "Annual savings headline from weekly transit minus weekly scooter electricity.",
    "Built from your measured Wh/km, tariff, commute km, and fare per trip.",
    "Separates operating savings from hardware payback—plan cash flow before purchase.",
  ],
  howItWorks: [
    "Enter Wh/km and electricity rate to get marginal $/km and weekly scooter spend.",
    "Add weekly commute km and typical transit fare (template: 10 trips/week).",
    "Read annual commute savings—adjust trip count for hybrid or part-time office weeks.",
  ],
  faq: [
    {
      q: "What is an electric scooter commute savings calculator?",
      a: "It estimates how much you save per year riding a scooter for commute electricity cost versus paying transit fares. Inputs are Wh/km, $/kWh, weekly km, and fare; output includes weekly costs and annual savings—not deck purchase price or maintenance.",
    },
    {
      q: "How is annual commute savings calculated?",
      a: "Weekly scooter cost = (Wh/km ÷ 1000) × rate × weekly km. Weekly transit = fare × 10 (template). Annual savings = (weekly transit − weekly scooter) × 52. Default example lands near ~$1,300/year at 15 Wh/km, $0.14/kWh, 40 km/wk, $2.50 fare.",
    },
    {
      q: "Does this include parking or fuel savings?",
      a: "No—it compares scooter electricity to public transit fares. If you replace driving, savings would be larger; if you replace walking, scooter cost is incremental. Scope the comparison to what you actually substitute.",
    },
    {
      q: "How do I improve savings accuracy?",
      a: "Use measured Wh/km from your route (range or tyre-pressure tools), your real tariff tier, and actual weekly km. Swap fare × 10 for your monthly pass price ÷ 4.3 if that matches your ticket better.",
    },
  ],
  technicalSpecs: [
    "Annual savings = (weekly transit − weekly scooter) × 52.",
    "Weekly scooter = (Wh/km ÷ 1000) × $/kWh × weekly km.",
    "Weekly transit template = fare × 10 trips.",
    "Example annual savings ≈ $1,296 at default inputs.",
    "Related: e-scooter-vs-public-transit-cost-comparison, escooter-range.",
  ],
};

const ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_GUIDE: EscooterCostPerKmGuideDefinition =
  {
    slug: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_COST_PER_KM_TOOL_HREF,
    guideLinkLabel: "Electric scooter commute savings calculator",
    title: "Electric Scooter Commute Savings Calculator",
    description: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "electric scooter commute savings calculator",
      "escooter commute savings",
      "annual savings micromobility",
      "scooter commute budget",
      "weekly transit vs scooter",
      "commute cost calculator escooter",
    ],
    seo: {
      sections: [
        {
          heading: "Annualise the commute delta",
          body: "Weekly pocket change hides in annual totals. An electric scooter commute savings calculator multiplies the transit-minus-electricity gap by 52 so part-time riders and finance planners see the same number—whether you are arguing for a deck upgrade or a transit pass cancellation.",
        },
        {
          heading: "Inputs commuters actually know",
          body: "You likely know your ticket price and rough weekly distance; Wh/km comes from experience or the range calculator. Savings quality rises when consumption reflects your hills and tyre pressure—not a generic 15 Wh/km placeholder.",
        },
        {
          heading: "After savings: payback and TCO",
          body: "Divide deck plus accessory cost by annual savings for a rough payback year—then subtract tyre and brake maintenance from tyre-wear and brake-pad tools. Operating savings can be large while hardware payback still spans multiple seasons on premium scooters.",
        },
      ],
    },
    content: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterCostPerKmLandingSlug,
  EscooterCostPerKmGuideDefinition
> = {
  [ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_COST_PER_KILOMETER_CALCULATOR_GUIDE,
  [ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG]:
    ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_GUIDE,
  [ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG]:
    ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_GUIDE,
};

/** Landing guide links shown in the E-Scooter Cost per km tool footer Resources column. */
export const ESCOOTER_COST_PER_KM_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_COST_PER_KILOMETER_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Cost per Kilometer Calculator",
    },
    {
      slug: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_LANDING_SLUG,
      href: ESCOOTER_VS_PUBLIC_TRANSIT_COST_COMPARISON_GUIDE_HREF,
      label: "E-Scooter vs Public Transit Cost Comparison",
    },
    {
      slug: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_LANDING_SLUG,
      href: ELECTRIC_SCOOTER_COMMUTE_SAVINGS_CALCULATOR_GUIDE_HREF,
      label: "Electric Scooter Commute Savings Calculator",
    },
  ];

export function isEscooterCostPerKmLandingSlug(
  slug: string
): slug is EscooterCostPerKmLandingSlug {
  return (ESCOOTER_COST_PER_KM_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterCostPerKmLanding(
  slug: EscooterCostPerKmLandingSlug = ESCOOTER_COST_PER_KILOMETER_CALCULATOR_LANDING_SLUG
): EscooterCostPerKmGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterCostPerKmLandings(): EscooterCostPerKmGuideDefinition[] {
  return ESCOOTER_COST_PER_KM_LANDING_SLUGS.map((slug) =>
    getEscooterCostPerKmLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_COST_PER_KM_FOOTER_RESOURCES. */
export function getEscooterCostPerKmToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_COST_PER_KM_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_COST_PER_KM_CALCULATOR_ID };
