import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_CHARGING_TIME_TOOL_PATH =
  "/tools/battery-calculators/battery-charging-time/" as const;

export const BATTERY_CHARGING_TIME_TOOL_HREF = getCalculatorHref(
  "battery-charging-time",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-charging-time" as const;

export type BatteryChargingTimeLandingSlug =
  | "battery-charging-time-calculator"
  | "calculate-charge-time-based-on-current-amps"
  | "battery-charge-duration-estimator";

export const BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG =
  "battery-charging-time-calculator" as const;

export const CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG =
  "calculate-charge-time-based-on-current-amps" as const;

export const BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG =
  "battery-charge-duration-estimator" as const;

export const BATTERY_CHARGING_TIME_LANDING_SLUGS = [
  BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG,
  CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG,
  BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly BatteryChargingTimeLandingSlug[];

export const BATTERY_CHARGING_TIME_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG);

export const BATTERY_CHARGE_DURATION_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG);

export type BatteryChargingTimeGuideDefinition = GuideLandingDefinition & {
  slug: BatteryChargingTimeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_CHARGING_TIME_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery charging time calculator: capacity mAh ÷ charger mA, adjusted for charge efficiency—estimate how long phones, power banks, and Li-ion packs take to refill.",
  heroSubtitle:
    "Charge time is capacity divided by current—plus real-world loss from heat and taper. This guide walks through the battery charging time calculator: mAh, charger mA, and efficiency % for a realistic refill estimate.",
  benefits: [
    "Base formula: hours = mAh ÷ mA, then ÷ (efficiency ÷ 100).",
    "Efficiency field models taper and heat loss (try 85–95%).",
    "Pairs with Battery Runtime for discharge-then-recharge planning.",
  ],
  howItWorks: [
    "Enter battery capacity in mAh from the label or datasheet.",
    "Add charger output current in mA (wall brick, USB-C PD, or bench supply).",
    "Set charge efficiency %—read estimated time to full.",
  ],
  faq: [
    {
      q: "How does the battery charging time calculator work?",
      a: "Time (h) = mAh ÷ mA ÷ (efficiency ÷ 100). Example: 5,000 mAh at 2,000 mA and 90% efficiency → 5,000 ÷ 2,000 ÷ 0.9 ≈ 2.78 hours. At 100% efficiency the base time is 2.5 hours; loss adds margin.",
    },
    {
      q: "What efficiency should I use?",
      a: "Use 100% for a theoretical upper bound. For Li-ion with CC/CV taper, 85–95% is typical—lower for fast chargers or cold packs. The tool note on the calculator reminds you that taper above ~80% SoC extends real-world time.",
    },
    {
      q: "Can I use this for 12 V Ah banks?",
      a: "Convert Ah to mAh first (× 1,000), then use charger amps as mA (× 1,000). Example: 100 Ah at 20 A charge → 100,000 mAh ÷ 20,000 mA = 5 h base before efficiency. Voltage cancels in the mAh/mA ratio when both are at the same bus.",
    },
  ],
  technicalSpecs: [
    "Charge time (h) = capacity_mAh ÷ current_mA ÷ (efficiency% ÷ 100).",
    "C-rate hint: current_mA ÷ capacity_mAh ≈ C (1C → ~1 h at 100% eff.).",
    "Taper: expect longer than calc above ~80% SoC unless eff is lowered.",
    "Related: battery-charging-time, battery-runtime, solar-panel-size.",
  ],
};

