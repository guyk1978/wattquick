"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Battery,
  Car,
  CircleDot,
  Cog,
  Droplets,
  Filter,
  Info,
  Leaf,
  Sparkles,
  Wrench,
} from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateEvVsIceMaintenance,
  EV_ICE_VEHICLE_CLASS_PRESETS,
  type EvIceVehicleClass,
  type MaintenanceItemIcon,
} from "@/lib/calculators/ev-maintenance";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { EvMaintenanceCumulativeVisual } from "@/components/calculator/ev-maintenance-cumulative-visual";
import {
  calculatorResultsGrid,
  calculatorResultsGrid3,
  calculatorStatValue,
  calculatorCommandPanel,
} from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "ev-vs-ice-maintenance" satisfies CalculatorId;

const SUPPORTING_ARTICLE = {
  title: "The true cost of EV ownership vs Gas cars",
  href: "/blog/true-cost-ev-ownership-vs-gas-cars/",
} as const;

const BATTERY_ARTICLE = {
  title: "How long do EV batteries really last?",
  href: "/blog/how-long-do-ev-batteries-really-last/",
} as const;

const MAINTENANCE_ICONS: Record<
  MaintenanceItemIcon,
  ComponentType<{ className?: string }>
> = {
  oil: Droplets,
  filter: Filter,
  spark: Sparkles,
  belt: Cog,
  brakes: CircleDot,
  fluids: Droplets,
  inspect: Wrench,
  coolant: Leaf,
  tires: Car,
  battery: Battery,
};

interface EvVsIceMaintenanceCalculatorProps {
  className?: string;
}

function isVehicleClass(value: string): value is EvIceVehicleClass {
  return value in EV_ICE_VEHICLE_CLASS_PRESETS;
}

