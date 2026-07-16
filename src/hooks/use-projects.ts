"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PROJECTS_CHANGED_EVENT,
  PROJECTS_STORAGE_KEY,
  listProjects,
  type WattQuickProject,
} from "@/lib/project-store";

export function useProjects() {
  const [projects, setProjects] = useState<WattQuickProject[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setProjects(listProjects());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === PROJECTS_STORAGE_KEY) refresh();
    };
    const onChanged = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(PROJECTS_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PROJECTS_CHANGED_EVENT, onChanged);
    };
  }, [refresh]);

  return {
    projects,
    hydrated,
    refresh,
  };
}
