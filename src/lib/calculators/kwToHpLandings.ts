import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const KW_TO_HP_TOOL_PATH = "/tools/unit-conversion/kw-to-hp/" as const;

export const KW_TO_HP_TOOL_HREF = getCalculatorHref("kw-to-hp", "convert");

const BASE_CALCULATOR_ID = "kw-to-hp" as const;

export type KwToHpLandingSlug =
  | "kw-to-hp-converter"
  | "convert-kilowatts-to-mechanical-horsepower"
  | "calculate-horsepower-from-kilowatts";

export const KW_TO_HP_CONVERTER_LANDING_SLUG = "kw-to-hp-converter" as const;

export const CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG =
  "convert-kilowatts-to-mechanical-horsepower" as const;

export const CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG =
  "calculate-horsepower-from-kilowatts" as const;

export const KW_TO_HP_LANDING_SLUGS = [
  KW_TO_HP_CONVERTER_LANDING_SLUG,
  CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG,
  CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG,
] as const satisfies readonly KwToHpLandingSlug[];

export const KW_TO_HP_CONVERTER_GUIDE_HREF = getGuideLandingHref(
  KW_TO_HP_CONVERTER_LANDING_SLUG
);

export const CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_GUIDE_HREF =
  getGuideLandingHref(CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG);

export const CALCULATE_HORSEPOWER_FROM_KILOWATTS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG);

