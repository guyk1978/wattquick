import { CircleDollarSign } from "lucide-react";
import type { CalculatorDataEntry } from "@/data/calculator-types";
import { formatCurrency, parsePositive } from "@/lib/format";
import {
  MOBILITY_TCO_DEFAULTS,
  parseMobilityTcoFromValues,
} from "@/lib/calculators/mobility-tco";

export const calculatorsMobility = [
  {
    slug: "mobility-tco-calculator",
    href: "/mobility-tco-calculator",
    title: "Mobility TCO Calculator",
    description:
      "Compare 3-year total cost of ownership: car vs e-bike vs e-scooter for commuting and urban mobility.",
    keywords: [
      "mobility tco calculator",
      "e-bike vs car cost",
      "e-scooter vs car",
      "commute ownership cost",
      "micro mobility tco",
    ],
    icon: CircleDollarSign,
    tag: "Decision Tool",
    category: "ebike",
    suggestions: [
      "ebike-commute-savings",
      "ebike-range-estimator",
      "escooter-maintenance-schedule",
      "escooter-range",
    ],
    fields: [
      {
        id: "carMonthlyFuel",
        label: "Car monthly fuel",
        unit: "$/mo",
        placeholder: "120",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyFuel),
      },
      {
        id: "carMonthlyInsurance",
        label: "Car monthly insurance",
        unit: "$/mo",
        placeholder: "150",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyInsurance),
      },
      {
        id: "carMonthlyMaintenance",
        label: "Car monthly maintenance",
        unit: "$/mo",
        placeholder: "50",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyMaintenance),
      },
      {
        id: "carMonthlyParking",
        label: "Car monthly parking",
        unit: "$/mo",
        placeholder: "80",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyParking),
        hint: "Garage, permit, or paid parking",
      },
      {
        id: "carMonthlyDepreciation",
        label: "Car monthly depreciation",
        unit: "$/mo",
        placeholder: "200",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.carMonthlyDepreciation),
      },
      {
        id: "ebikePurchaseCost",
        label: "E-bike purchase price",
        unit: "$",
        placeholder: "2000",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikePurchaseCost),
      },
      {
        id: "ebikeBatteryReplacement",
        label: "E-bike battery replacement",
        unit: "$",
        placeholder: "600",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeBatteryReplacement),
        hint: "Planned once over 3 years",
      },
      {
        id: "ebikeMonthlyMaintenance",
        label: "E-bike monthly maintenance",
        unit: "$/mo",
        placeholder: "15",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeMonthlyMaintenance),
      },
      {
        id: "ebikeMonthlyCharging",
        label: "E-bike monthly charging",
        unit: "$/mo",
        placeholder: "3",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.ebikeMonthlyCharging),
      },
      {
        id: "escooterPurchaseCost",
        label: "E-scooter purchase price",
        unit: "$",
        placeholder: "800",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterPurchaseCost),
      },
      {
        id: "escooterMaintenance3yr",
        label: "E-scooter tires & brakes (3 yr)",
        unit: "$",
        placeholder: "150",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterMaintenance3yr),
      },
      {
        id: "escooterMonthlyCharging",
        label: "E-scooter monthly charging",
        unit: "$/mo",
        placeholder: "2",
        defaultValue: String(MOBILITY_TCO_DEFAULTS.escooterMonthlyCharging),
      },
    ],
    result: {
      label: "Total savings vs car",
      emptyMessage: "Enter cost assumptions for car, e-bike, and e-scooter",
    },
    seo: {
      sections: [
        {
          heading: "3-year TCO model",
          body: "Car: 36 months of fuel, insurance, maintenance, parking, and depreciation. E-bike: purchase + battery replacement + upkeep + charging. E-scooter: purchase + tire/brake budget + charging.",
        },
        {
          heading: "Why micro-mobility wins",
          body: "Savings are not just fuel—parking, insurance, and depreciation dominate urban car ownership. Pair this decision tool with range and maintenance calculators before you buy.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include car purchase price? A: This version models operating TCO for an existing car; add purchase separately if comparing a new car buy. Q: Battery at year 3? A: One replacement is included in e-bike maintenance. Q: E-scooter vs e-bike? A: We show savings for both vs car.",
        },
      ],
    },
    compute(values) {
      const result = parseMobilityTcoFromValues(values, parsePositive);
      if (!result) return { value: null };

      const bestLabel = result.bestMode === "ebike" ? "E-bike" : "E-scooter";
      return {
        value: formatCurrency(result.bestSavingsVsCar),
        unit: "",
        detail: `${bestLabel} vs car · E-bike ${formatCurrency(result.ebikeSavingsVsCar)} · E-scooter ${formatCurrency(result.escooterSavingsVsCar)}`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
