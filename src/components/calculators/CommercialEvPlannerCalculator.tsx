"use client";

import { useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Info,
  Mountain,
  ShieldAlert,
  Snowflake,
  Timer,
  Truck,
} from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateCommercialEvPlanner,
  COMMERCIAL_EV_AUX_OPTIONS,
  COMMERCIAL_EV_BATTERY_PRESETS,
  COMMERCIAL_EV_DRIVETRAIN,
  COMMERCIAL_EV_MOTOR_PRESETS,
  COMMERCIAL_EV_ROUTE_OPTIONS,
  COMMERCIAL_EV_STYLE_OPTIONS,
  COMMERCIAL_EV_TIRE_OPTIONS,
  COMMERCIAL_EV_VEHICLE_CLASSES,
  type CommercialEvPlannerResult,
  type CommercialEvRecommendation,
} from "@/lib/calculators/commercial-ev-planner";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorCommandInput, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "commercial-ev-planner" satisfies CalculatorId;

interface CommercialEvPlannerCalculatorProps {
  className?: string;
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2" role="group">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-primary bg-primary/15 font-semibold text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function NumberField({
  id,
  label,
  unit,
  value,
  placeholder,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  unit?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {unit ? (
          <span className="ml-1 text-muted-foreground">({unit})</span>
        ) : null}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(calculatorCommandInput, "w-full")}
      />
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/25 p-3 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-foreground">
        {value}
        {unit ? (
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function severityIcon(severity: CommercialEvRecommendation["severity"]) {
  switch (severity) {
    case "critical":
      return ShieldAlert;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
    default:
      return CheckCircle2;
  }
}

function severityClass(severity: CommercialEvRecommendation["severity"]) {
  switch (severity) {
    case "critical":
      return "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300";
    case "warning":
      return "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200";
    case "info":
      return "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-200";
    default:
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
  }
}

function ResultsPanel({ result }: { result: CommercialEvPlannerResult }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <GamifiedDashboardFrame accent="primary" label="Real-world range under load">
        <CalculatorPrimaryMetric
          calculatorId={CALCULATOR_ID}
          value={formatNumber(result.rangeKm, { maxDecimals: 0 })}
          unit="km"
          detail={`${formatNumber(result.rangeMiles, { maxDecimals: 0 })} mi · ${formatNumber(result.consumptionKwhPerKm, { maxDecimals: 2 })} kWh/km · ${formatNumber(result.usableKwh, { maxDecimals: 0 })} kWh usable`}
          emptyMessage="Enter vehicle, payload, and route details"
          animateNumeric={false}
        />
      </GamifiedDashboardFrame>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Snowflake className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Auxiliary energy drain
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <MetricCard
            label="Aux draw"
            value={formatNumber(result.auxKwhPerHour, { maxDecimals: 1 })}
            unit="kW"
            hint="Climate / reefer continuous"
          />
          <MetricCard
            label="Share of energy"
            value={formatNumber(result.auxDrainPercent, { maxDecimals: 0 })}
            unit="%"
            hint="Of usable pack on this route"
          />
          <MetricCard
            label="Range lost to aux"
            value={formatNumber(result.auxRangeLossKm, { maxDecimals: 0 })}
            unit="km"
            hint="vs propulsion-only"
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Timer className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Component wear & longevity
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <MetricCard
            label="Tire life"
            value={formatNumber(result.tireLifeKm, { maxDecimals: 0 })}
            unit="km"
            hint={`${formatNumber(result.payloadUtilizationPercent, { maxDecimals: 0 })}% GVWR util.`}
          />
          <MetricCard
            label="Brake pad life"
            value={formatNumber(result.brakePadLifeKm, { maxDecimals: 0 })}
            unit="km"
            hint="Regen vs stop-and-go"
          />
          <MetricCard
            label="Total mass"
            value={formatNumber(result.totalMassKg, { maxDecimals: 0 })}
            unit="kg"
            hint="Curb + crew + cargo"
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <CircleDollarSign className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Cost efficiency vs diesel
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MetricCard
            label="EV cost"
            value={formatCurrency(result.evCostPerKm)}
            unit="/km"
          />
          <MetricCard
            label="EV cost"
            value={formatCurrency(result.evCostPerMile)}
            unit="/mi"
          />
          <MetricCard
            label="Diesel cost"
            value={formatCurrency(result.dieselCostPerKm)}
            unit="/km"
          />
          <MetricCard
            label="Savings"
            value={formatNumber(result.savingsVsDieselPercent, {
              maxDecimals: 0,
            })}
            unit="%"
            hint="vs diesel fleet"
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-0.5">
          <Mountain className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Smart operational tips
          </h3>
        </div>
        {result.recommendations.map((rec) => {
          const Icon = severityIcon(rec.severity);
          return (
            <div
              key={`${rec.severity}-${rec.title}`}
              className={cn(
                flatAlert,
                "flex gap-3 rounded-lg border p-3 text-sm shadow-sm",
                severityClass(rec.severity)
              )}
              role="status"
            >
              <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="font-semibold">{rec.title}</p>
                <p className="mt-0.5 opacity-90">{rec.message}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export function CommercialEvPlannerCalculator({
  className,
}: CommercialEvPlannerCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => calculateCommercialEvPlanner(values),
    [values]
  );

  const batteryCustom = values.batteryPreset === "custom";
  const motorCustom = values.motorPreset === "custom";
  const auxCustom = values.auxPreset === "custom";

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="flex w-full min-w-0 flex-col gap-5">
            <div className="flex items-start gap-2">
              <Truck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Commercial EV Fleet Range Planner
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Model payload, refrigeration, and route duty — results update
                  live.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Hardware & vehicle
              </h3>

              <ChipGroup
                label="Vehicle class / model"
                options={COMMERCIAL_EV_VEHICLE_CLASSES}
                value={values.vehicleClass ?? "delivery-van"}
                onChange={(v) => setValue("vehicleClass", v)}
              />

              <ChipGroup
                label="Battery capacity"
                options={COMMERCIAL_EV_BATTERY_PRESETS}
                value={values.batteryPreset ?? "100"}
                onChange={(v) => setValue("batteryPreset", v)}
              />
              {batteryCustom ? (
                <NumberField
                  id="batteryKwhCustom"
                  label="Custom battery capacity"
                  unit="kWh"
                  value={values.batteryKwhCustom ?? ""}
                  placeholder="120"
                  onChange={(v) => setValue("batteryKwhCustom", v)}
                />
              ) : null}

              <ChipGroup
                label="Drivetrain"
                options={COMMERCIAL_EV_DRIVETRAIN}
                value={values.drivetrain ?? "single"}
                onChange={(v) => setValue("drivetrain", v)}
              />

              <ChipGroup
                label="Motor power"
                options={COMMERCIAL_EV_MOTOR_PRESETS}
                value={values.motorPreset ?? "250"}
                onChange={(v) => setValue("motorPreset", v)}
              />
              {motorCustom ? (
                <NumberField
                  id="motorKwCustom"
                  label="Custom motor power"
                  unit="kW"
                  value={values.motorKwCustom ?? ""}
                  placeholder="280"
                  onChange={(v) => setValue("motorKwCustom", v)}
                />
              ) : null}

              <ChipGroup
                label="Tire type"
                options={COMMERCIAL_EV_TIRE_OPTIONS}
                value={values.tire ?? "hd-single"}
                onChange={(v) => setValue("tire", v)}
              />

              <NumberField
                id="gvwrKg"
                label="Gross vehicle weight rating (GVWR)"
                unit="kg"
                value={values.gvwrKg ?? ""}
                placeholder="4500"
                onChange={(v) => setValue("gvwrKg", v)}
                hint="Maximum allowed curb + crew + cargo mass"
              />
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Payload, crew & equipment
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NumberField
                  id="crewWeightKg"
                  label="Driver & crew weight"
                  unit="kg"
                  value={values.crewWeightKg ?? ""}
                  placeholder="180"
                  onChange={(v) => setValue("crewWeightKg", v)}
                />
                <NumberField
                  id="cargoWeightKg"
                  label="Cargo weight"
                  unit="kg"
                  value={values.cargoWeightKg ?? ""}
                  placeholder="1200"
                  onChange={(v) => setValue("cargoWeightKg", v)}
                />
              </div>

              <ChipGroup
                label="Auxiliary power loads"
                options={COMMERCIAL_EV_AUX_OPTIONS}
                value={values.auxPreset ?? "climate"}
                onChange={(v) => setValue("auxPreset", v)}
              />
              {auxCustom ? (
                <NumberField
                  id="auxKwCustom"
                  label="Custom auxiliary draw"
                  unit="kW"
                  value={values.auxKwCustom ?? ""}
                  placeholder="5"
                  onChange={(v) => setValue("auxKwCustom", v)}
                />
              ) : null}
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Route & operations
              </h3>

              <ChipGroup
                label="Route profile"
                options={COMMERCIAL_EV_ROUTE_OPTIONS}
                value={values.route ?? "urban"}
                onChange={(v) => setValue("route", v)}
              />

              <ChipGroup
                label="Driving style & braking"
                options={COMMERCIAL_EV_STYLE_OPTIONS}
                value={values.drivingStyle ?? "mixed"}
                onChange={(v) => setValue("drivingStyle", v)}
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <NumberField
                  id="electricityRate"
                  label="Electricity rate"
                  unit="$/kWh"
                  value={values.electricityRate ?? ""}
                  placeholder="0.16"
                  onChange={(v) => setValue("electricityRate", v)}
                />
                <NumberField
                  id="dieselPrice"
                  label="Diesel price"
                  unit="$/gal"
                  value={values.dieselPrice ?? ""}
                  placeholder="4.25"
                  onChange={(v) => setValue("dieselPrice", v)}
                />
                <NumberField
                  id="dieselMpg"
                  label="Diesel MPG"
                  unit="mpg"
                  value={values.dieselMpg ?? ""}
                  placeholder="12"
                  onChange={(v) => setValue("dieselMpg", v)}
                />
              </div>
            </section>
          </div>
        }
        results={
          result ? (
            <ResultsPanel result={result} />
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              {definition.result.emptyMessage}
            </div>
          )
        }
      />

      {result ? (
        <CalculatorAssumptionNote>
          Usable energy = pack kWh × 0.9. Consumption combines class baseline
          kWh/km, tire rolling, mass vs curb, route and driving style, plus
          auxiliary kW ÷ average route speed. Diesel comparison uses your
          $/gal and mpg assumptions. Planning estimates only — validate with
          fleet telematics.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
