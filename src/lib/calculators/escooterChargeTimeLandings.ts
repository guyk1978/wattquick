import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_CHARGE_TIME_TOOL_PATH =
  "/tools/e-scooter/escooter-charge-time/" as const;

export const ESCOOTER_CHARGE_TIME_TOOL_HREF = getCalculatorHref(
  "escooter-charge-time",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-charge-time" as const;

export type EscooterChargeTimeLandingSlug =
  | "e-scooter-charge-time-calculator"
  | "compare-e-scooter-charger-speeds-2a-3a-4a"
  | "battery-charge-time-estimator-for-36v-48v-packs";

export const ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG =
  "e-scooter-charge-time-calculator" as const;

export const COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG =
  "compare-e-scooter-charger-speeds-2a-3a-4a" as const;

export const BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG =
  "battery-charge-time-estimator-for-36v-48v-packs" as const;

export const ESCOOTER_CHARGE_TIME_LANDING_SLUGS = [
  ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG,
  COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG,
  BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG,
] as const satisfies readonly EscooterChargeTimeLandingSlug[];

export const ESCOOTER_CHARGE_TIME_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG
);

export const COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_GUIDE_HREF =
  getGuideLandingHref(COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG);

export const BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_GUIDE_HREF =
  getGuideLandingHref(BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG);

export type EscooterChargeTimeGuideDefinition = GuideLandingDefinition & {
  slug: EscooterChargeTimeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_CHARGE_TIME_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter charge time calculator: hours to full from battery Wh, pack voltage, charger amps (2 A / 3 A / 4 A), and charge efficiency—compare 36 V and 48 V commuter packs.",
  heroSubtitle:
    "Overnight slow charge or lunch-hour top-up? This e-scooter charge time calculator converts pack watt-hours, voltage, and brick amperage into charge hours—with efficiency so 2 A vs. 4 A comparisons match real BMS overhead.",
  benefits: [
    "Charge hours = Wh ÷ (voltage × amps × efficiency)—no hand arithmetic on 360 Wh decks.",
    "Compare 2 A slow bricks (~72 W on 36 V) vs. 4 A fast (~144 W) on the same pack.",
    "Outputs charger watts and efficiency alongside time for heat and C-rate sanity checks.",
  ],
  howItWorks: [
    "Enter battery capacity in Wh and nominal pack voltage (36 or 48 V typical).",
    "Set charger current in amps (2 A slow, 3 A mid, 4 A fast are common).",
    "Adjust charge efficiency if known (default ~88 %)—read charge time in hours.",
  ],
  faq: [
    {
      q: "What does an e-scooter charge time calculator estimate?",
      a: "It estimates hours to replenish the pack from empty using charger power (voltage × amps), battery Wh, and charge efficiency. It models steady brick output—not every BMS taper curve—but gives planning numbers for commute charging.",
    },
    {
      q: "How long does a 360 Wh scooter take on a 2 A charger?",
      a: "On 36 V at 2 A: charger power ≈ 72 W. With 88 % efficiency, time ≈ 360 ÷ (72 × 0.88) ≈ 5.7 hours. A 4 A brick halves nominal time but may taper sooner on small packs.",
    },
    {
      q: "Why include charge efficiency?",
      a: "BMS balancing, heat, and conversion losses mean not every watt from the wall reaches the cells. Default ~88 % is a commuter planning figure—lower efficiency lengthens real-world time versus naive Wh ÷ W.",
    },
    {
      q: "Is 4 A always safe for e-scooter packs?",
      a: "Many light commuter packs prefer ≤2C overnight. High amps heat small cells and trigger taper early. Use the calculator for nominal time, then follow OEM charger ratings and connector limits (see connector-loss tool).",
    },
  ],
  technicalSpecs: [
    "Inputs: battery capacity (Wh), pack voltage (V), charger current (A), charge efficiency (%).",
    "Charger power (W) = voltage × amps.",
    "Charge time (h) = Wh ÷ (charger W × efficiency).",
    "Example: 360 Wh, 36 V, 2 A, 88 % → ~5.7 h; 4 A → ~2.8 h nominal.",
    "Related: escooter-connector-loss, escooter-range, escooter-peak-amps.",
  ],
};

