import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const HOME_INSULATION_SAVINGS_TOOL_PATH =
  "/tools/green-home-efficiency/home-insulation-savings/" as const;

export const HOME_INSULATION_SAVINGS_TOOL_HREF = getCalculatorHref(
  "home-insulation-savings",
  "green-home"
);

const BASE_CALCULATOR_ID = "home-insulation-savings" as const;

export type HomeInsulationSavingsLandingSlug =
  | "home-insulation-savings-calculator"
  | "estimate-annual-heating-and-cooling-savings"
  | "energy-savings-from-wall-and-window-insulation";

export const HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG =
  "home-insulation-savings-calculator" as const;

export const ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG =
  "estimate-annual-heating-and-cooling-savings" as const;

export const ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG =
  "energy-savings-from-wall-and-window-insulation" as const;

export const HOME_INSULATION_SAVINGS_LANDING_SLUGS = [
  HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG,
  ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG,
  ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG,
] as const satisfies readonly HomeInsulationSavingsLandingSlug[];

export const HOME_INSULATION_SAVINGS_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG
);

export const ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG);

export const ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_GUIDE_HREF =
  getGuideLandingHref(ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG);

export type HomeInsulationSavingsGuideDefinition = GuideLandingDefinition & {
  slug: HomeInsulationSavingsLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const HOME_INSULATION_SAVINGS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Home insulation savings calculator: estimate annual HVAC kWh and dollar savings from upgrading wall insulation and windows—before/after composite U-value and efficiency score.",
  heroSubtitle:
    "Insulation payback starts with envelope math—not brochure R-values alone. This guide walks through the home insulation savings calculator: floor area, wall insulation level, window glazing, climate zone, and $/kWh to see before/after HVAC cost.",
  benefits: [
    "Models composite U from wall insulation and window type for your floor area.",
    "Compares current envelope to advanced insulation + Low-E glazing upgrade scenario.",
    "Outputs annual kWh, cost, savings $, savings %, and an envelope efficiency score.",
  ],
  howItWorks: [
    "Enter conditioned floor area (m²) and your electricity rate ($/kWh).",
    "Select current wall insulation level, window glazing, and climate zone.",
    "Review before/after annual HVAC energy and cost; savings line is the upgrade delta.",
  ],
  faq: [
    {
      q: "How much can I save with better home insulation?",
      a: "Savings depend on climate, floor area, and starting U-value. Moving from standard walls + double glazing to advanced insulation + Low-E often cuts modeled HVAC kWh 20–30% in mixed climates. Example: $1,200/year HVAC at standard → ~$840 after upgrade ≈ $360/year savings at the same rate.",
    },
    {
      q: "What does the calculator include in the upgrade scenario?",
      a: "The after case targets advanced wall insulation (low U) plus Low-E double glazing—typical deep retrofit targets. Attic-only or air-sealing work may add savings beyond this model; use heat loss tools for segment-level BTU math.",
    },
    {
      q: "Does this work for gas or heat-pump heating?",
      a: "Enter a blended $/kWh equivalent from your total HVAC spend ÷ kWh (or convert gas therms to $/kWh). The kWh savings scale similarly; absolute dollars track your tariff. Heat pumps shift kWh but envelope upgrades still lower load.",
    },
  ],
  technicalSpecs: [
    "Composite U ≈ (1 − f_windows) × wall_U + f_windows × window_U.",
    "Annual HVAC kWh scales with floor area, climate intensity, and envelope multiplier.",
    "Annual savings $ = (kWh_before − kWh_after) × $/kWh.",
    "Related: heat-loss-insulation, smart-thermostat-savings, heater-cost.",
  ],
};

const HOME_INSULATION_SAVINGS_CALCULATOR_GUIDE: HomeInsulationSavingsGuideDefinition =
  {
    slug: HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: HOME_INSULATION_SAVINGS_CALCULATOR_GUIDE_HREF,
    toolHref: HOME_INSULATION_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Home insulation savings calculator",
    title: "Home Insulation Savings Calculator",
    description: HOME_INSULATION_SAVINGS_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "home insulation savings calculator",
      "insulation energy savings estimate",
      "hvac savings from insulation",
      "window upgrade savings calculator",
      "u value home savings",
    ],
    seo: {
      sections: [
        {
          heading: "U-value drives the delta",
          body: "Lower composite U means less heat loss in winter and less gain in summer. The calculator weights walls and windows into one envelope figure for your floor area and climate. Standard-to-advanced jumps show up as annual kWh and dollars—not just a warmer room feel.",
        },
        {
          heading: "Planning, not a blower-door report",
          body: "Results are retrofit planning estimates. Air leakage, attic depth, HVAC efficiency, and thermostat behavior all move real bills. Use the savings line to rank quotes and rebates; confirm with an audit or post-upgrade utility comparison when the work is done.",
        },
      ],
    },
    content: HOME_INSULATION_SAVINGS_CALCULATOR_CONTENT,
  };

const ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Estimate annual heating and cooling savings from insulation and window upgrades: compare before/after HVAC kWh and cost by floor area, envelope U-value, and climate zone.",
    heroSubtitle:
      "Heating and cooling dollars stack over twelve months—a tighter envelope lowers both winter heat loss and summer gain. This guide shows how to estimate annual HVAC savings when you upgrade wall insulation and glazing before you sign a retrofit quote.",
    benefits: [
      "Annual kWh before/after from composite envelope U and climate intensity.",
      "Converts energy delta to annual $ savings at your $/kWh rate.",
      "Covers heating-heavy, cooling-heavy, and mixed climates via zone presets.",
    ],
    howItWorks: [
      "Enter conditioned floor area (m²) and electricity rate ($/kWh).",
      "Set current insulation level, window type, and climate (hot, moderate, or cold).",
      "Read annual HVAC kWh and cost before vs. after the upgrade scenario; savings is the gap.",
    ],
    faq: [
      {
        q: "How do I estimate annual heating and cooling savings from insulation?",
        a: "Model envelope U before and after upgrade, apply floor area and climate HVAC intensity, then subtract annual kWh. Multiply kWh saved by $/kWh for dollars. Example: 4,200 kWh/year before → 3,150 after → 1,050 kWh saved; at $0.14/kWh ≈ $147/year.",
      },
      {
        q: "Does insulation save on both heating and cooling?",
        a: "Yes—a lower U-value reduces heat flow in both directions. Cold climates see more heating savings; hot climates more cooling. Mixed zones benefit on both shoulders. Pick the climate preset that matches your dominant load.",
      },
      {
        q: "What annual savings are realistic from wall and window upgrades?",
        a: "Many standard-to-advanced envelope upgrades land in the 15–30% HVAC kWh range in planning models—higher if you start from bare block or single-pane glass. Attic air sealing and duct work can add beyond what wall/window U alone shows.",
      },
    ],
    technicalSpecs: [
      "Annual savings kWh ≈ annual_kWh_before − annual_kWh_after.",
      "Annual savings $ ≈ savings_kWh × $/kWh.",
      "Climate presets scale base kWh/m² (hot, moderate, cold).",
      "Related: heat-loss-insulation, heat-pump-vs-resistance, ac-energy-cost.",
    ],
  };

const ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_GUIDE: HomeInsulationSavingsGuideDefinition =
  {
    slug: ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_GUIDE_HREF,
    toolHref: HOME_INSULATION_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Estimate annual heating and cooling savings",
    title: "Estimate Annual Heating and Cooling Savings",
    description:
      ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_CONTENT.metaDescription,
    keywords: [
      "estimate annual heating and cooling savings",
      "insulation hvac savings per year",
      "annual energy savings insulation upgrade",
      "heating cooling cost reduction insulation",
      "yearly savings better windows insulation",
    ],
    seo: {
      sections: [
        {
          heading: "One envelope, two seasons",
          body: "Winter pulls heat out; summer pushes it in. Annual HVAC savings from insulation aggregate both—so a wall upgrade that helps January also trims August AC if gain through the shell drops. Climate presets weight heating vs. cooling so the annual line matches your region.",
        },
        {
          heading: "From annual kWh to payback",
          body: "Divide retrofit cost by annual $ savings for simple payback. Rebates and financing change the decision, but the numerator must be credible—rerun with your actual floor area and starting insulation, not a demo home. Post-upgrade bills are the final truth test.",
        },
      ],
    },
    content: ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_CONTENT,
  };

const ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Energy savings from wall and window insulation: see how lower wall U and better glazing cut annual HVAC kWh and cost—composite envelope model for your floor area and climate.",
    heroSubtitle:
      "Walls and windows are the two levers most retrofits pull. This guide explains energy savings from wall and window insulation together—composite U-value, before/after annual kWh, and dollars at your electricity rate.",
    benefits: [
      "Combines wall insulation level and window glazing into one envelope U.",
      "Shows kWh and $ saved when both planes move toward high-performance targets.",
      "Helps compare wall-only vs. window-only quotes against a combined upgrade.",
    ],
    howItWorks: [
      "Select current wall insulation (bare block, standard, or advanced) and window type.",
      "Add floor area, climate zone, and $/kWh—the tool models before vs. after upgrade.",
      "Read annual energy savings from the wall + window insulation scenario in kWh and cost.",
    ],
    faq: [
      {
        q: "How much energy do wall and window insulation save together?",
        a: "Savings scale with starting U-value and climate. Standard walls + double glass upgraded to advanced walls + Low-E often drops modeled HVAC kWh 20–30%. Walls dominate opaque area; windows punch above their share because glass U is higher—both belong in the model.",
      },
      {
        q: "Should I insulate walls or replace windows first?",
        a: "Run the calculator both ways—hold windows fixed and raise wall insulation, then swap. Whichever move cuts more annual kWh per dollar quoted is the better first phase. Many homes need both; the combined line is what full retrofit savings look like.",
      },
      {
        q: "What window types matter for energy savings?",
        a: "Single pane → double glazing is a large step; double → Low-E double cuts solar gain and conduction further. The calculator uses preset U-values for single, double, and Low-E—match your bid spec to the closest option.",
      },
    ],
    technicalSpecs: [
      "Composite U ≈ (1 − f_win) × wall_U + f_win × window_U.",
      "Lower composite U → lower annual HVAC kWh for same floor area & climate.",
      "Energy savings = kWh_before − kWh_after; $ savings = ΔkWh × $/kWh.",
      "Related: heat-loss-insulation, led-roi, smart-thermostat-savings.",
    ],
  };

const ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_GUIDE: HomeInsulationSavingsGuideDefinition =
  {
    slug: ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_GUIDE_HREF,
    toolHref: HOME_INSULATION_SAVINGS_TOOL_HREF,
    guideLinkLabel: "Energy savings from wall and window insulation",
    title: "Energy Savings from Wall and Window Insulation",
    description:
      ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_CONTENT.metaDescription,
    keywords: [
      "energy savings from wall and window insulation",
      "wall insulation window upgrade savings",
      "composite u value savings",
      "insulation and glazing hvac kwh",
      "envelope retrofit energy reduction",
    ],
    seo: {
      sections: [
        {
          heading: "Two materials, one thermal shell",
          body: "Heat does not care whether it left through a 2×4 bay or a patio door—it counts against the same HVAC meter. Modeling wall U and window U together avoids over-crediting wall foam when leaky single-pane glass still dominates the load.",
        },
        {
          heading: "kWh saved is the product spec",
          body: "Contractors sell R and U; you pay in kWh. Translate both upgrades into annual energy savings before you compare bids. A window package with smaller R bump but better glass can beat wall-only foam on the same house—the calculator makes that trade visible.",
        },
      ],
    },
    content: ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  HomeInsulationSavingsLandingSlug,
  HomeInsulationSavingsGuideDefinition
> = {
  [HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG]:
    HOME_INSULATION_SAVINGS_CALCULATOR_GUIDE,
  [ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG]:
    ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_GUIDE,
  [ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG]:
    ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_GUIDE,
};

export const HOME_INSULATION_SAVINGS_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG,
      href: HOME_INSULATION_SAVINGS_CALCULATOR_GUIDE_HREF,
      label: "Home Insulation Savings Calculator",
    },
    {
      slug: ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_LANDING_SLUG,
      href: ESTIMATE_ANNUAL_HEATING_AND_COOLING_SAVINGS_GUIDE_HREF,
      label: "Estimate Annual Heating and Cooling Savings",
    },
    {
      slug: ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_LANDING_SLUG,
      href: ENERGY_SAVINGS_FROM_WALL_AND_WINDOW_INSULATION_GUIDE_HREF,
      label: "Energy Savings from Wall and Window Insulation",
    },
  ];

export function isHomeInsulationSavingsLandingSlug(
  slug: string
): slug is HomeInsulationSavingsLandingSlug {
  return (HOME_INSULATION_SAVINGS_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getHomeInsulationSavingsLanding(
  slug: HomeInsulationSavingsLandingSlug = HOME_INSULATION_SAVINGS_CALCULATOR_LANDING_SLUG
): HomeInsulationSavingsGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllHomeInsulationSavingsLandings(): HomeInsulationSavingsGuideDefinition[] {
  return HOME_INSULATION_SAVINGS_LANDING_SLUGS.map((slug) =>
    getHomeInsulationSavingsLanding(slug)
  );
}

/** Static footer links derived from HOME_INSULATION_SAVINGS_FOOTER_RESOURCES. */
export function getHomeInsulationSavingsToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return HOME_INSULATION_SAVINGS_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as HOME_INSULATION_SAVINGS_CALCULATOR_ID };
