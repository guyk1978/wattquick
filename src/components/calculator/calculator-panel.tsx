"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { useCalculatorForm } from "@/hooks/use-calculator-form";
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
import { InverterLoadingCurveCalculator } from "@/components/calculators/InverterLoadingCurveCalculator";
import { CriticalLoadAnalysisCalculator } from "@/components/calculators/CriticalLoadAnalysisCalculator";
import { StandbyPowerAggregatorCalculator } from "@/components/calculators/StandbyPowerAggregatorCalculator";
import { MobilityTcoCalculator } from "@/components/calculators/MobilityTcoCalculator";
import { SolarShadingAnalysisCalculator } from "@/components/calculators/SolarShadingAnalysisCalculator";
import { ElectricityRatePlanCalculator } from "@/components/calculators/ElectricityRatePlanCalculator";
import { SolarDegradation20YearRoiCalculator } from "@/components/calculators/SolarDegradation20YearRoiCalculator";
import { SolarRoiAnalysisCalculator } from "@/components/calculators/SolarRoiAnalysisCalculator";
import { BessRoiCalculator } from "@/components/calculators/BessRoiCalculator";
import { CalculatorIdProvider } from "./calculator-id-context";
import { CalculatorRecentHistorySync } from "./calculator-recent-history-sync";
import {
  CalculatorCommandShell,
  CalculatorCommandSplit,
} from "./calculator-command-layout";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorGuideLink } from "./calculator-guide-link";
import {
  CalculatorResultsDashboard,
  recordToSummaryItems,
} from "./calculator-results-dashboard";
import { getCalculatorStatusAlert } from "@/lib/calculator-status";
import { updateRecentSnapshot } from "@/lib/dashboard-storage";
import { cn } from "@/lib/utils";
import { formatCalculatorResultSnapshot } from "./calculator-recent-history-sync";

const CALCULATOR_FOOTER_NOTES: Partial<Record<CalculatorId, string>> = {
  "battery-charging-time": "Note: Heat loss & taper accounted.",
};

interface CalculatorPanelProps {
  id: CalculatorId;
  className?: string;
  /** Command Center: persist live result text for recent widgets */
  onResultSnapshot?: (snapshot: string | null) => void;
  /**
   * `modal` — Grid-to-Modal workspace: inputs + large result only
   * (no gauges, share strip, or PDF chrome).
   */
  variant?: "default" | "modal";
}

/** Interactive calculator body: inputs + live result. */
export function CalculatorPanel(props: CalculatorPanelProps) {
  return (
    <CalculatorIdProvider id={props.id}>
      <CalculatorRecentHistorySync calculatorId={props.id} />
      <CalculatorPanelInner {...props} />
    </CalculatorIdProvider>
  );
}

