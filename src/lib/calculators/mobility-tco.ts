export const MOBILITY_TCO_MONTHS = 36;

export interface MobilityTcoCarInput {
  monthlyFuel: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  monthlyParking: number;
  monthlyDepreciation: number;
}

export interface MobilityTcoEbikeInput {
  purchaseCost: number;
  batteryReplacementCost: number;
  monthlyMaintenance: number;
  monthlyCharging: number;
}

export interface MobilityTcoEscooterInput {
  purchaseCost: number;
  maintenanceOver3Years: number;
  monthlyCharging: number;
}

export interface MobilityTcoCostBreakdown {
  initialPurchase: number;
  maintenance: number;
  energyFuel: number;
  insurance: number;
  total3Year: number;
}

export interface MobilityTcoModeResult {
  mode: "car" | "ebike" | "escooter";
  label: string;
  breakdown: MobilityTcoCostBreakdown;
}

export interface MobilityTcoResult {
  car: MobilityTcoModeResult;
  ebike: MobilityTcoModeResult;
  escooter: MobilityTcoModeResult;
  ebikeSavingsVsCar: number;
  escooterSavingsVsCar: number;
  bestSavingsVsCar: number;
  bestMode: "ebike" | "escooter";
  maxTotal3Year: number;
}

export const MOBILITY_TCO_DEFAULTS = {
  carMonthlyFuel: 120,
  carMonthlyInsurance: 150,
  carMonthlyMaintenance: 50,
  carMonthlyParking: 80,
  carMonthlyDepreciation: 200,
  ebikePurchaseCost: 2000,
  ebikeBatteryReplacement: 600,
  ebikeMonthlyMaintenance: 15,
  ebikeMonthlyCharging: 3,
  escooterPurchaseCost: 800,
  escooterMaintenance3yr: 150,
  escooterMonthlyCharging: 2,
} as const;

function roundMoney(value: number): number {
  return parseFloat(value.toFixed(2));
}

export function calculateMobilityTco(
  car: MobilityTcoCarInput,
  ebike: MobilityTcoEbikeInput,
  escooter: MobilityTcoEscooterInput
): MobilityTcoResult {
  const months = MOBILITY_TCO_MONTHS;

  const carBreakdown: MobilityTcoCostBreakdown = {
    initialPurchase: 0,
    maintenance: roundMoney(
      (car.monthlyMaintenance + car.monthlyParking + car.monthlyDepreciation) *
        months
    ),
    energyFuel: roundMoney(car.monthlyFuel * months),
    insurance: roundMoney(car.monthlyInsurance * months),
    total3Year: 0,
  };
  carBreakdown.total3Year = roundMoney(
    carBreakdown.initialPurchase +
      carBreakdown.maintenance +
      carBreakdown.energyFuel +
      carBreakdown.insurance
  );

  const ebikeBreakdown: MobilityTcoCostBreakdown = {
    initialPurchase: roundMoney(ebike.purchaseCost),
    maintenance: roundMoney(
      ebike.monthlyMaintenance * months + ebike.batteryReplacementCost
    ),
    energyFuel: roundMoney(ebike.monthlyCharging * months),
    insurance: 0,
    total3Year: 0,
  };
  ebikeBreakdown.total3Year = roundMoney(
    ebikeBreakdown.initialPurchase +
      ebikeBreakdown.maintenance +
      ebikeBreakdown.energyFuel
  );

  const escooterBreakdown: MobilityTcoCostBreakdown = {
    initialPurchase: roundMoney(escooter.purchaseCost),
    maintenance: roundMoney(escooter.maintenanceOver3Years),
    energyFuel: roundMoney(escooter.monthlyCharging * months),
    insurance: 0,
    total3Year: 0,
  };
  escooterBreakdown.total3Year = roundMoney(
    escooterBreakdown.initialPurchase +
      escooterBreakdown.maintenance +
      escooterBreakdown.energyFuel
  );

  const ebikeSavingsVsCar = roundMoney(
    carBreakdown.total3Year - ebikeBreakdown.total3Year
  );
  const escooterSavingsVsCar = roundMoney(
    carBreakdown.total3Year - escooterBreakdown.total3Year
  );
  const bestMode =
    ebikeSavingsVsCar >= escooterSavingsVsCar ? "ebike" : "escooter";
  const bestSavingsVsCar = Math.max(ebikeSavingsVsCar, escooterSavingsVsCar);

  const maxTotal3Year = Math.max(
    carBreakdown.total3Year,
    ebikeBreakdown.total3Year,
    escooterBreakdown.total3Year
  );

  return {
    car: { mode: "car", label: "Car", breakdown: carBreakdown },
    ebike: { mode: "ebike", label: "E-bike", breakdown: ebikeBreakdown },
    escooter: {
      mode: "escooter",
      label: "E-scooter",
      breakdown: escooterBreakdown,
    },
    ebikeSavingsVsCar,
    escooterSavingsVsCar,
    bestSavingsVsCar,
    bestMode,
    maxTotal3Year,
  };
}

export function parseMobilityTcoFromValues(
  values: Record<string, string | undefined>,
  parsePositive: (value: string) => number | null
): MobilityTcoResult | null {
  const carMonthlyFuel = parsePositive(values.carMonthlyFuel ?? "");
  const carMonthlyInsurance = parsePositive(values.carMonthlyInsurance ?? "");
  const carMonthlyMaintenance = parsePositive(values.carMonthlyMaintenance ?? "");
  const carMonthlyParking = parsePositive(values.carMonthlyParking ?? "") ?? 0;
  const carMonthlyDepreciation = parsePositive(values.carMonthlyDepreciation ?? "");
  const ebikePurchaseCost = parsePositive(values.ebikePurchaseCost ?? "");
  const ebikeBatteryReplacement = parsePositive(values.ebikeBatteryReplacement ?? "");
  const ebikeMonthlyMaintenance = parsePositive(values.ebikeMonthlyMaintenance ?? "");
  const ebikeMonthlyCharging = parsePositive(values.ebikeMonthlyCharging ?? "");
  const escooterPurchaseCost = parsePositive(values.escooterPurchaseCost ?? "");
  const escooterMaintenance3yr = parsePositive(values.escooterMaintenance3yr ?? "");
  const escooterMonthlyCharging = parsePositive(values.escooterMonthlyCharging ?? "");

  if (
    carMonthlyFuel === null ||
    carMonthlyInsurance === null ||
    carMonthlyMaintenance === null ||
    carMonthlyDepreciation === null ||
    ebikePurchaseCost === null ||
    ebikeBatteryReplacement === null ||
    ebikeMonthlyMaintenance === null ||
    ebikeMonthlyCharging === null ||
    escooterPurchaseCost === null ||
    escooterMaintenance3yr === null ||
    escooterMonthlyCharging === null
  ) {
    return null;
  }

  return calculateMobilityTco(
    {
      monthlyFuel: carMonthlyFuel,
      monthlyInsurance: carMonthlyInsurance,
      monthlyMaintenance: carMonthlyMaintenance,
      monthlyParking: carMonthlyParking,
      monthlyDepreciation: carMonthlyDepreciation,
    },
    {
      purchaseCost: ebikePurchaseCost,
      batteryReplacementCost: ebikeBatteryReplacement,
      monthlyMaintenance: ebikeMonthlyMaintenance,
      monthlyCharging: ebikeMonthlyCharging,
    },
    {
      purchaseCost: escooterPurchaseCost,
      maintenanceOver3Years: escooterMaintenance3yr,
      monthlyCharging: escooterMonthlyCharging,
    }
  );
}
