"use client";

import { cn } from "@/lib/utils";

interface VoltsToWattsGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: voltage + current → W = V × A → power watts.
 * Modal only (not embedded in page DOM by default).
 */
export function VoltsToWattsGuideIllustration({
  className,
}: VoltsToWattsGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "volts-to-watts-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="v2w-guide-title v2w-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="v2w-guide-title">Volts to watts flow diagram</title>
      <desc id="v2w-guide-desc">
        Inputs: voltage in volts and current in amps. Process: multiply voltage
        by current using the power formula. Output: electrical power in watts.
      </desc>

      <defs>
        <pattern
          id="bp-v2w-grid-minor"
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
          id="bp-v2w-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-v2w-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-v2w-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-v2w-grid-major)"
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
        FIG. 1 — VOLTS TO WATTS
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
        filter="url(#bp-v2w-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Voltage V */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <path d="M 56 112 L 68 124 L 96 100" strokeWidth="1.2" />
        <text
          x="104"
          y="128"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          120 V
        </text>
        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          voltage
        </text>

        {/* Current A */}
        <path
          d="M 36 168 Q 38 164 44 164 H 168 Q 174 164 176 170 V 224 Q 174 230 168 230 H 44 Q 38 230 36 224 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="196" r="14" strokeWidth="1" />
        <text
          x="66"
          y="200"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          A
        </text>
        <text
          x="96"
          y="200"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          15 A
        </text>
        <text
          x="48"
          y="184"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          current
        </text>

        {/* Outlet / load sketch */}
        <rect x="48" y="244" width="28" height="20" strokeWidth="0.8" rx="1" />
        <circle cx="54" cy="254" r="2" strokeWidth="0.6" />
        <circle cx="70" cy="254" r="2" strokeWidth="0.6" />
        <text x="84" y="258" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          branch circuit load
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 120 H 218" strokeLinecap="round" />
        <path d="M 214 116 L 222 120 L 214 124" strokeLinejoin="round" />
        <path d="M 186 196 H 218" strokeLinecap="round" />
        <path d="M 214 192 L 222 196 L 214 200" />
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
        filter="url(#bp-v2w-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 228 Q 220 276 218 268 Z"
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
          Power law
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          W = V × A
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
          120 × 15 = 1,800 W
        </text>

        {/* Circuit with V and I labels */}
        <rect x="256" y="182" width="48" height="28" strokeWidth="0.9" rx="1" />
        <text
          x="280"
          y="200"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          load
        </text>
        <path d="M 304 196 H 340 V 174 H 380 V 196 H 420" strokeWidth="0.9" />
        <text x="348" y="168" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          V
        </text>
        <text x="318" y="190" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          I
        </text>
        <text
          x="256"
          y="232"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          power = push × flow
        </text>
        <text
          x="256"
          y="252"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          same as W = A × V
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
        filter="url(#bp-v2w-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <circle cx="611" cy="158" r="32" strokeWidth="1.2" />
        <text
          x="611"
          y="164"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          W
        </text>
        <path d="M 595 158 H 587 M 627 158 H 635" strokeWidth="1" />

        <text
          x="611"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1,800 W
        </text>
        <text
          x="611"
          y="242"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          1.8 kW electrical power
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-v2w-pencil)"
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
          size breakers · estimate heat · compare loads before kWh over time
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          120 V
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          15 A
        </text>
        <text x="180" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1,800 W
        </text>
        <text x="280" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          AC real power also depends on power factor
        </text>
      </g>
    </svg>
  );
}