export function EvVsIceMaintenanceCalculator({ className }: EvVsIceMaintenanceCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "vehicleClass" && isVehicleClass(value)) {
        setValue("vehicleClass", value);
        setValue(
          "batteryReplacementCost",
          String(EV_ICE_VEHICLE_CLASS_PRESETS[value].defaultBatteryReplacementCost)
        );
        return;
      }
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const annualKm = parsePositive(values.annualKm ?? "");
    const vehicleClass = values.vehicleClass ?? "sedan";
    const comparisonYears = parsePositive(values.comparisonYears ?? "");
    const batteryLifeYears = parsePositive(values.batteryLifeYears ?? "");
    const batteryReplacementCost = parsePositive(values.batteryReplacementCost ?? "");
    if (
      annualKm === null ||
      !isVehicleClass(vehicleClass) ||
      comparisonYears === null ||
      (comparisonYears !== 5 && comparisonYears !== 10) ||
      batteryLifeYears === null ||
      batteryReplacementCost === null
    ) {
      return null;
    }
    return calculateEvVsIceMaintenance({
      annualKm,
      vehicleClass,
      comparisonYears: comparisonYears as 5 | 10,
      batteryLifeYears,
      batteryReplacementCost,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const years = parsed?.comparisonYears ?? 5;
  const maintenanceSavingsValue = parsed
    ? formatCurrency(parsed.maintenanceSavings)
    : null;
  const netSavingsValue = parsed ? formatCurrency(parsed.netSavings) : null;
  const netDetail = parsed
    ? parsed.netSavingsPositive
      ? `Maintenance saves ${formatCurrency(parsed.maintenanceSavings)} over ${years} yr${parsed.batteryCostInPeriod > 0 ? ` · pack risk ${formatCurrency(parsed.batteryCostInPeriod)}` : " · no pack replacement in window"}`
      : `Battery risk ${formatCurrency(parsed.batteryCostInPeriod)} exceeds ${formatCurrency(parsed.maintenanceSavings)} maintenance savings`
    : null;

  const iceOnlyItems = parsed
    ? parsed.lineItems.filter((row) => row.iceAnnual > 0 && row.evAnnual === 0)
    : [];

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || netSavingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: netSavingsValue },
          "Maintenance savings": formatCurrency(parsed.maintenanceSavings),
          "Potential battery cost": formatCurrency(parsed.batteryCostInPeriod),
          "ICE total": formatCurrency(parsed.iceCumulativeTotal),
          "EV maintenance total": formatCurrency(parsed.evCumulativeTotal),
          "EV total with battery risk": formatCurrency(parsed.evCumulativeWithBatteryTotal),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    fieldLabels,
    netSavingsValue,
    parsed,
    values,
  ]);

  return (
    <div className={cn(calculatorCommandPanel(), className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <div className={cn(calculatorResultsGrid3, "gap-3")}>
            <div className="min-w-0 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Maintenance savings ({years} yr)
              </p>
              <p
                className={cn(
                  calculatorStatValue,
                  "mt-2 text-emerald-800 dark:text-emerald-200"
                )}
              >
                {maintenanceSavingsValue}
              </p>
            </div>
            <div className="min-w-0 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Potential battery cost
              </p>
              <p
                className={cn(
                  calculatorStatValue,
                  "mt-2 text-amber-900 dark:text-amber-100"
                )}
              >
                {formatCurrency(parsed.batteryReplacementCost)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {parsed.batteryDueWithinPeriod ? (
                  <>
                    <span className="font-medium text-amber-900 dark:text-amber-100">
                      {formatCurrency(parsed.batteryCostInPeriod)} in your {years}-yr window
                    </span>
                    {parsed.batteryReplacementYear !== null
                      ? ` · due year ${parsed.batteryReplacementYear}`
                      : null}
                  </>
                ) : (
                  <>
                    Not subtracted in {years} yr — modeled at year {parsed.batteryLifeYears}. Shorten
                    battery life below {years} to stress-test net savings.
                  </>
                )}
              </p>
            </div>
            <div
              className={cn(
                "min-w-0 rounded-xl border px-4 py-4 text-center",
                parsed.netSavingsPositive
                  ? "border-primary/30 bg-primary/10"
                  : "border-red-500/30 bg-red-500/10"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Net savings
              </p>
              <div
                className={cn(
                  calculatorStatValue,
                  "mt-2",
                  parsed.netSavingsPositive
                    ? "text-emerald-800 dark:text-emerald-200"
                    : "text-red-800 dark:text-red-200"
                )}
              >
                {parsed.netSavingsPositive ? (
                  <>
                    +<AnimatedCounter target={parsed.netSavings} decimals={0} />
                  </>
                ) : (
                  formatCurrency(parsed.netSavings)
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {parsed.netSavingsPositive
                  ? "Still ahead after battery risk"
                  : "Battery scenario exceeds service savings"}
              </p>
            </div>
          </div>
        ) : null}

        {parsed ? (
          <EvMaintenanceCumulativeVisual
            iceCumulativeByYear={parsed.iceCumulativeByYear}
            evCumulativeByYear={parsed.evCumulativeByYear}
            evCumulativeWithBatteryByYear={parsed.evCumulativeWithBatteryByYear}
            years={years}
            maintenanceSavings={parsed.maintenanceSavings}
            showBatteryRisk={parsed.batteryDueWithinPeriod}
          />
        ) : null}

        <div
          className="flex items-start gap-3 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-4 text-sm text-foreground/90"
          role="note"
        >
          <Info className="mt-0.5 size-5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">Long-term battery replacement risk</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Pack replacement is a <strong className="font-medium text-foreground">low-probability</strong>{" "}
              event for many owners—most traction batteries are engineered for 15+ years, and
              warranties often cover 8 years or 160,000 km. We show it here so you can stress-test
              ownership costs, not because every EV needs a new pack within your comparison window.
            </p>
          </div>
        </div>

        {parsed ? (
          <div className={calculatorResultsGrid}>
            <CalculatorResult
              label="ICE annual maintenance"
              value={formatCurrency(parsed.iceAnnualTotal)}
              unit="/yr"
              detail={`${formatNumber(parsed.annualKm, { maxDecimals: 0 })} km/yr`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="EV annual maintenance"
              value={formatCurrency(parsed.evAnnualTotal)}
              unit="/yr"
              detail="Excludes pack replacement"
              emptyMessage="—"
            />
          </div>
        ) : null}

        {parsed && iceOnlyItems.length > 0 ? (
          <section aria-labelledby="maintenance-items-heading">
            <h2
              id="maintenance-items-heading"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              What you skip on an EV
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              ICE-only services you no longer pay for (annual estimates for your mileage).
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {iceOnlyItems.map((row) => {
                const Icon = MAINTENANCE_ICONS[row.icon];
                return (
                  <li
                    key={row.id}
                    className="flex gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{row.label}</p>
                      {row.note ? (
                        <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>
                      ) : null}
                      <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-amber-800 dark:text-amber-200">
                        {formatCurrency(row.iceAnnual)}
                        <span className="font-normal text-muted-foreground">/yr saved</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="ev-maintenance-learn-heading"
        >
          <h2
            id="ev-maintenance-learn-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Why EVs cost less to maintain
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Battery electric vehicles eliminate oil changes, spark plugs, timing belts, and most
            engine fluids. Regenerative braking cuts friction brake wear. Every pack includes a{" "}
            <strong className="font-medium text-foreground">Battery Management System (BMS)</strong>{" "}
            that limits charge speed, balances cells, and guards against over-voltage—helping modern
            packs last 15+ years in typical use. You still budget for tires, fluids, and inspections;
            the open question is whether a one-time pack replacement ever lands inside your
            ownership horizon.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link
              href={BATTERY_ARTICLE.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              {BATTERY_ARTICLE.title}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
            <Link
              href={SUPPORTING_ARTICLE.href}
              className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              {SUPPORTING_ARTICLE.title}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={netSavingsValue}
          detail={netDetail}
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
