export type BlogContentSegment =
  | { type: "markdown"; content: string }
  | { type: "embed"; slug: string };

const EMBED_REGEX =
  /<CalculatorEmbed\s+slug=["']([^"']+)["']\s*\/>/g;

/** Split markdown body into alternating prose and calculator embed segments. */
export function parseBlogContent(raw: string): BlogContentSegment[] {
  const segments: BlogContentSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(EMBED_REGEX.source, "g");
  while ((match = regex.exec(raw)) !== null) {
    const before = raw.slice(lastIndex, match.index).trim();
    if (before) {
      segments.push({ type: "markdown", content: before });
    }
    segments.push({ type: "embed", slug: match[1] });
    lastIndex = match.index + match[0].length;
  }

  const tail = raw.slice(lastIndex).trim();
  if (tail) {
    segments.push({ type: "markdown", content: tail });
  }

  if (segments.length === 0 && raw.trim()) {
    segments.push({ type: "markdown", content: raw.trim() });
  }

  return segments;
}

export function estimateReadMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}
