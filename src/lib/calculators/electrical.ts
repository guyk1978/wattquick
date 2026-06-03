import { formatNumber, parsePositive } from "@/lib/format";

/** Empty field = undefined; invalid = null; valid positive number */
export function parseOptionalPositive(
  value: string
): number | null | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return parsePositive(trimmed);
}

export type OhmsLawResult =
  | { variable: "voltage"; value: number; unit: "V" }
  | { variable: "current"; value: number; unit: "A" }
  | { variable: "resistance"; value: number; unit: "Ω" };

/** Solve V = I × R when exactly two of three values are provided. */
export function solveOhmsLaw(
  voltage: string,
  current: string,
  resistance: string
): OhmsLawResult | null {
  const v = parseOptionalPositive(voltage);
  const i = parseOptionalPositive(current);
  const r = parseOptionalPositive(resistance);

  if (v === null || i === null || r === null) return null;

  const provided = [v, i, r].filter((x) => x !== undefined);
  if (provided.length !== 2) return null;

  if (v === undefined) {
    const volts = i! * r!;
    return { variable: "voltage", value: volts, unit: "V" };
  }
  if (i === undefined) {
    const amps = v / r!;
    return { variable: "current", value: amps, unit: "A" };
  }
  const ohms = v / i!;
  return { variable: "resistance", value: ohms, unit: "Ω" };
}

const AWG_BY_MAX_AMPS: { maxAmps: number; awg: string }[] = [
  { maxAmps: 10, awg: "16" },
  { maxAmps: 15, awg: "14" },
  { maxAmps: 20, awg: "12" },
  { maxAmps: 30, awg: "10" },
  { maxAmps: 40, awg: "8" },
  { maxAmps: 55, awg: "6" },
  { maxAmps: 70, awg: "4" },
  { maxAmps: 95, awg: "2" },
  { maxAmps: 125, awg: "1/0" },
];

export function recommendDcAwg(amps: number): string {
  for (const row of AWG_BY_MAX_AMPS) {
    if (amps <= row.maxAmps) return row.awg;
  }
  return "2/0+";
}

/** Copper resistivity at ~20 °C (Ω·mm²/m) — IEC conductor planning. */
export const DC_COPPER_RESISTIVITY_OHM_MM2_M = 0.0175;

/** Standard metric DC solar / battery copper sizes with conservative ampacity. */
export const DC_SOLAR_COPPER_CABLES = [
  { mm2: 1.5, awg: "16", maxAmps: 10, label: "1.5 mm² (≈16 AWG)" },
  { mm2: 2.5, awg: "14", maxAmps: 16, label: "2.5 mm² (≈14 AWG)" },
  { mm2: 4, awg: "12", maxAmps: 24, label: "4 mm² (≈12 AWG)" },
  { mm2: 6, awg: "10", maxAmps: 32, label: "6 mm² (≈10 AWG)" },
  { mm2: 10, awg: "8", maxAmps: 45, label: "10 mm² (≈8 AWG)" },
  { mm2: 16, awg: "6", maxAmps: 60, label: "16 mm² (≈6 AWG)" },
  { mm2: 25, awg: "4", maxAmps: 80, label: "25 mm² (≈4 AWG)" },
  { mm2: 35, awg: "2", maxAmps: 100, label: "35 mm² (≈2 AWG)" },
  { mm2: 50, awg: "1/0", maxAmps: 125, label: "50 mm² (≈1/0 AWG)" },
] as const;

export type DcSolarCableSize = (typeof DC_SOLAR_COPPER_CABLES)[number];

export interface DcCableVoltageDropInput {
  loadAmps: number;
  systemVoltageV: number;
  oneWayLengthM: number;
  maxDropPercent?: number;
}

export function dcRoundTripOhms(mm2: number, oneWayLengthM: number): number {
  return (2 * DC_COPPER_RESISTIVITY_OHM_MM2_M * oneWayLengthM) / mm2;
}

export function minDcCableMm2ForDrop({
  loadAmps,
  systemVoltageV,
  oneWayLengthM,
  maxDropPercent,
}: DcCableVoltageDropInput): number {
  const maxDropV = systemVoltageV * (maxDropPercent ?? 3) / 100;
  if (maxDropV <= 0) return Infinity;
  return (2 * DC_COPPER_RESISTIVITY_OHM_MM2_M * oneWayLengthM * loadAmps) / maxDropV;
}

export function pickDcSolarCable(
  loadAmps: number,
  minMm2ForDrop: number
): DcSolarCableSize {
  const match = DC_SOLAR_COPPER_CABLES.find(
    (c) => c.mm2 >= minMm2ForDrop && c.maxAmps >= loadAmps
  );
  if (match) return match;
  const ampacityOnly = DC_SOLAR_COPPER_CABLES.find((c) => c.maxAmps >= loadAmps);
  if (ampacityOnly) return ampacityOnly;
  return DC_SOLAR_COPPER_CABLES[DC_SOLAR_COPPER_CABLES.length - 1];
}

export type DcVoltageDropCompliance = "within-limit" | "marginal" | "excessive";

