export interface TouShiftingInput {
  shiftableKwh: number;
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
}

export type RatePlanWinner = "flat" | "tou";

export interface ElectricityRatePlanInput {
  monthlyKwh: number;
  peakPercent: number;
  shoulderPercent: number;
  flatRatePerKwh: number;
  peakRatePerKwh: number;
  shoulderRatePerKwh: number;
  offPeakRatePerKwh: number;
}

export interface ElectricityRatePlanResult {
  flatMonthlyCost: number;
  touMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  betterPlan: RatePlanWinner;
  betterPlanLabel: string;
  peakKwh: number;
  shoulderKwh: number;
  offPeakKwh: number;
  offPeakPercent: number;
  blendedTouRate: number;
  flatRatePerKwh: number;
  monthlyKwh: number;
  peakPercent: number;
  shoulderPercent: number;
}

export function calculateElectricityRatePlan({
  monthlyKwh,
  peakPercent,
  shoulderPercent,
  flatRatePerKwh,
  peakRatePerKwh,
  shoulderRatePerKwh,
  offPeakRatePerKwh,
}: ElectricityRatePlanInput): ElectricityRatePlanResult | null {
  const peakPct = Math.min(100, Math.max(0, peakPercent));
  const shoulderPct = Math.min(100 - peakPct, Math.max(0, shoulderPercent));
  const offPeakPct = 100 - peakPct - shoulderPct;

  if (monthlyKwh <= 0 || offPeakPct < 0) {
    return null;
  }

  const peakKwh = monthlyKwh * (peakPct / 100);
  const shoulderKwh = monthlyKwh * (shoulderPct / 100);
  const offPeakKwh = monthlyKwh * (offPeakPct / 100);

  const flatMonthlyCost = monthlyKwh * flatRatePerKwh;
  const touMonthlyCost =
    peakKwh * peakRatePerKwh +
    shoulderKwh * shoulderRatePerKwh +
    offPeakKwh * offPeakRatePerKwh;

  const touCheaper = touMonthlyCost < flatMonthlyCost - 0.005;
  const betterPlan: RatePlanWinner = touCheaper ? "tou" : "flat";
  const monthlySavings = Math.abs(flatMonthlyCost - touMonthlyCost);

  return {
    flatMonthlyCost: parseFloat(flatMonthlyCost.toFixed(2)),
    touMonthlyCost: parseFloat(touMonthlyCost.toFixed(2)),
    monthlySavings: parseFloat(monthlySavings.toFixed(2)),
    annualSavings: parseFloat((monthlySavings * 12).toFixed(0)),
    betterPlan,
    betterPlanLabel: touCheaper ? "Time-of-use (TOU)" : "Flat rate",
    peakKwh: parseFloat(peakKwh.toFixed(1)),
    shoulderKwh: parseFloat(shoulderKwh.toFixed(1)),
    offPeakKwh: parseFloat(offPeakKwh.toFixed(1)),
    offPeakPercent: parseFloat(offPeakPct.toFixed(1)),
    blendedTouRate: parseFloat((touMonthlyCost / monthlyKwh).toFixed(3)),
    flatRatePerKwh,
    monthlyKwh,
    peakPercent: peakPct,
    shoulderPercent: shoulderPct,
  };
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

export interface PeakShavingPotentialInput {
  peakKwh: number;
  offPeakKwh: number;
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
  shiftablePercent: number;
}

export interface PeakShavingPotentialResult {
  shiftableKwh: number;
  beforeCost: number;
  afterCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPerKwh: number;
  billReductionPercent: number;
  beforeBarPercent: number;
  afterBarPercent: number;
}

/**
 * Models TOU bill before/after moving a share of peak kWh into off-peak windows.
 */
export function calculatePeakShavingPotential({
  peakKwh,
  offPeakKwh,
  peakRatePerKwh,
  offPeakRatePerKwh,
  shiftablePercent,
}: PeakShavingPotentialInput): PeakShavingPotentialResult {
  const shiftPct = Math.min(100, Math.max(0, shiftablePercent)) / 100;
  const shiftableKwh = peakKwh * shiftPct;
  const beforeCost = peakKwh * peakRatePerKwh + offPeakKwh * offPeakRatePerKwh;
  const afterPeakKwh = peakKwh - shiftableKwh;
  const afterOffPeakKwh = offPeakKwh + shiftableKwh;
  const afterCost =
    afterPeakKwh * peakRatePerKwh + afterOffPeakKwh * offPeakRatePerKwh;
  const monthlySavings = Math.max(0, beforeCost - afterCost);
  const savingsPerKwh = Math.max(0, peakRatePerKwh - offPeakRatePerKwh);
  const maxCost = Math.max(beforeCost, afterCost, 1);
  const billReductionPercent =
    beforeCost > 0 ? (monthlySavings / beforeCost) * 100 : 0;

  return {
    shiftableKwh: parseFloat(shiftableKwh.toFixed(1)),
    beforeCost: parseFloat(beforeCost.toFixed(2)),
    afterCost: parseFloat(afterCost.toFixed(2)),
    monthlySavings: parseFloat(monthlySavings.toFixed(2)),
    annualSavings: parseFloat((monthlySavings * 12).toFixed(0)),
    savingsPerKwh: parseFloat(savingsPerKwh.toFixed(3)),
    billReductionPercent: parseFloat(billReductionPercent.toFixed(1)),
    beforeBarPercent: parseFloat(((beforeCost / maxCost) * 100).toFixed(1)),
    afterBarPercent: parseFloat(((afterCost / maxCost) * 100).toFixed(1)),
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

export type GridFrequencyRateType = "kw-month" | "kwh";

/** Typical share of committed hours with measurable energy exchange (FCR/FRR). */
export const GRID_FREQUENCY_ACTIVATION_DUTY = 0.12;

export const GRID_FREQUENCY_DAYS_PER_MONTH = 30;

export interface GridFrequencyRewardInput {
  availableKw: number;
  participationHoursPerDay: number;
  rewardRate: number;
  rateType: GridFrequencyRateType;
  availabilityPercent: number;
}

export interface GridFrequencyRewardResult {
  effectiveKw: number;
  hoursFactor: number;
  monthlyRevenue: number;
  annualRevenue: number;
  rateType: GridFrequencyRateType;
  monthlyKwh: number | null;
}

export function calculateGridFrequencyReward({
  availableKw,
  participationHoursPerDay,
  rewardRate,
  rateType,
  availabilityPercent,
}: GridFrequencyRewardInput): GridFrequencyRewardResult {
  const hoursFactor = Math.min(1, participationHoursPerDay / 24);
  const availability = Math.min(100, Math.max(0, availabilityPercent)) / 100;
  const effectiveKw = availableKw * availability * hoursFactor;

  let monthlyRevenue: number;
  let monthlyKwh: number | null = null;

  if (rateType === "kw-month") {
    monthlyRevenue = effectiveKw * rewardRate;
  } else {
    monthlyKwh =
      effectiveKw *
      participationHoursPerDay *
      GRID_FREQUENCY_DAYS_PER_MONTH *
      GRID_FREQUENCY_ACTIVATION_DUTY;
    monthlyRevenue = monthlyKwh * rewardRate;
  }

  return {
    effectiveKw: parseFloat(effectiveKw.toFixed(2)),
    hoursFactor: parseFloat(hoursFactor.toFixed(3)),
    monthlyRevenue: parseFloat(monthlyRevenue.toFixed(2)),
    annualRevenue: parseFloat((monthlyRevenue * 12).toFixed(0)),
    rateType,
    monthlyKwh:
      monthlyKwh !== null ? parseFloat(monthlyKwh.toFixed(0)) : null,
  };
}

export interface GridFrequencyScenarioRow {
  availabilityPercent: number;
  monthlyRevenue: number;
  annualRevenue: number;
  isUserScenario: boolean;
}

/** Availability scenarios for side-by-side comparison (includes user value when unique). */
export function buildGridFrequencyAvailabilityScenarios(
  input: GridFrequencyRewardInput,
  userAvailabilityPercent: number
): GridFrequencyScenarioRow[] {
  const base = [60, 75, 90, 95, 100];
  const availabilities = base.includes(userAvailabilityPercent)
    ? base
    : [...base, userAvailabilityPercent].sort((a, b) => a - b);

  return availabilities.map((availabilityPercent) => {
    const result = calculateGridFrequencyReward({
      ...input,
      availabilityPercent,
    });
    return {
      availabilityPercent,
      monthlyRevenue: result.monthlyRevenue,
      annualRevenue: result.annualRevenue,
      isUserScenario: availabilityPercent === userAvailabilityPercent,
    };
  });
}
