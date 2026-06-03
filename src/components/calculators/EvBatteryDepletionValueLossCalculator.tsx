"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Battery, Gauge, TrendingDown, Wrench } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateEvBatteryDepletionValueLoss,
  EV_DC_FAST_CHARGE_DEGRADATION,
  type EvDcFastChargeFrequency,
} from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { EvGamifiedResult } from "@/components/calculator/ev-gamified-result";
import { calculatorResultsGrid3, glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "ev-battery-depletion-value-loss" satisfies CalculatorId;

const MAINTENANCE_CALCULATOR = {
  label: "EV vs ICE maintenance & battery replacement costs",
  href: "/ev-vs-ice-maintenance/",
} as const;

interface EvBatteryDepletionValueLossCalculatorProps {
  className?: string;
}

function isFastChargeFrequency(value: string): value is EvDcFastChargeFrequency {
  return value in EV_DC_FAST_CHARGE_DEGRADATION;
}

export function EvBatteryDepletionValueLossCalculator({
  className,
}: EvBatteryDepletionValueLossCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const purchasePrice = parsePositive(values.purchasePrice ?? "");
    const currentMileage = parseNonNegative(values.currentMileage ?? "");
    const vehicleAgeYears = parseNonNegative(values.vehicleAgeYears ?? "");
    const fastChargingFrequency = values.fastChargingFrequency ?? "";

    if (
      purchasePrice === null ||
      currentMileage === null ||
      vehicleAgeYears === null ||
      !isFastChargeFrequency(fastChargingFrequency)
    ) {
      return null;
    }

    return calculateEvBatteryDepletionValueLoss({
      purchasePrice,
      currentMileage,
      vehicleAgeYears,
      fastChargingFrequency,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const resaleValue = parsed ? formatCurrency(parsed.estimatedCurrentValue) : null;
  const resaleDetail = parsed
    ? `${parsed.healthStatus} pack · ${formatNumber(parsed.capacityLossFromNewPct, { maxDecimals: 1 })}% capacity fade modeled`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || resaleValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          "Battery health (SoH)": `${formatNumber(parsed.batteryHealthPercent, { maxDecimals: 1 })}%`,
          "Value lost (battery)": formatCurrency(parsed.valueLostDueToBattery),
          "Estimated resale value": resaleValue,
          "Purchase price": formatCurrency(parsed.purchasePrice),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, resaleValue, values]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={setValue}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <>
            <EvGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={definition.result.label}
              value={resaleValue}
              detail={resaleDetail}
              emptyMessage={definition.result.emptyMessage}
            />

            <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Battery health %"
                value={formatNumber(parsed.batteryHealthPercent, { maxDecimals: 1 })}
                unit="% SoH"
                detail={`Calendar ${formatNumber(parsed.calendarLossPct, { maxDecimals: 1 })}% + mileage ${formatNumber(parsed.mileageLossPct, { maxDecimals: 1 })}% + DC ${formatNumber(parsed.fastChargeLossPct, { maxDecimals: 1 })}%`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Value lost"
                value={formatCurrency(parsed.valueLostDueToBattery)}
                detail={`Battery share ${formatNumber(parsed.batteryValueShare * 100, { maxDecimals: 0 })}% of ${formatCurrency(parsed.purchasePrice)} MSRP`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Estimated resale value"
                value={formatCurrency(parsed.estimatedCurrentValue)}
                detail={`After ${formatNumber(parsed.capacityLossFromNewPct, { maxDecimals: 1 })}% pack fade · ${parsed.vehicleAgeYears} yr · ${formatNumber(parsed.currentMileage, { maxDecimals: 0 })} mi`}
                emptyMessage="—"
              />
            </div>
          </>
        ) : (
          <EvGamifiedResult
            calculatorId={CALCULATOR_ID}
            label={definition.result.label}
            value={null}
            detail={null}
            emptyMessage={definition.result.emptyMessage}
          />
        )}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="ev-depletion-soh-heading"
        >
          <h2
            id="ev-depletion-soh-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Battery className="size-4 text-primary" aria-hidden />
            State of Health (SoH)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">SoH</strong> is the traction
            battery&apos;s remaining useful capacity versus when new—usually reported as a
            percentage. At 100% SoH the pack still delivers its original rated kWh; as lithium-ion
            cells age through calendar time, cycling, and heat from{" "}
            <strong className="font-medium text-foreground">DC fast charging</strong>, usable
            capacity fades and buyers discount the vehicle accordingly.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This tool applies a{" "}
            <strong className="font-medium text-foreground">~2.3% per-year</strong> industry
            planning average for calendar loss, adds mileage and fast-charge stress, then maps
            capacity fade to dollar loss using a typical pack share of purchase price—not a
            dealer appraisal.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Gauge className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Level 2 overnight charging slows fade versus living on DC fast chargers</span>
            </li>
            <li className="flex gap-2">
              <TrendingDown className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Resale value here isolates battery-driven loss from your original price</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href={MAINTENANCE_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <Wrench className="size-3.5 shrink-0" aria-hidden />
              {MAINTENANCE_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={resaleValue}
          detail={resaleDetail}
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
