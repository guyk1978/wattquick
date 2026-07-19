"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateAcInrushCurrent } from "@/lib/calculators/electrical";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { InrushSpikeVisual } from "@/components/calculator/inrush-spike-visual";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Bolt, Zap } from "lucide-react";

const CALCULATOR_ID = "ac-inrush-current" satisfies CalculatorId;

interface AcInrushCurrentCalculatorProps {
  className?: string;
}

export function AcInrushCurrentCalculator({
  className,
}: AcInrushCurrentCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const nominalPowerW = parsePositive(values.nominalPowerW ?? "");
    const operatingVoltageV = parsePositive(values.operatingVoltageV ?? "");
    const inrushFactor = parsePositive(values.inrushFactor ?? "");
    if (
      nominalPowerW === null ||
      operatingVoltageV === null ||
      inrushFactor === null ||
      inrushFactor < 1
    ) {
      return null;
    }
    return calculateAcInrushCurrent({
      nominalPowerW,
      operatingVoltageV,
      inrushFactor,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const peakValue = parsed
    ? formatNumber(parsed.peakInrushAmps, { maxDecimals: 1 })
    : null;
  const peakDetail = parsed
    ? `${parsed.inrushRatio}× running current · ${parsed.recommendation}`
    : null;

  const resultKey = parsed
    ? `${parsed.peakInrushAmps}-${parsed.recommendedBreakerAmps}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || peakValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: peakValue, unit: "A" },
          "Nominal running current": `${formatNumber(parsed.nominalAmps, { maxDecimals: 2 })} A`,
          "Recommended breaker": `${parsed.recommendedBreakerAmps} A (${parsed.recommendedCurveType})`,
          "Inrush ratio": `${parsed.inrushRatio}×`,
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
    parsed,
    peakDetail,
    peakValue,
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
          accent="primary"
          label="Peak inrush current"
          ambientClassName="bg-amber-500/[0.12] dark:bg-amber-500/[0.18]"
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
              <div className="grid gap-8 sm:grid-cols-[minmax(200px,1fr)_minmax(140px,1fr)] sm:items-center">
                <InrushSpikeVisual
                  nominalAmps={parsed.nominalAmps}
                  peakInrushAmps={parsed.peakInrushAmps}
                  nominalBarPercent={parsed.nominalBarPercent}
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={calculatorResultValue}>
                      <AnimatedCounter
                        target={parsed.peakInrushAmps}
                        decimals={1}
                      />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      A peak
                    </span>
                  </div>
                  <ResultInterpreter
                    calculatorId={CALCULATOR_ID}
                    value={String(parsed.peakInrushAmps)}
                    unit="A peak"
                    detail={peakDetail}
                    values={values}
                  />
                  {peakDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {peakDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          </GamifiedDashboardFrame>
        }
      />

      {parsed && parsed.inrushRatio >= 7 ? (
        <div
          className="flex items-center gap-3 rounded-none border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Bolt
            className="size-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <span>
            High inrush ({parsed.inrushRatio}×)—use {parsed.recommendedCurveType}{" "}
            breakers or motor soft-start; Type B may nuisance-trip on startup.
          </span>
        </div>
      ) : null}

      <div className="calculator-secondary-results">
          <CalculatorResult
            label="Nominal running current"
            value={
              parsed
                ? formatNumber(parsed.nominalAmps, { maxDecimals: 2 })
                : null
            }
            unit="A"
            detail={
              parsed
                ? `${values.nominalPowerW ?? "—"} W ÷ ${values.operatingVoltageV ?? "—"} V`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Recommended breaker"
            value={parsed ? `${parsed.recommendedBreakerAmps}` : null}
            unit="A"
            detail={
              parsed
                ? `${parsed.recommendedCurveType} · ~${parsed.magneticTripMultiple}× magnetic trip · ≥125% run amps`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-none border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Zap className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <p>
              Inrush lasts milliseconds—breakers tolerate brief magnetic overload.
              Size wire for continuous{" "}
              {formatNumber(parsed.nominalAmps, { maxDecimals: 2 })} A, not peak alone.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={peakValue}
          unit="A"
          detail={peakDetail}
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
