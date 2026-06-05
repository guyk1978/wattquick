"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEvTireWearCost } from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { TireTreadVisual } from "@/components/calculator/tire-tread-visual";
import { cn } from "@/lib/utils";
import { LifeBuoy } from "lucide-react";

const CALCULATOR_ID = "ev-tire-wear-cost" satisfies CalculatorId;

interface EvTireWearCostCalculatorProps {
  className?: string;
}

export function EvTireWearCostCalculator({
  className,
}: EvTireWearCostCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const annualKm = parsePositive(values.annualKm ?? "");
    const tireSetCost = parsePositive(values.tireSetCost ?? "");
    const iceTireLifeKm = parsePositive(values.iceTireLifeKm ?? "");
    const evWearPercent = Number(values.evWearPercent?.trim() || "25");
    if (
      annualKm === null ||
      tireSetCost === null ||
      iceTireLifeKm === null ||
      !Number.isFinite(evWearPercent) ||
      evWearPercent < 0
    ) {
      return null;
    }
    return calculateEvTireWearCost({
      annualKm,
      tireSetCost,
      iceTireLifeKm,
      evWearPercent,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const evAnnualValue = parsed ? formatCurrency(parsed.evAnnualCost) : null;
  const evAnnualDetail = parsed
    ? `${formatNumber(parsed.evSetsPerYear, { maxDecimals: 2 })} sets/yr · ${formatNumber(parsed.costPerKmEv, { maxDecimals: 3 })} $/km`
    : null;

  const resultKey = parsed
    ? `${parsed.evAnnualCost}-${parsed.extraCostVsIce}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || evAnnualValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          "Annual EV tire depreciation": { value: evAnnualValue, unit: "/yr" },
          "ICE reference (annual)": formatCurrency(parsed.iceAnnualCost),
          "Extra cost vs. ICE": formatCurrency(parsed.extraCostVsIce),
          "EV tire life": `${formatNumber(parsed.evTireLifeKm, { maxDecimals: 0 })} km`,
          "ICE tire life": `${formatNumber(parsed.iceTireLifeKm, { maxDecimals: 0 })} km`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    evAnnualDetail,
    evAnnualValue,
    fieldLabels,
    parsed,
    values,
  ]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <CalculatorInputs
            fields={definition.fields}
            values={values}
            onChange={setValue}
          />
        }
        results={
          <CostGamifiedResult
            calculatorId={CALCULATOR_ID}
            label="Annual EV tire depreciation"
            value={evAnnualValue}
            unit="/yr"
            detail={evAnnualDetail}
            emptyMessage={definition.result.emptyMessage}
          />
        }
      />

      {parsed ? (
        <div
          className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <LifeBuoy
            className="size-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <span>
            EV tires last ~{formatNumber(parsed.evTireLifeKm, { maxDecimals: 0 })} km vs{" "}
            {formatNumber(parsed.iceTireLifeKm, { maxDecimals: 0 })} km ICE (
            {formatNumber((parsed.wearFactor - 1) * 100, { maxDecimals: 0 })}% faster wear)
          </span>
        </div>
      ) : null}

      {parsed ? (
        <TireTreadVisual
          key={resultKey}
          iceRemainingPercent={parsed.iceTreadRemainingPercent}
          evRemainingPercent={parsed.evTreadRemainingPercent}
          className="sm:justify-self-center"
        />
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="ICE reference (annual)"
            value={parsed ? formatCurrency(parsed.iceAnnualCost) : null}
            unit="/yr"
            detail={
              parsed
                ? `${formatNumber(parsed.iceSetsPerYear, { maxDecimals: 2 })} sets/yr · ${formatNumber(parsed.costPerKmIce, { maxDecimals: 3 })} $/km`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Extra cost vs. ICE"
            value={parsed ? formatCurrency(parsed.extraCostVsIce) : null}
            unit="/yr"
            detail={
              parsed
                ? parsed.extraCostVsIce > 0
                  ? "Hidden TCO line item from torque, mass & EV compounds"
                  : "No premium at this wear assumption"
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={evAnnualValue}
          unit="/yr"
          detail={evAnnualDetail}
          values={values}
          fieldLabels={fieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

      <ShareButtons title={definition.title} className="pt-1" />
    </CalculatorCommandShell>
  );
}
