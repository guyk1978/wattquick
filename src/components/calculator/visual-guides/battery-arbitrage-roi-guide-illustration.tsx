"use client";

import { cn } from "@/lib/utils";

interface BatteryArbitrageRoiGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: night/peak rates + battery → arbitrage profit.
 * Modal only (not embedded in page DOM by default).
 */
export function BatteryArbitrageRoiGuideIllustration({
  className,
}: BatteryArbitrageRoiGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-arbitrage-roi-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="barb-guide-title barb-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="barb-guide-title">Home battery arbitrage flow diagram</title>
      <desc id="barb-guide-desc">
        Inputs: usable battery capacity, round-trip efficiency, night and peak
        electricity rates, and cycles per day. Process: charge on cheap off-peak
        power, discharge during expensive peak hours, multiply by efficiency and
        price spread. Output: estimated daily, monthly, and annual profit.
      </desc>

      <defs>
        <pattern
          id="bp-barb-grid-minor"
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
          id="bp-barb-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-barb-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-barb-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-barb-grid-major)"
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
        FIG. 1 — BATTERY TOU ARBITRAGE
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
        filter="url(#bp-barb-pencil)"
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
          usable battery
        </text>
        <text
          x="48"
          y="130"
          fill="currentColor"
          fontSize="20"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          10 kWh
        </text>
        <text
          x="48"
          y="148"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          90% round-trip eff
        </text>

        <path d="M 48 160 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="176"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          TOU rates
        </text>
        <text
          x="48"
          y="194"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          night $0.09/kWh
        </text>
        <text
          x="48"
          y="210"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          peak $0.38/kWh
        </text>

        <path d="M 48 222 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="238"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          cycles per day
        </text>
        <text
          x="48"
          y="258"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          1 cycle
        </text>

        {/* Battery sketch */}
        <rect x="138" y="244" width="48" height="22" strokeWidth="0.9" rx="2" />
        <rect x="186" y="252" width="4" height="6" strokeWidth="0.7" rx="1" />
        <path d="M 146 254 H 178" strokeWidth="0.6" opacity="0.5" />
        <text
          x="162"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          home BESS
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
        filter="url(#bp-barb-pencil)"
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
          Buy low · sell high
        </text>

        {/* Night charge */}
        <rect x="262" y="122" width="88" height="40" strokeWidth="0.8" rx="1" />
        <path d="M 278 134 Q 286 126 294 134" strokeWidth="0.7" />
        <text
          x="306"
          y="138"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          NIGHT
        </text>
        <text
          x="272"
          y="154"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          charge @ $0.09
        </text>

        {/* Arrow down */}
        <path d="M 306 166 V 178" strokeWidth="0.8" />
        <path d="M 302 174 L 306 180 L 310 174" strokeWidth="0.7" />

        {/* Peak discharge */}
        <rect x="262" y="182" width="88" height="40" strokeWidth="0.8" rx="1" />
        <circle cx="278" cy="198" r="6" strokeWidth="0.7" />
        <path d="M 278 192 V 198 H 284" strokeWidth="0.7" />
        <text
          x="306"
          y="198"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          PEAK
        </text>
        <text
          x="272"
          y="214"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          discharge @ $0.38
        </text>

        {/* Formula */}
        <text
          x="368"
          y="140"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          spread = $0.38 − $0.09
        </text>
        <text
          x="368"
          y="158"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = $0.29/kWh
        </text>
        <text
          x="368"
          y="182"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          profit = kWh × eff
        </text>
        <text
          x="368"
          y="198"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          × spread × cycles
        </text>
        <text
          x="368"
          y="220"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10×0.90×0.29×1
        </text>
        <text
          x="368"
          y="240"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          = $2.61/day
        </text>

        <text
          x="268"
          y="262"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          tariff spread only — excludes install cost
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
        filter="url(#bp-barb-pencil)"
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
          arbitrage profit
        </text>

        <text
          x="611"
          y="168"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $2.61
        </text>
        <text
          x="611"
          y="192"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          per day
        </text>

        <path d="M 552 206 H 670" strokeWidth="0.6" opacity="0.35" />

        <rect x="558" y="218" width="106" height="36" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="240"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $78/mo · $953/yr
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
          gross TOU spread capture
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-barb-pencil)"
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
          charge overnight on cheap power, discharge during peak price windows
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $2.61 × 365 ≈
        </text>
        <text
          x="160"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $953/yr profit
        </text>
      </g>
    </svg>
  );
}