function CalculatorPanelInner({
  id,
  className,
  onResultSnapshot,
  variant = "default",
}: CalculatorPanelProps) {
  const isModal = variant === "modal";
  const shellClassName = cn(className, isModal && "calculator-embed-shell--modal");

  if (id === "microgrid-roi") {
    return <MicrogridRoiCalculator className={shellClassName} />;
  }
  if (id === "ev-preconditioning-cost") {
    return <EvPreconditioningCostCalculator className={shellClassName} />;
  }
  if (id === "ev-charging-temperature-impact") {
    return <EvChargingTemperatureImpactCalculator className={shellClassName} />;
  }
  if (id === "ev-battery-depletion-value-loss") {
    return <EvBatteryDepletionValueLossCalculator className={shellClassName} />;
  }
  if (id === "ev-tire-wear-cost") {
    return <EvTireWearCostCalculator className={shellClassName} />;
  }
  if (id === "generator-vs-solar-hybrid") {
    return <GeneratorVsSolarHybridCalculator className={shellClassName} />;
  }
  if (id === "generator-runtime-savings") {
    return <GeneratorRuntimeSavingsCalculator className={shellClassName} />;
  }
  if (id === "solar-degradation-20-year-roi") {
    return <SolarDegradation20YearRoiCalculator className={shellClassName} />;
  }
  if (id === "water-pump-solar-sizing") {
    return <WaterPumpSolarSizingCalculator className={shellClassName} />;
  }
  if (id === "grid-frequency-reward") {
    return <GridFrequencyRewardCalculator className={shellClassName} />;
  }
  if (id === "residential-voltage-drop") {
    return <ResidentialVoltageDropCalculator className={shellClassName} />;
  }
  if (id === "inverter-peak-load-surge") {
    return <InverterPeakLoadSurgeCalculator className={shellClassName} />;
  }
  if (id === "inverter-loading-curve") {
    return <InverterLoadingCurveCalculator className={shellClassName} />;
  }
  if (id === "critical-load-analysis") {
    return <CriticalLoadAnalysisCalculator className={shellClassName} />;
  }
  if (id === "standby-power-aggregator") {
    return <StandbyPowerAggregatorCalculator className={shellClassName} />;
  }
  if (id === "mobility-tco-calculator") {
    return <MobilityTcoCalculator className={shellClassName} />;
  }
  if (id === "solar-shading-analysis") {
    return <SolarShadingAnalysisCalculator className={shellClassName} />;
  }
  if (id === "solar-roi-analysis") {
    return <SolarRoiAnalysisCalculator className={shellClassName} />;
  }
  if (id === "dc-cable-voltage-drop") {
    return <DcCableVoltageDropCalculator className={shellClassName} />;
  }
  if (id === "bess-carbon-cost") {
    return <BessCarbonCostCalculator className={shellClassName} />;
  }
  if (id === "bess-roi") {
    return <BessRoiCalculator className={shellClassName} />;
  }
  if (id === "lighting-circuit-load") {
    return <LightingCircuitLoadCalculator className={shellClassName} />;
  }
  if (id === "solar-water-heater-efficiency") {
    return <SolarWaterHeaterEfficiencyCalculator className={shellClassName} />;
  }
  if (id === "peak-shaving-potential") {
    return <PeakShavingPotentialCalculator className={shellClassName} />;
  }
  if (id === "electricity-rate-plan") {
    return <ElectricityRatePlanCalculator className={shellClassName} />;
  }
  if (id === "ev-charging-cable-loss") {
    return <EvChargingCableLossCalculator className={shellClassName} />;
  }
  if (id === "battery-calendar-aging") {
    return <BatteryCalendarAgingCalculator className={shellClassName} />;
  }
  if (id === "small-wind-turbine-yield") {
    return <SmallWindTurbineYieldCalculator className={shellClassName} />;
  }
  if (id === "ac-inrush-current") {
    return <AcInrushCurrentCalculator className={shellClassName} />;
  }
  if (id === "vampire-power-cost") {
    return <VampirePowerCostCalculator className={shellClassName} />;
  }
  if (id === "led-savings-roi") {
    return <LedSavingsRoiCalculator className={shellClassName} />;
  }
  if (id === "home-insulation-savings") {
    return <HomeInsulationSavingsCalculator className={shellClassName} />;
  }
  if (id === "ac-inverter-savings") {
    return <AcInverterSavingsCalculator className={shellClassName} />;
  }
  if (id === "pool-energy-thermal-cover") {
    return <PoolEnergyThermalCoverCalculator className={shellClassName} />;
  }
  if (id === "ev-vs-ice-maintenance") {
    return <EvVsIceMaintenanceCalculator className={shellClassName} />;
  }
  if (id === "ebike-range-estimator") {
    return <EbikeRangeEstimatorCalculator className={shellClassName} />;
  }
  if (id === "ebike-voltage-sag") {
    return <EbikeVoltageSagCalculator className={shellClassName} />;
  }
  if (id === "ebike-battery-cycle-life") {
    return <EbikeBatteryCycleLifeCalculator className={shellClassName} />;
  }
  if ((ESCOOTER_CALCULATOR_IDS as readonly string[]).includes(id)) {
    return <EscooterCalculatorShell id={id} className={shellClassName} />;
  }

  const definition = getCalculatorDefinition(id);
  const { values, setValue } = useCalculatorForm(definition.fields);

  const result = useMemo(
    () => definition.compute(values),
    [definition, values]
  );

  useEffect(() => {
    const snapshot = formatCalculatorResultSnapshot(result.value, result.unit);
    updateRecentSnapshot(id, snapshot);
    onResultSnapshot?.(snapshot);
  }, [id, onResultSnapshot, result.unit, result.value]);

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

  const usesGamified =
    !isModal &&
    (usesBatteryDashboard(definition.category, id) ||
      usesCostDashboard(definition.category, id) ||
      usesEvDashboard(definition.category, id));

  const gamifiedHero = usesGamified ? (
    <>
      {usesBatteryDashboard(definition.category, id) ? (
        <BatteryGamifiedResult
          calculatorId={id}
          label=""
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      ) : usesCostDashboard(definition.category, id) ? (
        <CostGamifiedResult
          calculatorId={id}
          label=""
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      ) : (
        <EvGamifiedResult
          calculatorId={id}
          label=""
          value={result.value}
          unit={result.unit}
          detail={result.detail}
          emptyMessage={definition.result.emptyMessage}
        />
      )}
    </>
  ) : undefined;

  const statusAlert = getCalculatorStatusAlert(
    id,
    values,
    definition.fields,
    result.value !== null
  );

  return (
    <CalculatorCommandShell className={shellClassName}>
      <CalculatorCommandSplit
        scrollable={isModal}
        inputs={
          <CalculatorInputs
            fields={definition.fields}
            values={values}
            onChange={setValue}
          />
        }
        results={
          <CalculatorResultsDashboard
            label={definition.result.label}
            value={result.value}
            unit={result.unit}
            detail={result.detail}
            emptyMessage={definition.result.emptyMessage}
            summaryItems={
              result.snapshotResults
                ? recordToSummaryItems(result.snapshotResults)
                : undefined
            }
            hero={gamifiedHero}
            statusAlert={isModal ? null : statusAlert}
            values={values}
            className={isModal ? "calculator-results-dashboard--modal" : undefined}
          />
        }
      />

      {isModal ? null : (
        <>
          <JoinMyPdfSaveReport
            calculatorTitle={definition.title}
            calculatorSlug={id}
            resultLabel={definition.result.label}
            value={result.value}
            unit={result.unit}
            detail={result.detail}
            values={values}
            fieldLabels={fieldLabels}
            projectResults={result.snapshotResults}
            onSaveToPdf={handleSaveToPDF}
            isSaving={pdfLoading}
            saveError={pdfError}
          />

          <CalculatorGuideLink calculatorId={id} className="mt-2" />

          <div className="calculator-command__footer flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {footerNote ? (
              <p className="text-xs leading-relaxed text-muted-foreground">{footerNote}</p>
            ) : (
              <span className="hidden sm:block" aria-hidden />
            )}
            <ShareButtons title={definition.title} className="sm:ml-auto" />
          </div>
        </>
      )}
    </CalculatorCommandShell>
  );
}
