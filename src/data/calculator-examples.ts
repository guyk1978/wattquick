import type { CalculatorSlug } from "@/data/calculators";

/**
 * Real-world usage example shown inside the expandable "Example" box on tool
 * cards. Formula: "[Example value] = [Resulting benefit]". The "Real-world
 * example:" label is added by the UI. Typed against CalculatorSlug so a
 * missing entry fails the build.
 */
export const CALCULATOR_EXAMPLES: Record<CalculatorSlug, string> = {
  // Convert
  "ah-to-wh": "A 20 Ah, 48 V e-bike battery = 960 Wh, roughly 40–60 km of range.",
  "wh-to-ah": "A 1,200 Wh power station at 12 V = 100 Ah, matching a typical RV battery.",
  "kva-to-kw": "A 10 kVA generator at 0.8 power factor = 8 kW of real usable power.",
  "conductor-resistance-temperature":
    "50 m of 4 mm² copper at 60 °C = about 0.24 Ω — enough to matter on a 12 V run.",
  "reactive-power-calculator":
    "A 15 kVA motor at 0.85 PF = 12.75 kW real plus ~7.9 kVAR reactive to size for.",
  "battery-dod-energy-yield":
    "A 10 kWh battery at 80% DoD = 8 kWh you can actually use in an outage.",
  "kw-to-hp": "A 75 kW EV motor = about 100 hp, comparable to a compact gas car.",

  // Battery
  "battery-percentage": "48 Ah left of a 60 Ah pack = 80% charge remaining.",
  "battery-runtime":
    "A 1,200 Wh battery running a 100 W TV = about 12 hours of playtime.",
  "battery-charging-time":
    "A 100 Ah battery on a 20 A charger = roughly 5–6 hours to full.",
  "battery-energy":
    "A 100 Ah, 12 V battery = 1,200 Wh — enough to run a fridge overnight.",
  "battery-depth-of-discharge":
    "Using 30 Ah from a 100 Ah pack = 30% DoD, gentle on battery life.",
  "battery-efficiency": "9 kWh out from 10 kWh in = 90% round-trip efficiency.",
  "battery-series-parallel":
    "13S4P of 3.6 V 5 Ah cells = 46.8 V and 20 Ah — a typical e-bike pack.",
  "battery-c-rate":
    "A 20 A draw from a 10 Ah pack = 2C, fine for most lithium cells.",
  "inverter-loss-calculator":
    "1,000 W DC through a 90% inverter = 900 W AC, with 100 W lost as heat.",
  "inverter-peak-load-surge":
    "A fridge plus a well pump starting = ~3,500 W surge, so pick a pure-sine inverter with headroom.",
  "inverter-loading-curve":
    "A 2 kW inverter at 130% load in 30 °C heat = shutdown in about 5 minutes.",
  "home-backup-sizing":
    "600 W of essentials for 10 hours at 80% DoD = about a 7.5 kWh battery bank.",
  "battery-voltage-drop":
    "20 A over 5 m of thin 12 V wire = ~0.5 V lost, leaving your fridge at 11.5 V.",
  "battery-calendar-aging":
    "3 years stored at 25 °C and 60% charge = roughly 6–8% capacity lost to aging alone.",
  "bess-roi":
    "Shifting 8 kWh a day from $0.40 peak to $0.12 off-peak = about $67 saved per month.",

  // Power
  "watts-to-amps":
    "A 1,800 W kettle on 120 V = 15 A — right at the limit of a standard circuit.",
  "amps-to-watts":
    "A 10 A device on 230 V = 2,300 W, about $0.35 per hour at average rates.",
  "residential-voltage-drop":
    "16 A over 25 m of 1.5 mm² wire = ~4% drop, just past the recommended limit.",
  "ohms-law": "12 V across a 6 Ω heater element = 2 A of current.",
  "volts-to-watts": "230 V at 4.3 A = about 1,000 W — a typical microwave.",
  "watts-to-volts":
    "600 W at 5 A = 120 V, confirming a standard US outlet can supply it.",
  "power-factor":
    "8 kW real from 10 kVA apparent = 0.8 power factor, low enough to draw utility penalties.",
  "ac-inrush-current":
    "A 1.5 kW compressor = ~7 A running but 35+ A inrush, so use a C-curve breaker.",

  // Solar
  "solar-panel-size": "3 kWh a day with 4 sun hours = at least 750 W of panels.",
  "solar-daily-yield": "A 400 W panel with 5 sun hours = about 2 kWh per day.",
  "solar-battery-bank":
    "4 kWh a day with 2 backup days = roughly a 10 kWh usable bank.",
  "solar-charge-controller-size":
    "800 W of panels on 24 V = at least a 33 A controller — pick 40 A.",
  "solar-inverter-efficiency":
    "4,600 W AC from 5,000 W DC = 92% inverter efficiency.",
  "solar-array-current":
    "1,200 W of panels at 48 V = 25 A, so size fuses around 30 A.",
  "solar-panel-tilt":
    "Latitude 35° = about a 35° year-round tilt for best average output.",
  "solar-roof-space":
    "40 m² of usable roof = about 20 panels, roughly an 8 kW system.",
  "solar-payback-roi":
    "A $12,000 system saving $1,500 a year = 8-year payback, then pure savings.",
  "solar-angle-optimizer":
    "Latitude 40° in winter = tilt near 55–60° to catch the low sun.",
  "solar-net-metering":
    "900 kWh produced with 40% self-use = a monthly bill cut from $180 to ~$45.",
  "solar-degradation":
    "A 10-year-old 6 kW system at 0.5%/yr = about 5.7 kW of output left.",
  "generator-vs-solar-hybrid":
    "A solar+battery hybrid vs diesel-only = often $15,000+ cheaper over 10 years.",
  "generator-runtime-savings":
    "Solar covering daytime loads = ~6 fewer engine hours a day and hundreds saved on maintenance.",
  "water-pump-solar-sizing":
    "A 750 W pump running 5 hours = about 1.2 kWp of panels with an MPPT controller.",
  "dc-cable-voltage-drop":
    "30 A over 15 m at 48 V with 2% max drop = at least 10 mm² copper.",
  "solar-degradation-20-year-roi":
    "A $14k system fading 0.5%/yr = still ~$30,000 net savings over 20 years.",
  "solar-shading-analysis":
    "20% shading on a string inverter = up to 40% output loss; optimizers cut that roughly in half.",
  "solar-roi-analysis":
    "A $15k system with 3% rate inflation = break-even around year 7 and $35,000+ by year 20.",

  // EV Charging
  "ev-charging-cost": "60 kWh at $0.15/kWh = $9 for a full home charge.",
  "ev-charge-time":
    "A 60 kWh pack on a 7.4 kW charger = about 8 hours, perfect overnight.",
  "ev-cost-per-mile":
    "$0.15/kWh at 0.28 kWh per mile = about 4 cents per mile.",
  "ev-battery-range":
    "A 75 kWh pack at 0.25 kWh/mile = about 300 miles of range.",
  "ev-level1-vs-level2":
    "Adding 40 kWh = ~30 hours on Level 1 but only ~6 hours on Level 2.",
  "ev-vs-ice-maintenance":
    "5 years of servicing = often $4,000+ for gas vs under $1,500 for an EV.",
  "ev-fast-charging-time":
    "A 75 kWh pack on a 150 kW charger = about 30 minutes from 10% to 80%.",
  "ev-charging-temperature-impact":
    "Fast charging at −10 °C = 10–20 extra minutes while the battery warms up.",
  "ev-winter-range-loss":
    "A 300-mile EPA rating at −5 °C with heat on = closer to 210 real miles.",
  "ev-vs-gas-savings":
    "1,200 miles a month = about $50 in electricity vs $160 in gas.",
  "ev-battery-degradation":
    "A 5-year-old EV with 60k miles = typically 88–92% battery health left.",
  "ev-battery-depletion-value-loss":
    "8% capacity fade on a $40k EV = roughly $2,500–3,000 off resale value.",
  "ev-public-charging-cost":
    "40 kWh at $0.45 plus 15 idle minutes = about $23 for the session.",
  "ev-preconditioning-cost":
    "15 minutes of pack heating at 5 kW = about $0.19 — cheap for a faster charge.",
  "ev-tire-wear-cost":
    "15,000 km a year on a heavy EV = about $250–300 a year in tire wear.",
  "ev-charging-cable-loss":
    "32 A through a 10 m cable = tens of watt-hours lost as heat every session.",
  "ev-soc-calculator":
    "A 360 V resting reading on a 300–400 V pack = about 60% charge.",

  // Appliances
  "appliance-daily-cost": "A 1,500 W heater for 4 hours = about $0.90 a day.",
  "appliance-monthly-energy":
    "A 200 W TV for 5 hours a day = 30 kWh a month.",
  "energy-consumption":
    "800 W for 6 hours over 30 days = 144 kWh on your bill.",
  "heater-cost":
    "A 2 kW heater, 5 hours a day all winter = $135+ per month.",
  "ac-energy-cost":
    "A 1,200 W AC running 8 hours a day = about $43 a month.",
  "fridge-energy-usage":
    "A 150 W fridge cycling all day = roughly 1.2 kWh daily, $5–6 a month.",
  "crypto-mining-power":
    "A 900 W rig running 24/7 = 648 kWh and ~$97 a month in power.",
  "vampire-power-cost":
    "10 devices idling at 5 W each = about $65 a year for nothing.",
  "standby-power-waste":
    "A 15 W console on standby 24/7 = 131 kWh a year wasted.",
  "generator-fuel-consumption":
    "A 5 kW generator at half load = about 1 L per hour, so a 20 L tank lasts ~20 hours.",
  "heat-pump-vs-resistance":
    "10 kWh of heat from a COP-3.5 heat pump = one third the cost of resistance strips.",
  "whole-house-energy-budget":
    "Every load summed to 25 kWh a day = about $112 a month before you cut anything.",
  "lighting-circuit-load":
    "12 fixtures at 60 W on a 10 A circuit = 6 A, comfortably under the 80% rule.",
  "ac-inverter-savings":
    "Swapping an on/off AC for inverter = 30–40% lower cooling bills, payback in 2–3 summers.",

  // Battery Sizing
  "battery-bank-size":
    "500 W for 8 hours at 24 V = about a 200 Ah usable bank.",
  "inverter-sizing":
    "A 1,600 W peak load with 25% margin = at least a 2,000 W inverter.",
  "dc-cable-size":
    "40 A over 3 m at 12 V = at least 10 mm² copper to stay safe.",

  // Cost
  "battery-cost": "A 10 kWh pack at $0.30 per Wh = about $3,000.",
  "electricity-bill": "650 kWh at $0.17/kWh = about a $110 monthly bill.",

  // Backup
  "ups-runtime":
    "A 900 Wh UPS running a 150 W server = about 5 hours of backup.",
  "critical-load-analysis":
    "Fridge, router, and lights for 12 hours = about 3.2 kWh of backup to plan for.",

  // Commercial EV
  "ev-truck-range":
    "A 300-mile empty rating with 8 tons of cargo = closer to 210 usable miles.",
  "ev-fleet-tco":
    "20 vans doing 25k miles each = often $60,000+ a year saved on fuel alone.",
  "ev-bus-battery":
    "180 kWh metered over 90 route miles = 2 kWh per mile energy intensity.",
  "ev-forklift-runtime":
    "A 600 Ah, 48 V battery at 75 A average = about 6.5 hours — nearly a full shift.",
  "ev-delivery-van-efficiency":
    "A 0.35 kWh/mile highway baseline with 4 stops per mile = closer to 0.55 kWh/mile in town.",

  // RV & Marine
  "rv-solar-calculator":
    "400 W of roof solar vs 1.5 kWh of daily loads = fully covered on a sunny day.",
  "marine-battery-bank":
    "A 30 A trolling draw on a 100 Ah bank = about 2.5 hours at 80% DoD.",
  "portable-power-station-recharge":
    "A 1,000 Wh station = ~1.5 hours on wall AC but 6+ hours from a car socket.",
  "12v-to-120v-inverter":
    "A 700 W microwave on a 1,000 W inverter = OK, but its 1,400 W surge needs checking.",
  "camping-fridge-runtime":
    "A 45 W fridge at 30 °C ambient = ~50% duty cycle, or 2–3 days on a 100 Ah battery.",

  // TOU
  "tou-shifting-savings":
    "Moving 6 kWh a day from $0.38 to $0.14 = about $43 saved a month.",
  "demand-charge-calculator":
    "A 45 kW monthly peak at $18/kW = an $810 demand charge on top of energy.",
  "v2g-financial-return":
    "Exporting 10 kWh a day at a $0.30 buyback = about $90 a month in revenue.",
  "battery-arbitrage-roi":
    "Charging 10 kWh at $0.10 and using it at $0.35 = about $2.25 profit per day.",
  "carbon-footprint-offset":
    "5,000 clean kWh a year vs a 0.4 kg/kWh grid = 2 tonnes of CO₂ avoided.",
  "grid-frequency-reward":
    "10 kW enrolled for 500 hours a year = often $400–800 in program revenue.",
  "peak-shaving-potential":
    "Shifting 4 kWh of daily peak use = $30–50 off a typical monthly bill.",
  "electricity-rate-plan":
    "60% of usage off-peak = TOU beats flat rate by about $25 a month.",

  // Green Home
  "heat-loss-insulation":
    "150 m² of walls at R-2 with a 20 °C difference = 1,500 W leaking out constantly.",
  "home-insulation-savings":
    "Upgrading R-2 walls to R-4 = roughly 30% off heating and cooling energy.",
  "led-savings-roi":
    "Swapping a 60 W bulb for a 9 W LED = about $10 a year saved, payback in months.",
  "led-vs-incandescent-roi":
    "Ten 60 W bulbs to LED = about $100 a year saved plus far fewer replacements.",
  "smart-thermostat-savings":
    "A 2 °C setback for 8 hours a night = roughly 8–12% off HVAC energy.",
  "window-solar-heat-gain":
    "6 m² of west glass at 0.6 SHGC = ~2 kW of extra cooling load on summer afternoons.",
  "microgrid-roi":
    "A $60k solar-plus-storage microgrid = break-even near year 8 with utility exposure cut.",
  "bess-carbon-cost":
    "10 kWh cycled daily at 88% efficiency on a dirty grid = ~175 kg of CO₂ a year from losses alone.",
  "solar-water-heater-efficiency":
    "A 200 L tank heated 30 °C by sun = about 7 kWh of electricity avoided per day.",
  "small-wind-turbine-yield":
    "A 2 m rotor in 5 m/s average wind = roughly 1–2 kWh per day.",
  "standby-power-aggregator":
    "TV + console + 5 chargers on standby = $80+ a year, a nice dinner out.",

  // Pool
  "pool-energy-thermal-cover":
    "A COP-5 heat pump plus a thermal cover = often 70%+ off pool heating costs.",

  // E-Bike
  "ebike-range-estimator":
    "A 500 Wh pack at mid assist = roughly 45–60 km for an average rider.",
  "ebike-charging-cost":
    "A 500 Wh battery at $0.15/kWh = about 8 cents for a full charge.",
  "ebike-max-speed":
    "A 48 V pack with a fast-wound motor on 27.5″ wheels = a theoretical top near 45 km/h.",
  "ebike-charge-time":
    "A 500 Wh pack on a 2 A (100 W) charger = about 5.5 hours to full.",
  "ebike-battery-c-rate":
    "A 25 A controller on a 14 Ah pack = 1.8C — fine for quality cells.",
  "ebike-voltage-sag":
    "A 13S4P pack under 30 A = about 2–3 V of sag on hard acceleration.",
  "ebike-weight-performance":
    "Adding 15 kg of cargo on hills = roughly 15–20% more energy per km.",
  "ebike-commute-savings":
    "A 10 km daily commute by e-bike = about $15 a year in power vs $1,000+ by car.",
  "ebike-controller-watts":
    "A 22 A controller at 48 V = ~1,050 W input, around 850 W at the wheel.",
  "ebike-battery-cycle-life":
    "Cycling to 50% DoD instead of 90% = roughly 3× more charge cycles.",
  "mobility-tco-calculator":
    "3 years of commuting = often $2,000 by e-bike vs $15,000+ by car.",

  // E-Scooter
  "escooter-range":
    "60% charge on a 48 V, 15 Ah scooter = about 20–25 km left.",
  "escooter-tire-pressure":
    "Riding 15 psi under spec on 10″ tyres = up to 10–15% range lost.",
  "escooter-max-speed":
    "A 52 V pack with typical motor winding on 10″ wheels = a top speed near 50 km/h.",
  "escooter-hill-climb":
    "A 48 V scooter at 40% charge = noticeably less climbing grade from voltage sag.",
  "escooter-tire-wear":
    "80 km a week on rough asphalt = new tyres roughly every 4–5 months.",
  "escooter-charge-time":
    "A 48 V, 15 Ah pack on a 4 A charger = about 4 hours vs 8 on the stock 2 A.",
  "escooter-cost-per-km":
    "$0.15/kWh at ~25 Wh/km = under half a cent per km — far below transit fares.",
  "escooter-weight-limit":
    "A 110 kg rider on a 100 kg-rated deck = ~10% overload and noticeably harder climbs.",
  "escooter-peak-amps":
    "A 65 A acceleration peak on a 13 Ah pack = 5C, so check your cells' rating.",
  "escooter-brake-pad-wear":
    "100 km a week with light regen = mechanical pads lasting roughly 1,500–2,000 km.",
  "escooter-connector-loss":
    "30 A through an XT60 = a couple of watts of heat — fine; the same through XT30 is not.",
  "escooter-maintenance-schedule":
    "120 km a week = tyre checks monthly and brake service roughly every 6 weeks.",
};

/** Usage example for one calculator; falls back to empty string defensively. */
export function getCalculatorExample(id: CalculatorSlug): string {
  return CALCULATOR_EXAMPLES[id] ?? "";
}
