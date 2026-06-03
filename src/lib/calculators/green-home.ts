export interface HeatLossInput {
  wallAreaSqFt: number;
  deltaTempF: number;
  rValue: number;
}

export function calculateHeatLoss({
  wallAreaSqFt,
  deltaTempF,
  rValue,
}: HeatLossInput) {
  const btuPerHour = (wallAreaSqFt * deltaTempF) / rValue;
  const watts = btuPerHour / 3.412;
  return {
    btuPerHour: Math.round(btuPerHour),
    watts: Math.round(watts),
    kw: parseFloat((watts / 1000).toFixed(2)),
  };
}

export interface LedRoiInput {
  bulbCount: number;
  incandescentWatts: number;
  ledWatts: number;
  hoursPerDay: number;
  ratePerKwh: number;
  ledBulbCost: number;
  incandBulbCost: number;
  ledLifeHours: number;
  incandLifeHours: number;
}

export type LegacyBulbType = "incandescent" | "halogen" | "cfl";

export const LEGACY_BULB_PRESETS: Record<
  LegacyBulbType,
  { label: string; defaultWatts: number; suggestedLedWatts: number }
> = {
  incandescent: { label: "Incandescent", defaultWatts: 60, suggestedLedWatts: 9 },
  halogen: { label: "Halogen", defaultWatts: 43, suggestedLedWatts: 7 },
  cfl: { label: "CFL (compact fluorescent)", defaultWatts: 13, suggestedLedWatts: 9 },
};

export type GridCarbonRegion =
  | "global"
  | "us"
  | "eu"
  | "uk"
  | "india"
  | "china"
  | "custom";

/** Grid-average CO₂ intensity presets (kg CO₂ per kWh). */
export const GRID_CO2_REGION_PRESETS: Record<
  GridCarbonRegion,
  { label: string; kgCo2PerKwh: number }
> = {
  global: { label: "Global average", kgCo2PerKwh: 0.5 },
  us: { label: "United States", kgCo2PerKwh: 0.38 },
  eu: { label: "European Union", kgCo2PerKwh: 0.25 },
  uk: { label: "United Kingdom", kgCo2PerKwh: 0.23 },
  india: { label: "India", kgCo2PerKwh: 0.71 },
  china: { label: "China", kgCo2PerKwh: 0.55 },
  custom: { label: "Custom factor", kgCo2PerKwh: 0.5 },
};

export interface LedSavingsRoiInput {
  legacyWatts: number;
  ledWatts: number;
  ledBulbPrice: number;
  hoursPerDay: number;
  ratePerKwh: number;
  /** kg CO₂ emitted per kWh of grid electricity */
  co2KgPerKwh: number;
}

export interface LedSavingsRoiResult {
  wattSavings: number;
  annualKwhLegacy: number;
  annualKwhLed: number;
  annualKwhSaved: number;
  dailyCostLegacy: number;
  dailyCostLed: number;
  dailySavings: number;
  monthlyCostLegacy: number;
  monthlyCostLed: number;
  monthlySavings: number;
  annualCostLegacy: number;
  annualCostLed: number;
  annualSavings: number;
  annualCo2LegacyKg: number;
  annualCo2LedKg: number;
  annualCo2SavedKg: number;
  monthlyCo2SavedKg: number;
  paybackDays: number | null;
  paybackMonths: number | null;
  legacyBarPercent: number;
  ledBarPercent: number;
  legacyCo2BarPercent: number;
  ledCo2BarPercent: number;
}

const DAYS_PER_MONTH = 365 / 12;

