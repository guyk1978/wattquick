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
import {
  CalculatorResultsTable,
  type CalculatorResultRow,
} from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";
import { buildProjectSavePayloadFromRows } from "@/lib/project-store";

const CALCULATOR_ID = "ebike-range-estimator" satisfies CalculatorId;

interface EbikeRangeEstimatorCalculatorProps {
  className?: string;
}

function buildRangeResultRows(
  parsed: NonNullable<ReturnType<typeof calculateEbikeRange>>
): CalculatorResultRow[] {
  return [
    {
      label: "Estimated range",
      value: formatNumber(parsed.rangeKm, { maxDecimals: 1 }),
      unit: "km",
    },
    {
      label: "Power consumption",
      value: formatNumber(parsed.consumptionWhPerKm, { maxDecimals: 1 }),
      unit: "Wh/km",
    },
    {
      label: "Usable energy",
      value: formatNumber(parsed.usableWh, { maxDecimals: 0 }),
      unit: "Wh",
    },
    {
      label: "Assist multiplier",
      value: formatNumber(parsed.assistMult, { maxDecimals: 2 }),
      unit: "×",
    },
    {
      label: "Weight penalty",
      value: formatNumber(parsed.weightPenalty, { maxDecimals: 2 }),
      unit: "Wh/km",
    },
    {
      label: "Wind / terrain factor",
      value: formatNumber(parsed.windTerrainFactor, { maxDecimals: 2 }),
      unit: "×",
    },
    {
      label: "Assist level",
      value: String(parsed.assistLevel),
      unit: "L",
    },
  ];
}

export function EbikeRangeEstimatorCalculator({
  className,
}: EbikeRangeEstimatorCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const output = useMemo(() => {
    const parsed = calculateEbikeRange(values);
    if (!parsed) {
      return { results: [] as CalculatorResultRow[] };
    }
    return { results: buildRangeResultRows(parsed) };
  }, [values]);

  const primary = output.results[0];
  const secondaryRows = output.results.slice(1);
  const hasResults = output.results.length > 0;

  const fieldLabels = useMemo(
    () =>
      Object.fromEntries(
        definition.fields.map((field) => [field.id, field.label])
      ),
    [definition.fields]
  );

  const saveToProject = useMemo(
    () =>
      hasResults
        ? buildProjectSavePayloadFromRows({
            calculatorSlug: CALCULATOR_ID,
            calculatorTitle: definition.title,
            values,
            fieldLabels,
            rows: output.results,
          })
        : undefined,
    [definition.title, fieldLabels, hasResults, output.results, values]
  );

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
                    ? `${secondaryRows[0]?.value ?? "—"} ${secondaryRows[0]?.unit ?? ""} consumption · ${secondaryRows[1]?.value ?? "—"} ${secondaryRows[1]?.unit ?? ""} usable`.trim()
                    : null
                }
                emptyMessage={definition.result.emptyMessage}
                animateNumeric={false}
              />
            </GamifiedDashboardFrame>
            <CalculatorResultsTable
              rows={secondaryRows}
              saveToProject={saveToProject ?? undefined}
            />
          </div>
        }
      />

      {hasResults ? (
        <CalculatorAssumptionNote>
          Range = (battery Wh × pack efficiency) ÷ Wh/km. Base rolling consumption
          defaults to 9 Wh/km; assist scales 1.0–2.5 (levels 1–5); +0.1 Wh/km per
          10 kg above 80 kg total mass; wind/terrain factor 0.8–1.5.
        </CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
