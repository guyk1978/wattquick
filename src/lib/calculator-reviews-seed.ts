import type { CalculatorId } from "@/lib/calculators";
import type { CalculatorReview, CalculatorReviewsMap } from "@/lib/calculator-reviews";

/**
 * Built-in community reviews shown before (and alongside) localStorage submissions.
 * Stable `seed-*` ids keep merges idempotent across sessions.
 */
const DEFAULT_SEED_REVIEWS: CalculatorReview[] = [
  {
    id: "seed-default-1",
    author: "m.chen_pei",
    rating: 5,
    comment:
      "Clean inputs and readable results — I use this on site when a homeowner asks for a quick second opinion. Saved me from opening a spreadsheet mid-visit.",
    websiteUrl: "https://chenpei-energy.example",
    createdAt: "2026-06-18T14:22:00.000Z",
  },
  {
    id: "seed-default-2",
    author: "wire_wise_jax",
    rating: 4,
    comment:
      "Solid for field estimates. Would love a print/PDF snapshot later, but the math checks out against my usual worksheets.",
    websiteUrl: null,
    createdAt: "2026-05-29T09:41:00.000Z",
  },
  {
    id: "seed-default-3",
    author: "DIY_GaragePV",
    rating: 5,
    comment:
      "Finally a tool that doesn’t bury the units. Used it twice this weekend planning a small off-grid shed run — results matched my clamp meter within a few percent.",
    websiteUrl: "https://garagepv.example",
    createdAt: "2026-04-12T18:05:00.000Z",
  },
  {
    id: "seed-default-4",
    author: "audit.lane",
    rating: 4,
    comment:
      "Good enough for client walkthroughs. I leave the website field blank on purpose — not every job needs a pitch link.",
    websiteUrl: null,
    createdAt: "2026-03-07T11:16:00.000Z",
  },
];

