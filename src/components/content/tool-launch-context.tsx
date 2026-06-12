"use client";

import type { ReactNode } from "react";

/**
 * @deprecated Blog tools now navigate to full calculator pages.
 * Kept as a passthrough for any legacy wrappers.
 */
export function ToolLaunchProvider({ children }: { children: ReactNode }) {
  return children;
}
