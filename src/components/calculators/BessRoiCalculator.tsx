"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Clock, Gauge } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateBessRoi } from "@/lib/calculators/battery";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { calculatorResultsGrid3 } from "@/lib/glass-ui";

const CALCULATOR_ID = "bess-roi" satisfies CalculatorId;

const RATE_PLAN_CALCULATOR = {
  label: "Electricity Rate Plan (TOU vs Flat)",
  href: "/electricity-rate-plan/",
} as const;

interface BessRoiCalculatorProps {
  className?: string;
}

export function BessRoiCalculator({ className }: BessRoiCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
    const batteryInstallCost = parsePositive(values.batteryInstallCost ?? "");
    const peakRatePerKwh = parsePositive(values.peakRatePerKwh ?? "");
    const offPeakRatePerKwh = parsePositive(values.offPeakRatePerKwh ?? "");
    const cyclesPerDay = parsePositive(values.cyclesPerDay ?? "");
    const batteryLifeYears = parsePositive(values.batteryLifeYears ?? "");
    const depthOfDischargePercent = Number(
      values.depthOfDischargePercent?.trim() ?? ""
    );
    const roundTripEfficiencyPercent = parsePositive(
      values.roundTripEfficiencyPercent ?? ""
    );

    if (
      batteryCapacityKwh === null ||
      batteryInstallCost === null ||
      peakRatePerKwh === null ||
      offPeakRatePerKwh === null ||
      cyclesPerDay === null ||
      batteryLifeYears === null ||
      roundTripEfficiencyPercent === null ||
      !Number.isFinite(depthOfDischargePercent) ||
      depthOfDischargePercent <= 0 ||
      depthOfDischargePercent > 100 ||
      roundTripEfficiencyPercent <= 0 ||
      roundTripEfficiencyPercent > 100
    ) {
      return null;
    }

    return calculateBessRoi({
      batteryCapacityKwh,
      batteryInstallCost,
      peakRatePerKwh,
      offPeakRatePerKwh,
      cyclesPerDay,
      batteryLifeYears,
      depthOfDischargePercent,
      roundTripEfficiencyPercent,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const paybackDisplay = parsed
    ? parsed.paybackYears !== null
      ? formatNumber(parsed.paybackYears, { maxDecimals: 1 })
      : "—"
    : null;

  const installCostDisplay =
    parsed && values.batteryInstallCost
      ? formatCurrency(parsePositive(values.batteryInstallCost) ?? 0)
      : null;

  const lifeYearsDisplay = values.batteryLifeYears?.trim()
    ? formatNumber(Number(values.batteryLifeYears), { maxDecimals: 0 })
    : null;

  const cyclesDisplay = values.cyclesPerDay?.trim()
    ? formatNumber(Number(values.cyclesPerDay), { maxDecimals: 1 })
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
          "Daily savings": formatCurrency(parsed.dailySavings),
          "Payback period (years)": paybackDisplay ?? "—",
          "LCOS (cost per kWh)": `$${formatNumber(parsed.lcosPerKwh, { maxDecimals: 3 })}/kWh`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, paybackDisplay, values]);

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
              label="Daily savings"
              value={formatCurrency(parsed.dailySavings)}
              unit="/day"
              detail={`${formatCurrency(parsed.monthlySavings)}/mo · ${cyclesDisplay ?? "—"} cycles/day`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Payback period (years)"
              value={paybackDisplay}
              unit={parsed.paybackYears !== null ? "yr" : undefined}
              detail={
                parsed.paybackYears !== null && installCostDisplay
                  ? `Install ${installCostDisplay} ÷ ${formatCurrency(parsed.annualSavings)}/yr`
                  : "Peak rate must exceed off-peak for arbitrage savings"
              }
              emptyMessage="—"
            />
            <CalculatorResult
              label="LCOS (cost per kWh)"
              value={formatNumber(parsed.lcosPerKwh, { maxDecimals: 3 })}
              unit="/kWh"
              detail={`${formatNumber(parsed.lifetimeDischargedKwh, { maxDecimals: 0 })} kWh over ${lifeYearsDisplay ?? "—"} yr · spread $${formatNumber(parsed.priceSpreadPerKwh, { maxDecimals: 3 })}/kWh`}
              emptyMessage="—"
            />
            </div>
          ) : null
        }
      />

      <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="bess-dod-heading"
        >
          <h2
            id="bess-dod-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Gauge className="size-4 text-primary" aria-hidden />
            Depth of discharge (DoD)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">DoD</strong> is how much of
            the nameplate kWh you actually cycle. Lithium home BESS often allows 80–90%
            daily DoD; deeper cycling increases arbitrage kWh but accelerates wear and
            may void warranty limits.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            BESS ROI depends entirely on a wide{" "}
            <strong className="font-medium text-foreground">peak vs. off-peak</strong>{" "}
            spread—flat tariffs rarely justify storage arbitrage alone. Pair with solar
            self-consumption for fuller economics.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={RATE_PLAN_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <Clock className="size-3.5 shrink-0" aria-hidden />
              {RATE_PLAN_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={paybackDisplay}
          detail={
            parsed
              ? `${formatCurrency(parsed.dailySavings)}/day · LCOS $${formatNumber(parsed.lcosPerKwh, { maxDecimals: 3 })}/kWh`
              : null
          }
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
