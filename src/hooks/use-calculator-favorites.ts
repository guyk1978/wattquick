"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FAVORITES_CHANGED_EVENT,
  FAVORITES_STORAGE_KEY,
  readFavoriteCalculatorIds,
  toggleCalculatorFavorite,
} from "@/lib/calculator-favorites";
import type { CalculatorId } from "@/lib/calculators";

export function useCalculatorFavorites() {
  const [ids, setIds] = useState<CalculatorId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setIds(readFavoriteCalculatorIds());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) refresh();
    };
    const onChanged = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(FAVORITES_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, onChanged);
    };
  }, [refresh]);

  const isFavorite = useCallback(
    (id: CalculatorId) => ids.includes(id),
    [ids]
  );

  const toggle = useCallback((id: CalculatorId) => {
    const { ids: next, favorited } = toggleCalculatorFavorite(id);
    setIds(next);
    return favorited;
  }, []);

  return {
    ids,
    hydrated,
    isFavorite,
    toggle,
    refresh,
  };
}
