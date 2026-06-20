"use client";

import { cn } from "@/lib/utils";

interface BatteryVoltageDropGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: A + wire length + V → drop % → V at load.
 * Modal only (not embedded in page DOM by default).
 */
export function BatteryVoltageDropGuideIllustration({
  className,
}: BatteryVoltageDropGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-voltage-drop-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bvd-guide-title bvd-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bvd-guide-title">Battery voltage drop flow diagram</title>
      <desc id="bvd-guide-desc">
        Inputs: load current in amps, one-way wire length in feet, and system
        voltage. Process: recommend wire gauge, calculate round-trip I times R
        drop, express as percent of system voltage. Output: voltage at the load
        and drop percentage.
      </desc>

      <defs>
        <pattern
          id="bp-bvd-grid-minor"
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
          id="bp-bvd-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bvd-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bvd-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bvd-grid-major)"
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
        FIG. 1 — DC WIRE VOLTAGE DROP
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
        filter="url(#bp-bvd-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 108 Q 114 88 116 94 V 248 Q 114 254 108 254 H 44 Q 38 254 36 248 Z"
          strokeWidth="1.1"
        />

        <path d="M 48 108 L 88 108" strokeWidth="1.2" />
        <path d="M 72 100 L 88 108 L 72 116" strokeWidth="0.9" />
        <text x="48" y="100" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          current
        </text>
        <text x="48" y="128" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          40 A
        </text>

        <path d="M 48 148 H 96" strokeWidth="0.9" strokeDasharray="3 2" />
        <text x="48" y="142" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          one-way
        </text>
        <text x="48" y="168" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          15 ft cable
        </text>

        <rect x="48" y="180" width="28" height="32" strokeWidth="0.9" rx="2" />
        <path d="M 56 188 H 68 M 56 196 H 68 M 56 204 H 68" strokeWidth="0.4" opacity="0.5" />
        <text x="84" y="202" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 V
        </text>
        <text x="48" y="176" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          system
        </text>

        <text x="48" y="232" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          battery → load (DC)
        </text>
      </g>

      {/* Wire run sketch */}
      <g filter="url(#bp-bvd-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="268" width="80" height="24" strokeWidth="0.8" rx="2" />
        <path d="M 116 280 H 196" strokeWidth="1" />
        <path d="M 192 276 L 196 280 L 192 284" strokeWidth="0.7" />
        <rect x="196" y="272" width="24" height="16" strokeWidth="0.8" rx="1" />
        <text x="40" y="284" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          batt
        </text>
        <text x="200" y="284" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          load
        </text>
        <text x="130" y="272" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          15 ft × 2 (round trip)
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 168 H 198" strokeLinecap="round" />
        <path d="M 194 164 L 202 168 L 194 172" strokeLinejoin="round" />
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
        filter="url(#bp-bvd-pencil)"
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
          1. Pick AWG (ampacity)
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          40 A → 8 AWG copper
        </text>

        <path d="M 238 148 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="168" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Round-trip drop
        </text>
        <text x="256" y="188" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          ΔV = I × R/ft × 2L
        </text>
        <text x="256" y="206" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          40 × 0.00204 × 30 = 2.45 V
        </text>

        <path d="M 238 222 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="242" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Drop percent
        </text>
        <text x="256" y="262" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          drop % = (ΔV ÷ V) × 100
        </text>
        <text x="256" y="280" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          2.45 ÷ 12 = 20.4%
        </text>
        <text x="256" y="298" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          target ≤3% on critical DC runs
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
        filter="url(#bp-bvd-pencil)"
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
          at load terminals
        </text>

        <text x="616" y="152" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          9.55 V
        </text>
        <text x="616" y="174" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          V_load = V_sys − ΔV
        </text>

        <text x="616" y="212" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          20.4% drop
        </text>
        <text x="616" y="232" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          2.45 V lost in cable
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          8 AWG recommended
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          upsize gauge or shorten run
        </text>
      </g>

      {/* Voltage bar */}
      <g filter="url(#bp-bvd-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          12.0 V at battery
        </text>
        <rect x="140" y="360" width="200" height="12" strokeWidth="0.8" rx="1" />
        <rect x="140" y="360" width="159" height="12" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12" rx="1" />
        <rect x="299" y="360" width="41" height="12" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" rx="1" />
        <text x="148" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          9.55 V
        </text>
        <text x="304" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          loss
        </text>
        <text x="48" y="392" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          sag trips inverters · use DC Cable Size to pick gauge
        </text>
      </g>
    </svg>
  );
}
