import { Car } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const evChargingCostDefinition: CalculatorDefinition = {
  id: "ev-charging-cost",
  href: "/ev-charging-cost",
  title: "EV Charging Cost",
  description: "Estimate home charging cost from energy used and your utility rate.",
  icon: Car,
  tag: "EV",
  category: "ev",
  suggestions: ["ev-charge-time", "appliance-daily-cost", "appliance-monthly-energy"],
  fields: [
    { id: "kwh", label: "Energy delivered", unit: "kWh", placeholder: "60" },
    { id: "rate", label: "Electricity rate", unit: "$/kWh", placeholder: "0.15" },
  ],
  result: {
    label: "Charging cost",
    emptyMessage: "Enter kWh and rate",
  },
  seo: {
    sections: [
      {
        heading: "Cost formula",
        body: "Cost = kWh × $/kWh. Use the kWh drawn from the wall (including charging losses) for the most accurate bill estimate.",
      },
      {
        heading: "Time-of-use rates",
        body: "Many utilities charge less overnight. If your rate varies, run the calculation for off-peak and peak separately.",
      },
    ],
  },
  compute(values) {
    const kwh = parsePositive(values.kwh ?? "");
    const rate = parsePositive(values.rate ?? "");
    if (kwh === null || rate === null) return { value: null };
    const cost = kwh * rate;
    return {
      value: formatCurrency(cost),
      unit: "",
      detail: `${formatNumber(kwh, { maxDecimals: 1 })} kWh × $${formatNumber(rate, { maxDecimals: 3 })}/kWh`,
    };
  },
};
