import { Refrigerator } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const applianceDailyCostDefinition: CalculatorDefinition = {
  id: "appliance-daily-cost",
  href: "/appliance-daily-cost",
  title: "Appliance Daily Cost",
  description: "Calculate daily electricity cost for any appliance from watts and runtime.",
  icon: Refrigerator,
  tag: "Appliance",
  category: "appliance",
  suggestions: ["appliance-monthly-energy", "watts-to-amps", "ev-charging-cost"],
  fields: [
    { id: "watts", label: "Power draw", unit: "W", placeholder: "150" },
    { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "24" },
    { id: "rate", label: "Electricity rate", unit: "$/kWh", placeholder: "0.15" },
  ],
  result: {
    label: "Daily cost",
    emptyMessage: "Enter watts, hours & rate",
  },
  seo: {
    sections: [
      {
        heading: "Daily cost formula",
        body: "kWh per day = (watts × hours) ÷ 1000. Daily cost = kWh × $/kWh. A 150 W device running 24 hours uses 3.6 kWh/day.",
      },
      {
        heading: "Find wattage",
        body: "Check the nameplate, manual, or a plug-in power meter. Compressors and heaters cycle on and off—use average watts for fridges and AC.",
      },
    ],
  },
  compute(values) {
    const watts = parsePositive(values.watts ?? "");
    const hours = parsePositive(values.hours ?? "");
    const rate = parsePositive(values.rate ?? "");
    if (watts === null || hours === null || rate === null) return { value: null };
    const kwh = (watts * hours) / 1000;
    const cost = kwh * rate;
    return {
      value: formatCurrency(cost),
      unit: "/day",
      detail: `${formatNumber(kwh, { maxDecimals: 2 })} kWh/day @ $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
    };
  },
};
