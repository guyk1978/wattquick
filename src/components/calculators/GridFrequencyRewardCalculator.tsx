"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  buildGridFrequencyAvailabilityScenarios,
  calculateGridFrequencyReward,
  type GridFrequencyRateType,
} from "@/lib/calculators/tariffs";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Activity, TrendingUp } from "lucide-react";

const CALCULATOR_ID = "grid-frequency-reward" satisfies CalculatorId;

interface GridFrequencyRewardCalculatorProps {
  className?: string;
}

export function GridFrequencyRewardCalculator({
  className,
}: GridFrequencyRewardCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const availableKw = parsePositive(values.availableKw ?? "");
    const participationHours = parsePositive(values.participationHours ?? "");
    const rewardRate = parsePositive(values.rewardRate ?? "");
    const rateType = values.rateType as GridFrequencyRateType;
    const availabilityPercent = Number(
      values.availabilityPercent?.trim() || "90"
    );
    if (
      availableKw === null ||
      participationHours === null ||
      rewardRate === null ||
      !["kw-month", "kwh"].includes(rateType) ||
      !Number.isFinite(availabilityPercent) ||
      availabilityPercent < 0 ||
      availabilityPercent > 100
    ) {
      return null;
    }
    const input = {
      availableKw,
      participationHoursPerDay: participationHours,
      rewardRate,
      rateType,
      availabilityPercent,
    };
    return {
      result: calculateGridFrequencyReward(input),
      scenarios: buildGridFrequencyAvailabilityScenarios(
        input,
        availabilityPercent
      ),
      rateType,
    };
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const monthlyValue = parsed
    ? formatCurrency(parsed.result.monthlyRevenue)
    : null;
  const monthlyDetail = parsed
    ? `${formatCurrency(parsed.result.annualRevenue)}/yr cumulative · ${parsed.result.effectiveKw} kW effective at ${values.availabilityPercent ?? "90"}% availability`
    : null;

  const resultKey = parsed
    ? `${parsed.result.monthlyRevenue}-${parsed.result.annualRevenue}`
    : "empty";

  const rateUnitLabel =
    parsed?.rateType === "kwh" ? "$/kWh energy" : "$/kW-month capacity";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || monthlyValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: monthlyValue, unit: "/mo" },
          "Cumulative annual revenue": formatCurrency(parsed.result.annualRevenue),
          "Effective capacity": `${formatNumber(parsed.result.effectiveKw, { maxDecimals: 2 })} kW`,
          ...Object.fromEntries(
            parsed.scenarios.map((row) => [
              `Availability ${row.availabilityPercent}% (monthly)`,
              formatCurrency(row.monthlyRevenue),
            ])
          ),
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
    monthlyDetail,
    monthlyValue,
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
          label="Estimated monthly revenue"
          ambientClassName="bg-violet-500/[0.12] dark:bg-violet-500/[0.2]"
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
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className={calculatorResultValue}>
                  $
                  <AnimatedCounter
                    target={parsed.result.monthlyRevenue}
                    decimals={2}
                  />
                </span>
                <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                  /mo
                </span>
                <ResultInterpreter
                  calculatorId={CALCULATOR_ID}
                  value={formatCurrency(parsed.result.monthlyRevenue)}
                  unit="/mo"
                  values={values}
                  className="w-full"
                />
              </div>
            )}
          </div>
          </GamifiedDashboardFrame>
        }
      />

      {parsed ? (
        <div
          className="flex items-center gap-3 rounded-none border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Activity
            className="size-5 shrink-0 text-violet-500 dark:text-violet-400"
            aria-hidden
          />
          <span>
            {rateUnitLabel} · {parsed.result.hoursFactor < 1
              ? `${formatNumber(parsed.result.hoursFactor * 24, { maxDecimals: 1 })} h enrollment factor`
              : "Full-day enrollment"}
            {parsed.result.monthlyKwh !== null
              ? ` · ~${formatNumber(parsed.result.monthlyKwh, { maxDecimals: 0 })} kWh/mo dispatched`
              : null}
          </span>
        </div>
      ) : null}

      <CalculatorResult
        label="Cumulative annual revenue"
          value={
            parsed ? formatCurrency(parsed.result.annualRevenue) : null
          }
          unit="/yr"
          detail={
            parsed
              ? `Gross program revenue before battery degradation or program fees`
              : null
          }
          emptyMessage="Enter values above"
        />

        {parsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp
                className="size-4 text-violet-500 dark:text-violet-400"
                aria-hidden
              />
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Availability scenarios
              </h3>
            </div>
            <div className="overflow-x-auto rounded-none border border-border/60">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3" scope="col">
                      Availability
                    </th>
                    <th className="px-4 py-3" scope="col">
                      Monthly
                    </th>
                    <th className="px-4 py-3" scope="col">
                      Annual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.scenarios.map((row) => (
                    <tr
                      key={row.availabilityPercent}
                      className={cn(
                        "border-b border-border/40 last:border-0 transition-colors",
                        row.isUserScenario &&
                          "bg-violet-500/10 font-medium text-foreground"
                      )}
                    >
                      <td className="px-4 py-3 tabular-nums">
                        {row.availabilityPercent}%
                        {row.isUserScenario ? (
                          <span className="ml-2 text-xs font-normal text-violet-600 dark:text-violet-400">
                            (your input)
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {formatCurrency(row.monthlyRevenue)}
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {formatCurrency(row.annualRevenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Scenarios hold kW, hours, and rate constant—only availability changes.
              Compare compliance targets before enrolling with a VPP or utility program.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={monthlyValue}
          unit="/mo"
          detail={monthlyDetail}
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
