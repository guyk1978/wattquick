import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_RANGE_TOOL_PATH = "/tools/e-scooter/escooter-range/" as const;

export const ESCOOTER_RANGE_TOOL_HREF = getCalculatorHref(
  "escooter-range",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-range" as const;

export type EscooterRangeLandingSlug =
  | "electric-scooter-range-calculator"
  | "how-far-can-my-escooter-go"
  | "escooter-battery-range-estimator";

export const ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG =
  "electric-scooter-range-calculator" as const;

export const HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG =
  "how-far-can-my-escooter-go" as const;

export const ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG =
  "escooter-battery-range-estimator" as const;

export const ESCOOTER_RANGE_LANDING_SLUGS = [
  ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG,
  HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG,
  ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EscooterRangeLandingSlug[];

export const ELECTRIC_SCOOTER_RANGE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG
);

export const HOW_FAR_CAN_MY_ESCOOTER_GO_GUIDE_HREF = getGuideLandingHref(
  HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG
);

export const ESCOOTER_BATTERY_RANGE_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG
);

export type EscooterRangeGuideDefinition = GuideLandingDefinition & {
  slug: EscooterRangeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ELECTRIC_SCOOTER_RANGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electric scooter range calculator: estimate remaining km from battery Wh, rider weight, tyre pressure, and SOC with voltage sag at 36 / 48 / 52 V. Free planning tool—no signup.",
  heroSubtitle:
    "Model real-world e-scooter range before you commute—not brochure figures. Factor in pack watt-hours, state of charge, rolling resistance from tyre pressure, and how 8–10″ wheels punish standing drag.",
  benefits: [
    "Translates usable Wh into distance using rider + scooter mass and tyre inflation—surfaces why under-inflated tyres steal double-digit range on small wheels.",
    "SOC slider shows how voltage sag at 36 V vs. 48 V / 52 V platforms shrinks usable power and remaining km mid-ride.",
    "Pack efficiency input separates BMS overhead and drivetrain loss so fleet and commuter plans start from net energy, not nameplate Wh alone.",
  ],
  howItWorks: [
    "Select nominal pack voltage (36, 48, or 52 V) and set state of charge with the slider.",
    "Enter battery capacity (Wh), rider and scooter mass, and actual vs. recommended tyre pressure.",
    "The calculator returns estimated range with detail on Wh/km assumptions—adjust inputs to match your route and riding style.",
  ],
  faq: [
    {
      q: "Why is e-scooter range lower than the spec sheet?",
      a: "Manufacturer claims often assume flat ground, light riders, and full charge. Standing stance, frequent acceleration, hills, cold weather, and under-inflated tyres raise watt-hours per kilometre. This calculator makes those trade-offs visible before you ride.",
    },
    {
      q: "How much does tyre pressure affect electric scooter range?",
      a: "On 8–10″ tyres, a few tenths of a bar below recommendation can increase rolling resistance sharply. Many riders recover 10–20% range by matching sidewall or deck-label pressure—especially on commuter routes with stops and starts.",
    },
    {
      q: "Does voltage platform matter for range?",
      a: "Yes. Lower nominal voltage (e.g., 36 V) tends to sag more under load, reducing effective power and usable energy at the same SOC. Higher-voltage packs (48 V, 52 V) often hold speed on mild grades with less range penalty.",
    },
  ],
  technicalSpecs: [
    "Inputs: nominal voltage (V), SOC (%), battery capacity (Wh), pack efficiency (%), rider mass (kg), scooter mass (kg), tyre pressure (bar), recommended pressure (bar).",
    "Output: estimated range (km) with Wh/km detail derived from rolling and standing-drag models.",
    "Scope: planning estimates only—validate against OEM specs, terrain, and local regulations.",
    "Related: pair with tyre-pressure and hill-climb calculators for route-specific commissioning.",
  ],
};

const ELECTRIC_SCOOTER_RANGE_GUIDE: EscooterRangeGuideDefinition = {
  slug: ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: ELECTRIC_SCOOTER_RANGE_CALCULATOR_GUIDE_HREF,
  toolHref: ESCOOTER_RANGE_TOOL_HREF,
  guideLinkLabel: "Electric scooter range calculator",
  title: "Electric Scooter Range Calculator",
  description: ELECTRIC_SCOOTER_RANGE_CONTENT.metaDescription,
  keywords: [
    "electric scooter range calculator",
    "escooter range",
    "e-scooter range estimate",
    "wh per km scooter",
    "electric scooter battery range",
  ],
  seo: {
    sections: [
      {
        heading: "Standing drag and small wheels",
        body: "E-scooters carry riders in a upright stance with smaller tyres than e-bikes. That combination raises aerodynamic and rolling losses per kilometre. Range planning should assume higher Wh/km than bicycle-equivalent calculators.",
      },
      {
        heading: "SOC, sag, and hill segments",
        body: "As state of charge drops, pack voltage sags under acceleration and inclines. Sliding SOC in the tool shows why scooters feel slower on the last third of a commute—and why reserving buffer Wh matters for safe arrival.",
      },
    ],
  },
  content: ELECTRIC_SCOOTER_RANGE_CONTENT,
};

