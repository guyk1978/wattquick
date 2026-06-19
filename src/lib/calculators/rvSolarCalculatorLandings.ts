import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const RV_SOLAR_CALCULATOR_TOOL_PATH =
  "/tools/rv-marine-power/rv-solar-calculator/" as const;

export const RV_SOLAR_CALCULATOR_TOOL_HREF = getCalculatorHref(
  "rv-solar-calculator",
  "rv-marine"
);

const BASE_CALCULATOR_ID = "rv-solar-calculator" as const;

export type RvSolarCalculatorLandingSlug =
  | "off-grid-solar-system-sizing-calculator"
  | "calculate-solar-panel-and-battery-capacity-for-off-grid-loads"
  | "12v-24v-solar-power-system-estimator";

export const OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG =
  "off-grid-solar-system-sizing-calculator" as const;

export const CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG =
  "calculate-solar-panel-and-battery-capacity-for-off-grid-loads" as const;

export const TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG =
  "12v-24v-solar-power-system-estimator" as const;

export const RV_SOLAR_CALCULATOR_LANDING_SLUGS = [
  OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG,
  CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG,
  TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG,
] as const satisfies readonly RvSolarCalculatorLandingSlug[];

export const OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG);

export const CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG
  );

export const TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_GUIDE_HREF =
  getGuideLandingHref(TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG);

export type RvSolarCalculatorGuideDefinition = GuideLandingDefinition & {
  slug: RvSolarCalculatorLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Off-grid solar system sizing calculator for RV and camper setups: match rooftop panel yield to daily house Wh, peak sun hours, and 12V/24V bank shortfall—free, instant.",
  heroSubtitle:
    "Off-grid solar sizing starts with honest daily load and realistic sun—not sticker panel watts alone. This guide walks through the RV solar and house battery calculator so you see whether rooftop harvest covers fridge, lights, and inverter draws before you buy more hardware.",
  benefits: [
    "Daily yield Wh = panel W × peak sun h × system efficiency—compared directly to daily load Wh.",
    "Shows bank Ah headroom when harvest falls short of house consumption at your bus voltage.",
    "Pairs with solar panel size and battery bank tools for full off-grid and boondocking planning.",
  ],
  howItWorks: [
    "Enter installed or planned panel watts, site peak sun hours, and system efficiency (typical 75–85%).",
    "Add total daily house load in Wh/day—fridge, lights, pumps, inverter loads.",
    "Set house voltage (12 V or 24 V); review daily solar yield vs. load and any Ah bank shortfall.",
  ],
  faq: [
    {
      q: "How do I size an off-grid solar system for an RV?",
      a: "Compare daily harvest to daily use. Harvest ≈ panel W × sun h × efficiency. Example: 400 W × 5 h × 0.80 = 1,600 Wh/day. If load is 1,800 Wh/day, you are 200 Wh short—about 17 Ah extra bank at 12 V before overnight margin. Increase panels, cut load, or add storage.",
    },
    {
      q: "What daily Wh should I use for RV house loads?",
      a: "Sum appliance Wh/day: fridge often 400–800 Wh, LED lighting 50–150 Wh, water pump and fans 100–300 Wh, inverter loads as needed. A smart-plug audit beats guessing—enter the total in the calculator.",
    },
    {
      q: "Should I use summer or winter sun hours for sizing?",
      a: "Use winter or shoulder-season sun hours for conservative off-grid sizing—especially if you boondock year-round. Summer surplus does not help on a cloudy November week unless you size storage for those gaps.",
    },
  ],
  technicalSpecs: [
    "Daily yield Wh = panel_W × peak_sun_h × (efficiency ÷ 100).",
    "Shortfall Wh = load Wh − yield Wh when yield < load.",
    "Bank Ah headroom ≈ shortfall Wh ÷ house voltage.",
    "Related: solar-panel-size, solar-battery-bank, solar-roof-space.",
  ],
};

const OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_GUIDE: RvSolarCalculatorGuideDefinition =
  {
    slug: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "rv-marine",
    href: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_GUIDE_HREF,
    toolHref: RV_SOLAR_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "Off-grid solar system sizing calculator",
    title: "Off-Grid Solar System Sizing Calculator",
    description: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "off-grid solar system sizing calculator",
      "rv off grid solar sizing",
      "camper solar panel calculator",
      "boondocking solar yield vs load",
      "rv house battery solar balance",
    ],
    seo: {
      sections: [
        {
          heading: "Harvest must beat the house load",
          body: "Rooftop space is finite—every panel should earn its keep against real Wh/day, not brochure STC ratings. The calculator compares what your array harvests in peak-sun-equivalent hours against what the house draws. A shortfall shows up as Ah you must carry in the bank until the next sunny day.",
        },
        {
          heading: "Efficiency is not optional",
          body: "Wiring, controller, temperature, and partial shade eat harvest. An 80% system efficiency factor on 400 W panels is more honest than assuming nameplate output all afternoon. Size with that margin before you commit to lithium upgrades or a second roof rack.",
        },
      ],
    },
    content: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_CONTENT,
  };

const CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate solar panel and battery capacity for off-grid loads: size rooftop PV watts and house bank Ah from daily Wh, peak sun hours, and 12V/24V bus voltage for RV and camper systems.",
    heroSubtitle:
      "Panel watts and battery amp-hours both answer to the same daily Wh budget. Build an honest load list first—fridge cycles, inverter draws, lighting—then see whether your panels refill the bank and how much Ah headroom you need when the sky turns gray.",
    benefits: [
      "Links daily load Wh to minimum panel watts via sun hours and system efficiency.",
      "Translates harvest shortfall into Ah bank headroom at 12 V or 24 V house voltage.",
      "Helps compare adding panels vs. deepening the house bank when boondocking margins are thin.",
    ],
    howItWorks: [
      "Total daily off-grid Wh from appliance audit (fridge, HVAC fan, pumps, electronics).",
      "Run panel W, sun hours, and efficiency to get daily solar yield Wh.",
      "If yield < load, read Ah bank headroom; increase panels, load, or voltage inputs to test upgrades.",
    ],
    faq: [
      {
        q: "How do I calculate solar panel capacity for off-grid RV loads?",
        a: "Minimum panel W ≈ daily Wh ÷ (peak sun h × efficiency). Example: 2,000 Wh/day ÷ (4.5 h × 0.80) ≈ 556 W rooftop. Cross-check in the RV calculator: enter that array and your load—yield should meet or exceed Wh/day.",
      },
      {
        q: "How do I calculate battery capacity for off-grid loads?",
        a: "When solar yield falls short, shortfall Wh ÷ house voltage ≈ Ah drawn from the bank that day. For multi-day autonomy, multiply daily shortfall (or full daily load on zero-sun days) by backup days and divide by usable DoD. The tool surfaces Ah headroom for a single-day gap.",
      },
      {
        q: "Panels first or batteries first?",
        a: "Fix the daily Wh balance first—panels that cover load reduce how hard you cycle the bank. If yield already exceeds load but you still run out overnight, deepen Ah storage. If yield trails load every day, more panel watts (or less consumption) comes before a bigger bank.",
      },
    ],
    technicalSpecs: [
      "Panel W (min) ≈ daily load Wh ÷ (peak sun h × efficiency fraction).",
      "Daily yield Wh = panel W × sun h × efficiency.",
      "Bank Ah shortfall ≈ (load Wh − yield Wh) ÷ house voltage when yield < load.",
      "Related: solar-battery-bank, battery-bank-size, fridge-energy-usage.",
    ],
  };

const CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_GUIDE: RvSolarCalculatorGuideDefinition =
  {
    slug: CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "rv-marine",
    href: CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_GUIDE_HREF,
    toolHref: RV_SOLAR_CALCULATOR_TOOL_HREF,
    guideLinkLabel:
      "Calculate solar panel and battery capacity for off-grid loads",
    title: "Calculate Solar Panel and Battery Capacity for Off-Grid Loads",
    description:
      CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_CONTENT.metaDescription,
    keywords: [
      "calculate solar panel and battery capacity for off-grid loads",
      "rv solar panel battery sizing",
      "off grid camper pv and ah",
      "boondocking battery bank calculator",
      "house battery ah rv solar",
    ],
    seo: {
      sections: [
        {
          heading: "One daily Wh ledger",
          body: "Off-grid design fails when loads live in separate spreadsheets. Fridge, inverter, and lighting Wh belong in one daily total—the same number you enter as house load. Panel and bank sizing both read from that ledger; changing one appliance changes both answers.",
        },
        {
          heading: "Panels harvest; batteries bridge",
          body: "Panel capacity answers how fast you refill during sun hours. Bank Ah answers what happens when harvest stops at dusk—or for the second cloudy day. The RV calculator shows the gap between yield and load in Wh and Ah so you know which side of the system to grow.",
        },
      ],
    },
    content:
      CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_CONTENT,
  };

const TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "12V/24V solar power system estimator for RV and camper house banks: model daily Wh yield vs. load, convert shortfall to Ah at 12 V or 24 V, and size rooftop panels for boondocking.",
    heroSubtitle:
      "Most RV and marine house systems run at 12 V or 24 V. The same daily Wh shortfall is half the amps at 24 V as at 12 V—enter your house voltage, panel watts, sun hours, and load to see whether your low-voltage stack keeps up.",
    benefits: [
      "Models 12 V and 24 V house buses with the same Wh yield vs. load math.",
      "Converts energy gaps to Ah—lower current and smaller cables at 24 V for the same Wh.",
      "Built for camper fridges, LED lighting, and inverter loads on standard RV voltages.",
    ],
    howItWorks: [
      "Choose house voltage—12 V is common on older campers; 24 V on many coaches and builds.",
      "Enter panel watts, peak sun hours, efficiency %, and daily house load Wh.",
      "Compare daily yield to load; read surplus Wh or Ah bank headroom at your bus voltage.",
    ],
    faq: [
      {
        q: "How do I estimate a 12V RV solar power system?",
        a: "Daily yield ≈ panel W × sun h × efficiency. Example: 300 W × 5 h × 0.80 = 1,200 Wh/day. At 1,500 Wh load, shortfall is 300 Wh—25 Ah at 12 V. Add panels, cut load, or carry 25+ Ah usable headroom in the house bank.",
      },
      {
        q: "Is 24V better than 12V for RV solar?",
        a: "Same Wh need either way—24 V halves amperage for identical power, which helps on long wire runs and heavy inverter loads. Many OEM RVs stay 12 V; coach and DIY builds often choose 24 V. This calculator accepts either house voltage input.",
      },
      {
        q: "How does daily Wh relate to my 12V or 24V Ah rating?",
        a: "Ah ≈ Wh ÷ voltage. A 400 Wh daily shortfall is about 33 Ah at 12 V or 17 Ah at 24 V. Nameplate bank Ah must exceed that after depth-of-discharge limits—lithium and lead-acid usable Ah differ.",
      },
    ],
    technicalSpecs: [
      "Daily yield Wh = panel_W × peak_sun_h × (efficiency ÷ 100).",
      "Shortfall Ah ≈ (load Wh − yield Wh) ÷ house voltage (12 or 24).",
      "Surplus Wh = yield Wh − load Wh when panels exceed consumption.",
      "Related: battery-bank-size, inverter-sizing, camping-fridge-runtime.",
    ],
  };

const TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_GUIDE: RvSolarCalculatorGuideDefinition =
  {
    slug: TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "rv-marine",
    href: TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_GUIDE_HREF,
    toolHref: RV_SOLAR_CALCULATOR_TOOL_HREF,
    guideLinkLabel: "12V/24V solar power system estimator",
    title: "12V/24V Solar Power System Estimator",
    description:
      TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_CONTENT.metaDescription,
    keywords: [
      "12v 24v solar power system estimator",
      "12 volt rv solar calculator",
      "24 volt camper solar sizing",
      "rv house battery 12v 24v",
      "boondocking solar ah calculator",
    ],
    seo: {
      sections: [
        {
          heading: "Voltage changes amps, not energy",
          body: "A 1,800 Wh daily load is the same whether the bus is 12 V or 24 V—the amp-hour draw on the bank differs. Enter the voltage your coach actually runs so shortfall Ah matches your monitor and shunt readings.",
        },
        {
          heading: "12 V familiarity vs. 24 V efficiency",
          body: "12 V components dominate the RV aftermarket—controllers, fuses, and appliances are easy to find. 24 V reduces current for the same wattage, which matters when the inverter runs microwave or AC loads. Either way, panel yield must cover daily Wh before voltage choice saves you.",
        },
      ],
    },
    content: TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  RvSolarCalculatorLandingSlug,
  RvSolarCalculatorGuideDefinition
> = {
  [OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG]:
    OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_GUIDE,
  [CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG]:
    CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_GUIDE,
  [TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG]:
    TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_GUIDE,
};

export const RV_SOLAR_CALCULATOR_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG,
      href: OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_GUIDE_HREF,
      label: "Off-Grid Solar System Sizing Calculator",
    },
    {
      slug: CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_LANDING_SLUG,
      href: CALCULATE_SOLAR_PANEL_AND_BATTERY_CAPACITY_FOR_OFF_GRID_LOADS_GUIDE_HREF,
      label: "Calculate Solar Panel and Battery Capacity for Off-Grid Loads",
    },
    {
      slug: TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_LANDING_SLUG,
      href: TWELVE_V_TWENTY_FOUR_V_SOLAR_POWER_SYSTEM_ESTIMATOR_GUIDE_HREF,
      label: "12V/24V Solar Power System Estimator",
    },
  ];

export function isRvSolarCalculatorLandingSlug(
  slug: string
): slug is RvSolarCalculatorLandingSlug {
  return (RV_SOLAR_CALCULATOR_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getRvSolarCalculatorLanding(
  slug: RvSolarCalculatorLandingSlug = OFF_GRID_SOLAR_SYSTEM_SIZING_CALCULATOR_LANDING_SLUG
): RvSolarCalculatorGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllRvSolarCalculatorLandings(): RvSolarCalculatorGuideDefinition[] {
  return RV_SOLAR_CALCULATOR_LANDING_SLUGS.map((slug) =>
    getRvSolarCalculatorLanding(slug)
  );
}

/** Static footer links derived from RV_SOLAR_CALCULATOR_FOOTER_RESOURCES. */
export function getRvSolarCalculatorToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return RV_SOLAR_CALCULATOR_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as RV_SOLAR_CALCULATOR_CALCULATOR_ID };
