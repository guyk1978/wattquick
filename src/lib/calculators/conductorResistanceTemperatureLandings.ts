import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_PATH =
  "/tools/unit-conversion/conductor-resistance-temperature/" as const;

export const CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_HREF = getCalculatorHref(
  "conductor-resistance-temperature",
  "convert"
);

const BASE_CALCULATOR_ID = "conductor-resistance-temperature" as const;

export type ConductorResistanceTemperatureLandingSlug =
  | "conductor-resistance-calculator"
  | "calculate-conductor-resistance-vs-temperature"
  | "copper-vs-aluminum-wire-resistance-calculator";

export const CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG =
  "conductor-resistance-calculator" as const;

export const CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG =
  "calculate-conductor-resistance-vs-temperature" as const;

export const COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG =
  "copper-vs-aluminum-wire-resistance-calculator" as const;

export const CONDUCTOR_RESISTANCE_TEMPERATURE_LANDING_SLUGS = [
  CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG,
  CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG,
  COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly ConductorResistanceTemperatureLandingSlug[];

export const CONDUCTOR_RESISTANCE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG);

export const COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG);

export type ConductorResistanceTemperatureGuideDefinition =
  GuideLandingDefinition & {
    slug: ConductorResistanceTemperatureLandingSlug;
    calculatorId: typeof BASE_CALCULATOR_ID;
  };

const CONDUCTOR_RESISTANCE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Conductor resistance calculator: copper or aluminum wire resistance from cross-section (mm²), length, and operating temperature—R(T) = R₂₀ × [1 + α(T − 20°C)] for DC and AC runs.",
  heroSubtitle:
    "Cable resistance drives voltage drop and I²R loss—both rise with temperature. This guide walks through the conductor resistance calculator: material, mm² size, one-way length in meters, and field operating temperature.",
  benefits: [
    "R₂₀ = ρL/A with copper ρ ≈ 0.0175 Ω·mm²/m, aluminum ρ ≈ 0.0282 Ω·mm²/m.",
    "Temperature correction: ~0.4%/°C above 20°C reference.",
    "Outputs Ω at temperature plus R at 20°C and Ω/m for BOM checks.",
  ],
  howItWorks: [
    "Select copper or aluminum and cross-section in mm² (AWG equivalents listed).",
    "Enter one-way conductor length in meters and expected operating °C.",
    "Read resistance in ohms—use with voltage-drop and loss calculators.",
  ],
  faq: [
    {
      q: "How do I calculate conductor resistance?",
      a: "At 20°C: R = ρ × L ÷ A (Ω). Example: 6 mm² copper, 15 m one-way → R₂₀ ≈ 0.0175 × 15 ÷ 6 ≈ 0.0438 Ω. At 40°C multiply by [1 + 0.00393 × (40 − 20)] ≈ 1.079 → ~0.0472 Ω. Round-trip DC drop uses 2× length.",
    },
    {
      q: "Why does temperature change wire resistance?",
      a: "Metal resistivity rises with temperature—copper α ≈ 0.00393/°C. A cable in a hot attic or engine bay can be 10–20% higher resistance than a 20°C datasheet value. Size and loss calculations should use field temperature, not lab conditions.",
    },
    {
      q: "Copper vs. aluminum for the same mm²?",
      a: "Aluminum ρ is higher—about 61% more resistance than copper at the same cross-section. NEC often upsizes aluminum one breaker step. Enter the actual material in the calculator; do not assume copper resistivity on AL cable.",
    },
  ],
  technicalSpecs: [
    "R₂₀ (Ω) = ρ × L(m) ÷ A(mm²).",
    "R(T) = R₂₀ × [1 + α(T − 20°C)].",
    "Cu ρ ≈ 0.0175 Ω·mm²/m; Al ρ ≈ 0.0282 Ω·mm²/m at 20°C.",
    "Related: dc-cable-voltage-drop, dc-cable-size, ohms-law.",
  ],
};

