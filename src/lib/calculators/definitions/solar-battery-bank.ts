import { Sun } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const solarBatteryBankDefinition: CalculatorDefinition = {
  id: "solar-battery-bank",
  href: "/solar-battery-bank",
  title: "Solar Battery Bank Size",
  description: "Size an off-grid battery bank from daily use and backup days.",
  icon: Sun,
  tag: "Solar",
  category: "solar",
  suggestions: ["solar-panel-size", "solar-daily-yield", "battery-bank-size"],
  fields: [
    { id: "dailyWh", label: "Daily energy use", unit: "Wh/day", placeholder: "3000" },
    { id: "days", label: "Autonomy days", unit: "days", placeholder: "2" },
    {
      id: "dod",
      label: "Usable depth of discharge",
      unit: "%",
      placeholder: "80",
      defaultValue: "80",
      hint: "LiFePO4 often 80–90%; lead-acid often 50%",
    },
  ],
  result: {
    label: "Minimum bank size",
    emptyMessage: "Enter daily use, days & DoD",
  },
  seo: {
    sections: [
      {
        heading: "Sizing formula",
        body: "Bank Wh = (daily Wh × autonomy days) ÷ (DoD ÷ 100). This is the minimum nameplate energy before efficiency losses.",
      },
      {
        heading: "Next steps",
        body: "Add 20% for inverter and wiring losses, then use the Battery Bank Ah calculator to convert to amp-hours at your system voltage.",
      },
    ],
  },
  compute(values) {
    const dailyWh = parsePositive(values.dailyWh ?? "");
    const days = parsePositive(values.days ?? "");
    const dod = parsePositive(values.dod ?? "");
    if (dailyWh === null || days === null || dod === null || dod > 100) {
      return { value: null };
    }
    const bankWh = (dailyWh * days) / (dod / 100);
    return {
      value: formatNumber(bankWh, { maxDecimals: 0 }),
      unit: "Wh",
      detail: `${formatNumber(dailyWh, { maxDecimals: 0 })} Wh/day × ${days} days @ ${dod}% DoD`,
    };
  },
};
