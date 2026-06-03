"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { useCallback, useMemo, useState } from "react";
import { buildPdfInputs, buildPdfResults, generatePDFReport } from "@/lib/pdf-utils";
import { JoinMyPdfSaveReport } from "@/components/JoinMyPdfSaveReport";
import { ShareButtons } from "@/components/ShareButtons";
import { usesBatteryDashboard } from "@/lib/battery-dashboard";
import { usesCostDashboard } from "@/lib/cost-dashboard";
import { usesEvDashboard } from "@/lib/ev-dashboard";
import { BatteryGamifiedResult } from "./battery-gamified-result";
import { CostGamifiedResult } from "./cost-gamified-result";
import { EvGamifiedResult } from "./ev-gamified-result";
import { EvPreconditioningCostCalculator } from "@/components/calculators/EvPreconditioningCostCalculator";
import { EvTireWearCostCalculator } from "@/components/calculators/EvTireWearCostCalculator";
import { GeneratorVsSolarHybridCalculator } from "@/components/calculators/GeneratorVsSolarHybridCalculator";
import { GeneratorRuntimeSavingsCalculator } from "@/components/calculators/GeneratorRuntimeSavingsCalculator";
import { WaterPumpSolarSizingCalculator } from "@/components/calculators/WaterPumpSolarSizingCalculator";
import { GridFrequencyRewardCalculator } from "@/components/calculators/GridFrequencyRewardCalculator";
import { ResidentialVoltageDropCalculator } from "@/components/calculators/ResidentialVoltageDropCalculator";
import { BessCarbonCostCalculator } from "@/components/calculators/BessCarbonCostCalculator";
import { LightingCircuitLoadCalculator } from "@/components/calculators/LightingCircuitLoadCalculator";
import { MicrogridRoiCalculator } from "@/components/calculators/MicrogridRoiCalculator";
import { SolarWaterHeaterEfficiencyCalculator } from "@/components/calculators/SolarWaterHeaterEfficiencyCalculator";
import { PeakShavingPotentialCalculator } from "@/components/calculators/PeakShavingPotentialCalculator";
import { EvChargingCableLossCalculator } from "@/components/calculators/EvChargingCableLossCalculator";
import { BatteryCalendarAgingCalculator } from "@/components/calculators/BatteryCalendarAgingCalculator";
import { SmallWindTurbineYieldCalculator } from "@/components/calculators/SmallWindTurbineYieldCalculator";
import { AcInrushCurrentCalculator } from "@/components/calculators/AcInrushCurrentCalculator";
import { VampirePowerCostCalculator } from "@/components/calculators/VampirePowerCostCalculator";
import { LedSavingsRoiCalculator } from "@/components/calculators/LedSavingsRoiCalculator";
import { HomeInsulationSavingsCalculator } from "@/components/calculators/HomeInsulationSavingsCalculator";
import { PoolEnergyThermalCoverCalculator } from "@/components/calculators/PoolEnergyThermalCoverCalculator";
import { AcInverterSavingsCalculator } from "@/components/calculators/AcInverterSavingsCalculator";
import { EvVsIceMaintenanceCalculator } from "@/components/calculators/EvVsIceMaintenanceCalculator";
import { EvChargingTemperatureImpactCalculator } from "@/components/calculators/EvChargingTemperatureImpactCalculator";
import { EvBatteryDepletionValueLossCalculator } from "@/components/calculators/EvBatteryDepletionValueLossCalculator";
import { DcCableVoltageDropCalculator } from "@/components/calculators/DcCableVoltageDropCalculator";
import { InverterPeakLoadSurgeCalculator } from "@/components/calculators/InverterPeakLoadSurgeCalculator";
import { ElectricityRatePlanCalculator } from "@/components/calculators/ElectricityRatePlanCalculator";
import { SolarDegradation20YearRoiCalculator } from "@/components/calculators/SolarDegradation20YearRoiCalculator";
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
  if (id === "microgrid-roi") {
    return <MicrogridRoiCalculator className={className} />;
  }
  if (id === "ev-preconditioning-cost") {
    return <EvPreconditioningCostCalculator className={className} />;
  }
  if (id === "ev-charging-temperature-impact") {
    return <EvChargingTemperatureImpactCalculator className={className} />;
  }
  if (id === "ev-battery-depletion-value-loss") {
    return <EvBatteryDepletionValueLossCalculator className={className} />;
  }
  if (id === "ev-tire-wear-cost") {
    return <EvTireWearCostCalculator className={className} />;
  }
  if (id === "generator-vs-solar-hybrid") {
    return <GeneratorVsSolarHybridCalculator className={className} />;
  }
  if (id === "generator-runtime-savings") {
    return <GeneratorRuntimeSavingsCalculator className={className} />;
  }
  if (id === "solar-degradation-20-year-roi") {
    return <SolarDegradation20YearRoiCalculator className={className} />;
  }
  if (id === "water-pump-solar-sizing") {
    return <WaterPumpSolarSizingCalculator className={className} />;
  }
  if (id === "grid-frequency-reward") {
    return <GridFrequencyRewardCalculator className={className} />;
  }
  if (id === "residential-voltage-drop") {
    return <ResidentialVoltageDropCalculator className={className} />;
  }
  if (id === "inverter-peak-load-surge") {
    return <InverterPeakLoadSurgeCalculator className={className} />;
  }
  if (id === "dc-cable-voltage-drop") {
    return <DcCableVoltageDropCalculator className={className} />;
  }
  if (id === "bess-carbon-cost") {
    return <BessCarbonCostCalculator className={className} />;
  }
  if (id === "lighting-circuit-load") {
    return <LightingCircuitLoadCalculator className={className} />;
  }
  if (id === "solar-water-heater-efficiency") {
    return <SolarWaterHeaterEfficiencyCalculator className={className} />;
  }
  if (id === "peak-shaving-potential") {
    return <PeakShavingPotentialCalculator className={className} />;
  }
  if (id === "electricity-rate-plan") {
    return <ElectricityRatePlanCalculator className={className} />;
  }
  if (id === "ev-charging-cable-loss") {
    return <EvChargingCableLossCalculator className={className} />;
  }
  if (id === "battery-calendar-aging") {
    return <BatteryCalendarAgingCalculator className={className} />;
  }
  if (id === "small-wind-turbine-yield") {
    return <SmallWindTurbineYieldCalculator className={className} />;
  }
  if (id === "ac-inrush-current") {
    return <AcInrushCurrentCalculator className={className} />;
  }
  if (id === "vampire-power-cost") {
    return <VampirePowerCostCalculator className={className} />;
  }
  if (id === "led-savings-roi") {
    return <LedSavingsRoiCalculator className={className} />;
  }
  if (id === "home-insulation-savings") {
    return <HomeInsulationSavingsCalculator className={className} />;
  }
  if (id === "ac-inverter-savings") {
    return <AcInverterSavingsCalculator className={className} />;
  }
  if (id === "pool-energy-thermal-cover") {
    return <PoolEnergyThermalCoverCalculator className={className} />;
  }
  if (id === "ev-vs-ice-maintenance") {
    return <EvVsIceMaintenanceCalculator className={className} />;
  }

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

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleSaveToPDF = useCallback(async () => {
    if (!result.value) return;

    setPdfLoading(true);
    setPdfError(null);
    try {
      await generatePDFReport(definition.title, buildPdfInputs(values, fieldLabels), buildPdfResults({
          [definition.result.label]: { value: result.value, unit: result.unit },
          ...(result.detail ? { Notes: result.detail } : {}),
        }));
    } catch {
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }, [
    definition.result.label,
    definition.title,
    fieldLabels,
    result.detail,
    result.unit,
    result.value,
    values,
  ]);

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
        onSaveToPdf={handleSaveToPDF}
        isSaving={pdfLoading}
        saveError={pdfError}
      />

      <ShareButtons title={definition.title} className="pt-1" />
      </div>
    </div>
  );
}
