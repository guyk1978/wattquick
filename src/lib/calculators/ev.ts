export interface FastChargeInput {
  batteryCapacityKwh: number;
  targetChargePercentage: number;
  chargerPowerKw: number;
}

export function calculateFastChargeTime({
  batteryCapacityKwh,
  targetChargePercentage,
  chargerPowerKw,
}: FastChargeInput) {
  const startPercentage = 10;
  if (targetChargePercentage <= startPercentage) {
    return { hours: 0, minutes: 0, formatted: "0m" };
  }

  let totalMinutes = 0;
  const percentTo80 = Math.min(targetChargePercentage, 80) - startPercentage;

  if (percentTo80 > 0) {
    const kwhNeeded = batteryCapacityKwh * (percentTo80 / 100);
    const effectivePower = chargerPowerKw * 0.92;
    totalMinutes += (kwhNeeded / effectivePower) * 60;
  }

  const percentAbove80 = Math.max(0, targetChargePercentage - 80);
  if (percentAbove80 > 0) {
    const kwhNeeded = batteryCapacityKwh * (percentAbove80 / 100);
    const droppedPower = Math.min(chargerPowerKw, 22) * 0.85;
    totalMinutes += (kwhNeeded / droppedPower) * 60;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return {
    hours,
    minutes,
    formatted: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
  };
}

export interface WinterRangeInput {
  ratedRange: number;
  tempCategory: "mild" | "cold" | "freezing";
  heatingUsage: "off" | "eco" | "high";
}

export function calculateWinterRange({
  ratedRange,
  tempCategory,
  heatingUsage,
}: WinterRangeInput) {
  let lossPercentage = 0;
  if (tempCategory === "mild") lossPercentage += 5;
  else if (tempCategory === "cold") lossPercentage += 15;
  else if (tempCategory === "freezing") lossPercentage += 25;

  if (heatingUsage === "eco") lossPercentage += 5;
  else if (heatingUsage === "high") lossPercentage += 12;

  const lostRange = Math.round(ratedRange * (lossPercentage / 100));
  const realWinterRange = Math.max(0, ratedRange - lostRange);
  return { realWinterRange, lostRange, lossPercentage };
}

export interface CostComparisonInput {
  monthlyMileage: number;
  gasPricePerUnit: number;
  gasConsumption: number;
  electricityRatePerKwh: number;
  evEfficiencyKwhPerUnit: number;
}

export function calculateEvVsGasSavings(input: CostComparisonInput) {
  const gasMonthlyCost =
    (input.monthlyMileage / input.gasConsumption) * input.gasPricePerUnit;
  const evMonthlyCost =
    input.monthlyMileage *
    input.evEfficiencyKwhPerUnit *
    input.electricityRatePerKwh;
  const monthlySavings = Math.max(0, gasMonthlyCost - evMonthlyCost);
  const yearlySavings = monthlySavings * 12;

  return {
    gasMonthlyCost: Math.round(gasMonthlyCost),
    evMonthlyCost: Math.round(evMonthlyCost),
    monthlySavings: Math.round(monthlySavings),
    yearlySavings: Math.round(yearlySavings),
    costPerMileGas: (gasMonthlyCost / input.monthlyMileage).toFixed(2),
    costPerMileEv: (evMonthlyCost / input.monthlyMileage).toFixed(2),
  };
}

export interface BatteryHealthInput {
  vehicleAgeYears: number;
  totalMileage: number;
  fastChargingFrequency: "never" | "rarely" | "often";
}

export function estimateBatteryHealth({
  vehicleAgeYears,
  totalMileage,
  fastChargingFrequency,
}: BatteryHealthInput) {
  let degradation = 0;
  if (vehicleAgeYears > 0) {
    degradation += 2.5;
    degradation += (vehicleAgeYears - 0.5) * 1.2;
  }
  degradation += (totalMileage / 30000) * 1.0;

  if (fastChargingFrequency === "rarely") degradation += 0.5;
  else if (fastChargingFrequency === "often") degradation += 2.0;

  const estimatedSoh = Math.max(50, Math.min(100, 100 - degradation));
  return {
    stateOfHealthPercentage: parseFloat(estimatedSoh.toFixed(1)),
    status:
      estimatedSoh > 85
        ? "Excellent"
        : estimatedSoh > 75
          ? "Good"
          : "Degraded",
  };
}

export interface PublicChargingInput {
  kwhDelivered: number;
  pricePerKwh: number;
  sessionFee: number;
  idleMinutes: number;
  idleFeePerMinute: number;
}

export function calculatePublicChargingCost({
  kwhDelivered,
  pricePerKwh,
  sessionFee,
  idleMinutes,
  idleFeePerMinute,
}: PublicChargingInput) {
  const energyCost = kwhDelivered * pricePerKwh;
  const totalIdleCost = idleMinutes * idleFeePerMinute;
  const totalCost = energyCost + sessionFee + totalIdleCost;
  const effectivePricePerKwh = kwhDelivered > 0 ? totalCost / kwhDelivered : 0;

  return {
    energyCost: parseFloat(energyCost.toFixed(2)),
    totalIdleCost: parseFloat(totalIdleCost.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    effectivePricePerKwh: parseFloat(effectivePricePerKwh.toFixed(2)),
  };
}
