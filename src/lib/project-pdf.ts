import {
  generatePDFReport,
  sanitizePdfRecord,
  type PdfPrimitive,
} from "@/lib/pdf-utils";
import {
  buildBomCostLines,
  computeBomTotal,
  computeEngineeringRollup,
  formatCurrency,
  parseUnitPrice,
} from "@/lib/project-rollup";
import type { WattQuickProject } from "@/lib/project-store";

function formatMetric(value: number | null, unit: string): string {
  if (value === null) return "—";
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unit}`;
}

/** Aggregate snapshots, engineering rollup, and BOM into one JoinMyPDF report. */
export async function exportProjectPDFReport(
  project: WattQuickProject
): Promise<void> {
  const rollup = computeEngineeringRollup(project);
  const bomLines = buildBomCostLines(rollup);
  const costPrices = project.costPrices ?? {};
  const grandTotal = computeBomTotal(bomLines, costPrices);

  const inputs: Record<string, PdfPrimitive> = sanitizePdfRecord({
    Project: project.name,
    "Calculations saved": project.snapshots.length,
    Created: new Date(project.createdAt).toLocaleString(),
    "Last updated": new Date(project.updatedAt).toLocaleString(),
  });

  const results: Record<string, PdfPrimitive> = {};

  results["── Technical Summary ──"] = " ";
  results["Required backup capacity"] = formatMetric(
    rollup.metrics.requiredWh,
    "Wh"
  );
  results["Total battery capacity"] = formatMetric(
    rollup.metrics.totalBatteryWh,
    "Wh"
  );
  results["Max continuous load"] = formatMetric(
    rollup.metrics.maxContinuousW,
    "W"
  );
  results["Max surge requirement"] = formatMetric(
    rollup.metrics.maxSurgeW,
    "W"
  );
  results["Nominal inverter rating"] = formatMetric(
    rollup.metrics.nominalInverterW,
    "W"
  );
  results["Total DC cable (one-way)"] = formatMetric(
    rollup.metrics.totalCableLengthM,
    "m"
  );
  results["Total reactive load"] = formatMetric(
    rollup.metrics.totalReactiveKvar,
    "kVAR"
  );
  results["Usable battery energy (DoD)"] = formatMetric(
    rollup.metrics.usableBatteryKwh,
    "kWh"
  );

  results["── Materials & Cost Estimate ──"] = " ";
  for (const line of bomLines) {
    const unitPrice = parseUnitPrice(costPrices[line.id] ?? "");
    const lineTotal = line.quantity * unitPrice;
    const priceLabel =
      unitPrice > 0
        ? `${line.quantity} ${line.unit} × ${formatCurrency(unitPrice)} = ${formatCurrency(lineTotal)}`
        : `${line.quantity} ${line.unit} (no unit price entered)`;
    results[line.label] = priceLabel;
  }
  results["PROJECT TOTAL ESTIMATE"] = formatCurrency(grandTotal);

  results["── Saved Calculations ──"] = " ";
  project.snapshots.forEach((snapshot, index) => {
    const prefix = `${index + 1}. ${snapshot.calculatorTitle}`;
    results[`${prefix} — saved`] = new Date(snapshot.timestamp).toLocaleString();
    if (snapshot.summary) {
      results[`${prefix} — summary`] = snapshot.summary;
    }
    for (const [label, value] of Object.entries(snapshot.results)) {
      results[`${prefix} — ${label}`] = value;
    }
  });

  await generatePDFReport(
    `${project.name} — WattQuick Project Report`,
    inputs,
    results
  );
}
