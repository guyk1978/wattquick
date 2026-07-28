import type { ReactNode } from "react";

/** Minimal chrome so Playwright can capture the VIZ frame without site chrome noise. */
export default function SharePreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="viz-share-preview-root">{children}</div>;
}
