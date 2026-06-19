import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const EBIKE_RANGE_ESTIMATOR_TOOL_PATH =
  "/tools/e-bike/ebike-range-estimator/" as const;

export const EBIKE_RANGE_ESTIMATOR_TOOL_HREF = getCalculatorHref(
  "ebike-range-estimator",
  "ebike"
);

const BASE_CALCULATOR_ID = "ebike-range-estimator" as const;

export type EbikeRangeEstimatorLandingSlug =
  | "ebike-range-estimator"
  | "electric-bike-battery-range-calculator"
  | "calculate-e-bike-distance-per-charge";

export const EBIKE_RANGE_ESTIMATOR_LANDING_SLUG =
  "ebike-range-estimator" as const;

export const ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG =
  "electric-bike-battery-range-calculator" as const;

export const CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG =
  "calculate-e-bike-distance-per-charge" as const;

export const EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS = [
  EBIKE_RANGE_ESTIMATOR_LANDING_SLUG,
  ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG,
  CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG,
] as const satisfies readonly EbikeRangeEstimatorLandingSlug[];

export const EBIKE_RANGE_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  EBIKE_RANGE_ESTIMATOR_LANDING_SLUG
);

export const ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_GUIDE_HREF = getGuideLandingHref(
  CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG
);

export type EbikeRangeEstimatorGuideDefinition = GuideLandingDefinition & {
  slug: EbikeRangeEstimatorLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const EBIKE_RANGE_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-bike range estimator: calculate distance from battery Wh, assist level, rider weight, and wind/terrain factors. Physics-based Wh/km planning—free, instant.",
  heroSubtitle:
    "Brochure range rarely matches your commute. This guide walks through the e-bike range estimator—usable watt-hours, assist multiplier, and terrain—before you plan a long ride or size a battery upgrade.",
  benefits: [
    "Range = usable Wh ÷ Wh/km with transparent assist, weight, and wind/terrain multipliers.",
    "Pack efficiency input separates nameplate Wh from energy that reaches the motor.",
    "Pairs with voltage-sag and charging-cost tools for full ride and ownership planning.",
  ],
  howItWorks: [
    "Enter battery capacity (Wh) and pack efficiency (typical 88–95%).",
    "Set base Wh/km, pedal-assist level (1–5), total rider+bike mass, and wind/terrain factor.",
    "Review estimated range in km and the effective Wh/km used in the calculation.",
  ],
  faq: [
    {
      q: "How do I estimate e-bike range?",
      a: "Divide usable battery Wh by consumption Wh/km. Example: 500 Wh at 92% efficiency → 460 Wh usable; at 12 Wh/km effective consumption that is about 38 km. Raise assist level or headwind factors to see range drop.",
    },
    {
      q: "What is a typical Wh/km for e-bikes?",
      a: "Many commuters fall between 8–12 Wh/km on flat ground at moderate assist. Hills, strong headwinds, heavy loads, and max assist can push 15–20+ Wh/km—use the wind/terrain factor and assist level inputs to bracket your route.",
    },
    {
      q: "Why is my real range lower than the calculator?",
      a: "Cold batteries, voltage sag on climbs, stop-and-go traffic, and under-inflated tyres all raise Wh/km. Start with manufacturer Wh and your usual assist level, then add margin for winter or hilly return legs.",
    },
  ],
  technicalSpecs: [
    "Usable Wh = battery_Wh × pack_efficiency.",
    "Wh/km ≈ base_Wh/km × assist_multiplier × wind_terrain_factor + weight_penalty.",
    "Range_km = usable_Wh ÷ Wh/km.",
    "Related: ebike-voltage-sag, ebike-charging-cost, ebike-weight-performance.",
  ],
};

const EBIKE_RANGE_ESTIMATOR_GUIDE: EbikeRangeEstimatorGuideDefinition = {
  slug: EBIKE_RANGE_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "ebike",
  href: EBIKE_RANGE_ESTIMATOR_GUIDE_HREF,
  toolHref: EBIKE_RANGE_ESTIMATOR_TOOL_HREF,
  guideLinkLabel: "E-bike range estimator",
  title: "E-Bike Range Estimator",
  description: EBIKE_RANGE_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "e-bike range estimator",
    "ebike range calculator",
    "electric bike range estimate",
    "wh per km ebike",
    "pedal assist range calculator",
  ],
  seo: {
    sections: [
      {
        heading: "Assist level drives consumption",
        body: "Higher pedal-assist levels multiply baseline Wh/km—Level 5 can draw roughly 2.5× the energy of Level 1 on the same route. Commute planning should use the assist you actually ride, not the eco mode from the marketing page.",
      },
      {
        heading: "Weight and terrain compound",
        body: "Total mass (rider, cargo, bike) adds a Wh/km penalty above a reference weight. Wind and grade factors stack on top. A flat outbound leg with a headwind return can mean two different consumption figures—rerun the estimator for worst-case direction.",
      },
    ],
  },
  content: EBIKE_RANGE_ESTIMATOR_CONTENT,
};

const ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electric bike battery range calculator: convert pack Wh and efficiency into ride distance using assist level, rider weight, and terrain. Plan commutes and battery upgrades with clear Wh/km math.",
  heroSubtitle:
    "Battery range starts with usable watt-hours—not the sticker on the downtube. This guide shows how to calculate electric bike range from pack capacity, discharge efficiency, and the Wh/km your route actually demands.",
  benefits: [
    "Centers the battery: nameplate Wh × pack efficiency = energy available for the motor.",
    "Links battery size to km via assist, mass, and wind/terrain multipliers on Wh/km.",
    "Helps compare 400 Wh vs. 625 Wh packs on the same commute profile before you buy.",
  ],
  howItWorks: [
    "Look up or estimate battery Wh (voltage × Ah, or manufacturer spec).",
    "Apply pack efficiency (88–95%) for BMS and drivetrain loss.",
    "Divide usable Wh by route Wh/km—adjusted for assist level and conditions—to get battery-backed range.",
  ],
  faq: [
    {
      q: "How do I calculate electric bike range from battery Wh?",
      a: "Usable Wh = pack Wh × efficiency. Range ≈ usable Wh ÷ Wh/km. A 625 Wh pack at 90% efficiency with 11 Wh/km consumption → about 51 km. Swap pack size in the calculator to see km gained from a larger battery.",
    },
    {
      q: "How many Wh do I need for a 30 km commute?",
      a: "Multiply target km by expected Wh/km, then divide by pack efficiency. At 12 Wh/km and 92% efficiency: 30 × 12 ÷ 0.92 ≈ 391 Wh minimum—add 15–25% margin for headwinds, cold, or aging cells.",
    },
    {
      q: "Is voltage or Ah more important for range?",
      a: "Range depends on total Wh (V × Ah), not voltage alone. A 48 V 13 Ah and 36 V 17 Ah pack are both about 624 Wh—similar range if efficiency and consumption match. Voltage affects sag and motor behavior, not nameplate energy.",
    },
  ],
  technicalSpecs: [
    "Battery Wh: from label (V × Ah) or OEM spec sheet.",
    "Usable Wh = Wh × pack_efficiency_fraction.",
    "Range_km = usable_Wh ÷ effective_Wh/km.",
    "Related: ebike-battery-cycle-life, ebike-voltage-sag, ebike-charge-time.",
  ],
};

const ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_GUIDE: EbikeRangeEstimatorGuideDefinition =
  {
    slug: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "ebike",
    href: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_GUIDE_HREF,
    toolHref: EBIKE_RANGE_ESTIMATOR_TOOL_HREF,
    guideLinkLabel: "Electric bike battery range calculator",
    title: "Electric Bike Battery Range Calculator",
    description: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "electric bike battery range calculator",
      "ebike battery range km",
      "wh to range ebike",
      "calculate range from battery wh",
      "e-bike pack capacity range",
    ],
    seo: {
      sections: [
        {
          heading: "Nameplate vs. usable Wh",
          body: "Manufacturers quote gross pack energy; BMS cutoff, inverter loss, and cold weather leave less for propulsion. The efficiency field models that gap so range math reflects energy that actually turns the cranks—not the number printed on the battery housing.",
        },
        {
          heading: "Sizing the next pack",
          body: "If your current pack falls short by 8 km on a regular loop, you need roughly 8 × Wh/km extra usable energy—not double the pack. Run the calculator with today’s Wh and consumption, then increase Wh until range clears your buffer—before paying for a heavier or costlier upgrade.",
        },
      ],
    },
    content: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_CONTENT,
  };

const CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate e-bike distance per charge from battery Wh, assist level, rider weight, and route conditions. See how many km you get on one full charge before your next ride.",
  heroSubtitle:
    "Distance per charge is the question every rider asks after the first week—how far can I go on one fill? This guide shows how to calculate km per charge from usable energy and the Wh/km your assist and terrain demand.",
  benefits: [
    "Outputs km per full charge from pack Wh and real-world consumption inputs.",
    "Adjust assist, mass, and wind/terrain to match outbound vs. return legs.",
    "Useful for commute go/no-go decisions and charger stop planning on longer rides.",
  ],
  howItWorks: [
    "Start from a full charge: enter battery Wh and realistic pack efficiency.",
    "Set Wh/km drivers—base consumption, assist level, total mass, wind/terrain factor.",
    "Read estimated km per charge; rerun with higher assist or headwind for conservative planning.",
  ],
  faq: [
    {
      q: "How do I calculate e-bike distance per charge?",
      a: "Km per charge ≈ (battery Wh × efficiency) ÷ Wh/km. Example: 504 Wh at 91% efficiency with 10.5 Wh/km → about 44 km on one charge. Lower assist or tailwind factors increase km per charge.",
    },
    {
      q: "How far can an e-bike go on one charge?",
      a: "Typical commuter setups land between 30–70 km per charge depending on pack size, assist, and hills. A 400 Wh pack at moderate assist on flat terrain may deliver ~35 km; a 750 Wh pack on eco assist can exceed 60 km—your inputs matter more than averages.",
    },
    {
      q: "Should I plan rides at max assist range?",
      a: "No—use the assist level you will actually ride. Max assist can halve km per charge versus Level 1–2. Plan with worst-case wind or climb on the return leg so you are not stranded below your BMS cutoff.",
    },
  ],
  technicalSpecs: [
    "Km per charge = usable_Wh ÷ Wh/km.",
    "Usable Wh = battery_Wh × pack_efficiency.",
    "Wh/km from base × assist × wind/terrain + weight penalty.",
    "Related: ebike-charge-time, ebike-commute-savings, ebike-max-speed.",
  ],
};

const CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_GUIDE: EbikeRangeEstimatorGuideDefinition =
  {
    slug: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "ebike",
    href: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_GUIDE_HREF,
    toolHref: EBIKE_RANGE_ESTIMATOR_TOOL_HREF,
    guideLinkLabel: "Calculate e-bike distance per charge",
    title: "Calculate E-Bike Distance per Charge",
    description: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_CONTENT.metaDescription,
    keywords: [
      "calculate e-bike distance per charge",
      "how far e-bike one charge",
      "km per charge electric bike",
      "e-bike range per charge",
      "distance on full battery ebike",
    ],
    seo: {
      sections: [
        {
          heading: "One charge, one number",
          body: "Retailers quote optimistic km per charge; your loop may include stops, grades, and headwinds that the brochure test never saw. Calculating distance per charge with your mass and assist level produces a rider-specific km figure you can compare to GPS logs after a few weeks.",
        },
        {
          heading: "Partial charges and mid-ride math",
          body: "This tool assumes a full charge start. For mid-day top-ups, scale usable Wh by state of charge or rerun with remaining Wh from your display. Distance per charge is still the same Wh/km model—only the energy numerator changes.",
        },
      ],
    },
    content: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EbikeRangeEstimatorLandingSlug,
  EbikeRangeEstimatorGuideDefinition
> = {
  [EBIKE_RANGE_ESTIMATOR_LANDING_SLUG]: EBIKE_RANGE_ESTIMATOR_GUIDE,
  [ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG]:
    ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_GUIDE,
  [CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG]:
    CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_GUIDE,
};

export const EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: EBIKE_RANGE_ESTIMATOR_LANDING_SLUG,
      href: EBIKE_RANGE_ESTIMATOR_GUIDE_HREF,
      label: "E-Bike Range Estimator",
    },
    {
      slug: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_LANDING_SLUG,
      href: ELECTRIC_BIKE_BATTERY_RANGE_CALCULATOR_GUIDE_HREF,
      label: "Electric Bike Battery Range Calculator",
    },
    {
      slug: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_LANDING_SLUG,
      href: CALCULATE_E_BIKE_DISTANCE_PER_CHARGE_GUIDE_HREF,
      label: "Calculate E-Bike Distance per Charge",
    },
  ];

export function isEbikeRangeEstimatorLandingSlug(
  slug: string
): slug is EbikeRangeEstimatorLandingSlug {
  return (EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEbikeRangeEstimatorLanding(
  slug: EbikeRangeEstimatorLandingSlug = EBIKE_RANGE_ESTIMATOR_LANDING_SLUG
): EbikeRangeEstimatorGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEbikeRangeEstimatorLandings(): EbikeRangeEstimatorGuideDefinition[] {
  return EBIKE_RANGE_ESTIMATOR_LANDING_SLUGS.map((slug) =>
    getEbikeRangeEstimatorLanding(slug)
  );
}

/** Static footer links derived from EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES. */
export function getEbikeRangeEstimatorToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return EBIKE_RANGE_ESTIMATOR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as EBIKE_RANGE_ESTIMATOR_CALCULATOR_ID };
