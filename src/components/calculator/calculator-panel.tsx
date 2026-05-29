"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { useMemo } from "react";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { usesBatteryDashboard } from "@/lib/battery-dashboard";
import { usesCostDashboard } from "@/lib/cost-dashboard";
import { usesEvDashboard } from "@/lib/ev-dashboard";
import { BatteryGamifiedResult } from "./battery-gamified-result";
import { CostGamifiedResult } from "./cost-gamified-result";
import { EvGamifiedResult } from "./ev-gamified-result";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";
import { glassPanel } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorPanelProps {
  id: CalculatorId;
  className?: string;
}

/** Interactive calculator body: inputs + live result. */
export function CalculatorPanel({ id, className }: CalculatorPanelProps) {
  const definition = getCalculatorDefinition(id);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => definition.compute(values),
    [definition, values]
  );

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  return (
    <div className={cn(glassPanel(), "p-4 sm:p-6", className)}>
      <div className="glass-neon__inner flex flex-col gap-6 sm:gap-8">
      <CalculatorInputs
        fields={definition.fields}
        values={values}
        onChange={setValue}
      />

      <div className="h-px bg-border/60" aria-hidden />

      {usesBatteryDashboard(definition.category, id) ? (
        <BatteryGamifiedResult
          calculatorId={id}
          label={definition.result.label}
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      ) : usesCostDashboard(definition.category, id) ? (
        <CostGamifiedResult
          calculatorId={id}
          label={definition.result.label}
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      ) : usesEvDashboard(definition.category, id) ? (
        <EvGamifiedResult
          calculatorId={id}
          label={definition.result.label}
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      ) : (
        <CalculatorResult
          label={definition.result.label}
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      )}

      <JoinMyPdfSaveReport
        calculatorTitle={definition.title}
        resultLabel={definition.result.label}
        value={result.value}
        unit={result.unit}
        detail={result.detail}
        values={values}
        fieldLabels={fieldLabels}
      />

      <ShareButtons title={definition.title} className="pt-1" />
      </div>
    </div>
  );
}
