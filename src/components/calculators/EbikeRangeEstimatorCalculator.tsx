"use client";

import { useMemo } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEbikeRange } from "@/lib/calculators/ebike";
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

const CALCULATOR_ID = "ebike-range-estimator" satisfies CalculatorId;

interface EbikeRangeEstimatorCalculatorProps {
  className?: string;
}

export function EbikeRangeEstimatorCalculator({
  className,
}: EbikeRangeEstimatorCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => calculateEbikeRange(values), [values]);

  const rangeDetail = parsed
    ? `${formatNumber(parsed.consumptionWhPerKm, { maxDecimals: 1 })} Wh/km · ${formatNumber(parsed.usableWh, { maxDecimals: 0 })} Wh usable`
    : null;

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
          <GamifiedDashboardFrame accent="primary" label="Estimated range">
            <CalculatorPrimaryMetric
              value={parsed?.rangeKm ?? null}
              unit="km"
              detail={rangeDetail}
              emptyMessage={definition.result.emptyMessage}
              animateNumeric
              decimals={1}
            />
          </GamifiedDashboardFrame>
        }
      />

      <CalculatorSecondaryResults>
        <CalculatorResult
          label="Power consumption"
          value={
            parsed
              ? formatNumber(parsed.consumptionWhPerKm, { maxDecimals: 1 })
              : null
          }
          unit="Wh/km"
          detail={
            parsed
              ? `Base × assist × terrain + ${formatNumber(parsed.weightPenalty, { maxDecimals: 2 })} Wh/km weight`
              : null
          }
          emptyMessage="Enter values above"
        />
        <CalculatorResult
          label="Assist multiplier"
          value={parsed ? formatNumber(parsed.assistMult, { maxDecimals: 2 }) : null}
          unit="×"
          detail={parsed ? `Level ${parsed.assistLevel} · terrain ×${parsed.windTerrainFactor}` : null}
          emptyMessage="Enter values above"
        />
      </CalculatorSecondaryResults>

      {parsed ? (
        <CalculatorAssumptionNote>
          Range = (battery Wh × pack efficiency) ÷ Wh/km. Base rolling consumption
          defaults to 9 Wh/km; assist scales 1.0–2.5 (levels 1–5); +0.1 Wh/km per
          10 kg above 80 kg total mass; wind/terrain factor 0.8–1.5.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
