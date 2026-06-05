"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateSolarWaterHeaterEfficiency } from "@/lib/calculators/green-home";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
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
import { HeatGaugeVisual } from "@/components/calculator/heat-gauge-visual";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Flame, Sun } from "lucide-react";

const CALCULATOR_ID = "solar-water-heater-efficiency" satisfies CalculatorId;

interface SolarWaterHeaterEfficiencyCalculatorProps {
  className?: string;
}

export function SolarWaterHeaterEfficiencyCalculator({
  className,
}: SolarWaterHeaterEfficiencyCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const tankVolumeLiters = parsePositive(values.tankVolumeLiters ?? "");
    const deltaTempC = parsePositive(values.deltaTempC ?? "");
    const sunExposureHours = parsePositive(values.sunExposureHours ?? "");
    const collectorAreaSqM = parsePositive(values.collectorAreaSqM ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "") ?? 0.14;
    if (
      tankVolumeLiters === null ||
      deltaTempC === null ||
      sunExposureHours === null ||
      collectorAreaSqM === null
    ) {
      return null;
    }
    return calculateSolarWaterHeaterEfficiency({
      tankVolumeLiters,
      deltaTempC,
      sunExposureHours,
      collectorAreaSqM,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const efficiencyValue = parsed
    ? formatNumber(parsed.thermalEfficiencyPercent, { maxDecimals: 1 })
    : null;
  const efficiencyDetail = parsed
    ? `${parsed.incidentSolarKwh} kWh incident solar · ${parsed.solarCoveragePercent}% of aperture energy vs. tank load`
    : null;

  const resultKey = parsed
    ? `${parsed.thermalEfficiencyPercent}-${parsed.energyAbsorbedKwh}-${parsed.electricSavings}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || efficiencyValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: efficiencyValue, unit: "%" },
          "Energy absorbed (water)": `${formatNumber(parsed.energyAbsorbedKwh, { maxDecimals: 2 })} kWh`,
          "Savings vs. electric": formatCurrency(parsed.electricSavings),
          "Incident solar energy": `${formatNumber(parsed.incidentSolarKwh, { maxDecimals: 2 })} kWh`,
          "Solar coverage": `${parsed.solarCoveragePercent}%`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    efficiencyDetail,
    efficiencyValue,
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
          <GamifiedDashboardFrame
          accent="primary"
          label="Thermal efficiency"
          ambientClassName="bg-orange-500/[0.12] dark:bg-orange-500/[0.2]"
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
                <HeatGaugeVisual
                  fillPercent={parsed.heatGaugeFillPercent}
                  className="sm:justify-self-center"
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={calculatorResultValue}>
                      <AnimatedCounter
                        target={parsed.thermalEfficiencyPercent}
                        decimals={1}
                      />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      %
                    </span>
                  </div>
                  {efficiencyDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {efficiencyDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          </GamifiedDashboardFrame>
        }
      />

      {parsed?.exceedsTypicalCollector ? (
        <div
          className="flex items-center gap-3 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Sun
            className="size-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <span>
            Solar input exceeds typical flat-plate delivery—verify sun-hour
            estimates or you may have surplus aperture area for this tank
            load.
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Energy absorbed (water)"
            value={
              parsed
                ? formatNumber(parsed.energyAbsorbedKwh, { maxDecimals: 2 })
                : null
            }
            unit="kWh"
            detail={
              parsed
                ? `ΔT ${values.deltaTempC ?? "—"}°C · ${values.tankVolumeLiters ?? "—"} L tank`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Savings vs. electric"
            value={parsed ? formatCurrency(parsed.electricSavings) : null}
            unit="/session"
            detail={
              parsed
                ? `Same ${formatNumber(parsed.energyAbsorbedKwh, { maxDecimals: 2 })} kWh at ${formatCurrency(parseFloat(values.ratePerKwh ?? "0.14") || 0.14)}/kWh resistance heat`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Flame
              className="mt-0.5 size-4 shrink-0 text-orange-600 dark:text-orange-400"
              aria-hidden
            />
            <p>
              Log inlet and outlet temperatures on clear days, then compare
              modeled kWh to your metered backup element use—drift in
              efficiency often points to scale, shading, or insulation before
              you replace collectors.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={efficiencyValue}
          unit="%"
          detail={efficiencyDetail}
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
