import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const LED_SAVINGS_ROI_TOOL_PATH =
  "/tools/green-home-efficiency/led-savings-roi/" as const;

export const LED_SAVINGS_ROI_TOOL_HREF = getCalculatorHref(
  "led-savings-roi",
  "green-home"
);

const BASE_CALCULATOR_ID = "led-savings-roi" as const;

export type LedSavingsRoiLandingSlug =
  | "led-roi-calculator"
  | "compare-led-vs-incandescent-bulb-costs"
  | "led-lighting-savings-and-co2-calculator";

export const LED_ROI_CALCULATOR_LANDING_SLUG = "led-roi-calculator" as const;

export const COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG =
  "compare-led-vs-incandescent-bulb-costs" as const;

export const LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG =
  "led-lighting-savings-and-co2-calculator" as const;

export const LED_SAVINGS_ROI_LANDING_SLUGS = [
  LED_ROI_CALCULATOR_LANDING_SLUG,
  COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG,
  LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly LedSavingsRoiLandingSlug[];

export const LED_ROI_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  LED_ROI_CALCULATOR_LANDING_SLUG
);

export const COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_GUIDE_HREF =
  getGuideLandingHref(COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG);

export const LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG);

export type LedSavingsRoiGuideDefinition = GuideLandingDefinition & {
  slug: LedSavingsRoiLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const LED_ROI_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "LED ROI calculator: compare legacy vs. LED bulb watts, daily and annual savings, CO₂ reduction, and payback days for a single fixture—free lighting upgrade math.",
  heroSubtitle:
    "LED ROI is operating savings minus bulb cost—not lumens on the box. This guide walks through the LED ROI calculator: legacy watts, LED watts, hours per day, electricity rate, and bulb price to see payback and annual dollars saved.",
  benefits: [
    "Daily savings = (legacy W − LED W) × hours ÷ 1,000 × $/kWh.",
    "Payback days = LED bulb price ÷ daily $ savings when LED uses less power.",
    "Shows monthly/annual cost, kWh saved, and CO₂ reduction alongside payback.",
  ],
  howItWorks: [
    "Enter existing bulb watts and LED replacement watts (lower is required for payback).",
    "Set hours of use per day, electricity rate ($/kWh), and LED bulb price.",
    "Review payback time, annual savings, and before/after operating cost bars.",
  ],
  faq: [
    {
      q: "How do I calculate LED ROI?",
      a: "Daily savings ≈ (legacy W − LED W) × hours/day ÷ 1000 × $/kWh. Payback days ≈ LED price ÷ daily savings. Example: 60 W → 9 W, 5 h/day, $0.14/kWh → ~$0.036/day saved; $4 bulb → ~111 days payback. Annual savings ≈ daily × 365.",
    },
    {
      q: "What is a good LED payback period?",
      a: "Many single-bulb swaps pay back in 2–6 months for high-use fixtures (kitchen, porch, office). Low-use closets may take longer—ROI still improves over the LED’s life. Under ~90 days is common for 4–6 h/day incandescent replacements.",
    },
    {
      q: "Does this include replacing multiple bulbs?",
      a: "This tool models one fixture. For whole-home retrofits with many bulbs and replacement schedules, use the LED vs. Incandescent ROI calculator—or sum one row per fixture here.",
    },
  ],
  technicalSpecs: [
    "Daily kWh saved = (legacy_W − LED_W) × hours ÷ 1000.",
    "Daily savings $ = daily_kWh_saved × $/kWh.",
    "Payback_days = LED_price ÷ daily_savings (when savings > 0).",
    "Related: led-vs-incandescent-roi, lighting-circuit-load, electricity-bill.",
  ],
};

const LED_ROI_CALCULATOR_GUIDE: LedSavingsRoiGuideDefinition = {
  slug: LED_ROI_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "green-home",
  href: LED_ROI_CALCULATOR_GUIDE_HREF,
  toolHref: LED_SAVINGS_ROI_TOOL_HREF,
  guideLinkLabel: "LED ROI calculator",
  title: "LED ROI Calculator",
  description: LED_ROI_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "led roi calculator",
    "led payback calculator",
    "led bulb return on investment",
    "light bulb savings roi",
    "led upgrade payback days",
  ],
  seo: {
    sections: [
      {
        heading: "Operating cost, not sticker price",
        body: "A $2 LED that saves $0.04/day beats a $1 LED that saves $0.01/day on ROI—even if both say “equivalent wattage.” Match lumens and color temperature, then let watts and run hours drive payback. The calculator ignores legacy bulb replacements; energy savings repeat every day the LED runs.",
      },
      {
        heading: "High-use fixtures first",
        body: "Kitchen cans, porch lights, and desk lamps dominate hours. Swap those before guest-room closets—the same bulb price returns faster when hours per day are high. Payback days from this tool tell you which sockets to hit on weekend one of a retrofit.",
      },
    ],
  },
  content: LED_ROI_CALCULATOR_CONTENT,
};

const COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_CONTENT: GuideLandingContent = {
  metaDescription:
    "Compare LED vs. incandescent bulb costs: daily, monthly, and annual operating cost from watts and hours—plus LED purchase price and payback for a single fixture swap.",
  heroSubtitle:
    "Incandescent bulbs look cheap at checkout; LEDs win on the meter. This guide shows how to compare LED vs. incandescent bulb costs—operating dollars, kWh, and payback—before you relabel every socket in the house.",
  benefits: [
    "Side-by-side daily and annual cost for legacy vs. LED at your $/kWh rate.",
    "Typical swap: 60 W incandescent vs. ~9 W LED with matched lumens.",
    "Includes payback days so upfront LED price meets operating savings.",
  ],
  howItWorks: [
    "Enter incandescent (or halogen) watts as legacy draw and LED replacement watts.",
    "Set hours per day, electricity rate, and LED bulb purchase price.",
    "Compare daily/monthly/annual cost bars and read payback to break even on the LED.",
  ],
  faq: [
    {
      q: "How do I compare LED vs. incandescent bulb costs?",
      a: "Operating cost/day = watts × hours ÷ 1000 × $/kWh. Example: 60 W × 5 h ÷ 1000 × $0.14 = $0.042/day incandescent; 9 W LED same hours = $0.0063/day. Annual gap ≈ $13/year per socket—multiply by fixture count for whole-home savings.",
    },
    {
      q: "Is the LED bulb purchase price included?",
      a: "Yes—payback days = LED price ÷ daily operating savings. A $4 LED saving $0.036/day pays back in about 111 days; after that, lower operating cost is pure savings until the LED is replaced.",
    },
    {
      q: "What about halogen or CFL?",
      a: "Use legacy watts for whatever bulb is in the socket today—halogen often 40–50 W for a “60 W equivalent.” The comparison math is the same: lower watts × same hours × rate = lower cost.",
    },
  ],
  technicalSpecs: [
    "Daily cost = (watts × hours/day ÷ 1000) × $/kWh.",
    "Annual cost ≈ daily cost × 365.",
    "Cost delta/day = legacy daily − LED daily.",
    "Related: led-vs-incandescent-roi, appliance-daily-cost, vampire-power-cost.",
  ],
};

const COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_GUIDE: LedSavingsRoiGuideDefinition =
  {
    slug: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_GUIDE_HREF,
    toolHref: LED_SAVINGS_ROI_TOOL_HREF,
    guideLinkLabel: "Compare LED vs. incandescent bulb costs",
    title: "Compare LED vs. Incandescent Bulb Costs",
    description: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_CONTENT.metaDescription,
    keywords: [
      "compare led vs incandescent bulb costs",
      "led incandescent operating cost",
      "light bulb electricity cost comparison",
      "60w vs 9w led cost per year",
      "incandescent vs led monthly bill",
    ],
    seo: {
      sections: [
        {
          heading: "Sticker price vs. meter price",
          body: "Incandescent bulbs cost less per unit but burn more watts per lumen. Comparing bulb costs means stacking purchase price and operating cost—LEDs front-load dollars at the register and return them on the utility bill. High-use rooms show the gap in weeks, not years.",
        },
        {
          heading: "Count the sockets",
          body: "One $13/year savings socket is noise; twenty kitchen and living-room cans are a line item on your annual budget. Run the comparison per fixture, then multiply by count. Pair with lighting circuit load tools if you are also checking breaker headroom after a full retrofit.",
        },
      ],
    },
    content: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_CONTENT,
  };

const LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "LED lighting savings and CO2 calculator: estimate annual kWh, dollar savings, and kg CO₂ avoided when you swap legacy bulbs for LED—by watts, hours, rate, and grid carbon intensity.",
  heroSubtitle:
    "Every watt-hour you do not burn is money and carbon you do not emit. This guide walks through the LED lighting savings and CO₂ calculator—legacy vs. LED watts, run hours, $/kWh, and regional kg CO₂ per kWh—for one fixture or your planning spreadsheet.",
  benefits: [
    "Annual kWh and $ savings from lower LED draw at the same hours per day.",
    "CO₂ saved ≈ annual kWh saved × grid kg CO₂/kWh (region presets or custom).",
    "Before/after cost and carbon bars plus payback on the LED purchase.",
  ],
  howItWorks: [
    "Enter legacy bulb watts, LED watts, hours per day, and electricity rate.",
    "Pick grid carbon intensity (kg CO₂/kWh) or override with utility-specific data.",
    "Review annual savings, monthly CO₂ avoided, and payback days on the LED bulb.",
  ],
  faq: [
    {
      q: "How does LED lighting reduce CO2?",
      a: "Less electricity → less grid generation → fewer emissions. Annual CO₂ saved ≈ (legacy kWh − LED kWh) × kg CO₂/kWh. Example: 51 kWh/year saved at 0.5 kg/kWh ≈ 25.5 kg CO₂/year per socket—scale by fixture count for household totals.",
    },
    {
      q: "What kg CO2 per kWh should I use?",
      a: "Use a regional average from the preset list or your utility disclosure if available. U.S. grids often fall between 0.3–0.6 kg/kWh; cleaner grids lower the carbon line per kWh saved. The calculator updates CO₂ when you change the region field.",
    },
    {
      q: "Are dollar savings and CO2 savings linked?",
      a: "Both flow from the same kWh delta—lower watts × hours. You can save money and carbon even when payback is slow in a low-use closet; high-use rooms deliver both faster. ROI payback is dollar-only; CO₂ savings start day one.",
    },
  ],
  technicalSpecs: [
    "Annual kWh saved = (legacy_W − LED_W) × hours/day × 365 ÷ 1000.",
    "Annual CO₂ saved kg ≈ annual_kWh_saved × kg_CO₂/kWh.",
    "Annual $ saved ≈ annual_kWh_saved × $/kWh.",
    "Related: energy-consumption, electricity-bill, led-vs-incandescent-roi.",
  ],
};

const LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_GUIDE: LedSavingsRoiGuideDefinition =
  {
    slug: LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG,
    calculatorId: BASE_CALCULATOR_ID,
    calculatorCategory: "green-home",
    href: LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_GUIDE_HREF,
    toolHref: LED_SAVINGS_ROI_TOOL_HREF,
    guideLinkLabel: "LED lighting savings and CO2 calculator",
    title: "LED Lighting Savings and CO2 Calculator",
    description:
      LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_CONTENT.metaDescription,
    keywords: [
      "led lighting savings and co2 calculator",
      "led carbon savings calculator",
      "light bulb co2 reduction",
      "led kwh savings emissions",
      "lighting carbon footprint calculator",
    ],
    seo: {
      sections: [
        {
          heading: "Same swap, two ledgers",
          body: "Utility bills track dollars; climate goals track tonnes. LED retrofits move both because saved kWh maps to saved emissions through your grid factor. A porch light on 12 hours/night can dwarf a closet on two—the calculator makes hours visible on money and CO₂ lines.",
        },
        {
          heading: "Regional grid matters",
          body: "A kWh saved in a coal-heavy region avoids more CO₂ than the same kWh on a hydro-heavy grid—dollar savings may be similar. Pick the carbon preset that matches your supply mix so footprint estimates are honest, not generic.",
        },
      ],
    },
    content: LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_CONTENT,
  };

const GUIDES_BY_SLUG: Record<
  LedSavingsRoiLandingSlug,
  LedSavingsRoiGuideDefinition
> = {
  [LED_ROI_CALCULATOR_LANDING_SLUG]: LED_ROI_CALCULATOR_GUIDE,
  [COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG]:
    COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_GUIDE,
  [LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG]:
    LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_GUIDE,
};

export const LED_SAVINGS_ROI_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: LED_ROI_CALCULATOR_LANDING_SLUG,
    href: LED_ROI_CALCULATOR_GUIDE_HREF,
    label: "LED ROI Calculator",
  },
  {
    slug: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_LANDING_SLUG,
    href: COMPARE_LED_VS_INCANDESCENT_BULB_COSTS_GUIDE_HREF,
    label: "Compare LED vs. Incandescent Bulb Costs",
  },
  {
    slug: LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_LANDING_SLUG,
    href: LED_LIGHTING_SAVINGS_AND_CO2_CALCULATOR_GUIDE_HREF,
    label: "LED Lighting Savings and CO2 Calculator",
  },
];

export function isLedSavingsRoiLandingSlug(
  slug: string
): slug is LedSavingsRoiLandingSlug {
  return (LED_SAVINGS_ROI_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getLedSavingsRoiLanding(
  slug: LedSavingsRoiLandingSlug = LED_ROI_CALCULATOR_LANDING_SLUG
): LedSavingsRoiGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllLedSavingsRoiLandings(): LedSavingsRoiGuideDefinition[] {
  return LED_SAVINGS_ROI_LANDING_SLUGS.map((slug) =>
    getLedSavingsRoiLanding(slug)
  );
}

/** Static footer links derived from LED_SAVINGS_ROI_FOOTER_RESOURCES. */
export function getLedSavingsRoiToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return LED_SAVINGS_ROI_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as LED_SAVINGS_ROI_CALCULATOR_ID };
