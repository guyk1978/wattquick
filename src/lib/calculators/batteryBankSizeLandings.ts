import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_BANK_SIZE_TOOL_PATH =
  "/tools/battery-sizing/battery-bank-size/" as const;

export const BATTERY_BANK_SIZE_TOOL_HREF = getCalculatorHref(
  "battery-bank-size",
  "sizing"
);

const BASE_CALCULATOR_ID = "battery-bank-size" as const;

export type BatteryBankSizeLandingSlug =
  | "battery-bank-size-calculator"
  | "amp-hours-needed-for-battery-bank"
  | "off-grid-battery-capacity-estimator";

export const BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG =
  "battery-bank-size-calculator" as const;

export const AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG =
  "amp-hours-needed-for-battery-bank" as const;

export const OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG =
  "off-grid-battery-capacity-estimator" as const;

export const BATTERY_BANK_SIZE_LANDING_SLUGS = [
  BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG,
  AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG,
  OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly BatteryBankSizeLandingSlug[];

export const BATTERY_BANK_SIZE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG
);

export const AMP_HOURS_NEEDED_FOR_BATTERY_BANK_GUIDE_HREF = getGuideLandingHref(
  AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG
);

export const OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG
);

export type BatteryBankSizeGuideDefinition = GuideLandingDefinition & {
  slug: BatteryBankSizeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_BANK_SIZE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery bank size calculator: size amp-hour capacity from load watts, runtime hours, and system voltage. Plan off-grid, RV, and backup banks with clear Wh → Ah steps—free, instant.",
  heroSubtitle:
    "Ah sizing is an energy-budget problem: how many watt-hours you need, divided by bus voltage. This guide walks through the battery bank size calculator logic before you buy cells, cables, or fuses.",
  benefits: [
    "Transparent chain: Wh needed = load (W) × hours; Ah = Wh ÷ voltage—reproducible on a napkin or in the tool.",
    "Supports 12 V, 24 V, and 48 V buses common in RV, marine, and small off-grid installs.",
    "Detail output shows intermediate Wh so you can cross-check against solar-battery-bank planners.",
  ],
  howItWorks: [
    "Enter total load power in watts and the hours of autonomy you need.",
    "Set nominal system voltage (12, 24, or 48 V typical).",
    "Review required Ah; multiply by 1.2–1.5 for inverter loss, depth-of-discharge limits, and aging.",
  ],
  faq: [
    {
      q: "How do I calculate battery bank size in Ah?",
      a: "Multiply load watts by runtime hours to get watt-hours, then divide by system voltage. Example: 500 W × 8 h = 4,000 Wh; at 12 V that is about 333 Ah before safety margin.",
    },
    {
      q: "Should I size at 12 V or 48 V?",
      a: "Higher voltage reduces current for the same watts, which can shrink cable size. Ah at the battery is still Wh ÷ V—compare total Wh needs first, then pick a bus architecture your inverter and charger support.",
    },
    {
      q: "Do I need extra capacity beyond the calculator result?",
      a: "Yes. Add margin for inverter efficiency, temperature, and not discharging to 100% depth of discharge. Many installers use 1.2–1.5× on the raw Ah figure unless a specific DoD target is modeled.",
    },
  ],
  technicalSpecs: [
    "Formula: Ah = (load_W × hours) ÷ voltage_V.",
    "Inputs: positive W, hours, and V; assumes near-constant load.",
    "Planning margin: ×1.2–1.5 recommended for loss and DoD unless detailed model applied.",
    "Related: pair with solar-battery-bank and inverter-sizing tools for full system design.",
  ],
};

const BATTERY_BANK_SIZE_CALCULATOR_GUIDE: BatteryBankSizeGuideDefinition = {
  slug: BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "sizing",
  href: BATTERY_BANK_SIZE_CALCULATOR_GUIDE_HREF,
  toolHref: BATTERY_BANK_SIZE_TOOL_HREF,
  guideLinkLabel: "Battery bank size calculator",
  title: "Battery Bank Size Calculator",
  description: BATTERY_BANK_SIZE_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "battery bank size calculator",
    "battery bank ah calculator",
    "amp hour bank sizing",
    "size battery bank ah",
    "off grid battery bank calculator",
  ],
  seo: {
    sections: [
      {
        heading: "Wh first, Ah second",
        body: "Capacity in amp-hours only makes sense at a stated voltage. Two banks with the same Ah at 12 V and 24 V store different energy. Always compute watt-hours from load and runtime, then convert to Ah for the bus you are wiring.",
      },
      {
        heading: "Parallel strings and nameplate Ah",
        body: "Field banks combine series strings for voltage and parallel strings for capacity. The calculator gives total bank Ah at system voltage—match that to how vendors sell rack or floor-mounted modules before ordering interconnects.",
      },
    ],
  },
  content: BATTERY_BANK_SIZE_CALCULATOR_CONTENT,
};