const HOW_FAR_CAN_MY_ESCOOTER_GO_CONTENT: GuideLandingContent = {
  metaDescription:
    "How far can my e-scooter go? Estimate real commute distance from battery Wh, rider weight, tyre pressure, hills, and state of charge—before you run out of juice mid-route.",
  heroSubtitle:
    "Brochure range rarely matches your daily loop. This guide walks through the variables that decide how many kilometres you can actually ride—and when to open the calculator for a number you can trust.",
  benefits: [
    "Frames range as usable distance, not nameplate Wh: accounts for how you stand on the deck, how often you accelerate, and whether tyres are properly inflated.",
    "Explains why the last 20% of battery feels shorter than the first—voltage sag, BMS limits, and motor heat on 36 V commuter packs.",
    "Gives a checklist before long rides: SOC buffer, route grade, rider load, and cold-weather derating so you are not guessing at the charger map.",
  ],
  howItWorks: [
    "Start with your pack size in watt-hours and today's state of charge—not yesterday's full-charge memory.",
    "Adjust for rider + scooter weight and compare actual tyre pressure to the deck or sidewall recommendation.",
    "Run the E-Scooter Range Calculator with your route profile in mind; add a safety margin for headwinds, stops, and hills.",
  ],
  faq: [
    {
      q: "How far can my e-scooter go on one charge?",
      a: "It depends on usable Wh, Wh/km for your weight and tyres, and how hard you ride. A 360 Wh pack on a flat commute might cover 15–25 km for many riders—but hills, under-inflation, and repeated full-throttle launches can cut that sharply. Model your inputs instead of trusting a single brochure figure.",
    },
    {
      q: "Should I plan for full manufacturer range?",
      a: "No. Reserve 20–30% battery for voltage sag, detours, and battery aging. Planning to arrive with zero percent risks walking home and accelerates deep-discharge wear on many Li-ion packs.",
    },
    {
      q: "What is the fastest way to extend daily distance?",
      a: "Correct tyre pressure is usually the cheapest win on 8–10″ wheels. Next: smoother acceleration, lighter load, and choosing routes with fewer steep repeats. Upgrading from 36 V to 48 V platforms helps hill-heavy commutes but does not remove the need for realistic Wh/km planning.",
    },
  ],
  technicalSpecs: [
    "Primary drivers: battery capacity (Wh) × pack efficiency × SOC, divided by route Wh/km.",
    "Wh/km rises with rider mass, low tyre pressure, standing aerodynamics, and stop-start riding.",
    "Voltage platform (36 / 48 / 52 V) affects sag under load—not just top speed.",
    "Use the linked calculator for quantitative estimates; treat outputs as planning bounds, not guarantees.",
  ],
};

const HOW_FAR_CAN_MY_ESCOOTER_GO_GUIDE: EscooterRangeGuideDefinition = {
  slug: HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: HOW_FAR_CAN_MY_ESCOOTER_GO_GUIDE_HREF,
  toolHref: ESCOOTER_RANGE_TOOL_HREF,
  guideLinkLabel: "How far can my e-scooter go?",
  title: "How Far Can My E-Scooter Go?",
  description: HOW_FAR_CAN_MY_ESCOOTER_GO_CONTENT.metaDescription,
  keywords: [
    "how far can my e-scooter go",
    "e-scooter range distance",
    "electric scooter how far",
    "escooter commute range",
    "e-scooter battery distance",
  ],
  seo: {
    sections: [
      {
        heading: "Real commute distance vs. brochure claims",
        body: "Advertised range is often measured on smooth pavement with a light test rider and gentle throttle. Your loop includes curbs, traffic lights, payload, and pavement quality. Expect materially lower km unless your conditions match the lab.",
      },
      {
        heading: "When to recalculate mid-week",
        body: "Temperature drops, tyre slow leaks, and battery aging all shift Wh/km. If your scooter feels softer on the same route, rerun the calculator with updated SOC and pressure before assuming the pack is failing.",
      },
    ],
  },
  content: HOW_FAR_CAN_MY_ESCOOTER_GO_CONTENT,
};

