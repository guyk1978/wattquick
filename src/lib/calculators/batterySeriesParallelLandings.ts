import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const BATTERY_SERIES_PARALLEL_TOOL_PATH =
  "/tools/battery-calculators/battery-series-parallel/" as const;

export const BATTERY_SERIES_PARALLEL_TOOL_HREF = getCalculatorHref(
  "battery-series-parallel",
  "battery"
);

const BASE_CALCULATOR_ID = "battery-series-parallel" as const;

export type BatterySeriesParallelLandingSlug =
  | "battery-series-and-parallel-calculator"
  | "calculate-battery-pack-voltage-and-capacity"
  | "series-parallel-battery-layout-calculator-wh";

export const BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG =
  "battery-series-and-parallel-calculator" as const;

export const CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG =
  "calculate-battery-pack-voltage-and-capacity" as const;

export const SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG =
  "series-parallel-battery-layout-calculator-wh" as const;

export const BATTERY_SERIES_PARALLEL_LANDING_SLUGS = [
  BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG,
  CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG,
  SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG,
] as const satisfies readonly BatterySeriesParallelLandingSlug[];

export const BATTERY_SERIES_AND_PARALLEL_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG);

export const CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_GUIDE_HREF =
  getGuideLandingHref(CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG);

export const SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_GUIDE_HREF =
  getGuideLandingHref(SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG);

export type BatterySeriesParallelGuideDefinition = GuideLandingDefinition & {
  slug: BatterySeriesParallelLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const BATTERY_SERIES_AND_PARALLEL_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery series and parallel calculator: enter S count, P count, cell V and Ah—get pack voltage, total amp-hours, Wh, and a 4S2P-style configuration label for DIY lithium banks.",
  heroSubtitle:
    "Series strings raise voltage; parallel strings raise amp-hours. This battery series and parallel calculator turns cell specs and your S/P layout into total V, Ah, watt-hours, and a configuration tag before you order cells or a BMS.",
  benefits: [
    "Pack V = series count × cell voltage.",
    "Pack Ah = parallel count × cell Ah.",
    "Wh = total V × total Ah with an S×P configuration label.",
  ],
  howItWorks: [
    "Enter how many cells are in series per string (S).",
    "Enter how many identical strings run in parallel (P).",
    "Add nominal cell voltage and cell Ah—read pack V, Ah, Wh, and nSnP.",
  ],
  faq: [
    {
      q: "How does a battery series and parallel calculator work?",
      a: "Multiply series count by cell voltage for pack voltage. Multiply parallel count by cell amp-hours for pack Ah. Pack Wh = V × Ah. Example: 4S2P with 3.2 V 100 Ah LiFePO4 cells → 12.8 V, 200 Ah, 2,560 Wh, labeled 4S2P.",
    },
    {
      q: "What does 4S2P mean?",
      a: "Four cells in series per string (4S) and two strings wired in parallel (2P). Voltage follows the series count; capacity follows the parallel count. The calculator prints this label from your inputs so BOM and BMS orders match the physical layout.",
    },
    {
      q: "Must all cells match in a series-parallel pack?",
      a: "Yes—use matched capacity and age within each parallel string, and a BMS rated for your series count. Mixing old and new cells in parallel causes imbalance and early cutoff. Re-run the calculator when you change S or P before buying interconnects.",
    },
  ],
  technicalSpecs: [
    "Pack V = S × cell_V.",
    "Pack Ah = P × cell_Ah.",
    "Pack Wh = pack_V × pack_Ah.",
    "Configuration = {S}S{P}P (e.g. 4S2P).",
    "Related: battery-series-parallel, battery-bank-size, battery-energy, ah-to-wh.",
  ],
};