export type KwToHpGuideDefinition = GuideLandingDefinition & {
  slug: KwToHpLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const KW_TO_HP_CONVERTER_CONTENT: GuideLandingContent = {
  metaDescription:
    "kW to HP converter: divide kilowatts by 0.7457 for mechanical horsepower—match motor nameplates, generator ratings, and pump curves in US hp units.",
  heroSubtitle:
    "Electric specs list kW; legacy equipment quotes hp. This guide walks through the kW to HP converter: shaft or electrical power in kilowatts and mechanical horsepower using the standard US conversion factor.",
  benefits: [
    "Core formula: HP = kW ÷ 0.7457 (mechanical hp).",
    "Bridges modern kW ratings with motor and pump nameplates in hp.",
    "Instant check before comparing VFD, genset, or compressor specs.",
  ],
  howItWorks: [
    "Enter motor, generator, or load power in kilowatts (kW).",
    "Apply the mechanical horsepower constant: 1 hp ≈ 0.7457 kW.",
    "Read horsepower (hp)—the value most US motor plates and catalogs use.",
  ],
  faq: [
    {
      q: "How do I convert kW to HP?",
      a: "HP = kW ÷ 0.7457. Example: 7.5 kW → 7.5 ÷ 0.7457 ≈ 10.06 hp mechanical. Reverse: kW = hp × 0.7457. Use the same constant for three-phase and single-phase when the kW figure is already real power.",
    },
    {
      q: "What is mechanical horsepower vs. metric hp?",
      a: "Mechanical horsepower (US) = 0.7457 kW. Metric horsepower (PS, DIN) ≈ 0.7355 kW—common on European auto and small-engine labels. This calculator uses mechanical hp; check the nameplate region before quoting replacement motors.",
    },
    {
      q: "When do I need kW to hp conversion?",
      a: "Sizing replacements when the old motor is stamped in hp but the new inverter drive lists kW. Comparing pool pumps, air compressors, and farm equipment across catalogs that mix units. Verifying that a 10 hp nameplate motor matches a 7.5 kW VFD rating line.",
    },
  ],
  technicalSpecs: [
    "Mechanical HP = kW ÷ 0.7457.",
    "kW = HP × 0.7457 (reverse).",
    "1 mechanical hp = 745.7 W = 0.7457 kW.",
    "Related: kw-to-hp, kva-to-kw, amps-to-watts, inverter-sizing.",
  ],
};

const KW_TO_HP_CONVERTER_GUIDE: KwToHpGuideDefinition = {
  slug: KW_TO_HP_CONVERTER_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: KW_TO_HP_CONVERTER_GUIDE_HREF,
  toolHref: KW_TO_HP_TOOL_HREF,
  guideLinkLabel: "kW to HP converter",
  title: "kW to HP Converter",
  description: KW_TO_HP_CONVERTER_CONTENT.metaDescription,
  keywords: [
    "kw to hp converter",
    "kilowatt to horsepower",
    "kw to horsepower calculator",
    "convert kw to mechanical hp",
    "motor hp from kw",
  ],
  seo: {
    sections: [
      {
        heading: "kW is electrical; hp is how motors are sold",
        body: "Variable-frequency drives, solar inverters, and utility bills speak kilowatts. Centrifugal pumps, shop air compressors, and NEMA motor frames still advertise mechanical horsepower. The conversion is fixed: divide kW by 0.7457 for US mechanical hp. A 5.6 kW continuous rating is a 7.5 hp class motor—not 5.6 hp. Mixing units without converting causes undersized breakers or disappointed torque expectations.",
      },
      {
        heading: "Mechanical hp is the US standard for industrial equipment",
        body: "IEEE and NEMA motor tables assume mechanical horsepower. Metric PS appears on imported small engines and some EV marketing abroad. When a datasheet says 10 hp and you are matching a 7.5 kW VFD, you are aligned. When it says 10 PS, the kW equivalent is slightly lower. Document which hp definition you used on the BOM so installers do not swap incompatible units.",
      },
      {
        heading: "From hp back to electrical planning",
        body: "After hp is confirmed, continue in kW for wire sizing and inverter headroom—amps follow from kW and voltage, not hp alone. Pair this converter with kVA to kW when generator apparent power is involved, or Amps to Watts when you need branch-circuit load from a hp-rated motor at a known efficiency and power factor.",
      },
    ],
  },
  content: KW_TO_HP_CONVERTER_CONTENT,
};

const CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_CONTENT: GuideLandingContent = {
  metaDescription:
    "Convert kilowatts to mechanical horsepower: kW ÷ 0.7457 for US hp (745.7 W per hp)—NEMA motor frames, pump curves, and genset specs without confusing metric PS.",
  heroSubtitle:
    "Mechanical horsepower is a fixed SI-derived unit—745.7 watts exactly—not the same as metric PS on some import labels. This guide shows how to convert kilowatts to mechanical horsepower for US industrial equipment, VFD matching, and nameplate cross-checks.",
  benefits: [
    "Mechanical hp = kW ÷ 0.7457 (exact definition: 550 ft·lbf/s).",
    "Separates US mechanical hp from metric PS (≈ 0.7355 kW).",
    "Aligns inverter kW ratings with NEMA hp class motors.",
  ],
  howItWorks: [
    "Take real shaft or electrical power in kilowatts (kW).",
    "Divide by 0.7457—the kW equivalent of one mechanical horsepower.",
    "Read mechanical hp for catalogs, motor stamps, and load comparisons.",
  ],
  faq: [
    {
      q: "How do I convert kilowatts to mechanical horsepower?",
      a: "Mechanical HP = kW ÷ 0.7457. Example: 3.73 kW → 3.73 ÷ 0.7457 = 5.0 hp mechanical. The constant comes from 745.7 W per hp. Do not use 0.7355—that is metric horsepower (PS), not mechanical.",
    },
    {
      q: "Why is mechanical horsepower 0.7457 kW?",
      a: "One mechanical horsepower is defined as 550 foot-pounds per second, which equals 745.699872 W—rounded to 745.7 W or 0.7457 kW in practice. NEMA, IEEE, and US pump curves use this definition. European DIN horsepower (PS) is slightly smaller.",
    },
    {
      q: "Does efficiency change the kW-to-hp conversion?",
      a: "The conversion factor is unit math only—hp and kW describe the same power magnitude. Motor efficiency affects how many electrical kW you draw to deliver a given shaft hp, but converting 7.5 kW shaft power still yields ~10.06 mechanical hp regardless of efficiency.",
    },
  ],
  technicalSpecs: [
    "Mechanical HP = kW ÷ 0.7457.",
    "1 mechanical hp = 745.7 W = 0.7457 kW.",
    "Metric PS: kW ÷ 0.7355 (different unit—not mechanical hp).",
    "Related: kw-to-hp-converter, kva-to-kw, inverter-sizing.",
  ],
};

const CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_GUIDE: KwToHpGuideDefinition = {
  slug: CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_GUIDE_HREF,
  toolHref: KW_TO_HP_TOOL_HREF,
  guideLinkLabel: "Convert kilowatts to mechanical horsepower",
  title: "Convert Kilowatts to Mechanical Horsepower",
  description:
    CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_CONTENT.metaDescription,
  keywords: [
    "convert kilowatts to mechanical horsepower",
    "kilowatts to mechanical hp",
    "mechanical horsepower conversion",
    "745.7 watts per horsepower",
    "nema hp from kw",
  ],
  seo: {
    sections: [
      {
        heading: "Mechanical horsepower has a precise definition",
        body: "Unlike colloquial hp in ads, mechanical horsepower in engineering is 550 ft·lbf/s—745.7 watts. Dividing kilowatts by 0.7457 converts electrical or shaft power into that standard unit. A 15 kW drive output is 20.1 mechanical hp, not 15 hp. Spec sheets that skip the conversion mis-rank motor frame sizes and overload settings.",
      },
      {
        heading: "Do not confuse mechanical hp with metric PS",
        body: "Imported compressors and compact engines sometimes list PS (Pferdestärke). One metric horsepower ≈ 0.7355 kW—about 1.4% less than mechanical. Converting 7.5 kW with the wrong constant gives 10.2 PS but 10.06 mechanical hp. For US NEC load calcs and NEMA replacements, mechanical hp is the correct target. Note the unit on the source label before converting.",
      },
      {
        heading: "Where mechanical hp still drives procurement",
        body: "Pump affinity laws, belt drives, and farm implement PTO ratings reference hp classes. VFDs and battery inverters quote kW. Convert kilowatts to mechanical horsepower at the interface—when approving a 10 hp replacement for a 7.5 kW rated line, or when a utility interconnection cap in kW must be compared to hp-limited machinery on the same panel.",
      },
    ],
  },
  content: CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_CONTENT,
};

const CALCULATE_HORSEPOWER_FROM_KILOWATTS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate horsepower from kilowatts: HP = kW ÷ 0.7457 with worked examples—derive motor hp from inverter output, genset kW, and measured load data for sizing and replacements.",
  heroSubtitle:
    "You have kilowatts from a meter, datasheet, or drive display—now you need horsepower for a motor match or pump curve. This guide shows how to calculate horsepower from kilowatts step by step using the mechanical hp constant.",
  benefits: [
    "Single-step calc: HP = kW ÷ 0.7457.",
    "Worked examples from common motor and inverter kW ratings.",
    "Reverse check: kW = HP × 0.7457 before quoting equipment.",
  ],
  howItWorks: [
    "Identify real power in kW—shaft, output, or measured load (not kVA).",
    "Divide by 0.7457 to calculate mechanical horsepower.",
    "Round to catalog hp steps (5, 7.5, 10, 15 hp) for procurement.",
  ],
  faq: [
    {
      q: "How do I calculate horsepower from kilowatts?",
      a: "HP = kW ÷ 0.7457. Example: 11.2 kW → 11.2 ÷ 0.7457 ≈ 15.02 hp—round to a 15 hp motor class. For 5.6 kW: 5.6 ÷ 0.7457 ≈ 7.51 hp, matching a standard 7.5 hp frame.",
    },
    {
      q: "Can I calculate hp from three-phase kW?",
      a: "Yes—when the kW value is already real power (not kVA), the same formula applies. A three-phase 460 V motor drawing 14 kW shaft-equivalent power is 14 ÷ 0.7457 ≈ 18.8 hp. Use measured or nameplate kW, not line voltage alone.",
    },
    {
      q: "What if my kW includes motor losses?",
      a: "Input electrical kW is higher than shaft hp/kW when efficiency is below 100%. To calculate shaft horsepower from electrical kW, multiply kW by motor efficiency first, then divide by 0.7457. Example: 10 kW electrical at 90% efficiency → 9 kW shaft → 12.07 hp.",
    },
  ],
  technicalSpecs: [
    "HP = kW ÷ 0.7457 (mechanical).",
    "Shaft kW = electrical kW × efficiency (when needed).",
    "Standard NEMA hp steps: 1, 1.5, 2, 3, 5, 7.5, 10, 15, 20, 25, 30…",
    "Related: kw-to-hp-converter, convert-kilowatts-to-mechanical-horsepower.",
  ],
};

