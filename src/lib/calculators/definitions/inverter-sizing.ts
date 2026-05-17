import { Cpu } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const inverterSizingDefinition: CalculatorDefinition = {
  id: "inverter-sizing",
  href: "/inverter-sizing",
  title: "Inverter Sizing",
  description: "Find minimum inverter size from peak load and safety margin.",
  icon: Cpu,
  tag: "Sizing",
  category: "sizing",
  suggestions: ["battery-bank-size", "watts-to-amps", "ups-runtime"],
  fields: [
    { id: "peakW", label: "Peak load", unit: "W", placeholder: "1800" },
    {
      id: "margin",
      label: "Safety margin",
      unit: "%",
      placeholder: "25",
      defaultValue: "25",
      hint: "Covers surge loads and future expansion",
    },
  ],
  result: {
    label: "Minimum inverter size",
    emptyMessage: "Enter peak load & margin",
  },
  seo: {
    sections: [
      {
        heading: "Inverter sizing formula",
        body: "Inverter W = peak load × (1 + margin ÷ 100). Motors and compressors can draw 2–3× surge at startup—consider a higher margin if you have pumps or fridges.",
      },
      {
        heading: "Continuous vs peak",
        body: "Inverter datasheets list continuous and peak (surge) watts. Size so peak rating covers motor start surges, not just steady-state load.",
      },
    ],
  },
  compute(values) {
    const peakW = parsePositive(values.peakW ?? "");
    const margin = parsePositive(values.margin ?? "");
    if (peakW === null || margin === null) return { value: null };
    const inverterW = peakW * (1 + margin / 100);
    return {
      value: formatNumber(inverterW, { maxDecimals: 0 }),
      unit: "W",
      detail: `${formatNumber(peakW, { maxDecimals: 0 })} W peak + ${margin}% margin`,
    };
  },
};
