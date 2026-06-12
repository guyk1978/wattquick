import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Battery,
  Bike,
  CircleDollarSign,
  Clock,
  Droplets,
  Home,
  Leaf,
  PlugZap,
  Shield,
  Ship,
  Sun,
  Truck,
  Waves,
  Zap,
} from "lucide-react";
import type { CalculatorCategory } from "@/data/calculator-types";

/** Representative icon per category — consistent styling in hub section headers */
export const CALCULATOR_CATEGORY_ICONS: Record<CalculatorCategory, LucideIcon> =
  {
    battery: Battery,
    sizing: Battery,
    backup: Shield,
    power: Zap,
    solar: Sun,
    ev: PlugZap,
    "commercial-ev": Truck,
    ebike: Bike,
    escooter: Bike,
    "rv-marine": Ship,
    appliance: Home,
    "green-home": Leaf,
    pool: Droplets,
    tou: Clock,
    cost: CircleDollarSign,
    convert: ArrowLeftRight,
  };

/** Dashboard display order for the homepage tool hub */
export const CATEGORY_DISPLAY_ORDER: CalculatorCategory[] = [
  "battery",
  "sizing",
  "backup",
  "power",
  "solar",
  "ev",
  "commercial-ev",
  "ebike",
  "escooter",
  "rv-marine",
  "appliance",
  "green-home",
  "pool",
  "tou",
  "cost",
  "convert",
];
