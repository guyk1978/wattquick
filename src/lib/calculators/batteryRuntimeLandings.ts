import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_RUNTIME_TOOL_PATH =
  "/tools/battery-calculators/battery-runtime/" as const;

export const BATTERY_RUNTIME_TOOL_HREF = getCalculatorHref(
  "battery-runtime",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-runtime" as const;

export type BatteryRuntimeLandingSlug =
  | "battery-runtime-calculator"
  | "estimate-battery-duration-under-load"
  | "calculate-battery-life-from-power-draw";

export const BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG =
  "battery-runtime-calculator" as const;

export const ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG =
  "estimate-battery-duration-under-load" as const;

export const CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG =
  "calculate-battery-life-from-power-draw" as const;

export const BATTERY_RUNTIME_LANDING_SLUGS = [
  BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG,
  ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG,
  CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG,
] as const satisfies readonly BatteryRuntimeLandingSlug[];

export const BATTERY_RUNTIME_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG
);

export const ESTIMATE_BATTERY_DURATION_UNDER_LOAD_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG);

export const CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG);

export type BatteryRuntimeGuideDefinition = GuideLandingDefinition & {
  slug: BatteryRuntimeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_RUNTIME_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery runtime calculator: convert mAh and voltage to Wh, then divide by load watts—estimate how long phones, power banks, and portable packs last at your draw.",
  heroSubtitle:
    "Capacity in mAh alone does not tell you runtime—you need voltage and load watts. This guide walks through the battery runtime calculator: mAh, nominal V, and power draw for hours of operation.",
  benefits: [
    "Wh = (mAh ÷ 1,000) × V, then runtime h = Wh ÷ W.",
    "Works for Li-ion cells, power banks, and small DC loads.",
    "Shows energy in Wh alongside duration for fair pack comparisons.",
  ],
  howItWorks: [
    "Enter battery capacity in mAh from the label or spec sheet.",
    "Add nominal voltage (3.7 V cell, 12 V AGM, etc.).",
    "Enter steady load in watts—read estimated runtime in hours or minutes.",
  ],
  faq: [
    {
      q: "How does the battery runtime calculator work?",
      a: "Convert mAh to Wh: Wh = (mAh ÷ 1,000) × V. Divide Wh by load watts for hours. Example: 5,000 mAh at 3.7 V → 18.5 Wh; at 10 W draw → ~1.85 hours. Lower watts extend runtime linearly.",
    },
    {
      q: "Why convert mAh to Wh before dividing by watts?",
      a: "mAh is charge, not energy—voltage completes the picture. A 10,000 mAh 3.7 V phone pack (37 Wh) and a 5,000 mAh 7.4 V pack (37 Wh) deliver the same runtime at the same watt load despite different mAh ratings.",
    },
    {
      q: "Should I derate the calculated runtime?",
      a: "Yes for planning—heat, age, and high discharge rates reduce usable capacity. Derate 15–20% for outdoor gear, aged cells, or continuous max draw. Pair with Battery Charging Time to plan recharge after the discharge window.",
    },
  ],
  technicalSpecs: [
    "Wh = (mAh ÷ 1,000) × V.",
    "Runtime (h) = Wh ÷ load_W.",
    "Assumes near-constant DC or inverter load in watts.",
    "Related: battery-runtime, ah-to-wh, battery-charging-time, ups-runtime.",
  ],
};

const BATTERY_RUNTIME_CALCULATOR_GUIDE: BatteryRuntimeGuideDefinition = {
  slug: BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: BATTERY_RUNTIME_CALCULATOR_GUIDE_HREF,
  toolHref: BATTERY_RUNTIME_TOOL_HREF,
  guideLinkLabel: "Battery runtime calculator",
  title: "Battery Runtime Calculator",
  description: BATTERY_RUNTIME_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "battery runtime calculator",
    "battery life calculator",
    "how long battery lasts",
    "mah to runtime",
    "watt hour battery runtime",
  ],
  seo: {
    sections: [
      {
        heading: "mAh ratings need voltage to mean runtime",
        body: "Marketing highlights milliamp-hours; engineers plan in watt-hours. The battery runtime calculator bridges both: multiply mAh by voltage, divide by 1,000 for Wh, then divide by your load watts. A 20,000 mAh power bank at 3.7 V is 74 Wh—not 20,000 mAh hours. Comparing packs on mAh alone mis-ranks runtime when voltages differ.",
      },
      {
        heading: "Load watts drive the denominator",
        body: "Runtime scales inversely with draw. Halving load doubles hours—until BMS cutoff or voltage sag under heavy current. Use measured or nameplate watts for routers, LED strips, CPAP inverters, and ham-radio rigs. For pulsed loads, use average watts over the duty cycle, not peak surge.",
      },
      {
        heading: "From runtime estimate to system design",
        body: "After hours are known, check whether depth-of-discharge and recharge time fit your use case—camp weekends, field work, or outage windows. Chain to Ah to Wh when sizing from amp-hour banks at 12 V or 48 V, or UPS Runtime when the load is on an AC inverter with efficiency loss to add mentally.",
      },
    ],
  },
  content: BATTERY_RUNTIME_CALCULATOR_CONTENT,
};

