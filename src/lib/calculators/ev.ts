export interface FastChargeInput {
  batteryCapacityKwh: number;
  targetChargePercentage: number;
  chargerPowerKw: number;
}

export function fastChargeTotalMinutes({
  batteryCapacityKwh,
  targetChargePercentage,
  chargerPowerKw,
}: FastChargeInput): number {
  const { hours, minutes } = calculateFastChargeTime({
    batteryCapacityKwh,
    targetChargePercentage,
    chargerPowerKw,
  });
  return hours * 60 + minutes;
}

export function formatMinutesAsChargeTime(totalMinutes: number): string {
  const rounded = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(rounded / 60);
  const minutes = rounded % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export const EV_CHARGING_BATTERY_PRESETS = {
  compact: { label: "Compact EV (~50 kWh)", capacityKwh: 50 },
  midsize: { label: "Mid-size EV (~75 kWh)", capacityKwh: 75 },
  large: { label: "Large EV / SUV (~100 kWh)", capacityKwh: 100 },
  general: { label: "General average (~65 kWh)", capacityKwh: 65 },
  custom: { label: "Custom pack size", capacityKwh: 0 },
} as const;

export type EvChargingBatteryPreset = keyof typeof EV_CHARGING_BATTERY_PRESETS;

export const EV_CHARGING_TEMP_SCENARIOS = {
  extreme_cold: { label: "Extreme cold (−15 °C)", tempC: -15 },
  cold: { label: "Cold winter (0 °C)", tempC: 0 },
  average: { label: "Average / mild (20 °C)", tempC: 20 },
  warm: { label: "Warm summer (32 °C)", tempC: 32 },
  extreme_hot: { label: "Extreme heat (38 °C)", tempC: 38 },
} as const;

export type EvChargingTempScenario = keyof typeof EV_CHARGING_TEMP_SCENARIOS;

const IDEAL_CHARGE_TEMP_C = 20;
const OPTIMAL_TEMP_LOW_C = 15;
const OPTIMAL_TEMP_HIGH_C = 30;

export function getEvChargingThermalFactors(externalTempC: number) {
  if (externalTempC >= OPTIMAL_TEMP_LOW_C && externalTempC <= OPTIMAL_TEMP_HIGH_C) {
    return {
      powerFactor: 1,
      preconditionMinutes: 0,
      bmsNote: "Pack in optimal thermal window — minimal BMS intervention",
    };
  }

  if (externalTempC < OPTIMAL_TEMP_LOW_C) {
    const severity = Math.min(1, (OPTIMAL_TEMP_LOW_C - externalTempC) / 35);
    return {
      powerFactor: 1 - severity * 0.48,
      preconditionMinutes: Math.round(severity * 18),
      bmsNote:
        severity > 0.55
          ? "Heavy cell heating and DC throttling"
          : "BMS heating limits effective charge rate",
    };
  }

  const severity = Math.min(1, (externalTempC - OPTIMAL_TEMP_HIGH_C) / 15);
  return {
    powerFactor: 1 - severity * 0.38,
    preconditionMinutes: Math.round(severity * 10),
    bmsNote:
      severity > 0.55
        ? "Aggressive pack cooling and charge taper"
        : "BMS cooling moderates DC power",
  };
}

export interface EvChargingTemperatureImpactInput {
  batteryCapacityKwh: number;
  chargerPowerKw: number;
  externalTempC: number;
}

export function calculateEvChargingTemperatureImpact({
  batteryCapacityKwh,
  chargerPowerKw,
  externalTempC,
}: EvChargingTemperatureImpactInput) {
  const targetChargePercentage = 80;
  const ambient = getEvChargingThermalFactors(externalTempC);
  const mode = getEvThermalMode(externalTempC);

  const baseMinutes = fastChargeTotalMinutes({
    batteryCapacityKwh,
    targetChargePercentage,
    chargerPowerKw,
  });

  const effectiveChargerKw = Math.max(chargerPowerKw * ambient.powerFactor, 1);
  const sessionChargeMinutes = fastChargeTotalMinutes({
    batteryCapacityKwh,
    targetChargePercentage,
    chargerPowerKw: effectiveChargerKw,
  });

  const addedDelayMinutes = Math.max(
    0,
    Math.round(sessionChargeMinutes - baseMinutes + ambient.preconditionMinutes)
  );
  const totalMinutes = Math.round(baseMinutes + addedDelayMinutes);

  return {
    baseMinutes: Math.round(baseMinutes),
    addedDelayMinutes,
    totalMinutes,
    baseFormatted: formatMinutesAsChargeTime(baseMinutes),
    addedDelayFormatted: formatMinutesAsChargeTime(addedDelayMinutes),
    totalFormatted: formatMinutesAsChargeTime(totalMinutes),
    powerFactor: parseFloat(ambient.powerFactor.toFixed(2)),
    preconditionMinutes: ambient.preconditionMinutes,
    effectiveChargerKw: parseFloat(effectiveChargerKw.toFixed(1)),
    mode,
    bmsNote: ambient.bmsNote,
    externalTempC,
    idealTempC: IDEAL_CHARGE_TEMP_C,
    batteryCapacityKwh,
    chargerPowerKw,
    addedPercentOfBase:
      baseMinutes > 0
        ? Math.round((addedDelayMinutes / baseMinutes) * 100)
        : 0,
  };
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

/** Industry planning average for Li-ion calendar fade (% capacity per year). */
export const EV_BATTERY_ANNUAL_CALENDAR_LOSS_PCT = 2.3;

/** Share of vehicle MSRP commonly attributed to the traction pack (planning). */
export const EV_BATTERY_VALUE_SHARE_OF_VEHICLE = 0.38;

export const EV_DC_FAST_CHARGE_DEGRADATION = {
  never: { label: "Never / almost never", extraAnnualPct: 0 },
  rarely: { label: "Rarely (road trips)", extraAnnualPct: 0.5 },
  often: { label: "Often (weekly+)", extraAnnualPct: 1.4 },
} as const;

export type EvDcFastChargeFrequency = keyof typeof EV_DC_FAST_CHARGE_DEGRADATION;

export interface EvBatteryDepletionValueLossInput {
  purchasePrice: number;
  currentMileage: number;
  vehicleAgeYears: number;
  fastChargingFrequency: EvDcFastChargeFrequency;
}

export function calculateEvBatteryDepletionValueLoss({
  purchasePrice,
  currentMileage,
  vehicleAgeYears,
  fastChargingFrequency,
}: EvBatteryDepletionValueLossInput) {
  const calendarLossPct = vehicleAgeYears * EV_BATTERY_ANNUAL_CALENDAR_LOSS_PCT;
  const mileageLossPct = (currentMileage / 30_000) * 1.0;
  const fastChargeLossPct =
    vehicleAgeYears * EV_DC_FAST_CHARGE_DEGRADATION[fastChargingFrequency].extraAnnualPct;

  const totalCapacityLossPct = Math.min(
    50,
    calendarLossPct + mileageLossPct + fastChargeLossPct
  );
  const batteryHealthPercent = Math.max(
    50,
    parseFloat((100 - totalCapacityLossPct).toFixed(1))
  );
  const capacityLossFromNewPct = parseFloat(
    (100 - batteryHealthPercent).toFixed(1)
  );

  const valueLostDueToBattery = parseFloat(
    (
      purchasePrice *
      EV_BATTERY_VALUE_SHARE_OF_VEHICLE *
      (capacityLossFromNewPct / 100)
    ).toFixed(0)
  );
  const estimatedCurrentValue = Math.max(
    0,
    parseFloat((purchasePrice - valueLostDueToBattery).toFixed(0))
  );

  const healthStatus =
    batteryHealthPercent > 90
      ? "Excellent"
      : batteryHealthPercent > 80
        ? "Good"
        : batteryHealthPercent > 70
          ? "Fair"
          : "Degraded";

  return {
    batteryHealthPercent,
    capacityLossFromNewPct,
    valueLostDueToBattery,
    estimatedCurrentValue,
    healthStatus,
    calendarLossPct: parseFloat(calendarLossPct.toFixed(1)),
    mileageLossPct: parseFloat(mileageLossPct.toFixed(1)),
    fastChargeLossPct: parseFloat(fastChargeLossPct.toFixed(1)),
    purchasePrice,
    currentMileage,
    vehicleAgeYears,
    fastChargingFrequency,
    batteryValueShare: EV_BATTERY_VALUE_SHARE_OF_VEHICLE,
  };
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

export type EvThermalMode = "heating" | "cooling" | "maintaining";

export interface EvPreconditioningInput {
  externalTempC: number;
  bmsPowerKw: number;
  durationMinutes: number;
  ratePerKwh: number;
}

/** Typical pack thermal band for DC fast charge (~15–35 °C). */
export function getEvThermalMode(externalTempC: number): EvThermalMode {
  if (externalTempC < 10) return "heating";
  if (externalTempC > 30) return "cooling";
  return "maintaining";
}

export function calculateEvPreconditioningCost({
  externalTempC,
  bmsPowerKw,
  durationMinutes,
  ratePerKwh,
}: EvPreconditioningInput) {
  const hours = durationMinutes / 60;
  const energyKwh = bmsPowerKw * hours;
  const totalCost = energyKwh * ratePerKwh;
  const mode = getEvThermalMode(externalTempC);

  const modeLabel =
    mode === "heating"
      ? "Battery heating"
      : mode === "cooling"
        ? "Battery cooling"
        : "Thermal maintenance";

  return {
    energyKwh: parseFloat(energyKwh.toFixed(3)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    mode,
    modeLabel,
    durationMinutes,
    externalTempC,
  };
}

export interface EvTireWearCostInput {
  annualKm: number;
  tireSetCost: number;
  iceTireLifeKm: number;
  /** Extra wear vs. comparable ICE tire life (e.g. 25 = 25% faster wear). */
  evWearPercent: number;
}

export function calculateEvTireWearCost({
  annualKm,
  tireSetCost,
  iceTireLifeKm,
  evWearPercent,
}: EvTireWearCostInput) {
  const wearFactor = 1 + Math.max(0, evWearPercent) / 100;
  const evTireLifeKm = iceTireLifeKm / wearFactor;
  const iceSetsPerYear = annualKm / iceTireLifeKm;
  const evSetsPerYear = annualKm / evTireLifeKm;
  const iceAnnualCost = iceSetsPerYear * tireSetCost;
  const evAnnualCost = evSetsPerYear * tireSetCost;
  const extraCostVsIce = evAnnualCost - iceAnnualCost;

  const iceTreadRemainingPercent = Math.max(
    0,
    Math.min(100, (1 - iceSetsPerYear % 1) * 100)
  );
  const evTreadRemainingPercent = Math.max(
    0,
    Math.min(100, (1 - evSetsPerYear % 1) * 100)
  );

  return {
    iceAnnualCost: parseFloat(iceAnnualCost.toFixed(2)),
    evAnnualCost: parseFloat(evAnnualCost.toFixed(2)),
    extraCostVsIce: parseFloat(extraCostVsIce.toFixed(2)),
    evTireLifeKm: Math.round(evTireLifeKm),
    iceTireLifeKm,
    evSetsPerYear: parseFloat(evSetsPerYear.toFixed(2)),
    iceSetsPerYear: parseFloat(iceSetsPerYear.toFixed(2)),
    costPerKmEv: parseFloat((evAnnualCost / annualKm).toFixed(3)),
    costPerKmIce: parseFloat((iceAnnualCost / annualKm).toFixed(3)),
    wearFactor: parseFloat(wearFactor.toFixed(2)),
    iceTreadRemainingPercent: parseFloat(iceTreadRemainingPercent.toFixed(0)),
    evTreadRemainingPercent: parseFloat(evTreadRemainingPercent.toFixed(0)),
  };
}

/** Copper resistivity at ~20 °C (Ω·mm²/m) — IEC copper conductor planning. */
export const COPPER_RESISTIVITY_OHM_MM2_M = 0.0175;

/** Assumed AC line voltage for loss-as-% of charge power (L-N). */
export const EV_CABLE_LOSS_REFERENCE_VOLTAGE = 230;

export const EV_CABLE_DEFAULT_RATE_PER_KWH = 0.14;

export interface EvChargingCableLossInput {
  chargeAmps: number;
  cableLengthM: number;
  crossSectionMm2: number;
  chargeHours: number;
  ratePerKwh?: number;
}

export interface EvChargingCableLossResult {
  roundTripOhms: number;
  powerLossW: number;
  energyLossKwh: number;
  sessionCost: number;
  lossPercentOfChargePower: number;
  heatVisualFillPercent: number;
  wireLabel: string;
}

/**
 * I²R loss in a copper EV extension or portable cable (round-trip conductor path).
 */
export function calculateEvChargingCableLoss({
  chargeAmps,
  cableLengthM,
  crossSectionMm2,
  chargeHours,
  ratePerKwh = EV_CABLE_DEFAULT_RATE_PER_KWH,
}: EvChargingCableLossInput): EvChargingCableLossResult {
  const oneWayOhms =
    (COPPER_RESISTIVITY_OHM_MM2_M * cableLengthM) / crossSectionMm2;
  const roundTripOhms = oneWayOhms * 2;
  const powerLossW = chargeAmps * chargeAmps * roundTripOhms;
  const energyLossKwh = (powerLossW * chargeHours) / 1000;
  const sessionCost = energyLossKwh * ratePerKwh;
  const chargePowerW = chargeAmps * EV_CABLE_LOSS_REFERENCE_VOLTAGE;
  const lossPercentOfChargePower =
    chargePowerW > 0 ? (powerLossW / chargePowerW) * 100 : 0;

  return {
    roundTripOhms: parseFloat(roundTripOhms.toFixed(4)),
    powerLossW: parseFloat(powerLossW.toFixed(1)),
    energyLossKwh: parseFloat(energyLossKwh.toFixed(3)),
    sessionCost: parseFloat(sessionCost.toFixed(2)),
    lossPercentOfChargePower: parseFloat(lossPercentOfChargePower.toFixed(2)),
    heatVisualFillPercent: Math.min(
      100,
      Math.max(6, (powerLossW / 150) * 100)
    ),
    wireLabel: `${crossSectionMm2} mm² copper`,
  };
}

export interface EvPackSocInput {
  packVoltageV: number;
  voltageEmptyV: number;
  voltageFullV: number;
}

/** Linear resting OCV estimate between empty and full pack voltage endpoints. */
export function calculateEvPackSoc({
  packVoltageV,
  voltageEmptyV,
  voltageFullV,
}: EvPackSocInput) {
  const span = voltageFullV - voltageEmptyV;
  if (span <= 0) return null;

  const rawPercent = ((packVoltageV - voltageEmptyV) / span) * 100;
  const socPercent = Math.min(100, Math.max(0, rawPercent));
  const isClamped =
    rawPercent > 100 ? "above_full" : rawPercent < 0 ? "below_empty" : "in_range";

  return {
    socPercent: parseFloat(socPercent.toFixed(1)),
    isClamped,
    voltageDeltaV: parseFloat((packVoltageV - voltageEmptyV).toFixed(1)),
    spanV: parseFloat(span.toFixed(1)),
  };
}
