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
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  StandbyPowerResultsGrid,
  type StandbyPowerResultRow,
} from "@/components/calculator/standby-power-results-grid";
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

const MAX_DEVICE_ROWS = 12;

const controlClassName = cn(
  calculatorCommandInput,
  "h-11 w-full px-3 text-sm focus-visible:outline-none"
);

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

function formatCompactAnnualCost(amount: number): string {
  return `${formatCurrency(amount)}/yr`;
}

function buildResultRows(
  parsed: NonNullable<ReturnType<typeof calculateStandbyPowerAggregator>>
): StandbyPowerResultRow[] {
  const summaryRows: StandbyPowerResultRow[] = [
    {
      id: "total-standby-watts",
      label: "Total standby watts",
      display: `${formatNumber(parsed.totalStandbyWatts, { maxDecimals: 0 })} W`,
      accent: true,
    },
    {
      id: "total-annual-energy",
      label: "Total annual energy",
      display: `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh/yr`,
      accent: true,
    },
    {
      id: "est-annual-cost",
      label: "Est. annual cost",
      display: formatCompactAnnualCost(parsed.annualCost),
      accent: true,
    },
    {
      id: "what-you-could-buy",
      label: "What you could buy",
      display: parsed.comparisonLabel,
      multiline: true,
    },
    {
      id: "potential-savings",
      label: "Potential savings",
      display: formatCompactAnnualCost(parsed.potentialAnnualSavings),
      accent: true,
    },
  ];

  const deviceRows: StandbyPowerResultRow[] = parsed.devices.map((device) => ({
    id: `device-${device.name}`,
    label: device.name,
    display: formatCompactAnnualCost(device.annualCost),
    accent: true,
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
    ? `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh/yr · ${formatNumber(parsed.totalStandbyWatts, { maxDecimals: 0 })} W`
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
          <div className="calculator-sidebar-inputs">
            <div className="calculator-sidebar__section">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Standby devices
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    One row per device. Enter standby watts and quantity for each.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDevice}
                  disabled={devices.length >= MAX_DEVICE_ROWS}
                  className="shrink-0"
                >
                  <Plus className="size-4" aria-hidden />
                  Add device
                </Button>
              </div>

              <ul id={listId} className="calculator-sidebar-device-list" aria-label="Device list">
                {devices.map((device, index) => (
                  <li key={device.id} className="calculator-sidebar-device-card">
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        Device {index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeDevice(device.id)}
                        disabled={devices.length <= 1}
                        aria-label={`Remove device ${index + 1}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                      </Button>
                    </div>

                    <div className="calculator-sidebar-device-card__fields">
                      <div className="calculator-sidebar-field">
                        <Label
                          htmlFor={`${device.id}-name`}
                          className="calculator-sidebar-field__label"
                        >
                          Device name
                        </Label>
                        <Input
                          id={`${device.id}-name`}
                          type="text"
                          value={device.name}
                          onChange={(event) =>
                            updateDevice(device.id, { name: event.target.value })
                          }
                          placeholder="e.g. Television"
                          className={controlClassName}
                          autoComplete="off"
                        />
                      </div>

                      <div className="calculator-sidebar-field">
                        <Label
                          htmlFor={`${device.id}-watts`}
                          className="calculator-sidebar-field__label"
                        >
                          Standby power (W)
                        </Label>
                        <Input
                          id={`${device.id}-watts`}
                          type="text"
                          inputMode="decimal"
                          value={device.standbyWatts}
                          onChange={(event) =>
                            updateDevice(device.id, {
                              standbyWatts: event.target.value,
                            })
                          }
                          placeholder="5"
                          className={cn(controlClassName, "tabular-nums")}
                          autoComplete="off"
                        />
                      </div>

                      <div className="calculator-sidebar-field">
                        <Label
                          htmlFor={`${device.id}-count`}
                          className="calculator-sidebar-field__label"
                        >
                          Quantity
                        </Label>
                        <Input
                          id={`${device.id}-count`}
                          type="text"
                          inputMode="numeric"
                          value={device.deviceCount}
                          onChange={(event) =>
                            updateDevice(device.id, {
                              deviceCount: event.target.value,
                            })
                          }
                          placeholder="1"
                          className={cn(controlClassName, "tabular-nums")}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {rateField ? (
              <div className="calculator-sidebar__section calculator-sidebar-field">
                <div className="calculator-sidebar-field__label-row">
                  <Label
                    htmlFor="standby-rate-per-kwh"
                    className="calculator-sidebar-field__label"
                  >
                    {rateField.label}
                  </Label>
                  <span className="calculator-sidebar-field__unit">$/kWh</span>
                </div>
                <Input
                  id="standby-rate-per-kwh"
                  type="text"
                  inputMode="decimal"
                  value={values.ratePerKwh ?? ""}
                  onChange={(event) => setValue("ratePerKwh", event.target.value)}
                  placeholder={rateField.placeholder ?? "0.14"}
                  className={controlClassName}
                  autoComplete="off"
                />
                {rateField.hint ? (
                  <p className="text-xs leading-relaxed text-muted-foreground/90">
                    {rateField.hint}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        }
        results={
          <div className="flex w-full min-w-0 flex-col gap-2">
            <GamifiedDashboardFrame
              accent="primary"
              label="Annual vampire cost"
              className="!p-3 sm:!p-4"
            >
              <CalculatorPrimaryMetric
                value={parsed ? formatCurrency(parsed.annualCost) : null}
                unit="/yr"
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
              />
            </GamifiedDashboardFrame>
            <StandbyPowerResultsGrid rows={resultRows} />
            {hasResults ? (
              <div
                className={cn(
                  flatAlert,
                  "flex gap-2 px-2.5 py-2 text-xs leading-relaxed text-muted-foreground"
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
        calculatorSlug={CALCULATOR_ID}
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
