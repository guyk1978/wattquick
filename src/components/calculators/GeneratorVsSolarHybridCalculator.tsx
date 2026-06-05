"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateGeneratorVsSolarHybrid } from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Fuel, Sun } from "lucide-react";

const CALCULATOR_ID = "generator-vs-solar-hybrid" satisfies CalculatorId;

interface GeneratorVsSolarHybridCalculatorProps {
  className?: string;
}

export function GeneratorVsSolarHybridCalculator({
  className,
}: GeneratorVsSolarHybridCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const dailyKwh = parsePositive(values.dailyKwh ?? "");
    const fuelCostPerLiter = parsePositive(values.fuelCostPerLiter ?? "");
    const generatorLitersPerHour = parsePositive(
      values.generatorLitersPerHour ?? ""
    );
    const hybridSetupCost = parsePositive(values.hybridSetupCost ?? "");
    const generatorMaintenanceAnnual = parseNonNegative(
      values.generatorMaintenanceAnnual ?? ""
    );
    const hybridMaintenanceAnnual = parseNonNegative(
      values.hybridMaintenanceAnnual ?? ""
    );
    if (
      dailyKwh === null ||
      fuelCostPerLiter === null ||
      generatorLitersPerHour === null ||
      hybridSetupCost === null ||
      generatorMaintenanceAnnual === null ||
      hybridMaintenanceAnnual === null
    ) {
      return null;
    }
    return calculateGeneratorVsSolarHybrid({
      dailyKwh,
      fuelCostPerLiter,
      generatorLitersPerHour,
      hybridSetupCost,
      generatorMaintenanceAnnual,
      hybridMaintenanceAnnual,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const savingsValue = parsed
    ? formatCurrency(Math.max(0, parsed.annualSavings))
    : null;
  const savingsDetail = parsed
    ? parsed.annualSavings > 0
      ? `Generator OPEX ${formatCurrency(parsed.generatorAnnualOpex)}/yr · Hybrid OPEX ${formatCurrency(parsed.hybridAnnualOpex)}/yr · ~${parsed.runtimeHoursPerDay} h gen/day`
      : "Hybrid operating cost exceeds generator-only—review inputs"
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || savingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: savingsValue, unit: "/yr" },
          "5-year cumulative — generator": formatCurrency(parsed.generator5Year),
          "5-year cumulative — solar hybrid": formatCurrency(parsed.hybrid5Year),
          "10-year cumulative — generator": formatCurrency(parsed.generator10Year),
          "10-year cumulative — solar hybrid": formatCurrency(parsed.hybrid10Year),
          "Generator annual OPEX": formatCurrency(parsed.generatorAnnualOpex),
          "Hybrid annual OPEX": formatCurrency(parsed.hybridAnnualOpex),
          ...(parsed.paybackYears !== null && parsed.annualSavings > 0
            ? {
                "Hybrid payback": `${formatNumber(parsed.paybackYears, { maxDecimals: 1 })} years`,
              }
            : {}),
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
    savingsDetail,
    savingsValue,
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
          <CalculatorResult
            label="Estimated annual savings (hybrid)"
            value={savingsValue}
            unit="/yr"
            detail={savingsDetail}
            emptyMessage={definition.result.emptyMessage}
          />
        }
      />

      {parsed && parsed.paybackYears !== null && parsed.annualSavings > 0 ? (
        <div
          className="flex items-center gap-3 rounded-none border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Sun className="size-5 shrink-0 text-amber-500 dark:text-amber-400" aria-hidden />
          <span>
            Hybrid payback ~{formatNumber(parsed.paybackYears, { maxDecimals: 1 })} years at current fuel and maintenance rates
          </span>
        </div>
      ) : null}

      <div className="calculator-secondary-results">
          <CalculatorResult
            label="5-year cumulative — generator"
            value={parsed ? formatCurrency(parsed.generator5Year) : null}
            unit=""
            detail={
              parsed
                ? `${formatCurrency(parsed.generatorAnnualOpex)}/yr OPEX · fuel + maintenance`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="5-year cumulative — solar hybrid"
            value={parsed ? formatCurrency(parsed.hybrid5Year) : null}
            unit=""
            detail={
              parsed
                ? `Includes ${formatCurrency(parseFloat(values.hybridSetupCost ?? "0") || 0)} setup + ${formatCurrency(parsed.hybridAnnualOpex)}/yr OPEX`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="10-year cumulative — generator"
            value={parsed ? formatCurrency(parsed.generator10Year) : null}
            unit=""
            detail={
              parsed
                ? `Net vs hybrid: ${formatCurrency(parsed.savings10Year)} saved with hybrid over 10 yr`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="10-year cumulative — solar hybrid"
            value={parsed ? formatCurrency(parsed.hybrid10Year) : null}
            unit=""
            detail={
              parsed
                ? `5-yr delta: ${formatCurrency(parsed.savings5Year)} · 10-yr delta: ${formatCurrency(parsed.savings10Year)}`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-none border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Fuel className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              Generator-only model: ~{parsed.dailyFuelLiters} L/day at your load
              (~{parsed.runtimeHoursPerDay} h runtime). Hybrid assumes ~88% solar+battery offset, 12% backup fuel.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={savingsValue}
          unit="/yr"
          detail={savingsDetail}
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
