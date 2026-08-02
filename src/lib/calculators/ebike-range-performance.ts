import { formatNumber, parsePositive } from "@/lib/format";

/** Pack usable energy fraction after DoD reserve + conversion losses */
const PACK_USABLE_FRACTION = 0.9;
const BIKE_MASS_KG = 22;
const BASE_WH_PER_KM = 8.5;

export const EBIKE_MOTOR_PRESETS = [
  { value: "250", label: "250W" },
  { value: "500", label: "500W" },
  { value: "750", label: "750W" },
  { value: "1000", label: "1000W" },
  { value: "custom", label: "Custom" },
] as const;

export const EBIKE_BATTERY_PRESETS = [
  { value: "36/13", label: "36V / 13Ah", volts: 36, ah: 13 },
  { value: "48/15", label: "48V / 15Ah", volts: 48, ah: 15 },
  { value: "48/21", label: "48V / 21Ah", volts: 48, ah: 21 },
  { value: "52/20", label: "52V / 20Ah", volts: 52, ah: 20 },
  { value: "custom", label: "Custom", volts: 0, ah: 0 },
] as const;

export const EBIKE_TIRE_OPTIONS = [
  {
    value: "fat",
    label: "Fat Tire (4.0)",
    rollingFactor: 1.38,
    speedDrag: 0.92,
    wearKmBase: 3500,
  },
  {
    value: "urban",
    label: "Urban Commuter",
    rollingFactor: 1.0,
    speedDrag: 1.0,
    wearKmBase: 6000,
  },
  {
    value: "mtb",
    label: "Mountain (MTB)",
    rollingFactor: 1.18,
    speedDrag: 0.96,
    wearKmBase: 4200,
  },
] as const;

export const EBIKE_CONTROLLER_PRESETS = [
  { value: "15", label: "15A" },
  { value: "22", label: "22A" },
  { value: "25", label: "25A" },
  { value: "30", label: "30A+" },
  { value: "custom", label: "Custom" },
] as const;

export const EBIKE_BODY_BUILD_OPTIONS = [
  { value: "lean", label: "Lean / athletic", factor: 0.94 },
  { value: "average", label: "Average", factor: 1.0 },
  { value: "large", label: "Larger build", factor: 1.1 },
] as const;

export const EBIKE_TERRAIN_OPTIONS = [
  {
    value: "flat",
    label: "Mostly flat",
    consumption: 1.0,
    hillSpeedFactor: 0.95,
    gradePct: 1,
  },
  {
    value: "moderate",
    label: "Moderate hills",
    consumption: 1.32,
    hillSpeedFactor: 0.72,
    gradePct: 6,
  },
  {
    value: "steep",
    label: "Steep & long hills",
    consumption: 1.72,
    hillSpeedFactor: 0.52,
    gradePct: 12,
  },
] as const;

export const EBIKE_STYLE_OPTIONS = [
  {
    value: "eco",
    label: "Eco (low PAS + pedaling)",
    consumption: 0.72,
    cycleStress: 0.85,
    tireWear: 0.9,
  },
  {
    value: "mixed",
    label: "Mixed",
    consumption: 1.0,
    cycleStress: 1.0,
    tireWear: 1.0,
  },
  {
    value: "aggressive",
    label: "Aggressive / full throttle",
    consumption: 1.42,
    cycleStress: 1.35,
    tireWear: 1.25,
  },
] as const;

export type EbikeTireType = (typeof EBIKE_TIRE_OPTIONS)[number]["value"];
export type EbikeBodyBuild = (typeof EBIKE_BODY_BUILD_OPTIONS)[number]["value"];
export type EbikeTerrainProfile = (typeof EBIKE_TERRAIN_OPTIONS)[number]["value"];
export type EbikeRidingStyle = (typeof EBIKE_STYLE_OPTIONS)[number]["value"];

export interface EbikeRangePerformanceInput {
  motorWatts: number;
  batteryVolts: number;
  batteryAh: number;
  tire: EbikeTireType;
  controllerAmps: number;
  riderWeightKg: number;
  bodyBuild: EbikeBodyBuild;
  terrain: EbikeTerrainProfile;
  ridingStyle: EbikeRidingStyle;
}

