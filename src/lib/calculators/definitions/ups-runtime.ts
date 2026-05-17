import { Shield } from "lucide-react";
import { formatDuration, formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const upsRuntimeDefinition: CalculatorDefinition = {
  id: "ups-runtime",
  href: "/ups-runtime",
  title: "UPS Runtime",
  description: "Estimate backup time from battery energy and load power.",
  icon: Shield,
  tag: "Backup",
  category: "backup",
  suggestions: ["battery-runtime", "amps-to-watts", "battery-percentage"],
  fields: [
    { id: "wh", label: "Battery energy", unit: "Wh", placeholder: "500" },
    { id: "load", label: "Load power", unit: "W", placeholder: "150" },
  ],
  result: {
    label: "Estimated backup time",
    emptyMessage: "Enter Wh and load watts",
  },
  seo: {
    sections: [
      {
        heading: "UPS runtime formula",
        body: "Runtime (hours) = battery watt-hours ÷ load watts. This assumes constant load and ignores inverter efficiency—real runtime is often 10–20% shorter.",
      },
      {
        heading: "Finding battery Wh",
        body: "Check your UPS specs for internal battery Wh, or multiply Ah × V. For a 12 V 42 Ah battery: 504 Wh.",
      },
    ],
  },
  compute(values) {
    const wh = parsePositive(values.wh ?? "");
    const load = parsePositive(values.load ?? "");
    if (wh === null || load === null) return { value: null };

    const hours = wh / load;
    const duration = formatDuration(hours);
    return {
      value: duration.display,
      unit: duration.unit,
      detail: `${formatNumber(wh, { maxDecimals: 0 })} Wh ÷ ${formatNumber(load, { maxDecimals: 0 })} W · ${duration.detail}`,
    };
  },
};
