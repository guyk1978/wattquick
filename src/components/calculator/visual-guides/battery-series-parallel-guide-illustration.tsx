"use client";

import { cn } from "@/lib/utils";

interface BatterySeriesParallelGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: S × P layout + cell specs → V, Ah, Wh.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatterySeriesParallelGuideIllustration({
  className,
}: BatterySeriesParallelGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-series-parallel-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bsp-guide-title bsp-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bsp-guide-title">Battery series and parallel flow diagram</title>
      <desc id="bsp-guide-desc">
        Inputs: cells in series, strings in parallel, cell voltage, and cell
        amp-hour capacity. Process: series multiplies voltage, parallel
        multiplies amp-hours, then pack watt-hours equals voltage times
        amp-hours. Output: configuration label, pack voltage, amp-hours, and
        stored energy in watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-bsp-grid-minor"
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
          id="bp-bsp-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bsp-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bsp-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bsp-grid-major)"
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
        FIG. 1 — SERIES &amp; PARALLEL PACK
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
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-bsp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* S count */}
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 132 Q 114 138 108 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <text
          x="52"
          y="122"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          4S
        </text>
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          series
        </text>

        {/* P count */}
        <path
          d="M 36 148 Q 38 144 44 144 H 108 Q 114 144 116 150 V 182 Q 114 188 108 188 H 44 Q 38 188 36 182 Z"
          strokeWidth="1.1"
        />
        <text
          x="52"
          y="172"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2P
        </text>
        <text
          x="48"
          y="156"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          parallel
        </text>

        {/* Cell specs */}
        <path
          d="M 36 198 Q 38 194 44 194 H 108 Q 114 194 116 200 V 252 Q 114 258 108 258 H 44 Q 38 258 36 252 Z"
          strokeWidth="1.1"
        />
        <rect x="48" y="206" width="20" height="28" strokeWidth="0.8" rx="1" />
        <path d="M 54 214 H 62 M 54 220 H 62 M 54 226 H 62" strokeWidth="0.4" opacity="0.5" />
        <text
          x="74"
          y="222"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          3.2 V
        </text>
        <text
          x="74"
          y="242"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 Ah
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
        Series (S) · Parallel (P) · cell V · cell Ah
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
        e.g. 4S2P LiFePO₄ · 3.2 V · 100 Ah cells
      </text>

      {/* Mini 4S2P cell grid */}
      <g
        filter="url(#bp-bsp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      >
        <text x="36" y="312" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          layout
        </text>
        {/* Row 1 - string 1 */}
        <rect x="36" y="318" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="54" y="318" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="72" y="318" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="90" y="318" width="14" height="22" strokeWidth="0.7" rx="1" />
        <path d="M 50 329 H 54 M 68 329 H 72 M 86 329 H 90" strokeWidth="0.6" />
        {/* Row 2 - string 2 parallel */}
        <rect x="36" y="346" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="54" y="346" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="72" y="346" width="14" height="22" strokeWidth="0.7" rx="1" />
        <rect x="90" y="346" width="14" height="22" strokeWidth="0.7" rx="1" />
        <path d="M 50 357 H 54 M 68 357 H 72 M 86 357 H 90" strokeWidth="0.6" />
        <path d="M 36 329 V 357 M 104 329 V 357" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 118 H 198" strokeLinecap="round" />
        <path d="M 194 114 L 202 118 L 194 122" strokeLinejoin="round" />
        <path d="M 126 168 H 198" strokeLinecap="round" />
        <path d="M 194 164 L 202 168 L 194 172" />
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
        filter="url(#bp-bsp-pencil)"
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
          1. Series → voltage
        </text>
        <text
          x="256"
          y="142"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          V = S × V_cell
        </text>
        <text
          x="256"
          y="164"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          4 × 3.2 = 12.8 V
        </text>

        <path d="M 238 178 H 430" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="200"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Parallel → capacity
        </text>
        <text
          x="256"
          y="224"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Ah = P × Ah_cell
        </text>
        <text
          x="256"
          y="246"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          2 × 100 = 200 Ah
        </text>

        <path d="M 238 260 H 430" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="282"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          3. Pack energy
        </text>
        <text
          x="256"
          y="306"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh = V × Ah = 2,560 Wh
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
        filter="url(#bp-bsp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        <text
          x="616"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="18"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          4S2P
        </text>
        <text
          x="616"
          y="138"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          configuration
        </text>

        <text
          x="556"
          y="172"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          V
        </text>
        <text
          x="580"
          y="172"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12.8 V
        </text>

        <text
          x="556"
          y="200"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Ah
        </text>
        <text
          x="580"
          y="200"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          200 Ah
        </text>

        <path d="M 548 214 H 684" strokeWidth="0.6" opacity="0.4" />

        <text
          x="616"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          2,560 Wh
        </text>
        <text
          x="616"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          pack energy
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
          matched cells · BMS for S count
        </text>
      </g>

      {/* Rule summary */}
      <g
        filter="url(#bp-bsp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="128"
          y="352"
          width="556"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text x="140" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          series adds V · parallel adds Ah
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1S4P → same V, 4× Ah
        </text>
        <text x="280" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          4S1P → 4× V, same Ah
        </text>
        <text x="420" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          8 cells total in 4S2P
        </text>
      </g>
    </svg>
  );
}
