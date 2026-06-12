"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
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
import { CalculatorResults } from "@/components/calculators/vampire-power/CalculatorResults";
import { CalculatorSidebar } from "@/components/calculators/vampire-power/CalculatorSidebar";
import type { VampireDeviceLine } from "@/components/calculators/vampire-power/types";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "vampire-power-cost" satisfies CalculatorId;

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
      if (prev.length >= 24) return prev;
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
    pdfFieldLabels,
    pdfValues,
  ]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <CalculatorSidebar
            lines={lines}
            ratePerKwh={ratePerKwh}
            rateFieldId={rateFieldId}
            onUpdateLine={updateLine}
            onDeviceTypeChange={handleDeviceTypeChange}
            onAddLine={addLine}
            onRemoveLine={removeLine}
            onRateChange={setRatePerKwh}
          />
        }
        results={
          <CalculatorResults
            calculatorId={CALCULATOR_ID}
            resultLabel={definition.result.label}
            emptyMessage={definition.result.emptyMessage}
            annualValue={annualValue}
            annualDetail={annualDetail}
            parsed={parsed}
            lineBreakdown={lineBreakdown}
          />
        }
      />

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
                  "hover:border-[var(--matte-hover-border)] hover:bg-[var(--matte-hover)]"
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
          Explore related guides and calculators on this site to shrink baseload and plug loads.
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
