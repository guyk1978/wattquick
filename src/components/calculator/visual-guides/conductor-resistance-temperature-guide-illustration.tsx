"use client";

import { cn } from "@/lib/utils";

interface ConductorResistanceTemperatureGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: material + mm² + length + T → R(T) = ρL/A × temp factor.
 * Modal only (not embedded in page DOM by default).
 */
export function ConductorResistanceTemperatureGuideIllustration({
  className,
}: ConductorResistanceTemperatureGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "conductor-resistance-temperature-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="crt-guide-title crt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="crt-guide-title">Conductor resistance at temperature flow diagram</title>
      <desc id="crt-guide-desc">
        Inputs: conductor material, cross-section in square millimeters, one-way
        length in meters, and operating temperature in degrees Celsius.
        Process: calculate resistance at twenty degrees Celsius from resistivity
        times length divided by area, then apply temperature coefficient.
        Output: total resistance in ohms at operating temperature.
      </desc>

      <defs>
        <pattern
          id="bp-crt-grid-minor"
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
          id="bp-crt-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-crt-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-crt-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-crt-grid-major)"
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
        FIG. 1 — CONDUCTOR R(T)
      </text>
      <path
        d="M 34 52 H 260"
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
        filter="url(#bp-crt-pencil)"
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
          material
        </text>
        <text
          x="48"
          y="128"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Copper (Cu)
        </text>
        <text
          x="48"
          y="148"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          ρ₂₀ ≈ 0.0175 Ω·mm²/m
        </text>

        <path d="M 48 158 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="174"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          cross-section · length
        </text>
        <text
          x="48"
          y="194"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          6 mm² · 15 m
        </text>

        <path d="M 48 204 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="220"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          operating temperature
        </text>
        <text
          x="48"
          y="240"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          40 °C
        </text>
        <text
          x="48"
          y="258"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          field / conduit heat
        </text>

        {/* Wire cross-section */}
        <circle cx="170" cy="248" r="14" strokeWidth="0.9" />
        <circle cx="170" cy="248" r="6" strokeWidth="0.7" />
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
        filter="url(#bp-crt-pencil)"
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
          1. Resistance at 20°C
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
          R₂₀ = ρL ÷ A
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
          0.0175×15÷6 = 0.0438 Ω
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
          2. Temperature factor
        </text>
        <text
          x="268"
          y="208"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          R(T) = R₂₀ × [1 + α(T−20)]
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
          × [1 + 0.00393×20] = ×1.079
        </text>

        {/* Wire run sketch */}
        <path d="M 380 200 H 448" strokeWidth="1.2" />
        <path d="M 380 196 V 204 M 448 196 V 204" strokeWidth="0.8" />
        <text
          x="414"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          L = 15 m
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
          hot wire → higher R → more I²R loss &amp; drop
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
        filter="url(#bp-crt-pencil)"
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
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Ω
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
          0.0472 Ω
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
          at 40 °C
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
          R₂₀ = 0.0438 Ω
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-crt-pencil)"
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
          Al ρ₂₀ ≈ 0.0282 — size DC cables using field T, not datasheet 25°C values
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          Cu 6 mm²
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          15 m @ 40°C
        </text>
        <text x="210" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text
          x="230"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          0.0472 Ω one-way
        </text>
      </g>
    </svg>
  );
}
