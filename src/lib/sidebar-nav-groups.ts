import type { CalculatorCategory } from "@/data/calculator-types";
import {
  CALCULATOR_CATEGORY_ICONS,
} from "@/lib/calculator-category-icons";
import type { LucideIcon } from "lucide-react";
import { Battery, CircleDollarSign, PlugZap, Sun, Zap } from "lucide-react";

/**
 * Intuitive left-sidebar groups for Dark Industrial Matte navigation.
 * Maps the 16 leaf categories into fewer, scannable product groups.
 * URLs stay on existing `/tools/{seo-category}/…` routes.
 */
export type SidebarNavGroupId =
  | "battery"
  | "power"
  | "solar"
  | "ev"
  | "cost";

export type SidebarNavGroup = {
  id: SidebarNavGroupId;
  label: string;
  description: string;
  icon: LucideIcon;
  categories: CalculatorCategory[];
};

export const SIDEBAR_NAV_GROUPS: readonly SidebarNavGroup[] = [
  {
    id: "battery",
    label: "Battery",
    description: "Runtime, sizing, and backup",
    icon: Battery,
    categories: ["battery", "sizing", "backup"],
  },
  {
    id: "power",
    label: "Power Systems",
    description: "Watts, amps, and conversions",
    icon: Zap,
    categories: ["power", "convert", "appliance"],
  },
  {
    id: "solar",
    label: "Solar",
    description: "Panels, home, and pool",
    icon: Sun,
    categories: ["solar", "green-home", "pool"],
  },
  {
    id: "ev",
    label: "EV Charging",
    description: "Vehicles, fleet, and light EVs",
    icon: PlugZap,
    categories: ["ev", "commercial-ev", "ebike", "escooter", "rv-marine"],
  },
  {
    id: "cost",
    label: "Cost Calculators",
    description: "Pricing and time-of-use",
    icon: CircleDollarSign,
    categories: ["cost", "tou"],
  },
] as const;

export function getSidebarGroupForCategory(
  category: CalculatorCategory
): SidebarNavGroup | undefined {
  return SIDEBAR_NAV_GROUPS.find((group) => group.categories.includes(category));
}

export function getCategoryIcon(category: CalculatorCategory): LucideIcon {
  return CALCULATOR_CATEGORY_ICONS[category];
}
