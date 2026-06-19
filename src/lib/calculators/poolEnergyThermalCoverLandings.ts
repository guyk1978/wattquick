import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const POOL_ENERGY_THERMAL_COVER_TOOL_PATH =
  "/tools/pool-power/pool-energy-thermal-cover/" as const;

export const POOL_ENERGY_THERMAL_COVER_TOOL_HREF = getCalculatorHref(
  "pool-energy-thermal-cover",
  "pool"
);

const BASE_CALCULATOR_ID = "pool-energy-thermal-cover" as const;

export type PoolEnergyThermalCoverLandingSlug =
  | "pool-heating-cost-calculator"
  | "heat-pump-vs-electric-pool-heater-cost-calculator"
  | "pool-energy-savings-with-thermal-cover";

export const POOL_HEATING_COST_CALCULATOR_LANDING_SLUG =
  "pool-heating-cost-calculator" as const;

export const HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG =
  "heat-pump-vs-electric-pool-heater-cost-calculator" as const;

export const POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG =
  "pool-energy-savings-with-thermal-cover" as const;

export const POOL_ENERGY_THERMAL_COVER_LANDING_SLUGS = [
  POOL_HEATING_COST_CALCULATOR_LANDING_SLUG,
  HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG,
  POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG,
] as const satisfies readonly PoolEnergyThermalCoverLandingSlug[];

export const POOL_HEATING_COST_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  POOL_HEATING_COST_CALCULATOR_LANDING_SLUG
);

export const HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG);

export const POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_GUIDE_HREF =
  getGuideLandingHref(POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG);

export type PoolEnergyThermalCoverGuideDefinition = GuideLandingDefinition & {
  slug: PoolEnergyThermalCoverLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const POOL_HEATING_COST_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Pool heating cost calculator: estimate daily and annual electricity for pool pumps, resistance vs. heat pump COP, and thermal cover savings on evaporation heat loss—free pool energy math.",
  heroSubtitle:
    "Pool heating cost is pump kWh plus grid kWh to replace heat lost to evaporation—not just the heater sticker. This guide walks through the pool heating cost calculator: pump power, run hours, electricity rate, heating method, COP, and optional thermal cover savings.",
  benefits: [
    "Separates pump energy from heating energy so you see what the heater actually costs.",
    "Compares resistance (COP 1) vs. heat pump (COP 4–6) on the same thermal load.",
    "Models thermal cover savings on heat demand—typical 30–50% less evaporation loss.",
  ],
  howItWorks: [
    "Enter pool pump kW, daily run hours, and your $/kWh electricity rate.",
    "Choose electric resistance or heat pump heating and set COP for the heat pump case.",
    "Toggle thermal cover and pick a savings % to see daily cost and annual heating savings.",
  ],
  faq: [
    {
      q: "How do I calculate pool heating cost?",
      a: "Daily heating grid kWh ≈ heat demand ÷ COP. Resistance COP = 1; heat pumps often COP 4–6. Add pump kWh = pump kW × hours/day. Daily cost = (pump kWh + heating kWh) × $/kWh. Example: 12 kWh thermal load, COP 5 heat pump → 2.4 kWh heating + 12 kWh pump at 1.5 kW × 8 h → 14.4 kWh/day × $0.14 ≈ $2.02/day.",
    },
    {
      q: "Heat pump vs. electric resistance for pool heating?",
      a: "Resistance delivers 1 kWh of heat per kWh of electricity. A heat pump moves heat from ambient air into the water, so the same comfort often needs 4–6× less grid energy. The calculator shows monthly heating cost for both methods on the same load so you can see dollars saved switching to a heat pump.",
    },
    {
      q: "Does a thermal cover reduce pool heating cost?",
      a: "Yes—covers cut evaporation, which is the largest heat loss on many outdoor pools. Savings apply to thermal load, not pump kWh. Typical blankets save 30–50% on heat demand; enter your cover type in the calculator to see annual $ saved alongside heating technology choices.",
    },
  ],
  technicalSpecs: [
    "Daily pump kWh = pump_kW × hours/day.",
    "Heating grid kWh = heat_demand_kWh ÷ COP (1 for resistance, 4–6 for heat pumps).",
    "Cover reduces heat demand by selected % before COP is applied.",
    "Related: pool-energy-thermal-cover, heat-pump-vs-resistance, ac-inverter-savings.",
  ],
};

