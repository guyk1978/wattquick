import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_DOD_ENERGY_YIELD_TOOL_PATH =
  "/tools/unit-conversion/battery-dod-energy-yield/" as const;

export const BATTERY_DOD_ENERGY_YIELD_TOOL_HREF = getCalculatorHref(
  "battery-dod-energy-yield",
  "convert"
);

const BASE_CALCULATOR_ID = "battery-dod-energy-yield" as const;

export type BatteryDodEnergyYieldLandingSlug =
  | "battery-dod-to-usable-energy-calculator"
  | "calculate-usable-battery-capacity-for-critical-loads"
  | "dod-and-battery-discharge-energy-calculator";

export const BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG =
  "battery-dod-to-usable-energy-calculator" as const;

export const CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG =
  "calculate-usable-battery-capacity-for-critical-loads" as const;

export const DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG =
  "dod-and-battery-discharge-energy-calculator" as const;

export const BATTERY_DOD_ENERGY_YIELD_LANDING_SLUGS = [
  BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG,
  CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG,
  DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly BatteryDodEnergyYieldLandingSlug[];

export const BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG);

export const CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG
  );

export const DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG);

export type BatteryDodEnergyYieldGuideDefinition = GuideLandingDefinition & {
  slug: BatteryDodEnergyYieldLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery DoD to usable energy calculator: nominal kWh × depth of discharge % for usable kWh and Wh—LiFePO4, lead-acid, and home backup banks before runtime planning.",
  heroSubtitle:
    "Nameplate kilowatt-hours are not all available—depth of discharge sets the usable floor. This guide walks through the battery DoD to usable energy calculator: nominal capacity in kWh, DoD %, and energy your loads can actually draw.",
  benefits: [
    "Formula: usable kWh = nominal kWh × (DoD ÷ 100).",
    "Typical DoD: LiFePO4 80–90%, lead-acid ~50%.",
    "Outputs usable kWh, Wh, and reserved capacity in one run.",
  ],
  howItWorks: [
    "Enter nominal battery capacity in kWh from spec or sticker.",
    "Set depth of discharge %—chemistry guideline or BMS cutoff policy.",
    "Read usable energy in kWh and Wh; compare to backup load budgets.",
  ],
  faq: [
    {
      q: "How do I calculate usable energy from DoD?",
      a: "Usable kWh = nominal kWh × (DoD ÷ 100). Example: 13.5 kWh Powerwall-class nominal at 90% DoD → 13.5 × 0.9 = 12.15 kWh usable. The remaining 10% is reserve held by the BMS.",
    },
    {
      q: "What DoD should I use for lithium vs. lead-acid?",
      a: "LiFePO4 home storage often plans 80–90% daily DoD for cycle life balance. Flooded or AGM lead-acid is commonly limited to ~50% for longevity. Enter the DoD your warranty and BMS allow—not 100% unless the spec explicitly supports it.",
    },
    {
      q: "Is usable energy the same as nameplate kWh?",
      a: "No—marketing kWh is nominal nameplate energy. Usable kWh is what you can discharge to your chosen floor. Runtime and critical-load math must use usable kWh, or you will overestimate backup hours.",
    },
  ],
  technicalSpecs: [
    "Usable kWh = nominal_kWh × (DoD% ÷ 100).",
    "Usable Wh = usable_kWh × 1,000.",
    "Reserve kWh = nominal − usable.",
    "Related: battery-dod-energy-yield, battery-depth-of-discharge, ah-to-wh.",
  ],
};

const BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_GUIDE: BatteryDodEnergyYieldGuideDefinition =
  {
    slug: BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_DOD_ENERGY_YIELD_TOOL_HREF,
    guideLinkLabel: "Battery DoD to usable energy calculator",
    title: "Battery DoD to Usable Energy Calculator",
    description:
      BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "battery dod to usable energy calculator",
      "depth of discharge usable kwh",
      "battery usable capacity calculator",
      "dod energy yield",
      "lithium usable kwh planning",
    ],
    seo: {
      sections: [
        {
          heading: "Nameplate kWh oversells what loads receive",
          body: "Battery vendors quote nominal energy at full charge reference—not every amp-hour is cycled daily. Depth of discharge is the fraction you plan to use between top and bottom SOC limits. Multiplying nominal kWh by DoD % converts sticker capacity into the kilowatt-hours available for outage runtime or off-grid budgeting.",
        },
        {
          heading: "DoD is a policy choice, not a single number",
          body: "The same 10 kWh pack might be operated at 80% DoD for warranty compliance or 90% for maximum autonomy in a rare outage. Run the calculator at both assumptions and bracket your critical-load hours. LiFePO4 cycle life tables reward shallower daily DoD—usable energy trades off against bank longevity.",
        },
        {
          heading: "Usable kWh feeds runtime and BOM",
          body: "Divide usable Wh by critical load watts for backup hours, or compare usable kWh to Whole House Energy Budget daily totals. Reserve kWh in the tool output is the headroom your BMS keeps—do not allocate it to loads. Pair results with Critical Load Analysis when circuits—not whole-home kWh—define the backup scope.",
        },
      ],
    },
    content: BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_CONTENT,
  };

const CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate usable battery capacity for critical loads: nominal kWh × DoD % vs. backup Wh budget—size LiFePO4 and lead-acid banks for fridge, heat, and essential circuits only.",
    heroSubtitle:
      "Critical-load backup is not whole-home kWh—it is usable energy after DoD against the circuits that must stay on. This guide shows how to calculate usable battery capacity for critical loads from bank nominal kWh, depth of discharge, and your essential load tally.",
    benefits: [
      "Usable kWh = nominal × (DoD ÷ 100) for outage runtime checks.",
      "Compare usable Wh to Critical Load Analysis totals.",
      "Reserve kWh stays out of the critical-load budget.",
    ],
    howItWorks: [
      "Sum critical load energy in Wh or kWh (fridge, furnace, networking, etc.).",
      "Enter installed or planned bank nominal kWh and operating DoD %.",
      "Verify usable kWh ≥ critical load × desired outage hours (before inverter loss).",
    ],
    faq: [
      {
        q: "How do I size usable capacity for critical loads?",
        a: "Usable kWh = nominal × (DoD ÷ 100). Example: critical loads need 4 kWh/day, target 24 h backup → need ≥4 kWh usable. A 5 kWh nominal bank at 80% DoD → 4 kWh usable—meets the floor with no margin; add headroom or lower DoD reserve.",
      },
      {
        q: "Should I use whole-home or critical-load kWh?",
        a: "Use critical-load kWh only for essential-circuit backup quotes. Whole-house daily kWh from energy budgets overstates what a sub-panel backup inverter must feed. Match usable bank energy to the load list you actually transfer.",
      },
      {
        q: "What margin should I add after usable kWh matches load?",
        a: "Plan 10–20% above calculated critical Wh for inverter efficiency, battery aging, and cold-weather capacity loss. Also keep BMS reserve outside DoD—usable kWh in this tool is already net of your DoD cap, not infinite depth.",
      },
    ],
    technicalSpecs: [
      "Usable kWh = nominal_kWh × (DoD% ÷ 100).",
      "Required nominal ≥ critical_kWh ÷ (DoD% ÷ 100).",
      "Runtime h ≈ usable_Wh ÷ critical_load_W (DC/AC efficiency extra).",
      "Related: critical-load-analysis, home-backup-sizing, battery-dod-to-usable-energy-calculator.",
    ],
  };

const CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_GUIDE: BatteryDodEnergyYieldGuideDefinition =
  {
    slug: CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_GUIDE_HREF,
    toolHref: BATTERY_DOD_ENERGY_YIELD_TOOL_HREF,
    guideLinkLabel: "Calculate usable battery capacity for critical loads",
    title: "Calculate Usable Battery Capacity for Critical Loads",
    description:
      CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_CONTENT.metaDescription,
    keywords: [
      "calculate usable battery capacity for critical loads",
      "critical load backup battery sizing",
      "usable kwh critical circuits",
      "dod backup energy planning",
      "essential load battery capacity",
    ],
    seo: {
      sections: [
        {
          heading: "Critical loads are a subset—size usable kWh to match",
          body: "A 30 kWh whole-home figure does not belong in a critical-panel backup sheet. List transferred circuits—refrigeration, heat, water pump, communications—and total their Wh per outage day. Convert bank nominal kWh with your DoD % to usable kWh and check coverage. Oversizing nominal without adjusting DoD still leaves less energy than the sticker suggests.",
        },
        {
          heading: "Work backward from hours of autonomy",
          body: "If critical loads draw 1.6 kWh over 12 hours, you need at least 1.6 kWh usable for that window—before inverter conversion loss. Scale to 24 or 48 hours by multiplying load energy. Then solve for nominal: nominal = required_usable ÷ (DoD ÷ 100). That is the bank nameplate to quote when vendors sell by kWh modules.",
        },
        {
          heading: "Document usable vs. reserve on the BOM",
          body: "Project snapshots should show usable kWh, reserved kWh, and critical-load Wh in one line item so reviewers see the margin. Pair this calculator with Critical Load Analysis for circuit-level watts and with Home Backup Sizing when generator plus battery hybrid paths are compared. Usable capacity is the hinge between load study and battery SKU count.",
        },
      ],
    },
    content: CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_CONTENT,
  };

const DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "DoD and battery discharge energy calculator: depth of discharge % × nominal kWh for discharge yield in kWh and Wh—plan how much energy leaves the bank each cycle before BMS cutoff.",
  heroSubtitle:
    "Discharge energy is the kWh you actually pull from the bank each cycle—not the full nameplate. This guide walks through the DoD and battery discharge energy calculator: nominal capacity, DoD %, and the discharge yield available to inverters and loads.",
  benefits: [
    "Discharge energy (usable) = nominal kWh × (DoD ÷ 100).",
    "Shows reserved kWh held above your discharge floor.",
    "Compare discharge yield across 50%, 80%, and 90% DoD policies.",
  ],
  howItWorks: [
    "Enter nominal bank kWh from module sticker or datasheet.",
    "Set planned depth of discharge % for the cycle you are modeling.",
    "Read discharge energy in kWh and Wh—the yield per discharge event.",
  ],
  faq: [
    {
      q: "What is battery discharge energy at a given DoD?",
      a: "Discharge energy ≈ nominal kWh × (DoD ÷ 100). Example: 20 kWh nominal at 80% DoD → 16 kWh discharged per cycle; 4 kWh remains as reserve above the floor. That 16 kWh is what loads can consume before hitting the BMS low-voltage cutoff.",
    },
    {
      q: "How is discharge energy different from energy yield?",
      a: "In planning terms they are the same usable energy released between charge top and discharge floor—yield per cycle. Marketing yield sometimes includes round-trip efficiency; this calculator gives gross discharge kWh from capacity and DoD before inverter and cable losses.",
    },
    {
      q: "Does a deeper DoD always mean more discharge energy?",
      a: "Yes, mathematically—higher DoD % multiplies more of nominal kWh into discharge energy. But deeper daily DoD reduces cycle life for most chemistries. Compare discharge kWh at 80% vs. 90% DoD, then weigh autonomy against replacement interval.",
    },
  ],
  technicalSpecs: [
    "Discharge kWh = nominal_kWh × (DoD% ÷ 100).",
    "Reserve kWh = nominal − discharge_kWh.",
    "Discharge Wh = discharge_kWh × 1,000.",
    "Related: battery-depth-of-discharge, battery-dod-to-usable-energy-calculator.",
  ],
};

const DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_GUIDE: BatteryDodEnergyYieldGuideDefinition =
  {
    slug: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_DOD_ENERGY_YIELD_TOOL_HREF,
    guideLinkLabel: "DoD and battery discharge energy calculator",
    title: "DoD and Battery Discharge Energy Calculator",
    description: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "dod and battery discharge energy calculator",
      "battery discharge energy kwh",
      "depth of discharge energy yield",
      "discharge yield calculator",
      "battery cycle discharge kwh",
    ],
    seo: {
      sections: [
        {
          heading: "DoD defines how much of the tank you drain",
          body: "A battery cycle discharges from a high state of charge to a lower floor set by chemistry, warranty, and BMS. Depth of discharge is the fraction of nominal energy in that swing. Modeling discharge energy as nominal × DoD % answers how many kilowatt-hours one cycle delivers—before asking how many cycles per day you stack.",
        },
        {
          heading: "Discharge yield scales linearly with DoD",
          body: "Doubling DoD from 40% to 80% doubles discharge kWh from the same nominal bank. The trade is cycle life and thermal stress, not arithmetic. Run the calculator at your minimum and maximum acceptable DoD to bracket discharge energy; pick the operating point where autonomy and longevity meet project goals.",
        },
        {
          heading: "From discharge kWh to system design",
          body: "Discharge yield feeds inverter runtime, solar self-consumption stacking, and generator overlap math. Subtract inverter and wiring loss after gross discharge kWh. For nightly off-grid use, multiply single-cycle discharge energy by nights of autonomy required—or use Critical Load Analysis when loads are not constant across the discharge window.",
        },
      ],
    },
    content: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  BatteryDodEnergyYieldLandingSlug,
  BatteryDodEnergyYieldGuideDefinition
> = {
  [BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG]:
    BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_GUIDE,
  [CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG]:
    CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_GUIDE,
  [DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG]:
    DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_GUIDE,
};

export const BATTERY_DOD_ENERGY_YIELD_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG,
      href: BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_GUIDE_HREF,
      label: "Battery DoD to Usable Energy Calculator",
    },
    {
      slug: CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_LANDING_SLUG,
      href: CALCULATE_USABLE_BATTERY_CAPACITY_FOR_CRITICAL_LOADS_GUIDE_HREF,
      label: "Calculate Usable Battery Capacity for Critical Loads",
    },
    {
      slug: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_LANDING_SLUG,
      href: DOD_AND_BATTERY_DISCHARGE_ENERGY_CALCULATOR_GUIDE_HREF,
      label: "DoD and Battery Discharge Energy Calculator",
    },
  ];

export function isBatteryDodEnergyYieldLandingSlug(
  slug: string
): slug is BatteryDodEnergyYieldLandingSlug {
  return (BATTERY_DOD_ENERGY_YIELD_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getBatteryDodEnergyYieldLanding(
  slug: BatteryDodEnergyYieldLandingSlug = BATTERY_DOD_TO_USABLE_ENERGY_CALCULATOR_LANDING_SLUG
): BatteryDodEnergyYieldGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryDodEnergyYieldLandings(): BatteryDodEnergyYieldGuideDefinition[] {
  return BATTERY_DOD_ENERGY_YIELD_LANDING_SLUGS.map((slug) =>
    getBatteryDodEnergyYieldLanding(slug)
  );
}

/** Static footer links derived from BATTERY_DOD_ENERGY_YIELD_FOOTER_RESOURCES. */
export function getBatteryDodEnergyYieldToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_DOD_ENERGY_YIELD_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_DOD_ENERGY_YIELD_CALCULATOR_ID };
