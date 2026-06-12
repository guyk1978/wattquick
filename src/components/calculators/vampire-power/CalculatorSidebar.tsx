"use client";

import { Plus, Trash2 } from "lucide-react";
import { VAMPIRE_DEVICE_PRESETS, type VampireDeviceType } from "@/lib/calculators/appliances";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatorCommandInput } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";
import type { VampireDeviceLine } from "./types";

const MAX_DEVICE_ROWS = 24;

const DEVICE_OPTIONS = Object.entries(VAMPIRE_DEVICE_PRESETS).map(([value, preset]) => ({
  value: value as VampireDeviceType,
  label: preset.label,
}));

const controlClassName = cn(
  calculatorCommandInput,
  "h-11 w-full px-3 text-sm focus-visible:outline-none"
);

export interface CalculatorSidebarProps {
  lines: VampireDeviceLine[];
  ratePerKwh: string;
  rateFieldId: string;
  onUpdateLine: (id: string, patch: Partial<VampireDeviceLine>) => void;
  onDeviceTypeChange: (id: string, deviceType: string) => void;
  onAddLine: () => void;
  onRemoveLine: (id: string) => void;
  onRateChange: (value: string) => void;
}

export function CalculatorSidebar({
  lines,
  ratePerKwh,
  rateFieldId,
  onUpdateLine,
  onDeviceTypeChange,
  onAddLine,
  onRemoveLine,
  onRateChange,
}: CalculatorSidebarProps) {
  return (
    <div className="calculator-sidebar-inputs">
      <div className="calculator-sidebar__section">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Your standby devices
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Add one row per device type. Use quantity for multiples.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddLine}
            disabled={lines.length >= MAX_DEVICE_ROWS}
            className="shrink-0"
          >
            <Plus className="size-4" aria-hidden />
            Add device
          </Button>
        </div>

        <ul className="calculator-sidebar-device-list" aria-label="Device list">
          {lines.map((line, index) => (
            <li key={line.id} className="calculator-sidebar-device-card">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  Device {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onRemoveLine(line.id)}
                  disabled={lines.length <= 1}
                  aria-label={`Remove device ${index + 1}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </Button>
              </div>

              <div className="calculator-sidebar-device-card__fields">
                <div className="calculator-sidebar-field">
                  <Label htmlFor={`${line.id}-type`} className="calculator-sidebar-field__label">
                    Device type
                  </Label>
                  <select
                    id={`${line.id}-type`}
                    value={line.deviceType}
                    onChange={(e) => onDeviceTypeChange(line.id, e.target.value)}
                    className={cn(controlClassName, "cursor-pointer")}
                  >
                    {DEVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="calculator-sidebar-device-card__row">
                  <div className="calculator-sidebar-field">
                    <Label htmlFor={`${line.id}-watts`} className="calculator-sidebar-field__label">
                      Standby (W)
                    </Label>
                    <Input
                      id={`${line.id}-watts`}
                      type="text"
                      inputMode="decimal"
                      value={line.watts}
                      onChange={(e) => onUpdateLine(line.id, { watts: e.target.value })}
                      className={controlClassName}
                      autoComplete="off"
                    />
                  </div>

                  <div className="calculator-sidebar-field">
                    <Label htmlFor={`${line.id}-count`} className="calculator-sidebar-field__label">
                      Qty
                    </Label>
                    <Input
                      id={`${line.id}-count`}
                      type="text"
                      inputMode="numeric"
                      value={line.count}
                      onChange={(e) => onUpdateLine(line.id, { count: e.target.value })}
                      className={controlClassName}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="calculator-sidebar__section calculator-sidebar-field">
        <div className="calculator-sidebar-field__label-row">
          <Label htmlFor={rateFieldId} className="calculator-sidebar-field__label">
            Electricity rate
          </Label>
          <span className="calculator-sidebar-field__unit">$/kWh</span>
        </div>
        <Input
          id={rateFieldId}
          type="text"
          inputMode="decimal"
          value={ratePerKwh}
          onChange={(e) => onRateChange(e.target.value)}
          placeholder="0.14"
          className={controlClassName}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
