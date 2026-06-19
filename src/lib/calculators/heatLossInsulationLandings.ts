import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const HEAT_LOSS_INSULATION_TOOL_PATH =
  "/tools/green-home-efficiency/heat-loss-insulation/" as const;

export const HEAT_LOSS_INSULATION_TOOL_HREF = getCalculatorHref(
  "heat-loss-insulation",
  "green-home"
);

const BASE_CALCULATOR_ID = "heat-loss-insulation" as const;

export type HeatLossInsulationLandingSlug =
  | "heat-loss-calculation-calculator"
  | "estimate-heat-loss-by-r-value"
  | "building-envelope-heat-loss-calculator";

export const HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG =
  "heat-loss-calculation-calculator" as const;

export const ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG =
  "estimate-heat-loss-by-r-value" as const;

export const BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG =
  "building-envelope-heat-loss-calculator" as const;

export const HEAT_LOSS_INSULATION_LANDING_SLUGS = [
  HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG,
  ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG,
  BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly HeatLossInsulationLandingSlug[];

export const HEAT_LOSS_CALCULATION_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG
);

export const ESTIMATE_HEAT_LOSS_BY_R_VALUE_GUIDE_HREF = getGuideLandingHref(
  ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG
);

export const BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG);

export type HeatLossInsulationGuideDefinition = GuideLandingDefinition & {
  slug: HeatLossInsulationLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const HEAT_LOSS_CALCULATION_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Heat loss calculation calculator: estimate BTU/hr and watts from envelope area, indoor−outdoor ΔT, and R-value—size heating loads and compare insulation before you upgrade.",
  heroSubtitle:
    "Steady-state heat loss through one envelope segment is a straight line: area, temperature difference, and R-value. This guide walks through the heat loss calculation calculator before you sum walls, roof, windows, and infiltration for a full building model.",
  benefits: [
    "Clear formula: BTU/hr ≈ (area × ΔT) ÷ R for a single surface assembly.",
    "Outputs watts and kW for electric heat and heat-pump sizing cross-checks.",
    "Useful baseline before insulation upgrades—rerun with higher R to see loss drop.",
  ],
  howItWorks: [
    "Enter envelope area in square feet for the wall, ceiling, or segment you are modeling.",
    "Set indoor−outdoor ΔT in °F (design-day temperature difference).",
    "Input assembly R-value; review BTU/hr, watts, and kW steady heat loss.",
  ],
  faq: [
    {
      q: "How do I calculate heat loss through a wall?",
      a: "BTU/hr ≈ (area sq ft × ΔT °F) ÷ R. Example: 400 sq ft wall, ΔT 40 °F, R-20 → 400 × 40 ÷ 20 = 800 BTU/hr (~234 W). Double R to 40 and the same segment drops to 400 BTU/hr.",
    },
    {
      q: "What ΔT should I use for heat loss calculations?",
      a: "Use a design temperature difference for your climate—often 40–70 °F for winter heating depending on indoor setpoint and local outdoor design temp. Summer cooling uses outdoor−indoor when heat flows inward. Match ΔT to the season you are sizing.",
    },
    {
      q: "Does this calculator cover the whole house?",
      a: "This tool models one envelope segment at a time. Sum BTU/hr or watts across walls, roof, floor, windows (often with U-value), and add infiltration for a whole-building load. Use each surface’s area and R—or U = 1/R for conductance.",
    },
  ],
  technicalSpecs: [
    "BTU/hr = (area_sq_ft × ΔT_°F) ÷ R.",
    "Watts ≈ BTU/hr ÷ 3.412.",
    "kW = watts ÷ 1000.",
    "Related: home-insulation-savings, heater-cost, heat-pump-vs-resistance.",
  ],
};

const HEAT_LOSS_CALCULATION_CALCULATOR_GUIDE: HeatLossInsulationGuideDefinition = {
  slug: HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "green-home",
  href: HEAT_LOSS_CALCULATION_CALCULATOR_GUIDE_HREF,
  toolHref: HEAT_LOSS_INSULATION_TOOL_HREF,
  guideLinkLabel: "Heat loss calculation calculator",
  title: "Heat Loss Calculation Calculator",
  description: HEAT_LOSS_CALCULATION_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "heat loss calculation calculator",
    "building heat loss calculator",
    "r value heat loss formula",
    "btu per hour heat loss",
    "envelope heat loss watts",
  ],
  seo: {
    sections: [
      {
        heading: "R-value is resistance",
        body: "Higher R means less heat flow for the same area and ΔT. Attic jumps from R-30 to R-60 can halve conductive loss through that plane—before air sealing stops bypass flow that R alone cannot fix. Run the calculator twice with before/after R to quantify an insulation quote.",
      },
      {
        heading: "One segment, then stack",
        body: "Contractors think in whole-house BTU/h; diagnostics start per surface. Calculate heat loss for the north wall, gable, or kneewall separately, then add segments. Gaps in your model—uninsulated rim joists, single-pane bays—show up when the sum falls short of metered heating use.",
      },
    ],
  },
  content: HEAT_LOSS_CALCULATION_CALCULATOR_CONTENT,
};

