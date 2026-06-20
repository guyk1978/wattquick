import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators";
import { DcCableSizeGuideIllustration } from "@/components/calculator/visual-guides/dc-cable-size-guide-illustration";
import { BatteryPercentageGuideIllustration } from "@/components/calculator/visual-guides/battery-percentage-guide-illustration";
import { BatteryRuntimeGuideIllustration } from "@/components/calculator/visual-guides/battery-runtime-guide-illustration";
import { BatteryChargingTimeGuideIllustration } from "@/components/calculator/visual-guides/battery-charging-time-guide-illustration";
import { BatteryEnergyGuideIllustration } from "@/components/calculator/visual-guides/battery-energy-guide-illustration";
import { BatteryDepthOfDischargeGuideIllustration } from "@/components/calculator/visual-guides/battery-depth-of-discharge-guide-illustration";
import { BatteryEfficiencyGuideIllustration } from "@/components/calculator/visual-guides/battery-efficiency-guide-illustration";
import { BatterySeriesParallelGuideIllustration } from "@/components/calculator/visual-guides/battery-series-parallel-guide-illustration";
import { BatteryCRateGuideIllustration } from "@/components/calculator/visual-guides/battery-c-rate-guide-illustration";
import { InverterLossGuideIllustration } from "@/components/calculator/visual-guides/inverter-loss-guide-illustration";
import { InverterPeakLoadSurgeGuideIllustration } from "@/components/calculator/visual-guides/inverter-peak-load-surge-guide-illustration";
import { InverterLoadingCurveGuideIllustration } from "@/components/calculator/visual-guides/inverter-loading-curve-guide-illustration";
import { HomeBackupSizingGuideIllustration } from "@/components/calculator/visual-guides/home-backup-sizing-guide-illustration";
import { BatteryVoltageDropGuideIllustration } from "@/components/calculator/visual-guides/battery-voltage-drop-guide-illustration";
import { BatteryCalendarAgingGuideIllustration } from "@/components/calculator/visual-guides/battery-calendar-aging-guide-illustration";
import { BessRoiGuideIllustration } from "@/components/calculator/visual-guides/bess-roi-guide-illustration";
import { EscooterRangeGuideIllustration } from "@/components/calculator/visual-guides/escooter-range-guide-illustration";
import { EbikeRangeGuideIllustration } from "@/components/calculator/visual-guides/ebike-range-guide-illustration";
import { BatteryBankSizeGuideIllustration } from "@/components/calculator/visual-guides/battery-bank-size-guide-illustration";
import { UpsRuntimeGuideIllustration } from "@/components/calculator/visual-guides/ups-runtime-guide-illustration";
import { CriticalLoadAnalysisGuideIllustration } from "@/components/calculator/visual-guides/critical-load-analysis-guide-illustration";
import { WattsToAmpsGuideIllustration } from "@/components/calculator/visual-guides/watts-to-amps-guide-illustration";
import { AmpsToWattsGuideIllustration } from "@/components/calculator/visual-guides/amps-to-watts-guide-illustration";
import { SolarPanelSizeGuideIllustration } from "@/components/calculator/visual-guides/solar-panel-size-guide-illustration";
import { SolarDailyYieldGuideIllustration } from "@/components/calculator/visual-guides/solar-daily-yield-guide-illustration";
import { SolarBatteryBankGuideIllustration } from "@/components/calculator/visual-guides/solar-battery-bank-guide-illustration";
import { RvSolarCalculatorGuideIllustration } from "@/components/calculator/visual-guides/rv-solar-calculator-guide-illustration";
import { MarineBatteryBankGuideIllustration } from "@/components/calculator/visual-guides/marine-battery-bank-guide-illustration";
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
  "amps-to-watts": {
    calculatorTitle: "Amps to Watts",
    caption:
      "Enter current in amps and system voltage. Power in watts equals amps multiplied by volts (W = A × V). Use the result to size batteries, UPS runtime, and inverter loads from measured or nameplate current.",
    Illustration: AmpsToWattsGuideIllustration,
  },
  "solar-panel-size": {
    calculatorTitle: "Solar Panel Size",
    caption:
      "Enter daily energy need in Wh, peak sun hours for your site, and system efficiency (%). Minimum panel watts equals daily Wh divided by sun hours times efficiency—how much harvest window you need to refill the load each day.",
    Illustration: SolarPanelSizeGuideIllustration,
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
  return calculatorId in CALCULATOR_VISUAL_GUIDES;
}
