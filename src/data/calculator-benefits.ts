import type { CalculatorSlug } from "@/data/calculators";

/**
 * Plain-English "user utility" line shown on tool cards below the technical
 * description. One short sentence: what the tool helps you figure out and why
 * it matters. Typed against CalculatorSlug so a missing entry fails the build.
 */
export const CALCULATOR_BENEFITS: Record<CalculatorSlug, string> = {
  // Convert
  "ah-to-wh":
    "Use this to find your total battery energy and estimate your ride range.",
  "wh-to-ah":
    "Use this to match a battery's energy rating to the capacity your gear expects.",
  "kva-to-kw":
    "Use this to see how much usable power you really get from a generator or transformer.",
  "conductor-resistance-temperature":
    "Use this to pick wiring that stays efficient even when it runs hot.",
  "reactive-power-calculator":
    "Use this to size inverters and cables correctly for motor-heavy loads.",
  "battery-dod-energy-yield":
    "Use this to know how much backup energy you can actually count on.",
  "kw-to-hp":
    "Use this to compare electric motors with engine power ratings you already know.",

  // Battery
  "battery-percentage":
    "Use this to know exactly how much charge you have left before heading out.",
  "battery-runtime":
    "Use this to plan how long your devices will keep running before a recharge.",
  "battery-charging-time":
    "Use this to plan charging ahead so your battery is full when you need it.",
  "battery-energy":
    "Use this to compare batteries by real stored energy, not just amp-hours.",
  "battery-depth-of-discharge":
    "Use this to avoid deep discharges that shorten your battery's life.",
  "battery-efficiency":
    "Use this to spot energy losses and see how much charging power goes to waste.",
  "battery-series-parallel":
    "Use this to plan a DIY pack layout and hit your target voltage and capacity.",
  "battery-c-rate":
    "Use this to check your battery can handle the load without stress or damage.",
  "inverter-loss-calculator":
    "Use this to see how much battery energy your inverter wastes as heat.",
  "inverter-peak-load-surge":
    "Use this to buy an inverter that won't trip when your appliances start up.",
  "inverter-loading-curve":
    "Use this to know how long you can safely overload your inverter before shutdown.",
  "home-backup-sizing":
    "Use this to size a backup battery that keeps essentials running through an outage.",
  "battery-voltage-drop":
    "Use this to keep your wiring short and thick enough so devices get full power.",
  "battery-calendar-aging":
    "Use this to see how storage habits affect battery health and store packs smarter.",
  "bess-roi":
    "Use this to decide whether adding a home battery will actually pay for itself.",

  // Power
  "watts-to-amps":
    "Use this to check a device won't overload your circuit or blow a fuse.",
  "amps-to-watts":
    "Use this to figure out how much power your gear draws and what it costs to run.",
  "residential-voltage-drop":
    "Use this to make sure far-away outlets still deliver full voltage to your devices.",
  "ohms-law":
    "Use this to fill in the missing electrical value for any circuit you're working on.",
  "volts-to-watts":
    "Use this to work out the real power of any device from its label values.",
  "watts-to-volts":
    "Use this to check what voltage your setup needs to deliver the power you want.",
  "power-factor":
    "Use this to see how efficiently your equipment uses power and avoid utility penalties.",
  "ac-inrush-current":
    "Use this to pick a breaker that won't trip every time your motor starts.",

  // Solar
  "solar-panel-size":
    "Use this to buy the right panel size the first time instead of guessing.",
  "solar-daily-yield":
    "Use this to know how much energy your panels will produce on a typical day.",
  "solar-battery-bank":
    "Use this to size a battery bank that carries you through cloudy days.",
  "solar-charge-controller-size":
    "Use this to pick a charge controller that safely handles your panel output.",
  "solar-inverter-efficiency":
    "Use this to check how much solar power actually reaches your appliances.",
  "solar-array-current":
    "Use this to size your wiring and fuses safely for your solar array.",
  "solar-panel-tilt":
    "Use this to angle your panels for the most energy at your location.",
  "solar-roof-space":
    "Use this to know how big a system your roof can hold before getting quotes.",
  "solar-payback-roi":
    "Use this to see when your solar investment starts making you money.",
  "solar-angle-optimizer":
    "Use this to squeeze more output from your panels with the right tilt each season.",
  "solar-net-metering":
    "Use this to see how much solar exports will shrink your monthly bill.",
  "solar-degradation":
    "Use this to know how much output an aging system still delivers before buying used.",
  "generator-vs-solar-hybrid":
    "Use this to compare long-term costs and pick the cheaper off-grid setup.",
  "generator-runtime-savings":
    "Use this to see how solar cuts generator hours, fuel bills, and maintenance.",
  "water-pump-solar-sizing":
    "Use this to power your well or irrigation pump on solar without oversizing.",
  "dc-cable-voltage-drop":
    "Use this to pick cable sizes that don't waste the solar power you paid for.",
  "solar-degradation-20-year-roi":
    "Use this to see your true 20-year solar returns before signing a contract.",
  "solar-shading-analysis":
    "Use this to know what that tree shadow costs you and whether optimizers are worth it.",
  "solar-roi-analysis":
    "Use this to compare solar quotes with a full 20-year financial picture.",

  // EV Charging
  "ev-charging-cost":
    "Use this to know what each home charge costs and budget your driving.",
  "ev-charge-time":
    "Use this to plan charging so your car is ready when you leave.",
  "ev-cost-per-mile":
    "Use this to compare your driving cost against gas and see the savings.",
  "ev-battery-range":
    "Use this to know how far you can go before needing to plug in.",
  "ev-level1-vs-level2":
    "Use this to decide whether a Level 2 charger upgrade is worth it for you.",
  "ev-vs-ice-maintenance":
    "Use this to see how much you'd save on upkeep by going electric.",
  "ev-fast-charging-time":
    "Use this to plan road-trip stops around realistic fast-charge times.",
  "ev-charging-temperature-impact":
    "Use this to expect longer charge stops in extreme weather and plan around them.",
  "ev-winter-range-loss":
    "Use this to plan winter trips with a realistic cold-weather range.",
  "ev-vs-gas-savings":
    "Use this to see exactly how much switching to electric saves you each month.",
  "ev-battery-degradation":
    "Use this to check a battery's health before buying or selling a used EV.",
  "ev-battery-depletion-value-loss":
    "Use this to put a dollar figure on battery wear when valuing a used EV.",
  "ev-public-charging-cost":
    "Use this to avoid surprise fees and know a session's full cost before plugging in.",
  "ev-preconditioning-cost":
    "Use this to decide if warming your battery before fast charging is worth the cost.",
  "ev-tire-wear-cost":
    "Use this to budget for tires, an EV running cost most owners forget.",
  "ev-charging-cable-loss":
    "Use this to see how much energy a long or thin charging cable wastes as heat.",
  "ev-soc-calculator":
    "Use this to estimate your charge level from a simple voltage reading.",

  // Appliances
  "appliance-daily-cost":
    "Use this to find out what any appliance adds to your daily bill.",
  "appliance-monthly-energy":
    "Use this to spot which devices drive your monthly usage up.",
  "energy-consumption":
    "Use this to forecast usage over any period and catch bill surprises early.",
  "heater-cost":
    "Use this to budget your winter heating before the bills arrive.",
  "ac-energy-cost":
    "Use this to know what summer cooling really costs and plan your usage.",
  "fridge-energy-usage":
    "Use this to see if your old fridge is quietly costing you money.",
  "crypto-mining-power":
    "Use this to check your mining rig is actually profitable after electricity.",
  "vampire-power-cost":
    "Use this to find hidden standby costs and decide what to unplug.",
  "standby-power-waste":
    "Use this to see what always-on devices cost you over a full year.",
  "generator-fuel-consumption":
    "Use this to know how much fuel to stock before an outage or trip.",
  "heat-pump-vs-resistance":
    "Use this to see how much a heat pump would cut your heating bill.",
  "whole-house-energy-budget":
    "Use this to build a full home energy budget and find where to cut costs.",
  "lighting-circuit-load":
    "Use this to add lights safely without overloading the circuit.",
  "ac-inverter-savings":
    "Use this to decide if upgrading to an inverter AC pays off for you.",

  // Battery Sizing
  "battery-bank-size":
    "Use this to buy a battery bank big enough without overspending on capacity.",
  "inverter-sizing":
    "Use this to choose an inverter that handles your loads with room to spare.",
  "dc-cable-size":
    "Use this to pick a wire gauge that's safe and doesn't waste power.",

  // Cost
  "battery-cost":
    "Use this to budget your battery project before comparing sellers.",
  "electricity-bill":
    "Use this to predict your next bill and catch usage creep early.",

  // Backup
  "ups-runtime":
    "Use this to know how long your UPS keeps things alive when the power cuts out.",
  "critical-load-analysis":
    "Use this to plan exactly what stays on during an outage and for how long.",

  // Commercial EV
  "ev-truck-range":
    "Use this to plan routes with a realistic loaded range, not the brochure number.",
  "ev-fleet-tco":
    "Use this to build the business case for electrifying your fleet.",
  "ev-bus-battery":
    "Use this to match battery size to your routes and avoid mid-day charging.",
  "ev-forklift-runtime":
    "Use this to plan charging so forklifts last a full shift.",
  "ev-delivery-van-efficiency":
    "Use this to predict real urban energy use and size your delivery fleet's charging.",

  // RV & Marine
  "rv-solar-calculator":
    "Use this to camp off-grid longer without draining your house battery.",
  "marine-battery-bank":
    "Use this to know how long you can troll before the battery calls it a day.",
  "portable-power-station-recharge":
    "Use this to pick the fastest way to refill your power station on the road.",
  "12v-to-120v-inverter":
    "Use this to check which household devices your inverter can safely run.",
  "camping-fridge-runtime":
    "Use this to know how many days your fridge lasts off battery in hot weather.",

  // TOU
  "tou-shifting-savings":
    "Use this to see how much running appliances off-peak saves you.",
  "demand-charge-calculator":
    "Use this to understand your demand charges and target the peaks that cost most.",
  "v2g-financial-return":
    "Use this to see if selling power back from your EV is worth the wear.",
  "battery-arbitrage-roi":
    "Use this to find out if buying cheap night power to use at peak pays off.",
  "carbon-footprint-offset":
    "Use this to put a real number on the emissions your solar or EV avoids.",
  "grid-frequency-reward":
    "Use this to estimate the extra income your battery could earn from grid programs.",
  "peak-shaving-potential":
    "Use this to see how much shifting your peak usage would cut your bill.",
  "electricity-rate-plan":
    "Use this to pick the rate plan that's actually cheaper for how you live.",

  // Green Home
  "heat-loss-insulation":
    "Use this to find where your home leaks heat and size heating correctly.",
  "home-insulation-savings":
    "Use this to see if an insulation upgrade pays for itself in lower bills.",
  "led-savings-roi":
    "Use this to see how fast swapping one bulb to LED pays back.",
  "led-vs-incandescent-roi":
    "Use this to see the full savings of switching your lighting to LED.",
  "smart-thermostat-savings":
    "Use this to check if a smart thermostat would really lower your bill.",
  "window-solar-heat-gain":
    "Use this to see how much your windows heat the house and add to cooling costs.",
  "microgrid-roi":
    "Use this to see when a solar-plus-storage microgrid starts paying for itself.",
  "bess-carbon-cost":
    "Use this to check your battery setup is helping the climate, not hurting it.",
  "solar-water-heater-efficiency":
    "Use this to see how much a solar water heater cuts your electric heating bill.",
  "small-wind-turbine-yield":
    "Use this to check if your site has enough wind to make a turbine worthwhile.",
  "standby-power-aggregator":
    "Use this to total up your standby waste and see what that money could buy instead.",

  // Pool
  "pool-energy-thermal-cover":
    "Use this to cut pool running costs with the right pump, heater, and cover choices.",

  // E-Bike
  "ebike-range-estimator":
    "Use this to plan rides confidently without fear of running out mid-route.",
  "ebike-charging-cost":
    "Use this to see how little a full charge costs compared to any other commute.",
  "ebike-max-speed":
    "Use this to check what top speed your motor and battery combo can reach.",
  "ebike-charge-time":
    "Use this to know when your bike will be ready for the next ride.",
  "ebike-battery-c-rate":
    "Use this to make sure your battery can feed your motor safely at full power.",
  "ebike-voltage-sag":
    "Use this to understand power drops on climbs and pick a stronger pack layout.",
  "ebike-weight-performance":
    "Use this to see how cargo and hills affect your range before loading up.",
  "ebike-commute-savings":
    "Use this to see how much commuting by e-bike saves you versus car or transit.",
  "ebike-controller-watts":
    "Use this to know the real power your setup delivers and stay within legal limits.",
  "ebike-battery-cycle-life":
    "Use this to see how your charging habits stretch or shorten battery life.",
  "mobility-tco-calculator":
    "Use this to compare the true 3-year cost of car, e-bike, and e-scooter commuting.",

  // E-Scooter
  "escooter-range":
    "Use this to know how far you can still ride before finding a charger.",
  "escooter-tire-pressure":
    "Use this to gain free range just by keeping your tyres properly inflated.",
  "escooter-max-speed":
    "Use this to check the real top speed your scooter setup can deliver.",
  "escooter-hill-climb":
    "Use this to know which hills your scooter can handle before you ride them.",
  "escooter-tire-wear":
    "Use this to plan tyre replacements before wear becomes a safety problem.",
  "escooter-charge-time":
    "Use this to decide if a faster charger is worth it for your routine.",
  "escooter-cost-per-km":
    "Use this to see how cheap scooter commuting really is versus transit fares.",
  "escooter-weight-limit":
    "Use this to check your scooter safely handles your weight plus cargo.",
  "escooter-peak-amps":
    "Use this to avoid cutouts and damage by keeping acceleration within pack limits.",
  "escooter-brake-pad-wear":
    "Use this to replace brake pads on time and keep stopping power safe.",
  "escooter-connector-loss":
    "Use this to pick connectors that stay cool and don't melt under load.",
  "escooter-maintenance-schedule":
    "Use this to stay ahead of maintenance and keep your scooter safe and reliable.",
};

/** Benefit line for one calculator; falls back to empty string defensively. */
export function getCalculatorBenefit(id: CalculatorSlug): string {
  return CALCULATOR_BENEFITS[id] ?? "";
}
