"use client";

import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEvChargingCableLoss } from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { CalculatorSecondaryResults } from "@/components/calculator/calculator-secondary-results";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { cn } from "@/lib/utils";
import { Cable, Flame, Zap } from "lucide-react";

const CALCULATOR_ID = "ev-charging-cable-loss" satisfies CalculatorId;

interface EvChargingCableLossCalculatorProps {
  className?: string;
}

export function EvChargingCableLossCalculator({
  className,
}: EvChargingCableLossCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => {
    const chargeAmps = parsePositive(values.chargeAmps ?? "");
    const cableLengthM = parsePositive(values.cableLengthM ?? "");
    const crossSectionMm2 = parsePositive(values.crossSectionMm2 ?? "");
    const chargeHours = parsePositive(values.chargeHours ?? "");
    const ratePerKwh = parsePositive(values.ratePerKwh ?? "") ?? 0.14;
    if (
      chargeAmps === null ||
      cableLengthM === null ||
      crossSectionMm2 === null ||
      chargeHours === null
    ) {
      return null;
    }
    return calculateEvChargingCableLoss({
      chargeAmps,
      cableLengthM,
      crossSectionMm2,
      chargeHours,
      ratePerKwh,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const lossWValue = parsed
    ? formatNumber(parsed.powerLossW, { maxDecimals: 1 })
    : null;
  const lossWDetail = parsed
    ? `${parsed.wireLabel} · ${parsed.roundTripOhms} Ω round-trip · ~${formatNumber(parsed.lossPercentOfChargePower, { maxDecimals: 1 })}% of ${values.chargeAmps ?? "—"} A @ 230 V`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed || lossWValue === null) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: lossWValue, unit: "W" },
          "Wasted energy": `${formatNumber(parsed.energyLossKwh, { maxDecimals: 2 })} kWh`,
          "Heat loss cost": formatCurrency(parsed.sessionCost),
          "Loss percent of charge power": `${formatNumber(parsed.lossPercentOfChargePower, { maxDecimals: 1 })}%`,
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
    lossWValue,
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
          <GamifiedDashboardFrame accent="primary" label="Cable power loss">
            <CalculatorPrimaryMetric
              value={parsed ? parsed.powerLossW : null}
              unit="W"
              detail={lossWDetail}
              emptyMessage={definition.result.emptyMessage}
              animateNumeric
              decimals={1}
            />
          </GamifiedDashboardFrame>
        }
      />

      {parsed && parsed.powerLossW > 80 ? (
        <div
          className="flat-alert flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground"
          role="status"
        >
          <Flame className="size-4 shrink-0 text-orange-700 dark:text-orange-400" aria-hidden />
          <span>
            High I²R loss—upsizing conductor or shortening the run reduces heat
            and may improve charge speed if voltage sag was limiting current.
          </span>
        </div>
      ) : null}

      <CalculatorSecondaryResults>
        <CalculatorResult
          label="Wasted energy"
          value={
            parsed ? formatNumber(parsed.energyLossKwh, { maxDecimals: 2 }) : null
          }
          unit="kWh"
          detail={
            parsed
              ? `${values.chargeHours ?? "—"} h session · ${values.chargeAmps ?? "—"} A continuous`
              : null
          }
          emptyMessage="Enter values above"
        />
        <CalculatorResult
          label="Heat loss cost"
          value={parsed ? formatCurrency(parsed.sessionCost) : null}
          unit="/session"
          detail={
            parsed
              ? `At ${formatCurrency(parseFloat(values.ratePerKwh ?? "0.14") || 0.14)}/kWh — energy you paid for but did not reach the pack`
              : null
          }
          emptyMessage="Enter values above"
        />
      </CalculatorSecondaryResults>

      {parsed ? (
        <div className="flat-alert flex items-start gap-2.5 px-3 py-2.5 text-sm text-muted-foreground">
          <Cable className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p>
            <Zap className="mr-1 inline size-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
            Doubling cable length doubles resistance; halving mm² doubles loss at
            the same amps—size for your longest habitual run.
          </p>
        </div>
      ) : null}

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={lossWValue}
        unit="W"
        detail={lossWDetail}
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
