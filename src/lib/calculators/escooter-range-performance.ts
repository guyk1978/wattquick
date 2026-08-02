import { formatNumber, parsePositive } from "@/lib/format";

/** Pack usable energy after DoD reserve + conversion losses */
const PACK_USABLE_FRACTION = 0.88;
const SCOOTER_MASS_KG = 18;
/** Standing posture + smaller wheels → higher base Wh/km than e-bikes */
const BASE_WH_PER_KM = 14.5;

export const ESCOOTER_MODEL_PRESETS = [
  { value: "dualtron", label: "Dualtron" },
  { value: "ninebot", label: "Segway Ninebot" },
  { value: "kaabo", label: "Kaabo" },
  { value: "vsett", label: "Vsett" },
  { value: "custom", label: "Custom / Manual" },
] as const;

export const ESCOOTER_MOTOR_LAYOUTS = [
  { value: "single", label: "Single motor", dualFactor: 1.0 },
  { value: "dual", label: "Dual motor", dualFactor: 1.22 },
] as const;

export const ESCOOTER_MOTOR_PRESETS = [
  { value: "500", label: "500W" },
  { value: "1000", label: "1000W" },
  { value: "2000", label: "2000W" },
  { value: "3000", label: "3000W+" },
  { value: "custom", label: "Custom" },
] as const;

export const ESCOOTER_BATTERY_PRESETS = [
  { value: "48/18", label: "48V / 18Ah", volts: 48, ah: 18 },
  { value: "52/20", label: "52V / 20Ah", volts: 52, ah: 20 },
  { value: "60/25", label: "60V / 25Ah", volts: 60, ah: 25 },
  { value: "72/35", label: "72V / 35Ah", volts: 72, ah: 35 },
  { value: "custom", label: "Custom", volts: 0, ah: 0 },
] as const;

export const ESCOOTER_TIRE_OPTIONS = [
  {
    value: "pneumatic-10",
    label: "Pneumatic tubeless · 10″",
    rollingFactor: 1.0,
    speedDrag: 1.0,
    wearKmBase: 2800,
  },
  {
    value: "pneumatic-11",
    label: "Pneumatic tubeless · 11″",
    rollingFactor: 0.96,
    speedDrag: 1.02,
    wearKmBase: 3000,
  },
  {
    value: "solid-10",
    label: "Solid / honeycomb · 10″",
    rollingFactor: 1.22,
    speedDrag: 0.94,
    wearKmBase: 5500,
  },
  {
    value: "offroad-11",
    label: "Off-road pneumatic · 11″",
    rollingFactor: 1.35,
    speedDrag: 0.9,
    wearKmBase: 2200,
  },
] as const;

export const ESCOOTER_CONTROLLER_PRESETS = [
  { value: "20", label: "20A" },
  { value: "25", label: "25A" },
  { value: "30", label: "30A" },
  { value: "40", label: "40A+" },
  { value: "custom", label: "Custom" },
] as const;

export const ESCOOTER_BODY_BUILD_OPTIONS = [
  { value: "lean", label: "Lean / athletic", factor: 0.94 },
  { value: "average", label: "Average", factor: 1.0 },
  { value: "large", label: "Larger build", factor: 1.12 },
] as const;

export const ESCOOTER_TERRAIN_OPTIONS = [
  {
    value: "flat",
    label: "Urban flat",
    consumption: 1.0,
    hillSpeedFactor: 0.92,
  },
  {
    value: "moderate",
    label: "Moderate hills",
    consumption: 1.38,
    hillSpeedFactor: 0.68,
  },
  {
    value: "steep",
    label: "Steep & long inclines",
    consumption: 1.85,
    hillSpeedFactor: 0.48,
  },
] as const;

export const ESCOOTER_STYLE_OPTIONS = [
  {
    value: "eco",
    label: "Eco mode",
    consumption: 0.72,
    cycleStress: 0.85,
    tireWear: 0.9,
  },
  {
    value: "mixed",
    label: "Normal / mixed",
    consumption: 1.0,
    cycleStress: 1.0,
    tireWear: 1.05,
  },
  {
    value: "sport",
    label: "Sport / aggressive dual full throttle",
    consumption: 1.55,
    cycleStress: 1.45,
    tireWear: 1.4,
  },
] as const;

export type EscooterTireType = (typeof ESCOOTER_TIRE_OPTIONS)[number]["value"];
export type EscooterBodyBuild = (typeof ESCOOTER_BODY_BUILD_OPTIONS)[number]["value"];
export type EscooterTerrainProfile =
  (typeof ESCOOTER_TERRAIN_OPTIONS)[number]["value"];
export type EscooterRidingStyle = (typeof ESCOOTER_STYLE_OPTIONS)[number]["value"];
export type EscooterMotorLayout = (typeof ESCOOTER_MOTOR_LAYOUTS)[number]["value"];