export function calculateDcCableVoltageDrop({
  loadAmps,
  systemVoltageV,
  oneWayLengthM,
  maxDropPercent = 3,
}: DcCableVoltageDropInput) {
  const minMm2ForDrop = minDcCableMm2ForDrop({
    loadAmps,
    systemVoltageV,
    oneWayLengthM,
    maxDropPercent,
  });
  const recommended = pickDcSolarCable(loadAmps, minMm2ForDrop);

  const roundTripOhms = dcRoundTripOhms(recommended.mm2, oneWayLengthM);
  const dropVolts = loadAmps * roundTripOhms;
  const dropPercent = (dropVolts / systemVoltageV) * 100;
  const powerLossWatts = loadAmps * loadAmps * roundTripOhms;
  const voltageAtLoad = systemVoltageV - dropVolts;

  let compliance: DcVoltageDropCompliance;
  let recommendation: string;
  if (dropPercent <= maxDropPercent) {
    compliance = "within-limit";
    recommendation = `Within your ${formatNumber(maxDropPercent, { maxDecimals: 1 })}% DC drop target—good for MPPT and charge controllers.`;
  } else if (dropPercent <= maxDropPercent + 2) {
    compliance = "marginal";
    recommendation = `Slightly above ${formatNumber(maxDropPercent, { maxDecimals: 1 })}%—consider the next larger mm² size for hot runs.`;
  } else {
    compliance = "excessive";
    recommendation = "Drop exceeds target—upsizing cable, shortening the run, or raising system voltage reduces loss.";
  }

  return {
    recommendedCableLabel: recommended.label,
    recommendedMm2: recommended.mm2,
    recommendedAwg: recommended.awg,
    minMm2ForDrop: parseFloat(minMm2ForDrop.toFixed(2)),
    dropVolts: parseFloat(dropVolts.toFixed(2)),
    dropPercent: parseFloat(dropPercent.toFixed(2)),
    powerLossWatts: parseFloat(powerLossWatts.toFixed(1)),
    voltageAtLoad: parseFloat(Math.max(0, voltageAtLoad).toFixed(2)),
    roundTripOhms: parseFloat(roundTripOhms.toFixed(4)),
    maxDropPercent,
    compliance,
    recommendation,
    loadAmps,
    systemVoltageV,
    oneWayLengthM,
    lossPercentVisual: Math.min(100, Math.max(0, (dropPercent / maxDropPercent) * 100)),
  };
}

/** Voltage drop % for copper DC (one-way length in feet). */
export function dcVoltageDropPercent(
  amps: number,
  lengthFt: number,
  voltage: number,
  awg: string
): number | null {
  const resistancePerFt: Record<string, number> = {
    "16": 0.0130,
    "14": 0.00817,
    "12": 0.00514,
    "10": 0.00324,
    "8": 0.00204,
    "6": 0.00128,
    "4": 0.000808,
    "2": 0.000508,
    "1/0": 0.000319,
  };
  const ohmPerFt = resistancePerFt[awg];
  if (!ohmPerFt) return null;
  const dropV = amps * ohmPerFt * lengthFt * 2;
  return (dropV / voltage) * 100;
}

export function ohmsLawLabel(variable: OhmsLawResult["variable"]): string {
  switch (variable) {
    case "voltage":
      return "Voltage";
    case "current":
      return "Current";
    case "resistance":
      return "Resistance";
  }
}

export function formatOhmsDetail(result: OhmsLawResult): string {
  const v = formatNumber(result.value, { maxDecimals: 3 });
  switch (result.variable) {
    case "voltage":
      return `V = I × R → ${v} V`;
    case "current":
      return `I = V ÷ R → ${v} A`;
    case "resistance":
      return `R = V ÷ I → ${v} Ω`;
  }
}

/** Copper conductor resistance (Ω/m) per conductor at ~20 °C — one-way. */
export const AC_WIRE_OHM_PER_M = {
  "awg-14": 0.008286,
  "awg-12": 0.005211,
  "awg-10": 0.003277,
  "awg-8": 0.002061,
  "awg-6": 0.001296,
  "mm2-1.5": 0.0121,
  "mm2-2.5": 0.00741,
  "mm2-4": 0.00461,
  "mm2-6": 0.00308,
  "mm2-10": 0.00183,
  "mm2-16": 0.00115,
} as const;

export type AcWireSizeKey = keyof typeof AC_WIRE_OHM_PER_M;

export type VoltageDropCompliance = "within-3" | "within-5" | "excessive";

export interface ResidentialVoltageDropInput {
  supplyVoltage: number;
  loadAmps: number;
  oneWayLengthM: number;
  wireSize: AcWireSizeKey;
}

export function isAcWireSizeKey(value: string): value is AcWireSizeKey {
  return value in AC_WIRE_OHM_PER_M;
}

