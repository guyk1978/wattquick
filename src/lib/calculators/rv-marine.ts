export interface RvSolarInput {
  panelWatts: number;
  sunHours: number;
  efficiencyPercent: number;
  dailyLoadWh: number;
  systemVoltage: number;
}

export function calculateRvSolar({
  panelWatts,
  sunHours,
  efficiencyPercent,
  dailyLoadWh,
  systemVoltage,
}: RvSolarInput) {
  const dailyYieldWh =
    panelWatts * sunHours * (efficiencyPercent / 100);
  const surplusWh = dailyYieldWh - dailyLoadWh;
  const bankAhNeeded =
    surplusWh < 0 ? Math.abs(surplusWh) / systemVoltage : 0;

  return {
    dailyYieldWh: Math.round(dailyYieldWh),
    surplusWh: Math.round(surplusWh),
    bankAhNeeded: Math.round(bankAhNeeded),
    coversLoad: surplusWh >= 0,
  };
}

export interface MarineBatteryInput {
  continuousAmps: number;
  bankAh: number;
  usablePercent: number;
}

export function calculateMarineRuntime({
  continuousAmps,
  bankAh,
  usablePercent,
}: MarineBatteryInput) {
  const usableAh = bankAh * (usablePercent / 100);
  const hours = continuousAmps > 0 ? usableAh / continuousAmps : 0;
  return {
    runtimeHours: parseFloat(hours.toFixed(2)),
    runtimeMinutes: Math.round(hours * 60),
  };
}

export interface PortableRechargeInput {
  capacityWh: number;
  wallWatts: number;
  carWatts: number;
  solarWatts: number;
  chargeEfficiencyPercent: number;
}

export function calculatePortableRecharge({
  capacityWh,
  wallWatts,
  carWatts,
  solarWatts,
  chargeEfficiencyPercent,
}: PortableRechargeInput) {
  const eff = chargeEfficiencyPercent / 100;
  const hoursWall = wallWatts > 0 ? capacityWh / (wallWatts * eff) : 0;
  const hoursCar = carWatts > 0 ? capacityWh / (carWatts * eff) : 0;
  const hoursSolar = solarWatts > 0 ? capacityWh / (solarWatts * eff) : 0;
  return {
    hoursWall: parseFloat(hoursWall.toFixed(2)),
    hoursCar: parseFloat(hoursCar.toFixed(2)),
    hoursSolar: parseFloat(hoursSolar.toFixed(2)),
  };
}

export interface InverterOverloadInput {
  inverterContinuousW: number;
  inverterSurgeW: number;
  loadContinuousW: number;
  loadSurgeW: number;
}

export function calculateInverterOverload({
  inverterContinuousW,
  inverterSurgeW,
  loadContinuousW,
  loadSurgeW,
}: InverterOverloadInput) {
  const continuousOk = loadContinuousW <= inverterContinuousW;
  const surgeOk = loadSurgeW <= inverterSurgeW;
  const headroomContinuous =
    ((inverterContinuousW - loadContinuousW) / inverterContinuousW) * 100;
  return {
    continuousOk,
    surgeOk,
    headroomContinuous: parseFloat(headroomContinuous.toFixed(0)),
    loadPercentOfContinuous: parseFloat(
      ((loadContinuousW / inverterContinuousW) * 100).toFixed(0)
    ),
  };
}

export interface CampingFridgeInput {
  batteryWh: number;
  ratedDailyWh: number;
  ambientFactor: number;
}

export function calculateCampingFridgeRuntime({
  batteryWh,
  ratedDailyWh,
  ambientFactor,
}: CampingFridgeInput) {
  const adjustedDailyWh = ratedDailyWh * ambientFactor;
  const runtimeHours =
    adjustedDailyWh > 0 ? (batteryWh / adjustedDailyWh) * 24 : 0;
  return {
    runtimeHours: parseFloat(runtimeHours.toFixed(1)),
    adjustedDailyWh: Math.round(adjustedDailyWh),
  };
}
