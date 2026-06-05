import {
  generatePDFReport,
  sanitizePdfRecord,
  type PdfPrimitive,
} from "@/lib/pdf-utils";
import type { WattQuickProject } from "@/lib/project-store";

/** Aggregate all project snapshots into one JoinMyPDF report. */
export async function exportProjectPDFReport(
  project: WattQuickProject
): Promise<void> {
  const inputs: Record<string, PdfPrimitive> = sanitizePdfRecord({
    Project: project.name,
    "Calculations saved": project.snapshots.length,
    Created: new Date(project.createdAt).toLocaleString(),
    "Last updated": new Date(project.updatedAt).toLocaleString(),
  });

  const results: Record<string, PdfPrimitive> = {};

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
