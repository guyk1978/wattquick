import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const REACTIVE_POWER_CALCULATOR_TOOL_PATH =
  "/tools/unit-conversion/reactive-power-calculator/" as const;

export const REACTIVE_POWER_CALCULATOR_TOOL_HREF = getCalculatorHref(
  "reactive-power-calculator",
  "convert"
);

const BASE_CALCULATOR_ID = "reactive-power-calculator" as const;

export type ReactivePowerCalculatorLandingSlug =
  | "power-factor-and-reactive-power-calculator"
  | "calculate-kvar-for-inverter-and-conductor-sizing"
  | "real-power-kw-to-reactive-power-kvar-calculator";

export const POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG =
  "power-factor-and-reactive-power-calculator" as const;

export const CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG =
  "calculate-kvar-for-inverter-and-conductor-sizing" as const;

export const REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG =
  "real-power-kw-to-reactive-power-kvar-calculator" as const;

export const REACTIVE_POWER_CALCULATOR_LANDING_SLUGS = [
  POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG,
  CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG,
  REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly ReactivePowerCalculatorLandingSlug[];

export const POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG);

export const CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG);

export const REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG);

export type ReactivePowerCalculatorGuideDefinition = GuideLandingDefinition & {
  slug: ReactivePowerCalculatorLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Power factor and reactive power calculator: kW = kVA × PF and kVAR = √(kVA² − kW²) for motor and driver loads—size inverters and feeders on apparent power, not watts alone.",
  heroSubtitle:
    "AC loads split into real kilowatts and reactive kVAR—power factor links them to apparent kVA. This guide walks through the power factor and reactive power calculator: kVA, PF as a decimal, and the reactive component your breakers still see.",
  benefits: [
    "kW = kVA × power factor; kVAR = √(kVA² − kW²).",
    "Outputs kW, kVAR, kVA, PF, and phase angle φ together.",
    "Motor PF often 0.7–0.9; resistive loads near 1.0.",
  ],
  howItWorks: [
    "Enter apparent power in kVA from equipment plate or load study.",
    "Add power factor (0–1)—measured or typical for motor vs. resistive mix.",
    "Read reactive kVAR plus real kW—size on kVA, budget on kW.",
  ],
  faq: [
    {
      q: "How do I calculate reactive power from power factor?",
      a: "kW = kVA × PF, then kVAR = √(kVA² − kW²). Example: 12 kVA at 0.85 PF → kW = 10.2 → kVAR = √(144 − 104.04) ≈ 6.32 kVAR. Lower PF means more kVAR for the same kVA.",
    },
    {
      q: "What is the difference between kW, kVAR, and kVA?",
      a: "kW is real power (useful work). kVAR is reactive power (magnetizing/inductive exchange). kVA is apparent power—the vector sum: kVA² = kW² + kVAR². Conductors and transformers are limited by kVA and current, not kW alone.",
    },
    {
      q: "Why does poor power factor matter for inverters?",
      a: "An inverter rated in kVA must supply both kW and kVAR demanded by the load. A 10 kW motor at 0.75 PF may need ~13.3 kVA apparent—exceeding a 10 kVA inverter even though real power fits. Calculate kVAR before assuming wattage equals sizing.",
    },
  ],
  technicalSpecs: [
    "kW = kVA × PF.",
    "kVAR = √(kVA² − kW²).",
    "PF = kW ÷ kVA; φ = arccos(PF).",
    "Related: kva-to-kw, inverter-sizing, amps-to-watts.",
  ],
};

const POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_GUIDE: ReactivePowerCalculatorGuideDefinition =
  {
    slug: POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_GUIDE_HREF,
    toolHref: REACTIVE_POWER_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Power factor and reactive power calculator",
    title: "Power Factor and Reactive Power Calculator",
    description:
      POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "power factor and reactive power calculator",
      "kvar calculator power factor",
      "reactive power kva kw",
      "apparent real reactive power",
      "motor load kvar estimate",
    ],
    seo: {
      sections: [
        {
          heading: "The power triangle in one tool",
          body: "Apparent kVA is the hypotenuse; real kW and reactive kVAR are the legs. Power factor is how much of kVA lands in kW—unity PF is all real; 0.8 PF leaves a significant kVAR leg. Entering kVA and PF recreates the full triangle so you do not size feeders on kW alone while current follows kVA.",
        },
        {
          heading: "Motors and VFDs dominate kVAR",
          body: "Induction motors, compressors, and some LED drivers present lagging power factor. A workshop with several motors may show 0.75–0.85 PF site-wide. Reactive power calculator output explains why a 15 kVA service feels tight at only 11 kW of useful load—the remaining apparent capacity is tied in reactive exchange, not wasted heat, but still counts toward ampacity.",
        },
        {
          heading: "From kVAR to procurement",
          body: "Use calculated kVAR in BOM notes alongside kVA for gensets, UPS, and off-grid inverters. If kVAR is large, consider power-factor correction capacitors or higher kVA gear. Pair results with kVA to kW Converter when vendors quote only one of the three numbers—never assume they are interchangeable without PF.",
        },
      ],
    },
    content: POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_CONTENT,
  };

const CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate kVAR for inverter and conductor sizing: √(kVA² − kW²) from apparent kVA and power factor—size breakers and inverters on kVA/current, not real kW alone.",
    heroSubtitle:
      "Inverters and conductors are limited by apparent power and current—reactive kVAR is part of that budget. This guide shows how to calculate kVAR for inverter and conductor sizing from load kVA, power factor, and the real kW your motors actually draw.",
    benefits: [
      "kVAR = √(kVA² − kW²) after kW = kVA × PF.",
      "kVA (not kW) drives breaker and inverter nameplate checks.",
      "Document kVAR in BOM for motor-heavy distribution quotes.",
    ],
    howItWorks: [
      "Sum load kVA—or use a single motor branch kVA from nameplate.",
      "Enter power factor (measured or motor catalog typical).",
      "Read kVAR and kW; verify inverter kVA ≥ load kVA, not just kW.",
    ],
    faq: [
      {
        q: "How do I calculate kVAR for inverter sizing?",
        a: "From kVA and PF: kW = kVA × PF, kVAR = √(kVA² − kW²). Example: 8 kVA load at 0.8 PF → kW = 6.4, kVAR ≈ 4.8. Inverter must supply 8 kVA apparent—a 6.4 kW-rated inverter may trip if its kVA limit is only 7 kVA.",
      },
      {
        q: "Why does kVAR affect conductor sizing?",
        a: "Current depends on apparent power I = kVA × 1,000 ÷ (V × √3) on three-phase (or kVA × 1,000 ÷ V single-phase). Reactive kVAR increases kVA at the same real kW, raising amps without more useful work. Size feeders on calculated kVA including kVAR.",
      },
      {
        q: "Can I reduce kVAR for sizing?",
        a: "Power-factor correction capacitors at the load or panel reduce lagging kVAR, lowering apparent kVA and current. Calculate kVAR first to see if correction is cheaper than upsizing cable or inverter kVA. After correction, re-run with improved PF.",
      },
    ],
    technicalSpecs: [
      "kVAR = √(kVA² − kW²).",
      "kVA_sizing ≥ √(kW² + kVAR²).",
      "I ∝ kVA at fixed voltage (per phase rules apply).",
      "Related: inverter-sizing, kva-to-kw, power-factor-and-reactive-power-calculator.",
    ],
  };

const CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_GUIDE: ReactivePowerCalculatorGuideDefinition =
  {
    slug: CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_GUIDE_HREF,
    toolHref: REACTIVE_POWER_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Calculate kVAR for inverter and conductor sizing",
    title: "Calculate kVAR for Inverter and Conductor Sizing",
    description:
      CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_CONTENT.metaDescription,
    keywords: [
      "calculate kvar for inverter and conductor sizing",
      "kvar inverter sizing",
      "conductor sizing power factor kva",
      "motor load kvar breaker size",
      "apparent power feeder sizing",
    ],
    seo: {
      sections: [
        {
          heading: "kW fit is not kVA fit",
          body: "Inverter datasheets list continuous kW and sometimes separate kVA or output current limits. A pump drawing 7 kW real at 0.78 PF needs about 8.97 kVA—a 8 kVA inverter is undersized even though kW looks close. Calculating kVAR exposes the apparent-power gap before purchase orders go out.",
        },
        {
          heading: "Conductors follow amps, amps follow kVA",
          body: "NEC ampacity tables do not care that only part of your apparent power is real. Once kVAR is folded into kVA, convert to current at your service voltage and phase. Two loads with identical kW but different PF need different wire if PF differs—motor branch vs. heater branch on the same panel.",
        },
        {
          heading: "When kVAR drives an upsize vs. correction",
          body: "If calculated kVAR is a large fraction of kVA, compare adding correction capacitors against buying the next inverter kVA tier or upsizing homerun cable. A few kVAR of correction on a fixed motor load can drop apparent kVA enough to keep existing breaker and wire—run the calculator before and after assumed PF improvement to quantify the savings.",
        },
      ],
    },
    content: CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_CONTENT,
  };

const REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Real power (kW) to reactive power (kVAR) calculator: from known kW and power factor, derive kVA = kW ÷ PF then kVAR = √(kVA² − kW²)—complete the power triangle for motor loads.",
    heroSubtitle:
      "You often know real kilowatts from a motor plate or meter—not kVA. This guide shows the real power (kW) to reactive power (kVAR) path: convert kW and PF to apparent kVA, then read kVAR from the power triangle in the calculator.",
    benefits: [
      "Bridge: kVA = kW ÷ PF, then kVAR = √(kVA² − kW²).",
      "Direct form: kVAR = kW × tan(arccos PF) when PF is known.",
      "Confirms kW output matches your known real load.",
    ],
    howItWorks: [
      "Start with real power kW (nameplate shaft power ÷ efficiency, or measured kW).",
      "Divide by power factor to get kVA: kVA = kW ÷ PF.",
      "Enter that kVA and PF in the tool—read kVAR and verify kW matches input.",
    ],
    faq: [
      {
        q: "How do I convert kW to kVAR with power factor?",
        a: "kVA = kW ÷ PF, then kVAR = √(kVA² − kW²). Example: 9 kW at 0.85 PF → kVA = 9 ÷ 0.85 ≈ 10.59 → kVAR = √(112.1 − 81) ≈ 5.58 kVAR. Equivalently kVAR ≈ kW × tan(arccos 0.85) ≈ 5.58.",
      },
      {
        q: "I only have kW on the motor—what PF do I use?",
        a: "Use motor catalog PF at full load (often 0.8–0.9) or measure at the panel. Underestimating PF underestimates kVA and kVAR—size conservatively for distribution. Resistive loads: PF ≈ 1 → kVAR ≈ 0.",
      },
      {
        q: "Why convert kW to kVAR if billing is in kW?",
        a: "kVAR does not appear on a simple energy bill but sets apparent kVA and current. Inverter limits, transformer loading, and conductor ampacity follow kVA = √(kW² + kVAR²). Converting from known kW completes the triangle for equipment sizing.",
      },
    ],
    technicalSpecs: [
      "kVA = kW ÷ PF.",
      "kVAR = √(kVA² − kW²) = kW × tan(arccos PF).",
      "PF = kW ÷ kVA (reverse check).",
      "Related: kva-to-kw, calculate-kvar-for-inverter-and-conductor-sizing.",
    ],
  };

const REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_GUIDE: ReactivePowerCalculatorGuideDefinition =
  {
    slug: REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_GUIDE_HREF,
    toolHref: REACTIVE_POWER_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Real power (kW) to reactive power (kVAR) calculator",
    title: "Real Power (kW) to Reactive Power (kVAR) Calculator",
    description:
      REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "real power kw to reactive power kvar calculator",
      "convert kw to kvar power factor",
      "kw kvar calculator",
      "kilowatt to kvar motor load",
      "power triangle kw kvar kva",
    ],
    seo: {
      sections: [
        {
          heading: "Motor plates speak kW; the triangle needs all three",
          body: "Nameplate kilowatts describe real mechanical or electrical work at rated conditions. Reactive kVAR is not printed but exists whenever PF is below unity. Dividing your known kW by PF yields the kVA to enter in the tool—the output kVAR leg completes the triangle and should reconcile with the kW you started from.",
        },
        {
          heading: "tan φ is the shortcut from kW to kVAR",
          body: "When PF is stable, kVAR ≈ kW × tan(arccos PF). At PF 0.8, tan φ ≈ 0.75 so kVAR is roughly three-quarters of kW. The calculator path through kVA is equivalent but easier to audit in spreadsheets—publish both kVA and kVAR on the same line item for reviewers.",
        },
        {
          heading: "Stack multiple kW loads with blended PF",
          body: "Sum real kW across branches, but do not sum kVAR blindly without phase awareness. For a first-pass workshop estimate, weight PF by kVA share per load, compute blended kVA = total kW ÷ PF_blend, then kVAR. Refine with measured panel data when motor starts overlap and PF dips simultaneously.",
        },
      ],
    },
    content: REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  ReactivePowerCalculatorLandingSlug,
  ReactivePowerCalculatorGuideDefinition
> = {
  [POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG]:
    POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_GUIDE,
  [CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG]:
    CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_GUIDE,
  [REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG]:
    REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_GUIDE,
};

export const REACTIVE_POWER_CALCULATOR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG,
      href: POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_GUIDE_HREF,
      label: "Power Factor and Reactive Power Calculator",
    },
    {
      slug: CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_LANDING_SLUG,
      href: CALCULATE_KVAR_FOR_INVERTER_AND_CONDUCTOR_SIZING_GUIDE_HREF,
      label: "Calculate kVAR for Inverter and Conductor Sizing",
    },
    {
      slug: REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_LANDING_SLUG,
      href: REAL_POWER_KW_TO_REACTIVE_POWER_KVAR_CALCULATOR_GUIDE_HREF,
      label: "Real Power (kW) to Reactive Power (kVAR) Calculator",
    },
  ];

export function isReactivePowerCalculatorLandingSlug(
  slug: string
): slug is ReactivePowerCalculatorLandingSlug {
  return (REACTIVE_POWER_CALCULATOR_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getReactivePowerCalculatorLanding(
  slug: ReactivePowerCalculatorLandingSlug = POWER_FACTOR_AND_REACTIVE_POWER_CALCULATOR_LANDING_SLUG
): ReactivePowerCalculatorGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllReactivePowerCalculatorLandings(): ReactivePowerCalculatorGuideDefinition[] {
  return REACTIVE_POWER_CALCULATOR_LANDING_SLUGS.map((slug) =>
    getReactivePowerCalculatorLanding(slug)
  );
}

/** Static footer links derived from REACTIVE_POWER_CALCULATOR_FOOTER_RESOURCES. */
export function getReactivePowerCalculatorToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return REACTIVE_POWER_CALCULATOR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as REACTIVE_POWER_CALCULATOR_CALCULATOR_ID };
