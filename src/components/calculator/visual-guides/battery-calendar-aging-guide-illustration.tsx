"use client";

import { cn } from "@/lib/utils";

interface BatteryCalendarAgingGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: temp + avg SOC + age → calendar fade → SoH.
 * Modal only (not embedded in page DOM by default).
 */
export function BatteryCalendarAgingGuideIllustration({
  className,
}: BatteryCalendarAgingGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-calendar-aging-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bca-guide-title bca-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bca-guide-title">Battery calendar aging flow diagram</title>
      <desc id="bca-guide-desc">
        Inputs: average storage temperature, average state of charge while
        stored, and pack age in years. Process: scale baseline calendar fade
        rate for heat and SOC stress, multiply by age. Output: calendar
        capacity loss percent and remaining state of health.
      </desc>

      <defs>
        <pattern
          id="bp-bca-grid-minor"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity="0.12"
          />
        </pattern>
        <pattern
          id="bp-bca-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bca-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bca-pencil" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            in="noise"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#bp-bca-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="396"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
        rx="1"
      />

      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — BATTERY CALENDAR AGING
      </text>
      <path
        d="M 34 52 H 340"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-bca-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        {/* Temperature */}
        <circle cx="56" cy="112" r="10" strokeWidth="0.8" />
        <path d="M 56 102 V 112 M 52 106 H 60" strokeWidth="0.6" />
        <text x="72" y="108" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          storage T
        </text>
        <text x="72" y="122" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          25 °C
        </text>

        {/* SOC */}
        <rect x="48" y="136" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 56 144 H 72 M 56 152 H 72 M 56 160 H 72" strokeWidth="0.5" opacity="0.5" />
        <path d="M 56 152 H 68" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1" />
        <text x="88" y="152" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          avg SOC
        </text>
        <text x="88" y="168" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          50%
        </text>

        {/* Age */}
        <rect x="48" y="188" width="40" height="22" strokeWidth="0.8" rx="1" />
        <text x="54" y="194" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          calendar
        </text>
        <text x="54" y="206" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3 yr
        </text>

        <path d="M 48 220 H 156" strokeWidth="0.5" opacity="0.4" />
        <text x="48" y="236" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          idle / parked — not cycles
        </text>
        <text x="48" y="254" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          hot garage @ 100% = fast fade
        </text>
        <text x="48" y="272" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          cool @ 50% = slow fade
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 168 H 218" strokeLinecap="round" />
        <path d="M 214 164 L 222 168 L 214 172" strokeLinejoin="round" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-bca-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
          strokeWidth="1.2"
        />

        <text x="238" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          Baseline fade rate
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          ~2%/yr @ 25°C · 50% SOC
        </text>

        <path d="M 238 148 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="168" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          Stress factors
        </text>
        <text x="256" y="188" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          temp ×2 per +10°C
        </text>
        <text x="256" y="206" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          high SOC accelerates fade
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          @ 25°C, 50%: factors = 1.0
        </text>

        <path d="M 238 238 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="258" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          Calendar loss
        </text>
        <text x="256" y="278" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          loss % = rate × years
        </text>
        <text x="256" y="296" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          2%/yr × 3 yr = 6% fade
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 190 H 518" strokeLinecap="round" />
        <path d="M 514 186 L 522 190 L 514 194" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-bca-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="108" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          remaining capacity
        </text>

        <text x="616" y="156" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          94%
        </text>
        <text x="616" y="178" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          SoH (state of health)
        </text>

        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          6% calendar loss
        </text>
        <text x="616" y="238" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          over 3 years stored
        </text>

        <path d="M 556 252 H 676" strokeWidth="0.6" opacity="0.4" />

        {/* Capacity bar */}
        <rect x="556" y="262" width="120" height="20" strokeWidth="0.8" rx="1" />
        <rect x="556" y="262" width="113" height="20" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12" rx="1" />
        <line x1="669" y1="256" x2="669" y2="288" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="560" y="276" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          94% usable
        </text>
        <text x="672" y="276" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          fade
        </text>

        <text x="616" y="298" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          cycle wear is separate
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-bca-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          calendar aging = time + heat + stored SOC (SEI growth, electrolyte oxidation)
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          store Li-ion ~50% SOC · 15–25°C for long idle periods
        </text>
      </g>
    </svg>
  );
}
