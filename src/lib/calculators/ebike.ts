import { formatCurrency, formatDuration, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";

/** Assist level 1–5 maps to consumption multiplier 1.0 → 2.5 */
export const EBIKE_ASSIST_LEVELS = [
  { value: "1", label: "Level 1 — minimal assist (×1.0)" },
  { value: "2", label: "Level 2 (×1.375)" },
  { value: "3", label: "Level 3 — medium (×1.75)" },
  { value: "4", label: "Level 4 (×2.125)" },
  { value: "5", label: "Level 5 — max assist (×2.5)" },
] as const;

export const EBIKE_WIND_TERRAIN_FACTORS = [
  { value: "0.8", label: "Tailwind / flat (×0.8)" },
  { value: "1.0", label: "Calm / neutral (×1.0)" },
  { value: "1.2", label: "Light headwind / rolling (×1.2)" },
  { value: "1.35", label: "Moderate climb / headwind (×1.35)" },
  { value: "1.5", label: "Steep climb / strong headwind (×1.5)" },
] as const;

const DEFAULT_BASE_WH_PER_KM = 9;
const DEFAULT_PACK_EFFICIENCY = 0.92;
const DEFAULT_CELL_RESISTANCE_OHM = 0.03;
const DEFAULT_CYCLE_LIFE_K = 1750;
const DEFAULT_SOH_TARGET_PERCENT = 80;

function assistMultiplier(level: number): number {
  const clamped = Math.min(5, Math.max(1, level));
  return 1 + (clamped - 1) * 0.375;
}

function weightWhPerKmPenalty(totalMassKg: number): number {
  return Math.max(0, (totalMassKg - 80) / 10) * 0.1;
}

const TERRAIN_PRESETS = {
  flat: { label: "Flat", multiplier: 1 },
  rolling: { label: "Rolling hills", multiplier: 1.25 },
  hilly: { label: "Hilly", multiplier: 1.55 },
} as const;

export type EbikeTerrain = keyof typeof TERRAIN_PRESETS;

export interface EbikeRangeInput {
  batteryWh: number;
  packEfficiency: number;
  baseWhPerKm: number;
  assistLevel: number;
  totalMassKg: number;
  windTerrainFactor: number;
}

export function calculateEbikeRangeFromInput(input: EbikeRangeInput) {
  const assistMult = assistMultiplier(input.assistLevel);
  const weightPenalty = weightWhPerKmPenalty(input.totalMassKg);
  const consumptionWhPerKm =
    input.baseWhPerKm * assistMult * input.windTerrainFactor + weightPenalty;
  const usableWh = input.batteryWh * input.packEfficiency;
  const rangeKm = usableWh / consumptionWhPerKm;

  return {
    rangeKm,
    consumptionWhPerKm,
    usableWh,
    assistMult,
    weightPenalty,
    assistLevel: input.assistLevel,
    windTerrainFactor: input.windTerrainFactor,
  };
}

export function calculateEbikeRange(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const totalMassKg = parsePositive(values.totalMassKg ?? "");
  const assistLevel = parsePositive(values.assistLevel ?? "");
  const windTerrainFactor = parsePositive(values.windTerrainFactor ?? "");
  const baseWhPerKm = parsePositive(values.baseWhPerKm ?? "") ?? DEFAULT_BASE_WH_PER_KM;
  const packEfficiencyPct = parsePositive(values.packEfficiency ?? "");
  if (
    batteryWh === null ||
    totalMassKg === null ||
    assistLevel === null ||
    windTerrainFactor === null
  ) {
    return null;
  }

  const packEfficiency =
    packEfficiencyPct !== null ? packEfficiencyPct / 100 : DEFAULT_PACK_EFFICIENCY;

  return calculateEbikeRangeFromInput({
    batteryWh,
    packEfficiency,
    baseWhPerKm,
    assistLevel,
    totalMassKg,
    windTerrainFactor,
  });
}

export function calculateEbikeChargingCost(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
  if (batteryWh === null || ratePerKwh === null) return null;

  const energyKwh = batteryWh / 1000;
  const fullChargeCost = energyKwh * ratePerKwh;

  return { fullChargeCost, energyKwh };
}

export function calculateEbikeMaxSpeed(values: Record<string, string>) {
  const batteryVoltage = parsePositive(values.batteryVoltage ?? "");
  const motorKv = parsePositive(values.motorKv ?? "");
  const wheelDiameterMm = parsePositive(values.wheelDiameterMm ?? "");
  if (batteryVoltage === null || motorKv === null || wheelDiameterMm === null) return null;

  const rpm = batteryVoltage * motorKv * 0.92;
  const circumferenceM = (Math.PI * wheelDiameterMm) / 1000;
  const speedKmh = (rpm / 60) * circumferenceM * 3.6;

  return { speedKmh, rpm };
}

export function calculateEbikeChargeTime(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const chargerW = parsePositive(values.chargerW ?? "");
  const chargeEfficiency = parsePositive(values.chargeEfficiency ?? "") ?? 0.9;
  if (batteryWh === null || chargerW === null || chargerW <= 0) return null;

  const hours = batteryWh / (chargerW * chargeEfficiency);

  return { hours, chargeEfficiency };
}

export function calculateEbikeBatteryCRate(values: Record<string, string>) {
  const capacityAh = parsePositive(values.capacityAh ?? "");
  const cRating = parsePositive(values.cRating ?? "");
  const motorAmps = parsePositive(values.motorAmps ?? "");
  if (capacityAh === null || cRating === null || motorAmps === null) return null;

  const maxContinuousAmps = capacityAh * cRating;
  const headroomPercent = ((maxContinuousAmps - motorAmps) / maxContinuousAmps) * 100;
  const isWithinRating = motorAmps <= maxContinuousAmps;

  return { maxContinuousAmps, headroomPercent, isWithinRating };
}

export interface EbikeVoltageSagInput {
  nominalVoltage: number;
  cellResistanceOhm: number;
  seriesCells: number;
  parallelGroups: number;
  maxDrawAmps: number;
}

export function calculateEbikeVoltageSagFromInput(input: EbikeVoltageSagInput) {
  const rTotal =
    (input.cellResistanceOhm * input.seriesCells) / Math.max(1, input.parallelGroups);
  const sagVolts = input.maxDrawAmps * rTotal;
  const loadedVoltage = Math.max(0, input.nominalVoltage - sagVolts);
  const sagPercent = (sagVolts / input.nominalVoltage) * 100;

  return {
    sagVolts,
    loadedVoltage,
    sagPercent,
    rTotal,
    cellResistanceOhm: input.cellResistanceOhm,
    seriesCells: input.seriesCells,
    parallelGroups: input.parallelGroups,
    maxDrawAmps: input.maxDrawAmps,
  };
}

export function calculateEbikeVoltageSag(values: Record<string, string>) {
  const nominalVoltage = parsePositive(values.nominalVoltage ?? "");
  const cellResistanceOhm =
    parsePositive(values.cellResistanceOhm ?? "") ?? DEFAULT_CELL_RESISTANCE_OHM;
  const seriesCells = parsePositive(values.seriesCells ?? "");
  const parallelGroups = parsePositive(values.parallelGroups ?? "");
  const maxDrawAmps = parsePositive(values.maxDrawAmps ?? "");
  if (
    nominalVoltage === null ||
    seriesCells === null ||
    parallelGroups === null ||
    maxDrawAmps === null
  ) {
    return null;
  }

  return calculateEbikeVoltageSagFromInput({
    nominalVoltage,
    cellResistanceOhm,
    seriesCells,
    parallelGroups,
    maxDrawAmps,
  });
}

export function calculateEbikeWeightPerformance(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const totalMassKg = parsePositive(values.totalMassKg ?? "");
  const referenceMassKg = parsePositive(values.referenceMassKg ?? "") ?? 85;
  const terrain = (values.terrain ?? "flat") as EbikeTerrain;
  if (batteryWh === null || totalMassKg === null) return null;

  const terrainMultiplier = TERRAIN_PRESETS[terrain]?.multiplier ?? 1;
  const weightRatio = totalMassKg / referenceMassKg;
  const baseWhPerKm = 10 * terrainMultiplier;
  const adjustedWhPerKm = baseWhPerKm * Math.pow(weightRatio, 1.15);
  const rangeKm = batteryWh / adjustedWhPerKm;

  return {
    rangeKm,
    adjustedWhPerKm,
    terrainLabel: TERRAIN_PRESETS[terrain]?.label ?? "Flat",
  };
}

export function calculateEbikeCommuteSavings(values: Record<string, string>) {
  const oneWayKm = parsePositive(values.oneWayKm ?? "");
  const commuteDays = parsePositive(values.commuteDays ?? "");
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
  const carCostPerKm = parsePositive(values.carCostPerKm ?? "");
  const transitCostPerTrip = parsePositive(values.transitCostPerTrip ?? "");
  if (
    oneWayKm === null ||
    commuteDays === null ||
    batteryWh === null ||
    ratePerKwh === null ||
    carCostPerKm === null ||
    transitCostPerTrip === null
  ) {
    return null;
  }

  const annualKm = oneWayKm * 2 * commuteDays;
  const tripsPerYear = commuteDays * 2;
  const whPerKm = 12;
  const ebikeAnnualCost = ((annualKm * whPerKm) / 1000) * ratePerKwh;
  const carAnnualCost = annualKm * carCostPerKm;
  const transitAnnualCost = tripsPerYear * transitCostPerTrip;
  const savingsVsCar = carAnnualCost - ebikeAnnualCost;
  const savingsVsTransit = transitAnnualCost - ebikeAnnualCost;

  return {
    ebikeAnnualCost,
    carAnnualCost,
    transitAnnualCost,
    savingsVsCar,
    savingsVsTransit,
    annualKm,
  };
}

export function calculateEbikeControllerWatts(values: Record<string, string>) {
  const batteryVoltage = parsePositive(values.batteryVoltage ?? "");
  const controllerAmps = parsePositive(values.controllerAmps ?? "");
  const motorEfficiency = parsePositive(values.motorEfficiency ?? "") ?? 0.85;
  if (batteryVoltage === null || controllerAmps === null) return null;

  const inputWatts = batteryVoltage * controllerAmps;
  const shaftWatts = inputWatts * motorEfficiency;

  return { inputWatts, shaftWatts, motorEfficiency };
}

export interface EbikeCycleLifeInput {
  cyclesCompleted: number;
  avgDepthOfDischargePercent: number;
  chemistryK: number;
  manufacturerRatedCycles: number;
  sohTargetPercent: number;
}

export function calculateEbikeBatteryCycleLifeFromInput(input: EbikeCycleLifeInput) {
  const dod = Math.min(0.99, Math.max(0.05, input.avgDepthOfDischargePercent / 100));
  const expectedTotalCycles = input.chemistryK * Math.pow(dod, -1.5);
  const remainingModelCycles = Math.max(0, expectedTotalCycles - input.cyclesCompleted);
  const lifeUsedPercent = (input.cyclesCompleted / expectedTotalCycles) * 100;
  const remainingManufacturerCycles = Math.max(
    0,
    input.manufacturerRatedCycles - input.cyclesCompleted
  );
  const atSohEndOfLife = input.cyclesCompleted >= input.manufacturerRatedCycles;

  return {
    dod,
    expectedTotalCycles,
    remainingModelCycles,
    remainingManufacturerCycles,
    lifeUsedPercent,
    atSohEndOfLife,
    chemistryK: input.chemistryK,
    manufacturerRatedCycles: input.manufacturerRatedCycles,
    sohTargetPercent: input.sohTargetPercent,
  };
}

export function calculateEbikeBatteryCycleLife(values: Record<string, string>) {
  const cyclesCompleted = parseNonNegative(values.cyclesCompleted ?? "");
  const avgDepthOfDischarge = parsePositive(values.avgDepthOfDischarge ?? "");
  const chemistryK = parsePositive(values.chemistryK ?? "") ?? DEFAULT_CYCLE_LIFE_K;
  const manufacturerRatedCycles =
    parsePositive(values.manufacturerRatedCycles ?? "") ?? 700;
  const sohTargetPercent =
    parsePositive(values.sohTargetPercent ?? "") ?? DEFAULT_SOH_TARGET_PERCENT;
  if (cyclesCompleted === null || avgDepthOfDischarge === null) return null;

  return calculateEbikeBatteryCycleLifeFromInput({
    cyclesCompleted,
    avgDepthOfDischargePercent: avgDepthOfDischarge,
    chemistryK,
    manufacturerRatedCycles,
    sohTargetPercent,
  });
}

export { TERRAIN_PRESETS };

export function formatEbikeRangeResult(values: Record<string, string>) {
  const result = calculateEbikeRange(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 1 }),
    unit: "km",
    detail: `${formatNumber(result.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · assist L${result.assistLevel} ×${formatNumber(result.assistMult, { maxDecimals: 2 })}`,
  };
}

