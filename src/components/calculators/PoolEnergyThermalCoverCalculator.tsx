"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Droplets, Home, Waves } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculatePoolEnergyThermalCover,
  POOL_THERMAL_COVER_SAVINGS_OPTIONS,
  type PoolThermalCoverSavingsPercent,
} from "@/lib/calculators/appliances";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { calculatorResultsGrid3, glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "pool-energy-thermal-cover" satisfies CalculatorId;

const INSULATION_CALCULATOR = {
  label: "Check your home insulation savings too",
  href: "/home-insulation-savings/",
} as const;

interface PoolEnergyThermalCoverCalculatorProps {
  className?: string;
}

function isCoverSavingsPercent(value: number): value is PoolThermalCoverSavingsPercent {
  return (POOL_THERMAL_COVER_SAVINGS_OPTIONS as readonly number[]).includes(value);
}

export function PoolEnergyThermalCoverCalculator({
  className,
}: PoolEnergyThermalCoverCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const pumpKw = parsePositive(values.pumpKw ?? "");
    const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    const useThermalCover = (values.useThermalCover ?? "no") === "yes";
    const savingsRaw = parsePositive(values.coverSavingsPercent ?? "");

    if (
      pumpKw === null ||
      hoursPerDay === null ||
      ratePerKwh === null ||
      savingsRaw === null ||
      !isCoverSavingsPercent(savingsRaw)
    ) {
      return null;
    }

    return calculatePoolEnergyThermalCover({
      pumpKw,
      hoursPerDay,
      ratePerKwh,
      useThermalCover,
      coverSavingsPercent: savingsRaw,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const annualSavingsValue = parsed ? formatCurrency(parsed.annualSavings) : null;
  const resultDetail = parsed
    ? parsed.useThermalCover
      ? `${formatCurrency(parsed.dailyCostWithCover)}/day with cover · ${formatNumber(parsed.monthlyKwhSaved, { maxDecimals: 1 })} kWh/mo saved`
      : `Open pool ${formatCurrency(parsed.dailyCostWithoutCover)}/day · enable cover to capture savings`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || annualSavingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: annualSavingsValue },
          "Daily cost (no cover)": formatCurrency(parsed.dailyCostWithoutCover),
          "Monthly savings": formatCurrency(parsed.monthlySavings),
          "Annual savings": formatCurrency(parsed.annualSavings),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    annualSavingsValue,
    definition.result.label,
    definition.title,
    fieldLabels,
    parsed,
    values,
  ]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <div className={calculatorResultsGrid3}>
            <CalculatorResult
              label="Daily cost"
              value={formatCurrency(parsed.dailyCostWithoutCover)}
              unit="/day"
              detail={
                parsed.useThermalCover
                  ? `${formatCurrency(parsed.dailyCostWithCover)}/day with thermal cover`
                  : `${formatNumber(parsed.dailyKwhWithoutCover, { maxDecimals: 1 })} kWh/day (open pool)`
              }
              emptyMessage="—"
            />
            <CalculatorResult
              label="Monthly savings"
              value={formatCurrency(parsed.monthlySavings)}
              unit="/mo"
              detail={
                parsed.useThermalCover
                  ? `${formatNumber(parsed.coverSavingsPercent, { maxDecimals: 0 })}% thermal load cut · ${formatNumber(parsed.monthlyKwhSaved, { maxDecimals: 1 })} kWh`
                  : "Select thermal cover = Yes to apply savings"
              }
              emptyMessage="—"
            />
            <CalculatorResult
              label="Annual savings"
              value={formatCurrency(parsed.annualSavings)}
              unit="/yr"
              detail={
                parsed.useThermalCover
                  ? `${formatNumber(parsed.annualKwhSaved, { maxDecimals: 0 })} kWh/yr avoided`
                  : "Cover reduces evaporation & reheating costs"
              }
              emptyMessage="—"
            />
          </div>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="pool-cover-learn-heading"
        >
          <h2
            id="pool-cover-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Waves className="size-4 text-primary" aria-hidden />
            Why a thermal cover pays off
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An uncovered pool loses energy to{" "}
            <strong className="font-medium text-foreground">evaporation</strong>—the same physics
            that drives high HVAC bills. A solar/thermal blanket cuts that loss, so heaters run
            less and you lose less water to top-offs. Fewer gallons evaporated also means{" "}
            <strong className="font-medium text-foreground">less chemical dilution</strong> and more
            stable sanitizer levels between tests.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Droplets className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Lower make-up water and heating energy in shoulder seasons</span>
            </li>
            <li className="flex gap-2">
              <Droplets className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Pump runtime unchanged—savings target thermal &amp; evaporation load</span>
            </li>
          </ul>
          <Link
            href={INSULATION_CALCULATOR.href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Home className="size-3.5 shrink-0" aria-hidden />
            {INSULATION_CALCULATOR.label}
            <ArrowRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={annualSavingsValue}
          detail={resultDetail}
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
