import type { LucideIcon } from "lucide-react";
import {
  Battery,
  Bolt,
  Car,
  Clock,
  DollarSign,
  Gauge,
  Home,
  Percent,
  Ruler,
  Sun,
  Thermometer,
  Zap,
} from "lucide-react";
import type { CalculatorFieldDef } from "@/lib/calculators";

/** Green sidebar icon per field — shared across all calculators. */
export function getCalculatorFieldIcon(field: CalculatorFieldDef): LucideIcon {
  const id = field.id.toLowerCase();
  const unit = field.unit?.toLowerCase() ?? "";
  const label = field.label.toLowerCase();

  if (id.includes("roof") || label.includes("roof") || unit.includes("sq ft")) {
    return Home;
  }
  if (
    id.includes("solar") ||
    id.includes("panel") ||
    id.includes("pv") ||
    label.includes("solar") ||
    label.includes("panel")
  ) {
    return Sun;
  }
  if (
    id.includes("battery") ||
    id.includes("ah") ||
    unit.includes("ah") ||
    unit.includes("kwh")
  ) {
    return Battery;
  }
  if (id.includes("ev") || id.includes("vehicle") || label.includes("ev ")) {
    return Car;
  }
  if (
    unit === "%" ||
    id.includes("percent") ||
    id.includes("efficiency") ||
    id.includes("usable")
  ) {
    return Percent;
  }
  if (unit === "w" || unit === "kw" || id.includes("watt") || id.includes("power")) {
    return Zap;
  }
  if (unit === "v" || id.includes("voltage") || id.includes("volt")) {
    return Bolt;
  }
  if (unit === "a" || id.includes("current") || id.includes("amp")) {
    return Gauge;
  }
  if (
    unit.includes("hr") ||
    unit.includes("day") ||
    id.includes("time") ||
    id.includes("hour")
  ) {
    return Clock;
  }
  if (
    unit.includes("$") ||
    id.includes("cost") ||
    id.includes("price") ||
    id.includes("rate")
  ) {
    return DollarSign;
  }
  if (
    id.includes("temp") ||
    label.includes("temperature") ||
    unit.includes("°")
  ) {
    return Thermometer;
  }
  if (
    unit.includes("ft") ||
    unit.includes("m") ||
    unit.includes("mi") ||
    unit.includes("km")
  ) {
    return Ruler;
  }

  return Zap;
}
