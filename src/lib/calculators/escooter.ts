import { formatCurrency, formatDuration, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import type { CalculatorResultRow } from "@/components/calculator/calculator-results-table";

const DEFAULT_PACK_EFFICIENCY = 0.9;
const GRAVITY = 9.81;

/** Accepts 0.75 or 75 for percent-style fields */
function asFraction(value: number | null, defaultFrac: number): number {
  if (value === null) return defaultFrac;
  return value > 1 ? value / 100 : value;
}

export const ESCOOTER_SURFACE_PRESETS = {
  smooth: { label: "Smooth asphalt", wearFactor: 1, rollingMult: 1 },
  urban: { label: "Urban mixed", wearFactor: 1.35, rollingMult: 1.1 },
  rough: { label: "Rough / brick", wearFactor: 1.8, rollingMult: 1.25 },
} as const;

export const ESCOOTER_CONNECTOR_PRESETS = {
  xt30: { label: "XT30 (~1.5 mΩ)", resistanceMohm: 1.5 },
  xt60: { label: "XT60 (~0.8 mΩ)", resistanceMohm: 0.8 },
  xt90: { label: "XT90 (~0.5 mΩ)", resistanceMohm: 0.5 },
} as const;

export type EscooterSurface = keyof typeof ESCOOTER_SURFACE_PRESETS;

export function calculateEscooterRange(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const riderMassKg = parsePositive(values.riderMassKg ?? "");
  const scooterMassKg = parsePositive(values.scooterMassKg ?? "") ?? 14;
  const tirePressureBar = parsePositive(values.tirePressureBar ?? "") ?? 3.5;
  const recommendedPressureBar = parsePositive(values.recommendedPressureBar ?? "") ?? 3.5;
  const packEfficiencyPct = parsePositive(values.packEfficiency ?? "");
  if (batteryWh === null || riderMassKg === null) return null;

  const packEfficiency =
    packEfficiencyPct !== null ? packEfficiencyPct / 100 : DEFAULT_PACK_EFFICIENCY;
  const pressurePenalty = Math.max(0, (recommendedPressureBar - tirePressureBar) * 1.2);
  const massPenalty = Math.max(0, (riderMassKg + scooterMassKg - 75) / 10) * 0.15;
  const baseWhPerKm = 14 + pressurePenalty + massPenalty;
  const usableWh = batteryWh * packEfficiency;
  const rangeKm = usableWh / baseWhPerKm;

  return {
    rangeKm,
    baseWhPerKm,
    usableWh,
    pressurePenalty,
    massPenalty,
    totalMassKg: riderMassKg + scooterMassKg,
  };
}

export function calculateEscooterTirePressure(values: Record<string, string>) {
  const tirePressureBar = parsePositive(values.tirePressureBar ?? "");
  const recommendedBar = parsePositive(values.recommendedBar ?? "") ?? 3.5;
  const wheelSizeIn = parsePositive(values.wheelSizeIn ?? "") ?? 10;
  const riderMassKg = parsePositive(values.riderMassKg ?? "") ?? 75;
  if (tirePressureBar === null) return null;

  const underInflation = Math.max(0, recommendedBar - tirePressureBar);
  const rollingMult = 1 + underInflation * 0.35 + (wheelSizeIn < 9 ? 0.08 : 0);
  const baseWhPerKm = 13 * rollingMult;
  const massFactor = 1 + Math.max(0, riderMassKg - 70) * 0.004;
  const whPerKm = baseWhPerKm * massFactor;
  const rangePenaltyPercent = ((whPerKm / (13 * massFactor)) - 1) * 100;

  return { whPerKm, rollingMult, underInflation, rangePenaltyPercent, wheelSizeIn };
}

export function calculateEscooterMaxSpeed(values: Record<string, string>) {
  const batteryVoltage = parsePositive(values.batteryVoltage ?? "");
  const motorKv = parsePositive(values.motorKv ?? "");
  const wheelDiameterMm = parsePositive(values.wheelDiameterMm ?? "") ?? 200;
  if (batteryVoltage === null || motorKv === null) return null;

  const rpm = batteryVoltage * motorKv * 0.88;
  const circumferenceM = (Math.PI * wheelDiameterMm) / 1000;
  const speedKmh = (rpm / 60) * circumferenceM * 3.6;

  return { speedKmh, rpm, wheelDiameterMm };
}

export function calculateEscooterHillClimb(values: Record<string, string>) {
  const motorWatts = parsePositive(values.motorWatts ?? "");
  const totalMassKg = parsePositive(values.totalMassKg ?? "");
  const minClimbSpeedKmh = parsePositive(values.minClimbSpeedKmh ?? "") ?? 8;
  const motorEfficiency = asFraction(
    parsePositive(values.motorEfficiency ?? ""),
    0.75
  );
  if (motorWatts === null || totalMassKg === null) return null;

  const vMs = (minClimbSpeedKmh * 1000) / 3600;
  const sinTheta = (motorWatts * motorEfficiency) / (totalMassKg * GRAVITY * vMs);
  const clampedSin = Math.min(1, Math.max(0, sinTheta));
  const gradePercent = Math.tan(Math.asin(clampedSin)) * 100;
  const climbPowerW = totalMassKg * GRAVITY * Math.sin(Math.asin(clampedSin)) * vMs;

  return {
    gradePercent,
    sinTheta: clampedSin,
    climbPowerW,
    motorEfficiency,
    minClimbSpeedKmh,
  };
}

export function calculateEscooterTireWear(values: Record<string, string>) {
  const weeklyKm = parsePositive(values.weeklyKm ?? "");
  const treadDepthMm = parsePositive(values.treadDepthMm ?? "") ?? 1.5;
  const surface = (values.surface ?? "urban") as EscooterSurface;
  if (weeklyKm === null) return null;

  const wearFactor = ESCOOTER_SURFACE_PRESETS[surface]?.wearFactor ?? 1.35;
  const kmPerMm = 450 / wearFactor;
  const totalKmLife = kmPerMm * treadDepthMm;
  const weeksRemaining = totalKmLife / weeklyKm;

  return { totalKmLife, weeksRemaining, kmPerMm, wearFactor, treadDepthMm };
}

export function calculateEscooterChargeTime(values: Record<string, string>) {
  const batteryWh = parsePositive(values.batteryWh ?? "");
  const chargerAmps = parsePositive(values.chargerAmps ?? "");
  const batteryVoltage = parsePositive(values.batteryVoltage ?? "") ?? 36;
  const chargeEfficiency = asFraction(
    parsePositive(values.chargeEfficiency ?? ""),
    0.88
  );
  if (batteryWh === null || chargerAmps === null) return null;

  const chargerW = batteryVoltage * chargerAmps;
  const hours = batteryWh / (chargerW * chargeEfficiency);

  return { hours, chargerW, chargeEfficiency, chargerAmps };
}

export function calculateEscooterCostPerKm(values: Record<string, string>) {
  const whPerKm = parsePositive(values.whPerKm ?? "") ?? 15;
  const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
  const weeklyKm = parsePositive(values.weeklyKm ?? "");
  const transitFare = parsePositive(values.transitFare ?? "");
  if (ratePerKwh === null || weeklyKm === null || transitFare === null) return null;

  const costPerKm = (whPerKm / 1000) * ratePerKwh;
  const weeklyScooterCost = costPerKm * weeklyKm;
  const weeklyTransitCost = transitFare * 10;
  const annualSavings = (weeklyTransitCost - weeklyScooterCost) * 52;

  return { costPerKm, weeklyScooterCost, weeklyTransitCost, annualSavings, whPerKm };
}

export function calculateEscooterWeightLimit(values: Record<string, string>) {
  const riderMassKg = parsePositive(values.riderMassKg ?? "");
  const ratedMaxKg = parsePositive(values.ratedMaxKg ?? "") ?? 100;
  const motorRatedW = parsePositive(values.motorRatedW ?? "") ?? 500;
  if (riderMassKg === null) return null;

  const overloadKg = Math.max(0, riderMassKg - ratedMaxKg);
  const stressFactor = riderMassKg / ratedMaxKg;
  const effectiveMotorLoad = stressFactor * motorRatedW;
  const withinLimit = riderMassKg <= ratedMaxKg;

  return { overloadKg, stressFactor, effectiveMotorLoad, withinLimit, ratedMaxKg };
}

export function calculateEscooterPeakAmps(values: Record<string, string>) {
  const batteryVoltage = parsePositive(values.batteryVoltage ?? "") ?? 36;
  const peakAmps = parsePositive(values.peakAmps ?? "");
  const controllerLimitA = parsePositive(values.controllerLimitA ?? "");
  const capacityAh = parsePositive(values.capacityAh ?? "");
  const cRating = parsePositive(values.cRating ?? "") ?? 2;
  if (peakAmps === null || controllerLimitA === null || capacityAh === null) return null;

  const maxPackAmps = capacityAh * cRating;
  const withinController = peakAmps <= controllerLimitA;
  const withinPack = peakAmps <= maxPackAmps;
  const peakWatts = batteryVoltage * peakAmps;

  return { maxPackAmps, withinController, withinPack, peakWatts, controllerLimitA };
}

export function calculateEscooterBrakePadWear(values: Record<string, string>) {
  const weeklyKm = parsePositive(values.weeklyKm ?? "");
  const regenPercent = parsePositive(values.regenPercent ?? "") ?? 20;
  const hillyPercent = parsePositive(values.hillyPercent ?? "") ?? 30;
  if (weeklyKm === null) return null;

  const baseKmPerPadSet = 1200;
  const regenFactor = 1 + (100 - regenPercent) / 200;
  const hillFactor = 1 + hillyPercent / 100;
  const kmPerPadSet = baseKmPerPadSet / (regenFactor * hillFactor);
  const weeksPerPadSet = kmPerPadSet / weeklyKm;

  return { kmPerPadSet, weeksPerPadSet, regenFactor, hillFactor };
}

export function calculateEscooterConnectorLoss(values: Record<string, string>) {
  const drawAmps = parsePositive(values.drawAmps ?? "");
  const connector = (values.connector ?? "xt60") as keyof typeof ESCOOTER_CONNECTOR_PRESETS;
  const sessionMinutes = parsePositive(values.sessionMinutes ?? "") ?? 30;
  if (drawAmps === null) return null;

  const resistanceMohm =
    ESCOOTER_CONNECTOR_PRESETS[connector]?.resistanceMohm ?? 0.8;
  const lossW = drawAmps ** 2 * (resistanceMohm / 1000);
  const lossWh = (lossW * sessionMinutes) / 60;

  return { lossW, lossWh, resistanceMohm, connector };
}

export function calculateEscooterMaintenanceSchedule(values: Record<string, string>) {
  const odometerKm = parseNonNegative(values.odometerKm ?? "");
  const weeklyKm = parsePositive(values.weeklyKm ?? "") ?? 50;
  if (odometerKm === null) return null;

  const tireInterval = 500;
  const brakeInterval = 400;
  const boltInterval = 200;
  const nextTireKm = tireInterval - (odometerKm % tireInterval);
  const nextBrakeKm = brakeInterval - (odometerKm % brakeInterval);
  const nextBoltKm = boltInterval - (odometerKm % boltInterval);
  const weeksToTire = nextTireKm / weeklyKm;

  return {
    nextTireKm,
    nextBrakeKm,
    nextBoltKm,
    weeksToTire,
    odometerKm,
  };
}

export function buildEscooterRangeRows(
  p: NonNullable<ReturnType<typeof calculateEscooterRange>>
): CalculatorResultRow[] {
  return [
    { label: "Estimated range", value: formatNumber(p.rangeKm, { maxDecimals: 1 }), unit: "km" },
    { label: "Consumption", value: formatNumber(p.baseWhPerKm, { maxDecimals: 1 }), unit: "Wh/km" },
    { label: "Usable energy", value: formatNumber(p.usableWh, { maxDecimals: 0 }), unit: "Wh" },
    { label: "Pressure penalty", value: formatNumber(p.pressurePenalty, { maxDecimals: 1 }), unit: "Wh/km" },
    { label: "Mass penalty", value: formatNumber(p.massPenalty, { maxDecimals: 2 }), unit: "Wh/km" },
    { label: "Total mass", value: formatNumber(p.totalMassKg, { maxDecimals: 0 }), unit: "kg" },
  ];
}

export function buildEscooterTirePressureRows(
  p: NonNullable<ReturnType<typeof calculateEscooterTirePressure>>
): CalculatorResultRow[] {
  return [
    { label: "Adjusted Wh/km", value: formatNumber(p.whPerKm, { maxDecimals: 1 }), unit: "Wh/km" },
    { label: "Rolling multiplier", value: formatNumber(p.rollingMult, { maxDecimals: 2 }), unit: "×" },
    { label: "Under-inflation", value: formatNumber(p.underInflation, { maxDecimals: 1 }), unit: "bar" },
    { label: "Range penalty", value: formatNumber(p.rangePenaltyPercent, { maxDecimals: 0 }), unit: "%" },
    { label: "Wheel size", value: formatNumber(p.wheelSizeIn, { maxDecimals: 0 }), unit: "in" },
  ];
}

export function buildEscooterMaxSpeedRows(
  p: NonNullable<ReturnType<typeof calculateEscooterMaxSpeed>>
): CalculatorResultRow[] {
  return [
    { label: "Max speed", value: formatNumber(p.speedKmh, { maxDecimals: 1 }), unit: "km/h" },
    { label: "Motor RPM", value: formatNumber(p.rpm, { maxDecimals: 0 }), unit: "RPM" },
    { label: "Wheel diameter", value: formatNumber(p.wheelDiameterMm, { maxDecimals: 0 }), unit: "mm" },
  ];
}

export function buildEscooterHillClimbRows(
  p: NonNullable<ReturnType<typeof calculateEscooterHillClimb>>
): CalculatorResultRow[] {
  return [
    { label: "Max climb grade", value: formatNumber(p.gradePercent, { maxDecimals: 1 }), unit: "%" },
    { label: "Climb power", value: formatNumber(p.climbPowerW, { maxDecimals: 0 }), unit: "W" },
    { label: "Min climb speed", value: formatNumber(p.minClimbSpeedKmh, { maxDecimals: 0 }), unit: "km/h" },
    { label: "Motor efficiency", value: formatNumber(p.motorEfficiency * 100, { maxDecimals: 0 }), unit: "%" },
  ];
}

export function buildEscooterTireWearRows(
  p: NonNullable<ReturnType<typeof calculateEscooterTireWear>>
): CalculatorResultRow[] {
  return [
    { label: "Tread life", value: formatNumber(p.totalKmLife, { maxDecimals: 0 }), unit: "km" },
    { label: "Weeks remaining", value: formatNumber(p.weeksRemaining, { maxDecimals: 0 }), unit: "wk" },
    { label: "Km per mm tread", value: formatNumber(p.kmPerMm, { maxDecimals: 0 }), unit: "km/mm" },
    { label: "Surface factor", value: formatNumber(p.wearFactor, { maxDecimals: 2 }), unit: "×" },
  ];
}

export function buildEscooterChargeTimeRows(
  p: NonNullable<ReturnType<typeof calculateEscooterChargeTime>>
): CalculatorResultRow[] {
  const d = formatDuration(p.hours);
  return [
    { label: "Charge time", value: d.display, unit: d.unit },
    { label: "Charger power", value: formatNumber(p.chargerW, { maxDecimals: 0 }), unit: "W" },
    { label: "Charge current", value: formatNumber(p.chargerAmps, { maxDecimals: 1 }), unit: "A" },
    { label: "Efficiency", value: formatNumber(p.chargeEfficiency * 100, { maxDecimals: 0 }), unit: "%" },
  ];
}

export function buildEscooterCostPerKmRows(
  p: NonNullable<ReturnType<typeof calculateEscooterCostPerKm>>
): CalculatorResultRow[] {
  return [
    { label: "Cost per km", value: formatCurrency(p.costPerKm), unit: "/km" },
    { label: "Weekly scooter cost", value: formatCurrency(p.weeklyScooterCost) },
    { label: "Weekly transit (est.)", value: formatCurrency(p.weeklyTransitCost) },
    { label: "Annual savings vs transit", value: formatCurrency(p.annualSavings) },
  ];
}

export function buildEscooterWeightLimitRows(
  p: NonNullable<ReturnType<typeof calculateEscooterWeightLimit>>
): CalculatorResultRow[] {
  return [
    {
      label: "Load stress factor",
      value: formatNumber(p.stressFactor, { maxDecimals: 2 }),
      unit: "×",
    },
    {
      label: "Effective motor load",
      value: formatNumber(p.effectiveMotorLoad, { maxDecimals: 0 }),
      unit: "W",
    },
    {
      label: "Overload",
      value: formatNumber(p.overloadKg, { maxDecimals: 0 }),
      unit: "kg",
    },
    {
      label: "Within rated limit",
      value: p.withinLimit ? "Yes" : "No",
    },
  ];
}

export function buildEscooterPeakAmpsRows(
  p: NonNullable<ReturnType<typeof calculateEscooterPeakAmps>>
): CalculatorResultRow[] {
  return [
    { label: "Peak power", value: formatNumber(p.peakWatts, { maxDecimals: 0 }), unit: "W" },
    { label: "Max pack amps", value: formatNumber(p.maxPackAmps, { maxDecimals: 1 }), unit: "A" },
    { label: "Controller limit", value: formatNumber(p.controllerLimitA, { maxDecimals: 0 }), unit: "A" },
    {
      label: "Within controller",
      value: p.withinController ? "Yes" : "No",
    },
    { label: "Within pack C-rate", value: p.withinPack ? "Yes" : "No" },
  ];
}

export function buildEscooterBrakePadWearRows(
  p: NonNullable<ReturnType<typeof calculateEscooterBrakePadWear>>
): CalculatorResultRow[] {
  return [
    { label: "Km per pad set", value: formatNumber(p.kmPerPadSet, { maxDecimals: 0 }), unit: "km" },
    { label: "Weeks per pad set", value: formatNumber(p.weeksPerPadSet, { maxDecimals: 0 }), unit: "wk" },
    { label: "Regen factor", value: formatNumber(p.regenFactor, { maxDecimals: 2 }), unit: "×" },
    { label: "Hill factor", value: formatNumber(p.hillFactor, { maxDecimals: 2 }), unit: "×" },
  ];
}

export function buildEscooterConnectorLossRows(
  p: NonNullable<ReturnType<typeof calculateEscooterConnectorLoss>>
): CalculatorResultRow[] {
  return [
    { label: "Connector loss", value: formatNumber(p.lossW, { maxDecimals: 2 }), unit: "W" },
    { label: "Session waste", value: formatNumber(p.lossWh, { maxDecimals: 2 }), unit: "Wh" },
    { label: "Resistance", value: formatNumber(p.resistanceMohm, { maxDecimals: 1 }), unit: "mΩ" },
  ];
}

export function buildEscooterMaintenanceRows(
  p: NonNullable<ReturnType<typeof calculateEscooterMaintenanceSchedule>>
): CalculatorResultRow[] {
  return [
    { label: "Next tire service", value: formatNumber(p.nextTireKm, { maxDecimals: 0 }), unit: "km" },
    { label: "Next brake check", value: formatNumber(p.nextBrakeKm, { maxDecimals: 0 }), unit: "km" },
    { label: "Next bolt torque", value: formatNumber(p.nextBoltKm, { maxDecimals: 0 }), unit: "km" },
    { label: "Weeks to tire service", value: formatNumber(p.weeksToTire, { maxDecimals: 0 }), unit: "wk" },
  ];
}

export type EscooterCalculatorSlug =
  | "escooter-range"
  | "escooter-tire-pressure"
  | "escooter-max-speed"
  | "escooter-hill-climb"
  | "escooter-tire-wear"
  | "escooter-charge-time"
  | "escooter-cost-per-km"
  | "escooter-weight-limit"
  | "escooter-peak-amps"
  | "escooter-brake-pad-wear"
  | "escooter-connector-loss"
  | "escooter-maintenance-schedule";

export const ESCOOTER_CALCULATOR_IDS: EscooterCalculatorSlug[] = [
  "escooter-range",
  "escooter-tire-pressure",
  "escooter-max-speed",
  "escooter-hill-climb",
  "escooter-tire-wear",
  "escooter-charge-time",
  "escooter-cost-per-km",
  "escooter-weight-limit",
  "escooter-peak-amps",
  "escooter-brake-pad-wear",
  "escooter-connector-loss",
  "escooter-maintenance-schedule",
];

type EscooterHandler = {
  calculate: (values: Record<string, string>) => Record<string, unknown> | null;
  buildRows: (parsed: Record<string, unknown>) => CalculatorResultRow[];
  note: string;
};

export const ESCOOTER_HANDLERS: Record<EscooterCalculatorSlug, EscooterHandler> = {
  "escooter-range": {
    calculate: calculateEscooterRange,
    buildRows: (p) => buildEscooterRangeRows(p as NonNullable<ReturnType<typeof calculateEscooterRange>>),
    note: "Standing-rider drag uses ~14 Wh/km baseline plus pressure and mass penalties. Typical 36–48 V commuter packs: 280–750 Wh.",
  },
  "escooter-tire-pressure": {
    calculate: calculateEscooterTirePressure,
    buildRows: (p) =>
      buildEscooterTirePressureRows(p as NonNullable<ReturnType<typeof calculateEscooterTirePressure>>),
    note: "Small 8–10″ tyres are sensitive to pressure. Reference 3.5 bar for many 10″ commuter tubes.",
  },
  "escooter-max-speed": {
    calculate: calculateEscooterMaxSpeed,
    buildRows: (p) => buildEscooterMaxSpeedRows(p as NonNullable<ReturnType<typeof calculateEscooterMaxSpeed>>),
    note: "200 mm wheel ≈ 8″ solid/honeycomb. Loaded speed is lower than this no-load estimate.",
  },
  "escooter-hill-climb": {
    calculate: calculateEscooterHillClimb,
    buildRows: (p) => buildEscooterHillClimbRows(p as NonNullable<ReturnType<typeof calculateEscooterHillClimb>>),
    note: "Grade at minimum crawl speed: sin(θ) = P·η / (m·g·v). Steep grades need burst current beyond continuous watts.",
  },
  "escooter-tire-wear": {
    calculate: calculateEscooterTireWear,
    buildRows: (p) => buildEscooterTireWearRows(p as NonNullable<ReturnType<typeof calculateEscooterTireWear>>),
    note: "Solid and pneumatic tyres wear faster on rough tile and brick. Inspect tread weekly on high-mileage commutes.",
  },
  "escooter-charge-time": {
    calculate: calculateEscooterChargeTime,
    buildRows: (p) => buildEscooterChargeTimeRows(p as NonNullable<ReturnType<typeof calculateEscooterChargeTime>>),
    note: "2 A brick ≈ 72 W on 36 V; 4 A ≈ 144 W. Small packs heat quickly above 2C — prefer slow overnight charges.",
  },
  "escooter-cost-per-km": {
    calculate: calculateEscooterCostPerKm,
    buildRows: (p) => buildEscooterCostPerKmRows(p as NonNullable<ReturnType<typeof calculateEscooterCostPerKm>>),
    note: "Transit comparison assumes 10 trips/week at your entered fare. Adjust wh/km from range calculator.",
  },
  "escooter-weight-limit": {
    calculate: calculateEscooterWeightLimit,
    buildRows: (p) => buildEscooterWeightLimitRows(p as NonNullable<ReturnType<typeof calculateEscooterWeightLimit>>),
    note: "Exceeding rated rider mass accelerates motor and deck wear. Manufacturer limits include clothing and backpack.",
  },
  "escooter-peak-amps": {
    calculate: calculateEscooterPeakAmps,
    buildRows: (p) => buildEscooterPeakAmpsRows(p as NonNullable<ReturnType<typeof calculateEscooterPeakAmps>>),
    note: "Hard acceleration can exceed continuous C-rate for seconds. Repeated peaks heat small packs fast.",
  },
  "escooter-brake-pad-wear": {
    calculate: calculateEscooterBrakePadWear,
    buildRows: (p) =>
      buildEscooterBrakePadWearRows(p as NonNullable<ReturnType<typeof calculateEscooterBrakePadWear>>),
    note: "Regen reduces pad use but rarely replaces friction brakes on steep descents. Inspect pads every 400 km.",
  },
  "escooter-connector-loss": {
    calculate: calculateEscooterConnectorLoss,
    buildRows: (p) =>
      buildEscooterConnectorLossRows(p as NonNullable<ReturnType<typeof calculateEscooterConnectorLoss>>),
    note: "Loss = I²R at the connector pair. Loose XT60 pins increase resistance beyond datasheet values.",
  },
  "escooter-maintenance-schedule": {
    calculate: calculateEscooterMaintenanceSchedule,
    buildRows: (p) =>
      buildEscooterMaintenanceRows(p as NonNullable<ReturnType<typeof calculateEscooterMaintenanceSchedule>>),
    note: "Intervals are planning defaults — follow your manufacturer manual for folding hinge and stem torque specs.",
  },
};

export function formatEscooterResult(
  slug: EscooterCalculatorSlug,
  values: Record<string, string>
) {
  const handler = ESCOOTER_HANDLERS[slug];
  const parsed = handler.calculate(values);
  if (!parsed) return { value: null, unit: undefined, detail: null };
  const rows = handler.buildRows(parsed);
  const primary = rows[0];
  return {
    value: primary?.value ?? null,
    unit: primary?.unit,
    detail: rows[1] ? `${rows[1].value} ${rows[1].unit ?? ""}`.trim() : null,
  };
}
