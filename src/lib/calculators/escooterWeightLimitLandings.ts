import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_WEIGHT_LIMIT_TOOL_PATH =
  "/tools/e-scooter/escooter-weight-limit/" as const;

export const ESCOOTER_WEIGHT_LIMIT_TOOL_HREF = getCalculatorHref(
  "escooter-weight-limit",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-weight-limit" as const;

export type EscooterWeightLimitLandingSlug =
  | "e-scooter-rider-weight-limit-calculator"
  | "calculate-e-scooter-deck-and-motor-stress"
  | "e-scooter-payload-capacity-and-motor-load-estimator";

export const ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG =
  "e-scooter-rider-weight-limit-calculator" as const;

export const CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG =
  "calculate-e-scooter-deck-and-motor-stress" as const;

export const ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG =
  "e-scooter-payload-capacity-and-motor-load-estimator" as const;

export const ESCOOTER_WEIGHT_LIMIT_LANDING_SLUGS = [
  ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG,
  CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG,
  ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EscooterWeightLimitLandingSlug[];

export const ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG);

export const CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG);

export const ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG);

export type EscooterWeightLimitGuideDefinition = GuideLandingDefinition & {
  slug: EscooterWeightLimitLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter rider weight limit calculator: stress factor, overload kg, and effective motor load when rider mass exceeds rated max—plan deck and motor margin before hills and daily commute.",
  heroSubtitle:
    "Manufacturer max rider labels are not suggestions—they set motor and frame margin. This e-scooter rider weight limit calculator compares your mass (plus backpack) to rated max and shows stress factor and effective motor load in watts.",
  benefits: [
    "Stress factor = rider mass ÷ rated max—quick overload check before buying or riding.",
    "Overload kg quantifies how far above the label you sit with gear included.",
    "Effective motor load scales rated watts by stress—links weight to hill and peak-amp demand.",
  ],
  howItWorks: [
    "Enter rider mass in kg—including helmet, backpack, and winter gear.",
    "Set manufacturer rated max rider (kg) from the deck sticker or manual.",
    "Add motor rated power (W)—read stress factor, overload, and within-limit status.",
  ],
  faq: [
    {
      q: "What does an e-scooter rider weight limit calculator measure?",
      a: "It compares your total rider mass to the scooter's rated maximum. Outputs include stress factor (rider ÷ rated max), overload kilograms above the limit, effective motor load (stress × rated motor W), and whether you are within the published limit.",
    },
    {
      q: "What is a safe stress factor?",
      a: "At or below 1.0 you are within the rated label. Above 1.0 means overload—hill climb, acceleration, and frame fatigue worsen. Many commuters target ≤0.95 with daily backpack included for margin.",
    },
    {
      q: "Example at default inputs?",
      a: "95 kg rider, 100 kg rated max, 500 W motor: stress = 0.95, within limit, effective load ≈ 475 W. At 110 kg on the same 100 kg rating: stress = 1.10, 10 kg overload, effective load ≈ 550 W.",
    },
    {
      q: "Should I include backpack weight?",
      a: "Yes—daily commute mass includes bag, tools, and clothing. Underestimating rider mass hides overload that shows up on ramps and hard acceleration. Pair with hill-climb and peak-amps tools after stress checks.",
    },
  ],
  technicalSpecs: [
    "Stress factor = rider mass (kg) ÷ rated max (kg).",
    "Overload kg = max(0, rider − rated max).",
    "Effective motor load (W) = stress factor × motor rated W.",
    "Within limit when rider mass ≤ rated max.",
    "Related: escooter-hill-climb, escooter-peak-amps, escooter-tire-wear.",
  ],
};

const ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_GUIDE: EscooterWeightLimitGuideDefinition =
  {
    slug: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_WEIGHT_LIMIT_TOOL_HREF,
    guideLinkLabel: "E-scooter rider weight limit calculator",
    title: "E-Scooter Rider Weight Limit Calculator",
    description: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter rider weight limit calculator",
      "escooter weight limit",
      "max rider weight scooter",
      "motor overload stress factor",
      "rated max rider kg",
      "backpack rider mass",
    ],
    seo: {
      sections: [
        {
          heading: "Rated max is a system label",
          body: "Deck, motor, and battery are validated to a rider mass band. An e-scooter rider weight limit calculator makes overload visible as a ratio—not guilt, but engineering margin. Stress above 1.0 means the same motor watts must do more work on every hill and launch.",
        },
        {
          heading: "Gear belongs in rider mass",
          body: "Laptop bags and winter layers often add 5–10 kg beyond bathroom-scale weight. Include them once in rider mass rather than discovering overload on a bridge grade. Effective motor load then matches what the hub sees on Monday commute, not a spec-sheet weigh-in.",
        },
        {
          heading: "From stress factor to hill and amp checks",
          body: "Higher stress raises climb power demand and peak phase current. After bracketing stress, run hill-climb with total mass and peak-amps with your controller limit—overload riders hit electrical limits before they feel frame flex.",
        },
      ],
    },
    content: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_CONTENT,
  };

const CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate e-scooter deck and motor stress: stress factor from rider vs. rated max mass, overload kg, and effective motor watts—see when excess weight loads the frame and hub beyond design margin.",
  heroSubtitle:
    "Overload shows up twice: the deck flexes through more cycles, and the motor must deliver more watts for the same hills. This guide shows how to calculate e-scooter deck and motor stress from rider mass, rated limit, and motor rating before daily commutes beat design margin.",
  benefits: [
    "Stress factor quantifies deck and drivetrain loading vs. manufacturer rated max.",
    "Effective motor load (W) = stress × rated motor power—hill demand scales with overload.",
    "Overload kg flags how many kilograms above the label you ride with gear included.",
  ],
  howItWorks: [
    "Weigh rider plus backpack and enter total mass in kg.",
    "Enter rated max rider from the deck sticker and motor rated watts.",
    "Read stress factor and effective motor load—values above 1.0 mean overload on deck and motor.",
  ],
  faq: [
    {
      q: "How do I calculate e-scooter deck and motor stress?",
      a: "Divide total rider mass by rated max rider mass for stress factor. Multiply stress by motor rated watts for effective motor load. Stress above 1.0 means you exceed the design band—deck fatigue, hinge wear, and hill current rise together.",
    },
    {
      q: "What deck stress does overload cause?",
      a: "Frames and folding stems are validated to a rider mass. Overload increases flex per bump and accelerates bolt-torque drift on shared scooters. The calculator does not model metal fatigue cycles—it gives a mass ratio proxy for when to inspect hardware more often.",
    },
    {
      q: "How does motor stress relate to stress factor?",
      a: "Effective motor load = stress factor × rated motor W. A 1.10 stress on a 500 W motor ≈ 550 W equivalent demand—higher phase amps on launches and grades. Pair with hill-climb and peak-amps tools after stress exceeds ~1.0.",
    },
    {
      q: "Example overload scenario?",
      a: "110 kg rider, 100 kg rated max, 500 W motor: stress = 1.10, 10 kg overload, effective load ≈ 550 W. Shedding 10 kg gear or choosing a 120 kg-rated deck returns stress to 1.0.",
    },
  ],
  technicalSpecs: [
    "Deck/motor stress proxy: stress factor = rider kg ÷ rated max kg.",
    "Motor stress proxy: effective W = stress × motor rated W.",
    "Overload kg = max(0, rider − rated max).",
    "Inspect folding hardware more often when stress > 1.0.",
    "Related: e-scooter-rider-weight-limit-calculator, escooter-hill-climb.",
  ],
};

const CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_GUIDE: EscooterWeightLimitGuideDefinition =
  {
    slug: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_GUIDE_HREF,
    toolHref: ESCOOTER_WEIGHT_LIMIT_TOOL_HREF,
    guideLinkLabel: "Calculate e-scooter deck and motor stress",
    title: "Calculate E-Scooter Deck and Motor Stress",
    description: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_CONTENT.metaDescription,
    keywords: [
      "calculate e-scooter deck and motor stress",
      "escooter deck stress",
      "motor overload watts",
      "frame flex rider weight",
      "stress factor scooter",
      "effective motor load",
    ],
    seo: {
      sections: [
        {
          heading: "One ratio, two failure modes",
          body: "To calculate e-scooter deck and motor stress, start with rider mass against rated max. The same ratio that warns about stem and deck margin also scales how hard the motor must work relative to its nameplate watts—mechanical and electrical overload move together.",
        },
        {
          heading: "Deck stress is cumulative",
          body: "Potholes and curb drops load the frame every ride. Overload riders see more flex per event and faster loosening at folding points. When stress factor stays above 1.0, shorten maintenance intervals on the schedule tool and log bolt torque checks weekly on shared fleets.",
        },
        {
          heading: "Motor stress becomes amp stress",
          body: "Effective motor load is a planning shortcut for higher hill and launch demand. After calculating motor stress, verify peak phase amps against controller and pack C-rate—deck-safe on paper can still trip BMS or thermal limits under overload acceleration.",
        },
      ],
    },
    content: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_CONTENT,
  };

const ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "E-scooter payload capacity and motor load estimator: remaining kg to rated max, stress factor, and effective motor watts from rider mass and motor rating—size deck capacity before commute gear and hills.",
    heroSubtitle:
      "Payload capacity is what is left before you hit the rated max label; motor load is how hard the hub works once you are on the deck. This e-scooter payload capacity and motor load estimator turns rider mass and motor watts into both numbers for shopping and daily packing decisions.",
    benefits: [
      "Remaining payload kg = rated max − rider mass (when within limit).",
      "Stress factor and effective motor load (W) scale with how full the capacity band is.",
      "Compare scooters by rated max and motor W before buying for heavier riders or cargo.",
    ],
    howItWorks: [
      "Enter total rider mass including backpack and daily carry items.",
      "Set manufacturer rated max rider (kg) and motor rated power (W).",
      "Read remaining payload headroom, stress factor, and estimated motor load at your mass.",
    ],
    faq: [
      {
        q: "What is an e-scooter payload capacity and motor load estimator?",
        a: "It estimates how much of the rated rider band you use (stress factor), kilograms remaining before overload, and effective motor load in watts (stress × rated motor W). Payload capacity here means rider+cargo mass against the published max—not cargo rack limits unless included in rider mass.",
      },
      {
        q: "How do I estimate remaining payload capacity?",
        a: "Remaining kg ≈ rated max − rider mass when rider is below the label. At 95 kg on a 100 kg deck, ~5 kg headroom remains for unexpected gear. At 110 kg on 100 kg rated max, overload is 10 kg and headroom is zero—stress factor 1.10.",
      },
      {
        q: "How is motor load estimated?",
        a: "Effective motor load = (rider mass ÷ rated max) × motor rated watts. It is a proportional estimate of demand relative to nameplate motor power—useful for comparing 500 W vs. 700 W decks at the same rider mass.",
      },
      {
        q: "Does scooter mass count in payload?",
        a: "Manufacturer rated max is usually rider-only. Scooter dry weight is separate. For hill planning, add scooter mass in the hill-climb tool as total mass; this estimator focuses on rider payload vs. rated rider label.",
      },
    ],
    technicalSpecs: [
      "Payload headroom (kg) = rated max − rider mass (if positive).",
      "Stress factor = rider mass ÷ rated max.",
      "Motor load estimate (W) = stress factor × motor rated W.",
      "Example: 95 kg, 100 kg max, 500 W → 5 kg headroom, 0.95 stress, ~475 W load.",
      "Related: calculate-e-scooter-deck-and-motor-stress, escooter-hill-climb.",
    ],
  };

const ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_GUIDE: EscooterWeightLimitGuideDefinition =
  {
    slug: ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_GUIDE_HREF,
    toolHref: ESCOOTER_WEIGHT_LIMIT_TOOL_HREF,
    guideLinkLabel: "E-scooter payload capacity and motor load estimator",
    title: "E-Scooter Payload Capacity and Motor Load Estimator",
    description:
      ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter payload capacity and motor load estimator",
      "escooter payload capacity",
      "motor load estimator",
      "rated max rider headroom",
      "stress factor payload",
      "effective motor watts",
    ],
    seo: {
      sections: [
        {
          heading: "Capacity is a band, not a single number",
          body: "An e-scooter payload capacity and motor load estimator shows how much of the rated rider band you consume today—and what that implies for motor demand. Two decks with the same motor watts but different rated max values offer different headroom for the same commuter.",
        },
        {
          heading: "Motor load rises as capacity fills",
          body: "At 80 % of rated max, effective motor load sits near 80 % of nameplate watts before hills. Heavier riders on small-capacity decks run the motor closer to continuous limits on flats—pair estimates with hill-climb and peak-amps before assuming brochure motor watts cover your route.",
        },
        {
          heading: "Shopping with payload and motor together",
          body: "Compare candidate scooters by rated max rider and continuous motor W in one sheet. A 120 kg-rated deck with 700 W continuous may suit daily backpack commuters better than a 100 kg / 500 W spec that looks cheaper—payload capacity and motor load estimates make that trade visible before purchase.",
        },
      ],
    },
    content: ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterWeightLimitLandingSlug,
  EscooterWeightLimitGuideDefinition
> = {
  [ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_GUIDE,
  [CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG]:
    CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_GUIDE,
  [ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG]:
    ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the E-Scooter Weight Limit tool footer Resources column. */
export const ESCOOTER_WEIGHT_LIMIT_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Rider Weight Limit Calculator",
    },
    {
      slug: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_LANDING_SLUG,
      href: CALCULATE_ESCOOTER_DECK_AND_MOTOR_STRESS_GUIDE_HREF,
      label: "Calculate E-Scooter Deck and Motor Stress",
    },
    {
      slug: ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_LANDING_SLUG,
      href: ESCOOTER_PAYLOAD_CAPACITY_AND_MOTOR_LOAD_ESTIMATOR_GUIDE_HREF,
      label: "E-Scooter Payload Capacity and Motor Load Estimator",
    },
  ];

export function isEscooterWeightLimitLandingSlug(
  slug: string
): slug is EscooterWeightLimitLandingSlug {
  return (ESCOOTER_WEIGHT_LIMIT_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getEscooterWeightLimitLanding(
  slug: EscooterWeightLimitLandingSlug = ESCOOTER_RIDER_WEIGHT_LIMIT_CALCULATOR_LANDING_SLUG
): EscooterWeightLimitGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterWeightLimitLandings(): EscooterWeightLimitGuideDefinition[] {
  return ESCOOTER_WEIGHT_LIMIT_LANDING_SLUGS.map((slug) =>
    getEscooterWeightLimitLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_WEIGHT_LIMIT_FOOTER_RESOURCES. */
export function getEscooterWeightLimitToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_WEIGHT_LIMIT_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_WEIGHT_LIMIT_CALCULATOR_ID };
