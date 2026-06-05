"use client";

import { useMemo } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  ESCOOTER_CALCULATOR_IDS,
  ESCOOTER_HANDLERS,
  type EscooterCalculatorSlug,
} from "@/lib/calculators/escooter";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { CalculatorAssumptionNote } from "@/components/calculator/calculator-assumption-note";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorPrimaryMetric } from "@/components/calculator/calculator-primary-metric";
import { CalculatorResultsTable } from "@/components/calculator/calculator-results-table";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { GamifiedDashboardFrame } from "@/components/calculator/gamified-dashboard-frame";

function isEscooterSlug(id: CalculatorId): id is EscooterCalculatorSlug {
  return (ESCOOTER_CALCULATOR_IDS as readonly string[]).includes(id);
}

interface EscooterCalculatorShellProps {
  id: CalculatorId;
  className?: string;
}

export function EscooterCalculatorShell({
  id,
  className,
}: EscooterCalculatorShellProps) {
  if (!isEscooterSlug(id)) {
    throw new Error(`Unknown e-scooter calculator: ${id}`);
  }

  const definition = getCalculatorDefinition(id);
  const handler = ESCOOTER_HANDLERS[id];
  const { values, setValue } = useCalculatorForm(definition.fields);

  const output = useMemo(() => {
    const parsed = handler.calculate(values);
    if (!parsed) return { results: [] as ReturnType<typeof handler.buildRows> };
    return { results: handler.buildRows(parsed), note: handler.note };
  }, [handler, values]);

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
                  hasResults && secondaryRows[0]
                    ? `${secondaryRows[0].label}: ${secondaryRows[0].value} ${secondaryRows[0].unit ?? ""}`.trim()
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
        <CalculatorAssumptionNote>{handler.note}</CalculatorAssumptionNote>
      ) : null}
    </CalculatorCommandShell>
  );
}