const ESCOOTER_CHARGE_TIME_CALCULATOR_GUIDE: EscooterChargeTimeGuideDefinition = {
  slug: ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: ESCOOTER_CHARGE_TIME_CALCULATOR_GUIDE_HREF,
  toolHref: ESCOOTER_CHARGE_TIME_TOOL_HREF,
  guideLinkLabel: "E-scooter charge time calculator",
  title: "E-Scooter Charge Time Calculator",
  description: ESCOOTER_CHARGE_TIME_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "e-scooter charge time calculator",
    "escooter charge time",
    "2a charger scooter hours",
    "4a fast charge scooter",
    "36v scooter charge time",
    "wh to charge hours",
  ],
  seo: {
    sections: [
      {
        heading: "Wh divided by charger watts",
        body: "E-scooter packs are sized in watt-hours; bricks are rated in volts and amps. An e-scooter charge time calculator closes the gap: multiply V × A for charger power, apply efficiency, and divide into pack Wh. That is the planning number for overnight vs. workplace top-ups.",
      },
      {
        heading: "2 A vs. 4 A on commuter packs",
        body: "Doubling charger amps roughly halves nominal hours—but small packs heat faster and BMS taper may extend the tail. Model both bricks in the tool, then prefer slow overnight charges for cell longevity when schedule allows.",
      },
      {
        heading: "Charge planning with range and connectors",
        body: "Charge time pairs with range (Wh consumed per commute) and connector I²R loss under higher charge current. A fast brick that saves an hour but runs warm through XT30 pins may cost more in maintenance than a 2 A overnight routine.",
      },
    ],
  },
  content: ESCOOTER_CHARGE_TIME_CALCULATOR_CONTENT,
};

const COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_CONTENT: GuideLandingContent = {
  metaDescription:
    "Compare e-scooter charger speeds (2A/3A/4A): charge hours and brick watts for the same pack Wh and voltage—see how doubling amps shifts overnight vs. lunch-hour top-up on 36 V and 48 V decks.",
  heroSubtitle:
    "OEM bricks ship as 2 A slow, 3 A mid, or 4 A fast—but wall power and pack heat change the real story. This guide helps you compare e-scooter charger speeds (2A/3A/4A) on identical watt-hours before you buy a second charger.",
  benefits: [
    "Side-by-side charge hours for 2 A, 3 A, and 4 A at the same voltage and Wh.",
    "Charger watts = V × A made explicit—3 A is 50 % faster than 2 A, not double.",
    "Efficiency factor keeps comparisons fair versus naive Wh ÷ (V × A).",
  ],
  howItWorks: [
    "Fix battery Wh and pack voltage—run the calculator three times at 2 A, 3 A, and 4 A.",
    "Note charger watts and hours for each brick at your charge efficiency (default ~88 %).",
    "Pick the slowest brick your schedule allows for cell longevity; use fast only when heat and C-rate allow.",
  ],
  faq: [
    {
      q: "How do I compare e-scooter charger speeds (2A/3A/4A)?",
      a: "Hold Wh and voltage constant; change only charger amps. On 360 Wh at 36 V and 88 % efficiency: 2 A ≈ 5.7 h, 3 A ≈ 3.8 h, 4 A ≈ 2.8 h. Each +1 A step adds charger watts linearly but does not always shorten the BMS taper tail equally.",
    },
    {
      q: "Is 3 A a good middle ground?",
      a: "3 A on 36 V is ~108 W—often acceptable on mid-size commuter packs when 2 A overnight is too slow but 4 A runs hot. Compare all three in the tool with your exact Wh before upgrading bricks.",
    },
    {
      q: "Does voltage change the 2A/3A/4A comparison?",
      a: "Yes—amps × volts sets watts. 2 A on 48 V (96 W) charges faster than 2 A on 36 V (72 W) for the same Wh. Always enter your pack voltage when comparing bricks.",
    },
    {
      q: "Why might 4 A not be twice as fast as 2 A in practice?",
      a: "BMS taper, cell temperature, and connector resistance raise effective time on small packs. The calculator shows nominal steady-state hours; expect extra tail time on 4 A if the pack heats early.",
    },
  ],
  technicalSpecs: [
    "36 V examples (360 Wh, 88 % η): 2 A ~5.7 h, 3 A ~3.8 h, 4 A ~2.8 h.",
    "48 V examples (360 Wh, 88 % η): 2 A ~4.3 h, 3 A ~2.8 h, 4 A ~2.1 h.",
    "Charger W = voltage × amps; time h = Wh ÷ (W × efficiency).",
    "Check C-rate and connector loss before adopting 4 A daily.",
    "Related: e-scooter-charge-time-calculator, escooter-connector-loss.",
  ],
};

const COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_GUIDE: EscooterChargeTimeGuideDefinition =
  {
    slug: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_GUIDE_HREF,
    toolHref: ESCOOTER_CHARGE_TIME_TOOL_HREF,
    guideLinkLabel: "Compare e-scooter charger speeds (2A/3A/4A)",
    title: "Compare E-Scooter Charger Speeds (2A/3A/4A)",
    description: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_CONTENT.metaDescription,
    keywords: [
      "compare e-scooter charger speeds 2a 3a 4a",
      "2a vs 4a scooter charger",
      "3 amp scooter charger time",
      "fast charge vs slow charge escooter",
      "charger amps comparison",
      "36v 2a 3a 4a charge time",
    ],
    seo: {
      sections: [
        {
          heading: "Amps are not interchangeable labels",
          body: "To compare e-scooter charger speeds (2A/3A/4A), multiply each rating by pack voltage for watts—then divide into Wh with efficiency. A 3 A brick is not “1.5× a 2 A” in hours unless voltage and taper behaviour match; the tool makes those watts explicit before you shop for upgrades.",
        },
        {
          heading: "When 2 A still wins",
          body: "Overnight 2 A charges reduce heat and connector stress on light packs. If your commute consumes only a fraction of daily Wh, a 4 A brick may save little wall time while pushing I²R heat at XT30 pins. Run all three amp settings on your actual Wh before treating fast charge as default.",
        },
        {
          heading: "48 V shifts the same amp table",
          body: "Higher nominal voltage raises watts at the same amp label—48 V at 2 A beats 36 V at 2 A for identical Wh. Re-compare 2A/3A/4A whenever you change voltage tier or pack capacity, not only when swapping the brick.",
        },
      ],
    },
    content: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_CONTENT,
  };

const BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Battery charge time estimator for 36V/48V packs: hours to full from Wh, charger amps, and efficiency—see how nominal voltage changes brick watts and charge time on commuter e-scooters.",
    heroSubtitle:
      "36 V and 48 V labels describe different series counts—not just marketing. This battery charge time estimator for 36V/48V packs shows how the same charger amp rating delivers different watts, and how Wh capacity sets hours to full on each tier.",
    benefits: [
      "Compare 36 V vs. 48 V charge hours at identical Wh and charger amps.",
      "Charger watts = voltage × amps—48 V at 2 A is 96 W vs. 72 W on 36 V.",
      "Efficiency-adjusted estimator for typical 360 Wh and 504 Wh commuter packs.",
    ],
    howItWorks: [
      "Enter pack watt-hours and select 36 V or 48 V nominal voltage.",
      "Set charger amps (2 A overnight, 4 A fast) and charge efficiency (~88 %).",
      "Switch voltage tier with the same Wh to compare charge time and brick watts.",
    ],
    faq: [
      {
        q: "How does a battery charge time estimator for 36V/48V packs work?",
        a: "Charge time ≈ Wh ÷ (nominal voltage × charger amps × efficiency). Higher voltage raises charger watts at the same amp label—so 2 A on 48 V fills the same Wh faster than 2 A on 36 V, assuming the brick and BMS support both.",
      },
      {
        q: "Is 48 V always faster to charge than 36 V?",
        a: "At the same charger amps and similar Wh, yes—because watts are higher. A 504 Wh 48 V pack on 2 A (~96 W) may take ~6 h nominal; a 360 Wh 36 V pack on 2 A (~72 W) ~5.7 h. Larger Wh on 48 V can still lengthen total hours.",
      },
      {
        q: "Can I use a 48 V brick on a 36 V scooter?",
        a: "No—match brick voltage to pack nominal rating. This estimator compares tiers for planning upgrades or second scooters, not cross-voltage charging.",
      },
      {
        q: "What Wh should I enter for each voltage tier?",
        a: "Use nameplate or measured pack Wh: ~360 Wh common on 36 V commuters, ~504 Wh on many 48 V decks. Underestimating Wh shortens estimated time versus real BMS behaviour.",
      },
    ],
    technicalSpecs: [
      "Time (h) = Wh ÷ (V × A × charge efficiency).",
      "36 V @ 2 A: 72 W brick; 48 V @ 2 A: 96 W brick (same amp label).",
      "360 Wh, 36 V, 2 A, 88 % → ~5.7 h; 360 Wh, 48 V, 2 A → ~4.3 h.",
      "504 Wh, 48 V, 2 A, 88 % → ~6.0 h nominal.",
      "Related: compare-e-scooter-charger-speeds-2a-3a-4a, escooter-range.",
    ],
  };

const BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_GUIDE: EscooterChargeTimeGuideDefinition =
  {
    slug: BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_GUIDE_HREF,
    toolHref: ESCOOTER_CHARGE_TIME_TOOL_HREF,
    guideLinkLabel: "Battery charge time estimator for 36V/48V packs",
    title: "Battery Charge Time Estimator for 36V/48V Packs",
    description:
      BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_CONTENT.metaDescription,
    keywords: [
      "battery charge time estimator for 36v/48v packs",
      "36v vs 48v charge time",
      "escooter pack charge hours",
      "48v scooter charging time",
      "36v 10s charge estimator",
      "wh charge time voltage",
    ],
    seo: {
      sections: [
        {
          heading: "Voltage tier sets brick watts",
          body: "Charger labels show amps; packs show volts and Wh. A battery charge time estimator for 36V/48V packs multiplies V × A before dividing into Wh—explaining why a 2 A brick feels faster on 48 V even when amp digits match your old 36 V supply.",
        },
        {
          heading: "Wh capacity still dominates",
          body: "Higher voltage does not always mean shorter wall time if Wh grew with the upgrade. Model your actual nameplate Wh on each tier—504 Wh 48 V decks can sit near 6 h on 2 A while lighter 360 Wh 36 V packs land near 5.7 h. Voltage and capacity move time together.",
        },
        {
          heading: "Pair charge estimates with range",
          body: "48 V tiers often add hill and sag margin on the ride side while changing charge hours on the wall side. After estimating 36 V vs. 48 V charge time, cross-check commute Wh draw with the range calculator so overnight windows cover both voltage tier and daily distance.",
        },
      ],
    },
    content: BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterChargeTimeLandingSlug,
  EscooterChargeTimeGuideDefinition
> = {
  [ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_CHARGE_TIME_CALCULATOR_GUIDE,
  [COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG]:
    COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_GUIDE,
  [BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG]:
    BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_GUIDE,
};

/** Landing guide links shown in the E-Scooter Charge Time tool footer Resources column. */
export const ESCOOTER_CHARGE_TIME_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_CHARGE_TIME_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Charge Time Calculator",
    },
    {
      slug: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_LANDING_SLUG,
      href: COMPARE_ESCOOTER_CHARGER_SPEEDS_2A_3A_4A_GUIDE_HREF,
      label: "Compare E-Scooter Charger Speeds (2A/3A/4A)",
    },
    {
      slug: BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_LANDING_SLUG,
      href: BATTERY_CHARGE_TIME_ESTIMATOR_FOR_36V_48V_PACKS_GUIDE_HREF,
      label: "Battery Charge Time Estimator for 36V/48V Packs",
    },
  ];

export function isEscooterChargeTimeLandingSlug(
  slug: string
): slug is EscooterChargeTimeLandingSlug {
  return (ESCOOTER_CHARGE_TIME_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterChargeTimeLanding(
  slug: EscooterChargeTimeLandingSlug = ESCOOTER_CHARGE_TIME_CALCULATOR_LANDING_SLUG
): EscooterChargeTimeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterChargeTimeLandings(): EscooterChargeTimeGuideDefinition[] {
  return ESCOOTER_CHARGE_TIME_LANDING_SLUGS.map((slug) =>
    getEscooterChargeTimeLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_CHARGE_TIME_FOOTER_RESOURCES. */
export function getEscooterChargeTimeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_CHARGE_TIME_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_CHARGE_TIME_CALCULATOR_ID };
