import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_PEAK_AMPS_TOOL_PATH =
  "/tools/e-scooter/escooter-peak-amps/" as const;

export const ESCOOTER_PEAK_AMPS_TOOL_HREF = getCalculatorHref(
  "escooter-peak-amps",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-peak-amps" as const;

export type EscooterPeakAmpsLandingSlug =
  | "e-scooter-peak-discharge-current-calculator"
  | "battery-c-rating-and-controller-discharge-match"
  | "calculate-max-discharge-amps-for-battery-safety";

export const ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG =
  "e-scooter-peak-discharge-current-calculator" as const;

export const BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG =
  "battery-c-rating-and-controller-discharge-match" as const;

export const CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG =
  "calculate-max-discharge-amps-for-battery-safety" as const;

export const ESCOOTER_PEAK_AMPS_LANDING_SLUGS = [
  ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG,
  BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG,
  CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG,
] as const satisfies readonly EscooterPeakAmpsLandingSlug[];

export const ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG);

export const BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_GUIDE_HREF =
  getGuideLandingHref(BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG);

export const CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG);

export type EscooterPeakAmpsGuideDefinition = GuideLandingDefinition & {
  slug: EscooterPeakAmpsLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter peak discharge current calculator: check burst amps against controller limit and pack C-rate—peak watts, max pack amps, and within-limit flags for 36 / 48 V commuter decks.",
  heroSubtitle:
    "Hard launches and hill sprints pull phase current above continuous ratings. This e-scooter peak discharge current calculator compares your peak draw to controller amps and pack Ah × C—before BMS cutback or connector heat ends the burst.",
  benefits: [
    "Validates peak amps vs. controller phase limit and pack max discharge (Ah × C).",
    "Peak power (W) = battery voltage × peak amps for burst planning.",
    "Flags when acceleration exceeds pack C-rate even if the controller allows more.",
  ],
  howItWorks: [
    "Enter measured or estimated peak draw in amps during hard acceleration.",
    "Set controller limit (A), pack capacity (Ah), and continuous C-rating.",
    "Add battery voltage (V)—read peak watts and whether draw is within controller and pack.",
  ],
  faq: [
    {
      q: "What does an e-scooter peak discharge current calculator check?",
      a: "It compares your burst current to two ceilings: the controller's phase amp limit and the pack's max discharge approximated as capacity (Ah) × continuous C-rating. It also reports peak watts (V × A) and pass/fail flags for each limit.",
    },
    {
      q: "What is pack max discharge amps?",
      a: "In this tool, max pack amps ≈ Ah × C. A 7.8 Ah pack at 2C supports ~15.6 A continuous—brief peaks above that may be tolerated but heat accumulates in small cells. Peak draw above max pack amps triggers the within-pack warning.",
    },
    {
      q: "Example with default inputs?",
      a: "18 A peak, 20 A controller, 7.8 Ah at 2C (15.6 A max pack), 36 V: within controller yes, within pack no, peak power ≈ 648 W. The controller allows the burst but the pack C-rate is exceeded.",
    },
    {
      q: "Peak vs continuous motor amps?",
      a: "Controllers and BMS specs often list continuous phase current separately from brief peaks. Enter your measured launch or hill-sprint peak—not flat-ground cruise amps. Pair with connector-loss and hill-climb tools for full route stress.",
    },
  ],
  technicalSpecs: [
    "Max pack amps = capacity (Ah) × continuous C-rating.",
    "Peak power (W) = battery voltage (V) × peak amps (A).",
    "Within controller when peak amps ≤ controller limit.",
    "Within pack when peak amps ≤ max pack amps.",
    "Related: escooter-connector-loss, escooter-hill-climb, escooter-weight-limit.",
  ],
};

const ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_GUIDE: EscooterPeakAmpsGuideDefinition =
  {
    slug: ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_PEAK_AMPS_TOOL_HREF,
    guideLinkLabel: "E-scooter peak discharge current calculator",
    title: "E-Scooter Peak Discharge Current Calculator",
    description:
      ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter peak discharge current calculator",
      "escooter peak amps",
      "controller phase limit",
      "battery c rate scooter",
      "burst current escooter",
      "peak discharge amps",
    ],
    seo: {
      sections: [
        {
          heading: "Two limits on every launch",
          body: "An e-scooter peak discharge current calculator separates controller headroom from pack chemistry headroom. A 20 A controller with a 2C small pack may allow a tap of throttle that still over-stresses cells—flags in the tool show which ceiling fails first.",
        },
        {
          heading: "Peak watts from volts and amps",
          body: "Phase current times pack voltage approximates electrical burst power. Comparing peak watts to motor continuous rating and hill-climb effective watts keeps acceleration tuning honest—high peaks for intersection jumps still matter for connector I²R and BMS temperature.",
        },
        {
          heading: "After the peak check",
          body: "When peak draw exceeds pack C-rate, expect voltage sag and thermal taper on repeated stops. Cross-check XT30/XT60 connector loss under the same peak amps and verify total mass in the weight-limit tool—overload riders hit peak current more often on the same grades.",
        },
      ],
    },
    content: ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_CONTENT,
  };

const BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Battery C-rating and controller discharge match: align pack Ah × C with controller phase amps—see when a 20 A controller outruns a 2C pack and how peak watts change on 36 V commuter decks.",
    heroSubtitle:
      "Controllers advertise phase amps; packs advertise Ah and C. A battery C-rating and controller discharge match check shows whether your throttle can request more current than cells safely deliver—before sag, heat, or BMS cutback on every hard launch.",
    benefits: [
      "Max pack amps = Ah × C compared side-by-side with controller limit (A).",
      "Separate within-controller and within-pack flags—see which ceiling fails first.",
      "Peak watts (V × A) for burst planning when C-rate and controller finally align.",
    ],
    howItWorks: [
      "Enter pack capacity (Ah) and continuous C-rating from the label or datasheet.",
      "Set controller phase limit (A) and measured or planned peak draw.",
      "Add battery voltage (V)—read max pack amps, peak watts, and match flags.",
    ],
    faq: [
      {
        q: "What is a battery C-rating and controller discharge match?",
        a: "It checks whether your controller's phase amp limit fits inside the pack's continuous discharge ceiling (Ah × C). A 20 A controller with a 7.8 Ah 2C pack caps at ~15.6 A from chemistry—the controller allows more than the pack should sustain.",
      },
      {
        q: "How do I match C-rate to controller amps?",
        a: "Compute max pack amps = Ah × C. If controller limit exceeds max pack amps, hard acceleration can over-stress cells even when the within-controller flag passes. Lower peak draw, upgrade pack C/Ah, or reduce controller limit to align both flags.",
      },
      {
        q: "Example: 10 Ah at 3C vs 20 A controller?",
        a: "10 Ah × 3C = 30 A max pack—above a 20 A controller, so chemistry is not the bottleneck. A 7.8 Ah 2C pack yields 15.6 A—controller headroom exists but within-pack fails at 18 A peak.",
      },
      {
        q: "Does a higher C-rating always fix mismatch?",
        a: "Higher C or larger Ah raises max pack amps, but heat, BMS, and connector I²R still cap real bursts. Match flags in the tool first, then cross-check connector-loss at the same peak amps.",
      },
    ],
    technicalSpecs: [
      "Max pack amps = capacity (Ah) × continuous C-rating.",
      "Within controller when peak amps ≤ controller limit (A).",
      "Within pack when peak amps ≤ max pack amps.",
      "Peak power (W) = battery voltage (V) × peak amps (A).",
      "Related: e-scooter-peak-discharge-current-calculator, escooter-connector-loss.",
    ],
  };

const BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_GUIDE: EscooterPeakAmpsGuideDefinition =
  {
    slug: BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_GUIDE_HREF,
    toolHref: ESCOOTER_PEAK_AMPS_TOOL_HREF,
    guideLinkLabel: "Battery C-rating and controller discharge match",
    title: "Battery C-Rating and Controller Discharge Match",
    description:
      BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_CONTENT.metaDescription,
    keywords: [
      "battery c-rating and controller discharge match",
      "escooter c rate vs controller amps",
      "pack max discharge amps",
      "ah times c rating scooter",
      "controller phase limit battery",
      "burst current pack match",
    ],
    seo: {
      sections: [
        {
          heading: "Two amp numbers on every spec sheet",
          body: "Commuter listings highlight controller phase amps and pack watt-hours—but continuous C-rating sets a separate amp ceiling. A battery C-rating and controller discharge match compares Ah × C to controller limit so you know whether firmware allows more current than cells were sized for.",
        },
        {
          heading: "When the controller is not the bottleneck",
          body: "A 20 A controller on a 2C small pack often passes within-controller while failing within-pack at realistic launch peaks. The tool flags both independently—tuning throttle or upgrading Ah/C matters more than chasing higher controller amps alone.",
        },
        {
          heading: "Align before upgrading hardware",
          body: "If max pack amps sit below your commute peak draw, expect voltage sag and thermal taper on repeated stops. Match C-rate and controller first, then verify XT30/XT60 connector loss at the same peak amps and hill-climb load with your rider mass.",
        },
      ],
    },
    content: BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_CONTENT,
  };

const CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate max discharge amps for battery safety: max pack amps = Ah × C, compare peak draw to BMS and cell limits—within-pack flags and peak watts for 36 / 48 V e-scooter packs.",
    heroSubtitle:
      "Small commuter packs heat fast when launch peaks exceed continuous C-rate. Use this guide to calculate max discharge amps for battery safety—Ah × C sets the amp ceiling; compare your real peak draw before repeated hard acceleration stresses cells or triggers BMS cutback.",
    benefits: [
      "Max safe discharge amps = capacity (Ah) × continuous C-rating—computed in the tool.",
      "Within-pack flag when peak amps stay at or below max pack amps.",
      "Peak watts (V × A) to see electrical stress alongside amp safety margins.",
    ],
    howItWorks: [
      "Enter pack capacity (Ah) and continuous C-rating from the label or cell datasheet.",
      "Add measured or planned peak draw during hard acceleration.",
      "Read max pack amps and within-pack yes/no—keep peak draw below max for daily safety margin.",
    ],
    faq: [
      {
        q: "How do I calculate max discharge amps for battery safety?",
        a: "Max pack amps ≈ Ah × C. A 7.8 Ah pack at 2C supports ~15.6 A continuous discharge. Peaks above that may be tolerated briefly but repeated bursts accumulate heat in small 18650/21700 packs—use the within-pack flag and stay below max for commute safety.",
      },
      {
        q: "What happens when peak draw exceeds max pack amps?",
        a: "Cells and BMS heat, voltage sags, and taper or cutback can follow on the next launch. The tool reports within-pack no when peak amps exceed Ah × C—even if the controller allows higher phase current.",
      },
      {
        q: "Example: 10 Ah at 2C vs 3C?",
        a: "10 Ah × 2C = 20 A max; 10 Ah × 3C = 30 A max. Higher C raises the safe amp ceiling but does not remove BMS or connector limits. Enter your actual Ah and C, then compare peak draw.",
      },
      {
        q: "Should I leave headroom below max pack amps?",
        a: "Yes—planning at 80–90 % of Ah × C leaves margin for summer heat, low SOC, and aging cells. Pair with charge-time C-rate checks and connector-loss at the same peak amps.",
      },
    ],
    technicalSpecs: [
      "Max pack amps (safe continuous) = capacity (Ah) × continuous C-rating.",
      "Within pack when peak amps ≤ max pack amps.",
      "Peak power (W) = battery voltage (V) × peak amps (A).",
      "Example: 7.8 Ah × 2C → 15.6 A max; 18 A peak → within pack no.",
      "Related: battery-c-rating-and-controller-discharge-match, escooter-charge-time.",
    ],
  };

const CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_GUIDE: EscooterPeakAmpsGuideDefinition =
  {
    slug: CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_GUIDE_HREF,
    toolHref: ESCOOTER_PEAK_AMPS_TOOL_HREF,
    guideLinkLabel: "Calculate max discharge amps for battery safety",
    title: "Calculate Max Discharge Amps for Battery Safety",
    description:
      CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_CONTENT.metaDescription,
    keywords: [
      "calculate max discharge amps for battery safety",
      "max pack discharge amps escooter",
      "ah times c battery safety",
      "safe burst current scooter pack",
      "bms discharge limit amps",
      "continuous c rate max amps",
    ],
    seo: {
      sections: [
        {
          heading: "Ah × C is the safety amp number",
          body: "To calculate max discharge amps for battery safety, multiply pack amp-hours by continuous C-rating. That max pack amps figure is the planning ceiling for repeated commute launches—not a brief OEM peak printed on a marketing slide.",
        },
        {
          heading: "Peaks above max pack amps cost margin",
          body: "Small e-scooter packs tolerate occasional overshoot, but daily hard starts above Ah × C raise cell temperature and shorten cycle life. The within-pack flag in the tool turns that math into a yes/no check against your measured peak draw.",
        },
        {
          heading: "Safety checks beyond amps",
          body: "After bracketing max safe amps, verify charge C-rate in the charge-time tool and connector I²R at the same peak current. Battery safety is a chain—cells, BMS, connectors, and controller limits must all agree on the same amp budget.",
        },
      ],
    },
    content: CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterPeakAmpsLandingSlug,
  EscooterPeakAmpsGuideDefinition
> = {
  [ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_GUIDE,
  [BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG]:
    BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_GUIDE,
  [CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG]:
    CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_GUIDE,
};

/** Landing guide links shown in the E-Scooter Peak Amps tool footer Resources column. */
export const ESCOOTER_PEAK_AMPS_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Peak Discharge Current Calculator",
    },
    {
      slug: BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_LANDING_SLUG,
      href: BATTERY_C_RATING_AND_CONTROLLER_DISCHARGE_MATCH_GUIDE_HREF,
      label: "Battery C-Rating and Controller Discharge Match",
    },
    {
      slug: CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_LANDING_SLUG,
      href: CALCULATE_MAX_DISCHARGE_AMPS_FOR_BATTERY_SAFETY_GUIDE_HREF,
      label: "Calculate Max Discharge Amps for Battery Safety",
    },
  ];

export function isEscooterPeakAmpsLandingSlug(
  slug: string
): slug is EscooterPeakAmpsLandingSlug {
  return (ESCOOTER_PEAK_AMPS_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterPeakAmpsLanding(
  slug: EscooterPeakAmpsLandingSlug = ESCOOTER_PEAK_DISCHARGE_CURRENT_CALCULATOR_LANDING_SLUG
): EscooterPeakAmpsGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterPeakAmpsLandings(): EscooterPeakAmpsGuideDefinition[] {
  return ESCOOTER_PEAK_AMPS_LANDING_SLUGS.map((slug) =>
    getEscooterPeakAmpsLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_PEAK_AMPS_FOOTER_RESOURCES. */
export function getEscooterPeakAmpsToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_PEAK_AMPS_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_PEAK_AMPS_CALCULATOR_ID };
