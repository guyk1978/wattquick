export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  category: "Guides" | "Solar" | "EV" | "Tips";
  content: BlogSection[];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-battery-watt-hours",
    title: "Understanding Battery Watt-Hours (Wh)",
    description:
      "What watt-hours mean, how to convert from Ah, and why Wh matters for solar and EV planning.",
    publishedAt: "2026-03-01",
    readMinutes: 4,
    category: "Guides",
    content: [
      {
        paragraphs: [
          "Watt-hours (Wh) measure energy—the total amount of work a battery can deliver. Unlike amp-hours (Ah), Wh accounts for voltage, which makes it the best unit for comparing packs of different chemistries and voltages.",
        ],
      },
      {
        heading: "The simple formula",
        paragraphs: [
          "For any battery: Wh = Ah × V. A 100 Ah 12 V lead-acid battery stores 1,200 Wh. A 50 Ah 48 V lithium pack stores 2,400 Wh—twice the energy despite half the amp-hours.",
          "Use WattQuick's Ah to Wh and Wh to Ah converters for instant conversions while planning a system.",
        ],
      },
      {
        heading: "Why it matters for solar and EV",
        paragraphs: [
          "Solar loads and appliance labels are usually in watts or kilowatt-hours. EV chargers and utility bills use kWh. Converting your battery to Wh lets you answer: how many hours will this run, or how much of my pack does this trip use?",
        ],
      },
    ],
  },
  {
    slug: "solar-panel-sizing-basics",
    title: "Solar Panel Sizing Basics for Off-Grid Systems",
    description:
      "How peak sun hours, daily energy use, and system efficiency determine the panel wattage you need.",
    publishedAt: "2026-02-18",
    readMinutes: 5,
    category: "Solar",
    content: [
      {
        paragraphs: [
          "Sizing solar starts with your daily energy budget in watt-hours (Wh). Add up everything you plan to run—lights, fridge, pumps, chargers—and multiply watts by hours of use per day.",
        ],
      },
      {
        heading: "Peak sun hours",
        paragraphs: [
          "Panels are rated at full sun (1,000 W/m²). Real locations average fewer equivalent hours per day. Many US sites see 3–6 peak sun hours depending on season and latitude.",
          "Required panel watts ≈ daily Wh ÷ (peak sun hours × system efficiency). Efficiency captures inverter loss, wiring, dust, and temperature—often 75–85% for good installs.",
        ],
      },
      {
        heading: "Add margin",
        paragraphs: [
          "Cloudy weeks and battery aging mean you should oversize 20–30% beyond the calculator minimum. Pair panel sizing with a battery bank calculator for complete off-grid planning.",
        ],
      },
    ],
  },
  {
    slug: "ev-home-charging-cost",
    title: "How to Estimate EV Home Charging Cost",
    description:
      "Calculate what it costs to charge your EV at home using kWh and your utility rate.",
    publishedAt: "2026-02-05",
    readMinutes: 3,
    category: "EV",
    content: [
      {
        paragraphs: [
          "Home charging cost is straightforward: multiply the energy delivered (kWh) by your electricity rate ($/kWh). A 60 kWh charge at $0.15/kWh costs about $9 before fees.",
        ],
      },
      {
        heading: "Account for charging losses",
        paragraphs: [
          "The car and charger lose some energy as heat. If you pull 65 kWh from the wall to fill a 60 kWh pack, use the higher number for cost. Many drivers assume 5–10% overhead.",
        ],
      },
      {
        heading: "Compare to gas",
        paragraphs: [
          "Divide your charging cost by miles driven for a per-mile energy cost. It's often lower than gasoline, but rates vary widely by region and time-of-use plans.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
