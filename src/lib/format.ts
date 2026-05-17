export function parsePositive(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num) || num <= 0) return null;
  return num;
}

export function parseNonNegative(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num) || num < 0) return null;
  return num;
}

export function parsePercent(value: string): number | null {
  const num = parsePositive(value);
  if (num === null || num > 100) return null;
  return num;
}

export function formatNumber(
  value: number,
  options?: { decimals?: number; maxDecimals?: number }
): string {
  const { decimals, maxDecimals = 2 } = options ?? {};
  if (decimals !== undefined) {
    return value.toFixed(decimals);
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDuration(hours: number): {
  display: string;
  unit: string;
  detail: string;
} {
  const detail = `${formatNumber(hours, { maxDecimals: 2 })} hours total`;

  if (hours < 1 / 60) {
    return {
      display: String(Math.round(hours * 3600)),
      unit: "sec",
      detail,
    };
  }

  if (hours < 1) {
    return {
      display: String(Math.round(hours * 60)),
      unit: "min",
      detail,
    };
  }

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return {
      display: formatNumber(wholeHours, { maxDecimals: 0 }),
      unit: wholeHours === 1 ? "hour" : "hours",
      detail,
    };
  }

  return {
    display: `${wholeHours}h ${minutes}m`,
    unit: "",
    detail,
  };
}
