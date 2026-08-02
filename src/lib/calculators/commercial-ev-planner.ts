import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";

const PACK_USABLE_FRACTION = 0.9;
const DEFAULT_ELECTRICITY_RATE = 0.16; // $/kWh
const DEFAULT_DIESEL_PRICE = 4.25; // $/gal
const DEFAULT_DIESEL_MPG = 12;

export const COMMERCIAL_EV_VEHICLE_CLASSES = [
  {
    value: "delivery-van",
    label: "Electric Delivery Van",
    curbKg: 2200,
    baseKwhPerKm: 0.28,
  },
  {
    value: "light-truck",
    label: "Light Duty Truck",
    curbKg: 2800,
    baseKwhPerKm: 0.35,
  },
  {
    value: "heavy-cargo",
    label: "Heavy Cargo Van",
    curbKg: 3200,
    baseKwhPerKm: 0.42,
  },
  {
    value: "custom",
    label: "Custom / Manual",
    curbKg: 2500,
    baseKwhPerKm: 0.32,
  },
] as const;

export const COMMERCIAL_EV_BATTERY_PRESETS = [
  { value: "60", label: "60 kWh" },
  { value: "100", label: "100 kWh" },
  { value: "150", label: "150 kWh" },
  { value: "200", label: "200 kWh+" },
  { value: "custom", label: "Custom" },
] as const;

export const COMMERCIAL_EV_DRIVETRAIN = [
  { value: "single", label: "Single motor", powerBias: 1.0 },
  { value: "dual", label: "Dual motor", powerBias: 1.08 },
] as const;

export const COMMERCIAL_EV_MOTOR_PRESETS = [
  { value: "150", label: "150 kW (~200 hp)" },
  { value: "250", label: "250 kW (~335 hp)" },
  { value: "350", label: "350 kW (~470 hp)" },
  { value: "custom", label: "Custom" },
] as const;

export const COMMERCIAL_EV_TIRE_OPTIONS = [
  {
    value: "hd-single",
    label: "Commercial HD single",
    rolling: 1.0,
    wearKmBase: 45000,
  },
  {
    value: "hd-dual",
    label: "Dual-wheel commercial",
    rolling: 1.08,
    wearKmBase: 52000,
  },
  {
    value: "all-terrain",
    label: "All-terrain commercial",
    rolling: 1.18,
    wearKmBase: 38000,
  },
] as const;

export const COMMERCIAL_EV_AUX_OPTIONS = [
  { value: "none", label: "None (cabin off)", kw: 0 },
  { value: "climate", label: "Cabin climate / heating", kw: 2.5 },
  { value: "reefer-light", label: "Light refrigerated cargo", kw: 4.5 },
  { value: "reefer-heavy", label: "Active reefer cooling", kw: 7.5 },
  { value: "custom", label: "Custom kW", kw: 0 },
] as const;

export const COMMERCIAL_EV_ROUTE_OPTIONS = [
  {
    value: "urban",
    label: "Multi-stop urban delivery",
    consumption: 1.22,
    avgSpeedKmh: 28,
    stopIntensity: 1.35,
  },
  {
    value: "highway",
    label: "Highway cruising",
    consumption: 1.0,
    avgSpeedKmh: 85,
    stopIntensity: 0.7,
  },
  {
    value: "steep",
    label: "Steep inclines + heavy loads",
    consumption: 1.45,
    avgSpeedKmh: 40,
    stopIntensity: 1.1,
  },
] as const;

export const COMMERCIAL_EV_STYLE_OPTIONS = [
  {
    value: "regen",
    label: "Standard regenerative braking",
    consumption: 0.92,
    brakeWear: 0.75,
    tireWear: 1.0,
  },
  {
    value: "mixed",
    label: "Mixed delivery style",
    consumption: 1.0,
    brakeWear: 1.0,
    tireWear: 1.08,
  },
  {
    value: "aggressive",
    label: "Aggressive stop-and-go",
    consumption: 1.18,
    brakeWear: 1.55,
    tireWear: 1.25,
  },
] as const;

export type CommercialEvVehicleClass =
  (typeof COMMERCIAL_EV_VEHICLE_CLASSES)[number]["value"];
export type CommercialEvTire =
  (typeof COMMERCIAL_EV_TIRE_OPTIONS)[number]["value"];
export type CommercialEvRoute =
  (typeof COMMERCIAL_EV_ROUTE_OPTIONS)[number]["value"];
