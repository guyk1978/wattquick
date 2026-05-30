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