const ESTIMATE_HEAT_LOSS_BY_R_VALUE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate heat loss by R-value: see how BTU/hr and watts change when you raise wall or attic R for the same area and ΔT—compare before/after insulation scenarios quickly.",
  heroSubtitle:
    "R-value is the knob most insulation upgrades turn. Hold area and ΔT fixed, sweep R from code minimum to deep retrofit, and estimate heat loss for each scenario before you approve blown-in, batts, or exterior foam.",
  benefits: [
    "Shows inverse relationship: heat loss ∝ 1/R for a given area and ΔT.",
    "Compare R-13 vs. R-21 vs. R-30 on the same wall area in minutes.",
    "Outputs BTU/hr and watts so HVAC and electric heat sizing stay aligned.",
  ],
  howItWorks: [
    "Fix envelope area (sq ft) and design ΔT for your climate and setpoint.",
    "Enter current assembly R-value; note BTU/hr and kW heat loss.",
    "Rerun with target R after upgrade—delta BTU/hr is conductive savings for that segment.",
  ],
  faq: [
    {
      q: "How does R-value affect heat loss?",
      a: "For the same area and ΔT, BTU/hr = (area × ΔT) ÷ R. Doubling R halves heat loss through that assembly. Example: 500 sq ft, ΔT 50 °F, R-10 → 2,500 BTU/hr; at R-20 → 1,250 BTU/hr.",
    },
    {
      q: "What R-value should I use for estimating heat loss?",
      a: "Use the whole-assembly R, not cavity insulation alone—sheathing, air films, and siding count. Attic: measure depth and material (e.g. R-38 batts). Walls: check energy audit or borescope; older homes may be R-11 or less while code new build exceeds R-20 in many zones.",
    },
    {
      q: "Can I estimate whole-house savings from one R upgrade?",
      a: "Only for that surface’s share of loss. Attic R jumps help most when the attic was the weak link; wall foam helps when walls dominated. Estimate heat loss by R for each plane, sum before and after, then pair with home insulation savings for annual kWh impact.",
    },
  ],
  technicalSpecs: [
    "BTU/hr = (area_sq_ft × ΔT_°F) ÷ R.",
    "Δ loss when R changes: BTU_before − BTU_after at same area, ΔT.",
    "U = 1/R (conductance); lower U means less heat flow.",
    "Related: home-insulation-savings, heat-loss-calculation-calculator, heater-cost.",
  ],
};

const ESTIMATE_HEAT_LOSS_BY_R_VALUE_GUIDE: HeatLossInsulationGuideDefinition = {
  slug: ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "green-home",
  href: ESTIMATE_HEAT_LOSS_BY_R_VALUE_GUIDE_HREF,
  toolHref: HEAT_LOSS_INSULATION_TOOL_HREF,
  guideLinkLabel: "Estimate heat loss by R-value",
  title: "Estimate Heat Loss by R-Value",
  description: ESTIMATE_HEAT_LOSS_BY_R_VALUE_CONTENT.metaDescription,
  keywords: [
    "estimate heat loss by r-value",
    "r value heat loss estimate",
    "insulation r value btu loss",
    "compare r value heat loss",
    "attic wall r value calculator",
  ],
  seo: {
    sections: [
      {
        heading: "Sweep R before you buy insulation",
        body: "Quotes list inches and R per inch; your question is BTU/hr at the thermostat. Fix area and ΔT, slide R from today’s value to the bid spec, and read the drop. A $3k attic job that removes 1,200 BTU/hr matters more than marginal wall foam when the attic was R-19 and the design call was R-49.",
      },
      {
        heading: "R is not the whole envelope",
        body: "Thermal bridging, windows, and infiltration bypass rated R in cavities. Estimating heat loss by R-value for opaque walls and ceilings is still the right first step—then add window U-factors and air leakage separately. Underestimating R on one bay skews the whole before/after story.",
      },
    ],
  },
  content: ESTIMATE_HEAT_LOSS_BY_R_VALUE_CONTENT,
};

const BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Building envelope heat loss calculator: model conductive loss through walls, roof, or floor segments using area, ΔT, and R-value—stack BTU/hr across the shell before HVAC sizing.",
  heroSubtitle:
    "The building envelope is every surface between conditioned air and outdoors. This guide shows how to use the envelope heat loss calculator segment by segment—then sum walls, attic, and foundation paths for a clearer heating load picture.",
  benefits: [
    "Models one envelope plane at a time with area, ΔT, and assembly R.",
    "Outputs BTU/hr and kW per segment for stacking into whole-building loads.",
    "Helps spot weak planes—thin walls, uninsulated rim joists, low attic R.",
  ],
  howItWorks: [
    "List envelope segments: above-grade walls, attic floor, rim/band, slab edge.",
    "For each segment, enter sq ft, design ΔT, and effective R-value.",
    "Sum BTU/hr or watts across segments; add windows (U-value) and infiltration separately.",
  ],
  faq: [
    {
      q: "What is building envelope heat loss?",
      a: "Heat flowing through the thermal shell—walls, roof, floor, doors, and windows—plus air leakage. Conductive loss through an opaque segment ≈ (area × ΔT) ÷ R in BTU/hr. The full envelope is the sum of all segments plus infiltration.",
    },
    {
      q: "How do I use a building envelope heat loss calculator?",
      a: "Run each major surface separately. Example: north wall 320 sq ft R-15, ΔT 45 °F → 960 BTU/hr; attic 1,200 sq ft R-30 → 1,800 BTU/hr. Add segments, then compare total to furnace run time or Manual J for sanity.",
    },
    {
      q: "Are windows included in envelope R calculations?",
      a: "Not in a single-wall R input—glazing uses U-factor (BTU/hr·ft²·°F). Treat windows as their own area × U × ΔT line item, then add to opaque-wall totals from this calculator.",
    },
  ],
  technicalSpecs: [
    "Per segment: BTU/hr = (area_sq_ft × ΔT_°F) ÷ R.",
    "Envelope conductive total ≈ Σ segment BTU/hr.",
    "Windows: BTU/hr ≈ area × U × ΔT (separate from opaque R).",
    "Related: home-insulation-savings, smart-thermostat-savings, heater-cost.",
  ],
};

const BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_GUIDE: HeatLossInsulationGuideDefinition =
  {
    slug: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_GUIDE_HREF,
    toolHref: HEAT_LOSS_INSULATION_TOOL_HREF,
    guideLinkLabel: "Building envelope heat loss calculator",
    title: "Building Envelope Heat Loss Calculator",
    description: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "building envelope heat loss calculator",
      "envelope heat loss btu",
      "thermal shell heat loss",
      "wall roof heat loss calculator",
      "whole building envelope r value",
    ],
    seo: {
      sections: [
        {
          heading: "The shell is a sum of parts",
          body: "Whole-house heat loss is rarely one formula—it is north wall plus south wall plus attic plus rim joists, each with different area and R. The envelope calculator handles one assembly per run; your spreadsheet or audit template stacks the outputs. Missing a kneewall or garage ceiling plane is how models under-predict winter load.",
        },
        {
          heading: "Conductive loss before infiltration",
          body: "Air sealing and blower-door leakage sit beside conductive math, not inside it. Tighten the envelope R model first so insulation bids target the right planes; then add CFM50 or ACH-based infiltration to the stacked BTU/hr. Envelope upgrades that raise R without sealing still leave hidden bypasses.",
        },
      ],
    },
    content: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  HeatLossInsulationLandingSlug,
  HeatLossInsulationGuideDefinition
> = {
  [HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG]:
    HEAT_LOSS_CALCULATION_CALCULATOR_GUIDE,
  [ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG]:
    ESTIMATE_HEAT_LOSS_BY_R_VALUE_GUIDE,
  [BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG]:
    BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_GUIDE,
};

export const HEAT_LOSS_INSULATION_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG,
      href: HEAT_LOSS_CALCULATION_CALCULATOR_GUIDE_HREF,
      label: "Heat Loss Calculation Calculator",
    },
    {
      slug: ESTIMATE_HEAT_LOSS_BY_R_VALUE_LANDING_SLUG,
      href: ESTIMATE_HEAT_LOSS_BY_R_VALUE_GUIDE_HREF,
      label: "Estimate Heat Loss by R-Value",
    },
    {
      slug: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_LANDING_SLUG,
      href: BUILDING_ENVELOPE_HEAT_LOSS_CALCULATOR_GUIDE_HREF,
      label: "Building Envelope Heat Loss Calculator",
    },
  ];

export function isHeatLossInsulationLandingSlug(
  slug: string
): slug is HeatLossInsulationLandingSlug {
  return (HEAT_LOSS_INSULATION_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getHeatLossInsulationLanding(
  slug: HeatLossInsulationLandingSlug = HEAT_LOSS_CALCULATION_CALCULATOR_LANDING_SLUG
): HeatLossInsulationGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllHeatLossInsulationLandings(): HeatLossInsulationGuideDefinition[] {
  return HEAT_LOSS_INSULATION_LANDING_SLUGS.map((slug) =>
    getHeatLossInsulationLanding(slug)
  );
}

/** Static footer links derived from HEAT_LOSS_INSULATION_FOOTER_RESOURCES. */
export function getHeatLossInsulationToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return HEAT_LOSS_INSULATION_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as HEAT_LOSS_INSULATION_CALCULATOR_ID };
