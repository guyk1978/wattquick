"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateBessCarbonCost } from "@/lib/calculators/green-home";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedCounter } from "@/components/calculator/animated-counter";
import { CarbonSavingsVisual } from "@/components/calculator/carbon-savings-visual";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { calculatorResultValue } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import { Battery, Leaf } from "lucide-react";

const CALCULATOR_ID = "bess-carbon-cost" satisfies CalculatorId;

interface BessCarbonCostCalculatorProps {
  className?: string;
}

export function BessCarbonCostCalculator({ className }: BessCarbonCostCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const capacityKwh = parsePositive(values.capacityKwh ?? "");
    const roundTripEfficiency = parsePositive(values.roundTripEfficiency ?? "");
    const cyclesPerYear = parsePositive(values.cyclesPerYear ?? "");
    const gridGco2PerKwh = parsePositive(values.gridGco2PerKwh ?? "");
    if (
      capacityKwh === null ||
      roundTripEfficiency === null ||
      cyclesPerYear === null ||
      gridGco2PerKwh === null ||
      roundTripEfficiency <= 0 ||
      roundTripEfficiency > 100
    ) {
      return null;
    }
    return calculateBessCarbonCost({
      capacityKwh,
      roundTripEfficiencyPercent: roundTripEfficiency,
      cyclesPerYear,
      gridGco2PerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const lossCarbonValue = parsed
    ? formatNumber(parsed.lossCarbonGridKg, { maxDecimals: 1 })
    : null;
  const lossCarbonDetail = parsed
    ? `${parsed.annualLossKwh} kWh/yr conversion losses · ${parsed.lossKwhPerCycle} kWh lost per cycle`
    : null;

  const resultKey = parsed
    ? `${parsed.lossCarbonGridKg}-${parsed.carbonSavedWithRenewablesKg}`
    : "empty";

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || lossCarbonValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: lossCarbonValue, unit: "kg CO₂/yr" },
          "CO₂ saved with renewables": `${formatNumber(parsed.carbonSavedWithRenewablesKg, { maxDecimals: 1 })} kg/yr`,
          "Renewable-charged losses": `${formatNumber(parsed.lossCarbonRenewableKg, { maxDecimals: 1 })} kg CO₂/yr`,
          "Annual charge energy": `${formatNumber(parsed.annualChargeKwh, { maxDecimals: 0 })} kWh/yr`,
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    fieldLabels,
    lossCarbonDetail,
    lossCarbonValue,
    parsed,
    values,
  ]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <CalculatorInputs
            fields={definition.fields}
            values={values}
            onChange={setValue}
          />
        }
        results={
          <GamifiedDashboardFrame
            accent="battery"
            label="Conversion-loss emissions (grid-charged)"
            ambientClassName="bg-emerald-500/[0.14] dark:bg-emerald-500/[0.22]"
          >
            {!parsed ? (
              <p className="mt-5 text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
                {definition.result.emptyMessage}
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className={calculatorResultValue}>
                  <AnimatedCounter
                    target={parsed.lossCarbonGridKg}
                    decimals={1}
                  />
                </span>
                <span className="pb-1 text-xl font-medium text-muted-foreground sm:text-2xl">
                  kg CO₂/yr
                </span>
              </div>
            )}
          </GamifiedDashboardFrame>
        }
      />

      {parsed ? (
        <div
          className="flex items-center gap-3 rounded-none border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-foreground/90"
          role="status"
        >
          <Leaf
            className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden
          />
          <span>
            Renewable charging avoids ~
            {formatNumber(parsed.carbonSavedWithRenewablesKg, { maxDecimals: 1 })}{" "}
            kg CO₂/yr from loss energy vs. grid mix
          </span>
        </div>
      ) : null}

      {parsed ? (
        <CarbonSavingsVisual
          gridCarbonKg={parsed.lossCarbonGridKg}
          savedKg={parsed.carbonSavedWithRenewablesKg}
          savingsPercent={parsed.renewableSavingsPercent}
          className="sm:justify-self-center"
        />
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CalculatorResult
            label="CO₂ saved with renewables"
            value={
              parsed
                ? formatNumber(parsed.carbonSavedWithRenewablesKg, {
                    maxDecimals: 1,
                  })
                : null
            }
            unit="kg/yr"
            detail={
              parsed
                ? `vs. grid charging at ${values.gridGco2PerKwh ?? "420"} gCO₂/kWh on loss kWh`
                : null
            }
            emptyMessage="Enter values above"
          />
          <CalculatorResult
            label="Renewable-charged losses"
            value={
              parsed
                ? formatNumber(parsed.lossCarbonRenewableKg, { maxDecimals: 1 })
                : null
            }
            unit="kg CO₂/yr"
            detail={
              parsed
                ? `${formatNumber(parsed.annualChargeKwh, { maxDecimals: 0 })} kWh/yr charged · ${values.roundTripEfficiency ?? "90"}% round-trip`
                : null
            }
            emptyMessage="Enter values above"
          />
        </div>

        {parsed ? (
          <div className="flex items-start gap-3 rounded-none border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/20">
            <Battery className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <p>
              Operational loss carbon only—battery manufacturing and inverter embodied
              emissions are not included. Schedule charging when solar surplus or low-grid-carbon
              hours align to shrink real-world impact below this grid baseline.
            </p>
          </div>
        ) : null}

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={lossCarbonValue}
          unit="kg CO₂/yr"
          detail={lossCarbonDetail}
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
