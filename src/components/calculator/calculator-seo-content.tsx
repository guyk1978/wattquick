import { getCalculatorDefinition, type CalculatorId } from "@/lib/calculators";

interface CalculatorSeoContentProps {
  id: CalculatorId;
}

export function CalculatorSeoContent({ id }: CalculatorSeoContentProps) {
  const { seo, title } = getCalculatorDefinition(id);

  return (
    <article className="max-w-none">
      <h2 className="sr-only">About {title}</h2>
      <div className="space-y-8">
        {seo.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {section.heading}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
