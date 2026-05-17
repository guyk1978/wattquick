import { Refrigerator } from "lucide-react";
import { formatNumber, parsePositive } from "@/lib/format";
import type { CalculatorDefinition } from "../types";

export const applianceMonthlyEnergyDefinition: CalculatorDefinition = {
  id: "appliance-monthly-energy",
  href: "/appliance-monthly-energy",
  title: "Appliance Monthly Energy",
  description: "Convert appliance watts and daily use into monthly kWh.",
  icon: Refrigerator,
  tag: "Appliance",
  category: "appliance",
  suggestions: ["appliance-daily-cost", "solar-daily-yield", "solar-panel-size"],
  fields: [
    { id: "watts", label: "Power draw", unit: "W", placeholder: "900" },
    { id: "hours", label: "Hours per day", unit: "hrs", placeholder: "3" },
  ],
  result: {
    label: "Monthly energy use",
    emptyMessage: "Enter watts and hours per day",
  },
  seo: {
    sections: [
      {
        heading: "Monthly kWh formula",
        body: "Monthly kWh = (watts × hours per day × 30) ÷ 1000. Adjust the 30-day factor if you prefer 365÷12 for an average month.",
      },
      {
        heading: "Stack your loads",
        body: "Run this for each major appliance and sum the results to estimate household consumption before sizing solar or batteries.",
      },
    ],
  },
  compute(values) {
    const watts = parsePositive(values.watts ?? "");
    const hours = parsePositive(values.hours ?? "");
    if (watts === null || hours === null) return { value: null };
    const monthlyKwh = (watts * hours * 30) / 1000;
    return {
      value: formatNumber(monthlyKwh, { maxDecimals: 1 }),
      unit: "kWh/mo",
      detail: `${formatNumber(watts, { maxDecimals: 0 })} W × ${formatNumber(hours, { maxDecimals: 1 })} h/day × 30 days`,
    };
  },
};
