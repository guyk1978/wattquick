"use client";

import { useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Info,
  Mountain,
  ShieldAlert,
  Timer,
  Zap,
} from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateEscooterRangePerformance,
  ESCOOTER_BATTERY_PRESETS,
  ESCOOTER_BODY_BUILD_OPTIONS,
  ESCOOTER_CONTROLLER_PRESETS,
  ESCOOTER_MODEL_PRESETS,
  ESCOOTER_MOTOR_LAYOUTS,
  ESCOOTER_MOTOR_PRESETS,
  ESCOOTER_STYLE_OPTIONS,
  ESCOOTER_TERRAIN_OPTIONS,
  ESCOOTER_TIRE_OPTIONS,
  type EscooterHardwareRecommendation,
  type EscooterRangePerformanceResult,
} from "@/lib/calculators/escooter-range-performance";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber } from "@/lib/format";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorCommandInput, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "escooter-range-performance" satisfies CalculatorId;

interface EscooterRangePerformanceCalculatorProps {
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

function severityIcon(severity: EscooterHardwareRecommendation["severity"]) {
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

function severityClass(severity: EscooterHardwareRecommendation["severity"]) {
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

function ResultsPanel({
  result,
}: {
  result: EscooterRangePerformanceResult;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <GamifiedDashboardFrame accent="primary" label="Real battery range">
        <CalculatorPrimaryMetric
          calculatorId={CALCULATOR_ID}
          value={formatNumber(result.rangeKm, { maxDecimals: 1 })}
          unit="km"
          detail={`${formatNumber(result.rangeMiles, { maxDecimals: 1 })} mi · ${formatNumber(result.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · ${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh usable`}
          emptyMessage="Enter hardware and rider details"
          animateNumeric={false}
        />
      </GamifiedDashboardFrame>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Gauge className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">Speed profiles</h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <MetricCard
            label="Max on flats"
            value={formatNumber(result.speeds.flatMaxKmh, { maxDecimals: 0 })}
            unit="km/h"
            hint={`${formatNumber(result.speeds.flatMaxMph, { maxDecimals: 0 })} mph · ${formatNumber(result.systemWatts, { maxDecimals: 0 })}W`}
          />
          <MetricCard
            label="On selected hills"
            value={formatNumber(result.speeds.hillKmh, { maxDecimals: 0 })}
            unit="km/h"
            hint={`${formatNumber(result.speeds.hillMph, { maxDecimals: 0 })} mph`}
          />
          <MetricCard
            label="Safe descent"
            value={formatNumber(result.speeds.descentSafeKmh, { maxDecimals: 0 })}
            unit="km/h"
            hint={`${formatNumber(result.speeds.descentSafeMph, { maxDecimals: 0 })} mph`}
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Timer className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Component longevity
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MetricCard
            label="Battery cycles"
            value={formatNumber(result.longevity.batteryCycles, {
              maxDecimals: 0,
            })}
            unit="cycles"
          />
          <MetricCard
            label="Battery life"
            value={formatNumber(result.longevity.batteryYears, {
              maxDecimals: 1,
            })}
            unit="years"
          />
          <MetricCard
            label="Tire life"
            value={formatNumber(result.longevity.tireLifeKm, {
              maxDecimals: 0,
            })}
            unit="km"
          />
          <MetricCard
            label="C-rate"
            value={formatNumber(result.longevity.cRate, { maxDecimals: 2 })}
            unit="C"
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-0.5">
          <Mountain className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Smart hardware tips
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

export function EscooterRangePerformanceCalculator({
  className,
}: EscooterRangePerformanceCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => calculateEscooterRangePerformance(values),
    [values]
  );

  const motorCustom = values.motorPreset === "custom";
  const batteryCustom = values.batteryPreset === "custom";
  const controllerCustom = values.controllerPreset === "custom";

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="flex w-full min-w-0 flex-col gap-5">
            <div className="flex items-start gap-2">
              <Zap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  E-Scooter Range & Performance
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Set your hardware, rider, and terrain — results update live.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">Hardware</h3>

              <ChipGroup
                label="Scooter model / brand"
                options={ESCOOTER_MODEL_PRESETS}
                value={values.modelPreset ?? "ninebot"}
                onChange={(v) => setValue("modelPreset", v)}
              />

              <ChipGroup
                label="Motor configuration"
                options={ESCOOTER_MOTOR_LAYOUTS}
                value={values.motorLayout ?? "single"}
                onChange={(v) => setValue("motorLayout", v)}
              />

              <ChipGroup
                label="Motor wattage"
                options={ESCOOTER_MOTOR_PRESETS}
                value={values.motorPreset ?? "1000"}
                onChange={(v) => setValue("motorPreset", v)}
              />
              {motorCustom ? (
                <NumberField
                  id="motorWattsCustom"
                  label="Custom motor power"
                  unit="W"
                  value={values.motorWattsCustom ?? ""}
                  placeholder="1500"
                  onChange={(v) => setValue("motorWattsCustom", v)}
                />
              ) : null}

              <ChipGroup
                label="Battery configuration"
                options={ESCOOTER_BATTERY_PRESETS}
                value={values.batteryPreset ?? "52/20"}
                onChange={(v) => setValue("batteryPreset", v)}
              />
              {batteryCustom ? (
                <div className="grid grid-cols-2 gap-3">
                  <NumberField
                    id="batteryVoltsCustom"
                    label="Voltage"
                    unit="V"
                    value={values.batteryVoltsCustom ?? ""}
                    placeholder="52"
                    onChange={(v) => setValue("batteryVoltsCustom", v)}
                  />
                  <NumberField
                    id="batteryAhCustom"
                    label="Capacity"
                    unit="Ah"
                    value={values.batteryAhCustom ?? ""}
                    placeholder="20"
                    onChange={(v) => setValue("batteryAhCustom", v)}
                  />
                </div>
              ) : null}

              <ChipGroup
                label="Tire type & size"
                options={ESCOOTER_TIRE_OPTIONS}
                value={values.tire ?? "pneumatic-10"}
                onChange={(v) => setValue("tire", v)}
              />

              <ChipGroup
                label="Controller amps"
                options={ESCOOTER_CONTROLLER_PRESETS}
                value={values.controllerPreset ?? "25"}
                onChange={(v) => setValue("controllerPreset", v)}
              />
              {controllerCustom ? (
                <NumberField
                  id="controllerAmpsCustom"
                  label="Custom controller amps"
                  unit="A"
                  value={values.controllerAmpsCustom ?? ""}
                  placeholder="35"
                  onChange={(v) => setValue("controllerAmpsCustom", v)}
                />
              ) : null}
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Rider & terrain
              </h3>

              <NumberField
                id="riderWeightKg"
                label="Rider weight"
                unit="kg"
                value={values.riderWeightKg ?? ""}
                placeholder="75"
                onChange={(v) => setValue("riderWeightKg", v)}
                hint="Without the scooter (a typical scooter mass is added automatically)"
              />

              <ChipGroup
                label="Body build"
                options={ESCOOTER_BODY_BUILD_OPTIONS}
                value={values.bodyBuild ?? "average"}
                onChange={(v) => setValue("bodyBuild", v)}
              />

              <ChipGroup
                label="Terrain profile"
                options={ESCOOTER_TERRAIN_OPTIONS}
                value={values.terrain ?? "flat"}
                onChange={(v) => setValue("terrain", v)}
              />

              <ChipGroup
                label="Riding style / throttle use"
                options={ESCOOTER_STYLE_OPTIONS}
                value={values.ridingStyle ?? "mixed"}
                onChange={(v) => setValue("ridingStyle", v)}
              />
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
          Range ≈ (V × Ah × 0.88) ÷ Wh/km. Scooter base consumption starts near
          14.5 Wh/km (higher than e-bikes) and scales with tire, mass, terrain,
          dual-motor load, and riding style. System power is limited to
          min(motor W, V × A × 0.92). Estimates for planning only — not a
          substitute for manufacturer specs.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