/** Operating-cost savings and simple bulb payback (price ÷ daily $ saved). */
export function calculateLedSavingsRoi({
  legacyWatts,
  ledWatts,
  ledBulbPrice,
  hoursPerDay,
  ratePerKwh,
  co2KgPerKwh,
}: LedSavingsRoiInput): LedSavingsRoiResult | null {
  if (
    legacyWatts <= 0 ||
    ledWatts <= 0 ||
    hoursPerDay <= 0 ||
    ratePerKwh <= 0 ||
    ledBulbPrice < 0 ||
    co2KgPerKwh <= 0
  ) {
    return null;
  }

  const dailyKwhLegacy = (legacyWatts * hoursPerDay) / 1000;
  const dailyKwhLed = (ledWatts * hoursPerDay) / 1000;
  const dailyKwhSaved = Math.max(0, dailyKwhLegacy - dailyKwhLed);
  const annualKwhLegacy = dailyKwhLegacy * 365;
  const annualKwhLed = dailyKwhLed * 365;
  const annualKwhSaved = dailyKwhSaved * 365;

  const dailyCostLegacy = dailyKwhLegacy * ratePerKwh;
  const dailyCostLed = dailyKwhLed * ratePerKwh;
  const dailySavings = dailyCostLegacy - dailyCostLed;

  const monthlyCostLegacy = dailyCostLegacy * DAYS_PER_MONTH;
  const monthlyCostLed = dailyCostLed * DAYS_PER_MONTH;
  const monthlySavings = dailySavings * DAYS_PER_MONTH;

  const annualCostLegacy = dailyCostLegacy * 365;
  const annualCostLed = dailyCostLed * 365;
  const annualSavings = dailySavings * 365;

  const annualCo2LegacyKg = annualKwhLegacy * co2KgPerKwh;
  const annualCo2LedKg = annualKwhLed * co2KgPerKwh;
  const annualCo2SavedKg = annualKwhSaved * co2KgPerKwh;
  const monthlyCo2SavedKg = annualCo2SavedKg / 12;

  const maxAnnual = Math.max(annualCostLegacy, annualCostLed, 0.0001);
  const legacyBarPercent = Math.min(
    100,
    Math.max(4, (annualCostLegacy / maxAnnual) * 100)
  );
  const ledBarPercent = Math.min(100, Math.max(4, (annualCostLed / maxAnnual) * 100));

  const maxCo2 = Math.max(annualCo2LegacyKg, annualCo2LedKg, 0.0001);
  const legacyCo2BarPercent = Math.min(
    100,
    Math.max(4, (annualCo2LegacyKg / maxCo2) * 100)
  );
  const ledCo2BarPercent = Math.min(
    100,
    Math.max(4, (annualCo2LedKg / maxCo2) * 100)
  );

  const paybackDays =
    dailySavings > 0 ? ledBulbPrice / dailySavings : null;
  const paybackMonths =
    paybackDays !== null ? paybackDays / DAYS_PER_MONTH : null;

  const roundMoney = (n: number) => parseFloat(n.toFixed(2));
  const roundDays = (n: number) => parseFloat(n.toFixed(1));
  const roundKg = (n: number) => parseFloat(n.toFixed(2));
  const roundKwh = (n: number) => parseFloat(n.toFixed(2));

  return {
    wattSavings: Math.max(0, legacyWatts - ledWatts),
    annualKwhLegacy: roundKwh(annualKwhLegacy),
    annualKwhLed: roundKwh(annualKwhLed),
    annualKwhSaved: roundKwh(annualKwhSaved),
    dailyCostLegacy: roundMoney(dailyCostLegacy),
    dailyCostLed: roundMoney(dailyCostLed),
    dailySavings: roundMoney(Math.max(0, dailySavings)),
    monthlyCostLegacy: roundMoney(monthlyCostLegacy),
    monthlyCostLed: roundMoney(monthlyCostLed),
    monthlySavings: roundMoney(Math.max(0, monthlySavings)),
    annualCostLegacy: roundMoney(annualCostLegacy),
    annualCostLed: roundMoney(annualCostLed),
    annualSavings: roundMoney(Math.max(0, annualSavings)),
    annualCo2LegacyKg: roundKg(annualCo2LegacyKg),
    annualCo2LedKg: roundKg(annualCo2LedKg),
    annualCo2SavedKg: roundKg(annualCo2SavedKg),
    monthlyCo2SavedKg: roundKg(monthlyCo2SavedKg),
    paybackDays: paybackDays !== null ? roundDays(paybackDays) : null,
    paybackMonths: paybackMonths !== null ? parseFloat(paybackMonths.toFixed(1)) : null,
    legacyBarPercent,
    ledBarPercent,
    legacyCo2BarPercent,
    ledCo2BarPercent,
  };
}

