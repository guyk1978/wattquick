"use client";

import { cn } from "@/lib/utils";

interface BessRoiGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: TOU arbitrage → daily savings → payback & LCOS.
 * Modal only (not embedded in page DOM by default).
 */
export function BessRoiGuideIllustration({
  className,
}: BessRoiGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn("bess-roi-guide-illustration w-full max-w-3xl", className)}
      role="img"
      aria-labelledby="bess-guide-title bess-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bess-guide-title">BESS ROI flow diagram</title>
      <desc id="bess-guide-desc">
        Inputs: battery capacity, install cost, peak and off-peak electricity
        rates, cycles per day, battery life, depth of discharge, and
        round-trip efficiency. Process: charge off-peak, discharge at peak,
        calculate daily arbitrage savings, payback years, and levelized cost of
        storage. Output: whether BESS TOU arbitrage pays back.
      </desc>

      <defs>
        <pattern
          id="bp-bess-grid-minor"
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
          id="bp-bess-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bess-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bess-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bess-grid-major)"
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
        FIG. 1 — BESS TOU ARBITRAGE ROI
      </text>
      <path
        d="M 34 52 H 360"
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
        filter="url(#bp-bess-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 176 Q 182 88 184 94 V 300 Q 182 306 176 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <rect x="48" y="100" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 56 108 H 72 M 56 116 H 72 M 56 124 H 72" strokeWidth="0.5" opacity="0.5" />
        <text x="88" y="122" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          13.5 kWh
        </text>
        <text x="48" y="96" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          BESS
        </text>

        <text x="48" y="148" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          $12,000
        </text>
        <text x="48" y="138" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          installed
        </text>

        <text x="48" y="172" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          peak $0.38/kWh
        </text>
        <text x="48" y="188" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          off-peak $0.09/kWh
        </text>
        <text x="48" y="204" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          spread = $0.29/kWh
        </text>

        <text x="48" y="228" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1 cycle/day · 10 yr
        </text>
        <text x="48" y="244" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          90% DoD · 90% η
        </text>

        {/* TOU timeline */}
        <line x1="48" y1="264" x2="168" y2="264" strokeWidth="0.7" />
        <text x="48" y="258" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          night
        </text>
        <path d="M 72 258 V 270" strokeWidth="0.6" />
        <text x="76" y="262" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          charge
        </text>
        <path d="M 120 258 V 270" strokeWidth="0.6" />
        <text x="124" y="262" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          peak
        </text>
        <path d="M 128 264 L 136 256 L 144 264" strokeWidth="0.7" />
        <text x="148" y="262" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          discharge
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 194 180 H 218" strokeLinecap="round" />
        <path d="M 214 176 L 222 180 L 214 184" strokeLinejoin="round" />
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
        filter="url(#bp-bess-pencil)"
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
          1. kWh shifted / cycle
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          kWh = cap × DoD × η
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          13.5 × 0.9 × 0.9 = 10.9 kWh
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Daily arbitrage $
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          $/day = spread × kWh × cycles
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          0.29 × 10.9 × 1 ≈ $3.17/day
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Payback &amp; LCOS
        </text>
        <text x="256" y="272" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          payback = cost ÷ annual $
        </text>
        <text x="256" y="290" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          LCOS = cost ÷ lifetime kWh out
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
        filter="url(#bp-bess-pencil)"
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
          payback period
        </text>

        <text x="616" y="152" textAnchor="middle" fill="currentColor" fontSize="30" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          10.4 yr
        </text>
        <text x="616" y="174" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          $12k ÷ $1,157/yr
        </text>

        <text x="616" y="212" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          $3.17/day
        </text>
        <text x="616" y="232" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          TOU arbitrage savings
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          LCOS $0.30/kWh
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          vs buying peak from grid
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-bess-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          wide peak − off-peak spread required · subtract tax credits from cost
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          solar self-consumption savings are separate from TOU arbitrage
        </text>
      </g>
    </svg>
  );
}
