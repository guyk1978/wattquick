"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Droplets, Home, Snowflake, Waves, Zap } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculatePoolEnergyThermalCover,
  POOL_HEAT_PUMP_COP_OPTIONS,
  POOL_HEATING_METHOD_PRESETS,
  POOL_THERMAL_COVER_SAVINGS_OPTIONS,
  type PoolHeatPumpCop,
  type PoolHeatingMethod,
  type PoolThermalCoverSavingsPercent,
} from "@/lib/calculators/appliances";
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
import { PoolHeatingComparisonVisual } from "@/components/calculator/pool-heating-comparison-visual";
import { calculatorResultsGrid3 } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "pool-energy-thermal-cover" satisfies CalculatorId;

const INSULATION_CALCULATOR = {
  label: "Check your home insulation savings too",
  href: "/home-insulation-savings/",
} as const;

const AC_CALCULATOR = {
  label: "Calculate your home AC efficiency",
  href: "/ac-inverter-savings/",
} as const;

interface PoolEnergyThermalCoverCalculatorProps {
  className?: string;
}

function isCoverSavingsPercent(value: number): value is PoolThermalCoverSavingsPercent {
  return (POOL_THERMAL_COVER_SAVINGS_OPTIONS as readonly number[]).includes(value);
}

function isHeatPumpCop(value: number): value is PoolHeatPumpCop {
  return (POOL_HEAT_PUMP_COP_OPTIONS as readonly number[]).includes(value);
}

function isHeatingMethod(value: string): value is PoolHeatingMethod {
  return value in POOL_HEATING_METHOD_PRESETS;
}

export function PoolEnergyThermalCoverCalculator({
  className,
}: PoolEnergyThermalCoverCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "heatingMethod" && isHeatingMethod(value)) {
        setValue("heatingMethod", value);
        if (value === "heat_pump" && !values.heatPumpCop) {
          setValue("heatPumpCop", "5");
        }
        return;
      }
      setValue(id, value);
    },
    [setValue, values.heatPumpCop]
  );

  const parsed = useMemo(() => {
    const pumpKw = parsePositive(values.pumpKw ?? "");
    const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    const heatPumpCopRaw = parsePositive(values.heatPumpCop ?? "");
    const useThermalCover = (values.useThermalCover ?? "no") === "yes";
    const savingsRaw = parsePositive(values.coverSavingsPercent ?? "");
    const heatingMethod = values.heatingMethod ?? "heat_pump";

    if (
      pumpKw === null ||
      hoursPerDay === null ||
      ratePerKwh === null ||
      heatPumpCopRaw === null ||
      savingsRaw === null ||
      !isCoverSavingsPercent(savingsRaw) ||
      !isHeatPumpCop(heatPumpCopRaw) ||
      !isHeatingMethod(heatingMethod)
    ) {
      return null;
    }

    return calculatePoolEnergyThermalCover({
      pumpKw,
      hoursPerDay,
      ratePerKwh,
      heatingMethod,
      heatPumpCop: heatPumpCopRaw,
      useThermalCover,
      coverSavingsPercent: savingsRaw,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const dailyCostDisplay = parsed
    ? formatCurrency(parsed.useThermalCover ? parsed.dailyCostWithCover : parsed.dailyCostWithoutCover)
    : null;

  const annualSavingsValue = parsed ? formatCurrency(parsed.annualTotalSavings) : null;
  const resultDetail = parsed
    ? `Cover ${formatCurrency(parsed.annualCoverSavings)}/yr · Heat pump vs electric ${formatCurrency(parsed.annualHeatingSavingsHpVsElectric)}/yr · COP ${formatNumber(parsed.activeCop, { maxDecimals: 0 })}`
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
          "Daily cost": dailyCostDisplay ?? "—",
          "Monthly cover savings": formatCurrency(parsed.monthlyCoverSavings),
          "Monthly HP vs electric": formatCurrency(parsed.monthlyHeatingSavingsHpVsElectric),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    annualSavingsValue,
    dailyCostDisplay,
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
            onChange={handleFieldChange}
          />
        }
        results={
          parsed ? (
            <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Daily cost"
                value={dailyCostDisplay}
                unit="/day"
                detail={`${POOL_HEATING_METHOD_PRESETS[parsed.heatingMethod].label} · COP ${formatNumber(parsed.activeCop, { maxDecimals: 0 })}`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Monthly savings"
                value={formatCurrency(parsed.monthlyCoverSavings)}
                unit="/mo"
                detail={
                  parsed.useThermalCover
                    ? `Cover · +${formatCurrency(parsed.monthlyHeatingSavingsHpVsElectric)}/mo HP vs electric`
                    : `Cover off · HP saves ${formatCurrency(parsed.monthlyHeatingSavingsHpVsElectric)}/mo vs resistance`
                }
                emptyMessage="—"
              />
              <CalculatorResult
                label="Annual savings"
                value={formatCurrency(parsed.annualTotalSavings)}
                unit="/yr"
                detail={`Cover ${formatCurrency(parsed.annualCoverSavings)} + heating ${formatCurrency(parsed.annualHeatingSavingsHpVsElectric)}`}
                emptyMessage="—"
              />
            </div>
          ) : null
        }
      />

      {parsed ? (
        <PoolHeatingComparisonVisual
          monthlyHeatingCostElectric={parsed.monthlyHeatingCostElectric}
          monthlyHeatingCostHeatPump={parsed.monthlyHeatingCostHeatPump}
          monthlyHeatingSavingsHpVsElectric={parsed.monthlyHeatingSavingsHpVsElectric}
          heatPumpCop={parsed.heatPumpCop}
          electricBarPercent={parsed.electricBarPercent}
          heatPumpBarPercent={parsed.heatPumpBarPercent}
        />
      ) : null}

      <section
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="pool-cover-learn-heading"
        >
          <h2
            id="pool-cover-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Waves className="size-4 text-primary" aria-hidden />
            Cover, chemistry &amp; heat pumps
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A thermal blanket cuts{" "}
            <strong className="font-medium text-foreground">evaporation</strong>—less make-up
            water and sanitizer dilution. For heated pools, a{" "}
            <strong className="font-medium text-foreground">heat pump</strong> does not burn
            electricity to create heat; it transfers energy from the air into the water (like a
            refrigerator in reverse), which is why COP 4–6 is common while resistance stays at 1:1.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Droplets className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Cover savings apply to heat demand; pump kWh stays the same</span>
            </li>
            <li className="flex gap-2">
              <Snowflake className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Heat pump grid kWh = heat needed ÷ COP</span>
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link
              href={AC_CALCULATOR.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              <Zap className="size-3.5 shrink-0" aria-hidden />
              {AC_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
            <Link
              href={INSULATION_CALCULATOR.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              <Home className="size-3.5 shrink-0" aria-hidden />
              {INSULATION_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
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
    </CalculatorCommandShell>
  );
}
