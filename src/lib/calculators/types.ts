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
  | "backup";

export type CalculatorId =
  | "ah-to-wh"
  | "wh-to-ah"
  | "battery-percentage"
  | "battery-charging-time"
  | "battery-runtime"
  | "watts-to-amps"
  | "amps-to-watts"
  | "solar-panel-size"
  | "solar-battery-bank"
  | "solar-daily-yield"
  | "battery-cost"
  | "ups-runtime"
  | "ev-charging-cost"
  | "ev-charge-time"
  | "appliance-daily-cost"
  | "appliance-monthly-energy"
  | "kva-to-kw"
  | "kw-to-hp"
  | "battery-bank-size"
  | "inverter-sizing";

export interface CalculatorMeta {
  id: CalculatorId;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  category: CalculatorCategory;
  suggestions: CalculatorId[];
}

export interface CalculatorFieldDef {
  id: string;
  label: string;
  unit?: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  colSpan?: 1 | 2;
}

export interface CalculatorResultDisplay {
  value: string | null;
  unit?: string;
  detail?: string | null;
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

export interface CalculatorDefinition extends CalculatorMeta {
  fields: CalculatorFieldDef[];
  result: CalculatorResultConfig;
  seo: CalculatorSeoContent;
  compute: (values: Record<string, string>) => CalculatorResultDisplay;
}

export function toMeta(definition: CalculatorDefinition): CalculatorMeta {
  return {
    id: definition.id,
    href: definition.href,
    title: definition.title,
    description: definition.description,
    icon: definition.icon,
    tag: definition.tag,
    category: definition.category,
    suggestions: definition.suggestions,
  };
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
  backup: "UPS and backup runtime",
};