export interface EscooterRangePerformanceInput {
  model: string;
  motorLayout: EscooterMotorLayout;
  motorWatts: number;
  batteryVolts: number;
  batteryAh: number;
  tire: EscooterTireType;
  controllerAmps: number;
  riderWeightKg: number;
  bodyBuild: EscooterBodyBuild;
  terrain: EscooterTerrainProfile;
  ridingStyle: EscooterRidingStyle;
}

export interface EscooterSpeedProfiles {
  flatMaxKmh: number;
  hillKmh: number;
  descentSafeKmh: number;
  flatMaxMph: number;
  hillMph: number;
  descentSafeMph: number;
}

export interface EscooterComponentLongevity {
  batteryCycles: number;
  batteryYears: number;
  tireLifeKm: number;
  tireYears: number;
  cRate: number;
}

export interface EscooterHardwareRecommendation {
  severity: "ok" | "info" | "warning" | "critical";
  title: string;
  message: string;
}

export interface EscooterRangePerformanceResult {
  batteryWh: number;
  usableWh: number;
  consumptionWhPerKm: number;
  rangeKm: number;
  rangeMiles: number;
  systemWatts: number;
  limitedBy: "motor" | "controller" | "balanced";
  dualFactor: number;
  speeds: EscooterSpeedProfiles;
  longevity: EscooterComponentLongevity;
  recommendations: EscooterHardwareRecommendation[];
}

