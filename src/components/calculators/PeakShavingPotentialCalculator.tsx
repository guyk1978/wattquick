"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculatePeakShavingPotential } from "@/lib/calculators/tariffs";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { PeakShavingCostVisual } from "@/components/calculator/peak-shaving-cost-visual";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Clock, TrendingDown } from "lucide-react";

const CALCULATOR_ID = "peak-shaving-potential" satisfies CalculatorId;

interface PeakShavingPotentialCalculatorProps {
  className?: string;
}

export function PeakShavingPotentialCalculator({
  className,
}: PeakShavingPotentialCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const peakKwh = parsePositive(values.peakKwh ?? "");
    const offPeakKwh = parsePositive(values.offPeakKwh ?? "");
    const peakRate = parsePositive(values.peakRate ?? "");
    const offPeakRate = parsePositive(values.offPeakRate ?? "");
    const shiftablePercent = Number(values.shiftablePercent?.trim() || "40");
    if (
      peakKwh === null ||
      offPeakKwh === null ||
      peakRate === null ||
      offPeakRate === null ||
      !Number.isFinite(shiftablePercent) ||
      shiftablePercent < 0 ||
      shiftablePercent > 100
    ) {
      return null;
    }
    return calculatePeakShavingPotential({
      peakKwh,
      offPeakKwh,
      peakRatePerKwh: peakRate,
      offPeakRatePerKwh: offPeakRate,
      shiftablePercent,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const monthlySavingsValue = parsed
    ? formatCurrency(parsed.monthlySavings)
    : null;
  const monthlySavingsDetail = parsed
    ? `${formatCurrency(parsed.beforeCost)} → ${formatCurrency(parsed.afterCost)} bill · ${parsed.shiftableKwh} kWh shifted · $${parsed.savingsPerKwh}/kWh spread`
    : null;

  const resultKey = parsed
    ? `${parsed.monthlySavings}-${parsed.afterCost}-${parsed.shiftableKwh}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || monthlySavingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: monthlySavingsValue, unit: "/mo" },
          "Annual savings": formatCurrency(parsed.annualSavings),
          "Shiftable load moved": `${formatNumber(parsed.shiftableKwh, { maxDecimals: 1 })} kWh/mo`,
          "Bill before shifting": formatCurrency(parsed.beforeCost),
          "Bill after shifting": formatCurrency(parsed.afterCost),
          "Bill reduction": `${formatNumber(parsed.billReductionPercent, { maxDecimals: 1 })}%`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    fieldLabels,
    monthlySavingsDetail,
    monthlySavingsValue,
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
          <GamifiedDashboardFrame
          accent="cost"
          label="Estimated monthly savings"
          ambientClassName="bg-emerald-500/[0.1] dark:bg-emerald-500/[0.18]"
        >
          <div
            key={resultKey}
            className={cn(
              "mt-5 transition-opacity duration-200",
              "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:fill-mode-both",
              !parsed && "opacity-70"
            )}
          >
            {!parsed ? (
              <p className="text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
                {definition.result.emptyMessage}
              </p>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(200px,1fr)_minmax(140px,1fr)] lg:items-center">
                <PeakShavingCostVisual
                  beforeCost={parsed.beforeCost}
                  afterCost={parsed.afterCost}
                  beforeBarPercent={parsed.beforeBarPercent}
                  afterBarPercent={parsed.afterBarPercent}
                  monthlySavings={parsed.monthlySavings}
                />
                <div className="flex min-w-0 flex-col gap-4">
                  {parsed.beforeCost > parsed.afterCost ? (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80 line-through decoration-red-500/60 decoration-2">
                        {formatCurrency(parsed.beforeCost)}
                      </span>
                      <span className="mx-2 text-muted-foreground/50" aria-hidden>
                        →
                      </span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                        {formatCurrency(parsed.afterCost)}
                      </span>
                      <span className="text-muted-foreground"> /mo</span>
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={calculatorResultValue}>
                      $
                      <AnimatedCounter
                        target={parsed.monthlySavings}
                        decimals={2}
                      />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      /mo saved
                    </span>
                  </div>
                  <ResultInterpreter
                    calculatorId={CALCULATOR_ID}
                    value={formatCurrency(parsed.monthlySavings)}
                    unit="/mo"
                    detail={monthlySavingsDetail}
                    values={values}
                  />
                  {monthlySavingsDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {monthlySavingsDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          </GamifiedDashboardFrame>
        }
      />

      {parsed && parsed.monthlySavings <= 0 ? (
        <div
          className="flex items-center gap-3 rounded-none border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
          role="status"
        >
          <Clock className="size-5 shrink-0" aria-hidden />
          <span>
            Peak rate must exceed off-peak rate for savings—check your tariff
            schedule labels.
          </span>
        </div>
      ) : null}

      <div className="calculator-secondary-results">
          <CalculatorResult
            label="Annual savings"
            value={parsed ? formatCurrency(parsed.annualSavings) : null}
            unit="/yr"
            detail={
              parsed
                ? `${formatNumber(parsed.billReductionPercent, { maxDecimals: 1 })}% lower energy bill from shifting`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Shiftable load moved"
            value={
              parsed
                ? formatNumber(parsed.shiftableKwh, { maxDecimals: 1 })
                : null
            }
            unit="kWh/mo"
            detail={
              parsed
                ? `${values.shiftablePercent ?? "40"}% of ${values.peakKwh ?? "—"} kWh peak use`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed && parsed.monthlySavings > 0 ? (
          <div className="flex items-start gap-3 rounded-none border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-foreground/90">
            <TrendingDown
              className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            <p>
              Automate EV, dishwasher, and laundry into off-peak windows to
              approach your {values.shiftablePercent ?? "40"}% shift target—each
              kWh moved saves ${parsed.savingsPerKwh} at current rates.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={monthlySavingsValue}
          unit="/mo"
          detail={monthlySavingsDetail}
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
