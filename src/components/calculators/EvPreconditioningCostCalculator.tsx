"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEvPreconditioningCost } from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { ResultInterpreter } from "@/components/calculator/result-interpreter";
import { cn } from "@/lib/utils";
import { Flame, Snowflake, Thermometer } from "lucide-react";

const CALCULATOR_ID = "ev-preconditioning-cost" satisfies CalculatorId;

interface EvPreconditioningCostCalculatorProps {
  className?: string;
}

const MODE_STYLES = {
  heating: {
    icon: Flame,
    badge:
      "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
    label: "Heating mode",
  },
  cooling: {
    icon: Snowflake,
    badge:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    label: "Cooling mode",
  },
  maintaining: {
    icon: Thermometer,
    badge:
      "border-primary/30 bg-primary/10 text-foreground/80",
    label: "Thermal maintenance",
  },
} as const;

export function EvPreconditioningCostCalculator({
  className,
}: EvPreconditioningCostCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const tempRaw = values.externalTempC?.trim() ?? "";
    const tempC =
      tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);
    const bmsPowerKw = parseFloat(values.bmsPowerKw ?? "");
    const durationMinutes = parseFloat(values.durationMinutes ?? "");
    const ratePerKwh = parseFloat(values.ratePerKwh ?? "");
    if (
      tempC === null ||
      !Number.isFinite(tempC) ||
      !Number.isFinite(bmsPowerKw) ||
      bmsPowerKw <= 0 ||
      !Number.isFinite(durationMinutes) ||
      durationMinutes <= 0 ||
      !Number.isFinite(ratePerKwh) ||
      ratePerKwh <= 0
    ) {
      return null;
    }
    return calculateEvPreconditioningCost({
      externalTempC: tempC,
      bmsPowerKw,
      durationMinutes,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const costValue = parsed ? formatCurrency(parsed.totalCost) : null;
  const costDetail = parsed
    ? `${parsed.modeLabel} at ${parsed.externalTempC}°C · ${formatNumber(parsed.energyKwh, { maxDecimals: 2 })} kWh from grid`
    : null;

  const modeStyle = parsed ? MODE_STYLES[parsed.mode] : null;
  const ModeIcon = modeStyle?.icon ?? Thermometer;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || costValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: costValue,
          "Energy used for thermal management": `${formatNumber(parsed.energyKwh, { maxDecimals: 2 })} kWh`,
          Mode: parsed.modeLabel,
          "External temperature": `${parsed.externalTempC}°C`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    costDetail,
    costValue,
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
          <div className="flex w-full min-w-0 flex-col">
            <CostGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={definition.result.label}
              value={costValue}
              detail={null}
              emptyMessage={definition.result.emptyMessage}
            />
            <ResultInterpreter
              calculatorId={CALCULATOR_ID}
              value={costValue}
              detail={costDetail}
              values={values}
            />
            {costDetail ? (
              <p className="calculator-result-primary__detail">{costDetail}</p>
            ) : null}
          </div>
        }
      />

      {parsed && modeStyle ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-none border px-4 py-3 text-sm font-medium",
            modeStyle.badge
          )}
          role="status"
        >
          <ModeIcon className="size-5 shrink-0" aria-hidden />
          <span>
            {modeStyle.label} — typical before DC fast charge when ambient is{" "}
            {parsed.externalTempC}°C
          </span>
        </div>
      ) : null}

      <CalculatorResult
          label="Energy used for thermal management"
          value={
            parsed
              ? formatNumber(parsed.energyKwh, { maxDecimals: 2 })
              : null
          }
          unit="kWh"
          detail={
            parsed
              ? `${parsed.durationMinutes} min × ${formatNumber(values.bmsPowerKw ? parseFloat(values.bmsPowerKw) : 0, { maxDecimals: 1 })} kW`
              : null
          }
          emptyMessage="Enter values above"
        />

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={costValue}
          detail={costDetail}
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
