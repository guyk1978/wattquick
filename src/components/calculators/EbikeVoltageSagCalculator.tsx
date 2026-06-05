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
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";

const CALCULATOR_ID = "ebike-voltage-sag" satisfies CalculatorId;

interface EbikeVoltageSagCalculatorProps {
  className?: string;
}

function buildVoltageSagResultRows(
  parsed: NonNullable<ReturnType<typeof calculateEbikeVoltageSag>>,
  nominalVoltage: string
): CalculatorResultRow[] {
  return [
    {
      label: "Voltage under load",
      value: formatNumber(parsed.loadedVoltage, { maxDecimals: 1 }),
      unit: "V",
    },
    {
      label: "Voltage sag",
      value: formatNumber(parsed.sagVolts, { maxDecimals: 2 }),
      unit: "V",
    },
    {
      label: "Sag percentage",
      value: formatNumber(parsed.sagPercent, { maxDecimals: 1 }),
      unit: "%",
    },
    {
      label: "Pack resistance",
      value: formatNumber(parsed.rTotal * 1000, { maxDecimals: 1 }),
      unit: "mΩ",
    },
    {
      label: "Nominal voltage",
      value: nominalVoltage || "—",
      unit: "V",
    },
    {
      label: "Max controller draw",
      value: formatNumber(parsed.maxDrawAmps, { maxDecimals: 0 }),
      unit: "A",
    },
    {
      label: "Cell resistance",
      value: formatNumber(parsed.cellResistanceOhm, { maxDecimals: 3 }),
      unit: "Ω",
    },
    {
      label: "Pack layout",
      value: `${parsed.seriesCells}S${parsed.parallelGroups}P`,
    },
  ];
}

export function EbikeVoltageSagCalculator({
  className,
}: EbikeVoltageSagCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const output = useMemo(() => {
    const parsed = calculateEbikeVoltageSag(values);
    if (!parsed) {
      return { results: [] as CalculatorResultRow[] };
    }
    return {
      results: buildVoltageSagResultRows(parsed, values.nominalVoltage ?? ""),
    };
  }, [values]);

  const primary = output.results[0];
  const secondaryRows = output.results.slice(1);
  const hasResults = output.results.length > 0;

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
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Primary result">
              <CalculatorPrimaryMetric
                value={primary?.value ?? null}
                unit={primary?.unit}
                detail={
                  hasResults
                    ? `${secondaryRows[0]?.value ?? "—"} V sag · ${secondaryRows[1]?.value ?? "—"}% of nominal`
                    : null
                }
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
              />
            </GamifiedDashboardFrame>
            <CalculatorResultsTable rows={secondaryRows} />
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          R_total = R_cell × S ÷ P; V_sag = I × R_total. Default cell resistance
          is 0.03 Ω (quality 18650). Actual sag varies with temperature, SOC, and
          cell age.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
