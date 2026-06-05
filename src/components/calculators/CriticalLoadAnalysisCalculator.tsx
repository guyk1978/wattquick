"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Home, Plus, Trash2, Zap } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateCriticalLoadAnalysis,
  CRITICAL_LOAD_DEVICE_PRESETS,
} from "@/lib/calculators/battery";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorField } from "@/components/calculator/calculator-field";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorCommandInput, flatAlert } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "critical-load-analysis" satisfies CalculatorId;

const HOME_BACKUP_CALCULATOR = {
  label: "Home Backup Battery Sizing — bank Ah & runtime",
  href: "/home-backup-sizing/",
} as const;

const INVERTER_SURGE_CALCULATOR = {
  label: "Inverter Peak Load Surge",
  href: "/inverter-peak-load-surge/",
} as const;

interface DeviceRow {
  id: string;
  name: string;
  runningWatts: string;
  hoursPerDay: string;
  highSurge: boolean;
}

interface CriticalLoadAnalysisCalculatorProps {
  className?: string;
}

function createDeviceRow(
  preset?: (typeof CRITICAL_LOAD_DEVICE_PRESETS)[number]
): DeviceRow {
  return {
    id: crypto.randomUUID(),
    name: preset?.name ?? "",
    runningWatts: preset ? String(preset.runningWatts) : "",
    hoursPerDay: preset ? String(preset.hoursPerDay) : "",
    highSurge: preset?.highSurge ?? false,
  };
}

function buildResultRows(
  parsed: NonNullable<ReturnType<typeof calculateCriticalLoadAnalysis>>
): CalculatorResultRow[] {
  return [
    {
      label: "Total load",
      value: formatNumber(parsed.totalRunningWatts, { maxDecimals: 0 }),
      unit: "W",
    },
    ...(parsed.hasHighSurgeLoads
      ? [
          {
            label: "Estimated total surge",
            value: formatNumber(parsed.estimatedTotalSurge, { maxDecimals: 0 }),
            unit: "W",
          },
        ]
      : []),
    {
      label: "Required capacity",
      value: formatNumber(parsed.requiredWh, { maxDecimals: 0 }),
      unit: "Wh",
    },
    {
      label: "Battery bank",
      value: parsed.batteryBankLabel,
    },
    {
      label: "Inverter efficiency",
      value: formatNumber(parsed.inverterEfficiencyPercent, { maxDecimals: 0 }),
      unit: "%",
    },
    {
      label: "Avg hourly use",
      value: formatNumber(parsed.avgHourlyWh, { maxDecimals: 1 }),
      unit: "Wh/hr",
    },
    {
      label: "Daily energy",
      value: formatNumber(parsed.totalDailyWh, { maxDecimals: 0 }),
      unit: "Wh/day",
    },
  ];
}

