"use client";

import { cn } from "@/lib/utils";

interface EscooterCostPerKmGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Wh/km + rate + commute → $/km vs transit.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterCostPerKmGuideIllustration({
  className,
}: EscooterCostPerKmGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-cost-per-km-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="escpk-guide-title escpk-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="escpk-guide-title">E-scooter cost per km flow diagram</title>
      <desc id="escpk-guide-desc">
        Inputs: energy consumption in watt-hours per kilometre, electricity
        rate per kilowatt-hour, weekly commute distance, and public transit
        fare per trip. Process: convert Wh to kWh cost per km, then compare
        weekly scooter spend to estimated transit cost. Output: marginal cost
        per km and savings versus transit.
      </desc>

      <defs>
        <pattern
          id="bp-escpk-grid-minor"
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
          id="bp-escpk-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-escpk-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-escpk-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-escpk-grid-major)"
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
        FIG. 1 — COST PER KM vs TRANSIT
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
        filter="url(#bp-escpk-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Wh/km consumption */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="28" height="20" strokeWidth="0.8" rx="2" />
        <path d="M 60 108 H 72 M 60 114 H 72" strokeWidth="0.5" opacity="0.6" />
        <path d="M 88 108 H 120 M 120 108 L 116 104 M 120 108 L 116 112" strokeWidth="0.7" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          use
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          15 Wh/km
        </text>

        {/* Electricity rate */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 188 Q 174 194 168 194 H 44 Q 38 194 36 188 Z"
          strokeWidth="1.1"
        />
        <path d="M 56 160 H 72 V 172 H 56 Z M 72 166 H 80" strokeWidth="0.7" />
        <text x="48" y="156" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          grid rate
        </text>
        <text x="48" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $0.14/kWh
        </text>

        {/* Weekly commute + transit */}
        <path
          d="M 36 204 Q 38 200 44 200 H 168 Q 174 200 176 206 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 220 H 112 M 112 220 L 108 216 M 112 220 L 108 224" strokeWidth="0.7" />
        <text x="48" y="216" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          commute
        </text>
        <text x="48" y="238" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          40 km/wk
        </text>
        <rect x="52" y="252" width="32" height="18" strokeWidth="0.7" rx="1" />
        <text x="68" y="264" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          BUS
        </text>
        <text x="96" y="264" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $2.50/trip
        </text>
        <text x="48" y="292" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          10 trips/wk est.
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 112 H 218" strokeLinecap="round" />
        <path d="M 214 108 L 222 112 L 214 116" strokeLinejoin="round" />
        <path d="M 186 168 H 218" strokeLinecap="round" />
        <path d="M 214 164 L 222 168 L 214 172" />
        <path d="M 186 248 H 218" strokeLinecap="round" />
        <path d="M 214 244 L 222 248 L 214 252" />
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
        filter="url(#bp-escpk-pencil)"
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
          Marginal energy cost
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          $/km = (Wh/km ÷ 1000) × rate
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          (15 ÷ 1000) × 0.14
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          = $0.002/km
        </text>

        {/* Scooter vs transit bars */}
        <text x="256" y="208" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          weekly compare
        </text>
        <text x="256" y="228" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          scooter
        </text>
        <path d="M 300 224 H 420" strokeWidth="0.5" opacity="0.4" />
        <path d="M 300 224 H 304" strokeWidth="1" />
        <text x="428" y="228" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ~$0.08
        </text>
        <text x="256" y="252" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          transit
        </text>
        <path d="M 300 248 H 420" strokeWidth="0.5" opacity="0.4" />
        <path d="M 300 248 H 412" strokeWidth="1.1" />
        <text x="428" y="252" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $25
        </text>

        <text x="256" y="276" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          annual ≈ ($25 − $0.08) × 52
        </text>
        <text x="256" y="296" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          ~$1,296 saved/yr
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
        filter="url(#bp-escpk-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="118" textAnchor="middle" fill="currentColor" fontSize="26" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          $0.002
        </text>
        <text x="612" y="138" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          /km scooter
        </text>

        <path d="M 556 156 H 668" strokeWidth="0.6" opacity="0.4" />
        <circle cx="580" cy="180" r="14" strokeWidth="0.9" />
        <path d="M 574 180 H 586 M 580 174 V 186" strokeWidth="0.6" />
        <text x="604" y="176" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          scooter
        </text>
        <text x="604" y="190" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          pennies/km
        </text>

        <rect x="640" y="166" width="24" height="28" strokeWidth="0.9" rx="1" />
        <text x="652" y="184" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          $
        </text>
        <text x="604" y="214" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          transit
        </text>
        <text x="604" y="228" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $25/wk total
        </text>

        <text x="612" y="258" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          scooter vs. transit
        </text>
        <text x="612" y="278" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          ~$1,296/yr savings
        </text>
        <text x="612" y="296" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          10 transit trips/wk assumed
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-escpk-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          marginal cost is mostly electricity — add tyres & maintenance for full TCO
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          0.015 kWh
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="150" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          $0.14
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="215" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $0.002/km to ride
        </text>
      </g>
    </svg>
  );
}