export function formatEbikeChargingCostResult(values: Record<string, string>) {
  const result = calculateEbikeChargingCost(values);
  if (!result) return { value: null, unit: undefined, detail: null };
  return {
    value: formatCurrency(result.fullChargeCost),
    detail: `${formatNumber(result.energyKwh, { maxDecimals: 2 })} kWh per full charge`,
  };
}

export function formatEbikeMaxSpeedResult(values: Record<string, string>) {
  const result = calculateEbikeMaxSpeed(values);
  if (!result) return { value: null, unit: "km/h", detail: null };
  return {
    value: formatNumber(result.speedKmh, { maxDecimals: 1 }),
    unit: "km/h",
    detail: `~${formatNumber(result.rpm, { maxDecimals: 0 })} RPM at loaded voltage`,
  };
}

export function formatEbikeChargeTimeResult(values: Record<string, string>) {
  const result = calculateEbikeChargeTime(values);
  if (!result) return { value: null, unit: undefined, detail: null };
  const duration = formatDuration(result.hours);
  return {
    value: duration.display,
    unit: duration.unit,
    detail: `${duration.detail} · ${formatNumber(result.chargeEfficiency * 100, { maxDecimals: 0 })}% charge efficiency`,
  };
}

export function formatEbikeBatteryCRateResult(values: Record<string, string>) {
  const result = calculateEbikeBatteryCRate(values);
  if (!result) return { value: null, unit: "A", detail: null };
  return {
    value: formatNumber(result.maxContinuousAmps, { maxDecimals: 1 }),
    unit: "A",
    detail: result.isWithinRating
      ? `Within rating · ${formatNumber(result.headroomPercent, { maxDecimals: 0 })}% headroom`
      : "Exceeds continuous C-rating — risk of heat buildup",
  };
}

