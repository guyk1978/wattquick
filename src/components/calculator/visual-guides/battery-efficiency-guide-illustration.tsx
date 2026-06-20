"use client";

import { cn } from "@/lib/utils";

interface BatteryEfficiencyGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: energy in + energy out → round-trip η %.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryEfficiencyGuideIllustration({
  className,
}: BatteryEfficiencyGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-efficiency-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="beff-guide-title beff-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="beff-guide-title">Battery round-trip efficiency flow diagram</title>
      <desc id="beff-guide-desc">
        Inputs: energy put into the battery during charging in watt-hours and
        energy retrieved during discharge in watt-hours. Process: divide output
        by input and multiply by one hundred. Output: round-trip efficiency as a
        percentage, with the difference representing heat and BMS losses.
      </desc>

      <defs>
        <pattern
          id="bp-beff-grid-minor"
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
          id="bp-beff-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-beff-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-beff-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-beff-grid-major)"
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
        FIG. 1 — BATTERY ROUND-TRIP EFFICIENCY
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
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* Energy in (charge) */}
      <g
        filter="url(#bp-beff-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 148 Q 114 154 108 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="48" y="104" width="24" height="18" strokeWidth="0.8" rx="1" />
        <path d="M 54 113 H 66 M 60 107 V 119" strokeWidth="0.6" />
        <path d="M 78 110 L 86 122 L 94 110" strokeWidth="1" />
        <text
          x="78"
          y="142"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1,000 Wh
        </text>
      </g>
      <text
        x="36"
        y="170"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Energy in (Wh)
      </text>
      <text
        x="36"
        y="186"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        charged into the pack
      </text>

      {/* Energy out (discharge) */}
      <g
        filter="url(#bp-beff-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 200 Q 38 196 44 196 H 108 Q 114 196 116 202 V 252 Q 114 258 108 258 H 44 Q 38 258 36 252 Z"
          strokeWidth="1.1"
        />
        <rect x="42" y="208" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 50 216 H 66 M 50 224 H 66" strokeWidth="0.5" opacity="0.6" />
        <path d="M 78 218 L 94 230 L 78 242" strokeWidth="1" />
        <text
          x="78"
          y="234"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          950 Wh
        </text>
      </g>
      <text
        x="36"
        y="274"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Energy out (Wh)
      </text>
      <text
        x="36"
        y="290"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        e.g. 1,000 Wh in · 950 Wh out
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 124 H 198" strokeLinecap="round" />
        <path d="M 194 120 L 202 124 L 194 128" strokeLinejoin="round" />
        <path d="M 126 228 H 198" strokeLinecap="round" />
        <path d="M 194 224 L 202 228 L 194 232" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-beff-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 96 Q 220 90 228 90 H 452 Q 460 90 462 98 V 318 Q 460 326 452 326 H 228 Q 220 326 218 318 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="118"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Round-trip ratio
        </text>
        <text
          x="256"
          y="148"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          η = (out ÷ in) × 100
        </text>
        <text
          x="256"
          y="178"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          950 ÷ 1,000 × 100 = 95%
        </text>

        <path d="M 238 198 H 430" strokeWidth="0.6" opacity="0.45" />

        {/* Charge → battery → discharge loop */}
        <rect x="256" y="210" width="28" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 264 218 H 276 M 264 226 H 276" strokeWidth="0.5" opacity="0.5" />
        <path d="M 284 228 H 308 M 308 228 L 304 224 M 308 228 L 304 232" strokeWidth="0.7" />
        <path d="M 316 228 L 340 228 L 340 248 L 316 248 Z" strokeWidth="0.8" />
        <path d="M 348 238 H 372 M 372 238 L 368 234 M 372 238 L 368 242" strokeWidth="0.7" />
        <text
          x="256"
          y="268"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          charge → store → discharge
        </text>

        <text
          x="256"
          y="292"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          loss = in − out → 50 Wh heat / BMS
        </text>
        <text
          x="256"
          y="310"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          η cannot exceed 100%
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 472 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-beff-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Efficiency ring */}
        <circle cx="616" cy="188" r="44" strokeWidth="1.2" />
        <path
          d="M 616 144 A 44 44 0 0 1 660 188"
          strokeWidth="1.4"
          fill="none"
        />
        <text
          x="616"
          y="196"
          textAnchor="middle"
          fill="currentColor"
          fontSize="30"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          95%
        </text>
        <text
          x="616"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          round-trip efficiency
        </text>
        <text
          x="616"
          y="256"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          950 Wh recovered
        </text>
        <text
          x="616"
          y="274"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          of 1,000 Wh stored
        </text>
        <text
          x="616"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          Li ~95%+ · lead-acid ~80–85%
        </text>
      </g>

      {/* Loss breakdown bar */}
      <g
        filter="url(#bp-beff-pencil)"
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
          1,000 Wh in
        </text>
        <rect x="120" y="360" width="380" height="12" strokeWidth="0.8" rx="1" />
        <rect
          x="120"
          y="360"
          width="361"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <rect
          x="481"
          y="360"
          width="19"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.06"
          rx="1"
        />
        <text x="130" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          950 Wh out
        </text>
        <text x="488" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          50 Wh loss
        </text>
        <text x="48" y="392" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          heat · BMS · Peukert · cable I²R
        </text>
      </g>
    </svg>
  );
}