export type CommercialEvStyle =
  (typeof COMMERCIAL_EV_STYLE_OPTIONS)[number]["value"];
export type CommercialEvDrivetrain =
  (typeof COMMERCIAL_EV_DRIVETRAIN)[number]["value"];

export interface CommercialEvPlannerInput {
  vehicleClass: CommercialEvVehicleClass;
  batteryKwh: number;
  drivetrain: CommercialEvDrivetrain;
  motorKw: number;
  tire: CommercialEvTire;
  gvwrKg: number;
  crewWeightKg: number;
  cargoWeightKg: number;
  auxKw: number;
  route: CommercialEvRoute;
  drivingStyle: CommercialEvStyle;
  electricityRate: number;
  dieselPrice: number;
  dieselMpg: number;
}

export interface CommercialEvRecommendation {
  severity: "ok" | "info" | "warning" | "critical";
  title: string;
  message: string;
}

export interface CommercialEvPlannerResult {
  usableKwh: number;
  consumptionKwhPerKm: number;
  rangeKm: number;
  rangeMiles: number;
  auxKwhPerHour: number;
  auxDrainPercent: number;
  auxRangeLossKm: number;
  tireLifeKm: number;
  brakePadLifeKm: number;
  evCostPerKm: number;
  evCostPerMile: number;
  dieselCostPerKm: number;
  dieselCostPerMile: number;
  savingsVsDieselPercent: number;
  totalMassKg: number;
  payloadUtilizationPercent: number;
  recommendations: CommercialEvRecommendation[];
}

function findOption<T extends { value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find((o) => o.value === value);
}

function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

function buildRecommendations(
  input: CommercialEvPlannerInput,
  result: Omit<CommercialEvPlannerResult, "recommendations">
): CommercialEvRecommendation[] {
  const recs: CommercialEvRecommendation[] = [];

  if (result.payloadUtilizationPercent > 95) {
    recs.push({
      severity: "critical",
      title: "Near or over GVWR",
      message: `Crew + cargo (~${formatNumber(result.totalMassKg - (findOption(COMMERCIAL_EV_VEHICLE_CLASSES, input.vehicleClass)?.curbKg ?? 2500), { maxDecimals: 0 })} kg) pushes utilization to ${formatNumber(result.payloadUtilizationPercent, { maxDecimals: 0 })}% of GVWR. Reduce load or upsize the chassis.`,
    });
  } else if (result.payloadUtilizationPercent > 85) {
    recs.push({
      severity: "warning",
      title: "High payload utilization",
      message: `You're at ${formatNumber(result.payloadUtilizationPercent, { maxDecimals: 0 })}% of GVWR. Expect higher Wh/km and faster tire wear on hills.`,
    });
  }

  if (input.auxKw >= 4.5 && result.auxDrainPercent >= 18) {
    recs.push({
      severity: "warning",
      title: "Refrigeration cutting into range",
      message: `Auxiliary load (~${formatNumber(input.auxKw, { maxDecimals: 1 })} kW) consumes about ${formatNumber(result.auxDrainPercent, { maxDecimals: 0 })}% of usable energy on this route profile. Plan mid-day top-ups or a larger pack.`,
    });
  }

  if (
    input.auxKw >= 6 &&
    result.payloadUtilizationPercent > 80 &&
    input.route === "steep"
  ) {
    recs.push({
      severity: "critical",
      title: "Route completion at risk",
      message:
        "Active reefer + heavy payload + steep grades can leave insufficient margin for the full route. Stage charging or shed cargo before climbs.",
    });
  }

  if (input.batteryKwh < 80 && input.route === "urban" && input.auxKw >= 4.5) {
    recs.push({
      severity: "info",
      title: "Small pack for urban reefer duty",
      message:
        "Multi-stop urban delivery with refrigeration favors 100 kWh+ packs for fewer depot returns.",
    });
  }

  if (input.drivetrain === "dual" && input.motorKw >= 300 && input.batteryKwh < 100) {
    recs.push({
      severity: "warning",
      title: "High power, modest battery",
      message: `Dual ${input.motorKw} kW with a ${input.batteryKwh} kWh pack can spike C-rate under load. Prefer 150 kWh+ for sustained highway grades.`,
    });
  }

  if (recs.every((r) => r.severity === "info" || r.severity === "ok") || recs.length === 0) {
    if (result.savingsVsDieselPercent >= 35) {
      recs.unshift({
        severity: "ok",
        title: "Strong fleet cost advantage",
        message: `EV energy cost is about ${formatNumber(result.savingsVsDieselPercent, { maxDecimals: 0 })}% lower per km than a typical diesel commercial fleet on these assumptions.`,
      });
    } else if (recs.length === 0) {
      recs.push({
        severity: "ok",
        title: "No critical operational flags",
        message:
          "Payload, aux load, and pack size look workable for this route profile. Validate with telematics on live routes.",
      });
    }
  }

  return recs;
}

