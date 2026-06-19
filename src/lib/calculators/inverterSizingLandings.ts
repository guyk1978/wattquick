import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const INVERTER_SIZING_TOOL_PATH =
  "/tools/battery-sizing/inverter-sizing/" as const;

export const INVERTER_SIZING_TOOL_HREF = getCalculatorHref(
  "inverter-sizing",
  "sizing"
);

const BASE_CALCULATOR_ID = "inverter-sizing" as const;

export type InverterSizingLandingSlug =
  | "inverter-sizing-calculator"
  | "calculate-minimum-inverter-size-for-peak-load"
  | "off-grid-inverter-capacity-estimator";

export const INVERTER_SIZING_CALCULATOR_LANDING_SLUG =
  "inverter-sizing-calculator" as const;

export const CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG =
  "calculate-minimum-inverter-size-for-peak-load" as const;

export const OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG =
  "off-grid-inverter-capacity-estimator" as const;

export const INVERTER_SIZING_LANDING_SLUGS = [
  INVERTER_SIZING_CALCULATOR_LANDING_SLUG,
  CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG,
  OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly InverterSizingLandingSlug[];

export const INVERTER_SIZING_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  INVERTER_SIZING_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG);

export const OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG);

export type InverterSizingGuideDefinition = GuideLandingDefinition & {
  slug: InverterSizingLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const INVERTER_SIZING_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Inverter sizing calculator: minimum inverter watts = peak load × (1 + margin %). Size off-grid, RV, and backup inverters from steady load plus headroom for surge and expansion.",
  heroSubtitle:
    "Undersized inverters trip on motor starts; oversized units waste money and idle draw. This inverter sizing calculator takes your peak load in watts and a safety margin percent to recommend a minimum inverter rating for planning.",
  benefits: [
    "Minimum W = peak load × (1 + margin ÷ 100).",
    "Default margin covers modest surge and future loads.",
    "Outputs a watt target before you shop continuous vs. peak specs.",
  ],
  howItWorks: [
    "Sum steady-state watts for appliances on the inverter bus.",
    "Enter peak load W and a safety margin percent.",
    "Read minimum inverter size in watts—match to datasheet continuous rating.",
  ],
  faq: [
    {
      q: "How does an inverter sizing calculator work?",
      a: "Multiply peak load watts by one plus the margin fraction: inverter W = peak W × (1 + margin ÷ 100). Example: 1,800 W peak with 25% margin → 2,250 W minimum. Use running watts for steady loads; raise margin when fridges, pumps, or power tools start on the same bus.",
    },
    {
      q: "What is a good safety margin for inverter sizing?",
      a: "20–30% is common for mostly resistive loads. Motor-heavy rigs often need 35–50% margin—or a separate surge calculator—because compressors can draw 2–3× at startup. Document which loads can start together before finalizing the SKU.",
    },
    {
      q: "Continuous watts vs. peak (surge) on the datasheet?",
      a: "This calculator targets minimum continuous watts after margin. Inverter labels also list peak/surge watts for motor starts. Pick a unit whose surge rating covers your largest starting load even when continuous watts meet the calculated minimum.",
    },
  ],
  technicalSpecs: [
    "Minimum inverter W = peak_W × (1 + margin% ÷ 100).",
    "Peak load = sum of simultaneous running watts.",
    "Motors may need extra surge headroom beyond margin %.",
    "Related: inverter-sizing, watts-to-amps, battery-bank-size, ups-runtime.",
  ],
};

const INVERTER_SIZING_CALCULATOR_GUIDE: InverterSizingGuideDefinition = {
  slug: INVERTER_SIZING_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "sizing",
  href: INVERTER_SIZING_CALCULATOR_GUIDE_HREF,
  toolHref: INVERTER_SIZING_TOOL_HREF,
  guideLinkLabel: "Inverter sizing calculator",
  title: "Inverter Sizing Calculator",
  description: INVERTER_SIZING_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "inverter sizing calculator",
    "inverter size calculator",
    "how to size an inverter",
    "inverter watts calculator",
    "off grid inverter sizing",
  ],
  seo: {
    sections: [
      {
        heading: "Start from simultaneous peak load, not nameplate guesses",
        body: "An inverter sizing calculator needs the watts that can be on at once—not every device in the house. Add running watts for loads on the inverter bus during your worst-case scenario: evening kitchen plus router, or workshop tool plus lights. That peak becomes the base before margin is applied.",
      },
      {
        heading: "Margin covers surge, efficiency loss, and growth",
        body: "A 25% margin turns 1,800 W into 2,250 W—a cushion for brief overloads, inverter conversion loss, and one extra appliance later. Resistive-heavy loads may sit at 20%; vans with fridge compressors or well pumps should test higher margins or model motor surge separately before buying.",
      },
      {
        heading: "Match the result to real inverter labels",
        body: "Calculated watts are a floor for continuous rating. Compare against vendor continuous and peak columns, split-phase needs, and charger pass-through if applicable. Chain to Watts to Amps for DC cable sizing at the battery, or Battery Bank Size when runtime must support the newly sized AC load.",
      },
    ],
  },
  content: INVERTER_SIZING_CALCULATOR_CONTENT,
};

const CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate minimum inverter size for peak load: sum simultaneous running watts, apply a safety margin %, and get the smallest continuous inverter rating that covers your worst-case AC bus.",
    heroSubtitle:
      "Peak load is the watts on together at the worst moment—not every device in the building. This guide shows how to calculate minimum inverter size for peak load with a margin so your off-grid, RV, or backup inverter is not undersized on day one.",
    benefits: [
      "Builds peak W from simultaneous running loads.",
      "Applies margin to yield minimum continuous inverter W.",
      "Separates steady peak from motor surge on datasheets.",
    ],
    howItWorks: [
      "List appliances that can run at the same time on the inverter.",
      "Sum their running watts—that is your peak load.",
      "Enter peak W and margin %—read minimum inverter size in watts.",
    ],
    faq: [
      {
        q: "How do I calculate minimum inverter size for peak load?",
        a: "Add running watts for all loads on at once—that is peak load. Minimum inverter W = peak W × (1 + margin ÷ 100). Example: 2,400 W peak with 25% margin → 3,000 W minimum continuous rating. Verify surge watts separately for motor starts.",
      },
      {
        q: "What counts toward peak load?",
        a: "Only devices energized together on the inverter output. A microwave plus fridge plus lights during dinner counts; a shed tool that is never on with the kitchen does not. Use a load table and highlight the highest simultaneous total.",
      },
      {
        q: "Is minimum size the same as surge rating?",
        a: "No—minimum size from peak load plus margin targets continuous watts. Compressors and pumps may need a higher surge/peak column on the inverter label. Size continuous to the calculated minimum and confirm peak watts cover the largest motor start.",
      },
    ],
    technicalSpecs: [
      "Peak_load_W = Σ simultaneous running watts.",
      "Minimum_inverter_W = peak_W × (1 + margin% ÷ 100).",
      "Surge rating is additional—check largest motor LRA.",
      "Related: inverter-sizing, inverter-peak-load-surge, watts-to-amps.",
    ],
  };

const CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_GUIDE: InverterSizingGuideDefinition =
  {
    slug: CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "sizing",
    href: CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_GUIDE_HREF,
    toolHref: INVERTER_SIZING_TOOL_HREF,
    guideLinkLabel: "Calculate minimum inverter size for peak load",
    title: "Calculate Minimum Inverter Size for Peak Load",
    description:
      CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_CONTENT.metaDescription,
    keywords: [
      "calculate minimum inverter size for peak load",
      "minimum inverter size calculator",
      "peak load inverter watts",
      "inverter continuous rating calculator",
      "size inverter from peak watts",
    ],
    seo: {
      sections: [
        {
          heading: "Peak load is a simultaneous-watts exercise",
          body: "To calculate minimum inverter size for peak load, first find the highest total running watts that can be on together—not nameplate sums of every circuit. RV evening loads, workshop combos, and outage essentials each form a scenario; size to the heaviest scenario that must run without load shedding.",
        },
        {
          heading: "Margin turns peak into a buyable minimum",
          body: "Peak watts alone are a theoretical floor. Multiplying by (1 + margin%) adds headroom for conversion loss, brief overloads, and modest future loads. A 2,000 W peak at 30% margin yields 2,600 W minimum—shop continuous ratings at or above that figure before comparing surge columns.",
        },
        {
          heading: "Document peak scenarios before checkout",
          body: "Write the load list that produced your peak: which motors, which resistive loads, and whether two compressors can overlap. Minimum continuous watts from this method protect steady operation; if trips persist, revisit surge with a motor-start tool or stagger loads. Pair results with Battery Bank Size when DC storage must feed the new AC peak.",
        },
      ],
    },
    content: CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_CONTENT,
  };

const OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Off-grid inverter capacity estimator: project AC watts from cabin or homestead peak load plus margin—estimate inverter continuous capacity before pairing solar charge controllers and battery banks.",
  heroSubtitle:
    "Off-grid systems have no utility cushion—your inverter is the entire AC bus. This off-grid inverter capacity estimator turns peak load watts and a planning margin into a continuous watt target for cabins, RVs, and solar-backed homesteads.",
  benefits: [
    "Estimates continuous inverter W from off-grid peak load.",
    "Applies margin for surge, loss, and modest load growth.",
    "Frames capacity before battery C-rate and solar yield checks.",
  ],
  howItWorks: [
    "List AC loads that run together on the off-grid bus.",
    "Enter total peak watts and a safety margin percent.",
    "Read estimated inverter capacity—compare to hybrid or stand-alone SKUs.",
  ],
  faq: [
    {
      q: "What does an off-grid inverter capacity estimator do?",
      a: "It projects minimum continuous inverter watts for sites without grid backup: capacity ≈ peak load W × (1 + margin ÷ 100). Example: 1,500 W cabin peak at 30% margin → ~1,950 W continuous class inverter before checking surge for well pumps or fridge compressors.",
    },
    {
      q: "How is off-grid sizing different from grid-tied backup?",
      a: "Off-grid inverters run 24/7 from batteries—no utility pass-through. Peak scenarios include cloudy evenings when solar is low and loads stack higher. Estimate capacity from realistic simultaneous use, then confirm the battery bank can deliver the amps at your DC voltage.",
    },
    {
      q: "Should I include charger pass-through in capacity?",
      a: "Hybrid off-grid inverters may add shore or generator charging on the same unit. Capacity for AC loads still follows peak W plus margin; charger amps are a separate column on the datasheet. Size continuous watts first, then verify MPPT or charger limits match your solar array.",
    },
  ],
  technicalSpecs: [
    "Estimated capacity W = peak_W × (1 + margin% ÷ 100).",
    "Off-grid peak = simultaneous AC running watts.",
    "Check surge W for largest motor on the bus.",
    "Related: inverter-sizing, battery-bank-size, rv-solar-calculator.",
  ],
};

const OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_GUIDE: InverterSizingGuideDefinition =
  {
    slug: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "sizing",
    href: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_GUIDE_HREF,
    toolHref: INVERTER_SIZING_TOOL_HREF,
    guideLinkLabel: "Off-grid inverter capacity estimator",
    title: "Off-Grid Inverter Capacity Estimator",
    description: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "off-grid inverter capacity estimator",
      "off grid inverter sizing",
      "cabin inverter size calculator",
      "homestead inverter watts",
      "solar inverter capacity estimate",
    ],
    seo: {
      sections: [
        {
          heading: "Off-grid capacity starts at the evening peak",
          body: "Without grid support, the inverter must cover every AC watt you refuse to shed. An off-grid inverter capacity estimator begins with the heaviest simultaneous load—often cooking, refrigeration, and pumps after sunset—then adds margin. Underestimating here means load shedding or nuisance trips when batteries are already stressed.",
        },
        {
          heading: "Continuous watts are the planning anchor",
          body: "Estimated capacity targets continuous rating on the label, not brief surge alone. Solar-hybrid units list charger and MPPT limits separately; AC capacity still follows peak load math. A 3,000 W continuous class inverter with adequate surge handles most cabin peaks better than a 2,000 W unit with high surge but low continuous.",
        },
        {
          heading: "Pair capacity with storage and array",
          body: "Inverter watts do not replace battery amp-hours or panel kilowatts—they define the AC ceiling. After capacity is estimated, check that the bank can supply DC amps at your bus voltage and that daily Wh replenishment matches use. Chain to RV Solar Calculator or Battery Bank Size when the question shifts from AC headroom to overnight autonomy.",
        },
      ],
    },
    content: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  InverterSizingLandingSlug,
  InverterSizingGuideDefinition
> = {
  [INVERTER_SIZING_CALCULATOR_LANDING_SLUG]: INVERTER_SIZING_CALCULATOR_GUIDE,
  [CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG]:
    CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_GUIDE,
  [OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG]:
    OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the Inverter Sizing tool footer Resources column. */
export const INVERTER_SIZING_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: INVERTER_SIZING_CALCULATOR_LANDING_SLUG,
    href: INVERTER_SIZING_CALCULATOR_GUIDE_HREF,
    label: "Inverter Sizing Calculator",
  },
  {
    slug: CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_LANDING_SLUG,
    href: CALCULATE_MINIMUM_INVERTER_SIZE_FOR_PEAK_LOAD_GUIDE_HREF,
    label: "Calculate Minimum Inverter Size for Peak Load",
  },
  {
    slug: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_LANDING_SLUG,
    href: OFF_GRID_INVERTER_CAPACITY_ESTIMATOR_GUIDE_HREF,
    label: "Off-Grid Inverter Capacity Estimator",
  },
];

export function isInverterSizingLandingSlug(
  slug: string
): slug is InverterSizingLandingSlug {
  return (INVERTER_SIZING_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getInverterSizingLanding(
  slug: InverterSizingLandingSlug = INVERTER_SIZING_CALCULATOR_LANDING_SLUG
): InverterSizingGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllInverterSizingLandings(): InverterSizingGuideDefinition[] {
  return INVERTER_SIZING_LANDING_SLUGS.map((slug) =>
    getInverterSizingLanding(slug)
  );
}

/** Static footer links derived from INVERTER_SIZING_FOOTER_RESOURCES. */
export function getInverterSizingToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return INVERTER_SIZING_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as INVERTER_SIZING_CALCULATOR_ID };
