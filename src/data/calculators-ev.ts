import {
  Battery,
  Car,
  Plug,
  Snowflake,
  Zap,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateEvVsGasSavings,
  calculateFastChargeTime,
  calculatePublicChargingCost,
  calculateWinterRange,
  estimateBatteryHealth,
  type WinterRangeInput,
} from "@/lib/calculators/ev";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** EV charging micro-calculators (batch 3) */
export const calculatorsEv = [
  {
    slug: "ev-fast-charging-time",
    href: "/ev-fast-charging-time",
    title: "EV DC Fast Charging Calculator (10–80%)",
    description:
      "Estimate DC fast-charge time with taper above 80% SOC—live as you adjust pack size and charger power.",
    keywords: [
      "ev fast charging time",
      "dc fast charge calculator",
      "10 to 80 charging time",
    ],
    icon: Zap,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-charge-time",
      "ev-level1-vs-level2",
      "ev-battery-range",
    ],
    fields: [
      {
        id: "batteryCapacityKwh",
        label: "Battery capacity",
        unit: "kWh",
        placeholder: "75",
      },
      {
        id: "targetChargePercentage",
        label: "Target state of charge",
        inputType: "range",
        min: 10,
        max: 100,
        step: 1,
        defaultValue: "80",
        unit: "%",
        colSpan: 2,
        hint: "Assumes starting from ~10% SOC (typical fast-charge window)",
      },
      {
        id: "chargerPowerKw",
        label: "Charger power",
        unit: "kW",
        placeholder: "150",
        hint: "DC fast charger peak kW",
      },
    ],
    result: {
      label: "Estimated charge time",
      emptyMessage: "Enter battery kWh and charger kW",
    },
    seo: {
      sections: [
        {
          heading: "How fast charging taper works",
          body: "Most EVs charge quickly from about 10% to 80% SOC, then power tapers to protect the pack. This calculator models full power to 80% (with ~8% loss) and reduced power above 80%.",
        },
        {
          heading: "Planning road trips",
          body: "Use your pack kWh and station peak kW from apps like PlugShare. Pair with EV Battery Range for total trip stops.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why start at 10%? A: Drivers rarely arrive at 0% and many networks optimize the 10–80% window. Q: Is this exact? A: Real curves vary by vehicle, temperature, and charger—use as a planning estimate.",
        },
      ],
    },
    compute(values) {
      const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
      const chargerPowerKw = parsePositive(values.chargerPowerKw ?? "");
      const targetRaw = values.targetChargePercentage?.trim() ?? "80";
      const targetChargePercentage = Number(targetRaw);
      if (
        batteryCapacityKwh === null ||
        chargerPowerKw === null ||
        !Number.isFinite(targetChargePercentage) ||
        targetChargePercentage <= 10 ||
        targetChargePercentage > 100
      ) {
        return { value: null };
      }
      const result = calculateFastChargeTime({
        batteryCapacityKwh,
        targetChargePercentage,
        chargerPowerKw,
      });
      return {
        value: result.formatted,
        unit: "",
        detail: `10% → ${targetChargePercentage}% · ${batteryCapacityKwh} kWh pack · ${chargerPowerKw} kW charger`,
      };
    },
  },
  {
    slug: "ev-winter-range-loss",
    href: "/ev-winter-range-loss",
    title: "EV Winter Range Loss Calculator",
    description:
      "Estimate cold-weather driving range from EPA rating, temperature, and cabin heat use.",
    keywords: [
      "ev winter range loss",
      "cold weather ev range",
      "ev range in winter",
    ],
    icon: Snowflake,
    tag: "EV",
    category: "ev",
    suggestions: ["ev-battery-range", "ev-cost-per-mile", "battery-runtime"],
    fields: [
      {
        id: "ratedRange",
        label: "Rated range",
        unit: "miles",
        placeholder: "300",
        hint: "EPA or WLTP rated range",
      },
      {
        id: "tempCategory",
        label: "Temperature",
        inputType: "select",
        defaultValue: "cold",
        options: [
          { value: "mild", label: "Mild (40–50°F / 4–10°C)" },
          { value: "cold", label: "Cold (20–40°F / −7–4°C)" },
          { value: "freezing", label: "Freezing (below 20°F / −7°C)" },
        ],
        colSpan: 2,
      },
      {
        id: "heatingUsage",
        label: "Cabin heating",
        inputType: "select",
        defaultValue: "eco",
        options: [
          { value: "off", label: "Off / minimal" },
          { value: "eco", label: "Eco heat" },
          { value: "high", label: "High heat" },
        ],
        colSpan: 2,
      },
    ],
    result: {
      label: "Estimated winter range",
      emptyMessage: "Enter rated range",
    },
    seo: {
      sections: [
        {
          heading: "Why winter reduces EV range",
          body: "Cold batteries have higher internal resistance, and cabin heat draws significant energy. Combined losses of 20–35% are common in freezing conditions with full heat.",
        },
        {
          heading: "How this estimate works",
          body: "We apply temperature-based loss plus heating load on top of your rated range. Preconditioning while plugged in and seat heaters reduce the hit.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Should I use EPA range? A: Yes, as a baseline—your trip computer may already adjust. Q: What about highway speed? A: This tool isolates temperature/heat; high speed adds further loss.",
        },
      ],
    },
    compute(values) {
      const ratedRange = parsePositive(values.ratedRange ?? "");
      const tempCategory = values.tempCategory as WinterRangeInput["tempCategory"];
      const heatingUsage = values.heatingUsage as WinterRangeInput["heatingUsage"];
      if (
        ratedRange === null ||
        !["mild", "cold", "freezing"].includes(tempCategory) ||
        !["off", "eco", "high"].includes(heatingUsage)
      ) {
        return { value: null };
      }
      const result = calculateWinterRange({
        ratedRange,
        tempCategory,
        heatingUsage,
      });
      return {
        value: formatNumber(result.realWinterRange, { maxDecimals: 0 }),
        unit: "miles",
        detail: `−${result.lostRange} mi (${result.lossPercentage}% loss) from ${ratedRange} mi rated`,
      };
    },
  },
  {
    slug: "ev-vs-gas-savings",
    href: "/ev-vs-gas-savings",
    title: "EV vs. Gas Car Savings Calculator",
    description:
      "Compare monthly and yearly fuel costs between gasoline and electric driving.",
    keywords: [
      "ev vs gas savings",
      "electric vs gas cost",
      "ev fuel savings calculator",
    ],
    icon: Car,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-cost-per-mile",
      "ev-charging-cost",
      "electricity-bill",
    ],
    fields: [
      { id: "monthlyMileage", label: "Monthly mileage", unit: "mi", placeholder: "1000" },
      { id: "gasPricePerUnit", label: "Gas price", unit: "$/gal", placeholder: "3.50" },
      { id: "gasConsumption", label: "Gas vehicle MPG", unit: "MPG", placeholder: "28" },
      {
        id: "electricityRatePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
      },
      {
        id: "evEfficiencyKwhPerUnit",
        label: "EV efficiency",
        unit: "kWh/mi",
        placeholder: "0.30",
      },
    ],
    result: {
      label: "Monthly savings (EV)",
      emptyMessage: "Enter mileage, gas & EV costs",
    },
    seo: {
      sections: [
        {
          heading: "Cost comparison formulas",
          body: "Gas monthly cost = (miles ÷ MPG) × $/gallon. EV monthly cost = miles × kWh/mile × $/kWh. Savings = gas − EV when positive.",
        },
        {
          heading: "What’s not included",
          body: "Maintenance, insurance, and purchase price differ between EVs and ICE vehicles. This tool focuses on energy cost only.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Use home or public charging rate? A: Use your blended rate—often home off-peak for lowest kWh. Q: What if EV costs more? A: Savings show $0 when gas is cheaper for your inputs.",
        },
      ],
    },
    compute(values) {
      const monthlyMileage = parsePositive(values.monthlyMileage ?? "");
      const gasPricePerUnit = parsePositive(values.gasPricePerUnit ?? "");
      const gasConsumption = parsePositive(values.gasConsumption ?? "");
      const electricityRatePerKwh = parsePositive(values.electricityRatePerKwh ?? "");
      const evEfficiencyKwhPerUnit = parsePositive(
        values.evEfficiencyKwhPerUnit ?? ""
      );
      if (
        monthlyMileage === null ||
        gasPricePerUnit === null ||
        gasConsumption === null ||
        electricityRatePerKwh === null ||
        evEfficiencyKwhPerUnit === null
      ) {
        return { value: null };
      }
      const result = calculateEvVsGasSavings({
        monthlyMileage,
        gasPricePerUnit,
        gasConsumption,
        electricityRatePerKwh,
        evEfficiencyKwhPerUnit,
      });
      return {
        value: formatCurrency(result.monthlySavings),
        unit: "/mo",
        detail: `Gas ${formatCurrency(result.gasMonthlyCost)}/mo (${result.costPerMileGas}/mi) · EV ${formatCurrency(result.evMonthlyCost)}/mo (${result.costPerMileEv}/mi) · Yearly ${formatCurrency(result.yearlySavings)}`,
      };
    },
  },
  {
    slug: "ev-battery-degradation",
    href: "/ev-battery-degradation",
    title: "EV Battery Health & Degradation Estimator",
    description:
      "Rough state-of-health estimate from age, mileage, and DC fast-charging habits.",
    keywords: [
      "ev battery degradation",
      "battery health estimator",
      "ev soh calculator",
    ],
    icon: Battery,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-battery-range",
      "battery-efficiency",
      "ev-fast-charging-time",
    ],
    fields: [
      {
        id: "vehicleAgeYears",
        label: "Vehicle age",
        unit: "years",
        placeholder: "3",
        defaultValue: "3",
      },
      {
        id: "totalMileage",
        label: "Total mileage",
        unit: "miles",
        placeholder: "45000",
      },
      {
        id: "fastChargingFrequency",
        label: "DC fast charging",
        inputType: "select",
        defaultValue: "rarely",
        options: [
          { value: "never", label: "Never / almost never" },
          { value: "rarely", label: "Rarely (road trips)" },
          { value: "often", label: "Often (weekly+)" },
        ],
        colSpan: 2,
      },
    ],
    result: {
      label: "Estimated state of health",
      emptyMessage: "Enter age and mileage",
    },
    seo: {
      sections: [
        {
          heading: "What affects EV battery health",
          body: "Calendar aging, cumulative miles, and frequent DC fast charging all contribute to capacity fade. Thermal management and chemistry vary widely by model.",
        },
        {
          heading: "Limitations",
          body: "This is a simplified model for curiosity—not a diagnostic. For warranty or resale, use dealer scans or OBD SoH reports.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: What is SoH? A: State of health—remaining capacity vs. new, usually 100% when new. Q: Can SoH improve? A: No, only slow further degradation with good habits.",
        },
      ],
    },
    compute(values) {
      const vehicleAgeYears = parseNonNegative(values.vehicleAgeYears ?? "");
      const totalMileage = parseNonNegative(values.totalMileage ?? "");
      const fastChargingFrequency = values.fastChargingFrequency as
        | "never"
        | "rarely"
        | "often";
      if (
        vehicleAgeYears === null ||
        totalMileage === null ||
        !["never", "rarely", "often"].includes(fastChargingFrequency)
      ) {
        return { value: null };
      }
      const result = estimateBatteryHealth({
        vehicleAgeYears,
        totalMileage,
        fastChargingFrequency,
      });
      return {
        value: formatNumber(result.stateOfHealthPercentage, { maxDecimals: 1 }),
        unit: "% SoH",
        detail: `Status: ${result.status} · ${vehicleAgeYears} yr · ${formatNumber(totalMileage, { maxDecimals: 0 })} mi`,
      };
    },
  },
  {
    slug: "ev-public-charging-cost",
    href: "/ev-public-charging-cost",
    title: "EV Public Charging & Idle Fee Calculator",
    description:
      "Total session cost including energy, connection fee, and idle penalties—updates live.",
    keywords: [
      "ev public charging cost",
      "idle fee calculator",
      "dc charging session cost",
    ],
    icon: Plug,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-charging-cost",
      "ev-cost-per-mile",
      "ev-vs-gas-savings",
    ],
    fields: [
      { id: "kwhDelivered", label: "Energy delivered", unit: "kWh", placeholder: "45" },
      { id: "pricePerKwh", label: "Energy rate", unit: "$/kWh", placeholder: "0.42" },
      {
        id: "sessionFee",
        label: "Session / connection fee",
        unit: "$",
        placeholder: "1.00",
        defaultValue: "0",
      },
      { id: "idleMinutes", label: "Idle time after charge", unit: "min", placeholder: "0" },
      {
        id: "idleFeePerMinute",
        label: "Idle fee",
        unit: "$/min",
        placeholder: "0.40",
        defaultValue: "0",
      },
    ],
    result: {
      label: "Total session cost",
      emptyMessage: "Enter kWh delivered and rates",
    },
    seo: {
      sections: [
        {
          heading: "Public charging cost breakdown",
          body: "Total = (kWh × $/kWh) + session fee + (idle minutes × idle $/min). Effective $/kWh helps compare networks with different fee structures.",
        },
        {
          heading: "Avoiding idle fees",
          body: "Move your vehicle within the grace period shown in the app—often 5–15 minutes after charging completes. Idle fees encourage turnover at busy stations.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Are session fees common? A: Many DC networks charge $0–$2 per session plus per-kWh. Q: What if kWh is zero? A: You may still pay a session or idle fee.",
        },
      ],
    },
    compute(values) {
      const kwhDelivered = parsePositive(values.kwhDelivered ?? "");
      const pricePerKwh = parseNonNegative(values.pricePerKwh ?? "");
      const sessionFee = parseNonNegative(values.sessionFee ?? "") ?? 0;
      const idleMinutes = parseNonNegative(values.idleMinutes ?? "") ?? 0;
      const idleFeePerMinute = parseNonNegative(values.idleFeePerMinute ?? "") ?? 0;
      if (kwhDelivered === null || pricePerKwh === null) return { value: null };
      const result = calculatePublicChargingCost({
        kwhDelivered,
        pricePerKwh,
        sessionFee,
        idleMinutes,
        idleFeePerMinute,
      });
      return {
        value: formatCurrency(result.totalCost),
        unit: "",
        detail: `Energy ${formatCurrency(result.energyCost)} · Idle ${formatCurrency(result.totalIdleCost)} · Effective $${result.effectivePricePerKwh}/kWh`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
