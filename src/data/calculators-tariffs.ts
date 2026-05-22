import { ArrowLeftRight, Battery, Clock, Gauge, Leaf } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateBatteryArbitrage,
  calculateCarbonOffset,
  calculateDemandCharge,
  calculateTouShiftingSavings,
  calculateV2gReturn,
} from "@/lib/calculators/tariffs";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [{ heading, body }, { heading: "Frequently asked questions", body: faq }],
});

export const calculatorsTariffs = [
  {
    slug: "tou-shifting-savings",
    href: "/tou-shifting-savings",
    title: "Time-of-Use Load Shifting Savings",
    description: "Savings from moving kWh from peak to off-peak rate periods.",
    keywords: ["time of use savings", "peak off peak shifting", "tou rate calculator"],
    icon: Clock,
    tag: "TOU",
    category: "tariffs",
    suggestions: ["electricity-bill", "battery-arbitrage-roi", "appliance-daily-cost"],
    fields: [
      { id: "shiftableKwh", label: "Shiftable load", unit: "kWh/mo", placeholder: "350" },
      { id: "peakRate", label: "Peak rate", unit: "$/kWh", placeholder: "0.42" },
      { id: "offPeakRate", label: "Off-peak rate", unit: "$/kWh", placeholder: "0.11" },
    ],
    result: { label: "Monthly savings", emptyMessage: "Enter kWh & rates" },
    seo: seo(
      "TOU shifting",
      "Savings = shiftable kWh × (peak $/kWh − off-peak $/kWh). EV charging and dishwashers are common shift targets.",
      "Q: Include demand charges? A: No—this is energy rate only."
    ),
    compute(values) {
      const k = parsePositive(values.shiftableKwh ?? "");
      const peak = parsePositive(values.peakRate ?? "");
      const off = parsePositive(values.offPeakRate ?? "");
      if (k === null || peak === null || off === null) return { value: null };
      const r = calculateTouShiftingSavings({
        shiftableKwh: k,
        peakRatePerKwh: peak,
        offPeakRatePerKwh: off,
      });
      return {
        value: formatCurrency(r.monthlySavings),
        unit: "/mo",
        detail: `${formatCurrency(r.annualSavings)}/yr · $${r.savingsPerKwh}/kWh spread`,
      };
    },
  },
  {
    slug: "demand-charge-calculator",
    href: "/demand-charge-calculator",
    title: "Commercial Demand Charge Calculator",
    description: "Monthly penalty from peak kW demand and $/kW tariff.",
    keywords: ["demand charge calculator", "peak kw penalty", "commercial demand ratchet"],
    icon: Gauge,
    tag: "Demand",
    category: "tariffs",
    suggestions: ["tou-shifting-savings", "energy-consumption", "electricity-bill"],
    fields: [
      { id: "peakKw", label: "Peak demand", unit: "kW", placeholder: "85" },
      { id: "demandChargePerKw", label: "Demand charge", unit: "$/kW", placeholder: "12" },
    ],
    result: { label: "Monthly demand charge", emptyMessage: "Enter peak kW & rate" },
    seo: seo(
      "Demand charges",
      "Bill adder ≈ peak kW × $/kW. One 15-minute interval can set the whole month—peak shaving and batteries target this.",
      "Q: Same as energy kWh? A: No—demand is power spike billing separate from consumption."
    ),
    compute(values) {
      const kw = parsePositive(values.peakKw ?? "");
      const rate = parsePositive(values.demandChargePerKw ?? "");
      if (kw === null || rate === null) return { value: null };
      const r = calculateDemandCharge({ peakKw: kw, demandChargePerKw: rate });
      return {
        value: formatCurrency(r.monthlyCharge),
        unit: "/mo",
        detail: `${formatCurrency(r.annualCharge)}/yr at ${kw} kW peak`,
      };
    },
  },
  {
    slug: "v2g-financial-return",
    href: "/v2g-financial-return",
    title: "V2G Grid Buyback Revenue Calculator",
    description: "Estimate monthly revenue from bidirectional EV export at utility buyback rates.",
    keywords: ["v2g revenue", "vehicle to grid payment", "ev grid export credit"],
    icon: ArrowLeftRight,
    tag: "V2G",
    category: "tariffs",
    suggestions: ["solar-net-metering", "battery-arbitrage-roi", "ev-charging-cost"],
    fields: [
      { id: "kwhExported", label: "kWh per session", unit: "kWh", placeholder: "15" },
      { id: "buybackRate", label: "Buyback rate", unit: "$/kWh", placeholder: "0.25" },
      { id: "sessionsPerMonth", label: "Sessions / month", unit: "#", placeholder: "12" },
    ],
    result: { label: "Monthly revenue", emptyMessage: "Enter kWh, rate & sessions" },
    seo: seo(
      "V2G economics",
      "Revenue = kWh × buyback $/kWh × sessions. Programs vary—some cap export hours or require utility enrollment.",
      "Q: Battery wear? A: Factor cycle cost—not modeled here."
    ),
    compute(values) {
      const k = parsePositive(values.kwhExported ?? "");
      const r = parsePositive(values.buybackRate ?? "");
      const s = parsePositive(values.sessionsPerMonth ?? "");
      if (k === null || r === null || s === null) return { value: null };
      const res = calculateV2gReturn({
        kwhExportedPerSession: k,
        buybackRatePerKwh: r,
        sessionsPerMonth: s,
      });
      return {
        value: formatCurrency(res.monthlyRevenue),
        unit: "/mo",
        detail: `${formatCurrency(res.annualRevenue)}/yr potential`,
      };
    },
  },
  {
    slug: "battery-arbitrage-roi",
    href: "/battery-arbitrage-roi",
    title: "Home Battery Arbitrage ROI Calculator",
    description: "Profit from charging on cheap night rates and discharging at peak.",
    keywords: ["battery arbitrage", "time of use battery profit", "peak shaving battery roi"],
    icon: Battery,
    tag: "Arbitrage",
    category: "tariffs",
    suggestions: ["tou-shifting-savings", "solar-battery-bank", "battery-cost"],
    fields: [
      { id: "batteryKwh", label: "Usable battery", unit: "kWh", placeholder: "10" },
      { id: "roundTripEff", label: "Round-trip efficiency", unit: "%", placeholder: "90", defaultValue: "90" },
      { id: "nightRate", label: "Night rate", unit: "$/kWh", placeholder: "0.09" },
      { id: "dayRate", label: "Peak day rate", unit: "$/kWh", placeholder: "0.38" },
      { id: "cyclesPerDay", label: "Cycles per day", unit: "#", placeholder: "1" },
    ],
    result: { label: "Estimated daily profit", emptyMessage: "Enter battery & rates" },
    seo: seo(
      "Arbitrage math",
      "Daily $ = kWh × efficiency × (day − night) × cycles. Real programs may limit export power or cycle count.",
      "Q: Include solar? A: This is tariff spread only."
    ),
    compute(values) {
      const k = parsePositive(values.batteryKwh ?? "");
      const eff = parsePositive(values.roundTripEff ?? "");
      const night = parsePositive(values.nightRate ?? "");
      const day = parsePositive(values.dayRate ?? "");
      const c = parsePositive(values.cyclesPerDay ?? "");
      if (k === null || eff === null || night === null || day === null || c === null)
        return { value: null };
      const r = calculateBatteryArbitrage({
        batteryKwh: k,
        roundTripEfficiencyPercent: eff,
        nightRatePerKwh: night,
        dayRatePerKwh: day,
        cyclesPerDay: c,
      });
      return {
        value: formatCurrency(r.dailyProfit),
        unit: "/day",
        detail: `${formatCurrency(r.monthlyProfit)}/mo · ${formatCurrency(r.annualProfit)}/yr`,
      };
    },
  },
  {
    slug: "carbon-footprint-offset",
    href: "/carbon-footprint-offset",
    title: "Solar & EV Carbon Offset Calculator",
    description: "kg CO₂ avoided from clean kWh vs. grid emissions factor.",
    keywords: ["carbon offset calculator", "solar co2 savings", "ev emissions offset"],
    icon: Leaf,
    tag: "Carbon",
    category: "tariffs",
    suggestions: ["solar-daily-yield", "energy-consumption", "ev-cost-per-mile"],
    fields: [
      { id: "cleanKwh", label: "Clean energy used", unit: "kWh", placeholder: "900" },
      {
        id: "gridKgCo2",
        label: "Grid intensity",
        unit: "kg/kWh",
        placeholder: "0.42",
        hint: "EPA eGRID regional avg",
      },
    ],
    result: { label: "CO₂ avoided", emptyMessage: "Enter kWh & grid factor" },
    seo: seo(
      "Offset estimate",
      "kg CO₂ = clean kWh × grid kg/kWh. Solar self-use and EV miles displacing gasoline both count as clean kWh in planning.",
      "Q: Exact lifecycle? A: Planning figure—LCA studies add manufacturing."
    ),
    compute(values) {
      const k = parsePositive(values.cleanKwh ?? "");
      const g = parsePositive(values.gridKgCo2 ?? "");
      if (k === null || g === null) return { value: null };
      const r = calculateCarbonOffset({ cleanKwh: k, gridKgCo2PerKwh: g });
      return {
        value: formatNumber(r.kgCo2Avoided, { maxDecimals: 0 }),
        unit: "kg CO₂",
        detail: `${r.lbsCo2} lbs · ~${r.milesEquivalentCar} mi car-equivalent`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