export function calculateResidentialVoltageDrop({
  supplyVoltage,
  loadAmps,
  oneWayLengthM,
  wireSize,
}: ResidentialVoltageDropInput) {
  const ohmPerM = AC_WIRE_OHM_PER_M[wireSize];
  const roundTripOhms = ohmPerM * oneWayLengthM * 2;
  const dropVolts = loadAmps * roundTripOhms;
  const dropPercent = (dropVolts / supplyVoltage) * 100;
  const voltageAtLoad = supplyVoltage - dropVolts;

  let compliance: VoltageDropCompliance;
  let recommendation: string;
  if (dropPercent <= 3) {
    compliance = "within-3";
    recommendation =
      "Within the common 3% branch-circuit guideline—good for motors and chargers.";
  } else if (dropPercent <= 5) {
    compliance = "within-5";
    recommendation =
      "Within a 5% planning limit—acceptable for many loads; consider upsizing for heavy motors.";
  } else {
    compliance = "excessive";
    recommendation =
      "Exceeds 5%—upsize wire gauge, shorten the run, or split loads across circuits.";
  }

  const wireLabel = wireSize.startsWith("awg-")
    ? `${wireSize.replace("awg-", "")} AWG`
    : `${wireSize.replace("mm2-", "")} mm²`;

  return {
    dropVolts: parseFloat(dropVolts.toFixed(2)),
    dropPercent: parseFloat(dropPercent.toFixed(2)),
    voltageAtLoad: parseFloat(Math.max(0, voltageAtLoad).toFixed(2)),
    compliance,
    recommendation,
    wireLabel,
    roundTripOhms: parseFloat(roundTripOhms.toFixed(4)),
    lossPercentVisual: Math.min(100, Math.max(0, dropPercent)),
  };
}

/** Common residential / light commercial breaker handle ratings (A). */
export const STANDARD_AC_BREAKER_AMPS = [
  15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 200,
] as const;

export type BreakerCurveType = "Type B" | "Type C" | "Type D";

export interface AcInrushCurrentInput {
  nominalPowerW: number;
  operatingVoltageV: number;
  inrushFactor: number;
}

export interface AcInrushCurrentResult {
  nominalAmps: number;
  peakInrushAmps: number;
  recommendedBreakerAmps: number;
  recommendedCurveType: BreakerCurveType;
  minBreakerForLoadAmps: number;
  magneticTripMultiple: number;
  inrushRatio: number;
  nominalBarPercent: number;
  recommendation: string;
}

function nextStandardBreakerAmps(requiredAmps: number): number {
  const need = Math.max(requiredAmps, 15);
  for (const size of STANDARD_AC_BREAKER_AMPS) {
    if (size >= need - 0.01) return size;
  }
  return STANDARD_AC_BREAKER_AMPS[STANDARD_AC_BREAKER_AMPS.length - 1];
}

function suggestBreakerCurve(inrushFactor: number): BreakerCurveType {
  if (inrushFactor >= 8) return "Type D";
  if (inrushFactor >= 4) return "Type C";
  return "Type B";
}

/** Magnetic trip multiplier (IEC-style planning) for curve type. */
export function breakerMagneticMultiple(curve: BreakerCurveType): number {
  switch (curve) {
    case "Type B":
      return 5;
    case "Type C":
      return 7.5;
    case "Type D":
      return 12.5;
  }
}

/**
 * AC inrush planning: I = P/V, peak = I × inrush factor, breaker sized for
 * 125% continuous load and short magnetic inrush allowance on curve type.
 */
export function calculateAcInrushCurrent({
  nominalPowerW,
  operatingVoltageV,
  inrushFactor,
}: AcInrushCurrentInput): AcInrushCurrentResult {
  const nominalAmps = nominalPowerW / operatingVoltageV;
  const peakInrushAmps = nominalAmps * inrushFactor;
  const inrushRatio = inrushFactor;

  const recommendedCurveType = suggestBreakerCurve(inrushFactor);
  const magneticTripMultiple = breakerMagneticMultiple(recommendedCurveType);

  const minBreakerForLoadAmps = nominalAmps * 1.25;
  const minBreakerForInrushAmps = peakInrushAmps / magneticTripMultiple;
  const requiredAmps = Math.max(minBreakerForLoadAmps, minBreakerForInrushAmps);
  const recommendedBreakerAmps = nextStandardBreakerAmps(requiredAmps);

  const recommendation =
    peakInrushAmps > recommendedBreakerAmps * magneticTripMultiple
      ? `Consider ${recommendedCurveType} curve or soft-start—peak may trip Type B on some breakers`
      : `${recommendedBreakerAmps} A ${recommendedCurveType} typical for ${formatNumber(inrushFactor, { maxDecimals: 1 })}× inrush`;

  const nominalBarPercent =
    peakInrushAmps > 0 ? (nominalAmps / peakInrushAmps) * 100 : 100;

  return {
    nominalAmps: parseFloat(nominalAmps.toFixed(2)),
    peakInrushAmps: parseFloat(peakInrushAmps.toFixed(1)),
    recommendedBreakerAmps,
    recommendedCurveType,
    minBreakerForLoadAmps: parseFloat(minBreakerForLoadAmps.toFixed(2)),
    magneticTripMultiple,
    inrushRatio: parseFloat(inrushRatio.toFixed(1)),
    nominalBarPercent: parseFloat(nominalBarPercent.toFixed(1)),
    recommendation,
  };
}
