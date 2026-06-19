import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_TIRE_PRESSURE_TOOL_PATH =
  "/tools/e-scooter/escooter-tire-pressure/" as const;

export const ESCOOTER_TIRE_PRESSURE_TOOL_HREF = getCalculatorHref(
  "escooter-tire-pressure",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-tire-pressure" as const;

export type EscooterTirePressureLandingSlug =
  | "e-scooter-range-vs-tyre-pressure-calculator"
  | "e-scooter-wh-per-km-and-inflation-efficiency-calculator"
  | "calculate-rolling-resistance-for-e-scooter-tyres";

export const ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG =
  "e-scooter-range-vs-tyre-pressure-calculator" as const;

export const ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG =
  "e-scooter-wh-per-km-and-inflation-efficiency-calculator" as const;

export const CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG =
  "calculate-rolling-resistance-for-e-scooter-tyres" as const;

export const ESCOOTER_TIRE_PRESSURE_LANDING_SLUGS = [
  ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG,
  ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG,
  CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG,
] as const satisfies readonly EscooterTirePressureLandingSlug[];

export const ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG);

export const ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(
    ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG
  );

export const CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG);

export type EscooterTirePressureGuideDefinition = GuideLandingDefinition & {
  slug: EscooterTirePressureLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "E-scooter range vs tyre pressure calculator: see how bar below recommendation raises Wh/km on 8–10″ wheels—quantify rolling resistance penalty and km lost before your commute.",
    heroSubtitle:
      "Soft tyres steal range without touching the battery. This e-scooter range vs tyre pressure calculator models how current bar, recommended pressure, wheel size, and rider mass shift watt-hours per kilometre—and the range % you give up.",
    benefits: [
      "Compares current vs. recommended bar for rolling resistance impact.",
      "8–10″ commuter wheels amplify under-inflation losses vs. larger tyres.",
      "Outputs adjusted Wh/km and range penalty % for quick inflation checks.",
    ],
    howItWorks: [
      "Enter current tyre pressure and deck or sidewall recommended bar.",
      "Add wheel diameter (in) and rider mass (kg).",
      "Read adjusted Wh/km and range penalty %—inflate to recover km.",
    ],
    faq: [
      {
        q: "How does tyre pressure affect e-scooter range?",
        a: "Under-inflation widens the contact patch and flexes the carcass each revolution—more Wh per km. On 8–10″ wheels that cyclic loss adds up fast. A few tenths of a bar below recommendation can cost 10–20% effective range on stop-start commutes.",
      },
      {
        q: "What pressure should I use as recommended bar?",
        a: "Use the sticker on the tyre sidewall or the value printed on the deck/mudguard—often 3.0–3.8 bar on 10″ pneumatics. Enter that as recommended bar and your actual reading as current pressure to see the penalty.",
      },
      {
        q: "Do smaller wheels make pressure more important?",
        a: "Yes—more revolutions per kilometre mean more tyre deformation cycles. The calculator applies extra rolling loss below ~9″ diameter. Maintaining pressure is one of the highest ROI maintenance tasks for commuter scooters.",
      },
    ],
    technicalSpecs: [
      "Inputs: current bar, recommended bar, wheel size (in), rider mass (kg).",
      "Under-inflation (bar) = max(0, recommended − current).",
      "Output: adjusted Wh/km and range penalty % vs. properly inflated baseline.",
      "Related: escooter-range, escooter-tire-wear, escooter-maintenance-schedule.",
    ],
  };

const ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_GUIDE: EscooterTirePressureGuideDefinition =
  {
    slug: ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_TIRE_PRESSURE_TOOL_HREF,
    guideLinkLabel: "E-scooter range vs tyre pressure calculator",
    title: "E-Scooter Range vs Tyre Pressure Calculator",
    description:
      ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter range vs tyre pressure calculator",
      "escooter tire pressure range",
      "rolling resistance scooter range",
      "tyre pressure wh per km",
      "under inflated scooter range loss",
    ],
    seo: {
      sections: [
        {
          heading: "Range fights start at the contact patch",
          body: "Brochure range assumes firm tyres and smooth asphalt. An e-scooter range vs tyre pressure calculator isolates the inflation variable—holding rider mass and wheel size steady while bar drops. Riders who blame the pack for mid-week fade often recover kilometres with a pump, not a new battery.",
        },
        {
          heading: "Small wheels multiply rolling loss",
          body: "E-bikes roll larger tyres with lower cyclic flex per metre. Standing on 8–10″ pneumatics raises Wh/km even when pressure is correct; under-inflation makes it worse. Model both pressures in the tool, then cross-check total commute distance with the E-Scooter Range calculator using the same bar values.",
        },
        {
          heading: "Weekly inflation as range maintenance",
          body: "Pneumatic commuter tyres lose air gradually. Logging current bar each Monday and comparing penalty % tracks when range drift is mechanical, not electrical. Pair results with tyre wear and maintenance schedule tools so pressure, tread, and solid-vs-pneumatic choices stay on one commissioning sheet.",
        },
      ],
    },
    content: ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_CONTENT,
  };

const ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "E-scooter Wh/km and inflation efficiency calculator: model watt-hours per kilometre from tyre bar, wheel size, and rider mass—see how proper inflation improves rolling efficiency on commuter scooters.",
    heroSubtitle:
      "Wh/km is the energy tax on every kilometre—inflation sets part of that tax. This e-scooter Wh/km and inflation efficiency calculator shows adjusted Wh/km when pressure drifts below recommendation and the efficiency you recover by reinflating.",
    benefits: [
      "Outputs adjusted Wh/km from current vs. recommended bar.",
      "Rolling multiplier rises with under-inflation and smaller wheel diameter.",
      "Range penalty % quantifies inflation efficiency vs. a firm-tyre baseline.",
    ],
    howItWorks: [
      "Enter current and recommended tyre pressure in bar.",
      "Set wheel diameter (in) and rider mass (kg).",
      "Read Wh/km and penalty %—lower Wh/km means better inflation efficiency.",
    ],
    faq: [
      {
        q: "What is a typical Wh/km for an e-scooter?",
        a: "Commuter planning often starts near 12–15 Wh/km on flat asphalt with firm 10″ tyres and a ~75 kg rider—higher with soft tyres, headwinds, or frequent stops. The calculator scales baseline Wh/km with inflation and mass factors.",
      },
      {
        q: "How does inflation efficiency affect Wh/km?",
        a: "Each bar below recommendation increases rolling resistance multiplier in the model—raising Wh/km. Reinflating to recommended bar lowers Wh/km without changing battery chemistry, improving km per Wh (inflation efficiency).",
      },
      {
        q: "Why does rider mass appear in a Wh/km calculator?",
        a: "Heavier riders increase contact patch load and acceleration work, nudging Wh/km upward. Hold mass constant when A/B testing tyre pressure so inflation efficiency changes are not masked by weight differences.",
      },
    ],
    technicalSpecs: [
      "Adjusted Wh/km scales with rolling multiplier × mass factor.",
      "Under-inflation (bar) = max(0, recommended − current).",
      "Smaller wheels (<9 in) add extra rolling loss in the model.",
      "Related: e-scooter-range-vs-tyre-pressure-calculator, escooter-range.",
    ],
  };

const ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_GUIDE: EscooterTirePressureGuideDefinition =
  {
    slug: ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_TIRE_PRESSURE_TOOL_HREF,
    guideLinkLabel: "E-scooter Wh/km and inflation efficiency calculator",
    title: "E-Scooter Wh/km and Inflation Efficiency Calculator",
    description:
      ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter wh/km and inflation efficiency calculator",
      "escooter wh per km calculator",
      "tyre inflation efficiency scooter",
      "rolling resistance wh per km",
      "scooter energy per kilometre",
    ],
    seo: {
      sections: [
        {
          heading: "Wh/km is the commuter efficiency scorecard",
          body: "Kilometres per charge is what riders feel; Wh/km is what planners measure. An e-scooter Wh/km and inflation efficiency calculator makes the energy cost of each kilometre visible—then shows how many extra watt-hours soft tyres add. Fleet operators comparing routes should log Wh/km at known pressure, not only end-of-day SOC.",
        },
        {
          heading: "Inflation efficiency is free range",
          body: "Motor upgrades and new packs cost money; restoring recommended bar costs minutes. When Wh/km drops after reinflation, you have improved inflation efficiency—the same pack travels farther per charge. Track before-and-after Wh/km readings weekly to catch slow leaks before they dominate your energy budget.",
        },
        {
          heading: "Combine Wh/km with total range planning",
          body: "Multiply usable pack Wh by inverse Wh/km for distance estimates—or use the E-Scooter Range calculator with matching pressure inputs. Wh/km from this tool feeds the rolling-assumption line in commute spreadsheets so tyre maintenance stays tied to energy math, not guesswork.",
        },
      ],
    },
    content: ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_CONTENT,
  };

const CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate rolling resistance for e-scooter tyres: model loss from under-inflation, wheel diameter, and rider mass—translate bar deficit into Wh/km penalty on 8–10″ commuter pneumatics.",
    heroSubtitle:
      "Rolling resistance is the drag you pay every revolution—higher when tyres are soft or small. This guide shows how to calculate rolling resistance for e-scooter tyres using pressure, wheel size, and mass inputs from the tyre pressure tool.",
    benefits: [
      "Rolling multiplier rises with bar below recommendation.",
      "8″ vs. 10″ wheel diameter shifts baseline loss in the model.",
      "Links rolling resistance to Wh/km and commute range impact.",
    ],
    howItWorks: [
      "Measure current bar and note recommended pressure from the tyre or deck.",
      "Enter wheel diameter (in) and rider mass (kg).",
      "Read adjusted Wh/km and range penalty %—proxy for rolling resistance cost.",
    ],
    faq: [
      {
        q: "How do I calculate rolling resistance for e-scooter tyres?",
        a: "In planning terms, compare Wh/km at current pressure vs. recommended bar. Under-inflation increases a rolling multiplier in the model—each bar below target raises energy per km. The tool outputs Wh/km and penalty % as practical rolling-resistance indicators.",
      },
      {
        q: "Why is rolling resistance worse on small scooter wheels?",
        a: "More revolutions per kilometre mean more tyre carcass flex cycles. Contact patch squirm and casing hysteresis scale with under-inflation. The calculator adds extra loss below ~9″ diameter—matching many 8″ solid and pneumatic commuter setups.",
      },
      {
        q: "Do solid tyres eliminate rolling resistance?",
        a: "Solid honeycomb or rubber tyres avoid pressure loss but often run higher baseline rolling loss than firm pneumatics. Use recommended bar on pneumatics as the efficiency benchmark; compare Wh/km before switching tyre types.",
      },
    ],
    technicalSpecs: [
      "Rolling loss proxy: Wh/km vs. firm-tyre baseline at same mass.",
      "Under-inflation (bar) = max(0, recommended − current).",
      "Wheel size (in) and rider mass (kg) adjust the model.",
      "Related: escooter-tire-pressure, escooter-range, escooter-tire-wear.",
    ],
  };

const CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_GUIDE: EscooterTirePressureGuideDefinition =
  {
    slug: CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_GUIDE_HREF,
    toolHref: ESCOOTER_TIRE_PRESSURE_TOOL_HREF,
    guideLinkLabel: "Calculate rolling resistance for e-scooter tyres",
    title: "Calculate Rolling Resistance for E-Scooter Tyres",
    description:
      CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_CONTENT.metaDescription,
    keywords: [
      "calculate rolling resistance for e-scooter tyres",
      "escooter rolling resistance calculator",
      "scooter tyre rolling loss",
      "10 inch tyre resistance",
      "under inflation rolling drag",
    ],
    seo: {
      sections: [
        {
          heading: "Rolling resistance is energy lost to the tyre",
          body: "Not all battery drain pushes the rider forward—some flexes rubber and warms the carcass. To calculate rolling resistance for e-scooter tyres in commute planning, track how Wh/km shifts when bar changes while route and mass stay fixed. That delta isolates mechanical drag from riding style or wind.",
        },
        {
          heading: "Pressure is the fastest rolling-resistance knob",
          body: "Aerodynamic drag rises with speed, but at urban cruise speeds rolling loss still matters—especially on 8–10″ wheels. Restoring recommended bar often beats eco-mode tweaks for Wh/km improvement. Log pressure weekly; treat a climbing Wh/km trend as a maintenance signal before blaming motor or BMS.",
        },
        {
          heading: "From rolling loss to route range",
          body: "Once rolling resistance is bracketed via Wh/km, feed the number into total commute distance math with the E-Scooter Range calculator. Tyre wear and maintenance tools complete the picture—tread squirm and solid-tyre compounds change baseline resistance over the life of the scooter.",
        },
      ],
    },
    content: CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterTirePressureLandingSlug,
  EscooterTirePressureGuideDefinition
> = {
  [ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_GUIDE,
  [ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_GUIDE,
  [CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG]:
    CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_GUIDE,
};

/** Landing guide links shown in the E-Scooter Tyre Pressure tool footer Resources column. */
export const ESCOOTER_TIRE_PRESSURE_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Range vs Tyre Pressure Calculator",
    },
    {
      slug: ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_WH_PER_KM_AND_INFLATION_EFFICIENCY_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Wh/km and Inflation Efficiency Calculator",
    },
    {
      slug: CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_LANDING_SLUG,
      href: CALCULATE_ROLLING_RESISTANCE_FOR_ESCOOTER_TYRES_GUIDE_HREF,
      label: "Calculate Rolling Resistance for E-Scooter Tyres",
    },
  ];

export function isEscooterTirePressureLandingSlug(
  slug: string
): slug is EscooterTirePressureLandingSlug {
  return (ESCOOTER_TIRE_PRESSURE_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getEscooterTirePressureLanding(
  slug: EscooterTirePressureLandingSlug = ESCOOTER_RANGE_VS_TYRE_PRESSURE_CALCULATOR_LANDING_SLUG
): EscooterTirePressureGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterTirePressureLandings(): EscooterTirePressureGuideDefinition[] {
  return ESCOOTER_TIRE_PRESSURE_LANDING_SLUGS.map((slug) =>
    getEscooterTirePressureLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_TIRE_PRESSURE_FOOTER_RESOURCES. */
export function getEscooterTirePressureToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_TIRE_PRESSURE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_TIRE_PRESSURE_CALCULATOR_ID };