const ESCOOTER_BATTERY_RANGE_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter battery range estimator: project remaining kilometres from pack Wh, efficiency, state of charge, and riding load. Free engineering-style planning for 36 / 48 / 52 V commuter scooters.",
  heroSubtitle:
    "Treat your pack like an energy budget—not a guess on the dashboard. This guide explains how to estimate battery-backed range from watt-hours, usable SOC, and the losses that eat Wh before you reach your stop.",
  benefits: [
    "Starts from battery nameplate Wh and pack efficiency so estimates reflect net energy reaching the motor, not marketing stickers alone.",
    "Ties SOC to available watt-hours at ride time—critical when you leave home at 70% and need a round-trip margin.",
    "Connects rider mass, tyre pressure, and voltage platform to Wh/km so estimators stay honest on hills and stop-start city legs.",
  ],
  howItWorks: [
    "Look up or measure pack capacity in Wh and apply a realistic efficiency factor (BMS + drivetrain).",
    "Multiply by current state of charge to get usable energy for the trip segment you are planning.",
    "Divide by expected Wh/km from the range tool—or benchmark from past rides—to estimate remaining battery range in km.",
  ],
  faq: [
    {
      q: "What is an e-scooter battery range estimator?",
      a: "It is a planning method that converts stored battery energy (Wh × SOC × efficiency) into expected distance using Wh/km for your weight, tyres, and route. It is not a GPS predictor—it is an engineering estimate you can reproduce before every commute.",
    },
    {
      q: "Should I use nameplate Wh or measured capacity?",
      a: "For new packs, nameplate Wh is a reasonable starting point. After a year or heavy cycles, derate 5–15% unless you have bench data. Estimators that ignore aging tend to over-promise on the return leg.",
    },
    {
      q: "How does SOC change the estimate?",
      a: "Usable energy scales roughly with SOC, but the last 20% often delivers less effective range because of voltage sag and controller current limits. Build a buffer instead of planning to 0%.",
    },
  ],
  technicalSpecs: [
    "Core estimate: range (km) ≈ (Wh_pack × efficiency × SOC%) ÷ Wh_per_km.",
    "Wh/km varies with total mass, tyre pressure, surface, and acceleration profile.",
    "Nominal voltage (36 / 48 / 52 V) influences sag under load—not captured by Wh alone.",
    "Outputs are planning bounds; log real rides to calibrate your personal Wh/km factor.",
  ],
};

const ESCOOTER_BATTERY_RANGE_ESTIMATOR_GUIDE: EscooterRangeGuideDefinition = {
  slug: ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: ESCOOTER_BATTERY_RANGE_ESTIMATOR_GUIDE_HREF,
  toolHref: ESCOOTER_RANGE_TOOL_HREF,
  guideLinkLabel: "E-scooter battery range estimator",
  title: "E-Scooter Battery Range Estimator",
  description: ESCOOTER_BATTERY_RANGE_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "e-scooter battery range estimator",
    "escooter battery range estimate",
    "electric scooter battery km",
    "wh to range scooter",
    "e-scooter energy budget",
  ],
  seo: {
    sections: [
      {
        heading: "From watt-hours to kilometres",
        body: "Battery range estimation begins with energy accounting. A 504 Wh pack at 90% efficiency and 80% SOC delivers roughly 363 Wh to the road. If your calibrated route uses 18 Wh/km, that is about 20 km of planning range—before safety margin.",
      },
      {
        heading: "Calibrating Wh/km on your deck",
        body: "Ride a known flat loop once at typical pressure and note Wh consumed from the app or charger (if available). Plug that Wh/km into the estimator instead of generic defaults. Small-wheel scooters often land between 15–25 Wh/km for mixed urban riding, but your mass and throttle habit matter more than averages.",
      },
    ],
  },
  content: ESCOOTER_BATTERY_RANGE_ESTIMATOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<EscooterRangeLandingSlug, EscooterRangeGuideDefinition> =
  {
    [ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG]: ELECTRIC_SCOOTER_RANGE_GUIDE,
    [HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG]: HOW_FAR_CAN_MY_ESCOOTER_GO_GUIDE,
    [ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG]:
      ESCOOTER_BATTERY_RANGE_ESTIMATOR_GUIDE,
  };

export const ESCOOTER_RANGE_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG,
    href: ELECTRIC_SCOOTER_RANGE_CALCULATOR_GUIDE_HREF,
    label: "Electric Scooter Range Calculator",
  },
  {
    slug: HOW_FAR_CAN_MY_ESCOOTER_GO_LANDING_SLUG,
    href: HOW_FAR_CAN_MY_ESCOOTER_GO_GUIDE_HREF,
    label: "How Far Can My E-Scooter Go?",
  },
  {
    slug: ESCOOTER_BATTERY_RANGE_ESTIMATOR_LANDING_SLUG,
    href: ESCOOTER_BATTERY_RANGE_ESTIMATOR_GUIDE_HREF,
    label: "E-Scooter Battery Range Estimator",
  },
];

export function isEscooterRangeLandingSlug(
  slug: string
): slug is EscooterRangeLandingSlug {
  return (ESCOOTER_RANGE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterRangeLanding(
  slug: EscooterRangeLandingSlug = ELECTRIC_SCOOTER_RANGE_CALCULATOR_LANDING_SLUG
): EscooterRangeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterRangeLandings(): EscooterRangeGuideDefinition[] {
  return ESCOOTER_RANGE_LANDING_SLUGS.map((slug) => getEscooterRangeLanding(slug));
}

/** Static footer links derived from ESCOOTER_RANGE_FOOTER_RESOURCES. */
export function getEscooterRangeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_RANGE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_RANGE_CALCULATOR_ID };
