"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Bike, Car, CircleDollarSign } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateMobilityTco,
  MOBILITY_TCO_DEFAULTS,
  type MobilityTcoModeResult,
} from "@/lib/calculators/mobility-tco";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import { MobilityTcoBarChart } from "@/components/calculator/mobility-tco-bar-chart";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorCommandInput, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "mobility-tco-calculator" satisfies CalculatorId;

const RELATED_LINKS = {
  ebikeRangeGuide: {
    label: "E-Bike Range Guide",
    href: "/blog/ebike-range-guide/",
  },
  escooterMaintenance: {
    label: "E-Scooter Maintenance Schedule",
    href: "/escooter-maintenance-schedule/",
  },
} as const;

interface CostField {
  id: string;
  label: string;
  unit?: string;
  placeholder: string;
  defaultValue: string;
  hint?: string;
}

const CAR_FIELDS: CostField[] = [
  {
    id: "carMonthlyFuel",
    label: "Monthly fuel",
    unit: "$/mo",
    placeholder: "120",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyFuel),
  },
  {
    id: "carMonthlyInsurance",
    label: "Monthly insurance",
    unit: "$/mo",
    placeholder: "150",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyInsurance),
  },
  {
    id: "carMonthlyMaintenance",
    label: "Monthly maintenance",
    unit: "$/mo",
    placeholder: "50",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyMaintenance),
  },
  {
    id: "carMonthlyParking",
    label: "Monthly parking",
    unit: "$/mo",
    placeholder: "80",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyParking),
    hint: "Garage, permit, or paid spot",
  },
  {
    id: "carMonthlyDepreciation",
    label: "Monthly depreciation",
    unit: "$/mo",
    placeholder: "200",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyDepreciation),
  },
];

const EBIKE_FIELDS: CostField[] = [
  {
    id: "ebikePurchaseCost",
    label: "Purchase price",
    unit: "$",
    placeholder: "2000",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikePurchaseCost),
  },
  {
    id: "ebikeBatteryReplacement",
    label: "Battery replacement",
    unit: "$",
    placeholder: "600",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeBatteryReplacement),
    hint: "Once over 3 years",
  },
  {
    id: "ebikeMonthlyMaintenance",
    label: "Monthly maintenance",
    unit: "$/mo",
    placeholder: "15",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeMonthlyMaintenance),
  },
  {
    id: "ebikeMonthlyCharging",
    label: "Monthly charging",
    unit: "$/mo",
    placeholder: "3",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeMonthlyCharging),
  },
];

const ESCOOTER_FIELDS: CostField[] = [
  {
    id: "escooterPurchaseCost",
    label: "Purchase price",
    unit: "$",
    placeholder: "800",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterPurchaseCost),
  },
  {
    id: "escooterMaintenance3yr",
    label: "Tires & brakes (3 yr)",
    unit: "$",
    placeholder: "150",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterMaintenance3yr),
  },
  {
    id: "escooterMonthlyCharging",
    label: "Monthly charging",
    unit: "$/mo",
    placeholder: "2",
    defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterMonthlyCharging),
  },
];

interface MobilityTcoCalculatorProps {
  className?: string;
}

function buildBreakdownRows(mode: MobilityTcoModeResult): CalculatorResultRow[] {
  const { label, breakdown } = mode;
  return [
    {
      label: `${label} · Initial purchase`,
      value: formatCurrency(breakdown.initialPurchase),
    },
    {
      label: `${label} · Maintenance`,
      value: formatCurrency(breakdown.maintenance),
    },
    {
      label: `${label} · Energy / fuel`,
      value: formatCurrency(breakdown.energyFuel),
    },
    {
      label: `${label} · Insurance`,
      value: formatCurrency(breakdown.insurance),
    },
    {
      label: `${label} · 3-year total`,
      value: formatCurrency(breakdown.total3Year),
    },
  ];
}

