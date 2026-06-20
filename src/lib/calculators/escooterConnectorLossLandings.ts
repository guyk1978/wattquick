import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const ESCOOTER_CONNECTOR_LOSS_TOOL_PATH =
  "/tools/e-scooter/escooter-connector-loss/" as const;

export const ESCOOTER_CONNECTOR_LOSS_TOOL_HREF = getCalculatorHref(
  "escooter-connector-loss",
  "escooter"
);

const BASE_CALCULATOR_ID = "escooter-connector-loss" as const;

export type EscooterConnectorLossLandingSlug =
  | "e-scooter-connector-power-loss-calculator"
  | "calculate-connector-heat-and-voltage-drop-i2r"
  | "xt30-vs-xt60-vs-xt90-power-handling-estimator";

export const ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG =
  "e-scooter-connector-power-loss-calculator" as const;

export const CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG =
  "calculate-connector-heat-and-voltage-drop-i2r" as const;

export const XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG =
  "xt30-vs-xt60-vs-xt90-power-handling-estimator" as const;

export const ESCOOTER_CONNECTOR_LOSS_LANDING_SLUGS = [
  ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG,
  CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG,
  XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly EscooterConnectorLossLandingSlug[];

export const ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG);

export const CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG);

export const XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG);

export type EscooterConnectorLossGuideDefinition = GuideLandingDefinition & {
  slug: EscooterConnectorLossLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "E-scooter connector power loss calculator: I²R heat in watts and session Wh at XT30 / XT60 / XT90 pairs—model ride and charge current before loose pins waste range.",
  heroSubtitle:
    "Every amp through a battery connector pair pays an I²R tax. This e-scooter connector power loss calculator turns current draw, connector type, and session minutes into watts lost and watt-hours wasted—before heat and sag show up on the commute.",
  benefits: [
    "Connector loss (W) = amps² × resistance (mΩ ÷ 1000)—quadratic with current.",
    "Session waste (Wh) scales with ride or charge duration at steady draw.",
    "XT30 / XT60 / XT90 presets with typical contact resistance values.",
  ],
  howItWorks: [
    "Enter current draw in amps (ride peak or charge current).",
    "Select connector type—XT30 (~1.5 mΩ), XT60 (~0.8 mΩ), or XT90 (~0.5 mΩ).",
    "Set session duration in minutes—read connector loss in W and session waste in Wh.",
  ],
  faq: [
    {
      q: "What does an e-scooter connector power loss calculator measure?",
      a: "It estimates I²R heat at the connector pair: loss watts = draw amps² × resistance in ohms (from mΩ preset). Session waste (Wh) = loss W × session minutes ÷ 60. It models contact resistance—not full wiring harness drop.",
    },
    {
      q: "Why does current matter more than connector type?",
      a: "Loss scales with amps squared. Doubling current quadruples heat. XT60 at 12 A loses ~0.12 W; at 18 A ~0.26 W. Upgrading XT30 to XT60 helps, but peak amps from hill-climb and launch dominate total waste.",
    },
    {
      q: "Example with default inputs?",
      a: "12 A through XT60 (0.8 mΩ) for 30 min: loss ≈ 0.12 W, session waste ≈ 0.06 Wh. Same session at 18 A: loss ≈ 0.26 W, waste ≈ 0.13 Wh. Loose pins raise effective mΩ beyond presets.",
    },
    {
      q: "Ride vs charge sessions?",
      a: "Use ride peak amps and commute duration for discharge loss; use charger amps and charge time for brick-to-pack heat. Pair with peak-amps and charge-time tools so connector stress matches your real current levels.",
    },
  ],
  technicalSpecs: [
    "Loss (W) = draw amps² × (resistance mΩ ÷ 1000).",
    "Session waste (Wh) = loss W × session minutes ÷ 60.",
    "Presets: XT30 ~1.5 mΩ, XT60 ~0.8 mΩ, XT90 ~0.5 mΩ.",
    "Example: 12 A, XT60, 30 min → ~0.12 W, ~0.06 Wh.",
    "Related: escooter-peak-amps, escooter-charge-time, escooter-range.",
  ],
};

const ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_GUIDE: EscooterConnectorLossGuideDefinition =
  {
    slug: ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_GUIDE_HREF,
    toolHref: ESCOOTER_CONNECTOR_LOSS_TOOL_HREF,
    guideLinkLabel: "E-scooter connector power loss calculator",
    title: "E-Scooter Connector Power Loss Calculator",
    description:
      ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "e-scooter connector power loss calculator",
      "xt60 power loss scooter",
      "connector i2r heat escooter",
      "xt30 xt90 resistance loss",
      "battery connector watts wasted",
      "escooter wiring heat",
    ],
    seo: {
      sections: [
        {
          heading: "I²R at the pin pair",
          body: "An e-scooter connector power loss calculator focuses on contact resistance where pack meets controller or charger. Small mΩ values still matter when phase current hits teens of amps—loss grows with the square of draw, so launch peaks cost more than cruise amps on the same connector.",
        },
        {
          heading: "XT30 vs XT60 vs XT90",
          body: "Higher-current pairs quote lower typical mΩ, but only help when pins are fully seated. Model your actual connector label in the tool, then reseat and retighten if loss watts climb above preset expectations—oxidized contacts behave like a smaller gauge link.",
        },
        {
          heading: "Wh waste adds to range and charge plans",
          body: "Session waste in Wh is small on a single commute but repeats every ride and charge cycle. Cross-check peak amps from acceleration, charge brick amps, and range Wh/km so connector heat is budgeted alongside pack C-rate and charge-time taper.",
        },
      ],
    },
    content: ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_CONTENT,
  };

const CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate connector heat and voltage drop (I²R): heat watts = I²R and drop volts = I×R at XT30/XT60/XT90 mΩ presets—see how 12 A vs 18 A scales heat and sag at the pin pair.",
    heroSubtitle:
      "Contact resistance turns amps into heat and a small voltage drop at the connector. Calculate connector heat and voltage drop (I²R): the tool reports loss watts from I²R; multiply amps by R (mΩ ÷ 1000) for drop volts on the same preset.",
    benefits: [
      "Heat (W) = amps² × R—same I²R the tool outputs as connector loss.",
      "Voltage drop (V) = amps × R from the preset mΩ—explains pack sag at the pins.",
      "Compare XT30 vs XT60 at identical amps—lower mΩ cuts both heat and drop.",
    ],
    howItWorks: [
      "Enter current draw (A) and pick XT30, XT60, or XT90 resistance preset.",
      "Read connector loss (W)—that is I²R heat at the contact pair.",
      "Voltage drop (V) ≈ amps × (mΩ ÷ 1000)—add session minutes for Wh waste.",
    ],
    faq: [
      {
        q: "How do I calculate connector heat and voltage drop (I²R)?",
        a: "Convert mΩ to Ω (÷ 1000). Heat watts = I² × R. Voltage drop volts = I × R. The calculator outputs I²R as connector loss (W). Example: 12 A, XT60 (0.8 mΩ = 0.0008 Ω): heat ≈ 0.12 W, drop ≈ 0.0096 V (~10 mV).",
      },
      {
        q: "Why is heat I²R but drop only I×R?",
        a: "Both use the same contact resistance. Power dissipated as heat is I²R; the voltage lost across the connector is I×R (Ohm's law). Doubling amps doubles drop but quadruples heat—peak launches heat pins faster than they sag voltage.",
      },
      {
        q: "Example: 18 A on XT30 vs XT60?",
        a: "XT30 ~1.5 mΩ: heat ≈ 0.49 W, drop ≈ 27 mV. XT60 ~0.8 mΩ: heat ≈ 0.26 W, drop ≈ 14 mV. Same amps through a better pair halves heat and roughly halves drop—loose pins raise effective mΩ beyond presets.",
      },
      {
        q: "Does connector drop affect range?",
        a: "Small per-pin drops add to pack sag under peak amps—the controller sees slightly lower voltage. Pair I²R heat with peak-amps and range tools so burst current, connector loss, and SOC sag are modeled on the same commute.",
      },
    ],
    technicalSpecs: [
      "R (Ω) = connector mΩ ÷ 1000.",
      "Heat / loss (W) = amps² × R (I²R).",
      "Voltage drop (V) = amps × R.",
      "12 A, XT60 (0.8 mΩ): ~0.12 W heat, ~10 mV drop.",
      "Related: e-scooter-connector-power-loss-calculator, escooter-peak-amps.",
    ],
  };

const CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_GUIDE: EscooterConnectorLossGuideDefinition =
  {
    slug: CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_GUIDE_HREF,
    toolHref: ESCOOTER_CONNECTOR_LOSS_TOOL_HREF,
    guideLinkLabel: "Calculate connector heat and voltage drop (I²R)",
    title: "Calculate Connector Heat and Voltage Drop (I²R)",
    description:
      CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_CONTENT.metaDescription,
    keywords: [
      "calculate connector heat and voltage drop i2r",
      "i squared r connector heat",
      "connector voltage drop escooter",
      "xt60 contact resistance drop",
      "battery connector sag amps",
      "i2r loss watts scooter",
    ],
    seo: {
      sections: [
        {
          heading: "One resistance, two metrics",
          body: "To calculate connector heat and voltage drop (I²R), start from the same mΩ preset. I²R gives watts heating the pin pair; I×R gives volts the pack loses at that instant. Commuters often notice heat before millivolt drop—but both climb when peak amps rise.",
        },
        {
          heading: "Peaks punish I²R first",
          body: "Hill sprints and hard launches square current in the heat term while drop rises linearly. A connector that looks fine at 8 A cruise can run warm at 18 A peak even when sag is only tens of millivolts. Model peak amps from the peak-amps tool, not cruise averages.",
        },
        {
          heading: "Fix contacts before upsizing wire",
          body: "Oxidized or loose XT60 pins behave like higher mΩ—more I²R heat and more drop. Reseat connectors when loss watts exceed preset expectations; only then compare XT30 upgrade paths or shorter harness runs.",
        },
      ],
    },
    content: CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_CONTENT,
  };

const XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "XT30 vs XT60 vs XT90 power handling estimator: compare I²R loss watts and session Wh at identical amps—~1.5 / 0.8 / 0.5 mΩ presets for light commuter vs upgraded pack wiring.",
    heroSubtitle:
      "Connector labels imply current headroom, but contact mΩ sets real heat under your amps. This XT30 vs XT60 vs XT90 power handling estimator runs the same draw through each preset—see which pair keeps I²R loss lowest before you swap wiring or charge faster.",
    benefits: [
      "Side-by-side loss (W) at fixed amps: XT30 ~1.5 mΩ, XT60 ~0.8 mΩ, XT90 ~0.5 mΩ.",
      "Session Wh scales with the same three presets—compare waste on a 30 min commute.",
      "Hold amps constant—isolate connector choice from peak-amps and charge-current changes.",
    ],
    howItWorks: [
      "Fix current draw (A) and session minutes—run the calculator three times.",
      "Select XT30, then XT60, then XT90—note connector loss (W) and session waste (Wh).",
      "Match preset to OEM wiring; upgrade label only when peak and charge amps justify lower mΩ.",
    ],
    faq: [
      {
        q: "How does an XT30 vs XT60 vs XT90 power handling estimator work?",
        a: "At the same amps, loss W = I² × R with R from each preset mΩ. XT30 (~1.5 mΩ) dissipates roughly 3× the heat of XT90 (~0.5 mΩ) at identical current. The estimator compares planning numbers—not manufacturer continuous amp labels alone.",
      },
      {
        q: "Example at 12 A for 30 minutes?",
        a: "12 A, 30 min: XT30 ~0.22 W (~0.11 Wh); XT60 ~0.12 W (~0.06 Wh); XT90 ~0.07 W (~0.04 Wh). Doubling to 18 A roughly scales loss by 2.25× on each connector—peaks matter more than label size on paper.",
      },
      {
        q: "When should I move from XT30 to XT60?",
        a: "When peak ride or charge amps regularly exceed what a light pair can carry cool—often alongside higher C-rate packs and 3–4 A bricks. Model your actual peak amps; if XT30 loss at peak exceeds ~0.4 W, XT60 or better seating is worth planning.",
      },
      {
        q: "Is XT90 required on commuter scooters?",
        a: "Most 36 / 48 V commuter decks ship XT60; XT90 is common on high-amp builds. Run the estimator at your peak-amps result—if XT60 loss stays modest (~0.3 W at 18 A), XT90 may add bulk without meaningful Wh savings.",
      },
    ],
    technicalSpecs: [
      "Presets: XT30 ~1.5 mΩ, XT60 ~0.8 mΩ, XT90 ~0.5 mΩ.",
      "Loss (W) = amps² × (mΩ ÷ 1000); Wh = W × min ÷ 60.",
      "12 A, 30 min: XT30 ~0.22 W; XT60 ~0.12 W; XT90 ~0.07 W.",
      "18 A, 30 min: XT30 ~0.49 W; XT60 ~0.26 W; XT90 ~0.16 W.",
      "Related: calculate-connector-heat-and-voltage-drop-i2r, escooter-peak-amps.",
    ],
  };

const XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_GUIDE: EscooterConnectorLossGuideDefinition =
  {
    slug: XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "escooter",
    href: XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_GUIDE_HREF,
    toolHref: ESCOOTER_CONNECTOR_LOSS_TOOL_HREF,
    guideLinkLabel: "XT30 vs XT60 vs XT90 power handling estimator",
    title: "XT30 vs XT60 vs XT90 Power Handling Estimator",
    description:
      XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "xt30 vs xt60 vs xt90 power handling estimator",
      "xt60 vs xt30 escooter connector",
      "xt90 battery connector amps",
      "connector mohm comparison scooter",
      "upgrade xt30 to xt60",
      "i2r loss by connector type",
    ],
    seo: {
      sections: [
        {
          heading: "Labels rank size; mΩ ranks heat",
          body: "An XT30 vs XT60 vs XT90 power handling estimator compares contact resistance presets at your actual amps—not just the amp rating printed on the housing. Lower mΩ at the same current means lower I²R watts and less session Wh burned at the pin pair.",
        },
        {
          heading: "Run three presets at peak, not cruise",
          body: "Commuter cruise may sit near 8–12 A while hill launches hit 18 A or more. Re-run XT30, XT60, and XT90 at peak amps from the peak-amps tool—the spread between labels widens when current squares in the loss term.",
        },
        {
          heading: "Upgrade path: seat, then size, then harness",
          body: "Before swapping XT30 for XT90, reseat pins and check for heat discoloration. If loss at XT60 presets still exceeds expectations after cleaning contacts, then consider a larger pair and matched gauge wire—charge-time amps should agree with the connector tier you choose.",
        },
      ],
    },
    content: XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  EscooterConnectorLossLandingSlug,
  EscooterConnectorLossGuideDefinition
> = {
  [ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG]:
    ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_GUIDE,
  [CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG]:
    CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_GUIDE,
  [XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG]:
    XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_GUIDE,
};

/** Landing guide links shown in the E-Scooter Connector Loss tool footer Resources column. */
export const ESCOOTER_CONNECTOR_LOSS_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG,
      href: ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_GUIDE_HREF,
      label: "E-Scooter Connector Power Loss Calculator",
    },
    {
      slug: CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_LANDING_SLUG,
      href: CALCULATE_CONNECTOR_HEAT_AND_VOLTAGE_DROP_I2R_GUIDE_HREF,
      label: "Calculate Connector Heat and Voltage Drop (I²R)",
    },
    {
      slug: XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_LANDING_SLUG,
      href: XT30_VS_XT60_VS_XT90_POWER_HANDLING_ESTIMATOR_GUIDE_HREF,
      label: "XT30 vs XT60 vs XT90 Power Handling Estimator",
    },
  ];

export function isEscooterConnectorLossLandingSlug(
  slug: string
): slug is EscooterConnectorLossLandingSlug {
  return (ESCOOTER_CONNECTOR_LOSS_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getEscooterConnectorLossLanding(
  slug: EscooterConnectorLossLandingSlug = ESCOOTER_CONNECTOR_POWER_LOSS_CALCULATOR_LANDING_SLUG
): EscooterConnectorLossGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEscooterConnectorLossLandings(): EscooterConnectorLossGuideDefinition[] {
  return ESCOOTER_CONNECTOR_LOSS_LANDING_SLUGS.map((slug) =>
    getEscooterConnectorLossLanding(slug)
  );
}

/** Static footer links derived from ESCOOTER_CONNECTOR_LOSS_FOOTER_RESOURCES. */
export function getEscooterConnectorLossToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return ESCOOTER_CONNECTOR_LOSS_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as ESCOOTER_CONNECTOR_LOSS_CALCULATOR_ID };
