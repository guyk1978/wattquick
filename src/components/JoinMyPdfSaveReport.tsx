"use client";

import { FileDown, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import { calculatorCommandBtn, calculatorCommandPdfSection } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface JoinMyPdfSaveReportProps {
  calculatorTitle: string;
  resultLabel: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  values: Record<string, string>;
  fieldLabels: Record<string, string>;
  onSaveToPdf?: () => Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
  className?: string;
}

export function JoinMyPdfSaveReport({
  calculatorTitle,
  resultLabel,
  value,
  unit,
  detail,
  values,
  fieldLabels,
  onSaveToPdf,
  isSaving: isSavingProp,
  saveError: saveErrorProp,
  className,
}: JoinMyPdfSaveReportProps) {
  const [internalSaving, setInternalSaving] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const hasResult = value !== null;
  const isSaving = isSavingProp ?? internalSaving;
  const saveError = saveErrorProp ?? internalError;

  const defaultSaveToPdf = useCallback(async () => {
    if (!hasResult || value === null) return;

    setInternalSaving(true);
    setInternalError(null);
    try {
      await generatePDFReport(calculatorTitle, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [resultLabel]: { value, unit },
          ...(detail ? { Notes: detail } : {}),
        }));
    } catch {
      setInternalError("Could not generate PDF. Please try again.");
    } finally {
      setInternalSaving(false);
    }
  }, [
    calculatorTitle,
    detail,
    fieldLabels,
    hasResult,
    resultLabel,
    unit,
    value,
    values,
  ]);

  const handleSave = onSaveToPdf ?? defaultSaveToPdf;

  if (!hasResult) return null;

  return (
    <section
      className={cn(calculatorCommandPdfSection, className)}
      aria-label="Save calculation report"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Save Report:</span>{" "}
          Download your battery and solar calculation specs as a private PDF via{" "}
          <span className="font-medium text-foreground">JoinMyPDF</span>.
          {saveError ? (
            <span className="mt-1 block text-xs text-destructive">{saveError}</span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          aria-busy={isSaving}
          className={cn(
            calculatorCommandBtn,
            "inline-flex h-11 shrink-0 items-center justify-center gap-2 px-5 text-sm font-semibold text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isSaving && "cursor-wait opacity-80"
          )}
        >
          {isSaving ? (
            <Loader2 className="size-4 animate-spin text-primary" aria-hidden />
          ) : (
            <FileDown className="size-4 text-primary" aria-hidden />
          )}
          {isSaving ? "Generating PDF…" : "Save via JoinMyPDF"}
        </button>
      </div>
    </section>
  );
}
