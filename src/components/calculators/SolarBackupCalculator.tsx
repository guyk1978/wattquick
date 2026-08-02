"use client";

import { useCallback, useId, useMemo, useState } from "react";
import {
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Info,
  Plus,
  Shield,
  ShieldAlert,
  Sun,
  Trash2,
  Zap,
} from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateSolarBackup,
  SOLAR_BACKUP_APPLIANCE_PRESETS,
  SOLAR_BACKUP_BATTERY_PRESETS,
  SOLAR_BACKUP_INVERTER_PRESETS,
  SOLAR_BACKUP_MODE_OPTIONS,
  SOLAR_BACKUP_REGION_OPTIONS,
  SOLAR_BACKUP_SOLAR_PRESETS,
  type SolarBackupResult,
  type SolarBackupRecommendation,
} from "@/lib/calculators/solar-backup-calculator";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import {
  formatCurrency,
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
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

const CALCULATOR_ID = "solar-backup-calculator" satisfies CalculatorId;
const MAX_APPLIANCE_ROWS = 16;

interface ApplianceRow {
  id: string;
  name: string;
  watts: string;
  hours: string;
  surge: boolean;
  essential: boolean;
}

interface SolarBackupCalculatorProps {
  className?: string;
}

function createApplianceRow(
  preset?: (typeof SOLAR_BACKUP_APPLIANCE_PRESETS)[number]
): ApplianceRow {
  return {
    id: crypto.randomUUID(),
    name: preset?.name ?? "",
    watts: preset ? String(preset.watts) : "",
    hours: preset ? String(preset.hours) : "",
    surge: preset?.surge ?? false,
    essential: preset?.essential ?? true,
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

function severityIcon(severity: SolarBackupRecommendation["severity"]) {
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

function severityClass(severity: SolarBackupRecommendation["severity"]) {
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

function ResultsPanel({ result }: { result: SolarBackupResult }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <GamifiedDashboardFrame accent="primary" label="Essential / eco backup runtime">
        <CalculatorPrimaryMetric
          calculatorId={CALCULATOR_ID}
          value={formatNumber(result.essentialRuntimeHours, { maxDecimals: 1 })}
          unit="hrs"
          detail={`Full load ~${formatNumber(result.fullLoadRuntimeHours, { maxDecimals: 1 })} hrs · ${formatNumber(result.usableKwh, { maxDecimals: 1 })} kWh usable`}
          emptyMessage="Enter battery, inverter, and appliance details"
          animateNumeric={false}
        />
      </GamifiedDashboardFrame>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Zap className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Backup runtime scenarios
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Full load runtime"
            value={formatNumber(result.fullLoadRuntimeHours, { maxDecimals: 1 })}
            unit="hrs"
            hint={`${formatNumber(result.fullLoadW, { maxDecimals: 0 })} W listed`}
          />
          <MetricCard
            label="Essential / eco"
            value={formatNumber(result.essentialRuntimeHours, { maxDecimals: 1 })}
            unit="hrs"
            hint={`${formatNumber(result.essentialLoadW, { maxDecimals: 0 })} W essentials`}
          />
          <MetricCard
            label="With solar (full)"
            value={formatNumber(result.extendedFullRuntimeHours, {
              maxDecimals: 1,
            })}
            unit="hrs"
            hint={`${formatNumber(result.solarDailyKwh, { maxDecimals: 1 })} kWh/day solar`}
          />
          <MetricCard
            label="With solar (eco)"
            value={formatNumber(result.extendedEssentialRuntimeHours, {
              maxDecimals: 1,
            })}
            unit="hrs"
            hint="Daylight-assisted estimate"
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Inverter peak load & surge
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <MetricCard
            label="Peak appliance"
            value={formatNumber(result.peakApplianceW, { maxDecimals: 0 })}
            unit="W"
          />
          <MetricCard
            label="Surge-class combined"
            value={formatNumber(result.surgeCombinedW, { maxDecimals: 0 })}
            unit="W"
            hint="Motors / compressors"
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

      <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <BatteryCharging className="size-4 text-primary" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Battery health & lifespan
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MetricCard
            label="Cycle life (est.)"
            value={formatNumber(result.estimatedCycleLife, { maxDecimals: 0 })}
            unit="cycles"
            hint="~90% DoD LFP model"
          />
          <MetricCard
            label="Lifespan outlook"
            value={formatNumber(result.estimatedLifespanYears, {
              maxDecimals: 0,
            })}
            unit="yrs"
          />
          <MetricCard
            label="Annual fade"
            value={formatNumber(result.annualDegradationPercent, {
              maxDecimals: 1,
            })}
            unit="%/yr"
          />
          <MetricCard
            label="Capacity @ 10 yrs"
            value={formatNumber(result.capacityAfter10YearsKwh, {
              maxDecimals: 1,
            })}
            unit="kWh"
          />
        </div>
      </section>

      {result.monthlySavings !== null ? (
        <section className="rounded-lg border border-border bg-background p-3 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Sun className="size-4 text-primary" aria-hidden />
            <h3 className="text-sm font-semibold text-foreground">
              Peak shaving / TOU savings
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <MetricCard
              label="Estimated monthly savings"
              value={formatCurrency(result.monthlySavings)}
              hint="Peak vs off-peak rate delta"
            />
            <MetricCard
              label="Usable storage"
              value={formatNumber(result.usableKwh, { maxDecimals: 1 })}
              unit="kWh"
              hint="After 90% DoD"
            />
          </div>
        </section>
      ) : null}

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

export function SolarBackupCalculator({
  className,
}: SolarBackupCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);
  const listId = useId();

  const [appliances, setAppliances] = useState<ApplianceRow[]>(() =>
    SOLAR_BACKUP_APPLIANCE_PRESETS.map((preset) => createApplianceRow(preset))
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
        const hours = parseNonNegative(row.hours);
        if (!row.name.trim() || watts === null || hours === null) return null;
        return {
          name: row.name.trim(),
          watts,
          hours,
          surge: row.surge || watts >= 800,
          essential: row.essential,
        };
      })
      .filter((a): a is NonNullable<typeof a> => a !== null);

    if (parsed.length === 0) return null;
    return calculateSolarBackup(values, parsed);
  }, [appliances, values]);

  const batteryCustom = values.batteryPreset === "custom";
  const inverterCustom = values.inverterPreset === "custom";
  const solarCustom = values.solarPreset === "custom";
  const regionCustom = values.region === "custom";
  const peakMode = values.mode === "peak";
  const solarEnabled = values.solarPreset !== "none";

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="flex w-full min-w-0 flex-col gap-5">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Home Solar Backup & UPS Energy Storage
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Size blackout runtime, inverter surge headroom, battery life,
                  and peak-shaving savings — results update live.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">Hardware</h3>

              <ChipGroup
                label="Lithium battery capacity"
                options={SOLAR_BACKUP_BATTERY_PRESETS}
                value={values.batteryPreset ?? "10"}
                onChange={(v) => setValue("batteryPreset", v)}
              />
              {batteryCustom ? (
                <NumberField
                  id="batteryKwhCustom"
                  label="Custom battery capacity"
                  unit="kWh"
                  value={values.batteryKwhCustom ?? ""}
                  placeholder="12"
                  onChange={(v) => setValue("batteryKwhCustom", v)}
                />
              ) : null}

              <ChipGroup
                label="Inverter power rating"
                options={SOLAR_BACKUP_INVERTER_PRESETS}
                value={values.inverterPreset ?? "8"}
                onChange={(v) => setValue("inverterPreset", v)}
              />
              {inverterCustom ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <NumberField
                    id="inverterKwCustom"
                    label="Continuous rating"
                    unit="kW"
                    value={values.inverterKwCustom ?? ""}
                    placeholder="7.6"
                    onChange={(v) => setValue("inverterKwCustom", v)}
                  />
                  <NumberField
                    id="inverterSurgeKwCustom"
                    label="Surge rating"
                    unit="kW"
                    value={values.inverterSurgeKwCustom ?? ""}
                    placeholder="15"
                    onChange={(v) => setValue("inverterSurgeKwCustom", v)}
                  />
                </div>
              ) : null}

              <ChipGroup
                label="Solar panels"
                options={SOLAR_BACKUP_SOLAR_PRESETS}
                value={values.solarPreset ?? "6"}
                onChange={(v) => setValue("solarPreset", v)}
              />
              {solarCustom ? (
                <NumberField
                  id="solarKwCustom"
                  label="Custom solar capacity"
                  unit="kW"
                  value={values.solarKwCustom ?? ""}
                  placeholder="8"
                  onChange={(v) => setValue("solarKwCustom", v)}
                />
              ) : null}
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    Blackout essential loads
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Set watt draw and hours during an outage. Mark essentials for
                    eco runtime.
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
                          placeholder="e.g. Refrigerator"
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
                          placeholder="150"
                          className={cn(calculatorCommandInput, "w-full")}
                        />
                      </div>
                      <div className="min-w-0">
                        <label
                          htmlFor={`${row.id}-hours`}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Hours during outage
                        </label>
                        <input
                          id={`${row.id}-hours`}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="any"
                          value={row.hours}
                          onChange={(e) =>
                            updateAppliance(row.id, { hours: e.target.value })
                          }
                          placeholder="8"
                          className={cn(calculatorCommandInput, "w-full")}
                        />
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-4">
                      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={row.essential}
                          onChange={(e) =>
                            updateAppliance(row.id, {
                              essential: e.target.checked,
                            })
                          }
                          className="size-3.5 rounded border-border"
                        />
                        Essential / eco circuit
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={row.surge}
                          onChange={(e) =>
                            updateAppliance(row.id, { surge: e.target.checked })
                          }
                          className="size-3.5 rounded border-border"
                        />
                        High surge / motor start
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3 shadow-sm sm:p-4">
              <h3 className="text-sm font-semibold text-foreground">
                System mode & conditions
              </h3>

              <ChipGroup
                label="Operation mode"
                options={SOLAR_BACKUP_MODE_OPTIONS}
                value={values.mode ?? "ups"}
                onChange={(v) => setValue("mode", v)}
              />

              <ChipGroup
                label="Geographic sunlight profile"
                options={SOLAR_BACKUP_REGION_OPTIONS}
                value={values.region ?? "moderate"}
                onChange={(v) => setValue("region", v)}
              />
              {regionCustom ? (
                <NumberField
                  id="sunHoursCustom"
                  label="Custom peak sun hours"
                  unit="hrs/day"
                  value={values.sunHoursCustom ?? ""}
                  placeholder="5"
                  onChange={(v) => setValue("sunHoursCustom", v)}
                />
              ) : null}

              {peakMode ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <NumberField
                    id="peakRatePerKwh"
                    label="Peak electricity rate"
                    unit="$/kWh"
                    value={values.peakRatePerKwh ?? ""}
                    placeholder="0.32"
                    onChange={(v) => setValue("peakRatePerKwh", v)}
                  />
                  <NumberField
                    id="offPeakRatePerKwh"
                    label="Off-peak / solar cost"
                    unit="$/kWh"
                    value={values.offPeakRatePerKwh ?? ""}
                    placeholder="0.12"
                    onChange={(v) => setValue("offPeakRatePerKwh", v)}
                    hint={
                      solarEnabled
                        ? "Use near-zero if self-consuming solar"
                        : undefined
                    }
                  />
                </div>
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
          Usable energy ≈ battery kWh × 90% DoD × 94% inverter efficiency.
          Runtime uses average blackout-day draw (watts × hours ÷ 24). Solar
          yield = kW × peak sun hours × 85%. Cycle life is an LFP planning
          model (~6,000 cycles at 80% DoD, adjusted for 90% DoD). Peak-shaving
          savings use your peak vs off-peak rate delta. Estimates only —
          validate with equipment specs and a licensed installer.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
