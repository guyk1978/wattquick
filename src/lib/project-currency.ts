export type ProjectCurrency = "ILS" | "USD" | "EUR";

export const DEFAULT_PROJECT_CURRENCY: ProjectCurrency = "ILS";

export const PROJECT_CURRENCY_OPTIONS: {
  code: ProjectCurrency;
  label: string;
}[] = [
  { code: "ILS", label: "₪ ILS — Israeli Shekel" },
  { code: "USD", label: "$ USD — US Dollar" },
  { code: "EUR", label: "€ EUR — Euro" },
];

const LOCALE_BY_CURRENCY: Record<ProjectCurrency, string> = {
  ILS: "he-IL",
  USD: "en-US",
  EUR: "de-DE",
};

export function isProjectCurrency(value: string): value is ProjectCurrency {
  return value === "ILS" || value === "USD" || value === "EUR";
}

export function resolveProjectCurrency(
  value: string | undefined
): ProjectCurrency {
  return value && isProjectCurrency(value) ? value : DEFAULT_PROJECT_CURRENCY;
}

export function formatProjectCurrency(
  amount: number,
  currency: ProjectCurrency
): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProjectCurrency(project: {
  currency?: string;
}): ProjectCurrency {
  return resolveProjectCurrency(project.currency);
}
