import type { LucideIcon } from "lucide-react";

export type CalculatorCategory =
  | "convert"
  | "battery"
  | "power"
  | "solar"
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
  | "battery-cost"
  | "ups-runtime";

/** Lightweight metadata for cards, nav, and SEO. */
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

/** Full calculator definition — add a file in `definitions/` and register it. */
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
  cost: "Cost",
  backup: "Backup",
};
