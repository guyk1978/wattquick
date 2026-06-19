import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const WH_TO_AH_TOOL_PATH =
  "/tools/unit-conversion/wh-to-ah/" as const;

export const WH_TO_AH_TOOL_HREF = getCalculatorHref("wh-to-ah", "convert");

const BASE_CALCULATOR_ID = "wh-to-ah" as const;

export type WhToAhLandingSlug =
  | "wh-to-ah-converter"
  | "calculate-amp-hours-from-watt-hours"
  | "battery-capacity-converter-wh-to-ah";

export const WH_TO_AH_CONVERTER_LANDING_SLUG = "wh-to-ah-converter" as const;

export const CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG =
  "calculate-amp-hours-from-watt-hours" as const;

export const BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG =
  "battery-capacity-converter-wh-to-ah" as const;

export const WH_TO_AH_LANDING_SLUGS = [
  WH_TO_AH_CONVERTER_LANDING_SLUG,
  CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG,
  BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG,
] as const satisfies readonly WhToAhLandingSlug[];

export const WH_TO_AH_CONVERTER_GUIDE_HREF = getGuideLandingHref(
  WH_TO_AH_CONVERTER_LANDING_SLUG
);

export const CALCULATE_AMP_HOURS_FROM_WATT_HOURS_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG);

export const BATTERY_CAPACITY_CONVERTER_WH_TO_AH_GUIDE_HREF =
  getGuideLandingHref(BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG);

