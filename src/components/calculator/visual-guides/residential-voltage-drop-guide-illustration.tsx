"use client";

import { cn } from "@/lib/utils";

interface ResidentialVoltageDropGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: V + A + length + AWG/mm² → AC I×R drop.
 * Modal only (not embedded in page DOM by default).
 */
export function ResidentialVoltageDropGuideIllustration({
  className,
}: ResidentialVoltageDropGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "residential-voltage-drop-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="rvd-guide-title rvd-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="rvd-guide-title">Residential AC voltage drop flow diagram</title>
      <desc id="rvd-guide-desc">
        Inputs: supply voltage, load current in amps, one-way cable length in
        meters, and copper conductor size in AWG or mm². Process: calculate
        round-trip resistance, voltage drop equals current times resistance,
        drop percent equals drop divided by supply voltage. Output: volts lost,
        percent drop, voltage at load, and NEC-style 3% or 5% compliance.
      </desc>

      <defs>
        <pattern
          id="bp-rvd-grid-minor"
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
          id="bp-rvd-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-rvd-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-rvd-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-rvd-grid-major)"
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
        FIG. 1 — RESIDENTIAL AC VOLTAGE DROP
      </text>
      <path
        d="M 34 52 H 420"
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
        filter="url(#bp-rvd-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 176 Q 182 88 184 94 V 300 Q 182 306 176 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          supply voltage
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          120 V
        </text>
        <text x="48" y="136" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          line-to-neutral
        </text>

        <path d="M 48 148 L 88 148" strokeWidth="1.1" />
        <path d="M 72 140 L 88 148 L 72 156" strokeWidth="0.9" />
        <text x="48" y="144" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          load current
        </text>
        <text x="48" y="168" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          20 A
        </text>

        <path d="M 48 182 H 120" strokeWidth="0.9" strokeDasharray="3 2" />
        <text x="48" y="178" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          one-way length
        </text>
        <text x="48" y="200" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          25 m cable
        </text>

        <circle cx="56" cy="218" r="8" strokeWidth="0.8" />
        <path d="M 52 218 H 60 M 56 214 V 222" strokeWidth="0.6" />
        <text x="70" y="214" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          copper
        </text>
        <text x="70" y="228" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 AWG
        </text>
        <text x="70" y="240" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          3.31 mm²
        </text>

        {/* Panel → outlet sketch */}
        <rect x="48" y="252" width="20" height="28" strokeWidth="0.8" rx="1" />
        <text x="50" y="270" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          panel
        </text>
        <path d="M 68 266 H 140" strokeWidth="0.9" />
        <path d="M 136 262 L 140 266 L 136 270" strokeWidth="0.7" />
        <rect x="140" y="258" width="16" height="16" strokeWidth="0.8" rx="1" />
        <text x="142" y="270" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          load
        </text>
        <text x="48" y="296" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          panel → outlet (AC branch)
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 194 190 H 218" strokeLinecap="round" />
        <path d="M 214 186 L 222 190 L 214 194" strokeLinejoin="round" />
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
        filter="url(#bp-rvd-pencil)"
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
          1. Wire resistance
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          R = Ω/m × 2 × length
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          0.00521 × 50 m = 0.261 Ω
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Voltage drop
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          ΔV = I × R (out &amp; back)
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          20 × 0.261 = 5.21 V
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Drop percent
        </text>
        <text x="256" y="272" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          drop % = (ΔV ÷ V) × 100
        </text>
        <text x="256" y="290" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          5.21 ÷ 120 = 4.3%
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
        filter="url(#bp-rvd-pencil)"
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

        <text x="616" y="148" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          114.8 V
        </text>
        <text x="616" y="170" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          V_load = 120 − 5.21 V
        </text>

        <text x="616" y="206" textAnchor="middle" fill="currentColor" fontSize="15" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          4.3% drop
        </text>
        <text x="616" y="226" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          5.21 V lost in copper
        </text>

        <rect x="564" y="240" width="104" height="22" strokeWidth="0.8" rx="2" />
        <text x="616" y="255" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          within 5% limit
        </text>

        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          target ≤3% branch · ≤5% total
        </text>
      </g>

      {/* Bottom voltage bar */}
      <g filter="url(#bp-rvd-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          120 V at panel
        </text>
        <rect x="130" y="360" width="220" height="12" strokeWidth="0.8" rx="1" />
        <rect x="130" y="360" width="212" height="12" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" rx="1" />
        <rect x="342" y="360" width="8" height="12" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" rx="1" />
        <text x="138" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          114.8 V
        </text>
        <text x="346" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          loss
        </text>
        <text x="48" y="392" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          motors dim · EVSE throttles · upsize AWG/mm² or shorten the run
        </text>
      </g>
    </svg>
  );
}
