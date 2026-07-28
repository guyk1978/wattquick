"use client";

import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { AcInrushCurrentViz } from "@/components/calculator/viz/ac-inrush-current-viz";
import { AhToWhViz } from "@/components/calculator/viz/ah-to-wh-viz";
import { AmpsToWattsViz } from "@/components/calculator/viz/amps-to-watts-viz";
import { AcEnergyCostViz } from "@/components/calculator/viz/ac-energy-cost-viz";
import { FridgeEnergyUsageViz } from "@/components/calculator/viz/fridge-energy-usage-viz";
import { CryptoMiningPowerViz } from "@/components/calculator/viz/crypto-mining-power-viz";
import { VampirePowerCostViz } from "@/components/calculator/viz/vampire-power-cost-viz";
import { SmartThermostatSavingsViz } from "@/components/calculator/viz/smart-thermostat-savings-viz";
import { WindowSolarHeatGainViz } from "@/components/calculator/viz/window-solar-heat-gain-viz";
import { MicrogridRoiViz } from "@/components/calculator/viz/microgrid-roi-viz";
import { BatteryCalendarAgingViz } from "@/components/calculator/viz/battery-calendar-aging-viz";
import { BatteryVoltageDropViz } from "@/components/calculator/viz/battery-voltage-drop-viz";
import { BessRoiViz } from "@/components/calculator/viz/bess-roi-viz";
import { BessCarbonCostViz } from "@/components/calculator/viz/bess-carbon-cost-viz";
import { CarbonFootprintOffsetViz } from "@/components/calculator/viz/carbon-footprint-offset-viz";
import { GeneratorRuntimeSavingsViz } from "@/components/calculator/viz/generator-runtime-savings-viz";
import { GeneratorVsSolarHybridViz } from "@/components/calculator/viz/generator-vs-solar-hybrid-viz";
import { WaterPumpSolarSizingViz } from "@/components/calculator/viz/water-pump-solar-sizing-viz";
import { GridFrequencyRewardViz } from "@/components/calculator/viz/grid-frequency-reward-viz";
import { MobilityTcoCalculatorViz } from "@/components/calculator/viz/mobility-tco-calculator-viz";
import { PeakShavingPotentialViz } from "@/components/calculator/viz/peak-shaving-potential-viz";
import { ElectricityRatePlanViz } from "@/components/calculator/viz/electricity-rate-plan-viz";
import { ReactivePowerCalculatorViz } from "@/components/calculator/viz/reactive-power-calculator-viz";
import { ApplianceDailyCostViz } from "@/components/calculator/viz/appliance-daily-cost-viz";
import { ApplianceMonthlyEnergyViz } from "@/components/calculator/viz/appliance-monthly-energy-viz";
import { TwelveVTo120VInverterViz } from "@/components/calculator/viz/12v-to-120v-inverter-viz";
import { BatteryArbitrageRoiViz } from "@/components/calculator/viz/battery-arbitrage-roi-viz";
import { BatteryBankSizeViz } from "@/components/calculator/viz/battery-bank-size-viz";
import { BatteryChargingTimeViz } from "@/components/calculator/viz/battery-charging-time-viz";
import { BatteryCostViz } from "@/components/calculator/viz/battery-cost-viz";
import { BatteryCRateViz } from "@/components/calculator/viz/battery-c-rate-viz";
import { BatteryDepthOfDischargeViz } from "@/components/calculator/viz/battery-depth-of-discharge-viz";
import { BatteryDodEnergyYieldViz } from "@/components/calculator/viz/battery-dod-energy-yield-viz";
import { BatteryEfficiencyViz } from "@/components/calculator/viz/battery-efficiency-viz";
import { BatteryEnergyViz } from "@/components/calculator/viz/battery-energy-viz";
import { BatteryPercentageViz } from "@/components/calculator/viz/battery-percentage-viz";
import { BatteryRuntimeViz } from "@/components/calculator/viz/battery-runtime-viz";
import { BatterySeriesParallelViz } from "@/components/calculator/viz/battery-series-parallel-viz";
import { CampingFridgeRuntimeViz } from "@/components/calculator/viz/camping-fridge-runtime-viz";
import { ConductorResistanceTemperatureViz } from "@/components/calculator/viz/conductor-resistance-temperature-viz";
import { CriticalLoadAnalysisViz } from "@/components/calculator/viz/critical-load-analysis-viz";
import { DcCableSizeViz } from "@/components/calculator/viz/dc-cable-size-viz";
import { DcCableVoltageDropViz } from "@/components/calculator/viz/dc-cable-voltage-drop-viz";
import { DemandChargeCalculatorViz } from "@/components/calculator/viz/demand-charge-calculator-viz";
import { EbikeBatteryCRateViz } from "@/components/calculator/viz/ebike-battery-c-rate-viz";
import { EbikeBatteryCycleLifeViz } from "@/components/calculator/viz/ebike-battery-cycle-life-viz";
import { EbikeChargeTimeViz } from "@/components/calculator/viz/ebike-charge-time-viz";
import { EbikeChargingCostViz } from "@/components/calculator/viz/ebike-charging-cost-viz";
import { EbikeCommuteSavingsViz } from "@/components/calculator/viz/ebike-commute-savings-viz";
import { EbikeControllerWattsViz } from "@/components/calculator/viz/ebike-controller-watts-viz";
import { EbikeMaxSpeedViz } from "@/components/calculator/viz/ebike-max-speed-viz";
import { EbikeRangeViz } from "@/components/calculator/viz/ebike-range-viz";
import { EbikeVoltageSagViz } from "@/components/calculator/viz/ebike-voltage-sag-viz";
import { EbikeWeightPerformanceViz } from "@/components/calculator/viz/ebike-weight-performance-viz";
import { ElectricityBillViz } from "@/components/calculator/viz/electricity-bill-viz";
import { EnergyConsumptionViz } from "@/components/calculator/viz/energy-consumption-viz";
import { EscooterHillClimbViz } from "@/components/calculator/viz/escooter-hill-climb-viz";
import { EscooterMaxSpeedViz } from "@/components/calculator/viz/escooter-max-speed-viz";
import { EscooterPeakAmpsViz } from "@/components/calculator/viz/escooter-peak-amps-viz";
import { EscooterBrakePadWearViz } from "@/components/calculator/viz/escooter-brake-pad-wear-viz";
import { EscooterConnectorLossViz } from "@/components/calculator/viz/escooter-connector-loss-viz";
import { EscooterMaintenanceScheduleViz } from "@/components/calculator/viz/escooter-maintenance-schedule-viz";
import { StandbyPowerWasteViz } from "@/components/calculator/viz/standby-power-waste-viz";
import { GeneratorFuelConsumptionViz } from "@/components/calculator/viz/generator-fuel-consumption-viz";
import { HeatPumpVsResistanceViz } from "@/components/calculator/viz/heat-pump-vs-resistance-viz";
import { WholeHouseEnergyBudgetViz } from "@/components/calculator/viz/whole-house-energy-budget-viz";
import { LightingCircuitLoadViz } from "@/components/calculator/viz/lighting-circuit-load-viz";
import { AcInverterSavingsViz } from "@/components/calculator/viz/ac-inverter-savings-viz";
import { SolarWaterHeaterEfficiencyViz } from "@/components/calculator/viz/solar-water-heater-efficiency-viz";
import { SmallWindTurbineYieldViz } from "@/components/calculator/viz/small-wind-turbine-yield-viz";
import { StandbyPowerAggregatorViz } from "@/components/calculator/viz/standby-power-aggregator-viz";
import { EscooterRangeViz } from "@/components/calculator/viz/escooter-range-viz";
import { EscooterTirePressureViz } from "@/components/calculator/viz/escooter-tire-pressure-viz";
import { EscooterTireWearViz } from "@/components/calculator/viz/escooter-tire-wear-viz";
import { EscooterChargeTimeViz } from "@/components/calculator/viz/escooter-charge-time-viz";
import { EscooterCostPerKmViz } from "@/components/calculator/viz/escooter-cost-per-km-viz";
import { EscooterWeightLimitViz } from "@/components/calculator/viz/escooter-weight-limit-viz";
import { EvBatteryDegradationViz } from "@/components/calculator/viz/ev-battery-degradation-viz";
import { EvBatteryDepletionValueLossViz } from "@/components/calculator/viz/ev-battery-depletion-value-loss-viz";
import { EvBatteryRangeViz } from "@/components/calculator/viz/ev-battery-range-viz";
import { EvChargeTimeViz } from "@/components/calculator/viz/ev-charge-time-viz";
import { EvChargingCableLossViz } from "@/components/calculator/viz/ev-charging-cable-loss-viz";
import { EvChargingCostViz } from "@/components/calculator/viz/ev-charging-cost-viz";
import { EvPreconditioningCostViz } from "@/components/calculator/viz/ev-preconditioning-cost-viz";
import { EvPublicChargingCostViz } from "@/components/calculator/viz/ev-public-charging-cost-viz";
import { EvSocCalculatorViz } from "@/components/calculator/viz/ev-soc-calculator-viz";
import { EvTireWearCostViz } from "@/components/calculator/viz/ev-tire-wear-cost-viz";
import { EvCostPerMileViz } from "@/components/calculator/viz/ev-cost-per-mile-viz";
import { EvChargingTemperatureImpactViz } from "@/components/calculator/viz/ev-charging-temperature-impact-viz";
import { EvFastChargingTimeViz } from "@/components/calculator/viz/ev-fast-charging-time-viz";
import { EvBusBatteryViz } from "@/components/calculator/viz/ev-bus-battery-viz";
import { EvDeliveryVanEfficiencyViz } from "@/components/calculator/viz/ev-delivery-van-efficiency-viz";
import { EvFleetTcoViz } from "@/components/calculator/viz/ev-fleet-tco-viz";
import { EvForkliftRuntimeViz } from "@/components/calculator/viz/ev-forklift-runtime-viz";
import { EvLevel1VsLevel2Viz } from "@/components/calculator/viz/ev-level1-vs-level2-viz";
import { EvTruckRangeViz } from "@/components/calculator/viz/ev-truck-range-viz";
import { EvVsGasSavingsViz } from "@/components/calculator/viz/ev-vs-gas-savings-viz";
import { EvVsIceMaintenanceViz } from "@/components/calculator/viz/ev-vs-ice-maintenance-viz";
import { EvWinterRangeLossViz } from "@/components/calculator/viz/ev-winter-range-loss-viz";
import { HeaterCostViz } from "@/components/calculator/viz/heater-cost-viz";
import { HeatLossInsulationViz } from "@/components/calculator/viz/heat-loss-insulation-viz";
import { HomeBackupSizingViz } from "@/components/calculator/viz/home-backup-sizing-viz";
import { HomeInsulationSavingsViz } from "@/components/calculator/viz/home-insulation-savings-viz";
import { InverterLoadingCurveViz } from "@/components/calculator/viz/inverter-loading-curve-viz";
import { InverterLossCalculatorViz } from "@/components/calculator/viz/inverter-loss-calculator-viz";
import { InverterPeakLoadSurgeViz } from "@/components/calculator/viz/inverter-peak-load-surge-viz";
import { InverterSizingViz } from "@/components/calculator/viz/inverter-sizing-viz";
import { KvaToKwViz } from "@/components/calculator/viz/kva-to-kw-viz";
import { KwToHpViz } from "@/components/calculator/viz/kw-to-hp-viz";
import { LedSavingsRoiViz } from "@/components/calculator/viz/led-savings-roi-viz";
import { LedVsIncandescentRoiViz } from "@/components/calculator/viz/led-vs-incandescent-roi-viz";
import { TouShiftingSavingsViz } from "@/components/calculator/viz/tou-shifting-savings-viz";
import { MarineBatteryBankViz } from "@/components/calculator/viz/marine-battery-bank-viz";
import { OhmsLawViz } from "@/components/calculator/viz/ohms-law-viz";
import { PoolEnergyThermalCoverViz } from "@/components/calculator/viz/pool-energy-thermal-cover-viz";
import { PortablePowerStationRechargeViz } from "@/components/calculator/viz/portable-power-station-recharge-viz";
import { ResidentialVoltageDropViz } from "@/components/calculator/viz/residential-voltage-drop-viz";
import { RvSolarCalculatorViz } from "@/components/calculator/viz/rv-solar-calculator-viz";
import { SolarAngleOptimizerViz } from "@/components/calculator/viz/solar-angle-optimizer-viz";
import { SolarArrayCurrentViz } from "@/components/calculator/viz/solar-array-current-viz";
import { SolarBatteryBankViz } from "@/components/calculator/viz/solar-battery-bank-viz";
import { SolarChargeControllerSizeViz } from "@/components/calculator/viz/solar-charge-controller-size-viz";
import { SolarDailyYieldViz } from "@/components/calculator/viz/solar-daily-yield-viz";
import { SolarDegradation20YearRoiViz } from "@/components/calculator/viz/solar-degradation-20-year-roi-viz";
import { SolarDegradationViz } from "@/components/calculator/viz/solar-degradation-viz";
import { SolarRoiAnalysisViz } from "@/components/calculator/viz/solar-roi-analysis-viz";
import { SolarShadingAnalysisViz } from "@/components/calculator/viz/solar-shading-analysis-viz";
import { SolarInverterEfficiencyViz } from "@/components/calculator/viz/solar-inverter-efficiency-viz";
import { SolarNetMeteringViz } from "@/components/calculator/viz/solar-net-metering-viz";
import { SolarPaybackRoiViz } from "@/components/calculator/viz/solar-payback-roi-viz";
import { SolarPanelSizeViz } from "@/components/calculator/viz/solar-panel-size-viz";
import { SolarPanelTiltViz } from "@/components/calculator/viz/solar-panel-tilt-viz";
import { SolarRoofSpaceViz } from "@/components/calculator/viz/solar-roof-space-viz";
import { UpsRuntimeViz } from "@/components/calculator/viz/ups-runtime-viz";
import { V2gFinancialReturnViz } from "@/components/calculator/viz/v2g-financial-return-viz";
import { VoltsToWattsViz } from "@/components/calculator/viz/volts-to-watts-viz";
import { PowerFactorViz } from "@/components/calculator/viz/power-factor-viz";
import { WattsToAmpsViz } from "@/components/calculator/viz/watts-to-amps-viz";
import { WattsToVoltsViz } from "@/components/calculator/viz/watts-to-volts-viz";
import { WhToAhViz } from "@/components/calculator/viz/wh-to-ah-viz";
import { hasCalculatorViz } from "@/lib/calculator-viz-ids";

