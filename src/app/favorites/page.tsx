import type { Metadata } from "next";
import { FavoritesBlueprintPage } from "@/components/favorites/favorites-blueprint-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Favorite Calculators",
  description:
    "Your starred WattQuick calculators—saved in this browser for quick access to the tools you use most.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return <FavoritesBlueprintPage />;
}
