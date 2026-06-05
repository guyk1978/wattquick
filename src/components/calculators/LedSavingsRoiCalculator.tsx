"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Flame,
  Leaf,
  Timer,
  TreeDeciduous,
} from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateLedSavingsRoi,
  GRID_CO2_REGION_PRESETS,
  LEGACY_BULB_PRESETS,
  type GridCarbonRegion,
  type LegacyBulbType,
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
import {
  LedSavingsBarVisual,
  type LedSavingsChartView,
} from "@/components/calculator/led-savings-bar-visual";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import {
  calculatorResultValueRow,
  calculatorResultsGrid,
  calculatorResultsGrid3,
  calculatorResultValue,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "led-savings-roi" satisfies CalculatorId;

const SUPPORTING_ARTICLE = {
  title: "Why LED is the best investment for your home's energy efficiency",
  href: "/blog/why-led-best-investment-home-energy-efficiency/",
} as const;

const CARBON_LEARN_MORE = {
  title: "How lighting efficiency impacts global carbon emissions",
  source: "International Energy Agency",
  href: "https://www.iea.org/data-and-statistics/charts/co2-emissions-and-emissions-intensity-for-lighting-in-the-net-zero-scenario-2000-2030",
} as const;

interface LedSavingsRoiCalculatorProps {
  className?: string;
}

function isLegacyBulbType(value: string): value is LegacyBulbType {
  return value in LEGACY_BULB_PRESETS;
}

function isGridCarbonRegion(value: string): value is GridCarbonRegion {
  return value in GRID_CO2_REGION_PRESETS;
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
  const [chartView, setChartView] = useState<LedSavingsChartView>("financial");

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "legacyBulbType" && isLegacyBulbType(value)) {
        const preset = LEGACY_BULB_PRESETS[value];
        setValue("legacyBulbType", value);
        setValue("legacyWatts", String(preset.defaultWatts));
        setValue("ledWatts", String(preset.suggestedLedWatts));
        return;
      }
      if (id === "gridCarbonRegion" && isGridCarbonRegion(value)) {
        const preset = GRID_CO2_REGION_PRESETS[value];
        setValue("gridCarbonRegion", value);
        if (value !== "custom") {
          setValue("co2KgPerKwh", String(preset.kgCo2PerKwh));
        }
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
    const co2KgPerKwh = parsePositive(values.co2KgPerKwh ?? "");
    if (
      legacyWatts === null ||
      ledWatts === null ||
      ledBulbPrice === null ||
      hoursPerDay === null ||
      ratePerKwh === null ||
      co2KgPerKwh === null
    ) {
      return null;
    }
    return calculateLedSavingsRoi({
      legacyWatts,
      ledWatts,
      ledBulbPrice,
      hoursPerDay,
      ratePerKwh,
      co2KgPerKwh,
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
      ? `${formatCurrency(parsed.annualSavings)}/yr · ${formatNumber(parsed.annualCo2SavedKg, { maxDecimals: 1 })} kg CO₂/yr · ${formatNumber(parsed.paybackDays ?? 0, { maxDecimals: 0 })} day payback`
      : "Choose an LED with lower watts than your existing bulb"
    : null;

  const resultKey = parsed
    ? `${parsed.paybackMonths}-${parsed.annualSavings}-${parsed.annualCo2SavedKg}-${chartView}`
    : "empty";

  const chartLegacy =
    chartView === "financial"
      ? parsed?.annualCostLegacy ?? 0
      : parsed?.annualCo2LegacyKg ?? 0;
  const chartLed =
    chartView === "financial" ? parsed?.annualCostLed ?? 0 : parsed?.annualCo2LedKg ?? 0;
  const chartSavings =
    chartView === "financial"
      ? parsed?.annualSavings ?? 0
      : parsed?.annualCo2SavedKg ?? 0;
  const chartLegacyPct =
    chartView === "financial"
      ? parsed?.legacyBarPercent ?? 4
      : parsed?.legacyCo2BarPercent ?? 4;
  const chartLedPct =
    chartView === "financial" ? parsed?.ledBarPercent ?? 4 : parsed?.ledCo2BarPercent ?? 4;

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
          "Annual CO₂ avoided": `${formatNumber(parsed.annualCo2SavedKg, { maxDecimals: 1 })} kg`,
          "Annual kWh saved": `${formatNumber(parsed.annualKwhSaved, { maxDecimals: 1 })} kWh`,
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
              <div className="flex flex-col gap-5">
                <div
                  className="flex rounded-none border border-border/50 bg-muted/30 p-1"
                  role="tablist"
                  aria-label="Comparison chart view"
                >
                  {(
                    [
                      { id: "financial" as const, label: "Financial savings" },
                      { id: "carbon" as const, label: "CO₂ reduction" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={chartView === tab.id}
                      onClick={() => setChartView(tab.id)}
                      className={cn(
                        "flex-1 rounded-none px-3 py-2 text-xs font-semibold transition-colors sm:text-sm",
                        chartView === tab.id
                          ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(220px,1fr)_minmax(160px,1fr)] lg:items-center">
                  <LedSavingsBarVisual
                    view={chartView}
                    legacyValue={chartLegacy}
                    ledValue={chartLed}
                    legacyBarPercent={chartLegacyPct}
                    ledBarPercent={chartLedPct}
                    annualSavings={chartSavings}
                  />
                  <div className="flex min-w-0 flex-col gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Time to Break Even
                    </p>
                    <div className={calculatorResultValueRow}>
                      <span className={calculatorResultValue}>{breakEvenValue}</span>
                    </div>
                    {breakEvenDetail ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {breakEvenDetail}
                      </p>
                    ) : null}
                    <div className="flex items-center gap-2 rounded-none border border-primary/25 bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
                      <Timer className="size-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        {formatCurrency(parsePositive(values.ledBulbPrice ?? "") ?? 0)} bulb ÷{" "}
                        {formatCurrency(parsed.dailySavings)}/day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GamifiedDashboardFrame>
        }
      />

      {parsed && !hasSavings ? (
        <div
          className="flex items-center gap-3 rounded-none border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground/90"
          role="status"
        >
          <Clock className="size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
          <span>
            The LED must draw fewer watts than the existing bulb to save on electricity
            and carbon.
          </span>
        </div>
      ) : null}

      {parsed && hasSavings ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-none border border-emerald-500/30 bg-emerald-500/10 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Annual financial savings
              </p>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
                {formatCurrency(parsed.annualSavings)}
                <span className="text-sm font-semibold text-muted-foreground">/yr</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatCurrency(parsed.monthlySavings)}/mo · {formatCurrency(parsed.dailySavings)}
                /day
              </p>
            </div>
            <div className="rounded-none border border-emerald-500/35 bg-emerald-500/[0.12] px-4 py-4 dark:bg-emerald-500/10">
              <div className="flex items-center gap-2">
                <TreeDeciduous
                  className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Carbon footprint reduction
                </p>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-emerald-800 dark:text-emerald-200">
                {formatNumber(parsed.annualCo2SavedKg, { maxDecimals: 1 })}
                <span className="text-sm font-semibold text-muted-foreground"> kg CO₂/yr</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatNumber(parsed.annualKwhSaved, { maxDecimals: 1 })} kWh saved ×{" "}
                {values.co2KgPerKwh ?? "0.5"} kg/kWh
              </p>
            </div>
          </div>
        ) : null}

      {parsed && hasSavings ? (
        <div className={calculatorResultsGrid3}>
            <CalculatorResult
              label="Daily operating cost"
              value={formatCurrency(parsed.dailyCostLegacy)}
              unit="legacy"
              detail={`LED ${formatCurrency(parsed.dailyCostLed)}/day`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Monthly operating cost"
              value={formatCurrency(parsed.monthlyCostLegacy)}
              unit="legacy"
              detail={`Save ${formatCurrency(parsed.monthlySavings)}/mo`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Annual CO₂ avoided"
              value={formatNumber(parsed.annualCo2SavedKg, { maxDecimals: 1 })}
              unit="kg"
              detail={`${formatNumber(parsed.monthlyCo2SavedKg, { maxDecimals: 2 })} kg/mo · ${formatNumber(parsed.annualKwhSaved, { maxDecimals: 1 })} kWh saved`}
              emptyMessage="—"
            />
          </div>
        ) : null}

        {parsed && hasSavings ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-none border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Power saved
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {parsed.wattSavings}{" "}
                <span className="text-sm font-medium text-muted-foreground">W per bulb</span>
              </p>
            </div>
            <div className="rounded-none border border-border/50 bg-muted/25 px-4 py-3">
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
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
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

        <section
          className="rounded-none border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6"
          aria-labelledby="led-carbon-learn-heading"
        >
          <h2
            id="led-carbon-learn-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Learn more: electricity and greenhouse gases
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most home lighting emissions are{" "}
            <strong className="font-medium text-foreground">indirect</strong>—they come from power
            plants that supply your grid, not from the bulb itself. Every kWh you avoid by switching
            to LED multiplies by your region&apos;s carbon intensity (kg CO₂ per kWh) to estimate
            greenhouse gas savings. Cleaner grids mean fewer kg CO₂ per kWh saved; coal-heavy grids
            mean each watt-hour cut matters even more.
          </p>
          <a
            href={CARBON_LEARN_MORE.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-4 flex items-start justify-between gap-3 rounded-none border border-border/40",
              "bg-background/40 px-4 py-3 text-sm transition-colors",
              "hover:border-emerald-500/30 hover:bg-emerald-500/5"
            )}
          >
            <span>
              <span className="font-medium text-foreground">
                {CARBON_LEARN_MORE.title}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {CARBON_LEARN_MORE.source}
              </span>
            </span>
            <ExternalLink
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </a>
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
    </CalculatorCommandShell>
  );
}
