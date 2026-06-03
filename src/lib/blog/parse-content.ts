export type BlogContentSegment =
  | { type: "markdown"; content: string }
  | { type: "embed"; slug: string }
  | { type: "toolPreview"; toolId: string };

const EMBED_REGEX =
  /<CalculatorEmbed\s+slug=["']([^"']+)["']\s*\/>/g;

const TOOL_PREVIEW_REGEX =
  /<ToolPreview\s+toolId=["']([^"']+)["']\s*\/>/gi;

const INLINE_TOOL_PATTERN =
  /(<CalculatorEmbed\s+slug=["'][^"']+["']\s*\/>|<ToolPreview\s+toolId=["'][^"']+["']\s*\/>)/gi;

function pushToolSegment(
  segments: BlogContentSegment[],
  tag: string,
  slugOrId: string
) {
  if (tag.toLowerCase().startsWith("<toolpreview")) {
    segments.push({ type: "toolPreview", toolId: slugOrId });
  } else {
    segments.push({ type: "embed", slug: slugOrId });
  }
}

/** Split markdown body into prose, CalculatorEmbed, and ToolPreview segments. */
export function parseBlogContent(raw: string): BlogContentSegment[] {
  const segments: BlogContentSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(INLINE_TOOL_PATTERN.source, "gi");
  while ((match = regex.exec(raw)) !== null) {
    const before = raw.slice(lastIndex, match.index).trim();
    if (before) {
      segments.push({ type: "markdown", content: before });
    }

    const tag = match[0];
    const embedMatch = tag.match(/slug=["']([^"']+)["']/i);
    const previewMatch = tag.match(/toolId=["']([^"']+)["']/i);
    const id = previewMatch?.[1] ?? embedMatch?.[1];
    if (id) pushToolSegment(segments, tag, id);

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

/** First-party calculator slugs referenced via `<CalculatorEmbed />` in markdown. */
export function extractCalculatorSlugs(content: string): string[] {
  const slugs: string[] = [];
  const regex = new RegExp(EMBED_REGEX.source, "g");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    if (!slugs.includes(match[1])) slugs.push(match[1]);
  }
  return slugs;
}
