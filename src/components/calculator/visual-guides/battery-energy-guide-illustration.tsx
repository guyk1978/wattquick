"use client";

import { cn } from "@/lib/utils";

interface BatteryEnergyGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Ah + V → Wh stored energy.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryEnergyGuideIllustration({
  className,
}: BatteryEnergyGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-energy-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="beng-guide-title beng-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="beng-guide-title">Battery energy flow diagram</title>
      <desc id="beng-guide-desc">
        Inputs: battery capacity in amp-hours and nominal voltage. Process:
        multiply amp-hours by voltage to convert charge capacity into stored
        energy. Output: total battery energy in watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-beng-grid-minor"
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
          id="bp-beng-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-beng-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-beng-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-beng-grid-major)"
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
        FIG. 1 — BATTERY ENERGY
      </text>
      <path
        d="M 34 52 H 248"
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

      {/* Ah capacity */}
      <g
        filter="url(#bp-beng-pencil)"
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
        <path d="M 50 112 H 66 M 50 120 H 66 M 50 128 H 66" strokeWidth="0.5" opacity="0.6" />
        <text
          x="82"
          y="128"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 Ah
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
        Capacity (Ah)
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
        charge the pack can deliver
      </text>

      {/* Voltage */}
      <g
        filter="url(#bp-beng-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 200 Q 38 196 44 196 H 108 Q 114 196 116 202 V 252 Q 114 258 108 258 H 44 Q 38 258 36 252 Z"
          strokeWidth="1.1"
        />
        <text
          x="58"
          y="232"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          stroke="none"
        >
          12 V
        </text>
        <path d="M 48 210 L 56 218 L 88 206" strokeWidth="1" />
        <line x1="48" y1="242" x2="88" y2="242" strokeWidth="0.8" opacity="0.5" />
        <line x1="48" y1="248" x2="88" y2="248" strokeWidth="0.8" opacity="0.5" />
      </g>
      <text
        x="36"
        y="274"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Nominal voltage (V)
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
        e.g. 12 V lead-acid · 48 V LiFePO₄
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
        filter="url(#bp-beng-pencil)"
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
          Convert charge → energy
        </text>
        <text
          x="256"
          y="148"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Wh = Ah × V
        </text>
        <text
          x="256"
          y="178"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          100 × 12 = 1,200 Wh
        </text>

        <path d="M 238 198 H 430" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="222"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Why multiply?
        </text>
        <text
          x="256"
          y="246"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          Ah = amps × hours (charge)
        </text>
        <text
          x="256"
          y="264"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          V × A = W → Ah × V = Wh
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
          compare packs at different voltages fairly
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
        filter="url(#bp-beng-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Energy bar sketch */}
        <rect x="556" y="108" width="120" height="48" strokeWidth="0.9" rx="2" />
        <rect
          x="562"
          y="114"
          width="108"
          height="36"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.1"
          rx="1"
        />
        <text
          x="616"
          y="138"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          stored
        </text>

        <text
          x="616"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1,200 Wh
        </text>
        <text
          x="616"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          (1.2 kWh)
        </text>
        <text
          x="616"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          total stored energy
        </text>
        <text
          x="616"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          nameplate · not usable DoD
        </text>
      </g>

      {/* Voltage tier comparison */}
      <g
        filter="url(#bp-beng-pencil)"
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
          same Ah, different V → different Wh
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          100Ah·12V = 1,200Wh
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          100Ah·24V = 2,400Wh
        </text>
        <text x="360" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          100Ah·48V = 4,800Wh
        </text>
      </g>
    </svg>
  );
}
