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
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";

const CALCULATOR_ID = "ebike-battery-cycle-life" satisfies CalculatorId;

interface EbikeBatteryCycleLifeCalculatorProps {
  className?: string;
}

function buildCycleLifeResultRows(
  parsed: NonNullable<ReturnType<typeof calculateEbikeBatteryCycleLife>>
): CalculatorResultRow[] {
  return [
    {
      label: "Estimated remaining cycles",
      value: formatNumber(parsed.remainingModelCycles, { maxDecimals: 0 }),
      unit: "cycles",
    },
    {
      label: "Expected total (model)",
      value: formatNumber(parsed.expectedTotalCycles, { maxDecimals: 0 }),
      unit: "cycles",
    },
    {
      label: `Remaining to ${parsed.sohTargetPercent}% SOH spec`,
      value: formatNumber(parsed.remainingManufacturerCycles, { maxDecimals: 0 }),
      unit: "cycles",
    },
    {
      label: "Life used (model)",
      value: formatNumber(parsed.lifeUsedPercent, { maxDecimals: 0 }),
      unit: "%",
    },
    {
      label: "Average depth of discharge",
      value: formatNumber(parsed.dod * 100, { maxDecimals: 0 }),
      unit: "% DOD",
    },
    {
      label: "Chemistry constant (k)",
      value: formatNumber(parsed.chemistryK, { maxDecimals: 0 }),
    },
    {
      label: "Manufacturer rated cycles",
      value: formatNumber(parsed.manufacturerRatedCycles, { maxDecimals: 0 }),
      unit: "cycles",
    },
  ];
}

export function EbikeBatteryCycleLifeCalculator({
  className,
}: EbikeBatteryCycleLifeCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const output = useMemo(() => {
    const parsed = calculateEbikeBatteryCycleLife(values);
    if (!parsed) {
      return { results: [] as CalculatorResultRow[] };
    }
    return { results: buildCycleLifeResultRows(parsed) };
  }, [values]);

  const primary = output.results[0];
  const secondaryRows = output.results.slice(1);
  const hasResults = output.results.length > 0;

  const primaryDetail = hasResults
    ? parsedDetailFromRows(secondaryRows)
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
          <div className="flex w-full min-w-0 flex-col gap-3">
            <GamifiedDashboardFrame accent="primary" label="Primary result">
              <CalculatorPrimaryMetric
                calculatorId={CALCULATOR_ID}
                value={primary?.value ?? null}
                unit={primary?.unit}
                detail={primaryDetail}
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
                values={values}
              />
            </GamifiedDashboardFrame>
            <CalculatorResultsTable rows={secondaryRows} />
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          Cycles ≈ k × DOD⁻¹·⁵. Manufacturer ratings (typically 500–800 cycles
          at 80% DOD to 80% SOH) reflect lab conditions—heat and fast charging
          reduce real-world life.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}

function parsedDetailFromRows(secondaryRows: CalculatorResultRow[]): string {
  const expectedTotal = secondaryRows[0];
  const sohRemaining = secondaryRows[1];
  const lifeUsed = secondaryRows[2];

  if (!expectedTotal || !sohRemaining || !lifeUsed) {
    return "";
  }

  return `${expectedTotal.value} ${expectedTotal.unit ?? ""} model total · ${sohRemaining.value} ${sohRemaining.unit ?? ""} to SOH spec · ${lifeUsed.value}${lifeUsed.unit ?? ""} used`;
}
