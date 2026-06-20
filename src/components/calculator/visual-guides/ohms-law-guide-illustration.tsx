"use client";

import { cn } from "@/lib/utils";

interface OhmsLawGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: any two of V, I, R → solve the third (V = I × R).
 * Modal only (not embedded in page DOM by default).
 */
export function OhmsLawGuideIllustration({
  className,
}: OhmsLawGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn("ohms-law-guide-illustration w-full max-w-3xl", className)}
      role="img"
      aria-labelledby="ol-guide-title ol-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="ol-guide-title">Ohm&apos;s law flow diagram</title>
      <desc id="ol-guide-desc">
        Inputs: any two of voltage, current, and resistance—leave the third
        blank. Process: apply V equals I times R and rearrange to solve for the
        unknown. Output: the missing value in volts, amps, or ohms.
      </desc>

      <defs>
        <pattern
          id="bp-ol-grid-minor"
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
          id="bp-ol-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-ol-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-ol-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-ol-grid-major)"
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
        FIG. 1 — OHM&apos;S LAW
      </text>
      <path
        d="M 34 52 H 220"
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
        filter="url(#bp-ol-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 184 94 V 300 Q 182 306 176 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          enter any two · leave one blank
        </text>

        <text x="48" y="124" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          voltage V
        </text>
        <text x="48" y="142" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 V
        </text>

        <path d="M 48 152 L 88 152" strokeWidth="1.1" />
        <path d="M 72 144 L 88 152 L 72 160" strokeWidth="0.9" />
        <text x="48" y="148" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          current I
        </text>
        <text x="48" y="176" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          10 A
        </text>

        <text x="48" y="196" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          resistance R
        </text>
        <text x="48" y="214" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600" opacity="0.45">
          ? Ω
        </text>
        <text x="48" y="228" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          solve for R
        </text>

        {/* Simple DC circuit */}
        <rect x="48" y="244" width="24" height="16" strokeWidth="0.8" rx="1" />
        <text x="52" y="256" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          12V
        </text>
        <path d="M 72 252 H 108" strokeWidth="0.9" />
        <path d="M 108 244 V 260" strokeWidth="0.9" />
        <path d="M 108 244 H 124 M 108 260 H 124" strokeWidth="0.7" />
        <text x="128" y="256" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          R
        </text>
        <path d="M 140 252 H 156 V 268 H 48 V 252" strokeWidth="0.8" />
        <text x="48" y="288" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          DC resistive loop
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
        filter="url(#bp-ol-pencil)"
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
          1. Ohm&apos;s law
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          V = I × R
        </text>

        {/* Triangle */}
        <path d="M 320 148 L 380 148 L 350 178 Z" strokeWidth="0.9" />
        <text x="344" y="158" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          V
        </text>
        <text x="328" y="172" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          I
        </text>
        <text x="368" y="172" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          R
        </text>

        <path d="M 238 188 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="208" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Rearrange
        </text>
        <text x="256" y="228" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          R = V ÷ I
        </text>
        <text x="256" y="246" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          12 ÷ 10 = 1.2 Ω
        </text>

        <text x="256" y="270" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          also I = V ÷ R · V = I × R
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
        filter="url(#bp-ol-pencil)"
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
          solved resistance
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          1.2 Ω
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          R = V ÷ I
        </text>

        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 V · 10 A
        </text>
        <text x="616" y="236" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          checks: V = I × R
        </text>

        <rect x="564" y="252" width="104" height="22" strokeWidth="0.8" rx="2" />
        <text x="616" y="267" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          10 × 1.2 = 12 V ✓
        </text>

        <text x="616" y="296" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          swap blank field to solve V or I
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-ol-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          resistive DC loads · LED resistor sizing · fuse and wire quick checks
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          reactive AC loads need impedance Z, not R alone
        </text>
      </g>
    </svg>
  );
}
