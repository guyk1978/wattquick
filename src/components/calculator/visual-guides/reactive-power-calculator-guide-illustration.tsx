"use client";

import { cn } from "@/lib/utils";

interface ReactivePowerCalculatorGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: kVA + PF → kW + kVAR via power triangle.
 * Modal only (not embedded in page DOM by default).
 */
export function ReactivePowerCalculatorGuideIllustration({
  className,
}: ReactivePowerCalculatorGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "reactive-power-calculator-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="rpc-guide-title rpc-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="rpc-guide-title">Reactive power and power factor flow diagram</title>
      <desc id="rpc-guide-desc">
        Inputs: apparent power in kilovolt-amperes and power factor. Process:
        real kilowatts equal kVA times power factor; reactive kilovolt-amperes
        reactive equal the square root of kVA squared minus kW squared on the
        power triangle. Output: reactive kVAR for inverter and conductor sizing.
      </desc>

      <defs>
        <pattern
          id="bp-rpc-grid-minor"
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
          id="bp-rpc-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-rpc-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-rpc-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-rpc-grid-major)"
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
        FIG. 1 — REACTIVE POWER &amp; PF
      </text>
      <path
        d="M 34 52 H 280"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUT */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>

      <g
        filter="url(#bp-rpc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 86 44 86 H 196 Q 202 86 204 92 V 268 Q 202 274 196 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          apparent power (feeder rating)
        </text>
        <text
          x="48"
          y="132"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          12 kVA
        </text>
        <text
          x="48"
          y="154"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          inverter / breaker must cover
        </text>

        <path d="M 48 168 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="186"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          power factor
        </text>
        <text
          x="48"
          y="210"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          0.85
        </text>
        <text
          x="48"
          y="232"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          motor / VFD load
        </text>

        {/* Motor sketch */}
        <circle cx="56" cy="252" r="10" strokeWidth="0.9" />
        <path d="M 56 242 V 262 M 46 252 H 66" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 214 180 H 244" strokeLinecap="round" />
        <path d="M 240 176 L 248 180 L 240 184" strokeLinejoin="round" />
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
        filter="url(#bp-rpc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 258 Q 250 276 248 268 Z"
          strokeWidth="1.2"
        />

        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1. Real power
        </text>
        <text
          x="268"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          kW = kVA × PF
        </text>
        <text
          x="268"
          y="158"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          12 × 0.85 = 10.2 kW
        </text>

        <path d="M 268 168 H 450" strokeWidth="0.6" opacity="0.45" />

        <text
          x="268"
          y="186"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Reactive power
        </text>
        <text
          x="268"
          y="208"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kVAR = √(kVA² − kW²)
        </text>
        <text
          x="268"
          y="230"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          √(144 − 104) ≈ 6.32
        </text>

        {/* Power triangle */}
        <path d="M 380 248 H 440 V 200 H 380 Z" strokeWidth="0.9" />
        <text
          x="402"
          y="262"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          10.2 kW
        </text>
        <text
          x="444"
          y="228"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          6.32 kVAR
        </text>
        <text
          x="396"
          y="206"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12 kVA
        </text>
        <path d="M 380 248 A 10 10 0 0 0 386 240" strokeWidth="0.6" />
        <text
          x="384"
          y="246"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          φ
        </text>

        <text
          x="268"
          y="258"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          size conductors for kVA, not kW alone
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
        filter="url(#bp-rpc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <circle cx="611" cy="148" r="28" strokeWidth="1.2" />
        <text
          x="611"
          y="154"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          kVAR
        </text>

        <text
          x="611"
          y="208"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          6.32 kVAR
        </text>
        <text
          x="611"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          reactive (non-work)
        </text>
        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          + 10.2 kW real
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-rpc-pencil)"
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
          low PF raises current without useful work — size inverter &amp; breaker for kVA
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          12 kVA
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          PF 0.85
        </text>
        <text x="180" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          →
        </text>
        <text
          x="200"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10.2 kW + 6.32 kVAR
        </text>
      </g>
    </svg>
  );
}
