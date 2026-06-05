"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ArrowRight, Plus, Thermometer, Trash2 } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateStandbyPowerAggregator,
  STANDBY_POWER_DEVICE_PRESETS,
} from "@/lib/calculators/appliances";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
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

const CALCULATOR_ID = "standby-power-aggregator" satisfies CalculatorId;

const SMART_THERMOSTAT_CALCULATOR = {
  label: "Smart Thermostat Savings Calculator",
  href: "/smart-thermostat-savings/",
} as const;

interface DeviceRow {
  id: string;
  name: string;
  standbyWatts: string;
  deviceCount: string;
}

interface StandbyPowerAggregatorCalculatorProps {
  className?: string;
}

function createDeviceRow(
  preset?: (typeof STANDBY_POWER_DEVICE_PRESETS)[number]
): DeviceRow {
  return {
    id: crypto.randomUUID(),
    name: preset?.name ?? "",
    standbyWatts: preset ? String(preset.standbyWatts) : "",
    deviceCount: preset ? String(preset.deviceCount) : "1",
  };
}

function buildResultRows(
  parsed: NonNullable<ReturnType<typeof calculateStandbyPowerAggregator>>
): CalculatorResultRow[] {
  const summaryRows: CalculatorResultRow[] = [
    {
      label: "Total standby watts",
      value: formatNumber(parsed.totalStandbyWatts, { maxDecimals: 0 }),
      unit: "W",
    },
    {
      label: "Total annual energy",
      value: formatNumber(parsed.annualKwh, { maxDecimals: 0 }),
      unit: "kWh",
    },
    {
      label: "Est. annual cost",
      value: formatCurrency(parsed.annualCost),
    },
    {
      label: "What you could buy",
      value: parsed.comparisonLabel,
    },
    {
      label: "Potential savings",
      value: formatCurrency(parsed.potentialAnnualSavings),
      unit: "/yr",
    },
  ];

  const deviceRows: CalculatorResultRow[] = parsed.devices.map((device) => ({
    label: device.name,
    value: formatCurrency(device.annualCost),
    unit: "/yr",
  }));

  return [...summaryRows, ...deviceRows];
}

export function StandbyPowerAggregatorCalculator({
  className,
}: StandbyPowerAggregatorCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);
  const listId = useId();

  const [devices, setDevices] = useState<DeviceRow[]>(() =>
    STANDBY_POWER_DEVICE_PRESETS.map((preset) => createDeviceRow(preset))
  );

  useEffect(() => {
    devices.forEach((row, index) => {
      const slot = index + 1;
      setValue(`device${slot}Name`, row.name);
      setValue(`device${slot}Watts`, row.standbyWatts);
      setValue(`device${slot}Count`, row.deviceCount);
    });
  }, []);

  const syncDeviceToValues = useCallback(
    (index: number, row: DeviceRow) => {
      const slot = index + 1;
      setValue(`device${slot}Name`, row.name);
      setValue(`device${slot}Watts`, row.standbyWatts);
      setValue(`device${slot}Count`, row.deviceCount);
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
          setValue(`device${slot}Count`, "");
        }
        return next;
      });
    },
    [setValue, syncDeviceToValues]
  );

  const parsed = useMemo(() => {
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    if (ratePerKwh === null) return null;

    const activeDevices = devices
      .map((row) => {
        const standbyWatts = parsePositive(row.standbyWatts);
        const deviceCount = parsePositive(row.deviceCount);
        if (!row.name.trim() || standbyWatts === null || deviceCount === null) {
          return null;
        }
        return {
          name: row.name.trim(),
          standbyWatts,
          deviceCount,
        };
      })
      .filter((device): device is NonNullable<typeof device> => device !== null);

    if (activeDevices.length === 0) return null;

    return calculateStandbyPowerAggregator(activeDevices, ratePerKwh);
  }, [devices, values.ratePerKwh]);

  const resultRows = parsed ? buildResultRows(parsed) : [];
  const hasResults = resultRows.length > 0;

  const primaryDetail = parsed
    ? `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh/yr · ${formatNumber(parsed.totalStandbyWatts, { maxDecimals: 0 })} W · ${formatCurrency(parsed.monthlyCost)}/mo`
    : null;

  const rateField = definition.fields.find((field) => field.id === "ratePerKwh");

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
          [definition.result.label]: formatCurrency(parsed.annualCost),
          "Total standby watts": `${formatNumber(parsed.totalStandbyWatts, { maxDecimals: 0 })} W`,
          "Total annual energy": `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh`,
          "Potential savings": formatCurrency(parsed.potentialAnnualSavings),
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
                <p className="text-sm font-medium text-foreground">Standby devices</p>
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
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.6fr)_auto]">
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
                          placeholder="e.g. Television"
                          className={cn(
                            calculatorCommandInput,
                            "h-11 w-full rounded-none border px-3 text-sm"
                          )}
                          aria-label={`Device ${index + 1} name`}
                        />
                      </label>

                      <label className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                          Standby (W)
                        </span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={device.standbyWatts}
                          onChange={(event) =>
                            updateDevice(device.id, {
                              standbyWatts: event.target.value,
                            })
                          }
                          placeholder="5"
                          className={cn(
                            calculatorCommandInput,
                            "h-11 w-full rounded-none border px-3 text-sm tabular-nums"
                          )}
                          aria-label={`Device ${index + 1} standby watts`}
                        />
                      </label>

                      <label className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                          Qty
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={device.deviceCount}
                          onChange={(event) =>
                            updateDevice(device.id, {
                              deviceCount: event.target.value,
                            })
                          }
                          placeholder="1"
                          className={cn(
                            calculatorCommandInput,
                            "h-11 w-full rounded-none border px-3 text-sm tabular-nums"
                          )}
                          aria-label={`Device ${index + 1} quantity`}
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
                  </li>
                ))}
              </ul>
            </div>

            {rateField ? (
              <CalculatorField
                field={rateField}
                value={values.ratePerKwh ?? ""}
                onChange={(value) => setValue("ratePerKwh", value)}
              />
            ) : null}
          </div>
        }
        results={
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Annual vampire cost">
              <CalculatorPrimaryMetric
                value={parsed ? formatCurrency(parsed.annualCost) : null}
                unit="/yr"
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
              />
            </GamifiedDashboardFrame>
            <CalculatorResultsTable rows={resultRows} />
            {hasResults ? (
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2.5 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
                )}
                role="status"
              >
                <Thermometer
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <p>
                  Want to stop the waste? Check out our{" "}
                  <Link
                    href={SMART_THERMOSTAT_CALCULATOR.href}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {SMART_THERMOSTAT_CALCULATOR.label}
                  </Link>
                  <ArrowRight className="ml-1 inline size-3.5 align-middle" aria-hidden />
                </p>
              </div>
            ) : null}
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          Daily kWh = Σ (standby W × qty × 24 h) ÷ 1,000. Annual cost = daily kWh ×
          365 × rate. Potential savings assumes ~90% standby cut with smart strips or
          switched outlets.
        </CalculatorAssumptionNote>
      ) : null}

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={parsed ? formatCurrency(parsed.annualCost) : null}
        unit="/yr"
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