const ESTIMATE_BATTERY_DURATION_UNDER_LOAD_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate battery duration under load: Wh from mAh × voltage divided by steady watts—project how long a pack runs routers, lights, medical devices, or field gear before cutoff.",
  heroSubtitle:
    "Duration under load is energy divided by draw—no mystery once you fix the watt number. This guide shows how to estimate battery duration under load from pack mAh, voltage, and the watts your device actually pulls.",
  benefits: [
    "Duration (h) = Wh ÷ load_W with Wh from mAh and voltage.",
    "Use nameplate or metered watts for honest under-load estimates.",
    "Compare scenarios by changing only the load column.",
  ],
  howItWorks: [
    "Sum or measure load watts while the device runs normally.",
    "Convert battery mAh and nominal V to watt-hours.",
    "Divide Wh by load W—read duration before BMS or inverter cutoff.",
  ],
  faq: [
    {
      q: "How do I estimate battery duration under load?",
      a: "Wh = (mAh ÷ 1,000) × V; duration h = Wh ÷ W. Example: 12 V 100 Ah (100,000 mAh equivalent at 12 V = 1,200 Wh) at 60 W load → 1,200 ÷ 60 = 20 hours. Use average watts if load cycles on and off.",
    },
    {
      q: "What load value should I use?",
      a: "Steady DC loads: use measured watts from a meter. Inverter-fed AC: use output watts plus ~10% for conversion loss, or input watts at the battery. For intermittent loads, multiply on-time fraction by peak watts for average W.",
    },
    {
      q: "Why is duration under load shorter than the label suggests?",
      a: "Labels assume light test currents; heavy loads cause voltage sag and earlier BMS shutdown. Heat and cycle age shrink usable Wh. Derate 15–25% when the estimate must survive cold weather or an aged pack.",
    },
  ],
  technicalSpecs: [
    "Duration_h = ((mAh ÷ 1,000) × V) ÷ load_W.",
    "Average load_W = duty_cycle × peak_W (intermittent).",
    "Planning margin: 0.8–0.85 × calculated hours (typical).",
    "Related: battery-runtime-calculator, ups-runtime, watts-to-amps.",
  ],
};

const ESTIMATE_BATTERY_DURATION_UNDER_LOAD_GUIDE: BatteryRuntimeGuideDefinition = {
  slug: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_GUIDE_HREF,
  toolHref: BATTERY_RUNTIME_TOOL_HREF,
  guideLinkLabel: "Estimate battery duration under load",
  title: "Estimate Battery Duration Under Load",
  description: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_CONTENT.metaDescription,
  keywords: [
    "estimate battery duration under load",
    "battery duration under load",
    "how long battery lasts under load",
    "battery run time at load watts",
    "duration calculator battery load",
  ],
  seo: {
    sections: [
      {
        heading: "Under load means real watts—not idle sleep",
        body: "Sleep current and active draw differ by orders of magnitude. Estimating duration under load requires the watt figure while the work happens: transmit on a radio, heat on a 12 V blanket, pump on a bilge cycle. Idle mAh charts from phone reviews do not transfer to continuous field loads. Measure or sum nameplate W before dividing into Wh.",
      },
      {
        heading: "Variable loads need an average watt",
        body: "A fridge compressor that cycles 40% of the time at 120 W averages 48 W—not 120 W for the full clock. Estimate battery duration under load by time-weighting each operating state. For worst-case planning, run the calculation at peak W to bracket the shortest duration, then at average W for expected trip length.",
      },
      {
        heading: "Document duration assumptions on the run sheet",
        body: "Field teams should record pack Wh, measured W, derate factor, and calculated hours in one line—so a swap from 18.5 Wh to 37 Wh doubles duration only if load W stays fixed. When load rises (faster fan, brighter LED), duration falls proportionally. Re-run the estimate whenever the load profile changes.",
      },
    ],
  },
  content: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_CONTENT,
};

const CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate battery life from power draw: divide pack watt-hours by load watts for hours of life—phones, power banks, 12 V gear, and portable solar setups from mAh, voltage, and W.",
  heroSubtitle:
    "Power draw in watts is the drain rate; stored watt-hours are the tank. This guide shows how to calculate battery life from power draw—capacity in mAh and voltage, load watts, and expected hours before empty.",
  benefits: [
    "Battery life (h) = Wh ÷ power_draw_W.",
    "Wh from mAh × V ÷ 1,000 ties label ratings to watt loads.",
    "Sweep power draw to see how life scales when loads change.",
  ],
  howItWorks: [
    "Convert battery mAh and nominal voltage to watt-hours.",
    "Enter power draw in watts (measured or nameplate).",
    "Read battery life in hours—halve draw to double life, linearly.",
  ],
  faq: [
    {
      q: "How do I calculate battery life from power draw?",
      a: "Life (h) = Wh ÷ W. Find Wh = (mAh ÷ 1,000) × V. Example: 10,000 mAh at 3.7 V → 37 Wh. At 5 W draw → 37 ÷ 5 = 7.4 hours. At 15 W → 2.47 hours. Life is inversely proportional to watts.",
    },
    {
      q: "Does higher power draw always shorten battery life proportionally?",
      a: "In the Wh ÷ W model, yes—double watts halves hours. In practice, very high draw can trigger earlier cutoff from voltage sag and heat, so real life may be slightly shorter than the linear estimate at extreme currents.",
    },
    {
      q: "How do I get power draw for an AC device on a battery?",
      a: "Use the inverter input watts at the battery (or output watts ÷ inverter efficiency). A 40 W laptop on a 90% efficient inverter draws ~44 W from the pack. Enter that W value with your bank Wh or mAh × V.",
    },
  ],
  technicalSpecs: [
    "Life_h = ((mAh ÷ 1,000) × V) ÷ power_draw_W.",
    "Inverse: required_Wh = target_hours × power_draw_W.",
    "Linear scaling: life × (W₁ ÷ W₂) when comparing draws.",
    "Related: battery-runtime-calculator, estimate-battery-duration-under-load.",
  ],
};

const CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_GUIDE: BatteryRuntimeGuideDefinition = {
  slug: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "battery",
  href: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_GUIDE_HREF,
  toolHref: BATTERY_RUNTIME_TOOL_HREF,
  guideLinkLabel: "Calculate battery life from power draw",
  title: "Calculate Battery Life from Power Draw",
  description: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_CONTENT.metaDescription,
  keywords: [
    "calculate battery life from power draw",
    "battery life from watts",
    "power draw battery hours",
    "wh divided by watts",
    "how long battery lasts watts",
  ],
  seo: {
    sections: [
      {
        heading: "Power draw is the consumption rate",
        body: "Battery life is energy inventory divided by burn rate. A 74 Wh power bank feeding a 7.4 W router yields 10 hours; the same pack on a 37 W load lasts 2 hours. Calculating battery life from power draw makes that trade explicit before you buy a larger pack or shed loads. Watts must be real power at the battery terminals—not VA on a UPS sticker.",
      },
      {
        heading: "Work backward from a life target",
        body: "Need 8 hours at 12 W? Required Wh = 12 × 8 = 96 Wh. Convert to mAh at your voltage: mAh = (Wh ÷ V) × 1,000. At 3.7 V that is ~25,950 mAh class—explaining why marketing mAh alone misleads when voltage differs. Size the pack from required Wh, then confirm life with the forward calculation.",
      },
      {
        heading: "Life vs. cycle life—different questions",
        body: "This guide answers how long one charge lasts at a given watt draw—not how many years until chemistry fades. Deep daily cycles and heat reduce future Wh capacity; derate new-pack estimates when cells are aged. After life hours are calculated, use Battery Charging Time to see how quickly the pack refills at your charger watts.",
      },
    ],
  },
  content: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_CONTENT,
};

const GUIDES_BY_SLUG: Record<BatteryRuntimeLandingSlug, BatteryRuntimeGuideDefinition> =
  {
    [BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG]: BATTERY_RUNTIME_CALCULATOR_GUIDE,
    [ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG]:
      ESTIMATE_BATTERY_DURATION_UNDER_LOAD_GUIDE,
    [CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG]:
      CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_GUIDE,
  };

/** Landing guide links shown in the Battery Runtime tool footer Resources column. */
export const BATTERY_RUNTIME_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG,
    href: BATTERY_RUNTIME_CALCULATOR_GUIDE_HREF,
    label: "Battery Runtime Calculator",
  },
  {
    slug: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_LANDING_SLUG,
    href: ESTIMATE_BATTERY_DURATION_UNDER_LOAD_GUIDE_HREF,
    label: "Estimate Battery Duration Under Load",
  },
  {
    slug: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_LANDING_SLUG,
    href: CALCULATE_BATTERY_LIFE_FROM_POWER_DRAW_GUIDE_HREF,
    label: "Calculate Battery Life from Power Draw",
  },
];

export function isBatteryRuntimeLandingSlug(
  slug: string
): slug is BatteryRuntimeLandingSlug {
  return (BATTERY_RUNTIME_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getBatteryRuntimeLanding(
  slug: BatteryRuntimeLandingSlug = BATTERY_RUNTIME_CALCULATOR_LANDING_SLUG
): BatteryRuntimeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatteryRuntimeLandings(): BatteryRuntimeGuideDefinition[] {
  return BATTERY_RUNTIME_LANDING_SLUGS.map((slug) =>
    getBatteryRuntimeLanding(slug)
  );
}

/** Static footer links derived from BATTERY_RUNTIME_FOOTER_RESOURCES. */
export function getBatteryRuntimeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_RUNTIME_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_RUNTIME_CALCULATOR_ID };
