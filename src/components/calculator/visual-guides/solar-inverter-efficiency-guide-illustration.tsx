"use client";

import { cn } from "@/lib/utils";

interface SolarInverterEfficiencyGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: DC in + AC out → η = AC÷DC → efficiency %.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarInverterEfficiencyGuideIllustration({
  className,
}: SolarInverterEfficiencyGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-inverter-efficiency-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="sie-guide-title sie-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sie-guide-title">Solar inverter efficiency flow diagram</title>
      <desc id="sie-guide-desc">
        Inputs: DC input power from the PV array and AC output power delivered
        to the grid or load. Process: inverter efficiency equals AC output
        divided by DC input, times one hundred; loss watts equal DC minus AC
        and dissipate as heat. Output: DC-to-AC conversion efficiency
        percentage.
      </desc>

      <defs>
        <pattern
          id="bp-sie-grid-minor"
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
          id="bp-sie-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-sie-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-sie-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-sie-grid-major)"
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
        FIG. 1 — SOLAR INVERTER EFFICIENCY
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
        filter="url(#bp-sie-pencil)"
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
          DC input (from PV)
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3,000 W
        </text>

        <text x="48" y="142" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          AC output (to grid/load)
        </text>
        <text x="48" y="160" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2,850 W
        </text>

        {/* PV → inverter → AC flow */}
        <rect x="48" y="176" width="28" height="18" strokeWidth="0.8" rx="1" />
        <path d="M 52 182 H 72 M 52 188 H 72" strokeWidth="0.4" opacity="0.5" />
        <text x="52" y="174" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          PV
        </text>
        <path d="M 76 185 H 108" strokeWidth="0.9" />
        <path d="M 104 181 L 108 185 L 104 189" strokeWidth="0.7" />
        <rect x="108" y="178" width="24" height="14" strokeWidth="0.8" rx="1" />
        <text x="112" y="188" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          INV
        </text>
        <path d="M 132 185 H 164" strokeWidth="0.9" />
        <path d="M 160 181 L 164 185 L 160 189" strokeWidth="0.7" />
        <text x="168" y="188" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          AC
        </text>

        <text x="48" y="214" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          measured at inverter terminals
        </text>
        <text x="48" y="232" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          AC out must be ≤ DC in
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
        filter="url(#bp-sie-pencil)"
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
          1. Efficiency
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          η = (AC out ÷ DC in) × 100
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          2,850 ÷ 3,000 = 95.0%
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Conversion loss
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          loss W = DC in − AC out
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          3,000 − 2,850 = 150 W heat
        </text>

        {/* Energy split bar */}
        <rect x="256" y="236" width="180" height="14" strokeWidth="0.8" rx="1" />
        <rect x="256" y="236" width="171" height="14" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" rx="1" />
        <rect x="427" y="236" width="9" height="14" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" rx="1" />
        <text x="260" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          95% AC
        </text>
        <text x="430" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          5%
        </text>

        <text x="256" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          MPPT harvest is separate from DC→AC η
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
        filter="url(#bp-sie-pencil)"
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
          inverter efficiency
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          95.0%
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          DC → AC conversion
        </text>

        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          150 W lost
        </text>
        <text x="616" y="236" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          dissipated as heat
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          grid-tie often 96–98% at rated load
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          η drops at very low load
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-sie-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          size inverters near typical operating power for best yield
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pair with solar daily yield after conversion loss is known
        </text>
      </g>
    </svg>
  );
}
