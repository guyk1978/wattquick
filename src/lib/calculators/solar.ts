export interface RoofSpaceInput {
  usableRoofAreaSqFt: number;
  panelAreaSqFt: number;
  panelWatts: number;
  roofUsablePercent: number;
}

export function calculateRoofSpace({
  usableRoofAreaSqFt,
  panelAreaSqFt,
  panelWatts,
  roofUsablePercent,
}: RoofSpaceInput) {
  const effectiveArea = usableRoofAreaSqFt * (roofUsablePercent / 100);
  const maxPanels = Math.floor(effectiveArea / panelAreaSqFt);
  const systemKw = (maxPanels * panelWatts) / 1000;
  const areaUsedSqFt = maxPanels * panelAreaSqFt;

  return {
    maxPanels,
    systemKw: parseFloat(systemKw.toFixed(2)),
    areaUsedSqFt: Math.round(areaUsedSqFt),
    effectiveAreaSqFt: Math.round(effectiveArea),
  };
}

export interface PaybackRoiInput {
  systemCost: number;
  annualProductionKwh: number;
  electricityRatePerKwh: number;
  incentivePercent: number;
}

export function calculatePaybackRoi({
  systemCost,
  annualProductionKwh,
  electricityRatePerKwh,
  incentivePercent,
}: PaybackRoiInput) {
  const netCost = systemCost * (1 - Math.min(incentivePercent, 100) / 100);
  const annualSavings = annualProductionKwh * electricityRatePerKwh;
  const paybackYears =
    annualSavings > 0 ? netCost / annualSavings : Number.POSITIVE_INFINITY;
  const lifetimeYears = 25;
  const lifetimeSavings = annualSavings * lifetimeYears - netCost;
  const roiPercent =
    netCost > 0 ? (lifetimeSavings / netCost) * 100 : 0;

  return {
    netCost: Math.round(netCost),
    annualSavings: Math.round(annualSavings),
    paybackYears: parseFloat(
      (Number.isFinite(paybackYears) ? paybackYears : 0).toFixed(1)
    ),
    lifetimeSavings: Math.round(lifetimeSavings),
    roiPercent: parseFloat(roiPercent.toFixed(0)),
  };
}

export type SeasonMode = "year-round" | "summer" | "winter";

export interface AngleOptimizerInput {
  latitude: number;
  season: SeasonMode;
}

export function calculateOptimalAngles({
  latitude,
  season,
}: AngleOptimizerInput) {
  const absLat = Math.abs(latitude);
  const yearRoundTilt = absLat;
  const summerTilt = Math.max(0, absLat - 15);
  const winterTilt = Math.min(90, absLat + 15);
  const hemisphere = latitude >= 0 ? "Northern" : "Southern";
  const azimuth = latitude >= 0 ? 180 : 0;

  let recommendedTilt = yearRoundTilt;
  if (season === "summer") recommendedTilt = summerTilt;
  if (season === "winter") recommendedTilt = winterTilt;

  return {
    recommendedTilt: parseFloat(recommendedTilt.toFixed(1)),
    yearRoundTilt: parseFloat(yearRoundTilt.toFixed(1)),
    summerTilt: parseFloat(summerTilt.toFixed(1)),
    winterTilt: parseFloat(winterTilt.toFixed(1)),
    azimuth,
    hemisphere,
  };
}

export interface NetMeteringInput {
  monthlyProductionKwh: number;
  monthlyConsumptionKwh: number;
  retailRatePerKwh: number;
  exportRatePerKwh: number;
}

export function calculateNetMetering({
  monthlyProductionKwh,
  monthlyConsumptionKwh,
  retailRatePerKwh,
  exportRatePerKwh,
}: NetMeteringInput) {
  const selfConsumedKwh = Math.min(
    monthlyProductionKwh,
    monthlyConsumptionKwh
  );
  const exportedKwh = Math.max(
    0,
    monthlyProductionKwh - monthlyConsumptionKwh
  );
  const importedKwh = Math.max(
    0,
    monthlyConsumptionKwh - monthlyProductionKwh
  );

  const billWithoutSolar = monthlyConsumptionKwh * retailRatePerKwh;
  const billWithSolar =
    importedKwh * retailRatePerKwh - exportedKwh * exportRatePerKwh;
  const monthlySavings = billWithoutSolar - billWithSolar;

  return {
    selfConsumedKwh: parseFloat(selfConsumedKwh.toFixed(1)),
    exportedKwh: parseFloat(exportedKwh.toFixed(1)),
    importedKwh: parseFloat(importedKwh.toFixed(1)),
    billWithoutSolar: parseFloat(billWithoutSolar.toFixed(2)),
    billWithSolar: parseFloat(billWithSolar.toFixed(2)),
    monthlySavings: parseFloat(Math.max(0, monthlySavings).toFixed(2)),
  };
}

export interface PanelDegradationInput {
  ratedAnnualKwh: number;
  systemAgeYears: number;
  annualDegradationPercent: number;
}

export function calculatePanelDegradation({
  ratedAnnualKwh,
  systemAgeYears,
  annualDegradationPercent,
}: PanelDegradationInput) {
  const retentionFactor = Math.pow(
    1 - annualDegradationPercent / 100,
    systemAgeYears
  );
  const currentAnnualKwh = ratedAnnualKwh * retentionFactor;
  const capacityRemainingPercent = retentionFactor * 100;
  const totalLossKwh = ratedAnnualKwh - currentAnnualKwh;

  return {
    currentAnnualKwh: Math.round(currentAnnualKwh),
    capacityRemainingPercent: parseFloat(capacityRemainingPercent.toFixed(1)),
    totalLossKwh: Math.round(totalLossKwh),
  };
}

