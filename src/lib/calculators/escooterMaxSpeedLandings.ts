import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_MAX_SPEED_TOOL_PATH =
  "/tools/e-scooter/escooter-max-speed/" as const;

export const ESCOOTER_MAX_SPEED_TOOL_HREF = getCalculatorHref(
  "escooter-max-speed",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-max-speed" as const;

export type EscooterMaxSpeedLandingSlug =
  | "e-scooter-top-speed-calculator"
  | "calculate-max-speed-from-motor-kv-and-voltage"
  | "theoretical-e-scooter-speed-estimator";

export const ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG =
  "e-scooter-top-speed-calculator" as const;

export const CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG =
  "calculate-max-speed-from-motor-kv-and-voltage" as const;

export const THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG =
  "theoretical-e-scooter-speed-estimator" as const;

export const ESCOOTER_MAX_SPEED_LANDING_SLUGS = [
  ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG,
  CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG,
  THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EscooterMaxSpeedLandingSlug[];

export const ESCOOTER_TOP_SPEED_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG);

export const THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG);

export type EscooterMaxSpeedGuideDefinition = GuideLandingDefinition & {
  slug: EscooterMaxSpeedLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_TOP_SPEED_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter top speed calculator: estimate theoretical km/h from battery voltage, motor KV, and wheel diameter—RPM to ground speed for 8–10″ commuter wheels. Free planning tool.",
  heroSubtitle:
    "Brochure top speed rarely matches physics on your deck. This e-scooter top speed calculator converts pack voltage and motor KV into wheel RPM, then into ground speed for your tyre diameter—before you compare controllers or wonder why loaded rides feel slower.",
  benefits: [
    "Translates voltage × KV into motor RPM with a realistic field-weakening factor—then maps RPM to km/h via wheel circumference.",
    "Wheel diameter input covers 8″ solid (~200 mm) and 10″ pneumatic setups common on commuter scooters.",
    "Outputs max speed, RPM, and wheel size together so motor swaps and voltage upgrades can be compared on one sheet.",
  ],
  howItWorks: [
    "Enter battery voltage (V)—nominal pack voltage at full charge, e.g. 36, 48, or 52 V.",
    "Enter motor KV (RPM/V) from the stator label or seller spec.",
    "Set wheel diameter in mm (~200 mm ≈ 8″). The calculator returns theoretical top speed and motor RPM.",
  ],
  faq: [
    {
      q: "What is an e-scooter top speed calculator used for?",
      a: "It estimates no-load theoretical top speed from electrical and mechanical constants: pack voltage, motor KV, and wheel diameter. Use it when comparing motors, voltage tiers, or wheel sizes—not as a guarantee of road speed with a rider onboard.",
    },
    {
      q: "Why is calculated top speed higher than what I ride?",
      a: "Loaded scooters draw more current, sag voltage, and hit controller or regulatory limits. Aerodynamic drag, tyre wear, and hill torque also cap real cruise speed. The tool models unloaded RPM × wheel circumference; expect several km/h less in practice.",
    },
    {
      q: "How does motor KV affect e-scooter top speed?",
      a: "Higher KV spins more RPM per volt—raising theoretical top speed at the same voltage if the controller can feed enough phase current. Lower-KV motors trade top RPM for hill torque. Pair this calculator with hill-climb and peak-amps tools when tuning a build.",
    },
    {
      q: "Does wheel diameter change top speed?",
      a: "Yes. Larger wheels travel farther per revolution, so the same motor RPM yields higher km/h. Small 8″ wheels need higher RPM for the same ground speed as bicycle-sized tyres—check diameter in mm, not only inch labels.",
    },
  ],
  technicalSpecs: [
    "Inputs: battery voltage (V), motor KV (RPM/V), wheel diameter (mm).",
    "Motor RPM ≈ voltage × KV × 0.88 (field-weakening / loss factor).",
    "Speed (km/h) = (RPM ÷ 60) × wheel circumference (m) × 3.6.",
    "Example: 36 V, 12 KV, 200 mm wheel → ~380 RPM, ~14.3 km/h theoretical.",
    "Related: escooter-hill-climb, escooter-peak-amps, escooter-range.",
  ],
};