function findOption<T extends { value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find((o) => o.value === value);
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

function weightFactor(riderKg: number, body: EscooterBodyBuild): number {
  const build = findOption(ESCOOTER_BODY_BUILD_OPTIONS, body)?.factor ?? 1;
  const totalMass = riderKg + SCOOTER_MASS_KG;
  const massRatio = totalMass / 95;
  return Math.pow(massRatio, 1.18) * build;
}

function consumptionForStyle(
  input: EscooterRangePerformanceInput,
  styleMult: number
): number {
  const tire = findOption(ESCOOTER_TIRE_OPTIONS, input.tire);
  const terrain = findOption(ESCOOTER_TERRAIN_OPTIONS, input.terrain);
  const layout = findOption(ESCOOTER_MOTOR_LAYOUTS, input.motorLayout);
  const rolling = tire?.rollingFactor ?? 1;
  const terrainMult = terrain?.consumption ?? 1;
  const dual = layout?.dualFactor ?? 1;
  const mass = weightFactor(input.riderWeightKg, input.bodyBuild);
  const powerBias = 1 + Math.max(0, input.motorWatts - 500) / 5000;

  return (
    BASE_WH_PER_KM *
    rolling *
    mass *
    terrainMult *
    styleMult *
    dual *
    powerBias
  );
}

function estimateFlatSpeedKmh(
  systemWatts: number,
  tireDrag: number,
  totalMassKg: number,
  dualFactor: number
): number {
  const aeroRef = 320;
  const raw =
    22 +
    Math.pow(Math.max(systemWatts, 100) / aeroRef, 0.4) * 28 * Math.sqrt(dualFactor) -
    Math.max(0, totalMassKg - 95) * 0.05;
  return Math.min(95, Math.max(15, raw * tireDrag));
}

function buildRecommendations(
  input: EscooterRangePerformanceInput,
  systemWatts: number,
  limitedBy: EscooterRangePerformanceResult["limitedBy"],
  cRate: number
): EscooterHardwareRecommendation[] {
  const recs: EscooterHardwareRecommendation[] = [];
  const controllerCap = input.batteryVolts * input.controllerAmps;

  if (input.motorWatts >= 2000 && input.batteryVolts < 52) {
    recs.push({
      severity: "warning",
      title: "Battery underpowered for motor",
      message: `A ${input.motorWatts}W setup on a ${input.batteryVolts}V pack will sag hard under load. Prefer 60V+ for high-watt scooters.`,
    });
  }

  if (input.motorWatts >= 3000 && input.controllerAmps < 30) {
    recs.push({
      severity: "critical",
      title: "Controller amp rating too low",
      message: `High-watt motors need ~30–40A+ controllers. At ${input.controllerAmps}A you're capped near ${Math.round(controllerCap)}W.`,
    });
  } else if (limitedBy === "controller" && input.motorWatts - systemWatts > 120) {
    recs.push({
      severity: "warning",
      title: "Controller limiting the motors",
      message: `The system only delivers about ${Math.round(systemWatts)}W (V×A), while motors are rated ${input.motorWatts}W.`,
    });
  }

  if (
    input.motorLayout === "dual" &&
    input.ridingStyle === "sport" &&
    input.batteryAh < 20
  ) {
    recs.push({
      severity: "warning",
      title: "Small pack for dual sport riding",
      message:
        "Dual-motor sport throttle drains small packs fast. Consider 25Ah+ or dial back to mixed mode for range.",
    });
  }

  if (cRate > 2.8) {
    recs.push({
      severity: "critical",
      title: "C-rate too high",
      message: `Drawing ${input.controllerAmps}A from a ${input.batteryAh}Ah pack ≈ ${formatNumber(cRate, { maxDecimals: 1 })}C — risk of heat and shorter cell life.`,
    });
  } else if (cRate > 2.0) {
    recs.push({
      severity: "warning",
      title: "High C-rate",
      message: `Continuous draw ≈ ${formatNumber(cRate, { maxDecimals: 1 })}C. Prefer high-discharge cells or increase Ah.`,
    });
  }

  if (
    (input.tire === "offroad-11" || input.tire === "solid-10") &&
    input.terrain === "steep" &&
    input.ridingStyle === "sport"
  ) {
    recs.push({
      severity: "info",
      title: "Very high energy use",
      message:
        "Aggressive tires + steep hills + sport throttle raise Wh/km a lot. Expect much less range than brochure numbers.",
    });
  }

  if (
    input.batteryVolts >= 52 &&
    input.controllerAmps >= 25 &&
    limitedBy !== "controller"
  ) {
    if (recs.every((r) => r.severity === "info" || r.severity === "ok")) {
      recs.unshift({
        severity: "ok",
        title: "Well-matched hardware",
        message: `A ${input.batteryVolts}V pack with a ${input.controllerAmps}A controller and ${input.motorWatts}W ${input.motorLayout} motor setup looks balanced.`,
      });
    }
  }

  if (recs.length === 0) {
    recs.push({
      severity: "ok",
      title: "No critical warnings",
      message:
        "These settings look reasonable. Always check manufacturer specs and local speed / power limits.",
    });
  }

  return recs;
}

export function calculateEscooterRangePerformanceFromInput(
  input: EscooterRangePerformanceInput
): EscooterRangePerformanceResult {
  const batteryWh = input.batteryVolts * input.batteryAh;
  const usableWh = batteryWh * PACK_USABLE_FRACTION;

  const style =
    findOption(ESCOOTER_STYLE_OPTIONS, input.ridingStyle) ??
    ESCOOTER_STYLE_OPTIONS[1];
  const tire =
    findOption(ESCOOTER_TIRE_OPTIONS, input.tire) ?? ESCOOTER_TIRE_OPTIONS[0];
  const terrain =
    findOption(ESCOOTER_TERRAIN_OPTIONS, input.terrain) ??
    ESCOOTER_TERRAIN_OPTIONS[0];
  const layout =
    findOption(ESCOOTER_MOTOR_LAYOUTS, input.motorLayout) ??
    ESCOOTER_MOTOR_LAYOUTS[0];

  const controllerWatts = input.batteryVolts * input.controllerAmps * 0.92;
  const systemWatts = Math.min(input.motorWatts, controllerWatts);
  const limitedBy: EscooterRangePerformanceResult["limitedBy"] =
    Math.abs(input.motorWatts - controllerWatts) < 60
      ? "balanced"
      : input.motorWatts > controllerWatts
        ? "controller"
        : "motor";

  const consumptionWhPerKm = consumptionForStyle(input, style.consumption);
  const rangeKm = usableWh / consumptionWhPerKm;
  const rangeMiles = kmToMiles(rangeKm);

  const totalMass = input.riderWeightKg + SCOOTER_MASS_KG;
  const flatMaxKmh = estimateFlatSpeedKmh(
    systemWatts,
    tire.speedDrag,
    totalMass,
    layout.dualFactor
  );
  const hillKmh = Math.max(
    8,
    flatMaxKmh *
      terrain.hillSpeedFactor *
      (1 - Math.max(0, totalMass - 100) * 0.0025)
  );
  const descentSafeKmh = Math.min(
    65,
    38 +
      (input.tire.startsWith("pneumatic") || input.tire === "offroad-11" ? 6 : 0) +
      (input.tire.includes("11") ? 2 : 0) -
      (terrain.value === "steep" ? 4 : 0)
  );

  const cRate = input.controllerAmps / Math.max(input.batteryAh, 0.1);
  const baseCycles = 850;
  const cyclePenalty =
    style.cycleStress * (1 + Math.max(0, cRate - 1.2) * 0.28) * layout.dualFactor;
  const batteryCycles = Math.max(220, Math.round(baseCycles / cyclePenalty));
  const ridesPerYear =
    input.ridingStyle === "sport" ? 240 : input.ridingStyle === "eco" ? 170 : 200;
  const kmPerRide = Math.min(rangeKm * 0.5, 22);
  const annualKm = ridesPerYear * kmPerRide;
  const batteryYears = Math.max(1, Math.min(9, batteryCycles / ridesPerYear));

  const tireLifeKm = Math.round(
    tire.wearKmBase /
      (style.tireWear *
        (input.terrain === "steep" ? 1.25 : input.terrain === "moderate" ? 1.1 : 1) *
        weightFactor(input.riderWeightKg, input.bodyBuild))
  );
  const tireYears = Math.max(
    0.4,
    Math.min(7, tireLifeKm / Math.max(annualKm, 1))
  );

  return {
    batteryWh,
    usableWh,
    consumptionWhPerKm,
    rangeKm,
    rangeMiles,
    systemWatts,
    limitedBy,
    dualFactor: layout.dualFactor,
    speeds: {
      flatMaxKmh,
      hillKmh,
      descentSafeKmh,
      flatMaxMph: kmToMiles(flatMaxKmh),
      hillMph: kmToMiles(hillKmh),
      descentSafeMph: kmToMiles(descentSafeKmh),
    },
    longevity: {
      batteryCycles,
      batteryYears,
      tireLifeKm,
      tireYears,
      cRate,
    },
    recommendations: buildRecommendations(input, systemWatts, limitedBy, cRate),
  };
}

export function parseEscooterRangePerformanceInput(
  values: Record<string, string>
): EscooterRangePerformanceInput | null {
  const model = values.modelPreset ?? "ninebot";

  const motorLayout = (values.motorLayout ?? "single") as EscooterMotorLayout;
  const motorPreset = values.motorPreset ?? "1000";
  const motorWatts =
    motorPreset === "custom"
      ? parsePositive(values.motorWattsCustom ?? "")
      : parsePositive(motorPreset);

  const batteryPreset = values.batteryPreset ?? "52/20";
  let batteryVolts: number | null;
  let batteryAh: number | null;
  if (batteryPreset === "custom") {
    batteryVolts = parsePositive(values.batteryVoltsCustom ?? "");
    batteryAh = parsePositive(values.batteryAhCustom ?? "");
  } else {
    const preset = findOption(ESCOOTER_BATTERY_PRESETS, batteryPreset);
    batteryVolts = preset?.volts ?? null;
    batteryAh = preset?.ah ?? null;
  }

  const controllerPreset = values.controllerPreset ?? "25";
  const controllerAmps =
    controllerPreset === "custom"
      ? parsePositive(values.controllerAmpsCustom ?? "")
      : parsePositive(controllerPreset);

  const riderWeightKg = parsePositive(values.riderWeightKg ?? "");
  const tire = (values.tire ?? "pneumatic-10") as EscooterTireType;
  const bodyBuild = (values.bodyBuild ?? "average") as EscooterBodyBuild;
  const terrain = (values.terrain ?? "flat") as EscooterTerrainProfile;
  const ridingStyle = (values.ridingStyle ?? "mixed") as EscooterRidingStyle;

  if (
    motorWatts === null ||
    batteryVolts === null ||
    batteryAh === null ||
    controllerAmps === null ||
    riderWeightKg === null
  ) {
    return null;
  }

  if (!findOption(ESCOOTER_MOTOR_LAYOUTS, motorLayout)) return null;
  if (!findOption(ESCOOTER_TIRE_OPTIONS, tire)) return null;
  if (!findOption(ESCOOTER_BODY_BUILD_OPTIONS, bodyBuild)) return null;
  if (!findOption(ESCOOTER_TERRAIN_OPTIONS, terrain)) return null;
  if (!findOption(ESCOOTER_STYLE_OPTIONS, ridingStyle)) return null;

  return {
    model,
    motorLayout,
    motorWatts,
    batteryVolts,
    batteryAh,
    tire,
    controllerAmps,
    riderWeightKg,
    bodyBuild,
    terrain,
    ridingStyle,
  };
}

export function calculateEscooterRangePerformance(
  values: Record<string, string>
): EscooterRangePerformanceResult | null {
  const input = parseEscooterRangePerformanceInput(values);
  if (!input) return null;
  return calculateEscooterRangePerformanceFromInput(input);
}

export function formatEscooterRangePerformanceResult(
  values: Record<string, string>
) {
  const result = calculateEscooterRangePerformance(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 1 }),
    unit: "km",
    detail: `${formatNumber(result.rangeMiles, { maxDecimals: 1 })} mi · ${formatNumber(result.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · ${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh usable`,
    snapshotResults: {
      "Range miles": formatNumber(result.rangeMiles, { maxDecimals: 1 }),
      "Flat max km/h": formatNumber(result.speeds.flatMaxKmh, {
        maxDecimals: 0,
      }),
      "Battery cycles": formatNumber(result.longevity.batteryCycles, {
        maxDecimals: 0,
      }),
    },
  };
}