/** Typical electrical kWh delivered per liter of diesel/gas at moderate genset load. */
export const GENERATOR_KWH_PER_LITER = 2.8;

/** Share of load still met by fuel after solar+battery hybrid sizing (backup gen). */
export const HYBRID_BACKUP_FUEL_FRACTION = 0.12;

export interface GeneratorVsSolarHybridInput {
  dailyKwh: number;
  fuelCostPerLiter: number;
  generatorLitersPerHour: number;
  hybridSetupCost: number;
  generatorMaintenanceAnnual: number;
  hybridMaintenanceAnnual: number;
}

export function calculateGeneratorVsSolarHybrid({
  dailyKwh,
  fuelCostPerLiter,
  generatorLitersPerHour,
  hybridSetupCost,
  generatorMaintenanceAnnual,
  hybridMaintenanceAnnual,
}: GeneratorVsSolarHybridInput) {
  const outputKw = generatorLitersPerHour * GENERATOR_KWH_PER_LITER;
  const runtimeHoursPerDay =
    outputKw > 0 ? dailyKwh / outputKw : 0;
  const dailyFuelLiters = generatorLitersPerHour * runtimeHoursPerDay;
  const dailyFuelCost = dailyFuelLiters * fuelCostPerLiter;
  const annualGeneratorFuel = dailyFuelCost * 365;
  const generatorAnnualOpex = annualGeneratorFuel + generatorMaintenanceAnnual;

  const hybridAnnualFuel =
    annualGeneratorFuel * HYBRID_BACKUP_FUEL_FRACTION;
  const hybridAnnualOpex = hybridAnnualFuel + hybridMaintenanceAnnual;
  const annualSavings = generatorAnnualOpex - hybridAnnualOpex;

  const cumulativeGenerator = (years: number) =>
    generatorAnnualOpex * years;
  const cumulativeHybrid = (years: number) =>
    hybridSetupCost + hybridAnnualOpex * years;

  const generator5Year = cumulativeGenerator(5);
  const generator10Year = cumulativeGenerator(10);
  const hybrid5Year = cumulativeHybrid(5);
  const hybrid10Year = cumulativeHybrid(10);

  const paybackYears =
    annualSavings > 0 ? hybridSetupCost / annualSavings : null;

  return {
    dailyFuelLiters: parseFloat(dailyFuelLiters.toFixed(1)),
    runtimeHoursPerDay: parseFloat(runtimeHoursPerDay.toFixed(1)),
    generatorAnnualOpex: Math.round(generatorAnnualOpex),
    hybridAnnualOpex: Math.round(hybridAnnualOpex),
    annualSavings: Math.round(annualSavings),
    generator5Year: Math.round(generator5Year),
    generator10Year: Math.round(generator10Year),
    hybrid5Year: Math.round(hybrid5Year),
    hybrid10Year: Math.round(hybrid10Year),
    savings5Year: Math.round(generator5Year - hybrid5Year),
    savings10Year: Math.round(generator10Year - hybrid10Year),
    paybackYears:
      paybackYears !== null
        ? parseFloat(Math.min(paybackYears, 99).toFixed(1))
        : null,
  };
}

/** Default module rating for panel-count estimates (W). */
export const WATER_PUMP_DEFAULT_PANEL_WATTS = 400;

/** Chain efficiency: wiring, MPPT/inverter, temperature, dust (decimal). */
export const WATER_PUMP_SYSTEM_EFFICIENCY = 0.8;

/** Extra energy per meter of static lift beyond shallow wells (~0.6%/m). */
export const WATER_PUMP_HEAD_FACTOR_PER_METER = 0.006;

export type WaterPumpMpptRecommendation =
  | "strongly-recommended"
  | "recommended"
  | "optional";

export interface WaterPumpSolarSizingInput {
  pumpWatts: number;
  dailyHours: number;
  headMeters: number;
  peakSunHours: number;
  panelWatts?: number;
  systemEfficiency?: number;
}

export function calculateWaterPumpSolarSizing({
  pumpWatts,
  dailyHours,
  headMeters,
  peakSunHours,
  panelWatts = WATER_PUMP_DEFAULT_PANEL_WATTS,
  systemEfficiency = WATER_PUMP_SYSTEM_EFFICIENCY,
}: WaterPumpSolarSizingInput) {
  const headMultiplier = 1 + headMeters * WATER_PUMP_HEAD_FACTOR_PER_METER;
  const dailyWh = pumpWatts * dailyHours * headMultiplier;
  const dailyKwh = dailyWh / 1000;
  const kWp =
    peakSunHours > 0 && systemEfficiency > 0
      ? dailyKwh / (peakSunHours * systemEfficiency)
      : 0;
  const panelCount =
    panelWatts > 0 ? Math.max(1, Math.ceil((kWp * 1000) / panelWatts)) : 0;

  let mppt: WaterPumpMpptRecommendation = "optional";
  if (kWp >= 0.5 || headMeters >= 25 || pumpWatts >= 300) {
    mppt = "strongly-recommended";
  } else if (kWp >= 0.15 || pumpWatts >= 100 || headMeters >= 12) {
    mppt = "recommended";
  }

  const mpptLabel =
    mppt === "strongly-recommended"
      ? "MPPT charge controller strongly recommended"
      : mppt === "recommended"
        ? "MPPT charge controller recommended"
        : "MPPT optional — small 12 V direct systems may use PWM";

  return {
    headMultiplier: parseFloat(headMultiplier.toFixed(3)),
    dailyWh: Math.round(dailyWh),
    dailyKwh: parseFloat(dailyKwh.toFixed(2)),
    kWp: parseFloat(kWp.toFixed(2)),
    panelCount,
    panelWatts,
    mppt,
    mpptLabel,
    gaugeFillPercent: Math.min(100, Math.max(8, kWp * 12)),
  };
}
