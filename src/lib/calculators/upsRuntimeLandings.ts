import type {
  GuideLandingContent,
  GuideLandingDefinition,
  GuideLandingFooterResource,
} from "@/lib/calculators/landing-types";
import { getGuideLandingHref } from "@/lib/calculators/landing-types";
import { getCalculatorHref } from "@/lib/calculator-routes";

/** Canonical interactive tool route — footer Resources are scoped to this path only. */
export const UPS_RUNTIME_TOOL_PATH = "/tools/backup-power/ups-runtime/" as const;

export const UPS_RUNTIME_TOOL_HREF = getCalculatorHref(
  "ups-runtime",
  "backup"
);

const BASE_CALCULATOR_ID = "ups-runtime" as const;

export type UpsRuntimeLandingSlug =
  | "ups-runtime-calculator"
  | "battery-backup-time-estimator"
  | "estimate-ups-battery-capacity-based-on-load";

export const UPS_RUNTIME_CALCULATOR_LANDING_SLUG = "ups-runtime-calculator" as const;

export const BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG =
  "battery-backup-time-estimator" as const;

export const ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG =
  "estimate-ups-battery-capacity-based-on-load" as const;

export const UPS_RUNTIME_LANDING_SLUGS = [
  UPS_RUNTIME_CALCULATOR_LANDING_SLUG,
  BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG,
  ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG,
] as const satisfies readonly UpsRuntimeLandingSlug[];

export const UPS_RUNTIME_CALCULATOR_GUIDE_HREF = getGuideLandingHref(
  UPS_RUNTIME_CALCULATOR_LANDING_SLUG
);

export const BATTERY_BACKUP_TIME_ESTIMATOR_GUIDE_HREF = getGuideLandingHref(
  BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG
);

export const ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_GUIDE_HREF =
  getGuideLandingHref(ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG);

export type UpsRuntimeGuideDefinition = GuideLandingDefinition & {
  slug: UpsRuntimeLandingSlug;
  calculatorId: typeof BASE_CALCULATOR_ID;
};

const UPS_RUNTIME_CALCULATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "UPS runtime calculator: estimate backup minutes or hours from battery watt-hours and load watts. Plan graceful shutdown, generator overlap, and critical-load ride-through—free, instant.",
  heroSubtitle:
    "Outages do not wait for spreadsheets. Convert UPS battery energy and attached load into backup time so IT, facilities, and home-lab teams know when to shed load or start a generator.",
  benefits: [
    "Core model: runtime (h) = battery Wh ÷ load W—transparent baseline before inverter efficiency and cutoff margins.",
    "Works for rack UPS, desktop units, and small server closets when you know nameplate or metered load.",
    "Outputs human-readable duration with Wh ÷ W detail for change tickets and runbooks.",
  ],
  howItWorks: [
    "Find battery energy in Wh from the UPS datasheet—or multiply Ah × V for external packs.",
    "Enter steady-state load in watts (sum networking, servers, or AV gear on the protected circuit).",
    "Review estimated backup time; derate 10–20% mentally for inverter loss and manufacturer low-voltage cutoff.",
  ],
  faq: [
    {
      q: "How do I calculate UPS runtime?",
      a: "Divide usable battery watt-hours by load watts. Example: 500 Wh ÷ 150 W ≈ 3.3 hours. Real units often deliver less because inverters are not 100% efficient and BMS may shut down above 0% displayed charge.",
    },
    {
      q: "Where do I get battery Wh for my UPS?",
      a: "Check the label or manual for internal battery Wh. For a 12 V 42 Ah SLA: 12 × 42 = 504 Wh. Lithium UPS models list pack Wh directly; use the installed pack, not the UPS VA rating.",
    },
    {
      q: "Is VA rating the same as watts?",
      a: "No. VA (volt-amps) describes apparent power; runtime depends on real watts drawn by your load. Use a meter or nameplate W, not UPS VA, in the calculator.",
    },
  ],
  technicalSpecs: [
    "Formula: backup time (h) = battery energy (Wh) ÷ load power (W).",
    "Inputs: positive Wh and W values; assumes near-constant load.",
    "Planning derate: apply 10–20% for inverter efficiency and early cutoff unless OEM provides a calibrated table.",
    "Reference: pair with critical-load and generator overlap planning for facilities runbooks.",
  ],
};

const UPS_RUNTIME_CALCULATOR_GUIDE: UpsRuntimeGuideDefinition = {
  slug: UPS_RUNTIME_CALCULATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "backup",
  href: UPS_RUNTIME_CALCULATOR_GUIDE_HREF,
  toolHref: UPS_RUNTIME_TOOL_HREF,
  guideLinkLabel: "UPS runtime calculator",
  title: "UPS Runtime Calculator",
  description: UPS_RUNTIME_CALCULATOR_CONTENT.metaDescription,
  keywords: [
    "ups runtime calculator",
    "ups backup time calculator",
    "ups battery runtime",
    "how long will ups last",
    "watt hour ups runtime",
  ],
  seo: {
    sections: [
      {
        heading: "Minutes vs. hours of ride-through",
        body: "Desktop and networking UPS units are sized for minutes—enough to survive brief blips or trigger automatic shutdown. Home backup and small-server UPS goals may be hours at reduced load. Match your target interval to the Wh budget before buying a larger pack.",
      },
      {
        heading: "Inverter efficiency and cutoff",
        body: "The linear Wh ÷ W model ignores conversion loss and the fact that many UPS devices stop before the battery is chemically empty. Treat calculator output as an upper bound; validate with a controlled pull-down test when compliance or SLA language depends on the number.",
      },
    ],
  },
  content: UPS_RUNTIME_CALCULATOR_CONTENT,
};

