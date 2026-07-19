"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Clock, Moon, Sun, Wind } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateElectricityRatePlan } from "@/lib/calculators/tariffs";
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
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "electricity-rate-plan" satisfies CalculatorId;

const AC_EFFICIENCY_CALCULATOR = {
  label: "AC Efficiency & Inverter Savings — shift cooling load",
  href: "/ac-inverter-savings/",
} as const;

interface ElectricityRatePlanCalculatorProps {
  className?: string;
}

export function ElectricityRatePlanCalculator({
  className,
}: ElectricityRatePlanCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const monthlyKwh = parsePositive(values.monthlyKwh ?? "");
    const peakPercent = Number(values.peakPercent?.trim() ?? "");
    const shoulderPercent = Number(values.shoulderPercent?.trim() ?? "");
    const flatRatePerKwh = parsePositive(values.flatRatePerKwh ?? "");
    const peakRatePerKwh = parsePositive(values.peakRatePerKwh ?? "");
    const shoulderRatePerKwh = parsePositive(values.shoulderRatePerKwh ?? "");
    const offPeakRatePerKwh = parsePositive(values.offPeakRatePerKwh ?? "");

    if (
      monthlyKwh === null ||
      flatRatePerKwh === null ||
      peakRatePerKwh === null ||
      shoulderRatePerKwh === null ||
      offPeakRatePerKwh === null ||
      !Number.isFinite(peakPercent) ||
      !Number.isFinite(shoulderPercent) ||
      peakPercent < 0 ||
      shoulderPercent < 0 ||
      peakPercent + shoulderPercent > 100
    ) {
      return null;
    }

    return calculateElectricityRatePlan({
      monthlyKwh,
      peakPercent,
      shoulderPercent,
      flatRatePerKwh,
      peakRatePerKwh,
      shoulderRatePerKwh,
      offPeakRatePerKwh,
    });
  }, [values]);

  const offPeakPercentDisplay = useMemo(() => {
    const peak = Number(values.peakPercent?.trim() ?? "");
    const shoulder = Number(values.shoulderPercent?.trim() ?? "");
    if (!Number.isFinite(peak) || !Number.isFinite(shoulder)) return null;
    return Math.max(0, 100 - peak - shoulder);
  }, [values.peakPercent, values.shoulderPercent]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const savingsDetail = parsed
    ? `${parsed.betterPlanLabel} wins · ${formatCurrency(parsed.monthlySavings)}/mo · blended TOU ${formatNumber(parsed.blendedTouRate, { maxDecimals: 3 })} vs flat ${formatNumber(parsed.flatRatePerKwh, { maxDecimals: 3 })}`
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
          "Flat rate monthly": formatCurrency(parsed.flatMonthlyCost),
          "TOU monthly cost": formatCurrency(parsed.touMonthlyCost),
          "Annual savings (better plan)": formatCurrency(parsed.annualSavings),
          "Recommended plan": parsed.betterPlanLabel,
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
              label="Flat rate monthly"
              value={formatCurrency(parsed.flatMonthlyCost)}
              unit="/mo"
              detail={`${formatNumber(parsed.monthlyKwh, { maxDecimals: 0 })} kWh × ${formatNumber(parsed.flatRatePerKwh, { maxDecimals: 3 })}`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="TOU monthly cost"
              value={formatCurrency(parsed.touMonthlyCost)}
              unit="/mo"
              detail={`Peak ${formatNumber(parsed.peakKwh, { maxDecimals: 0 })} · shoulder ${formatNumber(parsed.shoulderKwh, { maxDecimals: 0 })} · off ${formatNumber(parsed.offPeakKwh, { maxDecimals: 0 })} kWh`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Potential savings"
              value={formatCurrency(parsed.annualSavings)}
              unit="/yr"
              detail={savingsDetail}
              interpret
              emptyMessage="—"
            />
            </div>
          ) : null
        }
      />

      {offPeakPercentDisplay !== null ? (
        <p className="text-center text-sm text-muted-foreground" role="status">
          Off-peak share (auto):{" "}
          <span className="font-medium text-foreground">
            {formatNumber(offPeakPercentDisplay, { maxDecimals: 0 })}%
          </span>{" "}
          of monthly kWh
        </p>
      ) : null}

      <section
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="tou-flat-learn-heading"
        >
          <h2
            id="tou-flat-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Clock className="size-4 text-primary" aria-hidden />
            When TOU pays off
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">Time-of-use</strong>{" "}
            tariffs reward shifting flexible loads into cheap windows. If a large
            share of your kWh already lands off-peak—or you can move dryers,
            dishwashers, EV charging, and pool pumps to evenings and nights—TOU
            often beats a single flat ¢/kWh.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Flat rate wins when most usage stays on-peak (late afternoon AC,
            cooking, homework hours) and overnight rates are not much lower than
            your flat average.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Moon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Run heavy appliances after off-peak starts on your tariff</span>
            </li>
            <li className="flex gap-2">
              <Sun className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Pre-cool with efficient AC before peak blocks if your plan allows</span>
            </li>
            <li className="flex gap-2">
              <Wind className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Enter rates in any currency (₪, $, €)—math is the same per kWh</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href={AC_EFFICIENCY_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {AC_EFFICIENCY_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={parsed ? formatCurrency(parsed.annualSavings) : null}
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
