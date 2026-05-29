import type { LucideIcon, LucideProps } from "lucide-react";
import {
  ArrowLeftRight,
  Battery,
  Car,
  DollarSign,
  Gauge,
  Leaf,
  PlugZap,
  Receipt,
  Shield,
  Ship,
  Sun,
  Zap,
} from "lucide-react";
import type { CalculatorCategory } from "@/data/calculator-types";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
} from "@/data/calculator-types";

export type MegaMenuCategory = {
  category: CalculatorCategory;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
};

/** Curated order for the header mega menu grid */
export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    category: "solar",
    label: CALCULATOR_CATEGORY_LABELS.solar,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.solar,
    href: "/category/solar",
    icon: Sun,
    color: "#F59E0B",
  },
  {
    category: "ev",
    label: CALCULATOR_CATEGORY_LABELS.ev,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.ev,
    href: "/category/ev",
    icon: PlugZap,
    color: "#3B82F6",
  },
  {
    category: "battery",
    label: CALCULATOR_CATEGORY_LABELS.battery,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.battery,
    href: "/category/battery",
    icon: Battery,
    color: "#22C55E",
  },
  {
    category: "appliance",
    label: CALCULATOR_CATEGORY_LABELS.appliance,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.appliance,
    href: "/category/appliance",
    icon: Zap,
    color: "#F97316",
  },
  {
    category: "cost",
    label: CALCULATOR_CATEGORY_LABELS.cost,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.cost,
    href: "/category/cost",
    icon: DollarSign,
    color: "#EAB308",
  },
  {
    category: "power",
    label: CALCULATOR_CATEGORY_LABELS.power,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.power,
    href: "/category/power",
    icon: Zap,
    color: "#A855F7",
  },
  {
    category: "convert",
    label: CALCULATOR_CATEGORY_LABELS.convert,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.convert,
    href: "/category/convert",
    icon: ArrowLeftRight,
    color: "#06B6D4",
  },
  {
    category: "backup",
    label: CALCULATOR_CATEGORY_LABELS.backup,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.backup,
    href: "/category/backup",
    icon: Shield,
    color: "#EF4444",
  },
  {
    category: "sizing",
    label: CALCULATOR_CATEGORY_LABELS.sizing,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.sizing,
    href: "/category/sizing",
    icon: Gauge,
    color: "#10B981",
  },
  {
    category: "green-home",
    label: CALCULATOR_CATEGORY_LABELS["green-home"],
    description: CALCULATOR_CATEGORY_DESCRIPTIONS["green-home"],
    href: "/category/green-home",
    icon: Leaf,
    color: "#84CC16",
  },
  {
    category: "tariffs",
    label: CALCULATOR_CATEGORY_LABELS.tariffs,
    description: CALCULATOR_CATEGORY_DESCRIPTIONS.tariffs,
    href: "/category/tariffs",
    icon: Receipt,
    color: "#8B5CF6",
  },
  {
    category: "commercial-ev",
    label: CALCULATOR_CATEGORY_LABELS["commercial-ev"],
    description: CALCULATOR_CATEGORY_DESCRIPTIONS["commercial-ev"],
    href: "/category/commercial-ev",
    icon: Car,
    color: "#2563EB",
  },
  {
    category: "rv-marine",
    label: CALCULATOR_CATEGORY_LABELS["rv-marine"],
    description: CALCULATOR_CATEGORY_DESCRIPTIONS["rv-marine"],
    href: "/category/rv-marine",
    icon: Ship,
    color: "#0EA5E9",
  },
];

export function megaMenuIconProps(color: string): LucideProps {
  return { className: "size-5", style: { color }, strokeWidth: 2.25 };
}
