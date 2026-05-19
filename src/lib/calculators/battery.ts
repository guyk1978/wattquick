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
