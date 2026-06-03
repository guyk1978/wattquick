"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateVampirePowerCost,
  VAMPIRE_DEVICE_PRESETS,
  type VampireDeviceType,
} from "@/lib/calculators/appliances";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "vampire-power-cost" satisfies CalculatorId;

const LEARN_MORE_LINKS = [
  {
    title: "Understanding Standby Power",
    source: "U.S. Department of Energy",
    href: "https://www.energy.gov/energysaver/standby-power-and-home-office-equipment",
  },
  {
    title: "Vampire Power: What it is and how to stop it",
    source: "NRDC",
    href: "https://www.nrdc.org/stories/vampire-power-what-it-and-how-stop-it",
  },
  {
    title: "Phantom Energy Loads: Calculating your home's hidden costs",
    source: "ENERGY STAR",
    href: "https://www.energystar.gov/products/phantom-load",
  },
] as const;

const RELATED_ARTICLES = [
  {
    title: "Vampire Energy and Standby Power Waste in the Home",
    href: "/blog/vampire-energy-standby-power-waste/",
  },
  {
    title: "Building a Daily Watt-Hour Budget for a Sustainable Home",
    href: "/blog/daily-watt-hour-budget-sustainable-home/",
  },
  {
    title: "Cutting Electric Bills With Time-of-Use Load Shifting",
    href: "/blog/cutting-bills-with-time-of-use-shifting/",
  },
] as const;

interface VampirePowerCostCalculatorProps {
  className?: string;
}

function isVampireDeviceType(value: string): value is VampireDeviceType {
  return value in VAMPIRE_DEVICE_PRESETS;
}

export function VampirePowerCostCalculator({ className }: VampirePowerCostCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "deviceType" && isVampireDeviceType(value)) {
        setValue("deviceType", value);
        setValue(
          "standbyWattsPerDevice",
          String(VAMPIRE_DEVICE_PRESETS[value].standbyWatts)
        );
        return;
      }
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const standbyWattsPerDevice = parsePositive(values.standbyWattsPerDevice ?? "");
    const deviceCount = parsePositive(values.deviceCount ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
    if (standbyWattsPerDevice === null || deviceCount === null || ratePerKwh === null) {
      return null;
    }
    return calculateVampirePowerCost({
      standbyWattsPerDevice,
      deviceCount,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const deviceType = values.deviceType ?? "";
  const deviceLabel = isVampireDeviceType(deviceType)
    ? VAMPIRE_DEVICE_PRESETS[deviceType].label
    : "device";

  const annualValue = parsed ? formatCurrency(parsed.annualCost) : null;
  const annualDetail = parsed
    ? `${parsed.annualKwh} kWh/yr · ${formatCurrency(parsed.monthlyCost)}/mo · ${parsed.totalStandbyWatts} W total · ${deviceLabel}`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || annualValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          [definition.result.label]: { value: annualValue, unit: "/yr" },
          "Annual energy": `${formatNumber(parsed.annualKwh, { maxDecimals: 0 })} kWh`,
          "Monthly cost": formatCurrency(parsed.monthlyCost),
          "Total standby draw": `${parsed.totalStandbyWatts} W`,
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
    fieldLabels,
    parsed,
    values,
  ]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        <div className="h-px bg-border/60" aria-hidden />

        <CostGamifiedResult
          calculatorId={CALCULATOR_ID}
          label={definition.result.label}
          value={annualValue}
          unit="/yr"
          detail={annualDetail}
          emptyMessage={definition.result.emptyMessage}
        />

        {parsed ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-muted/25 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Annual energy
              </p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
                {formatNumber(parsed.annualKwh, { maxDecimals: 0 })}{" "}
                <span className="text-sm font-medium text-muted-foreground">kWh/yr</span>
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-muted/25 px-4 py-3">
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
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={annualValue}
          unit="/yr"
          detail={annualDetail}
          values={values}
          fieldLabels={fieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

        <ShareButtons title={definition.title} className="pt-1" />

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
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
                    "group flex items-start justify-between gap-3 rounded-xl border border-border/40",
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
          className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6"
          aria-labelledby="vampire-cta-heading"
        >
          <h2
            id="vampire-cta-heading"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Cut hidden loads across your home
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Pair this estimate with guides on standby waste, whole-home budgets, and shifting
            flexible loads off-peak.
          </p>
          <ul className="mt-4 space-y-2">
            {RELATED_ARTICLES.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium text-primary",
                    "underline-offset-4 hover:underline"
                  )}
                >
                  {article.title}
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Also try the{" "}
            <Link
              href="/standby-power-waste/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Standby Power Waste Calculator
            </Link>{" "}
            for whole-home phantom load totals.
          </p>
        </section>
      </div>
    </div>
  );
}