export function calculateLedRoi({
  bulbCount,
  incandescentWatts,
  ledWatts,
  hoursPerDay,
  ratePerKwh,
  ledBulbCost,
  incandBulbCost,
  ledLifeHours,
  incandLifeHours,
}: LedRoiInput) {
  const dailyKwhSaved =
    ((incandescentWatts - ledWatts) * hoursPerDay * bulbCount) / 1000;
  const annualEnergySavings = dailyKwhSaved * 365 * ratePerKwh;
  const incandReplacementsPerYear =
    (hoursPerDay * 365) / incandLifeHours;
  const ledReplacementsPerYear = (hoursPerDay * 365) / ledLifeHours;
  const annualBulbSavings =
    incandReplacementsPerYear * incandBulbCost * bulbCount -
    ledReplacementsPerYear * ledBulbCost * bulbCount;
  const totalAnnualSavings = annualEnergySavings + annualBulbSavings;

  return {
    annualEnergySavings: parseFloat(annualEnergySavings.toFixed(0)),
    annualBulbSavings: parseFloat(annualBulbSavings.toFixed(0)),
    totalAnnualSavings: parseFloat(totalAnnualSavings.toFixed(0)),
    dailyKwhSaved: parseFloat(dailyKwhSaved.toFixed(2)),
  };
}

export interface ThermostatSavingsInput {
  monthlyHeatingKwh: number;
  setbackSavingsPercent: number;
  ratePerKwh: number;
}

export function calculateThermostatSavings({
  monthlyHeatingKwh,
  setbackSavingsPercent,
  ratePerKwh,
}: ThermostatSavingsInput) {
  const savedKwh = monthlyHeatingKwh * (setbackSavingsPercent / 100);
  const monthlySavings = savedKwh * ratePerKwh;
  return {
    savedKwh: parseFloat(savedKwh.toFixed(0)),
    monthlySavings: parseFloat(monthlySavings.toFixed(2)),
    annualSavings: parseFloat((monthlySavings * 12).toFixed(0)),
  };
}

export interface WindowHeatGainInput {
  windowAreaSqFt: number;
  shgc: number;
  peakSunHours: number;
  coolingCop: number;
}

export function calculateWindowHeatGain({
  windowAreaSqFt,
  shgc,
  peakSunHours,
  coolingCop,
}: WindowHeatGainInput) {
  const btuPerSqFtDay = 200 * shgc;
  const dailyBtu = windowAreaSqFt * btuPerSqFtDay * (peakSunHours / 6);
  const coolingKwh = dailyBtu / (3412 * coolingCop);
  return {
    dailyBtu: Math.round(dailyBtu),
    coolingKwh: parseFloat(coolingKwh.toFixed(1)),
    peakCoolingKw: parseFloat(((coolingKwh / peakSunHours) * 1.2).toFixed(2)),
  };
}

export interface MicrogridRoiInput {
  initialSetupCost: number;
  monthlySavings: number;
  monthlyMaintenance: number;
  annualInflationPercent: number;
}

export interface MicrogridRoiResult {
  breakEvenYears: number | null;
  roi10Years: number;
  roi20Years: number;
  cumulative10: number;
  cumulative20: number;
  monthlyNet: number;
}

function annualNetForYear(monthlyNet: number, inflation: number, year: number) {
  return monthlyNet * 12 * (1 + inflation) ** (year - 1);
}

function cumulativeNet(
  monthlyNet: number,
  inflation: number,
  years: number
): number {
  let total = 0;
  for (let y = 1; y <= years; y++) {
    total += annualNetForYear(monthlyNet, inflation, y);
  }
  return total;
}

/** Break-even and cumulative ROI with escalating energy savings. */
export function calculateMicrogridRoi({
  initialSetupCost,
  monthlySavings,
  monthlyMaintenance,
  annualInflationPercent,
}: MicrogridRoiInput): MicrogridRoiResult {
  const monthlyNet = monthlySavings - monthlyMaintenance;
  const inflation = annualInflationPercent / 100;

  const empty: MicrogridRoiResult = {
    breakEvenYears: null,
    roi10Years: 0,
    roi20Years: 0,
    cumulative10: 0,
    cumulative20: 0,
    monthlyNet,
  };

  if (monthlyNet <= 0 || initialSetupCost <= 0) {
    return empty;
  }

  const roi = (years: number) => {
    const cumulative = cumulativeNet(monthlyNet, inflation, years);
    return parseFloat(
      (((cumulative - initialSetupCost) / initialSetupCost) * 100).toFixed(0)
    );
  };

  let breakEvenYears: number | null = null;
  let prevCumulative = 0;
  for (let y = 1; y <= 50; y++) {
    const annual = annualNetForYear(monthlyNet, inflation, y);
    const cumulative = prevCumulative + annual;
    if (cumulative >= initialSetupCost) {
      const remaining = initialSetupCost - prevCumulative;
      breakEvenYears = parseFloat(
        (y - 1 + remaining / annual).toFixed(1)
      );
      break;
    }
    prevCumulative = cumulative;
  }

  return {
    breakEvenYears,
    roi10Years: roi(10),
    roi20Years: roi(20),
    cumulative10: Math.round(cumulativeNet(monthlyNet, inflation, 10)),
    cumulative20: Math.round(cumulativeNet(monthlyNet, inflation, 20)),
    monthlyNet,
  };
}

