import { ArrowRightLeft } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const ahToWhDefinition: CalculatorDefinition = {
  id: "ah-to-wh",
  href: "/ah-to-wh",
  title: "Ah to Wh Converter",
  description: "Convert amp-hours to watt-hours using battery voltage.",
  icon: ArrowRightLeft,
  tag: "Convert",
  category: "convert",
  suggestions: ["wh-to-ah", "battery-runtime", "battery-cost"],
  fields: [
    { id: "ah", label: "Capacity", unit: "Ah", placeholder: "100" },
    { id: "voltage", label: "Voltage", unit: "V", placeholder: "12" },
  ],
  result: {
    label: "Energy capacity",
    emptyMessage: "Enter Ah and voltage",
  },
  seo: {
    sections: [
      {
        heading: "Ah to Wh formula",
        body: "Watt-hours (Wh) measure energy. Multiply amp-hours (Ah) by voltage (V): Wh = Ah × V. For example, a 100 Ah 12 V battery stores 1,200 Wh.",
      },
      {
        heading: "When to use this converter",
        body: "Use this tool when comparing batteries, sizing solar storage, or matching loads rated in watts to a battery rated in amp-hours.",
      },
    ],
  },
  compute(values) {
    const ah = parsePositive(values.ah ?? "");
    const v = parsePositive(values.voltage ?? "");
    if (ah === null || v === null) return { value: null };

    const wh = ah * v;
    return {
      value: formatNumber(wh, { maxDecimals: 2 }),
      unit: "Wh",
      detail: `${formatNumber(ah, { maxDecimals: 1 })} Ah × ${formatNumber(v, { maxDecimals: 1 })} V`,
    };
  },
};
