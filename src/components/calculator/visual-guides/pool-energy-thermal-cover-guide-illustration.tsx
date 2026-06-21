"use client";

import { cn } from "@/lib/utils";

interface PoolEnergyThermalCoverGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: pump + heating COP + cover → pool energy cost.
 * Modal only (not embedded in page DOM by default).
 */
export function PoolEnergyThermalCoverGuideIllustration({
  className,
}: PoolEnergyThermalCoverGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "pool-energy-thermal-cover-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="pool-guide-title pool-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pool-guide-title">Pool energy and thermal cover flow diagram</title>
      <desc id="pool-guide-desc">
        Inputs: pool pump power and run hours, electricity rate, heating method
        with COP, and optional thermal cover savings on evaporation heat loss.
        Process: compute pump kWh, reduce heat demand with a cover, divide by
        COP for heating grid kWh, then multiply by rate. Output: daily cost and
        savings from cover and heat pump vs resistance.
      </desc>

      <defs>
        <pattern
          id="bp-pool-grid-minor"
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
          id="bp-pool-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-pool-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-pool-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-pool-grid-major)"
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
        FIG. 1 — POOL ENERGY &amp; COVER
      </text>
      <path
        d="M 34 52 H 320"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUT */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>

      <g
        filter="url(#bp-pool-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 86 44 86 H 196 Q 202 86 204 92 V 268 Q 202 274 196 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />

        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          pool pump
        </text>
        <text
          x="48"
          y="130"
          fill="currentColor"
          fontSize="18"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          1.5 kW × 8 h
        </text>

        <path d="M 48 142 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="158"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          heating &amp; cover
        </text>
        <text
          x="48"
          y="176"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          heat pump COP 5
        </text>
        <text
          x="48"
          y="192"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          cover −40% evaporation
        </text>
        <text
          x="48"
          y="208"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          vs resistance COP 1
        </text>

        <path d="M 48 218 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="234"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          electricity rate
        </text>
        <text
          x="48"
          y="254"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          $0.14/kWh
        </text>

        {/* Pool sketch */}
        <path
          d="M 124 248 Q 144 238 164 248 Q 184 258 164 268 Q 144 278 124 268 Q 104 258 124 248"
          strokeWidth="0.9"
        />
        <path d="M 128 252 H 160" strokeWidth="0.5" opacity="0.4" />
        <text
          x="144"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          pool + blanket
        </text>
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 214 180 H 244" strokeLinecap="round" />
        <path d="M 240 176 L 248 180 L 240 184" strokeLinejoin="round" />
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
        filter="url(#bp-pool-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 258 Q 250 276 248 268 Z"
          strokeWidth="1.2"
        />

        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Two load paths
        </text>

        {/* Pump path */}
        <rect x="262" y="122" width="196" height="36" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="138"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          PUMP
        </text>
        <text
          x="272"
          y="152"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          1.5 × 8 h = 12 kWh/day
        </text>

        {/* Heat path */}
        <rect x="262" y="164" width="196" height="68" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          HEATING
        </text>
        <text
          x="272"
          y="196"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          heat demand → cover −40%
        </text>
        <text
          x="272"
          y="210"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          grid kWh = demand ÷ COP
        </text>
        <text
          x="272"
          y="224"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          HP: 7.2÷5 = 1.4 kWh
        </text>

        <text
          x="368"
          y="196"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          resist: 7.2 kWh
        </text>
        <text
          x="368"
          y="210"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          (5× more grid)
        </text>

        <text
          x="268"
          y="248"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          total = pump + heating
        </text>
        <text
          x="268"
          y="264"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12 + 1.4 = 13.4 kWh → cost
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 180 H 518" strokeLinecap="round" />
        <path d="M 514 176 L 522 180 L 514 184" strokeLinejoin="round" />
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
        filter="url(#bp-pool-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <text
          x="611"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          daily pool cost
        </text>

        <text
          x="611"
          y="158"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $1.88
        </text>
        <text
          x="611"
          y="180"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          per day (HP + cover)
        </text>

        <path d="M 552 194 H 670" strokeWidth="0.6" opacity="0.35" />

        <rect x="558" y="204" width="106" height="52" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="222"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          annual savings
        </text>
        <text
          x="611"
          y="240"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $339/yr
        </text>
        <text
          x="611"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          cover + HP vs open/resist
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-pool-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          cover cuts evaporation heat loss — heat pump moves heat at COP &gt; 1
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          13.4 kWh × $0.14 ≈
        </text>
        <text
          x="170"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $1.88/day
        </text>
      </g>
    </svg>
  );
}
