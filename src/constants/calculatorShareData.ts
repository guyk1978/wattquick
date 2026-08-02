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
 * Generated from public/images/share/*.{webp,jpg,jpeg} via scripts/generate-calculator-share-data.ts
 * Prefer regenerating images with: npm run generate:share-images (VIZ Data Flow frames)
 */
export const calculatorShareData: Partial<
  Record<CalculatorId, CalculatorShareEntry>
> = {
  "12v-to-120v-inverter": {
    title: "12V to 120V Inverter Load Planner Calculator",
    description: "Check continuous and surge loads against inverter ratings.",
    imageUrl: "/images/share/12v-to-120v-inverter.webp",
  },
  "ac-energy-cost": {
    title: "Air Conditioner Energy Cost Calculator",
    description: "Estimate monthly AC electricity cost from watts, daily hours, and rate.",
    imageUrl: "/images/share/ac-energy-cost.webp",
  },
  "ac-inrush-current": {
    title: "AC Inrush Current Limit Calculator",
    description: "Find nominal amps, peak motor inrush, and recommended breaker size with B/C/D curve guidance.",
    imageUrl: "/images/share/ac-inrush-current.webp",
  },
  "ac-inverter-savings": {
    title: "AC Efficiency & Inverter Savings Calculator",
    description: "Compare on/off vs. inverter air conditioner monthly electricity cost, energy savings, and purchase payback period.",
    imageUrl: "/images/share/ac-inverter-savings.webp",
  },
  "ah-to-wh": {
    title: "Ah to Wh Converter Calculator",
    description: "Convert amp-hours to watt-hours using battery voltage.",
    imageUrl: "/images/share/ah-to-wh.webp",
  },
  "amps-to-watts": {
    title: "Amps to Watts Calculator",
    description: "Convert current (amps) and voltage into power (watts).",
    imageUrl: "/images/share/amps-to-watts.webp",
  },
  "appliance-daily-cost": {
    title: "Appliance Daily Cost Calculator",
    description: "Calculate daily electricity cost for any appliance from watts and runtime.",
    imageUrl: "/images/share/appliance-daily-cost.webp",
  },
  "appliance-monthly-energy": {
    title: "Appliance Monthly Energy Calculator",
    description: "Convert appliance watts and daily use into monthly kWh.",
    imageUrl: "/images/share/appliance-monthly-energy.webp",
  },
  "battery-arbitrage-roi": {
    title: "Home Battery Arbitrage ROI Calculator",
    description: "Profit from charging on cheap night rates and discharging at peak.",
    imageUrl: "/images/share/battery-arbitrage-roi.webp",
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
  "battery-cost": {
    title: "Battery Cost Estimator Calculator",
    description: "Estimate pack cost from capacity, voltage, and price per watt-hour.",
    imageUrl: "/images/share/battery-cost.webp",
  },
  "battery-depth-of-discharge": {
    title: "Battery Depth of Discharge Calculator",
    description: "Calculate how much of a battery's capacity has been used (DoD %).",
    imageUrl: "/images/share/battery-depth-of-discharge.webp",
  },
  "battery-dod-energy-yield": {
    title: "Battery DoD to Energy Yield Calculator",
    description: "Convert nominal battery capacity and depth of discharge to usable kWh for backup and critical-load planning.",
    imageUrl: "/images/share/battery-dod-energy-yield.webp",
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
  "bess-carbon-cost": {
    title: "BESS Round-trip Carbon Cost Calculator",
    description: "Estimate annual kg CO₂ from battery round-trip conversion losses and compare grid charging vs. renewable charging.",
    imageUrl: "/images/share/bess-carbon-cost.webp",
  },
  "bess-roi": {
    title: "BESS ROI Calculator (Battery Energy Storage System)",
    description: "See if adding battery storage to existing solar pays back from peak vs. off-peak TOU arbitrage—daily savings, payback years, and LCOS.",
    imageUrl: "/images/share/bess-roi.webp",
  },
  "camping-fridge-runtime": {
    title: "12V Camping Fridge Runtime Calculator",
    description: "Ambient temperature effect on compressor duty cycle and battery days.",
    imageUrl: "/images/share/camping-fridge-runtime.webp",
  },
  "carbon-footprint-offset": {
    title: "Solar & EV Carbon Offset Calculator",
    description: "kg CO₂ avoided from clean kWh vs. grid emissions factor.",
    imageUrl: "/images/share/carbon-footprint-offset.webp",
  },
  "commercial-ev-planner": {
    title: "Commercial EV Fleet Range Planner Calculator",
    description: "Plan real-world commercial EV range under payload, refrigeration aux loads, route duty, tire wear, and diesel cost comparison.",
    imageUrl: "/images/share/commercial-ev-planner.webp",
  },
  "conductor-resistance-temperature": {
    title: "Conductor Resistance & Temperature Calculator",
    description: "Calculate copper or aluminum conductor resistance from cross-section, length, and operating temperature.",
    imageUrl: "/images/share/conductor-resistance-temperature.webp",
  },
  "critical-load-analysis": {
    title: "Critical Load Analysis Calculator",
    description: "Plan home backup power by listing essential devices, daily runtime, and target outage hours.",
    imageUrl: "/images/share/critical-load-analysis.webp",
  },
  "crypto-mining-power": {
    title: "Crypto Mining Power Calculator",
    description: "Estimate kWh and electricity cost for GPU/ASIC rigs by wattage and run hours.",
    imageUrl: "/images/share/crypto-mining-power.webp",
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
  "demand-charge-calculator": {
    title: "Commercial Demand Charge Calculator",
    description: "Monthly penalty from peak kW demand and $/kW tariff.",
    imageUrl: "/images/share/demand-charge-calculator.webp",
  },
  "ebike-battery-c-rate": {
    title: "E-Bike Battery C-Rating Calculator",
    description: "Check whether your pack can safely deliver the continuous current your motor demands.",
    imageUrl: "/images/share/ebike-battery-c-rate.webp",
  },
  "ebike-battery-cycle-life": {
    title: "E-Bike Battery Cycle Life Calculator",
    description: "Estimate remaining cycle life using k × DOD⁻¹·⁵ decay and manufacturer 80% SOH ratings.",
    imageUrl: "/images/share/ebike-battery-cycle-life.webp",
  },
  "ebike-charge-time": {
    title: "E-Bike Charge Time Calculator",
    description: "Estimate 0–100% charge duration from pack capacity, charger wattage, and charge efficiency.",
    imageUrl: "/images/share/ebike-charge-time.webp",
  },
  "ebike-charging-cost": {
    title: "E-Bike Full Charge Cost Calculator",
    description: "Calculate the cost of a full battery charge from pack capacity and your home electricity rate.",
    imageUrl: "/images/share/ebike-charging-cost.webp",
  },
  "ebike-commute-savings": {
    title: "E-Bike Commute Savings Calculator",
    description: "Compare annual commuting cost: e-bike electricity vs car per-km vs public transit fares.",
    imageUrl: "/images/share/ebike-commute-savings.webp",
  },
  "ebike-controller-watts": {
    title: "E-Bike Controller Amps to Watts Calculator",
    description: "Convert controller current draw to motor input and shaft power at different battery voltages.",
    imageUrl: "/images/share/ebike-controller-watts.webp",
  },
  "ebike-max-speed": {
    title: "E-Bike Max Speed Calculator",
    description: "Estimate theoretical top speed from battery voltage, motor KV rating, and wheel diameter.",
    imageUrl: "/images/share/ebike-max-speed.webp",
  },
  "ebike-range-estimator": {
    title: "E-Bike Range Estimator Calculator",
    description: "Physics-based range estimate from battery Wh, assist level, rider weight, and wind/terrain factors.",
    imageUrl: "/images/share/ebike-range-estimator.webp",
  },
  "ebike-range-performance": {
    title: "E-Bike Range & Performance Calculator",
    description: "Estimate real-world e-bike range, PAS modes, speed profiles, and component lifespan from motor, battery, tires, controller, rider, and terrain.",
    imageUrl: "/images/share/ebike-range-performance.webp",
  },
  "ebike-voltage-sag": {
    title: "E-Bike Voltage Sag Calculator",
    description: "Calculate dynamic voltage sag from cell resistance, S×P pack layout, and max controller current.",
    imageUrl: "/images/share/ebike-voltage-sag.webp",
  },
  "ebike-weight-performance": {
    title: "E-Bike Weight vs Performance Calculator",
    description: "See how total mass (rider + bike + cargo) and terrain affect energy use and range.",
    imageUrl: "/images/share/ebike-weight-performance.webp",
  },
  "electricity-bill": {
    title: "Electricity Bill Estimator Calculator",
    description: "Estimate your bill from total kWh usage and rate per kWh.",
    imageUrl: "/images/share/electricity-bill.webp",
  },
  "electricity-rate-plan": {
    title: "Electricity Rate Plan Calculator (TOU vs Flat)",
    description: "Compare flat-rate vs. time-of-use monthly bills from your kWh split and peak, shoulder, and off-peak tariffs—see annual savings.",
    imageUrl: "/images/share/electricity-rate-plan.webp",
  },
  "energy-consumption": {
    title: "Energy Consumption Calculator",
    description: "Estimate total kWh from watts, hours per day, and number of days.",
    imageUrl: "/images/share/energy-consumption.webp",
  },
  "escooter-brake-pad-wear": {
    title: "E-Scooter Brake Pad Wear Calculator",
    description: "Pad life in km from regen share, hill riding, and weekly distance.",
    imageUrl: "/images/share/escooter-brake-pad-wear.webp",
  },
  "escooter-charge-time": {
    title: "E-Scooter Charge Time Calculator",
    description: "Compare 2 A / 3 A / 4 A charger times for typical 36 V and 48 V packs.",
    imageUrl: "/images/share/escooter-charge-time.webp",
  },
  "escooter-connector-loss": {
    title: "E-Scooter Connector Power Loss Calculator",
    description: "I²R heat at XT30/XT60/XT90 pairs under ride and charge current.",
    imageUrl: "/images/share/escooter-connector-loss.webp",
  },
  "escooter-cost-per-km": {
    title: "E-Scooter Cost per km Calculator",
    description: "Electricity cost per km versus public transit for commute planning.",
    imageUrl: "/images/share/escooter-cost-per-km.webp",
  },
  "escooter-hill-climb": {
    title: "E-Scooter Hill Climb Grade Calculator",
    description: "Maximum climb grade with dynamic SOC (20–100 %) and voltage sag torque drop at 36 / 48 / 52 V.",
    imageUrl: "/images/share/escooter-hill-climb.webp",
  },
  "escooter-maintenance-schedule": {
    title: "E-Scooter Maintenance Schedule Calculator",
    description: "Km and weeks until tyre, brake, and bolt-torque service intervals.",
    imageUrl: "/images/share/escooter-maintenance-schedule.webp",
  },
  "escooter-max-speed": {
    title: "E-Scooter Max Speed Calculator",
    description: "Theoretical top speed from voltage, motor KV, and wheel diameter.",
    imageUrl: "/images/share/escooter-max-speed.webp",
  },
  "escooter-peak-amps": {
    title: "E-Scooter Peak Discharge Amps Calculator",
    description: "Check acceleration peaks against controller and pack C-rating.",
    imageUrl: "/images/share/escooter-peak-amps.webp",
  },
  "escooter-range": {
    title: "E-Scooter Range Calculator",
    description: "Estimate remaining range with SOC slider, tyre pressure, and voltage sag at 36 / 48 / 52 V.",
    imageUrl: "/images/share/escooter-range.webp",
  },
  "escooter-range-performance": {
    title: "E-Scooter Range & Performance Calculator",
    description: "Estimate real-world e-scooter range, speed on hills, and component lifespan from motor, battery, tires, controller, rider, and terrain.",
    imageUrl: "/images/share/escooter-range-performance.webp",
  },
  "escooter-tire-pressure": {
    title: "E-Scooter Tyre Pressure & Rolling Resistance Calculator",
    description: "See how under-inflation on 8–10″ wheels raises Wh/km and cuts range.",
    imageUrl: "/images/share/escooter-tire-pressure.webp",
  },
  "escooter-tire-wear": {
    title: "E-Scooter Tyre Wear Life Calculator",
    description: "Estimate tread life in km and weeks from weekly distance and surface type.",
    imageUrl: "/images/share/escooter-tire-wear.webp",
  },
  "escooter-weight-limit": {
    title: "E-Scooter Rider Weight Limit Calculator",
    description: "Stress factor on motor and deck when exceeding rated rider mass.",
    imageUrl: "/images/share/escooter-weight-limit.webp",
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
  "fridge-energy-usage": {
    title: "Refrigerator Energy Usage Calculator",
    description: "Estimate refrigerator kWh and cost from wattage and electricity rate.",
    imageUrl: "/images/share/fridge-energy-usage.webp",
  },
  "generator-fuel-consumption": {
    title: "Generator Fuel Consumption Calculator",
    description: "Estimate fuel use per hour and runtime from tank size at your load level.",
    imageUrl: "/images/share/generator-fuel-consumption.webp",
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
  "grid-frequency-reward": {
    title: "Grid Frequency Response Reward Calculator",
    description: "Estimate monthly and annual revenue from battery or DER frequency-response programs—capacity kW, participation hours, and availability.",
    imageUrl: "/images/share/grid-frequency-reward.webp",
  },
  "heat-loss-insulation": {
    title: "Building Heat Loss & Insulation Calculator",
    description: "Estimate heat loss watts from envelope area, ΔT, and R-value.",
    imageUrl: "/images/share/heat-loss-insulation.webp",
  },
  "heat-pump-vs-resistance": {
    title: "Heat Pump vs. Resistance Heat Calculator",
    description: "Compare electric heating cost: resistance strips (COP 1) vs. heat pump COP.",
    imageUrl: "/images/share/heat-pump-vs-resistance.webp",
  },
  "heater-cost": {
    title: "Electric Heater Cost Calculator",
    description: "Estimate heating cost from wattage, run hours, days, and electricity rate.",
    imageUrl: "/images/share/heater-cost.webp",
  },
  "home-backup-sizing": {
    title: "Home Backup Battery Sizing Calculator",
    description: "Size a backup battery bank for essential loads, runtime, voltage, and depth of discharge.",
    imageUrl: "/images/share/home-backup-sizing.webp",
  },
  "home-insulation-savings": {
    title: "Home Insulation Savings Calculator",
    description: "Estimate annual heating and cooling savings from upgrading wall insulation and windows—before/after energy use and efficiency score.",
    imageUrl: "/images/share/home-insulation-savings.webp",
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
  "kva-to-kw": {
    title: "kVA to kW Converter Calculator",
    description: "Convert apparent power (kVA) to real power (kW) using power factor.",
    imageUrl: "/images/share/kva-to-kw.webp",
  },
  "kw-to-hp": {
    title: "kW to HP Converter Calculator",
    description: "Convert kilowatts to mechanical horsepower instantly.",
    imageUrl: "/images/share/kw-to-hp.webp",
  },
  "led-savings-roi": {
    title: "LED Savings & ROI Calculator",
    description: "Compare legacy bulb vs. LED costs, CO₂ savings, and payback time for a single fixture.",
    imageUrl: "/images/share/led-savings-roi.webp",
  },
  "led-vs-incandescent-roi": {
    title: "LED vs. Incandescent ROI Calculator",
    description: "Energy and bulb replacement savings when matching lumens with lower watts.",
    imageUrl: "/images/share/led-vs-incandescent-roi.webp",
  },
  "lighting-circuit-load": {
    title: "Lighting Circuit Load Calculator",
    description: "Sum fixture watts, compute circuit amps, and check breaker utilization against the 80% continuous-load guideline.",
    imageUrl: "/images/share/lighting-circuit-load.webp",
  },
  "marine-battery-bank": {
    title: "Marine Trolling Motor Runtime Calculator",
    description: "Continuous amp draw vs. bank Ah for trolling and house loads.",
    imageUrl: "/images/share/marine-battery-bank.webp",
  },
  "microgrid-roi": {
    title: "Microgrid ROI Calculator",
    description: "Break-even timeline and 10–20 year returns for solar, storage, and on-site generation microgrids.",
    imageUrl: "/images/share/microgrid-roi.webp",
  },
  "mobility-tco-calculator": {
    title: "Mobility TCO Calculator",
    description: "Compare 3-year total cost of ownership: car vs e-bike vs e-scooter for commuting and urban mobility.",
    imageUrl: "/images/share/mobility-tco-calculator.webp",
  },
  "ohms-law": {
    title: "Ohm's Law Calculator",
    description: "Find voltage, current, or resistance when you know any two values (V = I × R).",
    imageUrl: "/images/share/ohms-law.webp",
  },
  "peak-shaving-potential": {
    title: "Peak Shaving Potential Calculator",
    description: "Estimate monthly and annual TOU savings from shifting peak kWh to off-peak—compare bills before and after load shifting.",
    imageUrl: "/images/share/peak-shaving-potential.webp",
  },
  "pool-energy-thermal-cover": {
    title: "Pool Energy Cost & Thermal Cover Savings Calculator",
    description: "Pool pump and heating cost by technology (resistance vs. heat pump COP) plus thermal cover savings on evaporation load.",
    imageUrl: "/images/share/pool-energy-thermal-cover.webp",
  },
  "portable-power-station-recharge": {
    title: "Portable Power Station Recharge Times Calculator",
    description: "Compare wall AC, car 12V, and solar MPPT hours to refill Wh capacity.",
    imageUrl: "/images/share/portable-power-station-recharge.webp",
  },
  "power-factor": {
    title: "Power Factor Calculator",
    description: "Calculate power factor from real power (kW) and apparent power (kVA).",
    imageUrl: "/images/share/power-factor.webp",
  },
  "power-station-planner": {
    title: "Portable Power Station & RV Off-Grid Energy Planner Calculator",
    description: "Plan camping and RV energy: daily Wh balance, off-grid autonomy days, solar and alternator recharge, and appliance surge limits.",
    imageUrl: "/images/share/power-station-planner.webp",
  },
  "reactive-power-calculator": {
    title: "Reactive Power & Power Factor Calculator",
    description: "Convert kVA to real kW and reactive kVAR for motor and driver loads—plan inverter and conductor sizing.",
    imageUrl: "/images/share/reactive-power-calculator.webp",
  },
  "residential-voltage-drop": {
    title: "Residential AC Voltage Drop Calculator",
    description: "Calculate AC voltage drop in home wiring from supply voltage, amps, cable length (m), and AWG or mm² copper size.",
    imageUrl: "/images/share/residential-voltage-drop.webp",
  },
  "rv-solar-calculator": {
    title: "RV Solar & House Battery Calculator",
    description: "Match rooftop panel yield to daily 12V/24V loads and bank Ah shortfall.",
    imageUrl: "/images/share/rv-solar-calculator.webp",
  },
  "small-wind-turbine-yield": {
    title: "Small Wind Turbine Yield Calculator",
    description: "Estimate rotor power (W), daily kWh, and annual energy from blade diameter, average wind speed, and system efficiency.",
    imageUrl: "/images/share/small-wind-turbine-yield.webp",
  },
  "smart-thermostat-savings": {
    title: "Smart Thermostat Savings Calculator",
    description: "HVAC kWh reduction from setback schedules and seasonal rates.",
    imageUrl: "/images/share/smart-thermostat-savings.webp",
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
  "solar-backup-calculator": {
    title: "Home Solar Backup & UPS Energy Storage Calculator",
    description: "Calculate blackout backup hours, inverter surge limits, battery degradation, and peak shaving savings for home energy storage.",
    imageUrl: "/images/share/solar-backup-calculator.webp",
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
  "solar-degradation": {
    title: "Solar Panel Degradation Calculator",
    description: "Estimate remaining annual output and capacity after years of panel degradation.",
    imageUrl: "/images/share/solar-degradation.webp",
  },
  "solar-degradation-20-year-roi": {
    title: "Solar System Degradation & 20-Year ROI Calculator",
    description: "Model 20 years of declining PV output, rising electricity rates, cumulative savings, and break-even with annual degradation.",
    imageUrl: "/images/share/solar-degradation-20-year-roi.webp",
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
  "solar-water-heater-efficiency": {
    title: "Solar Water Heater Efficiency Calculator",
    description: "Estimate thermal efficiency, absorbed kWh, and electric heating savings from tank volume, ΔT, sun hours, and collector area.",
    imageUrl: "/images/share/solar-water-heater-efficiency.webp",
  },
  "standby-power-aggregator": {
    title: "Standby Power Aggregator Calculator",
    description: "Add TVs, chargers, consoles, and adapters to see total vampire power cost and what you could buy instead.",
    imageUrl: "/images/share/standby-power-aggregator.webp",
  },
  "standby-power-waste": {
    title: "Standby Power Waste Calculator",
    description: "Quantify phantom load cost from devices left plugged in 24/7 on standby.",
    imageUrl: "/images/share/standby-power-waste.webp",
  },
  "tou-shifting-savings": {
    title: "Time-of-Use Load Shifting Savings Calculator",
    description: "Savings from moving kWh from peak to off-peak rate periods.",
    imageUrl: "/images/share/tou-shifting-savings.webp",
  },
  "ups-runtime": {
    title: "UPS Runtime Calculator",
    description: "Estimate backup time from battery energy and load power.",
    imageUrl: "/images/share/ups-runtime.webp",
  },
  "v2g-financial-return": {
    title: "V2G Grid Buyback Revenue Calculator",
    description: "Estimate monthly revenue from bidirectional EV export at utility buyback rates.",
    imageUrl: "/images/share/v2g-financial-return.webp",
  },
  "vampire-power-cost": {
    title: "Vampire Power Cost Calculator",
    description: "Estimate yearly electricity cost for TVs, chargers, and other devices drawing power in standby.",
    imageUrl: "/images/share/vampire-power-cost.webp",
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
  "wh-to-ah": {
    title: "Wh to Ah Converter Calculator",
    description: "Convert watt-hours to amp-hours using system voltage.",
    imageUrl: "/images/share/wh-to-ah.webp",
  },
  "whole-house-energy-budget": {
    title: "Whole House Energy Budget Calculator",
    description: "Sum daily kWh by category and estimate monthly and annual electricity cost.",
    imageUrl: "/images/share/whole-house-energy-budget.webp",
  },
  "window-solar-heat-gain": {
    title: "Window Solar Heat Gain (SHGC) Calculator",
    description: "Cooling load from glazing SHGC, area, and sun exposure.",
    imageUrl: "/images/share/window-solar-heat-gain.webp",
  },
};
