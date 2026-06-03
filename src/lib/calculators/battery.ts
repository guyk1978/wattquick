import type { BatteryGlow } from "@/lib/battery-dashboard";
import {
  dcVoltageDropPercent,
  recommendDcAwg,
} from "@/lib/calculators/electrical";

export interface SeriesParallelInput {
  seriesCount: number;
  parallelCount: number;
  cellVoltage: number;
  cellCapacityAh: number;
}

export function calculateSeriesParallel({
  seriesCount,
  parallelCount,
  cellVoltage,
  cellCapacityAh,
}: SeriesParallelInput) {
  const totalVoltage = seriesCount * cellVoltage;
  const totalCapacityAh = parallelCount * cellCapacityAh;
  const totalWh = totalVoltage * totalCapacityAh;

  return {
    totalVoltage: parseFloat(totalVoltage.toFixed(2)),
    totalCapacityAh: parseFloat(totalCapacityAh.toFixed(2)),
    totalWh: parseFloat(totalWh.toFixed(0)),
    configuration: `${seriesCount}S${parallelCount}P`,
  };
}

export interface CrateInput {
  capacityAh: number;
  dischargeAmps: number;
}

export function calculateCrate({ capacityAh, dischargeAmps }: CrateInput) {
  const cRate = dischargeAmps / capacityAh;
  const hoursToEmpty = capacityAh / dischargeAmps;
  const minutesToEmpty = hoursToEmpty * 60;

  return {
    cRate: parseFloat(cRate.toFixed(2)),
    hoursToEmpty: parseFloat(hoursToEmpty.toFixed(2)),
    minutesToEmpty: Math.round(minutesToEmpty),
  };
}

export interface InverterLossInput {
  dcInputWatts: number;
  efficiencyPercent: number;
}

export function calculateInverterLoss({
  dcInputWatts,
  efficiencyPercent,
}: InverterLossInput) {
  const acOutputWatts = dcInputWatts * (efficiencyPercent / 100);
  const lossWatts = dcInputWatts - acOutputWatts;
  const lossPercent = 100 - efficiencyPercent;

  return {
    acOutputWatts: parseFloat(acOutputWatts.toFixed(1)),
    lossWatts: parseFloat(lossWatts.toFixed(1)),
    lossPercent: parseFloat(lossPercent.toFixed(1)),
  };
}

export interface HomeBackupSizingInput {
  loadWatts: number;
  backupHours: number;
  systemVoltage: number;
  depthOfDischargePercent: number;
  inverterEfficiencyPercent: number;
}

export function calculateHomeBackupSizing({
  loadWatts,
  backupHours,
  systemVoltage,
  depthOfDischargePercent,
  inverterEfficiencyPercent,
}: HomeBackupSizingInput) {
  const whNeeded = (loadWatts * backupHours) / (inverterEfficiencyPercent / 100);
  const bankWh = whNeeded / (depthOfDischargePercent / 100);
  const bankAh = bankWh / systemVoltage;

  return {
    whNeeded: Math.round(whNeeded),
    bankWh: Math.round(bankWh),
    bankAh: Math.round(bankAh),
  };
}

export interface BatteryVoltageDropInput {
  loadAmps: number;
  oneWayLengthFt: number;
  systemVoltage: number;
}

export function calculateBatteryVoltageDrop({
  loadAmps,
  oneWayLengthFt,
  systemVoltage,
}: BatteryVoltageDropInput) {
  const recommendedAwg = recommendDcAwg(loadAmps);
  const dropPercent =
    dcVoltageDropPercent(loadAmps, oneWayLengthFt, systemVoltage, recommendedAwg) ??
    0;
  const dropVolts = (dropPercent / 100) * systemVoltage;
  const voltageAtLoad = systemVoltage - dropVolts;

  return {
    recommendedAwg,
    dropPercent: parseFloat(dropPercent.toFixed(2)),
    dropVolts: parseFloat(dropVolts.toFixed(2)),
    voltageAtLoad: parseFloat(voltageAtLoad.toFixed(2)),
  };
}

/** Calendar fade (%/yr) at 25 °C and 50 % average SOC — planning midpoint for Li-ion. */
export const CALENDAR_AGING_BASE_PERCENT_PER_YEAR = 2;

export interface BatteryCalendarAgingInput {
  avgStorageTempC: number;
  avgSocPercent: number;
  batteryAgeYears: number;
}

export interface BatteryCalendarAgingResult {
  calendarLossPercent: number;
  remainingSoh: number;
  annualLossPercent: number;
  tempFactor: number;
  socFactor: number;
  glow: BatteryGlow;
  statusLabel: string;
}

/**
 * Estimates capacity fade from calendar (storage) aging vs. temperature, SOC, and time.
 * Cycle aging is not included—use for parked EV, backup banks, or spares.
 */
