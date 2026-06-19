import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_ENERGY_TOOL_PATH =
  "/tools/battery-calculators/battery-energy/" as const;

export const BATTERY_ENERGY_TOOL_HREF = getCalculatorHref(
  "battery-energy",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-energy" as const;

export type BatteryEnergyLandingSlug =
  | "battery-energy-calculator-wh"
  | "calculate-wh-from-ah-and-voltage"
  | "battery-capacity-in-watt-hours-estimator";

export const BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG =
  "battery-energy-calculator-wh" as const;

export const CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG =
  "calculate-wh-from-ah-and-voltage" as const;

export const BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG =
  "battery-capacity-in-watt-hours-estimator" as const;

export const BATTERY_ENERGY_LANDING_SLUGS = [
  BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG,
  CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG,
  BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly BatteryEnergyLandingSlug[];

export const BATTERY_ENERGY_CALCULATOR_WH_GUIDE_HREF = getGuideLandingHref(
  BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG
);

export const CALCULATE_WH_FROM_AH_AND_VOLTAGE_GUIDE_HREF = getGuideLandingHref(
  CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG
);

export const BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG);

export type BatteryEnergyGuideDefinition = GuideLandingDefinition & {
  slug: BatteryEnergyLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_ENERGY_CALCULATOR_WH_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery energy calculator (Wh): amp-hours × voltage for stored watt-hours—compare 12 V, 24 V, and 48 V banks on one energy number before runtime and DoD planning.",
  heroSubtitle:
    "Amp-hours without voltage mis-rank battery size. This battery energy calculator (Wh) converts Ah and nominal V into watt-hours—the standard unit for stored energy across chemistries and bus voltages.",
  benefits: [
    "Core formula: Wh = Ah × V (kWh = Wh ÷ 1,000).",
    "Normalizes 100 Ah at 12 V vs. 48 V to comparable energy.",
    "First step before runtime, cost-per-Wh, and solar storage sizing.",
  ],
  howItWorks: [
    "Enter battery capacity in amp-hours (Ah) from the label or spec.",
    "Add nominal system voltage (12 V, 24 V, 48 V, 3.7 V per cell, etc.).",
    "Read stored energy in watt-hours (Wh)—use for cross-voltage comparisons.",
  ],
  faq: [
    {
      q: "How does the battery energy calculator (Wh) work?",
      a: "Wh = Ah × V. Example: 100 Ah at 12 V → 1,200 Wh (1.2 kWh). The same 100 Ah at 48 V is 4,800 Wh—four times the energy despite identical amp-hour ratings.",
    },
    {
      q: "Is Wh the same as usable energy?",
      a: "No—this is nameplate stored energy at full charge. Usable Wh depends on depth of discharge, BMS reserve, and chemistry. Apply DoD after calculating gross Wh for planning margins.",
    },
    {
      q: "How is this different from Ah to Wh converter?",
      a: "Same math (Wh = Ah × V)—this tool is scoped to battery bank Ah and bus voltage. Use Ah to Wh when starting from mAh cell ratings or mixed units; both land on watt-hours for fair comparisons.",
    },
  ],
  technicalSpecs: [
    "Stored Wh = capacity_Ah × voltage_V.",
    "kWh = Wh ÷ 1,000.",
    "Nominal V—use system bus, not float/charge peak.",
    "Related: battery-energy, ah-to-wh, battery-dod-energy-yield, battery-runtime.",
  ],
};

const BATTERY_ENERGY_CALCULATOR_WH_GUIDE: BatteryEnergyGuideDefinition = {
  slug: BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: BATTERY_ENERGY_CALCULATOR_WH_GUIDE_HREF,
  toolHref: BATTERY_ENERGY_TOOL_HREF,
  guideLinkLabel: "Battery energy calculator (Wh)",
  title: "Battery Energy Calculator (Wh)",
  description: BATTERY_ENERGY_CALCULATOR_WH_CONTENT.metaDescription,
  keywords: [
    "battery energy calculator wh",
    "battery wh calculator",
    "wh from ah and voltage",
    "battery stored energy watt hours",
    "ah times voltage wh",
  ],
  seo: {
    sections: [
      {
        heading: "Wh is the apples-to-apples battery metric",
        body: "Retail copy emphasizes amp-hours; engineers and solar planners work in watt-hours. Multiplying Ah by nominal voltage converts charge capacity into energy capacity. A battery energy calculator (Wh) answers how many watt-hours sit in the pack before efficiency, inverter loss, or DoD shrink the usable slice.",
      },
      {
        heading: "Voltage doubles—energy scales with it",
        body: "Quadrupling bus voltage from 12 V to 48 V quadruples Wh for the same Ah sticker. Series strings raise V; parallel strings raise Ah—document both when summing a bank. Wh captures the combined effect in one figure for interconnection limits and load-matching.",
      },
      {
        heading: "From gross Wh to operational planning",
        body: "After Wh is known, divide by load watts for rough runtime, or multiply by DoD % for usable energy. Pair with Battery Bank Size when translating daily kWh loads into required Ah at your voltage, and with Battery DoD to Energy Yield when reserve and depth caps apply.",
      },
    ],
  },
  content: BATTERY_ENERGY_CALCULATOR_WH_CONTENT,
};

const CALCULATE_WH_FROM_AH_AND_VOLTAGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate Wh from Ah and voltage: Wh = Ah × V with worked examples—derive watt-hours for 12 V AGM, 48 V LiFePO4, and series-parallel banks before runtime and solar sizing.",
  heroSubtitle:
    "Amp-hours measure charge; watt-hours measure energy. This guide shows how to calculate Wh from Ah and voltage—bank capacity, nominal bus V, and stored energy for apples-to-apples comparisons.",
  benefits: [
    "Single-step: Wh = Ah × V (multiply, no unit tricks).",
    "Works for single blocks and summed series/parallel banks.",
    "Outputs kWh by dividing Wh by 1,000 for utility-scale reads.",
  ],
  howItWorks: [
    "Confirm total bank Ah (parallel adds Ah; series keeps Ah).",
    "Use nominal system voltage (series adds V; parallel keeps V).",
    "Multiply Ah × V for Wh—compare packs at different voltages fairly.",
  ],
  faq: [
    {
      q: "How do I calculate Wh from Ah and voltage?",
      a: "Wh = Ah × V. Example: 280 Ah at 48 V → 280 × 48 = 13,440 Wh (13.44 kWh). For 200 Ah at 12 V: 200 × 12 = 2,400 Wh. Voltage must match the Ah rating bus—do not mix cell V with pack Ah from a different string.",
    },
    {
      q: "How do series and parallel strings affect Wh?",
      a: "Series raises voltage; parallel raises Ah. A 4S2P 100 Ah 3.2 V LiFePO4 block: 12.8 V × 200 Ah = 2,560 Wh. Calculate Wh after resolving total bank Ah and system V—not per-cell mAh alone unless you rebuild the string math.",
    },
    {
      q: "Should I use nominal or fully charged voltage?",
      a: "Use nominal bus voltage for planning—12 V lead-acid, 48 V LiFePO4 nominal, 3.7 V Li-ion cell. Float and charge voltages are higher temporarily; energy comparisons across products use nominal V unless the datasheet specifies otherwise.",
    },
  ],
  technicalSpecs: [
    "Wh = capacity_Ah × nominal_V.",
    "kWh = Wh ÷ 1,000.",
    "Series: V adds; parallel: Ah adds (for Wh, use totals).",
    "Related: battery-energy-calculator-wh, ah-to-wh, battery-bank-size.",
  ],
};

