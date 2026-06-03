"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Bolt, Home, Plug, Zap } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateInverterPeakLoadSurge,
  INVERTER_MOTOR_LOAD_PRESETS,
  type InverterMotorLoad,
  type InverterMotorLoadPreset,
} from "@/lib/calculators/electrical";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { calculatorResultsGrid3, glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "inverter-peak-load-surge" satisfies CalculatorId;

const HOME_BACKUP_CALCULATOR = {
  label: "Home Backup Battery Sizing — essentials & runtime",
  href: "/home-backup-sizing/",
} as const;

const APPLIANCE_SLOTS = [1, 2, 3, 4] as const;

interface InverterPeakLoadSurgeCalculatorProps {
  className?: string;
}

function isLoadPreset(value: string): value is InverterMotorLoadPreset {
  return value in INVERTER_MOTOR_LOAD_PRESETS;
}

function parseLoadsFromValues(
  values: Record<string, string>
): InverterMotorLoad[] | null {
  const loads: InverterMotorLoad[] = [];

  for (const slot of APPLIANCE_SLOTS) {
    const presetRaw = values[`appliance${slot}Preset`] ?? "none";
    if (!isLoadPreset(presetRaw) || presetRaw === "none") continue;

    const runningWatts = parsePositive(values[`appliance${slot}RunningW`] ?? "");
    const surgeRaw = parsePositive(values[`appliance${slot}Surge`] ?? "");
    if (
      runningWatts === null ||
      surgeRaw === null ||
      surgeRaw < 1 ||
      surgeRaw > 12
    ) {
      return null;
    }
    loads.push({
      preset: presetRaw,
      runningWatts,
      surgeFactor: surgeRaw,
    });
  }

  return loads.length > 0 ? loads : null;
}

export function InverterPeakLoadSurgeCalculator({
  className,
}: InverterPeakLoadSurgeCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      const presetMatch = id.match(/^appliance(\d)Preset$/);
      if (presetMatch && isLoadPreset(value)) {
        const slot = presetMatch[1];
        setValue(id, value);
        if (value !== "none" && value !== "custom") {
          const preset = INVERTER_MOTOR_LOAD_PRESETS[value];
          setValue(`appliance${slot}RunningW`, String(preset.defaultRunningW));
          setValue(`appliance${slot}Surge`, String(preset.defaultSurge));
        }
        return;
      }
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const loads = parseLoadsFromValues(values);
    if (!loads) return null;
    return calculateInverterPeakLoadSurge({ loads });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const inverterDetail = parsed
    ? `${parsed.recommendedContinuousW} W cont · ${parsed.recommendedSurgeW} W surge class · ${parsed.activeLoadCount} loads`
    : null;

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
          "Continuous load": `${formatNumber(parsed.continuousW, { maxDecimals: 0 })} W`,
          "Peak surge requirement": `${formatNumber(parsed.peakW, { maxDecimals: 0 })} W`,
          "Recommended inverter": parsed.recommendedInverterLabel,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, values]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={handleFieldChange}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <div className={calculatorResultsGrid3}>
            <CalculatorResult
              label="Continuous load"
              value={formatNumber(parsed.continuousW, { maxDecimals: 0 })}
              unit="W"
              detail={`${parsed.activeLoadCount} motor loads running · 15% headroom in recommendation`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Peak surge requirement"
              value={formatNumber(parsed.peakW, { maxDecimals: 0 })}
              unit="W"
              detail={`Staggered start · saves ${formatNumber(parsed.diversitySavingsW, { maxDecimals: 0 })} W vs. all motors at once (${formatNumber(parsed.naivePeakW, { maxDecimals: 0 })} W)`}
              emptyMessage="—"
            />
            <CalculatorResult
              label="Recommended inverter"
              value={formatNumber(parsed.recommendedContinuousW, { maxDecimals: 0 })}
              unit="W"
              detail={inverterDetail}
              emptyMessage="—"
            />
          </div>
        ) : null}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="inverter-surge-learn-heading"
        >
          <h2
            id="inverter-surge-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Bolt className="size-4 text-primary" aria-hidden />
            Inrush current &amp; inverter surge
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Motors draw brief{" "}
            <strong className="font-medium text-foreground">inrush current</strong>—often
            3× to 7× running amps when compressors and pumps spin up. An inverter must
            supply that{" "}
            <strong className="font-medium text-foreground">peak / surge</strong> rating
            for milliseconds to seconds without shutting down, even though its continuous
            rating covers everyday watts.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Not every motor starts on the same cycle, so we add the largest single surge
            margin plus a fraction of the next—then match a standard pure-sine tier with
            ~2× surge capability.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Plug className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Use nameplate LRA or manufacturer surge when you have it</span>
            </li>
            <li className="flex gap-2">
              <Zap className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Soft-starters and staggered controls lower effective surge factors</span>
            </li>
          </ul>
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
            parsed
              ? formatNumber(parsed.recommendedContinuousW, { maxDecimals: 0 })
              : null
          }
          detail={inverterDetail}
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
