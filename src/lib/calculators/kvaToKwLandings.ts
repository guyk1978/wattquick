import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const KVA_TO_KW_TOOL_PATH =
  "/tools/unit-conversion/kva-to-kw/" as const;

export const KVA_TO_KW_TOOL_HREF = getCalculatorHref("kva-to-kw", "convert");

const BASE_CALCULATOR_ID = "kva-to-kw" as const;

export type KvaToKwLandingSlug =
  | "kva-to-kw-converter"
  | "convert-kva-to-kw-using-power-factor"
  | "calculate-kw-from-kva-and-power-factor";

export const KVA_TO_KW_CONVERTER_LANDING_SLUG = "kva-to-kw-converter" as const;

export const CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG =
  "convert-kva-to-kw-using-power-factor" as const;

export const CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG =
  "calculate-kw-from-kva-and-power-factor" as const;

export const KVA_TO_KW_LANDING_SLUGS = [
  KVA_TO_KW_CONVERTER_LANDING_SLUG,
  CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG,
  CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG,
] as const satisfies readonly KvaToKwLandingSlug[];

export const KVA_TO_KW_CONVERTER_GUIDE_HREF = getGuideLandingHref(
  KVA_TO_KW_CONVERTER_LANDING_SLUG
);

export const CONVERT_KVA_TO_KW_USING_POWER_FACTOR_GUIDE_HREF =
  getGuideLandingHref(CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG);

export const CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG);

export type KvaToKwGuideDefinition = GuideLandingDefinition & {
  slug: KvaToKwLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const KVA_TO_KW_CONVERTER_CONTENT: GuideLandingContent = {
  metaDescription:
    "kVA to kW converter: multiply apparent power (kVA) by power factor for real power (kW)—size generators, UPS, and transformers from nameplate kVA ratings.",
  heroSubtitle:
    "Equipment nameplates often list kVA; your loads consume kW. This guide walks through the kVA to kW converter: apparent power in kVA, power factor as a decimal, and real power in kilowatts.",
  benefits: [
    "Core formula: kW = kVA × power factor.",
    "Separates apparent (kVA) from real (kW) power in AC systems.",
    "Typical PF ranges for resistive, motor, and mixed loads built in.",
  ],
  howItWorks: [
    "Enter apparent power in kVA from the generator, UPS, or transformer plate.",
    "Add power factor (0–1)—0.9 for 90%, 1.0 for resistive loads.",
    "Read real power in kW—the useful work the source can deliver at that PF.",
  ],
  faq: [
    {
      q: "How do I convert kVA to kW?",
      a: "kW = kVA × PF. Example: 10 kVA at 0.85 power factor → 10 × 0.85 = 8.5 kW real power. At PF 1.0, kVA and kW match; lower PF means less real power for the same apparent rating.",
    },
    {
      q: "What is a typical power factor?",
      a: "Resistive heaters and incandescent loads are near 1.0. Induction motors and fluorescent lighting often run 0.7–0.9. Mixed commercial panels may average 0.8–0.95. Use measured PF from a meter when available.",
    },
    {
      q: "Why does kVA matter if I pay for kW?",
      a: "Conductors, breakers, and transformers are sized on apparent power (current × voltage), not real power alone. A 10 kVA genset at 0.7 PF delivers only 7 kW—oversizing on kVA without PF check leads to disappointed runtime or tripped breakers.",
    },
  ],
  technicalSpecs: [
    "Real power kW = kVA × PF.",
    "PF = kW ÷ kVA (0–1 for lagging unity).",
    "Apparent power kVA = kW ÷ PF (reverse check).",
    "Related: kva-to-kw, inverter-sizing, amps-to-watts, power-factor.",
  ],
};

const KVA_TO_KW_CONVERTER_GUIDE: KvaToKwGuideDefinition = {
  slug: KVA_TO_KW_CONVERTER_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: KVA_TO_KW_CONVERTER_GUIDE_HREF,
  toolHref: KVA_TO_KW_TOOL_HREF,
  guideLinkLabel: "kVA to kW converter",
  title: "kVA to kW Converter",
  description: KVA_TO_KW_CONVERTER_CONTENT.metaDescription,
  keywords: [
    "kva to kw converter",
    "kva to kw calculator",
    "apparent power to real power",
    "convert kva to kilowatts",
    "power factor kva kw",
  ],
  seo: {
    sections: [
      {
        heading: "kVA is what the wire sees; kW is what the load uses",
        body: "Apparent power in volt-amperes includes both real and reactive components in AC circuits. Real power in watts does the actual work—heat, motion, light. Power factor is the ratio between them. A 15 kVA transformer feeding motor loads at 0.8 PF delivers 12 kW, not 15 kW. Converting kVA to kW before budgeting keeps generator and UPS quotes honest.",
      },
      {
        heading: "Nameplate kVA without PF misleads sizing",
        body: "Portable generators advertise kVA or kW interchangeably in marketing copy. Industrial UPS units state kVA prominently. Enter the plate kVA and your expected load power factor—motor-heavy sites need conservative PF assumptions. Resistive-only campsites can use PF near 1.0. The converter makes the assumption explicit instead of hidden.",
      },
      {
        heading: "PF penalties and infrastructure costs",
        body: "Utilities sometimes bill large customers for poor power factor because extra apparent current heats conductors without delivering billable kW. Even off-grid, undersized PF means higher current for the same real load—larger cables, warmer breakers. After kW is known, pair results with Amps to Watts or inverter sizing tools for the amp draw at your service voltage.",
      },
    ],
  },
  content: KVA_TO_KW_CONVERTER_CONTENT,
};

const CONVERT_KVA_TO_KW_USING_POWER_FACTOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Convert kVA to kW using power factor: kW = kVA × PF with decimal PF from meters or load tables—real kilowatts from generator, UPS, and transformer apparent ratings.",
  heroSubtitle:
    "Power factor is the missing variable between kVA nameplates and kW loads. This guide shows how to convert kVA to kW using power factor—apparent rating, PF as a decimal (0–1), and real power for sizing and billing checks.",
  benefits: [
    "Formula: kW = kVA × power factor (PF).",
    "PF from utility meter, motor nameplate, or conservative load assumptions.",
    "Reverse: PF = kW ÷ kVA to audit measured site power factor.",
  ],
  howItWorks: [
    "Read kVA from equipment nameplate or one-line diagram.",
    "Enter power factor—measured, catalog, or typical (e.g. 0.85 for motor mix).",
    "Multiply for kW; compare to sum of connected real loads.",
  ],
  faq: [
    {
      q: "How do I convert kVA to kW using power factor?",
      a: "kW = kVA × PF. Example: 25 kVA UPS at 0.9 PF → 25 × 0.9 = 22.5 kW deliverable real power. Enter PF as decimal: 90% = 0.9, not 90.",
    },
    {
      q: "Where do I get power factor for the calculation?",
      a: "Best: read PF from a power quality meter on the load bus. Next: motor and lighting schedules—resistive ~1.0, motors ~0.75–0.9. When unsure, use a conservative PF (lower) so kW estimate is not optimistic.",
    },
    {
      q: "Can power factor be greater than 1?",
      a: "For this converter, enter PF between 0 and 1 for lagging/unity AC loads. Leading PF or capacitive correction can exceed 1 in theory but is uncommon in simple sizing. Values above 1 in the tool are rejected—stick to decimal PF from your meter or spec.",
    },
  ],
  technicalSpecs: [
    "kW = kVA × PF.",
    "PF = cos(φ) for linear AC loads.",
    "Measured PF = kW ÷ kVA (from meter registers).",
    "Related: kva-to-kw-converter, inverter-sizing, amps-to-watts.",
  ],
};

