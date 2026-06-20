import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_TIRE_WEAR_TOOL_PATH =
  "/tools/e-scooter/escooter-tire-wear/" as const;

export const ESCOOTER_TIRE_WEAR_TOOL_HREF = getCalculatorHref(
  "escooter-tire-wear",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-tire-wear" as const;

export type EscooterTireWearLandingSlug =
  | "e-scooter-tyre-wear-life-calculator"
  | "estimate-e-scooter-tyre-life-in-kilometers"
  | "calculate-tyre-lifespan-based-on-riding-surface";

export const ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG =
  "e-scooter-tyre-wear-life-calculator" as const;

export const ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG =
  "estimate-e-scooter-tyre-life-in-kilometers" as const;

export const CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG =
  "calculate-tyre-lifespan-based-on-riding-surface" as const;

export const ESCOOTER_TIRE_WEAR_LANDING_SLUGS = [
  ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG,
  ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG,
  CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG,
] as const satisfies readonly EscooterTireWearLandingSlug[];

export const ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG
);

export const ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG);

export const CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG);

export type EscooterTireWearGuideDefinition = GuideLandingDefinition & {
  slug: EscooterTireWearLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter tyre wear life calculator: estimate tread life in km and weeks from weekly distance, usable tread depth (mm), and surface type—smooth asphalt vs. urban mixed vs. rough brick.",
  heroSubtitle:
    "Solid honeycomb and pneumatic commuter tyres wear faster on brick and rough tile than smooth asphalt. This e-scooter tyre wear life calculator turns weekly km, tread depth, and surface into total km life and weeks until replacement.",
  benefits: [
    "Surface presets scale wear: smooth asphalt, urban mixed, and rough/brick routes.",
    "Usable tread depth (mm) × km/mm baseline yields total tread life in kilometres.",
    "Weekly distance converts km life into weeks remaining for maintenance planning.",
  ],
  howItWorks: [
    "Enter weekly riding distance in km.",
    "Set usable tread depth in mm (often ~1.5 mm on solid or pneumatic commuters).",
    "Select primary surface type—read total km life and weeks until the tread is spent.",
  ],
  faq: [
    {
      q: "What does an e-scooter tyre wear life calculator estimate?",
      a: "It estimates how many kilometres of tread life remain based on weekly distance, usable tread depth, and how abrasive your primary surface is. Output is total km life and weeks until replacement—not range or battery health.",
    },
    {
      q: "Why does surface type change tyre life so much?",
      a: "Rough brick, pavers, and coarse tile accelerate abrasion on small 8–10″ wheels. The model applies a wear factor: smooth asphalt is the baseline, urban mixed adds moderate wear, rough/brick routes wear tyres fastest.",
    },
    {
      q: "What tread depth should I enter?",
      a: "Use the usable tread you expect to ride through before replacement—often ~1.5 mm on solid honeycomb or pneumatic commuters. Measure or estimate from new depth minus the minimum you consider safe.",
    },
    {
      q: "Do solid tyres last longer than pneumatics?",
      a: "Solid tyres avoid punctures but often wear faster on abrasive surfaces due to compound and contact patch squirm. Enter your actual tread depth and surface; compare scenarios rather than assuming one tyre type always wins.",
    },
  ],
  technicalSpecs: [
    "Inputs: weekly distance (km), usable tread depth (mm), primary surface.",
    "km/mm ≈ 450 ÷ surface wear factor (smooth 1.0, urban 1.35, rough 1.8).",
    "Total km life = km/mm × tread depth (mm).",
    "Example: 50 km/wk, 1.5 mm, urban → ~500 km, ~10 weeks.",
    "Related: escooter-tire-pressure, escooter-maintenance-schedule, escooter-brake-pad-wear.",
  ],
};

const ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_GUIDE: EscooterTireWearGuideDefinition = {
  slug: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "escooter",
  href: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_GUIDE_HREF,
  toolHref: ESCOOTER_TIRE_WEAR_TOOL_HREF,
  guideLinkLabel: "E-scooter tyre wear life calculator",
  title: "E-Scooter Tyre Wear Life Calculator",
  description: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "e-scooter tyre wear life calculator",
    "escooter tire wear",
    "solid tyre life km",
    "scooter tread life weeks",
    "urban tyre wear scooter",
    "honeycomb tyre lifespan",
  ],
  seo: {
    sections: [
      {
        heading: "Small wheels, high revolutions per km",
        body: "E-scooter tyres complete more rotations per kilometre than bicycle tyres. An e-scooter tyre wear life calculator makes that maintenance cost visible: the same compound on brick pavers may deliver half the km life of smooth asphalt—even when range and battery health look fine.",
      },
      {
        heading: "Surface is the hidden wear multiplier",
        body: "Commuters who switch from a smooth bike lane to cobblestone or rough plaza tile often blame under-inflation first. Surface presets in the tool isolate abrasion: log your dominant route surface weekly and compare km life before blaming the pack or motor.",
      },
      {
        heading: "From km life to maintenance schedule",
        body: "Convert total km life into weeks with your actual weekly distance, then align with the maintenance schedule and tyre-pressure tools. Worn tread raises rolling resistance and Wh/km—replacing on a km plan beats waiting for visible flats or vibration mid-commute.",
      },
    ],
  },
  content: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_CONTENT,
};

const ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate e-scooter tyre life in kilometers: total tread km from usable depth (mm), surface wear factor, and 450 km/mm baseline—smooth asphalt vs. urban mixed vs. rough brick on 8–10″ wheels.",
  heroSubtitle:
    "Fleet logs track battery cycles; tyres die in kilometres of abrasion. This guide shows how to estimate e-scooter tyre life in kilometers from tread depth and route surface—before the odometer outruns the compound.",
  benefits: [
    "Outputs total tread life in km—the primary metric for solid and pneumatic replacement planning.",
    "Surface wear factor scales km/mm: smooth ~450, urban ~333, rough/brick ~250 per mm of tread.",
    "Pair km life with weekly distance in the tool to translate into weeks when needed.",
  ],
  howItWorks: [
    "Measure or estimate usable tread depth in mm before replacement.",
    "Select primary surface: smooth asphalt, urban mixed, or rough/brick.",
    "Read total km life = (450 ÷ wear factor) × tread depth—or use the interactive calculator.",
  ],
  faq: [
    {
      q: "How do I estimate e-scooter tyre life in kilometers?",
      a: "Multiply km per millimetre of tread by usable tread depth. The model uses km/mm ≈ 450 ÷ surface wear factor. On urban mixed surfaces with 1.5 mm usable tread: (450 ÷ 1.35) × 1.5 ≈ 500 km total life.",
    },
    {
      q: "What is the 450 km/mm baseline?",
      a: "It is a planning reference for smooth asphalt—roughly how many kilometres one millimetre of tread lasts before surface multipliers. Urban mixed divides by 1.35; rough/brick by 1.8, shortening km life per mm.",
    },
    {
      q: "Should I track km life or weeks?",
      a: "Kilometres match odometer and maintenance intervals directly. Weeks help calendar reminders when weekly distance is steady. The tool outputs both; this guide emphasises the km number for route and surface comparisons.",
    },
    {
      q: "Why do my tyres fail before the estimated km?",
      a: "Skidding, curb strikes, under-inflation on pneumatics, and mixed surfaces on one route shorten life. Re-run the estimate with rough/brick if part of your commute is abrasive, and inspect tread monthly on high-mileage decks.",
    },
  ],
  technicalSpecs: [
    "Total km = (450 ÷ wear factor) × tread depth (mm).",
    "Wear factors: smooth 1.0, urban mixed 1.35, rough/brick 1.8.",
    "Examples at 1.5 mm tread: smooth ~675 km, urban ~500 km, rough ~375 km.",
    "Weekly km optional for weeks remaining = total km ÷ weekly km.",
    "Related: e-scooter-tyre-wear-life-calculator, escooter-tire-pressure, escooter-maintenance-schedule.",
  ],
};

const ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_GUIDE: EscooterTireWearGuideDefinition =
  {
    slug: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_GUIDE_HREF,
    toolHref: ESCOOTER_TIRE_WEAR_TOOL_HREF,
    guideLinkLabel: "Estimate e-scooter tyre life in kilometers",
    title: "Estimate E-Scooter Tyre Life in Kilometers",
    description: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_CONTENT.metaDescription,
    keywords: [
      "estimate e-scooter tyre life in kilometers",
      "escooter tyre life km",
      "tread life kilometres",
      "solid tyre km lifespan",
      "scooter tyre wear km",
      "450 km per mm tread",
    ],
    seo: {
      sections: [
        {
          heading: "Kilometres are the honest wear metric",
          body: "Battery health is measured in cycles; tyres are measured in ground covered. To estimate e-scooter tyre life in kilometers, anchor on usable tread depth and how abrasive your dominant surface is. Odometer km then tells you when you are approaching replacement—not when the app says range dropped.",
        },
        {
          heading: "Compare surfaces in km, not feelings",
          body: "A rider on smooth asphalt may see ~675 km from 1.5 mm tread; the same depth on rough brick may land near ~375 km. Logging surface type once beats guessing from vibration alone. Switch presets when your commute season changes—winter detours through pavers cost km.",
        },
        {
          heading: "From km estimate to replacement timing",
          body: "Set a replacement trigger at 80–90 % of estimated km life and inspect tread visually at 500 km intervals on abrasive routes. Feed the same km assumptions into maintenance schedule and tyre-pressure tools so rolling resistance does not silently tax range before you swap tyres.",
        },
      ],
    },
    content: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_CONTENT,
  };

const CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate tyre lifespan based on riding surface: compare smooth asphalt, urban mixed, and rough/brick wear factors on e-scooter tread life—km and weeks from the same tread depth and weekly distance.",
    heroSubtitle:
      "The same honeycomb or pneumatic tyre can last twice as long on smooth asphalt as on brick pavers. This guide shows how to calculate tyre lifespan based on riding surface using wear-factor presets in the e-scooter tyre wear tool.",
    benefits: [
      "Three surface presets isolate abrasion: smooth (1.0×), urban mixed (1.35×), rough/brick (1.8×).",
      "Same tread depth yields different total km life per surface—compare routes side by side.",
      "Weekly km converts surface-adjusted km life into weeks for calendar maintenance.",
    ],
    howItWorks: [
      "Identify your dominant commute surface—not the best segment, the abrasive one.",
      "Enter usable tread depth (mm) and weekly distance in the calculator.",
      "Switch surface preset and compare total km life and weeks until replacement.",
    ],
    faq: [
      {
        q: "How do I calculate tyre lifespan based on riding surface?",
        a: "Select the surface preset that matches your route. The model sets km/mm ≈ 450 ÷ wear factor, then multiplies by tread depth for total km life. Urban mixed (1.35×) wears ~26 % faster than smooth asphalt; rough/brick (1.8×) about 80 % faster.",
      },
      {
        q: "Which surface preset should I choose for mixed commutes?",
        a: "Use the most abrasive surface you ride regularly—even 20 % of distance on brick can dominate wear on small wheels. When in doubt, pick urban mixed or rough and inspect tread early rather than over-estimating life.",
      },
      {
        q: "Why does brick wear e-scooter tyres faster?",
        a: "Coarse texture and sharp edges abrade rubber and honeycomb compounds quickly. Small 8–10″ wheels also scrub laterally on uneven pavers. The rough/brick preset reflects that higher abrasion rate in the wear factor.",
      },
      {
        q: "Does surface affect rolling resistance too?",
        a: "Yes—rough surfaces often raise Wh/km alongside wear. After calculating lifespan by surface, cross-check range impact with the tyre-pressure calculator using the same route assumptions.",
      },
    ],
    technicalSpecs: [
      "Wear factor: smooth 1.0, urban mixed 1.35, rough/brick 1.8.",
      "km/mm = 450 ÷ wear factor; total km = km/mm × tread depth (mm).",
      "At 1.5 mm tread: smooth ~675 km, urban ~500 km, rough ~375 km.",
      "Weeks = total km ÷ weekly km (same surface assumption).",
      "Related: estimate-e-scooter-tyre-life-in-kilometers, escooter-tire-pressure.",
    ],
  };

const CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_GUIDE: EscooterTireWearGuideDefinition =
  {
    slug: CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_GUIDE_HREF,
    toolHref: ESCOOTER_TIRE_WEAR_TOOL_HREF,
    guideLinkLabel: "Calculate tyre lifespan based on riding surface",
    title: "Calculate Tyre Lifespan Based on Riding Surface",
    description:
      CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_CONTENT.metaDescription,
    keywords: [
      "calculate tyre lifespan based on riding surface",
      "escooter tyre surface wear",
      "brick vs asphalt tyre life",
      "rough surface scooter tyres",
      "urban mixed tyre wear",
      "riding surface tread life",
    ],
    seo: {
      sections: [
        {
          heading: "Surface sets the wear multiplier",
          body: "Tyre compound and tread depth set capacity; riding surface sets the burn rate. To calculate tyre lifespan based on riding surface, apply the wear factor that matches where your wheels actually roll—not the one smooth bike lane on an otherwise gritty commute.",
        },
        {
          heading: "When to bump up to rough/brick",
          body: "Historic districts, loading docks, and plaza tile often hide in otherwise urban routes. If you hear coarse grit through the deck weekly, model rough/brick even if asphalt dominates distance. Replacement surprises usually trace to underestimated abrasion, not bad batteries.",
        },
        {
          heading: "Surface planning across seasons",
          body: "Winter detours, construction diversions, and wet cobble change effective surface mid-year. Re-run the calculator when your route changes—log km life at each preset on the same tread depth to build a personal surface sensitivity chart for fleet or shared-scooter programs.",
        },
      ],
    },
    content: CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterTireWearLandingSlug,
  EscooterTireWearGuideDefinition
> = {
  [ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_GUIDE,
  [ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG]:
    ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_GUIDE,
  [CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG]:
    CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_GUIDE,
};

/** Landing guide links shown in the E-Scooter Tyre Wear tool footer Resources column. */
export const ESCOOTER_TIRE_WEAR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Tyre Wear Life Calculator",
    },
    {
      slug: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_LANDING_SLUG,
      href: ESTIMATE_ESCOOTER_TYRE_LIFE_IN_KILOMETERS_GUIDE_HREF,
      label: "Estimate E-Scooter Tyre Life in Kilometers",
    },
    {
      slug: CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_LANDING_SLUG,
      href: CALCULATE_TYRE_LIFESPAN_BASED_ON_RIDING_SURFACE_GUIDE_HREF,
      label: "Calculate Tyre Lifespan Based on Riding Surface",
    },
  ];

export function isEscooterTireWearLandingSlug(
  slug: string
): slug is EscooterTireWearLandingSlug {
  return (ESCOOTER_TIRE_WEAR_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEscooterTireWearLanding(
  slug: EscooterTireWearLandingSlug = ESCOOTER_TYRE_WEAR_LIFE_CALCULATOR_LANDING_SLUG
): EscooterTireWearGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterTireWearLandings(): EscooterTireWearGuideDefinition[] {
  return ESCOOTER_TIRE_WEAR_LANDING_SLUGS.map((slug) =>
    getEscooterTireWearLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_TIRE_WEAR_FOOTER_RESOURCES. */
export function getEscooterTireWearToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_TIRE_WEAR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_TIRE_WEAR_CALCULATOR_ID };
