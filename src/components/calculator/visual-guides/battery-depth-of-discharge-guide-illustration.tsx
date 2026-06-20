"use client";

import { cn } from "@/lib/utils";

interface BatteryDepthOfDischargeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: used Wh + total Wh → DoD %.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryDepthOfDischargeGuideIllustration({
  className,
}: BatteryDepthOfDischargeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-dod-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bdod-guide-title bdod-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bdod-guide-title">Battery depth of discharge flow diagram</title>
      <desc id="bdod-guide-desc">
        Inputs: energy used in watt-hours and total battery capacity in
        watt-hours. Process: divide used energy by total capacity and multiply
        by one hundred. Output: depth of discharge as a percentage of pack
        capacity consumed.
      </desc>

      <defs>
        <pattern
          id="bp-bdod-grid-minor"
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
          id="bp-bdod-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bdod-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bdod-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bdod-grid-major)"
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
        FIG. 1 — DEPTH OF DISCHARGE
      </text>
      <path
        d="M 34 52 H 300"
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

      {/* Energy used */}
      <g
        filter="url(#bp-bdod-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 148 Q 114 154 108 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="42" y="104" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 50 112 H 66 M 50 120 H 66" strokeWidth="0.5" opacity="0.6" />
        <path
          d="M 78 118 L 86 130 L 94 118"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <text
          x="78"
          y="142"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          600 Wh
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
        Energy used (Wh)
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
        drawn from the pack
      </text>

      {/* Total capacity */}
      <g
        filter="url(#bp-bdod-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 200 Q 38 196 44 196 H 108 Q 114 196 116 202 V 252 Q 114 258 108 258 H 44 Q 38 258 36 252 Z"
          strokeWidth="1.1"
        />
        <rect x="42" y="208" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 50 216 H 66 M 50 224 H 66 M 50 232 H 66" strokeWidth="0.5" opacity="0.6" />
        <text
          x="82"
          y="234"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1,200 Wh
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
        Total capacity (Wh)
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
        e.g. 600 Wh used · 1,200 Wh total
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
        filter="url(#bp-bdod-pencil)"
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
          Fraction consumed
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
          DoD % = (used ÷ total) × 100
        </text>
        <text
          x="256"
          y="178"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          600 ÷ 1,200 × 100 = 50%
        </text>

        <path d="M 238 198 H 430" strokeWidth="0.6" opacity="0.45" />

        {/* Pack fill diagram */}
        <rect x="256" y="212" width="160" height="28" strokeWidth="0.8" rx="1" />
        <rect
          x="256"
          y="212"
          width="80"
          height="28"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <line x1="336" y1="206" x2="336" y2="246" strokeWidth="1" strokeDasharray="3 2" />
        <text
          x="268"
          y="230"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          used
        </text>
        <text
          x="348"
          y="230"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          remaining
        </text>

        <text
          x="256"
          y="268"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          SoC = 100% − DoD → 50% charge left
        </text>
        <text
          x="256"
          y="296"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          LiFePO₄: often limit daily DoD to 80–90%
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
        filter="url(#bp-bdod-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Gauge arc */}
        <path
          d="M 556 240 A 60 60 0 0 1 676 240"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 556 240 A 60 60 0 0 1 616 180"
          strokeWidth="1.4"
          fill="none"
        />
        <line x1="616" y1="240" x2="616" y2="228" strokeWidth="1.3" />
        <circle cx="616" cy="240" r="3" fill="currentColor" stroke="none" />

        <text
          x="616"
          y="200"
          textAnchor="middle"
          fill="currentColor"
          fontSize="32"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          50%
        </text>
        <text
          x="616"
          y="224"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          depth of discharge
        </text>
        <text
          x="616"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          600 Wh of 1,200 Wh
        </text>
        <text
          x="616"
          y="290"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          half the pack energy consumed
        </text>
      </g>

      {/* DoD vs chemistry note */}
      <g
        filter="url(#bp-bdod-pencil)"
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
          0% DoD = full · 100% DoD = empty
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          lead-acid: ~50% max daily
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          lithium: ~80–90% usable
        </text>
        <text x="380" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          deeper DoD → shorter cycle life
        </text>
      </g>
    </svg>
  );
}
