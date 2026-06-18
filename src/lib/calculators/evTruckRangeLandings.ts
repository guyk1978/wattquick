import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const EV_TRUCK_RANGE_TOOL_PATH =
  "/tools/commercial-ev/ev-truck-range/" as const;

export const EV_TRUCK_RANGE_TOOL_HREF = getCalculatorHref(
  "ev-truck-range",
  "commercial-ev"
);

const BASE_CALCULATOR_ID = "ev-truck-range" as const;

export type EvTruckRangeLandingSlug =
  | "electric-truck-range-and-payload-calculator"
  | "impact-of-payload-on-ev-truck-range"
  | "ev-heavy-duty-truck-efficiency-calculator";

export const ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG =
  "electric-truck-range-and-payload-calculator" as const;

export const IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG =
  "impact-of-payload-on-ev-truck-range" as const;

export const EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG =
  "ev-heavy-duty-truck-efficiency-calculator" as const;

export const EV_TRUCK_RANGE_LANDING_SLUGS = [
  ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG,
  IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG,
  EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG,
] as const satisfies readonly EvTruckRangeLandingSlug[];

export const ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG);

export const IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_GUIDE_HREF = getGuideLandingHref(
  IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG
);

export const EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_GUIDE_HREF =
  getGuideLandingHref(EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG);

