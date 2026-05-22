import { Home, Lamp, LayoutGrid, Thermometer } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateHeatLoss,
  calculateLedRoi,
  calculateThermostatSavings,
  calculateWindowHeatGain,
} from "@/lib/calculators/green-home";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [{ heading, body }, { heading: "Frequently asked questions", body: faq }],
});

export const calculatorsGreenHome = [
  {
    slug: "heat-loss-insulation",
    href: "/heat-loss-insulation",
    title: "Building Heat Loss & Insulation Calculator",
    description: "Estimate heat loss watts from envelope area, ΔT, and R-value.",
    keywords: ["heat loss calculator", "r value heat loss", "building envelope btu"],
    icon: Home,
    tag: "Envelope",
    category: "green-home",
    suggestions: ["heater-cost", "heat-pump-vs-resistance", "smart-thermostat-savings"],
    fields: [
      { id: "wallAreaSqFt", label: "Envelope area", unit: "sq ft", placeholder: "2000" },
      { id: "deltaTempF", label: "Indoor−outdoor ΔT", unit: "°F", placeholder: "40" },
      { id: "rValue", label: "Wall R-value", unit: "R", placeholder: "20" },
    ],
    result: { label: "Heat loss", emptyMessage: "Enter area, ΔT & R-value" },
    seo: seo(
      "Heat loss formula",
      "BTU/hr ≈ (area × ΔT) ÷ R. Convert to watts for electric heat sizing. Add roof, windows, and infiltration separately for full models.",
      "Q: Whole house? A: Sum each surface—this is one envelope segment."
    ),
    compute(values) {
      const a = parsePositive(values.wallAreaSqFt ?? "");
      const d = parsePositive(values.deltaTempF ?? "");
      const r = parsePositive(values.rValue ?? "");
      if (a === null || d === null || r === null) return { value: null };
      const res = calculateHeatLoss({ wallAreaSqFt: a, deltaTempF: d, rValue: r });
      return {
        value: formatNumber(res.kw, { maxDecimals: 2 }),
        unit: "kW",
        detail: `${res.btuPerHour} BTU/hr · ${res.watts} W steady loss`,
      };
    },
  },
  {
    slug: "led-vs-incandescent-roi",
    href: "/led-vs-incandescent-roi",
    title: "LED vs. Incandescent ROI Calculator",
    description: "Energy and bulb replacement savings when matching lumens with lower watts.",
    keywords: ["led vs incandescent savings", "led roi calculator", "light bulb payback"],
    icon: Lamp,
    tag: "Lighting",
    category: "green-home",
    suggestions: ["electricity-bill", "energy-consumption", "standby-power-waste"],
    fields: [
      { id: "bulbCount", label: "Bulbs", unit: "#", placeholder: "20" },
      { id: "incandW", label: "Incandescent W", unit: "W", placeholder: "60" },
      { id: "ledW", label: "LED W", unit: "W", placeholder: "9" },
      { id: "hoursPerDay", label: "Hours / day", unit: "hrs", placeholder: "5" },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
      { id: "ledCost", label: "LED bulb $", unit: "$", placeholder: "4" },
      { id: "incandCost", label: "Incand bulb $", unit: "$", placeholder: "1" },
      { id: "ledLife", label: "LED life", unit: "hrs", placeholder: "15000" },
      { id: "incandLife", label: "Incand life", unit: "hrs", placeholder: "1000" },
    ],
    result: { label: "Annual savings", emptyMessage: "Enter bulbs, watts & rates" },
    seo: seo(
      "LED payback",
      "Savings = reduced kWh × rate + fewer replacements. Match lumens and CRI for fair comparison.",
      "Q: Dimming? A: Use compatible dimmers—non-dim LEDs may fail early."
    ),
    compute(values) {
      const n = parsePositive(values.bulbCount ?? "");
      const iw = parsePositive(values.incandW ?? "");
      const lw = parsePositive(values.ledW ?? "");
      const h = parsePositive(values.hoursPerDay ?? "");
      const rate = parsePositive(values.rate ?? "");
      const lc = parsePositive(values.ledCost ?? "");
      const ic = parsePositive(values.incandCost ?? "");
      const ll = parsePositive(values.ledLife ?? "");
      const il = parsePositive(values.incandLife ?? "");
      if (n === null || iw === null || lw === null || h === null || rate === null || lc === null || ic === null || ll === null || il === null)
        return { value: null };
      const r = calculateLedRoi({
        bulbCount: n,
        incandescentWatts: iw,
        ledWatts: lw,
        hoursPerDay: h,
        ratePerKwh: rate,
        ledBulbCost: lc,
        incandBulbCost: ic,
        ledLifeHours: ll,
        incandLifeHours: il,
      });
      return {
        value: formatCurrency(r.totalAnnualSavings),
        unit: "/yr",
        detail: `Energy ${formatCurrency(r.annualEnergySavings)} · bulbs ${formatCurrency(r.annualBulbSavings)}`,
      };
    },
  },
  {
    slug: "smart-thermostat-savings",
    href: "/smart-thermostat-savings",
    title: "Smart Thermostat Savings Calculator",
    description: "HVAC kWh reduction from setback schedules and seasonal rates.",
    keywords: ["smart thermostat savings", "hvac setback calculator", "nest savings kwh"],
    icon: Thermometer,
    tag: "HVAC",
    category: "green-home",
    suggestions: ["heater-cost", "ac-energy-cost", "heat-pump-vs-resistance"],
    fields: [
      { id: "monthlyKwh", label: "Heating/cooling kWh", unit: "kWh/mo", placeholder: "650" },
      {
        id: "setbackPercent",
        label: "Estimated savings",
        inputType: "range",
        min: 5,
        max: 25,
        step: 1,
        defaultValue: "12",
        unit: "%",
        colSpan: 2,
      },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Monthly savings", emptyMessage: "Enter kWh, setback % & rate" },
    seo: seo(
      "Setback impact",
      "Savings ≈ monthly kWh × setback% × rate. EPA and utility studies often cite 8–15% HVAC reduction with learning thermostats.",
      "Q: Heat pump? A: Yes—savings apply to any electric HVAC kWh."
    ),
    compute(values) {
      const k = parsePositive(values.monthlyKwh ?? "");
      const p = Number(values.setbackPercent?.trim() || "12");
      const rate = parsePositive(values.rate ?? "");
      if (k === null || rate === null || p <= 0) return { value: null };
      const r = calculateThermostatSavings({
        monthlyHeatingKwh: k,
        setbackSavingsPercent: p,
        ratePerKwh: rate,
      });
      return {
        value: formatCurrency(r.monthlySavings),
        unit: "/mo",
        detail: `${r.savedKwh} kWh saved · ${formatCurrency(r.annualSavings)}/yr`,
      };
    },
  },
  {
    slug: "window-solar-heat-gain",
    href: "/window-solar-heat-gain",
    title: "Window Solar Heat Gain (SHGC) Calculator",
    description: "Cooling load from glazing SHGC, area, and sun exposure.",
    keywords: ["shgc calculator", "window heat gain", "solar heat gain cooling load"],
    icon: LayoutGrid,
    tag: "Windows",
    category: "green-home",
    suggestions: ["ac-energy-cost", "heat-loss-insulation", "solar-daily-yield"],
    fields: [
      { id: "windowAreaSqFt", label: "Glass area", unit: "sq ft", placeholder: "120" },
      { id: "shgc", label: "SHGC", unit: "", placeholder: "0.35", hint: "0.2–0.7 typical" },
      { id: "peakSunHours", label: "Sun hours / day", unit: "hrs", placeholder: "6" },
      { id: "coolingCop", label: "AC COP", unit: "", placeholder: "3", defaultValue: "3" },
    ],
    result: { label: "Added cooling load", emptyMessage: "Enter area, SHGC & sun hrs" },
    seo: seo(
      "SHGC effect",
      "Lower SHGC blocks more solar gain—critical on west facades. Model scales with glass area and sunny hours.",
      "Q: Low-E vs tint? A: Compare SHGC and VT ratings on NFRC labels."
    ),
    compute(values) {
      const a = parsePositive(values.windowAreaSqFt ?? "");
      const sh = parsePositive(values.shgc ?? "");
      const sun = parsePositive(values.peakSunHours ?? "");
      const cop = parsePositive(values.coolingCop ?? "");
      if (a === null || sh === null || sun === null || cop === null || sh > 1) return { value: null };
      const r = calculateWindowHeatGain({
        windowAreaSqFt: a,
        shgc: sh,
        peakSunHours: sun,
        coolingCop: cop,
      });
      return {
        value: formatNumber(r.coolingKwh, { maxDecimals: 1 }),
        unit: "kWh/day",
        detail: `${r.dailyBtu} BTU/day gain · ~${r.peakCoolingKw} kW peak cooling`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
