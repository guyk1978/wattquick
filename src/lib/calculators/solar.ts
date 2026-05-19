export interface RoofSpaceInput {
  usableRoofAreaSqFt: number;
  panelAreaSqFt: number;
  panelWatts: number;
  roofUsablePercent: number;
}

export function calculateRoofSpace({
  usableRoofAreaSqFt,
  panelAreaSqFt,
  panelWatts,
  roofUsablePercent,
}: RoofSpaceInput) {
  const effectiveArea = usableRoofAreaSqFt * (roofUsablePercent / 100);
  const maxPanels = Math.floor(effectiveArea / panelAreaSqFt);
  const systemKw = (maxPanels * panelWatts) / 1000;
  const areaUsedSqFt = maxPanels * panelAreaSqFt;

  return {
    maxPanels,
    systemKw: parseFloat(systemKw.toFixed(2)),
    areaUsedSqFt: Math.round(areaUsedSqFt),
    effectiveAreaSqFt: Math.round(effectiveArea),
  };
}

export interface PaybackRoiInput {
  systemCost: number;
  annualProductionKwh: number;
  electricityRatePerKwh: number;
  incentivePercent: number;
}

export function calculatePaybackRoi({
  systemCost,
  annualProductionKwh,
  electricityRatePerKwh,
  incentivePercent,
}: PaybackRoiInput) {
  const netCost = systemCost * (1 - Math.min(incentivePercent, 100) / 100);
  const annualSavings = annualProductionKwh * electricityRatePerKwh;
  const paybackYears =
    annualSavings > 0 ? netCost / annualSavings : Number.POSITIVE_INFINITY;
  const lifetimeYears = 25;
  const lifetimeSavings = annualSavings * lifetimeYears - netCost;
  const roiPercent =
    netCost > 0 ? (lifetimeSavings / netCost) * 100 : 0;

  return {
    netCost: Math.round(netCost),
    annualSavings: Math.round(annualSavings),
    paybackYears: parseFloat(
      (Number.isFinite(paybackYears) ? paybackYears : 0).toFixed(1)
    ),
    lifetimeSavings: Math.round(lifetimeSavings),
    roiPercent: parseFloat(roiPercent.toFixed(0)),
  };
}

export type SeasonMode = "year-round" | "summer" | "winter";

export interface AngleOptimizerInput {
  latitude: number;
  season: SeasonMode;
}

export function calculateOptimalAngles({
  latitude,
  season,
}: AngleOptimizerInput) {
  const absLat = Math.abs(latitude);
  const yearRoundTilt = absLat;
  const summerTilt = Math.max(0, absLat - 15);
  const winterTilt = Math.min(90, absLat + 15);
  const hemisphere = latitude >= 0 ? "Northern" : "Southern";
  const azimuth = latitude >= 0 ? 180 : 0;

  let recommendedTilt = yearRoundTilt;
  if (season === "summer") recommendedTilt = summerTilt;
  if (season === "winter") recommendedTilt = winterTilt;

  return {
    recommendedTilt: parseFloat(recommendedTilt.toFixed(1)),
    yearRoundTilt: parseFloat(yearRoundTilt.toFixed(1)),
    summerTilt: parseFloat(summerTilt.toFixed(1)),
    winterTilt: parseFloat(winterTilt.toFixed(1)),
    azimuth,
    hemisphere,
  };
}

export interface NetMeteringInput {
  monthlyProductionKwh: number;
  monthlyConsumptionKwh: number;
  retailRatePerKwh: number;
  exportRatePerKwh: number;
}

export function calculateNetMetering({
  monthlyProductionKwh,
  monthlyConsumptionKwh,
  retailRatePerKwh,
  exportRatePerKwh,
}: NetMeteringInput) {
  const selfConsumedKwh = Math.min(
    monthlyProductionKwh,
    monthlyConsumptionKwh
  );
  const exportedKwh = Math.max(
    0,
    monthlyProductionKwh - monthlyConsumptionKwh
  );
  const importedKwh = Math.max(
    0,
    monthlyConsumptionKwh - monthlyProductionKwh
  );

  const billWithoutSolar = monthlyConsumptionKwh * retailRatePerKwh;
  const billWithSolar =
    importedKwh * retailRatePerKwh - exportedKwh * exportRatePerKwh;
  const monthlySavings = billWithoutSolar - billWithSolar;

  return {
    selfConsumedKwh: parseFloat(selfConsumedKwh.toFixed(1)),
    exportedKwh: parseFloat(exportedKwh.toFixed(1)),
    importedKwh: parseFloat(importedKwh.toFixed(1)),
    billWithoutSolar: parseFloat(billWithoutSolar.toFixed(2)),
    billWithSolar: parseFloat(billWithSolar.toFixed(2)),
    monthlySavings: parseFloat(Math.max(0, monthlySavings).toFixed(2)),
  };
}

export interface PanelDegradationInput {
  ratedAnnualKwh: number;
  systemAgeYears: number;
  annualDegradationPercent: number;
}

export function calculatePanelDegradation({
  ratedAnnualKwh,
  systemAgeYears,
  annualDegradationPercent,
}: PanelDegradationInput) {
  const retentionFactor = Math.pow(
    1 - annualDegradationPercent / 100,
    systemAgeYears
  );
  const currentAnnualKwh = ratedAnnualKwh * retentionFactor;
  const capacityRemainingPercent = retentionFactor * 100;
  const totalLossKwh = ratedAnnualKwh - currentAnnualKwh;

  return {
    currentAnnualKwh: Math.round(currentAnnualKwh),
    capacityRemainingPercent: parseFloat(capacityRemainingPercent.toFixed(1)),
    totalLossKwh: Math.round(totalLossKwh),
  };
}
