import type { CalculatorCategory } from "@/data/calculator-types";

export type CategoryHeroNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Hub receives traces from all satellites */
  role: "hub" | "sat";
};

export type CategoryHeroSpec = {
  /** Short schematic caption under the diagram */
  caption: string;
  nodes: CategoryHeroNode[];
};

const HUB = { x: 480, y: 155 } as const;

function hub(label: string, id = "hub"): CategoryHeroNode {
  return { id, label, x: HUB.x, y: HUB.y, role: "hub" };
}

function sat(
  id: string,
  label: string,
  x: number,
  y: number
): CategoryHeroNode {
  return { id, label, x, y, role: "sat" };
}

/**
 * Focused PCB layouts for category landing heroes.
 * Glyph scale stays modest — nodes are labels around a category hub.
 */
export const CATEGORY_HERO_SPECS: Record<CalculatorCategory, CategoryHeroSpec> =
  {
    battery: {
      caption: "Pack energy · charge path · discharge limits",
      nodes: [
        hub("Battery"),
        sat("charge", "Charging", 145, 85),
        sat("runtime", "Runtime", 815, 85),
        sat("soc", "SoC %", 160, 245),
        sat("crate", "C-Rate", 800, 245),
        sat("energy", "Wh / Ah", 480, 48),
      ],
    },
    sizing: {
      caption: "Bank size · inverter headroom · cable ampacity",
      nodes: [
        hub("Sizing"),
        sat("bank", "Bank Ah", 150, 90),
        sat("inv", "Inverter", 810, 90),
        sat("cable", "Cable", 170, 240),
        sat("dod", "DoD", 790, 240),
        sat("parallel", "Parallel", 480, 48),
      ],
    },
    backup: {
      caption: "Critical loads · UPS runtime · outage planning",
      nodes: [
        hub("Backup"),
        sat("ups", "UPS", 150, 90),
        sat("loads", "Critical", 810, 90),
        sat("runtime", "Runtime", 170, 240),
        sat("transfer", "Transfer", 790, 240),
        sat("surge", "Surge", 480, 48),
      ],
    },
    power: {
      caption: "Watts · amps · electrical power math",
      nodes: [
        hub("Power"),
        sat("w", "Watts", 150, 90),
        sat("a", "Amps", 810, 90),
        sat("v", "Volts", 170, 240),
        sat("pf", "PF", 790, 240),
        sat("ohm", "Ohm's Law", 480, 48),
      ],
    },
    solar: {
      caption: "Panels · daily yield · charge control",
      nodes: [
        hub("Solar"),
        sat("panel", "Panels", 150, 90),
        sat("yield", "Yield", 810, 90),
        sat("mppt", "MPPT", 170, 240),
        sat("bank", "Bank", 790, 240),
        sat("sun", "Sun hrs", 480, 48),
      ],
    },
    ev: {
      caption: "Home charging time · cost · range",
      nodes: [
        hub("EV"),
        sat("l2", "Level 2", 150, 90),
        sat("time", "Charge time", 810, 90),
        sat("cost", "Cost / mi", 170, 240),
        sat("range", "Range", 790, 240),
        sat("kwh", "kWh", 480, 48),
      ],
    },
    "commercial-ev": {
      caption: "Fleet · trucks · depot charging",
      nodes: [
        hub("Fleet"),
        sat("truck", "Truck", 150, 90),
        sat("bus", "Bus", 810, 90),
        sat("depot", "Depot", 170, 240),
        sat("tco", "TCO", 790, 240),
        sat("shift", "Shift", 480, 48),
      ],
    },
    ebike: {
      caption: "Range · charge · motor & TCO",
      nodes: [
        hub("E-Bike"),
        sat("range", "Range", 150, 90),
        sat("charge", "Charge", 810, 90),
        sat("motor", "Motor", 170, 240),
        sat("tco", "TCO", 790, 240),
        sat("whkm", "Wh/km", 480, 48),
      ],
    },
    escooter: {
      caption: "Tyre · hill climb · commute Wh",
      nodes: [
        hub("E-Scooter"),
        sat("range", "Range", 150, 90),
        sat("tyre", "Tyre", 810, 90),
        sat("hill", "Hill", 170, 240),
        sat("speed", "Speed", 790, 240),
        sat("wh", "Wh/km", 480, 48),
      ],
    },
    "rv-marine": {
      caption: "RV solar · marine bank · camping loads",
      nodes: [
        hub("RV / Marine"),
        sat("solar", "RV Solar", 150, 90),
        sat("troll", "Trolling", 810, 90),
        sat("fridge", "Fridge", 170, 240),
        sat("inv", "Inverter", 790, 240),
        sat("bank", "Bank", 480, 48),
      ],
    },
    appliance: {
      caption: "Daily cost · monthly kWh · heater / AC",
      nodes: [
        hub("Appliances"),
        sat("daily", "Daily $", 150, 90),
        sat("month", "kWh/mo", 810, 90),
        sat("heat", "Heater", 170, 240),
        sat("ac", "AC", 790, 240),
        sat("wh", "Wh", 480, 48),
      ],
    },
    "green-home": {
      caption: "Envelope · lighting · standby loads",
      nodes: [
        hub("Green Home"),
        sat("insul", "Insulation", 150, 90),
        sat("led", "LED", 810, 90),
        sat("vamp", "Vampire", 170, 240),
        sat("hvac", "HVAC", 790, 240),
        sat("env", "Envelope", 480, 48),
      ],
    },
    pool: {
      caption: "Pump · heat · cover savings",
      nodes: [
        hub("Pool"),
        sat("pump", "Pump", 150, 90),
        sat("heat", "Heat", 810, 90),
        sat("cover", "Cover", 170, 240),
        sat("season", "Season", 790, 240),
        sat("kwh", "kWh", 480, 48),
      ],
    },
    tou: {
      caption: "Peak shaving · arbitrage · demand",
      nodes: [
        hub("TOU"),
        sat("peak", "Peak", 150, 90),
        sat("off", "Off-peak", 810, 90),
        sat("arb", "Arbitrage", 170, 240),
        sat("demand", "Demand", 790, 240),
        sat("shift", "Shift", 480, 48),
      ],
    },
    cost: {
      caption: "Pack pricing · $/kWh · bill impact",
      nodes: [
        hub("Cost"),
        sat("pack", "Pack $", 150, 90),
        sat("kwh", "$/kWh", 810, 90),
        sat("bill", "Bill", 170, 240),
        sat("roi", "ROI", 790, 240),
        sat("capex", "Capex", 480, 48),
      ],
    },
    convert: {
      caption: "Ah · Wh · kVA · unit conversions",
      nodes: [
        hub("Convert"),
        sat("ah", "Ah", 150, 90),
        sat("wh", "Wh", 810, 90),
        sat("kva", "kVA", 170, 240),
        sat("hp", "HP", 790, 240),
        sat("v", "V", 480, 48),
      ],
    },
  };

export function getCategoryHeroSpec(
  category: CalculatorCategory
): CategoryHeroSpec {
  return CATEGORY_HERO_SPECS[category];
}
