import type { LucideIcon, LucideProps } from "lucide-react";
import { ArrowLeftRight, Car, Home, Wrench } from "lucide-react";
import type { CalculatorCategory } from "@/data/calculator-types";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators/types";
import { getCalculatorMeta } from "@/lib/calculators/registry";

export type CalculatorUseCaseId =
  | "homeowners"
  | "technicians"
  | "mobility"
  | "converters";

const CATEGORY_USE_CASE: Record<CalculatorCategory, CalculatorUseCaseId> = {
  convert: "converters",
  solar: "technicians",
  battery: "technicians",
  power: "technicians",
  sizing: "technicians",
  appliance: "homeowners",
  backup: "homeowners",
  "green-home": "homeowners",
  pool: "homeowners",
  tou: "homeowners",
  cost: "homeowners",
  ev: "mobility",
  ebike: "mobility",
  escooter: "mobility",
  "commercial-ev": "mobility",
  "rv-marine": "mobility",
};

/** Home- and bill-focused EV tools live under Homeowners; the rest stay in Mobility. */
const USE_CASE_OVERRIDES: Partial<Record<CalculatorId, CalculatorUseCaseId>> = {
  "ev-charging-cost": "homeowners",
  "ev-preconditioning-cost": "homeowners",
  "ev-vs-gas-savings": "homeowners",
  "ev-level1-vs-level2": "homeowners",
  "ev-charge-time": "homeowners",
};

export type CalculatorUseCase = {
  id: CalculatorUseCaseId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  color: string;
  featuredIds: CalculatorId[];
  browseHref: string;
};

export const CALCULATOR_USE_CASES: CalculatorUseCase[] = [
  {
    id: "homeowners",
    label: "Homeowners",
    shortLabel: "Home",
    description: "Daily savings, bills, and backup power for your home.",
    icon: Home,
    color: "#F97316",
    featuredIds: [
      "appliance-daily-cost",
      "standby-power-aggregator",
      "critical-load-analysis",
      "ev-charging-cost",
      "smart-thermostat-savings",
    ],
    browseHref: "/calculators/?use-case=homeowners",
  },
  {
    id: "technicians",
    label: "Technicians & Pros",
    shortLabel: "Pros",
    description: "Engineering calculations, equipment selection, and system design.",
    icon: Wrench,
    color: "#10B981",
    featuredIds: [
      "solar-roi-analysis",
      "solar-shading-analysis",
      "dc-cable-size",
      "inverter-sizing",
      "battery-series-parallel",
      "inverter-peak-load-surge",
      "solar-array-current",
    ],
    browseHref: "/calculators/?use-case=technicians",
  },
  {
    id: "mobility",
    label: "Mobility & Fleet",
    shortLabel: "Mobility",
    description: "Range, TCO, and maintenance for EVs, e-bikes, and scooters.",
    icon: Car,
    color: "#3B82F6",
    featuredIds: [
      "mobility-tco-calculator",
      "escooter-hill-climb",
      "ev-battery-range",
      "ebike-range-estimator",
      "escooter-maintenance-schedule",
    ],
    browseHref: "/calculators/?use-case=mobility",
  },
  {
    id: "converters",
    label: "Converters & Utilities",
    shortLabel: "Convert",
    description: "Fast unit conversions and electrical quick tools.",
    icon: ArrowLeftRight,
    color: "#06B6D4",
    featuredIds: ["ah-to-wh", "kva-to-kw", "watts-to-amps", "ohms-law"],
    browseHref: "/calculators/?use-case=converters",
  },
];

export function isCalculatorUseCase(
  value: string
): value is CalculatorUseCaseId {
  return CALCULATOR_USE_CASES.some((useCase) => useCase.id === value);
}

export function getCalculatorUseCase(id: CalculatorId): CalculatorUseCaseId {
  const override = USE_CASE_OVERRIDES[id];
  if (override) return override;
  const { category } = getCalculatorMeta(id);
  return CATEGORY_USE_CASE[category];
}

export function getCalculatorsForUseCase(
  useCaseId: CalculatorUseCaseId
): CalculatorId[] {
  return (CALCULATOR_SLUGS as CalculatorId[]).filter(
    (id) => getCalculatorUseCase(id) === useCaseId
  );
}

export function getUseCaseById(
  useCaseId: CalculatorUseCaseId
): CalculatorUseCase {
  const useCase = CALCULATOR_USE_CASES.find((item) => item.id === useCaseId);
  if (!useCase) {
    throw new Error(`Unknown calculator use case: ${useCaseId}`);
  }
  return useCase;
}

/** Featured tools first, then the rest of the use-case catalog. */
export function getSortedUseCaseCalculatorIds(
  useCaseId: CalculatorUseCaseId
): CalculatorId[] {
  const useCase = getUseCaseById(useCaseId);
  const all = getCalculatorsForUseCase(useCaseId);
  const featured = useCase.featuredIds.filter((id) => all.includes(id));
  const rest = all.filter((id) => !featured.includes(id));
  return [...featured, ...rest];
}

export function useCaseIconProps(color: string): LucideProps {
  return { className: "size-3.5", style: { color }, strokeWidth: 2.25 };
}
