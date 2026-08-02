"use client";

import { useCallback, useId, useMemo, useState } from "react";
import {
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Info,
  Plus,
  ShieldAlert,
  Sun,
  Trash2,
  Zap,
} from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculatePowerStationPlanner,
  POWER_STATION_ALTERNATOR_PRESETS,
  POWER_STATION_APPLIANCE_PRESETS,
  POWER_STATION_CAPACITY_PRESETS,
  POWER_STATION_INVERTER_PRESETS,
  POWER_STATION_SOLAR_PRESETS,
  POWER_STATION_WEATHER_OPTIONS,
  type PowerStationPlannerResult,
  type PowerStationRecommendation,
} from "@/lib/calculators/power-station-planner";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parseNonNegative, parsePositive } from "@/lib/format";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { Button } from "@/components/ui/button";
import { calculatorCommandInput, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "power-station-planner" satisfies CalculatorId;
const MAX_APPLIANCE_ROWS = 16;

interface ApplianceRow {
  id: string;
  name: string;
  watts: string;
  hoursPerDay: string;
  surge: boolean;
}

interface PowerStationPlannerCalculatorProps {
  className?: string;
}

function createApplianceRow(
  preset?: (typeof POWER_STATION_APPLIANCE_PRESETS)[number]
): ApplianceRow {
  return {
    id: crypto.randomUUID(),
    name: preset?.name ?? "",
    watts: preset ? String(preset.watts) : "",
    hoursPerDay: preset ? String(preset.hoursPerDay) : "",
    surge: preset?.surge ?? false,
  };
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

function severityIcon(severity: PowerStationRecommendation["severity"]) {
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

function severityClass(severity: PowerStationRecommendation["severity"]) {
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

function ResultsPanel({ result }: { result: PowerStationPlannerResult }) {
  const balanceLabel =
    result.netDailyWh >= 0 ? "Daily surplus" : "Daily deficit";
  const balanceHint =
    result.netDailyWh >= 0
      ? "Generation exceeds camping loads"
      : "Loads exceed solar + alternator";

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <GamifiedDashboardFrame accent="primary" label="Off-grid autonomy">
        <CalculatorPrimaryMetric
          calculatorId={CALCULATOR_ID}
          value={formatNumber(result.autonomyDays, { maxDecimals: 1 })}
          unit="days"
          detail={`${formatNumber(result.usableWh, { maxDecimals: 0 })} Wh usable · ${formatNumber(result.dailyLoadWh, { maxDecimals: 0 })} Wh/day load`}
          emptyMessage="Enter station, solar, and appliance details"
          animateNumeric={false}
        />
      </GamifiedDashboardFrame>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Zap className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Daily energy balance
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Daily load"
            value={formatNumber(result.dailyLoadWh, { maxDecimals: 0 })}
            unit="Wh"
            hint="All appliances"
          />
          <MetricCard
            label="Solar yield"
            value={formatNumber(result.solarYieldWh, { maxDecimals: 0 })}
            unit="Wh"
            hint="Weather-adjusted"
          />
          <MetricCard
            label="Alternator yield"
            value={formatNumber(result.alternatorYieldWh, { maxDecimals: 0 })}
            unit="Wh"
            hint="While driving"
          />
          <MetricCard
            label={balanceLabel}
            value={formatNumber(Math.abs(result.netDailyWh), { maxDecimals: 0 })}
            unit="Wh"
            hint={balanceHint}
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <BatteryCharging className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Recharge time estimators
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <MetricCard
            label="Solar full recharge"
            value={
              result.solarRechargeHours >= 99
                ? "—"
                : formatNumber(result.solarRechargeHours, { maxDecimals: 1 })
            }
            unit={result.solarRechargeHours >= 99 ? undefined : "hrs"}
            hint="Stationary under current weather"
          />
          <MetricCard
            label="Alternator full recharge"
            value={
              result.alternatorRechargeHours == null
                ? "—"
                : formatNumber(result.alternatorRechargeHours, {
                    maxDecimals: 1,
                  })
            }
            unit={result.alternatorRechargeHours == null ? undefined : "hrs"}
            hint="Driving with DC-DC only"
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Sun className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Surge & peak load check
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <MetricCard
            label="Peak appliance"
            value={formatNumber(result.peakApplianceW, { maxDecimals: 0 })}
            unit="W"
          />
          <MetricCard
            label="High-draw combined"
            value={formatNumber(result.maxSimultaneousHintW, { maxDecimals: 0 })}
            unit="W"
            hint="Surge-class devices"
          />
          <MetricCard
            label="Inverter status"
            value={
              result.inverterContinuousOk && result.inverterSurgeOk
                ? "OK"
                : "Alert"
            }
            hint={
              result.inverterContinuousOk
                ? result.inverterSurgeOk
                  ? "Within continuous & surge"
                  : "Possible surge overload"
                : "Exceeds continuous rating"
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-0.5">
          <Zap className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Planner recommendations
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

export function PowerStationPlannerCalculator({
  className,
}: PowerStationPlannerCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);
  const listId = useId();

  const [appliances, setAppliances] = useState<ApplianceRow[]>(() =>
    POWER_STATION_APPLIANCE_PRESETS.map((preset) => createApplianceRow(preset))
  );

  const updateAppliance = useCallback(
    (id: string, patch: Partial<ApplianceRow>) => {
      setAppliances((prev) =>
        prev.map((row) => (row.id === id ? { ...row, ...patch } : row))
      );
    },
    []
  );

  const addAppliance = useCallback(() => {
    setAppliances((prev) => {
      if (prev.length >= MAX_APPLIANCE_ROWS) return prev;
      return [...prev, createApplianceRow()];
    });
  }, []);

  const removeAppliance = useCallback((id: string) => {
    setAppliances((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((row) => row.id !== id);
    });
  }, []);

  const result = useMemo(() => {
    const parsed = appliances
      .map((row) => {
        const watts = parsePositive(row.watts);
        const hoursPerDay = parseNonNegative(row.hoursPerDay);
        if (!row.name.trim() || watts === null || hoursPerDay === null) {
          return null;
        }
        return {
          name: row.name.trim(),
          watts,
          hoursPerDay,
          surge: row.surge || watts >= 800,
        };
      })
      .filter((a): a is NonNullable<typeof a> => a !== null);

    if (parsed.length === 0) return null;
    return calculatePowerStationPlanner(values, parsed);
  }, [appliances, values]);

  const capacityCustom = values.capacityPreset === "custom";
  const inverterCustom = values.inverterPreset === "custom";
  const solarCustom = values.solarPreset === "custom";
  const altCustom = values.alternatorPreset === "custom";
  const altEnabled =
    values.alternatorPreset !== "none" &&
    values.alternatorPreset !== undefined &&
    values.alternatorPreset !== "";

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="flex w-full min-w-0 flex-col gap-5">
            <div className="flex items-start gap-2">
              <BatteryCharging
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Portable Power Station & RV Off-Grid Planner
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Balance camping loads against solar and alternator charging —
                  results update live.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Hardware
              </h3>

              <ChipGroup
                label="Portable power station capacity"
                options={POWER_STATION_CAPACITY_PRESETS}
                value={values.capacityPreset ?? "1000"}
                onChange={(v) => setValue("capacityPreset", v)}
              />
              {capacityCustom ? (
                <NumberField
                  id="capacityWhCustom"
                  label="Custom capacity"
                  unit="Wh"
                  value={values.capacityWhCustom ?? ""}
                  placeholder="1500"
                  onChange={(v) => setValue("capacityWhCustom", v)}
                />
              ) : null}

              <ChipGroup
                label="Max AC inverter output"
                options={POWER_STATION_INVERTER_PRESETS}
                value={values.inverterPreset ?? "1000"}
                onChange={(v) => setValue("inverterPreset", v)}
              />
              {inverterCustom ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <NumberField
                    id="inverterWCustom"
                    label="Continuous output"
                    unit="W"
                    value={values.inverterWCustom ?? ""}
                    placeholder="1500"
                    onChange={(v) => setValue("inverterWCustom", v)}
                  />
                  <NumberField
                    id="inverterSurgeCustom"
                    label="Surge output"
                    unit="W"
                    value={values.inverterSurgeCustom ?? ""}
                    placeholder="3000"
                    onChange={(v) => setValue("inverterSurgeCustom", v)}
                  />
                </div>
              ) : null}

              <ChipGroup
                label="Portable solar panels"
                options={POWER_STATION_SOLAR_PRESETS}
                value={values.solarPreset ?? "200"}
                onChange={(v) => setValue("solarPreset", v)}
              />
              {solarCustom ? (
                <NumberField
                  id="solarWCustom"
                  label="Custom solar capacity"
                  unit="W"
                  value={values.solarWCustom ?? ""}
                  placeholder="600"
                  onChange={(v) => setValue("solarWCustom", v)}
                />
              ) : null}
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    Camping & RV appliances
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Set watt draw and hours per day. Toggle surge for high-start
                    loads.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAppliance}
                  disabled={appliances.length >= MAX_APPLIANCE_ROWS}
                  className="shrink-0"
                >
                  <Plus className="size-4" aria-hidden />
                  Add device
                </Button>
              </div>

              <ul
                id={listId}
                className="flex flex-col gap-3"
                aria-label="Appliance list"
              >
                {appliances.map((row, index) => (
                  <li
                    key={row.id}
                    className="rounded-md border border-border bg-background p-3 shadow-sm"
                  >
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        Device {index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeAppliance(row.id)}
                        disabled={appliances.length <= 1}
                        aria-label={`Remove device ${index + 1}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="min-w-0 sm:col-span-2">
                        <label
                          htmlFor={`${row.id}-name`}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Name
                        </label>
                        <input
                          id={`${row.id}-name`}
                          type="text"
                          value={row.name}
                          onChange={(e) =>
                            updateAppliance(row.id, { name: e.target.value })
                          }
                          placeholder="e.g. Starlink"
                          className={cn(calculatorCommandInput, "w-full")}
                          autoComplete="off"
                        />
                      </div>
                      <div className="min-w-0">
                        <label
                          htmlFor={`${row.id}-watts`}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Watts
                        </label>
                        <input
                          id={`${row.id}-watts`}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          value={row.watts}
                          onChange={(e) =>
                            updateAppliance(row.id, { watts: e.target.value })
                          }
                          placeholder="50"
                          className={cn(calculatorCommandInput, "w-full")}
                        />
                      </div>
                      <div className="min-w-0">
                        <label
                          htmlFor={`${row.id}-hours`}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Hours / day
                        </label>
                        <input
                          id={`${row.id}-hours`}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="any"
                          value={row.hoursPerDay}
                          onChange={(e) =>
                            updateAppliance(row.id, {
                              hoursPerDay: e.target.value,
                            })
                          }
                          placeholder="4"
                          className={cn(calculatorCommandInput, "w-full")}
                        />
                      </div>
                    </div>

                    <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={row.surge}
                        onChange={(e) =>
                          updateAppliance(row.id, { surge: e.target.checked })
                        }
                        className="size-3.5 rounded border-border"
                      />
                      High surge / peak start
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Environment & travel habits
              </h3>

              <NumberField
                id="sunHours"
                label="Expected daily peak sun hours"
                unit="hrs"
                value={values.sunHours ?? ""}
                placeholder="5"
                onChange={(v) => setValue("sunHours", v)}
                hint="Location and season dependent"
              />

              <ChipGroup
                label="Weather condition"
                options={POWER_STATION_WEATHER_OPTIONS}
                value={values.weather ?? "sunny"}
                onChange={(v) => setValue("weather", v)}
              />

              <ChipGroup
                label="Vehicle alternator / DC-DC charging"
                options={POWER_STATION_ALTERNATOR_PRESETS}
                value={values.alternatorPreset ?? "none"}
                onChange={(v) => setValue("alternatorPreset", v)}
              />
              {altCustom ? (
                <NumberField
                  id="alternatorWCustom"
                  label="Custom DC-DC charge rate"
                  unit="W"
                  value={values.alternatorWCustom ?? ""}
                  placeholder="400"
                  onChange={(v) => setValue("alternatorWCustom", v)}
                />
              ) : null}
              {altEnabled ? (
                <NumberField
                  id="drivingHoursPerDay"
                  label="Hours driving per day"
                  unit="hrs"
                  value={values.drivingHoursPerDay ?? ""}
                  placeholder="2"
                  onChange={(v) => setValue("drivingHoursPerDay", v)}
                  hint="Time the DC-DC charger can run"
                />
              ) : null}
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
          Usable pack energy ≈ capacity × 90% DoD. Solar yield = panel W × peak
          sun hours × weather factor × 85% system efficiency. Autonomy uses net
          daily deficit when generation is short, or a weather-buffer estimate
          when in surplus. Planning estimates only — verify with your station
          specs and real campsite conditions.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
