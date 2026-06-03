import {
  Battery,
  Cable,
  Car,
  LifeBuoy,
  Plug,
  Snowflake,
  Thermometer,
  TrendingDown,
  Wrench,
  Zap,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateEvBatteryDepletionValueLoss,
  calculateEvChargingCableLoss,
  calculateEvChargingTemperatureImpact,
  calculateEvPreconditioningCost,
  calculateEvTireWearCost,
  calculateEvVsGasSavings,
  calculateFastChargeTime,
  calculatePublicChargingCost,
  calculateWinterRange,
  estimateBatteryHealth,
  EV_CHARGING_BATTERY_PRESETS,
  EV_CHARGING_TEMP_SCENARIOS,
  EV_DC_FAST_CHARGE_DEGRADATION,
  type WinterRangeInput,
} from "@/lib/calculators/ev";
import {
  calculateEvVsIceMaintenance,
  COMPARISON_YEAR_OPTIONS,
  DEFAULT_BATTERY_LIFE_YEARS,
  DEFAULT_COMPARISON_YEARS,
  EV_ICE_VEHICLE_CLASS_PRESETS,
  type ComparisonYears,
  type EvIceVehicleClass,
} from "@/lib/calculators/ev-maintenance";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** EV charging micro-calculators (batch 3) */
export const calculatorsEv = [
  {
    slug: "ev-vs-ice-maintenance",
    href: "/ev-vs-ice-maintenance",
    title: "EV vs ICE Maintenance Cost Calculator",
    description:
      "Compare scheduled maintenance for EV vs. gas cars over 5–10 years, including optional battery replacement risk.",
    keywords: [
      "ev vs gas maintenance cost",
      "ev maintenance savings",
      "ice maintenance calculator",
      "electric car service cost",
      "ev battery replacement cost",
    ],
    icon: Wrench,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-vs-gas-savings",
      "ev-tire-wear-cost",
      "ev-cost-per-mile",
      "ev-charging-cost",
    ],
    fields: [
      {
        id: "annualKm",
        label: "Average annual distance",
        unit: "km",
        placeholder: "19312",
        defaultValue: "19312",
        hint: "~12,000 mi/yr — scales service intervals",
      },
      {
        id: "vehicleClass",
        label: "Vehicle type",
        inputType: "select",
        colSpan: 2,
        defaultValue: "sedan",
        options: Object.entries(EV_ICE_VEHICLE_CLASS_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
      {
        id: "comparisonYears",
        label: "Comparison period",
        inputType: "select",
        defaultValue: String(DEFAULT_COMPARISON_YEARS),
        options: COMPARISON_YEAR_OPTIONS.map((years) => ({
          value: String(years),
          label: `${years} years`,
        })),
      },
      {
        id: "batteryLifeYears",
        label: "Estimated battery life",
        unit: "yrs",
        placeholder: "12",
        defaultValue: String(DEFAULT_BATTERY_LIFE_YEARS),
        hint: "If shorter than comparison period, cost is included in net savings",
      },
      {
        id: "batteryReplacementCost",
        label: "Estimated pack replacement",
        unit: "$",
        placeholder: "6000",
        defaultValue: "6000",
        hint: "Market average often $5,000–$8,000 — varies by model",
      },
    ],
    result: {
      label: "Net maintenance savings",
      emptyMessage: "Enter annual km, vehicle type & battery assumptions",
    },
    seo: {
      sections: [
        {
          heading: "What we compare",
          body: "ICE costs include oil, filters, spark plugs, timing belt amortization, engine fluids, and full friction brake service. EV costs include reduced brake wear (regenerative braking), brake fluid, cabin filter, battery coolant, tire rotation, and diagnostics. Optional battery replacement is a separate risk line—not annual service.",
        },
        {
          heading: "Battery replacement risk",
          body: "If estimated pack life falls inside your 5- or 10-year window, we add the replacement cost to cumulative EV spend. Many packs last 15+ years or are covered by warranty—treat this as a stress-test scenario, not a certainty.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Are EVs maintenance-free? A: No—fluids and tires still matter. Q: Is battery cost included by default? A: Only when life expectancy is shorter than your comparison period. Q: Fleet use? A: Scale annual km to match utilization.",
        },
      ],
    },
    compute(values) {
      const annualKm = parsePositive(values.annualKm ?? "");
      const vehicleClass = (values.vehicleClass ?? "sedan") as EvIceVehicleClass;
      const comparisonYears = Number(values.comparisonYears ?? DEFAULT_COMPARISON_YEARS);
      const batteryLifeYears = parsePositive(values.batteryLifeYears ?? "");
      const batteryReplacementCost = parsePositive(values.batteryReplacementCost ?? "");
      if (
        annualKm === null ||
        !(vehicleClass in EV_ICE_VEHICLE_CLASS_PRESETS) ||
        !COMPARISON_YEAR_OPTIONS.includes(comparisonYears as ComparisonYears) ||
        batteryLifeYears === null ||
        batteryReplacementCost === null
      ) {
        return { value: null };
      }
      const result = calculateEvVsIceMaintenance({
        annualKm,
        vehicleClass,
        comparisonYears: comparisonYears as ComparisonYears,
        batteryLifeYears,
        batteryReplacementCost,
      });
      if (!result) return { value: null };
      return {
        value: formatCurrency(result.netSavings),
        unit: result.netSavingsPositive ? " net" : " net (deficit)",
        detail: `Maintenance saved ${formatCurrency(result.maintenanceSavings)} · Battery risk ${formatCurrency(result.batteryCostInPeriod)} over ${result.comparisonYears} yr`,
      };
    },
  },
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
      "ev-charging-temperature-impact",
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
    slug: "ev-charging-temperature-impact",
    href: "/ev-charging-temperature-impact",
    title: "EV Charging Temperature Impact Calculator",
    description:
      "See how extreme cold or heat extends DC fast-charge time via BMS thermal limits—base 10–80% time plus added delay.",
    keywords: [
      "ev charging temperature",
      "cold weather ev charging time",
      "ev battery preconditioning",
      "dc fast charge winter",
      "bms thermal throttling",
    ],
    icon: Thermometer,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-fast-charging-time",
      "ev-preconditioning-cost",
      "ev-vs-ice-maintenance",
      "ev-winter-range-loss",
    ],
    fields: [
      {
        id: "vehiclePreset",
        label: "Vehicle / battery type",
        inputType: "select",
        colSpan: 2,
        defaultValue: "midsize",
        options: Object.entries(EV_CHARGING_BATTERY_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
        hint: "Typical usable pack sizes for planning",
      },
      {
        id: "batteryCapacityKwh",
        label: "Battery capacity",
        unit: "kWh",
        placeholder: "75",
        defaultValue: "75",
      },
      {
        id: "chargerPowerKw",
        label: "Charger power",
        unit: "kW",
        placeholder: "150",
        defaultValue: "150",
        hint: "DC fast charger peak kW",
      },
      {
        id: "tempScenario",
        label: "Outside temperature",
        inputType: "select",
        colSpan: 2,
        defaultValue: "average",
        options: Object.entries(EV_CHARGING_TEMP_SCENARIOS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
        hint: "Pick a scenario or fine-tune with the slider",
      },
      {
        id: "externalTempC",
        label: "Fine-tune ambient temp",
        inputType: "range",
        min: -20,
        max: 45,
        step: 1,
        defaultValue: "20",
        unit: "°C",
        colSpan: 2,
      },
    ],
    result: {
      label: "Estimated charge time",
      emptyMessage: "Select vehicle, charger kW & temperature",
    },
    seo: {
      sections: [
        {
          heading: "Why temperature changes charge time",
          body: "Lithium cells accept the highest DC power in a moderate temperature window. Below ~15°C the BMS heats the pack and may cap kW; above ~30°C it cools and tapers to protect longevity. Preconditioning while plugged in or en route shrinks the added delay.",
        },
        {
          heading: "How we estimate",
          body: "Base time uses the same 10–80% fast-charge model as our DC fast charging calculator at ideal thermal conditions. Added delay combines reduced effective charger kW from BMS throttling plus typical precondition minutes for cold starts.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this exact for my car? A: OEM curves differ—use for road-trip planning. Q: What is preconditioning? A: Heating or cooling the pack before DC so more of the session runs at peak kW. Q: Maintenance costs? A: Pair with our EV vs ICE maintenance calculator for service and battery replacement outlook.",
        },
      ],
    },
    compute(values) {
      const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
      const chargerPowerKw = parsePositive(values.chargerPowerKw ?? "");
      const tempRaw = values.externalTempC?.trim() ?? "";
      const externalTempC =
        tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);
      if (
        batteryCapacityKwh === null ||
        chargerPowerKw === null ||
        externalTempC === null ||
        !Number.isFinite(externalTempC)
      ) {
        return { value: null };
      }
      const result = calculateEvChargingTemperatureImpact({
        batteryCapacityKwh,
        chargerPowerKw,
        externalTempC,
      });
      return {
        value: result.totalFormatted,
        unit: "",
        detail: `Base ${result.baseFormatted} + ${result.addedDelayFormatted} delay at ${externalTempC}°C`,
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
      "ev-battery-depletion-value-loss",
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
    slug: "ev-battery-depletion-value-loss",
    href: "/ev-battery-depletion-value-loss",
    title: "EV Battery Depletion & Value Loss Calculator",
    description:
      "Estimate battery SoH from age, mileage, and DC fast-charging habits—then convert capacity fade to dollar value lost and resale value.",
    keywords: [
      "ev battery value loss",
      "ev depreciation calculator",
      "battery depletion resale",
      "ev soh value",
      "fast charging battery wear cost",
    ],
    icon: TrendingDown,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-battery-degradation",
      "ev-vs-ice-maintenance",
      "ev-charging-temperature-impact",
      "ev-fast-charging-time",
    ],
    fields: [
      {
        id: "purchasePrice",
        label: "Original purchase price",
        unit: "$",
        placeholder: "45000",
        defaultValue: "45000",
      },
      {
        id: "currentMileage",
        label: "Current mileage",
        unit: "miles",
        placeholder: "52000",
        defaultValue: "52000",
      },
      {
        id: "vehicleAgeYears",
        label: "Vehicle age",
        unit: "years",
        placeholder: "4",
        defaultValue: "4",
      },
      {
        id: "fastChargingFrequency",
        label: "DC fast charging frequency",
        inputType: "select",
        defaultValue: "rarely",
        options: Object.entries(EV_DC_FAST_CHARGE_DEGRADATION).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
        colSpan: 2,
        hint: "Frequent DC sessions accelerate capacity fade",
      },
    ],
    result: {
      label: "Estimated current value",
      emptyMessage: "Enter purchase price, mileage, age & charging habits",
    },
    seo: {
      sections: [
        {
          heading: "From SoH to dollars",
          body: "We model capacity loss with ~2.3% calendar fade per year plus mileage and DC fast-charge stress, then apply a typical 38% pack share of MSRP to estimate how much battery depletion reduces resale value versus your purchase price.",
        },
        {
          heading: "Not a formal appraisal",
          body: "Real market prices depend on trim, region, incentives at purchase, and OEM battery warranties. Use this for planning and comparison—pair with our EV vs ICE maintenance calculator for service and replacement costs.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: What is SoH? A: State of health—remaining battery capacity vs. new. Q: Why fast charging matters? A: High C-rates heat cells and accelerate fade when used as primary fueling. Q: Can I improve SoH? A: You can slow further loss with gentler charging; lost capacity does not return.",
        },
      ],
    },
    compute(values) {
      const purchasePrice = parsePositive(values.purchasePrice ?? "");
      const currentMileage = parseNonNegative(values.currentMileage ?? "");
      const vehicleAgeYears = parseNonNegative(values.vehicleAgeYears ?? "");
      const fastChargingFrequency = values.fastChargingFrequency as
        | keyof typeof EV_DC_FAST_CHARGE_DEGRADATION
        | undefined;
      if (
        purchasePrice === null ||
        currentMileage === null ||
        vehicleAgeYears === null ||
        !fastChargingFrequency ||
        !(fastChargingFrequency in EV_DC_FAST_CHARGE_DEGRADATION)
      ) {
        return { value: null };
      }
      const result = calculateEvBatteryDepletionValueLoss({
        purchasePrice,
        currentMileage,
        vehicleAgeYears,
        fastChargingFrequency,
      });
      return {
        value: formatCurrency(result.estimatedCurrentValue),
        unit: "",
        detail: `SoH ${formatNumber(result.batteryHealthPercent, { maxDecimals: 1 })}% · Battery value lost ${formatCurrency(result.valueLostDueToBattery)}`,
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
  {
    slug: "ev-preconditioning-cost",
    href: "/ev-preconditioning-cost",
    title: "EV Battery Pre-conditioning Cost Calculator",
    description:
      "Estimate electricity cost to heat or cool your pack before DC fast charging—from BMS draw, runtime, and your kWh rate.",
    keywords: [
      "ev preconditioning cost",
      "battery thermal management cost",
      "ev winter charging cost",
      "dc fast charge battery heat",
    ],
    icon: Thermometer,
    tag: "EV",
    category: "ev",
    suggestions: [
      "ev-fast-charging-time",
      "ev-winter-range-loss",
      "ev-charging-cost",
    ],
    fields: [
      {
        id: "externalTempC",
        label: "Outside temperature",
        unit: "°C",
        placeholder: "-5",
        hint: "Ambient air temperature at the charger",
      },
      {
        id: "bmsPowerKw",
        label: "BMS thermal power",
        unit: "kW",
        placeholder: "5",
        hint: "Typical 3–8 kW while conditioning the pack",
      },
      {
        id: "durationMinutes",
        label: "Pre-conditioning time",
        unit: "min",
        placeholder: "25",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
      },
    ],
    result: {
      label: "Pre-conditioning cost",
      emptyMessage: "Enter temperature, kW, minutes & rate",
    },
    seo: {
      sections: [
        {
          heading: "Thermal cost formula",
          body: "Energy (kWh) = thermal power (kW) × time (hours). Cost = kWh × $/kWh. Precondition while plugged in so this energy comes from the grid (or home solar) instead of your driving range.",
        },
        {
          heading: "Why temperature matters for DC fast charging",
          body: "Cold packs charge slowly until heated; hot packs may throttle or cool before accepting full power. Automakers often run the thermal system 15–45 minutes before a planned fast-charge session.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Where do I find kW draw? A: Some EV apps show conditioning power; otherwise use 4–6 kW as a planning estimate. Q: Does this include charging? A: No—only thermal management before or during the wait to charge.",
        },
      ],
    },
    compute(values) {
      const tempRaw = values.externalTempC?.trim() ?? "";
      const tempC = tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);
      const bmsPowerKw = parsePositive(values.bmsPowerKw ?? "");
      const durationMinutes = parsePositive(values.durationMinutes ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (
        tempC === null ||
        !Number.isFinite(tempC) ||
        bmsPowerKw === null ||
        durationMinutes === null ||
        ratePerKwh === null
      ) {
        return { value: null };
      }
      const result = calculateEvPreconditioningCost({
        externalTempC: tempC,
        bmsPowerKw,
        durationMinutes,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.totalCost),
        unit: "",
        detail: `${result.modeLabel} · ${formatNumber(result.energyKwh, { maxDecimals: 2 })} kWh · ${result.durationMinutes} min @ ${formatNumber(bmsPowerKw, { maxDecimals: 1 })} kW`,
      };
    },
  },
  {
    slug: "ev-tire-wear-cost",
    href: "/ev-tire-wear-cost",
    title: "EV Tire Wear Cost Calculator",
    description:
      "Estimate annual tire depreciation for electric vehicles vs. comparable gas cars—km driven, set cost, ICE tire life, and EV wear factor.",
    keywords: [
      "ev tire wear cost",
      "electric vehicle tire replacement",
      "ev vs ice tire life",
      "ev torque tire wear",
      "fleet ev maintenance tires",
    ],
    icon: LifeBuoy,
    tag: "Maintenance",
    category: "ev",
    suggestions: [
      "ev-cost-per-mile",
      "ev-vs-gas-savings",
      "ev-fleet-tco",
    ],
    fields: [
      {
        id: "annualKm",
        label: "Annual distance",
        unit: "km/yr",
        placeholder: "18000",
        hint: "~11,200 mi at 18,000 km",
      },
      {
        id: "tireSetCost",
        label: "Tire set cost (4 tires)",
        unit: "$",
        placeholder: "800",
      },
      {
        id: "iceTireLifeKm",
        label: "Typical ICE tire life",
        unit: "km",
        placeholder: "50000",
        defaultValue: "50000",
        hint: "Comparable gas car on same routes",
      },
      {
        id: "evWearPercent",
        label: "EV extra wear factor",
        inputType: "range",
        min: 0,
        max: 50,
        step: 5,
        defaultValue: "25",
        unit: "%",
        colSpan: 2,
        hint: "Studies often cite 20–30% faster wear from torque & mass",
      },
    ],
    result: {
      label: "Annual EV tire depreciation",
      emptyMessage: "Enter km, tire cost, ICE life & EV wear %",
    },
    seo: {
      sections: [
        {
          heading: "Why EV tire economics differ",
          body: "Instant torque, higher vehicle mass, and low rolling-resistance compounds can shorten tread life versus a similar ICE car on the same roads. This tool converts that wear premium into annual dollars.",
        },
        {
          heading: "How the estimate works",
          body: "ICE annual cost = (km ÷ ICE tire life km) × set cost. EV tire life = ICE life ÷ (1 + extra wear %). EV annual cost uses the shorter life. The difference is the hidden maintenance gap in TCO spreadsheets.",
        },
        {
          heading: "Pressure and alignment matter",
          body: "Under-inflated EV tires overheat and cup faster—especially on heavy crossovers. Check door-jamb PSI monthly; rotate per OEM schedule to avoid one-sided wear from regen bias.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include installation? A: Enter installed set price if you want all-in cost. Q: Fleet vehicles? A: Same math per vehicle—multiply by fleet count outside this tool. Q: Winter tires? A: Model summer set only or add a second set in your budget.",
        },
      ],
    },
    compute(values) {
      const annualKm = parsePositive(values.annualKm ?? "");
      const tireSetCost = parsePositive(values.tireSetCost ?? "");
      const iceTireLifeKm = parsePositive(values.iceTireLifeKm ?? "");
      const evWearPercent = Number(values.evWearPercent?.trim() || "25");
      if (
        annualKm === null ||
        tireSetCost === null ||
        iceTireLifeKm === null ||
        !Number.isFinite(evWearPercent) ||
        evWearPercent < 0
      ) {
        return { value: null };
      }
      const result = calculateEvTireWearCost({
        annualKm,
        tireSetCost,
        iceTireLifeKm,
        evWearPercent,
      });
      return {
        value: formatCurrency(result.evAnnualCost),
        unit: "/yr",
        detail: `ICE ${formatCurrency(result.iceAnnualCost)}/yr · +${formatCurrency(result.extraCostVsIce)}/yr EV premium · ${result.evTireLifeKm} km EV life`,
      };
    },
  },
  {
    slug: "ev-charging-cable-loss",
    href: "/ev-charging-cable-loss",
    title: "EV Charging Cable Power Loss Calculator",
    description:
      "Estimate I²R heat loss in copper charging cables from amps, length, mm² cross-section, and session hours.",
    keywords: [
      "ev charging cable loss",
      "extension cord ev charging heat",
      "cable resistance kwh waste",
      "level 2 cable gauge loss",
      "i2r charging loss calculator",
    ],
    icon: Cable,
    tag: "Charging",
    category: "ev",
    suggestions: [
      "ev-charging-cost",
      "ev-charge-time",
      "residential-voltage-drop",
    ],
    fields: [
      {
        id: "chargeAmps",
        label: "Charging current",
        unit: "A",
        placeholder: "32",
        hint: "Sustained AC current during the session",
      },
      {
        id: "cableLengthM",
        label: "Cable length",
        unit: "m",
        placeholder: "10",
        hint: "One-way run from panel or EVSE to vehicle",
      },
      {
        id: "crossSectionMm2",
        label: "Conductor size",
        unit: "mm²",
        placeholder: "6",
        hint: "Copper L+N equivalent—common: 2.5, 4, 6, 10 mm²",
      },
      {
        id: "chargeHours",
        label: "Charge time",
        unit: "hrs",
        placeholder: "6",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
        hint: "Cost of wasted heat energy",
      },
    ],
    result: {
      label: "Cable power loss",
      emptyMessage: "Enter amps, length, mm² & charge hours",
    },
    seo: {
      sections: [
        {
          heading: "Why cable resistance wastes money",
          body: "Every amp through copper creates I²R heat in the conductors. Long thin extension cords add resistance in series with the charger—energy becomes warmth in the jacket instead of kilowatt-hours in the pack. You still pay the utility for those losses.",
        },
        {
          heading: "Loss formulas",
          body: "Round-trip Ω ≈ 2 × (0.0175 × length m ÷ mm²). Loss W = I² × Ω. Wasted kWh = W × hours ÷ 1000. Session $ = kWh × your rate. Loss % compares to I × 230 V reference charge power.",
        },
        {
          heading: "Pick the right gauge",
          body: "Upsize mm² or shorten the run before buying a longer cord. Warm plugs after a session signal excessive loss—match OEM cable rating and avoid daisy-chained household extensions on sustained 32 A loads.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: DC fast charging? A: This models AC cord I²R; DC pins have separate contact resistance. Q: Aluminum? A: Use ~1.6× copper Ω for the same mm². Q: Include charger efficiency? A: Add 5–10% on top for inverter loss in total wall-to-pack budget.",
        },
      ],
    },
    compute(values) {
      const chargeAmps = parsePositive(values.chargeAmps ?? "");
      const cableLengthM = parsePositive(values.cableLengthM ?? "");
      const crossSectionMm2 = parsePositive(values.crossSectionMm2 ?? "");
      const chargeHours = parsePositive(values.chargeHours ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "") ?? 0.14;
      if (
        chargeAmps === null ||
        cableLengthM === null ||
        crossSectionMm2 === null ||
        chargeHours === null
      ) {
        return { value: null };
      }
      const result = calculateEvChargingCableLoss({
        chargeAmps,
        cableLengthM,
        crossSectionMm2,
        chargeHours,
        ratePerKwh,
      });
      return {
        value: formatNumber(result.powerLossW, { maxDecimals: 1 }),
        unit: "W",
        detail: `${result.energyLossKwh} kWh wasted · ${formatCurrency(result.sessionCost)}/session · ${result.roundTripOhms} Ω`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
