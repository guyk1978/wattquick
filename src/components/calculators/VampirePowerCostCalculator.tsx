"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Plus, Trash2 } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateVampirePowerMulti,
  VAMPIRE_DEVICE_PRESETS,
  type VampireDeviceType,
} from "@/lib/calculators/appliances";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "vampire-power-cost" satisfies CalculatorId;

const MAX_DEVICE_ROWS = 24;

const LEARN_MORE_LINKS = [
  {
    title: "3 Easy Tips to Reduce Your Standby Power Loads",
    source: "U.S. Department of Energy",
    href: "https://www.energy.gov/energysaver/articles/3-easy-tips-reduce-your-standby-power-loads",
  },
  {
    title: "Energy Vampires: Keep Your Devices from Wasting Energy and Money",
    source: "NRDC",
    href: "https://www.nrdc.org/stories/energy-vampires-keep-your-devices-wasting-energy-and-money",
  },
  {
    title: "ENERGY STAR Computers",
    source: "ENERGY STAR",
    href: "https://www.energystar.gov/products/computers",
    hint: "Sleep, idle, and standby requirements for certified products",
  },
] as const;

const RELATED_LINKS = [
  {
    title: "Vampire Energy and Standby Power Waste in the Home",
    href: "/blog/vampire-energy-standby-power-waste/",
  },
  {
    title: "Whole House Energy Budget Calculator",
    href: "/whole-house-energy-budget/",
  },
  {
    title: "Standby Power Waste Calculator",
    href: "/standby-power-waste/",
  },
  {
    title: "Appliance Daily Cost Calculator",
    href: "/appliance-daily-cost/",
  },
] as const;

const DEVICE_OPTIONS = Object.entries(VAMPIRE_DEVICE_PRESETS).map(([value, preset]) => ({
  value: value as VampireDeviceType,
  label: preset.label,
}));

const controlClassName = cn(
  calculatorCommandInput,
  "h-12 w-full px-3.5 text-base focus-visible:outline-none"
);

export interface VampireDeviceLine {
  id: string;
  deviceType: VampireDeviceType;
  watts: string;
  count: string;
}

function isVampireDeviceType(value: string): value is VampireDeviceType {
  return value in VAMPIRE_DEVICE_PRESETS;
}

function createDeviceLine(deviceType: VampireDeviceType = "tv"): VampireDeviceLine {
  const preset = VAMPIRE_DEVICE_PRESETS[deviceType];
  return {
    id: crypto.randomUUID(),
    deviceType,
    watts: String(preset.standbyWatts),
    count: "1",
  };
}

interface VampirePowerCostCalculatorProps {
  className?: string;
}

