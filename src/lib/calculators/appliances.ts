export interface CryptoMiningPowerInput {
  rigWatts: number;
  hoursPerDay: number;
  days: number;
  ratePerKwh: number;
}

export function calculateCryptoMiningPower({
  rigWatts,
  hoursPerDay,
  days,
  ratePerKwh,
}: CryptoMiningPowerInput) {
  const kwh = (rigWatts * hoursPerDay * days) / 1000;
  const cost = kwh * ratePerKwh;
  const dailyKwh = (rigWatts * hoursPerDay) / 1000;

  return {
    totalKwh: parseFloat(kwh.toFixed(1)),
    totalCost: parseFloat(cost.toFixed(2)),
    dailyKwh: parseFloat(dailyKwh.toFixed(2)),
    monthlyKwh: parseFloat(((rigWatts * hoursPerDay * 30) / 1000).toFixed(0)),
  };
}

export interface StandbyPowerInput {
  standbyWattsPerDevice: number;
  deviceCount: number;
  ratePerKwh: number;
}

export function calculateStandbyPowerWaste({
  standbyWattsPerDevice,
  deviceCount,
  ratePerKwh,
}: StandbyPowerInput) {
  const totalStandbyWatts = standbyWattsPerDevice * deviceCount;
  const annualKwh = (totalStandbyWatts * 24 * 365) / 1000;
  const annualCost = annualKwh * ratePerKwh;
  const monthlyCost = annualCost / 12;

  return {
    totalStandbyWatts: Math.round(totalStandbyWatts),
    annualKwh: Math.round(annualKwh),
    annualCost: parseFloat(annualCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
  };
}

export interface GeneratorFuelInput {
  loadWatts: number;
  fuelConsumptionGalPerHour: number;
  tankGallons: number;
}

export function calculateGeneratorFuelConsumption({
  loadWatts,
  fuelConsumptionGalPerHour,
  tankGallons,
}: GeneratorFuelInput) {
  const loadKw = loadWatts / 1000;
  const adjustedConsumption = fuelConsumptionGalPerHour * Math.max(loadKw, 0.25);
  const runtimeHours =
    tankGallons > 0 && adjustedConsumption > 0
      ? tankGallons / adjustedConsumption
      : 0;
  const fuelPerDay = adjustedConsumption * 24;

  return {
    loadKw: parseFloat(loadKw.toFixed(2)),
    consumptionGalPerHour: parseFloat(adjustedConsumption.toFixed(2)),
    runtimeHours: parseFloat(runtimeHours.toFixed(1)),
    fuelPerDay: parseFloat(fuelPerDay.toFixed(1)),
  };
}

export interface HeatPumpComparisonInput {
  heatingLoadKw: number;
  heatPumpCop: number;
  hoursPerDay: number;
  days: number;
  ratePerKwh: number;
}

export function calculateHeatPumpVsResistance({
  heatingLoadKw,
  heatPumpCop,
  hoursPerDay,
  days,
  ratePerKwh,
}: HeatPumpComparisonInput) {
  const resistanceKwh = heatingLoadKw * hoursPerDay * days;
  const heatPumpKwh = resistanceKwh / heatPumpCop;
  const resistanceCost = resistanceKwh * ratePerKwh;
  const heatPumpCost = heatPumpKwh * ratePerKwh;
  const savings = resistanceCost - heatPumpCost;
  const savingsPercent =
    resistanceCost > 0 ? (savings / resistanceCost) * 100 : 0;

  return {
    resistanceKwh: parseFloat(resistanceKwh.toFixed(1)),
    heatPumpKwh: parseFloat(heatPumpKwh.toFixed(1)),
    resistanceCost: parseFloat(resistanceCost.toFixed(2)),
    heatPumpCost: parseFloat(heatPumpCost.toFixed(2)),
    savings: parseFloat(Math.max(0, savings).toFixed(2)),
    savingsPercent: parseFloat(savingsPercent.toFixed(0)),
  };
}

export interface WholeHouseBudgetInput {
  hvacDailyKwh: number;
  waterHeaterDailyKwh: number;
  kitchenDailyKwh: number;
  laundryDailyKwh: number;
  otherDailyKwh: number;
  ratePerKwh: number;
}

export function calculateWholeHouseEnergyBudget({
  hvacDailyKwh,
  waterHeaterDailyKwh,
  kitchenDailyKwh,
  laundryDailyKwh,
  otherDailyKwh,
  ratePerKwh,
}: WholeHouseBudgetInput) {
  const dailyKwh =
    hvacDailyKwh +
    waterHeaterDailyKwh +
    kitchenDailyKwh +
    laundryDailyKwh +
    otherDailyKwh;
  const monthlyKwh = dailyKwh * 30;
  const annualKwh = dailyKwh * 365;
  const monthlyCost = monthlyKwh * ratePerKwh;
  const annualCost = annualKwh * ratePerKwh;

  return {
    dailyKwh: parseFloat(dailyKwh.toFixed(1)),
    monthlyKwh: Math.round(monthlyKwh),
    annualKwh: Math.round(annualKwh),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    annualCost: parseFloat(annualCost.toFixed(2)),
  };
}
