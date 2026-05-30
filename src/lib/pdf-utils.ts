export const PDF_GENERATE_URL = "https://joinmypdf.com/api/generate-report";

export type PdfPrimitive = string | number;

export interface PdfReportData {
  calculatorName: string;
  inputs: Record<string, PdfPrimitive>;
  results: Record<string, PdfPrimitive>;
}

function slugifyFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/** Coerce a single value to a PDF-safe primitive (never undefined/null). */
export function toPdfPrimitive(
  value: string | number | null | undefined,
  unit?: string
): PdfPrimitive {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "—";
    return unit ? `${value} ${unit}`.trim() : value;
  }
  const trimmed = value.trim();
  if (trimmed === "") return "—";
  return unit ? `${trimmed} ${unit}`.trim() : trimmed;
}

/** Sanitize a record so every value is a primitive string or number. */
export function sanitizePdfRecord(
  record: Record<string, PdfPrimitive | null | undefined>
): Record<string, PdfPrimitive> {
  const sanitized: Record<string, PdfPrimitive> = {};
  for (const [key, value] of Object.entries(record)) {
    sanitized[key] = toPdfPrimitive(value);
  }
  return sanitized;
}

/** Build inputs keyed by human-readable field labels. */
export function buildPdfInputs(
  values: Record<string, string>,
  fieldLabels: Record<string, string>
): Record<string, PdfPrimitive> {
  const inputs: Record<string, PdfPrimitive> = {};
  for (const [id, label] of Object.entries(fieldLabels)) {
    const key = label || id;
    inputs[key] = toPdfPrimitive(values[id]);
  }
  return inputs;
}

type PdfResultEntry =
  | string
  | number
  | null
  | undefined
  | { value: string | number | null | undefined; unit?: string };

/** Build results with only primitive string/number values. */
export function buildPdfResults(
  entries: Record<string, PdfResultEntry>
): Record<string, PdfPrimitive> {
  const results: Record<string, PdfPrimitive> = {};
  for (const [label, entry] of Object.entries(entries)) {
    if (entry === null || entry === undefined) continue;
    if (typeof entry === "object" && "value" in entry) {
      results[label] = toPdfPrimitive(entry.value, entry.unit);
    } else {
      results[label] = toPdfPrimitive(entry);
    }
  }
  return results;
}

/**
 * Generate and download a PDF report via the WattQuick API.
 * All calculators should use this function — do not call fetch directly.
 */
export async function generatePDFReport(
  calculatorName: string,
  inputs: Record<string, PdfPrimitive | null | undefined>,
  results: Record<string, PdfPrimitive | null | undefined>
): Promise<void> {
  const data: PdfReportData = {
    calculatorName: calculatorName.trim() || "WattQuick Calculator",
    inputs: sanitizePdfRecord(inputs),
    results: sanitizePdfRecord(results),
  };

  const response = await fetch(PDF_GENERATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed (${response.status})`);
  }

  const blob = await response.blob();
  const filename = `${slugifyFilename(data.calculatorName)}-report.pdf`;
  downloadBlob(blob, filename);
}
