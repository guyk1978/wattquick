"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Home,
  RotateCw,
  Snowflake,
  Thermometer,
  Volume2,
} from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateAcInverterSavings,
  INVERTER_SAVINGS_PERCENT_OPTIONS,
  type AcCapacityUnit,
  type InverterSavingsPercent,
} from "@/lib/calculators/appliances";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AcInverterSavingsBarVisual } from "@/components/calculator/ac-inverter-savings-bar-visual";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  calculatorResultsGrid,
  calculatorResultsGrid3,
  calculatorCommandPanel,
  calculatorResultValue,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "ac-inverter-savings" satisfies CalculatorId;

const INSULATION_CALCULATOR = {
  label: "Check your home insulation efficiency too",
  href: "/home-insulation-savings/",
} as const;

interface AcInverterSavingsCalculatorProps {
  className?: string;
}

function isCapacityUnit(value: string): value is AcCapacityUnit {
  return value === "hp" || value === "btu";
}

function isSavingsPercent(value: number): value is InverterSavingsPercent {
  return (INVERTER_SAVINGS_PERCENT_OPTIONS as readonly number[]).includes(value);
}

function formatPaybackLabel(
  paybackMonths: number | null,
  paybackYears: number | null
): string | null {
  if (paybackMonths === null) return null;
  if (paybackMonths === 0 && paybackYears === 0) return "Immediate";
  if (paybackYears !== null && paybackYears > 0) {
    if (paybackMonths > 0) {
      return `${paybackYears} yr ${formatNumber(paybackMonths, { maxDecimals: 0 })} mo`;
    }
    return `${paybackYears} years`;
  }
  return `${formatNumber(paybackMonths, { maxDecimals: 1 })} months`;
}

export function AcInverterSavingsCalculator({ className }: AcInverterSavingsCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "capacityUnit" && isCapacityUnit(value)) {
        setValue("capacityUnit", value);
        const current = parsePositive(values.capacityValue ?? "");
        if (value === "hp" && current !== null && current > 20) {
          setValue("capacityValue", String(Math.round((current / 9000) * 10) / 10));
        } else if (value === "btu" && current !== null && current <= 10) {
          setValue("capacityValue", String(Math.round(current * 9000)));
        }
        return;
      }
      setValue(id, value);
    },
    [setValue, values.capacityValue]
  );

  const parsed = useMemo(() => {
    const capacityValue = parsePositive(values.capacityValue ?? "");
    const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    const regularAcPrice = parseNonNegative(values.regularAcPrice ?? "");
    const inverterAcPrice = parseNonNegative(values.inverterAcPrice ?? "");
    const capacityUnit = values.capacityUnit ?? "hp";
    const savingsRaw = parsePositive(values.inverterSavingsPercent ?? "");

    if (
      capacityValue === null ||
      hoursPerDay === null ||
      ratePerKwh === null ||
      regularAcPrice === null ||
      inverterAcPrice === null ||
      savingsRaw === null ||
      !isCapacityUnit(capacityUnit) ||
      !isSavingsPercent(savingsRaw)
    ) {
      return null;
    }

    return calculateAcInverterSavings({
      capacityValue,
      capacityUnit,
      hoursPerDay,
      ratePerKwh,
      regularAcPrice,
      inverterAcPrice,
      inverterSavingsPercent: savingsRaw,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const paybackLabel = parsed
    ? formatPaybackLabel(parsed.paybackMonths, parsed.paybackYears)
    : null;
  const paybackDetail = parsed
    ? parsed.monthlySavings > 0
      ? `${formatCurrency(parsed.monthlySavings)}/mo · ${formatCurrency(parsed.annualSavings)}/yr · premium ${formatCurrency(parsed.pricePremium)}`
      : "Inverter price must be higher than on/off for payback math—or savings are zero"
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || paybackLabel === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: paybackLabel },
          "Monthly cost (on/off)": formatCurrency(parsed.monthlyCostRegular),
          "Monthly cost (inverter)": formatCurrency(parsed.monthlyCostInverter),
          "Monthly savings": formatCurrency(parsed.monthlySavings),
          "Annual savings": formatCurrency(parsed.annualSavings),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.result.label, definition.title, fieldLabels, parsed, paybackLabel, values]);

  return (
    <div className={cn(calculatorCommandPanel(), className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed && paybackLabel ? (
          <div className="calculator-result-card min-w-0 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-5 text-center sm:px-6 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Payback period
            </p>
            <p className={cn("mt-2", calculatorResultValue)}>{paybackLabel}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {parsed.pricePremium > 0 ? (
                <>
                  Recover {formatCurrency(parsed.pricePremium)} purchase premium via{" "}
                  {formatCurrency(parsed.monthlySavings)}/mo electricity savings
                </>
              ) : (
                <>Inverter costs the same or less upfront—energy savings start day one</>
              )}
            </p>
          </div>
        ) : null}

        {parsed ? (
          <>
            <AcInverterSavingsBarVisual
              monthlyCostRegular={parsed.monthlyCostRegular}
              monthlyCostInverter={parsed.monthlyCostInverter}
              monthlyKwhRegular={parsed.monthlyKwhRegular}
              monthlyKwhInverter={parsed.monthlyKwhInverter}
              regularBarPercent={parsed.regularBarPercent}
              inverterBarPercent={parsed.inverterBarPercent}
              monthlySavings={parsed.monthlySavings}
              savingsPercentApplied={parsed.savingsPercentApplied}
            />

            <div className={cn(calculatorResultsGrid, "gap-3")}>
              <div className="flex gap-3 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-300">
                  <RotateCw className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">On/Off (fixed speed)</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Compressor cycles full power then off — temperature swings, higher peak draw.
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold tabular-nums">
                    ~{formatNumber(parsed.avgWattsRegular, { maxDecimals: 0 })} W avg
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  <Activity className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Inverter (variable speed)</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Modulates compressor RPM — steadier room temp, quieter runs, less wear.
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold tabular-nums">
                    ~{formatNumber(parsed.avgWattsInverter, { maxDecimals: 0 })} W avg
                  </p>
                </div>
              </div>
            </div>

            <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Cooling capacity"
                value={formatNumber(parsed.btuPerHour, { maxDecimals: 0 })}
                unit="BTU/h"
                detail={`≈ ${formatNumber(parsed.hpEquivalent, { maxDecimals: 1 })} HP`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Monthly kWh saved"
                value={formatNumber(parsed.monthlyKwhSaved, { maxDecimals: 1 })}
                unit="kWh"
                detail={`${formatNumber(parsed.savingsPercentApplied, { maxDecimals: 0 })}% vs on/off`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Annual savings"
                value={formatCurrency(parsed.annualSavings)}
                unit="/yr"
                detail="Summer-month estimate × 12"
                emptyMessage="—"
              />
            </div>
          </>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="ac-inverter-learn-heading"
        >
          <h2
            id="ac-inverter-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Snowflake className="size-4 text-primary" aria-hidden />
            Why inverter AC costs less to run
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-2">
              <Thermometer className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Stable temperature</strong> — variable
                speed avoids overshoot and re-starts that waste kWh.
              </span>
            </li>
            <li className="flex gap-2">
              <Volume2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Quieter operation</strong> — lower
                average RPM means less noise than full-blast on/off cycles.
              </span>
            </li>
            <li className="flex gap-2">
              <Activity className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Less compressor wear</strong> — soft
                starts and partial load reduce mechanical stress over years.
              </span>
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
          value={paybackLabel}
          detail={paybackDetail}
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
