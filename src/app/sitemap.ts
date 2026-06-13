import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { buildSitemapEntries } from "@/lib/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
