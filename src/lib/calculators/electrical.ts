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
