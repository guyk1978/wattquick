import { Sun } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const solarDailyYieldDefinition: CalculatorDefinition = {
  id: "solar-daily-yield",
  href: "/solar-daily-yield",
  title: "Solar Daily Yield",
  description: "Estimate daily energy output from panel wattage and sun hours.",
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["solar-panel-size", "solar-battery-bank", "appliance-monthly-energy"],
  fields: [
    { id: "panelW", label: "Panel rating", unit: "W", placeholder: "400" },
    { id: "sunHours", label: "Peak sun hours", unit: "hrs", placeholder: "5" },
    {
      id: "efficiency",
      label: "System efficiency",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
    },
  ],
  result: {
    label: "Daily energy yield",
    emptyMessage: "Enter panel W, sun hours & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "Daily yield formula",
        body: "Daily Wh ≈ panel watts × peak sun hours × (efficiency ÷ 100). This estimates AC or battery energy after system losses.",
      },
      {
        heading: "Compare to load",
        body: "If yield is less than your daily consumption, add panels or reduce load. Pair with Solar Panel Size to work backward from load to required watts.",
      },
    ],
  },
  compute(values) {
    const panelW = parsePositive(values.panelW ?? "");
    const sunHours = parsePositive(values.sunHours ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (panelW === null || sunHours === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }
    const dailyWh = panelW * sunHours * (efficiency / 100);
    return {
      value: formatNumber(dailyWh, { maxDecimals: 0 }),
      unit: "Wh/day",
      detail: `${formatNumber(panelW, { maxDecimals: 0 })} W × ${formatNumber(sunHours, { maxDecimals: 1 })} h × ${efficiency}%`,
    };
  },
};
