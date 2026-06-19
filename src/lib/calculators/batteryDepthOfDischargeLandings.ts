import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_DEPTH_OF_DISCHARGE_TOOL_PATH =
  "/tools/battery-calculators/battery-depth-of-discharge/" as const;

export const BATTERY_DEPTH_OF_DISCHARGE_TOOL_HREF = getCalculatorHref(
  "battery-depth-of-discharge",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-depth-of-discharge" as const;

export type BatteryDepthOfDischargeLandingSlug =
  | "battery-depth-of-discharge-calculator"
  | "calculate-battery-dod-percent-from-capacity-used"
  | "battery-capacity-usage-estimator";

export const BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG =
  "battery-depth-of-discharge-calculator" as const;

export const CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG =
  "calculate-battery-dod-percent-from-capacity-used" as const;

export const BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG =
  "battery-capacity-usage-estimator" as const;

export const BATTERY_DEPTH_OF_DISCHARGE_LANDING_SLUGS = [
  BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG,
  CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG,
  BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly BatteryDepthOfDischargeLandingSlug[];

export const BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG);

export const CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG
  );

export const BATTERY_CAPACITY_USAGE_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG
);

export type BatteryDepthOfDischargeGuideDefinition = GuideLandingDefinition & {
  slug: BatteryDepthOfDischargeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery depth of discharge calculator: (energy used Wh ÷ total Wh) × 100 for DoD %—track how deep you cycle LiFePO4, AGM, and lead-acid banks for life and warranty limits.",
  heroSubtitle:
    "Depth of discharge tells you how much of the pack you have spent—not just the voltage on the display. This battery depth of discharge calculator converts used and total watt-hours into DoD % for cycle planning and chemistry limits.",
  benefits: [
    "Core formula: DoD % = (used Wh ÷ total Wh) × 100.",
    "DoD % = 100 − state of charge (SoC %) on the same Wh basis.",
    "Compare daily cycles to manufacturer max DoD recommendations.",
  ],
  howItWorks: [
    "Enter energy used in Wh (meter, coulomb count, or load × time).",
    "Add total pack capacity in Wh (from Ah × V or nameplate kWh × 1,000).",
    "Read depth of discharge %—check against chemistry and warranty caps.",
  ],
  faq: [
    {
      q: "How does the battery depth of discharge calculator work?",
      a: "DoD % = (used Wh ÷ total Wh) × 100. Example: 600 Wh drawn from a 1,200 Wh pack → 50% DoD. That matches 50% remaining SoC when both numbers use the same gross capacity baseline.",
    },
    {
      q: "Is DoD the same as 100% minus SoC?",
      a: "Yes on the same energy reference: 70% DoD means 30% SoC remains. Use consistent total Wh—nameplate at full charge—not an aged capacity estimate unless you intentionally derate total Wh first.",
    },
    {
      q: "What DoD is safe for my battery?",
      a: "Typical planning limits: flooded lead-acid ~50% daily; AGM 50–60%; LiFePO4 often 80–90% with BMS reserve below that. The calculator reports actual DoD; compare the result to your datasheet max cycle DoD.",
    },
  ],
  technicalSpecs: [
    "DoD % = (energy_used_Wh ÷ total_capacity_Wh) × 100.",
    "SoC % ≈ 100 − DoD % (same Wh basis).",
    "Used Wh must not exceed total Wh.",
    "Related: battery-depth-of-discharge, battery-percentage, battery-dod-energy-yield.",
  ],
};

const BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_GUIDE: BatteryDepthOfDischargeGuideDefinition =
  {
    slug: BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_DEPTH_OF_DISCHARGE_TOOL_HREF,
    guideLinkLabel: "Battery depth of discharge calculator",
    title: "Battery Depth of Discharge Calculator",
    description:
      BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "battery depth of discharge calculator",
      "depth of discharge calculator",
      "battery dod percent",
      "calculate depth of discharge",
      "dod vs state of charge",
    ],
    seo: {
      sections: [
        {
          heading: "DoD measures how much tank you emptied",
          body: "Voltage gauges drift with load and temperature; energy accounting in watt-hours is steadier. A battery depth of discharge calculator turns used Wh and pack Wh into a percentage cycle depth. Operators tracking nightly off-grid use can log DoD daily and spot when average depth exceeds warranty-friendly limits.",
        },
        {
          heading: "Chemistry sets the acceptable DoD ceiling",
          body: "Lead-acid cycle life collapses when daily DoD routinely exceeds 50%. LiFePO4 marketing allows deeper swings, but BMS may still hold reserve below 10% displayed SoC. Calculate DoD from measured Wh, then compare to the line in the spec sheet—not to generic 100% depth assumptions.",
        },
        {
          heading: "From DoD to usable energy planning",
          body: "After a cycle's DoD is known, gross pack Wh × (DoD ÷ 100) confirms energy delivered. Pair with Battery Energy for total Wh, Battery DoD to Energy Yield when sizing from nominal kWh and target DoD %, and Battery Percentage when starting from voltage-reported SoC instead of Wh used.",
        },
      ],
    },
    content: BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_CONTENT,
  };

const CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate battery DoD % from capacity used: (used Wh ÷ total Wh) × 100 when you know energy drawn—log cycle depth for RV, solar, and backup banks from metered or estimated use.",
    heroSubtitle:
      "Capacity used is the numerator; nameplate capacity is the denominator. This guide shows how to calculate battery DoD % from capacity used—watt-hours consumed versus total pack Wh for an accurate discharge percentage.",
    benefits: [
      "DoD % = (capacity used ÷ total capacity) × 100 in Wh.",
      "Same ratio in Ah when voltage is constant across the cycle.",
      "Turns load logs and shunt readings into warranty-friendly DoD %.",
    ],
    howItWorks: [
      "Sum energy used in Wh (battery monitor, inverter tally, or W × h).",
      "Enter total bank Wh at full charge (Ah × V or datasheet kWh).",
      "Multiply the ratio by 100—read DoD % for the cycle or day.",
    ],
    faq: [
      {
        q: "How do I calculate battery DoD % from capacity used?",
        a: "DoD % = (used ÷ total) × 100. Example: 840 Wh used from a 2,400 Wh bank → (840 ÷ 2,400) × 100 = 35% DoD. If you track Ah at steady voltage: used Ah ÷ total Ah gives the same percentage.",
      },
      {
        q: "Can I use Ah instead of Wh for capacity used?",
        a: "Yes when bus voltage is nearly constant during the discharge—used Ah ÷ total Ah equals DoD %. If voltage sags significantly, prefer Wh from a monitor or Ah × average V for better accuracy.",
      },
      {
        q: "What if capacity used exceeds nameplate total?",
        a: "Used cannot exceed total in the calculator—check whether total Wh was derated for age or whether the shunt includes inverter return energy. Regen or charging during the window reduces net used Wh.",
      },
    ],
    technicalSpecs: [
      "DoD % = (capacity_used_Wh ÷ total_Wh) × 100.",
      "Ah method: used_Ah ÷ total_Ah (constant V).",
      "Remaining SoC % ≈ 100 − DoD %.",
      "Related: battery-depth-of-discharge-calculator, battery-energy.",
    ],
  };

const CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_GUIDE: BatteryDepthOfDischargeGuideDefinition =
  {
    slug: CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_GUIDE_HREF,
    toolHref: BATTERY_DEPTH_OF_DISCHARGE_TOOL_HREF,
    guideLinkLabel: "Calculate battery DoD % from capacity used",
    title: "Calculate Battery DoD % from Capacity Used",
    description:
      CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_CONTENT.metaDescription,
    keywords: [
      "calculate battery dod percent from capacity used",
      "dod from capacity used",
      "battery discharge percent used",
      "capacity used to dod",
      "wh used depth of discharge",
    ],
    seo: {
      sections: [
        {
          heading: "Capacity used is the cycle story",
          body: "State-of-charge displays summarize the present; capacity used explains the past. Calculate battery DoD % from capacity used by dividing energy withdrawn by nameplate energy. A van that pulls 1.8 kWh overnight from a 6 kWh bank hits 30% DoD—comfortable for LiFePO4, aggressive for a single flooded 12 V pair if repeated daily.",
        },
        {
          heading: "Wh accounting beats guesswork from voltage",
          body: "Resting voltage maps poorly to SoC under load. Shunt-based Wh tallies or inverter cumulative draw give used capacity you can trust in the numerator. Align total Wh with the same full-charge reference the manufacturer uses—otherwise DoD % reads artificially high or low.",
        },
        {
          heading: "Log DoD % to protect cycle life",
          body: "Track weekly average DoD from capacity used, not peak voltage alarms. When averages climb above chemistry guidance, add parallel capacity or shed load before capacity fade accelerates. Chain to Battery Runtime for expected Wh draw and Battery DoD to Energy Yield when planning usable kWh from nominal packs.",
        },
      ],
    },
    content: CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_CONTENT,
  };

