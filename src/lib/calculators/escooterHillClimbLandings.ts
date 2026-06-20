import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_HILL_CLIMB_TOOL_PATH =
  "/tools/e-scooter/escooter-hill-climb/" as const;

export const ESCOOTER_HILL_CLIMB_TOOL_HREF = getCalculatorHref(
  "escooter-hill-climb",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-hill-climb" as const;

export type EscooterHillClimbLandingSlug =
  | "e-scooter-hill-climb-grade-calculator"
  | "calculate-e-scooter-gradeability-under-load-and-voltage-sag"
  | "electric-scooter-torque-and-hill-grade-estimator";

export const ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG =
  "e-scooter-hill-climb-grade-calculator" as const;

export const CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG =
  "calculate-e-scooter-gradeability-under-load-and-voltage-sag" as const;

export const ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG =
  "electric-scooter-torque-and-hill-grade-estimator" as const;

export const ESCOOTER_HILL_CLIMB_LANDING_SLUGS = [
  ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG,
  CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG,
  ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EscooterHillClimbLandingSlug[];

export const ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG);

export const CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG
  );

export const ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG);

export type EscooterHillClimbGuideDefinition = GuideLandingDefinition & {
  slug: EscooterHillClimbLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter hill climb grade calculator: max slope % from motor watts, rider + deck mass, crawl speed, SOC, and voltage sag at 36 / 48 / 52 V—plan routes before you stall on a ramp.",
  heroSubtitle:
    "Brochure motors quote peak watts; hills demand sustained climb power at crawl speed. This e-scooter hill climb grade calculator models grade % from P = m·g·sin(θ)·v—with SOC and voltage sag so you see when a 36 V deck loses hill torque mid-commute.",
  benefits: [
    "Computes maximum climb grade (%) at your minimum hill-crawl speed—not flat-ground top speed.",
    "SOC slider and 36 / 48 / 52 V presets show how effective motor watts collapse at low charge.",
    "Outputs grade, effective power, and voltage-efficiency loss for route planning and motor sizing.",
  ],
  howItWorks: [
    "Select nominal voltage and set state of charge (SOC) with the slider.",
    "Enter continuous motor power (W), total mass (rider + scooter + bag), and min climb speed (km/h).",
    "Read max climb grade (%)—slide SOC down to find when your route ramps become impossible.",
  ],
  faq: [
    {
      q: "What does an e-scooter hill climb grade calculator measure?",
      a: "It estimates the steepest sustained grade you can climb at a chosen crawl speed, given motor power, total mass, motor efficiency, SOC, and voltage sag. It answers slope capability—not how fast you go on flat ground.",
    },
    {
      q: "Why does SOC change hill climb grade so much?",
      a: "Effective climb power scales with SOC and voltage under load. At low SOC, pack voltage sags and the controller delivers fewer watts—steep grades that felt fine at 80 % may stall the motor at 25 %. Slide SOC in the tool to find your cutoff.",
    },
    {
      q: "Should I use peak or continuous motor watts?",
      a: "Use continuous rated watts for sustained hills. Peak ads overstate what the hub can hold on a long ramp. Burst peaks may crest a short overpass once; repeated commute grades need continuous power in the formula.",
    },
    {
      q: "How does min climb speed affect grade?",
      a: "Climb power P = m·g·sin(θ)·v rises with speed on the same slope. A lower crawl speed (e.g. 6–8 km/h) reduces power demand and raises the grade you can sustain—until the motor cannot maintain even that crawl.",
    },
  ],
  technicalSpecs: [
    "Inputs: nominal voltage (36 / 48 / 52 V), SOC (%), motor power (W), total mass (kg), min climb speed (km/h), motor efficiency (%).",
    "Effective power ≈ motor W × (SOC/100) × voltage efficiency under sag.",
    "Grade from P = m·g·sin(θ)·v at steady crawl; output as grade %.",
    "Example: 500 W, 89 kg, 8 km/h crawl, 75 % efficiency—grade drops sharply below ~40 % SOC on 36 V.",
    "Related: escooter-peak-amps, escooter-weight-limit, escooter-max-speed.",
  ],
};

const ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_GUIDE: EscooterHillClimbGuideDefinition =
  {
    slug: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_HILL_CLIMB_TOOL_HREF,
    guideLinkLabel: "E-scooter hill climb grade calculator",
    title: "E-Scooter Hill Climb Grade Calculator",
    description: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter hill climb grade calculator",
      "escooter hill climb",
      "scooter max slope",
      "motor watts hill grade",
      "soc hill torque",
      "voltage sag climb",
    ],
    seo: {
      sections: [
        {
          heading: "Grade physics at crawl speed",
          body: "On a steady incline, climbing power equals mass × gravity × sine of slope angle × forward speed. An e-scooter hill climb grade calculator inverts that relation: given your motor's effective watts and a minimum crawl speed, it returns the steepest grade you can hold—not a brochure peak-speed number.",
        },
        {
          heading: "SOC and voltage sag on real ramps",
          body: "Many commuters discover hill limits at half battery, not full. Lower SOC reduces both available voltage and controller output. Model 36 V vs. 48 V / 52 V tiers with the same motor watts to see why higher-voltage decks often retain climb margin longer into the discharge curve.",
        },
        {
          heading: "Pair grade with weight and peak amps",
          body: "Overload riders and heavy bags raise m in the same formula—steep grades need more watts. After estimating max grade, cross-check rider stress with the weight-limit tool and burst current with peak-amps and connector-loss calculators so hill attempts do not trip thermal or BMS limits.",
        },
      ],
    },
    content: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_CONTENT,
  };

const CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate e-scooter gradeability under load and voltage sag: max slope % when rider mass, crawl speed, SOC, and pack sag reduce effective motor watts—36 / 48 / 52 V hill planning.",
    heroSubtitle:
      "Gradeability is not nameplate motor watts—it is what your hub can deliver after mass, crawl speed, SOC, and voltage sag take their cut. This guide shows how to calculate e-scooter gradeability under load and voltage sag before a commute ramp stalls you.",
    benefits: [
      "Treats total mass (rider + deck + cargo) as the load term in climb power P = m·g·sin(θ)·v.",
      "Applies SOC and voltage-efficiency derating so effective watts match half-battery hill behaviour.",
      "Compares 36 V vs. 48 V / 52 V sag curves on the same motor rating for tier upgrades.",
    ],
    howItWorks: [
      "Enter total mass in kg and continuous motor watts—not peak ads.",
      "Set nominal voltage, SOC (%), and min climb speed (km/h); the model applies voltage sag under load.",
      "Read max grade (%) and effective motor power—slide SOC to see when gradeability collapses.",
    ],
    faq: [
      {
        q: "How do I calculate e-scooter gradeability under load and voltage sag?",
        a: "Start with climb power P = m·g·sin(θ)·v at your minimum hill speed. Effective motor watts ≈ rated W × (SOC/100) × voltage efficiency under sag. Solve for the steepest grade θ your effective watts can sustain—or use the interactive tool with your mass and voltage tier.",
      },
      {
        q: "What counts as load in gradeability?",
        a: "Total mass: rider, scooter, helmet, backpack, and winter gear. Every extra kilogram raises climb power for the same grade and speed. Overloaded decks hit hill limits sooner than the same motor with a lighter rider.",
      },
      {
        q: "Why does voltage sag matter on hills?",
        a: "Under high phase current, pack voltage drops below nominal. Controllers deliver fewer watts even when SOC looks acceptable. Sag hits 36 V packs harder than 48 V / 52 V at the same current—gradeability falls faster on low-voltage tiers.",
      },
      {
        q: "Should I plan hills at 100 % SOC?",
        a: "Plan at the SOC you actually hit on the ramp—often 40–70 % mid-commute. Gradeability at full charge overstates what you can climb on the return leg. Slide SOC in the calculator to your worst-case arrival charge.",
      },
    ],
    technicalSpecs: [
      "Load: total mass (kg) in P = m·g·sin(θ)·v.",
      "Effective W ≈ motor W × (SOC/100) × voltage efficiency (sag model).",
      "Min climb speed (km/h) sets v in the power equation.",
      "Output: max grade (%) and climb power (W) at effective motor output.",
      "Related: e-scooter-hill-climb-grade-calculator, escooter-peak-amps, escooter-weight-limit.",
    ],
  };

const CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_GUIDE: EscooterHillClimbGuideDefinition =
  {
    slug: CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_GUIDE_HREF,
    toolHref: ESCOOTER_HILL_CLIMB_TOOL_HREF,
    guideLinkLabel:
      "Calculate e-scooter gradeability under load and voltage sag",
    title: "Calculate E-Scooter Gradeability Under Load and Voltage Sag",
    description:
      CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_CONTENT.metaDescription,
    keywords: [
      "calculate e-scooter gradeability under load and voltage sag",
      "escooter gradeability calculator",
      "voltage sag hill climb",
      "soc load hill grade",
      "scooter slope under load",
      "effective motor watts climb",
    ],
    seo: {
      sections: [
        {
          heading: "Load is mass on the deck",
          body: "Gradeability starts with how many kilograms you ask the motor to lift uphill at crawl speed. To calculate e-scooter gradeability under load and voltage sag, keep mass honest—rider plus scooter plus daily cargo—not brochure rider weight. A 10 kg bag can erase a grade point on a 500 W commuter hub.",
        },
        {
          heading: "Voltage sag shrinks effective watts",
          body: "Nominal 36 / 48 / 52 V labels are not what the pack holds under hill current. SOC and sag together reduce voltage efficiency in the model—mirroring why the same ramp feels fine at 80 % SOC and impossible at 25 %. Compare voltage tiers at identical mass and motor watts to see tier upgrades that buy hill margin.",
        },
        {
          heading: "From gradeability to route planning",
          body: "Once max grade is bracketed at your realistic SOC, map known ramp percentages on the commute against the result. Pair with peak-amps and weight-limit tools so load and burst current stay inside controller and BMS limits—gradeability math fails in the real world if thermal cutbacks kick in mid-climb.",
        },
      ],
    },
    content: CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_CONTENT,
  };

const ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Electric scooter torque and hill grade estimator: translate motor watts, efficiency, and crawl speed into max slope %—with SOC and voltage sag showing when hill torque fades on 36 / 48 / 52 V decks.",
    heroSubtitle:
      "Hills need torque at low RPM, not flat-ground KV bragging rights. This electric scooter torque and hill grade estimator links motor power, efficiency, and mass to the steepest grade you can crawl—then shows how SOC and sag erode that torque before the motor stalls.",
    benefits: [
      "Frames hill capability as sustained climb power—not peak ads or no-load RPM.",
      "Motor efficiency input separates electrical watts from mechanical work on the slope.",
      "Torque-drop % from voltage sag highlights when low SOC ends hill confidence.",
    ],
    howItWorks: [
      "Enter continuous motor watts and motor efficiency (%).",
      "Add total mass (kg), min climb speed (km/h), voltage tier, and SOC (%).",
      "Read max hill grade (%) and torque-related outputs—compare grades at 100 % vs. 30 % SOC.",
    ],
    faq: [
      {
        q: "What is an electric scooter torque and hill grade estimator?",
        a: "It estimates the steepest grade your scooter can sustain at a chosen crawl speed, from motor power, efficiency, and load—then applies SOC and voltage sag so the grade reflects real hill torque, not brochure peak watts.",
      },
      {
        q: "How are torque and hill grade related on e-scooters?",
        a: "At low crawl speed on a slope, climbing needs power P = m·g·sin(θ)·v. More grade (θ) or mass demands more watts. When effective motor watts fall from sag or low SOC, the same hub produces less wheel torque—max sustainable grade drops.",
      },
      {
        q: "Why do high-KV motors struggle on hills?",
        a: "KV optimized for top speed spins fast at low torque per amp. Hill climbs need phase current at low RPM where high-KV hubs may saturate. Use continuous motor watts and efficiency in the estimator; pair with peak-amps if you are comparing motor swaps.",
      },
      {
        q: "What is torque drop percent in the tool?",
        a: "It reflects estimated power loss from voltage sag and SOC versus nominal full-charge capability. A rising torque-drop reading at lower SOC means the same ramp needs more of your shrinking power budget—plan routes above that cutoff.",
      },
    ],
    technicalSpecs: [
      "Climb power: P = m·g·sin(θ)·v at min crawl speed (km/h).",
      "Mechanical power ≈ motor W × efficiency × (SOC/100) × voltage efficiency.",
      "Output: max grade (%), climb power (W), torque-drop % under sag.",
      "Voltage tiers: 36 / 48 / 52 V with SOC slider 20–100 %.",
      "Related: calculate-e-scooter-gradeability-under-load-and-voltage-sag, escooter-peak-amps.",
    ],
  };

const ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_GUIDE: EscooterHillClimbGuideDefinition =
  {
    slug: ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_GUIDE_HREF,
    toolHref: ESCOOTER_HILL_CLIMB_TOOL_HREF,
    guideLinkLabel: "Electric scooter torque and hill grade estimator",
    title: "Electric Scooter Torque and Hill Grade Estimator",
    description:
      ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "electric scooter torque and hill grade estimator",
      "escooter hill torque",
      "scooter slope estimator",
      "motor torque grade percent",
      "hill climb soc torque",
      "hub motor hill grade",
    ],
    seo: {
      sections: [
        {
          heading: "Torque shows up as climb watts",
          body: "Commuters feel torque as the scooter pulling uphill without stalling. An electric scooter torque and hill grade estimator converts that demand into a grade percentage: given mass and crawl speed, how much sustained power the slope consumes—and whether your motor still has margin after efficiency and sag.",
        },
        {
          heading: "Low RPM hills vs. high-KV flats",
          body: "Motors marketed for speed may still fail a moderate grade at half battery. Continuous watts and efficiency matter more than peak KV on daily ramps. Model your deck's continuous rating, then slide SOC to see when torque drop crosses the grade on your bridge or parking-garage exit.",
        },
        {
          heading: "Estimator to commissioning sheet",
          body: "Log max grade at your worst-case SOC beside peak-amps and weight-limit results. Fleet and DIY builders who tune one metric at a time often miss that hill torque, burst current, and overload stress interact. Keep all three on the same voltage tier and mass assumptions.",
        },
      ],
    },
    content: ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterHillClimbLandingSlug,
  EscooterHillClimbGuideDefinition
> = {
  [ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_GUIDE,
  [CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG]:
    CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_GUIDE,
  [ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG]:
    ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the E-Scooter Hill Climb tool footer Resources column. */
export const ESCOOTER_HILL_CLIMB_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Hill Climb Grade Calculator",
    },
    {
      slug: CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_LANDING_SLUG,
      href: CALCULATE_ESCOOTER_GRADEABILITY_UNDER_LOAD_AND_VOLTAGE_SAG_GUIDE_HREF,
      label: "Calculate E-Scooter Gradeability Under Load and Voltage Sag",
    },
    {
      slug: ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_LANDING_SLUG,
      href: ELECTRIC_SCOOTER_TORQUE_AND_HILL_GRADE_ESTIMATOR_GUIDE_HREF,
      label: "Electric Scooter Torque and Hill Grade Estimator",
    },
  ];

export function isEscooterHillClimbLandingSlug(
  slug: string
): slug is EscooterHillClimbLandingSlug {
  return (ESCOOTER_HILL_CLIMB_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterHillClimbLanding(
  slug: EscooterHillClimbLandingSlug = ESCOOTER_HILL_CLIMB_GRADE_CALCULATOR_LANDING_SLUG
): EscooterHillClimbGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterHillClimbLandings(): EscooterHillClimbGuideDefinition[] {
  return ESCOOTER_HILL_CLIMB_LANDING_SLUGS.map((slug) =>
    getEscooterHillClimbLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_HILL_CLIMB_FOOTER_RESOURCES. */
export function getEscooterHillClimbToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_HILL_CLIMB_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_HILL_CLIMB_CALCULATOR_ID };
