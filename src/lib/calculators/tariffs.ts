export interface TouShiftingInput {
  shiftableKwh: number;
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
}

export function calculateTouShiftingSavings({
  shiftableKwh,
  peakRatePerKwh,
  offPeakRatePerKwh,
}: TouShiftingInput) {
  const savingsPerKwh = Math.max(0, peakRatePerKwh - offPeakRatePerKwh);
  const monthlySavings = shiftableKwh * savingsPerKwh;
  return {
    monthlySavings: parseFloat(monthlySavings.toFixed(2)),
    annualSavings: parseFloat((monthlySavings * 12).toFixed(0)),
    savingsPerKwh: parseFloat(savingsPerKwh.toFixed(3)),
  };
}

export interface DemandChargeInput {
  peakKw: number;
  demandChargePerKw: number;
}

export function calculateDemandCharge({
  peakKw,
  demandChargePerKw,
}: DemandChargeInput) {
  const monthlyCharge = peakKw * demandChargePerKw;
  return {
    monthlyCharge: parseFloat(monthlyCharge.toFixed(2)),
    annualCharge: parseFloat((monthlyCharge * 12).toFixed(0)),
  };
}

export interface V2gReturnInput {
  kwhExportedPerSession: number;
  buybackRatePerKwh: number;
  sessionsPerMonth: number;
}

export function calculateV2gReturn({
  kwhExportedPerSession,
  buybackRatePerKwh,
  sessionsPerMonth,
}: V2gReturnInput) {
  const monthlyRevenue =
    kwhExportedPerSession * buybackRatePerKwh * sessionsPerMonth;
  return {
    monthlyRevenue: parseFloat(monthlyRevenue.toFixed(2)),
    annualRevenue: parseFloat((monthlyRevenue * 12).toFixed(0)),
  };
}

export interface BatteryArbitrageInput {
  batteryKwh: number;
  roundTripEfficiencyPercent: number;
  nightRatePerKwh: number;
  dayRatePerKwh: number;
  cyclesPerDay: number;
}

export function calculateBatteryArbitrage({
  batteryKwh,
  roundTripEfficiencyPercent,
  nightRatePerKwh,
  dayRatePerKwh,
  cyclesPerDay,
}: BatteryArbitrageInput) {
  const eff = roundTripEfficiencyPercent / 100;
  const spread = dayRatePerKwh - nightRatePerKwh;
  const dailyProfit =
    batteryKwh * eff * Math.max(0, spread) * cyclesPerDay;
  return {
    dailyProfit: parseFloat(dailyProfit.toFixed(2)),
    monthlyProfit: parseFloat((dailyProfit * 30).toFixed(0)),
    annualProfit: parseFloat((dailyProfit * 365).toFixed(0)),
  };
}

export interface CarbonOffsetInput {
  cleanKwh: number;
  gridKgCo2PerKwh: number;
}

export function calculateCarbonOffset({
  cleanKwh,
  gridKgCo2PerKwh,
}: CarbonOffsetInput) {
  const kgCo2Avoided = cleanKwh * gridKgCo2PerKwh;
  const lbsCo2 = kgCo2Avoided * 2.205;
  return {
    kgCo2Avoided: parseFloat(kgCo2Avoided.toFixed(1)),
    lbsCo2: parseFloat(lbsCo2.toFixed(0)),
    milesEquivalentCar: Math.round(kgCo2Avoided / 0.404),
  };
}