export interface EbikePasBreakdown {
  ecoKm: number;
  standardKm: number;
  throttleKm: number;
}

export interface EbikeSpeedProfiles {
  flatMaxKmh: number;
  hillKmh: number;
  descentSafeKmh: number;
}

export interface EbikeComponentLongevity {
  batteryCycles: number;
  batteryYears: number;
  tireLifeKm: number;
  tireYears: number;
  cRate: number;
}

export interface EbikeHardwareRecommendation {
  severity: "ok" | "info" | "warning" | "critical";
  title: string;
  message: string;
}

export interface EbikeRangePerformanceResult {
  batteryWh: number;
  usableWh: number;
  consumptionWhPerKm: number;
  rangeKm: number;
  systemWatts: number;
  limitedBy: "motor" | "controller" | "balanced";
  pas: EbikePasBreakdown;
  speeds: EbikeSpeedProfiles;
  longevity: EbikeComponentLongevity;
  recommendations: EbikeHardwareRecommendation[];
}

function findOption<T extends { value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find((o) => o.value === value);
}

function weightFactor(riderKg: number, body: EbikeBodyBuild): number {
  const build = findOption(EBIKE_BODY_BUILD_OPTIONS, body)?.factor ?? 1;
  const totalMass = riderKg + BIKE_MASS_KG;
  const massRatio = totalMass / 95;
  return Math.pow(massRatio, 1.12) * build;
}

function consumptionForStyle(
  input: EbikeRangePerformanceInput,
  styleMult: number
): number {
  const tire = findOption(EBIKE_TIRE_OPTIONS, input.tire);
  const terrain = findOption(EBIKE_TERRAIN_OPTIONS, input.terrain);
  const rolling = tire?.rollingFactor ?? 1;
  const terrainMult = terrain?.consumption ?? 1;
  const mass = weightFactor(input.riderWeightKg, input.bodyBuild);

  // Higher continuous power availability nudges Wh/km slightly (less coasting)
  const powerBias = 1 + Math.max(0, input.motorWatts - 350) / 4000;

  return (
    BASE_WH_PER_KM * rolling * mass * terrainMult * styleMult * powerBias
  );
}

function estimateFlatSpeedKmh(
  systemWatts: number,
  tireDrag: number,
  totalMassKg: number
): number {
  // Empirical power–speed curve for upright e-bikes (≈ CdA 0.6–0.7)
  const aeroRef = 250;
  const raw =
    18 +
    Math.pow(Math.max(systemWatts, 80) / aeroRef, 0.42) * 22 -
    Math.max(0, totalMassKg - 95) * 0.04;
  return Math.min(65, Math.max(12, raw * tireDrag));
}

