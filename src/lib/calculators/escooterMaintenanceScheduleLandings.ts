import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_PATH =
  "/tools/e-scooter/escooter-maintenance-schedule/" as const;

export const ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_HREF = getCalculatorHref(
  "escooter-maintenance-schedule",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-maintenance-schedule" as const;

export type EscooterMaintenanceScheduleLandingSlug =
  | "e-scooter-maintenance-schedule-calculator"
  | "electric-scooter-service-interval-tracker"
  | "calculate-e-scooter-maintenance-based-on-mileage";

export const ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG =
  "e-scooter-maintenance-schedule-calculator" as const;

export const ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG =
  "electric-scooter-service-interval-tracker" as const;

export const CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG =
  "calculate-e-scooter-maintenance-based-on-mileage" as const;

export const ESCOOTER_MAINTENANCE_SCHEDULE_LANDING_SLUGS = [
  ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG,
  ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG,
  CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG,
] as const satisfies readonly EscooterMaintenanceScheduleLandingSlug[];

export const ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG);

export const ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_GUIDE_HREF =
  getGuideLandingHref(ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG);

export const CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG);

export type EscooterMaintenanceScheduleGuideDefinition = GuideLandingDefinition & {
  slug: EscooterMaintenanceScheduleLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter maintenance schedule calculator: km until tyre, brake, and bolt-torque intervals plus weeks to tyre service—from odometer and weekly commute distance on shared and private decks.",
  heroSubtitle:
    "Tyre checks, brake inspections, and stem bolt torque all track odometer km—but your calendar runs on weekly distance. This e-scooter maintenance schedule calculator turns odometer and weekly km into km-to-service and weeks until the next tyre interval.",
  benefits: [
    "Next tyre service at 500 km intervals; brake check at 400 km; bolt torque at 200 km.",
    "Km remaining = interval − (odometer mod interval) for each service type.",
    "Weeks to tyre service = next tyre km ÷ weekly km for calendar planning.",
  ],
  howItWorks: [
    "Enter current odometer reading in km.",
    "Set weekly riding distance in km.",
    "Read km until tyre, brake, and bolt services—and weeks to the next tyre check.",
  ],
  faq: [
    {
      q: "What does an e-scooter maintenance schedule calculator show?",
      a: "It forecasts km until three planning intervals: tyre service (~500 km), brake check (~400 km), and bolt torque (~200 km). It also converts next tyre km into weeks using your weekly distance—not a replacement for the manufacturer manual, but a commute calendar.",
    },
    {
      q: "How are km-to-service calculated?",
      a: "Next km = interval − (odometer mod interval). At 320 km odometer: next tyre in 180 km (500 − 320), next brake in 80 km (400 − 320), next bolt torque in 80 km (200 − 120 from mod). Intervals reset each time you pass a multiple of the interval.",
    },
    {
      q: "Example with default inputs?",
      a: "320 km odometer, 50 km/week: next tyre ~180 km (~4 weeks), next brake ~80 km (~2 weeks), next bolt torque ~80 km. Higher weekly km compresses weeks; lower mileage stretches the calendar.",
    },
    {
      q: "Should shared scooters follow the same intervals?",
      a: "Shared fleets often need faster tyre and bolt checks due to folding hinge wear. Use the calculator as a baseline, then tighten intervals if the stem or deck shows play—pair with tire-wear and brake-pad-wear tools for component-specific life.",
    },
  ],
  technicalSpecs: [
    "Tyre interval = 500 km; brake interval = 400 km; bolt interval = 200 km.",
    "Next service km = interval − (odometer km mod interval).",
    "Weeks to tyre = next tyre km ÷ weekly km.",
    "Example: 320 km odometer, 50 km/wk → tyre 180 km (~4 wk).",
    "Related: escooter-tire-wear, escooter-brake-pad-wear, escooter-tire-pressure.",
  ],
};

const ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_GUIDE: EscooterMaintenanceScheduleGuideDefinition =
  {
    slug: ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_HREF,
    guideLinkLabel: "E-scooter maintenance schedule calculator",
    title: "E-Scooter Maintenance Schedule Calculator",
    description:
      ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter maintenance schedule calculator",
      "escooter service interval km",
      "tyre brake bolt torque schedule",
      "scooter maintenance checklist",
      "weeks to tyre service scooter",
      "odometer maintenance planner",
    ],
    seo: {
      sections: [
        {
          heading: "Odometer intervals, weekly calendar",
          body: "An e-scooter maintenance schedule calculator bridges km-based service points and how often you actually ride. The same 180 km to tyre service is ~4 weeks at 50 km/week but ~2 weeks at 80 km/week—weekly km turns distance intervals into reminders that fit a commute rhythm.",
        },
        {
          heading: "Three checkpoints on one odometer",
          body: "Bolt torque at 200 km catches folding stem play early; brake checks at 400 km align with friction pad inspections; tyre service at 500 km pairs with tread and pressure reviews. The tool reports all three from one odometer entry so you do not maintain three separate spreadsheets.",
        },
        {
          heading: "Layer component-specific tools",
          body: "Interval defaults are planning baselines—tire-wear and brake-pad-wear calculators refine when rubber or pads actually expire on your surface and regen mix. Schedule the earlier of interval km and component forecast, especially before wet season or high-mileage months.",
        },
      ],
    },
    content: ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_CONTENT,
  };

const ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electric scooter service interval tracker: km remaining to tyre (500), brake (400), and bolt-torque (200) checkpoints—update odometer weekly to see which service is due first on your commute.",
  heroSubtitle:
    "Interval tracking fails when odometer and weekly km live in different apps. An electric scooter service interval tracker rolls both into km-to-service and weeks until tyre check—re-run after each week of riding to see which checkpoint closes in first.",
  benefits: [
    "Track three intervals from one odometer: tyre 500 km, brake 400 km, bolt 200 km.",
    "See which service is nearest in km—often brake or bolt before tyre on mid-life odometers.",
    "Weeks to tyre converts remaining km into a calendar nudge at your actual weekly distance.",
  ],
  howItWorks: [
    "Log current odometer km after each week or month of riding.",
    "Enter weekly distance—compare next tyre, brake, and bolt km side by side.",
    "Re-run when odometer changes; the smallest km figure is your next tracker alert.",
  ],
  faq: [
    {
      q: "What is an electric scooter service interval tracker?",
      a: "It tracks distance remaining until three service checkpoints derived from odometer modulo intervals: tyre ~500 km, brake ~400 km, bolt torque ~200 km. Weekly km adds weeks-to-tyre for calendar reminders. Update odometer as you ride—intervals reset after each service at that km mark.",
    },
    {
      q: "Which interval usually triggers first?",
      a: "At 320 km odometer: brake and bolt both at ~80 km remaining, tyre at ~180 km—brake/bolt come first. At 480 km: tyre may be next at ~20 km while brake resets to ~320 km after a 400 km pass. The tracker highlights whichever km remaining is smallest.",
    },
    {
      q: "How often should I update the tracker?",
      a: "Weekly commuters: update odometer every 1–2 weeks or after ~50 km. High-mileage riders: after each long trip. Stale odometer makes km-to-service optimistic—pair updates with tire-pressure and visual brake checks.",
    },
    {
      q: "Can I customize interval km?",
      a: "This tool uses planning defaults (500 / 400 / 200 km). Tighten mentally for shared scooters or rough routes; use tire-wear and brake-pad-wear forecasts when component life finishes before the generic interval.",
    },
  ],
  technicalSpecs: [
    "Intervals: tyre 500 km, brake 400 km, bolt torque 200 km.",
    "Remaining km = interval − (odometer mod interval) per type.",
    "Weeks to tyre = next tyre km ÷ weekly km.",
    "320 km odometer, 50 km/wk: brake ~80 km (~1.6 wk), tyre ~180 km (~4 wk).",
    "Related: e-scooter-maintenance-schedule-calculator, escooter-brake-pad-wear.",
  ],
};

const ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_GUIDE: EscooterMaintenanceScheduleGuideDefinition =
  {
    slug: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_GUIDE_HREF,
    toolHref: ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_HREF,
    guideLinkLabel: "Electric scooter service interval tracker",
    title: "Electric Scooter Service Interval Tracker",
    description: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_CONTENT.metaDescription,
    keywords: [
      "electric scooter service interval tracker",
      "escooter maintenance tracker km",
      "tyre brake service due km",
      "odometer interval reminder scooter",
      "bolt torque check schedule",
      "commute maintenance tracker",
    ],
    seo: {
      sections: [
        {
          heading: "Track remaining km, not last service date",
          body: "An electric scooter service interval tracker works from odometer modulo math—each interval fires every N km regardless of calendar month. That matches how tyres and folding hardware actually wear on daily commutes better than a static three-month reminder.",
        },
        {
          heading: "Whichever km is smallest wins",
          body: "Mid-odometer decks often hit brake or bolt checkpoints before tyre service. The tracker surfaces all three remaining distances so you do not overshoot a 80 km brake window while watching a 180 km tyre countdown.",
        },
        {
          heading: "Combine tracker with wear forecasts",
          body: "Interval km is a floor, not a ceiling—abrasive routes may need tyres sooner than 500 km; hilly regen-light routes may need pads earlier than 400 km. Log odometer in the tracker weekly and cross-check brake-pad-wear and tire-wear tools when km remaining drops under ~100.",
        },
      ],
    },
    content: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_CONTENT,
  };

const CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate e-scooter maintenance based on mileage: km until tyre, brake, and bolt services from odometer modulo intervals—convert remaining km to weeks with weekly commute distance.",
    heroSubtitle:
      "Maintenance on electric scooters is mileage-first—tyres, brakes, and folding hardware wear with km, not calendar months alone. Calculate e-scooter maintenance based on mileage by entering odometer and weekly km to see km-to-service and when the next checkpoint lands on your schedule.",
    benefits: [
      "Mileage-based intervals: tyre 500 km, brake 400 km, bolt torque 200 km.",
      "Odometer modulo math yields km remaining per service without manual subtraction.",
      "Weekly km converts mileage remaining into weeks for tyre service planning.",
    ],
    howItWorks: [
      "Enter total odometer km from the app or display.",
      "Add weekly mileage—your average commute km per week.",
      "Read km until each service and weeks to tyre—plan maintenance by distance driven.",
    ],
    faq: [
      {
        q: "How do I calculate e-scooter maintenance based on mileage?",
        a: "Use odometer km with fixed intervals: tyre every ~500 km, brake every ~400 km, bolt torque every ~200 km. Remaining km = interval − (odometer mod interval). Divide next tyre km by weekly km for weeks. Example at 320 km, 50 km/wk: tyre in 180 km (~4 weeks), brake in 80 km.",
      },
      {
        q: "Why mileage instead of months?",
        a: "A scooter ridden 80 km/week hits brake intervals in ~5 weeks; one ridden 15 km/week takes months to reach the same km. Mileage-based calculation matches wear on tyres and pads; weekly km turns the result into a calendar you can actually follow.",
      },
      {
        q: "What if my odometer resets after a repair?",
        a: "Enter the post-repair odometer—intervals restart from that reading. Log services at the km mark (400, 500) so the next modulo cycle aligns with when work was actually done.",
      },
      {
        q: "Do high-mileage riders need shorter intervals?",
        a: "Same km thresholds apply, but weeks between services shrink. Pair mileage math with tire-wear and brake-pad-wear tools—abrasive or hilly routes may need service before the generic km interval.",
      },
    ],
    technicalSpecs: [
      "Mileage intervals: tyre 500 km, brake 400 km, bolt 200 km.",
      "Remaining km = interval − (odometer km mod interval).",
      "Weeks to tyre = remaining tyre km ÷ weekly km.",
      "Example: 320 km odometer, 50 km/wk → 180 / 80 / 80 km to services.",
      "Related: electric-scooter-service-interval-tracker, escooter-tire-wear.",
    ],
  };

const CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_GUIDE: EscooterMaintenanceScheduleGuideDefinition =
  {
    slug: CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_GUIDE_HREF,
    toolHref: ESCOOTER_MAINTENANCE_SCHEDULE_TOOL_HREF,
    guideLinkLabel: "Calculate e-scooter maintenance based on mileage",
    title: "Calculate E-Scooter Maintenance Based on Mileage",
    description:
      CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_CONTENT.metaDescription,
    keywords: [
      "calculate e-scooter maintenance based on mileage",
      "escooter maintenance by km",
      "mileage based service intervals",
      "odometer maintenance calculator scooter",
      "km to tyre brake service",
      "weekly mileage maintenance planner",
    ],
    seo: {
      sections: [
        {
          heading: "Km is the primary wear metric",
          body: "To calculate e-scooter maintenance based on mileage, anchor on odometer—not guesswork dates. Commuter decks accumulate hinge, tyre, and brake wear per kilometre; modulo intervals turn total km into distance remaining until each checkpoint without tracking separate spreadsheets.",
        },
        {
          heading: "Weekly mileage sets the calendar",
          body: "Two riders at 320 km odometer share the same km-to-service, but 50 km/week yields ~4 weeks to tyre while 25 km/week yields ~7. Enter honest weekly mileage so maintenance plans match how fast you actually consume those remaining kilometres.",
        },
        {
          heading: "Mileage math plus component wear",
          body: "Generic 500 / 400 / 200 km defaults are starting points. When tire-wear or brake-pad-wear forecasts finish sooner than interval km, service at the lower mileage figure. Mileage-based calculation tells you when to look; component tools tell you what you will find.",
        },
      ],
    },
    content: CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterMaintenanceScheduleLandingSlug,
  EscooterMaintenanceScheduleGuideDefinition
> = {
  [ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_GUIDE,
  [ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG]:
    ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_GUIDE,
  [CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG]:
    CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_GUIDE,
};

/** Landing guide links shown in the E-Scooter Maintenance Schedule tool footer Resources column. */
export const ESCOOTER_MAINTENANCE_SCHEDULE_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Maintenance Schedule Calculator",
    },
    {
      slug: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_LANDING_SLUG,
      href: ELECTRIC_SCOOTER_SERVICE_INTERVAL_TRACKER_GUIDE_HREF,
      label: "Electric Scooter Service Interval Tracker",
    },
    {
      slug: CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_LANDING_SLUG,
      href: CALCULATE_ESCOOTER_MAINTENANCE_BASED_ON_MILEAGE_GUIDE_HREF,
      label: "Calculate E-Scooter Maintenance Based on Mileage",
    },
  ];

export function isEscooterMaintenanceScheduleLandingSlug(
  slug: string
): slug is EscooterMaintenanceScheduleLandingSlug {
  return (
    ESCOOTER_MAINTENANCE_SCHEDULE_LANDING_SLUGS as readonly string[]
  ).includes(slug);
}

export function getEscooterMaintenanceScheduleLanding(
  slug: EscooterMaintenanceScheduleLandingSlug = ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_LANDING_SLUG
): EscooterMaintenanceScheduleGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterMaintenanceScheduleLandings(): EscooterMaintenanceScheduleGuideDefinition[] {
  return ESCOOTER_MAINTENANCE_SCHEDULE_LANDING_SLUGS.map((slug) =>
    getEscooterMaintenanceScheduleLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_MAINTENANCE_SCHEDULE_FOOTER_RESOURCES. */
export function getEscooterMaintenanceScheduleToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_MAINTENANCE_SCHEDULE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_MAINTENANCE_SCHEDULE_CALCULATOR_ID };
