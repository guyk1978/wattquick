"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  Battery,
  Fuel,
  Home,
  Sun,
  Volume2,
  Wrench,
} from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateGeneratorRuntimeSavings } from "@/lib/calculators/solar";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { CostGamifiedResult } from "@/components/calculator/cost-gamified-result";
import { calculatorResultsGrid3, glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "generator-runtime-savings" satisfies CalculatorId;

const HOME_BACKUP_CALCULATOR = {
  label: "Home Backup Battery Sizing — size essentials & runtime",
  href: "/home-backup-sizing/",
} as const;

interface GeneratorRuntimeSavingsCalculatorProps {
  className?: string;
}

export function GeneratorRuntimeSavingsCalculator({
  className,
}: GeneratorRuntimeSavingsCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const dailyGeneratorHours = parsePositive(values.dailyGeneratorHours ?? "");
    const solarSystemKw = parsePositive(values.solarSystemKw ?? "");
    const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
    const peakSunHours = parsePositive(values.peakSunHours ?? "");
    const maintenanceCostPerHour = parsePositive(
      values.maintenanceCostPerHour ?? ""
    );

    if (
      dailyGeneratorHours === null ||
      solarSystemKw === null ||
      batteryCapacityKwh === null ||
      peakSunHours === null ||
      maintenanceCostPerHour === null
    ) {
      return null;
    }

    return calculateGeneratorRuntimeSavings({
      dailyGeneratorHours,
      solarSystemKw,
      batteryCapacityKwh,
      peakSunHours,
      maintenanceCostPerHour,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const annualSavingsValue = parsed
    ? formatCurrency(parsed.annualMaintenanceSavings)
    : null;
  const annualDetail = parsed
    ? `${formatCurrency(parsed.monthlyMaintenanceSavings)}/mo · ${formatNumber(parsed.offsetFraction, { maxDecimals: 0 })}% load offset · ${formatNumber(parsed.dailyHoursAfter, { maxDecimals: 1 })} h gen/day after hybrid`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || annualSavingsValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          "Daily engine hours saved": `${formatNumber(parsed.dailyHoursSaved, { maxDecimals: 2 })} h`,
          "Annual maintenance savings": annualSavingsValue,
          "Generator life extension": `${formatNumber(parsed.generatorLifeExtensionYears, { maxDecimals: 1 })} yr`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [annualSavingsValue, definition.title, fieldLabels, parsed, values]);

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
        <CalculatorInputs
          fields={definition.fields}
          values={values}
          onChange={setValue}
        />

        <div className="h-px bg-border/60" aria-hidden />

        {parsed ? (
          <>
            <CostGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={definition.result.label}
              value={annualSavingsValue}
              detail={annualDetail}
              emptyMessage={definition.result.emptyMessage}
            />

            <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Daily engine hours saved"
                value={formatNumber(parsed.dailyHoursSaved, { maxDecimals: 2 })}
                unit="hrs/day"
                detail={`${formatNumber(parsed.hybridOffsetKwh, { maxDecimals: 1 })} kWh/day solar+battery · ${formatNumber(parsed.dailyKwhFromGenerator, { maxDecimals: 1 })} kWh/day from gen today`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Annual maintenance savings"
                value={formatCurrency(parsed.annualMaintenanceSavings)}
                unit="/yr"
                detail={`${formatCurrency(parsed.monthlyMaintenanceSavings)}/mo · oil, filters & wear`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Generator life extension"
                value={formatNumber(parsed.generatorLifeExtensionYears, {
                  maxDecimals: 1,
                })}
                unit="years"
                detail={`~${formatNumber(parsed.lifeYearsBefore, { maxDecimals: 1 })} → ${formatNumber(parsed.lifeYearsAfter, { maxDecimals: 1 })} yr at ${formatNumber(parsed.dailyHoursAfter, { maxDecimals: 1 })} h/day`}
                emptyMessage="—"
              />
            </div>
          </>
        ) : (
          <CostGamifiedResult
            calculatorId={CALCULATOR_ID}
            label={definition.result.label}
            value={null}
            detail={null}
            emptyMessage={definition.result.emptyMessage}
          />
        )}

        <section
          className="rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="gen-hybrid-learn-heading"
        >
          <h2
            id="gen-hybrid-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Sun className="size-4 text-primary" aria-hidden />
            Why go hybrid
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A{" "}
            <strong className="font-medium text-foreground">solar + battery hybrid</strong>{" "}
            lets the generator sit idle while the sun and stored kWh carry routine loads.
            Fewer engine hours mean less noise, less fuel, and fewer oil changes—while the
            genset stays available for deep-cloud weeks or peak tool loads.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Volume2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Quieter homesteads and campgrounds when the gen runs only as backup</span>
            </li>
            <li className="flex gap-2">
              <Fuel className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Lower fuel burn—pair with our generator vs. solar hybrid cost tool</span>
            </li>
            <li className="flex gap-2">
              <Battery className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Higher reliability: multiple energy paths instead of a single genset</span>
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
          value={annualSavingsValue}
          detail={annualDetail}
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
