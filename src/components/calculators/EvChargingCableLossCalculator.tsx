"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEvChargingCableLoss } from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { EvCableLossVisual } from "@/components/calculator/ev-cable-loss-visual";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { glassPanel, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Cable, Flame, Zap } from "lucide-react";

const CALCULATOR_ID = "ev-charging-cable-loss" satisfies CalculatorId;

interface EvChargingCableLossCalculatorProps {
  className?: string;
}

export function EvChargingCableLossCalculator({
  className,
}: EvChargingCableLossCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const chargeAmps = parsePositive(values.chargeAmps ?? "");
    const cableLengthM = parsePositive(values.cableLengthM ?? "");
    const crossSectionMm2 = parsePositive(values.crossSectionMm2 ?? "");
    const chargeHours = parsePositive(values.chargeHours ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "") ?? 0.14;
    if (
      chargeAmps === null ||
      cableLengthM === null ||
      crossSectionMm2 === null ||
      chargeHours === null
    ) {
      return null;
    }
    return calculateEvChargingCableLoss({
      chargeAmps,
      cableLengthM,
      crossSectionMm2,
      chargeHours,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const lossWValue = parsed
    ? formatNumber(parsed.powerLossW, { maxDecimals: 1 })
    : null;
  const lossWDetail = parsed
    ? `${parsed.wireLabel} · ${parsed.roundTripOhms} Ω round-trip · ~${formatNumber(parsed.lossPercentOfChargePower, { maxDecimals: 1 })}% of ${values.chargeAmps ?? "—"} A @ 230 V`
    : null;

  const resultKey = parsed
    ? `${parsed.powerLossW}-${parsed.energyLossKwh}-${parsed.sessionCost}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || lossWValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: lossWValue, unit: "W" },
          "Wasted energy": `${formatNumber(parsed.energyLossKwh, { maxDecimals: 2 })} kWh`,
          "Heat loss cost": formatCurrency(parsed.sessionCost),
          "Loss percent of charge power": `${formatNumber(parsed.lossPercentOfChargePower, { maxDecimals: 1 })}%`,
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
    lossWDetail,
    lossWValue,
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

        {parsed && parsed.powerLossW > 80 ? (
          <div
            className="flex items-center gap-3 rounded-xl border border-orange-500/35 bg-orange-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
            role="status"
          >
            <Flame
              className="size-5 shrink-0 text-orange-600 dark:text-orange-400"
              aria-hidden
            />
            <span>
              High I²R loss—upsizing conductor or shortening the run reduces heat
              and may improve charge speed if voltage sag was limiting current.
            </span>
          </div>
        ) : null}

        <div className="h-px bg-border/60" aria-hidden />

        <GamifiedDashboardFrame
          accent="primary"
          label="Cable power loss"
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
              <div className="grid gap-8 sm:grid-cols-[minmax(120px,200px)_1fr] sm:items-center">
                <EvCableLossVisual
                  powerLossW={parsed.powerLossW}
                  energyLossKwh={parsed.energyLossKwh}
                  fillPercent={parsed.heatVisualFillPercent}
                  className="sm:justify-self-center"
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={neonHeroNumber}>
                      <AnimatedCounter target={parsed.powerLossW} decimals={1} />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      W
                    </span>
                  </div>
                  {lossWDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {lossWDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </GamifiedDashboardFrame>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Wasted energy"
            value={
              parsed
                ? formatNumber(parsed.energyLossKwh, { maxDecimals: 2 })
                : null
            }
            unit="kWh"
            detail={
              parsed
                ? `${values.chargeHours ?? "—"} h session · ${values.chargeAmps ?? "—"} A continuous`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Heat loss cost"
            value={parsed ? formatCurrency(parsed.sessionCost) : null}
            unit="/session"
            detail={
              parsed
                ? `At ${formatCurrency(parseFloat(values.ratePerKwh ?? "0.14") || 0.14)}/kWh — energy you paid for but did not reach the pack`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Cable className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <p>
              <Zap className="mr-1 inline size-3.5 text-amber-500" aria-hidden />
              Doubling cable length doubles resistance; halving mm² doubles loss at
              the same amps—size for your longest habitual run.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={lossWValue}
          unit="W"
          detail={lossWDetail}
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