const BATTERY_CAPACITY_USAGE_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery capacity usage estimator: project used vs. total Wh for usage % and DoD—estimate how much of your bank a trip, outage, or daily load consumes before hitting chemistry limits.",
  heroSubtitle:
    "Usage is the share of the pack you spend—expressed as DoD % or capacity used over total. This battery capacity usage estimator helps you project usage from expected Wh draw and bank size before you cycle deeper than your warranty allows.",
  benefits: [
    "Usage % = (used Wh ÷ total Wh) × 100—same as DoD %.",
    "Estimate usage from planned load Wh before the trip starts.",
    "Shows remaining capacity % as 100 − usage %.",
  ],
  howItWorks: [
    "Enter total bank Wh (Battery Energy: Ah × V).",
    "Add expected or measured used Wh for the period.",
    "Read usage %—compare to max daily DoD for your chemistry.",
  ],
  faq: [
    {
      q: "What does a battery capacity usage estimator do?",
      a: "It estimates what fraction of the pack you will use: usage % = (used ÷ total) × 100. Example: planning 3,600 Wh draw from a 12,000 Wh bank → 30% estimated usage (30% DoD). Remaining headroom is 70% of nameplate Wh before hitting your modeled floor.",
    },
    {
      q: "How is usage % different from DoD?",
      a: "On the same Wh basis they are the same number—usage % emphasizes consumption planning; DoD emphasizes cycle depth for battery life. Both equal used Wh divided by total Wh, times 100.",
    },
    {
      q: "Can I estimate usage before a trip?",
      a: "Yes—sum expected load Wh (fridge, lights, inverter loads × hours) as used Wh, divide by bank total Wh. Add 10–15% margin for inverter loss and cold-weather capacity loss before judging if usage stays under your DoD cap.",
    },
  ],
  technicalSpecs: [
    "Usage % = (used_Wh ÷ total_Wh) × 100.",
    "Remaining % ≈ 100 − usage %.",
    "Planned used_Wh = Σ (load_W × hours).",
    "Related: calculate-battery-dod-percent-from-capacity-used, battery-runtime.",
  ],
};

const BATTERY_CAPACITY_USAGE_ESTIMATOR_GUIDE: BatteryDepthOfDischargeGuideDefinition =
  {
    slug: BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_CAPACITY_USAGE_ESTIMATOR_GUIDE_HREF,
    toolHref: BATTERY_DEPTH_OF_DISCHARGE_TOOL_HREF,
    guideLinkLabel: "Battery capacity usage estimator",
    title: "Battery Capacity Usage Estimator",
    description: BATTERY_CAPACITY_USAGE_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "battery capacity usage estimator",
      "estimate battery capacity usage",
      "battery usage percent",
      "how much battery capacity used",
      "capacity usage dod planning",
    ],
    seo: {
      sections: [
        {
          heading: "Estimate usage before you discharge",
          body: "Field teams often learn DoD only after the fact. A battery capacity usage estimator lets you forecast usage % from planned Wh consumption and bank Wh—catching a 75% projected usage on lead-acid before departure, not after the inverter low-voltage alarm. Forward estimates beat reactive voltage checks for trip go/no-go calls.",
        },
        {
          heading: "Usage % frames remaining headroom",
          body: "If usage estimates to 40%, roughly 60% of nameplate Wh remains in the model—subject to BMS reserve and chemistry floors. Document estimated usage and remaining % on the run sheet so operators know when to start a generator or shed non-critical loads before crossing the daily DoD line.",
        },
        {
          heading: "Close the planning loop",
          body: "Build expected used Wh from Battery Runtime outputs (load W × hours), then estimate usage here. If usage exceeds chemistry guidance, enlarge the bank or cut loads and re-estimate. After the trip, compare actual used Wh to the estimate to calibrate future margins.",
        },
      ],
    },
    content: BATTERY_CAPACITY_USAGE_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  BatteryDepthOfDischargeLandingSlug,
  BatteryDepthOfDischargeGuideDefinition
> = {
  [BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG]:
    BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_GUIDE,
  [CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG]:
    CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_GUIDE,
  [BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG]:
    BATTERY_CAPACITY_USAGE_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the Battery Depth of Discharge tool footer Resources column. */
export const BATTERY_DEPTH_OF_DISCHARGE_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG,
      href: BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_GUIDE_HREF,
      label: "Battery Depth of Discharge Calculator",
    },
    {
      slug: CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_LANDING_SLUG,
      href: CALCULATE_BATTERY_DOD_PERCENT_FROM_CAPACITY_USED_GUIDE_HREF,
      label: "Calculate Battery DoD % from Capacity Used",
    },
    {
      slug: BATTERY_CAPACITY_USAGE_ESTIMATOR_LANDING_SLUG,
      href: BATTERY_CAPACITY_USAGE_ESTIMATOR_GUIDE_HREF,
      label: "Battery Capacity Usage Estimator",
    },
  ];

export function isBatteryDepthOfDischargeLandingSlug(
  slug: string
): slug is BatteryDepthOfDischargeLandingSlug {
  return (
    BATTERY_DEPTH_OF_DISCHARGE_LANDING_SLUGS as readonly string[]
  ).includes(slug);
}

export function getBatteryDepthOfDischargeLanding(
  slug: BatteryDepthOfDischargeLandingSlug = BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_LANDING_SLUG
): BatteryDepthOfDischargeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryDepthOfDischargeLandings(): BatteryDepthOfDischargeGuideDefinition[] {
  return BATTERY_DEPTH_OF_DISCHARGE_LANDING_SLUGS.map((slug) =>
    getBatteryDepthOfDischargeLanding(slug)
  );
}

/** Static footer links derived from BATTERY_DEPTH_OF_DISCHARGE_FOOTER_RESOURCES. */
export function getBatteryDepthOfDischargeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_DEPTH_OF_DISCHARGE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_DEPTH_OF_DISCHARGE_CALCULATOR_ID };