export type WhToAhGuideDefinition = GuideLandingDefinition & {
  slug: WhToAhLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const WH_TO_AH_CONVERTER_CONTENT: GuideLandingContent = {
  metaDescription:
    "Wh to Ah converter: divide watt-hours by system voltage for amp-hours—size battery banks from energy budgets, match Wh-rated loads to Ah-rated packs.",
  heroSubtitle:
    "Energy targets often arrive in watt-hours; battery shopping lists amp-hours. This guide walks through the Wh to Ah converter: your Wh budget, nominal bus voltage, and equivalent amp-hour capacity.",
  benefits: [
    "Core formula: Ah = Wh ÷ V.",
    "Works backward from solar yield, load budgets, or inverter autonomy targets.",
    "Pairs with Ah to Wh for round-trip battery sizing checks.",
  ],
  howItWorks: [
    "Enter your energy target in watt-hours (Wh)—daily load, bank size, or pack rating.",
    "Add nominal system voltage (12 V, 24 V, 48 V, etc.).",
    "Read equivalent amp-hours (Ah) for bank or pack selection.",
  ],
  faq: [
    {
      q: "How do I convert Wh to Ah?",
      a: "Ah = Wh ÷ V. Example: 1,200 Wh at 12 V → 1,200 ÷ 12 = 100 Ah. The same 1,200 Wh at 48 V needs only 25 Ah—higher voltage means fewer amp-hours for the same energy.",
    },
    {
      q: "When do I need Wh to Ah instead of Ah to Wh?",
      a: "Use Wh to Ah when you start from an energy budget—daily watt-hour load from appliances, solar production in Wh, or inverter runtime math—and need to shop for Ah-rated batteries at your bus voltage.",
    },
    {
      q: "What voltage should I use?",
      a: "Use the nominal voltage your loads and inverter connect to—12 V RV, 24 V marine, 48 V off-grid, or 12.8 V LiFePO4 nominal. Marketing cell voltage (3.7 V) is for single cells, not finished 12 V packs.",
    },
  ],
  technicalSpecs: [
    "Ah = Wh ÷ nominal_V.",
    "Wh = Ah × V (reverse check).",
    "kWh → Wh: multiply by 1,000 before dividing by V.",
    "Related: wh-to-ah, ah-to-wh, battery-bank-size, battery-runtime.",
  ],
};

const WH_TO_AH_CONVERTER_GUIDE: WhToAhGuideDefinition = {
  slug: WH_TO_AH_CONVERTER_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: WH_TO_AH_CONVERTER_GUIDE_HREF,
  toolHref: WH_TO_AH_TOOL_HREF,
  guideLinkLabel: "Wh to Ah converter",
  title: "Wh to Ah Converter",
  description: WH_TO_AH_CONVERTER_CONTENT.metaDescription,
  keywords: [
    "wh to ah converter",
    "watt hours to amp hours",
    "wh ah battery calculator",
    "convert wh to ah",
    "battery capacity from watt hours",
  ],
  seo: {
    sections: [
      {
        heading: "Energy budgets speak Wh; battery labels speak Ah",
        body: "You calculated 2,400 Wh of daily off-grid load, or a 5 kWh solar battery spec lists energy—not amp-hours at your voltage. Dividing Wh by your 12 V, 24 V, or 48 V bus converts that energy target into the Ah number on deep-cycle datasheets. Without this step, you risk undersizing a bank that looks big in Ah at the wrong voltage.",
      },
      {
        heading: "Higher voltage means fewer amp-hours",
        body: "1,200 Wh is 100 Ah at 12 V but only 25 Ah at 48 V—same stored energy, different amp-hour sticker. The Wh to Ah converter keeps voltage explicit so a 48 V quote is not compared to a 12 V Ah listing by mistake. Always enter the voltage the bank will actually run at.",
      },
      {
        heading: "Round-trip with Ah to Wh before you buy",
        body: "Convert Wh → Ah to shortlist packs, then Ah → Wh on each candidate to verify nameplate math matches your budget. Add depth-of-discharge and efficiency after rated Ah—this tool gives nominal capacity equivalence. Follow with Battery Bank Size or Runtime when you need hours of autonomy at real loads.",
      },
    ],
  },
  content: WH_TO_AH_CONVERTER_CONTENT,
};

const CALCULATE_AMP_HOURS_FROM_WATT_HOURS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Calculate amp-hours from watt-hours: Ah = Wh ÷ V step-by-step for any bus voltage—size RV, marine, and solar banks from energy targets before shopping Ah-rated packs.",
  heroSubtitle:
    "Amp-hours are derived—not guessed—from watt-hours and voltage. This guide shows how to calculate amp-hours from watt-hours using the nominal volts your bank will run at.",
  benefits: [
    "Formula: Ah = Wh ÷ nominal voltage.",
    "Convert kWh budgets to Wh, then to Ah at your system voltage.",
    "Reverse check: Wh = Ah × V to verify pack listings.",
  ],
  howItWorks: [
    "Start with watt-hours—daily load total, solar storage target, or pack energy rating.",
    "Divide by nominal bus voltage (12 V, 24 V, 48 V, etc.).",
    "Read required amp-hours for bank sizing and product shortlists.",
  ],
  faq: [
    {
      q: "How do I calculate amp-hours from watt-hours?",
      a: "Ah = Wh ÷ V. Example: 3,840 Wh target at 12 V → 3,840 ÷ 12 = 320 Ah bank. At 48 V the same energy needs 3,840 ÷ 48 = 80 Ah—always state voltage with the result.",
    },
    {
      q: "How do I convert kWh to Ah?",
      a: "First kWh × 1,000 = Wh, then Ah = Wh ÷ V. Example: 5 kWh = 5,000 Wh at 48 V → 5,000 ÷ 48 ≈ 104 Ah. Skipping the Wh step is a common spreadsheet error.",
    },
    {
      q: "Should I add margin after calculating Ah?",
      a: "Yes—this gives rated equivalence only. Apply depth-of-discharge (e.g., need 320 Ah rated for 256 Ah usable at 80% DoD) and inverter/charging efficiency before final purchase. Calculate base Ah from Wh first, then inflate for real-world losses.",
    },
  ],
  technicalSpecs: [
    "Ah = Wh ÷ nominal_V.",
    "Wh from kWh: Wh = kWh × 1,000.",
    "Required rated Ah ≈ (usable Wh ÷ DoD) ÷ V.",
    "Related: wh-to-ah-converter, ah-to-wh, battery-bank-size.",
  ],
};

