export interface TruckRangeInput {
  baseRangeMiles: number;
  payloadLbs: number;
  lossPercentPer100Lbs: number;
}

export function calculateTruckRange({
  baseRangeMiles,
  payloadLbs,
  lossPercentPer100Lbs,
}: TruckRangeInput) {
  const lossPercent = (payloadLbs / 100) * lossPercentPer100Lbs;
  const adjustedRange = baseRangeMiles * Math.max(0, 1 - lossPercent / 100);
  return {
    adjustedRange: Math.round(adjustedRange),
    rangeLossMiles: Math.round(baseRangeMiles - adjustedRange),
    lossPercent: parseFloat(Math.min(lossPercent, 99).toFixed(1)),
  };
}

export interface FleetTcoInput {
  vehicleCount: number;
  milesPerVehicleYear: number;
  gasMpg: number;
  gasPricePerGallon: number;
  evKwhPerMile: number;
  electricityRatePerKwh: number;
}

export function calculateFleetTco(input: FleetTcoInput) {
  const totalMiles = input.vehicleCount * input.milesPerVehicleYear;
  const gasAnnual =
    (totalMiles / input.gasMpg) * input.gasPricePerGallon;
  const evAnnual =
    totalMiles * input.evKwhPerMile * input.electricityRatePerKwh;
  const annualSavings = Math.max(0, gasAnnual - evAnnual);

  return {
    gasAnnual: Math.round(gasAnnual),
    evAnnual: Math.round(evAnnual),
    annualSavings: Math.round(annualSavings),
    savingsPerVehicle: Math.round(annualSavings / input.vehicleCount),
  };
}

export interface BusBatteryInput {
  routeMiles: number;
  energyUsedKwh: number;
}

export function calculateBusBatteryKwhPerMile({
  routeMiles,
  energyUsedKwh,
}: BusBatteryInput) {
  const kwhPerMile = energyUsedKwh / routeMiles;
  return {
    kwhPerMile: parseFloat(kwhPerMile.toFixed(2)),
    dailyKwhAt200Mi: parseFloat((kwhPerMile * 200).toFixed(0)),
  };
}

export interface ForkliftRuntimeInput {
  capacityAh: number;
  voltage: number;
  averageLoadAmps: number;
  usablePercent: number;
}

export function calculateForkliftRuntime({
  capacityAh,
  voltage,
  averageLoadAmps,
  usablePercent,
}: ForkliftRuntimeInput) {
  const usableAh = capacityAh * (usablePercent / 100);
  const hours = averageLoadAmps > 0 ? usableAh / averageLoadAmps : 0;
  return {
    runtimeHours: parseFloat(hours.toFixed(2)),
    runtimeMinutes: Math.round(hours * 60),
    usableWh: Math.round(usableAh * voltage),
  };
}

export interface DeliveryVanEfficiencyInput {
  highwayKwhPerMile: number;
  stopsPerMile: number;
  stopPenaltyPercent: number;
}

export function calculateDeliveryVanEfficiency({
  highwayKwhPerMile,
  stopsPerMile,
  stopPenaltyPercent,
}: DeliveryVanEfficiencyInput) {
  const urbanMultiplier =
    1 + stopsPerMile * (stopPenaltyPercent / 100);
  const urbanKwhPerMile = highwayKwhPerMile * urbanMultiplier;
  return {
    urbanKwhPerMile: parseFloat(urbanKwhPerMile.toFixed(2)),
    increasePercent: parseFloat(
      ((urbanKwhPerMile / highwayKwhPerMile - 1) * 100).toFixed(0)
    ),
  };
}
