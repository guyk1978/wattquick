import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const SOLAR_PANEL_SIZE_TOOL_PATH =
  "/tools/solar-power/solar-panel-size/" as const;

export const SOLAR_PANEL_SIZE_TOOL_HREF = getCalculatorHref(
  "solar-panel-size",
  "solar"
);

const BASE_CALCULATOR_ID = "solar-panel-size" as const;

export type SolarPanelSizeLandingSlug =
  | "solar-panel-size-calculator"
  | "estimate-solar-panel-wattage-needed"
  | "calculate-solar-capacity-from-daily-energy-usage";

export const SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG =
  "solar-panel-size-calculator" as const;

export const ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG =
  "estimate-solar-panel-wattage-needed" as const;

export const CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG =
  "calculate-solar-capacity-from-daily-energy-usage" as const;

export const SOLAR_PANEL_SIZE_LANDING_SLUGS = [
  SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG,
  ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG,
  CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG,
] as const satisfies readonly SolarPanelSizeLandingSlug[];

export const SOLAR_PANEL_SIZE_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG
);

export const ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_GUIDE_HREF = getGuideLandingHref(
  ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG
);

export const CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_GUIDE_HREF =
  getGuideLandingHref(
    CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG
  );

export type SolarPanelSizeGuideDefinition = GuideLandingDefinition & {
  slug: SolarPanelSizeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const SOLAR_PANEL_SIZE_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Solar panel size calculator: estimate minimum array wattage from daily energy use, peak sun hours, and system efficiency. Plan off-grid, RV, and backup PV before you buy modules—free, instant.",
  heroSubtitle:
    "Panel sizing starts with honest daily watt-hours and realistic sun data—not nameplate sticker watts alone. This guide walks through the solar panel size calculator logic so your array matches load, not guesswork.",
  benefits: [
    "Clear formula: minimum panel W ≈ daily Wh ÷ (peak sun hours × system efficiency).",
    "Uses location-based peak sun hours instead of assuming full noon all day.",
    "Shows intermediate values so you can cross-check against solar daily yield and battery bank planners.",
  ],
  howItWorks: [
    "Enter total daily energy need in watt-hours (sum loads × hours or use a load audit).",
    "Set peak sun hours for your site and season—typical values range from 3–6 hours.",
    "Apply system efficiency (default ~80%) for wiring, controller, and inverter losses, then review minimum panel watts.",
  ],
  faq: [
    {
      q: "How do I calculate solar panel size in watts?",
      a: "Divide daily watt-hours by the product of peak sun hours and system efficiency (as a decimal). Example: 2,400 Wh ÷ (5 h × 0.80) ≈ 600 W minimum array rating before safety margin.",
    },
    {
      q: "What are peak sun hours?",
      a: "Peak sun hours are the equivalent full-sun hours per day for your location—one peak hour equals about 1,000 W/m² irradiance. Winter, tilt, and shading lower this number; use seasonal data when sizing off-grid systems.",
    },
    {
      q: "Should I add extra panel capacity beyond the calculator result?",
      a: "Yes. Real installs need headroom for cloudy days, battery round-trip loss, and inverter clipping. Many designers add 20–30% on top of the minimum watts unless a detailed yield model is used.",
    },
  ],
  technicalSpecs: [
    "Formula: panel_W ≈ daily_Wh ÷ (peak_sun_h × efficiency_fraction).",
    "Inputs: positive Wh/day, sun hours, and efficiency (1–100%).",
    "Output: minimum panel wattage at STC nameplate—not guaranteed daily harvest.",
    "Planning margin: +20–30% recommended for weather and storage losses.",
  ],
};

const SOLAR_PANEL_SIZE_CALCULATOR_GUIDE: SolarPanelSizeGuideDefinition = {
  slug: SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "solar",
  href: SOLAR_PANEL_SIZE_CALCULATOR_GUIDE_HREF,
  toolHref: SOLAR_PANEL_SIZE_TOOL_HREF,
  guideLinkLabel: "Solar panel size calculator",
  title: "Solar Panel Size Calculator",
  description: SOLAR_PANEL_SIZE_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "solar panel size calculator",
    "solar panel calculator",
    "pv sizing calculator",
    "minimum solar panel wattage",
    "size solar array from daily energy",
  ],
  seo: {
    sections: [
      {
        heading: "Daily Wh drives the array",
        body: "Nameplate panel watts are laboratory figures. Your load budget in watt-hours per day sets how much harvest you must collect. Start with an appliance and runtime list, convert to Wh, then work backward to required array watts using sun hours at your site.",
      },
      {
        heading: "Efficiency is not optional",
        body: "PWM controllers, long DC runs, hot modules, and partial shade all reduce delivered energy. The efficiency field accounts for system-level loss between the module face and usable Wh at the battery or load. Underestimating efficiency oversizes expectations and undersizes the array.",
      },
    ],
  },
  content: SOLAR_PANEL_SIZE_CALCULATOR_CONTENT,
};

const ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate solar panel wattage needed from daily energy consumption, peak sun hours, and system losses. Step-by-step guide for RV, cabin, and backup PV before ordering modules.",
  heroSubtitle:
    "How many watts of panels do you actually need? Start with the watt-hours your loads consume each day, then divide by realistic sun hours and efficiency—this guide shows the estimate before you buy hardware.",
  benefits: [
    "Works backward from load: daily Wh → required harvest → minimum array watts at your site.",
    "Accounts for peak sun hours by season and latitude instead of assuming 8 h of full sun.",
    "Highlights when to add 20–30% headroom for clouds, batteries, and inverter losses.",
  ],
  howItWorks: [
    "Total daily watt-hours from appliances, pumps, lighting, and standby draws.",
    "Look up or estimate peak sun hours for your location and worst-case month.",
    "Divide Wh by (sun hours × efficiency); the result is baseline panel wattage before safety margin.",
  ],
  faq: [
    {
      q: "How do I estimate solar panel wattage needed for my home or cabin?",
      a: "Add up daily Wh (watts × hours for each load). Divide by peak sun hours and system efficiency. Example: 3,000 Wh/day ÷ (4.5 h × 0.85) ≈ 784 W of panels minimum—then add margin for weather.",
    },
    {
      q: "How many watts of solar per 1,000 Wh of daily use?",
      a: "It depends on sun hours and efficiency. At 5 peak hours and 80% efficiency, 1,000 Wh/day needs about 250 W of array rating. At 3 peak hours the same load needs roughly 417 W.",
    },
    {
      q: "Is estimated wattage the same as what I will produce each day?",
      a: "No. The estimate is nameplate STC watts sized to meet your Wh budget on average. Actual harvest varies with tilt, temperature, shading, and season—use solar daily yield tools to sanity-check output.",
    },
  ],
  technicalSpecs: [
    "Estimate: panel_W ≈ daily_Wh ÷ (peak_sun_h × efficiency).",
    "Sun hours: use monthly or winter values for conservative off-grid sizing.",
    "Efficiency: 75–85% typical for small PWM systems; MPPT often higher.",
    "Margin: +20–30% on result unless a multi-day storage model is applied.",
  ],
};

const ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_GUIDE: SolarPanelSizeGuideDefinition = {
  slug: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "solar",
  href: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_GUIDE_HREF,
  toolHref: SOLAR_PANEL_SIZE_TOOL_HREF,
  guideLinkLabel: "Estimate solar panel wattage needed",
  title: "Estimate Solar Panel Wattage Needed",
  description: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_CONTENT.metaDescription,
  keywords: [
    "estimate solar panel wattage needed",
    "how many watts of solar panels do i need",
    "solar panel wattage estimate",
    "calculate solar watts from daily energy",
    "minimum solar watts for load",
  ],
  seo: {
    sections: [
      {
        heading: "Load audit before panel count",
        body: "Wattage estimates fail when daily Wh is wrong. List each device with runtime—fridge duty cycles, pump hours, inverter idle draw. A 10% error in Wh propagates directly into undersized or oversized array quotes.",
      },
      {
        heading: "From watts needed to module count",
        body: "Once you have minimum array watts, divide by your chosen module rating (e.g., 400 W) and round up. Roof layout, string voltage limits, and MPPT window may force a slightly larger physical array than the Wh math alone.",
      },
    ],
  },
  content: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_CONTENT,
};

const CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Calculate solar capacity from daily energy usage: convert Wh/day into minimum array wattage using peak sun hours and system efficiency. Guide for off-grid, RV, and homestead PV planning.",
    heroSubtitle:
      "Daily energy usage is the anchor for every solar capacity calculation. This guide shows how to turn kWh or Wh per day into the panel watts your site must harvest—before batteries, inverters, or roof layout enter the picture.",
    benefits: [
      "Starts from measured or estimated daily kWh/Wh—not vague panel counts.",
      "Separates consumption from harvest: usage sets demand; sun hours set supply rate.",
      "Connects to array sizing formula used in the interactive solar panel size tool.",
    ],
    howItWorks: [
      "Build a daily energy budget: fixed loads (Wh) plus variable runtime devices.",
      "Convert monthly kWh bills to Wh/day if grid history is your starting point (÷ ~30).",
      "Divide daily Wh by peak sun hours and efficiency to get minimum solar capacity in watts.",
    ],
    faq: [
      {
        q: "How do I calculate solar capacity from daily energy usage?",
        a: "Sum daily watt-hours, then panel_W ≈ Wh ÷ (peak_sun_h × efficiency). Example: 4.8 kWh/day (4,800 Wh) with 5 sun hours and 80% efficiency needs about 1,200 W of array rating before weather margin.",
      },
      {
        q: "Can I use my electric bill instead of a load list?",
        a: "For grid-tied planning, monthly kWh ÷ days gives average daily use—but peak days matter for backup sizing. For off-grid, a load audit is more reliable than bill averages because duty cycles and seasonal loads differ.",
      },
      {
        q: "Is solar capacity the same as inverter size?",
        a: "No. Array capacity (W) is how much energy you can harvest per day. Inverter watts are instantaneous power limits. Size the array from daily Wh; size the inverter from peak simultaneous load watts.",
      },
    ],
    technicalSpecs: [
      "Capacity: panel_W ≈ daily_Wh ÷ (peak_sun_h × efficiency).",
      "Usage input: Wh/day or kWh/day × 1,000.",
      "Sun hours: site-specific; winter values size conservative off-grid arrays.",
      "Next step: pair with battery bank and charge-controller tools after array W is set.",
    ],
  };

const CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_GUIDE: SolarPanelSizeGuideDefinition =
  {
    slug: CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "solar",
    href: CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_GUIDE_HREF,
    toolHref: SOLAR_PANEL_SIZE_TOOL_HREF,
    guideLinkLabel: "Calculate solar capacity from daily energy usage",
    title: "Calculate Solar Capacity from Daily Energy Usage",
    description:
      CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_CONTENT.metaDescription,
    keywords: [
      "calculate solar capacity from daily energy usage",
      "solar capacity from daily kwh",
      "daily energy usage solar sizing",
      "wh per day to solar watts",
      "pv capacity from consumption",
    ],
    seo: {
      sections: [
        {
          heading: "From usage to harvest requirement",
          body: "Daily usage tells you how many watt-hours must land in the battery or load each day. Solar capacity is the hardware rate needed to collect that energy given how many effective sun hours your roof or ground mount receives. Undersized arrays never catch up; oversized arrays waste capital unless storage can absorb surplus.",
        },
        {
          heading: "Seasonal usage swings",
          body: "Heating, irrigation, and workshop loads often peak in months with fewer sun hours. Size from worst-case month Wh and sun-hour pairs—not annual averages alone—when autonomy matters. Summer surplus does not help a winter deficit without storage or load shifting.",
        },
      ],
    },
    content: CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  SolarPanelSizeLandingSlug,
  SolarPanelSizeGuideDefinition
> = {
  [SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG]: SOLAR_PANEL_SIZE_CALCULATOR_GUIDE,
  [ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG]:
    ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_GUIDE,
  [CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG]:
    CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_GUIDE,
};

export const SOLAR_PANEL_SIZE_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG,
    href: SOLAR_PANEL_SIZE_CALCULATOR_GUIDE_HREF,
    label: "Solar Panel Size Calculator",
  },
  {
    slug: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_LANDING_SLUG,
    href: ESTIMATE_SOLAR_PANEL_WATTAGE_NEEDED_GUIDE_HREF,
    label: "Estimate Solar Panel Wattage Needed",
  },
  {
    slug: CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_LANDING_SLUG,
    href: CALCULATE_SOLAR_CAPACITY_FROM_DAILY_ENERGY_USAGE_GUIDE_HREF,
    label: "Calculate Solar Capacity from Daily Energy Usage",
  },
];

export function isSolarPanelSizeLandingSlug(
  slug: string
): slug is SolarPanelSizeLandingSlug {
  return (SOLAR_PANEL_SIZE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getSolarPanelSizeLanding(
  slug: SolarPanelSizeLandingSlug = SOLAR_PANEL_SIZE_CALCULATOR_LANDING_SLUG
): SolarPanelSizeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllSolarPanelSizeLandings(): SolarPanelSizeGuideDefinition[] {
  return SOLAR_PANEL_SIZE_LANDING_SLUGS.map((slug) =>
    getSolarPanelSizeLanding(slug)
  );
}

/** Static footer links derived from SOLAR_PANEL_SIZE_FOOTER_RESOURCES. */
export function getSolarPanelSizeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return SOLAR_PANEL_SIZE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as SOLAR_PANEL_SIZE_CALCULATOR_ID };
