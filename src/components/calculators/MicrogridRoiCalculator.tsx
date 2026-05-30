"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateMicrogridRoi } from "@/lib/calculators/green-home";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "microgrid-roi" satisfies CalculatorId;

interface MicrogridRoiCalculatorProps {
  className?: string;
}

export function MicrogridRoiCalculator({ className }: MicrogridRoiCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const cost = parsePositive(values.initialSetupCost ?? "");
    const savings = parsePositive(values.monthlySavings ?? "");
    const maintenance = parsePositive(values.monthlyMaintenance ?? "");
    const inflation = Number(values.annualInflationPercent?.trim() || "3");
    if (
      cost === null ||
      savings === null ||
      maintenance === null ||
      !Number.isFinite(inflation) ||
      inflation < 0
    ) {
      return null;
    }
    return calculateMicrogridRoi({
      initialSetupCost: cost,
      monthlySavings: savings,
      monthlyMaintenance: maintenance,
      annualInflationPercent: inflation,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const breakEvenValue =
    parsed?.breakEvenYears != null
      ? formatNumber(parsed.breakEvenYears, { maxDecimals: 1 })
      : null;

  const breakEvenDetail =
    parsed === null
      ? null
      : parsed.breakEvenYears === null
        ? parsed.monthlyNet <= 0
          ? "Monthly savings must exceed maintenance for a positive payback"
          : "Break-even exceeds 50 years with these inputs"
        : `Net ${formatCurrency(parsed.monthlyNet)}/mo after maintenance · inflation-adjusted savings`;

  const primaryForPdf = {
    value: breakEvenValue,
    unit: "years" as const,
    detail: breakEvenDetail,
  };

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || breakEvenValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: breakEvenValue, unit: "years" },
          "10-year cumulative ROI": `${parsed.roi10Years}%`,
          "20-year cumulative ROI": `${parsed.roi20Years}%`,
          "10-year cumulative cash": formatCurrency(parsed.cumulative10),
          "20-year cumulative cash": formatCurrency(parsed.cumulative20),
          "Monthly net savings": formatCurrency(parsed.monthlyNet),
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    breakEvenDetail,
    breakEvenValue,
    definition.result.label,
    definition.title,
    fieldLabels,
    parsed,
    values,
  ]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={setValue}
        />

        <div className="h-px bg-border/60" aria-hidden />

        <div className="flex flex-col gap-4">
          <CalculatorResult
            label="Break-even point"
            value={breakEvenValue}
            unit="years"
            detail={breakEvenDetail}
            emptyMessage={definition.result.emptyMessage}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CalculatorResult
              label="10-year cumulative ROI"
              value={parsed ? `${parsed.roi10Years}` : null}
              unit="%"
              detail={
                parsed
                  ? `${formatCurrency(parsed.cumulative10)} total cash in (10 yr)`
                  : null
              }
              emptyMessage="Enter values above"
              className="sm:col-span-1"
            />
            <CalculatorResult
              label="20-year cumulative ROI"
              value={parsed ? `${parsed.roi20Years}` : null}
              unit="%"
              detail={
                parsed
                  ? `${formatCurrency(parsed.cumulative20)} total cash in (20 yr)`
                  : null
              }
              emptyMessage="Enter values above"
              className="sm:col-span-1"
            />
          </div>
        </div>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={primaryForPdf.value}
          unit={primaryForPdf.unit}
          detail={primaryForPdf.detail}
          values={values}
          fieldLabels={fieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

        <ShareButtons title={definition.title} className="pt-1" />
      </div>
    </div>
  );
}
