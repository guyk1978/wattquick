"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, LineChart, Shield } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateSolarDegradation20YearRoi } from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { SolarDegradationRoiChart } from "@/components/calculator/solar-degradation-roi-chart";
import { calculatorResultsGrid3 } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "solar-degradation-20-year-roi" satisfies CalculatorId;

const PAYBACK_CALCULATOR = {
  label: "Simple solar payback (without year-by-year degradation)",
  href: "/solar-payback-roi/",
} as const;

interface SolarDegradation20YearRoiCalculatorProps {
  className?: string;
}

export function SolarDegradation20YearRoiCalculator({
  className,
}: SolarDegradation20YearRoiCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const systemKwp = parsePositive(values.systemKwp ?? "");
    const annualDegradationPercent = parsePositive(
      values.annualDegradationPercent ?? ""
    );
    const installCost = parsePositive(values.installCost ?? "");
    const electricityRatePerKwh = parsePositive(
      values.electricityRatePerKwh ?? ""
    );
    const energyInflationPercent = Number(
      values.energyInflationPercent?.trim() ?? ""
    );
    const kwhPerKwpYear = parsePositive(values.kwhPerKwpYear ?? "");

    if (
      systemKwp === null ||
      annualDegradationPercent === null ||
      installCost === null ||
      electricityRatePerKwh === null ||
      kwhPerKwpYear === null ||
      !Number.isFinite(energyInflationPercent) ||
      energyInflationPercent < 0
    ) {
      return null;
    }

    return calculateSolarDegradation20YearRoi({
      systemKwp,
      annualDegradationPercent,
      installCost,
      electricityRatePerKwh,
      energyInflationPercent,
      kwhPerKwpYear,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const breakEvenDisplay = parsed
    ? parsed.breakEvenYears !== null
      ? formatNumber(parsed.breakEvenYears, { maxDecimals: 1 })
      : "20+"
    : null;

  const savingsDetail = parsed
    ? `Inflation on $/kWh · ${formatNumber(parsed.capacityYear20Percent, { maxDecimals: 1 })}% of year-1 output in yr 20`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          "Year 20 total yield (20 yr)": `${formatNumber(parsed.total20YearKwh, { maxDecimals: 0 })} kWh`,
          "Break-even year": breakEvenDisplay ?? "—",
          "Total 20-year savings": formatCurrency(parsed.total20YearSavings),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [breakEvenDisplay, definition.title, fieldLabels, parsed, values]);

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
          parsed ? (
            <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Year 20 total yield"
                value={formatNumber(parsed.total20YearKwh, { maxDecimals: 0 })}
                unit="kWh"
                detail={`20-yr sum · yr 20 alone ${formatNumber(parsed.year20AnnualKwh, { maxDecimals: 0 })} kWh (${formatNumber(parsed.capacityYear20Percent, { maxDecimals: 1 })}% of new)`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Break-even year"
                value={breakEvenDisplay}
                unit={parsed.breakEvenYears !== null ? "yr" : undefined}
                detail={
                  parsed.breakEvenYears !== null
                    ? `Install ${formatCurrency(parsed.installCost)} recovered from bill savings`
                    : `Savings over 20 yr do not fully repay ${formatCurrency(parsed.installCost)} at these inputs`
                }
                emptyMessage="—"
              />
              <CalculatorResult
                label="Total 20-year savings"
                value={formatCurrency(parsed.total20YearSavings)}
                detail={savingsDetail}
                emptyMessage="—"
              />
            </div>
          ) : null
        }
      />

      {parsed ? <SolarDegradationRoiChart yearly={parsed.yearly} /> : null}

      <section
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="solar-deg-warranty-heading"
        >
          <h2
            id="solar-deg-warranty-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Shield className="size-4 text-primary" aria-hidden />
            Degradation &amp; manufacturer warranty
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tier-1 modules typically lose about{" "}
            <strong className="font-medium text-foreground">0.5–0.8% per year</strong>{" "}
            of output (compound). Warranties often guarantee{" "}
            <strong className="font-medium text-foreground">80–85% of rated power at 25 years</strong>
            —your modeled year-25 retention at this %/yr is about{" "}
            {parsed ? (
              <span className="font-medium text-foreground">
                {formatNumber(parsed.warrantyComparePercent, { maxDecimals: 1 })}%
              </span>
            ) : (
              "—"
            )}
            .
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Rising retail rates partially offset lower kWh; this calculator applies your
            energy inflation % to each year&apos;s savings while production declines.
          </p>
          <div className="mt-4">
            <Link
              href={PAYBACK_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <LineChart className="size-3.5 shrink-0" aria-hidden />
              {PAYBACK_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={parsed ? formatCurrency(parsed.total20YearSavings) : null}
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
