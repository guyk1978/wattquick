"use client";

import {
  PROJECT_CURRENCY_OPTIONS,
  type ProjectCurrency,
} from "@/lib/project-currency";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectCurrencySelectorProps {
  value: ProjectCurrency;
  onChange: (currency: ProjectCurrency) => void;
  className?: string;
}

export function ProjectCurrencySelector({
  value,
  onChange,
  className,
}: ProjectCurrencySelectorProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor="project-currency"
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Quote currency
      </label>
      <select
        id="project-currency"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as ProjectCurrency)
        }
        className={cn(
          calculatorCommandInput,
          "h-10 min-w-[12rem] rounded-none border-0 px-3 text-sm shadow-none focus-visible:ring-0"
        )}
      >
        {PROJECT_CURRENCY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