const POOL_HEATING_COST_CALCULATOR_GUIDE: PoolEnergyThermalCoverGuideDefinition = {
  slug: POOL_HEATING_COST_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "pool",
  href: POOL_HEATING_COST_CALCULATOR_GUIDE_HREF,
  toolHref: POOL_ENERGY_THERMAL_COVER_TOOL_HREF,
  guideLinkLabel: "Pool heating cost calculator",
  title: "Pool Heating Cost Calculator",
  description: POOL_HEATING_COST_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "pool heating cost calculator",
    "pool heater electricity cost",
    "pool heat pump vs electric cost",
    "swimming pool heating cost estimate",
    "pool energy cost per month",
  ],
  seo: {
    sections: [
      {
        heading: "Pump kWh and heater kWh are separate lines",
        body: "A 1.5 kW pump running eight hours adds 12 kWh/day whether the water is 68 °F or 82 °F. Heating cost comes from replacing heat lost—mostly evaporation on an open pool. The calculator keeps pump and heating math separate so you do not blame the pump for heater bills or vice versa.",
      },
      {
        heading: "COP is the lever on heating dollars",
        body: "Resistance heaters stay at COP 1: every kWh on the meter becomes one kWh in the water. Pool heat pumps commonly run COP 4–6 because they transfer ambient heat instead of creating it. On the same thermal load, COP 5 cuts grid kWh to one-fifth of resistance—dollar savings scale with your $/kWh rate.",
      },
      {
        heading: "Covers lower the load before COP applies",
        body: "A thermal blanket reduces evaporation heat loss—often 30–50% depending on fit and climate. That savings hits heat demand first; then COP converts the smaller load to grid kWh. Pump hours stay the same, but heater run time and cost drop. Model both upgrades together to see combined annual savings.",
      },
    ],
  },
  content: POOL_HEATING_COST_CALCULATOR_CONTENT,
};

const HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_CONTENT: GuideLandingContent =
  {
    metaDescription:
      "Heat pump vs electric pool heater cost calculator: compare resistance (COP 1) and heat pump (COP 4–6) monthly heating dollars on the same pool thermal load—see grid kWh and annual savings.",
    heroSubtitle:
      "Electric resistance and pool heat pumps heat the same water—but not with the same grid kWh. This guide walks through the heat pump vs electric pool heater cost calculator: same thermal load, COP-adjusted heating kWh, and side-by-side monthly cost bars.",
    benefits: [
      "Apples-to-apples comparison: identical heat demand, different COP for each heater type.",
      "Shows monthly heating cost for resistance vs. heat pump at your electricity rate.",
      "Annual HP vs. electric savings line pairs with pump cost and optional cover savings.",
    ],
    howItWorks: [
      "Enter pump kW and run hours—the tool models heat demand from that operating profile.",
      "Set heat pump COP (typically 4–6); resistance stays at COP 1 automatically.",
      "Read monthly heating cost bars and annual savings switching from electric to heat pump.",
    ],
    faq: [
      {
        q: "How much cheaper is a pool heat pump vs electric resistance?",
        a: "Heating grid kWh = heat demand ÷ COP. At COP 5, a heat pump uses about one-fifth the grid kWh of resistance for the same thermal load—roughly 80% less heating electricity. Dollar savings = (resistance kWh − heat pump kWh) × $/kWh. Example: 30 kWh/day thermal load → 30 kWh resistance vs 6 kWh at COP 5 → 24 kWh saved × $0.14 ≈ $3.36/day on heating alone.",
      },
      {
        q: "What COP should I use for a pool heat pump?",
        a: "Many air-source pool heat pumps run COP 4–6 in mild weather; colder ambient air lowers COP. Start with COP 5 in the calculator, then try 4 for conservative winter estimates or 6 for mild-climate shoulder seasons. Resistance is always COP 1.",
      },
      {
        q: "Does pump electricity count in the heat pump vs electric comparison?",
        a: "Pump kWh is the same either way—the comparison isolates heating cost. The visual bars show monthly heating dollars for resistance vs. heat pump on the modeled thermal load. Total daily cost adds pump kWh plus whichever heating method you actually use.",
      },
    ],
    technicalSpecs: [
      "Resistance heating kWh = heat_demand_kWh ÷ 1.",
      "Heat pump heating kWh = heat_demand_kWh ÷ COP (4–6 typical).",
      "Monthly heating $ = daily_heating_kWh × 30 × $/kWh per method.",
      "Related: pool-heating-cost-calculator, heat-pump-vs-resistance, pool-energy-thermal-cover.",
    ],
  };

const HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_GUIDE: PoolEnergyThermalCoverGuideDefinition =
  {
    slug: HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "pool",
    href: HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_GUIDE_HREF,
    toolHref: POOL_ENERGY_THERMAL_COVER_TOOL_HREF,
    guideLinkLabel: "Heat pump vs electric pool heater cost calculator",
    title: "Heat Pump vs Electric Pool Heater Cost Calculator",
    description:
      HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "heat pump vs electric pool heater cost calculator",
      "pool heat pump vs electric heater",
      "swimming pool heat pump savings",
      "electric pool heater vs heat pump cost",
      "pool heater COP comparison",
    ],
    seo: {
      sections: [
        {
          heading: "Same heat load, different meter kWh",
          body: "Both heater types must replace the same evaporation and conduction losses. Resistance converts electricity directly to heat at COP 1. A heat pump moves ambient energy into the water, so one grid kWh can deliver several kWh of heat. The calculator holds thermal load constant and only changes COP—so the cost gap is technology, not wishful smaller pools.",
        },
        {
          heading: "Read the monthly bars, not just COP labels",
          body: "COP 5 sounds abstract until you see resistance at $180/month and heat pump at $36/month on the same load. The comparison visual translates COP into dollars at your $/kWh rate. That is the number that justifies equipment quotes—not the brochure efficiency line alone.",
        },
        {
          heading: "When resistance still wins on paper",
          body: "Very short swim seasons, rarely heated water, or gas backup can shrink electric heating hours. If you only heat a few weeks a year, upfront heat pump cost may dominate operating savings—run annual dollars here with realistic pump hours and cover use before deciding.",
        },
      ],
    },
    content: HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_CONTENT,
  };

const POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_CONTENT: GuideLandingContent = {
  metaDescription:
    "Pool energy savings with thermal cover: estimate monthly and annual kWh and dollar savings from a pool blanket on evaporation heat loss—30–50% typical—alongside pump and heater costs.",
  heroSubtitle:
    "A thermal cover is one of the cheapest ways to cut pool energy bills—it traps heat and slashes evaporation before your heater runs. This guide walks through pool energy savings with thermal cover: cover on/off, savings percent, COP-adjusted heating kWh, and annual dollars kept on the meter.",
  benefits: [
    "Models cover savings on thermal load—not pump kWh—so heating savings stay realistic.",
    "Pick 30–50% evaporation reduction to match bubble blankets and fitted covers.",
    "Shows monthly cover savings and annual total alongside heat pump vs. electric lines.",
  ],
  howItWorks: [
    "Enter pump kW, run hours, electricity rate, and your heating method with COP.",
    "Set thermal cover to Yes and choose a savings % (30, 40, or 50% on heat demand).",
    "Compare daily cost with vs. without cover and read annual cover savings in dollars.",
  ],
  faq: [
    {
      q: "How much energy does a pool thermal cover save?",
      a: "Covers mainly cut evaporation heat loss—often 30–50% of thermal demand on outdoor pools. Savings apply to heating kWh, not circulation pump kWh. Example: 20 kWh/day heat demand, 40% cover savings → 8 kWh less heat needed; at COP 5 heat pump → 1.6 fewer grid kWh/day × $0.14 ≈ $0.22/day heating savings (plus similar savings at resistance COP 1).",
    },
    {
      q: "Why does the cover not reduce pump electricity?",
      a: "The pump still circulates and filters for the same hours—the blanket reduces heat leaving the water surface, not motor load. Cover savings show up in heater run time and heating kWh. That is why the calculator separates pump cost from thermal cover savings on heat demand.",
    },
    {
      q: "What cover savings percent should I use?",
      a: "Start with 40% for a well-fitted bubble cover used whenever the pool is idle. Tight automatic covers or mild climates may approach 50%; loose covers or partial use may be closer to 30%. Toggle percentages in the tool to bracket your real habit.",
    },
  ],
  technicalSpecs: [
    "Heat demand with cover = heat_demand × (1 − savings_% ÷ 100).",
    "Heating grid kWh = adjusted_heat_demand ÷ COP.",
    "Cover kWh saved = (heat_without_cover − heat_with_cover) ÷ COP per day.",
    "Related: pool-heating-cost-calculator, heat-pump-vs-electric-pool-heater-cost-calculator.",
  ],
};

const POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_GUIDE: PoolEnergyThermalCoverGuideDefinition =
  {
    slug: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "pool",
    href: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_GUIDE_HREF,
    toolHref: POOL_ENERGY_THERMAL_COVER_TOOL_HREF,
    guideLinkLabel: "Pool energy savings with thermal cover",
    title: "Pool Energy Savings with Thermal Cover",
    description: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_CONTENT.metaDescription,
    keywords: [
      "pool energy savings with thermal cover",
      "thermal pool cover savings calculator",
      "pool blanket energy savings",
      "swimming pool cover evaporation savings",
      "pool heating savings cover",
    ],
    seo: {
      sections: [
        {
          heading: "Evaporation is the energy leak covers fix",
          body: "Open pool surfaces lose heat fastest through evaporation—each gallon that leaves takes roughly 8,000 BTU with it. A thermal blanket sits on that interface, keeping moisture and heat in the basin. The calculator applies your savings % to heat demand first, so dollars track physics instead of marketing “up to 70%” claims.",
        },
        {
          heading: "Pump hours stay; heater kWh shrink",
          body: "Owners sometimes expect covers to cut filter pump bills—they do not. Circulation energy is unchanged. The win is fewer heating kWh at whatever COP you run. On a heat pump that compounds: less thermal load divided by COP 5 beats the same load at COP 1 resistance, but the cover helps both heater types equally on heat demand.",
        },
        {
          heading: "Habit beats hardware spec",
          body: "A 50% rated cover used half the nights behaves like 25% in the model. Enter the percentage that matches real cover-on hours, not the brochure maximum. Run with and without cover in the tool to see annual dollars between “always covered when idle” and an open pool—that gap is your behavior ROI.",
        },
      ],
    },
    content: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  PoolEnergyThermalCoverLandingSlug,
  PoolEnergyThermalCoverGuideDefinition
> = {
  [POOL_HEATING_COST_CALCULATOR_LANDING_SLUG]: POOL_HEATING_COST_CALCULATOR_GUIDE,
  [HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG]:
    HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_GUIDE,
  [POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG]:
    POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_GUIDE,
};

export const POOL_ENERGY_THERMAL_COVER_FOOTER_RESOURCES: GuideLandingFooterResource[] =
  [
    {
      slug: POOL_HEATING_COST_CALCULATOR_LANDING_SLUG,
      href: POOL_HEATING_COST_CALCULATOR_GUIDE_HREF,
      label: "Pool Heating Cost Calculator",
    },
    {
      slug: HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_LANDING_SLUG,
      href: HEAT_PUMP_VS_ELECTRIC_POOL_HEATER_COST_CALCULATOR_GUIDE_HREF,
      label: "Heat Pump vs Electric Pool Heater Cost Calculator",
    },
    {
      slug: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_LANDING_SLUG,
      href: POOL_ENERGY_SAVINGS_WITH_THERMAL_COVER_GUIDE_HREF,
      label: "Pool Energy Savings with Thermal Cover",
    },
  ];

export function isPoolEnergyThermalCoverLandingSlug(
  slug: string
): slug is PoolEnergyThermalCoverLandingSlug {
  return (POOL_ENERGY_THERMAL_COVER_LANDING_SLUGS as readonly string[]).includes(
    slug
  );
}

export function getPoolEnergyThermalCoverLanding(
  slug: PoolEnergyThermalCoverLandingSlug = POOL_HEATING_COST_CALCULATOR_LANDING_SLUG
): PoolEnergyThermalCoverGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllPoolEnergyThermalCoverLandings(): PoolEnergyThermalCoverGuideDefinition[] {
  return POOL_ENERGY_THERMAL_COVER_LANDING_SLUGS.map((slug) =>
    getPoolEnergyThermalCoverLanding(slug)
  );
}

/** Static footer links derived from POOL_ENERGY_THERMAL_COVER_FOOTER_RESOURCES. */
export function getPoolEnergyThermalCoverToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return POOL_ENERGY_THERMAL_COVER_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as POOL_ENERGY_THERMAL_COVER_CALCULATOR_ID };
