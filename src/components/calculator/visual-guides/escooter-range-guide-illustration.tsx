"use client";

import { cn } from "@/lib/utils";

interface EscooterRangeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: SOC + tyre pressure + voltage sag (36/48/52 V)
 * → Wh/km model → remaining range km. Modal only.
 */
export function EscooterRangeGuideIllustration({
  className,
}: EscooterRangeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 440"
      className={cn(
        "escooter-range-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="escooter-rt-guide-title escooter-rt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="escooter-rt-guide-title">E-scooter range flow diagram</title>
      <desc id="escooter-rt-guide-desc">
        Inputs: state of charge slider, tyre pressure versus recommended
        pressure, and nominal pack voltage at 36, 48, or 52 volts. Process:
        usable watt-hours divided by adjusted watt-hours per kilometre including
        rolling resistance and voltage sag. Output: estimated remaining range in
        kilometres.
      </desc>

      <defs>
        <pattern
          id="bp-es-rt-grid-minor"
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
          id="bp-es-rt-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-es-rt-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-es-rt-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        height="440"
        fill="url(#bp-es-rt-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="416"
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
        FIG. 1 — E-SCOOTER RANGE
      </text>
      <path
        d="M 34 52 H 268"
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
        filter="url(#bp-es-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* SOC slider */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <line x1="48" y1="111" x2="164" y2="111" strokeWidth="0.9" />
        <circle cx="108" cy="111" r="6" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          SOC
        </text>
        <text
          x="130"
          y="104"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          50%
        </text>

        {/* Tyre pressure */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 180 Q 174 186 168 186 H 44 Q 38 186 36 180 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="162" r="14" strokeWidth="1" />
        <circle cx="72" cy="162" r="6" strokeWidth="0.8" />
        <path d="M 96 158 L 104 166 L 120 150" strokeWidth="1" />
        <text
          x="48"
          y="156"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          tyre
        </text>
        <text
          x="128"
          y="170"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          3.5 bar
        </text>

        {/* Voltage presets 36 / 48 / 52 */}
        <path
          d="M 36 196 Q 38 192 44 192 H 168 Q 174 192 176 198 V 268 Q 174 274 168 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />
        <rect x="48" y="208" width="36" height="18" strokeWidth="1" fill="currentColor" fillOpacity="0.12" />
        <rect x="90" y="208" width="36" height="18" strokeWidth="0.9" />
        <rect x="132" y="208" width="36" height="18" strokeWidth="0.9" />
        <text x="54" y="221" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          36V
        </text>
        <text x="96" y="221" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          48V
        </text>
        <text x="138" y="221" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          52V
        </text>
        {/* Sag curve sketch — steeper on 36V */}
        <path d="M 52 248 Q 72 240 92 246" strokeWidth="1" opacity="0.85" />
        <path d="M 96 248 Q 116 244 136 246" strokeWidth="0.9" opacity="0.6" />
        <path d="M 140 248 Q 160 246 168 247" strokeWidth="0.8" opacity="0.5" />
        <text x="48" y="262" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          voltage sag under load
        </text>
      </g>

      <text x="36" y="292" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.75">
        + battery Wh, rider mass
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 162 H 218" strokeLinecap="round" />
        <path d="M 214 158 L 222 162 L 214 166" strokeLinejoin="round" />
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
        filter="url(#bp-es-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 318 Q 476 326 468 326 H 228 Q 220 326 218 318 Z"
          strokeWidth="1.2"
        />

        <text x="238" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1. Usable energy
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          Wh_use = Wh × (SOC/100) × η
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          e.g. 360 × 0.5 × 0.9 = 162 Wh
        </text>

        <path d="M 238 164 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="184" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Wh/km (drag + sag)
        </text>
        <text x="256" y="204" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          base + tyre penalty + mass
        </text>
        <text x="256" y="222" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          + voltage sag @ 36/48/52 V
        </text>
        <text x="256" y="242" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          low SOC → more sag → higher Wh/km
        </text>

        <path d="M 238 256 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="276" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Range
        </text>
        <text x="256" y="298" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none">
          km = Wh_use ÷ Wh/km
        </text>
        <text x="256" y="316" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          162 ÷ 16 ≈ 10.1 km
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
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
        filter="url(#bp-es-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Scooter + route sketch */}
        <circle cx="611" cy="148" r="22" strokeWidth="1" />
        <line x1="611" y1="170" x2="611" y2="198" strokeWidth="1.2" />
        <line x1="598" y1="182" x2="624" y2="182" strokeWidth="1" />
        <path d="M 572 210 Q 611 200 650 210" strokeWidth="1.2" strokeDasharray="4 3" />

        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          10.1 km
        </text>
        <text
          x="611"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          estimated remaining range
        </text>
        <text
          x="611"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          at current SOC & pressure
        </text>
      </g>

      {/* Bottom: SOC vs range relationship */}
      <g
        filter="url(#bp-es-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect x="36" y="352" width="648" height="68" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          range vs SOC (same trip)
        </text>
        <line x1="72" y1="400" x2="640" y2="400" strokeWidth="0.8" />
        <path d="M 72 400 Q 200 398 280 380 T 440 340 T 640 310" strokeWidth="1.2" />
        <text x="72" y="392" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          20%
        </text>
        <text x="628" y="392" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          100%
        </text>
        <text x="480" y="368" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          inflate tyres → lower Wh/km → more km
        </text>
      </g>
    </svg>
  );
}
