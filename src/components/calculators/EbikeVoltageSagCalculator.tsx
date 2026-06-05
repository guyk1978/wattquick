"use client";

import { useMemo } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { calculateEbikeVoltageSag } from "@/lib/calculators/ebike";
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

const CALCULATOR_ID = "ebike-voltage-sag" satisfies CalculatorId;

interface EbikeVoltageSagCalculatorProps {
  className?: string;
}

export function EbikeVoltageSagCalculator({
  className,
}: EbikeVoltageSagCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const parsed = useMemo(() => calculateEbikeVoltageSag(values), [values]);

  const sagDetail = parsed
    ? `Under load ${formatNumber(parsed.loadedVoltage, { maxDecimals: 1 })} V · ${formatNumber(parsed.sagPercent, { maxDecimals: 1 })}% sag`
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
          <GamifiedDashboardFrame accent="primary" label="Voltage sag">
            <CalculatorPrimaryMetric
              value={parsed?.sagVolts ?? null}
              unit="V"
              detail={sagDetail}
              emptyMessage={definition.result.emptyMessage}
              animateNumeric
              decimals={2}
            />
          </GamifiedDashboardFrame>
        }
      />

      <CalculatorSecondaryResults>
        <CalculatorResult
          label="Voltage under load"
          value={
            parsed ? formatNumber(parsed.loadedVoltage, { maxDecimals: 1 }) : null
          }
          unit="V"
          detail={
            parsed
              ? `${values.nominalVoltage ?? "—"} V nominal − ${formatNumber(parsed.sagVolts, { maxDecimals: 2 })} V sag`
              : null
          }
          emptyMessage="Enter values above"
        />
        <CalculatorResult
          label="Pack resistance"
          value={
            parsed ? formatNumber(parsed.rTotal * 1000, { maxDecimals: 1 }) : null
          }
          unit="mΩ"
          detail={
            parsed
              ? `R = ${parsed.cellResistanceOhm} Ω × ${parsed.seriesCells}S ÷ ${parsed.parallelGroups}P @ ${parsed.maxDrawAmps} A`
              : null
          }
          emptyMessage="Enter values above"
        />
      </CalculatorSecondaryResults>

      {parsed ? (
        <CalculatorAssumptionNote>
          Calculation uses average cell internal resistance of{" "}
          {parsed.cellResistanceOhm} Ω (quality 18650 ≈ 0.03 Ω). Pack resistance
          R_total = R_cell × S ÷ P; sag = I × R_total. Actual sag varies with
          temperature, SOC, and cell age.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