const AMP_HOURS_NEEDED_FOR_BATTERY_BANK_CONTENT: GuideLandingContent = {
  metaDescription:
    "Amp-hours needed for battery bank: determine Ah from load watts, autonomy hours, and bus voltage. Step-by-step guide for RV, marine, and off-grid bank planning.",
  heroSubtitle:
    "Installers ask for amp-hours—but energy planning starts in watt-hours. This guide shows exactly how many Ah your bank must deliver at your system voltage to cover the load for the hours you need.",
  benefits: [
    "Derives Ah from first principles: Wh = W × h, then Ah = Wh ÷ V at your nominal bus.",
    "Clarifies why the same load needs fewer Ah at 48 V than at 12 V for identical energy.",
    "Pairs with safety margins for DoD, inverter loss, and cold-weather derating before you order cells.",
  ],
  howItWorks: [
    "Sum continuous load watts on the inverter or DC bus during the autonomy window.",
    "Multiply by hours of backup or overnight runtime to get required watt-hours.",
    "Divide by system voltage to get baseline Ah; add 20–50% margin per your DoD policy.",
  ],
  faq: [
    {
      q: "How many amp-hours do I need for my battery bank?",
      a: "Compute Wh = load (W) × time (h), then Ah = Wh ÷ voltage (V). A 300 W load for 10 h needs 3,000 Wh; at 12 V that is 250 Ah before margins. At 48 V the same energy is about 62.5 Ah.",
    },
    {
      q: "Is nameplate Ah the same as usable Ah?",
      a: "No. Lithium banks often allow 80–90% usable DoD; lead-acid may be 50%. If you need 250 Ah delivered, divide by your allowable DoD fraction when sizing nameplate capacity.",
    },
    {
      q: "Do I count inverter loss in Ah?",
      a: "Yes for AC loads. Either inflate watts at the battery by inverter efficiency (e.g., divide load W by 0.9) or apply a 1.1–1.2× multiplier on the final Ah figure.",
    },
  ],
  technicalSpecs: [
    "Baseline: Ah_required = (load_W × hours) ÷ voltage_V.",
    "Usable Ah: Ah_nameplate ≈ Ah_required ÷ allowable_DoD.",
    "Loss margin: +10–20% for inverter conversion on AC-dominated loads.",
    "Validation: compare to manufacturer max continuous discharge current at planned Ah.",
  ],
};

const AMP_HOURS_NEEDED_FOR_BATTERY_BANK_GUIDE: BatteryBankSizeGuideDefinition = {
  slug: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "sizing",
  href: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_GUIDE_HREF,
  toolHref: BATTERY_BANK_SIZE_TOOL_HREF,
  guideLinkLabel: "Amp-hours needed for battery bank",
  title: "Amp-Hours Needed for Battery Bank",
  description: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_CONTENT.metaDescription,
  keywords: [
    "amp-hours needed for battery bank",
    "how many ah battery bank",
    "battery bank amp hours required",
    "ah needed for off grid",
    "calculate ah for battery bank",
  ],
  seo: {
    sections: [
      {
        heading: "12 V vs. 48 V amp-hour math",
        body: "Energy is conserved; voltage changes the current and Ah label on the sticker. A 48 V bank needs one-quarter the Ah of a 12 V bank for the same watt-hours—do not compare Ah across different buses without converting to Wh first.",
      },
      {
        heading: "When Ah alone is not enough",
        body: "High surge loads (pumps, compressors) may require a bank that can deliver peak amps even if average Ah is sufficient. After sizing Ah for energy, check inverter and BMS current limits against startup draws.",
      },
    ],
  },
  content: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_CONTENT,
};

const OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Off-grid battery capacity estimator: project Ah and Wh for autonomous cabins, RVs, and remote sites from daily load and backup days. Pair with solar yield for resilient bank sizing.",
  heroSubtitle:
    "Off-grid systems live or die on stored energy between sun or generator windows. Estimate battery capacity from nightly load, desired autonomy days, and bus voltage—then stress-test with winter and cloudy-week margins.",
  benefits: [
    "Translates daily kWh or Wh load into bank Ah at your inverter bus voltage.",
    "Supports multi-day autonomy targets (1–3+ days) common in cabin and homestead planning.",
    "Highlights DoD and chemistry choices that change nameplate vs. usable capacity.",
  ],
  howItWorks: [
    "Inventory 24 h loads—or worst-case overnight + cloudy-day bundle—in watts.",
    "Multiply by autonomy days to get total Wh before charging opportunity.",
    "Convert to Ah at system voltage; apply DoD and efficiency factors before ordering modules.",
  ],
  faq: [
    {
      q: "How do I estimate off-grid battery capacity?",
      a: "Sum energy use for the autonomy period you must survive without input (solar or generator). Example: 2 kWh/day × 2 days = 4 kWh (4,000 Wh). At 48 V that is about 83 Ah delivered; size nameplate higher for DoD and losses.",
    },
    {
      q: "Should off-grid banks be larger than backup-only sizing?",
      a: "Usually yes. Off-grid designs target multiple days of autonomy and deeper cycling. Backup calculators may assume hours; off-grid estimators should include cloudy-week buffers and seasonal load spikes (heating, pumps).",
    },
    {
      q: "How does solar change the estimate?",
      a: "Solar reduces how often you hit full depth on the bank, but capacity must still cover nights and low-production stretches. Use daily yield tools first, then size Ah for the gap between consumption and average harvest.",
    },
  ],
  technicalSpecs: [
    "Energy: Wh_autonomy = daily_load_Wh × autonomy_days.",
    "Capacity: Ah = Wh_autonomy ÷ voltage_V ÷ allowable_DoD.",
    "Margins: +10–25% for inverter loss; +seasonal factor for heating loads.",
    "Companion: solar-battery-bank and battery-bank-size calculators for cross-checks.",
  ],
};

const OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_GUIDE: BatteryBankSizeGuideDefinition = {
  slug: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "sizing",
  href: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_GUIDE_HREF,
  toolHref: BATTERY_BANK_SIZE_TOOL_HREF,
  guideLinkLabel: "Off-grid battery capacity estimator",
  title: "Off-Grid Battery Capacity Estimator",
  description: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "off-grid battery capacity estimator",
    "off grid battery bank sizing",
    "cabin battery ah estimate",
    "homestead battery storage calculator",
    "remote site battery capacity",
  ],
  seo: {
    sections: [
      {
        heading: "Autonomy days vs. overnight hours",
        body: "Grid-tied backup often sizes for hours until utility returns. Off-grid sites size for days without meaningful solar. State your autonomy target explicitly—one cloudy weekend can double the Wh requirement versus a single-night model.",
      },
      {
        heading: "Lithium vs. lead-acid nameplate",
        body: "A 400 Ah lithium bank at 80% DoD delivers more usable Wh than 400 Ah flooded lead at 50% DoD. Estimators should output usable Wh first, then map to chemistry-specific nameplate ordering.",
      },
    ],
  },
  content: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  BatteryBankSizeLandingSlug,
  BatteryBankSizeGuideDefinition
> = {
  [BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG]: BATTERY_BANK_SIZE_CALCULATOR_GUIDE,
  [AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG]:
    AMP_HOURS_NEEDED_FOR_BATTERY_BANK_GUIDE,
  [OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG]:
    OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_GUIDE,
};

export const BATTERY_BANK_SIZE_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG,
    href: BATTERY_BANK_SIZE_CALCULATOR_GUIDE_HREF,
    label: "Battery Bank Size Calculator",
  },
  {
    slug: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_LANDING_SLUG,
    href: AMP_HOURS_NEEDED_FOR_BATTERY_BANK_GUIDE_HREF,
    label: "Amp-Hours Needed for Battery Bank",
  },
  {
    slug: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_LANDING_SLUG,
    href: OFF_GRID_BATTERY_CAPACITY_ESTIMATOR_GUIDE_HREF,
    label: "Off-Grid Battery Capacity Estimator",
  },
];

export function isBatteryBankSizeLandingSlug(
  slug: string
): slug is BatteryBankSizeLandingSlug {
  return (BATTERY_BANK_SIZE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryBankSizeLanding(
  slug: BatteryBankSizeLandingSlug = BATTERY_BANK_SIZE_CALCULATOR_LANDING_SLUG
): BatteryBankSizeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryBankSizeLandings(): BatteryBankSizeGuideDefinition[] {
  return BATTERY_BANK_SIZE_LANDING_SLUGS.map((slug) =>
    getBatteryBankSizeLanding(slug)
  );
}

/** Static footer links derived from BATTERY_BANK_SIZE_FOOTER_RESOURCES. */
export function getBatteryBankSizeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_BANK_SIZE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_BANK_SIZE_CALCULATOR_ID };
