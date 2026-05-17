import { Battery } from "lucide-react";
import { formatDuration, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const batteryRuntimeDefinition: CalculatorDefinition = {
  id: "battery-runtime",
  href: "/battery-runtime",
  title: "Battery Runtime",
  description: "Estimate how long a battery lasts at a given power draw.",
  icon: Battery,
  tag: "Runtime",
  category: "battery",
  suggestions: ["battery-charging-time", "ups-runtime", "watts-to-amps"],
  fields: [
    {
      id: "capacity",
      label: "Battery capacity",
      unit: "mAh",
      placeholder: "5000",
    },
    {
      id: "voltage",
      label: "Voltage",
      unit: "V",
      placeholder: "3.7",
    },
    {
      id: "power",
      label: "Power draw",
      unit: "W",
      placeholder: "10",
      colSpan: 2,
    },
  ],
  result: {
    label: "Estimated runtime",
    emptyMessage: "Enter capacity, voltage & power",
  },
  seo: {
    sections: [
      {
        heading: "Battery runtime explained",
        body: "Convert mAh to Wh (÷1000 × V), then divide by load watts. Example: 5,000 mAh at 3.7 V is 18.5 Wh; at 10 W draw, runtime is about 1.85 hours.",
      },
      {
        heading: "Real-world factors",
        body: "Heat, age, and discharge rate reduce usable capacity. For critical designs, derate by 20% or use the Charging Time calculator to plan recharge.",
      },
    ],
  },
  compute(values) {
    const mAh = parsePositive(values.capacity ?? "");
    const v = parsePositive(values.voltage ?? "");
    const w = parsePositive(values.power ?? "");
    if (mAh === null || v === null || w === null) {
      return { value: null };
    }

    const wh = (mAh * v) / 1000;
    const hours = wh / w;
    const duration = formatDuration(hours);

    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(wh, { maxDecimals: 1 })} Wh · ${duration.detail}`,
    };
  },
};
