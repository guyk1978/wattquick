import type { GuideLandingDefinition } from "@/lib/calculators/landing-types";

interface GuideLandingArticleProps {
  landing: GuideLandingDefinition;
}

export function GuideLandingArticle({ landing }: GuideLandingArticleProps) {
  const { content } = landing;

  return (
    <article className="max-w-none">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {content.heroSubtitle}
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Benefits
        </h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          {content.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          How it works
        </h2>
        <ol className="list-decimal space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          {content.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          FAQ
        </h2>
        {content.faq.map((item) => (
          <div key={item.q} className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">{item.q}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Technical specifications
        </h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          {content.technicalSpecs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 space-y-8 border-t border-border/50 pt-8">
        {landing.seo.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
