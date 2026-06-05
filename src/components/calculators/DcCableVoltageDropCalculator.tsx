"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Cable,
  CheckCircle2,
  Flame,
  Sun,
  Zap,
} from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateDcCableVoltageDrop } from "@/lib/calculators/electrical";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { calculatorResultsGrid3, calculatorCommandPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "dc-cable-voltage-drop" satisfies CalculatorId;

const SOLAR_PANEL_CALCULATOR = {
  label: "Solar Panel Size — match array to daily energy",
  href: "/solar-panel-size/",
} as const;

interface DcCableVoltageDropCalculatorProps {
  className?: string;
}

const COMPLIANCE_STYLES = {
  "within-limit": {
    icon: CheckCircle2,
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  },
  marginal: {
    icon: AlertTriangle,
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  },
  excessive: {
    icon: AlertTriangle,
    badge:
      "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300",
  },
} as const;

export function DcCableVoltageDropCalculator({
  className,
}: DcCableVoltageDropCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const loadAmps = parsePositive(values.loadAmps ?? "");
    const systemVoltageV = parsePositive(values.systemVoltageV ?? "");
    const oneWayLengthM = parsePositive(values.oneWayLengthM ?? "");
    const maxDropRaw = values.maxDropPercent?.trim() ?? "3";
    const maxDropPercent = Number(maxDropRaw);

    if (
      loadAmps === null ||
      systemVoltageV === null ||
      oneWayLengthM === null ||
      !Number.isFinite(maxDropPercent) ||
      maxDropPercent <= 0 ||
      maxDropPercent > 10
    ) {
      return null;
    }

    return calculateDcCableVoltageDrop({
      loadAmps,
      systemVoltageV,
      oneWayLengthM,
      maxDropPercent,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const cableDetail = parsed
    ? `Min ${formatNumber(parsed.minMm2ForDrop, { maxDecimals: 1 })} mm² for ${formatNumber(parsed.maxDropPercent, { maxDecimals: 1 })}% · ${parsed.recommendedAwg} AWG`
    : null;

  const complianceStyle = parsed ? COMPLIANCE_STYLES[parsed.compliance] : null;
  const ComplianceIcon = complianceStyle?.icon ?? Cable;

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
          "Recommended cable": parsed.recommendedCableLabel,
          "Voltage drop": `${formatNumber(parsed.dropPercent, { maxDecimals: 2 })}%`,
          "Power loss": `${formatNumber(parsed.powerLossWatts, { maxDecimals: 1 })} W`,
          "Voltage at load": `${formatNumber(parsed.voltageAtLoad, { maxDecimals: 2 })} V`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, values]);

  return (
    <div className={cn(calculatorCommandPanel(), className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={setValue}
        />

        {parsed && complianceStyle ? (
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium",
              complianceStyle.badge
            )}
            role="status"
          >
            <ComplianceIcon className="size-5 shrink-0" aria-hidden />
            <span>{parsed.recommendation}</span>
          </div>
        ) : null}

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <div className={calculatorResultsGrid3}>
            <CalculatorResult
              label="Recommended cable size"
              value={parsed.recommendedCableLabel}
              detail={cableDetail}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Voltage drop %"
              value={formatNumber(parsed.dropPercent, { maxDecimals: 2 })}
              unit="%"
              detail={`${formatNumber(parsed.dropVolts, { maxDecimals: 2 })} V drop · ${formatNumber(parsed.voltageAtLoad, { maxDecimals: 1 })} V at load`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Power loss (watts)"
              value={formatNumber(parsed.powerLossWatts, { maxDecimals: 1 })}
              unit="W"
              detail={`I²R · ${formatNumber(parsed.loadAmps, { maxDecimals: 1 })} A · ${formatNumber(parsed.oneWayLengthM, { maxDecimals: 0 })} m one-way`}
              emptyMessage="—"
            />
          </div>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="dc-drop-learn-heading"
        >
          <h2
            id="dc-drop-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Zap className="size-4 text-primary" aria-hidden />
            Why voltage drop matters
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            On DC solar homeruns, every volt lost in the cable is a volt your{" "}
            <strong className="font-medium text-foreground">MPPT or charge controller</strong>{" "}
            never sees. Beyond the usual 3% planning limit, undersized copper runs hot
            (I²R loss), which raises insulation temperature and fire risk on roof trenches
            and long array feeds.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We size for your amp load, one-way length in meters, and max drop target, then
            snap to the next standard mm² / AWG with enough ampacity for continuous DC.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Cable className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Round-trip resistance: panel → controller and return conductor</span>
            </li>
            <li className="flex gap-2">
              <Flame className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Power loss (W) is wasted heat in the cable—size up to stay cool</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href={SOLAR_PANEL_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <Sun className="size-3.5 shrink-0" aria-hidden />
              {SOLAR_PANEL_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={parsed?.recommendedCableLabel ?? null}
          detail={cableDetail}
          values={values}
          fieldLabels={fieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

        <ShareButtons title={definition.title} className="pt-1" />
      </div>
    </div>
  );
}