export type EvTruckRangeGuideDefinition = GuideLandingDefinition & {
  slug: EvTruckRangeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CONTENT: GuideLandingContent = {
  metaDescription:
    "Electric truck range and payload calculator: estimate how cargo weight reduces rated empty miles. Tune loss per 100 lbs from fleet telematics or OEM guidance—free fleet planning tool.",
  heroSubtitle:
    "Empty-truck EPA range rarely survives a loaded depot run. Model how payload pounds translate into range loss before you commit routes, charging windows, or last-mile handoffs to drivers.",
  benefits: [
    "Applies a transparent payload penalty: adjusted range = base range × (1 − payload/100 × loss% per 100 lbs)—easy to audit in dispatch meetings.",
    "Surfaces miles lost and percent derating at your entered cargo weight so planners see both absolute and relative impact.",
    "Configurable loss factor lets fleets align the model with telematics, OEM tables, or conservative planning buffers.",
  ],
  howItWorks: [
    "Enter the manufacturer's rated range with no cargo (miles).",
    "Add payload weight in pounds and set range loss per 100 lbs from fleet data or a conservative default.",
    "Review adjusted range, miles lost, and loss percentage—iterate payload scenarios for outbound vs. return legs.",
  ],
  faq: [
    {
      q: "How does payload affect electric truck range?",
      a: "Extra mass raises rolling resistance and motor load, increasing kWh per mile. The calculator uses a linear planning factor (loss% per 100 lbs) so dispatch teams can bracket outcomes before detailed route energy modeling.",
    },
    {
      q: "Is the loss linear with weight?",
      a: "Real-world consumption is route-dependent—grades, speed, and regenerative braking dominate on some lanes. This tool is a fleet planning estimate, not a substitute for OEM route simulators or logged kWh/mile at operating weight.",
    },
    {
      q: "Where do I get loss% per 100 lbs?",
      a: "Start with OEM guidance or compare empty vs. loaded telematics on a representative route. Many fleets use 1.5–3% per 100 lbs for initial planning, then calibrate quarterly as seasons and tyre sets change.",
    },
  ],
  technicalSpecs: [
    "Formula: adjusted range (mi) = base range × max(0, 1 − (payload_lbs ÷ 100) × loss% per 100 lbs ÷ 100).",
    "Inputs: rated empty range (mi), payload (lbs), loss% per 100 lbs (0.5–5% slider in tool).",
    "Outputs: adjusted range (mi), range loss (mi), total loss (%).",
    "Scope: Class 3–8 electric truck planning; validate against depot charging capacity and driver HOS limits.",
  ],
};

const ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_GUIDE: EvTruckRangeGuideDefinition = {
  slug: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "commercial-ev",
  href: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_GUIDE_HREF,
  toolHref: EV_TRUCK_RANGE_TOOL_HREF,
  guideLinkLabel: "Electric truck range and payload calculator",
  title: "Electric Truck Range and Payload Calculator",
  description: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CONTENT.metaDescription,
  keywords: [
    "electric truck range and payload calculator",
    "ev truck range payload",
    "electric truck cargo range loss",
    "fleet payload range estimate",
    "commercial ev truck range",
  ],
  seo: {
    sections: [
      {
        heading: "Empty rating vs. loaded operations",
        body: "OEM range figures assume unladen or reference curb weights. Dispatch plans must subtract payload impact before assigning return-to-depot charging or mid-route opportunity top-ups. A 250 mi empty rating with 8,000 lbs cargo can fall below a single-shift loop if loss factors are ignored.",
      },
      {
        heading: "Pairing with TCO and charger planning",
        body: "Payload-adjusted range feeds fleet TCO when kWh/mile rises with weight. Use conservative adjusted miles when sizing depot chargers or scheduling dual shifts—especially on regional routes with repeated grade changes.",
      },
    ],
  },
  content: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CONTENT,
};

const IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_CONTENT: GuideLandingContent = {
  metaDescription:
    "Impact of payload on EV truck range: how cargo weight raises kWh/mile, cuts regenerative recovery, and derates empty-mile ratings. Fleet planning guide with quantified loss models.",
  heroSubtitle:
    "Every pallet changes the energy budget. Understand why loaded electric trucks fall short of brochure range—and how to quantify payload impact before routes are locked and chargers are sized.",
  benefits: [
    "Separates rolling-resistance and acceleration load from aerodynamic baseline—payload mass hits both on urban and regional duty cycles.",
    "Shows how percent range loss scales with pounds carried using a tunable loss-per-100-lbs factor aligned to telematics.",
    "Frames conservative dispatch buffers so drivers are not stranded when return legs run heavier than outbound empties.",
  ],
  howItWorks: [
    "Start with empty or light-load range from OEM data or logged kWh/mile on a reference loop.",
    "Estimate payload for the heaviest legal configuration on that loop—not average Tuesday weight.",
    "Apply the payload loss model in the calculator; compare adjusted miles to charger spacing and dwell time.",
  ],
  faq: [
    {
      q: "Why does payload reduce EV truck range more on some routes?",
      a: "Hilly corridors, frequent stops, and high cruise speeds amplify the kWh penalty of extra mass. Flat interstate lanes at moderate speed show smaller percent loss than last-mile delivery with repeated acceleration from curb weight plus cargo.",
    },
    {
      q: "Does regenerative braking offset payload impact?",
      a: "Regen recovers some kinetic energy, but heavier trucks need more energy to accelerate and climb. Net effect: payload still increases kWh/mile; regen mainly softens stop-and-go losses rather than erasing mass penalty.",
    },
    {
      q: "How should fleets set safety margins?",
      a: "Plan on adjusted range at max expected payload, then reserve 15–25% for temperature, headwinds, and battery aging. Treat empty-range ratings as an upper bound, not a dispatch target.",
    },
  ],
  technicalSpecs: [
    "Primary driver: increased tractive effort ∝ total mass (curb + payload + trailer).",
    "Planning model: range loss (%) ≈ (payload_lbs ÷ 100) × loss% per 100 lbs (calibrate from fleet data).",
    "Secondary factors: tyre pressure, grade profile, ambient temperature, and auxiliary HVAC load.",
    "Validation: compare modeled loss to logged kWh/mile on loaded vs. empty weeks.",
  ],
};

const IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_GUIDE: EvTruckRangeGuideDefinition = {
  slug: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "commercial-ev",
  href: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_GUIDE_HREF,
  toolHref: EV_TRUCK_RANGE_TOOL_HREF,
  guideLinkLabel: "Impact of payload on EV truck range",
  title: "Impact of Payload on EV Truck Range",
  description: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_CONTENT.metaDescription,
  keywords: [
    "impact of payload on ev truck range",
    "ev truck payload range loss",
    "cargo weight electric truck",
    "loaded ev truck range",
    "fleet payload derating",
  ],
  seo: {
    sections: [
      {
        heading: "Mass, motor load, and kWh per mile",
        body: "Electric drivelines are efficient, but they cannot violate physics: moving more mass requires more joules per mile. Payload raises baseline motor torque on grades and lengthens acceleration events in traffic—both visible in telematics as higher kWh/mile before state-of-charge even matters.",
      },
      {
        heading: "Outbound empty, return loaded",
        body: "Many lanes are asymmetric: pickup routes run light, delivery legs run full. Dispatch should size charging around the worst-case loaded segment, not the average of both directions. Model each leg separately instead of assuming symmetric range.",
      },
    ],
  },
  content: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_CONTENT,
};

const EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CONTENT: GuideLandingContent = {
  metaDescription:
    "EV heavy-duty truck efficiency calculator: relate kWh/mile, payload, and usable range for Class 7–8 electric trucks. Plan depot energy, route feasibility, and loaded vs. empty efficiency.",
  heroSubtitle:
    "Heavy-duty efficiency is more than motor nameplate kW—it is how many kilowatt-hours you spend per mile at operating weight, speed, and grade. Use this guide to connect efficiency metrics to the range-vs-payload model in the calculator.",
  benefits: [
    "Frames kWh/mile as the bridge between battery capacity and achievable miles at fleet operating weight.",
    "Shows how payload and auxiliary loads (HVAC, liftgates, reefer tie-ins) move efficiency away from empty-truck lab figures.",
    "Supports charger sizing: daily kWh demand = miles × kWh/mile × vehicles—before demand charges and overlap peaks.",
  ],
  howItWorks: [
    "Benchmark kWh/mile from telematics on a representative loaded week—not a single sunny demo run.",
    "Convert rated pack kWh and target SOC window into available energy for the shift.",
    "Divide by calibrated kWh/mile (or use the payload-adjusted range tool) to see if the lane fits without mid-route panic charging.",
  ],
  faq: [
    {
      q: "What is a typical kWh/mile for heavy-duty EV trucks?",
      a: "Urban stop-and-go and regional haul differ widely. Many fleets plan 1.5–2.5 kWh/mile for mixed duty until OEM or logged data narrows the band. Always segment by route profile and gross vehicle weight.",
    },
    {
      q: "How does efficiency relate to payload in this tool?",
      a: "Higher payload raises kWh/mile, which shortens range for the same battery. The range-vs-payload calculator expresses that relationship as percent miles lost per 100 lbs—efficiency and payload views are two sides of one energy budget.",
    },
    {
      q: "Should I derate efficiency for winter or HVAC?",
      a: "Yes. Cabin and battery thermal management can add measurable kWh/mile in cold climates. Apply a seasonal factor on top of payload-adjusted estimates when writing winter dispatch rules.",
    },
  ],
  technicalSpecs: [
    "Efficiency metric: kWh consumed ÷ miles traveled (fleet-average or route-specific).",
    "Energy budget: usable kWh ≈ pack capacity × SOC window × pack availability factor.",
    "Range check: miles ≈ usable kWh ÷ kWh/mile (compare to payload-adjusted calculator output).",
    "Heavy-duty scope: Class 7–8 vocational and regional tractors; validate against OEM drive-cycle data.",
  ],
};

const EV_HEAVY_DUTY_TRUCK_EFFICIENCY_GUIDE: EvTruckRangeGuideDefinition = {
  slug: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "commercial-ev",
  href: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_GUIDE_HREF,
  toolHref: EV_TRUCK_RANGE_TOOL_HREF,
  guideLinkLabel: "EV heavy-duty truck efficiency calculator",
  title: "EV Heavy-Duty Truck Efficiency Calculator",
  description: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CONTENT.metaDescription,
  keywords: [
    "ev heavy-duty truck efficiency calculator",
    "electric truck kwh per mile",
    "class 8 ev efficiency",
    "heavy duty electric truck range",
    "fleet ev energy intensity",
  ],
  seo: {
    sections: [
      {
        heading: "From kWh/mile to depot demand",
        body: "If each tractor averages 2.0 kWh/mile on a 180 mi shift, one truck needs roughly 360 kWh from the meter—before charging losses. Multiply by fleet size and overlap to size transformers and stagger start times. Efficiency errors compound into capex mistakes faster than range errors on a single vehicle.",
      },
      {
        heading: "Loaded efficiency vs. brochure motor efficiency",
        body: "Motor and inverter efficiencies are high, but vehicle-level kWh/mile includes tyres, aero, grade, and idle auxiliaries. Heavy-duty planning should always use vehicle-level telematics at gross weight, then feed those numbers into payload and range tools for lane approval.",
      },
    ],
  },
  content: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CONTENT,
};

const GUIDES_BY_SLUG: Record<EvTruckRangeLandingSlug, EvTruckRangeGuideDefinition> =
  {
    [ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG]:
      ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_GUIDE,
    [IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG]:
      IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_GUIDE,
    [EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG]:
      EV_HEAVY_DUTY_TRUCK_EFFICIENCY_GUIDE,
  };

export const EV_TRUCK_RANGE_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG,
    href: ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_GUIDE_HREF,
    label: "Electric Truck Range and Payload Calculator",
  },
  {
    slug: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_LANDING_SLUG,
    href: IMPACT_OF_PAYLOAD_ON_EV_TRUCK_RANGE_GUIDE_HREF,
    label: "Impact of Payload on EV Truck Range",
  },
  {
    slug: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_LANDING_SLUG,
    href: EV_HEAVY_DUTY_TRUCK_EFFICIENCY_CALCULATOR_GUIDE_HREF,
    label: "EV Heavy-Duty Truck Efficiency Calculator",
  },
];

export function isEvTruckRangeLandingSlug(
  slug: string
): slug is EvTruckRangeLandingSlug {
  return (EV_TRUCK_RANGE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getEvTruckRangeLanding(
  slug: EvTruckRangeLandingSlug = ELECTRIC_TRUCK_RANGE_AND_PAYLOAD_CALCULATOR_LANDING_SLUG
): EvTruckRangeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllEvTruckRangeLandings(): EvTruckRangeGuideDefinition[] {
  return EV_TRUCK_RANGE_LANDING_SLUGS.map((slug) => getEvTruckRangeLanding(slug));
}

/** Static footer links derived from EV_TRUCK_RANGE_FOOTER_RESOURCES. */
export function getEvTruckRangeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return EV_TRUCK_RANGE_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as EV_TRUCK_RANGE_CALCULATOR_ID };
