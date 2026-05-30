"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateBatteryCalendarAging } from "@/lib/calculators/battery";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { SohGaugeVisual } from "@/components/calculator/soh-gauge-visual";
import { glassPanel, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Calendar, Thermometer } from "lucide-react";

const CALCULATOR_ID = "battery-calendar-aging" satisfies CalculatorId;

interface BatteryCalendarAgingCalculatorProps {
  className?: string;
}

export function BatteryCalendarAgingCalculator({
  className,
}: BatteryCalendarAgingCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const tempRaw = values.avgStorageTempC?.trim() ?? "";
    const avgStorageTempC =
      tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);
    const avgSocPercent = parsePositive(values.avgSocPercent ?? "");
    const batteryAgeYears = parseNonNegative(values.batteryAgeYears ?? "");
    if (
      avgStorageTempC === null ||
      !Number.isFinite(avgStorageTempC) ||
      avgSocPercent === null ||
      avgSocPercent > 100 ||
      batteryAgeYears === null
    ) {
      return null;
    }
    return calculateBatteryCalendarAging({
      avgStorageTempC,
      avgSocPercent,
      batteryAgeYears,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const sohValue = parsed
    ? formatNumber(parsed.remainingSoh, { maxDecimals: 1 })
    : null;
  const sohDetail = parsed
    ? `${parsed.statusLabel} · ~${formatNumber(parsed.annualLossPercent, { maxDecimals: 2 })}%/yr calendar fade at these conditions`
    : null;

  const resultKey = parsed
    ? `${parsed.remainingSoh}-${parsed.calendarLossPercent}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || sohValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: sohValue, unit: "% SoH" },
          "Calendar capacity loss": `${formatNumber(parsed.calendarLossPercent, { maxDecimals: 1 })}%`,
          "Estimated fade rate": `${formatNumber(parsed.annualLossPercent, { maxDecimals: 2 })}%/yr`,
          Status: parsed.statusLabel,
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
    sohDetail,
    sohValue,
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

        {parsed &&
        (parseFloat(values.avgStorageTempC ?? "25") >= 35 ||
          parseFloat(values.avgSocPercent ?? "50") >= 90) ? (
          <div
            className="flex items-center gap-3 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
            role="status"
          >
            <Thermometer
              className="size-5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden
            />
            <span>
              High temperature and/or very high average SOC accelerate calendar
              fade—store near 50% charge and cool, dry conditions when possible.
            </span>
          </div>
        ) : null}

        <div className="h-px bg-border/60" aria-hidden />

        <GamifiedDashboardFrame
          accent="battery"
          label="Remaining capacity (SoH)"
          ambientClassName="bg-[#22C55E]/[0.12] dark:bg-[#22C55E]/[0.2]"
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
              <div className="grid gap-8 sm:grid-cols-[minmax(140px,180px)_1fr] sm:items-center">
                <SohGaugeVisual
                  sohPercent={parsed.remainingSoh}
                  glow={parsed.glow}
                  className="sm:justify-self-center"
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={neonHeroNumber}>
                      <AnimatedCounter target={parsed.remainingSoh} decimals={1} />
                    </span>
                    <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                      % SoH
                    </span>
                  </div>
                  {sohDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {sohDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </GamifiedDashboardFrame>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Calendar capacity loss"
            value={
              parsed
                ? formatNumber(parsed.calendarLossPercent, { maxDecimals: 1 })
                : null
            }
            unit="%"
            detail={
              parsed
                ? `Chemical time-based fade over ${values.batteryAgeYears ?? "0"} yr · temp ×${parsed.tempFactor} · SOC ×${parsed.socFactor}`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Estimated fade rate"
            value={
              parsed
                ? formatNumber(parsed.annualLossPercent, { maxDecimals: 2 })
                : null
            }
            unit="%/yr"
            detail={
              parsed
                ? "At current storage temp & SOC—add cycle aging separately"
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Calendar className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <p>
              Calendar aging happens on the shelf—backup packs, seasonal EVs, and
              warehouse spares lose capacity even at zero cycles. Model storage,
              not driving, with this tool.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={sohValue}
          unit="% SoH"
          detail={sohDetail}
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
