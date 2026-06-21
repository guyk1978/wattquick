"use client";

import { cn } from "@/lib/utils";

interface BatteryDodEnergyYieldGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: nominal kWh + DoD % → usable kWh for backup planning.
 * Modal only (not embedded in page DOM by default).
 */
export function BatteryDodEnergyYieldGuideIllustration({
  className,
}: BatteryDodEnergyYieldGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-dod-energy-yield-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bdy-guide-title bdy-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bdy-guide-title">Battery DoD to energy yield flow diagram</title>
      <desc id="bdy-guide-desc">
        Inputs: nominal battery capacity in kilowatt-hours and depth of discharge
        percentage. Process: multiply nominal capacity by DoD divided by one
        hundred. Output: usable energy in kilowatt-hours available to loads
        before hitting the reserve floor.
      </desc>

      <defs>
        <pattern
          id="bp-bdy-grid-minor"
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
          id="bp-bdy-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bdy-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <pattern
          id="bp-bdy-hatch"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path
            d="M 0 0 L 0 6"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.35"
          />
        </pattern>
        <filter id="bp-bdy-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bdy-grid-major)"
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
        FIG. 1 — DoD TO USABLE ENERGY
      </text>
      <path
        d="M 34 52 H 300"
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
        filter="url(#bp-bdy-pencil)"
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
          nameplate capacity
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
          10 kWh
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
          nominal pack rating
        </text>

        <path d="M 48 172 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="190"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          depth of discharge
        </text>
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          80 %
        </text>
        <text
          x="48"
          y="236"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          LiFePO₄ often 80–90%
        </text>

        {/* Small battery icon */}
        <rect x="48" y="248" width="36" height="20" strokeWidth="0.9" rx="1" />
        <path d="M 84 254 H 90 V 262 H 84" strokeWidth="0.8" />
        <path d="M 54 256 H 78" strokeWidth="0.5" opacity="0.5" />
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
        filter="url(#bp-bdy-pencil)"
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
          Usable energy formula
        </text>
        <text
          x="268"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kWh = nominal × (DoD ÷ 100)
        </text>
        <text
          x="268"
          y="162"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10 × 0.80 = 8
        </text>
        <text
          x="268"
          y="188"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          reserve = 10 − 8 = 2 kWh
        </text>

        {/* Battery tank: 80% usable (hatched), 20% reserve (empty) */}
        <rect x="360" y="200" width="48" height="56" strokeWidth="1" rx="1" />
        <rect
          x="362"
          y="212"
          width="44"
          height="42"
          fill="url(#bp-bdy-hatch)"
          stroke="none"
        />
        <path d="M 362 212 H 406" strokeWidth="0.8" opacity="0.5" />
        <text
          x="384"
          y="234"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          80%
        </text>
        <text
          x="384"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          usable
        </text>
        <text
          x="418"
          y="218"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          reserve
        </text>
        <text
          x="268"
          y="268"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          plan backup from usable kWh, not nameplate
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
        filter="url(#bp-bdy-pencil)"
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
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          kWh
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
          8.00 kWh
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
          8,000 Wh usable
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
          for critical loads
        </text>
      </g>

      {/* Footer note */}
      <g
        filter="url(#bp-bdy-pencil)"
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
          compare usable kWh to Critical Load Analysis Wh — lead-acid often 50% DoD; lithium 80–90%
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          10 kWh
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          80%
        </text>
        <text x="180" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
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
          8 kWh to loads
        </text>
      </g>
    </svg>
  );
}
