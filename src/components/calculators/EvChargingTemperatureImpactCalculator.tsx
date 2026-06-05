"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Battery, Car, Snowflake, Thermometer, Wrench } from "lucide-react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import {
  calculateEvChargingTemperatureImpact,
  EV_CHARGING_BATTERY_PRESETS,
  EV_CHARGING_TEMP_SCENARIOS,
  type EvChargingBatteryPreset,
  type EvChargingTempScenario,
} from "@/lib/calculators/ev";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { formatNumber, parsePositive } from "@/lib/format";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { CalculatorInputs } from "@/components/calculator/calculator-inputs";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "@/components/calculator/calculator-command-layout";
import { EvGamifiedResult } from "@/components/calculator/ev-gamified-result";
import { calculatorResultsGrid3 } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const CALCULATOR_ID = "ev-charging-temperature-impact" satisfies CalculatorId;

const MAINTENANCE_CALCULATOR = {
  label: "EV vs ICE maintenance & battery costs",
  href: "/ev-vs-ice-maintenance/",
} as const;

interface EvChargingTemperatureImpactCalculatorProps {
  className?: string;
}

function isBatteryPreset(value: string): value is EvChargingBatteryPreset {
  return value in EV_CHARGING_BATTERY_PRESETS;
}

function isTempScenario(value: string): value is EvChargingTempScenario {
  return value in EV_CHARGING_TEMP_SCENARIOS;
}

export function EvChargingTemperatureImpactCalculator({
  className,
}: EvChargingTemperatureImpactCalculatorProps) {
  const definition = getCalculatorDefinition(CALCULATOR_ID);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const handleFieldChange = useCallback(
    (id: string, value: string) => {
      if (id === "vehiclePreset" && isBatteryPreset(value)) {
        setValue("vehiclePreset", value);
        const preset = EV_CHARGING_BATTERY_PRESETS[value];
        if (preset.capacityKwh > 0) {
          setValue("batteryCapacityKwh", String(preset.capacityKwh));
        }
        return;
      }
      if (id === "tempScenario" && isTempScenario(value)) {
        setValue("tempScenario", value);
        setValue("externalTempC", String(EV_CHARGING_TEMP_SCENARIOS[value].tempC));
        return;
      }
      if (id === "externalTempC") {
        setValue("externalTempC", value);
        return;
      }
      setValue(id, value);
    },
    [setValue]
  );

  const parsed = useMemo(() => {
    const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
    const chargerPowerKw = parsePositive(values.chargerPowerKw ?? "");
    const tempRaw = values.externalTempC?.trim() ?? "";
    const externalTempC =
      tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);

    if (
      batteryCapacityKwh === null ||
      chargerPowerKw === null ||
      externalTempC === null ||
      !Number.isFinite(externalTempC)
    ) {
      return null;
    }

    return calculateEvChargingTemperatureImpact({
      batteryCapacityKwh,
      chargerPowerKw,
      externalTempC,
    });
  }, [values]);

  const fieldLabels = useMemo(
    () => Object.fromEntries(definition.fields.map((f) => [f.id, f.label])),
    [definition.fields]
  );

  const totalDetail = parsed
    ? `${parsed.bmsNote} · effective ${formatNumber(parsed.effectiveChargerKw, { maxDecimals: 1 })} kW of ${formatNumber(parsed.chargerPowerKw, { maxDecimals: 0 })} kW`
    : null;

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!parsed) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(
        definition.title,
        buildPdfInputs(values, fieldLabels),
        buildPdfResults({
          "Base charging time (10–80%)": parsed.baseFormatted,
          "Added delay (BMS thermal)": parsed.addedDelayFormatted,
          "Total estimated time": parsed.totalFormatted,
          "External temperature": `${parsed.externalTempC}°C`,
        })
      );
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [definition.title, fieldLabels, parsed, values]);

  return (
    <CalculatorCommandShell className={className}>
      <CalculatorCommandSplit
        inputs={
          <CalculatorInputs
            fields={definition.fields}
            values={values}
            onChange={handleFieldChange}
          />
        }
        results={
          parsed ? (
            <EvGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={definition.result.label}
              value={parsed.totalFormatted}
              detail={totalDetail}
              emptyMessage={definition.result.emptyMessage}
            />
          ) : (
            <EvGamifiedResult
              calculatorId={CALCULATOR_ID}
              label={definition.result.label}
              value={null}
              detail={null}
              emptyMessage={definition.result.emptyMessage}
            />
          )
        }
      />

      {parsed ? (
        <div className={calculatorResultsGrid3}>
              <CalculatorResult
                label="Base charging time"
                value={parsed.baseFormatted}
                detail={`10% → 80% · ${formatNumber(parsed.batteryCapacityKwh, { maxDecimals: 0 })} kWh · ideal ~${parsed.idealTempC}°C`}
                emptyMessage="—"
              />
              <CalculatorResult
                label="Added delay"
                value={parsed.addedDelayFormatted}
                detail={
                  parsed.addedDelayMinutes > 0
                    ? `+${parsed.addedPercentOfBase}% vs. base · ${parsed.preconditionMinutes} min precondition`
                    : "No thermal penalty at this temperature"
                }
                emptyMessage="—"
              />
              <CalculatorResult
                label="Total time"
                value={parsed.totalFormatted}
                detail={`At ${parsed.externalTempC}°C · ${formatNumber(parsed.chargerPowerKw, { maxDecimals: 0 })} kW station`}
                emptyMessage="—"
              />
        </div>
      ) : null}

      <section
          className="rounded-none border border-border/50 bg-muted/20 p-5 sm:p-6"
          aria-labelledby="ev-temp-charge-learn-heading"
        >
          <h2
            id="ev-temp-charge-learn-heading"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <Thermometer className="size-4 text-primary" aria-hidden />
            Thermal management &amp; preconditioning
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your EV&apos;s{" "}
            <strong className="font-medium text-foreground">thermal management system</strong>{" "}
            (battery heater, coolant loop, and fans) works with the BMS to keep cells in a safe
            temperature band. In extreme cold the pack must warm before accepting full DC power; in
            extreme heat it must cool to avoid accelerated aging—both add minutes beyond the
            physics-only charge curve.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">Preconditioning</strong> (scheduled in
            your app or triggered by navigation to a charger) heats or cools the battery while
            still plugged in at home or on the way, so more of your session happens at full kW.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Snowflake className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Cold: added delay includes typical precondition minutes before 10–80% DC</span>
            </li>
            <li className="flex gap-2">
              <Battery className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Hot: BMS may taper effective kW even when the station shows full power</span>
            </li>
            <li className="flex gap-2">
              <Car className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>Real curves vary by OEM—use as trip-planning guidance, not a spec sheet</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href={MAINTENANCE_CALCULATOR.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <Wrench className="size-3.5 shrink-0" aria-hidden />
              {MAINTENANCE_CALCULATOR.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <JoinMyPdfSaveReport
          calculatorTitle={definition.title}
          resultLabel={definition.result.label}
          value={parsed?.totalFormatted ?? null}
          detail={totalDetail}
          values={values}
          fieldLabels={fieldLabels}
          onSaveToPdf={handleSaveToPDF}
          isSaving={pdfLoading}
          saveError={pdfError}
        />

      <ShareButtons title={definition.title} className="pt-1" />
    </CalculatorCommandShell>
  );
}
