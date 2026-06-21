import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { DemandChargeCalculatorGuideIllustration } from "@/components/calculator/visual-guides/demand-charge-calculator-guide-illustration";
import { DcCableSizeGuideIllustration } from "@/components/calculator/visual-guides/dc-cable-size-guide-illustration";
import { ConductorResistanceTemperatureGuideIllustration } from "@/components/calculator/visual-guides/conductor-resistance-temperature-guide-illustration";
import { BatteryPercentageGuideIllustration } from "@/components/calculator/visual-guides/battery-percentage-guide-illustration";
import { BatteryRuntimeGuideIllustration } from "@/components/calculator/visual-guides/battery-runtime-guide-illustration";
import { BatteryChargingTimeGuideIllustration } from "@/components/calculator/visual-guides/battery-charging-time-guide-illustration";
import { BatteryEnergyGuideIllustration } from "@/components/calculator/visual-guides/battery-energy-guide-illustration";
import { BatteryDepthOfDischargeGuideIllustration } from "@/components/calculator/visual-guides/battery-depth-of-discharge-guide-illustration";
import { BatteryDodEnergyYieldGuideIllustration } from "@/components/calculator/visual-guides/battery-dod-energy-yield-guide-illustration";
import { BatteryEfficiencyGuideIllustration } from "@/components/calculator/visual-guides/battery-efficiency-guide-illustration";
import { BatterySeriesParallelGuideIllustration } from "@/components/calculator/visual-guides/battery-series-parallel-guide-illustration";
import { BatteryCostGuideIllustration } from "@/components/calculator/visual-guides/battery-cost-guide-illustration";
import { BatteryCRateGuideIllustration } from "@/components/calculator/visual-guides/battery-c-rate-guide-illustration";
import { InverterSizingGuideIllustration } from "@/components/calculator/visual-guides/inverter-sizing-guide-illustration";
import { InverterLossGuideIllustration } from "@/components/calculator/visual-guides/inverter-loss-guide-illustration";
import { InverterPeakLoadSurgeGuideIllustration } from "@/components/calculator/visual-guides/inverter-peak-load-surge-guide-illustration";
import { InverterLoadingCurveGuideIllustration } from "@/components/calculator/visual-guides/inverter-loading-curve-guide-illustration";
import { GridFrequencyRewardGuideIllustration } from "@/components/calculator/visual-guides/grid-frequency-reward-guide-illustration";
import { HomeBackupSizingGuideIllustration } from "@/components/calculator/visual-guides/home-backup-sizing-guide-illustration";
import { BatteryVoltageDropGuideIllustration } from "@/components/calculator/visual-guides/battery-voltage-drop-guide-illustration";
import { ResidentialVoltageDropGuideIllustration } from "@/components/calculator/visual-guides/residential-voltage-drop-guide-illustration";
import { BatteryCalendarAgingGuideIllustration } from "@/components/calculator/visual-guides/battery-calendar-aging-guide-illustration";
import { BessRoiGuideIllustration } from "@/components/calculator/visual-guides/bess-roi-guide-illustration";
import { ElectricityBillGuideIllustration } from "@/components/calculator/visual-guides/electricity-bill-guide-illustration";
import { ElectricityRatePlanGuideIllustration } from "@/components/calculator/visual-guides/electricity-rate-plan-guide-illustration";
import { EscooterRangeGuideIllustration } from "@/components/calculator/visual-guides/escooter-range-guide-illustration";
import { EbikeRangeGuideIllustration } from "@/components/calculator/visual-guides/ebike-range-guide-illustration";
import { BatteryArbitrageRoiGuideIllustration } from "@/components/calculator/visual-guides/battery-arbitrage-roi-guide-illustration";
import { BatteryBankSizeGuideIllustration } from "@/components/calculator/visual-guides/battery-bank-size-guide-illustration";
import { TouShiftingSavingsGuideIllustration } from "@/components/calculator/visual-guides/tou-shifting-savings-guide-illustration";
import { UpsRuntimeGuideIllustration } from "@/components/calculator/visual-guides/ups-runtime-guide-illustration";
import { CarbonFootprintOffsetGuideIllustration } from "@/components/calculator/visual-guides/carbon-footprint-offset-guide-illustration";
import { CriticalLoadAnalysisGuideIllustration } from "@/components/calculator/visual-guides/critical-load-analysis-guide-illustration";
import { OhmsLawGuideIllustration } from "@/components/calculator/visual-guides/ohms-law-guide-illustration";
import { WattsToAmpsGuideIllustration } from "@/components/calculator/visual-guides/watts-to-amps-guide-illustration";
import { WattsToVoltsGuideIllustration } from "@/components/calculator/visual-guides/watts-to-volts-guide-illustration";
import { WhToAhGuideIllustration } from "@/components/calculator/visual-guides/wh-to-ah-guide-illustration";
import { AhToWhGuideIllustration } from "@/components/calculator/visual-guides/ah-to-wh-guide-illustration";
import { V2gFinancialReturnGuideIllustration } from "@/components/calculator/visual-guides/v2g-financial-return-guide-illustration";
import { VoltsToWattsGuideIllustration } from "@/components/calculator/visual-guides/volts-to-watts-guide-illustration";
import { AcInrushCurrentGuideIllustration } from "@/components/calculator/visual-guides/ac-inrush-current-guide-illustration";
import { PowerFactorGuideIllustration } from "@/components/calculator/visual-guides/power-factor-guide-illustration";
import { ReactivePowerCalculatorGuideIllustration } from "@/components/calculator/visual-guides/reactive-power-calculator-guide-illustration";
import { AmpsToWattsGuideIllustration } from "@/components/calculator/visual-guides/amps-to-watts-guide-illustration";
import { SolarRoofSpaceGuideIllustration } from "@/components/calculator/visual-guides/solar-roof-space-guide-illustration";
import { SolarPanelTiltGuideIllustration } from "@/components/calculator/visual-guides/solar-panel-tilt-guide-illustration";
import { SolarArrayCurrentGuideIllustration } from "@/components/calculator/visual-guides/solar-array-current-guide-illustration";
import { SolarInverterEfficiencyGuideIllustration } from "@/components/calculator/visual-guides/solar-inverter-efficiency-guide-illustration";
import { SolarChargeControllerSizeGuideIllustration } from "@/components/calculator/visual-guides/solar-charge-controller-size-guide-illustration";
import { SolarPanelSizeGuideIllustration } from "@/components/calculator/visual-guides/solar-panel-size-guide-illustration";
import { SolarDailyYieldGuideIllustration } from "@/components/calculator/visual-guides/solar-daily-yield-guide-illustration";
import { SolarBatteryBankGuideIllustration } from "@/components/calculator/visual-guides/solar-battery-bank-guide-illustration";
import { RvSolarCalculatorGuideIllustration } from "@/components/calculator/visual-guides/rv-solar-calculator-guide-illustration";
import { MarineBatteryBankGuideIllustration } from "@/components/calculator/visual-guides/marine-battery-bank-guide-illustration";
import { PeakShavingPotentialGuideIllustration } from "@/components/calculator/visual-guides/peak-shaving-potential-guide-illustration";
import { PoolEnergyThermalCoverGuideIllustration } from "@/components/calculator/visual-guides/pool-energy-thermal-cover-guide-illustration";
import { PortablePowerStationRechargeGuideIllustration } from "@/components/calculator/visual-guides/portable-power-station-recharge-guide-illustration";
import { InverterLoadPlannerGuideIllustration } from "@/components/calculator/visual-guides/12v-to-120v-inverter-guide-illustration";
import { CampingFridgeRuntimeGuideIllustration } from "@/components/calculator/visual-guides/camping-fridge-runtime-guide-illustration";
import { EscooterTirePressureGuideIllustration } from "@/components/calculator/visual-guides/escooter-tire-pressure-guide-illustration";
import { EscooterMaxSpeedGuideIllustration } from "@/components/calculator/visual-guides/escooter-max-speed-guide-illustration";
import { EscooterHillClimbGuideIllustration } from "@/components/calculator/visual-guides/escooter-hill-climb-guide-illustration";
import { EscooterTireWearGuideIllustration } from "@/components/calculator/visual-guides/escooter-tire-wear-guide-illustration";
import { EscooterChargeTimeGuideIllustration } from "@/components/calculator/visual-guides/escooter-charge-time-guide-illustration";
import { EscooterCostPerKmGuideIllustration } from "@/components/calculator/visual-guides/escooter-cost-per-km-guide-illustration";
import { EscooterWeightLimitGuideIllustration } from "@/components/calculator/visual-guides/escooter-weight-limit-guide-illustration";
import { EscooterPeakAmpsGuideIllustration } from "@/components/calculator/visual-guides/escooter-peak-amps-guide-illustration";
import { EscooterBrakePadWearGuideIllustration } from "@/components/calculator/visual-guides/escooter-brake-pad-wear-guide-illustration";
import { EscooterConnectorLossGuideIllustration } from "@/components/calculator/visual-guides/escooter-connector-loss-guide-illustration";
import { EscooterMaintenanceScheduleGuideIllustration } from "@/components/calculator/visual-guides/escooter-maintenance-schedule-guide-illustration";
import { KwToHpGuideIllustration } from "@/components/calculator/visual-guides/kw-to-hp-guide-illustration";
import { KvaToKwGuideIllustration } from "@/components/calculator/visual-guides/kva-to-kw-guide-illustration";

