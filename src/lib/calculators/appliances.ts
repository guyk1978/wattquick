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

export type VampireDeviceType =
  | "tv"
  | "gaming_console"
  | "phone_charger"
  | "converter"
  | "smart_kettle"
  | "cable_box"
  | "dvr"
  | "desktop_pc"
  | "laptop"
  | "printer"
  | "router_modem"
  | "smart_speaker"
  | "microwave"
  | "soundbar"
  | "monitor"
  | "coffee_maker"
  | "dishwasher"
  | "washer"
  | "dryer"
  | "garage_opener"
  | "cordless_phone"
  | "wine_cooler"
  | "custom";

export const VAMPIRE_DEVICE_PRESETS: Record<
  VampireDeviceType,
  { label: string; standbyWatts: number }
> = {
  tv: { label: "Television", standbyWatts: 5 },
  gaming_console: { label: "Gaming console", standbyWatts: 8 },
  phone_charger: { label: "Phone charger", standbyWatts: 1 },
  converter: { label: "AC adapter / converter", standbyWatts: 2 },
  smart_kettle: { label: "Smart kettle", standbyWatts: 2 },
  cable_box: { label: "Cable / set-top box", standbyWatts: 18 },
  dvr: { label: "DVR / media recorder", standbyWatts: 25 },
  desktop_pc: { label: "Desktop computer", standbyWatts: 3 },
  laptop: { label: "Laptop (plugged in)", standbyWatts: 1 },
  printer: { label: "Printer / scanner", standbyWatts: 4 },
  router_modem: { label: "Router / modem", standbyWatts: 8 },
  smart_speaker: { label: "Smart speaker", standbyWatts: 3 },
  microwave: { label: "Microwave (clock/display)", standbyWatts: 3 },
  soundbar: { label: "Soundbar / AV receiver", standbyWatts: 4 },
  monitor: { label: "Computer monitor", standbyWatts: 2 },
  coffee_maker: { label: "Coffee maker", standbyWatts: 2 },
  dishwasher: { label: "Dishwasher", standbyWatts: 1 },
  washer: { label: "Clothes washer", standbyWatts: 1 },
  dryer: { label: "Clothes dryer", standbyWatts: 1 },
  garage_opener: { label: "Garage door opener", standbyWatts: 3 },
  cordless_phone: { label: "Cordless phone base", standbyWatts: 2 },
  wine_cooler: { label: "Wine / beverage cooler", standbyWatts: 4 },
  custom: { label: "Custom device", standbyWatts: 5 },
};

export interface VampirePowerLineInput {
  standbyWatts: number;
  deviceCount: number;
}

export interface VampirePowerCostInput {
  standbyWattsPerDevice: number;
  deviceCount: number;
  ratePerKwh: number;
}

export interface VampirePowerMultiResult {
  totalStandbyWatts: number;
  annualKwh: number;
  annualCost: number;
  monthlyCost: number;
  lineCount: number;
}

/** Sum annual standby cost across multiple device rows. */
export function calculateVampirePowerMulti(
  lines: VampirePowerLineInput[],
  ratePerKwh: number
): VampirePowerMultiResult | null {
  if (lines.length === 0 || ratePerKwh <= 0) return null;

  const totalStandbyWatts = lines.reduce(
    (sum, line) => sum + line.standbyWatts * line.deviceCount,
    0
  );
  if (totalStandbyWatts <= 0) return null;

  const annualKwh = (totalStandbyWatts * 24 * 365) / 1000;
  const annualCost = annualKwh * ratePerKwh;
  const monthlyCost = annualCost / 12;

  return {
    totalStandbyWatts: Math.round(totalStandbyWatts),
    annualKwh: Math.round(annualKwh),
    annualCost: parseFloat(annualCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    lineCount: lines.length,
  };
}

/** Annual phantom / standby load cost for one device profile × quantity. */
export function calculateVampirePowerCost({
  standbyWattsPerDevice,
  deviceCount,
  ratePerKwh,
}: VampirePowerCostInput) {
  return calculateStandbyPowerWaste({
    standbyWattsPerDevice,
    deviceCount,
    ratePerKwh,
  });
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
    annualCost: parseFloat(annualCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
  };
}

/** NEC-style continuous load cap for lighting circuits (3+ hours on). */
export const LIGHTING_CONTINUOUS_LOAD_FACTOR = 0.8;

export type LightingCircuitLoadStatus =
  | "ok"
  | "near-limit"
  | "over-80"
  | "overloaded";

export interface LightingCircuitLoadInput {
  fixtureCount: number;
  wattsPerFixture: number;
  circuitVoltage: number;
  breakerAmps: number;
}

export function calculateLightingCircuitLoad({
  fixtureCount,
  wattsPerFixture,
  circuitVoltage,
  breakerAmps,
}: LightingCircuitLoadInput) {
  const totalWatts = fixtureCount * wattsPerFixture;
  const loadAmps = totalWatts / circuitVoltage;
  const utilizationPercent = (loadAmps / breakerAmps) * 100;
  const continuousMaxAmps = breakerAmps * LIGHTING_CONTINUOUS_LOAD_FACTOR;
  const continuousMaxWatts = continuousMaxAmps * circuitVoltage;
  const headroomAmps = continuousMaxAmps - loadAmps;
  const exceedsContinuous = loadAmps > continuousMaxAmps;
  const exceedsBreaker = loadAmps > breakerAmps;

  let status: LightingCircuitLoadStatus = "ok";
  if (exceedsBreaker) status = "overloaded";
  else if (exceedsContinuous) status = "over-80";
  else if (utilizationPercent >= 65) status = "near-limit";

  let recommendation: string;
  if (status === "overloaded") {
    recommendation =
      "Load exceeds breaker rating—split circuits or reduce fixtures immediately.";
  } else if (status === "over-80") {
    recommendation =
      "Above 80% continuous-load limit—add a circuit or reduce load before nuisance trips.";
  } else if (status === "near-limit") {
    recommendation =
      "Approaching 80% guideline—leave headroom for inrush on some LED drivers.";
  } else {
    recommendation = "Within 80% continuous-load guideline for this breaker.";
  }

  return {
    totalWatts: Math.round(totalWatts),
    loadAmps: parseFloat(loadAmps.toFixed(2)),
    utilizationPercent: parseFloat(utilizationPercent.toFixed(1)),
    continuousMaxAmps: parseFloat(continuousMaxAmps.toFixed(1)),
    continuousMaxWatts: Math.round(continuousMaxWatts),
    headroomAmps: parseFloat(headroomAmps.toFixed(2)),
    exceedsContinuous,
    exceedsBreaker,
    status,
    recommendation,
    gaugeFillPercent: Math.min(100, Math.max(4, utilizationPercent)),
  };
}
