import type { BlogCategory } from "@/lib/blog/posts";

export type BlogCategoryTheme = {
  label: string;
  bg: string;
  text: string;
  border: string;
  gradient: string;
  glow: string;
  accentFrom: string;
  accentTo: string;
};

export const BLOG_CATEGORY_THEME: Record<BlogCategory, BlogCategoryTheme> = {
  "EV Charging": {
    label: "EV Charging",
    bg: "bg-blue-500/12 dark:bg-blue-500/18",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-500/25 dark:border-blue-400/35",
    gradient: "from-blue-500/25 via-sky-400/15 to-indigo-600/20",
    glow: "rgba(59, 130, 246, 0.35)",
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
  },
  Solar: {
    label: "Solar",
    bg: "bg-amber-500/12 dark:bg-amber-500/18",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-500/25 dark:border-amber-400/35",
    gradient: "from-amber-400/30 via-orange-400/15 to-yellow-500/20",
    glow: "rgba(245, 158, 11, 0.35)",
    accentFrom: "#f59e0b",
    accentTo: "#eab308",
  },
  Battery: {
    label: "Battery",
    bg: "bg-emerald-500/12 dark:bg-emerald-500/18",
    text: "text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-500/25 dark:border-emerald-400/35",
    gradient: "from-emerald-500/25 via-lime-400/15 to-green-600/20",
    glow: "rgba(34, 197, 94, 0.35)",
    accentFrom: "#22c55e",
    accentTo: "#10b981",
  },
  Appliances: {
    label: "Appliances",
    bg: "bg-orange-500/12 dark:bg-orange-500/18",
    text: "text-orange-800 dark:text-orange-300",
    border: "border-orange-500/25 dark:border-orange-400/35",
    gradient: "from-orange-500/25 via-amber-400/15 to-red-400/15",
    glow: "rgba(249, 115, 22, 0.32)",
    accentFrom: "#f97316",
    accentTo: "#fb923c",
  },
  Guides: {
    label: "Guides",
    bg: "bg-violet-500/12 dark:bg-violet-500/18",
    text: "text-violet-800 dark:text-violet-300",
    border: "border-violet-500/25 dark:border-violet-400/35",
    gradient: "from-violet-500/25 via-purple-400/15 to-indigo-500/20",
    glow: "rgba(139, 92, 246, 0.32)",
    accentFrom: "#8b5cf6",
    accentTo: "#a78bfa",
  },
  Tips: {
    label: "Tips",
    bg: "bg-cyan-500/12 dark:bg-cyan-500/18",
    text: "text-cyan-800 dark:text-cyan-300",
    border: "border-cyan-500/25 dark:border-cyan-400/35",
    gradient: "from-cyan-500/25 via-teal-400/15 to-blue-500/15",
    glow: "rgba(6, 182, 212, 0.32)",
    accentFrom: "#06b6d4",
    accentTo: "#22d3ee",
  },
  "Commercial EV": {
    label: "Commercial EV",
    bg: "bg-indigo-500/12 dark:bg-indigo-500/18",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-500/25 dark:border-indigo-400/35",
    gradient: "from-indigo-600/30 via-blue-500/15 to-slate-600/20",
    glow: "rgba(99, 102, 241, 0.35)",
    accentFrom: "#6366f1",
    accentTo: "#3b82f6",
  },
  "RV & Marine": {
    label: "RV & Marine",
    bg: "bg-sky-500/12 dark:bg-sky-500/18",
    text: "text-sky-800 dark:text-sky-300",
    border: "border-sky-500/25 dark:border-sky-400/35",
    gradient: "from-sky-500/25 via-cyan-400/15 to-blue-600/20",
    glow: "rgba(14, 165, 233, 0.35)",
    accentFrom: "#0ea5e9",
    accentTo: "#38bdf8",
  },
  "Utility Tariffs": {
    label: "Utility Tariffs",
    bg: "bg-purple-500/12 dark:bg-purple-500/18",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-500/25 dark:border-purple-400/35",
    gradient: "from-purple-500/25 via-fuchsia-400/15 to-violet-600/20",
    glow: "rgba(168, 85, 247, 0.35)",
    accentFrom: "#a855f7",
    accentTo: "#c084fc",
  },
  "Green Home": {
    label: "Green Home",
    bg: "bg-lime-500/12 dark:bg-lime-500/18",
    text: "text-lime-900 dark:text-lime-300",
    border: "border-lime-500/25 dark:border-lime-400/35",
    gradient: "from-lime-500/30 via-emerald-400/15 to-green-600/20",
    glow: "rgba(132, 204, 22, 0.35)",
    accentFrom: "#84cc16",
    accentTo: "#22c55e",
  },
};

export function getBlogCategoryTheme(category: BlogCategory): BlogCategoryTheme {
  return BLOG_CATEGORY_THEME[category] ?? BLOG_CATEGORY_THEME.Guides;
}