function buildRecommendations(
  input: EbikeRangePerformanceInput,
  systemWatts: number,
  limitedBy: EbikeRangePerformanceResult["limitedBy"],
  cRate: number
): EbikeHardwareRecommendation[] {
  const recs: EbikeHardwareRecommendation[] = [];
  const controllerCap = input.batteryVolts * input.controllerAmps;

  if (input.motorWatts >= 750 && input.batteryVolts <= 36) {
    recs.push({
      severity: "warning",
      title: "Battery underpowered for motor",
      message: `A ${input.motorWatts}W motor on a ${input.batteryVolts}V pack will sag hard and cut range. Aim for at least 48V.`,
    });
  }

  if (input.motorWatts >= 1000 && input.controllerAmps < 25) {
    recs.push({
      severity: "critical",
      title: "Controller amp rating too low",
      message: `A 1000W motor needs roughly a 25–30A+ controller. At ${input.controllerAmps}A you're capped near ${Math.round(controllerCap)}W.`,
    });
  } else if (limitedBy === "controller" && input.motorWatts - systemWatts > 80) {
    recs.push({
      severity: "warning",
      title: "Controller limiting the motor",
      message: `The system only delivers about ${Math.round(systemWatts)}W (V×A), while the motor is rated ${input.motorWatts}W.`,
    });
  }

  if (cRate > 2.5) {
    recs.push({
      severity: "critical",
      title: "C-rate too high",
      message: `Drawing ${input.controllerAmps}A from a ${input.batteryAh}Ah pack ≈ ${formatNumber(cRate, { maxDecimals: 1 })}C — risk of heat and shorter cell life.`,
    });
  } else if (cRate > 1.8) {
    recs.push({
      severity: "warning",
      title: "High C-rate",
      message: `Continuous draw ≈ ${formatNumber(cRate, { maxDecimals: 1 })}C. Prefer cells rated for that discharge, or increase Ah.`,
    });
  }

  if (
    input.tire === "fat" &&
    input.terrain === "steep" &&
    input.ridingStyle === "aggressive"
  ) {
    recs.push({
      severity: "info",
      title: "Very high energy use",
      message:
        "Fat tires + steep hills + full throttle raise Wh/km a lot. Expect much less range than brochure numbers.",
    });
  }

  if (input.batteryVolts >= 48 && input.controllerAmps >= 22 && limitedBy !== "controller") {
    if (recs.every((r) => r.severity === "info" || r.severity === "ok")) {
      recs.unshift({
        severity: "ok",
        title: "Well-matched hardware",
        message: `A ${input.batteryVolts}V pack with a ${input.controllerAmps}A controller and ${input.motorWatts}W motor is a solid, balanced setup.`,
      });
    }
  }

  if (recs.length === 0) {
    recs.push({
      severity: "ok",
      title: "No critical warnings",
      message:
        "These settings look reasonable. Always check manufacturer specs and local e-bike power limits.",
    });
  }

  return recs;
}

export function calculateEbikeRangePerformanceFromInput(
  input: EbikeRangePerformanceInput
): EbikeRangePerformanceResult {
  const batteryWh = input.batteryVolts * input.batteryAh;
  const usableWh = batteryWh * PACK_USABLE_FRACTION;

  const style =
    findOption(EBIKE_STYLE_OPTIONS, input.ridingStyle) ?? EBIKE_STYLE_OPTIONS[1];
  const tire =
    findOption(EBIKE_TIRE_OPTIONS, input.tire) ?? EBIKE_TIRE_OPTIONS[1];
  const terrain =
    findOption(EBIKE_TERRAIN_OPTIONS, input.terrain) ?? EBIKE_TERRAIN_OPTIONS[0];

  const controllerWatts = input.batteryVolts * input.controllerAmps * 0.92;
  const systemWatts = Math.min(input.motorWatts, controllerWatts);
  const limitedBy: EbikeRangePerformanceResult["limitedBy"] =
    Math.abs(input.motorWatts - controllerWatts) < 40
      ? "balanced"
      : input.motorWatts > controllerWatts
        ? "controller"
        : "motor";

  const consumptionWhPerKm = consumptionForStyle(input, style.consumption);
  const rangeKm = usableWh / consumptionWhPerKm;

  const pas: EbikePasBreakdown = {
    ecoKm: usableWh / consumptionForStyle(input, 0.65),
    standardKm: usableWh / consumptionForStyle(input, 1.0),
    throttleKm: usableWh / consumptionForStyle(input, 1.48),
  };

  const totalMass = input.riderWeightKg + BIKE_MASS_KG;
  const flatMaxKmh = estimateFlatSpeedKmh(
    systemWatts,
    tire.speedDrag,
    totalMass
  );
  const hillKmh = Math.max(
    8,
    flatMaxKmh * terrain.hillSpeedFactor * (1 - Math.max(0, totalMass - 100) * 0.002)
  );
  const descentSafeKmh = Math.min(
    55,
    42 + (input.tire === "fat" ? 4 : input.tire === "mtb" ? 2 : 0) +
      (terrain.value === "steep" ? -3 : 0)
  );

  const cRate = input.controllerAmps / Math.max(input.batteryAh, 0.1);
  const baseCycles = 900;
  const cyclePenalty = style.cycleStress * (1 + Math.max(0, cRate - 1) * 0.25);
  const batteryCycles = Math.max(250, Math.round(baseCycles / cyclePenalty));
  const ridesPerYear =
    input.ridingStyle === "aggressive"
      ? 220
      : input.ridingStyle === "eco"
        ? 160
        : 190;
  const kmPerRide = Math.min(rangeKm * 0.55, 25);
  const annualKm = ridesPerYear * kmPerRide;
  const batteryYears = Math.max(
    1,
    Math.min(10, batteryCycles / ridesPerYear)
  );

  const tireLifeKm = Math.round(
    tire.wearKmBase /
      (style.tireWear *
        (input.terrain === "steep" ? 1.2 : input.terrain === "moderate" ? 1.08 : 1) *
        weightFactor(input.riderWeightKg, input.bodyBuild))
  );
  const tireYears = Math.max(0.5, Math.min(8, tireLifeKm / Math.max(annualKm, 1)));

  const recommendations = buildRecommendations(
    input,
    systemWatts,
    limitedBy,
    cRate
  );

  return {
    batteryWh,
    usableWh,
    consumptionWhPerKm,
    rangeKm,
    systemWatts,
    limitedBy,
    pas,
    speeds: {
      flatMaxKmh,
      hillKmh,
      descentSafeKmh,
    },
    longevity: {
      batteryCycles,
      batteryYears,
      tireLifeKm,
      tireYears,
      cRate,
    },
    recommendations,
  };
}

