"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Car,
  CircleDot,
  Cog,
  Droplets,
  Filter,
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
  MAINTENANCE_COMPARISON_YEARS,
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
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { EvMaintenanceCumulativeVisual } from "@/components/calculator/ev-maintenance-cumulative-visual";
import { glassPanel, neonHeroNumber } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
const CALCULATOR_ID = "ev-vs-ice-maintenance" satisfies CalculatorId;

const SUPPORTING_ARTICLE = {
  title: "The true cost of EV ownership vs Gas cars",
  href: "/blog/true-cost-ev-ownership-vs-gas-cars/",
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
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const annualKm = parsePositive(values.annualKm ?? "");
    const vehicleClass = values.vehicleClass ?? "sedan";
    if (annualKm === null || !isVehicleClass(vehicleClass)) return null;
    return calculateEvVsIceMaintenance({ annualKm, vehicleClass });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const savingsValue = parsed ? formatCurrency(parsed.totalSavings) : null;
  const savingsDetail = parsed
    ? `${formatCurrency(parsed.annualSavings)}/yr · ICE ${formatCurrency(parsed.iceAnnualTotal)}/yr vs EV ${formatCurrency(parsed.evAnnualTotal)}/yr`
    : null;

  const iceOnlyItems = parsed
    ? parsed.lineItems.filter((row) => row.iceAnnual > 0 && row.evAnnual === 0)
    : [];

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
          "ICE annual maintenance": formatCurrency(parsed.iceAnnualTotal),
          "EV annual maintenance": formatCurrency(parsed.evAnnualTotal),
          "ICE 5-year total": formatCurrency(parsed.iceCumulativeTotal),
          "EV 5-year total": formatCurrency(parsed.evCumulativeTotal),
          "Annual savings": formatCurrency(parsed.annualSavings),
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
    parsed,
    savingsValue,
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

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Total savings ({MAINTENANCE_COMPARISON_YEARS} years)
            </p>
            <p className={cn("mt-2 flex items-baseline gap-0.5", neonHeroNumber)}>
              <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 sm:text-4xl">
                $
              </span>
              <AnimatedCounter target={parsed.totalSavings} decimals={0} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{savingsDetail}</p>
          </div>
        ) : null}

        {parsed ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(240px,1fr)_minmax(180px,1fr)] lg:items-start">
            <EvMaintenanceCumulativeVisual
              iceCumulativeByYear={parsed.iceCumulativeByYear}
              evCumulativeByYear={parsed.evCumulativeByYear}
              years={MAINTENANCE_COMPARISON_YEARS}
              totalSavings={parsed.totalSavings}
            />
            <CostGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={`${MAINTENANCE_COMPARISON_YEARS}-year maintenance savings`}
              value={savingsValue}
              unit=""
              detail={savingsDetail}
              emptyMessage={definition.result.emptyMessage}
            />
          </div>
        ) : (
          <CostGamifiedResult
            calculatorId={CALCULATOR_ID}
            label={definition.result.label}
            value={null}
            detail={null}
            emptyMessage={definition.result.emptyMessage}
          />
        )}

        {parsed ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CalculatorResult
              label="ICE annual maintenance"
              value={formatCurrency(parsed.iceAnnualTotal)}
              unit="/yr"
              detail={`Scaled for ${formatNumber(parsed.annualKm, { maxDecimals: 0 })} km/yr`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="EV annual maintenance"
              value={formatCurrency(parsed.evAnnualTotal)}
              unit="/yr"
              detail="Regenerative braking lowers pad wear"
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
            engine fluids—there is no internal combustion engine to service. Regenerative braking
            uses the drive motor to slow the car, so friction brakes work less often and pads last
            longer. You still budget for tires, cabin filters, brake fluid, coolant for the battery
            loop, and periodic health checks—but the moving-parts bill is much smaller over five
            years.
          </p>
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
          value={savingsValue}
          detail={savingsDetail}
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
