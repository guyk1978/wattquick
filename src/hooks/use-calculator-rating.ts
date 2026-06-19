"use client";

import { useCallback, useEffect, useState } from "react";
import {
  mergeUserVoteIntoAggregate,
  RATINGS_CHANGED_EVENT,
  RATINGS_DATA_PATH,
  RATINGS_STORAGE_KEY,
  readUserCalculatorRating,
  sanitizeRatingsMap,
  setUserCalculatorRating,
  type CalculatorRatingStats,
  type CalculatorRatingsMap,
} from "@/lib/calculator-ratings";
import type { CalculatorId } from "@/lib/calculators";

let catalogCache: CalculatorRatingsMap | null = null;
let catalogPromise: Promise<CalculatorRatingsMap> | null = null;

async function fetchRatingsCatalog(): Promise<CalculatorRatingsMap> {
  if (catalogCache) return catalogCache;
  if (catalogPromise) return catalogPromise;

  catalogPromise = fetch(RATINGS_DATA_PATH)
    .then((response) => (response.ok ? response.json() : {}))
    .then((data) => {
      catalogCache = sanitizeRatingsMap(data);
      return catalogCache;
    })
    .catch(() => {
      catalogCache = sanitizeRatingsMap({});
      return catalogCache;
    })
    .finally(() => {
      catalogPromise = null;
    });

  return catalogPromise;
}

export function useCalculatorRatingsCatalog() {
  const [catalog, setCatalog] = useState<CalculatorRatingsMap | null>(catalogCache);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    const next = await fetchRatingsCatalog();
    setCatalog(next);
  }, []);

  useEffect(() => {
    void refresh().finally(() => setHydrated(true));
  }, [refresh]);

  const getStats = useCallback(
    (id: CalculatorId): CalculatorRatingStats => {
      const remote = catalog?.[id] ?? { sum: 0, count: 0 };
      const userRating = readUserCalculatorRating(id);
      return mergeUserVoteIntoAggregate(remote, userRating);
    },
    [catalog]
  );

  return { catalog, hydrated, getStats, refresh };
}

export function useCalculatorRating(id: CalculatorId) {
  const [userRating, setUserRatingState] = useState<number | null>(null);
  const [stats, setStats] = useState<CalculatorRatingStats>({
    sum: 0,
    count: 0,
    average: null,
  });
  const [hydrated, setHydrated] = useState(false);

  const recompute = useCallback(async () => {
    const catalog = await fetchRatingsCatalog();
    const remote = catalog[id] ?? { sum: 0, count: 0 };
    const vote = readUserCalculatorRating(id);
    setUserRatingState(vote);
    setStats(mergeUserVoteIntoAggregate(remote, vote));
  }, [id]);

  useEffect(() => {
    void recompute().finally(() => setHydrated(true));

    const onStorage = (event: StorageEvent) => {
      if (event.key === RATINGS_STORAGE_KEY) void recompute();
    };
    const onChanged = () => void recompute();

    window.addEventListener("storage", onStorage);
    window.addEventListener(RATINGS_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(RATINGS_CHANGED_EVENT, onChanged);
    };
  }, [recompute]);

  const rate = useCallback(
    (rating: number) => {
      setUserCalculatorRating(id, rating);
      void recompute();
    },
    [id, recompute]
  );

  return { userRating, stats, hydrated, rate };
}
