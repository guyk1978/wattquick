"use client";

import { cn } from "@/lib/utils";

interface SolarBatteryBankGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: daily Wh + autonomy days + DoD → bank Wh.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarBatteryBankGuideIllustration({
  className,
}: SolarBatteryBankGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-battery-bank-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="sbb-guide-title sbb-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sbb-guide-title">Solar battery bank sizing flow diagram</title>
      <desc id="sbb-guide-desc">
        Inputs: daily energy use in watt-hours, autonomy backup days, and
        usable depth of discharge. Process: multiply daily use by backup days,
        then divide by the usable fraction of the bank. Output: minimum battery
        bank size in watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-sbb-grid-minor"
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
          id="bp-sbb-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-sbb-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-sbb-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-sbb-grid-major)"
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
        FIG. 1 — SOLAR BATTERY BANK SIZE
      </text>
      <path
        d="M 34 52 H 320"
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
        filter="url(#bp-sbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Daily energy use */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 108 H 88 M 52 118 H 120 M 52 128 H 100" strokeWidth="0.8" opacity="0.7" />
        <rect x="128" y="104" width="12" height="16" strokeWidth="0.7" rx="1" />
        <path d="M 132 108 H 136 M 132 116 H 136" strokeWidth="0.5" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          daily load
        </text>
        <text
          x="48"
          y="124"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          3000 Wh/day
        </text>

        {/* Autonomy days */}
        <path
          d="M 36 152 Q 38 148 44 148 H 168 Q 174 148 176 154 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="168" width="28" height="20" strokeWidth="0.8" rx="1" />
        <text
          x="66"
          y="182"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          D1
        </text>
        <rect x="84" y="168" width="28" height="20" strokeWidth="0.8" rx="1" />
        <text
          x="98"
          y="182"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          D2
        </text>
        <path d="M 52 196 H 112" strokeWidth="0.6" opacity="0.5" />
        <path
          d="M 52 196 Q 72 188 82 196 Q 92 204 112 196"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <text
          x="48"
          y="164"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          autonomy
        </text>
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2 days
        </text>
        <text
          x="48"
          y="224"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          no-sun backup
        </text>

        {/* Depth of discharge */}
        <path
          d="M 36 238 Q 38 234 44 234 H 168 Q 174 234 176 240 V 288 Q 174 294 168 294 H 44 Q 38 294 36 288 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="252" width="24" height="32" strokeWidth="0.9" rx="1" />
        <path d="M 52 264 H 76" strokeWidth="0.6" opacity="0.4" />
        <path d="M 52 264 H 76" strokeWidth="1.1" />
        <text
          x="64"
          y="260"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.5"
        >
          reserve
        </text>
        <text
          x="48"
          y="248"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          usable DoD
        </text>
        <text
          x="88"
          y="272"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          80%
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 115 H 218" strokeLinecap="round" />
        <path d="M 214 111 L 222 115 L 214 119" strokeLinejoin="round" />
        <path d="M 186 186 H 218" strokeLinecap="round" />
        <path d="M 214 182 L 222 186 L 214 190" />
        <path d="M 186 264 H 218" strokeLinecap="round" />
        <path d="M 214 260 L 222 264 L 214 268" />
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
        filter="url(#bp-sbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 296 Q 476 304 468 304 H 228 Q 220 304 218 296 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Off-grid storage
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh = (Wh/day × days) ÷ DoD
        </text>
        <text
          x="256"
          y="162"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          (3000 × 2) ÷ 0.80
        </text>
        <text
          x="256"
          y="186"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 7500 Wh
        </text>

        {/* Stacked energy blocks for 2 days */}
        <rect x="280" y="208" width="48" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="304"
          y="224"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          3000
        </text>
        <rect x="280" y="236" width="48" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="304"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          3000
        </text>
        <text
          x="304"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          2 × daily
        </text>

        {/* DoD bar */}
        <rect x="360" y="208" width="32" height="52" strokeWidth="0.9" rx="1" />
        <path d="M 360 218 H 392" strokeWidth="0.6" opacity="0.4" />
        <path d="M 360 218 H 392" strokeWidth="1.1" />
        <text
          x="376"
          y="214"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.5"
        >
          20%
        </text>
        <text
          x="376"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          80%
        </text>
        <text
          x="376"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          usable
        </text>

        {/* Sun/cloud off-grid sketch */}
        <path d="M 420 220 Q 440 200 460 220" strokeWidth="0.8" opacity="0.5" />
        <path
          d="M 432 228 Q 448 216 456 228 Q 464 236 448 240 Q 436 244 432 228"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <text
          x="256"
          y="292"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          energy reserve ÷ safe discharge limit
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
        filter="url(#bp-sbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 296 Q 692 304 684 304 H 538 Q 530 304 528 296 Z"
          strokeWidth="1.3"
        />

        {/* Battery bank stack */}
        <rect x="564" y="118" width="36" height="56" strokeWidth="1" rx="2" />
        <rect x="604" y="118" width="36" height="56" strokeWidth="1" rx="2" />
        <rect x="644" y="118" width="36" height="56" strokeWidth="1" rx="2" />
        <path d="M 572 134 H 592 M 572 148 H 592 M 612 134 H 632 M 612 148 H 632 M 652 134 H 672 M 652 148 H 672" strokeWidth="0.6" opacity="0.6" />
        <path d="M 560 174 H 684" strokeWidth="0.7" opacity="0.5" />
        <text
          x="622"
          y="192"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          battery bank
        </text>

        <text
          x="622"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          7500 Wh
        </text>
        <text
          x="622"
          y="256"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          min. nameplate
        </text>
        <text
          x="622"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          +20% for losses → Ah @ V
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-sbb-pencil)"
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
          autonomy = cloudy days without solar refill; DoD protects cycle life
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (3000 × 2)
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="160" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          80%
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="220" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          7500 Wh bank
        </text>
      </g>
    </svg>
  );
}
