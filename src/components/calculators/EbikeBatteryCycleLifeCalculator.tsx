"use client";

import { useMemo } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEbikeBatteryCycleLife } from "@/lib/calculators/ebike";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber } from "@/lib/format";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
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

const CALCULATOR_ID = "ebike-battery-cycle-life" satisfies CalculatorId;

interface EbikeBatteryCycleLifeCalculatorProps {
  className?: string;
}

export function EbikeBatteryCycleLifeCalculator({
  className,
}: EbikeBatteryCycleLifeCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => calculateEbikeBatteryCycleLife(values), [values]);

  const primaryDetail = parsed
    ? parsed.atSohEndOfLife
      ? `Past ${parsed.sohTargetPercent}% SOH manufacturer rating (${parsed.manufacturerRatedCycles} cycles)`
      : `${formatNumber(parsed.lifeUsedPercent, { maxDecimals: 0 })}% of k×DOD⁻¹·⁵ model life used`
    : null;

  return (
    <CalculatorCommandShell className={cn(className)}>
      <CalculatorCommandSplit
        inputs={
          <CalculatorInputs
            fields={definition.fields}
            values={values}
            onChange={setValue}
          />
        }
        results={
          <GamifiedDashboardFrame accent="primary" label="Remaining cycles">
            <CalculatorPrimaryMetric
              value={parsed?.remainingModelCycles ?? null}
              unit="cycles"
              detail={primaryDetail}
              emptyMessage={definition.result.emptyMessage}
              animateNumeric
              decimals={0}
            />
          </GamifiedDashboardFrame>
        }
      />

      <CalculatorSecondaryResults>
        <CalculatorResult
          label="Expected total (model)"
          value={
            parsed
              ? formatNumber(parsed.expectedTotalCycles, { maxDecimals: 0 })
              : null
          }
          unit="cycles"
          detail={
            parsed
              ? `k=${parsed.chemistryK} × DOD(${formatNumber(parsed.dod * 100, { maxDecimals: 0 })}%)⁻¹·⁵`
              : null
          }
          emptyMessage="Enter values above"
        />
        <CalculatorResult
          label={`To ${parsed?.sohTargetPercent ?? 80}% SOH spec`}
          value={
            parsed
              ? formatNumber(parsed.remainingManufacturerCycles, { maxDecimals: 0 })
              : null
          }
          unit="cycles left"
          detail={
            parsed
              ? parsed.atSohEndOfLife
                ? "Manufacturer end-of-life threshold reached"
                : `${parsed.manufacturerRatedCycles} cycles rated at ${parsed.sohTargetPercent}% SOH`
              : null
          }
          emptyMessage="Enter values above"
        />
      </CalculatorSecondaryResults>

      {parsed ? (
        <CalculatorAssumptionNote>
          Industry decay model: cycles ≈ k × DOD⁻¹·⁵ (k = {parsed.chemistryK} for
          quality Li-ion). Manufacturer ratings (typically 500–800 cycles at 80%
          DOD to {parsed.sohTargetPercent}% SOH) reflect lab conditions—heat and
          fast charging reduce real-world life.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
