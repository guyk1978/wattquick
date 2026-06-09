import type { Metadata } from "next";
import { Suspense } from "react";
import { FavoritesDirectory } from "@/components/favorites-directory";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Favorite Calculators",
  description:
    "Your starred WattQuick calculators—saved in this browser for quick access to the tools you use most.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return (
    <PageShell className="max-w-6xl">
      <PageHeader
        title="Favorite calculators"
        description="Tools you starred appear here. Favorites are stored on this device—no account required."
      />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading favorites…</p>
        }
      >
        <FavoritesDirectory />
      </Suspense>
    </PageShell>
  );
}