/** Marginal emissions for renewable-charged loss (kg CO₂/kWh) — planning default. */
export const BESS_RENEWABLE_MARGINAL_KG_CO2_PER_KWH = 0;

export interface BessCarbonCostInput {
  capacityKwh: number;
  roundTripEfficiencyPercent: number;
  cyclesPerYear: number;
  gridGco2PerKwh: number;
}

export function calculateBessCarbonCost({
  capacityKwh,
  roundTripEfficiencyPercent,
  cyclesPerYear,
  gridGco2PerKwh,
}: BessCarbonCostInput) {
  const rte = roundTripEfficiencyPercent / 100;
  const lossKwhPerCycle = capacityKwh * (1 / rte - 1);
  const annualLossKwh = lossKwhPerCycle * cyclesPerYear;
  const annualChargeKwh = (capacityKwh / rte) * cyclesPerYear;
  const gridKgCo2PerKwh = gridGco2PerKwh / 1000;
  const lossCarbonGridKg = annualLossKwh * gridKgCo2PerKwh;
  const lossCarbonRenewableKg =
    annualLossKwh * BESS_RENEWABLE_MARGINAL_KG_CO2_PER_KWH;
  const carbonSavedWithRenewablesKg = Math.max(
    0,
    lossCarbonGridKg - lossCarbonRenewableKg
  );
  const renewableSavingsPercent =
    lossCarbonGridKg > 0
      ? (carbonSavedWithRenewablesKg / lossCarbonGridKg) * 100
      : 0;

  return {
    lossKwhPerCycle: parseFloat(lossKwhPerCycle.toFixed(2)),
    annualLossKwh: parseFloat(annualLossKwh.toFixed(0)),
    annualChargeKwh: parseFloat(annualChargeKwh.toFixed(0)),
    lossCarbonGridKg: parseFloat(lossCarbonGridKg.toFixed(1)),
    lossCarbonRenewableKg: parseFloat(lossCarbonRenewableKg.toFixed(1)),
    carbonSavedWithRenewablesKg: parseFloat(
      carbonSavedWithRenewablesKg.toFixed(1)
    ),
    renewableSavingsPercent: parseFloat(renewableSavingsPercent.toFixed(0)),
    greenFillPercent: Math.min(
      100,
      Math.max(8, renewableSavingsPercent)
    ),
  };
}

/** Average plane-of-array irradiance during sun hours (kW/m²). */
export const SOLAR_THERMAL_AVERAGE_IRRADIANCE_KW_M2 = 0.75;

/** Default $/kWh for resistance water-heater comparison. */
export const SOLAR_WATER_HEATER_DEFAULT_RATE_PER_KWH = 0.14;

export interface SolarWaterHeaterEfficiencyInput {
  tankVolumeLiters: number;
  deltaTempC: number;
  sunExposureHours: number;
  collectorAreaSqM: number;
  ratePerKwh?: number;
}

export interface SolarWaterHeaterEfficiencyResult {
  waterEnergyKwh: number;
  incidentSolarKwh: number;
  energyAbsorbedKwh: number;
  thermalEfficiencyPercent: number;
  electricSavings: number;
  solarCoveragePercent: number;
  heatGaugeFillPercent: number;
  exceedsTypicalCollector: boolean;
}

/**
 * Estimates useful water heating (kWh), incident solar on aperture (kWh),
 * thermal efficiency vs. intercepted solar, and electric heating savings.
 */
