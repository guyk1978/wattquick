"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Gauge } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateInverterLoadingCurve,
  isInverterOverloadProfile,
} from "@/lib/calculators/electrical";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
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
import { InverterLoadingCurveChart } from "@/components/calculator/inverter-loading-curve-chart";
import { calculatorResultsGrid3, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "inverter-loading-curve" satisfies CalculatorId;

const SURGE_CALCULATOR = {
  label: "Inverter Peak Load & Surge",
  href: "/inverter-peak-load-surge/",
} as const;

interface InverterLoadingCurveCalculatorProps {
  className?: string;
}

function buildTableRows(
  parsed: NonNullable<ReturnType<typeof calculateInverterLoadingCurve>>
): CalculatorResultRow[] {
  return parsed.tableRows.map((row) => ({
    label: `${row.loadPercent}% load (${formatNumber(row.loadWatts, { maxDecimals: 0 })} W)`,
    value: row.allowedLabel,
  }));
}

export function InverterLoadingCurveCalculator({
  className,
}: InverterLoadingCurveCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const nominalPowerW = parsePositive(values.nominalPowerW ?? "");
    const currentLoadW = parsePositive(values.currentLoadW ?? "");
    const ambientTempC = Number(values.ambientTempC?.trim() ?? "");
    const profileRaw = values.inverterProfile ?? "standard";

    if (
      nominalPowerW === null ||
      currentLoadW === null ||
      !Number.isFinite(ambientTempC) ||
      !isInverterOverloadProfile(profileRaw)
    ) {
      return null;
    }

    return calculateInverterLoadingCurve({
      nominalPowerW,
      currentLoadW,
      ambientTempC,
      profile: profileRaw,
    });
  }, [values]);

  const tableRows = parsed ? buildTableRows(parsed) : [];

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const primaryDetail = parsed
    ? `${formatNumber(parsed.loadPercentOfDerated, { maxDecimals: 1 })}% of derated ${formatNumber(parsed.deratedNominalW, { maxDecimals: 0 })} W · ${parsed.profileLabel}`
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
          "Time to overload shutdown": parsed.shutdownLabel,
          Status: parsed.statusLabel,
          "Derated nominal": `${formatNumber(parsed.deratedNominalW, { maxDecimals: 0 })} W`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, values]);

  const statusAlertClass =
    parsed?.status === "safe"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
      : parsed?.status === "imminent" || parsed?.status === "warning"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100"
        : "text-muted-foreground";

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
            <div className="space-y-4">
              <CalculatorPrimaryMetric
                value={parsed.shutdownLabel}
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
              />
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed",
                  statusAlertClass
                )}
                role="status"
              >
                {parsed.status === "safe" ? (
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                ) : (
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden
                  />
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {parsed.statusLabel}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {parsed.recommendation}
                  </p>
                </div>
              </div>
              <div className={calculatorResultsGrid3}>
                <CalculatorResult
                  label="Derated nominal"
                  value={formatNumber(parsed.deratedNominalW, { maxDecimals: 0 })}
                  unit="W"
                  detail={`${formatNumber(parsed.deratingFactor * 100, { maxDecimals: 1 })}% of nameplate at ${formatNumber(parsed.ambientTempC, { maxDecimals: 0 })}°C`}
                  emptyMessage="—"
                />
                <CalculatorResult
                  label="Load vs. derated"
                  value={formatNumber(parsed.loadPercentOfDerated, { maxDecimals: 1 })}
                  unit="%"
                  detail={`${formatNumber(parsed.currentLoadW, { maxDecimals: 0 })} W applied`}
                  emptyMessage="—"
                />
                <CalculatorResult
                  label="Inverter profile"
                  value={parsed.profileLabel}
                  detail="Overload curve family"
                  emptyMessage="—"
                />
              </div>
            </div>
          ) : null
        }
      />

      {parsed ? (
        <>
          <InverterLoadingCurveChart
            curvePoints={parsed.curvePoints}
            currentLoadPercent={parsed.loadPercentOfDerated}
            shutdownMinutes={parsed.shutdownMinutes}
          />

          <section
            className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
            aria-labelledby="inverter-loading-table-heading"
          >
            <h2
              id="inverter-loading-table-heading"
              className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
            >
              <Gauge className="size-4 text-primary" aria-hidden />
              Overload time table
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Allowed run duration at common overload levels (derated nominal
              basis).
            </p>
            <CalculatorResultsTable className="mt-4" rows={tableRows} />
          </section>
        </>
      ) : null}

      <div
        className={cn(
          flatAlert,
          "flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
        )}
        role="note"
      >
        <Gauge className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p>
          Sizing motor surge headroom? Start with{" "}
          <Link
            href={SURGE_CALCULATOR.href}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {SURGE_CALCULATOR.label}
          </Link>
          <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
          , then validate sustained overload here.
        </p>
      </div>

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={parsed?.shutdownLabel ?? null}
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
