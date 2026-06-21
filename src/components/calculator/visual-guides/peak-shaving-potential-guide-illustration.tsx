"use client";

import { cn } from "@/lib/utils";

interface PeakShavingPotentialGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: peak/off-peak kWh + rates → shift load → bill savings.
 * Modal only (not embedded in page DOM by default).
 */
export function PeakShavingPotentialGuideIllustration({
  className,
}: PeakShavingPotentialGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "peak-shaving-potential-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="pshave-guide-title pshave-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pshave-guide-title">Peak shaving potential flow diagram</title>
      <desc id="pshave-guide-desc">
        Inputs: peak and off-peak kilowatt-hours, their tariff rates, and the
        share of peak load that can shift. Process: compare TOU bill before and
        after moving kWh from peak to off-peak windows. Output: monthly and
        annual savings.
      </desc>

      <defs>
        <pattern
          id="bp-pshave-grid-minor"
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
          id="bp-pshave-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-pshave-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-pshave-pencil"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
        >
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
        fill="url(#bp-pshave-grid-major)"
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
        FIG. 1 — PEAK SHAVING POTENTIAL
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
        filter="url(#bp-pshave-pencil)"
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
          TOU usage split
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
          200 peak kWh
        </text>
        <text
          x="48"
          y="152"
          fill="currentColor"
          fontSize="18"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          600 off-peak kWh
        </text>

        <path d="M 48 164 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          tariff rates
        </text>
        <text
          x="48"
          y="198"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          peak $0.32/kWh
        </text>
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          off-peak $0.08/kWh
        </text>

        <path d="M 48 226 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="242"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          shiftable share
        </text>
        <text
          x="48"
          y="262"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          40% of peak
        </text>

        {/* Peak / off-peak bars */}
        <rect x="130" y="228" width="24" height="36" strokeWidth="0.8" rx="1" />
        <rect x="158" y="248" width="24" height="16" strokeWidth="0.8" rx="1" />
        <text
          x="146"
          y="274"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          load profile
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
        filter="url(#bp-pshave-pencil)"
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
          Shift kWh to off-peak
        </text>

        {/* Before bill */}
        <rect x="262" y="122" width="196" height="44" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="138"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          BEFORE
        </text>
        <text
          x="272"
          y="156"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          200×$0.32 + 600×$0.08 = $112
        </text>

        {/* Shift arrow */}
        <path d="M 360 172 Q 360 188 340 188" strokeWidth="0.9" />
        <path d="M 344 184 L 336 188 L 344 192" strokeWidth="0.8" />
        <text
          x="368"
          y="186"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          80 kWh
        </text>
        <text
          x="368"
          y="198"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          peak → off
        </text>

        {/* After bill */}
        <rect x="262" y="206" width="196" height="52" strokeWidth="0.8" rx="1" />
        <text
          x="272"
          y="222"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          AFTER
        </text>
        <text
          x="272"
          y="238"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          120×$0.32 + 680×$0.08
        </text>
        <text
          x="272"
          y="252"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = $93/mo
        </text>

        <text
          x="268"
          y="268"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          savings = $0.24/kWh × kWh shifted
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
        filter="url(#bp-pshave-pencil)"
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
          bill reduction
        </text>
        <text
          x="611"
          y="142"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $112 → $93
        </text>

        <path d="M 552 156 H 670" strokeWidth="0.6" opacity="0.35" />

        <text
          x="611"
          y="182"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $19/mo
        </text>
        <text
          x="611"
          y="204"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          monthly savings
        </text>

        <rect x="558" y="218" width="106" height="36" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="240"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $230/yr
        </text>

        <text
          x="611"
          y="264"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          80 kWh shifted · 17% lower
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-pshave-pencil)"
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
          move EV, laundry &amp; HVAC to off-peak windows to capture the spread
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $19 × 12 =
        </text>
        <text
          x="130"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $230/yr saved
        </text>
      </g>
    </svg>
  );
}
