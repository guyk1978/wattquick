import type { LucideIcon } from "lucide-react";

export type CalculatorCategory =
  | "convert"
  | "battery"
  | "power"
  | "solar"
  | "ev"
  | "appliance"
  | "sizing"
  | "cost"
  | "backup"
  | "commercial-ev"
  | "rv-marine"
  | "tou"
  | "green-home"
  | "pool"
  | "ebike"
  | "escooter";

export type CalculatorFieldInputType = "text" | "select" | "range";

export interface CalculatorFieldOption {
  value: string;
  label: string;
}

export interface CalculatorFieldDef {
  id: string;
  label: string;
  unit?: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  colSpan?: 1 | 2;
  /** Defaults to `text` */
  inputType?: CalculatorFieldInputType;
  options?: CalculatorFieldOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculatorResultDisplay {
  value: string | null;
  unit?: string;
  detail?: string | null;
  /** Extra labeled results saved to project snapshots for BOM rollup */
  snapshotResults?: Record<string, string>;
}

export interface CalculatorResultConfig {
  label: string;
  emptyMessage: string;
}

export interface CalculatorSeoSection {
  heading: string;
  body: string;
}

export interface CalculatorSeoContent {
  sections: CalculatorSeoSection[];
}

export type CalculatorComputeFn = (
  values: Record<string, string>
) => CalculatorResultDisplay;

/** Raw calculator entry stored in data/calculators.ts */
export interface CalculatorDataEntry {
  slug: string;
  href: string;
  title: string;
  category: CalculatorCategory;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  tag: string;
  suggestions: string[];
  /** Primary complementary blog article slug (under /blog/) */
  relatedArticleId?: string;
  fields: CalculatorFieldDef[];
  result: CalculatorResultConfig;
  seo: CalculatorSeoContent;
  compute: CalculatorComputeFn;
}

export const CALCULATOR_CATEGORY_LABELS: Record<CalculatorCategory, string> = {
  convert: "Convert",
  battery: "Battery",
  power: "Power",
  solar: "Solar",
  ev: "EV Charging",
  appliance: "Appliances",
  sizing: "Battery Sizing",
  cost: "Cost",
  backup: "Backup",
  "commercial-ev": "Commercial EV",
  "rv-marine": "RV & Marine",
  tou: "TOU",
  "green-home": "Green Home",
  pool: "Pool",
  ebike: "E-Bike",
  escooter: "E-Scooter",
};

export const CALCULATOR_CATEGORY_DESCRIPTIONS: Record<CalculatorCategory, string> = {
  convert: "Ah, Wh, kVA, and unit conversions",
  battery: "Runtime, charging, and charge level",
  power: "Watts, amps, and electrical power",
  solar: "Panels, yield, and off-grid storage",
  ev: "Home charging time and cost",
  appliance: "Daily use and electricity cost",
  sizing: "Banks, inverters, and system sizing",
  cost: "Battery pack pricing estimates",
  backup: "Critical loads, UPS runtime, and outage planning",
  "commercial-ev": "Fleet trucks, vans, buses, and industrial EV",
  "rv-marine": "RV solar, marine banks, camping and portable power",
  tou: "Time-of-use rates, peak shaving, demand charges, and arbitrage",
  "green-home": "Insulation, lighting, HVAC, standby power, and envelope efficiency",
  pool: "Pool pumps, heating, covers, and seasonal operating cost",
  ebike: "Range, charging, TCO decisions, motor power, and e-bike battery health",
  escooter:
    "Tyre pressure, hill climb, charge time, and commuter economics for light EVs",
};
