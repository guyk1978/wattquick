"use client";

import { cn } from "@/lib/utils";

interface RvSolarCalculatorGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: rooftop yield vs daily load → Ah bank shortfall.
 * Modal only (not embedded in page DOM by default).
 */
export function RvSolarCalculatorGuideIllustration({
  className,
}: RvSolarCalculatorGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "rv-solar-calculator-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="rvs-guide-title rvs-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="rvs-guide-title">RV solar and house battery balance diagram</title>
      <desc id="rvs-guide-desc">
        Inputs: rooftop panel watts, peak sun hours, system efficiency, daily
        house load in watt-hours, and bus voltage. Process: calculate daily
        solar yield, compare to load, convert any energy shortfall to amp-hour
        bank headroom. Output: daily yield and required Ah when harvest is low.
      </desc>

      <defs>
        <pattern
          id="bp-rvs-grid-minor"
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
          id="bp-rvs-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-rvs-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-rvs-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-rvs-grid-major)"
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
        FIG. 1 — RV SOLAR & HOUSE BATTERY
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
        filter="url(#bp-rvs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rooftop panels */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 118 Q 174 124 168 124 H 44 Q 38 124 36 118 Z"
          strokeWidth="1.1"
        />
        <path d="M 48 96 H 164 L 156 120 H 56 Z" strokeWidth="0.9" />
        <rect x="72" y="100" width="20" height="12" strokeWidth="0.6" />
        <rect x="96" y="100" width="20" height="12" strokeWidth="0.6" />
        <rect x="120" y="100" width="20" height="12" strokeWidth="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          rooftop
        </text>
        <text
          x="48"
          y="118"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          400 W
        </text>

        {/* Sun + efficiency row */}
        <path
          d="M 36 132 Q 38 128 44 128 H 168 Q 174 128 176 134 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <circle cx="64" cy="150" r="10" strokeWidth="0.9" />
        <path d="M 64 138 V 134 M 64 166 V 170 M 52 150 H 48 M 76 150 H 80" strokeWidth="0.6" />
        <text
          x="84"
          y="148"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          5 h · 80%
        </text>
        <text
          x="48"
          y="140"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          sun · η
        </text>

        {/* Daily load */}
        <path
          d="M 36 182 Q 38 178 44 178 H 168 Q 174 178 176 184 V 228 Q 174 234 168 234 H 44 Q 38 234 36 228 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="192" width="14" height="18" strokeWidth="0.7" rx="1" />
        <circle cx="78" cy="200" r="6" strokeWidth="0.7" />
        <path d="M 78 194 V 206 M 72 200 H 84" strokeWidth="0.6" />
        <path d="M 96 198 H 108 V 210 H 96 Z" strokeWidth="0.6" />
        <text
          x="48"
          y="188"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          house load
        </text>
        <text
          x="48"
          y="224"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1800 Wh/day
        </text>

        {/* House voltage */}
        <path
          d="M 36 244 Q 38 240 44 240 H 168 Q 174 240 176 246 V 288 Q 174 294 168 294 H 44 Q 38 294 36 288 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="256" width="32" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="68"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12V
        </text>
        <text
          x="96"
          y="272"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          or 24V
        </text>
        <text
          x="48"
          y="252"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          house bus
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 108 H 218" strokeLinecap="round" />
        <path d="M 214 104 L 222 108 L 214 112" strokeLinejoin="round" />
        <path d="M 186 152 H 218" strokeLinecap="round" />
        <path d="M 214 148 L 222 152 L 214 156" />
        <path d="M 186 206 H 218" strokeLinecap="round" />
        <path d="M 214 202 L 222 206 L 214 210" />
        <path d="M 186 266 H 218" strokeLinecap="round" />
        <path d="M 214 262 L 222 266 L 214 270" />
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
        filter="url(#bp-rvs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
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
          Harvest vs load
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          yield = W × h × η
        </text>
        <text
          x="256"
          y="156"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          400 × 5 × 0.80 = 1600 Wh
        </text>

        {/* Balance scale */}
        <path d="M 280 178 H 440" strokeWidth="1" />
        <path d="M 360 178 V 168" strokeWidth="1" />
        <path d="M 300 178 L 320 192 H 400 L 420 178" strokeWidth="0.9" />
        <rect x="308" y="192" width="48" height="16" strokeWidth="0.8" rx="1" />
        <text
          x="332"
          y="204"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          1600
        </text>
        <rect x="364" y="200" width="48" height="20" strokeWidth="0.8" rx="1" />
        <text
          x="388"
          y="214"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          1800
        </text>
        <text
          x="332"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          harvest
        </text>
        <text
          x="388"
          y="198"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          load
        </text>

        <text
          x="256"
          y="232"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          shortfall = load − yield
        </text>
        <text
          x="256"
          y="252"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          1800 − 1600 = 200 Wh
        </text>
        <text
          x="256"
          y="276"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Ah = Wh ÷ V → 17 Ah
        </text>

        <text
          x="256"
          y="298"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          surplus if yield ≥ load
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
        filter="url(#bp-rvs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        {/* RV with solar + battery */}
        <path
          d="M 560 118 H 660 Q 668 118 668 126 V 168 H 560 Z"
          strokeWidth="1"
          rx="2"
        />
        <path d="M 568 118 Q 580 108 592 118 M 620 118 Q 632 108 644 118" strokeWidth="0.8" />
        <rect x="576" y="112" width="16" height="8" strokeWidth="0.6" />
        <rect x="596" y="112" width="16" height="8" strokeWidth="0.6" />
        <rect x="616" y="112" width="16" height="8" strokeWidth="0.6" />
        <circle cx="576" cy="168" r="8" strokeWidth="0.9" />
        <circle cx="652" cy="168" r="8" strokeWidth="0.9" />

        <text
          x="612"
          y="198"
          textAnchor="middle"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1600
        </text>
        <text
          x="612"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Wh/day yield
        </text>

        <rect x="572" y="232" width="80" height="28" strokeWidth="0.9" rx="1" />
        <path d="M 580 246 H 644" strokeWidth="0.7" opacity="0.5" />
        <text
          x="612"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          +17 Ah
        </text>
        <text
          x="612"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          bank headroom
        </text>
        <text
          x="612"
          y="294"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          or surplus Wh if covered
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-rvs-pencil)"
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
          boondocking balance — panels refill bank; Ah covers overnight gap
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          200 Wh
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          12 V
        </text>
        <text x="175" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          17 Ah extra bank
        </text>
      </g>
    </svg>
  );
}
