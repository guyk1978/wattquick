import { BatteryCharging } from "lucide-react";
import { formatDuration, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const batteryChargingTimeDefinition: CalculatorDefinition = {
  id: "battery-charging-time",
  href: "/battery-charging-time",
  title: "Battery Charging Time",
  description:
    "Calculate how long it takes to charge a battery at a given current.",
  icon: BatteryCharging,
  tag: "Charging",
  category: "battery",
  suggestions: ["battery-runtime", "solar-panel-size", "battery-cost"],
  fields: [
    {
      id: "capacity",
      label: "Battery capacity",
      unit: "mAh",
      placeholder: "5000",
    },
    {
      id: "current",
      label: "Charger current",
      unit: "mA",
      placeholder: "2000",
    },
    {
      id: "efficiency",
      label: "Charge efficiency",
      unit: "%",
      placeholder: "100",
      defaultValue: "100",
      hint: "Account for heat loss and taper charging",
      colSpan: 2,
    },
  ],
  result: {
    label: "Estimated charge time",
    emptyMessage: "Enter capacity & charger current",
  },
  seo: {
    sections: [
      {
        heading: "Charging time formula",
        body: "Base time = capacity (mAh) ÷ charge current (mA). Adjust for efficiency: actual time = base time ÷ (efficiency ÷ 100).",
      },
      {
        heading: "Why charging takes longer in practice",
        body: "Most chargers taper current above ~80% state of charge. Use a lower efficiency (85–95%) for a safer estimate, or pair with Solar Panel Size for off-grid planning.",
      },
    ],
  },
  compute(values) {
    const mAh = parsePositive(values.capacity ?? "");
    const mA = parsePositive(values.current ?? "");
    const eff = parsePositive(values.efficiency ?? "");
    if (mAh === null || mA === null || eff === null || eff > 100) {
      return { value: null };
    }

    const hours = mAh / mA / (eff / 100);
    const duration = formatDuration(hours);

    return {
      value: duration.display,
      unit: duration.unit,
      detail: `At ${formatNumber(mA, { maxDecimals: 0 })} mA · ${eff}% efficiency`,
    };
  },
};