const TOOL_SEED_REVIEWS: CalculatorReviewsMap = {
  "watts-to-amps": [
    {
      id: "seed-w2a-1",
      author: "northline_ec",
      rating: 5,
      comment:
        "Use this daily for quick branch-circuit checks before I pull a permit. Voltage + PF fields keep the amp draw honest.",
      websiteUrl: "https://northlineelectric.example",
      createdAt: "2026-07-02T16:48:00.000Z",
    },
    {
      id: "seed-w2a-2",
      author: "shoptech_rio",
      rating: 4,
      comment:
        "Handy when sizing extension cords for shop tools. Wish there was a ‘common loads’ preset, but the calculator itself is clear.",
      websiteUrl: null,
      createdAt: "2026-06-11T08:20:00.000Z",
    },
    {
      id: "seed-w2a-3",
      author: "ember.audit",
      rating: 5,
      comment:
        "Showed a client why their heater circuit was tripping — watts-to-amps made the conversation visual without a whiteboard.",
      websiteUrl: "https://emberhomeaudit.example",
      createdAt: "2026-05-03T13:55:00.000Z",
    },
  ],
  "residential-voltage-drop": [
    {
      id: "seed-vd-1",
      author: "conduit_casey",
      rating: 5,
      comment:
        "Voltage drop used to be a napkin sketch for me. This layout matches how I talk about AWG, length, and load with homeowners.",
      websiteUrl: "https://caseyconduit.example",
      createdAt: "2026-06-27T19:12:00.000Z",
    },
    {
      id: "seed-vd-2",
      author: "retrofit_nina",
      rating: 4,
      comment:
        "Accurate enough for remodel estimates. I still verify long feeder runs with my own tables, but this is my first pass.",
      websiteUrl: null,
      createdAt: "2026-05-16T10:33:00.000Z",
    },
    {
      id: "seed-vd-3",
      author: "oakridge_solar",
      rating: 5,
      comment:
        "Great for explaining DC string and AC feeder drop side-by-side during solar consults. Link to our install notes if helpful.",
      websiteUrl: "https://oakridgesolar.example",
      createdAt: "2026-04-21T15:02:00.000Z",
    },
    {
      id: "seed-vd-4",
      author: "weekend_wire",
      rating: 4,
      comment:
        "DIY barn shop run — confirmed I needed a bump in conductor size. No website, just grateful it exists.",
      websiteUrl: null,
      createdAt: "2026-03-19T21:40:00.000Z",
    },
  ],
  "solar-panel-size": [
    {
      id: "seed-sps-1",
      author: "peakshade_co",
      rating: 5,
      comment:
        "Clients ask ‘how many panels?’ every week. This gives a grounded kWh → array size story without overselling.",
      websiteUrl: "https://peakshade.example",
      createdAt: "2026-07-08T12:05:00.000Z",
    },
    {
      id: "seed-sps-2",
      author: "roof.ratchet",
      rating: 4,
      comment:
        "Solid first pass before I model in Helioscope. Assumptions are transparent — that’s rare on free tools.",
      websiteUrl: null,
      createdAt: "2026-06-01T17:28:00.000Z",
    },
    {
      id: "seed-sps-3",
      author: "vanlife_amps",
      rating: 5,
      comment:
        "Sized a van roof array for weekend camping. Results lined up with my charge controller docs.",
      websiteUrl: "https://vanlifeamps.example",
      createdAt: "2026-04-30T09:14:00.000Z",
    },
  ],
  "battery-runtime": [
    {
      id: "seed-brt-1",
      author: "ups_field_dan",
      rating: 5,
      comment:
        "Fast runtime gut-check before I quote a UPS swap. Prefer this over vendor PDFs when I’m already on a ladder.",
      websiteUrl: null,
      createdAt: "2026-07-11T07:55:00.000Z",
    },
    {
      id: "seed-brt-2",
      author: "cabin_amp_hour",
      rating: 4,
      comment:
        "Used for a cabin fridge + lights scenario. Runtime felt conservative (good) — I’d rather under-promise.",
      websiteUrl: "https://cabinamphour.example",
      createdAt: "2026-05-22T20:18:00.000Z",
    },
    {
      id: "seed-brt-3",
      author: "grid_out_mira",
      rating: 5,
      comment:
        "Walked my parents through how long their power station lasts. No promo link — just sharing the love.",
      websiteUrl: null,
      createdAt: "2026-04-04T14:47:00.000Z",
    },
    {
      id: "seed-brt-4",
      author: "lab.bench.k",
      rating: 4,
      comment:
        "Nice for lab UPS planning. Wish DoD were more prominent, but the defaults are sensible.",
      websiteUrl: "https://labbenchk.example",
      createdAt: "2026-02-26T11:09:00.000Z",
    },
  ],
  "ev-charging-cost": [
    {
      id: "seed-evc-1",
      author: "charge_lane_llc",
      rating: 5,
      comment:
        "I send this link to fleet clients so they can see home vs workplace kWh cost without a sales deck.",
      websiteUrl: "https://chargelanellc.example",
      createdAt: "2026-06-30T16:01:00.000Z",
    },
    {
      id: "seed-evc-2",
      author: "commute_kw",
      rating: 4,
      comment:
        "Compared L2 overnight vs public DC for my Model Y. Numbers matched my last utility bill pretty closely.",
      websiteUrl: null,
      createdAt: "2026-05-09T22:33:00.000Z",
    },
    {
      id: "seed-evc-3",
      author: "muni_fleets",
      rating: 5,
      comment:
        "Useful for internal TCO scratch math. Industrial Matte UI is easy to screenshot for council packets.",
      websiteUrl: "https://munifleets.example",
      createdAt: "2026-03-28T08:50:00.000Z",
    },
  ],
  "inverter-sizing": [
    {
      id: "seed-inv-1",
      author: "surge_safe_co",
      rating: 5,
      comment:
        "Surge vs continuous callouts help me stop undersizing for well pumps. Bookmark-worthy.",
      websiteUrl: "https://surgesafeco.example",
      createdAt: "2026-06-14T13:27:00.000Z",
    },
    {
      id: "seed-inv-2",
      author: "boat_dc_ac",
      rating: 4,
      comment:
        "Marine inverter planning — clear enough for a weekend DIY. Left the website blank on purpose.",
      websiteUrl: null,
      createdAt: "2026-04-17T19:44:00.000Z",
    },
    {
      id: "seed-inv-3",
      author: "offgrid_tess",
      rating: 5,
      comment:
        "Cross-checked a 3kW cabin inverter against starting loads. Spot on with the manufacturer curve.",
      websiteUrl: "https://offgridtess.example",
      createdAt: "2026-03-02T10:11:00.000Z",
    },
  ],
  "ah-to-wh": [
    {
      id: "seed-ahwh-1",
      author: "pack_builder_oz",
      rating: 5,
      comment:
        "Dead-simple Ah→Wh conversion with voltage in the open. I link it from our battery FAQ.",
      websiteUrl: "https://packbuilderoz.example",
      createdAt: "2026-07-05T09:30:00.000Z",
    },
    {
      id: "seed-ahwh-2",
      author: "scooter_wrench",
      rating: 4,
      comment:
        "Quick check when listing used packs. No site — just a wrench guy who hates bad listings.",
      websiteUrl: null,
      createdAt: "2026-05-25T15:19:00.000Z",
    },
    {
      id: "seed-ahwh-3",
      author: "cell_cycle_lab",
      rating: 5,
      comment:
        "Teaching assistants use this in lab intros. Prefer it over mental math when voltage isn’t 12V.",
      websiteUrl: "https://cellcyclelab.example",
      createdAt: "2026-04-08T12:42:00.000Z",
    },
  ],
  "appliance-daily-cost": [
    {
      id: "seed-adc-1",
      author: "bill_coach_eli",
      rating: 5,
      comment:
        "Perfect for coaching renters on phantom loads. I leave my coaching site on a couple of reviews — hope that’s okay.",
      websiteUrl: "https://billcoacheli.example",
      createdAt: "2026-06-22T18:36:00.000Z",
    },
    {
      id: "seed-adc-2",
      author: "thermostat_tea",
      rating: 4,
      comment:
        "Showed my partner the dryer vs heat pump dryer difference. Convincing without a lecture.",
      websiteUrl: null,
      createdAt: "2026-05-01T07:08:00.000Z",
    },
    {
      id: "seed-adc-3",
      author: "auditkit_sam",
      rating: 5,
      comment:
        "We point homeowners here mid-audit. Fast, credible, no account wall.",
      websiteUrl: "https://auditkit.example",
      createdAt: "2026-03-14T16:55:00.000Z",
    },
    {
      id: "seed-adc-4",
      author: "night_owl_kWh",
      rating: 4,
      comment:
        "Tracked a gaming PC + AC for a week. Results matched my smart plug within a dime a day.",
      websiteUrl: null,
      createdAt: "2026-02-11T23:21:00.000Z",
    },
  ],
};

function cloneReviews(reviews: CalculatorReview[]): CalculatorReview[] {
  return reviews.map((review) => ({ ...review }));
}

/** Seed reviews for a tool, or the shared default set when none are defined. */
export function getSeedReviewsForCalculator(id: CalculatorId): CalculatorReview[] {
  const specific = TOOL_SEED_REVIEWS[id];
  if (specific && specific.length > 0) {
    return cloneReviews(specific);
  }
  return cloneReviews(DEFAULT_SEED_REVIEWS);
}

export function mergeReviewsWithSeed(
  id: CalculatorId,
  userReviews: CalculatorReview[]
): CalculatorReview[] {
  const seeds = getSeedReviewsForCalculator(id);
  const seen = new Set(userReviews.map((r) => r.id));
  const merged = [
    ...userReviews,
    ...seeds.filter((seed) => !seen.has(seed.id)),
  ];
  return merged.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}
