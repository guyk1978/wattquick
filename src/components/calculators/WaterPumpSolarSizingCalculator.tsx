"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateWaterPumpSolarSizing } from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { WaterGaugeVisual } from "@/components/calculator/water-gauge-visual";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Cpu, Droplets } from "lucide-react";

const CALCULATOR_ID = "water-pump-solar-sizing" satisfies CalculatorId;

interface WaterPumpSolarSizingCalculatorProps {
  className?: string;
}

export function WaterPumpSolarSizingCalculator({
  className,
}: WaterPumpSolarSizingCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const pumpWatts = parsePositive(values.pumpWatts ?? "");
    const dailyHours = parsePositive(values.dailyHours ?? "");
    const headMeters = parseNonNegative(values.headMeters ?? "");
    const peakSunHours = parsePositive(values.peakSunHours ?? "");
    if (
      pumpWatts === null ||
      dailyHours === null ||
      headMeters === null ||
      peakSunHours === null
    ) {
      return null;
    }
    return calculateWaterPumpSolarSizing({
      pumpWatts,
      dailyHours,
      headMeters,
      peakSunHours,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const kWpValue = parsed
    ? formatNumber(parsed.kWp, { maxDecimals: 2 })
    : null;
  const kWpDetail = parsed
    ? `${parsed.dailyKwh} kWh/day load · head factor ×${formatNumber(parsed.headMultiplier, { maxDecimals: 2 })}`
    : null;

  const resultKey = parsed
    ? `${parsed.kWp}-${parsed.panelCount}-${parsed.mppt}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || kWpValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: kWpValue, unit: "kWp" },
          "Estimated panels": `${parsed.panelCount} × ${parsed.panelWatts} W`,
          "Daily pump energy": `${formatNumber(parsed.dailyKwh, { maxDecimals: 2 })} kWh/day`,
          "MPPT recommendation": parsed.mpptLabel,
          "Head multiplier": parsed.headMultiplier,
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
    kWpDetail,
    kWpValue,
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
          accent="primary"
          label="Required solar array"
          ambientClassName="bg-sky-500/[0.12] dark:bg-sky-500/[0.2]"
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
              <div className="grid gap-8 sm:grid-cols-[minmax(120px,150px)_1fr] sm:items-center">
                <WaterGaugeVisual
                  fillPercent={parsed.gaugeFillPercent}
                  className="sm:justify-self-center"
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={calculatorResultValue}>
                      <AnimatedCounter target={parsed.kWp} decimals={2} />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      kWp
                    </span>
                  </div>
                  {kWpDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {kWpDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          </GamifiedDashboardFrame>
        }
      />

      {parsed ? (
        <div
          className="flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Droplets
            className="size-5 shrink-0 text-sky-500 dark:text-sky-400"
            aria-hidden
          />
          <span>{parsed.mpptLabel}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Estimated panels"
            value={parsed ? `${parsed.panelCount}` : null}
            unit={`× ${parsed?.panelWatts ?? 400} W`}
            detail={
              parsed
                ? `~${formatNumber((parsed.panelCount * parsed.panelWatts) / 1000, { maxDecimals: 2 })} kW nameplate`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Daily pump energy"
            value={
              parsed
                ? formatNumber(parsed.dailyKwh, { maxDecimals: 2 })
                : null
            }
            unit="kWh/day"
            detail={
              parsed
                ? `${formatNumber(parsed.dailyWh, { maxDecimals: 0 })} Wh with ${formatNumber(parseFloat(values.headMeters ?? "0") || 0, { maxDecimals: 0 })} m head`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed && parsed.mppt !== "optional" ? (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Cpu className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
            <p>
              {parsed.mppt === "strongly-recommended"
                ? "High lift or array size: pair an MPPT controller with proper Voc/Isc limits and consider surge-rated inverter output for AC submersible starts."
                : "MPPT improves harvest when panel Vmp differs from battery voltage—match controller amperage to array Isc at operating temperature."}
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={kWpValue}
          unit="kWp"
          detail={kWpDetail}
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
