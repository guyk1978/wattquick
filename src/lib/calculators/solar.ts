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

/** Planning yield for kWh/kWp/year (site-specific; 1,200–1,600 common). */
export const DEFAULT_KWH_PER_KWP_YEAR = 1400;

export const SOLAR_DEGRADATION_ROI_YEARS = 20;

export interface SolarDegradation20YearRoiInput {
  systemKwp: number;
  annualDegradationPercent: number;
  installCost: number;
  electricityRatePerKwh: number;
  energyInflationPercent: number;
  kwhPerKwpYear?: number;
}

export interface SolarDegradationYearPoint {
  year: number;
  annualKwh: number;
  ratePerKwh: number;
  annualSavings: number;
  cumulativeSavings: number;
  cumulativeKwh: number;
}

export interface SolarDegradation20YearRoiResult {
  installCost: number;
  year1Kwh: number;
  total20YearKwh: number;
  year20AnnualKwh: number;
  total20YearSavings: number;
  breakEvenYears: number | null;
  capacityYear20Percent: number;
  yearly: SolarDegradationYearPoint[];
  warrantyComparePercent: number;
}

export function calculateSolarDegradation20YearRoi({
  systemKwp,
  annualDegradationPercent,
  installCost,
  electricityRatePerKwh,
  energyInflationPercent,
  kwhPerKwpYear = DEFAULT_KWH_PER_KWP_YEAR,
}: SolarDegradation20YearRoiInput): SolarDegradation20YearRoiResult {
  const year1Kwh = systemKwp * kwhPerKwpYear;
  const degFactor = 1 - annualDegradationPercent / 100;
  const inflationFactor = 1 + energyInflationPercent / 100;

  const yearly: SolarDegradationYearPoint[] = [];
  let cumulativeSavings = 0;
  let cumulativeKwh = 0;
  let breakEvenYears: number | null = null;
  let prevCumulativeSavings = 0;

  for (let year = 1; year <= SOLAR_DEGRADATION_ROI_YEARS; year++) {
    const annualKwh = year1Kwh * Math.pow(degFactor, year - 1);
    const ratePerKwh =
      electricityRatePerKwh * Math.pow(inflationFactor, year - 1);
    const annualSavings = annualKwh * ratePerKwh;
    cumulativeSavings += annualSavings;
    cumulativeKwh += annualKwh;

    if (
      breakEvenYears === null &&
      cumulativeSavings >= installCost &&
      installCost > 0
    ) {
      const yearDelta = cumulativeSavings - prevCumulativeSavings;
      const fraction =
        yearDelta > 0 ? (installCost - prevCumulativeSavings) / yearDelta : 1;
      breakEvenYears = parseFloat((year - 1 + fraction).toFixed(1));
    }

    prevCumulativeSavings = cumulativeSavings;

    yearly.push({
      year,
      annualKwh: parseFloat(annualKwh.toFixed(0)),
      ratePerKwh: parseFloat(ratePerKwh.toFixed(4)),
      annualSavings: parseFloat(annualSavings.toFixed(0)),
      cumulativeSavings: parseFloat(cumulativeSavings.toFixed(0)),
      cumulativeKwh: parseFloat(cumulativeKwh.toFixed(0)),
    });
  }

  const capacityYear20Percent = parseFloat(
    (Math.pow(degFactor, SOLAR_DEGRADATION_ROI_YEARS - 1) * 100).toFixed(1)
  );

  return {
    installCost,
    year1Kwh: Math.round(year1Kwh),
    total20YearKwh: Math.round(cumulativeKwh),
    year20AnnualKwh: yearly[yearly.length - 1]?.annualKwh ?? 0,
    total20YearSavings: parseFloat(cumulativeSavings.toFixed(0)),
    breakEvenYears,
    capacityYear20Percent,
    yearly,
    warrantyComparePercent: parseFloat(
      (Math.pow(degFactor, 24) * 100).toFixed(1)
    ),
  };
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

/** Typical electrical output while genset is running (kW) — planning when only hours are known. */
export const GENERATOR_OUTPUT_KW_AT_LOAD = 3.5;

/** Chain efficiency from array DC to usable AC/hybrid bus (decimal). */
export const HYBRID_SOLAR_SYSTEM_EFFICIENCY = 0.75;

/** Max battery energy credited per day toward offsetting generator run (DoD planning). */
export const HYBRID_BATTERY_DAILY_USABLE_FRACTION = 0.85;

/** Planning hours before major overhaul / replacement on maintained off-grid sets. */
export const GENERATOR_RATED_LIFE_HOURS = 5000;

export interface GeneratorRuntimeSavingsInput {
  dailyGeneratorHours: number;
  solarSystemKw: number;
  batteryCapacityKwh: number;
  peakSunHours: number;
  maintenanceCostPerHour: number;
}

export function calculateGeneratorRuntimeSavings({
  dailyGeneratorHours,
  solarSystemKw,
  batteryCapacityKwh,
  peakSunHours,
  maintenanceCostPerHour,
}: GeneratorRuntimeSavingsInput) {
  const dailyKwhFromGenerator = dailyGeneratorHours * GENERATOR_OUTPUT_KW_AT_LOAD;
  const solarDailyKwh =
    solarSystemKw * peakSunHours * HYBRID_SOLAR_SYSTEM_EFFICIENCY;
  const batteryDailyKwh = batteryCapacityKwh * HYBRID_BATTERY_DAILY_USABLE_FRACTION;
  const hybridOffsetKwh = solarDailyKwh + batteryDailyKwh;

  const offsetFraction =
    dailyKwhFromGenerator > 0
      ? Math.min(1, hybridOffsetKwh / dailyKwhFromGenerator)
      : 0;

  const dailyHoursSaved = parseFloat(
    (dailyGeneratorHours * offsetFraction).toFixed(2)
  );
  const dailyHoursAfter = parseFloat(
    (dailyGeneratorHours - dailyHoursSaved).toFixed(2)
  );

  const dailyMaintenanceSavings = dailyHoursSaved * maintenanceCostPerHour;
  const monthlyMaintenanceSavings = dailyMaintenanceSavings * (365 / 12);
  const annualMaintenanceSavings = dailyMaintenanceSavings * 365;

  const annualHoursBefore = dailyGeneratorHours * 365;
  const annualHoursAfter = dailyHoursAfter * 365;
  const lifeYearsBefore =
    annualHoursBefore > 0 ? GENERATOR_RATED_LIFE_HOURS / annualHoursBefore : 0;
  const lifeYearsAfter =
    annualHoursAfter > 0 ? GENERATOR_RATED_LIFE_HOURS / annualHoursAfter : 99;
  const generatorLifeExtensionYears = parseFloat(
    Math.max(0, lifeYearsAfter - lifeYearsBefore).toFixed(1)
  );

  return {
    dailyHoursSaved,
    dailyHoursAfter,
    monthlyMaintenanceSavings: parseFloat(monthlyMaintenanceSavings.toFixed(0)),
    annualMaintenanceSavings: parseFloat(annualMaintenanceSavings.toFixed(0)),
    generatorLifeExtensionYears,
    offsetFraction: parseFloat((offsetFraction * 100).toFixed(0)),
    hybridOffsetKwh: parseFloat(hybridOffsetKwh.toFixed(1)),
    dailyKwhFromGenerator: parseFloat(dailyKwhFromGenerator.toFixed(1)),
    solarDailyKwh: parseFloat(solarDailyKwh.toFixed(1)),
    batteryDailyKwh: parseFloat(batteryDailyKwh.toFixed(1)),
    lifeYearsBefore: parseFloat(lifeYearsBefore.toFixed(1)),
    lifeYearsAfter: parseFloat(Math.min(lifeYearsAfter, 99).toFixed(1)),
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

export type SolarInverterTopology = "string" | "optimizer";

export const SOLAR_SHADING_BYPASS_THRESHOLD_PERCENT = 10;
/** Typical 60-cell module: three bypass-diode substrings (~⅓ each). */
export const SOLAR_SHADING_BYPASS_SUBSTRING_FRACTION = 1 / 3;
export const SOLAR_SHADING_DEFAULT_OPTIMIZER_COST_PER_PANEL = 50;
export const SOLAR_SHADING_DEFAULT_KWH_PER_KWP = 1400;

export type SolarShadingRecommendation = "add_optimizers" | "keep_as_is";

export interface SolarShadingAnalysisInput {
  panelCount: number;
  panelWatts: number;
  shadedPanelPercent: number;
  shadeCoveragePercent: number;
  inverterType: SolarInverterTopology;
  annualProductionKwh: number;
  ratePerKwh: number;
  optimizerCostPerPanel?: number;
}

export interface SolarShadingAnalysisResult {
  panelCount: number;
  systemKw: number;
  shadedPanelCount: number;
  productionLossPercent: number;
  annualProductionLossKwh: number;
  annualFinancialLoss: number;
  mismatchLossPercent: number;
  bypassLossPercent: number;
  directShadingLossPercent: number;
  recommendation: SolarShadingRecommendation;
  recommendationLabel: string;
  optimizerPaybackYears: number | null;
  optimizerTotalCost: number | null;
  inverterType: SolarInverterTopology;
}

function roundPct(value: number): number {
  return parseFloat((value * 100).toFixed(1));
}

export function calculateSolarShadingAnalysis({
  panelCount,
  panelWatts,
  shadedPanelPercent,
  shadeCoveragePercent,
  inverterType,
  annualProductionKwh,
  ratePerKwh,
  optimizerCostPerPanel = SOLAR_SHADING_DEFAULT_OPTIMIZER_COST_PER_PANEL,
}: SolarShadingAnalysisInput): SolarShadingAnalysisResult | null {
  if (
    panelCount <= 0 ||
    panelWatts <= 0 ||
    shadedPanelPercent < 0 ||
    shadedPanelPercent > 100 ||
    shadeCoveragePercent < 0 ||
    shadeCoveragePercent > 100 ||
    annualProductionKwh <= 0 ||
    ratePerKwh <= 0
  ) {
    return null;
  }

  const shadedFraction = shadedPanelPercent / 100;
  const shadeSeverity = shadeCoveragePercent / 100;
  const shadedPanelCount = Math.ceil(panelCount * shadedFraction);
  const systemKw = parseFloat(
    ((panelCount * panelWatts) / 1000).toFixed(2)
  );

  let productionLossFraction = 0;
  let directShadingLossPercent = 0;
  let bypassLossPercent = 0;
  let mismatchLossPercent = 0;

  if (shadedFraction <= 0 || shadeSeverity <= 0) {
    productionLossFraction = 0;
  } else if (inverterType === "optimizer") {
    directShadingLossPercent = roundPct(shadedFraction * shadeSeverity * 0.92);
    productionLossFraction = directShadingLossPercent / 100;
  } else {
    directShadingLossPercent = roundPct(shadedFraction * shadeSeverity * 0.65);

    if (shadeCoveragePercent >= SOLAR_SHADING_BYPASS_THRESHOLD_PERCENT) {
      bypassLossPercent = roundPct(
        shadedFraction *
          SOLAR_SHADING_BYPASS_SUBSTRING_FRACTION *
          Math.min(1, shadeSeverity * 2.5)
      );
    }

    mismatchLossPercent = roundPct(
      shadedFraction * shadeSeverity * (1.2 + shadedFraction * 1.5)
    );

    productionLossFraction = Math.min(
      0.95,
      (directShadingLossPercent + bypassLossPercent + mismatchLossPercent) / 100
    );
  }

  const annualProductionLossKwh = Math.round(
    annualProductionKwh * productionLossFraction
  );
  const annualFinancialLoss = parseFloat(
    (annualProductionLossKwh * ratePerKwh).toFixed(2)
  );

  const productionLossPercent = roundPct(productionLossFraction);

  let recommendation: SolarShadingRecommendation = "keep_as_is";
  let recommendationLabel = "Keep as is — shading impact is minor";
  let optimizerPaybackYears: number | null = null;
  let optimizerTotalCost: number | null = null;

  if (
    inverterType === "string" &&
    (productionLossPercent >= 5 || shadedPanelCount >= 1)
  ) {
    if (productionLossPercent >= 8 || mismatchLossPercent >= 5) {
      recommendation = "add_optimizers";
      recommendationLabel = "Add optimizers — string mismatch and bypass losses are significant";
      optimizerTotalCost = panelCount * optimizerCostPerPanel;
      if (annualFinancialLoss > 0) {
        optimizerPaybackYears = parseFloat(
          (optimizerTotalCost / annualFinancialLoss).toFixed(1)
        );
      }
    }
  } else if (inverterType === "optimizer") {
    recommendationLabel = "Keep as is — module-level electronics limit mismatch drag";
  }

  return {
    panelCount,
    systemKw,
    shadedPanelCount,
    productionLossPercent,
    annualProductionLossKwh,
    annualFinancialLoss,
    mismatchLossPercent,
    bypassLossPercent,
    directShadingLossPercent,
    recommendation,
    recommendationLabel,
    optimizerPaybackYears,
    optimizerTotalCost,
    inverterType,
  };
}
