"use client";

import { cn } from "@/lib/utils";

interface SolarArrayCurrentGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: array W + operating V → I = W ÷ V → array amps.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarArrayCurrentGuideIllustration({
  className,
}: SolarArrayCurrentGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-array-current-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="sac-guide-title sac-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sac-guide-title">Solar array current flow diagram</title>
      <desc id="sac-guide-desc">
        Inputs: total array watts and operating voltage at the MPPT or string
        level. Process: array current equals watts divided by volts. Output:
        estimated array current in amps for wire and fuse planning.
      </desc>

      <defs>
        <pattern
          id="bp-sac-grid-minor"
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
          id="bp-sac-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-sac-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-sac-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-sac-grid-major)"
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
        FIG. 1 — SOLAR ARRAY CURRENT
      </text>
      <path
        d="M 34 52 H 360"
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
        filter="url(#bp-sac-pencil)"
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
          array watts
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1,200 W
        </text>

        {/* Panel string sketch */}
        <rect x="48" y="132" width="24" height="16" strokeWidth="0.7" rx="1" />
        <rect x="76" y="132" width="24" height="16" strokeWidth="0.7" rx="1" />
        <rect x="104" y="132" width="24" height="16" strokeWidth="0.7" rx="1" />
        <path d="M 72 140 H 76 M 100 140 H 104" strokeWidth="0.6" />
        <text x="48" y="128" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          PV string
        </text>

        <text x="48" y="164" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          operating voltage
        </text>
        <text x="48" y="182" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          48 V
        </text>
        <text x="48" y="196" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          MPPT nominal — not Voc
        </text>

        {/* Current arrow on DC bus */}
        <path d="M 48 216 H 140" strokeWidth="0.9" />
        <path d="M 132 212 L 140 216 L 132 220" strokeWidth="0.7" />
        <text x="48" y="212" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          DC bus
        </text>
        <text x="48" y="236" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          ~Imp from P ÷ V
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
        filter="url(#bp-sac-pencil)"
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
          1. Array current
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          I ≈ array W ÷ operating V
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          1,200 ÷ 48 = 25 A
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Power law link
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          P = V × I  →  I = P ÷ V
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          same as watts-to-amps on DC bus
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="252" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          fuse sizing: check panel Isc on label
        </text>
        <text x="256" y="270" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          conductors: often 125% continuous current
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
        filter="url(#bp-sac-pencil)"
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
          array current
        </text>

        <circle cx="611" cy="158" r="32" strokeWidth="1.2" />
        <text x="611" y="164" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          A
        </text>
        <path d="M 587 158 H 579 M 643 158 H 635" strokeWidth="1" />

        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          25 A
        </text>
        <text x="616" y="242" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          ~Imp at 48 V MPPT
        </text>

        <text x="616" y="272" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          pair with DC cable size calculator
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          then charge controller sizing
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-sac-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          use nominal MPPT voltage for string math — not open-circuit Voc
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1,200 W ÷ 48 V = 25 A · Isc on module sticker may be higher
        </text>
      </g>
    </svg>
  );
}
