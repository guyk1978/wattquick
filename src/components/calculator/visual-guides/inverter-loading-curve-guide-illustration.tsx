"use client";

import { cn } from "@/lib/utils";

interface InverterLoadingCurveGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: nominal W + load + temp + curve → shutdown time.
 * Modal only (not embedded in page DOM by default).
 */
export function InverterLoadingCurveGuideIllustration({
  className,
}: InverterLoadingCurveGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "inverter-loading-curve-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="ilc-guide-title ilc-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="ilc-guide-title">Inverter loading curve flow diagram</title>
      <desc id="ilc-guide-desc">
        Inputs: nominal inverter power, current sustained load, ambient
        temperature, and manufacturer overload profile. Process: derate nominal
        power for heat, compute load as a percentage of derated capacity,
        then interpolate the overload curve for allowed run time. Output:
        estimated time until overload shutdown.
      </desc>

      <defs>
        <pattern
          id="bp-ilc-grid-minor"
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
          id="bp-ilc-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-ilc-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-ilc-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-ilc-grid-major)"
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
        FIG. 1 — INVERTER LOADING CURVE
      </text>
      <path
        d="M 34 52 H 340"
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
        filter="url(#bp-ilc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <rect x="48" y="100" width="40" height="28" strokeWidth="0.9" rx="2" />
        <text x="56" y="118" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          INV
        </text>
        <text x="96" y="118" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3,000 W
        </text>
        <text x="48" y="96" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          nominal
        </text>

        <path d="M 48 132 H 88" strokeWidth="1" />
        <path d="M 72 124 L 88 132 L 72 140" strokeWidth="0.8" />
        <text x="96" y="138" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3,300 W load
        </text>

        <circle cx="56" cy="162" r="8" strokeWidth="0.8" />
        <path d="M 52 162 H 60 M 56 158 V 166" strokeWidth="0.5" />
        <text x="72" y="158" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          ambient
        </text>
        <text x="72" y="172" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          35 °C
        </text>

        <path d="M 48 188 H 156" strokeWidth="0.6" opacity="0.4" />
        <text x="48" y="204" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          overload profile
        </text>
        <text x="48" y="222" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          110% → 60 min
        </text>
        <text x="48" y="238" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          120% → 10 min
        </text>
        <text x="48" y="254" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          130% → 3 min
        </text>
        <text x="48" y="276" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          manufacturer curve points
        </text>
      </g>

      <text
        x="36"
        y="318"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        sustained AC demand · not motor surge
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 180 H 218" strokeLinecap="round" />
        <path d="M 214 176 L 222 180 L 214 184" strokeLinejoin="round" />
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
        filter="url(#bp-ilc-pencil)"
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
          1. Thermal derate
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          derated = nominal × (1 − 0.01×ΔT)
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          3,000 × 0.90 = 2,700 W @ 35°C
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Load vs derated
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          load % = (W ÷ derated) × 100
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          3,300 ÷ 2,700 = 122%
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        {/* Mini overload curve */}
        <text x="238" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Curve lookup
        </text>
        <line x1="256" y1="292" x2="440" y2="292" strokeWidth="0.6" opacity="0.5" />
        <line x1="256" y1="268" x2="256" y2="292" strokeWidth="0.6" opacity="0.5" />
        <path
          d="M 256 292 C 300 292 320 280 360 268 C 400 256 420 262 440 268"
          strokeWidth="1"
          fill="none"
        />
        <line x1="368" y1="262" x2="368" y2="292" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="368" cy="266" r="3" fill="currentColor" stroke="none" />
        <text x="372" y="262" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          122%
        </text>
        <text x="256" y="304" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          log-interpolate between curve points
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
        filter="url(#bp-ilc-pencil)"
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
          overload shutdown
        </text>

        <text x="616" y="156" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          ~8 min
        </text>
        <text x="616" y="178" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          time to trip
        </text>

        <text x="616" y="212" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          122% of derated
        </text>
        <text x="616" y="232" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          2,700 W thermal limit
        </text>

        <path d="M 548 244 H 684" strokeWidth="0.6" opacity="0.4" />

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          ≤100% → continuous safe
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          hot closet shrinks headroom first
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-ilc-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          sustained overload ≠ motor surge — pair with Peak Load &amp; Surge for inrush
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          rated @ 25°C · −1% per °C above · confirm exact datasheet
        </text>
      </g>
    </svg>
  );
}
