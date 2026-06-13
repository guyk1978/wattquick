import { calculators } from "../src/data/calculators";
import { getCategorySeoSlug } from "../src/lib/category-routes";

for (const calc of calculators) {
  const from = `/${calc.slug}`;
  const to = `/tools/${getCategorySeoSlug(calc.category)}/${calc.slug}/`;
  console.log(`${from} ${to} 301`);
  console.log(`${from}/ ${to} 301`);
}
