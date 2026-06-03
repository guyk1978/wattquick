export const MAINTENANCE_COMPARISON_YEARS = 5;

/** Reference annual distance for baseline service intervals (~12,000 mi). */
export const BASE_ANNUAL_KM = 19_312;

export type EvIceVehicleClass = "sedan" | "suv" | "luxury";

export const EV_ICE_VEHICLE_CLASS_PRESETS: Record<
  EvIceVehicleClass,
  { label: string; costMultiplier: number }
> = {
  sedan: { label: "Family sedan / compact", costMultiplier: 1 },
  suv: { label: "SUV / crossover", costMultiplier: 1.25 },
  luxury: { label: "Luxury / premium", costMultiplier: 1.55 },
};

export type MaintenanceItemIcon =
  | "oil"
  | "filter"
  | "spark"
  | "belt"
  | "brakes"
  | "fluids"
  | "inspect"
  | "coolant"
  | "tires";

export interface MaintenanceLineItem {
  id: string;
  label: string;
  icon: MaintenanceItemIcon;
  /** Annual cost at BASE_ANNUAL_KM before mileage & class scaling */
  iceBaseAnnual: number;
  evBaseAnnual: number;
  note?: string;
}

/** Planned service costs at ~19,312 km/yr; scaled by mileage and vehicle class. */
export const MAINTENANCE_LINE_ITEMS: MaintenanceLineItem[] = [
  {
    id: "oil",
    label: "Oil & filter changes",
    icon: "oil",
    iceBaseAnnual: 165,
    evBaseAnnual: 0,
    note: "ICE only — typically 2 services per year",
  },
  {
    id: "engine-filters",
    label: "Engine air & fuel filters",
    icon: "filter",
    iceBaseAnnual: 85,
    evBaseAnnual: 0,
  },
  {
    id: "spark-plugs",
    label: "Spark plugs",
    icon: "spark",
    iceBaseAnnual: 70,
    evBaseAnnual: 0,
    note: "Amortized replacement interval",
  },
  {
    id: "timing-belt",
    label: "Timing belt / chain service",
    icon: "belt",
    iceBaseAnnual: 105,
    evBaseAnnual: 0,
    note: "Amortized — varies by engine",
  },
  {
    id: "engine-fluids",
    label: "Coolant, transmission & engine fluids",
    icon: "fluids",
    iceBaseAnnual: 125,
    evBaseAnnual: 0,
  },
  {
    id: "brakes-ice",
    label: "Brake pads & rotors (full wear)",
    icon: "brakes",
    iceBaseAnnual: 210,
    evBaseAnnual: 0,
    note: "Friction braking dominates on ICE",
  },
  {
    id: "brakes-ev",
    label: "Brake pads (regenerative braking)",
    icon: "brakes",
    iceBaseAnnual: 0,
    evBaseAnnual: 55,
    note: "~75% less pad wear vs. comparable ICE",
  },
  {
    id: "brake-fluid",
    label: "Brake fluid service",
    icon: "fluids",
    iceBaseAnnual: 45,
    evBaseAnnual: 50,
  },
  {
    id: "cabin-filter",
    label: "Cabin / HVAC filter",
    icon: "filter",
    iceBaseAnnual: 55,
    evBaseAnnual: 60,
  },
  {
    id: "battery-coolant",
    label: "Battery thermal loop coolant",
    icon: "coolant",
    iceBaseAnnual: 0,
    evBaseAnnual: 45,
    note: "EV traction battery cooling circuit",
  },
  {
    id: "tire-service",
    label: "Tire rotation & balance",
    icon: "tires",
    iceBaseAnnual: 80,
    evBaseAnnual: 85,
  },
  {
    id: "inspection",
    label: "Inspection & diagnostics",
    icon: "inspect",
    iceBaseAnnual: 110,
    evBaseAnnual: 95,
  },
];

export interface EvIceMaintenanceInput {
  annualKm: number;
  vehicleClass: EvIceVehicleClass;
  years?: number;
}

export interface EvIceMaintenanceResult {
  annualKm: number;
  mileageFactor: number;
  classMultiplier: number;
  iceAnnualTotal: number;
  evAnnualTotal: number;
  annualSavings: number;
  iceCumulativeTotal: number;
  evCumulativeTotal: number;
  totalSavings: number;
  iceCumulativeByYear: number[];
  evCumulativeByYear: number[];
  lineItems: {
    id: string;
    label: string;
    icon: MaintenanceItemIcon;
    note?: string;
    iceAnnual: number;
    evAnnual: number;
    itemSavings: number;
  }[];
}

function scaleAnnualCost(base: number, mileageFactor: number, classMultiplier: number): number {
  if (base <= 0) return 0;
  return parseFloat((base * mileageFactor * classMultiplier).toFixed(2));
}

export function calculateEvVsIceMaintenance({
  annualKm,
  vehicleClass,
  years = MAINTENANCE_COMPARISON_YEARS,
}: EvIceMaintenanceInput): EvIceMaintenanceResult | null {
  if (annualKm <= 0 || years <= 0) return null;

  const classMultiplier = EV_ICE_VEHICLE_CLASS_PRESETS[vehicleClass].costMultiplier;
  const mileageFactor = Math.min(2.5, Math.max(0.25, annualKm / BASE_ANNUAL_KM));

  const lineItems = MAINTENANCE_LINE_ITEMS.map((item) => {
    const iceAnnual = scaleAnnualCost(item.iceBaseAnnual, mileageFactor, classMultiplier);
    const evAnnual = scaleAnnualCost(item.evBaseAnnual, mileageFactor, classMultiplier);
    return {
      id: item.id,
      label: item.label,
      icon: item.icon,
      note: item.note,
      iceAnnual,
      evAnnual,
      itemSavings: parseFloat(Math.max(0, iceAnnual - evAnnual).toFixed(2)),
    };
  });

  const iceAnnualTotal = parseFloat(
    lineItems.reduce((sum, row) => sum + row.iceAnnual, 0).toFixed(2)
  );
  const evAnnualTotal = parseFloat(
    lineItems.reduce((sum, row) => sum + row.evAnnual, 0).toFixed(2)
  );
  const annualSavings = parseFloat(Math.max(0, iceAnnualTotal - evAnnualTotal).toFixed(2));

  const iceCumulativeByYear = Array.from({ length: years }, (_, i) =>
    parseFloat((iceAnnualTotal * (i + 1)).toFixed(2))
  );
  const evCumulativeByYear = Array.from({ length: years }, (_, i) =>
    parseFloat((evAnnualTotal * (i + 1)).toFixed(2))
  );

  const iceCumulativeTotal = iceCumulativeByYear[years - 1] ?? 0;
  const evCumulativeTotal = evCumulativeByYear[years - 1] ?? 0;
  const totalSavings = parseFloat(
    Math.max(0, iceCumulativeTotal - evCumulativeTotal).toFixed(2)
  );

  return {
    annualKm,
    mileageFactor: parseFloat(mileageFactor.toFixed(2)),
    classMultiplier,
    iceAnnualTotal,
    evAnnualTotal,
    annualSavings,
    iceCumulativeTotal,
    evCumulativeTotal,
    totalSavings,
    iceCumulativeByYear,
    evCumulativeByYear,
    lineItems,
  };
}
