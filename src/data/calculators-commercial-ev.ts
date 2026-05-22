import { Bus, Forklift, Package, Truck, Users } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateBusBatteryKwhPerMile,
  calculateDeliveryVanEfficiency,
  calculateFleetTco,
  calculateForkliftRuntime,
  calculateTruckRange,
} from "@/lib/calculators/commercial-ev";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [
    { heading, body },
    {
      heading: "Frequently asked questions",
      body: faq,
    },
  ],
});

export const calculatorsCommercialEv = [
  {
    slug: "ev-truck-range",
    href: "/ev-truck-range",
    title: "EV Truck Range vs. Payload Calculator",
    description:
      "Estimate how cargo weight reduces electric truck range from rated empty miles.",
    keywords: ["ev truck range payload", "electric truck range loss", "cargo weight ev"],
    icon: Truck,
    tag: "Commercial EV",
    category: "commercial-ev",
    suggestions: ["ev-battery-range", "ev-fleet-tco", "ev-delivery-van-efficiency"],
    fields: [
      { id: "baseRangeMiles", label: "Rated range (empty)", unit: "mi", placeholder: "250" },
      { id: "payloadLbs", label: "Payload weight", unit: "lbs", placeholder: "8000" },
      {
        id: "lossPercentPer100Lbs",
        label: "Range loss per 100 lbs",
        inputType: "range",
        min: 0.5,
        max: 5,
        step: 0.5,
        defaultValue: "2",
        unit: "%",
        colSpan: 2,
      },
    ],
    result: { label: "Adjusted range", emptyMessage: "Enter base range & payload" },
    seo: seo(
      "Payload impact model",
      "Adjusted range ≈ base range × (1 − (payload ÷ 100) × loss% per 100 lbs). Tune loss% from fleet telematics or OEM guidance.",
      "Q: Is loss linear? A: Planning estimate only—steep grades and speed dominate some routes."
    ),
    compute(values) {
      const base = parsePositive(values.baseRangeMiles ?? "");
      const payload = parsePositive(values.payloadLbs ?? "");
      const loss = parsePositive(values.lossPercentPer100Lbs ?? "");
      if (base === null || payload === null || loss === null) return { value: null };
      const r = calculateTruckRange({ baseRangeMiles: base, payloadLbs: payload, lossPercentPer100Lbs: loss });
      return {
        value: formatNumber(r.adjustedRange, { maxDecimals: 0 }),
        unit: "mi",
        detail: `−${r.rangeLossMiles} mi (${r.lossPercent}% loss) at ${formatNumber(payload, { maxDecimals: 0 })} lbs`,
      };
    },
  },
  {
    slug: "ev-fleet-tco",
    href: "/ev-fleet-tco",
    title: "EV Fleet TCO vs. Gas Calculator",
    description: "Compare annual fuel energy cost for gas and electric fleets by mileage.",
    keywords: ["ev fleet tco", "electric fleet vs gas cost", "fleet operating cost"],
    icon: Users,
    tag: "Commercial EV",
    category: "commercial-ev",
    suggestions: ["ev-vs-gas-savings", "ev-cost-per-mile", "ev-truck-range"],
    fields: [
      { id: "vehicleCount", label: "Vehicles", unit: "#", placeholder: "25" },
      { id: "milesPerVehicleYear", label: "Miles per vehicle / yr", unit: "mi", placeholder: "18000" },
      { id: "gasMpg", label: "Gas MPG", unit: "MPG", placeholder: "14" },
      { id: "gasPricePerGallon", label: "Gas price", unit: "$/gal", placeholder: "3.80" },
      { id: "evKwhPerMile", label: "EV efficiency", unit: "kWh/mi", placeholder: "1.6" },
      { id: "electricityRatePerKwh", label: "Electricity rate", unit: "$/kWh", placeholder: "0.12" },
    ],
    result: { label: "Annual fleet savings", emptyMessage: "Enter fleet & fuel data" },
    seo: seo(
      "TCO energy comparison",
      "Gas $ = (vehicles × miles ÷ MPG) × $/gal. EV $ = vehicles × miles × kWh/mi × $/kWh. Excludes purchase price and maintenance.",
      "Q: Include incentives? A: Add separately—this is energy-only."
    ),
    compute(values) {
      const v = parsePositive(values.vehicleCount ?? "");
      const m = parsePositive(values.milesPerVehicleYear ?? "");
      const mpg = parsePositive(values.gasMpg ?? "");
      const gasP = parsePositive(values.gasPricePerGallon ?? "");
      const kwhMi = parsePositive(values.evKwhPerMile ?? "");
      const rate = parsePositive(values.electricityRatePerKwh ?? "");
      if (v === null || m === null || mpg === null || gasP === null || kwhMi === null || rate === null)
        return { value: null };
      const r = calculateFleetTco({
        vehicleCount: v,
        milesPerVehicleYear: m,
        gasMpg: mpg,
        gasPricePerGallon: gasP,
        evKwhPerMile: kwhMi,
        electricityRatePerKwh: rate,
      });
      return {
        value: formatCurrency(r.annualSavings),
        unit: "/yr",
        detail: `Gas ${formatCurrency(r.gasAnnual)} · EV ${formatCurrency(r.evAnnual)} · ${formatCurrency(r.savingsPerVehicle)}/vehicle`,
      };
    },
  },
  {
    slug: "ev-bus-battery",
    href: "/ev-bus-battery",
    title: "Transit Bus Battery kWh per Mile",
    description: "Calculate energy intensity from route miles and metered kWh use.",
    keywords: ["electric bus kwh per mile", "transit bus energy", "city bus battery"],
    icon: Bus,
    tag: "Commercial EV",
    category: "commercial-ev",
    suggestions: ["ev-battery-range", "energy-consumption", "carbon-footprint-offset"],
    fields: [
      { id: "routeMiles", label: "Route distance", unit: "mi", placeholder: "120" },
      { id: "energyUsedKwh", label: "Energy used", unit: "kWh", placeholder: "380" },
    ],
    result: { label: "Energy intensity", emptyMessage: "Enter miles & kWh" },
    seo: seo(
      "kWh per mile",
      "kWh/mi = energy used ÷ route miles. Use BMS or charger meter data including HVAC and aux loads.",
      "Q: Include regen? A: Use net kWh from the meter—regen is already reflected."
    ),
    compute(values) {
      const miles = parsePositive(values.routeMiles ?? "");
      const kwh = parsePositive(values.energyUsedKwh ?? "");
      if (miles === null || kwh === null) return { value: null };
      const r = calculateBusBatteryKwhPerMile({ routeMiles: miles, energyUsedKwh: kwh });
      return {
        value: formatNumber(r.kwhPerMile, { maxDecimals: 2 }),
        unit: "kWh/mi",
        detail: `~${r.dailyKwhAt200Mi} kWh for a 200 mi day at this intensity`,
      };
    },
  },
  {
    slug: "ev-forklift-runtime",
    href: "/ev-forklift-runtime",
    title: "Electric Forklift Shift Runtime Calculator",
    description: "Estimate shift hours from industrial battery Ah, voltage, and average load amps.",
    keywords: ["electric forklift runtime", "forklift battery shift", "warehouse ev forklift"],
    icon: Forklift,
    tag: "Commercial EV",
    category: "commercial-ev",
    suggestions: ["battery-runtime", "battery-c-rate", "ev-charge-time"],
    fields: [
      { id: "capacityAh", label: "Battery capacity", unit: "Ah", placeholder: "750" },
      { id: "voltage", label: "Voltage", unit: "V", placeholder: "80" },
      { id: "averageLoadAmps", label: "Average load", unit: "A", placeholder: "120" },
      {
        id: "usablePercent",
        label: "Usable capacity",
        inputType: "range",
        min: 70,
        max: 95,
        step: 5,
        defaultValue: "85",
        unit: "%",
      },
    ],
    result: { label: "Estimated runtime", emptyMessage: "Enter Ah, V & load amps" },
    seo: seo(
      "Shift runtime",
      "Runtime ≈ (Ah × usable%) ÷ average amps. Peak lifts spike higher—size for worst-case if trips sag voltage.",
      "Q: Lead-acid vs lithium? A: Lithium often allows higher usable % and faster opportunity charging."
    ),
    compute(values) {
      const ah = parsePositive(values.capacityAh ?? "");
      const v = parsePositive(values.voltage ?? "");
      const a = parsePositive(values.averageLoadAmps ?? "");
      const pct = Number(values.usablePercent?.trim() || "85");
      if (ah === null || v === null || a === null || pct <= 0) return { value: null };
      const r = calculateForkliftRuntime({
        capacityAh: ah,
        voltage: v,
        averageLoadAmps: a,
        usablePercent: pct,
      });
      return {
        value: formatNumber(r.runtimeHours, { maxDecimals: 1 }),
        unit: "hours",
        detail: `${r.runtimeMinutes} min · ${r.usableWh} Wh usable`,
      };
    },
  },
  {
    slug: "ev-delivery-van-efficiency",
    href: "/ev-delivery-van-efficiency",
    title: "Delivery Van Stop-and-Go Efficiency",
    description: "Model urban kWh/mile from highway baseline and stops per mile.",
    keywords: ["delivery van ev efficiency", "stop and go ev kwh", "urban courier van"],
    icon: Package,
    tag: "Commercial EV",
    category: "commercial-ev",
    suggestions: ["ev-cost-per-mile", "ev-winter-range-loss", "ev-fleet-tco"],
    fields: [
      { id: "highwayKwhPerMile", label: "Highway baseline", unit: "kWh/mi", placeholder: "0.45" },
      { id: "stopsPerMile", label: "Stops per mile", unit: "/mi", placeholder: "3" },
      {
        id: "stopPenaltyPercent",
        label: "Penalty per stop",
        inputType: "range",
        min: 2,
        max: 15,
        step: 1,
        defaultValue: "5",
        unit: "%",
      },
    ],
    result: { label: "Urban kWh/mile", emptyMessage: "Enter baseline & stops" },
    seo: seo(
      "Urban drain model",
      "Urban kWh/mi = highway kWh/mi × (1 + stops/mi × penalty%). Captures regen limits and idle HVAC between drops.",
      "Q: How to measure baseline? A: Use highway leg of route or OEM combined rating."
    ),
    compute(values) {
      const hw = parsePositive(values.highwayKwhPerMile ?? "");
      const stops = parsePositive(values.stopsPerMile ?? "");
      const pen = parsePositive(values.stopPenaltyPercent ?? "");
      if (hw === null || stops === null || pen === null) return { value: null };
      const r = calculateDeliveryVanEfficiency({
        highwayKwhPerMile: hw,
        stopsPerMile: stops,
        stopPenaltyPercent: pen,
      });
      return {
        value: formatNumber(r.urbanKwhPerMile, { maxDecimals: 2 }),
        unit: "kWh/mi",
        detail: `+${r.increasePercent}% vs highway baseline`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
