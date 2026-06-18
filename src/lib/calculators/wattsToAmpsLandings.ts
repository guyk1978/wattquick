import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const WATTS_TO_AMPS_TOOL_PATH =
  "/tools/electrical-power/watts-to-amps/" as const;

export const WATTS_TO_AMPS_TOOL_HREF = getCalculatorHref(
  "watts-to-amps",
  "power"
);

const BASE_CALCULATOR_ID = "watts-to-amps" as const;

export type WattsToAmpsLandingSlug =
  | "watts-to-amps-calculator"
  | "calculate-amps-from-watts-and-voltage"
  | "convert-watts-to-amps-for-electrical-load";

export const WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG =
  "watts-to-amps-calculator" as const;

export const CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG =
  "calculate-amps-from-watts-and-voltage" as const;

export const CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG =
  "convert-watts-to-amps-for-electrical-load" as const;

export const WATTS_TO_AMPS_LANDING_SLUGS = [
  WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG,
  CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG,
  CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG,
] as const satisfies readonly WattsToAmpsLandingSlug[];

export const WATTS_TO_AMPS_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG
);

export const CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_GUIDE_HREF = getGuideLandingHref(
  CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG
);

export const CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_GUIDE_HREF =
  getGuideLandingHref(CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG);

export type WattsToAmpsGuideDefinition = GuideLandingDefinition & {
  slug: WattsToAmpsLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const WATTS_TO_AMPS_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Watts to amps calculator: convert electrical power to current at any DC or nominal AC voltage. Size fuses, wire gauge, and battery discharge—free, instant.",
  heroSubtitle:
    "Power and voltage determine current. Whether you are checking a 12 V load, sizing an inverter feed, or verifying a breaker label, this guide explains the watts-to-amps relationship before you run the tool.",
  benefits: [
    "Core DC formula: I (A) = P (W) ÷ V (V)—transparent and audit-friendly for field notes.",
    "Works for 12 V, 24 V, 48 V buses and common nominal AC line voltages when power factor is ~1.",
    "Pairs with wire-sizing and battery-runtime calculators once you know amp draw.",
  ],
  howItWorks: [
    "Enter load power in watts (nameplate or measured).",
    "Enter system or circuit voltage in volts.",
    "Read current in amps; round up for fuse and conductor sizing per code practice.",
  ],
  faq: [
    {
      q: "How do I convert watts to amps?",
      a: "Divide watts by volts: Amps = Watts ÷ Volts. Example: 120 W on a 12 V circuit is 10 A. For AC with significant reactive load, use measured or power-factor-adjusted watts when available.",
    },
    {
      q: "Does this work for AC and DC?",
      a: "The same P ÷ V relationship applies when voltage is the value driving current in the circuit. For split-phase AC sizing, use the line-to-neutral or line-to-line voltage that matches how the load is wired.",
    },
    {
      q: "Why do I need amps after watts?",
      a: "Conductors, fuses, breakers, and BMS limits are rated in amps. Converting watts to amps at your bus voltage is the first step before NEC tables, inverter manuals, or battery C-rate checks.",
    },
  ],
  technicalSpecs: [
    "Formula: I (A) = P (W) ÷ V (V); assumes unity power factor unless noted.",
    "Inputs: positive watts and volts.",
    "Output: current (A) with calculation detail string.",
    "Related: amps-to-watts, dc-cable-size, battery-runtime calculators.",
  ],
};

const WATTS_TO_AMPS_CALCULATOR_GUIDE: WattsToAmpsGuideDefinition = {
  slug: WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "power",
  href: WATTS_TO_AMPS_CALCULATOR_GUIDE_HREF,
  toolHref: WATTS_TO_AMPS_TOOL_HREF,
  guideLinkLabel: "Watts to amps calculator",
  title: "Watts to Amps Calculator",
  description: WATTS_TO_AMPS_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "watts to amps calculator",
    "convert watts to amps",
    "power to current calculator",
    "dc amps from watts",
    "watt amp conversion",
  ],
  seo: {
    sections: [
      {
        heading: "Ohm's law and power",
        body: "Power is voltage times current (P = V × I). Rearranging gives I = P ÷ V. For resistive DC loads this is exact; for motors and electronics, use average or nameplate watts at the voltage that supplies the load.",
      },
      {
        heading: "Sizing margin",
        body: "Inrush and startup currents can exceed steady-state amps from a watts ÷ volts calculation. Use the result for continuous rating; consult equipment manuals for peak amps before selecting breakers or battery discharge limits.",
      },
    ],
  },
  content: WATTS_TO_AMPS_CALCULATOR_CONTENT,
};

const CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate amps from watts and voltage: step-by-step guide for DC buses and nominal AC circuits. Size fuses, breakers, and battery discharge with I = P ÷ V.",
  heroSubtitle:
    "You have a watt figure and a bus voltage—now you need amps for wire, fuse, or shunt ratings. This guide walks through calculating current from power and voltage with the assumptions electricians and installers document on every job.",
  benefits: [
    "Single-step math: amps = watts ÷ volts when power factor is effectively unity.",
    "Clarifies which voltage to use (12 V battery, 24 V RV, 120 V branch) so results match the protective device.",
    "Connects the result to NEC-style continuous-load margins and inverter surge specs.",
  ],
  howItWorks: [
    "Confirm load power in watts (continuous, not brief surge unless that is what you are sizing for).",
    "Use the circuit voltage that actually drives current through the conductor or device.",
    "Divide watts by volts; round up for fuse/breaker steps and compare to equipment maximum continuous current.",
  ],
  faq: [
    {
      q: "How do I calculate amps from watts and voltage?",
      a: "Amps = Watts ÷ Volts. A 240 W heater on 120 V draws 2 A. A 600 W inverter load on 12 V is 50 A at the battery—before efficiency loss, which may require dividing by inverter efficiency separately.",
    },
    {
      q: "Which voltage should I enter?",
      a: "Use the voltage at the point where you are rating current: battery terminals for DC inverter feeds, line voltage for branch circuits, or nameplate voltage for appliances. Mixing system voltage with cell voltage produces wrong amps.",
    },
    {
      q: "What about three-phase or power factor?",
      a: "This guide targets single-value P ÷ V for DC and unity-PF AC. Three-phase and reactive loads need √3, power-factor, or measured current—do not apply a simple watts ÷ line voltage without the correct formula for that topology.",
    },
  ],
  technicalSpecs: [
    "Formula: I (A) = P (W) ÷ V (V).",
    "DC: exact for resistive loads at stated bus voltage.",
    "AC unity PF: I ≈ P ÷ V for single-phase resistive loads at nominal V.",
    "Next steps: dc-cable-size, battery C-rate, and breaker sizing per local code.",
  ],
};

const CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_GUIDE: WattsToAmpsGuideDefinition = {
  slug: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "power",
  href: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_GUIDE_HREF,
  toolHref: WATTS_TO_AMPS_TOOL_HREF,
  guideLinkLabel: "Calculate amps from watts and voltage",
  title: "Calculate Amps from Watts and Voltage",
  description: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_CONTENT.metaDescription,
  keywords: [
    "calculate amps from watts and voltage",
    "watts volts to amps",
    "current from power and voltage",
    "how to find amps from watts",
    "electrical current calculation",
  ],
  seo: {
    sections: [
      {
        heading: "Document your assumptions",
        body: "Write watts source (meter, nameplate, estimate), voltage point (battery, panel, device), and whether the load is continuous or intermittent. Amp calculations are only as trustworthy as those three inputs.",
      },
      {
        heading: "Inverter and battery path",
        body: "AC watts at the outlet are not the same as DC amps at the battery. Divide by inverter efficiency if you are back-calculating from AC load to battery current: I_battery ≈ P_AC ÷ (V_dc × η).",
      },
    ],
  },
  content: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_CONTENT,
};

const CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_CONTENT: GuideLandingContent = {
  metaDescription:
    "Convert watts to amps for electrical load: translate appliance and circuit power into current for panel schedules, generator sizing, and conductor ratings at your system voltage.",
  heroSubtitle:
    "Load lists start in watts—panels and overcurrent devices think in amps. Learn how to convert each electrical load from rated power to current so branch circuits, inverters, and backup systems are sized consistently.",
  benefits: [
    "Builds a repeatable load table: device name, watts, voltage, calculated amps, and notes on continuous vs. non-continuous duty.",
    "Supports mixed 120 V branch loads and 12/24/48 V DC appliances on the same worksheet with separate voltage columns.",
    "Highlights when nameplate VA differs from real watts so you do not undersize motor and compressor circuits.",
  ],
  howItWorks: [
    "List each load with nameplate or measured watts and the voltage at its connection point.",
    "Apply I = P ÷ V per row; sum amps only within the same voltage and phase group.",
    "Compare totals to breaker, inverter, or generator continuous-current ratings with code margins.",
  ],
  faq: [
    {
      q: "Why convert watts to amps per load instead of totaling watts first?",
      a: "Summing watts is fine on a single voltage. Mixed-voltage systems (e.g., 120 V AC plus 12 V DC) require converting each load to amps at its bus before comparing to breaker or cable limits on that bus.",
    },
    {
      q: "What counts as continuous electrical load?",
      a: "Loads running three hours or more in a normal duty cycle often need 125% conductor and OCPD sizing under NEC practice. Mark continuous rows in your table before converting watts to amps.",
    },
    {
      q: "How do motors affect the conversion?",
      a: "Use running watts for steady amps; check locked-rotor or LRA for breaker coordination. Watts ÷ volts gives running current, not startup peak.",
    },
  ],
  technicalSpecs: [
    "Per load: I (A) = P (W) ÷ V (V) at connection voltage.",
    "Panel subtotals: sum I per leg/bus; do not sum unlike voltages without conversion.",
    "Continuous load margin: ×1.25 on calculated amps where applicable.",
    "Tool cross-check: watts-to-amps calculator for single-load spot checks.",
  ],
};

const CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_GUIDE: WattsToAmpsGuideDefinition = {
  slug: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "power",
  href: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_GUIDE_HREF,
  toolHref: WATTS_TO_AMPS_TOOL_HREF,
  guideLinkLabel: "Convert watts to amps for electrical load",
  title: "Convert Watts to Amps for Electrical Load",
  description: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_CONTENT.metaDescription,
  keywords: [
    "convert watts to amps for electrical load",
    "electrical load amps from watts",
    "panel load calculation watts",
    "branch circuit current from power",
    "load schedule watts to amps",
  ],
  seo: {
    sections: [
      {
        heading: "From load survey to amp column",
        body: "Walk the site with a clamp meter or nameplate camera. Record watts and voltage per device, convert to amps immediately, and flag anything with poor power factor or high inrush so it is not treated as a simple resistive row.",
      },
      {
        heading: "Generator and inverter limits",
        body: "Inverter continuous amps and generator prime ratings bind on current, not watts alone—at your operating voltage. Converting each load prevents approving a 3 kW inverter for a 3 kW load that draws overcurrent at motor start on a 120 V leg.",
      },
    ],
  },
  content: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_CONTENT,
};

const GUIDES_BY_SLUG: Record<WattsToAmpsLandingSlug, WattsToAmpsGuideDefinition> =
  {
    [WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG]: WATTS_TO_AMPS_CALCULATOR_GUIDE,
    [CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG]:
      CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_GUIDE,
    [CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG]:
      CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_GUIDE,
  };

export const WATTS_TO_AMPS_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG,
    href: WATTS_TO_AMPS_CALCULATOR_GUIDE_HREF,
    label: "Watts to Amps Calculator",
  },
  {
    slug: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_LANDING_SLUG,
    href: CALCULATE_AMPS_FROM_WATTS_AND_VOLTAGE_GUIDE_HREF,
    label: "Calculate Amps from Watts and Voltage",
  },
  {
    slug: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_LANDING_SLUG,
    href: CONVERT_WATTS_TO_AMPS_FOR_ELECTRICAL_LOAD_GUIDE_HREF,
    label: "Convert Watts to Amps for Electrical Load",
  },
];

export function isWattsToAmpsLandingSlug(
  slug: string
): slug is WattsToAmpsLandingSlug {
  return (WATTS_TO_AMPS_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getWattsToAmpsLanding(
  slug: WattsToAmpsLandingSlug = WATTS_TO_AMPS_CALCULATOR_LANDING_SLUG
): WattsToAmpsGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllWattsToAmpsLandings(): WattsToAmpsGuideDefinition[] {
  return WATTS_TO_AMPS_LANDING_SLUGS.map((slug) => getWattsToAmpsLanding(slug));
}

/** Static footer links derived from WATTS_TO_AMPS_FOOTER_RESOURCES. */
export function getWattsToAmpsToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return WATTS_TO_AMPS_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as WATTS_TO_AMPS_CALCULATOR_ID };