const BATTERY_CHARGING_TIME_CALCULATOR_GUIDE: BatteryChargingTimeGuideDefinition =
  {
    slug: BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_CHARGING_TIME_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_CHARGING_TIME_TOOL_HREF,
    guideLinkLabel: "Battery charging time calculator",
    title: "Battery Charging Time Calculator",
    description: BATTERY_CHARGING_TIME_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "battery charging time calculator",
      "charge time calculator",
      "mah charging time",
      "how long to charge battery",
      "battery recharge hours",
    ],
    seo: {
      sections: [
        {
          heading: "mAh and mA cancel to hours—before taper",
          body: "Milliamp-hours divided by milliamps gives hours at constant current. A 10,000 mAh pack on a 2 A (2,000 mA) supply needs five hours at ideal constant current. Real chargers reduce current as voltage rises—the battery charging time calculator lets you fold that behavior into an efficiency percentage instead of modeling every CC/CV stage.",
        },
        {
          heading: "Fast charge vs. battery health",
          body: "Higher mA shrinks time linearly in the formula but may exceed manufacturer C-rate limits. Phone quick-charge bricks quote peak watts; average current over the session is lower. Use nameplate charge current when known, and conservative efficiency when planning overnight solar recharge windows.",
        },
        {
          heading: "Close the loop with runtime",
          body: "After discharge planning with Battery Runtime, use this calculator to see if overnight hours can refill the pack before the next cycle. Off-grid campers multiply daily solar Wh by inverter efficiency, convert to effective charge mA, and compare to required mAh recovery. Solar Panel Size helps when the limit is panel yield, not charger amperage.",
        },
      ],
    },
    content: BATTERY_CHARGING_TIME_CALCULATOR_CONTENT,
  };

const CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate charge time based on current (Amps): Ah ÷ charge amps for hours—convert to mAh and mA for the tool, add efficiency for taper and heat on 12 V, RV, and Li-ion banks.",
  heroSubtitle:
    "Amp-hour banks and amp chargers speak the same language—hours equal Ah divided by A. This guide shows how to calculate charge time based on current (Amps), map into mAh/mA for the calculator, and derate for real taper curves.",
  benefits: [
    "Core rule: charge time (h) ≈ capacity_Ah ÷ current_A.",
    "1 A = 1,000 mA; 1 Ah = 1,000 mAh for tool entry.",
    "Efficiency % captures CC/CV taper above ~80% SoC.",
  ],
  howItWorks: [
    "Read battery capacity in Ah (or convert mAh ÷ 1,000).",
    "Note charger output in amps—multiply by 1,000 for mA in the tool.",
    "Apply charge efficiency; read hours to full.",
  ],
  faq: [
    {
      q: "How do I calculate charge time from amps?",
      a: "Time (h) = Ah ÷ A, before losses. Example: 200 Ah AGM at 20 A → 200 ÷ 20 = 10 hours ideal. With 90% efficiency → 10 ÷ 0.9 ≈ 11.1 hours. In the calculator: 200,000 mAh and 20,000 mA yield the same base math.",
    },
    {
      q: "Why convert amps to milliamps for the calculator?",
      a: "The tool accepts mAh and mA—common on phone and USB specs. For marine and RV banks quoted in Ah with a 10 A charger, use 10,000 mA and capacity × 1,000 mAh. The ratio—and therefore hours—stays identical.",
    },
    {
      q: "Does charge voltage change the Ah ÷ A formula?",
      a: "At a fixed bus voltage, charge current in amps already implies power. Ah ÷ A gives hours regardless of 12 V vs. 48 V when capacity and charger current are measured at that same system. Use manufacturer max charge amps, not breaker rating alone.",
    },
  ],
  technicalSpecs: [
    "Time_h = capacity_Ah ÷ current_A ÷ (efficiency% ÷ 100).",
    "mAh = Ah × 1,000; mA = A × 1,000 (calculator inputs).",
    "C-rate: current_A ÷ capacity_Ah (0.2C → ~5 h at 100% eff.).",
    "Related: battery-charging-time-calculator, battery-runtime, dc-cable-size.",
  ],
};

const CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_GUIDE: BatteryChargingTimeGuideDefinition =
  {
    slug: CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_GUIDE_HREF,
    toolHref: BATTERY_CHARGING_TIME_TOOL_HREF,
    guideLinkLabel: "Calculate charge time based on current (Amps)",
    title: "Calculate Charge Time Based on Current (Amps)",
    description:
      CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_CONTENT.metaDescription,
    keywords: [
      "calculate charge time based on current amps",
      "charge time ah divided by amps",
      "battery charging hours from amps",
      "amp hour charge time formula",
      "12v battery charge time amps",
    ],
    seo: {
      sections: [
        {
          heading: "Amps are the fill rate for amp-hours",
          body: "A 100 Ah battery on a 10 A charger needs ten hours at constant current—capacity divided by flow. Calculate charge time based on current (Amps) before worrying about milliamps on phone labels. Solar controllers and shore-power chargers quote amps; house banks quote Ah. The division is the first sanity check on whether an overnight window is long enough.",
        },
        {
          heading: "Respect charger and BMS amp limits",
          body: "Flooded lead-acid may accept 0.1C–0.2C; LiFePO4 often allows higher sustained amps until taper. Using breaker or fuse rating instead of charger setpoint overstates current and understates time. Enter the actual regulated charge amps from the MPPT, DC-DC, or inverter charger menu—not the cable ampacity alone.",
        },
        {
          heading: "From amp math to mAh/mA in the tool",
          body: "Multiply Ah and A by 1,000 to use the Battery Charging Time calculator without changing the answer. Add efficiency when taper matters: a 10 h ideal session at 88% effective throughput becomes 11.4 h planning time. Pair with Battery Runtime to balance daily discharge against available charge amps from solar or generator paths.",
        },
      ],
    },
    content: CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_CONTENT,
  };

const BATTERY_CHARGE_DURATION_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery charge duration estimator: project refill hours from mAh, charger current, and efficiency—plan field recharge windows, overnight solar recovery, and partial top-ups before the next load cycle.",
  heroSubtitle:
    "Duration is more than a formula—it is whether your charge window fits the trip. This battery charge duration estimator walks through capacity, charger rate, and efficiency to estimate how long until the pack is ready again.",
  benefits: [
    "Estimates full-charge duration from mAh ÷ mA with efficiency margin.",
    "Scales for partial refill: duration × (mAh_needed ÷ capacity).",
    "Documents taper and heat loss via efficiency %—not false precision.",
  ],
  howItWorks: [
    "Enter total pack mAh (or Ah × 1,000) and usable charger mA.",
    "Set efficiency 85–95% when taper and heat apply; 100% for ideal CC only.",
    "Read duration—compare to available shore, solar, or generator hours.",
  ],
  faq: [
    {
      q: "What does a battery charge duration estimator do?",
      a: "It projects how many hours a charge session lasts: mAh ÷ mA ÷ (efficiency ÷ 100). Example: 20,000 mAh at 4,000 mA and 90% efficiency → 20,000 ÷ 4,000 ÷ 0.9 ≈ 5.56 hours. Use it to see if an 8-hour overnight window can finish a depleted bank.",
    },
    {
      q: "How do I estimate duration for a partial charge?",
      a: "Multiply full duration by the fraction of capacity needed. Need 50% of a 10,000 mAh pack? Use 5,000 mAh effective in the formula—or run full capacity and halve the result. Add efficiency if the top-up segment still tapers.",
    },
    {
      q: "Why is estimated duration longer than mAh ÷ mA?",
      a: "Chargers taper current near full SoC; heat wastes energy; BMS may pause on temperature. Lower efficiency in the estimator stretches duration to match field experience—better for schedules than assuming 100% constant current.",
    },
  ],
  technicalSpecs: [
    "Full duration_h = mAh ÷ mA ÷ (efficiency% ÷ 100).",
    "Partial duration ≈ full_duration × (mAh_to_add ÷ total_mAh).",
    "Planning buffer: +10–15% beyond estimate for cold or aged packs.",
    "Related: battery-charging-time-calculator, battery-runtime, solar-panel-size.",
  ],
};

