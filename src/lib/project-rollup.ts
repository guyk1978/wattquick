import type { ProjectSnapshot, WattQuickProject } from "@/lib/project-store";

export type BomLineId =
  | "battery-storage"
  | "inverter"
  | "dc-cabling"
  | "installation";

export interface EngineeringRollupMetrics {
  totalBatteryWh: number | null;
  maxSurgeW: number | null;
  maxContinuousW: number | null;
  totalCableLengthM: number | null;
  requiredWh: number | null;
  nominalInverterW: number | null;
}

export interface EngineeringRollup {
  metrics: EngineeringRollupMetrics;
  sources: string[];
}

export interface BomCostLine {
  id: BomLineId;
  label: string;
  description: string;
  quantity: number;
  unit: string;
  source: string;
}

function parseNumber(text: string): number | null {
  const match = text.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number.parseFloat(match[0]!);
  return Number.isFinite(value) ? value : null;
}

function parseWatts(text: string): number | null {
  const match = text.match(/([\d,]+(?:\.\d+)?)\s*W\b/i);
  return match ? parseNumber(match[1]!) : null;
}

function parseWh(text: string): number | null {
  const match = text.match(/([\d,]+(?:\.\d+)?)\s*Wh\b/i);
  return match ? parseNumber(match[1]!) : null;
}

function parseKwh(text: string): number | null {
  const match = text.match(/([\d,]+(?:\.\d+)?)\s*kWh\b/i);
  return match ? parseNumber(match[1]!)! * 1000 : null;
}

function parseAh(text: string): number | null {
  const match = text.match(/([\d,]+(?:\.\d+)?)\s*Ah\b/i);
  return match ? parseNumber(match[1]!) : null;
}

function snapshotText(snapshot: ProjectSnapshot): string {
  return [
    snapshot.summary,
    ...Object.values(snapshot.results),
    ...Object.values(snapshot.inputs),
  ].join(" ");
}

function findResult(snapshot: ProjectSnapshot, ...needles: string[]): string | null {
  for (const [label, value] of Object.entries(snapshot.results)) {
    const lower = label.toLowerCase();
    if (needles.some((needle) => lower.includes(needle.toLowerCase()))) {
      return value;
    }
  }
  return null;
}

function inputNumeric(snapshot: ProjectSnapshot, fieldId: string): number | null {
  const raw = snapshot.inputs[fieldId];
  return raw ? parseNumber(raw) : null;
}

function maxNullable(values: (number | null)[]): number | null {
  const finite = values.filter((v): v is number => v !== null && Number.isFinite(v));
  return finite.length > 0 ? Math.max(...finite) : null;
}

function sumNullable(values: (number | null)[]): number | null {
  const finite = values.filter((v): v is number => v !== null && Number.isFinite(v));
  return finite.length > 0 ? finite.reduce((sum, value) => sum + value, 0) : null;
}

function extractBatteryWh(snapshot: ProjectSnapshot): number | null {
  const packEnergy = findResult(snapshot, "pack energy", "required wh", "required capacity");
  if (packEnergy) {
    return (
      parseWh(packEnergy) ??
      parseKwh(packEnergy) ??
      (() => {
        const ah = parseAh(packEnergy);
        const voltage =
          inputNumeric(snapshot, "systemVoltage") ??
          inputNumeric(snapshot, "voltage") ??
          inputNumeric(snapshot, "systemVoltageV");
        return ah !== null && voltage !== null ? ah * voltage : null;
      })()
    );
  }

  return (
    parseWh(snapshot.summary) ??
    parseWh(snapshot.results.Notes ?? "") ??
    parseKwh(snapshotText(snapshot))
  );
}

function extractSurgeW(snapshot: ProjectSnapshot): number | null {
  const peakResult = findResult(snapshot, "peak surge", "surge");
  const fromResult = peakResult ? parseWatts(peakResult) : null;
  const fromNotes = parseWatts(snapshot.results.Notes ?? "");
  const fromDetail = snapshotText(snapshot).match(/([\d,]+(?:\.\d+)?)\s*W\s*surge/i);
  const fromDetailValue = fromDetail ? parseNumber(fromDetail[1]!) : null;
  return maxNullable([fromResult, fromNotes, fromDetailValue]);
}

function extractContinuousW(snapshot: ProjectSnapshot): number | null {
  const continuous = findResult(
    snapshot,
    "continuous",
    "recommended continuous",
    "recommended inverter"
  );
  const fromResult = continuous ? parseWatts(continuous) : null;
  const fromSummary = parseWatts(snapshot.summary);
  const fromNotes = snapshot.results.Notes
    ? parseWatts(snapshot.results.Notes.split("·")[0] ?? "")
    : null;
  return maxNullable([fromResult, fromSummary, fromNotes]);
}

function extractCableLengthM(snapshot: ProjectSnapshot): number | null {
  if (snapshot.calculatorSlug === "dc-cable-voltage-drop") {
    return inputNumeric(snapshot, "oneWayLengthM");
  }
  if (snapshot.calculatorSlug === "dc-cable-size") {
    const feet = inputNumeric(snapshot, "length");
    return feet !== null ? feet * 0.3048 : null;
  }
  const lengthInput =
    inputNumeric(snapshot, "oneWayLengthM") ?? inputNumeric(snapshot, "length");
  return lengthInput !== null && snapshot.calculatorSlug.includes("cable")
    ? lengthInput
    : null;
}

