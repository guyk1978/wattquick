import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const DC_CABLE_SIZE_TOOL_PATH =
  "/tools/battery-sizing/dc-cable-size/" as const;

export const DC_CABLE_SIZE_TOOL_HREF = getCalculatorHref(
  "dc-cable-size",
  "sizing"
);

const BASE_CALCULATOR_ID = "dc-cable-size" as const;

export type DcCableSizeLandingSlug =
  | "dc-cable-size-calculator"
  | "calculate-wire-gauge-for-dc-voltage-drop"
  | "dc-wire-gauge-and-current-capacity-estimator";

export const DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG =
  "dc-cable-size-calculator" as const;

export const CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG =
  "calculate-wire-gauge-for-dc-voltage-drop" as const;

export const DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG =
  "dc-wire-gauge-and-current-capacity-estimator" as const;

export const DC_CABLE_SIZE_LANDING_SLUGS = [
  DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG,
  CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG,
  DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly DcCableSizeLandingSlug[];

export const DC_CABLE_SIZE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG);

export const DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG);

export type DcCableSizeGuideDefinition = GuideLandingDefinition & {
  slug: DcCableSizeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const DC_CABLE_SIZE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "DC cable size calculator: recommend AWG from load amps, one-way run length, and system voltage—check ampacity and approximate voltage drop for battery and solar DC wiring.",
  heroSubtitle:
    "Undersized DC wire heats up and sags voltage at the inverter or controller. This DC cable size calculator takes current, one-way length, and bus voltage to suggest a conservative AWG with an estimated drop percentage for planning.",
  benefits: [
    "Picks AWG from ampacity tables for your load current.",
    "Checks ~3% voltage drop over the run length.",
    "Works for 12 V, 24 V, and 48 V battery buses.",
  ],
  howItWorks: [
    "Enter steady or peak DC load current in amps.",
    "Add one-way cable length in feet and system voltage.",
    "Read recommended AWG and approximate voltage drop %.",
  ],
  faq: [
    {
      q: "How does a DC cable size calculator work?",
      a: "It selects the smallest standard AWG that carries your amps per conservative ampacity tables, then estimates voltage drop over round-trip resistance (out and back). Example: 40 A, 20 ft one-way, 12 V often lands near 4–6 AWG depending on drop target—verify with the tool for your exact inputs.",
    },
    {
      q: "One-way or round-trip length?",
      a: "Enter one-way distance from battery to load. Drop math doubles the length internally for positive and negative conductors. Measuring only half the loop understates resistance and oversizes wire optimistically.",
    },
    {
      q: "When should I go one AWG size larger?",
      a: "Inverter surge, lithium charge spikes, or long runs near 3% drop often warrant the next size up. Aluminum conductors need larger gauge than copper. Follow local electrical code for final installs—this calculator is for planning estimates.",
    },
  ],
  technicalSpecs: [
    "Input: load_A, one-way_length_ft, system_V.",
    "Output: recommended AWG + ~% voltage drop.",
    "Drop uses round-trip copper resistance.",
    "Related: dc-cable-size, dc-cable-voltage-drop, watts-to-amps.",
  ],
};

const DC_CABLE_SIZE_CALCULATOR_GUIDE: DcCableSizeGuideDefinition = {
  slug: DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "sizing",
  href: DC_CABLE_SIZE_CALCULATOR_GUIDE_HREF,
  toolHref: DC_CABLE_SIZE_TOOL_HREF,
  guideLinkLabel: "DC cable size calculator",
  title: "DC Cable Size Calculator",
  description: DC_CABLE_SIZE_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "dc cable size calculator",
    "dc wire size calculator",
    "battery cable gauge calculator",
    "awg dc wire sizing",
    "12v dc cable size",
  ],
  seo: {
    sections: [
      {
        heading: "Amps and length drive gauge—not voltage alone",
        body: "A DC cable size calculator needs load current and how far electrons travel. Higher amps need thicker copper; longer runs add resistance even at modest current. System voltage sets how many volts you can afford to lose—3% on 12 V is tighter than 3% on 48 V for the same absolute drop.",
      },
      {
        heading: "Ampacity first, voltage drop second",
        body: "The tool picks a gauge that can carry the current without overheating, then reports approximate drop over your one-way length. If drop is high, step up one AWG even when ampacity barely passes—inverters and motors see sag as brownouts or nuisance trips at the DC bus.",
      },
      {
        heading: "Battery bank to inverter is the critical run",
        body: "Size the heaviest DC segment: bank to inverter, controller to array, or winch feed. Convert load watts to amps with Watts to Amps when only nameplate watts are known. For manual drop on a chosen gauge, pair with DC Cable Size & Voltage Drop when you already picked a spool from stock.",
      },
    ],
  },
  content: DC_CABLE_SIZE_CALCULATOR_CONTENT,
};

const CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate wire gauge for DC voltage drop: enter amps, one-way length, and system V—get AWG that limits drop near 3% on battery, solar, and inverter DC runs.",
  heroSubtitle:
    "Voltage drop steals headroom at the load—especially on 12 V and long runs. This guide shows how to calculate wire gauge for DC voltage drop from current, cable length, and bus voltage so inverters and controllers see stable DC.",
  benefits: [
    "Targets ~3% drop as a common DC planning limit.",
    "Uses round-trip resistance for out-and-back conductors.",
    "Pairs ampacity check with drop on the recommended AWG.",
  ],
  howItWorks: [
    "Enter DC load current and one-way cable distance.",
    "Add system voltage (12 V, 24 V, 48 V, etc.).",
    "Read AWG recommendation and estimated drop percent.",
  ],
  faq: [
    {
      q: "How do I calculate wire gauge for DC voltage drop?",
      a: "Drop % ≈ (2 × I × R × length) ÷ V × 100 for round-trip copper (I in amps, length one-way in feet, V system voltage). Pick the smallest AWG whose resistance keeps drop near 3%. The DC Cable Size tool applies ampacity tables first, then reports drop for the suggested gauge.",
    },
    {
      q: "Why is 3% drop common for DC wiring?",
      a: "On 12 V, 3% is ~0.36 V—meaningful for inverter low-voltage cutoff. On 48 V, 3% allows ~1.4 V loss with more headroom. Tighter drops (1–2%) help sensitive loads; longer runs or high current often need larger AWG than ampacity alone.",
    },
    {
      q: "Does temperature affect gauge choice for drop?",
      a: "Copper resistance rises when hot—field runs in engine bays or roof conduit see higher drop than cold calculations. If measured drop is borderline, step up one AWG or shorten the run. For temperature-adjusted resistance math, see Conductor Resistance at Temperature.",
    },
  ],
  technicalSpecs: [
    "Drop % ∝ I × R_wire × length / V.",
    "Round-trip: double one-way length for + and −.",
    "Planning target: ~3% on many DC installs.",
    "Related: dc-cable-size, dc-cable-voltage-drop, conductor-resistance-temperature.",
  ],
};

const CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_GUIDE: DcCableSizeGuideDefinition =
  {
    slug: CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "sizing",
    href: CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_GUIDE_HREF,
    toolHref: DC_CABLE_SIZE_TOOL_HREF,
    guideLinkLabel: "Calculate wire gauge for DC voltage drop",
    title: "Calculate Wire Gauge for DC Voltage Drop",
    description:
      CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_CONTENT.metaDescription,
    keywords: [
      "calculate wire gauge for dc voltage drop",
      "dc voltage drop wire size",
      "awg for 3 percent voltage drop",
      "battery cable voltage drop calculator",
      "dc wire drop 12v",
    ],
    seo: {
      sections: [
        {
          heading: "Drop is current times resistance over distance",
          body: "To calculate wire gauge for DC voltage drop, model the loop: amps through copper resistance over round-trip length. Thin wire on a long 12 V feed can lose a volt before the inverter—enough to throttle output or trip BMS warnings. Higher system voltage tolerates the same absolute volt loss as a smaller percentage.",
        },
        {
          heading: "Gauge up until drop fits the budget",
          body: "Start from load amps, then try standard AWG sizes until drop falls near your target—often 3% for DC planning. Ampacity still matters: a gauge that passes drop but not current is unsafe. The calculator balances both so the recommended AWG carries the amps and reports approximate drop for documentation.",
        },
        {
          heading: "Document drop on the as-built sketch",
          body: "Note calculated drop % on one-line diagrams beside fuse ratings and cable lengths. If field measurements exceed estimates, check connections, crimps, and parallel path length. For array homeruns with MPPT input limits, cross-check with DC Cable Size & Voltage Drop when you need drop on a pre-selected spool gauge.",
        },
      ],
    },
    content: CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_CONTENT,
  };

const DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "DC wire gauge and current capacity estimator: project AWG from load amps, run length, and system voltage—estimate ampacity headroom and voltage drop before ordering battery and inverter DC cable.",
    heroSubtitle:
      "Gauge charts list max amps per AWG; field installs also fight length and drop. This DC wire gauge and current capacity estimator combines current, one-way distance, and bus voltage into a recommended gauge with capacity and drop context for planning.",
    benefits: [
      "Estimates AWG from DC load current against ampacity tables.",
      "Factors run length and voltage into the recommendation.",
      "Surfaces approximate drop % alongside capacity planning.",
    ],
    howItWorks: [
      "Estimate steady or peak DC amps on the conductor.",
      "Enter one-way length and system voltage.",
      "Read estimated AWG—confirm fuse and breaker ratings match.",
    ],
    faq: [
      {
        q: "What does a DC wire gauge and current capacity estimator do?",
        a: "It projects the smallest standard AWG that can carry your DC amps per conservative ampacity, then checks approximate voltage drop over your run. Example: estimating 60 A on a 15 ft one-way 24 V feed → often 6–4 AWG class depending on drop—use the tool for exact inputs.",
      },
      {
        q: "Is current capacity the same as ampacity?",
        a: "Yes in planning terms—how many amps the gauge can carry without excess heat. Continuous inverter loads may need 125% margin per code; surge loads may be brief but still heat terminals. Step up one AWG when capacity is borderline or ambient temperature is high.",
      },
      {
        q: "How do I estimate amps before sizing gauge?",
        a: "Use nameplate DC input amps, BMS discharge limit, or watts ÷ volts from Watts to Amps. Size to the higher of continuous draw and expected charge current on shared bus bars. Re-estimate when you add parallel strings or upgrade the inverter.",
      },
    ],
    technicalSpecs: [
      "Capacity: AWG max amps ≥ load_I (conservative table).",
      "Drop check: round-trip R × I / V.",
      "Copper conductors assumed—aluminum needs larger gauge.",
      "Related: dc-cable-size, watts-to-amps, battery-bank-size.",
    ],
  };

const DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_GUIDE: DcCableSizeGuideDefinition =
  {
    slug: DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "sizing",
    href: DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_GUIDE_HREF,
    toolHref: DC_CABLE_SIZE_TOOL_HREF,
    guideLinkLabel: "DC wire gauge and current capacity estimator",
    title: "DC Wire Gauge and Current Capacity Estimator",
    description:
      DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "dc wire gauge and current capacity estimator",
      "dc wire ampacity calculator",
      "estimate awg from dc amps",
      "battery cable current capacity",
      "dc conductor sizing estimator",
    ],
    seo: {
      sections: [
        {
          heading: "Capacity and drop both gate gauge choice",
          body: "A DC wire gauge and current capacity estimator starts from how many amps must flow safely—ampacity sets a floor on copper area. Length and voltage then test whether that gauge also keeps drop acceptable. Thin wire that barely passes amps on paper can still fail in service when the run is long or the bus is 12 V.",
        },
        {
          heading: "Estimate before the BOM is frozen",
          body: "Early estimates seed cable schedules and lug orders. Enter projected inverter draw or charge current, sketch one-way length, and read a gauge class. Replace estimates with measured amps after commissioning—clamp meters on the DC feed often differ from nameplate when loads are diversified.",
        },
        {
          heading: "Terminal and fuse ratings complete the picture",
          body: "Gauge capacity must align with fuse or breaker amp rating and lug temperature limits. Oversized fuses on undersized wire defeat protection; undersized lugs on thick wire add resistance. Document estimated gauge on the diagram, then verify code, insulation temperature, and manufacturer torque specs before energizing.",
        },
      ],
    },
    content: DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  DcCableSizeLandingSlug,
  DcCableSizeGuideDefinition
> = {
  [DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG]: DC_CABLE_SIZE_CALCULATOR_GUIDE,
  [CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG]:
    CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_GUIDE,
  [DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG]:
    DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the DC Cable Size tool footer Resources column. */
export const DC_CABLE_SIZE_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG,
    href: DC_CABLE_SIZE_CALCULATOR_GUIDE_HREF,
    label: "DC Cable Size Calculator",
  },
  {
    slug: CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_LANDING_SLUG,
    href: CALCULATE_WIRE_GAUGE_FOR_DC_VOLTAGE_DROP_GUIDE_HREF,
    label: "Calculate Wire Gauge for DC Voltage Drop",
  },
  {
    slug: DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_LANDING_SLUG,
    href: DC_WIRE_GAUGE_AND_CURRENT_CAPACITY_ESTIMATOR_GUIDE_HREF,
    label: "DC Wire Gauge and Current Capacity Estimator",
  },
];

export function isDcCableSizeLandingSlug(
  slug: string
): slug is DcCableSizeLandingSlug {
  return (DC_CABLE_SIZE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getDcCableSizeLanding(
  slug: DcCableSizeLandingSlug = DC_CABLE_SIZE_CALCULATOR_LANDING_SLUG
): DcCableSizeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllDcCableSizeLandings(): DcCableSizeGuideDefinition[] {
  return DC_CABLE_SIZE_LANDING_SLUGS.map((slug) => getDcCableSizeLanding(slug));
}

/** Static footer links derived from DC_CABLE_SIZE_FOOTER_RESOURCES. */
export function getDcCableSizeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return DC_CABLE_SIZE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as DC_CABLE_SIZE_CALCULATOR_ID };