const CONDUCTOR_RESISTANCE_CALCULATOR_GUIDE: ConductorResistanceTemperatureGuideDefinition =
  {
    slug: CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: CONDUCTOR_RESISTANCE_CALCULATOR_GUIDE_HREF,
    toolHref: CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_HREF,
    guideLinkLabel: "Conductor resistance calculator",
    title: "Conductor Resistance Calculator",
    description: CONDUCTOR_RESISTANCE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "conductor resistance calculator",
      "wire resistance calculator",
      "copper cable resistance mm2",
      "aluminum conductor resistance",
      "temperature coefficient wire resistance",
    ],
    seo: {
      sections: [
        {
          heading: "ρ, length, and area set baseline R",
          body: "Every conductor is a resistor. Cross-section in mm² sets the area; one-way length is how far current travels before the return path in DC systems doubles it for drop math. Copper and aluminum use different resistivity constants—pick the material that matches the installed cable, not the cheapest quote on the spreadsheet.",
        },
        {
          heading: "Hot runs are not 20°C datasheet runs",
          body: "Solar DC homeruns in conduit, battery interconnects near inverters, and long RV runs through uninsulated bays routinely exceed 25°C ambient at the conductor. The temperature factor in this calculator adjusts R₂₀ to operating °C so I²R loss and voltage-drop estimates are not optimistic. A few ohms of underestimate on a high-current string becomes meaningful watts and sag.",
        },
        {
          heading: "Resistance feeds the rest of the wire stack",
          body: "Once R is known, multiply by current for drop (V = I × R) or by I² for loss. Pair results with DC Cable Voltage Drop or Cable Size tools when you are iterating gauge versus length. Resistance per meter from the tool snapshot helps compare two routing options without re-entering full length.",
        },
      ],
    },
    content: CONDUCTOR_RESISTANCE_CALCULATOR_CONTENT,
  };

const CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate conductor resistance vs temperature: R(T) = R₂₀ × [1 + α(T − 20°C)] for copper and aluminum—compare hot vs. cold Ω before voltage drop and I²R loss estimates.",
    heroSubtitle:
      "Resistance is not fixed—it climbs with conductor temperature. This guide shows how to calculate conductor resistance vs temperature from 20°C baseline R, material temperature coefficient α, and field operating °C.",
    benefits: [
      "Temperature factor: R(T) ÷ R₂₀ = 1 + α(T − 20°C).",
      "Copper α ≈ 0.00393/°C; aluminum α ≈ 0.00403/°C.",
      "Side-by-side R at 20°C and R at operating T in the tool output.",
    ],
    howItWorks: [
      "Compute or enter R₂₀ from ρ, length, and cross-section at 20°C.",
      "Apply operating temperature in °C—ambient plus heating under load if known.",
      "Read R(T) and temperature factor; use hot R for conservative drop math.",
    ],
    faq: [
      {
        q: "How do I calculate resistance at temperature?",
        a: "R(T) = R₂₀ × [1 + α(T − 20)]. Example: R₂₀ = 0.050 Ω copper at 60°C → factor = 1 + 0.00393 × 40 ≈ 1.157 → R(60) ≈ 0.0579 Ω (~16% higher than 20°C).",
      },
      {
        q: "What temperature should I use—ambient or conductor?",
        a: "Use conductor temperature under load when you have it (IR scan, ampacity tables). Otherwise ambient + 20–30°C margin for sun-loaded conduit is a common conservative estimate. Underestimating T underestimates R and voltage drop.",
      },
      {
        q: "Does AC vs DC change the temperature formula?",
        a: "The R(T) relationship is the same—resistivity vs temperature is a material property. AC adds skin effect at high frequency; this calculator uses DC resistance geometry (ρL/A) with temperature correction, typical for PV DC, battery, and low-frequency sizing.",
      },
    ],
    technicalSpecs: [
      "R(T) = R₂₀ × [1 + α(T − 20°C)].",
      "Approx. +0.39%/°C (Cu) and +0.40%/°C (Al) above 20°C.",
      "ΔR = R₂₀ × α × (T − 20).",
      "Related: conductor-resistance-calculator, dc-cable-voltage-drop.",
    ],
  };

const CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_GUIDE: ConductorResistanceTemperatureGuideDefinition =
  {
    slug: CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_GUIDE_HREF,
    toolHref: CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_HREF,
    guideLinkLabel: "Calculate conductor resistance vs temperature",
    title: "Calculate Conductor Resistance vs Temperature",
    description:
      CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_CONTENT.metaDescription,
    keywords: [
      "calculate conductor resistance vs temperature",
      "wire resistance temperature coefficient",
      "r20 to operating temperature resistance",
      "copper resistance at temperature",
      "temperature derating wire resistance",
    ],
    seo: {
      sections: [
        {
          heading: "20°C is a reference, not your roof in July",
          body: "Datasheets and NEC tables often anchor resistivity at 20°C. Installed conductors in conduit on a sunny wall may sit at 50–70°C under load. The vs-temperature calculation scales baseline R by a linear factor in (T − 20). Ten degrees hotter is not negligible—it is roughly 4% more resistance for copper, compounding on long homeruns.",
        },
        {
          heading: "Plot two points: cold start and hot steady state",
          body: "Calculate R at 25°C for morning MPPT current and again at 60°C for afternoon peak. Voltage drop and loss spread between those points bracket real performance. Solar designers who only use 20°C R understate afternoon sag; battery installers who ignore inverter bay heat do the same on interconnects.",
        },
        {
          heading: "Temperature factor exports to other tools",
          body: "The calculator reports R at temperature, R at 20°C, and the dimensionless temperature factor. Multiply any known R₂₀ by the same factor when you have resistance from a different length but the same cable type and T. Then feed hot R into Ohm's law or DC voltage-drop workflows for field-realistic numbers.",
        },
      ],
    },
    content: CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_CONTENT,
  };

const COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Copper vs aluminum wire resistance calculator: compare Cu and Al Ω for the same mm², length, and temperature—ρ ratio, NEC upsizing, and drop/loss tradeoffs before cable BOM.",
    heroSubtitle:
      "Same cross-section does not mean same resistance—copper and aluminum use different resistivity. This guide walks through the copper vs aluminum wire resistance calculator: identical length and mm², material toggle, and operating temperature.",
    benefits: [
      "Aluminum ρ ≈ 61% higher than copper at the same mm² and length.",
      "Fair compare: same L, A, and T—only material changes.",
      "Outputs Ω, R at 20°C, and Ω/m for each material run.",
    ],
    howItWorks: [
      "Enter cross-section (mm²), one-way length (m), and operating °C.",
      "Run once with copper, once with aluminum—or compare mental ρ ratio.",
      "Read resistance gap; upsize Al or shorten run if drop budget is tight.",
    ],
    faq: [
      {
        q: "How much higher is aluminum resistance than copper?",
        a: "At the same mm² and length: R_Al ÷ R_Cu ≈ ρ_Al ÷ ρ_Cu ≈ 0.0282 ÷ 0.0175 ≈ 1.61. Example: 10 mm², 20 m at 25°C → Cu ~0.035 Ω, Al ~0.056 Ω (~61% more). Temperature correction applies equally to both.",
      },
      {
        q: "Why do codes upsize aluminum conductors?",
        a: "Higher ρ means more drop and I²R loss at equal ampacity tables. NEC often requires aluminum one standard size larger than copper for the same breaker rating. Calculate both materials at your actual length before assuming equal mm² is equal performance.",
      },
      {
        q: "When is aluminum still economical?",
        a: "Lower $/kg and lighter weight can win on long feeders when upsized Al still beats copper cost. Run this calculator at upsized Al mm² vs baseline Cu—if resistance matches and material savings hold, the trade is rational; if not, copper may win on drop alone.",
      },
    ],
    technicalSpecs: [
      "R = ρ × L ÷ A; ρ_Cu ≈ 0.0175, ρ_Al ≈ 0.0282 Ω·mm²/m at 20°C.",
      "R_Al / R_Cu ≈ 1.61 for equal geometry.",
      "R(T) uses same α form per material in the tool.",
      "Related: dc-cable-size, residential-voltage-drop, conductor-resistance-calculator.",
    ],
  };

const COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_GUIDE: ConductorResistanceTemperatureGuideDefinition =
  {
    slug: COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "convert",
    href: COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_GUIDE_HREF,
    toolHref: CONDUCTOR_RESISTANCE_TEMPERATURE_TOOL_HREF,
    guideLinkLabel: "Copper vs aluminum wire resistance calculator",
    title: "Copper vs Aluminum Wire Resistance Calculator",
    description:
      COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "copper vs aluminum wire resistance calculator",
      "compare cu and al cable resistance",
      "aluminum wire resistance vs copper",
      "copper aluminum mm2 resistance",
      "wire material resistance comparison",
    ],
    seo: {
      sections: [
        {
          heading: "mm² on the label hides material physics",
          body: "Ten mm² copper and ten mm² aluminum have the same area but different resistivity. Installers comparing quotes on price per meter without a resistance check often discover extra drop after pull-in. Toggle material with length and temperature held constant—the ~1.61× gap is the first filter before ampacity tables and termination practices enter the decision.",
        },
        {
          heading: "Upsized aluminum is the fair fight",
          body: "Code practice may put 12 AWG copper against 10 AWG aluminum for the same circuit. Run the calculator at both mm² pairs on your actual homerun length. If upsized Al still exceeds drop budget, copper or a shorter route wins on engineering—not brand preference. Document Ω for each scenario in the job folder.",
        },
        {
          heading: "Weight and cost follow resistance math",
          body: "Aluminum wins weight per amp when sized correctly; copper wins Ω per mm². Resistance drives inverter clipping, battery sag, and nuisance trips. After comparing Cu vs Al Ω at field temperature, roll forward to voltage-drop and loss dollars—cheaper wire with 30% more R can cost more in energy over a decade than copper upfront.",
        },
      ],
    },
    content: COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  ConductorResistanceTemperatureLandingSlug,
  ConductorResistanceTemperatureGuideDefinition
> = {
  [CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG]:
    CONDUCTOR_RESISTANCE_CALCULATOR_GUIDE,
  [CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG]:
    CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_GUIDE,
  [COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG]:
    COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_GUIDE,
};

export const CONDUCTOR_RESISTANCE_TEMPERATURE_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG,
      href: CONDUCTOR_RESISTANCE_CALCULATOR_GUIDE_HREF,
      label: "Conductor Resistance Calculator",
    },
    {
      slug: CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_LANDING_SLUG,
      href: CALCULATE_CONDUCTOR_RESISTANCE_VS_TEMPERATURE_GUIDE_HREF,
      label: "Calculate Conductor Resistance vs Temperature",
    },
    {
      slug: COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_LANDING_SLUG,
      href: COPPER_VS_ALUMINUM_WIRE_RESISTANCE_CALCULATOR_GUIDE_HREF,
      label: "Copper vs Aluminum Wire Resistance Calculator",
    },
  ];

export function isConductorResistanceTemperatureLandingSlug(
  slug: string
): slug is ConductorResistanceTemperatureLandingSlug {
  return (
    CONDUCTOR_RESISTANCE_TEMPERATURE_LANDING_SLUGS as readonly string[]
  ).includes(slug);
}

export function getConductorResistanceTemperatureLanding(
  slug: ConductorResistanceTemperatureLandingSlug = CONDUCTOR_RESISTANCE_CALCULATOR_LANDING_SLUG
): ConductorResistanceTemperatureGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllConductorResistanceTemperatureLandings(): ConductorResistanceTemperatureGuideDefinition[] {
  return CONDUCTOR_RESISTANCE_TEMPERATURE_LANDING_SLUGS.map((slug) =>
    getConductorResistanceTemperatureLanding(slug)
  );
}

/** Static footer links derived from CONDUCTOR_RESISTANCE_TEMPERATURE_FOOTER_RESOURCES. */
export function getConductorResistanceTemperatureToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return CONDUCTOR_RESISTANCE_TEMPERATURE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export {
  BASE_CALCULATOR_ID as CONDUCTOR_RESISTANCE_TEMPERATURE_CALCULATOR_ID,
};