export interface CalculatorVizConfig {
  calculatorTitle: string;
  Viz: ComponentType<{ className?: string }>;
}

/**
 * Calculators that expose a [VIZ] animated schematic tab in the tool workspace.
 * Grow this map as more Industrial Matte viz views ship.
 */
export const CALCULATOR_VIZ: Partial<Record<CalculatorId, CalculatorVizConfig>> =
  {
    "critical-load-analysis": {
      calculatorTitle: "Critical Load Analysis",
      Viz: CriticalLoadAnalysisViz,
    },
    "ups-runtime": {
      calculatorTitle: "UPS Runtime",
      Viz: UpsRuntimeViz,
    },
    "ebike-range-estimator": {
      calculatorTitle: "E-Bike Range Estimator",
      Viz: EbikeRangeViz,
    },
    "ebike-charging-cost": {
      calculatorTitle: "E-Bike Full Charge Cost Calculator",
      Viz: EbikeChargingCostViz,
    },
    "ebike-max-speed": {
      calculatorTitle: "E-Bike Max Speed Calculator",
      Viz: EbikeMaxSpeedViz,
    },
    "ebike-charge-time": {
      calculatorTitle: "E-Bike Charge Time Calculator",
      Viz: EbikeChargeTimeViz,
    },
    "battery-percentage": {
      calculatorTitle: "Battery Percentage",
      Viz: BatteryPercentageViz,
    },
    "battery-runtime": {
      calculatorTitle: "Battery Runtime",
      Viz: BatteryRuntimeViz,
    },
    "battery-charging-time": {
      calculatorTitle: "Battery Charging Time",
      Viz: BatteryChargingTimeViz,
    },
    "battery-energy": {
      calculatorTitle: "Battery Energy Calculator",
      Viz: BatteryEnergyViz,
    },
    "battery-bank-size": {
      calculatorTitle: "Battery Bank Size (Ah)",
      Viz: BatteryBankSizeViz,
    },
    "inverter-sizing": {
      calculatorTitle: "Inverter Sizing",
      Viz: InverterSizingViz,
    },
    "inverter-loss-calculator": {
      calculatorTitle: "Inverter Loss Calculator",
      Viz: InverterLossCalculatorViz,
    },
    "inverter-peak-load-surge": {
      calculatorTitle: "Inverter Peak Load & Surge Calculator",
      Viz: InverterPeakLoadSurgeViz,
    },
    "inverter-loading-curve": {
      calculatorTitle: "Inverter Loading Curve",
      Viz: InverterLoadingCurveViz,
    },
    "home-backup-sizing": {
      calculatorTitle: "Home Backup Battery Sizing Calculator",
      Viz: HomeBackupSizingViz,
    },
    "battery-voltage-drop": {
      calculatorTitle: "Battery Voltage Drop Calculator",
      Viz: BatteryVoltageDropViz,
    },
    "battery-calendar-aging": {
      calculatorTitle: "Battery Calendar Aging Calculator",
      Viz: BatteryCalendarAgingViz,
    },
    "bess-roi": {
      calculatorTitle: "BESS ROI Calculator (Battery Energy Storage System)",
      Viz: BessRoiViz,
    },
    "dc-cable-size": {
      calculatorTitle: "DC Cable Size Calculator",
      Viz: DcCableSizeViz,
    },
    "watts-to-amps": {
      calculatorTitle: "Watts to Amps",
      Viz: WattsToAmpsViz,
    },
    "amps-to-watts": {
      calculatorTitle: "Amps to Watts",
      Viz: AmpsToWattsViz,
    },
    "residential-voltage-drop": {
      calculatorTitle: "Residential AC Voltage Drop Calculator",
      Viz: ResidentialVoltageDropViz,
    },
    "ohms-law": {
      calculatorTitle: "Ohm's Law Calculator",
      Viz: OhmsLawViz,
    },
    "solar-panel-size": {
      calculatorTitle: "Solar Panel Size",
      Viz: SolarPanelSizeViz,
    },
    "solar-battery-bank": {
      calculatorTitle: "Solar Battery Bank Size",
      Viz: SolarBatteryBankViz,
    },
    "solar-charge-controller-size": {
      calculatorTitle: "Solar Charge Controller Size Calculator",
      Viz: SolarChargeControllerSizeViz,
    },
    "solar-daily-yield": {
      calculatorTitle: "Solar Daily Yield",
      Viz: SolarDailyYieldViz,
    },
    "ev-charging-cost": {
      calculatorTitle: "EV Charging Cost",
      Viz: EvChargingCostViz,
    },
    "ev-charge-time": {
      calculatorTitle: "EV Charge Time",
      Viz: EvChargeTimeViz,
    },
    "ev-cost-per-mile": {
      calculatorTitle: "EV Cost Per Mile Calculator",
      Viz: EvCostPerMileViz,
    },
    "ev-battery-range": {
      calculatorTitle: "EV Battery Range Calculator",
      Viz: EvBatteryRangeViz,
    },
    "ev-level1-vs-level2": {
      calculatorTitle: "Level 1 vs Level 2 EV Charging Time",
      Viz: EvLevel1VsLevel2Viz,
    },
    "ev-vs-ice-maintenance": {
      calculatorTitle: "EV vs ICE Maintenance Cost Calculator",
      Viz: EvVsIceMaintenanceViz,
    },
    "ev-fast-charging-time": {
      calculatorTitle: "EV DC Fast Charging Calculator (10–80%)",
      Viz: EvFastChargingTimeViz,
    },
    "ev-charging-temperature-impact": {
      calculatorTitle: "EV Charging Temperature Impact Calculator",
      Viz: EvChargingTemperatureImpactViz,
    },
    "ev-truck-range": {
      calculatorTitle: "EV Truck Range vs. Payload Calculator",
      Viz: EvTruckRangeViz,
    },
    "ev-fleet-tco": {
      calculatorTitle: "EV Fleet TCO vs. Gas Calculator",
      Viz: EvFleetTcoViz,
    },
    "ev-bus-battery": {
      calculatorTitle: "Transit Bus Battery kWh per Mile",
      Viz: EvBusBatteryViz,
    },
    "ev-forklift-runtime": {
      calculatorTitle: "Electric Forklift Shift Runtime Calculator",
      Viz: EvForkliftRuntimeViz,
    },
    "ev-delivery-van-efficiency": {
      calculatorTitle: "Delivery Van Stop-and-Go Efficiency",
      Viz: EvDeliveryVanEfficiencyViz,
    },
    "escooter-range": {
      calculatorTitle: "E-Scooter Range Calculator",
      Viz: EscooterRangeViz,
    },
    "escooter-tire-pressure": {
      calculatorTitle: "E-Scooter Tyre Pressure & Rolling Resistance",
      Viz: EscooterTirePressureViz,
    },
    "escooter-tire-wear": {
      calculatorTitle: "E-Scooter Tyre Wear Life Calculator",
      Viz: EscooterTireWearViz,
    },
    "escooter-charge-time": {
      calculatorTitle: "E-Scooter Charge Time Calculator",
      Viz: EscooterChargeTimeViz,
    },
    "escooter-cost-per-km": {
      calculatorTitle: "E-Scooter Cost per km Calculator",
      Viz: EscooterCostPerKmViz,
    },
    "escooter-weight-limit": {
      calculatorTitle: "E-Scooter Rider Weight Limit Calculator",
      Viz: EscooterWeightLimitViz,
    },
    "escooter-max-speed": {
      calculatorTitle: "E-Scooter Max Speed Calculator",
      Viz: EscooterMaxSpeedViz,
    },
    "escooter-hill-climb": {
      calculatorTitle: "E-Scooter Hill Climb Grade Calculator",
      Viz: EscooterHillClimbViz,
    },
    "rv-solar-calculator": {
      calculatorTitle: "RV Solar & House Battery Calculator",
      Viz: RvSolarCalculatorViz,
    },
    "marine-battery-bank": {
      calculatorTitle: "Marine Trolling Motor Runtime Calculator",
      Viz: MarineBatteryBankViz,
    },
    "portable-power-station-recharge": {
      calculatorTitle: "Portable Power Station Recharge Times",
      Viz: PortablePowerStationRechargeViz,
    },
    "12v-to-120v-inverter": {
      calculatorTitle: "12V to 120V Inverter Load Planner",
      Viz: TwelveVTo120VInverterViz,
    },
    "camping-fridge-runtime": {
      calculatorTitle: "12V Camping Fridge Runtime Calculator",
      Viz: CampingFridgeRuntimeViz,
    },
    "appliance-daily-cost": {
      calculatorTitle: "Appliance Daily Cost",
      Viz: ApplianceDailyCostViz,
    },
    "appliance-monthly-energy": {
      calculatorTitle: "Appliance Monthly Energy",
      Viz: ApplianceMonthlyEnergyViz,
    },
    "energy-consumption": {
      calculatorTitle: "Energy Consumption Calculator",
      Viz: EnergyConsumptionViz,
    },
    "heater-cost": {
      calculatorTitle: "Electric Heater Cost Calculator",
      Viz: HeaterCostViz,
    },
    "ac-energy-cost": {
      calculatorTitle: "Air Conditioner Energy Cost Calculator",
      Viz: AcEnergyCostViz,
    },
    "fridge-energy-usage": {
      calculatorTitle: "Refrigerator Energy Usage Calculator",
      Viz: FridgeEnergyUsageViz,
    },
    "crypto-mining-power": {
      calculatorTitle: "Crypto Mining Power Calculator",
      Viz: CryptoMiningPowerViz,
    },
    "vampire-power-cost": {
      calculatorTitle: "Vampire Power Cost Calculator",
      Viz: VampirePowerCostViz,
    },
    "smart-thermostat-savings": {
      calculatorTitle: "Smart Thermostat Savings Calculator",
      Viz: SmartThermostatSavingsViz,
    },
    "window-solar-heat-gain": {
      calculatorTitle: "Window Solar Heat Gain (SHGC) Calculator",
      Viz: WindowSolarHeatGainViz,
    },
    "microgrid-roi": {
      calculatorTitle: "Microgrid ROI Calculator",
      Viz: MicrogridRoiViz,
    },
    "bess-carbon-cost": {
      calculatorTitle: "BESS Round-trip Carbon Cost Calculator",
      Viz: BessCarbonCostViz,
    },
    "carbon-footprint-offset": {
      calculatorTitle: "Solar & EV Carbon Offset Calculator",
      Viz: CarbonFootprintOffsetViz,
    },
    "grid-frequency-reward": {
      calculatorTitle: "Grid Frequency Response Reward Calculator",
      Viz: GridFrequencyRewardViz,
    },
    "peak-shaving-potential": {
      calculatorTitle: "Peak Shaving Potential Calculator",
      Viz: PeakShavingPotentialViz,
    },
    "electricity-rate-plan": {
      calculatorTitle: "Electricity Rate Plan Calculator (TOU vs Flat)",
      Viz: ElectricityRatePlanViz,
    },
    "reactive-power-calculator": {
      calculatorTitle: "Reactive Power & Power Factor Calculator",
      Viz: ReactivePowerCalculatorViz,
    },
    "pool-energy-thermal-cover": {
      calculatorTitle: "Pool Energy Cost & Thermal Cover Savings Calculator",
      Viz: PoolEnergyThermalCoverViz,
    },
    "heat-loss-insulation": {
      calculatorTitle: "Building Heat Loss & Insulation Calculator",
      Viz: HeatLossInsulationViz,
    },
    "home-insulation-savings": {
      calculatorTitle: "Home Insulation Savings Calculator",
      Viz: HomeInsulationSavingsViz,
    },
    "led-savings-roi": {
      calculatorTitle: "LED Savings & ROI Calculator",
      Viz: LedSavingsRoiViz,
    },
    "led-vs-incandescent-roi": {
      calculatorTitle: "LED vs. Incandescent ROI Calculator",
      Viz: LedVsIncandescentRoiViz,
    },
    "tou-shifting-savings": {
      calculatorTitle: "Time-of-Use Load Shifting Savings",
      Viz: TouShiftingSavingsViz,
    },
    "demand-charge-calculator": {
      calculatorTitle: "Commercial Demand Charge Calculator",
      Viz: DemandChargeCalculatorViz,
    },
    "v2g-financial-return": {
      calculatorTitle: "V2G Grid Buyback Revenue Calculator",
      Viz: V2gFinancialReturnViz,
    },
    "battery-arbitrage-roi": {
      calculatorTitle: "Home Battery Arbitrage ROI Calculator",
      Viz: BatteryArbitrageRoiViz,
    },
    "battery-cost": {
      calculatorTitle: "Battery Cost Estimator",
      Viz: BatteryCostViz,
    },
    "electricity-bill": {
      calculatorTitle: "Electricity Bill Estimator",
      Viz: ElectricityBillViz,
    },
    "ah-to-wh": {
      calculatorTitle: "Ah to Wh Converter",
      Viz: AhToWhViz,
    },
    "wh-to-ah": {
      calculatorTitle: "Wh to Ah Converter",
      Viz: WhToAhViz,
    },
    "kva-to-kw": {
      calculatorTitle: "kVA to kW Converter",
      Viz: KvaToKwViz,
    },
    "kw-to-hp": {
      calculatorTitle: "kW to HP Converter",
      Viz: KwToHpViz,
    },
    "conductor-resistance-temperature": {
      calculatorTitle: "Conductor Resistance & Temperature Calculator",
      Viz: ConductorResistanceTemperatureViz,
    },
    "battery-depth-of-discharge": {
      calculatorTitle: "Battery Depth of Discharge Calculator",
      Viz: BatteryDepthOfDischargeViz,
    },
    "battery-dod-energy-yield": {
      calculatorTitle: "Battery DoD to Energy Yield Calculator",
      Viz: BatteryDodEnergyYieldViz,
    },
    "battery-efficiency": {
      calculatorTitle: "Battery Efficiency Calculator",
      Viz: BatteryEfficiencyViz,
    },
    "battery-series-parallel": {
      calculatorTitle: "Battery Series & Parallel Calculator",
      Viz: BatterySeriesParallelViz,
    },
    "battery-c-rate": {
      calculatorTitle: "Battery C-Rate Calculator",
      Viz: BatteryCRateViz,
    },
    "volts-to-watts": {
      calculatorTitle: "Volts to Watts Calculator",
      Viz: VoltsToWattsViz,
    },
    "watts-to-volts": {
      calculatorTitle: "Watts to Volts Calculator",
      Viz: WattsToVoltsViz,
    },
    "power-factor": {
      calculatorTitle: "Power Factor Calculator",
      Viz: PowerFactorViz,
    },
    "ac-inrush-current": {
      calculatorTitle: "AC Inrush Current Limit Calculator",
      Viz: AcInrushCurrentViz,
    },
    "solar-inverter-efficiency": {
      calculatorTitle: "Solar Inverter Efficiency Calculator",
      Viz: SolarInverterEfficiencyViz,
    },
    "solar-payback-roi": {
      calculatorTitle: "Solar Payback Period (ROI) Calculator",
      Viz: SolarPaybackRoiViz,
    },
    "solar-angle-optimizer": {
      calculatorTitle: "Solar Panel Angle & Tilt Optimizer",
      Viz: SolarAngleOptimizerViz,
    },
    "solar-net-metering": {
      calculatorTitle: "Grid-Tie Net Metering Calculator",
      Viz: SolarNetMeteringViz,
    },
    "solar-degradation": {
      calculatorTitle: "Solar Panel Degradation Calculator",
      Viz: SolarDegradationViz,
    },
    "generator-vs-solar-hybrid": {
      calculatorTitle: "Off-Grid Generator vs. Solar Hybrid Calculator",
      Viz: GeneratorVsSolarHybridViz,
    },
    "generator-runtime-savings": {
      calculatorTitle: "Generator Run-Time Savings Calculator",
      Viz: GeneratorRuntimeSavingsViz,
    },
    "water-pump-solar-sizing": {
      calculatorTitle: "Water Pump Solar Sizing Calculator",
      Viz: WaterPumpSolarSizingViz,
    },
    "dc-cable-voltage-drop": {
      calculatorTitle: "DC Cable Size & Voltage Drop Calculator",
      Viz: DcCableVoltageDropViz,
    },
    "solar-degradation-20-year-roi": {
      calculatorTitle: "Solar System Degradation & 20-Year ROI Calculator",
      Viz: SolarDegradation20YearRoiViz,
    },
    "solar-shading-analysis": {
      calculatorTitle: "Solar Shading Analysis",
      Viz: SolarShadingAnalysisViz,
    },
    "solar-roi-analysis": {
      calculatorTitle: "Solar ROI Analysis",
      Viz: SolarRoiAnalysisViz,
    },
    "ev-public-charging-cost": {
      calculatorTitle: "EV Public Charging & Idle Fee Calculator",
      Viz: EvPublicChargingCostViz,
    },
    "ev-preconditioning-cost": {
      calculatorTitle: "EV Battery Pre-conditioning Cost Calculator",
      Viz: EvPreconditioningCostViz,
    },
    "ev-tire-wear-cost": {
      calculatorTitle: "EV Tire Wear Cost Calculator",
      Viz: EvTireWearCostViz,
    },
    "ev-charging-cable-loss": {
      calculatorTitle: "EV Charging Cable Power Loss Calculator",
      Viz: EvChargingCableLossViz,
    },
    "ev-soc-calculator": {
      calculatorTitle: "EV Battery State of Charge (SoC) Calculator",
      Viz: EvSocCalculatorViz,
    },
    "ebike-controller-watts": {
      calculatorTitle: "E-Bike Controller Amps to Watts Calculator",
      Viz: EbikeControllerWattsViz,
    },
    "ebike-battery-cycle-life": {
      calculatorTitle: "E-Bike Battery Cycle Life Calculator",
      Viz: EbikeBatteryCycleLifeViz,
    },
    "mobility-tco-calculator": {
      calculatorTitle: "Mobility TCO Calculator",
      Viz: MobilityTcoCalculatorViz,
    },
    "escooter-peak-amps": {
      calculatorTitle: "E-Scooter Peak Discharge Amps Calculator",
      Viz: EscooterPeakAmpsViz,
    },
    "escooter-brake-pad-wear": {
      calculatorTitle: "E-Scooter Brake Pad Wear Calculator",
      Viz: EscooterBrakePadWearViz,
    },
    "escooter-connector-loss": {
      calculatorTitle: "E-Scooter Connector Power Loss Calculator",
      Viz: EscooterConnectorLossViz,
    },
    "escooter-maintenance-schedule": {
      calculatorTitle: "E-Scooter Maintenance Schedule Calculator",
      Viz: EscooterMaintenanceScheduleViz,
    },
    "standby-power-waste": {
      calculatorTitle: "Standby Power Waste Calculator",
      Viz: StandbyPowerWasteViz,
    },
    "generator-fuel-consumption": {
      calculatorTitle: "Generator Fuel Consumption Calculator",
      Viz: GeneratorFuelConsumptionViz,
    },
    "heat-pump-vs-resistance": {
      calculatorTitle: "Heat Pump vs. Resistance Heat Calculator",
      Viz: HeatPumpVsResistanceViz,
    },
    "whole-house-energy-budget": {
      calculatorTitle: "Whole House Energy Budget Calculator",
      Viz: WholeHouseEnergyBudgetViz,
    },
    "lighting-circuit-load": {
      calculatorTitle: "Lighting Circuit Load Calculator",
      Viz: LightingCircuitLoadViz,
    },
    "ac-inverter-savings": {
      calculatorTitle: "AC Efficiency & Inverter Savings Calculator",
      Viz: AcInverterSavingsViz,
    },
    "solar-water-heater-efficiency": {
      calculatorTitle: "Solar Water Heater Efficiency Calculator",
      Viz: SolarWaterHeaterEfficiencyViz,
    },
    "small-wind-turbine-yield": {
      calculatorTitle: "Small Wind Turbine Yield Calculator",
      Viz: SmallWindTurbineYieldViz,
    },
    "standby-power-aggregator": {
      calculatorTitle: "Standby Power Aggregator",
      Viz: StandbyPowerAggregatorViz,
    },
    "solar-array-current": {
      calculatorTitle: "Solar Array Current Calculator",
      Viz: SolarArrayCurrentViz,
    },
    "solar-panel-tilt": {
      calculatorTitle: "Solar Panel Tilt Calculator",
      Viz: SolarPanelTiltViz,
    },
    "solar-roof-space": {
      calculatorTitle: "Solar Panel Roof Space Calculator",
      Viz: SolarRoofSpaceViz,
    },
    "ev-winter-range-loss": {
      calculatorTitle: "EV Winter Range Loss Calculator",
      Viz: EvWinterRangeLossViz,
    },
    "ev-vs-gas-savings": {
      calculatorTitle: "EV vs. Gas Car Savings Calculator",
      Viz: EvVsGasSavingsViz,
    },
    "ev-battery-degradation": {
      calculatorTitle: "EV Battery Health & Degradation Estimator",
      Viz: EvBatteryDegradationViz,
    },
    "ev-battery-depletion-value-loss": {
      calculatorTitle: "EV Battery Depletion & Value Loss Calculator",
      Viz: EvBatteryDepletionValueLossViz,
    },
    "ebike-battery-c-rate": {
      calculatorTitle: "E-Bike Battery C-Rating Calculator",
      Viz: EbikeBatteryCRateViz,
    },
    "ebike-voltage-sag": {
      calculatorTitle: "E-Bike Voltage Sag Calculator",
      Viz: EbikeVoltageSagViz,
    },
    "ebike-weight-performance": {
      calculatorTitle: "E-Bike Weight vs Performance Calculator",
      Viz: EbikeWeightPerformanceViz,
    },
    "ebike-commute-savings": {
      calculatorTitle: "E-Bike Commute Savings Calculator",
      Viz: EbikeCommuteSavingsViz,
    },
  };

export { hasCalculatorViz, CALCULATOR_VIZ_IDS } from "@/lib/calculator-viz-ids";

export function getCalculatorViz(
  id: CalculatorId
): CalculatorVizConfig | undefined {
  return CALCULATOR_VIZ[id];
}
