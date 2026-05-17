import { DollarSign } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const batteryCostDefinition: CalculatorDefinition = {
  id: "battery-cost",
  href: "/battery-cost",
  title: "Battery Cost Estimator",
  description: "Estimate pack cost from capacity, voltage, and price per watt-hour.",
  icon: DollarSign,
  tag: "Cost",
  category: "cost",
  suggestions: ["ah-to-wh", "battery-charging-time", "solar-panel-size"],
  fields: [
    { id: "ah", label: "Capacity", unit: "Ah", placeholder: "100" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
    {
      id: "pricePerWh",
      label: "Price per Wh",
      unit: "$/Wh",
      placeholder: "0.15",
      hint: "Typical LiFePO4 packs: $0.10–$0.25/Wh",
    },
  ],
  result: {
    label: "Estimated cost",
    emptyMessage: "Enter Ah, voltage & $/Wh",
  },
  seo: {
    sections: [
      {
        heading: "Cost calculation",
        body: "Total cost = Ah × V × price per Wh. Energy (Wh) equals amp-hours times voltage, so you can compare packs of different voltages fairly.",
      },
      {
        heading: "Compare battery deals",
        body: "Divide pack price by rated Wh to get $/Wh. Lower is generally better, but consider cycle life, warranty, and BMS quality—not just upfront cost.",
      },
    ],
  },
  compute(values) {
    const ah = parsePositive(values.ah ?? "");
    const v = parsePositive(values.voltage ?? "");
    const price = parsePositive(values.pricePerWh ?? "");
    if (ah === null || v === null || price === null) return { value: null };

    const wh = ah * v;
    const cost = wh * price;
    return {
      value: formatCurrency(cost),
      unit: "",
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh × $${formatNumber(price, { maxDecimals: 2 })}/Wh`,
    };
  },
};
