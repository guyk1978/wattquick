import {
  Cable,
  Compass,
  Droplets,
  Fuel,
  Home,
  LineChart,
  Network,
  Sun,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  parseLatitude,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateGeneratorVsSolarHybrid,
  calculateWaterPumpSolarSizing,
  calculateNetMetering,
  calculateOptimalAngles,
  calculatePanelDegradation,
  calculatePaybackRoi,
  calculateRoofSpace,
  type SeasonMode,
} from "@/lib/calculators/solar";
import { calculateDcCableVoltageDrop } from "@/lib/calculators/electrical";
import type { CalculatorDataEntry } from "@/data/calculator-types";

/** Solar micro-calculators (batch 4) */
export const calculatorsSolar = [
  {
    slug: "solar-roof-space",
    href: "/solar-roof-space",
    title: "Solar Panel Roof Space Calculator",
    description:
      "Estimate how many panels fit on your roof and total system size in kW—updates live.",
    keywords: [
      "solar roof space calculator",
      "how many solar panels fit on roof",
      "roof solar capacity",
    ],
    icon: Home,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-panel-size",
      "solar-daily-yield",
      "solar-payback-roi",
    ],
    fields: [
      {
        id: "usableRoofAreaSqFt",
        label: "Usable roof area",
        unit: "sq ft",
        placeholder: "800",
      },
      {
        id: "panelAreaSqFt",
        label: "Panel footprint",
        unit: "sq ft",
        placeholder: "20",
        defaultValue: "20",
        hint: "~400 W residential panel ≈ 20 sq ft",
      },
      {
        id: "panelWatts",
        label: "Panel rating",
        unit: "W",
        placeholder: "400",
        defaultValue: "400",
      },
      {
        id: "roofUsablePercent",
        label: "Roof usable for PV",
        inputType: "range",
        min: 50,
        max: 100,
        step: 5,
        defaultValue: "80",
        unit: "%",
        colSpan: 2,
        hint: "Accounts for setbacks, vents, and shading",
      },
    ],
    result: {
      label: "Maximum system size",
      emptyMessage: "Enter roof area and panel specs",
    },
    seo: {
      sections: [
        {
          heading: "How roof sizing works",
          body: "Effective area = roof sq ft × usable %. Max panels = floor(effective area ÷ panel footprint). System kW = panels × panel watts ÷ 1,000.",
        },
        {
          heading: "Planning tips",
          body: "Leave walkways for maintenance and comply with fire setbacks. Pair with Solar Panel Size to match daily energy needs.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: What panel size should I use? A: Measure one module or use ~20 sq ft for modern 350–450 W panels. Q: Is every square foot usable? A: No—80% is a common planning factor.",
        },
      ],
    },
    compute(values) {
      const usableRoofAreaSqFt = parsePositive(values.usableRoofAreaSqFt ?? "");
      const panelAreaSqFt = parsePositive(values.panelAreaSqFt ?? "");
      const panelWatts = parsePositive(values.panelWatts ?? "");
      const roofUsablePercent = Number(
        values.roofUsablePercent?.trim() || "80"
      );
      if (
        usableRoofAreaSqFt === null ||
        panelAreaSqFt === null ||
        panelWatts === null ||
        !Number.isFinite(roofUsablePercent) ||
        roofUsablePercent <= 0 ||
        roofUsablePercent > 100
      ) {
        return { value: null };
      }
      const result = calculateRoofSpace({
        usableRoofAreaSqFt,
        panelAreaSqFt,
        panelWatts,
        roofUsablePercent,
      });
      return {
        value: formatNumber(result.systemKw, { maxDecimals: 2 }),
        unit: "kW",
        detail: `${result.maxPanels} panels · ${result.areaUsedSqFt} sq ft of ${result.effectiveAreaSqFt} sq ft usable`,
      };
    },
  },
  {
    slug: "solar-payback-roi",
    href: "/solar-payback-roi",
    title: "Solar Payback Period (ROI) Calculator",
    description:
      "Estimate payback time and 25-year savings from system cost, production, and electricity rates.",
    keywords: [
      "solar payback calculator",
      "solar roi calculator",
      "solar break even",
    ],
    icon: LineChart,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-daily-yield",
      "solar-net-metering",
      "electricity-bill",
    ],
    fields: [
      {
        id: "systemCost",
        label: "System cost (installed)",
        unit: "$",
        placeholder: "18000",
      },
      {
        id: "annualProductionKwh",
        label: "Annual production",
        unit: "kWh/yr",
        placeholder: "12000",
      },
      {
        id: "electricityRatePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
      },
      {
        id: "incentivePercent",
        label: "Tax credit / incentives",
        inputType: "range",
        min: 0,
        max: 50,
        step: 1,
        defaultValue: "30",
        unit: "%",
        colSpan: 2,
        hint: "e.g. 30% federal ITC in the US",
      },
    ],
    result: {
      label: "Simple payback",
      emptyMessage: "Enter cost, kWh, and rate",
    },
    seo: {
      sections: [
        {
          heading: "Payback formula",
          body: "Net cost = system cost × (1 − incentive %). Annual savings = annual kWh × $/kWh. Payback years = net cost ÷ annual savings.",
        },
        {
          heading: "ROI note",
          body: "We also show rough 25-year net savings (no rate escalation or degradation). Use Solar Degradation to adjust long-term output.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Does this include financing? A: No—cash purchase only. Q: Are incentives guaranteed? A: Check local programs; this is a planning estimate.",
        },
      ],
    },
    compute(values) {
      const systemCost = parsePositive(values.systemCost ?? "");
      const annualProductionKwh = parsePositive(
        values.annualProductionKwh ?? ""
      );
      const electricityRatePerKwh = parsePositive(
        values.electricityRatePerKwh ?? ""
      );
      const incentivePercent = Number(values.incentivePercent?.trim() || "0");
      if (
        systemCost === null ||
        annualProductionKwh === null ||
        electricityRatePerKwh === null ||
        !Number.isFinite(incentivePercent) ||
        incentivePercent < 0 ||
        incentivePercent > 100
      ) {
        return { value: null };
      }
      const result = calculatePaybackRoi({
        systemCost,
        annualProductionKwh,
        electricityRatePerKwh,
        incentivePercent,
      });
      return {
        value: formatNumber(result.paybackYears, { maxDecimals: 1 }),
        unit: "years",
        detail: `Net ${formatCurrency(result.netCost)} · Saves ${formatCurrency(result.annualSavings)}/yr · 25-yr ROI ${result.roiPercent}%`,
      };
    },
  },
  {
    slug: "solar-angle-optimizer",
    href: "/solar-angle-optimizer",
    title: "Solar Panel Angle & Tilt Optimizer",
    description:
      "Optimal tilt and azimuth from latitude and season—fixed, summer, or winter mounting.",
    keywords: [
      "solar panel angle optimizer",
      "optimal tilt azimuth",
      "solar panel orientation",
    ],
    icon: Compass,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-panel-tilt",
      "solar-panel-size",
      "solar-daily-yield",
    ],
    fields: [
      {
        id: "latitude",
        label: "Latitude",
        unit: "°",
        placeholder: "40",
        hint: "Negative for Southern Hemisphere",
      },
      {
        id: "season",
        label: "Optimization goal",
        inputType: "select",
        defaultValue: "year-round",
        options: [
          { value: "year-round", label: "Year-round (best annual average)" },
          { value: "summer", label: "Summer peak output" },
          { value: "winter", label: "Winter peak output" },
        ],
        colSpan: 2,
      },
    ],
    result: {
      label: "Recommended tilt",
      emptyMessage: "Enter latitude",
    },
    seo: {
      sections: [
        {
          heading: "Tilt rules",
          body: "Year-round: tilt ≈ |latitude|. Summer: |latitude| − 15°. Winter: |latitude| + 15°. Azimuth faces true south (180°) in the Northern Hemisphere.",
        },
        {
          heading: "Fixed vs. adjustable",
          body: "Most rooftop arrays use a single year-round tilt matching roof pitch. Seasonal adjustments help ground mounts in snowy climates.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: What about azimuth? A: Due south (north in southern hemisphere) maximizes annual energy in most locations. Q: Flat roof? A: Use tilt racks near latitude for better yield than flat.",
        },
      ],
    },
    compute(values) {
      const latitude = parseLatitude(values.latitude ?? "");
      const season = values.season as SeasonMode;
      if (latitude === null || !["year-round", "summer", "winter"].includes(season)) {
        return { value: null };
      }
      const result = calculateOptimalAngles({ latitude, season });
      return {
        value: formatNumber(result.recommendedTilt, { maxDecimals: 1 }),
        unit: "° tilt",
        detail: `${result.hemisphere} Hemisphere · Azimuth ${result.azimuth}° · Summer ${result.summerTilt}° · Winter ${result.winterTilt}°`,
      };
    },
  },
  {
    slug: "solar-net-metering",
    href: "/solar-net-metering",
    title: "Grid-Tie Net Metering Calculator",
    description:
      "Compare monthly bills with solar: self-use, export credits, and grid imports.",
    keywords: [
      "net metering calculator",
      "solar grid tie savings",
      "solar export credit",
    ],
    icon: Network,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-payback-roi",
      "solar-daily-yield",
      "electricity-bill",
    ],
    fields: [
      {
        id: "monthlyProductionKwh",
        label: "Monthly solar production",
        unit: "kWh",
        placeholder: "900",
      },
      {
        id: "monthlyConsumptionKwh",
        label: "Monthly home use",
        unit: "kWh",
        placeholder: "850",
      },
      {
        id: "retailRatePerKwh",
        label: "Retail rate",
        unit: "$/kWh",
        placeholder: "0.14",
      },
      {
        id: "exportRatePerKwh",
        label: "Export / credit rate",
        unit: "$/kWh",
        placeholder: "0.08",
        hint: "Often lower than retail under NEM 3",
      },
    ],
    result: {
      label: "Estimated monthly savings",
      emptyMessage: "Enter production, use & rates",
    },
    seo: {
      sections: [
        {
          heading: "Net metering basics",
          body: "Self-consumed kWh = min(production, consumption). Excess is exported; shortfall is imported. Bill with solar = imported × retail − exported × export rate.",
        },
        {
          heading: "Policy varies",
          body: "Utilities differ on credit rates and time-of-use. Some regions use net billing at wholesale export rates—enter your actual export $/kWh.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why is export rate lower? A: Many utilities credit exports below retail. Q: Can savings be negative? A: We floor at $0—unusual unless fees exceed credits.",
        },
      ],
    },
    compute(values) {
      const monthlyProductionKwh = parsePositive(
        values.monthlyProductionKwh ?? ""
      );
      const monthlyConsumptionKwh = parsePositive(
        values.monthlyConsumptionKwh ?? ""
      );
      const retailRatePerKwh = parsePositive(values.retailRatePerKwh ?? "");
      const exportRatePerKwh = parseNonNegative(values.exportRatePerKwh ?? "");
      if (
        monthlyProductionKwh === null ||
        monthlyConsumptionKwh === null ||
        retailRatePerKwh === null ||
        exportRatePerKwh === null
      ) {
        return { value: null };
      }
      const result = calculateNetMetering({
        monthlyProductionKwh,
        monthlyConsumptionKwh,
        retailRatePerKwh,
        exportRatePerKwh,
      });
      return {
        value: formatCurrency(result.monthlySavings),
        unit: "/mo",
        detail: `Self-use ${result.selfConsumedKwh} kWh · Export ${result.exportedKwh} kWh · Import ${result.importedKwh} kWh · Bill ${formatCurrency(result.billWithSolar)} vs ${formatCurrency(result.billWithoutSolar)}`,
      };
    },
  },
  {
    slug: "solar-degradation",
    href: "/solar-degradation",
    title: "Solar Panel Degradation Calculator",
    description:
      "Estimate remaining annual output and capacity after years of panel degradation.",
    keywords: [
      "solar panel degradation",
      "pv output loss over time",
      "solar panel lifespan",
    ],
    icon: Sun,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-payback-roi",
      "solar-daily-yield",
      "solar-inverter-efficiency",
    ],
    fields: [
      {
        id: "ratedAnnualKwh",
        label: "Year-1 production",
        unit: "kWh/yr",
        placeholder: "12000",
      },
      {
        id: "systemAgeYears",
        label: "System age",
        unit: "years",
        placeholder: "5",
        defaultValue: "5",
      },
      {
        id: "annualDegradationPercent",
        label: "Annual degradation",
        inputType: "range",
        min: 0.3,
        max: 1.5,
        step: 0.1,
        defaultValue: "0.5",
        unit: "%/yr",
        colSpan: 2,
        hint: "Tier-1 panels often 0.5%/yr; check warranty sheet",
      },
    ],
    result: {
      label: "Current annual output",
      emptyMessage: "Enter year-1 kWh and system age",
    },
    seo: {
      sections: [
        {
          heading: "Degradation formula",
          body: "Current output = year-1 kWh × (1 − degradation %)^age. Most monocrystalline panels lose ~0.5% per year after an initial first-year stabilization.",
        },
        {
          heading: "Warranty context",
          body: "Manufacturers often guarantee ~80–90% of rated power at 25 years. This tool uses your chosen annual % for quick estimates.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is degradation linear? A: We model compound annual loss—a close fit for planning. Q: Does cleaning help? A: Soiling is separate from cell degradation.",
        },
      ],
    },
    compute(values) {
      const ratedAnnualKwh = parsePositive(values.ratedAnnualKwh ?? "");
      const systemAgeYears = parseNonNegative(values.systemAgeYears ?? "");
      const annualDegradationPercent = parsePositive(
        values.annualDegradationPercent ?? ""
      );
      if (
        ratedAnnualKwh === null ||
        systemAgeYears === null ||
        annualDegradationPercent === null ||
        annualDegradationPercent > 5
      ) {
        return { value: null };
      }
      const result = calculatePanelDegradation({
        ratedAnnualKwh,
        systemAgeYears,
        annualDegradationPercent,
      });
      return {
        value: formatNumber(result.currentAnnualKwh, { maxDecimals: 0 }),
        unit: "kWh/yr",
        detail: `${result.capacityRemainingPercent}% of year-1 · −${result.totalLossKwh} kWh vs. new`,
      };
    },
  },
  {
    slug: "generator-vs-solar-hybrid",
    href: "/generator-vs-solar-hybrid",
    title: "Off-Grid Generator vs. Solar Hybrid Calculator",
    description:
      "Compare 5- and 10-year cumulative costs of diesel generator-only power vs. a solar+battery hybrid—and estimate annual savings.",
    keywords: [
      "generator vs solar off grid",
      "solar hybrid payback",
      "diesel generator cost calculator",
      "off grid solar comparison",
    ],
    icon: Fuel,
    tag: "Off-Grid",
    category: "solar",
    suggestions: [
      "solar-battery-bank",
      "solar-panel-size",
      "solar-payback-roi",
    ],
    fields: [
      {
        id: "dailyKwh",
        label: "Daily energy use",
        unit: "kWh/day",
        placeholder: "18",
      },
      {
        id: "fuelCostPerLiter",
        label: "Fuel price",
        unit: "$/L",
        placeholder: "1.45",
      },
      {
        id: "generatorLitersPerHour",
        label: "Generator fuel use",
        unit: "L/hr",
        placeholder: "2.5",
        hint: "At typical load while running",
      },
      {
        id: "hybridSetupCost",
        label: "Hybrid solar setup cost",
        unit: "$",
        placeholder: "28000",
        hint: "Panels, batteries, inverter, install",
      },
      {
        id: "generatorMaintenanceAnnual",
        label: "Generator maintenance",
        unit: "$/yr",
        placeholder: "450",
      },
      {
        id: "hybridMaintenanceAnnual",
        label: "Hybrid maintenance",
        unit: "$/yr",
        placeholder: "200",
      },
    ],
    result: {
      label: "Estimated annual savings (hybrid)",
      emptyMessage: "Enter daily kWh, fuel, costs & maintenance",
    },
    seo: {
      sections: [
        {
          heading: "How the comparison works",
          body: "Generator-only cost = daily fuel (from kWh ÷ ~2.8 kWh/L) × 365 + maintenance. Hybrid adds upfront capex but assumes ~88% of energy from solar+battery, with ~12% backup fuel.",
        },
        {
          heading: "CAPEX vs. OPEX",
          body: "Generators look cheap to buy but burn fuel forever. Hybrid shifts spend to equipment; cumulative curves cross when fuel savings repay the install.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include generator purchase? A: Model existing genset OPEX only—add purchase price to hybrid side if replacing hardware. Q: Cloudy weeks? A: Adjust backup fraction in advanced planning; 12% is a moderate off-grid default.",
        },
      ],
    },
    compute(values) {
      const dailyKwh = parsePositive(values.dailyKwh ?? "");
      const fuelCostPerLiter = parsePositive(values.fuelCostPerLiter ?? "");
      const generatorLitersPerHour = parsePositive(
        values.generatorLitersPerHour ?? ""
      );
      const hybridSetupCost = parsePositive(values.hybridSetupCost ?? "");
      const generatorMaintenanceAnnual = parseNonNegative(
        values.generatorMaintenanceAnnual ?? ""
      );
      const hybridMaintenanceAnnual = parseNonNegative(
        values.hybridMaintenanceAnnual ?? ""
      );
      if (
        dailyKwh === null ||
        fuelCostPerLiter === null ||
        generatorLitersPerHour === null ||
        hybridSetupCost === null ||
        generatorMaintenanceAnnual === null ||
        hybridMaintenanceAnnual === null
      ) {
        return { value: null };
      }
      const result = calculateGeneratorVsSolarHybrid({
        dailyKwh,
        fuelCostPerLiter,
        generatorLitersPerHour,
        hybridSetupCost,
        generatorMaintenanceAnnual,
        hybridMaintenanceAnnual,
      });
      if (result.annualSavings <= 0) {
        return {
          value: formatCurrency(0),
          unit: "/yr",
          detail: "Hybrid OPEX exceeds generator-only at these inputs—recheck sizing or fuel price",
        };
      }
      return {
        value: formatCurrency(result.annualSavings),
        unit: "/yr",
        detail: `Gen ${formatCurrency(result.generator5Year)} vs hybrid ${formatCurrency(result.hybrid5Year)} (5 yr) · payback ~${result.paybackYears ?? "—"} yr`,
      };
    },
  },
  {
    slug: "water-pump-solar-sizing",
    href: "/water-pump-solar-sizing",
    title: "Water Pump Solar Sizing Calculator",
    description:
      "Size a solar array for irrigation or well pumps—kWp, panel count, and MPPT guidance from pump watts, run hours, lift, and peak sun.",
    keywords: [
      "water pump solar sizing",
      "solar pump calculator",
      "irrigation solar panel size",
      "solar well pump kwp",
      "mppt water pump",
    ],
    icon: Droplets,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-panel-size",
      "solar-charge-controller-size",
      "solar-battery-bank",
    ],
    fields: [
      {
        id: "pumpWatts",
        label: "Pump power",
        unit: "W",
        placeholder: "750",
        hint: "Nameplate or measured running watts at your head",
      },
      {
        id: "dailyHours",
        label: "Daily run time",
        unit: "hrs/day",
        placeholder: "6",
      },
      {
        id: "headMeters",
        label: "Pumping head",
        unit: "m",
        placeholder: "25",
        hint: "Static lift + friction (total dynamic head)",
      },
      {
        id: "peakSunHours",
        label: "Peak sun hours",
        unit: "hrs",
        placeholder: "5",
        hint: "Average full-sun equivalent hours for your site",
      },
    ],
    result: {
      label: "Required solar array",
      emptyMessage: "Enter pump watts, hours, head & peak sun hours",
    },
    seo: {
      sections: [
        {
          heading: "Why size solar for water pumps",
          body: "Off-grid and agricultural pumps run on predictable daily energy. Undersized arrays leave tanks empty; oversized arrays waste capex. This tool links pump load, lift, and local sun hours to kWp and panel count.",
        },
        {
          heading: "Sizing formula",
          body: "Daily Wh = pump W × run hours × (1 + 0.6% × head in meters). kWp = daily kWh ÷ (peak sun hours × ~80% system efficiency). Panel count = ceil(kWp × 1,000 ÷ module watts). Add 20–30% margin for cloudy days if you need battery backup.",
        },
        {
          heading: "MPPT vs. PWM",
          body: "MPPT controllers harvest more energy when array voltage differs from battery voltage or in cold weather. We recommend MPPT for most pump systems above ~150 W or 12 m head; very small 12 V direct pumps may use PWM.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: DC pump or AC? A: DC solar pumps skip inverter losses; AC needs inverter surge for motor starts—size accordingly. Q: Is head already in pump watts? A: If your wattage is measured at actual head, reduce the head field toward zero. Q: Battery storage? A: This estimates array for daily energy; add battery bank sizing for night or cloudy autonomy.",
        },
      ],
    },
    compute(values) {
      const pumpWatts = parsePositive(values.pumpWatts ?? "");
      const dailyHours = parsePositive(values.dailyHours ?? "");
      const headMeters = parseNonNegative(values.headMeters ?? "");
      const peakSunHours = parsePositive(values.peakSunHours ?? "");
      if (
        pumpWatts === null ||
        dailyHours === null ||
        headMeters === null ||
        peakSunHours === null
      ) {
        return { value: null };
      }
      const result = calculateWaterPumpSolarSizing({
        pumpWatts,
        dailyHours,
        headMeters,
        peakSunHours,
      });
      return {
        value: formatNumber(result.kWp, { maxDecimals: 2 }),
        unit: "kWp",
        detail: `${result.panelCount} × ${result.panelWatts} W panels · ${result.dailyKwh} kWh/day · ${result.mpptLabel}`,
      };
    },
  },
  {
    slug: "dc-cable-voltage-drop",
    href: "/dc-cable-voltage-drop",
    title: "DC Cable Size & Voltage Drop Calculator",
    description:
      "Size copper DC homeruns from panels to charge controller—minimum mm² / AWG for amp load, length in meters, and max voltage drop.",
    keywords: [
      "dc cable size calculator",
      "solar voltage drop calculator",
      "pv wire sizing mm2",
      "dc voltage drop percent",
      "solar array cable gauge",
    ],
    icon: Cable,
    tag: "Solar",
    category: "solar",
    suggestions: [
      "solar-panel-size",
      "solar-array-current",
      "solar-charge-controller-size",
      "dc-cable-size",
    ],
    fields: [
      {
        id: "loadAmps",
        label: "System current",
        unit: "A",
        placeholder: "12",
        defaultValue: "12",
        hint: "Array or string Isc / operating amps to controller",
      },
      {
        id: "systemVoltageV",
        label: "System voltage",
        unit: "V",
        placeholder: "48",
        defaultValue: "48",
        hint: "Nominal DC bus (12, 24, 48 V common off-grid)",
      },
      {
        id: "oneWayLengthM",
        label: "One-way cable length",
        unit: "m",
        placeholder: "15",
        defaultValue: "15",
        hint: "Panels to charge controller / MPPT (one conductor path)",
      },
      {
        id: "maxDropPercent",
        label: "Max voltage drop allowed",
        inputType: "range",
        min: 1,
        max: 5,
        step: 0.5,
        defaultValue: "3",
        unit: "%",
        colSpan: 2,
        hint: "3% is typical for DC solar homeruns",
      },
    ],
    result: {
      label: "Recommended cable size",
      emptyMessage: "Enter amps, voltage, length & max drop %",
    },
    seo: {
      sections: [
        {
          heading: "DC drop and solar yield",
          body: "Voltage drop on the PV homerun reduces power available to the controller. This tool computes minimum copper cross-section for your max drop %, then reports actual drop and I²R watts on the recommended standard cable.",
        },
        {
          heading: "Sizing assumptions",
          body: "Copper at ~20 °C, round-trip path (out and return). Ampacity limits are conservative planning values—follow local code and manufacturer tables for final installs.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: One-way or round-trip length? A: Enter one-way meters; resistance uses both conductors. Q: mm² or AWG? A: We show both on standard sizes. Q: Full system design? A: Pair with Solar Panel Size for array wattage.",
        },
      ],
    },
    compute(values) {
      const loadAmps = parsePositive(values.loadAmps ?? "");
      const systemVoltageV = parsePositive(values.systemVoltageV ?? "");
      const oneWayLengthM = parsePositive(values.oneWayLengthM ?? "");
      const maxDropRaw = values.maxDropPercent?.trim() ?? "3";
      const maxDropPercent = Number(maxDropRaw);
      if (
        loadAmps === null ||
        systemVoltageV === null ||
        oneWayLengthM === null ||
        !Number.isFinite(maxDropPercent) ||
        maxDropPercent <= 0
      ) {
        return { value: null };
      }
      const result = calculateDcCableVoltageDrop({
        loadAmps,
        systemVoltageV,
        oneWayLengthM,
        maxDropPercent,
      });
      return {
        value: result.recommendedCableLabel,
        unit: "",
        detail: `${formatNumber(result.dropPercent, { maxDecimals: 2 })}% drop · ${formatNumber(result.powerLossWatts, { maxDecimals: 1 })} W loss`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