const BATTERY_BACKUP_TIME_ESTIMATOR_CONTENT: GuideLandingContent = {
  metaDescription:
    "Battery backup time estimator: project how long your UPS or DC backup will run from stored watt-hours and attached load. Free estimator for IT closets, home office, and critical circuits.",
  heroSubtitle:
    "Backup time is an energy-budget question: how many watt-hours you have versus how fast you spend them. This guide shows how to estimate ride-through duration before you size the next battery upgrade or write an outage runbook.",
  benefits: [
    "Estimates hours or minutes as Wh ÷ W—the same physics whether the pack is inside a UPS or on a DC bus.",
    "Helps compare scenarios: shed non-critical load vs. add parallel battery strings to hit a target shutdown window.",
    "Documents assumptions (constant load, nominal Wh) so facilities and MSP clients can audit the number.",
  ],
  howItWorks: [
    "Inventory usable battery energy in Wh—datasheet, Ah × V, or OEM replacement SKU.",
    "Total the watts your protected equipment draws during normal operation (not peak surge).",
    "Run the estimator; subtract a 10–20% planning margin for inverter loss and early BMS cutoff.",
  ],
  faq: [
    {
      q: "What is a battery backup time estimator?",
      a: "It is a planning tool that converts stored energy and load power into expected runtime. It answers how long batteries can support attached equipment before voltage or SOC limits trigger shutdown—not how long until utility power returns.",
    },
    {
      q: "How is backup time different from UPS VA rating?",
      a: "VA describes electrical sizing of the inverter; backup time depends on Wh in the battery and real watts consumed. A high-VA UPS with a small internal pack may yield only minutes at full load.",
    },
    {
      q: "Should I estimate at peak or average load?",
      a: "Use average steady load for runtime planning. If load spikes are brief, peak watts overstate consumption. For worst-case planning, model idle + worst simultaneous duty cycle.",
    },
  ],
  technicalSpecs: [
    "Estimate: backup time (h) = battery energy (Wh) ÷ load (W).",
    "Derating: apply efficiency factor 0.8–0.9 unless OEM publishes a calibrated runtime chart.",
    "Cutoff: many UPS units stop above 0% SOC—treat estimates as optimistic without a load test.",
    "Scope: SLA ride-through and graceful shutdown; not generator fuel duration unless fuel path is modeled separately.",
  ],
};

const BATTERY_BACKUP_TIME_ESTIMATOR_GUIDE: UpsRuntimeGuideDefinition = {
  slug: BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "backup",
  href: BATTERY_BACKUP_TIME_ESTIMATOR_GUIDE_HREF,
  toolHref: UPS_RUNTIME_TOOL_HREF,
  guideLinkLabel: "Battery backup time estimator",
  title: "Battery Backup Time Estimator",
  description: BATTERY_BACKUP_TIME_ESTIMATOR_CONTENT.metaDescription,
  keywords: [
    "battery backup time estimator",
    "backup time calculator",
    "ups backup duration estimate",
    "how long battery backup lasts",
    "watt hour backup time",
  ],
  seo: {
    sections: [
      {
        heading: "Estimating for graceful shutdown vs. full outage",
        body: "Many IT runbooks need only 15–30 minutes to flush databases and power down storage. Home users may want hours for modem, router, and one workstation. Define the interval first, then check whether estimated backup time exceeds it with margin.",
      },
      {
        heading: "When to load-test instead of estimate",
        body: "If compliance, medical, or contract SLA language cites a specific minute count, validate with a controlled outage test at production load. Estimators bracket reality; logged pull-down tests sign the number.",
      },
    ],
  },
  content: BATTERY_BACKUP_TIME_ESTIMATOR_CONTENT,
};

const ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_CONTENT: GuideLandingContent = {
  metaDescription:
    "Estimate UPS battery capacity based on load: size watt-hours from required backup time and attached watts. Plan pack upgrades, external battery trays, and SLA ride-through targets.",
  heroSubtitle:
    "Runtime calculators start with Wh—you often need the reverse. Define how long critical load must survive and what watts it draws, then back into the battery capacity your UPS or DC plant must store.",
  benefits: [
    "Inverts the runtime formula: required Wh ≈ load (W) × target backup time (h), before efficiency margin.",
    "Supports sizing new UPS purchases when the datasheet lists VA but not enough internal Wh for your shutdown window.",
    "Frames parallel battery or tray upgrades when existing packs fall short of load × minutes.",
  ],
  howItWorks: [
    "Set the backup interval you need—graceful shutdown minutes or full ride-through until generator transfer.",
    "Measure or sum steady load watts on the protected bus (not UPS VA rating).",
    "Multiply W × h for raw Wh, then divide by 0.8–0.9 (or OEM factor) to account for inverter loss and cutoff headroom.",
  ],
  faq: [
    {
      q: "How do I estimate UPS battery capacity from load?",
      a: "Multiply load watts by required hours of backup. Example: 200 W for 2 h needs 400 Wh minimum—often 450–500 Wh installed after efficiency derating. Add margin if temperature or aged cells reduce usable capacity.",
    },
    {
      q: "Can I use this to pick a replacement battery cartridge?",
      a: "Yes. Compare your calculated Wh (with derate) to OEM cartridge Wh ratings. Match voltage and form factor; never install higher voltage than the UPS BMS expects without engineering review.",
    },
    {
      q: "What if load varies during an outage?",
      a: "Size for the highest sustained watts during the outage window, or model phases separately (e.g., servers at idle shutdown vs. full draw). Variable load is why field tests still matter after paper sizing.",
    },
  ],
  technicalSpecs: [
    "Sizing: required Wh ≈ load (W) × backup time (h) ÷ efficiency factor.",
    "Efficiency factor: typically 0.8–0.9 unless OEM runtime chart applies.",
    "Validation: required Wh ≤ usable Wh of installed pack at end-of-life derating.",
    "Companion: use the UPS Runtime calculator forward-check after selecting a Wh target.",
  ],
};

const ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_GUIDE: UpsRuntimeGuideDefinition = {
  slug: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG,
  calculatorId: BASE_CALCULATOR_ID,
  calculatorCategory: "backup",
  href: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_GUIDE_HREF,
  toolHref: UPS_RUNTIME_TOOL_HREF,
  guideLinkLabel: "Estimate UPS battery capacity based on load",
  title: "Estimate UPS Battery Capacity Based on Load",
  description: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_CONTENT.metaDescription,
  keywords: [
    "estimate ups battery capacity based on load",
    "ups battery sizing calculator",
    "wh required for ups runtime",
    "size ups battery from watts",
    "backup battery capacity planning",
  ],
  seo: {
    sections: [
      {
        heading: "From SLA minutes to watt-hours",
        body: "A 30-minute graceful-shutdown SLA at 350 W implies 175 Wh before derating—roughly 195–220 Wh nameplate depending on inverter efficiency. Facilities tickets should cite both W and minutes so procurement does not oversize VA while undersizing Wh.",
      },
      {
        heading: "End-of-life derating",
        body: "Lead-acid and lithium packs lose usable Wh with age and cycle count. Size new installs at 80–85% of calculated fresh capacity if the asset must meet the same SLA in year five, or plan cartridge replacement intervals explicitly.",
      },
    ],
  },
  content: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_CONTENT,
};

const GUIDES_BY_SLUG: Record<UpsRuntimeLandingSlug, UpsRuntimeGuideDefinition> = {
  [UPS_RUNTIME_CALCULATOR_LANDING_SLUG]: UPS_RUNTIME_CALCULATOR_GUIDE,
  [BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG]: BATTERY_BACKUP_TIME_ESTIMATOR_GUIDE,
  [ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG]:
    ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_GUIDE,
};

export const UPS_RUNTIME_FOOTER_RESOURCES: GuideLandingFooterResource[] = [
  {
    slug: UPS_RUNTIME_CALCULATOR_LANDING_SLUG,
    href: UPS_RUNTIME_CALCULATOR_GUIDE_HREF,
    label: "UPS Runtime Calculator",
  },
  {
    slug: BATTERY_BACKUP_TIME_ESTIMATOR_LANDING_SLUG,
    href: BATTERY_BACKUP_TIME_ESTIMATOR_GUIDE_HREF,
    label: "Battery Backup Time Estimator",
  },
  {
    slug: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_LANDING_SLUG,
    href: ESTIMATE_UPS_BATTERY_CAPACITY_BASED_ON_LOAD_GUIDE_HREF,
    label: "Estimate UPS Battery Capacity Based on Load",
  },
];

export function isUpsRuntimeLandingSlug(
  slug: string
): slug is UpsRuntimeLandingSlug {
  return (UPS_RUNTIME_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getUpsRuntimeLanding(
  slug: UpsRuntimeLandingSlug = UPS_RUNTIME_CALCULATOR_LANDING_SLUG
): UpsRuntimeGuideDefinition {
  return GUIDES_BY_SLUG[slug];
}

export function getAllUpsRuntimeLandings(): UpsRuntimeGuideDefinition[] {
  return UPS_RUNTIME_LANDING_SLUGS.map((slug) => getUpsRuntimeLanding(slug));
}

/** Static footer links derived from UPS_RUNTIME_FOOTER_RESOURCES. */
export function getUpsRuntimeToolFooterLinks(): {
  label: string;
  href: string;
}[] {
  return UPS_RUNTIME_FOOTER_RESOURCES.map((resource) => ({
    label: resource.label,
    href: resource.href,
  }));
}

export { BASE_CALCULATOR_ID as UPS_RUNTIME_CALCULATOR_ID };