export function calculateCommercialEvPlannerFromInput(
  input: CommercialEvPlannerInput
): CommercialEvPlannerResult {
  const vehicle =
    findOption(COMMERCIAL_EV_VEHICLE_CLASSES, input.vehicleClass) ??
    COMMERCIAL_EV_VEHICLE_CLASSES[0];
  const tire =
    findOption(COMMERCIAL_EV_TIRE_OPTIONS, input.tire) ??
    COMMERCIAL_EV_TIRE_OPTIONS[0];
  const route =
    findOption(COMMERCIAL_EV_ROUTE_OPTIONS, input.route) ??
    COMMERCIAL_EV_ROUTE_OPTIONS[0];
  const style =
    findOption(COMMERCIAL_EV_STYLE_OPTIONS, input.drivingStyle) ??
    COMMERCIAL_EV_STYLE_OPTIONS[1];
  const drivetrain =
    findOption(COMMERCIAL_EV_DRIVETRAIN, input.drivetrain) ??
    COMMERCIAL_EV_DRIVETRAIN[0];

  const usableKwh = input.batteryKwh * PACK_USABLE_FRACTION;
  const totalMassKg =
    vehicle.curbKg + input.crewWeightKg + input.cargoWeightKg;
  const payloadUtilizationPercent = Math.min(
    150,
    (totalMassKg / Math.max(input.gvwrKg, 1)) * 100
  );

  const weightRatio = totalMassKg / Math.max(vehicle.curbKg + 200, 1);
  const weightMult = Math.pow(Math.max(weightRatio, 0.85), 1.25);
  const motorBias = 1 + Math.max(0, input.motorKw - 200) / 4000;

  const propulsionKwhPerKm =
    vehicle.baseKwhPerKm *
    tire.rolling *
    weightMult *
    route.consumption *
    style.consumption *
    drivetrain.powerBias *
    motorBias;

  const hoursPerKm = 1 / Math.max(route.avgSpeedKmh, 15);
  const auxKwhPerKm = input.auxKw * hoursPerKm;
  const consumptionKwhPerKm = propulsionKwhPerKm + auxKwhPerKm;

  const rangeKm = usableKwh / consumptionKwhPerKm;
  const rangeMiles = kmToMiles(rangeKm);

  const propulsionOnlyRange = usableKwh / propulsionKwhPerKm;
  const auxRangeLossKm = Math.max(0, propulsionOnlyRange - rangeKm);
  const auxDrainPercent =
    consumptionKwhPerKm > 0
      ? (auxKwhPerKm / consumptionKwhPerKm) * 100
      : 0;

  const tireLifeKm = Math.round(
    tire.wearKmBase /
      (style.tireWear *
        (1 + Math.max(0, payloadUtilizationPercent - 70) / 80) *
        (route.value === "urban" ? 1.15 : route.value === "steep" ? 1.2 : 1))
  );

  const brakeBaseKm = 42000;
  const brakePadLifeKm = Math.round(
    brakeBaseKm /
      (style.brakeWear *
        route.stopIntensity *
        (1 + Math.max(0, payloadUtilizationPercent - 75) / 100))
  );

  const evCostPerKm = consumptionKwhPerKm * input.electricityRate;
  const evCostPerMile = evCostPerKm / 0.621371;
  const dieselCostPerMile = input.dieselPrice / input.dieselMpg;
  const dieselCostPerKm = dieselCostPerMile * 0.621371;
  const savingsVsDieselPercent =
    dieselCostPerKm > 0
      ? ((dieselCostPerKm - evCostPerKm) / dieselCostPerKm) * 100
      : 0;

  const base = {
    usableKwh,
    consumptionKwhPerKm,
    rangeKm,
    rangeMiles,
    auxKwhPerHour: input.auxKw,
    auxDrainPercent,
    auxRangeLossKm,
    tireLifeKm,
    brakePadLifeKm,
    evCostPerKm,
    evCostPerMile,
    dieselCostPerKm,
    dieselCostPerMile,
    savingsVsDieselPercent,
    totalMassKg,
    payloadUtilizationPercent,
  };

  return {
    ...base,
    recommendations: buildRecommendations(input, base),
  };
}