const CONVERT_KVA_TO_KW_USING_POWER_FACTOR_GUIDE: KvaToKwGuideDefinition = {
  slug: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_GUIDE_HREF,
  toolHref: KVA_TO_KW_TOOL_HREF,
  guideLinkLabel: "Convert kVA to kW using power factor",
  title: "Convert kVA to kW Using Power Factor",
  description: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_CONTENT.metaDescription,
  keywords: [
    "convert kva to kw using power factor",
    "kva kw power factor formula",
    "apparent power times power factor",
    "kva to kilowatt with pf",
    "real power from kva and pf",
  ],
  seo: {
    sections: [
      {
        heading: "Power factor is the bridge between ratings",
        body: "Manufacturers size transformers and gensets in kVA because current depends on apparent power. Your heaters and motors draw real power in kW. Multiplying kVA by power factor closes that gap in one step. Without PF, a 20 kVA rating could mean 20 kW or 14 kW depending on whether the site is mostly resistive or motor-heavy.",
      },
      {
        heading: "Measured PF beats guesswork",
        body: "Utility revenue meters and panel power analyzers report PF directly—use that number in the converter when sizing additions to an existing service. Greenfield estimates rely on load lists: assign each branch a PF, weight by kVA share, blend to a site average. Document the assumption; a 0.05 PF error on 50 kVA is 2.5 kW of sizing margin.",
      },
      {
        heading: "After kW, check current and headroom",
        body: "Real power in kW tells you whether the load fits the fuel or battery budget; apparent power still sets breaker and conductor ampacity. Once kW is calculated from kVA × PF, continue with voltage and phase to verify amp draw. Poor PF inflates amps without adding kW—another reason to convert with an explicit factor instead of treating kVA as kW.",
      },
    ],
  },
  content: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_CONTENT,
};

const CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate kW from kVA and power factor: real power = kVA × PF step-by-step for gensets, UPS, and panels—verify deliverable kilowatts before load planning.",
  heroSubtitle:
    "Real kilowatts are calculated—not read directly from a kVA plate. This guide shows how to calculate kW from kVA and power factor with worked examples for common PF values and load types.",
  benefits: [
    "Calculation: kW = kVA × PF (PF as decimal 0–1).",
    "Worked examples for PF 1.0, 0.9, and 0.8 motor-heavy sites.",
    "Sanity check: sum of load kW should not exceed calculated kW.",
  ],
  howItWorks: [
    "Note apparent power in kVA from nameplate or electrical schedule.",
    "Select or measure power factor for the connected load mix.",
    "Multiply kVA × PF; record kW for fuel, battery, or capacity planning.",
  ],
  faq: [
    {
      q: "How do I calculate kW from kVA and power factor?",
      a: "kW = kVA × PF. Example: 30 kVA transformer at 0.88 PF → 30 × 0.88 = 26.4 kW real power capacity at that power factor. Repeat for each source if PF differs per bus.",
    },
    {
      q: "What if I only know kW and need to check kVA?",
      a: "Reverse the formula: kVA = kW ÷ PF. Example: 18 kW load at 0.75 PF draws 18 ÷ 0.75 = 24 kVA apparent—size breakers and conductors on 24 kVA, not 18.",
    },
    {
      q: "Should I use nameplate kVA or running kVA?",
      a: "Use operating kVA when you have meter data; use nameplate kVA for maximum equipment capability checks. Calculated kW from nameplate kVA × worst-case PF gives a conservative ceiling for what the gear can support.",
    },
  ],
  technicalSpecs: [
    "kW = kVA × PF.",
    "kVA = kW ÷ PF (inverse).",
    "PF valid range in tool: 0 < PF ≤ 1.",
    "Related: convert-kva-to-kw-using-power-factor, inverter-sizing.",
  ],
};

const CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_GUIDE: KvaToKwGuideDefinition = {
  slug: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_GUIDE_HREF,
  toolHref: KVA_TO_KW_TOOL_HREF,
  guideLinkLabel: "Calculate kW from kVA and power factor",
  title: "Calculate kW from kVA and Power Factor",
  description: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_CONTENT.metaDescription,
  keywords: [
    "calculate kw from kva and power factor",
    "kva times power factor kw",
    "real power calculation kva pf",
    "how many kw is kva",
    "kilowatt from apparent power",
  ],
  seo: {
    sections: [
      {
        heading: "One multiplication answers the kW question",
        body: "Given kVA and PF, real power is always their product. A 12 kVA portable unit at unity PF yields 12 kW; at 0.8 PF the same plate delivers 9.6 kW. Write the PF beside every calculation—two sites with identical kVA ratings can justify different load lists when motor content differs.",
      },
      {
        heading: "Build a small PF table for your site",
        body: "Calculate kW three times: PF 1.0 (resistive ceiling), PF 0.9 (light commercial), PF 0.8 (motor-heavy). The spread shows sensitivity. If 50 kVA becomes 40 kW at 0.8 but your load study sums to 42 kW, you need more kVA or power-factor correction—not a larger fuel tank alone.",
      },
      {
        heading: "kW calculated, then verify headroom",
        body: "Calculated kW is the real-power budget; leave margin for starting surges and future loads. Compare to inverter continuous kW, generator prime rating, or UPS kW column when listed separately from kVA. When only kVA is published, this calculation is how you derive the kW line item spec sheets omit.",
      },
    ],
  },
  content: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_CONTENT,
};

const GUIDES_BY_SLUG: Record<KvaToKwLandingSlug, KvaToKwGuideDefinition> = {
  [KVA_TO_KW_CONVERTER_LANDING_SLUG]: KVA_TO_KW_CONVERTER_GUIDE,
  [CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG]:
    CONVERT_KVA_TO_KW_USING_POWER_FACTOR_GUIDE,
  [CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG]:
    CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_GUIDE,
};

export const KVA_TO_KW_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: KVA_TO_KW_CONVERTER_LANDING_SLUG,
    href: KVA_TO_KW_CONVERTER_GUIDE_HREF,
    label: "kVA to kW Converter",
  },
  {
    slug: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_LANDING_SLUG,
    href: CONVERT_KVA_TO_KW_USING_POWER_FACTOR_GUIDE_HREF,
    label: "Convert kVA to kW Using Power Factor",
  },
  {
    slug: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_LANDING_SLUG,
    href: CALCULATE_KW_FROM_KVA_AND_POWER_FACTOR_GUIDE_HREF,
    label: "Calculate kW from kVA and Power Factor",
  },
];

export function isKvaToKwLandingSlug(slug: string): slug is KvaToKwLandingSlug {
  return (KVA_TO_KW_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getKvaToKwLanding(
  slug: KvaToKwLandingSlug = KVA_TO_KW_CONVERTER_LANDING_SLUG
): KvaToKwGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllKvaToKwLandings(): KvaToKwGuideDefinition[] {
  return KVA_TO_KW_LANDING_SLUGS.map((slug) => getKvaToKwLanding(slug));
}

/** Static footer links derived from KVA_TO_KW_FOOTER_RESOURCES. */
export function getKvaToKwToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return KVA_TO_KW_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as KVA_TO_KW_CALCULATOR_ID };