export interface CalculatorVisualGuideConfig {
  calculatorTitle: string;
  caption: string;
  Illustration: ComponentType<{ className?: string }>;
}

export const CALCULATOR_VISUAL_GUIDES: Partial<
  Record<CalculatorId, CalculatorVisualGuideConfig>
> = {
  "dc-cable-size": {
    calculatorTitle: "DC Cable Size Calculator",
    caption:
      "Enter load current, one-way cable length, and system voltage. The tool looks up ampacity for a safe gauge, then checks voltage drop over the round-trip run—delivering a recommended AWG.",
    Illustration: DcCableSizeGuideIllustration,
  },
  "demand-charge-calculator": {
    calculatorTitle: "Commercial Demand Charge Calculator",
    caption:
      "Enter billing peak demand in kW and your utility demand charge in $/kW. Monthly penalty equals peak kW times rate—85 kW at $12/kW is about $1,020/month or $12,240/year. This is power-based billing separate from energy kWh; one 15-minute spike can set the whole month.",
    Illustration: DemandChargeCalculatorGuideIllustration,
  },
  "conductor-resistance-temperature": {
    calculatorTitle: "Conductor Resistance & Temperature Calculator",
    caption:
      "Enter conductor material (copper or aluminum), cross-section in mm², one-way length in meters, and operating temperature in °C. Resistance at 20°C equals resistivity times length divided by area; R(T) equals R₂₀ times one plus alpha times (T minus 20)—copper 6 mm² over 15 m at 40°C is about 0.0472 Ω (vs 0.0438 Ω at 20°C). Use field temperature for DC cable BOM and voltage-drop planning.",
    Illustration: ConductorResistanceTemperatureGuideIllustration,
  },
  "battery-percentage": {
    calculatorTitle: "Battery Percentage",
    caption:
      "Enter current charge and full rated capacity in the same unit (mAh or Ah). The calculator divides current by full capacity and multiplies by 100 to show remaining charge as a percentage—capped at 100% if current exceeds rated capacity.",
    Illustration: BatteryPercentageGuideIllustration,
  },
  "battery-runtime": {
    calculatorTitle: "Battery Runtime",
    caption:
      "Enter battery capacity in mAh, nominal voltage, and load power in watts. The tool converts mAh to watt-hours (÷ 1,000 × V), then divides Wh by watts to estimate how long the pack lasts at that draw.",
    Illustration: BatteryRuntimeGuideIllustration,
  },
  "battery-charging-time": {
    calculatorTitle: "Battery Charging Time",
    caption:
      "Enter battery capacity in mAh, charger current in mA, and charge efficiency (%). Base time equals mAh divided by mA; actual charge time equals base time divided by efficiency—accounting for heat loss and taper above ~80% state of charge.",
    Illustration: BatteryChargingTimeGuideIllustration,
  },
  "battery-energy": {
    calculatorTitle: "Battery Energy Calculator",
    caption:
      "Enter battery capacity in amp-hours and nominal voltage. Stored energy in watt-hours equals Ah multiplied by V—a 100 Ah 12 V pack holds 1,200 Wh. Use Wh to compare packs at different voltages before sizing runtime or solar storage.",
    Illustration: BatteryEnergyGuideIllustration,
  },
  "battery-depth-of-discharge": {
    calculatorTitle: "Battery Depth of Discharge Calculator",
    caption:
      "Enter energy used in watt-hours and total pack capacity in watt-hours. Depth of discharge equals used divided by total, times 100—a 600 Wh draw from a 1,200 Wh pack is 50% DoD. State of charge is 100% minus DoD.",
    Illustration: BatteryDepthOfDischargeGuideIllustration,
  },
  "battery-dod-energy-yield": {
    calculatorTitle: "Battery DoD to Energy Yield Calculator",
    caption:
      "Enter nominal battery capacity in kWh and your allowed depth of discharge (%). Usable energy equals nominal times DoD divided by 100—a 10 kWh bank at 80% DoD delivers 8 kWh (8,000 Wh) to loads with 2 kWh held in reserve. Use this for backup and critical-load planning; compare usable kWh against Critical Load Analysis requirements.",
    Illustration: BatteryDodEnergyYieldGuideIllustration,
  },
  "battery-efficiency": {
    calculatorTitle: "Battery Efficiency Calculator",
    caption:
      "Enter energy retrieved on discharge (Wh out) and energy consumed during charging (Wh in). Round-trip efficiency equals output divided by input, times 100—charging 1,000 Wh and getting 950 Wh back is 95% efficiency, with the remainder lost as heat and BMS overhead.",
    Illustration: BatteryEfficiencyGuideIllustration,
  },
  "battery-series-parallel": {
    calculatorTitle: "Battery Series & Parallel Calculator",
    caption:
      "Enter cells in series (S), strings in parallel (P), cell voltage, and cell amp-hours. Pack voltage equals S × cell V; pack Ah equals P × cell Ah; pack Wh equals V × Ah—a 4S2P layout with 3.2 V 100 Ah cells yields 12.8 V, 200 Ah, and 2,560 Wh.",
    Illustration: BatterySeriesParallelGuideIllustration,
  },
  "battery-c-rate": {
    calculatorTitle: "Battery C-Rate Calculator",
    caption:
      "Enter battery capacity in amp-hours and discharge current in amps. C-rate equals current divided by capacity—50 A from a 100 Ah pack is 0.5C. Runtime hours equals Ah divided by amps, about 2 hours at constant current before the pack is empty.",
    Illustration: BatteryCRateGuideIllustration,
  },
  "battery-arbitrage-roi": {
    calculatorTitle: "Home Battery Arbitrage ROI Calculator",
    caption:
      "Enter usable battery kWh, round-trip efficiency, night and peak $/kWh rates, and cycles per day. Charge off-peak and discharge at peak—daily profit equals kWh times efficiency times price spread times cycles; 10 kWh at 90% eff with $0.09 night and $0.38 peak is about $2.61/day or $953/year. This is gross tariff spread only, not payback on install cost.",
    Illustration: BatteryArbitrageRoiGuideIllustration,
  },
  "battery-cost": {
    calculatorTitle: "Battery Cost Estimator",
    caption:
      "Enter pack capacity in Ah, nominal voltage, and market price in $/Wh. Stored energy equals Ah times V; estimated cost equals Wh times $/Wh—a 100 Ah 12 V pack at $0.15/Wh is 1,200 Wh and about $180. Use $/Wh to compare deals across different voltages; also consider cycle life, warranty, and BMS quality.",
    Illustration: BatteryCostGuideIllustration,
  },
  "inverter-sizing": {
    calculatorTitle: "Inverter Sizing",
    caption:
      "Enter simultaneous peak load in watts and a safety margin percent. Minimum inverter size equals peak times one plus margin divided by 100—1,800 W peak with 25% margin yields 2,250 W continuous. Match the datasheet continuous rating; use a higher margin or the surge calculator when motors start.",
    Illustration: InverterSizingGuideIllustration,
  },
  "inverter-loss-calculator": {
    calculatorTitle: "Inverter Loss Calculator",
    caption:
      "Enter DC input watts and inverter efficiency (%). AC output equals DC times efficiency—1,200 W DC at 92% yields 1,104 W AC. Loss watts equals DC minus AC (96 W, 8%) and dissipates as heat in the inverter; size batteries for DC draw including this overhead.",
    Illustration: InverterLossGuideIllustration,
  },
  "inverter-peak-load-surge": {
    calculatorTitle: "Inverter Peak Load & Surge Calculator",
    caption:
      "Enter each load's running watts and surge factor (motors typically 3×–7×). Continuous watts sum all running loads; peak adds the largest surge margin plus 35% of the second-largest for staggered starts—then snaps to a standard pure-sine inverter tier with ~2× surge rating and headroom.",
    Illustration: InverterPeakLoadSurgeGuideIllustration,
  },
  "inverter-loading-curve": {
    calculatorTitle: "Inverter Loading Curve",
    caption:
      "Enter nominal inverter watts, sustained AC load, ambient temperature, and manufacturer overload profile. Derate nominal power for heat (1% loss per °C above 25°C), compute load as a percent of derated capacity, then interpolate the overload curve—3,300 W on a 3,000 W unit at 35°C is ~122% with roughly 8 minutes before shutdown.",
    Illustration: InverterLoadingCurveGuideIllustration,
  },
  "home-backup-sizing": {
    calculatorTitle: "Home Backup Battery Sizing Calculator",
    caption:
      "Enter essential load watts, backup hours, system voltage, usable depth of discharge, and inverter efficiency. Load Wh equals watts times hours divided by efficiency; bank Wh equals load Wh divided by DoD; bank Ah equals bank Wh divided by voltage—800 W for 8 hours at 48 V and 80% DoD needs about 181 Ah.",
    Illustration: HomeBackupSizingGuideIllustration,
  },
  "battery-voltage-drop": {
    calculatorTitle: "Battery Voltage Drop Calculator",
    caption:
      "Enter load amps, one-way wire length in feet, and system voltage. The tool picks a copper AWG for ampacity, then calculates round-trip I×R drop—40 A over 15 ft on a 12 V system loses about 2.45 V (20.4%), leaving 9.55 V at the load. Aim for ≤3% on critical DC runs.",
    Illustration: BatteryVoltageDropGuideIllustration,
  },
  "residential-voltage-drop": {
    calculatorTitle: "Residential AC Voltage Drop Calculator",
    caption:
      "Enter supply voltage, load amps, one-way cable length in meters, and copper size in AWG or mm². Round-trip resistance times current gives drop volts—20 A over 25 m on 12 AWG at 120 V loses 5.21 V (4.3%), leaving 114.8 V at the load. Target ≤3% on branch circuits and ≤5% total.",
    Illustration: ResidentialVoltageDropGuideIllustration,
  },
  "battery-calendar-aging": {
    calculatorTitle: "Battery Calendar Aging Calculator",
    caption:
      "Enter average storage temperature, mean state of charge while idle, and pack age in years. Baseline calendar fade is about 2% per year at 25°C and 50% SOC, scaled up for heat and high SOC—three years at ideal storage yields roughly 6% capacity loss and 94% remaining SoH. Cycle wear is not included.",
    Illustration: BatteryCalendarAgingGuideIllustration,
  },
  "bess-roi": {
    calculatorTitle: "BESS ROI Calculator (Battery Energy Storage System)",
    caption:
      "Enter battery kWh, install cost, peak and off-peak $/kWh rates, cycles per day, life years, DoD, and round-trip efficiency. Charge off-peak and discharge at peak—daily savings equals price spread times shifted kWh; payback equals cost divided by annual savings; LCOS equals cost divided by lifetime kWh delivered.",
    Illustration: BessRoiGuideIllustration,
  },
  "carbon-footprint-offset": {
    calculatorTitle: "Solar & EV Carbon Offset Calculator",
    caption:
      "Enter clean energy used in kWh (solar self-consumption, EV charging, etc.) and your regional grid emissions factor in kg CO₂/kWh. CO₂ avoided equals clean kWh times grid intensity—900 kWh at 0.42 kg/kWh is about 378 kg avoided (~833 lbs or ~936 car-miles equivalent). This is a displacement estimate, not a full lifecycle analysis.",
    Illustration: CarbonFootprintOffsetGuideIllustration,
  },
  "electricity-bill": {
    calculatorTitle: "Electricity Bill Estimator",
    caption:
      "Enter total energy use in kWh for the billing period and your utility rate in $/kWh. Estimated bill equals kWh times rate—850 kWh at $0.14/kWh is about $119. This covers energy charges only; fixed fees, tiered rates, delivery, and taxes can raise the actual bill.",
    Illustration: ElectricityBillGuideIllustration,
  },
  "electricity-rate-plan": {
    calculatorTitle: "Electricity Rate Plan Calculator (TOU vs Flat)",
    caption:
      "Enter monthly kWh, your usage split across peak, shoulder, and off-peak periods, and both tariff sets. Flat bill equals total kWh times one rate; TOU bill weights each period by its rate—850 kWh at 15/10/75% split can be $119 flat vs about $101 on TOU, saving roughly $18/month or $216/year. Winners depend on your load profile; shift usage to off-peak to improve TOU economics.",
    Illustration: ElectricityRatePlanGuideIllustration,
  },
  "peak-shaving-potential": {
    calculatorTitle: "Peak Shaving Potential Calculator",
    caption:
      "Enter peak and off-peak kWh, their TOU rates, and what share of peak load you can shift. Before bill weights each bucket by rate; after bill moves shiftable kWh from peak to off-peak—200 peak + 600 off-peak at $0.32/$0.08 with 40% shiftable saves about $19/month or $230/year. Each shifted kWh saves the peak-minus-off-peak spread.",
    Illustration: PeakShavingPotentialGuideIllustration,
  },
  "tou-shifting-savings": {
    calculatorTitle: "Time-of-Use Load Shifting Savings",
    caption:
      "Enter monthly shiftable kWh and peak vs off-peak $/kWh rates. Savings per kWh equals peak minus off-peak; monthly savings equals shiftable kWh times that spread—350 kWh at $0.42 peak and $0.11 off-peak saves about $109/month or $1,302/year. Covers energy rates only, not demand kW charges.",
    Illustration: TouShiftingSavingsGuideIllustration,
  },
  "grid-frequency-reward": {
    calculatorTitle: "Grid Frequency Response Reward Calculator",
    caption:
      "Enter grid-service capacity in kW, daily participation hours, program reward rate, and availability %. Effective kW equals capacity times availability times hours÷24—5 kW at 90% availability and 18 h/day is about 3.4 kW effective. At $8/kW-month that pays roughly $27/month or $324/year; energy-rate programs use dispatched kWh times $/kWh instead.",
    Illustration: GridFrequencyRewardGuideIllustration,
  },
  "escooter-range": {
    calculatorTitle: "E-Scooter Range Calculator",
    caption:
      "Set SOC on the slider, tyre pressure versus recommended bar, and nominal pack voltage (36 / 48 / 52 V). The model builds usable Wh from charge level, adjusts Wh/km for rolling resistance and voltage sag, then returns estimated remaining range in kilometres.",
    Illustration: EscooterRangeGuideIllustration,
  },
  "ebike-range-estimator": {
    calculatorTitle: "E-Bike Range Estimator",
    caption:
      "Enter battery Wh, pedal-assist level, total mass, and wind/terrain factor. Consumption Wh/km combines a rolling baseline, assist multiplier, conditions, and weight penalty; range km equals usable pack energy divided by that consumption.",
    Illustration: EbikeRangeGuideIllustration,
  },
  "battery-bank-size": {
    calculatorTitle: "Battery Bank Size (Ah)",
    caption:
      "Enter load power in watts, required runtime in hours, and system voltage. The calculator finds watt-hours needed (W × hours), then divides by voltage to size the battery bank in amp-hours—add a safety margin for inverter loss and aging in real installs.",
    Illustration: BatteryBankSizeGuideIllustration,
  },
  "ups-runtime": {
    calculatorTitle: "UPS Runtime",
    caption:
      "Enter battery energy in watt-hours and load power in watts. Backup time equals stored Wh divided by load W—energy depletes at a steady rate until the UPS cuts out. Plan for 10–20% less runtime than the ideal figure due to inverter conversion loss.",
    Illustration: UpsRuntimeGuideIllustration,
  },
  "v2g-financial-return": {
    calculatorTitle: "V2G Grid Buyback Revenue Calculator",
    caption:
      "Enter kWh exported per V2G session, utility buyback rate in $/kWh, and sessions per month. Monthly revenue equals kWh times rate times sessions—15 kWh at $0.25/kWh for 12 sessions is about $45/month or $540/year. Programs may cap export hours; battery cycle wear is not included.",
    Illustration: V2gFinancialReturnGuideIllustration,
  },
  "critical-load-analysis": {
    calculatorTitle: "Critical Load Analysis",
    caption:
      "List each essential device with running watts and hours used per day, then set your target outage duration. The tool sums daily Wh, averages to an hourly rate, multiplies by backup hours, and adds a 20% safety buffer to size required backup capacity.",
    Illustration: CriticalLoadAnalysisGuideIllustration,
  },
  "watts-to-amps": {
    calculatorTitle: "Watts to Amps",
    caption:
      "Enter electrical power in watts and system voltage. For DC circuits, current amps equals watts divided by volts (P = V × I). Use the result for fuse sizing, wire gauge checks, and battery discharge current planning.",
    Illustration: WattsToAmpsGuideIllustration,
  },
  "ohms-law": {
    calculatorTitle: "Ohm's Law Calculator",
    caption:
      "Enter any two of voltage, current, and resistance—leave the third blank. Ohm's law V = I × R rearranges to solve the unknown: 12 V and 10 A give R = 1.2 Ω. Works for resistive DC circuits; reactive AC loads need impedance, not R alone.",
    Illustration: OhmsLawGuideIllustration,
  },
  "amps-to-watts": {
    calculatorTitle: "Amps to Watts",
    caption:
      "Enter current in amps and system voltage. Power in watts equals amps multiplied by volts (W = A × V). Use the result to size batteries, UPS runtime, and inverter loads from measured or nameplate current.",
    Illustration: AmpsToWattsGuideIllustration,
  },
  "kw-to-hp": {
    calculatorTitle: "kW to HP Converter",
    caption:
      "Enter electrical power in kilowatts. Mechanical horsepower equals kW divided by 0.7457—one hp is defined as 745.7 W. Example: 7.5 kW ÷ 0.7457 ≈ 10.06 HP for motor nameplates, generator ratings, and pump curves in US units. This uses mechanical horsepower, not metric PS (≈ 0.7355 kW).",
    Illustration: KwToHpGuideIllustration,
  },
  "kva-to-kw": {
    calculatorTitle: "kVA to kW Converter",
    caption:
      "Enter apparent power in kVA and power factor (0–1). Real power in kW equals kVA times power factor—10 kVA at PF 0.85 delivers 8.5 kW of useful work. Equipment nameplates often list kVA; size loads and fuel budgets from kW. Resistive heaters run near PF 1.0; motors typically 0.7–0.9.",
    Illustration: KvaToKwGuideIllustration,
  },
  "wh-to-ah": {
    calculatorTitle: "Wh to Ah Converter",
    caption:
      "Enter energy in watt-hours and system voltage in volts. Amp-hour capacity equals Wh divided by V—a 1,200 Wh pack at 12 V is 100 Ah. Use Wh to compare batteries at different voltages, then convert to Ah for runtime and bank sizing. Use nominal bus voltage (12 V lead-acid, 48 V LiFePO₄), not per-cell marketing voltage.",
    Illustration: WhToAhGuideIllustration,
  },
  "ah-to-wh": {
    calculatorTitle: "Ah to Wh Converter",
    caption:
      "Enter battery capacity in amp-hours and system voltage in volts. Stored energy in watt-hours equals Ah times V—a 100 Ah 12 V pack holds 1,200 Wh (1.2 kWh). Use Wh to compare batteries at different voltages and match watt-rated loads to Ah-rated banks.",
    Illustration: AhToWhGuideIllustration,
  },
  "volts-to-watts": {
    calculatorTitle: "Volts to Watts Calculator",
    caption:
      "Enter voltage in volts and current in amps. Power in watts equals voltage times current (W = V × A)—120 V at 15 A is 1,800 W. Use the result to size breakers, estimate heat output, and compare loads; AC real power on inductive loads also depends on power factor.",
    Illustration: VoltsToWattsGuideIllustration,
  },
  "watts-to-volts": {
    calculatorTitle: "Watts to Volts Calculator",
    caption:
      "Enter power in watts and current in amps. Voltage equals watts divided by amps (V = W ÷ A)—1,800 W at 15 A implies 120 V nominal circuit voltage. Useful when you know appliance wattage and measured current; current must be greater than zero.",
    Illustration: WattsToVoltsGuideIllustration,
  },
  "power-factor": {
    calculatorTitle: "Power Factor Calculator",
    caption:
      "Enter real power in kW and apparent power in kVA. Power factor equals kW divided by kVA—8 kW on a 10 kVA service is PF 0.80 (80% of apparent power does useful work). kW must not exceed kVA; low PF increases feeder current and may need correction capacitors on motor loads.",
    Illustration: PowerFactorGuideIllustration,
  },
  "reactive-power-calculator": {
    calculatorTitle: "Reactive Power & Power Factor Calculator",
    caption:
      "Enter apparent power in kVA and power factor (0–1). Real power kW equals kVA times PF; reactive kVAR equals the square root of kVA squared minus kW squared—12 kVA at PF 0.85 gives 10.2 kW real and 6.32 kVAR reactive. Size inverters and conductors for kVA, not kW alone; motor and VFD loads often run PF 0.7–0.9.",
    Illustration: ReactivePowerCalculatorGuideIllustration,
  },
  "ac-inrush-current": {
    calculatorTitle: "AC Inrush Current Limit Calculator",
    caption:
      "Enter nominal watts, operating voltage, and inrush factor (peak ÷ running). Running amps equal watts divided by volts; peak equals running times factor—1,800 W at 120 V with 6× inrush gives 15 A run and 90 A peak. Breaker size is the larger of 125% continuous load or peak divided by the Type B/C/D magnetic trip multiple.",
    Illustration: AcInrushCurrentGuideIllustration,
  },
  "solar-panel-size": {
    calculatorTitle: "Solar Panel Size",
    caption:
      "Enter daily energy need in Wh, peak sun hours for your site, and system efficiency (%). Minimum panel watts equals daily Wh divided by sun hours times efficiency—how much harvest window you need to refill the load each day.",
    Illustration: SolarPanelSizeGuideIllustration,
  },
  "solar-charge-controller-size": {
    calculatorTitle: "Solar Charge Controller Size Calculator",
    caption:
      "Enter total panel watts, battery voltage, and safety margin percent. Minimum controller amps equals panel watts divided by battery voltage, times one plus margin—800 W on a 12 V bank with 25% margin needs about 83 A. Check panel Isc on the datasheet; MPPT handles higher Voc and cold-sun boost.",
    Illustration: SolarChargeControllerSizeGuideIllustration,
  },
  "solar-inverter-efficiency": {
    calculatorTitle: "Solar Inverter Efficiency Calculator",
    caption:
      "Enter AC output watts and DC input watts from the PV side. Inverter efficiency equals AC divided by DC, times 100—2,850 W AC from 3,000 W DC is 95.0% with 150 W lost as heat. MPPT harvest is separate; efficiency drops at very low load.",
    Illustration: SolarInverterEfficiencyGuideIllustration,
  },
  "solar-array-current": {
    calculatorTitle: "Solar Array Current Calculator",
    caption:
      "Enter total array watts and operating voltage at the MPPT or string level. Array current equals watts divided by volts—1,200 W at 48 V nominal is about 25 A (~Imp). Use MPPT voltage, not Voc; fuse sizing often references higher Isc from the panel label.",
    Illustration: SolarArrayCurrentGuideIllustration,
  },
  "solar-panel-tilt": {
    calculatorTitle: "Solar Panel Tilt Calculator",
    caption:
      "Enter site latitude in degrees (positive north, negative south). For year-round fixed mounts, recommended tilt equals absolute latitude—40°N yields about 40° from horizontal on a south-facing rack. Seasonal tweaks: summer |lat| − 15°, winter |lat| + 15°.",
    Illustration: SolarPanelTiltGuideIllustration,
  },
  "solar-roof-space": {
    calculatorTitle: "Solar Panel Roof Space Calculator",
    caption:
      "Enter usable roof square feet, panel footprint, panel watt rating, and percent of roof usable for PV. Effective area equals roof times usable percent; max panels equals floor of area divided by footprint; system kW equals panels times watts divided by 1,000—800 sq ft at 80% with 20 sq ft 400 W modules fits 32 panels (12.8 kW).",
    Illustration: SolarRoofSpaceGuideIllustration,
  },
  "solar-daily-yield": {
    calculatorTitle: "Solar Daily Yield",
    caption:
      "Enter panel wattage, peak sun hours, and system efficiency (%). Daily Wh equals panel watts times sun hours times efficiency—estimated energy harvested per day after wiring, inverter, and other system losses.",
    Illustration: SolarDailyYieldGuideIllustration,
  },
  "solar-battery-bank": {
    calculatorTitle: "Solar Battery Bank Size",
    caption:
      "Enter daily energy use in Wh, autonomy backup days, and usable depth of discharge (%). Bank Wh equals daily Wh times days divided by DoD—minimum nameplate storage to ride through cloudy periods without over-discharging the pack.",
    Illustration: SolarBatteryBankGuideIllustration,
  },
  "rv-solar-calculator": {
    calculatorTitle: "RV Solar & House Battery Calculator",
    caption:
      "Enter rooftop panel watts, peak sun hours, system efficiency (%), daily house load in Wh, and bus voltage (12 V or 24 V). Daily yield equals W × h × η; if harvest falls short of load, the shortfall converts to amp-hour bank headroom at your house voltage.",
    Illustration: RvSolarCalculatorGuideIllustration,
  },
  "marine-battery-bank": {
    calculatorTitle: "Marine Trolling Motor Runtime Calculator",
    caption:
      "Enter continuous motor amp draw, bank amp-hour capacity, and usable depth of discharge (%). Runtime hours equals usable Ah (bank × DoD) divided by continuous amps—how long the bank sustains trolling and house loads at steady draw.",
    Illustration: MarineBatteryBankGuideIllustration,
  },
  "pool-energy-thermal-cover": {
    calculatorTitle: "Pool Energy Cost & Thermal Cover Savings Calculator",
    caption:
      "Enter pool pump kW, daily run hours, electricity rate, heating method (resistance COP 1 vs heat pump COP 4–6), and thermal cover savings on evaporation. Pump kWh equals kW times hours; heating grid kWh equals heat demand divided by COP, reduced by cover before COP—a 1.5 kW pump at 8 h/day with COP 5 and 40% cover is about $1.88/day and ~$339/year savings vs open pool with resistance.",
    Illustration: PoolEnergyThermalCoverGuideIllustration,
  },
  "portable-power-station-recharge": {
    calculatorTitle: "Portable Power Station Recharge Times",
    caption:
      "Enter station capacity in Wh, wall AC input watts, car 12V input watts, solar MPPT watts, and charge efficiency (%). Recharge hours for each path equals Wh divided by input watts times efficiency—compare wall, car, and solar refill times side by side.",
    Illustration: PortablePowerStationRechargeGuideIllustration,
  },
  "12v-to-120v-inverter": {
    calculatorTitle: "12V to 120V Inverter Load Planner",
    caption:
      "Enter inverter continuous and surge watt ratings, then your load continuous and surge demands. The tool checks both tiers—running watts and motor-start spikes must stay at or below the inverter limits, with headroom shown as a percentage of continuous rating.",
    Illustration: InverterLoadPlannerGuideIllustration,
  },
  "camping-fridge-runtime": {
    calculatorTitle: "12V Camping Fridge Runtime Calculator",
    caption:
      "Enter battery watt-hours, fridge rated daily use at 77°F lab conditions, and ambient heat level. Adjusted draw equals rated Wh/day times an ambient factor (cool 0.85×, mild 1.0×, hot 1.35×); runtime hours equals battery divided by adjusted draw, times 24.",
    Illustration: CampingFridgeRuntimeGuideIllustration,
  },
  "escooter-tire-pressure": {
    calculatorTitle: "E-Scooter Tyre Pressure & Rolling Resistance",
    caption:
      "Enter current and recommended tyre pressure in bar, wheel diameter (8–10″), and rider mass. Under-inflation raises a rolling multiplier (1 + Δbar × 0.35); adjusted Wh/km scales from a 13 Wh/km baseline—showing how soft tyres steal range on small wheels.",
    Illustration: EscooterTirePressureGuideIllustration,
  },
  "escooter-max-speed": {
    calculatorTitle: "E-Scooter Max Speed Calculator",
    caption:
      "Enter battery voltage, motor KV (RPM per volt), and wheel diameter in mm. Motor RPM equals V × KV × 0.88; ground speed converts wheel RPM through circumference to km/h—theoretical no-load top speed before rider weight and drag.",
    Illustration: EscooterMaxSpeedGuideIllustration,
  },
  "escooter-hill-climb": {
    calculatorTitle: "E-Scooter Hill Climb Grade Calculator",
    caption:
      "Set nominal voltage (36 / 48 / 52 V), state of charge, motor watts, total mass, and minimum crawl speed. Effective power equals nominal × SOC × voltage efficiency under sag; maximum grade solves P = m·g·sin(θ)·v for sustainable hill climb.",
    Illustration: EscooterHillClimbGuideIllustration,
  },
  "escooter-tire-wear": {
    calculatorTitle: "E-Scooter Tyre Wear Life Calculator",
    caption:
      "Enter weekly distance in km, usable tread depth in mm, and primary surface (smooth, urban mixed, or rough/brick). Kilometres per mm equals 450 divided by the surface wear factor; total tread life in km and weeks equals that rate times tread depth, divided by weekly km.",
    Illustration: EscooterTireWearGuideIllustration,
  },
  "escooter-charge-time": {
    calculatorTitle: "E-Scooter Charge Time Calculator",
    caption:
      "Enter battery watt-hours, pack voltage (36 V or 48 V), charger amps (2 / 3 / 4 A), and charge efficiency (%). Charger watts equals V × A; charge hours equals Wh divided by effective charger power—compare slow overnight bricks versus faster chargers.",
    Illustration: EscooterChargeTimeGuideIllustration,
  },
  "escooter-cost-per-km": {
    calculatorTitle: "E-Scooter Cost per km Calculator",
    caption:
      "Enter Wh/km consumption, electricity rate in $/kWh, weekly commute km, and transit fare per trip. Cost per km equals Wh divided by 1000 times the rate; weekly and annual savings compare scooter electricity spend to an estimated 10-trip transit week.",
    Illustration: EscooterCostPerKmGuideIllustration,
  },
  "escooter-weight-limit": {
    calculatorTitle: "E-Scooter Rider Weight Limit Calculator",
    caption:
      "Enter rider mass (include backpack), manufacturer rated max rider kg, and motor rated watts. Stress factor equals rider divided by rated limit; effective motor load equals stress times rated power—overload kg shows how far you exceed the spec.",
    Illustration: EscooterWeightLimitGuideIllustration,
  },
  "escooter-peak-amps": {
    calculatorTitle: "E-Scooter Peak Discharge Amps Calculator",
    caption:
      "Enter battery voltage, measured peak amps on hard acceleration, controller amp limit, pack amp-hours, and continuous C-rating. Max pack amps equals Ah times C; peak must stay under both controller and pack limits—peak watts equals V times I.",
    Illustration: EscooterPeakAmpsGuideIllustration,
  },
  "escooter-brake-pad-wear": {
    calculatorTitle: "E-Scooter Brake Pad Wear Calculator",
    caption:
      "Enter weekly distance in km, regen braking share (%), and hilly route share (%). Pad life km equals a 1200 km baseline divided by regen and hill wear factors; weeks per pad set equals that distance divided by weekly km.",
    Illustration: EscooterBrakePadWearGuideIllustration,
  },
  "escooter-connector-loss": {
    calculatorTitle: "E-Scooter Connector Power Loss Calculator",
    caption:
      "Enter current draw in amps, connector type (XT30 / XT60 / XT90 with contact resistance in milliohms), and session duration in minutes. Power loss watts equals I squared times R; session waste Wh equals loss power times minutes divided by 60.",
    Illustration: EscooterConnectorLossGuideIllustration,
  },
  "escooter-maintenance-schedule": {
    calculatorTitle: "E-Scooter Maintenance Schedule Calculator",
    caption:
      "Enter current odometer reading and weekly riding distance in km. Kilometres until each service equals the fixed interval minus odometer modulo interval — tyre at 500 km, brake check at 400 km, bolt torque at 200 km. Weeks to tyre service equals next tyre km divided by weekly km.",
    Illustration: EscooterMaintenanceScheduleGuideIllustration,
  },
};

export function hasCalculatorVisualGuide(calculatorId: CalculatorId): boolean {
  return Boolean(CALCULATOR_VISUAL_GUIDES[calculatorId]);
}

export function getCalculatorVisualGuide(
  calculatorId: CalculatorId
): CalculatorVisualGuideConfig | undefined {
  return CALCULATOR_VISUAL_GUIDES[calculatorId];
}
