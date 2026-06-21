import type { CalculatorId } from "@/lib/calculators";

export type CalculatorShareEntry = {
  title: string;
  description: string;
  /** Path under /public, e.g. /images/share/battery-percentage.webp */
  imageUrl: string;
};

/**
 * Per-calculator share copy and OG preview image.
 * Add a key + image file only — ShareButtons and metadata pick it up automatically.
 * Generated from public/images/share/*.webp via scripts/generate-calculator-share-data.ts
 */
export const calculatorShareData: Partial<
  Record<CalculatorId, CalculatorShareEntry>
> = {
  "ac-inrush-current": {
    title: "AC Inrush Current Limit Calculator",
    description: "Find nominal amps, peak motor inrush, and recommended breaker size with B/C/D curve guidance.",
    imageUrl: "/images/share/ac-inrush-current.webp",
  },
  "amps-to-watts": {
    title: "Amps to Watts Calculator",
    description: "Convert current (amps) and voltage into power (watts).",
    imageUrl: "/images/share/amps-to-watts.webp",
  },
  "battery-bank-size": {
    title: "Battery Bank Size (Ah) Calculator",
    description: "Size a battery bank in amp-hours from load, runtime, and voltage.",
    imageUrl: "/images/share/battery-bank-size.webp",
  },
  "battery-c-rate": {
    title: "Battery C-Rate Calculator",
    description: "Find discharge C-rate and runtime from capacity and load current—updates live.",
    imageUrl: "/images/share/battery-c-rate.webp",
  },
  "battery-calendar-aging": {
    title: "Battery Calendar Aging Calculator",
    description: "Estimate Li-ion capacity fade from storage temperature, average SOC, and pack age—calendar loss % and remaining SoH.",
    imageUrl: "/images/share/battery-calendar-aging.webp",
  },
  "battery-charging-time": {
    title: "Battery Charging Time Calculator",
    description: "Calculate how long it takes to charge a battery at a given current.",
    imageUrl: "/images/share/battery-charging-time.webp",
  },
  "battery-depth-of-discharge": {
    title: "Battery Depth of Discharge Calculator",
    description: "Calculate how much of a battery's capacity has been used (DoD %).",
    imageUrl: "/images/share/battery-depth-of-discharge.webp",
  },
  "battery-efficiency": {
    title: "Battery Efficiency Calculator",
    description: "Calculate round-trip efficiency from energy out and energy in.",
    imageUrl: "/images/share/battery-efficiency.webp",
  },
  "battery-energy": {
    title: "Battery Energy Calculator",
    description: "Calculate battery energy in watt-hours from amp-hours and voltage.",
    imageUrl: "/images/share/battery-energy.webp",
  },
  "battery-percentage": {
    title: "Battery Percentage Calculator",
    description: "Easily calculate your remaining battery life.",
    imageUrl: "/images/share/battery-percentage.webp",
  },
  "battery-runtime": {
    title: "Battery Runtime Calculator",
    description: "Estimate how long a battery lasts at a given power draw.",
    imageUrl: "/images/share/battery-runtime.webp",
  },
  "battery-series-parallel": {
    title: "Battery Series & Parallel Calculator",
    description: "Calculate pack voltage, amp-hours, and watt-hours from series/parallel cell layout.",
    imageUrl: "/images/share/battery-series-parallel.webp",
  },
  "battery-voltage-drop": {
    title: "Battery Voltage Drop Calculator",
    description: "Estimate DC wire voltage drop and voltage at the load from amps, length, and system voltage.",
    imageUrl: "/images/share/battery-voltage-drop.webp",
  },
  "bess-roi": {
    title: "BESS ROI Calculator (Battery Energy Storage System)",
    description: "See if adding battery storage to existing solar pays back from peak vs. off-peak TOU arbitrage—daily savings, payback years, and LCOS.",
    imageUrl: "/images/share/bess-roi.webp",
  },
  "critical-load-analysis": {
    title: "Critical Load Analysis Calculator",
    description: "Plan home backup power by listing essential devices, daily runtime, and target outage hours.",
    imageUrl: "/images/share/critical-load-analysis.webp",
  },
  "dc-cable-size": {
    title: "DC Cable Size Calculator",
    description: "Recommend DC wire gauge from current, one-way length, and system voltage.",
    imageUrl: "/images/share/dc-cable-size.webp",
  },
  "dc-cable-voltage-drop": {
    title: "DC Cable Size & Voltage Drop Calculator",
    description: "Size copper DC homeruns from panels to charge controller—minimum mm² / AWG for amp load, length in meters, and max voltage drop.",
    imageUrl: "/images/share/dc-cable-voltage-drop.webp",
  },
  "ev-battery-degradation": {
    title: "EV Battery Health & Degradation Estimator Calculator",
    description: "Rough state-of-health estimate from age, mileage, and DC fast-charging habits.",
    imageUrl: "/images/share/ev-battery-degradation.webp",
  },
  "ev-battery-depletion-value-loss": {
    title: "EV Battery Depletion & Value Loss Calculator",
    description: "Estimate battery SoH from age, mileage, and DC fast-charging habits—then convert capacity fade to dollar value lost and resale value.",
    imageUrl: "/images/share/ev-battery-depletion-value-loss.webp",
  },
  "ev-battery-range": {
    title: "EV Battery Range Calculator",
    description: "Estimate driving range from battery size, efficiency, and consumption.",
    imageUrl: "/images/share/ev-battery-range.webp",
  },
  "ev-bus-battery": {
    title: "Transit Bus Battery kWh per Mile Calculator",
    description: "Calculate energy intensity from route miles and metered kWh use.",
    imageUrl: "/images/share/ev-bus-battery.webp",
  },
  "ev-charge-time": {
    title: "EV Charge Time Calculator",
    description: "Estimate how long an EV charge takes at a given charger power.",
    imageUrl: "/images/share/ev-charge-time.webp",
  },
  "ev-charging-cable-loss": {
    title: "EV Charging Cable Power Loss Calculator",
    description: "Estimate I²R heat loss in copper charging cables from amps, length, mm² cross-section, and session hours.",
    imageUrl: "/images/share/ev-charging-cable-loss.webp",
  },
  "ev-charging-cost": {
    title: "EV Charging Cost Calculator",
    description: "Estimate home charging cost from energy used and your utility rate.",
    imageUrl: "/images/share/ev-charging-cost.webp",
  },
  "ev-charging-temperature-impact": {
    title: "EV Charging Temperature Impact Calculator",
    description: "See how extreme cold or heat extends DC fast-charge time via BMS thermal limits—base 10–80% time plus added delay.",
    imageUrl: "/images/share/ev-charging-temperature-impact.webp",
  },
  "ev-cost-per-mile": {
    title: "EV Cost Per Mile Calculator",
    description: "Estimate driving cost from electricity rate and energy used per mile.",
    imageUrl: "/images/share/ev-cost-per-mile.webp",
  },
  "ev-delivery-van-efficiency": {
    title: "Delivery Van Stop-and-Go Efficiency Calculator",
    description: "Model urban kWh/mile from highway baseline and stops per mile.",
    imageUrl: "/images/share/ev-delivery-van-efficiency.webp",
  },
  "ev-fast-charging-time": {
    title: "EV DC Fast Charging Calculator (10–80%)",
    description: "Estimate DC fast-charge time with taper above 80% SOC—live as you adjust pack size and charger power.",
    imageUrl: "/images/share/ev-fast-charging-time.webp",
  },
  "ev-fleet-tco": {
    title: "EV Fleet TCO vs. Gas Calculator",
    description: "Compare annual fuel energy cost for gas and electric fleets by mileage.",
    imageUrl: "/images/share/ev-fleet-tco.webp",
  },
  "ev-forklift-runtime": {
    title: "Electric Forklift Shift Runtime Calculator",
    description: "Estimate shift hours from industrial battery Ah, voltage, and average load amps.",
    imageUrl: "/images/share/ev-forklift-runtime.webp",
  },
  "ev-level1-vs-level2": {
    title: "Level 1 vs Level 2 EV Charging Time Calculator",
    description: "Compare how long the same charge takes on Level 1 and Level 2 home charging.",
    imageUrl: "/images/share/ev-level1-vs-level2.webp",
  },
  "ev-preconditioning-cost": {
    title: "EV Battery Pre-conditioning Cost Calculator",
    description: "Estimate electricity cost to heat or cool your pack before DC fast charging—from BMS draw, runtime, and your kWh rate.",
    imageUrl: "/images/share/ev-preconditioning-cost.webp",
  },
  "ev-public-charging-cost": {
    title: "EV Public Charging & Idle Fee Calculator",
    description: "Total session cost including energy, connection fee, and idle penalties—updates live.",
    imageUrl: "/images/share/ev-public-charging-cost.webp",
  },
  "ev-soc-calculator": {
    title: "EV Battery State of Charge (SoC) Calculator",
    description: "Estimate EV pack state of charge from resting voltage using configurable empty and full voltage endpoints.",
    imageUrl: "/images/share/ev-soc-calculator.webp",
  },
  "ev-tire-wear-cost": {
    title: "EV Tire Wear Cost Calculator",
    description: "Estimate annual tire depreciation for electric vehicles vs. comparable gas cars—km driven, set cost, ICE tire life, and EV wear factor.",
    imageUrl: "/images/share/ev-tire-wear-cost.webp",
  },
  "ev-truck-range": {
    title: "EV Truck Range vs. Payload Calculator",
    description: "Estimate how cargo weight reduces electric truck range from rated empty miles.",
    imageUrl: "/images/share/ev-truck-range.webp",
  },
  "ev-vs-gas-savings": {
    title: "EV vs. Gas Car Savings Calculator",
    description: "Compare monthly and yearly fuel costs between gasoline and electric driving.",
    imageUrl: "/images/share/ev-vs-gas-savings.webp",
  },
  "ev-vs-ice-maintenance": {
    title: "EV vs ICE Maintenance Cost Calculator",
    description: "Compare scheduled maintenance for EV vs. gas cars over 5–10 years, including optional battery replacement risk.",
    imageUrl: "/images/share/ev-vs-ice-maintenance.webp",
  },
  "ev-winter-range-loss": {
    title: "EV Winter Range Loss Calculator",
    description: "Estimate cold-weather driving range from EPA rating, temperature, and cabin heat use.",
    imageUrl: "/images/share/ev-winter-range-loss.webp",
  },
  "generator-runtime-savings": {
    title: "Generator Run-Time Savings Calculator",
    description: "Estimate daily engine hours saved with a solar+battery hybrid, maintenance dollars avoided, and longer generator life.",
    imageUrl: "/images/share/generator-runtime-savings.webp",
  },
  "generator-vs-solar-hybrid": {
    title: "Off-Grid Generator vs. Solar Hybrid Calculator",
    description: "Compare 5- and 10-year cumulative costs of diesel generator-only power vs. a solar+battery hybrid—and estimate annual savings.",
    imageUrl: "/images/share/generator-vs-solar-hybrid.webp",
  },
  "home-backup-sizing": {
    title: "Home Backup Battery Sizing Calculator",
    description: "Size a backup battery bank for essential loads, runtime, voltage, and depth of discharge.",
    imageUrl: "/images/share/home-backup-sizing.webp",
  },
  "inverter-loading-curve": {
    title: "Inverter Loading Curve Calculator",
    description: "Estimate overload shutdown time from nominal power, current load, ambient temperature, and manufacturer overload curves.",
    imageUrl: "/images/share/inverter-loading-curve.webp",
  },
  "inverter-loss-calculator": {
    title: "Inverter Loss Calculator",
    description: "Convert DC input watts to AC output and show power lost as heat in the inverter.",
    imageUrl: "/images/share/inverter-loss-calculator.webp",
  },
  "inverter-peak-load-surge": {
    title: "Inverter Peak Load & Surge Calculator",
    description: "Sum motor running watts and staggered surge demand—get continuous load, peak W, and a recommended pure-sine inverter tier.",
    imageUrl: "/images/share/inverter-peak-load-surge.webp",
  },
  "inverter-sizing": {
    title: "Inverter Sizing Calculator",
    description: "Find minimum inverter size from peak load and safety margin.",
    imageUrl: "/images/share/inverter-sizing.webp",
  },
  "ohms-law": {
    title: "Ohm's Law Calculator",
    description: "Find voltage, current, or resistance when you know any two values (V = I × R).",
    imageUrl: "/images/share/ohms-law.webp",
  },
  "power-factor": {
    title: "Power Factor Calculator",
    description: "Calculate power factor from real power (kW) and apparent power (kVA).",
    imageUrl: "/images/share/power-factor.webp",
  },
  "residential-voltage-drop": {
    title: "Residential AC Voltage Drop Calculator",
    description: "Calculate AC voltage drop in home wiring from supply voltage, amps, cable length (m), and AWG or mm² copper size.",
    imageUrl: "/images/share/residential-voltage-drop.webp",
  },
  "solar-angle-optimizer": {
    title: "Solar Panel Angle & Tilt Optimizer Calculator",
    description: "Optimal tilt and azimuth from latitude and season—fixed, summer, or winter mounting.",
    imageUrl: "/images/share/solar-angle-optimizer.webp",
  },
  "solar-array-current": {
    title: "Solar Array Current Calculator",
    description: "Estimate array current from total panel watts and system voltage.",
    imageUrl: "/images/share/solar-array-current.webp",
  },
  "solar-battery-bank": {
    title: "Solar Battery Bank Size Calculator",
    description: "Size an off-grid battery bank from daily use and backup days.",
    imageUrl: "/images/share/solar-battery-bank.webp",
  },
  "solar-charge-controller-size": {
    title: "Solar Charge Controller Size Calculator",
    description: "Estimate minimum charge controller amperage from panel watts and system voltage.",
    imageUrl: "/images/share/solar-charge-controller-size.webp",
  },
  "solar-daily-yield": {
    title: "Solar Daily Yield Calculator",
    description: "Estimate daily energy output from panel wattage and sun hours.",
    imageUrl: "/images/share/solar-daily-yield.webp",
  },
  "solar-degradation-20-year-roi": {
    title: "Solar System Degradation & 20-Year ROI Calculator",
    description: "Model 20 years of declining PV output, rising electricity rates, cumulative savings, and break-even with annual degradation.",
    imageUrl: "/images/share/solar-degradation-20-year-roi.webp",
  },
  "solar-degradation": {
    title: "Solar Panel Degradation Calculator",
    description: "Estimate remaining annual output and capacity after years of panel degradation.",
    imageUrl: "/images/share/solar-degradation.webp",
  },
  "solar-inverter-efficiency": {
    title: "Solar Inverter Efficiency Calculator",
    description: "Calculate inverter efficiency from AC output and DC input power.",
    imageUrl: "/images/share/solar-inverter-efficiency.webp",
  },
  "solar-net-metering": {
    title: "Grid-Tie Net Metering Calculator",
    description: "Compare monthly bills with solar: self-use, export credits, and grid imports.",
    imageUrl: "/images/share/solar-net-metering.webp",
  },
  "solar-panel-size": {
    title: "Solar Panel Size Calculator",
    description: "Estimate minimum panel wattage from daily energy use and sun hours.",
    imageUrl: "/images/share/solar-panel-size.webp",
  },
  "solar-panel-tilt": {
    title: "Solar Panel Tilt Calculator",
    description: "Recommended panel tilt angle based on your latitude (year-round estimate).",
    imageUrl: "/images/share/solar-panel-tilt.webp",
  },
  "solar-payback-roi": {
    title: "Solar Payback Period (ROI) Calculator",
    description: "Estimate payback time and 25-year savings from system cost, production, and electricity rates.",
    imageUrl: "/images/share/solar-payback-roi.webp",
  },
  "solar-roi-analysis": {
    title: "Solar ROI Analysis Calculator",
    description: "Advanced 20-year solar payback with degradation, rate inflation, export credits, incentives, and cumulative savings vs. status quo.",
    imageUrl: "/images/share/solar-roi-analysis.webp",
  },
  "solar-roof-space": {
    title: "Solar Panel Roof Space Calculator",
    description: "Estimate how many panels fit on your roof and total system size in kW—updates live.",
    imageUrl: "/images/share/solar-roof-space.webp",
  },
  "solar-shading-analysis": {
    title: "Solar Shading Analysis Calculator",
    description: "Estimate annual kWh and dollar loss from partial shading on string inverters vs module optimizers.",
    imageUrl: "/images/share/solar-shading-analysis.webp",
  },
  "ups-runtime": {
    title: "UPS Runtime Calculator",
    description: "Estimate backup time from battery energy and load power.",
    imageUrl: "/images/share/ups-runtime.webp",
  },
  "volts-to-watts": {
    title: "Volts to Watts Calculator",
    description: "Convert voltage and current into electrical power in watts.",
    imageUrl: "/images/share/volts-to-watts.webp",
  },
  "water-pump-solar-sizing": {
    title: "Water Pump Solar Sizing Calculator",
    description: "Size a solar array for irrigation or well pumps—kWp, panel count, and MPPT guidance from pump watts, run hours, lift, and peak sun.",
    imageUrl: "/images/share/water-pump-solar-sizing.webp",
  },
  "watts-to-amps": {
    title: "Watts to Amps Calculator",
    description: "Convert electrical power (watts) to current (amps) at a given voltage.",
    imageUrl: "/images/share/watts-to-amps.webp",
  },
  "watts-to-volts": {
    title: "Watts to Volts Calculator",
    description: "Find voltage from power and current (V = W ÷ A).",
    imageUrl: "/images/share/watts-to-volts.webp",
  },
};