export function calculateSolarWaterHeaterEfficiency({
  tankVolumeLiters,
  deltaTempC,
  sunExposureHours,
  collectorAreaSqM,
  ratePerKwh = SOLAR_WATER_HEATER_DEFAULT_RATE_PER_KWH,
}: SolarWaterHeaterEfficiencyInput): SolarWaterHeaterEfficiencyResult {
  const waterEnergyKwh =
    (tankVolumeLiters * 4.186 * deltaTempC) / 3600;
  const incidentSolarKwh =
    collectorAreaSqM *
    sunExposureHours *
    SOLAR_THERMAL_AVERAGE_IRRADIANCE_KW_M2;

  const energyAbsorbedKwh = waterEnergyKwh;
  const rawEfficiency =
    incidentSolarKwh > 0
      ? (waterEnergyKwh / incidentSolarKwh) * 100
      : 0;
  const thermalEfficiencyPercent = parseFloat(
    Math.min(100, rawEfficiency).toFixed(1)
  );
  const solarCoveragePercent = parseFloat(
    Math.min(100, rawEfficiency).toFixed(0)
  );
  const electricSavings = parseFloat(
    (waterEnergyKwh * ratePerKwh).toFixed(2)
  );

  const heatGaugeFillPercent = Math.min(
    100,
    Math.max(6, thermalEfficiencyPercent)
  );

  return {
    waterEnergyKwh: parseFloat(waterEnergyKwh.toFixed(2)),
    incidentSolarKwh: parseFloat(incidentSolarKwh.toFixed(2)),
    energyAbsorbedKwh: parseFloat(energyAbsorbedKwh.toFixed(2)),
    thermalEfficiencyPercent,
    electricSavings,
    solarCoveragePercent,
    heatGaugeFillPercent,
    exceedsTypicalCollector: rawEfficiency > 65,
  };
}

/** Sea-level air density (kg/m³). */
export const AIR_DENSITY_KG_M3 = 1.225;

/** Betz limit — max ideal power coefficient for a rotor. */
export const WIND_BETZ_LIMIT = 0.593;

/**
 * Ratio of time-averaged power to power evaluated at mean wind speed
 * (Rayleigh-like site, v³ dependence).
 */
export const WIND_RAYLEIGH_POWER_RATIO = 1.9;

/** Typical cut-in wind speed for small turbines (m/s). */
export const SMALL_WIND_CUT_IN_MS = 2.5;

export interface SmallWindTurbineYieldInput {
  bladeDiameterM: number;
  avgWindSpeedMs: number;
  efficiencyPercent: number;
}

export interface SmallWindTurbineYieldResult {
  sweptAreaSqM: number;
  powerAtMeanWindW: number;
  meanPowerW: number;
  dailyKwh: number;
  annualKwh: number;
  exceedsBetzLimit: boolean;
  windGaugeFillPercent: number;
  rotationDurationSec: number;
  powerClassLabel: string;
}

/**
 * Small wind yield from swept area, mean wind (m/s), and overall efficiency %.
 * Energy uses Rayleigh-style uplift on mean power; not a substitute for site anemometry.
 */
export function calculateSmallWindTurbineYield({
  bladeDiameterM,
  avgWindSpeedMs,
  efficiencyPercent,
}: SmallWindTurbineYieldInput): SmallWindTurbineYieldResult {
  const sweptAreaSqM = Math.PI * (bladeDiameterM / 2) ** 2;
  const eta = Math.min(1, Math.max(0, efficiencyPercent) / 100);
  const exceedsBetzLimit = eta > WIND_BETZ_LIMIT;
  const v = Math.max(0, avgWindSpeedMs);

  const powerAtMeanWindW =
    v < SMALL_WIND_CUT_IN_MS
      ? 0
      : 0.5 * AIR_DENSITY_KG_M3 * sweptAreaSqM * v ** 3 * eta;

  const meanPowerW = powerAtMeanWindW * WIND_RAYLEIGH_POWER_RATIO;
  const dailyKwh = (meanPowerW * 24) / 1000;
  const annualKwh = dailyKwh * 365;

  const windGaugeFillPercent = Math.min(100, Math.max(4, (v / 12) * 100));
  const rotationDurationSec = Math.min(6, Math.max(0.35, 5 / Math.max(v, 1)));

  const powerClassLabel =
    meanPowerW >= 3000
      ? "Strong small-wind site"
      : meanPowerW >= 800
        ? "Moderate yield potential"
        : meanPowerW >= 200
          ? "Marginal — verify anemometer data"
          : "Low wind resource";

  return {
    sweptAreaSqM: parseFloat(sweptAreaSqM.toFixed(2)),
    powerAtMeanWindW: parseFloat(powerAtMeanWindW.toFixed(0)),
    meanPowerW: parseFloat(meanPowerW.toFixed(0)),
    dailyKwh: parseFloat(dailyKwh.toFixed(2)),
    annualKwh: parseFloat(annualKwh.toFixed(0)),
    exceedsBetzLimit,
    windGaugeFillPercent,
    rotationDurationSec: parseFloat(rotationDurationSec.toFixed(2)),
    powerClassLabel,
  };
}