export function CriticalLoadAnalysisCalculator({
  className,
}: CriticalLoadAnalysisCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);
  const listId = useId();

  const [devices, setDevices] = useState<DeviceRow[]>(() =>
    CRITICAL_LOAD_DEVICE_PRESETS.map((preset) => createDeviceRow(preset))
  );

  useEffect(() => {
    devices.forEach((row, index) => {
      const slot = index + 1;
      setValue(`device${slot}Name`, row.name);
      setValue(`device${slot}Watts`, row.runningWatts);
      setValue(`device${slot}Hours`, row.hoursPerDay);
      setValue(`device${slot}HighSurge`, row.highSurge ? "true" : "false");
    });
  }, []);

  const syncDeviceToValues = useCallback(
    (index: number, row: DeviceRow) => {
      const slot = index + 1;
      setValue(`device${slot}Name`, row.name);
      setValue(`device${slot}Watts`, row.runningWatts);
      setValue(`device${slot}Hours`, row.hoursPerDay);
      setValue(`device${slot}HighSurge`, row.highSurge ? "true" : "false");
    },
    [setValue]
  );

  const updateDevice = useCallback(
    (id: string, patch: Partial<DeviceRow>) => {
      setDevices((prev) => {
        const next = prev.map((row, index) => {
          if (row.id !== id) return row;
          const updated = { ...row, ...patch };
          syncDeviceToValues(index, updated);
          return updated;
        });
        return next;
      });
    },
    [syncDeviceToValues]
  );

  const addDevice = useCallback(() => {
    setDevices((prev) => {
      const next = [...prev, createDeviceRow()];
      syncDeviceToValues(next.length - 1, next[next.length - 1]);
      return next;
    });
  }, [syncDeviceToValues]);

  const removeDevice = useCallback(
    (id: string) => {
      setDevices((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.filter((row) => row.id !== id);
        next.forEach((row, index) => syncDeviceToValues(index, row));
        for (let slot = next.length + 1; slot <= 12; slot += 1) {
          setValue(`device${slot}Name`, "");
          setValue(`device${slot}Watts`, "");
          setValue(`device${slot}Hours`, "");
          setValue(`device${slot}HighSurge`, "false");
        }
        return next;
      });
    },
    [setValue, syncDeviceToValues]
  );

  const parsed = useMemo(() => {
    const backupTargetHours = parsePositive(values.backupTargetHours ?? "");
    if (backupTargetHours === null) return null;

    const activeDevices = devices
      .map((row) => {
        const runningWatts = parsePositive(row.runningWatts);
        const hoursPerDay = parsePositive(row.hoursPerDay);
        if (!row.name.trim() || runningWatts === null || hoursPerDay === null) {
          return null;
        }
        return {
          name: row.name.trim(),
          runningWatts,
          hoursPerDay,
          highSurge: row.highSurge,
        };
      })
      .filter((device): device is NonNullable<typeof device> => device !== null);

    if (activeDevices.length === 0) return null;

    return calculateCriticalLoadAnalysis({
      devices: activeDevices,
      backupTargetHours,
    });
  }, [devices, values.backupTargetHours]);

  const resultRows = parsed ? buildResultRows(parsed) : [];
  const hasResults = resultRows.length > 0;

  const primaryDetail = parsed
    ? `${formatNumber(parsed.totalRunningWatts, { maxDecimals: 0 })} W total · ${parsed.batteryBankLabel} · 20% buffer`
    : null;

  const backupTargetField = definition.fields.find(
    (field) => field.id === "backupTargetHours"
  );

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
          [definition.result.label]: `${formatNumber(parsed.requiredWh, { maxDecimals: 0 })} Wh`,
          "Total load": `${formatNumber(parsed.totalRunningWatts, { maxDecimals: 0 })} W`,
          "Battery bank": parsed.batteryBankLabel,
          "Inverter efficiency": `${parsed.inverterEfficiencyPercent}%`,
          ...(parsed.hasHighSurgeLoads
            ? {
                "Estimated total surge": `${formatNumber(parsed.estimatedTotalSurge, { maxDecimals: 0 })} W`,
              }
            : {}),
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
          <div className="flex flex-col gap-5">
            <div className="relative border border-border bg-muted/20">
              <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                <p className="text-sm font-medium text-foreground">Essential devices</p>
                <button
                  type="button"
                  onClick={addDevice}
                  className="inline-flex size-8 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-muted"
                  aria-label="Add device"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>

              <ul id={listId} className="divide-y divide-border">
                {devices.map((device, index) => (
                  <li key={device.id} className="flex flex-col gap-3 p-3">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_auto]">
                    <label className="flex min-w-0 flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Device
                      </span>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(event) =>
                          updateDevice(device.id, { name: event.target.value })
                        }
                        placeholder="e.g. Refrigerator"
                        className={cn(
                          calculatorCommandInput,
                          "h-11 w-full rounded-none border px-3 text-sm"
                        )}
                        aria-label={`Device ${index + 1} name`}
                      />
                    </label>

                    <label className="flex min-w-0 flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Running (W)
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={device.runningWatts}
                        onChange={(event) =>
                          updateDevice(device.id, {
                            runningWatts: event.target.value,
                          })
                        }
                        placeholder="150"
                        className={cn(
                          calculatorCommandInput,
                          "h-11 w-full rounded-none border px-3 text-sm tabular-nums"
                        )}
                        aria-label={`Device ${index + 1} running watts`}
                      />
                    </label>

                    <label className="flex min-w-0 flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Hours/day
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={device.hoursPerDay}
                        onChange={(event) =>
                          updateDevice(device.id, {
                            hoursPerDay: event.target.value,
                          })
                        }
                        placeholder="8"
                        className={cn(
                          calculatorCommandInput,
                          "h-11 w-full rounded-none border px-3 text-sm tabular-nums"
                        )}
                        aria-label={`Device ${index + 1} hours per day`}
                      />
                    </label>

                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => removeDevice(device.id)}
                        disabled={devices.length <= 1}
                        className="inline-flex size-11 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Remove device ${index + 1}`}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                    </div>

                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={device.highSurge}
                        onChange={(event) =>
                          updateDevice(device.id, {
                            highSurge: event.target.checked,
                          })
                        }
                        className="size-4 rounded-none border border-border accent-primary"
                        aria-label={`Device ${index + 1} high surge`}
                      />
                      <span>High surge device</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {backupTargetField ? (
              <CalculatorField
                field={backupTargetField}
                value={values.backupTargetHours ?? ""}
                onChange={(value) => setValue("backupTargetHours", value)}
              />
            ) : null}
          </div>
        }
        results={
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Required capacity">
              <CalculatorPrimaryMetric
                value={parsed ? parsed.requiredWh : null}
                unit="Wh"
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric
                decimals={0}
              />
            </GamifiedDashboardFrame>
            <CalculatorResultsTable rows={resultRows} />
            {parsed?.hasHighSurgeLoads ? (
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2.5 border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm leading-relaxed text-amber-950 dark:text-amber-200"
                )}
                role="status"
              >
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden
                />
                <p>
                  High surge load detected. Check if your inverter can handle this
                  peak:{" "}
                  <Link
                    href={INVERTER_SURGE_CALCULATOR.href}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {INVERTER_SURGE_CALCULATOR.label}
                  </Link>
                </p>
              </div>
            ) : null}
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          Required Wh = average hourly consumption × backup target hours × 1.2
          safety factor. Estimated surge uses running watts × 5 for high-surge
          devices. Battery count assumes 12 V 100 Ah cells at 80% depth of
          discharge and {parsed?.inverterEfficiencyPercent ?? 92}% inverter efficiency.
        </CalculatorAssumptionNote>
      ) : null}

      <section
        className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
        aria-labelledby="critical-load-learn-heading"
      >
        <h2
          id="critical-load-learn-heading"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
        >
          <Zap className="size-4 text-primary" aria-hidden />
          Plan essential loads, not the whole house
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          During an outage, size for circuits you truly need—fridge, lights, internet,
          and a few outlets—not every HVAC zone or dryer. This tool turns that
          appliance list into Wh capacity and a starter battery count.
        </p>
        <div className="mt-4">
          <Link
            href={HOME_BACKUP_CALCULATOR.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Home className="size-3.5 shrink-0" aria-hidden />
            {HOME_BACKUP_CALCULATOR.label}
            <ArrowRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </section>

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={
          parsed ? formatNumber(parsed.requiredWh, { maxDecimals: 0 }) : null
        }
        unit="Wh"
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