const CALCULATE_WH_FROM_AH_AND_VOLTAGE_GUIDE: BatteryEnergyGuideDefinition = {
  slug: CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: CALCULATE_WH_FROM_AH_AND_VOLTAGE_GUIDE_HREF,
  toolHref: BATTERY_ENERGY_TOOL_HREF,
  guideLinkLabel: "Calculate Wh from Ah and Voltage",
  title: "Calculate Wh from Ah and Voltage",
  description: CALCULATE_WH_FROM_AH_AND_VOLTAGE_CONTENT.metaDescription,
  keywords: [
    "calculate wh from ah and voltage",
    "ah times voltage watt hours",
    "convert ah to wh with voltage",
    "battery wh formula",
    "amp hour voltage to watt hour",
  ],
  seo: {
    sections: [
      {
        heading: "Two inputs, one energy number",
        body: "Every battery label lists amp-hours; the missing variable for energy is voltage. Calculate Wh from Ah and voltage by multiplying—no conversion tables required. A 400 Ah 12 V bank and a 100 Ah 48 V bank both store 4,800 Wh. Procurement teams that sort only by Ah overpay or under-size when bus voltage changes.",
      },
      {
        heading: "Build bank totals before multiplying",
        body: "Stacking modules in series increases voltage; paralleling increases Ah. Resolve the as-installed Ah and V at the main bus, then Wh = Ah × V. Per-module math is fine for BOM checks, but interconnection and inverter limits care about the whole bank Wh at the service voltage.",
      },
      {
        heading: "Wh feeds the next calculators",
        body: "Divide Wh by load watts for runtime estimates, or apply DoD % for usable energy. When daily load is stated in kWh, compare directly after converting bank Wh to kWh. Chain to Battery Runtime for hours, Battery Bank Size when working backward from load budgets, and Ah to Wh when sources quote mAh cell data.",
      },
    ],
  },
  content: CALCULATE_WH_FROM_AH_AND_VOLTAGE_CONTENT,
};

const BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery capacity in watt-hours estimator: project stored Wh from Ah and nominal voltage—quote solar storage, rank LiFePO4 vs. AGM modules, and match daily kWh loads before DoD and inverter loss.",
  heroSubtitle:
    "Estimating capacity in watt-hours turns amp-hour labels into an energy budget you can compare to loads and tariffs. This battery capacity in watt-hours estimator uses Ah × V to project gross Wh for planning—not yet usable energy after depth of discharge.",
  benefits: [
    "Estimates gross Wh = Ah × nominal V per bank or module.",
    "Ranks mixed-voltage SKUs on one Wh/kWh scale.",
    "Feeds DoD, runtime, and cost-per-kWh next steps.",
  ],
  howItWorks: [
    "Gather nameplate Ah and nominal bus voltage for each candidate pack.",
    "Multiply to estimate watt-hours; divide by 1,000 for kWh reads.",
    "Compare estimated Wh to daily load kWh and interconnection caps.",
  ],
  faq: [
    {
      q: "What does a battery capacity in watt-hours estimator do?",
      a: "It projects stored energy: Wh ≈ Ah × V. Example: estimating a 300 Ah 12 V AGM bank → 3,600 Wh (3.6 kWh) gross. Compare that to a 5 kWh LiFePO4 wall unit quoted in kWh—same unit after converting Wh ÷ 1,000.",
    },
    {
      q: "Is estimated Wh the same as usable capacity?",
      a: "No—gross Wh is full-charge nameplate energy. Usable Wh = gross × (DoD% ÷ 100) minus BMS reserve. Estimate gross Wh first, then apply DoD for outage or off-grid autonomy math.",
    },
    {
      q: "How do I estimate Wh for multiple parallel strings?",
      a: "Parallel strings add Ah at the same voltage: total Ah × V. Two 100 Ah 12 V in parallel → 200 Ah × 12 V = 2,400 Wh estimated. Series strings add voltage instead—resolve installed Ah and V before estimating.",
    },
  ],
  technicalSpecs: [
    "Estimated Wh = total_Ah × nominal_V.",
    "Estimated kWh = Wh ÷ 1,000.",
    "Usable Wh ≈ estimated Wh × (DoD% ÷ 100) (next step).",
    "Related: battery-energy-calculator-wh, calculate-wh-from-ah-and-voltage.",
  ],
};

const BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_GUIDE: BatteryEnergyGuideDefinition = {
  slug: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_GUIDE_HREF,
  toolHref: BATTERY_ENERGY_TOOL_HREF,
  guideLinkLabel: "Battery capacity in watt-hours estimator",
  title: "Battery Capacity in Watt-Hours Estimator",
  description: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "battery capacity in watt-hours estimator",
    "estimate battery wh capacity",
    "battery kwh capacity estimate",
    "stored energy estimator ah voltage",
    "battery wh planning tool",
  ],
  seo: {
    sections: [
      {
        heading: "Estimate Wh before you buy modules",
        body: "Vendors mix Ah at 12 V, kWh at 48 V, and mAh on cells. A battery capacity in watt-hours estimator normalizes quotes to Wh so you can line them up against a 4.5 kWh nightly load or a 10 kWh interconnection allowance. Estimating is not installing—it's the filter that drops undersized SKUs before wire and BMS work begin.",
      },
      {
        heading: "Gross Wh vs. what you can actually use",
        body: "Estimated Wh assumes full charge and nominal voltage. Lead-acid planners may use 50% DoD; LiFePO4 often allows 80–90%. Document gross estimated Wh on the proposal, then show usable Wh in the next line so customers do not expect nameplate energy every cycle. Pair with Battery DoD to Energy Yield when the project language is usable kWh.",
      },
      {
        heading: "From capacity estimate to system fit",
        body: "Once Wh is estimated, divide by average load watts for duration, or compare kWh directly to utility offset goals. If estimate falls short, add parallel Ah or choose higher-V modules with the same Wh target. Battery Bank Size works backward from load; this estimator works forward from hardware on the quote sheet.",
      },
    ],
  },
  content: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  BatteryEnergyLandingSlug,
  BatteryEnergyGuideDefinition
> = {
  [BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG]: BATTERY_ENERGY_CALCULATOR_WH_GUIDE,
  [CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG]:
    CALCULATE_WH_FROM_AH_AND_VOLTAGE_GUIDE,
  [BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG]:
    BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the Battery Energy tool footer Resources column. */
export const BATTERY_ENERGY_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG,
    href: BATTERY_ENERGY_CALCULATOR_WH_GUIDE_HREF,
    label: "Battery Energy Calculator (Wh)",
  },
  {
    slug: CALCULATE_WH_FROM_AH_AND_VOLTAGE_LANDING_SLUG,
    href: CALCULATE_WH_FROM_AH_AND_VOLTAGE_GUIDE_HREF,
    label: "Calculate Wh from Ah and Voltage",
  },
  {
    slug: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_LANDING_SLUG,
    href: BATTERY_CAPACITY_IN_WATT_HOURS_ESTIMATOR_GUIDE_HREF,
    label: "Battery Capacity in Watt-Hours Estimator",
  },
];

export function isBatteryEnergyLandingSlug(
  slug: string
): slug is BatteryEnergyLandingSlug {
  return (BATTERY_ENERGY_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryEnergyLanding(
  slug: BatteryEnergyLandingSlug = BATTERY_ENERGY_CALCULATOR_WH_LANDING_SLUG
): BatteryEnergyGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryEnergyLandings(): BatteryEnergyGuideDefinition[] {
  return BATTERY_ENERGY_LANDING_SLUGS.map((slug) =>
    getBatteryEnergyLanding(slug)
  );
}

/** Static footer links derived from BATTERY_ENERGY_FOOTER_RESOURCES. */
export function getBatteryEnergyToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_ENERGY_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_ENERGY_CALCULATOR_ID };