const CALCULATE_HORSEPOWER_FROM_KILOWATTS_GUIDE: KwToHpGuideDefinition = {
  slug: CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CALCULATE_HORSEPOWER_FROM_KILOWATTS_GUIDE_HREF,
  toolHref: KW_TO_HP_TOOL_HREF,
  guideLinkLabel: "Calculate horsepower from kilowatts",
  title: "Calculate Horsepower from Kilowatts",
  description: CALCULATE_HORSEPOWER_FROM_KILOWATTS_CONTENT.metaDescription,
  keywords: [
    "calculate horsepower from kilowatts",
    "hp from kw formula",
    "kilowatt to hp calculation",
    "motor horsepower from kw",
    "how many hp from kw",
  ],
  seo: {
    sections: [
      {
        heading: "One division answers most motor cross-reference questions",
        body: "Given any trustworthy kW figure—VFD display, power analyzer, or inverter continuous rating—horsepower is kW divided by 0.7457. Calculating hp from kW is faster than hunting conversion tables and avoids transcription errors on bid sheets. Document the source kW (input vs. output) so reviewers know whether efficiency was already applied.",
      },
      {
        heading: "Map calculated hp to standard frame sizes",
        body: "Raw results rarely land exactly on catalog steps. 7.51 hp maps to 7.5 hp NEMA frames; 18.8 hp may require a 20 hp class or a 15 hp with service factor headroom—application dependent. Calculate horsepower from kilowatts first, then apply manufacturer tables and service-factor policy rather than rounding down blindly.",
      },
      {
        heading: "Chain the calc into electrical planning",
        body: "After hp is known, return to kW for breaker and wire work—hp does not replace ampacity math. For generator or UPS paths, convert kVA to kW with power factor before calculating hp. For branch circuits, follow hp → kW → amps at your line voltage when nameplates omit FLA.",
      },
    ],
  },
  content: CALCULATE_HORSEPOWER_FROM_KILOWATTS_CONTENT,
};