export function VampirePowerCostCalculator({ className }: VampirePowerCostCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const rateFieldId = useId();

  const [lines, setLines] = useState<VampireDeviceLine[]>(() => [createDeviceLine("tv")]);
  const [ratePerKwh, setRatePerKwh] = useState("0.14");

  const updateLine = useCallback((id: string, patch: Partial<VampireDeviceLine>) => {
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, ...patch } : line))
    );
  }, []);

  const handleDeviceTypeChange = useCallback((id: string, deviceType: string) => {
    if (!isVampireDeviceType(deviceType)) return;
    const preset = VAMPIRE_DEVICE_PRESETS[deviceType];
    setLines((prev) =>
      prev.map((line) =>
        line.id === id
          ? {
              ...line,
              deviceType,
              watts:
                deviceType === "custom" ? line.watts : String(preset.standbyWatts),
            }
          : line
      )
    );
  }, []);

  const addLine = useCallback(() => {
    setLines((prev) => {
      if (prev.length >= MAX_DEVICE_ROWS) return prev;
      return [...prev, createDeviceLine("phone_charger")];
    });
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((line) => line.id !== id)));
  }, []);

  const { parsed, lineBreakdown } = useMemo(() => {
    const rate = parsePositive(ratePerKwh);
    if (rate === null) return { parsed: null, lineBreakdown: [] as const };

    const breakdown: {
      label: string;
      watts: number;
      count: number;
      subtotalWatts: number;
      annualCost: number;
    }[] = [];

    const multiLines: { standbyWatts: number; deviceCount: number }[] = [];

    for (const line of lines) {
      const watts = parsePositive(line.watts);
      const count = parsePositive(line.count);
      if (watts === null || count === null) continue;

      multiLines.push({ standbyWatts: watts, deviceCount: count });
      const row = calculateVampirePowerMulti([{ standbyWatts: watts, deviceCount: count }], rate);
      const label = isVampireDeviceType(line.deviceType)
        ? VAMPIRE_DEVICE_PRESETS[line.deviceType].label
        : "Device";

      breakdown.push({
        label,
        watts,
        count,
        subtotalWatts: watts * count,
        annualCost: row?.annualCost ?? 0,
      });
    }

    const parsed = calculateVampirePowerMulti(multiLines, rate);
    return { parsed, lineBreakdown: breakdown };
  }, [lines, ratePerKwh]);

  const annualValue = parsed ? formatCurrency(parsed.annualCost) : null;
  const annualDetail = parsed
    ? `${parsed.annualKwh} kWh/yr · ${formatCurrency(parsed.monthlyCost)}/mo · ${parsed.totalStandbyWatts} W · ${parsed.lineCount} device row${parsed.lineCount === 1 ? "" : "s"}`
    : null;

  const pdfFieldLabels = useMemo(
    () => ({
      ratePerKwh: "Electricity rate",
      devices: "Devices",
    }),
    []
  );

  const pdfValues = useMemo(
    () => ({
      ratePerKwh,
      devices: lines
        .map((line) => {
          const label = isVampireDeviceType(line.deviceType)
            ? VAMPIRE_DEVICE_PRESETS[line.deviceType].label
            : line.deviceType;
          return `${label}: ${line.watts} W × ${line.count}`;
        })
        .join("; "),
    }),
    [lines, ratePerKwh]
  );

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || annualValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      const lineResults = Object.fromEntries(
        lineBreakdown.map((row, index) => [
          `${index + 1}. ${row.label}`,
          {
            value: formatCurrency(row.annualCost),
            unit: "/yr",
          },
        ])
      );

      await generatePDFReport(
        definition.title,
        buildPdfInputs(pdfValues, pdfFieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: annualValue, unit: "/yr" },
          "Annual energy": `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh`,
          "Monthly cost": formatCurrency(parsed.monthlyCost),
          "Total standby draw": `${parsed.totalStandbyWatts} W`,
          ...lineResults,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    annualValue,
    definition.result.label,
    definition.title,
    lineBreakdown,
    parsed,
    pdfFieldLabels.ratePerKwh,
    pdfValues.devices,
    ratePerKwh,
  ]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <div className="flex flex-col gap-6">
          <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Your standby devices
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Add one row per device type. Use quantity for multiples (e.g. three phone
                chargers).
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLine}
              disabled={lines.length >= MAX_DEVICE_ROWS}
              className="shrink-0"
            >
              <Plus className="size-4" aria-hidden />
              Add device
            </Button>
          </div>

          <ul className="space-y-3" aria-label="Device list">
            {lines.map((line, index) => (
              <li
                key={line.id}
                className="rounded-none border border-border/50 bg-muted/15 p-4 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Device {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 1}
                    aria-label={`Remove device ${index + 1}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </Button>
                </div>

                <div className="calculator-secondary-results">
                  <div className="space-y-2 sm:col-span-2">
                    <Label
                      htmlFor={`${line.id}-type`}
                      className="text-[0.8125rem] font-medium text-foreground/90"
                    >
                      Device type
                    </Label>
                    <select
                      id={`${line.id}-type`}
                      value={line.deviceType}
                      onChange={(e) => handleDeviceTypeChange(line.id, e.target.value)}
                      className={cn(controlClassName, "cursor-pointer")}
                    >
                      {DEVICE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <Label
                        htmlFor={`${line.id}-watts`}
                        className="text-[0.8125rem] font-medium text-foreground/90"
                      >
                        Standby power
                      </Label>
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        W
                      </span>
                    </div>
                    <Input
                      id={`${line.id}-watts`}
                      type="text"
                      inputMode="decimal"
                      value={line.watts}
                      onChange={(e) => updateLine(line.id, { watts: e.target.value })}
                      className={controlClassName}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <Label
                        htmlFor={`${line.id}-count`}
                        className="text-[0.8125rem] font-medium text-foreground/90"
                      >
                        Quantity
                      </Label>
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        #
                      </span>
                    </div>
                    <Input
                      id={`${line.id}-count`}
                      type="text"
                      inputMode="numeric"
                      value={line.count}
                      onChange={(e) => updateLine(line.id, { count: e.target.value })}
                      className={controlClassName}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <Label
              htmlFor={rateFieldId}
              className="text-[0.8125rem] font-medium tracking-tight text-foreground/90"
            >
              Electricity rate
            </Label>
            <span className="shrink-0 rounded-none bg-muted/80 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
              $/kWh
            </span>
          </div>
          <Input
            id={rateFieldId}
            type="text"
            inputMode="decimal"
            value={ratePerKwh}
            onChange={(e) => setRatePerKwh(e.target.value)}
            placeholder="0.14"
            className={controlClassName}
            autoComplete="off"
          />
        </div>
          </div>
        }
        results={
          <CostGamifiedResult
            calculatorId={CALCULATOR_ID}
            label={definition.result.label}
            value={annualValue}
            unit="/yr"
            detail={annualDetail}
            emptyMessage={definition.result.emptyMessage}
          />
        }
      />

      {parsed && lineBreakdown.length > 0 ? (
          <div className="overflow-hidden rounded-none border border-border/50">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Cost breakdown by device row</caption>
              <thead>
                <tr className="border-b border-border/50 bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Device</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Load</th>
                  <th className="px-3 py-2 text-right font-medium">$/yr</th>
                </tr>
              </thead>
              <tbody>
                {lineBreakdown.map((row, rowIndex) => (
                  <tr
                    key={`${rowIndex}-${row.label}-${row.subtotalWatts}`}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-3 py-2.5 text-foreground">
                      {row.label}
                      <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">
                        {row.watts} W × {row.count}
                      </span>
                    </td>
                    <td className="hidden px-3 py-2.5 tabular-nums text-muted-foreground sm:table-cell">
                      {row.watts} W × {row.count} ({row.subtotalWatts} W)
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-medium tabular-nums">
                      {formatCurrency(row.annualCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {parsed ? (
          <div className="calculator-secondary-results">
            <div className="rounded-none border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Annual energy
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {formatNumber(parsed.annualKwh, { maxDecimals: 0 })}{" "}
                <span className="text-sm font-medium text-muted-foreground">kWh/yr</span>
              </p>
            </div>
            <div className="rounded-none border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Monthly cost
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {formatCurrency(parsed.monthlyCost)}
                <span className="text-sm font-medium text-muted-foreground">/mo</span>
              </p>
            </div>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorSlug={CALCULATOR_ID}
        calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={annualValue}
          unit="/yr"
          detail={annualDetail}
          values={pdfValues}
          fieldLabels={pdfFieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

        <ShareButtons title={definition.title} className="pt-1" />

        <section
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="vampire-learn-more-heading"
        >
          <h2
            id="vampire-learn-more-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Learn more
          </h2>
          <ul className="mt-4 space-y-3">
            {LEARN_MORE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-start justify-between gap-3 rounded-none border border-border/40",
                    "bg-background/40 px-4 py-3 text-sm transition-colors",
                    "hover:border-primary/30 hover:bg-primary/5"
                  )}
                >
                  <span>
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {link.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {link.source}
                    </span>
                    {"hint" in link && link.hint ? (
                      <span className="mt-1 block text-xs text-muted-foreground/90">
                        {link.hint}
                      </span>
                    ) : null}
                  </span>
                  <ExternalLink
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-none border border-primary/20 bg-primary/5 p-5 sm:p-6"
          aria-labelledby="vampire-cta-heading"
        >
          <h2
            id="vampire-cta-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Cut hidden loads across your home
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Explore related guides and calculators on this site to shrink baseload and plug
            loads.
          </p>
          <ul className="mt-4 space-y-2">
            {RELATED_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium text-primary",
                    "underline-offset-4 hover:underline"
                  )}
                >
                  {item.title}
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
    </CalculatorCommandShell>
  );
}