const CALCULATE_AMP_HOURS_FROM_WATT_HOURS_GUIDE: WhToAhGuideDefinition = {
  slug: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_GUIDE_HREF,
  toolHref: WH_TO_AH_TOOL_HREF,
  guideLinkLabel: "Calculate amp-hours from watt-hours",
  title: "Calculate Amp-Hours from Watt-Hours",
  description: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_CONTENT.metaDescription,
  keywords: [
    "calculate amp-hours from watt-hours",
    "wh to ah formula",
    "watt hours to amp hours calculation",
    "battery ah from wh",
    "kwh to ah calculator",
  ],
  seo: {
    sections: [
      {
        heading: "One division ties energy to capacity",
        body: "Watt-hours answer how much work the bank must store; amp-hours answer what label to search at your voltage. The calculation is a single division—no iterative solver. 2,400 Wh ÷ 12 V is 200 Ah every time. Document voltage beside every Ah result so a 200 Ah 48 V quote is not mistaken for 200 Ah at 12 V.",
      },
      {
        heading: "From appliance Wh stacks to bank Ah",
        body: "Sum daily load in Wh from appliance calculators or interval data. Divide by system voltage for minimum rated Ah before DoD. A 1,800 Wh/day RV budget at 12 V implies 150 Ah nominal—then apply 80% LiFePO4 DoD and you shop for ~188 Ah rated, or parallel two 100 Ah packs with headroom.",
      },
      {
        heading: "kWh specs are Wh with three zeros",
        body: "Residential storage and EV packs market kilowatt-hours. Multiply by 1,000 before dividing by bus voltage. A 10 kWh home battery target at 48 V nominal is 10,000 ÷ 48 ≈ 208 Ah equivalent—useful when comparing a 10 kWh rack quote to 400 Ah 12 V listings that are not the same energy at all.",
      },
    ],
  },
  content: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_CONTENT,
};

const BATTERY_CAPACITY_CONVERTER_WH_TO_AH_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery capacity converter (Wh to Ah): translate watt-hour energy specs to amp-hours at your bus voltage—shop LiFePO4, AGM, and lithium banks from kWh or Wh targets.",
  heroSubtitle:
    "Battery datasheets quote amp-hours; system designs often end in watt-hours. This guide walks through the battery capacity converter (Wh to Ah): energy in Wh, nominal voltage, and the Ah capacity to match on price lists and install quotes.",
  benefits: [
    "Rated Ah = Wh ÷ bus voltage.",
    "Normalize kWh rack specs to 12 V, 24 V, or 48 V Ah shopping lists.",
    "Compare vendor Wh claims to Ah listings before parallel/series layout.",
  ],
  howItWorks: [
    "Enter pack or bank energy in watt-hours (or kWh × 1,000).",
    "Add nominal system voltage your inverter and loads use.",
    "Read equivalent amp-hour capacity for bank sizing and SKU selection.",
  ],
  faq: [
    {
      q: "How does a battery capacity Wh to Ah converter work?",
      a: "Ah = Wh ÷ V. A 4,800 Wh (4.8 kWh) target at 12 V → 400 Ah bank. The same 4,800 Wh at 24 V → 200 Ah. Capacity in amp-hours always depends on voltage—state both when quoting installs.",
    },
    {
      q: "Can I convert a 5 kWh home battery spec to Ah?",
      a: "Yes: 5 kWh = 5,000 Wh. At 48 V nominal → 5,000 ÷ 48 ≈ 104 Ah equivalent. At 12 V that would be ~417 Ah—same energy, very different wiring and BMS. Match voltage to your architecture, not the marketing photo.",
    },
    {
      q: "Does chemistry affect Wh to Ah conversion?",
      a: "The formula Ah = Wh ÷ V is chemistry-neutral. LiFePO4, AGM, and NMC differ in usable DoD and cycle life—not in this math. Apply chemistry after rated Ah: LiFePO4 may use 80–90% of rated Wh; lead-acid often 50%.",
    },
  ],
  technicalSpecs: [
    "Bank Ah = total_Wh ÷ bus_V.",
    "kWh → Wh: multiply by 1,000.",
    "Usable Ah target ≈ (usable_Wh ÷ DoD) ÷ V.",
    "Related: battery-bank-size, ah-to-wh, battery-cost.",
  ],
};

