import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { HomeHero } from "@/components/home-hero";
import { HomeToolHub } from "@/components/home-tool-hub";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { getAllCalculatorMeta } from "@/lib/calculators";

const calculators = getAllCalculatorMeta();

const activeCategoryCount = CATEGORY_DISPLAY_ORDER.filter((cat) =>
  calculators.some((c) => c.category === cat)
).length;

export default function HomePage() {
  return (
    <div className="home-hub-page">
      <HomeHero
        calculatorCount={calculators.length}
        categoryCount={activeCategoryCount}
      />

      <div className="home-hub-page__body">
        <HomeToolHub
          allIds={[...CALCULATOR_SLUGS]}
          totalCount={calculators.length}
        />

        <CalnexAppCallout className="home-hub-page__partner" />
      </div>
    </div>
  );
}
