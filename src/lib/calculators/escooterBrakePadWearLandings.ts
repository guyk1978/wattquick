import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_BRAKE_PAD_WEAR_TOOL_PATH =
  "/tools/e-scooter/escooter-brake-pad-wear/" as const;

export const ESCOOTER_BRAKE_PAD_WEAR_TOOL_HREF = getCalculatorHref(
  "escooter-brake-pad-wear",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-brake-pad-wear" as const;

export type EscooterBrakePadWearLandingSlug =
  | "e-scooter-brake-pad-life-calculator"
  | "calculate-brake-pad-wear-from-regen-settings"
  | "predict-e-scooter-brake-pad-longevity";

export const ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG =
  "e-scooter-brake-pad-life-calculator" as const;

export const CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG =
  "calculate-brake-pad-wear-from-regen-settings" as const;

export const PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG =
  "predict-e-scooter-brake-pad-longevity" as const;

export const ESCOOTER_BRAKE_PAD_WEAR_LANDING_SLUGS = [
  ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG,
  CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG,
  PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG,
] as const satisfies readonly EscooterBrakePadWearLandingSlug[];

export const ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG);

export const CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG);

export const PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_GUIDE_HREF =
  getGuideLandingHref(PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG);

export type EscooterBrakePadWearGuideDefinition = GuideLandingDefinition & {
  slug: EscooterBrakePadWearLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter brake pad life calculator: km per pad set and weeks until replacement from weekly distance, regen braking share, and hilly route percentage—plan friction brake maintenance on commuter decks.",
  heroSubtitle:
    "Regen cuts pad use on flats, but steep descents still rely on friction brakes. This e-scooter brake pad life calculator turns weekly km, regen share, and hill percentage into km per pad set and weeks until you should inspect or replace pads.",
  benefits: [
    "Km per pad set from regen and hill factors applied to a 1200 km baseline.",
    "Weeks per pad set = km life ÷ weekly distance for maintenance scheduling.",
    "Regen and hill sliders model how route mix changes pad wear—not just odometer km.",
  ],
  howItWorks: [
    "Enter weekly riding distance in km.",
    "Set regen braking share (%)—how much slowing comes from motor regen vs. friction.",
    "Set hilly route share (%)—read km per pad set and weeks until replacement.",
  ],
  faq: [
    {
      q: "What does an e-scooter brake pad life calculator estimate?",
      a: "It estimates how many kilometres one pad set lasts and how many weeks that equals at your weekly distance. Inputs are weekly km, regen braking share (%), and hilly route share (%). Output is km per pad set and weeks per pad set—not pad thickness in millimetres.",
    },
    {
      q: "How does regen affect brake pad life?",
      a: "More regen means less friction braking on flats. The model uses regen factor = 1 + (100 − regen%) ÷ 200—at 20 % regen the factor is 1.4× baseline wear; at 50 % regen it drops to 1.25×. Regen rarely replaces friction pads on steep descents.",
    },
    {
      q: "Example with default inputs?",
      a: "50 km/week, 20 % regen, 30 % hilly route: regen factor 1.4, hill factor 1.3 → ~659 km per pad set, ~13 weeks. More hills or less regen shortens pad life; flat regen-heavy routes extend it.",
    },
    {
      q: "When should I inspect pads regardless of the estimate?",
      a: "Inspect friction pads every ~400 km on high-mileage commutes or when squeal and fade appear—especially before wet-season descents. Pair with the maintenance-schedule tool for odometer-based brake intervals.",
    },
  ],
  technicalSpecs: [
    "Baseline km per pad set = 1200 (planning default for commuter friction pads).",
    "Regen factor = 1 + (100 − regen %) ÷ 200.",
    "Hill factor = 1 + hilly route % ÷ 100.",
    "Km per pad set = 1200 ÷ (regen factor × hill factor).",
    "Example: 50 km/wk, 20 % regen, 30 % hills → ~659 km, ~13 wk.",
    "Related: escooter-maintenance-schedule, escooter-hill-climb, escooter-tire-wear.",
  ],
};

const ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_GUIDE: EscooterBrakePadWearGuideDefinition =
  {
    slug: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_BRAKE_PAD_WEAR_TOOL_HREF,
    guideLinkLabel: "E-scooter brake pad life calculator",
    title: "E-Scooter Brake Pad Life Calculator",
    description: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter brake pad life calculator",
      "escooter brake pad wear",
      "regen braking pad life",
      "km per brake pad set scooter",
      "hilly route brake wear",
      "friction brake maintenance escooter",
    ],
    seo: {
      sections: [
        {
          heading: "Regen helps flats—not every stop",
          body: "An e-scooter brake pad life calculator accounts for how much slowing comes from regen versus friction. High regen share on flat commutes stretches km per pad set; hilly percentages pull life back down because descents still need disc or drum friction even on regen-capable controllers.",
        },
        {
          heading: "Hill share multiplies wear",
          body: "Repeated grade changes heat friction pads faster than cruise braking. The hill factor scales baseline pad life—30 % hilly route at default regen already cuts the 1200 km baseline to roughly two-thirds. Cross-check grades with the hill-climb tool if your commute is mostly ramps.",
        },
        {
          heading: "Plan inspections from weeks, not guesses",
          body: "Weeks per pad set turns km life into a calendar reminder alongside the maintenance-schedule odometer intervals. When the estimate drops below ~12 weeks, schedule a visual pad check—especially if tire wear or peak-amp hill stress is already high on the same route.",
        },
      ],
    },
    content: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_CONTENT,
  };

const CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate brake pad wear from regen settings: see how regen braking share (%) scales friction pad life—regen factor, km per pad set, and weeks at 0 % vs 50 % vs max regen on hilly commutes.",
    heroSubtitle:
      "Firmware regen weak, medium, or strong changes how often friction pads touch the rotor. Use this guide to calculate brake pad wear from regen settings—translate your regen share into km per pad set before you blame hills or pad quality alone.",
    benefits: [
      "Regen factor = 1 + (100 − regen %) ÷ 200—explicit link from settings to wear rate.",
      "Compare km per pad set at low vs high regen with the same weekly km and hill share.",
      "Weeks per pad set updates when you change only regen—isolate motor braking from route mix.",
    ],
    howItWorks: [
      "Fix weekly km and hilly route %—change only regen braking share between runs.",
      "Note regen factor and km per pad set at each regen level (0 %, 20 %, 50 %, 100 %).",
      "Pick the regen setting that balances pad life with stopping feel on your commute.",
    ],
    faq: [
      {
        q: "How do I calculate brake pad wear from regen settings?",
        a: "Enter regen braking share (%) in the tool. Regen factor = 1 + (100 − regen%) ÷ 200. Km per pad set = 1200 ÷ (regen factor × hill factor). Higher regen lowers the regen factor and extends pad life on routes where motor braking actually replaces friction stops.",
      },
      {
        q: "Example: 20 % vs 50 % regen at 30 % hills?",
        a: "At 50 km/wk and 30 % hilly (hill factor 1.3): 20 % regen → factor 1.4, ~659 km; 50 % regen → factor 1.25, ~738 km. Doubling effective regen share adds roughly 80 km per pad set in this scenario—hills still cap the gain.",
      },
      {
        q: "Does max regen eliminate pad wear?",
        a: "No—at 100 % regen share the regen factor is 1.0× baseline, but hill factor still applies. Steep descents and emergency stops use friction pads regardless of firmware regen level. Wet or low-SOC routes may fall back to friction more often than the regen % suggests.",
      },
      {
        q: "Where do I find my regen share?",
        a: "Estimate from app settings (weak/medium/strong) and riding style—count how many stops feel like motor drag vs lever pull on a typical flat commute. Enter that percentage; refine after one week of mindful braking.",
      },
    ],
    technicalSpecs: [
      "Regen factor = 1 + (100 − regen %) ÷ 200.",
      "0 % regen → factor 1.5; 50 % → 1.25; 100 % → 1.0.",
      "Km per pad set = 1200 ÷ (regen factor × hill factor).",
      "50 km/wk, 30 % hills: 20 % regen ~659 km; 50 % regen ~738 km.",
      "Related: e-scooter-brake-pad-life-calculator, escooter-hill-climb.",
    ],
  };

const CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_GUIDE: EscooterBrakePadWearGuideDefinition =
  {
    slug: CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_GUIDE_HREF,
    toolHref: ESCOOTER_BRAKE_PAD_WEAR_TOOL_HREF,
    guideLinkLabel: "Calculate brake pad wear from regen settings",
    title: "Calculate Brake Pad Wear from Regen Settings",
    description:
      CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_CONTENT.metaDescription,
    keywords: [
      "calculate brake pad wear from regen settings",
      "escooter regen braking pad life",
      "regen factor brake wear",
      "motor braking vs friction pads",
      "regen weak strong scooter",
      "km per pad set regen",
    ],
    seo: {
      sections: [
        {
          heading: "Regen share is a wear dial",
          body: "To calculate brake pad wear from regen settings, map firmware regen level to a braking share percentage. The tool's regen factor rewards higher motor braking on flats—each step toward strong regen shrinks friction duty and pushes km per pad set upward until hills dominate the result.",
        },
        {
          heading: "Compare settings before upgrading pads",
          body: "Run the calculator twice at the same weekly km: once at your old weak regen estimate, once at medium or strong. The km delta shows whether tuning regen buys more life than switching pad compounds—often meaningful on flat 50 km/week commutes with modest hill share.",
        },
        {
          heading: "Regen does not replace descent brakes",
          body: "Even at 100 % regen share on paper, hilly route percentage still multiplies wear through the hill factor. Pair regen comparisons with hill-climb load checks on the same commute—controllers that regen hard on flats may still fade on long downgrades where friction pads do the work.",
        },
      ],
    },
    content: CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_CONTENT,
  };

const PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_CONTENT: GuideLandingContent = {
  metaDescription:
    "Predict e-scooter brake pad longevity: forecast km per pad set and weeks until replacement from weekly distance, regen share, and hilly route mix—plan friction brake service before fade or squeal.",
  heroSubtitle:
    "Pad longevity depends on how far you ride each week and how much braking is regen vs friction on grades. Predict e-scooter brake pad longevity with km per pad set and weeks per pad set—turn commute habits into a maintenance calendar before pads metal-on-metal.",
  benefits: [
    "Weeks per pad set = km longevity ÷ weekly km—calendar-ready forecast.",
    "Route mix (regen + hills) adjusts the 1200 km baseline to your actual commute.",
    "Compare scenarios to see which habit change buys the most pad longevity.",
  ],
  howItWorks: [
    "Enter weekly riding distance in km—the main driver of weeks until replacement.",
    "Set regen braking share and hilly route percentage for your typical week.",
    "Read km per pad set and weeks per pad set—schedule inspection before the forecast ends.",
  ],
  faq: [
    {
      q: "How do I predict e-scooter brake pad longevity?",
      a: "The tool forecasts km per pad set from regen and hill factors, then divides by weekly km for weeks per pad set. That weeks number is your longevity horizon—when it drops below your preferred inspection interval, plan a pad check even if thickness looks acceptable.",
    },
    {
      q: "What inputs matter most for longevity?",
      a: "Weekly km scales calendar time directly—doubling distance halves weeks per pad set at the same km life. Regen share and hilly route % change km longevity first; a hilly 80 km/week commute wears pads faster in weeks than a flat 40 km/week route at identical km life.",
    },
    {
      q: "Example longevity at default inputs?",
      a: "50 km/week, 20 % regen, 30 % hills → ~659 km per pad set, ~13 weeks longevity. At 80 km/week on the same mix: still ~659 km but only ~8 weeks—higher mileage compresses the calendar even when route mix is unchanged.",
    },
    {
      q: "Can I extend predicted longevity without new pads?",
      a: "Raise effective regen on flats, reduce hard friction stops, and route around long descents when possible. Re-run the predictor after changing regen firmware or commute distance—longevity shifts more from habit and settings than from pad brand alone.",
    },
  ],
  technicalSpecs: [
    "Longevity (km) = 1200 ÷ (regen factor × hill factor).",
    "Longevity (weeks) = km per pad set ÷ weekly km.",
    "Regen factor = 1 + (100 − regen %) ÷ 200; hill factor = 1 + hilly % ÷ 100.",
    "Default mix: ~659 km, ~13 wk at 50 km/wk.",
    "Related: calculate-brake-pad-wear-from-regen-settings, escooter-maintenance-schedule.",
  ],
};

const PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_GUIDE: EscooterBrakePadWearGuideDefinition =
  {
    slug: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_GUIDE_HREF,
    toolHref: ESCOOTER_BRAKE_PAD_WEAR_TOOL_HREF,
    guideLinkLabel: "Predict e-scooter brake pad longevity",
    title: "Predict E-Scooter Brake Pad Longevity",
    description: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_CONTENT.metaDescription,
    keywords: [
      "predict e-scooter brake pad longevity",
      "escooter brake pad weeks remaining",
      "brake pad lifespan forecast scooter",
      "km per pad set longevity",
      "commute brake maintenance schedule",
      "friction pad replacement interval",
    ],
    seo: {
      sections: [
        {
          heading: "Weeks turn km into a service date",
          body: "To predict e-scooter brake pad longevity, divide km per pad set by weekly distance. Two riders with the same route mix but different mileage get identical km life yet very different weeks—high-mileage couriers hit replacement windows faster on the calendar even when regen and hills match a casual commuter.",
        },
        {
          heading: "Longevity is a range, not a guarantee",
          body: "The 1200 km baseline is a planning default for friction pads on typical commuter decks. Wet grit, aggressive lever pressure, and drum vs disc layouts shift real life above or below the forecast—use predicted weeks as an inspection trigger, not a promise that pads survive to the last kilometre.",
        },
        {
          heading: "Stack predictions with maintenance intervals",
          body: "Compare predicted weeks to the maintenance-schedule brake interval (~400 km odometer checks on high-mileage routes). When longevity forecast and odometer interval disagree, trust the earlier date—especially on hilly commutes paired with low regen and high weekly km.",
        },
      ],
    },
    content: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterBrakePadWearLandingSlug,
  EscooterBrakePadWearGuideDefinition
> = {
  [ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_GUIDE,
  [CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG]:
    CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_GUIDE,
  [PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG]:
    PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_GUIDE,
};

/** Landing guide links shown in the E-Scooter Brake Pad Wear tool footer Resources column. */
export const ESCOOTER_BRAKE_PAD_WEAR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Brake Pad Life Calculator",
    },
    {
      slug: CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_LANDING_SLUG,
      href: CALCULATE_BRAKE_PAD_WEAR_FROM_REGEN_SETTINGS_GUIDE_HREF,
      label: "Calculate Brake Pad Wear from Regen Settings",
    },
    {
      slug: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_LANDING_SLUG,
      href: PREDICT_ESCOOTER_BRAKE_PAD_LONGEVITY_GUIDE_HREF,
      label: "Predict E-Scooter Brake Pad Longevity",
    },
  ];

export function isEscooterBrakePadWearLandingSlug(
  slug: string
): slug is EscooterBrakePadWearLandingSlug {
  return (ESCOOTER_BRAKE_PAD_WEAR_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getEscooterBrakePadWearLanding(
  slug: EscooterBrakePadWearLandingSlug = ESCOOTER_BRAKE_PAD_LIFE_CALCULATOR_LANDING_SLUG
): EscooterBrakePadWearGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterBrakePadWearLandings(): EscooterBrakePadWearGuideDefinition[] {
  return ESCOOTER_BRAKE_PAD_WEAR_LANDING_SLUGS.map((slug) =>
    getEscooterBrakePadWearLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_BRAKE_PAD_WEAR_FOOTER_RESOURCES. */
export function getEscooterBrakePadWearToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_BRAKE_PAD_WEAR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_BRAKE_PAD_WEAR_CALCULATOR_ID };
