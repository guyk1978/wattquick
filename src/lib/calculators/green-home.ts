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
