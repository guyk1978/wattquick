import { serializeJsonLd } from "@/lib/calculator-json-ld";

interface JsonLdScriptProps {
  data: object;
}

/** Inline JSON-LD script for structured data crawlers (render inside document head). */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
