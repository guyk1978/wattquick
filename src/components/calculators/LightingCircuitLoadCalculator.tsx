"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateLightingCircuitLoad } from "@/lib/calculators/appliances";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { CircuitLoadGauge } from "@/components/calculator/circuit-load-gauge";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Lamp } from "lucide-react";

const CALCULATOR_ID = "lighting-circuit-load" satisfies CalculatorId;

interface LightingCircuitLoadCalculatorProps {
  className?: string;
}

const STATUS_STYLES = {
  ok: {
    icon: CheckCircle2,
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  },
  "near-limit": {
    icon: AlertTriangle,
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  },
  "over-80": {
    icon: AlertTriangle,
    badge:
      "border-orange-500/30 bg-orange-500/10 text-orange-800 dark:text-orange-300",
  },
  overloaded: {
    icon: AlertTriangle,
    badge: "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300",
  },
} as const;

export function LightingCircuitLoadCalculator({
  className,
}: LightingCircuitLoadCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const fixtureCount = parsePositive(values.fixtureCount ?? "");
    const wattsPerFixture = parsePositive(values.wattsPerFixture ?? "");
    const circuitVoltage = parsePositive(values.circuitVoltage ?? "");
    const breakerAmps = parsePositive(values.breakerAmps ?? "");
    if (
      fixtureCount === null ||
      wattsPerFixture === null ||
      circuitVoltage === null ||
      breakerAmps === null
    ) {
      return null;
    }
    return calculateLightingCircuitLoad({
      fixtureCount,
      wattsPerFixture,
      circuitVoltage,
      breakerAmps,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const ampsValue = parsed
    ? formatNumber(parsed.loadAmps, { maxDecimals: 2 })
    : null;
  const ampsDetail = parsed
    ? `${parsed.totalWatts} W total · ${parsed.utilizationPercent}% of ${values.breakerAmps ?? "15"} A breaker`
    : null;

  const resultKey = parsed
    ? `${parsed.loadAmps}-${parsed.utilizationPercent}-${parsed.status}`
    : "empty";

  const statusStyle = parsed ? STATUS_STYLES[parsed.status] : null;
  const StatusIcon = statusStyle?.icon ?? Lamp;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || ampsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: ampsValue, unit: "A" },
          "Total lighting load": `${formatNumber(parsed.totalWatts, { maxDecimals: 0 })} W`,
          "Breaker utilization": `${formatNumber(parsed.utilizationPercent, { maxDecimals: 1 })}%`,
          "Circuit status": parsed.recommendation,
          "Headroom": `${formatNumber(parsed.headroomAmps, { maxDecimals: 2 })} A`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    ampsDetail,
    ampsValue,
    definition.result.label,
    definition.title,
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
            label="Circuit load"
            ambientClassName="bg-amber-500/[0.1] dark:bg-amber-500/[0.16]"
          >
            {!parsed ? (
              <p className="mt-5 text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
                {definition.result.emptyMessage}
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className={calculatorResultValue}>
                  <AnimatedCounter target={parsed.loadAmps} decimals={2} />
                </span>
                <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                  A
                </span>
                <span className="w-full text-sm text-muted-foreground">
                  {parsed.totalWatts} W @ {values.circuitVoltage ?? "120"} V
                </span>
              </div>
            )}
          </GamifiedDashboardFrame>
        }
      />

      {parsed && statusStyle ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-none border px-4 py-3 text-sm font-medium",
            statusStyle.badge
          )}
          role="alert"
        >
          <StatusIcon className="size-5 shrink-0" aria-hidden />
          <span>{parsed.recommendation}</span>
        </div>
      ) : null}

      {parsed ? (
        <CircuitLoadGauge
          key={resultKey}
          utilizationPercent={parsed.utilizationPercent}
          status={parsed.status}
          className="sm:justify-self-center"
        />
      ) : null}

      <div className="calculator-secondary-results">
          <CalculatorResult
            label="Total lighting load"
            value={parsed ? formatNumber(parsed.totalWatts, { maxDecimals: 0 }) : null}
            unit="W"
            detail={
              parsed
                ? `${values.fixtureCount ?? "0"} fixtures × ${values.wattsPerFixture ?? "0"} W`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Breaker utilization"
            value={
              parsed
                ? formatNumber(parsed.utilizationPercent, { maxDecimals: 1 })
                : null
            }
            unit="%"
            detail={
              parsed
                ? `80% limit = ${formatNumber(parsed.continuousMaxAmps, { maxDecimals: 1 })} A (${parsed.continuousMaxWatts} W) · headroom ${formatNumber(parsed.headroomAmps, { maxDecimals: 2 })} A`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={ampsValue}
          unit="A"
          detail={ampsDetail}
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