const BATTERY_CAPACITY_CONVERTER_WH_TO_AH_GUIDE: WhToAhGuideDefinition = {
  slug: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "convert",
  href: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_GUIDE_HREF,
  toolHref: WH_TO_AH_TOOL_HREF,
  guideLinkLabel: "Battery capacity converter (Wh to Ah)",
  title: "Battery Capacity Converter (Wh to Ah)",
  description: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_CONTENT.metaDescription,
  keywords: [
    "battery capacity converter wh to ah",
    "convert battery wh to ah",
    "kwh to ah battery bank",
    "battery energy to amp hours",
    "lifepo4 wh to ah sizing",
  ],
  seo: {
    sections: [
      {
        heading: "Wh specs are how energy is sold; Ah is how banks are stocked",
        body: "Wall-mounted 10 kWh systems, portable power stations, and solar quotes lead with kilowatt-hours. Your distributor stocks 100 Ah 12 V boxes. Dividing pack Wh by your bus voltage bridges procurement—without assuming a 400 Ah listing equals 10 kWh unless the voltage matches.",
      },
      {
        heading: "Voltage choice changes the Ah shortlist",
        body: "A fixed 6,000 Wh autonomy target is 500 Ah at 12 V, 250 Ah at 24 V, or 125 Ah at 48 V. Higher voltage reduces copper loss and Ah count but requires compatible inverters and BMS. Run the converter at each voltage you are considering before committing to a bus architecture.",
      },
      {
        heading: "From converted Ah to bank layout",
        body: "Once Ah is known, split across parallel strings for current capacity and series for voltage—Ah and V trade off but Wh stays fixed. Verify each candidate SKU with Ah × V back to Wh. Pair converted Ah with Battery Bank Size when C-rate, fuse limits, or maximum parallel count constrain the physical layout.",
      },
    ],
  },
  content: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_CONTENT,
};

const GUIDES_BY_SLUG: Record<WhToAhLandingSlug, WhToAhGuideDefinition> = {
  [WH_TO_AH_CONVERTER_LANDING_SLUG]: WH_TO_AH_CONVERTER_GUIDE,
  [CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG]:
    CALCULATE_AMP_HOURS_FROM_WATT_HOURS_GUIDE,
  [BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG]:
    BATTERY_CAPACITY_CONVERTER_WH_TO_AH_GUIDE,
};

export const WH_TO_AH_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: WH_TO_AH_CONVERTER_LANDING_SLUG,
    href: WH_TO_AH_CONVERTER_GUIDE_HREF,
    label: "Wh to Ah Converter",
  },
  {
    slug: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_LANDING_SLUG,
    href: CALCULATE_AMP_HOURS_FROM_WATT_HOURS_GUIDE_HREF,
    label: "Calculate Amp-Hours from Watt-Hours",
  },
  {
    slug: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_LANDING_SLUG,
    href: BATTERY_CAPACITY_CONVERTER_WH_TO_AH_GUIDE_HREF,
    label: "Battery Capacity Converter (Wh to Ah)",
  },
];

export function isWhToAhLandingSlug(slug: string): slug is WhToAhLandingSlug {
  return (WH_TO_AH_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getWhToAhLanding(
  slug: WhToAhLandingSlug = WH_TO_AH_CONVERTER_LANDING_SLUG
): WhToAhGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllWhToAhLandings(): WhToAhGuideDefinition[] {
  return WH_TO_AH_LANDING_SLUGS.map((slug) => getWhToAhLanding(slug));
}

/** Static footer links derived from WH_TO_AH_FOOTER_RESOURCES. */
export function getWhToAhToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return WH_TO_AH_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as WH_TO_AH_CALCULATOR_ID };