export function formatEbikeVoltageSagResult(values: Record<string, string>) {
  const result = calculateEbikeVoltageSag(values);
  if (!result) return { value: null, unit: "V", detail: null };
  return {
    value: formatNumber(result.sagVolts, { maxDecimals: 2 }),
    unit: "V",
    detail: `Under load ${formatNumber(result.loadedVoltage, { maxDecimals: 1 })} V · R_pack ${formatNumber(result.rTotal * 1000, { maxDecimals: 1 })} mΩ`,
  };
}

export function formatEbikeWeightPerformanceResult(values: Record<string, string>) {
  const result = calculateEbikeWeightPerformance(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 1 }),
    unit: "km",
    detail: `${formatNumber(result.adjustedWhPerKm, { maxDecimals: 1 })} Wh/km · ${result.terrainLabel}`,
  };
}

export function formatEbikeCommuteSavingsResult(values: Record<string, string>) {
  const result = calculateEbikeCommuteSavings(values);
  if (!result) return { value: null, unit: undefined, detail: null };
  return {
    value: formatCurrency(result.savingsVsCar),
    detail: `vs car · ${formatCurrency(result.savingsVsTransit)} vs transit · e-bike ${formatCurrency(result.ebikeAnnualCost)}/yr`,
  };
}

export function formatEbikeControllerWattsResult(values: Record<string, string>) {
  const result = calculateEbikeControllerWatts(values);
  if (!result) return { value: null, unit: "W", detail: null };
  return {
    value: formatNumber(result.inputWatts, { maxDecimals: 0 }),
    unit: "W",
    detail: `${formatNumber(result.shaftWatts, { maxDecimals: 0 })} W at shaft · ${formatNumber(result.motorEfficiency * 100, { maxDecimals: 0 })}% efficiency`,
  };
}

export function formatEbikeBatteryCycleLifeResult(values: Record<string, string>) {
  const result = calculateEbikeBatteryCycleLife(values);
  if (!result) return { value: null, unit: "cycles", detail: null };
  return {
    value: formatNumber(result.remainingModelCycles, { maxDecimals: 0 }),
    unit: "cycles",
    detail: result.atSohEndOfLife
      ? `Past ${result.sohTargetPercent}% SOH manufacturer rating`
      : `${formatNumber(result.remainingManufacturerCycles, { maxDecimals: 0 })} cycles to ${result.sohTargetPercent}% SOH spec · ${formatNumber(result.lifeUsedPercent, { maxDecimals: 0 })}% of k×DOD⁻¹·⁵ model used`,
  };
}
