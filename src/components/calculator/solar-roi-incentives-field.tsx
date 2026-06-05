"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SolarIncentivesMode } from "@/lib/calculators/solar";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface SolarRoiIncentivesFieldProps {
  mode: SolarIncentivesMode;
  fixedValue: string;
  percentValue: string;
  onModeChange: (mode: SolarIncentivesMode) => void;
  onFixedChange: (value: string) => void;
  onPercentChange: (value: string) => void;
  className?: string;
}

const controlClassName = cn(
  calculatorCommandInput,
  "h-12 w-full rounded-none border-0 px-3.5 text-base text-foreground shadow-none",
  "focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
);

export function SolarRoiIncentivesField({
  mode,
  fixedValue,
  percentValue,
  onModeChange,
  onFixedChange,
  onPercentChange,
  className,
}: SolarRoiIncentivesFieldProps) {
  const isPercent = mode === "percent";

  return (
    <div
      className={cn(
        "calculator-command__field group/field flex flex-col gap-1.5",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label
          htmlFor="solar-roi-incentives-input"
          className="text-sm font-medium leading-snug text-foreground"
        >
          Tax credits &amp; incentives
        </Label>
        <div
          className="solar-roi-incentives-mode inline-flex rounded-none"
          role="group"
          aria-label="Incentive entry mode"
        >
          <button
            type="button"
            className={cn(
              "solar-roi-incentives-mode__btn px-2 py-1 text-[0.6875rem] font-semibold sm:text-xs",
              !isPercent && "solar-roi-incentives-mode__btn--active"
            )}
            aria-pressed={!isPercent}
            onClick={() => onModeChange("fixed")}
          >
            $ Fixed
          </button>
          <button
            type="button"
            className={cn(
              "solar-roi-incentives-mode__btn px-2 py-1 text-[0.6875rem] font-semibold sm:text-xs",
              isPercent && "solar-roi-incentives-mode__btn--active"
            )}
            aria-pressed={isPercent}
            onClick={() => onModeChange("percent")}
          >
            % Percentage
          </button>
        </div>
      </div>

      <Input
        id="solar-roi-incentives-input"
        type="number"
        inputMode="decimal"
        min={0}
        max={isPercent ? 100 : undefined}
        step={isPercent ? 1 : 100}
        value={isPercent ? percentValue : fixedValue}
        onChange={(e) =>
          isPercent
            ? onPercentChange(e.target.value)
            : onFixedChange(e.target.value)
        }
        placeholder={isPercent ? "30" : "0"}
        className={controlClassName}
        aria-label={
          isPercent
            ? "Tax credit percentage of installed cost"
            : "Tax credits and incentives in dollars"
        }
      />

      <p className="text-xs leading-relaxed text-muted-foreground">
        {isPercent
          ? "e.g. 30% Federal ITC — applied to gross install cost before payback"
          : "Federal/state rebates in dollars — reduces net upfront cost"}
      </p>
    </div>
  );
}
