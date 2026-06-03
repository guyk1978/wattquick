import { Bitcoin, Fuel, Home, Lamp, Moon, PlugZap, Thermometer } from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateCryptoMiningPower,
  calculateGeneratorFuelConsumption,
  calculateHeatPumpVsResistance,
  calculateLightingCircuitLoad,
  calculateStandbyPowerWaste,
  calculateVampirePowerCost,
  calculateWholeHouseEnergyBudget,
  VAMPIRE_DEVICE_PRESETS,
} from "@/lib/calculators/appliances";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** Appliance & home energy micro-calculators (batch 6) */
export const calculatorsAppliances = [
  {
    slug: "crypto-mining-power",
    href: "/crypto-mining-power",
    title: "Crypto Mining Power Calculator",
    description:
      "Estimate kWh and electricity cost for GPU/ASIC rigs by wattage and run hours.",
    keywords: [
      "crypto mining power calculator",
      "mining rig electricity cost",
      "gpu mining kwh",
    ],
    icon: Bitcoin,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["energy-consumption", "electricity-bill", "appliance-daily-cost"],
    fields: [
      { id: "rigWatts", label: "Rig power draw", unit: "W", placeholder: "1200" },
      { id: "hoursPerDay", label: "Hours per day", unit: "hrs", placeholder: "24" },
      { id: "days", label: "Days", unit: "days", placeholder: "30" },
      { id: "ratePerKwh", label: "Electricity rate", unit: "$/kWh", placeholder: "0.12" },
    ],
    result: {
      label: "Period electricity cost",
      emptyMessage: "Enter watts, hours & rate",
    },
    seo: {
      sections: [
        {
          heading: "Mining power formula",
          body: "kWh = (watts × hours/day × days) ÷ 1,000. Cost = kWh × $/kWh. Include PSU efficiency losses by adding 5–10% to metered wall draw if needed.",
        },
        {
          heading: "Profitability note",
          body: "This tool covers energy only—not coin price, hash rate, or hardware ROI. Check revenue separately.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Should I use GPU TDP or wall meter? A: Wall meter (kill-a-watt) is most accurate. Q: 24/7 mining? A: Set hours to 24 for continuous operation.",
        },
      ],
    },
    compute(values) {
      const rigWatts = parsePositive(values.rigWatts ?? "");
      const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
      const days = parsePositive(values.days ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (rigWatts === null || hoursPerDay === null || days === null || ratePerKwh === null) {
        return { value: null };
      }
      const result = calculateCryptoMiningPower({
        rigWatts,
        hoursPerDay,
        days,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.totalCost),
        unit: "",
        detail: `${formatNumber(result.totalKwh, { maxDecimals: 1 })} kWh · ~${result.monthlyKwh} kWh/mo · ${result.dailyKwh} kWh/day`,
      };
    },
  },
  {
    slug: "vampire-power-cost",
    href: "/vampire-power-cost",
    title: "Vampire Power Cost Calculator",
    description:
      "Estimate yearly electricity cost for TVs, chargers, and other devices drawing power in standby.",
    keywords: [
      "vampire power calculator",
      "phantom load cost",
      "standby power annual cost",
      "vampire energy calculator",
    ],
    icon: PlugZap,
    tag: "Appliance",
    category: "appliance",
    suggestions: [
      "standby-power-waste",
      "energy-consumption",
      "whole-house-energy-budget",
      "electricity-bill",
    ],
    fields: [
      {
        id: "deviceType",
        label: "Common device",
        inputType: "select",
        colSpan: 2,
        defaultValue: "tv",
        options: Object.entries(VAMPIRE_DEVICE_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
      {
        id: "standbyWattsPerDevice",
        label: "Standby power draw",
        unit: "W",
        placeholder: "5",
        defaultValue: "5",
        hint: "Updates when you pick a device—override with a plug meter reading if you have one.",
      },
      {
        id: "deviceCount",
        label: "Number of devices",
        unit: "#",
        placeholder: "1",
        defaultValue: "1",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
      },
    ],
    result: {
      label: "Annual vampire power cost",
      emptyMessage: "Add at least one device and enter your electricity rate",
    },
    seo: {
      sections: [
        {
          heading: "Phantom load formula",
          body: "For each device row: annual kWh = (standby W × quantity × 24 h × 365 days) ÷ 1,000. The calculator sums every row, then multiplies total kWh by your $/kWh rate.",
        },
        {
          heading: "Typical standby draws",
          body: "Cable boxes and DVRs can draw 15–30 W; TVs and consoles often land at 3–10 W; chargers and adapters at 0.5–3 W. Add a row per device type and quantity, then override watts with a plug meter if you have one.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is vampire power worth fixing? A: One device may be pennies; a dozen adds up. Q: How do I stop it? A: Smart strips, unplugging idle chargers, and disabling quick-start on TVs cut standby without major lifestyle changes.",
        },
      ],
    },
    compute(values) {
      const standbyWattsPerDevice = parsePositive(values.standbyWattsPerDevice ?? "");
      const deviceCount = parsePositive(values.deviceCount ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (standbyWattsPerDevice === null || deviceCount === null || ratePerKwh === null) {
        return { value: null };
      }
      const result = calculateVampirePowerCost({
        standbyWattsPerDevice,
        deviceCount,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.annualCost),
        unit: "/yr",
        detail: `${result.annualKwh} kWh/yr · ${formatCurrency(result.monthlyCost)}/mo · ${result.totalStandbyWatts} W total standby`,
      };
    },
  },
  {
    slug: "standby-power-waste",
    href: "/standby-power-waste",
    title: "Standby Power Waste Calculator",
    description:
      "Quantify phantom load cost from devices left plugged in 24/7 on standby.",
    keywords: [
      "standby power calculator",
      "phantom load cost",
      "vampire power waste",
    ],
    icon: Moon,
    tag: "Appliance",
    category: "appliance",
    suggestions: [
      "vampire-power-cost",
      "energy-consumption",
      "electricity-bill",
      "fridge-energy-usage",
    ],
    fields: [
      {
        id: "standbyWattsPerDevice",
        label: "Standby per device",
        unit: "W",
        placeholder: "5",
        hint: "Typical TV/console: 1–10 W",
      },
      { id: "deviceCount", label: "Number of devices", unit: "#", placeholder: "12" },
      { id: "ratePerKwh", label: "Electricity rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: {
      label: "Annual standby cost",
      emptyMessage: "Enter watts per device & count",
    },
    seo: {
      sections: [
        {
          heading: "Phantom load formula",
          body: "Annual kWh = (watts × device count × 24 × 365) ÷ 1,000. Smart strips and unplugging idle chargers cut this waste.",
        },
        {
          heading: "Find standby watts",
          body: "Use a plug meter on each device, or assume 3–8 W for entertainment gear and 1–2 W for phone chargers.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Does off mean zero? A: Many devices still draw standby—true zero often requires unplugging. Q: Is 5 W realistic? A: It's a mid-range estimate; measure yours for accuracy.",
        },
      ],
    },
    compute(values) {
      const standbyWattsPerDevice = parsePositive(values.standbyWattsPerDevice ?? "");
      const deviceCount = parsePositive(values.deviceCount ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (standbyWattsPerDevice === null || deviceCount === null || ratePerKwh === null) {
        return { value: null };
      }
      const result = calculateStandbyPowerWaste({
        standbyWattsPerDevice,
        deviceCount,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.annualCost),
        unit: "/yr",
        detail: `${result.annualKwh} kWh/yr · ${formatCurrency(result.monthlyCost)}/mo · ${result.totalStandbyWatts} W total`,
      };
    },
  },
  {
    slug: "generator-fuel-consumption",
    href: "/generator-fuel-consumption",
    title: "Generator Fuel Consumption Calculator",
    description:
      "Estimate fuel use per hour and runtime from tank size at your load level.",
    keywords: [
      "generator fuel consumption calculator",
      "generator gallons per hour",
      "generator runtime fuel",
    ],
    icon: Fuel,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["ups-runtime", "home-backup-sizing", "energy-consumption"],
    fields: [
      { id: "loadWatts", label: "Load on generator", unit: "W", placeholder: "3500" },
      {
        id: "fuelConsumptionGalPerHour",
        label: "Fuel use at rated load",
        unit: "gal/hr",
        placeholder: "0.75",
        hint: "From generator spec sheet at ~100% load",
      },
      {
        id: "tankGallons",
        label: "Fuel tank size",
        unit: "gal",
        placeholder: "5",
        defaultValue: "5",
      },
    ],
    result: {
      label: "Estimated runtime",
      emptyMessage: "Enter load & fuel consumption",
    },
    seo: {
      sections: [
        {
          heading: "Fuel estimate",
          body: "Consumption scales roughly with load. We adjust rated gal/hr by load kW (minimum 25% factor) for partial-load operation.",
        },
        {
          heading: "Safety",
          body: "Never run portable generators indoors. Match rated watts to surge starting loads for motors.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Where do I find gal/hr? A: Owner's manual at rated load. Q: Propane? A: Convert units—1 gal gasoline ≈ 0.72 gal propane energy equivalent varies.",
        },
      ],
    },
    compute(values) {
      const loadWatts = parsePositive(values.loadWatts ?? "");
      const fuelConsumptionGalPerHour = parsePositive(
        values.fuelConsumptionGalPerHour ?? ""
      );
      const tankGallons = parseNonNegative(values.tankGallons ?? "") ?? 0;
      if (loadWatts === null || fuelConsumptionGalPerHour === null) {
        return { value: null };
      }
      const result = calculateGeneratorFuelConsumption({
        loadWatts,
        fuelConsumptionGalPerHour,
        tankGallons,
      });
      return {
        value: formatNumber(result.runtimeHours, { maxDecimals: 1 }),
        unit: "hours",
        detail: `${result.consumptionGalPerHour} gal/hr @ ${result.loadKw} kW · ~${result.fuelPerDay} gal/day if 24 h`,
      };
    },
  },
  {
    slug: "heat-pump-vs-resistance",
    href: "/heat-pump-vs-resistance",
    title: "Heat Pump vs. Resistance Heat Calculator",
    description:
      "Compare electric heating cost: resistance strips (COP 1) vs. heat pump COP.",
    keywords: [
      "heat pump vs electric heat",
      "heat pump cop savings",
      "resistance heat cost",
    ],
    icon: Thermometer,
    tag: "Appliance",
    category: "appliance",
    suggestions: ["heater-cost", "electricity-bill", "energy-consumption"],
    fields: [
      { id: "heatingLoadKw", label: "Heating demand", unit: "kW", placeholder: "5" },
      {
        id: "heatPumpCop",
        label: "Heat pump COP",
        inputType: "range",
        min: 2,
        max: 5,
        step: 0.1,
        defaultValue: "3.5",
        unit: "",
        hint: "Typical cold-climate COP 2.5–4",
      },
      { id: "hoursPerDay", label: "Hours per day", unit: "hrs", placeholder: "6" },
      { id: "days", label: "Days", unit: "days", placeholder: "30" },
      { id: "ratePerKwh", label: "Electricity rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: {
      label: "Estimated savings",
      emptyMessage: "Enter load, COP & usage",
    },
    seo: {
      sections: [
        {
          heading: "COP explained",
          body: "Coefficient of Performance = heat delivered ÷ electrical input. Resistance heat = COP 1. A COP 3.5 heat pump uses ~1/3.5 the kWh for the same heat.",
        },
        {
          heading: "Cold weather",
          body: "COP drops in extreme cold—use seasonal average from your heat pump specs or utility case studies.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include auxiliary strips? A: This compares steady heating modes; backup strips may run briefly below balance point. Q: Gas comparison? A: Use EV vs Gas Savings pattern with local gas $/therm separately.",
        },
      ],
    },
    compute(values) {
      const heatingLoadKw = parsePositive(values.heatingLoadKw ?? "");
      const heatPumpCop = parsePositive(values.heatPumpCop ?? "");
      const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
      const days = parsePositive(values.days ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (
        heatingLoadKw === null ||
        heatPumpCop === null ||
        hoursPerDay === null ||
        days === null ||
        ratePerKwh === null ||
        heatPumpCop < 1
      ) {
        return { value: null };
      }
      const result = calculateHeatPumpVsResistance({
        heatingLoadKw,
        heatPumpCop,
        hoursPerDay,
        days,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.savings),
        unit: "saved",
        detail: `Resistance ${formatCurrency(result.resistanceCost)} vs heat pump ${formatCurrency(result.heatPumpCost)} · ${result.savingsPercent}% less energy`,
      };
    },
  },
  {
    slug: "whole-house-energy-budget",
    href: "/whole-house-energy-budget",
    title: "Whole House Energy Budget Calculator",
    description:
      "Sum daily kWh by category and estimate monthly and annual electricity cost.",
    keywords: [
      "whole house energy budget",
      "home kwh estimate",
      "monthly electricity budget",
    ],
    icon: Home,
    tag: "Appliance",
    category: "appliance",
    suggestions: [
      "vampire-power-cost",
      "electricity-bill",
      "energy-consumption",
      "appliance-monthly-energy",
    ],
    fields: [
      { id: "hvacDailyKwh", label: "HVAC", unit: "kWh/day", placeholder: "25", defaultValue: "25" },
      {
        id: "waterHeaterDailyKwh",
        label: "Water heater",
        unit: "kWh/day",
        placeholder: "12",
        defaultValue: "12",
      },
      {
        id: "kitchenDailyKwh",
        label: "Kitchen",
        unit: "kWh/day",
        placeholder: "8",
        defaultValue: "8",
      },
      {
        id: "laundryDailyKwh",
        label: "Laundry",
        unit: "kWh/day",
        placeholder: "3",
        defaultValue: "3",
      },
      {
        id: "otherDailyKwh",
        label: "Other loads",
        unit: "kWh/day",
        placeholder: "10",
        defaultValue: "10",
      },
      { id: "ratePerKwh", label: "Electricity rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: {
      label: "Monthly energy cost",
      emptyMessage: "Enter daily kWh categories & rate",
    },
    seo: {
      sections: [
        {
          heading: "Building a home budget",
          body: "Split use into HVAC, water heating, kitchen, laundry, and other (lights, electronics, EV). Daily kWh × 30 ≈ monthly kWh.",
        },
        {
          heading: "Refine your estimate",
          body: "Pull 12 months of utility bills or use smart-meter data. Pair with Solar Net Metering if you have PV.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Typical home daily kWh? A: U.S. average is often 25–35 kWh/day depending on climate and fuel types. Q: Gas heat? A: HVAC kWh may be low if heat is gas—adjust categories.",
        },
      ],
    },
    compute(values) {
      const hvacDailyKwh = parseNonNegative(values.hvacDailyKwh ?? "") ?? 0;
      const waterHeaterDailyKwh = parseNonNegative(values.waterHeaterDailyKwh ?? "") ?? 0;
      const kitchenDailyKwh = parseNonNegative(values.kitchenDailyKwh ?? "") ?? 0;
      const laundryDailyKwh = parseNonNegative(values.laundryDailyKwh ?? "") ?? 0;
      const otherDailyKwh = parseNonNegative(values.otherDailyKwh ?? "") ?? 0;
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      if (ratePerKwh === null) return { value: null };
      const totalDaily =
        hvacDailyKwh +
        waterHeaterDailyKwh +
        kitchenDailyKwh +
        laundryDailyKwh +
        otherDailyKwh;
      if (totalDaily <= 0) return { value: null };
      const result = calculateWholeHouseEnergyBudget({
        hvacDailyKwh,
        waterHeaterDailyKwh,
        kitchenDailyKwh,
        laundryDailyKwh,
        otherDailyKwh,
        ratePerKwh,
      });
      return {
        value: formatCurrency(result.monthlyCost),
        unit: "/mo",
        detail: `${result.dailyKwh} kWh/day · ${result.monthlyKwh} kWh/mo · ${formatCurrency(result.annualCost)}/yr`,
      };
    },
  },
  {
    slug: "lighting-circuit-load",
    href: "/lighting-circuit-load",
    title: "Lighting Circuit Load Calculator",
    description:
      "Sum fixture watts, compute circuit amps, and check breaker utilization against the 80% continuous-load guideline.",
    keywords: [
      "lighting circuit load calculator",
      "lighting breaker sizing",
      "80 percent continuous load",
      "led circuit ampacity",
      "lighting panel load",
    ],
    icon: Lamp,
    tag: "Lighting",
    category: "appliance",
    suggestions: [
      "watts-to-amps",
      "residential-voltage-drop",
      "led-vs-incandescent-roi",
    ],
    fields: [
      {
        id: "fixtureCount",
        label: "Number of fixtures",
        unit: "#",
        placeholder: "12",
      },
      {
        id: "wattsPerFixture",
        label: "Power per fixture",
        unit: "W",
        placeholder: "9",
        hint: "Nameplate or LED driver rating",
      },
      {
        id: "circuitVoltage",
        label: "Circuit voltage",
        unit: "V",
        placeholder: "120",
        defaultValue: "120",
      },
      {
        id: "breakerAmps",
        label: "Breaker rating",
        unit: "A",
        placeholder: "15",
        defaultValue: "15",
        hint: "Common lighting circuits: 15 A or 20 A",
      },
    ],
    result: {
      label: "Circuit load",
      emptyMessage: "Enter fixtures, watts, voltage & breaker",
    },
    seo: {
      sections: [
        {
          heading: "Why lighting load planning matters",
          body: "Lighting circuits run for hours—often treated as continuous loads. Loading a breaker past 80% of its rating risks heat, nuisance trips, and dimming when other loads share the neutral. Count every luminaire on the branch before you close the drywall.",
        },
        {
          heading: "Load math",
          body: "Total W = fixtures × W each. Amps = W ÷ V. Utilization % = 100 × amps ÷ breaker amps. Compare to 80% of breaker amps (12 A on a 15 A breaker, 16 A on 20 A) for continuous-load headroom.",
        },
        {
          heading: "LED vs. legacy watts",
          body: "LED retrofits cut amps dramatically—do not size new breakers using old incandescent nameplates on the same fixture count. Use actual driver watts from cut sheets.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: 240 V lighting? A: Enter line voltage the circuit uses; amps = W ÷ V. Q: Dimming? A: Plan for rated wattage, not dimmed level. Q: Code compliance? A: Planning tool—follow local NEC or IEC and licensed design for permits.",
        },
      ],
    },
    compute(values) {
      const fixtureCount = parsePositive(values.fixtureCount ?? "");
      const wattsPerFixture = parsePositive(values.wattsPerFixture ?? "");
      const circuitVoltage = parsePositive(values.circuitVoltage ?? "");
      const breakerAmps = parsePositive(values.breakerAmps ?? "");
      if (
        fixtureCount === null ||
        wattsPerFixture === null ||
        circuitVoltage === null ||
        breakerAmps === null
      ) {
        return { value: null };
      }
      const result = calculateLightingCircuitLoad({
        fixtureCount,
        wattsPerFixture,
        circuitVoltage,
        breakerAmps,
      });
      return {
        value: formatNumber(result.loadAmps, { maxDecimals: 2 }),
        unit: "A",
        detail: `${result.totalWatts} W · ${result.utilizationPercent}% of ${breakerAmps} A breaker · ${result.recommendation}`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