/** Scan project snapshots and aggregate engineering metrics. */
export function computeEngineeringRollup(
  project: WattQuickProject
): EngineeringRollup {
  const sources: string[] = [];
  const batteryWhValues: number[] = [];
  const surgeValues: number[] = [];
  const continuousValues: number[] = [];
  const cableLengths: number[] = [];
  let requiredWh: number | null = null;
  let nominalInverterW: number | null = null;

  for (const snapshot of project.snapshots) {
    const slug = snapshot.calculatorSlug;

    if (slug === "critical-load-analysis") {
      const wh =
        parseWh(findResult(snapshot, "required wh") ?? "") ??
        parseWh(snapshot.summary);
      if (wh !== null) {
        requiredWh = wh;
        sources.push(`Critical load: ${Math.round(wh).toLocaleString()} Wh`);
      }
    }

    if (
      slug === "battery-series-parallel" ||
      slug === "home-backup-sizing" ||
      slug === "battery-bank-size" ||
      slug === "battery-energy"
    ) {
      const wh = extractBatteryWh(snapshot);
      if (wh !== null) {
        batteryWhValues.push(wh);
        sources.push(`${snapshot.calculatorTitle}: ${Math.round(wh).toLocaleString()} Wh`);
      }
    }

    if (slug === "inverter-peak-load-surge" || slug === "inverter-sizing") {
      const surge = extractSurgeW(snapshot);
      const continuous = extractContinuousW(snapshot);
      if (surge !== null) {
        surgeValues.push(surge);
        sources.push(`Peak surge: ${Math.round(surge).toLocaleString()} W`);
      }
      if (continuous !== null) {
        continuousValues.push(continuous);
      }
    }

    if (slug === "inverter-loading-curve") {
      const nominal = inputNumeric(snapshot, "nominalPowerW");
      if (nominal !== null) {
        nominalInverterW = maxNullable([nominalInverterW, nominal]);
        sources.push(`Inverter nominal: ${Math.round(nominal).toLocaleString()} W`);
      }
      const derated = parseWatts(findResult(snapshot, "derated") ?? "");
      if (derated !== null) {
        continuousValues.push(derated);
      }
    }

    const cableM = extractCableLengthM(snapshot);
    if (cableM !== null && cableM > 0) {
      cableLengths.push(cableM);
      sources.push(
        `${snapshot.calculatorTitle}: ${cableM.toFixed(1)} m one-way`
      );
    }
  }

  return {
    metrics: {
      totalBatteryWh: maxNullable(batteryWhValues),
      maxSurgeW: maxNullable(surgeValues),
      maxContinuousW: maxNullable(continuousValues),
      totalCableLengthM: sumNullable(cableLengths),
      requiredWh,
      nominalInverterW,
    },
    sources: [...new Set(sources)],
  };
}

/** Build editable BOM lines from engineering rollup metrics. */
export function buildBomCostLines(rollup: EngineeringRollup): BomCostLine[] {
  const { metrics } = rollup;
  const lines: BomCostLine[] = [];

  const batteryWh = maxNullable([
    metrics.totalBatteryWh,
    metrics.requiredWh,
  ]);

  if (batteryWh !== null && batteryWh > 0) {
    lines.push({
      id: "battery-storage",
      label: "Battery storage",
      description: "Bank capacity from sizing snapshots",
      quantity: Math.round((batteryWh / 1000) * 100) / 100,
      unit: "kWh",
      source: "Battery / critical load calculators",
    });
  }

  const inverterKw = maxNullable([
    metrics.maxContinuousW,
    metrics.nominalInverterW,
  ]);

  if (inverterKw !== null && inverterKw > 0) {
    lines.push({
      id: "inverter",
      label: "Inverter / charger",
      description: "Continuous or nominal rating",
      quantity: Math.round((inverterKw / 1000) * 100) / 100,
      unit: "kW",
      source: "Inverter loading / surge calculators",
    });
  }

  if (metrics.maxSurgeW !== null && metrics.maxSurgeW > 0) {
    const surgeLine = lines.find((line) => line.id === "inverter");
    if (surgeLine) {
      surgeLine.description = `Continuous ${inverterKw !== null ? `${(inverterKw / 1000).toFixed(1)} kW` : "—"} · surge headroom ${Math.round(metrics.maxSurgeW).toLocaleString()} W`;
    }
  }

  if (metrics.totalCableLengthM !== null && metrics.totalCableLengthM > 0) {
    lines.push({
      id: "dc-cabling",
      label: "DC wiring",
      description: "Summed one-way cable runs",
      quantity: Math.round(metrics.totalCableLengthM * 10) / 10,
      unit: "m",
      source: "DC cable sizing snapshots",
    });
  }

  lines.push({
    id: "installation",
    label: "Installation & misc",
    description: "Labor, breakers, conduit, shipping",
    quantity: 1,
    unit: "lot",
    source: "Manual estimate",
  });

  return lines;
}

export function parseUnitPrice(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function computeBomTotal(
  lines: BomCostLine[],
  unitPrices: Record<string, string>
): number {
  return lines.reduce((sum, line) => {
    const price = parseUnitPrice(unitPrices[line.id] ?? "");
    return sum + line.quantity * price;
  }, 0);
}
