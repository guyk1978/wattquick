"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateResidentialVoltageDrop,
  isAcWireSizeKey,
} from "@/lib/calculators/electrical";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { VoltageDropVisual } from "@/components/calculator/voltage-drop-visual";
import { glassPanel, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { AlertTriangle, Cable, CheckCircle2 } from "lucide-react";

const CALCULATOR_ID = "residential-voltage-drop" satisfies CalculatorId;

interface ResidentialVoltageDropCalculatorProps {
  className?: string;
}

const COMPLIANCE_STYLES = {
  "within-3": {
    icon: CheckCircle2,
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  },
  "within-5": {
    icon: AlertTriangle,
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  },
  excessive: {
    icon: AlertTriangle,
    badge:
      "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300",
  },
} as const;

export function ResidentialVoltageDropCalculator({
  className,
}: ResidentialVoltageDropCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const supplyVoltage = parsePositive(values.supplyVoltage ?? "");
    const loadAmps = parsePositive(values.loadAmps ?? "");
    const oneWayLengthM = parsePositive(values.oneWayLengthM ?? "");
    const wireSize = values.wireSize ?? "";
    if (
      supplyVoltage === null ||
      loadAmps === null ||
      oneWayLengthM === null ||
      !isAcWireSizeKey(wireSize)
    ) {
      return null;
    }
    return calculateResidentialVoltageDrop({
      supplyVoltage,
      loadAmps,
      oneWayLengthM,
      wireSize,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const supplyVoltage = parsePositive(values.supplyVoltage ?? "") ?? 0;
  const dropValue = parsed
    ? formatNumber(parsed.dropVolts, { maxDecimals: 2 })
    : null;
  const dropDetail = parsed
    ? `${parsed.wireLabel} · ${parsed.recommendation}`
    : null;

  const resultKey = parsed
    ? `${parsed.dropVolts}-${parsed.dropPercent}-${parsed.compliance}`
    : "empty";

  const complianceStyle = parsed ? COMPLIANCE_STYLES[parsed.compliance] : null;
  const ComplianceIcon = complianceStyle?.icon ?? Cable;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || dropValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: dropValue, unit: "V" },
          "Voltage at load": `${formatNumber(parsed.voltageAtLoad, { maxDecimals: 2 })} V`,
          "Drop percentage": `${formatNumber(parsed.dropPercent, { maxDecimals: 2 })}%`,
          Compliance: parsed.recommendation,
          "Wire size": parsed.wireLabel,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    dropDetail,
    dropValue,
    fieldLabels,
    parsed,
    supplyVoltage,
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

        {parsed && complianceStyle ? (
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium",
              complianceStyle.badge
            )}
            role="status"
          >
            <ComplianceIcon className="size-5 shrink-0" aria-hidden />
            <span>{parsed.recommendation}</span>
          </div>
        ) : null}

        <div className="h-px bg-border/60" aria-hidden />

        <div
          key={resultKey}
          className="grid gap-6 sm:grid-cols-[minmax(200px,1fr)_minmax(140px,240px)] sm:items-center"
        >
          <GamifiedDashboardFrame
            accent="primary"
            label="Voltage drop"
            ambientClassName="bg-amber-500/[0.1] dark:bg-amber-500/[0.18]"
          >
            {!parsed ? (
              <p className="mt-5 text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
                {definition.result.emptyMessage}
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className={neonHeroNumber}>
                  <AnimatedCounter target={parsed.dropVolts} decimals={2} />
                </span>
                <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                  V
                </span>
                <span className="w-full text-sm text-muted-foreground">
                  {parsed.dropPercent}% of {formatNumber(supplyVoltage, { maxDecimals: 0 })} V
                  supply
                </span>
              </div>
            )}
          </GamifiedDashboardFrame>

          {parsed ? (
            <VoltageDropVisual
              supplyVoltage={supplyVoltage}
              voltageAtLoad={parsed.voltageAtLoad}
              dropPercent={parsed.dropPercent}
              className="sm:justify-self-center"
            />
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="Voltage at load"
            value={
              parsed
                ? formatNumber(parsed.voltageAtLoad, { maxDecimals: 2 })
                : null
            }
            unit="V"
            detail={
              parsed
                ? `${formatNumber(parsed.dropPercent, { maxDecimals: 2 })}% below supply`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Drop percentage"
            value={
              parsed
                ? formatNumber(parsed.dropPercent, { maxDecimals: 2 })
                : null
            }
            unit="%"
            detail={
              parsed
                ? parsed.compliance === "within-3"
                  ? "≤3% — typical branch-circuit target"
                  : parsed.compliance === "within-5"
                    ? "3–5% — review for motors & EVSE"
                    : ">5% — upsize wire or shorten run"
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={dropValue}
          unit="V"
          detail={dropDetail}
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
