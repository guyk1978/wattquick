export const RECENT_CALCULATORS_CHANGED_EVENT = "wattquick-recent-calculators-changed";

export function notifyRecentCalculatorsChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(RECENT_CALCULATORS_CHANGED_EVENT));
}
