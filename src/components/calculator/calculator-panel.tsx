"use client";

import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { EbikeRangeEstimatorCalculator } from "@/components/calculators/EbikeRangeEstimatorCalculator";
import { EscooterCalculatorShell } from "@/components/calculators/EscooterCalculatorShell";
import { ESCOOTER_CALCULATOR_IDS } from "@/lib/calculators/escooter";
import { EbikeVoltageSagCalculator } from "@/components/calculators/EbikeVoltageSagCalculator";
import { EbikeBatteryCycleLifeCalculator } from "@/components/calculators/EbikeBatteryCycleLifeCalculator";
import { EvChargingTemperatureImpactCalculator } from "@/components/calculators/EvChargingTemperatureImpactCalculator";
import { EvBatteryDepletionValueLossCalculator } from "@/components/calculators/EvBatteryDepletionValueLossCalculator";
import { DcCableVoltageDropCalculator } from "@/components/calculators/DcCableVoltageDropCalculator";
import { InverterPeakLoadSurgeCalculator } from "@/components/calculators/InverterPeakLoadSurgeCalculator";
import { CriticalLoadAnalysisCalculator } from "@/components/calculators/CriticalLoadAnalysisCalculator";
import { StandbyPowerAggregatorCalculator } from "@/components/calculators/StandbyPowerAggregatorCalculator";
import { MobilityTcoCalculator } from "@/components/calculators/MobilityTcoCalculator";
import { SolarShadingAnalysisCalculator } from "@/components/calculators/SolarShadingAnalysisCalculator";
import { ElectricityRatePlanCalculator } from "@/components/calculators/ElectricityRatePlanCalculator";
import { SolarDegradation20YearRoiCalculator } from "@/components/calculators/SolarDegradation20YearRoiCalculator";
import { SolarRoiAnalysisCalculator } from "@/components/calculators/SolarRoiAnalysisCalculator";
import { BessRoiCalculator } from "@/components/calculators/BessRoiCalculator";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "./calculator-command-layout";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";
import { cn } from "@/lib/utils";

const CALCULATOR_FOOTER_NOTES: Partial<Record<CalculatorId, string>> = {
  "battery-charging-time": "Note: Heat loss & taper accounted.",
};

interface CalculatorPanelProps {
  id: CalculatorId;
  className?: string;
  /** Command Center: persist live result text for recent widgets */
  onResultSnapshot?: (snapshot: string | null) => void;
}

/** Interactive calculator body: inputs + live result. */
export function CalculatorPanel({
  id,
  className,
  onResultSnapshot,
}: CalculatorPanelProps) {
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
  if (id === "critical-load-analysis") {
    return <CriticalLoadAnalysisCalculator className={className} />;
  }
  if (id === "standby-power-aggregator") {
    return <StandbyPowerAggregatorCalculator className={className} />;
  }
  if (id === "mobility-tco-calculator") {
    return <MobilityTcoCalculator className={className} />;
  }
  if (id === "solar-shading-analysis") {
    return <SolarShadingAnalysisCalculator className={className} />;
  }
  if (id === "solar-roi-analysis") {
    return <SolarRoiAnalysisCalculator className={className} />;
  }
  if (id === "dc-cable-voltage-drop") {
    return <DcCableVoltageDropCalculator className={className} />;
  }
  if (id === "bess-carbon-cost") {
    return <BessCarbonCostCalculator className={className} />;
  }
  if (id === "bess-roi") {
    return <BessRoiCalculator className={className} />;
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
  if (id === "ebike-range-estimator") {
    return <EbikeRangeEstimatorCalculator className={className} />;
  }
  if (id === "ebike-voltage-sag") {
    return <EbikeVoltageSagCalculator className={className} />;
  }
  if (id === "ebike-battery-cycle-life") {
    return <EbikeBatteryCycleLifeCalculator className={className} />;
  }
  if ((ESCOOTER_CALCULATOR_IDS as readonly string[]).includes(id)) {
    return <EscooterCalculatorShell id={id} className={className} />;
  }

  const definition = getCalculatorDefinition(id);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => definition.compute(values),
    [definition, values]
  );

  useEffect(() => {
    if (!onResultSnapshot) return;
    const snapshot = result.value
      ? `${result.value}${result.unit ? ` ${result.unit}` : ""}`.trim()
      : null;
    onResultSnapshot(snapshot);
  }, [onResultSnapshot, result.unit, result.value]);

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

  const footerNote = CALCULATOR_FOOTER_NOTES[id];

  const resultBlock =
    usesBatteryDashboard(definition.category, id) ? (
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
        results={resultBlock}
      />

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

      <div className="calculator-command__footer flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {footerNote ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{footerNote}</p>
        ) : (
          <span className="hidden sm:block" aria-hidden />
        )}
        <ShareButtons title={definition.title} className="sm:ml-auto" />
      </div>
    </CalculatorCommandShell>
  );
}
