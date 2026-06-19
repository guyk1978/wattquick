import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_EFFICIENCY_TOOL_PATH =
  "/tools/battery-calculators/battery-efficiency/" as const;

export const BATTERY_EFFICIENCY_TOOL_HREF = getCalculatorHref(
  "battery-efficiency",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-efficiency" as const;

export type BatteryEfficiencyLandingSlug =
  | "battery-round-trip-efficiency-calculator"
  | "calculate-battery-energy-loss-during-charge-discharge"
  | "battery-system-round-trip-efficiency-estimator";

export const BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG =
  "battery-round-trip-efficiency-calculator" as const;

export const CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG =
  "calculate-battery-energy-loss-during-charge-discharge" as const;

export const BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG =
  "battery-system-round-trip-efficiency-estimator" as const;

export const BATTERY_EFFICIENCY_LANDING_SLUGS = [
  BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG,
  CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG,
  BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly BatteryEfficiencyLandingSlug[];

export const BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG);

export const CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG
  );

export const BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG);

export type BatteryEfficiencyGuideDefinition = GuideLandingDefinition & {
  slug: BatteryEfficiencyLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery round-trip efficiency calculator: (energy out Wh ÷ energy in Wh) × 100—measure charge-to-discharge loss for LiFePO4, lithium-ion, and lead-acid banks.",
  heroSubtitle:
    "Every charge–discharge cycle loses energy to heat and BMS overhead. This battery round-trip efficiency calculator converts energy in and energy out in watt-hours into round-trip efficiency % for solar storage and off-grid planning.",
  benefits: [
    "Core formula: efficiency % = (Wh out ÷ Wh in) × 100.",
    "Quantifies one full charge-to-usable-discharge cycle.",
    "Benchmarks real packs against 95%+ Li vs. 80–85% lead-acid norms.",
  ],
  howItWorks: [
    "Log energy in (Wh) from charger or solar into the bank for one cycle.",
    "Log energy out (Wh) delivered to loads before the next recharge.",
    "Read round-trip efficiency %—loss is 100% minus efficiency.",
  ],
  faq: [
    {
      q: "What is battery round-trip efficiency?",
      a: "It is usable energy out divided by energy stored in, × 100, for one cycle. Example: 1,000 Wh in, 950 Wh out → 95% round-trip efficiency. The missing 50 Wh became heat, BMS draw, and internal resistance loss.",
    },
    {
      q: "How do I measure Wh in and Wh out?",
      a: "Use a battery monitor shunt, inverter cumulative kWh, or charger meter. Wh in is what the pack accepted during charge; Wh out is what loads consumed from that charge window—before the next top-up.",
    },
    {
      q: "What is a good round-trip efficiency?",
      a: "Modern lithium often tests 93–98% at moderate C-rates; lead-acid may land 80–88% depending on age and charge profile. Compare your measured % to datasheet values at similar charge amps and depth of discharge.",
    },
  ],
  technicalSpecs: [
    "Round-trip efficiency % = (energy_out_Wh ÷ energy_in_Wh) × 100.",
    "Loss Wh = energy_in − energy_out.",
    "Output Wh cannot exceed input Wh in passive systems.",
    "Related: battery-efficiency, battery-charging-time, battery-energy.",
  ],
};

const BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_GUIDE: BatteryEfficiencyGuideDefinition =
  {
    slug: BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_EFFICIENCY_TOOL_HREF,
    guideLinkLabel: "Battery round-trip efficiency calculator",
    title: "Battery Round-Trip Efficiency Calculator",
    description:
      BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "battery round-trip efficiency calculator",
      "round trip battery efficiency",
      "charge discharge efficiency percent",
      "battery energy loss calculator",
      "wh out divided by wh in",
    ],
    seo: {
      sections: [
        {
          heading: "Round-trip efficiency is the storage tax",
          body: "Solar and grid charging put Wh in; loads pull Wh out. A battery round-trip efficiency calculator measures the gap—critical when sizing arrays and banks. A 95% round trip on a 10 kWh bank means you plan on 9.5 kWh deliverable per full cycle, not 10 kWh, before inverter loss downstream.",
        },
        {
          heading: "Chemistry and C-rate move the number",
          body: "Fast charging and deep discharges heat cells and lower measured efficiency. Lead-acid Peukert effect and lithium BMS balancing both eat Wh. Document charge amps, DoD, and temperature when you log in/out so comparisons to lab sheets are fair.",
        },
        {
          heading: "Chain efficiency through the system",
          body: "Round-trip battery efficiency is one layer—inverter conversion and cable loss add more. Pair results with Battery Charging Time for refill hours and Battery Energy for nameplate Wh. Multiply efficiencies when stacking charger → battery → inverter → load for whole-system yield estimates.",
        },
      ],
    },
    content: BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_CONTENT,
  };

const CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate battery energy loss during charge/discharge: loss Wh = energy in − energy out from one cycle—quantify heat, BMS, and resistance waste on LiFePO4 and lead-acid banks.",
    heroSubtitle:
      "Efficiency percent tells one story; lost watt-hours tell another. This guide shows how to calculate battery energy loss during charge/discharge from measured Wh in and Wh out across a full storage cycle.",
    benefits: [
      "Loss Wh = energy_in − energy_out for the cycle.",
      "Loss % = 100 − round-trip efficiency %.",
      "Translates abstract efficiency into kWh you cannot deliver to loads.",
    ],
    howItWorks: [
      "Record Wh accepted during charge (solar, grid, or generator).",
      "Record Wh delivered to loads before the next recharge.",
      "Subtract: loss Wh = in − out; pair with efficiency % from the tool.",
    ],
    faq: [
      {
        q: "How do I calculate battery energy loss during charge/discharge?",
        a: "Loss Wh = Wh in − Wh out. Example: 1,200 Wh charged in, 1,080 Wh used out → 120 Wh lost (10% loss, 90% round-trip efficiency). The lost Wh mostly becomes heat in cells, cables, and BMS electronics.",
      },
      {
        q: "Is charge loss separate from discharge loss?",
        a: "The tool models one combined round trip—typical field logging sums both directions in one in/out pair. For lab splits, measure Wh from charger to pack (charge loss) and pack to load (discharge loss) separately, then add losses.",
      },
      {
        q: "Why track Wh loss instead of only efficiency %?",
        a: "Percentages hide scale—a 5% loss on 500 Wh is 25 Wh; on 20 kWh it is 1 kWh. Loss Wh feeds solar offset math and generator fuel planning when every kilowatt-hour counts off-grid.",
      },
    ],
    technicalSpecs: [
      "Loss_Wh = energy_in_Wh − energy_out_Wh.",
      "Loss_% = (loss_Wh ÷ energy_in_Wh) × 100.",
      "Efficiency_% = 100 − loss_% (round-trip).",
      "Related: battery-round-trip-efficiency-calculator, battery-charging-time.",
    ],
  };

const CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_GUIDE: BatteryEfficiencyGuideDefinition =
  {
    slug: CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_GUIDE_HREF,
    toolHref: BATTERY_EFFICIENCY_TOOL_HREF,
    guideLinkLabel: "Calculate battery energy loss during charge/discharge",
    title: "Calculate Battery Energy Loss During Charge/Discharge",
    description:
      CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_CONTENT.metaDescription,
    keywords: [
      "calculate battery energy loss during charge discharge",
      "battery charge discharge loss wh",
      "round trip energy loss",
      "battery heat loss watt hours",
      "storage cycle energy waste",
    ],
    seo: {
      sections: [
        {
          heading: "Lost Wh is the planning number installers quote",
          body: "Homeowners hear efficiency percent; designers budget lost Wh. Calculate battery energy loss during charge/discharge to see how many kilowatt-hours never reach the load each cycle. On a 48 V off-grid bank cycling 8 kWh in daily, 5% loss is 400 Wh—enough to run LED lighting for hours if it were not heating the battery room.",
        },
        {
          heading: "Where the watt-hours go",
          body: "I²R in conductors, cell internal resistance, BMS quiescent draw, and taper-charge heat all consume Wh. Cold weather and high C-rates inflate loss. Log conditions with in/out readings so a rising loss trend flags aging cells or undersized cabling—not mysterious load growth.",
        },
        {
          heading: "Shrink loss before upsizing the bank",
          body: "Before adding modules, verify loss Wh is not dominated by fixable factors—charger mismatch, long DC runs, or chronic 100% DoD. Pair loss totals with Battery Depth of Discharge and Charging Time so cycle depth, refill energy, and waste appear on one commissioning line.",
        },
      ],
    },
    content: CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_CONTENT,
  };

const BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Battery system round-trip efficiency estimator: project (Wh out ÷ Wh in) × 100 for the storage leg—size solar, hybrid inverter, and BESS yield before commissioning measured cycles.",
    heroSubtitle:
      "System quotes mix panel, charger, and battery efficiency into one line item. This battery system round-trip efficiency estimator isolates the storage round trip—Wh in vs. Wh out—so planners see deliverable energy after the bank, not just nameplate kWh.",
    benefits: [
      "Estimates storage round-trip % from planned or logged Wh in/out.",
      "Separates battery yield from inverter and MPPT layers.",
      "Feeds usable kWh estimates for daily load and autonomy math.",
    ],
    howItWorks: [
      "Estimate or measure Wh into the battery bank per cycle (charge side).",
      "Estimate or measure Wh delivered from the bank to DC/AC loads.",
      "Read round-trip %—apply to gross bank Wh for usable energy planning.",
    ],
    faq: [
      {
        q: "What does a battery system round-trip efficiency estimator do?",
        a: "It projects how much stored energy returns to loads: efficiency % ≈ (Wh out ÷ Wh in) × 100 for the battery subsystem. Example: estimating 9.2 kWh out from 10 kWh in → 92% storage round trip before separate inverter loss.",
      },
      {
        q: "Is this the same as whole-home solar efficiency?",
        a: "No—this focuses on the battery charge/discharge leg. Panel-to-MPPT and inverter conversion are additional multipliers. Use this estimator for the storage block, then stack other efficiencies for end-to-end yield.",
      },
      {
        q: "What assumptions should I document on proposals?",
        a: "Note chemistry, charge C-rate, average DoD, and temperature band used for the estimate. LiFePO4 at moderate DoD often models 93–97%; aged lead-acid may estimate 82–88%. Replace estimates with measured Wh after commissioning.",
      },
    ],
    technicalSpecs: [
      "Estimated round-trip % = (Wh_out ÷ Wh_in) × 100.",
      "Usable_Wh ≈ gross_Wh × (estimate% ÷ 100) per cycle.",
      "System yield = MPPT × battery × inverter efficiencies (stacked).",
      "Related: battery-round-trip-efficiency-calculator, battery-energy.",
    ],
  };

const BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_GUIDE: BatteryEfficiencyGuideDefinition =
  {
    slug: BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_GUIDE_HREF,
    toolHref: BATTERY_EFFICIENCY_TOOL_HREF,
    guideLinkLabel: "Battery system round-trip efficiency estimator",
    title: "Battery System Round-Trip Efficiency Estimator",
    description:
      BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "battery system round-trip efficiency estimator",
      "estimate battery round trip efficiency",
      "bess round trip efficiency",
      "storage system efficiency planning",
      "battery yield estimator kwh",
    ],
    seo: {
      sections: [
        {
          heading: "Estimate storage yield before hardware ships",
          body: "Sales sheets list kWh modules; operators need deliverable kWh. A battery system round-trip efficiency estimator turns assumed Wh in and out into a percentage for the storage leg—so a 20 kWh nameplate at 94% estimated round trip plans ~18.8 kWh per full cycle to the bus, not 20 kWh.",
        },
        {
          heading: "Commissioning replaces estimates",
          body: "Estimates seed BOM and interconnection paperwork; shunt logs finalize them. After install, replace projected Wh with measured charge and discharge totals from the monitor. Drift between estimate and field data flags wiring loss, BMS settings, or cell imbalance—not spreadsheet error.",
        },
        {
          heading: "Stack efficiencies across the chain",
          body: "Battery round trip is one link. Multiply by MPPT/charger efficiency on the way in and inverter efficiency on the way out for appliance-level yield. Pair this estimator with Battery Energy for gross Wh and with solar inverter tools when the question is panel kWh to load kWh across a full day.",
        },
      ],
    },
    content: BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  BatteryEfficiencyLandingSlug,
  BatteryEfficiencyGuideDefinition
> = {
  [BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG]:
    BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_GUIDE,
  [CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG]:
    CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_GUIDE,
  [BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG]:
    BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the Battery Efficiency tool footer Resources column. */
export const BATTERY_EFFICIENCY_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG,
      href: BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_GUIDE_HREF,
      label: "Battery Round-Trip Efficiency Calculator",
    },
    {
      slug: CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_LANDING_SLUG,
      href: CALCULATE_BATTERY_ENERGY_LOSS_DURING_CHARGE_DISCHARGE_GUIDE_HREF,
      label: "Calculate Battery Energy Loss During Charge/Discharge",
    },
    {
      slug: BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_LANDING_SLUG,
      href: BATTERY_SYSTEM_ROUND_TRIP_EFFICIENCY_ESTIMATOR_GUIDE_HREF,
      label: "Battery System Round-Trip Efficiency Estimator",
    },
  ];

export function isBatteryEfficiencyLandingSlug(
  slug: string
): slug is BatteryEfficiencyLandingSlug {
  return (BATTERY_EFFICIENCY_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryEfficiencyLanding(
  slug: BatteryEfficiencyLandingSlug = BATTERY_ROUND_TRIP_EFFICIENCY_CALCULATOR_LANDING_SLUG
): BatteryEfficiencyGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryEfficiencyLandings(): BatteryEfficiencyGuideDefinition[] {
  return BATTERY_EFFICIENCY_LANDING_SLUGS.map((slug) =>
    getBatteryEfficiencyLanding(slug)
  );
}

/** Static footer links derived from BATTERY_EFFICIENCY_FOOTER_RESOURCES. */
export function getBatteryEfficiencyToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_EFFICIENCY_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_EFFICIENCY_CALCULATOR_ID };