export function parseEbikeRangePerformanceInput(
  values: Record<string, string>
): EbikeRangePerformanceInput | null {
  const motorPreset = values.motorPreset ?? "500";
  const motorWatts =
    motorPreset === "custom"
      ? parsePositive(values.motorWattsCustom ?? "")
      : parsePositive(motorPreset);

  const batteryPreset = values.batteryPreset ?? "48/15";
  let batteryVolts: number | null;
  let batteryAh: number | null;
  if (batteryPreset === "custom") {
    batteryVolts = parsePositive(values.batteryVoltsCustom ?? "");
    batteryAh = parsePositive(values.batteryAhCustom ?? "");
  } else {
    const preset = findOption(EBIKE_BATTERY_PRESETS, batteryPreset);
    batteryVolts = preset?.volts ?? null;
    batteryAh = preset?.ah ?? null;
  }

  const controllerPreset = values.controllerPreset ?? "22";
  const controllerAmps =
    controllerPreset === "custom"
      ? parsePositive(values.controllerAmpsCustom ?? "")
      : parsePositive(controllerPreset);

  const riderWeightKg = parsePositive(values.riderWeightKg ?? "");
  const tire = (values.tire ?? "urban") as EbikeTireType;
  const bodyBuild = (values.bodyBuild ?? "average") as EbikeBodyBuild;
  const terrain = (values.terrain ?? "flat") as EbikeTerrainProfile;
  const ridingStyle = (values.ridingStyle ?? "mixed") as EbikeRidingStyle;

  if (
    motorWatts === null ||
    batteryVolts === null ||
    batteryAh === null ||
    controllerAmps === null ||
    riderWeightKg === null
  ) {
    return null;
  }

  if (!findOption(EBIKE_TIRE_OPTIONS, tire)) return null;
  if (!findOption(EBIKE_BODY_BUILD_OPTIONS, bodyBuild)) return null;
  if (!findOption(EBIKE_TERRAIN_OPTIONS, terrain)) return null;
  if (!findOption(EBIKE_STYLE_OPTIONS, ridingStyle)) return null;

  return {
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

export function calculateEbikeRangePerformance(
  values: Record<string, string>
): EbikeRangePerformanceResult | null {
  const input = parseEbikeRangePerformanceInput(values);
  if (!input) return null;
  return calculateEbikeRangePerformanceFromInput(input);
}

export function formatEbikeRangePerformanceResult(
  values: Record<string, string>
) {
  const result = calculateEbikeRangePerformance(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 1 }),
    unit: "km",
    detail: `${formatNumber(result.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · ${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh usable`,
    snapshotResults: {
      "PAS Eco km": formatNumber(result.pas.ecoKm, { maxDecimals: 0 }),
      "Flat max km/h": formatNumber(result.speeds.flatMaxKmh, {
        maxDecimals: 0,
      }),
      "Battery cycles": formatNumber(result.longevity.batteryCycles, {
        maxDecimals: 0,
      }),
    },
  };
}
