import { formatCurrency, formatDuration, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";

const ASSIST_PRESETS = {
  eco: { label: "Eco (25%)", factor: 0.25 },
  tour: { label: "Tour (50%)", factor: 0.5 },
  sport: { label: "Sport (75%)", factor: 0.75 },
  turbo: { label: "Turbo (100%)", factor: 1 },
} as const;

const TERRAIN_PRESETS = {
  flat: { label: "Flat", multiplier: 1 },
  rolling: { label: "Rolling hills", multiplier: 1.25 },
  hilly: { label: "Hilly", multiplier: 1.55 },
} as const;

export type EbikeAssistLevel = keyof typeof ASSIST_PRESETS;
export type EbikeTerrain = keyof typeof TERRAIN_PRESETS;

export function calculateEbikeRange(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const avgSpeedKmh = parsePositive(values.avgSpeedKmh ?? "");
  const assist = (values.assistLevel ?? "tour") as EbikeAssistLevel;
  if (batteryWh === null || avgSpeedKmh === null) return null;

  const assistFactor = ASSIST_PRESETS[assist]?.factor ?? 0.5;
  const baseWhPerKm = 12 - assistFactor * 4;
  const speedFactor = 1 + Math.max(0, avgSpeedKmh - 20) * 0.02;
  const consumptionWhPerKm = baseWhPerKm * speedFactor;
  const rangeKm = batteryWh / consumptionWhPerKm;

  return {
    rangeKm,
    consumptionWhPerKm,
    assistLabel: ASSIST_PRESETS[assist]?.label ?? "Tour",
  };
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

export function calculateEbikeVoltageSag(values: Record<string, string>) {
  const nominalVoltage = parsePositive(values.nominalVoltage ?? "");
  const internalResistanceMohm = parsePositive(values.internalResistanceMohm ?? "");
  const loadAmps = parsePositive(values.loadAmps ?? "");
  if (nominalVoltage === null || internalResistanceMohm === null || loadAmps === null) return null;

  const sagVolts = loadAmps * (internalResistanceMohm / 1000);
  const loadedVoltage = Math.max(0, nominalVoltage - sagVolts);
  const sagPercent = (sagVolts / nominalVoltage) * 100;

  return { sagVolts, loadedVoltage, sagPercent };
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

export function calculateEbikeBatteryCycleLife(values: Record<string, string>) {
  const cyclesCompleted = parseNonNegative(values.cyclesCompleted ?? "");
  const avgDepthOfDischarge = parsePositive(values.avgDepthOfDischarge ?? "");
  const ratedCycles = parsePositive(values.ratedCycles ?? "") ?? 800;
  if (cyclesCompleted === null || avgDepthOfDischarge === null) return null;

  const dodFactor = Math.max(0.35, avgDepthOfDischarge / 80);
  const adjustedRatedCycles = ratedCycles / dodFactor;
  const remainingCycles = Math.max(0, adjustedRatedCycles - cyclesCompleted);
  const lifeUsedPercent = (cyclesCompleted / adjustedRatedCycles) * 100;

  return { remainingCycles, lifeUsedPercent, adjustedRatedCycles };
}

export { ASSIST_PRESETS, TERRAIN_PRESETS };

export function formatEbikeRangeResult(values: Record<string, string>) {
  const result = calculateEbikeRange(values);
  if (!result) return { value: null, unit: "km", detail: null };
  return {
    value: formatNumber(result.rangeKm, { maxDecimals: 1 }),
    unit: "km",
    detail: `${formatNumber(result.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · ${result.assistLabel}`,
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
    detail: `Loaded ${formatNumber(result.loadedVoltage, { maxDecimals: 1 })} V · ${formatNumber(result.sagPercent, { maxDecimals: 1 })}% sag`,
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
    value: formatNumber(result.remainingCycles, { maxDecimals: 0 }),
    unit: "cycles",
    detail: `${formatNumber(result.lifeUsedPercent, { maxDecimals: 0 })}% of adjusted life used · rated ${formatNumber(result.adjustedRatedCycles, { maxDecimals: 0 })} cycles`,
  };
}
