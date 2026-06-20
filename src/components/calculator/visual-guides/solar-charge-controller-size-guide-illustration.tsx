"use client";

import { cn } from "@/lib/utils";

interface SolarChargeControllerSizeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: panel W + battery V + margin → controller amps.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarChargeControllerSizeGuideIllustration({
  className,
}: SolarChargeControllerSizeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-charge-controller-size-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="scc-guide-title scc-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="scc-guide-title">Solar charge controller sizing flow diagram</title>
      <desc id="scc-guide-desc">
        Inputs: total panel watts, battery system voltage, and safety margin
        percent. Process: divide panel watts by battery voltage for charge
        current, then add margin for cold-sun headroom. Output: minimum charge
        controller amperage rating.
      </desc>

      <defs>
        <pattern
          id="bp-scc-grid-minor"
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
          id="bp-scc-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-scc-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-scc-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-scc-grid-major)"
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
        FIG. 1 — CHARGE CONTROLLER SIZING
      </text>
      <path
        d="M 34 52 H 400"
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
        filter="url(#bp-scc-pencil)"
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
          total panel watts
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          800 W
        </text>

        {/* Panel sketch */}
        <rect x="48" y="132" width="40" height="24" strokeWidth="0.8" rx="1" />
        <path d="M 52 138 H 84 M 52 144 H 84 M 52 150 H 84" strokeWidth="0.4" opacity="0.5" />
        <path d="M 56 128 L 64 132 L 72 128" strokeWidth="0.5" opacity="0.5" />

        <text x="48" y="172" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          battery voltage
        </text>
        <text x="48" y="190" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 V
        </text>

        <rect x="48" y="200" width="24" height="16" strokeWidth="0.8" rx="1" />
        <text x="52" y="212" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          12V
        </text>

        <text x="48" y="232" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          safety margin
        </text>
        <text x="48" y="250" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          25%
        </text>
        <text x="48" y="264" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          cold-sun / Isc headroom
        </text>

        {/* Flow sketch */}
        <path d="M 48 280 H 88" strokeWidth="0.7" />
        <rect x="88" y="272" width="20" height="16" strokeWidth="0.7" rx="1" />
        <text x="90" y="284" fill="currentColor" fontSize="5" fontFamily="ui-monospace, monospace" stroke="none">
          CC
        </text>
        <path d="M 108 280 H 148" strokeWidth="0.7" />
        <rect x="148" y="274" width="20" height="12" strokeWidth="0.7" rx="1" />
        <text x="48" y="296" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          array → controller → battery
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
        filter="url(#bp-scc-pencil)"
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
          1. Charge current
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          I ≈ panel W ÷ battery V
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          800 ÷ 12 = 66.7 A
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Add margin
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          I_min = I × (1 + margin%)
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          66.7 × 1.25 = 83 A
        </text>

        {/* Ampacity bar */}
        <rect x="256" y="236" width="180" height="14" strokeWidth="0.8" rx="1" />
        <rect x="256" y="236" width="144" height="14" strokeWidth="0.9" rx="1" />
        <text x="260" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          base
        </text>
        <text x="396" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          +25%
        </text>

        <text x="256" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          check panel Isc on datasheet
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
        filter="url(#bp-scc-pencil)"
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
          minimum controller rating
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          83 A
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          MPPT or PWM amp rating
        </text>

        <rect x="564" y="200" width="104" height="40" strokeWidth="0.9" rx="2" />
        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          charge controller
        </text>
        <text x="616" y="232" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          ≥ 83 A continuous
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          MPPT: higher Voc, cold boost
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          PWM: simple 12 V matched arrays
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-scc-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          panel output can exceed STC in cold sun — margin avoids clipping &amp; overheating
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pair with solar battery bank sizing after controller amps are set
        </text>
      </g>
    </svg>
  );
}
