"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Home, Thermometer } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateHomeInsulationSavings,
  inferInsulationClimateFromLatitude,
  INSULATION_CLIMATE_PRESETS,
  INSULATION_LEVEL_PRESETS,
  WINDOW_GLAZING_PRESETS,
  type InsulationClimateZone,
  type InsulationLevel,
  type WindowGlazing,
} from "@/lib/calculators/green-home";
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
import { InsulationSavingsBarVisual } from "@/components/calculator/insulation-savings-bar-visual";
import {
  calculatorCommandSubPanel,
  calculatorResultsGrid,
  calculatorResultsGrid3,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "home-insulation-savings" satisfies CalculatorId;

const SUPPORTING_ARTICLE = {
  title: "The impact of thermal insulation on home energy bills",
  href: "/blog/thermal-insulation-home-energy-bills/",
} as const;

interface HomeInsulationSavingsCalculatorProps {
  className?: string;
}

function isInsulationLevel(value: string): value is InsulationLevel {
  return value in INSULATION_LEVEL_PRESETS;
}

function isWindowGlazing(value: string): value is WindowGlazing {
  return value in WINDOW_GLAZING_PRESETS;
}

function isClimateZone(value: string): value is InsulationClimateZone {
  return value in INSULATION_CLIMATE_PRESETS;
}

function EfficiencyScoreBadge({
  label,
  score,
  variant,
}: {
  label: string;
  score: number;
  variant: "before" | "after";
}) {
  const fillPercent = Math.min(100, Math.max(10, (score / 10) * 100));
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="relative h-3 w-full max-w-[10rem] overflow-hidden rounded-full bg-muted/60">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-700 ease-out",
            variant === "before"
              ? "bg-gradient-to-r from-orange-500 to-amber-400"
              : "bg-gradient-to-r from-emerald-600 to-emerald-400"
          )}
          style={{ width: `${fillPercent}%` }}
        />
      </div>
      <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
        {formatNumber(score, { maxDecimals: 1 })}
        <span className="text-sm font-medium text-muted-foreground">/10</span>
      </p>
    </div>
  );
}

export function HomeInsulationSavingsCalculator({
  className,
}: HomeInsulationSavingsCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);
  const climateDetected = useRef(false);

  useEffect(() => {
    if (climateDetected.current || typeof navigator === "undefined") return;
    if (!navigator.geolocation) return;

    climateDetected.current = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const zone = inferInsulationClimateFromLatitude(position.coords.latitude);
        setValue("climateZone", zone);
      },
      () => {
        /* keep moderate default from field definition */
      },
      { maximumAge: 86_400_000, timeout: 8000 }
    );
  }, [setValue]);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const floorAreaM2 = parsePositive(values.floorAreaM2 ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    const insulationLevel = values.insulationLevel ?? "standard";
    const windowType = values.windowType ?? "double";
    const climateZone = values.climateZone ?? "moderate";

    if (
      floorAreaM2 === null ||
      ratePerKwh === null ||
      !isInsulationLevel(insulationLevel) ||
      !isWindowGlazing(windowType) ||
      !isClimateZone(climateZone)
    ) {
      return null;
    }

    return calculateHomeInsulationSavings({
      floorAreaM2,
      insulationLevel,
      windowType,
      climateZone,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const savingsValue = parsed ? formatCurrency(parsed.annualSavings) : null;
  const savingsDetail = parsed
    ? `${formatNumber(parsed.savingsPercent, { maxDecimals: 1 })}% less HVAC · ${formatNumber(parsed.annualKwhBefore - parsed.annualKwhAfter, { maxDecimals: 0 })} kWh/yr`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || savingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: savingsValue },
          "Annual cost before": formatCurrency(parsed.annualCostBefore),
          "Annual cost after": formatCurrency(parsed.annualCostAfter),
          "Heat loss before": `${formatNumber(parsed.heatLossKwBefore, { maxDecimals: 2 })} kW`,
          "Heat loss after": `${formatNumber(parsed.heatLossKwAfter, { maxDecimals: 2 })} kW`,
          "Efficiency score before": `${formatNumber(parsed.efficiencyScoreBefore, { maxDecimals: 1 })}/10`,
          "Efficiency score after": `${formatNumber(parsed.efficiencyScoreAfter, { maxDecimals: 1 })}/10`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.result.label, definition.title, fieldLabels, parsed, savingsValue, values]);

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
                label="Composite U-value (before)"
                value={formatNumber(parsed.compositeUBefore, { maxDecimals: 2 })}
                unit="W/m²·K"
                detail="Lower is better — measures heat flow"
                emptyMessage="—"
              />
              <CalculatorResult
                label="Design heat loss (before)"
                value={formatNumber(parsed.heatLossKwBefore, { maxDecimals: 2 })}
                unit="kW"
                detail="At climate design ΔT"
                emptyMessage="—"
              />
              <CalculatorResult
                label="Annual HVAC savings"
                value={formatCurrency(parsed.annualSavings)}
                unit="/yr"
                detail={`${formatNumber(parsed.savingsPercent, { maxDecimals: 1 })}% vs. current envelope`}
                emptyMessage="—"
              />
            </div>
          ) : null
        }
      />

      {parsed ? (
        <>
          <InsulationSavingsBarVisual
              annualKwhBefore={parsed.annualKwhBefore}
              annualKwhAfter={parsed.annualKwhAfter}
              annualCostBefore={parsed.annualCostBefore}
              annualCostAfter={parsed.annualCostAfter}
              beforeBarPercent={parsed.beforeBarPercent}
              afterBarPercent={parsed.afterBarPercent}
              annualSavings={parsed.annualSavings}
              savingsPercent={parsed.savingsPercent}
            />

            <div className={cn(calculatorCommandSubPanel, "p-4 sm:p-5")}>
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Energy efficiency score
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 sm:gap-8">
                <EfficiencyScoreBadge
                  label="Current envelope"
                  score={parsed.efficiencyScoreBefore}
                  variant="before"
                />
                <ArrowRight
                  className="hidden size-5 shrink-0 text-muted-foreground sm:block"
                  aria-hidden
                />
                <EfficiencyScoreBadge
                  label="After upgrade"
                  score={parsed.efficiencyScoreAfter}
                  variant="after"
                />
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Upgrade scenario: {parsed.upgradeInsulationLabel} +{" "}
                {parsed.upgradeWindowLabel}
              </p>
            </div>
        </>
      ) : null}

      <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="insulation-learn-heading"
        >
          <h2
            id="insulation-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Thermometer className="size-4 text-primary" aria-hidden />
            U-value and comfort
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">U-value</strong> (W/m²·K) is the inverse
            of R-value: it measures how quickly heat moves through walls and windows. High U means
            more heat loss in winter and more heat gain in summer—your HVAC runs longer and rooms
            feel drafty near exterior surfaces. Better insulation and Low-E glazing lower the
            composite U of the envelope, shrinking both heating and cooling bills while evening out
            indoor temperatures.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link
              href={SUPPORTING_ARTICLE.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              {SUPPORTING_ARTICLE.title}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/heat-loss-insulation/"
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              <Home className="size-3.5 shrink-0" aria-hidden />
              Building heat loss calculator
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={savingsValue}
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