const GUIDES_BY_SLUG: Record<KwToHpLandingSlug, KwToHpGuideDefinition> = {
  [KW_TO_HP_CONVERTER_LANDING_SLUG]: KW_TO_HP_CONVERTER_GUIDE,
  [CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG]:
    CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_GUIDE,
  [CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG]:
    CALCULATE_HORSEPOWER_FROM_KILOWATTS_GUIDE,
};

/** Landing guide links shown in the kW to HP tool footer Resources column. */
export const KW_TO_HP_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: KW_TO_HP_CONVERTER_LANDING_SLUG,
    href: KW_TO_HP_CONVERTER_GUIDE_HREF,
    label: "kW to HP Converter",
  },
  {
    slug: CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_LANDING_SLUG,
    href: CONVERT_KILOWATTS_TO_MECHANICAL_HORSEPOWER_GUIDE_HREF,
    label: "Convert Kilowatts to Mechanical Horsepower",
  },
  {
    slug: CALCULATE_HORSEPOWER_FROM_KILOWATTS_LANDING_SLUG,
    href: CALCULATE_HORSEPOWER_FROM_KILOWATTS_GUIDE_HREF,
    label: "Calculate Horsepower from Kilowatts",
  },
];

export function isKwToHpLandingSlug(slug: string): slug is KwToHpLandingSlug {
  return (KW_TO_HP_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getKwToHpLanding(
  slug: KwToHpLandingSlug = KW_TO_HP_CONVERTER_LANDING_SLUG
): KwToHpGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllKwToHpLandings(): KwToHpGuideDefinition[] {
  return KW_TO_HP_LANDING_SLUGS.map((slug) => getKwToHpLanding(slug));
}

/** Static footer links derived from KW_TO_HP_FOOTER_RESOURCES. */
export function getKwToHpToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return KW_TO_HP_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as KW_TO_HP_CALCULATOR_ID };
