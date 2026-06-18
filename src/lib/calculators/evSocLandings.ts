import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import {
  getGuideLandingHref,
} from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

export type EvSocLandingSlug = "ev-soc-calculator";

export const EV_SOC_LANDING_SLUG = "ev-soc-calculator" as const;

export const EV_SOC_LANDING_SLUGS = [
  EV_SOC_LANDING_SLUG,
] as const satisfies readonly EvSocLandingSlug[];

export const EV_SOC_GUIDE_HREF = getGuideLandingHref(EV_SOC_LANDING_SLUG);

const BASE_CALCULATOR_ID = "ev-soc-calculator" as const;

export type EvSocGuideDefinition = GuideLandingDefinition & {
  slug: EvSocLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const EV_SOC_CONTENT: GuideLandingContent = {
  metaDescription:
    "Engineering guide to EV battery state of charge (SoC): interpret resting pack voltage, OCV curves, BMS reporting, and fleet-grade SOC validation for Li-ion packs.",
  heroSubtitle:
    "Quantify EV state of charge with voltage-curve discipline—not dashboard guesses. Built for fleet engineers, installers, and energy analysts who need auditable SoC baselines before dispatch, V2G, or warranty review.",
  benefits: [
    "Maps resting pack voltage to SoC using documented empty/full endpoints—repeatable across vehicles when endpoints are calibrated to OEM BMS tables.",
    "Surfaces voltage-curve limitations: load sag, temperature drift, and chemistry-specific OCV non-linearity—so teams know when to escalate to coulomb counting.",
    "Supports ROI planning: quantify usable kWh windows (e.g., 20–80% dispatch bands) before route assignment, depot charging, or demand-charge avoidance.",
  ],
  howItWorks: [
    "Record resting pack voltage after the vehicle has been idle long enough for surface cell relaxation (typically 15–30+ minutes).",
    "Enter OEM or field-calibrated empty (~0% SOC) and full (~100% SOC) voltage endpoints for the high-voltage pack.",
    "The calculator linearizes SoC between endpoints; compare results to the BMS display and log deltas for your audit trail.",
  ],
  faq: [
    {
      q: "Why does SoC from voltage differ from my EV dashboard?",
      a: "Production BMS algorithms fuse coulomb counting, cell balancing data, temperature compensation, and aged OCV lookup tables. A single resting voltage reading gives a field checkpoint—not a replacement for the vehicle's calibrated estimator.",
    },
    {
      q: "What is the relationship between voltage and SoC on Li-ion packs?",
      a: "Open-circuit voltage (OCV) rises non-linearly with state of charge, with a flat mid-band and steep regions near empty and full. Linear interpolation between endpoints is a first-order estimate; NMC and LFP chemistries require different curve shapes for warranty-grade accuracy.",
    },
    {
      q: "Can I use this under load or while charging?",
      a: "No. Terminal voltage sags under discharge current and rises under charge current (IR drop). SoC from voltage is only meaningful at rest or when using manufacturer-published OCV tables at known temperature.",
    },
  ],
  technicalSpecs: [
    "Model: SoC (%) = (V_pack − V_empty) ÷ (V_full − V_empty) × 100, clamped 0–100%.",
    "Inputs: resting pack voltage (V), empty endpoint (V), full endpoint (V); all positive, V_full > V_empty.",
    "Reference: align endpoints with OEM BMS documentation; IEC 62619 / UN 38.3 pack datasheets for fleet documentation.",
    "Limitation: does not replace coulomb counting, temperature-compensated OCV tables, or cell-level balancing data.",
  ],
};

const EV_SOC_GUIDE: EvSocGuideDefinition = {
  slug: EV_SOC_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "ev",
  href: EV_SOC_GUIDE_HREF,
  toolHref: getCalculatorHref(BASE_CALCULATOR_ID, "ev"),
  guideLinkLabel: "Read the EV SoC Guide",
  title: "EV Battery State of Charge (SoC) Calculator",
  description: EV_SOC_CONTENT.metaDescription,
  keywords: [
    "ev battery soc calculator",
    "ev state of charge guide",
    "ev pack voltage soc",
    "ocv curve ev battery",
  ],
  seo: {
    sections: [
      {
        heading: "OCV curves and EV pack architecture",
        body: "High-voltage EV packs series-connect hundreds of cells. Pack voltage is the sum of cell voltages; state of charge is a pack-level construct derived from cell-level OCV relationships. NMC graphs show steep slopes below ~15% and above ~85%; LFP holds a flatter mid-band, making voltage-only SoC harder without calibrated tables.",
      },
      {
        heading: "BMS reporting vs. field measurement",
        body: "The onboard BMS integrates current shunt data, cell voltage min/max, and temperature sensors. Fleet telematics may report SoC with smoothing delays. A resting voltage check validates whether the BMS estimate drifts after long storage or after partial cycles.",
      },
    ],
  },
  content: EV_SOC_CONTENT,
};

const GUIDES_BY_SLUG: Record<EvSocLandingSlug, EvSocGuideDefinition> = {
  [EV_SOC_LANDING_SLUG]: EV_SOC_GUIDE,
};

export const EV_SOC_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: EV_SOC_LANDING_SLUG,
    href: EV_SOC_GUIDE_HREF,
    label: "EV SoC Guide",
  },
];

export function isEvSocLandingSlug(slug: string): slug is EvSocLandingSlug {
  return (EV_SOC_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEvSocLanding(
  slug: EvSocLandingSlug = EV_SOC_LANDING_SLUG
): EvSocGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEvSocLandings(): EvSocGuideDefinition[] {
  return EV_SOC_LANDING_SLUGS.map((slug) => getEvSocLanding(slug));
}

/** @deprecated Use EV_SOC_GUIDE_HREF */
export const EV_SOC_LANDING_HREF = EV_SOC_GUIDE_HREF;

/** @deprecated */
export const EV_SOC_GUIDE_LANDING_HREF = getGuideLandingHref(EV_SOC_LANDING_SLUG);
