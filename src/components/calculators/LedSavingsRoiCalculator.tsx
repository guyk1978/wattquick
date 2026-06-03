"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Clock, Flame, Leaf, Timer } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateLedSavingsRoi,
  LEGACY_BULB_PRESETS,
  type LegacyBulbType,
} from "@/lib/calculators/green-home";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { LedSavingsBarVisual } from "@/components/calculator/led-savings-bar-visual";
import { glassPanel, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "led-savings-roi" satisfies CalculatorId;

const SUPPORTING_ARTICLE = {
  title: "Why LED is the best investment for your home's energy efficiency",
  href: "/blog/why-led-best-investment-home-energy-efficiency/",
} as const;

interface LedSavingsRoiCalculatorProps {
  className?: string;
}

function isLegacyBulbType(value: string): value is LegacyBulbType {
  return value in LEGACY_BULB_PRESETS;
}

function formatBreakEven(months: number | null, days: number | null): string | null {
  if (months === null || days === null) return null;
  if (months < 1) {
    return `${formatNumber(days, { maxDecimals: 0 })} days`;
  }
  return `${formatNumber(months, { maxDecimals: 1 })} months`;
}

export function LedSavingsRoiCalculator({ className }: LedSavingsRoiCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "legacyBulbType" && isLegacyBulbType(value)) {
        const preset = LEGACY_BULB_PRESETS[value];
        setValue("legacyBulbType", value);
        setValue("legacyWatts", String(preset.defaultWatts));
        setValue("ledWatts", String(preset.suggestedLedWatts));
        return;
      }
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const legacyWatts = parsePositive(values.legacyWatts ?? "");
    const ledWatts = parsePositive(values.ledWatts ?? "");
    const ledBulbPrice = parsePositive(values.ledBulbPrice ?? "");
    const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    if (
      legacyWatts === null ||
      ledWatts === null ||
      ledBulbPrice === null ||
      hoursPerDay === null ||
      ratePerKwh === null
    ) {
      return null;
    }
    return calculateLedSavingsRoi({
      legacyWatts,
      ledWatts,
      ledBulbPrice,
      hoursPerDay,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const breakEvenValue = parsed
    ? formatBreakEven(parsed.paybackMonths, parsed.paybackDays)
    : null;
  const hasSavings = parsed !== null && parsed.dailySavings > 0;
  const breakEvenDetail = parsed
    ? hasSavings
      ? `${formatCurrency(parsed.dailySavings)}/day saved · bulb pays back in ${formatNumber(parsed.paybackDays ?? 0, { maxDecimals: 0 })} days`
      : "Choose an LED with lower watts than your existing bulb"
    : null;

  const resultKey = parsed
    ? `${parsed.paybackMonths}-${parsed.annualSavings}-${values.legacyWatts}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || breakEvenValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: breakEvenValue },
          "Annual operating cost (legacy)": formatCurrency(parsed.annualCostLegacy),
          "Annual operating cost (LED)": formatCurrency(parsed.annualCostLed),
          "Annual savings": formatCurrency(parsed.annualSavings),
          "Monthly savings": formatCurrency(parsed.monthlySavings),
          "Daily savings": formatCurrency(parsed.dailySavings),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    breakEvenValue,
    definition.result.label,
    definition.title,
    fieldLabels,
    parsed,
    values,
  ]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        {parsed && !hasSavings ? (
          <div
            className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground/90"
            role="status"
          >
            <Clock className="size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
            <span>
              The LED must draw fewer watts than the existing bulb to save on electricity.
              Lower the LED watts or pick a higher-efficiency replacement.
            </span>
          </div>
        ) : null}

        <div className="h-px bg-border/60" aria-hidden />

        <GamifiedDashboardFrame
          accent="cost"
          label="Time to break even"
          ambientClassName="bg-emerald-500/[0.1] dark:bg-emerald-500/[0.18]"
        >
          <div
            key={resultKey}
            className={cn(
              "mt-5 transition-opacity duration-200",
              "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:fill-mode-both",
              !parsed && "opacity-70"
            )}
          >
            {!parsed || !hasSavings ? (
              <p className="text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
                {definition.result.emptyMessage}
              </p>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(220px,1fr)_minmax(160px,1fr)] lg:items-center">
                <LedSavingsBarVisual
                  legacyAnnualCost={parsed.annualCostLegacy}
                  ledAnnualCost={parsed.annualCostLed}
                  legacyBarPercent={parsed.legacyBarPercent}
                  ledBarPercent={parsed.ledBarPercent}
                  annualSavings={parsed.annualSavings}
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Time to Break Even
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className={neonHeroNumber}>{breakEvenValue}</span>
                  </div>
                  {breakEvenDetail ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {breakEvenDetail}
                    </p>
                  ) : null}
                  <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
                    <Timer className="size-4 shrink-0 text-primary" aria-hidden />
                    <span>
                      {formatCurrency(parsePositive(values.ledBulbPrice ?? "") ?? 0)} bulb ÷{" "}
                      {formatCurrency(parsed.dailySavings)}/day
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GamifiedDashboardFrame>

        {parsed && hasSavings ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <CalculatorResult
              label="Daily operating cost"
              value={formatCurrency(parsed.dailyCostLegacy)}
              unit="legacy"
              detail={`LED ${formatCurrency(parsed.dailyCostLed)}/day · save ${formatCurrency(parsed.dailySavings)}`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Monthly operating cost"
              value={formatCurrency(parsed.monthlyCostLegacy)}
              unit="legacy"
              detail={`LED ${formatCurrency(parsed.monthlyCostLed)}/mo · save ${formatCurrency(parsed.monthlySavings)}`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Annual operating cost"
              value={formatCurrency(parsed.annualCostLegacy)}
              unit="legacy"
              detail={`LED ${formatCurrency(parsed.annualCostLed)}/yr · save ${formatCurrency(parsed.annualSavings)}`}
              emptyMessage="—"
            />
          </div>
        ) : null}

        {parsed && hasSavings ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Power saved
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {parsed.wattSavings}{" "}
                <span className="text-sm font-medium text-muted-foreground">W per bulb</span>
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Payback in days
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {formatNumber(parsed.paybackDays ?? 0, { maxDecimals: 0 })}{" "}
                <span className="text-sm font-medium text-muted-foreground">days</span>
              </p>
            </div>
          </div>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="led-benefits-heading"
        >
          <h2
            id="led-benefits-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Beyond the electric bill
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <Leaf
                className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
              <span>
                <strong className="font-medium text-foreground">Longer life:</strong> quality
                LEDs often last 15,000–50,000 hours—years of daily use before replacement.
              </span>
            </li>
            <li className="flex gap-3">
              <Flame
                className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden
              />
              <span>
                <strong className="font-medium text-foreground">Less heat:</strong> fewer watts
                mean less waste heat, which helps in summer and reduces stress on shades and
                enclosed fixtures.
              </span>
            </li>
            <li className="flex gap-3">
              <Timer className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Fast payback:</strong> on
                heavily used fixtures, energy savings alone often return the bulb price in
                months—not years.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            <Link
              href={SUPPORTING_ARTICLE.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              {SUPPORTING_ARTICLE.title}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </p>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={breakEvenValue}
          detail={breakEvenDetail}
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
