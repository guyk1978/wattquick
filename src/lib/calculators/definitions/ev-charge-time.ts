import { Car } from "lucide-react";
import { formatDuration, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const evChargeTimeDefinition: CalculatorDefinition = {
  id: "ev-charge-time",
  href: "/ev-charge-time",
  title: "EV Charge Time",
  description: "Estimate how long an EV charge takes at a given charger power.",
  icon: Car,
  tag: "EV",
  category: "ev",
  suggestions: ["ev-charging-cost", "battery-charging-time", "watts-to-amps"],
  fields: [
    { id: "kwh", label: "Energy needed", unit: "kWh", placeholder: "55" },
    { id: "chargerKw", label: "Charger power", unit: "kW", placeholder: "11" },
    {
      id: "efficiency",
      label: "Charging efficiency",
      unit: "%",
      placeholder: "90",
      defaultValue: "90",
    },
  ],
  result: {
    label: "Estimated charge time",
    emptyMessage: "Enter kWh, charger kW & efficiency",
  },
  seo: {
    sections: [
      {
        heading: "Charge time formula",
        body: "Hours ≈ kWh ÷ (kW × efficiency ÷ 100). Level 2 home chargers are often 7–11 kW; DC fast charging is much higher but rarely used for full 0–100% cycles.",
      },
      {
        heading: "Real-world taper",
        body: "The last 10–20% charges slower as the BMS balances cells. Add buffer time for a full charge, especially on cold days.",
      },
    ],
  },
  compute(values) {
    const kwh = parsePositive(values.kwh ?? "");
    const chargerKw = parsePositive(values.chargerKw ?? "");
    const efficiency = parsePositive(values.efficiency ?? "");
    if (kwh === null || chargerKw === null || efficiency === null || efficiency > 100) {
      return { value: null };
    }
    const hours = kwh / (chargerKw * (efficiency / 100));
    const duration = formatDuration(hours);
    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(kwh, { maxDecimals: 0 })} kWh @ ${formatNumber(chargerKw, { maxDecimals: 1 })} kW · ${efficiency}% eff.`,
    };
  },
};
