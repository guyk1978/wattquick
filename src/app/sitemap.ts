import type { MetadataRoute } from "next";
import { getAllCalculatorMeta } from "@/lib/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculatorMeta();
  const base = "https://wattquick.com";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...calculators.map((calc) => ({
      url: `${base}${calc.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
