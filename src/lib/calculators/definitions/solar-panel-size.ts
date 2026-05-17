import { Sun } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const solarPanelSizeDefinition: CalculatorDefinition = {
  id: "solar-panel-size",
  href: "/solar-panel-size",
  title: "Solar Panel Size",
  description:
    "Estimate minimum panel wattage from daily energy use and sun hours.",
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["battery-runtime", "battery-cost", "ah-to-wh"],
  fields: [
    {
      id: "dailyWh",
      label: "Daily energy need",
      unit: "Wh/day",
      placeholder: "2400",
    },
    {
      id: "sunHours",
      label: "Peak sun hours",
      unit: "hrs",
      placeholder: "5",
      hint: "Average full-sun equivalent hours for your location",
    },
    {
      id: "efficiency",
      label: "System efficiency",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
    },
  ],
  result: {
    label: "Minimum panel size",
    emptyMessage: "Enter daily use, sun hours & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "How this estimate works",
        body: "Panel watts ≈ daily Wh ÷ (peak sun hours × efficiency). Peak sun hours depend on location and season—typical values range from 3–6 hours.",
      },
      {
        heading: "Add margin for real installs",
        body: "Real systems need extra capacity for cloudy days, battery losses, and inverter efficiency. Treat this result as a starting point, then add 20–30% headroom.",
      },
    ],
  },
  compute(values) {
    const dailyWh = parsePositive(values.dailyWh ?? "");
    const sunHours = parsePositive(values.sunHours ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (dailyWh === null || sunHours === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }

    const panelW = dailyWh / (sunHours * (efficiency / 100));
    return {
      value: formatNumber(panelW, { maxDecimals: 0 }),
      unit: "W",
      detail: `${formatNumber(dailyWh, { maxDecimals: 0 })} Wh/day · ${formatNumber(sunHours, { maxDecimals: 1 })} h sun · ${efficiency}% eff.`,
    };
  },
};