const BATTERY_SERIES_AND_PARALLEL_CALCULATOR_GUIDE: BatterySeriesParallelGuideDefinition =
  {
    slug: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_GUIDE_HREF,
    toolHref: BATTERY_SERIES_PARALLEL_TOOL_HREF,
    guideLinkLabel: "Battery series and parallel calculator",
    title: "Battery Series and Parallel Calculator",
    description: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "battery series and parallel calculator",
      "series parallel battery calculator",
      "battery bank voltage ah calculator",
      "4s2p battery calculator",
      "diy lithium pack calculator",
    ],
    seo: {
      sections: [
        {
          heading: "Series adds volts, parallel adds amp-hours",
          body: "Wiring cells in series stacks voltage—four 3.2 V LiFePO4 cells become 12.8 V at the same per-string amp-hours. Paralleling two matched strings doubles amp-hours while voltage stays at the series total. A battery series and parallel calculator applies both rules in one step so you do not manually multiply twice before checking watt-hours.",
        },
        {
          heading: "Wh captures the finished pack energy",
          body: "Voltage and amp-hours trade off, but energy in watt-hours is what runtime and inverter sizing care about. After S and P resolve pack V and Ah, multiply for Wh. A 4S2P 100 Ah 3.2 V block is 2,560 Wh whether you think in cells or strings—document that figure on interconnection sketches and fuse worksheets.",
        },
        {
          heading: "Match the BMS and bus to your nSnP label",
          body: "The configuration tag—4S2P, 16S1P, 7S4P—must match how cells are physically wired and how the BMS counts series groups. Use the calculator early in DIY bank design, then verify fuse rating, charger voltage, and inverter DC input against the printed pack voltage. Pair with Battery Bank Size when C-rate or maximum parallel strings constrain the layout.",
        },
      ],
    },
    content: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_CONTENT,
  };

const CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate battery pack voltage and capacity from cell specs: series count × cell V for pack volts, parallel count × cell Ah for pack amp-hours—then Wh for energy at the bus.",
    heroSubtitle:
      "Cell datasheets list single-cell V and Ah; your inverter and fuse chart need pack-level numbers. Use this guide to calculate battery pack voltage and capacity from series and parallel strings before wiring a DIY or rack-mounted bank.",
    benefits: [
      "Derives pack voltage from series cell count and nominal V.",
      "Derives pack amp-hours from parallel strings and cell Ah.",
      "Combines V × Ah into watt-hours for load and runtime planning.",
    ],
    howItWorks: [
      "Note per-cell nominal voltage and amp-hour rating from the datasheet.",
      "Count series cells per string and parallel strings in the bank.",
      "Read calculated pack V, pack Ah, and total Wh at the main bus.",
    ],
    faq: [
      {
        q: "How do I calculate battery pack voltage and capacity?",
        a: "Pack voltage = cells in series × cell voltage. Pack capacity (Ah) = strings in parallel × cell Ah. Example: 4S2P with 3.2 V 280 Ah cells → 12.8 V pack, 560 Ah pack capacity, 7,168 Wh. Series sets V; parallel sets Ah.",
      },
      {
        q: "Is pack capacity the same as cell capacity?",
        a: "Only when P = 1 (one string). Each added parallel string sums amp-hours at the same voltage. A 16S4P layout quadruples Ah versus 16S1P but keeps the same series voltage—verify your BMS and charger match that bus V.",
      },
      {
        q: "Nominal vs. full-charge voltage—which do I use?",
        a: "Use nominal (e.g. 3.2 V LiFePO4, 3.7 V NMC) for planning Ah × V energy and runtime. Use max charge voltage per cell × series count when sizing chargers and BMS high-voltage cutoff—not the same number, but both come from the same S count.",
      },
    ],
    technicalSpecs: [
      "Pack_V = S × cell_nominal_V.",
      "Pack_Ah = P × cell_Ah.",
      "Pack_Wh = Pack_V × Pack_Ah.",
      "Use matched cells within each parallel string.",
      "Related: battery-series-parallel, battery-energy, battery-bank-size.",
    ],
  };

const CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_GUIDE: BatterySeriesParallelGuideDefinition =
  {
    slug: CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_GUIDE_HREF,
    toolHref: BATTERY_SERIES_PARALLEL_TOOL_HREF,
    guideLinkLabel: "Calculate battery pack voltage and capacity",
    title: "Calculate Battery Pack Voltage and Capacity",
    description:
      CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_CONTENT.metaDescription,
    keywords: [
      "calculate battery pack voltage and capacity",
      "battery pack voltage calculator",
      "battery pack ah calculator",
      "series parallel pack voltage",
      "lithium pack capacity calculator",
    ],
    seo: {
      sections: [
        {
          heading: "From cell datasheet to pack bus numbers",
          body: "Vendors sell cells; installers wire packs. To calculate battery pack voltage and capacity, multiply series count by per-cell nominal volts for the DC bus, and multiply parallel count by cell amp-hours for deliverable charge at that voltage. A 7S2P 3.7 V 5 Ah pouch becomes 25.9 V and 10 Ah—not 5 Ah at 3.7 V.",
        },
        {
          heading: "Voltage and amp-hours answer different questions",
          body: "Pack voltage must match inverter DC input, charger output, and fuse coordination. Pack amp-hours set how long a given amp draw can run before cutoff. Wh merges both for energy comparisons—two banks with the same Wh can differ in V and Ah, so document all three on the one-line diagram.",
        },
        {
          heading: "Validate before paralleling strings",
          body: "Capacity math assumes matched strings—same cell model, similar age, and balanced state of charge at hookup. After calculating target V and Ah, confirm cable gauge and BMS series count against the physical layout. Re-run when you add a parallel string or change series depth so procurement and protection devices stay aligned.",
        },
      ],
    },
    content: CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_CONTENT,
  };

const SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Series-parallel battery layout calculator (Wh): map your S×P cell layout to pack voltage, amp-hours, and total watt-hours—compare DIY lithium, RV, and off-grid bank energy before wiring.",
    heroSubtitle:
      "Layout choices change volts and amp-hours but energy in Wh is what you size loads against. This series-parallel battery layout calculator (Wh) reads your series count, parallel strings, and cell specs into total pack watt-hours plus an nSnP label.",
    benefits: [
      "Wh = (S × cell V) × (P × cell Ah) from your layout inputs.",
      "Compare alternative S/P splits at the same cell count.",
      "Outputs configuration tag for BMS and wiring diagrams.",
    ],
    howItWorks: [
      "Sketch cells in series per string and strings in parallel.",
      "Enter S, P, nominal cell V, and cell Ah in the tool.",
      "Read pack Wh alongside V and Ah—use Wh for runtime and solar yield.",
    ],
    faq: [
      {
        q: "What does a series-parallel battery layout calculator (Wh) show?",
        a: "It converts your physical layout into pack watt-hours: Wh = pack V × pack Ah, where V = S × cell V and Ah = P × cell Ah. Example: 16S1P vs 8S2P with the same 32 cells—both can yield similar Wh but different bus voltage and amp-hour split.",
      },
      {
        q: "Can I compare layouts with the same number of cells?",
        a: "Yes—total cell count is S × P. Rearranging series and parallel changes V and Ah but Wh stays constant when cell chemistry and capacity match. Pick the layout that fits your inverter DC range and cable current, then confirm Wh meets load energy.",
      },
      {
        q: "Why plan in Wh instead of amp-hours alone?",
        a: "Amp-hours without voltage mis-rank packs—a 100 Ah 12 V bank (1,200 Wh) differs from 100 Ah at 48 V (4,800 Wh). Wh is the layout-independent energy figure for runtime, solar storage, and comparing module SKUs.",
      },
    ],
    technicalSpecs: [
      "Pack Wh = (S × cell_V) × (P × cell_Ah).",
      "Cell count = S × P.",
      "Wh constant for fixed cell count when chemistry matches.",
      "Configuration label: {S}S{P}P.",
      "Related: battery-series-parallel, battery-energy, ah-to-wh.",
    ],
  };

const SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_GUIDE: BatterySeriesParallelGuideDefinition =
  {
    slug: SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "battery",
    href: SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_GUIDE_HREF,
    toolHref: BATTERY_SERIES_PARALLEL_TOOL_HREF,
    guideLinkLabel: "Series-parallel battery layout calculator (Wh)",
    title: "Series-Parallel Battery Layout Calculator (Wh)",
    description:
      SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_CONTENT.metaDescription,
    keywords: [
      "series-parallel battery layout calculator wh",
      "battery layout watt hour calculator",
      "series parallel wh calculator",
      "diy battery pack wh calculator",
      "battery bank energy from layout",
    ],
    seo: {
      sections: [
        {
          heading: "Layout is volts × amp-hours, energy is Wh",
          body: "A series-parallel battery layout calculator (Wh) starts from how cells are wired, not from a finished module sticker. Series depth sets bus voltage; parallel width sets amp-hours; multiplying both yields watt-hours. Document Wh on the layout sketch so runtime and inverter sizing use one number everyone agrees on.",
        },
        {
          heading: "Same cells, different S/P, same Wh",
          body: "Thirty-two 3.2 V 100 Ah cells are 10,240 Wh whether wired 16S2P or 8S4P—but bus voltage and per-string current differ. Higher series counts favor high-voltage inverters; more parallel strings spread amp draw. Use Wh to confirm energy is preserved, then pick the layout that matches equipment limits.",
        },
        {
          heading: "From Wh on paper to Wh in service",
          body: "Calculated Wh assumes matched cells and nominal voltage—field banks lose margin to BMS reserve, temperature, and age. After layout Wh is set, derate for depth-of-discharge and round-trip efficiency when chaining to Battery Runtime or solar yield tools. Re-run the calculator when you add strings or change series depth.",
        },
      ],
    },
    content: SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  BatterySeriesParallelLandingSlug,
  BatterySeriesParallelGuideDefinition
> = {
  [BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG]:
    BATTERY_SERIES_AND_PARALLEL_CALCULATOR_GUIDE,
  [CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG]:
    CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_GUIDE,
  [SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG]:
    SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_GUIDE,
};

/** Landing guide links shown in the Battery Series & Parallel tool footer Resources column. */
export const BATTERY_SERIES_PARALLEL_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG,
      href: BATTERY_SERIES_AND_PARALLEL_CALCULATOR_GUIDE_HREF,
      label: "Battery Series and Parallel Calculator",
    },
    {
      slug: CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_LANDING_SLUG,
      href: CALCULATE_BATTERY_PACK_VOLTAGE_AND_CAPACITY_GUIDE_HREF,
      label: "Calculate Battery Pack Voltage and Capacity",
    },
    {
      slug: SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_LANDING_SLUG,
      href: SERIES_PARALLEL_BATTERY_LAYOUT_CALCULATOR_WH_GUIDE_HREF,
      label: "Series-Parallel Battery Layout Calculator (Wh)",
    },
  ];

export function isBatterySeriesParallelLandingSlug(
  slug: string
): slug is BatterySeriesParallelLandingSlug {
  return (BATTERY_SERIES_PARALLEL_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getBatterySeriesParallelLanding(
  slug: BatterySeriesParallelLandingSlug = BATTERY_SERIES_AND_PARALLEL_CALCULATOR_LANDING_SLUG
): BatterySeriesParallelGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllBatterySeriesParallelLandings(): BatterySeriesParallelGuideDefinition[] {
  return BATTERY_SERIES_PARALLEL_LANDING_SLUGS.map((slug) =>
    getBatterySeriesParallelLanding(slug)
  );
}

/** Static footer links derived from BATTERY_SERIES_PARALLEL_FOOTER_RESOURCES. */
export function getBatterySeriesParallelToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return BATTERY_SERIES_PARALLEL_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as BATTERY_SERIES_PARALLEL_CALCULATOR_ID };
