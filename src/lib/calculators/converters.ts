import { formatNumber } from "@/lib/format";

export type ConductorMaterial = "copper" | "aluminum";

const MATERIAL_RESISTIVITY_20C: Record<ConductorMaterial, number> = {
  copper: 0.0175,
  aluminum: 0.0282,
};

const MATERIAL_TEMP_COEFF: Record<ConductorMaterial, number> = {
  copper: 0.00393,
  aluminum: 0.00403,
};

export function isConductorMaterial(value: string): value is ConductorMaterial {
  return value === "copper" || value === "aluminum";
}

export interface ConductorResistanceInput {
  material: ConductorMaterial;
  crossSectionMm2: number;
  lengthM: number;
  temperatureC: number;
}

export function calculateConductorResistance({
  material,
  crossSectionMm2,
  lengthM,
  temperatureC,
}: ConductorResistanceInput) {
  const rho20 = MATERIAL_RESISTIVITY_20C[material];
  const alpha = MATERIAL_TEMP_COEFF[material];
  const tempFactor = 1 + alpha * (temperatureC - 20);
  const resistanceOhm = (rho20 * lengthM * tempFactor) / crossSectionMm2;
  const resistancePerM = resistanceOhm / lengthM;
  const resistanceAt20 = (rho20 * lengthM) / crossSectionMm2;

  return {
    resistanceOhm: parseFloat(resistanceOhm.toFixed(4)),
    resistancePerM: parseFloat(resistancePerM.toFixed(6)),
    resistanceAt20: parseFloat(resistanceAt20.toFixed(4)),
    tempFactor: parseFloat(tempFactor.toFixed(4)),
    materialLabel: material === "copper" ? "Copper" : "Aluminum",
    temperatureC,
    crossSectionMm2,
    lengthM,
  };
}

export interface ReactivePowerInput {
  apparentKva: number;
  powerFactor: number;
}

export function calculateReactivePower({
  apparentKva,
  powerFactor,
}: ReactivePowerInput) {
  const pf = Math.min(1, Math.max(0.01, powerFactor));
  const realKw = apparentKva * pf;
  const reactiveKvar = apparentKva * Math.sin(Math.acos(pf));
  const phaseAngleDeg = Math.acos(pf) * (180 / Math.PI);

  return {
    realKw: parseFloat(realKw.toFixed(3)),
    reactiveKvar: parseFloat(reactiveKvar.toFixed(3)),
    apparentKva,
    powerFactor: pf,
    phaseAngleDeg: parseFloat(phaseAngleDeg.toFixed(1)),
    reactivePercent: parseFloat(((reactiveKvar / apparentKva) * 100).toFixed(1)),
  };
}

export interface BatteryDodEnergyYieldInput {
  nominalCapacityKwh: number;
  depthOfDischargePercent: number;
}

export function calculateBatteryDodEnergyYield({
  nominalCapacityKwh,
  depthOfDischargePercent,
}: BatteryDodEnergyYieldInput) {
  const dod = Math.min(100, Math.max(1, depthOfDischargePercent));
  const usableKwh = nominalCapacityKwh * (dod / 100);
  const usableWh = usableKwh * 1000;
  const reservedKwh = nominalCapacityKwh - usableKwh;

  return {
    usableKwh: parseFloat(usableKwh.toFixed(3)),
    usableWh: Math.round(usableWh),
    nominalCapacityKwh,
    depthOfDischargePercent: dod,
    reservedKwh: parseFloat(reservedKwh.toFixed(3)),
    reservedPercent: parseFloat((100 - dod).toFixed(1)),
  };
}

export function formatConductorResistanceDetail(
  result: ReturnType<typeof calculateConductorResistance>
): string {
  return `${result.materialLabel} · ${formatNumber(result.crossSectionMm2, { maxDecimals: 1 })} mm² · ${formatNumber(result.temperatureC, { maxDecimals: 0 })}°C · R₂₀ ${formatNumber(result.resistanceAt20, { maxDecimals: 4 })} Ω`;
}