const ESCOOTER_TOP_SPEED_CALCULATOR_GUIDE: EscooterMaxSpeedGuideDefinition = {
  slug: ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: ESCOOTER_TOP_SPEED_CALCULATOR_GUIDE_HREF,
  toolHref: ESCOOTER_MAX_SPEED_TOOL_HREF,
  guideLinkLabel: "E-scooter top speed calculator",
  title: "E-Scooter Top Speed Calculator",
  description: ESCOOTER_TOP_SPEED_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "e-scooter top speed calculator",
    "escooter top speed",
    "motor kv top speed",
    "scooter rpm to km/h",
    "electric scooter max speed",
    "wheel diameter speed",
  ],
  seo: {
    sections: [
      {
        heading: "RPM to ground speed on small wheels",
        body: "E-scooter motors are rated in KV—revolutions per volt at no load. Multiplying KV by pack voltage gives a first-order RPM ceiling; dividing by wheel circumference converts spin into km/h. An e-scooter top speed calculator makes that chain explicit so you do not confuse motor RPM with rideable cruise speed on 8–10″ tyres.",
      },
      {
        heading: "Voltage tiers and controller limits",
        body: "Moving from 36 V to 48 V or 52 V raises theoretical RPM at the same KV, but controllers cap phase amps and many decks ship with software speed limits. Model electrical top speed here, then validate against OEM firmware, local regulations, and loaded sag on your route.",
      },
      {
        heading: "When theoretical speed is not the bottleneck",
        body: "Hill climbs, rider mass, and low SOC reduce effective power before you reach KV-limited RPM. After estimating top speed, cross-check grade capability with the hill-climb calculator and burst current with peak-amps and connector-loss tools—especially on high-KV motors tuned for flats.",
      },
    ],
  },
  content: ESCOOTER_TOP_SPEED_CALCULATOR_CONTENT,
};

const CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate max speed from motor KV and voltage: convert pack volts and RPM/V into wheel RPM, then ground km/h for your tyre diameter—plan e-scooter motor and voltage upgrades with physics, not guesswork.",
    heroSubtitle:
      "Motor KV and pack voltage set the electrical RPM ceiling before the wheel ever hits the road. This guide shows how to calculate max speed from motor KV and voltage, then finish the chain with wheel diameter for a realistic km/h estimate on commuter scooters.",
    benefits: [
      "Starts from the core relation RPM ≈ voltage × KV × efficiency factor—no hidden brochure fudge.",
      "Compares 36 V vs. 48 V vs. 52 V at the same KV so voltage-tier upgrades are apples-to-apples.",
      "Completes the formula with wheel circumference so RPM becomes rideable km/h on 8–10″ wheels.",
    ],
    howItWorks: [
      "Read motor KV (RPM/V) from the stator or listing and enter nominal battery voltage (V).",
      "Compute motor RPM = voltage × KV × ~0.88 to account for field weakening and drivetrain loss.",
      "Enter wheel diameter (mm); speed (km/h) = (RPM ÷ 60) × circumference (m) × 3.6—or use the interactive tool.",
    ],
    faq: [
      {
        q: "How do I calculate max speed from motor KV and voltage?",
        a: "Multiply nominal pack voltage by motor KV to get no-load RPM, apply a realistic derating (~0.88), then convert RPM to km/h using wheel circumference. Example: 48 V × 15 KV × 0.88 ≈ 634 RPM; on a 200 mm wheel that is roughly 24 km/h theoretical before load and limits.",
      },
      {
        q: "What voltage should I use in the formula?",
        a: "Use nominal pack voltage—36, 48, or 52 V for most commuter decks—not peak charger voltage. Under load, cells sag below nominal, so loaded top speed sits below the KV × V ceiling.",
      },
      {
        q: "Does higher KV always mean higher max speed?",
        a: "At the same voltage, yes—higher KV spins more RPM per volt. But controllers, phase amp limits, and hill torque needs cap what you can use. High-KV motors on 36 V decks may still feel torque-limited on grades despite a higher theoretical RPM.",
      },
      {
        q: "Why multiply by 0.88 after KV × voltage?",
        a: "Real hubs rarely reach textbook no-load RPM: field weakening, winding resistance, and tyre load reduce effective spin. The calculator bakes in a practical factor so estimates sit closer to bench and ride data than raw KV math alone.",
      },
    ],
    technicalSpecs: [
      "Core: motor RPM ≈ battery voltage (V) × motor KV (RPM/V) × 0.88.",
      "Ground speed: km/h = (RPM ÷ 60) × π × wheel diameter (m) × 3.6.",
      "Example: 48 V, 15 KV, 200 mm → ~634 RPM, ~23.9 km/h theoretical.",
      "Scope: no-load planning—validate against controller limits, rider mass, and local law.",
      "Related: e-scooter-top-speed-calculator, escooter-hill-climb, escooter-peak-amps.",
    ],
  };

const CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_GUIDE: EscooterMaxSpeedGuideDefinition =
  {
    slug: CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_GUIDE_HREF,
    toolHref: ESCOOTER_MAX_SPEED_TOOL_HREF,
    guideLinkLabel: "Calculate max speed from motor KV and voltage",
    title: "Calculate Max Speed from Motor KV and Voltage",
    description:
      CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_CONTENT.metaDescription,
    keywords: [
      "calculate max speed from motor kv and voltage",
      "kv voltage top speed",
      "motor rpm from kv",
      "escooter kv calculator",
      "rpm per volt scooter",
      "voltage to max speed",
    ],
    seo: {
      sections: [
        {
          heading: "KV × voltage is the electrical speed ceiling",
          body: "Motor KV tells you how many RPM the hub wants per volt at no load. Pack voltage sets how many volts the controller can apply at full charge. To calculate max speed from motor KV and voltage, multiply the two first—that is the spin budget before wheel size converts RPM into ground speed.",
        },
        {
          heading: "Finish with wheel circumference",
          body: "RPM alone does not tell commuters how fast they roll. A 634 RPM motor on a 200 mm wheel travels less ground per minute than the same RPM on a 255 mm tyre. Always close the formula with π × diameter so KV and voltage math lands in km/h you can compare to GPS or app speed.",
        },
        {
          heading: "When KV math overshoots real rides",
          body: "Rider mass, aerodynamic drag, SOC sag, and firmware speed caps all sit below the KV × V line. Use this page to rank motor and voltage options, then stress-test hill grades and peak phase amps before buying a high-KV swap you cannot feed on your daily incline.",
        },
      ],
    },
    content: CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_CONTENT,
  };

const THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Theoretical e-scooter speed estimator: no-load km/h from voltage, motor KV, and wheel diameter—separate brochure claims from physics before motor swaps or voltage upgrades.",
  heroSubtitle:
    "Marketing sheets quote peak numbers; physics quotes RPM × wheel circumference. This theoretical e-scooter speed estimator models unloaded top speed from your electrical and mechanical inputs—so you know the ceiling before rider mass, sag, and firmware limits apply.",
  benefits: [
    "Frames speed as a theoretical estimate—not a road guarantee—matching how KV and voltage math is used in build planning.",
    "Combines motor RPM, wheel diameter, and a practical derating factor in one km/h output.",
    "Useful for comparing decks, motor swaps, and 36 / 48 / 52 V tiers before buying parts.",
  ],
  howItWorks: [
    "Gather nominal battery voltage, motor KV (RPM/V), and measured wheel diameter in mm.",
    "Estimate motor RPM with voltage × KV × ~0.88, then convert RPM to km/h via wheel circumference.",
    "Treat the result as theoretical no-load speed—subtract margin for rider weight, wind, and controller caps.",
  ],
  faq: [
    {
      q: "What does a theoretical e-scooter speed estimator calculate?",
      a: "It estimates unloaded maximum ground speed from electrical constants (voltage, KV) and wheel size. The number is a physics ceiling for planning—not the speed you should expect on a loaded commute or downhill run.",
    },
    {
      q: "Why call it theoretical instead of actual top speed?",
      a: "Actual speed includes aerodynamic drag, tyre loss, voltage sag under load, and software limits. Theoretical speed isolates motor RPM potential so you can compare hardware—then apply real-world discounts separately.",
    },
    {
      q: "How far below theoretical speed will I ride?",
      a: "Many commuters see several km/h less on flat ground with a rider onboard. Hills, low SOC, and conservative controllers widen the gap. Use hill-climb and peak-amps calculators after the estimate to see where torque—not RPM—becomes the limit.",
    },
    {
      q: "Can I use this for regulatory or warranty claims?",
      a: "No. It is a free planning estimator. Always follow local speed limits, OEM firmware settings, and manufacturer specifications for legal and warranty compliance.",
    },
  ],
  technicalSpecs: [
    "Theoretical RPM ≈ battery voltage (V) × motor KV (RPM/V) × 0.88.",
    "Theoretical km/h = (RPM ÷ 60) × π × wheel diameter (m) × 3.6.",
    "Example: 52 V, 14 KV, 255 mm (10″) → ~641 RPM, ~30.7 km/h theoretical.",
    "Loaded cruise, firmware caps, and terrain reduce real-world speed below this estimate.",
    "Related: e-scooter-top-speed-calculator, calculate-max-speed-from-motor-kv-and-voltage.",
  ],
};

const THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_GUIDE: EscooterMaxSpeedGuideDefinition =
  {
    slug: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_GUIDE_HREF,
    toolHref: ESCOOTER_MAX_SPEED_TOOL_HREF,
    guideLinkLabel: "Theoretical e-scooter speed estimator",
    title: "Theoretical E-Scooter Speed Estimator",
    description: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "theoretical e-scooter speed estimator",
      "theoretical scooter speed",
      "no load top speed estimate",
      "escooter speed estimator",
      "unloaded max speed km/h",
      "motor kv speed estimate",
    ],
    seo: {
      sections: [
        {
          heading: "Theory first, commute second",
          body: "A theoretical e-scooter speed estimator answers what the drivetrain could spin at no load—not what your GPS shows Friday rush hour. That distinction keeps motor KV shopping honest: a high-KV hub on a 36 V deck may look fast on paper yet feel torque-starved when you actually ride.",
        },
        {
          heading: "Where the estimate comes from",
          body: "Voltage and KV set RPM; wheel diameter converts spin to ground speed; a derating factor closes the gap between textbook no-load RPM and real hub behaviour. Enter your measured tyre diameter—10″ pneumatics are often ~255 mm, not a round 250 mm guess—so theoretical km/h tracks your deck.",
        },
        {
          heading: "Closing the gap to real rides",
          body: "After the theoretical number, budget for rider mass, headwind, tyre pressure, and SOC sag. Pair this estimator with range and hill-climb tools on the same voltage tier so speed, grade, and Wh/km assumptions stay consistent across your commissioning sheet.",
        },
      ],
    },
    content: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterMaxSpeedLandingSlug,
  EscooterMaxSpeedGuideDefinition
> = {
  [ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG]: ESCOOTER_TOP_SPEED_CALCULATOR_GUIDE,
  [CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG]:
    CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_GUIDE,
  [THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG]:
    THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the E-Scooter Max Speed tool footer Resources column. */
export const ESCOOTER_MAX_SPEED_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_TOP_SPEED_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Top Speed Calculator",
    },
    {
      slug: CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_LANDING_SLUG,
      href: CALCULATE_MAX_SPEED_FROM_MOTOR_KV_AND_VOLTAGE_GUIDE_HREF,
      label: "Calculate Max Speed from Motor KV and Voltage",
    },
    {
      slug: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_LANDING_SLUG,
      href: THEORETICAL_ESCOOTER_SPEED_ESTIMATOR_GUIDE_HREF,
      label: "Theoretical E-Scooter Speed Estimator",
    },
  ];

export function isEscooterMaxSpeedLandingSlug(
  slug: string
): slug is EscooterMaxSpeedLandingSlug {
  return (ESCOOTER_MAX_SPEED_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterMaxSpeedLanding(
  slug: EscooterMaxSpeedLandingSlug = ESCOOTER_TOP_SPEED_CALCULATOR_LANDING_SLUG
): EscooterMaxSpeedGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterMaxSpeedLandings(): EscooterMaxSpeedGuideDefinition[] {
  return ESCOOTER_MAX_SPEED_LANDING_SLUGS.map((slug) =>
    getEscooterMaxSpeedLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_MAX_SPEED_FOOTER_RESOURCES. */
export function getEscooterMaxSpeedToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_MAX_SPEED_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_MAX_SPEED_CALCULATOR_ID };
