import {
  Activity,
  Battery,
  Bike,
  CircleDollarSign,
  Gauge,
  Plug,
  Scale,
  Timer,
  Zap,
} from "lucide-react";
import type { CalculatorDataEntry } from "@/data/calculator-types";
import {
  ASSIST_PRESETS,
  formatEbikeBatteryCRateResult,
  formatEbikeBatteryCycleLifeResult,
  formatEbikeChargingCostResult,
  formatEbikeChargeTimeResult,
  formatEbikeCommuteSavingsResult,
  formatEbikeControllerWattsResult,
  formatEbikeMaxSpeedResult,
  formatEbikeRangeResult,
  formatEbikeVoltageSagResult,
  formatEbikeWeightPerformanceResult,
  TERRAIN_PRESETS,
} from "@/lib/calculators/ebike";

const EBIKE_SEO_INTRO =
  "Estimates are for planning rides, charging, and battery health—not a substitute for manufacturer specs or professional e-bike service.";

/** E-bike micro-calculators */
export const calculatorsEbike = [
  {
    slug: "ebike-range-estimator",
    href: "/ebike-range-estimator",
    title: "E-Bike Range Estimator",
    description:
      "Estimate riding range from battery capacity (Wh), average speed, and pedal-assist level.",
    keywords: [
      "ebike range calculator",
      "electric bike range",
      "wh per km ebike",
      "pedal assist range",
    ],
    icon: Bike,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-charging-cost",
      "ebike-weight-performance",
      "ebike-charge-time",
      "ebike-battery-cycle-life",
    ],
    fields: [
      {
        id: "batteryWh",
        label: "Battery capacity",
        unit: "Wh",
        placeholder: "500",
        defaultValue: "500",
      },
      {
        id: "avgSpeedKmh",
        label: "Average speed",
        unit: "km/h",
        placeholder: "22",
        defaultValue: "22",
      },
      {
        id: "assistLevel",
        label: "Pedal-assist level",
        inputType: "select",
        colSpan: 2,
        defaultValue: "tour",
        options: Object.entries(ASSIST_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
    ],
    result: {
      label: "Estimated range",
      emptyMessage: "Enter battery Wh, speed & assist level",
    },
    seo: {
      sections: [
        {
          heading: "How range is estimated",
          body: "Consumption scales with assist level and speed. Higher assist draws more motor power; faster riding increases aerodynamic load.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeRangeResult,
  },
  {
    slug: "ebike-charging-cost",
    href: "/ebike-charging-cost",
    title: "E-Bike Full Charge Cost Calculator",
    description:
      "Calculate the cost of a full battery charge from pack capacity and your home electricity rate.",
    keywords: [
      "ebike charging cost",
      "electric bike electricity cost",
      "charge cost per kwh",
    ],
    icon: CircleDollarSign,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-charge-time",
      "ebike-commute-savings",
      "ebike-range-estimator",
    ],
    fields: [
      {
        id: "batteryWh",
        label: "Battery capacity",
        unit: "Wh",
        placeholder: "500",
        defaultValue: "500",
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
      label: "Full charge cost",
      emptyMessage: "Enter battery Wh & electricity rate",
    },
    seo: {
      sections: [
        {
          heading: "Home charging economics",
          body: "Multiply pack energy (kWh) by your utility rate. Actual cost may differ with charger losses or tiered tariffs.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeChargingCostResult,
  },
  {
    slug: "ebike-max-speed",
    href: "/ebike-max-speed",
    title: "E-Bike Max Speed Calculator",
    description:
      "Estimate theoretical top speed from battery voltage, motor KV rating, and wheel diameter.",
    keywords: [
      "ebike max speed",
      "motor kv calculator",
      "ebike speed voltage",
      "electric bike rpm",
    ],
    icon: Gauge,
    tag: "E-Bike",
    category: "ebike",
    suggestions: ["ebike-controller-watts", "ebike-voltage-sag", "ebike-battery-c-rate"],
    fields: [
      {
        id: "batteryVoltage",
        label: "Battery voltage",
        unit: "V",
        placeholder: "48",
        defaultValue: "48",
      },
      {
        id: "motorKv",
        label: "Motor KV",
        unit: "RPM/V",
        placeholder: "8",
        defaultValue: "8",
        hint: "RPM per volt under no load",
      },
      {
        id: "wheelDiameterMm",
        label: "Wheel diameter",
        unit: "mm",
        placeholder: "700",
        defaultValue: "700",
        hint: "Typical 29″ ≈ 737 mm · 27.5″ ≈ 700 mm",
      },
    ],
    result: {
      label: "Theoretical max speed",
      emptyMessage: "Enter voltage, KV & wheel size",
    },
    seo: {
      sections: [
        {
          heading: "Speed vs voltage",
          body: "No-load RPM ≈ voltage × KV. Loaded speed is lower due to wind, rolling resistance, and controller limits.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeMaxSpeedResult,
  },
  {
    slug: "ebike-charge-time",
    href: "/ebike-charge-time",
    title: "E-Bike Charge Time Calculator",
    description:
      "Estimate 0–100% charge duration from pack capacity, charger wattage, and charge efficiency.",
    keywords: [
      "ebike charge time",
      "battery charging hours",
      "ebike charger wattage",
    ],
    icon: Timer,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-charging-cost",
      "ebike-battery-cycle-life",
      "ebike-range-estimator",
    ],
    fields: [
      {
        id: "batteryWh",
        label: "Battery capacity",
        unit: "Wh",
        placeholder: "500",
        defaultValue: "500",
      },
      {
        id: "chargerW",
        label: "Charger output",
        unit: "W",
        placeholder: "120",
        defaultValue: "120",
      },
      {
        id: "chargeEfficiency",
        label: "Charge efficiency",
        unit: "%",
        placeholder: "90",
        defaultValue: "90",
        hint: "Typical 85–95% including BMS & heat loss",
      },
    ],
    result: {
      label: "Estimated charge time",
      emptyMessage: "Enter capacity, charger W & efficiency",
    },
    seo: {
      sections: [
        {
          heading: "Charge time basics",
          body: "Time ≈ battery Wh ÷ (charger W × efficiency). The final 10–20% often tapers, extending real-world time.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: (values) =>
      formatEbikeChargeTimeResult({
        ...values,
        chargeEfficiency: String(
          (parseFloat(values.chargeEfficiency || "90") || 90) / 100
        ),
      }),
  },
  {
    slug: "ebike-battery-c-rate",
    href: "/ebike-battery-c-rate",
    title: "E-Bike Battery C-Rating Calculator",
    description:
      "Check whether your pack can safely deliver the continuous current your motor demands.",
    keywords: [
      "ebike c rating",
      "battery continuous current",
      "ebike motor amps",
      "lithium discharge rate",
    ],
    icon: Battery,
    tag: "E-Bike",
    category: "ebike",
    suggestions: ["ebike-voltage-sag", "ebike-controller-watts", "ebike-max-speed"],
    fields: [
      {
        id: "capacityAh",
        label: "Pack capacity",
        unit: "Ah",
        placeholder: "10",
        defaultValue: "10",
      },
      {
        id: "cRating",
        label: "Continuous C-rating",
        unit: "C",
        placeholder: "2",
        defaultValue: "2",
        hint: "Many e-bike packs are rated 1C–3C continuous",
      },
      {
        id: "motorAmps",
        label: "Motor draw",
        unit: "A",
        placeholder: "18",
        defaultValue: "18",
        hint: "Peak or sustained current from controller",
      },
    ],
    result: {
      label: "Max continuous current",
      emptyMessage: "Enter Ah, C-rating & motor amps",
    },
    seo: {
      sections: [
        {
          heading: "C-rating explained",
          body: "Max continuous amps = capacity (Ah) × C-rating. Exceeding this raises cell temperature and accelerates degradation.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeBatteryCRateResult,
  },
  {
    slug: "ebike-voltage-sag",
    href: "/ebike-voltage-sag",
    title: "E-Bike Voltage Sag Calculator",
    description:
      "Calculate voltage drop under load from internal pack resistance and motor current.",
    keywords: [
      "ebike voltage sag",
      "battery internal resistance",
      "voltage drop under load",
    ],
    icon: Activity,
    tag: "E-Bike",
    category: "ebike",
    suggestions: ["ebike-battery-c-rate", "ebike-controller-watts", "ebike-max-speed"],
    fields: [
      {
        id: "nominalVoltage",
        label: "Nominal voltage",
        unit: "V",
        placeholder: "48",
        defaultValue: "48",
      },
      {
        id: "internalResistanceMohm",
        label: "Internal resistance",
        unit: "mΩ",
        placeholder: "150",
        defaultValue: "150",
      },
      {
        id: "loadAmps",
        label: "Load current",
        unit: "A",
        placeholder: "25",
        defaultValue: "25",
        hint: "During hill climb or hard acceleration",
      },
    ],
    result: {
      label: "Voltage sag",
      emptyMessage: "Enter voltage, resistance & load amps",
    },
    seo: {
      sections: [
        {
          heading: "Why sag matters",
          body: "Sag = current × internal resistance. Large sag cuts torque, triggers BMS limits, and feels like power loss on climbs.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeVoltageSagResult,
  },
  {
    slug: "ebike-weight-performance",
    href: "/ebike-weight-performance",
    title: "E-Bike Weight vs Performance Calculator",
    description:
      "See how total mass (rider + bike + cargo) and terrain affect energy use and range.",
    keywords: [
      "ebike weight range",
      "rider weight ebike",
      "cargo ebike efficiency",
      "hilly terrain range",
    ],
    icon: Scale,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-range-estimator",
      "ebike-commute-savings",
      "ebike-battery-cycle-life",
    ],
    fields: [
      {
        id: "batteryWh",
        label: "Battery capacity",
        unit: "Wh",
        placeholder: "500",
        defaultValue: "500",
      },
      {
        id: "totalMassKg",
        label: "Total mass",
        unit: "kg",
        placeholder: "95",
        defaultValue: "95",
        hint: "Rider + bike + gear",
      },
      {
        id: "referenceMassKg",
        label: "Reference mass",
        unit: "kg",
        placeholder: "85",
        defaultValue: "85",
        hint: "Baseline for comparison (optional)",
      },
      {
        id: "terrain",
        label: "Terrain profile",
        inputType: "select",
        colSpan: 2,
        defaultValue: "flat",
        options: Object.entries(TERRAIN_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
    ],
    result: {
      label: "Adjusted range",
      emptyMessage: "Enter capacity, mass & terrain",
    },
    seo: {
      sections: [
        {
          heading: "Mass and hills",
          body: "Heavier loads and climbing increase Wh/km consumption. Cargo racks and touring gear can noticeably shorten range.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeWeightPerformanceResult,
  },
  {
    slug: "ebike-commute-savings",
    href: "/ebike-commute-savings",
    title: "E-Bike Commute Savings Calculator",
    description:
      "Compare annual commuting cost: e-bike electricity vs car per-km vs public transit fares.",
    keywords: [
      "ebike vs car cost",
      "commute savings calculator",
      "ebike vs transit",
      "electric bike annual cost",
    ],
    icon: CircleDollarSign,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-charging-cost",
      "ebike-range-estimator",
      "ev-vs-gas-savings",
    ],
    fields: [
      {
        id: "oneWayKm",
        label: "One-way commute",
        unit: "km",
        placeholder: "8",
        defaultValue: "8",
      },
      {
        id: "commuteDays",
        label: "Commute days per year",
        unit: "days",
        placeholder: "220",
        defaultValue: "220",
      },
      {
        id: "batteryWh",
        label: "Battery capacity",
        unit: "Wh",
        placeholder: "500",
        defaultValue: "500",
        hint: "Used to estimate recharge energy per trip pattern",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
      },
      {
        id: "carCostPerKm",
        label: "Car cost",
        unit: "$/km",
        placeholder: "0.18",
        defaultValue: "0.18",
        hint: "Fuel + wear average",
      },
      {
        id: "transitCostPerTrip",
        label: "Transit fare",
        unit: "$/trip",
        placeholder: "3.5",
        defaultValue: "3.5",
      },
    ],
    result: {
      label: "Annual savings vs car",
      emptyMessage: "Enter commute distance, days & cost assumptions",
    },
    seo: {
      sections: [
        {
          heading: "Yearly comparison",
          body: "E-bike cost scales with electricity and ~12 Wh/km riding estimate. Car and transit inputs should include your local fuel, parking, and pass prices.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeCommuteSavingsResult,
  },
  {
    slug: "ebike-controller-watts",
    href: "/ebike-controller-watts",
    title: "E-Bike Controller Amps to Watts Calculator",
    description:
      "Convert controller current draw to motor input and shaft power at different battery voltages.",
    keywords: [
      "ebike controller watts",
      "amps to watts ebike",
      "motor power calculator",
      "ebike motor amps",
    ],
    icon: Zap,
    tag: "E-Bike",
    category: "ebike",
    suggestions: ["ebike-battery-c-rate", "ebike-voltage-sag", "ebike-max-speed"],
    fields: [
      {
        id: "batteryVoltage",
        label: "Battery voltage",
        unit: "V",
        placeholder: "48",
        defaultValue: "48",
      },
      {
        id: "controllerAmps",
        label: "Controller current",
        unit: "A",
        placeholder: "20",
        defaultValue: "20",
      },
      {
        id: "motorEfficiency",
        label: "Motor efficiency",
        unit: "%",
        placeholder: "85",
        defaultValue: "85",
      },
    ],
    result: {
      label: "Electrical input power",
      emptyMessage: "Enter voltage, amps & efficiency",
    },
    seo: {
      sections: [
        {
          heading: "Controller to motor power",
          body: "Input watts = V × A. Shaft power is lower after motor and drivetrain losses—use manufacturer efficiency when available.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: (values) =>
      formatEbikeControllerWattsResult({
        ...values,
        motorEfficiency: String(
          (parseFloat(values.motorEfficiency || "85") || 85) / 100
        ),
      }),
  },
  {
    slug: "ebike-battery-cycle-life",
    href: "/ebike-battery-cycle-life",
    title: "E-Bike Battery Cycle Life Calculator",
    description:
      "Estimate remaining battery life from completed cycles, average depth of discharge, and rated cycle count.",
    keywords: [
      "ebike battery life",
      "cycle life calculator",
      "depth of discharge",
      "lithium ebike battery cycles",
    ],
    icon: Plug,
    tag: "E-Bike",
    category: "ebike",
    suggestions: [
      "ebike-charge-time",
      "ebike-charging-cost",
      "battery-calendar-aging",
    ],
    fields: [
      {
        id: "cyclesCompleted",
        label: "Cycles completed",
        unit: "cycles",
        placeholder: "250",
        defaultValue: "250",
      },
      {
        id: "avgDepthOfDischarge",
        label: "Average depth of discharge",
        unit: "%",
        placeholder: "70",
        defaultValue: "70",
        hint: "Typical daily use 50–80%",
      },
      {
        id: "ratedCycles",
        label: "Manufacturer rated cycles",
        unit: "cycles",
        placeholder: "800",
        defaultValue: "800",
        hint: "Often quoted at 80% DOD to 80% SOH",
      },
    ],
    result: {
      label: "Estimated remaining cycles",
      emptyMessage: "Enter cycles used, DOD & rated life",
    },
    seo: {
      sections: [
        {
          heading: "Cycle life factors",
          body: "Shallow discharges extend life. Deep daily drains and heat shorten it. Rated cycles assume lab conditions—real use varies.",
        },
        { heading: "Planning note", body: EBIKE_SEO_INTRO },
      ],
    },
    compute: formatEbikeBatteryCycleLifeResult,
  },
] as const satisfies readonly CalculatorDataEntry[];