export function parseCommercialEvPlannerInput(
  values: Record<string, string>
): CommercialEvPlannerInput | null {
  const vehicleClass = (values.vehicleClass ??
    "delivery-van") as CommercialEvVehicleClass;

  const batteryPreset = values.batteryPreset ?? "100";
  const batteryKwh =
    batteryPreset === "custom"
      ? parsePositive(values.batteryKwhCustom ?? "")
      : parsePositive(batteryPreset);

  const drivetrain = (values.drivetrain ?? "single") as CommercialEvDrivetrain;
  const motorPreset = values.motorPreset ?? "250";
  const motorKw =
    motorPreset === "custom"
      ? parsePositive(values.motorKwCustom ?? "")
      : parsePositive(motorPreset);

  const tire = (values.tire ?? "hd-single") as CommercialEvTire;
  const gvwrKg = parsePositive(values.gvwrKg ?? "") ?? 4500;
  const crewWeightKg = parsePositive(values.crewWeightKg ?? "");
  const cargoWeightKg = parsePositive(values.cargoWeightKg ?? "");

  const auxPreset = values.auxPreset ?? "climate";
  let auxKw: number | null;
  if (auxPreset === "custom") {
    auxKw = parsePositive(values.auxKwCustom ?? "");
  } else {
    auxKw = findOption(COMMERCIAL_EV_AUX_OPTIONS, auxPreset)?.kw ?? null;
  }

  const route = (values.route ?? "urban") as CommercialEvRoute;
  const drivingStyle = (values.drivingStyle ?? "mixed") as CommercialEvStyle;
  const electricityRate =
    parsePositive(values.electricityRate ?? "") ?? DEFAULT_ELECTRICITY_RATE;
  const dieselPrice =
    parsePositive(values.dieselPrice ?? "") ?? DEFAULT_DIESEL_PRICE;
  const dieselMpg = parsePositive(values.dieselMpg ?? "") ?? DEFAULT_DIESEL_MPG;

  if (
    batteryKwh === null ||
    motorKw === null ||
    crewWeightKg === null ||
    cargoWeightKg === null ||
    auxKw === null
  ) {
    return null;
  }

  if (!findOption(COMMERCIAL_EV_VEHICLE_CLASSES, vehicleClass)) return null;
  if (!findOption(COMMERCIAL_EV_DRIVETRAIN, drivetrain)) return null;
  if (!findOption(COMMERCIAL_EV_TIRE_OPTIONS, tire)) return null;
  if (!findOption(COMMERCIAL_EV_ROUTE_OPTIONS, route)) return null;
  if (!findOption(COMMERCIAL_EV_STYLE_OPTIONS, drivingStyle)) return null;

  return {
    vehicleClass,
    batteryKwh,
    drivetrain,
    motorKw,
    tire,
    gvwrKg,
    crewWeightKg,
    cargoWeightKg,
    auxKw,
    route,
    drivingStyle,
    electricityRate,
    dieselPrice,
    dieselMpg,
  };
}

export function calculateCommercialEvPlanner(
  values: Record<string, string>
): CommercialEvPlannerResult | null {
  const input = parseCommercialEvPlannerInput(values);
  if (!input) return null;
  return calculateCommercialEvPlannerFromInput(input);
}

export function formatCommercialEvPlannerResult(
  values: Record<string, string>
) {
  const result = calculateCommercialEvPlanner(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 0 }),
    unit: "km",
    detail: `${formatNumber(result.rangeMiles, { maxDecimals: 0 })} mi · ${formatNumber(result.consumptionKwhPerKm, { maxDecimals: 2 })} kWh/km · aux ${formatNumber(result.auxDrainPercent, { maxDecimals: 0 })}%`,
    snapshotResults: {
      "Range miles": formatNumber(result.rangeMiles, { maxDecimals: 0 }),
      "EV $/km": formatCurrency(result.evCostPerKm),
      "Tire life km": formatNumber(result.tireLifeKm, { maxDecimals: 0 }),
    },
  };
}

export { kgToLbs };
