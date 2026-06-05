"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Sun } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateSolarShadingAnalysis,
  SOLAR_SHADING_DEFAULT_KWH_PER_KWP,
  type SolarInverterTopology,
} from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { flatAlert, flatVisualPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "solar-shading-analysis" satisfies CalculatorId;

const ARRAY_CURRENT_CALCULATOR = {
  label: "Solar Array Current Calculator",
  href: "/solar-array-current/",
} as const;

const ROI_CALCULATOR = {
  label: "Solar ROI Analysis",
  href: "/solar-roi-analysis/",
} as const;

interface SolarShadingAnalysisCalculatorProps {
  className?: string;
}

function isInverterTopology(value: string): value is SolarInverterTopology {
  return value === "string" || value === "optimizer";
}

function buildResultRows(
  parsed: NonNullable<ReturnType<typeof calculateSolarShadingAnalysis>>
): CalculatorResultRow[] {
  const rows: CalculatorResultRow[] = [
    {
      label: "Production loss",
      value: formatNumber(parsed.annualProductionLossKwh, { maxDecimals: 0 }),
      unit: "kWh/yr",
    },
    {
      label: "Financial loss",
      value: formatCurrency(parsed.annualFinancialLoss),
      unit: "/yr",
    },
    {
      label: "Loss share",
      value: formatNumber(parsed.productionLossPercent, { maxDecimals: 1 }),
      unit: "%",
    },
    {
      label: "Direct shading loss",
      value: formatNumber(parsed.directShadingLossPercent, { maxDecimals: 1 }),
      unit: "%",
    },
    {
      label: "Bypass diode loss",
      value: formatNumber(parsed.bypassLossPercent, { maxDecimals: 1 }),
      unit: "%",
    },
    {
      label: "Mismatch loss",
      value: formatNumber(parsed.mismatchLossPercent, { maxDecimals: 1 }),
      unit: "%",
    },
    {
      label: "Engineering note",
      value: parsed.recommendationLabel,
    },
  ];

  if (parsed.optimizerPaybackYears !== null && parsed.optimizerTotalCost !== null) {
    rows.push({
      label: "Optimizer payback",
      value: formatNumber(parsed.optimizerPaybackYears, { maxDecimals: 1 }),
      unit: "yr",
    });
    rows.push({
      label: "Optimizer budget",
      value: formatCurrency(parsed.optimizerTotalCost),
    });
  }

  return rows;
}

export function SolarShadingAnalysisCalculator({
  className,
}: SolarShadingAnalysisCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const panelCount = parsePositive(values.panelCount ?? "");
    const panelWatts = parsePositive(values.panelWatts ?? "");
    const shadedPanelPercent = parsePositive(values.shadedPanelPercent ?? "");
    const shadeCoveragePercent = parsePositive(values.shadeCoveragePercent ?? "");
    const inverterRaw = values.inverterType ?? "string";
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    const optimizerCostPerPanel = parsePositive(
      values.optimizerCostPerPanel ?? ""
    );

    let annualProductionKwh = parsePositive(values.annualProductionKwh ?? "");
    if (
      annualProductionKwh === null &&
      panelCount !== null &&
      panelWatts !== null
    ) {
      annualProductionKwh =
        (panelCount * panelWatts * SOLAR_SHADING_DEFAULT_KWH_PER_KWP) / 1000;
    }

    if (
      panelCount === null ||
      panelWatts === null ||
      shadedPanelPercent === null ||
      shadeCoveragePercent === null ||
      !isInverterTopology(inverterRaw) ||
      annualProductionKwh === null ||
      ratePerKwh === null
    ) {
      return null;
    }

    return calculateSolarShadingAnalysis({
      panelCount,
      panelWatts,
      shadedPanelPercent,
      shadeCoveragePercent,
      inverterType: inverterRaw,
      annualProductionKwh,
      ratePerKwh,
      optimizerCostPerPanel: optimizerCostPerPanel ?? undefined,
    });
  }, [values]);

  const resultRows = parsed ? buildResultRows(parsed) : [];
  const hasResults = resultRows.length > 0;

  const primaryDetail = parsed
    ? `${formatNumber(parsed.productionLossPercent, { maxDecimals: 1 })}% loss · ${formatCurrency(parsed.annualFinancialLoss)}/yr · ${parsed.shadedPanelCount} shaded module${parsed.shadedPanelCount === 1 ? "" : "s"}`
    : null;

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

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
          [definition.result.label]: `${formatNumber(parsed.annualProductionLossKwh, { maxDecimals: 0 })} kWh/yr`,
          "Financial loss": formatCurrency(parsed.annualFinancialLoss),
          Recommendation: parsed.recommendationLabel,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.result.label, definition.title, fieldLabels, parsed, values]);

  const recommendOptimizers =
    parsed?.recommendation === "add_optimizers";

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
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Annual production loss">
              <CalculatorPrimaryMetric
                value={parsed ? parsed.annualProductionLossKwh : null}
                unit="kWh/yr"
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric
                decimals={0}
              />
            </GamifiedDashboardFrame>

            {parsed ? (
              <div
                className={cn(
                  flatVisualPanel,
                  "rounded-none border border-border p-3 sm:p-4"
                )}
                role="img"
                aria-label={`Production loss ${parsed.productionLossPercent} percent`}
              >
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  String yield impact
                </p>
                <div className="h-3 w-full border border-border bg-muted/40">
                  <div
                    className={cn(
                      "h-full transition-[width] duration-700 ease-out",
                      recommendOptimizers ? "bg-amber-500" : "bg-primary"
                    )}
                    style={{ width: `${Math.max(4, parsed.productionLossPercent)}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold tabular-nums text-foreground">
                  {formatNumber(parsed.productionLossPercent, { maxDecimals: 1 })}% annual loss
                </p>
              </div>
            ) : null}

            <CalculatorResultsTable rows={resultRows} />

            {parsed ? (
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed",
                  recommendOptimizers
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100"
                    : "text-muted-foreground"
                )}
                role="status"
              >
                {recommendOptimizers ? (
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden
                  />
                ) : (
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                )}
                <p>
                  <strong className="font-semibold text-foreground">
                    {recommendOptimizers ? "Add optimizers" : "Keep as is"}
                  </strong>
                  {" — "}
                  {parsed.recommendationLabel}
                  {parsed.optimizerPaybackYears !== null ? (
                    <>
                      {" "}
                      · Optimizer payback ~
                      {formatNumber(parsed.optimizerPaybackYears, {
                        maxDecimals: 1,
                      })}{" "}
                      yr
                    </>
                  ) : null}
                </p>
              </div>
            ) : null}

            {hasResults ? (
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2 px-2.5 py-2 text-xs leading-relaxed text-muted-foreground"
                )}
              >
                <Sun className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                <p>
                  After a fix, verify string current with our{" "}
                  <Link
                    href={ARRAY_CURRENT_CALCULATOR.href}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {ARRAY_CURRENT_CALCULATOR.label}
                  </Link>
                  <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
                </p>
              </div>
            ) : null}
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          String inverters: bypass diodes trip near 10% cell shading, cutting a
          substring (~⅓ module) and dragging V<sub>mpp</sub>. Optimizers /
          microinverters limit mismatch to per-module loss. Baseline kWh defaults
          to 1,400 kWh/kWp/yr when not entered.
        </CalculatorAssumptionNote>
      ) : null}

      {hasResults ? (
        <div
          className={cn(
            flatAlert,
            "flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
          )}
          role="note"
        >
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden
          />
          <p>
            Production loss confirmed? Now calculate the full financial payback
            using our{" "}
            <Link
              href={ROI_CALCULATOR.href}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {ROI_CALCULATOR.label}
            </Link>
            <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
          </p>
        </div>
      ) : null}

      <JoinMyPdfSaveReport
        calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={
          parsed
            ? formatNumber(parsed.annualProductionLossKwh, { maxDecimals: 0 })
            : null
        }
        unit="kWh/yr"
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
