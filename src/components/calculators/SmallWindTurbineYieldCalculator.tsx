"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateSmallWindTurbineYield } from "@/lib/calculators/green-home";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
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
import { WindTurbineVisual } from "@/components/calculator/wind-turbine-visual";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Wind } from "lucide-react";

const CALCULATOR_ID = "small-wind-turbine-yield" satisfies CalculatorId;

interface SmallWindTurbineYieldCalculatorProps {
  className?: string;
}

export function SmallWindTurbineYieldCalculator({
  className,
}: SmallWindTurbineYieldCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const bladeDiameterM = parsePositive(values.bladeDiameterM ?? "");
    const avgWindSpeedMs = parsePositive(values.avgWindSpeedMs ?? "");
    const efficiencyPercent = parsePositive(values.efficiencyPercent ?? "");
    if (
      bladeDiameterM === null ||
      avgWindSpeedMs === null ||
      efficiencyPercent === null ||
      efficiencyPercent > 100
    ) {
      return null;
    }
    return calculateSmallWindTurbineYield({
      bladeDiameterM,
      avgWindSpeedMs,
      efficiencyPercent,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const powerValue = parsed
    ? formatNumber(parsed.powerAtMeanWindW, { maxDecimals: 0 })
    : null;
  const powerDetail = parsed
    ? `${parsed.powerClassLabel} · ${parsed.sweptAreaSqM} m² swept · ~${formatNumber(parsed.meanPowerW, { maxDecimals: 0 })} W time-averaged`
    : null;

  const resultKey = parsed
    ? `${parsed.powerAtMeanWindW}-${parsed.dailyKwh}-${parsed.annualKwh}`
    : "empty";

  const windSpeed =
    parsed && values.avgWindSpeedMs
      ? parseFloat(values.avgWindSpeedMs)
      : 0;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || powerValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: powerValue, unit: "W" },
          "Estimated daily yield": `${formatNumber(parsed.dailyKwh, { maxDecimals: 2 })} kWh/day`,
          "Estimated annual yield": `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh/yr`,
          "Time-averaged power": `${formatNumber(parsed.meanPowerW, { maxDecimals: 0 })} W`,
          "Swept area": `${parsed.sweptAreaSqM} m²`,
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
    powerDetail,
    powerValue,
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
          label="Power at average wind"
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
              <div className="grid gap-8 sm:grid-cols-[minmax(160px,200px)_1fr] sm:items-center">
                <WindTurbineVisual
                  windSpeedMs={windSpeed}
                  windGaugeFillPercent={parsed.windGaugeFillPercent}
                  rotationDurationSec={parsed.rotationDurationSec}
                  className="sm:justify-self-center"
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={calculatorResultValue}>
                      <AnimatedCounter
                        target={parsed.powerAtMeanWindW}
                        decimals={0}
                      />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      W
                    </span>
                  </div>
                  {powerDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {powerDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </GamifiedDashboardFrame>
        }
      />

      {parsed?.exceedsBetzLimit ? (
          <div
            className="flex items-center gap-3 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
            role="status"
          >
            <Wind
              className="size-5 shrink-0 text-sky-600 dark:text-sky-400"
              aria-hidden
            />
            <span>
              Aerodynamic efficiency above ~59% (Betz limit) is not physical—use
              manufacturer overall system efficiency (often 25–40%).
            </span>
          </div>
        ) : null}

        {parsed && windSpeed < 2.5 ? (
          <div
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
            role="status"
          >
            <Wind className="size-5 shrink-0" aria-hidden />
            <span>
              Below ~2.5 m/s cut-in—most small turbines produce little or no
              usable power at this average wind speed.
            </span>
          </div>
        ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Estimated daily yield"
            value={
              parsed
                ? formatNumber(parsed.dailyKwh, { maxDecimals: 2 })
                : null
            }
            unit="kWh/day"
            detail={
              parsed
                ? `P ∝ v³ — doubling wind speed ≈ 8× power`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Estimated annual yield"
            value={
              parsed
                ? formatNumber(parsed.annualKwh, { maxDecimals: 0 })
                : null
            }
            unit="kWh/yr"
            detail={
              parsed
                ? `${formatNumber(parsed.annualKwh / 12, { maxDecimals: 0 })} kWh/mo avg · planning estimate`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3 text-sm text-foreground/90">
            <Wind
              className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400"
              aria-hidden
            />
            <p>
              Height, terrain, and turbulence matter as much as nameplate
              diameter—verify with a mast or year of anemometer data before
              sizing hybrid solar+wind storage.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={powerValue}
          unit="W"
          detail={powerDetail}
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