const BATTERY_CHARGE_DURATION_ESTIMATOR_GUIDE: BatteryChargingTimeGuideDefinition = {
  slug: BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: BATTERY_CHARGE_DURATION_ESTIMATOR_GUIDE_HREF,
  toolHref: BATTERY_CHARGING_TIME_TOOL_HREF,
  guideLinkLabel: "Battery charge duration estimator",
  title: "Battery Charge Duration Estimator",
  description: BATTERY_CHARGE_DURATION_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "battery charge duration estimator",
    "estimate battery charge duration",
    "how long to recharge battery",
    "charge session hours estimator",
    "battery refill time estimate",
  ],
  seo: {
    sections: [
      {
        heading: "Duration answers schedule questions",
        body: "Technicians ask how many hours until full; campers ask if dawn-to-dusk solar can recover yesterday's draw. A battery charge duration estimator turns mAh, charger mA, and a realistic efficiency into a block of hours you can place on a timeline—not a marketing quick-charge headline. Compare that block to your available plug-in, generator, or solar window before committing to gear.",
      },
      {
        heading: "Estimator vs. ideal constant current",
        body: "Datasheets imply straight-line charging; BMS curves bend the line. Folding taper into 85–95% efficiency produces a single duration number suitable for runbooks without simulating every CV stage. For compliance or warranty documentation, note the efficiency assumption next to the estimated hours so reviewers know it is planning-grade, not bench-instrument trace data.",
      },
      {
        heading: "Close the discharge–recharge loop",
        body: "Estimate runtime with Battery Runtime, then duration here for the refill leg. If duration exceeds the overnight gap, raise charge amps (within C-rate), add capacity, or shed load—not hope for faster chemistry. Solar Panel Size helps when the bottleneck is harvest watts converting to charge current, not the formula alone.",
      },
    ],
  },
  content: BATTERY_CHARGE_DURATION_ESTIMATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<
  BatteryChargingTimeLandingSlug,
  BatteryChargingTimeGuideDefinition
> = {
  [BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG]:
    BATTERY_CHARGING_TIME_CALCULATOR_GUIDE,
  [CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG]:
    CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_GUIDE,
  [BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG]:
    BATTERY_CHARGE_DURATION_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the Battery Charging Time tool footer Resources column. */
export const BATTERY_CHARGING_TIME_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG,
      href: BATTERY_CHARGING_TIME_CALCULATOR_GUIDE_HREF,
      label: "Battery Charging Time Calculator",
    },
    {
      slug: CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_LANDING_SLUG,
      href: CALCULATE_CHARGE_TIME_BASED_ON_CURRENT_AMPS_GUIDE_HREF,
      label: "Calculate Charge Time Based on Current (Amps)",
    },
    {
      slug: BATTERY_CHARGE_DURATION_ESTIMATOR_LANDING_SLUG,
      href: BATTERY_CHARGE_DURATION_ESTIMATOR_GUIDE_HREF,
      label: "Battery Charge Duration Estimator",
    },
  ];

export function isBatteryChargingTimeLandingSlug(
  slug: string
): slug is BatteryChargingTimeLandingSlug {
  return (BATTERY_CHARGING_TIME_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getBatteryChargingTimeLanding(
  slug: BatteryChargingTimeLandingSlug = BATTERY_CHARGING_TIME_CALCULATOR_LANDING_SLUG
): BatteryChargingTimeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryChargingTimeLandings(): BatteryChargingTimeGuideDefinition[] {
  return BATTERY_CHARGING_TIME_LANDING_SLUGS.map((slug) =>
    getBatteryChargingTimeLanding(slug)
  );
}

/** Static footer links derived from BATTERY_CHARGING_TIME_FOOTER_RESOURCES. */
export function getBatteryChargingTimeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_CHARGING_TIME_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_CHARGING_TIME_CALCULATOR_ID };
