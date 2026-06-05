export type WizardGoal = "solar" | "backup" | "mobility" | "savings";

export type WizardExperience = "owner" | "pro";

export type WizardStepKind = "calculator" | "article";

export interface WizardStepRef {
  kind: WizardStepKind;
  slug: string;
}

export interface ResolvedWizardStep {
  id: string;
  kind: WizardStepKind;
  slug: string;
  title: string;
  description: string;
  href: string;
  stepNumber: number;
  /** Reserved for calculators not yet published — shown as coming soon. */
  planned?: boolean;
}

/** Upcoming calculators slotted into wizard paths before launch. */
export const WIZARD_PLANNED_CALCULATORS: Record<
  string,
  { title: string; description: string }
> = {};

export interface WizardPathResult {
  goal: WizardGoal;
  experience: WizardExperience;
  title: string;
  description: string;
  steps: ResolvedWizardStep[];
}

export const WIZARD_STORAGE_KEY = "wattquick-wizard-progress";

export const WIZARD_GOALS: {
  id: WizardGoal;
  label: string;
  description: string;
}[] = [
  {
    id: "solar",
    label: "Install solar",
    description: "Feasibility, ROI, and long-term savings planning",
  },
  {
    id: "backup",
    label: "Backup power",
    description: "Map critical loads, surge, and battery bank sizing",
  },
  {
    id: "mobility",
    label: "EV & mobility",
    description: "Commute TCO, charging cost, and range planning",
  },
  {
    id: "savings",
    label: "Cut my bill",
    description: "Standby waste, appliances, and rate optimization",
  },
];

export const WIZARD_EXPERIENCE: {
  id: WizardExperience;
  label: string;
  description: string;
}[] = [
  {
    id: "owner",
    label: "Homeowner",
    description: "Practical steps—minimal jargon",
  },
  {
    id: "pro",
    label: "Technician / Pro",
    description: "Engineering depth and sizing detail",
  },
];

export const PATH_TITLES: Record<
  WizardGoal,
  Record<WizardExperience, { title: string; description: string }>
> = {
  solar: {
    owner: {
      title: "Solar planning path",
      description:
        "Check shading, model 20-year ROI, then read how to interpret the ledger.",
    },
    pro: {
      title: "Solar engineering path",
      description:
        "Shading loss, string current, ROI—with technical reference articles.",
    },
  },
  backup: {
    owner: {
      title: "Home backup path",
      description:
        "List critical loads, size inverter surge headroom, and pick a battery bank.",
    },
    pro: {
      title: "Backup system design path",
      description:
        "Load analysis through cable sizing for a code-aware backup design.",
    },
  },
  mobility: {
    owner: {
      title: "Mobility savings path",
      description:
        "Compare commute TCO, home charging cost, and realistic EV range.",
    },
    pro: {
      title: "EV infrastructure path",
      description: "Range modeling, DC cabling, and charging loss engineering.",
    },
  },
  savings: {
    owner: {
      title: "Bill reduction path",
      description:
        "Find vampire loads, audit appliances, and capture thermostat savings.",
    },
    pro: {
      title: "Load & tariff optimization path",
      description: "Peak shaving potential and TOU rate plan analysis.",
    },
  },
};

/** Curated step sequences — calculators and supporting articles. */
export const WIZARD_PATH_MAP: Record<
  WizardGoal,
  Record<WizardExperience, WizardStepRef[]>
> = {
  solar: {
    owner: [
      { kind: "calculator", slug: "solar-shading-analysis" },
      { kind: "calculator", slug: "solar-roi-analysis" },
      { kind: "article", slug: "the-20-year-solar-ledger" },
    ],
    pro: [
      { kind: "calculator", slug: "solar-shading-analysis" },
      { kind: "calculator", slug: "solar-array-current" },
      { kind: "calculator", slug: "solar-roi-analysis" },
      { kind: "article", slug: "shading-and-strings-guide" },
    ],
  },
  backup: {
    owner: [
      { kind: "calculator", slug: "critical-load-analysis" },
      { kind: "calculator", slug: "inverter-peak-load-surge" },
      { kind: "calculator", slug: "battery-bank-size" },
      { kind: "article", slug: "home-backup-load-guide" },
    ],
    pro: [
      { kind: "calculator", slug: "critical-load-analysis" },
      { kind: "calculator", slug: "inverter-peak-load-surge" },
      { kind: "calculator", slug: "inverter-loading-curve" },
      { kind: "calculator", slug: "battery-series-parallel" },
      { kind: "calculator", slug: "dc-cable-size" },
      { kind: "article", slug: "inverter-thermal-management-guide" },
    ],
  },
  mobility: {
    owner: [
      { kind: "calculator", slug: "mobility-tco-calculator" },
      { kind: "calculator", slug: "ev-charging-cost" },
      { kind: "calculator", slug: "ev-battery-range" },
      { kind: "article", slug: "mobility-tco-guide" },
    ],
    pro: [
      { kind: "calculator", slug: "ev-battery-range" },
      { kind: "calculator", slug: "dc-cable-size" },
      { kind: "calculator", slug: "ev-charging-cable-loss" },
      { kind: "article", slug: "ev-charging-cable-loss-guide" },
    ],
  },
  savings: {
    owner: [
      { kind: "calculator", slug: "standby-power-aggregator" },
      { kind: "calculator", slug: "appliance-daily-cost" },
      { kind: "calculator", slug: "smart-thermostat-savings" },
      { kind: "article", slug: "vampire-power-guide" },
    ],
    pro: [
      { kind: "calculator", slug: "peak-shaving-potential" },
      { kind: "calculator", slug: "electricity-rate-plan" },
      { kind: "article", slug: "cutting-bills-with-time-of-use-shifting" },
    ],
  },
};

export function wizardCatalogKey(
  goal: WizardGoal,
  experience: WizardExperience
): string {
  return `${goal}:${experience}`;
}

export function isWizardGoal(value: string): value is WizardGoal {
  return WIZARD_GOALS.some((goal) => goal.id === value);
}

export function isWizardExperience(value: string): value is WizardExperience {
  return WIZARD_EXPERIENCE.some((level) => level.id === value);
}

export interface WizardProgressState {
  goal: WizardGoal;
  experience: WizardExperience;
  completedStepIds: string[];
  updatedAt: string;
}

export function wizardProgressKey(
  goal: WizardGoal,
  experience: WizardExperience
): string {
  return `${goal}:${experience}`;
}
