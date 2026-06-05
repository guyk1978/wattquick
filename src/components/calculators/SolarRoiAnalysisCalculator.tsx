"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Sun } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { SolarRoiIncentivesField } from "@/components/calculator/solar-roi-incentives-field";
import {
  calculateSolarRoiAnalysis,
  type SolarIncentivesMode,
  type SolarRoiMilestoneYear,
} from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { SolarRoiCumulativeChart } from "@/components/calculator/solar-roi-cumulative-chart";
import { calculatorResultsGrid3, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "solar-roi-analysis" satisfies CalculatorId;

const SHADING_CALCULATOR = {
  label: "Solar Shading Analysis",
  href: "/solar-shading-analysis/",
} as const;

const MILESTONE_YEARS: SolarRoiMilestoneYear[] = [1, 5, 10, 20];

const INCENTIVE_FIELD_IDS = new Set([
  "incentivesMode",
  "incentivesAmount",
  "incentivesPercent",
]);

function parseIncentivesMode(value: string | undefined): SolarIncentivesMode {
  return value === "percent" ? "percent" : "fixed";
}

function formatIncentivesDetail(
  parsed: NonNullable<ReturnType<typeof calculateSolarRoiAnalysis>>
): string {
  if (parsed.incentivesAmount <= 0) {
    return `Net install ${formatCurrency(parsed.netInstallCost)}`;
  }
  if (
    parsed.incentivesMode === "percent" &&
    parsed.incentivesPercent !== null
  ) {
    return `After ${formatNumber(parsed.incentivesPercent, { maxDecimals: 0 })}% credit (${formatCurrency(parsed.incentivesAmount)}) · net cost ${formatCurrency(parsed.netInstallCost)}`;
  }
  return `After ${formatCurrency(parsed.incentivesAmount)} incentives · net cost ${formatCurrency(parsed.netInstallCost)}`;
}

interface SolarRoiAnalysisCalculatorProps {
  className?: string;
}

function buildMilestoneRows(
  parsed: NonNullable<ReturnType<typeof calculateSolarRoiAnalysis>>
): CalculatorResultRow[] {
  return MILESTONE_YEARS.flatMap((year) => {
    const row = parsed.milestones[year];
    return [
      {
        label: `Year ${year} — annual savings`,
        value: formatCurrency(row.annualSavings),
      },
      {
        label: `Year ${year} — cumulative savings`,
        value: formatCurrency(row.cumulativeSavings),
      },
      {
        label: `Year ${year} — grid cost (no solar)`,
        value: formatCurrency(row.cumulativeStatusQuo),
      },
      {
        label: `Year ${year} — net position`,
        value: formatCurrency(row.netPosition),
      },
    ];
  });
}

export function SolarRoiAnalysisCalculator({
  className,
}: SolarRoiAnalysisCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const inputFields = useMemo(() => {
    const standard = definition.fields.filter(
      (field) => !INCENTIVE_FIELD_IDS.has(field.id)
    );
    const installIndex = standard.findIndex((field) => field.id === "installCost");
    return {
      beforeIncentives: standard.slice(0, installIndex + 1),
      afterIncentives: standard.slice(installIndex + 1),
    };
  }, [definition.fields]);

  const incentivesMode = parseIncentivesMode(values.incentivesMode);

  const parsed = useMemo(() => {
    const annualYieldKwh = parsePositive(values.annualYieldKwh ?? "");
    const installCost = parsePositive(values.installCost ?? "");
    const incentivesAmount = parseNonNegative(values.incentivesAmount ?? "") ?? 0;
    const incentivesPercent = parseNonNegative(values.incentivesPercent ?? "");
    const mode = parseIncentivesMode(values.incentivesMode);
    const annualDegradationPercent = parsePositive(
      values.annualDegradationPercent ?? ""
    );
    const electricityRatePerKwh = parsePositive(
      values.electricityRatePerKwh ?? ""
    );
    const exportRatePerKwh = parseNonNegative(
      values.exportRatePerKwh ?? ""
    );
    const selfConsumptionPercent = Number(
      values.selfConsumptionPercent?.trim() ?? ""
    );
    const energyInflationPercent = Number(
      values.energyInflationPercent?.trim() ?? ""
    );

    if (
      annualYieldKwh === null ||
      installCost === null ||
      annualDegradationPercent === null ||
      electricityRatePerKwh === null ||
      exportRatePerKwh === null ||
      (mode === "percent" &&
        (incentivesPercent === null || incentivesPercent > 100)) ||
      !Number.isFinite(selfConsumptionPercent) ||
      selfConsumptionPercent < 0 ||
      selfConsumptionPercent > 100 ||
      !Number.isFinite(energyInflationPercent) ||
      energyInflationPercent < 0
    ) {
      return null;
    }

    return calculateSolarRoiAnalysis({
      annualYieldKwh,
      installCost,
      incentivesMode: mode,
      incentivesAmount,
      incentivesPercent: incentivesPercent ?? 0,
      annualDegradationPercent,
      electricityRatePerKwh,
      exportRatePerKwh,
      selfConsumptionPercent,
      energyInflationPercent,
    });
  }, [values]);

  const milestoneRows = parsed ? buildMilestoneRows(parsed) : [];

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const primaryDetail = parsed
    ? `${formatCurrency(parsed.total20YearSavings)} over 20 yr · NPV ${formatCurrency(parsed.simpleNpv)} · ${formatNumber(parsed.capacityYear20Percent, { maxDecimals: 1 })}% output in yr 20`
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
          "Break-even": parsed.breakEvenLabel,
          "Total 20-year savings": formatCurrency(parsed.total20YearSavings),
          "Simple NPV": formatCurrency(parsed.simpleNpv),
          "Net benefit vs. status quo": formatCurrency(parsed.netBenefitVsStatusQuo),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, values]);

  return (
    <CalculatorCommandShell className={className}>
      <div
        className={cn(
          flatAlert,
          "mb-4 flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
        )}
        role="note"
      >
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
          aria-hidden
        />
        <p>
          Need to maximize your yield? Check shading patterns first with our{" "}
          <Link
            href={SHADING_CALCULATOR.href}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {SHADING_CALCULATOR.label}
          </Link>
          <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
          — partial shade can shift payback by years.
        </p>
      </div>

      <CalculatorCommandSplit
        inputs={
          <div className="calculator-command__inputs-stack flex flex-col gap-5">
            <CalculatorInputs
              fields={inputFields.beforeIncentives}
              values={values}
              onChange={setValue}
            />
            <SolarRoiIncentivesField
              mode={incentivesMode}
              fixedValue={values.incentivesAmount ?? "0"}
              percentValue={values.incentivesPercent ?? "30"}
              onModeChange={(mode) => setValue("incentivesMode", mode)}
              onFixedChange={(value) => setValue("incentivesAmount", value)}
              onPercentChange={(value) => setValue("incentivesPercent", value)}
            />
            <CalculatorInputs
              fields={inputFields.afterIncentives}
              values={values}
              onChange={setValue}
            />
          </div>
        }
        results={
          parsed ? (
            <div className="space-y-4">
              <CalculatorPrimaryMetric
                value={parsed.breakEvenLabel}
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
              />
              <div className={calculatorResultsGrid3}>
                <CalculatorResult
                  label="Total 20-year savings"
                  value={formatCurrency(parsed.total20YearSavings)}
                  detail={`Status quo grid cost ${formatCurrency(parsed.statusQuo20YearCost)}`}
                  emptyMessage="—"
                />
                <CalculatorResult
                  label="Simple NPV"
                  value={formatCurrency(parsed.simpleNpv)}
                  detail="Discounted at your energy inflation %"
                  emptyMessage="—"
                />
                <CalculatorResult
                  label="Net benefit vs. no solar"
                  value={formatCurrency(parsed.netBenefitVsStatusQuo)}
                  detail={formatIncentivesDetail(parsed)}
                  emptyMessage="—"
                />
              </div>
            </div>
          ) : null
        }
      />

      {parsed ? (
        <>
          <SolarRoiCumulativeChart
            yearly={parsed.yearly}
            netInstallCost={parsed.netInstallCost}
            breakEvenYears={parsed.breakEvenYears}
          />

          <section
            className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
            aria-labelledby="solar-roi-milestones-heading"
          >
            <h2
              id="solar-roi-milestones-heading"
              className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
            >
              <Sun className="size-4 text-primary" aria-hidden />
              20-year financial milestones
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare cumulative bill savings with the escalating cost of buying
              the same kWh from the grid.
            </p>
            <CalculatorResultsTable
              className="mt-4"
              rows={milestoneRows}
            />
          </section>
        </>
      ) : null}

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={parsed?.breakEvenLabel ?? null}
        detail={primaryDetail}
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