function MobilityCostColumn({
  title,
  icon: Icon,
  fields,
  values,
  onChange,
}: {
  title: string;
  icon: typeof Car;
  fields: CostField[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col border border-border bg-muted/20">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <Icon className="size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      <div className="flex flex-col gap-3 p-3">
        {fields.map((field) => (
          <label key={field.id} className="flex min-w-0 flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              {field.label}
              {field.unit ? (
                <span className="font-normal"> ({field.unit})</span>
              ) : null}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={values[field.id] ?? field.defaultValue}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              className={cn(
                calculatorCommandInput,
                "h-11 w-full rounded-none border px-3 text-sm tabular-nums"
              )}
            />
            {field.hint ? (
              <span className="text-[0.6875rem] leading-relaxed text-muted-foreground">
                {field.hint}
              </span>
            ) : null}
          </label>
        ))}
      </div>
    </div>
  );
}

export function MobilityTcoCalculator({ className }: MobilityTcoCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const carMonthlyFuel = parsePositive(values.carMonthlyFuel ?? "");
    const carMonthlyInsurance = parsePositive(values.carMonthlyInsurance ?? "");
    const carMonthlyMaintenance = parsePositive(values.carMonthlyMaintenance ?? "");
    const carMonthlyParking = parsePositive(values.carMonthlyParking ?? "") ?? 0;
    const carMonthlyDepreciation = parsePositive(values.carMonthlyDepreciation ?? "");
    const ebikePurchaseCost = parsePositive(values.ebikePurchaseCost ?? "");
    const ebikeBatteryReplacement = parsePositive(values.ebikeBatteryReplacement ?? "");
    const ebikeMonthlyMaintenance = parsePositive(values.ebikeMonthlyMaintenance ?? "");
    const ebikeMonthlyCharging = parsePositive(values.ebikeMonthlyCharging ?? "");
    const escooterPurchaseCost = parsePositive(values.escooterPurchaseCost ?? "");
    const escooterMaintenance3yr = parsePositive(values.escooterMaintenance3yr ?? "");
    const escooterMonthlyCharging = parsePositive(values.escooterMonthlyCharging ?? "");

    if (
      carMonthlyFuel === null ||
      carMonthlyInsurance === null ||
      carMonthlyMaintenance === null ||
      carMonthlyDepreciation === null ||
      ebikePurchaseCost === null ||
      ebikeBatteryReplacement === null ||
      ebikeMonthlyMaintenance === null ||
      ebikeMonthlyCharging === null ||
      escooterPurchaseCost === null ||
      escooterMaintenance3yr === null ||
      escooterMonthlyCharging === null
    ) {
      return null;
    }

    return calculateMobilityTco(
      {
        monthlyFuel: carMonthlyFuel,
        monthlyInsurance: carMonthlyInsurance,
        monthlyMaintenance: carMonthlyMaintenance,
        monthlyParking: carMonthlyParking,
        monthlyDepreciation: carMonthlyDepreciation,
      },
      {
        purchaseCost: ebikePurchaseCost,
        batteryReplacementCost: ebikeBatteryReplacement,
        monthlyMaintenance: ebikeMonthlyMaintenance,
        monthlyCharging: ebikeMonthlyCharging,
      },
      {
        purchaseCost: escooterPurchaseCost,
        maintenanceOver3Years: escooterMaintenance3yr,
        monthlyCharging: escooterMonthlyCharging,
      }
    );
  }, [values]);

  const resultRows = parsed
    ? [
        ...buildBreakdownRows(parsed.car),
        ...buildBreakdownRows(parsed.ebike),
        ...buildBreakdownRows(parsed.escooter),
      ]
    : [];

  const primaryDetail = parsed
    ? `E-bike ${formatCurrency(parsed.ebikeSavingsVsCar)} · E-scooter ${formatCurrency(parsed.escooterSavingsVsCar)} · over 36 months`
    : null;

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

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
          [definition.result.label]: formatCurrency(parsed.bestSavingsVsCar),
          "Car 3-year total": formatCurrency(parsed.car.breakdown.total3Year),
          "E-bike 3-year total": formatCurrency(parsed.ebike.breakdown.total3Year),
          "E-scooter 3-year total": formatCurrency(parsed.escooter.breakdown.total3Year),
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.result.label, definition.title, fieldLabels, parsed, values]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="grid gap-3 lg:grid-cols-3">
            <MobilityCostColumn
              title="Car"
              icon={Car}
              fields={CAR_FIELDS}
              values={values}
              onChange={setValue}
            />
            <MobilityCostColumn
              title="E-bike"
              icon={Bike}
              fields={EBIKE_FIELDS}
              values={values}
              onChange={setValue}
            />
            <MobilityCostColumn
              title="E-scooter"
              icon={CircleDollarSign}
              fields={ESCOOTER_FIELDS}
              values={values}
              onChange={setValue}
            />
          </div>
        }
        results={
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Savings vs car">
              <CalculatorPrimaryMetric
                value={parsed ? formatCurrency(parsed.bestSavingsVsCar) : null}
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
              />
            </GamifiedDashboardFrame>
            {parsed ? (
              <MobilityTcoBarChart
                carTotal={parsed.car.breakdown.total3Year}
                ebikeTotal={parsed.ebike.breakdown.total3Year}
                escooterTotal={parsed.escooter.breakdown.total3Year}
              />
            ) : null}
            <CalculatorResultsTable rows={resultRows} />
            {parsed ? (
              <div
                className={cn(
                  flatAlert,
                  "px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
                )}
                role="status"
              >
                Considering the switch? Check our{" "}
                <Link
                  href={RELATED_LINKS.ebikeRangeGuide.href}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {RELATED_LINKS.ebikeRangeGuide.label}
                </Link>{" "}
                or{" "}
                <Link
                  href={RELATED_LINKS.escooterMaintenance.href}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {RELATED_LINKS.escooterMaintenance.label}
                </Link>
                <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
              </div>
            ) : null}
          </div>
        }
      />

      {parsed ? (
        <CalculatorAssumptionNote>
          36-month TCO. Car maintenance includes parking and depreciation. E-bike
          battery replacement budgeted once. Annual view: divide totals by 3 for
          yearly comparison.
        </CalculatorAssumptionNote>
      ) : null}

      <JoinMyPdfSaveReport
        calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={parsed ? formatCurrency(parsed.bestSavingsVsCar) : null}
        detail={primaryDetail}
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