export function calculateBatteryCalendarAging({
  avgStorageTempC,
  avgSocPercent,
  batteryAgeYears,
}: BatteryCalendarAgingInput): BatteryCalendarAgingResult {
  const soc = Math.min(100, Math.max(0, avgSocPercent));
  const years = Math.max(0, batteryAgeYears);

  const tempFactor =
    avgStorageTempC >= 25
      ? 2 ** ((avgStorageTempC - 25) / 10)
      : 0.65 ** ((25 - avgStorageTempC) / 10);

  const socFactor =
    soc <= 50
      ? 0.55 + (soc / 50) * 0.45
      : 1 + ((soc - 50) / 50) ** 2 * 2.2;

  const annualLossPercent =
    CALENDAR_AGING_BASE_PERCENT_PER_YEAR * tempFactor * socFactor;
  const calendarLossPercent = Math.min(80, annualLossPercent * years);
  const remainingSoh = Math.max(20, 100 - calendarLossPercent);

  const glow: BatteryGlow =
    remainingSoh >= 85 ? "healthy" : remainingSoh >= 70 ? "caution" : "critical";

  const statusLabel =
    remainingSoh >= 90
      ? "Excellent storage profile"
      : remainingSoh >= 80
        ? "Moderate calendar fade"
        : remainingSoh >= 70
          ? "Elevated storage stress"
          : "Severe calendar aging risk";

  return {
    calendarLossPercent: parseFloat(calendarLossPercent.toFixed(1)),
    remainingSoh: parseFloat(remainingSoh.toFixed(1)),
    annualLossPercent: parseFloat(annualLossPercent.toFixed(2)),
    tempFactor: parseFloat(tempFactor.toFixed(2)),
    socFactor: parseFloat(socFactor.toFixed(2)),
    glow,
    statusLabel,
  };
}

export interface BessRoiInput {
  batteryCapacityKwh: number;
  batteryInstallCost: number;
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
  cyclesPerDay: number;
  batteryLifeYears: number;
  depthOfDischargePercent: number;
  roundTripEfficiencyPercent: number;
}

export interface BessRoiResult {
  dailySavings: number;
  annualSavings: number;
  paybackYears: number | null;
  lcosPerKwh: number;
  priceSpreadPerKwh: number;
  shiftedKwhPerCycle: number;
  lifetimeDischargedKwh: number;
  totalCyclesLifetime: number;
  monthlySavings: number;
  isProfitable: boolean;
}

/**
 * BESS TOU arbitrage: charge off-peak, discharge at peak.
 * LCOS = installed cost ÷ lifetime kWh delivered (after DoD & round-trip).
 */
export function calculateBessRoi({
  batteryCapacityKwh,
  batteryInstallCost,
  peakRatePerKwh,
  offPeakRatePerKwh,
  cyclesPerDay,
  batteryLifeYears,
  depthOfDischargePercent,
  roundTripEfficiencyPercent,
}: BessRoiInput): BessRoiResult {
  const dod = Math.min(100, Math.max(0, depthOfDischargePercent)) / 100;
  const eff = Math.min(100, Math.max(0, roundTripEfficiencyPercent)) / 100;
  const spread = peakRatePerKwh - offPeakRatePerKwh;

  const shiftedKwhPerCycle = batteryCapacityKwh * dod * eff;
  const dailySavings = Math.max(0, spread * shiftedKwhPerCycle * cyclesPerDay);
  const annualSavings = dailySavings * 365;
  const monthlySavings = dailySavings * (365 / 12);

  const paybackYears =
    annualSavings > 0 && batteryInstallCost > 0
      ? parseFloat((batteryInstallCost / annualSavings).toFixed(1))
      : null;

  const totalCyclesLifetime = cyclesPerDay * 365 * batteryLifeYears;
  const lifetimeDischargedKwh = shiftedKwhPerCycle * totalCyclesLifetime;
  const lcosPerKwh =
    lifetimeDischargedKwh > 0
      ? parseFloat((batteryInstallCost / lifetimeDischargedKwh).toFixed(3))
      : 0;

  return {
    dailySavings: parseFloat(dailySavings.toFixed(2)),
    annualSavings: parseFloat(annualSavings.toFixed(0)),
    monthlySavings: parseFloat(monthlySavings.toFixed(0)),
    paybackYears,
    lcosPerKwh,
    priceSpreadPerKwh: parseFloat(spread.toFixed(3)),
    shiftedKwhPerCycle: parseFloat(shiftedKwhPerCycle.toFixed(2)),
    lifetimeDischargedKwh: parseFloat(lifetimeDischargedKwh.toFixed(0)),
    totalCyclesLifetime: Math.round(totalCyclesLifetime),
    isProfitable: spread > 0 && dailySavings > 0,
  };
}
