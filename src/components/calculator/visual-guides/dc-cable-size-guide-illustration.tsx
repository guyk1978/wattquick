"use client";

import { cn } from "@/lib/utils";

interface DcCableSizeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: inputs (A, ft, V) → ampacity + drop → AWG output.
 * Black & white, thin pencil lines — not embedded in page DOM by default (modal only).
 */
export function DcCableSizeGuideIllustration({
  className,
}: DcCableSizeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn("dc-cable-size-guide-illustration w-full max-w-3xl", className)}
      role="img"
      aria-labelledby="dc-cable-guide-title dc-cable-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="dc-cable-guide-title">DC cable sizing flow diagram</title>
      <desc id="dc-cable-guide-desc">
        Inputs: load current in amps, one-way cable length in feet, and system
        voltage. Process: ampacity table lookup and voltage drop check. Output:
        recommended AWG wire gauge.
      </desc>

      <defs>
        <pattern
          id="blueprint-grid"
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
          id="blueprint-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#blueprint-grid)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="pencil-grain" x="-2%" y="-2%" width="104%" height="104%">
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

      {/* Blueprint field */}
      <rect
        width="720"
        height="420"
        fill="url(#blueprint-grid-major)"
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

      {/* Title block */}
      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — DC CABLE SIZE CALCULATOR
      </text>
      <path
        d="M 34 52 H 280"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* ── INPUTS ── */}
      <text
        x="48"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* Current */}
      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 44 108 Q 46 104 52 104 H 108 Q 114 104 116 110 V 148 Q 114 154 108 154 H 52 Q 46 154 44 148 Z"
          strokeWidth="1.1"
        />
        <circle cx="80" cy="128" r="14" strokeWidth="1" />
        <text x="74" y="132" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none">
          A
        </text>
        <path d="M 62 118 L 68 124 M 98 138 L 92 132" strokeWidth="0.9" opacity="0.7" />
      </g>
      <text x="48" y="172" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.75">
        Load current (A)
      </text>

      {/* Length */}
      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round">
        <path
          d="M 44 188 Q 45 184 50 184 H 112 Q 117 184 118 190 V 228 Q 117 234 112 234 H 50 Q 45 234 44 228 Z"
          strokeWidth="1.1"
        />
        <path d="M 58 210 H 104" strokeWidth="1.2" />
        <path d="M 58 218 H 98" strokeWidth="0.8" opacity="0.6" />
        <path d="M 58 226 H 88" strokeWidth="0.8" opacity="0.4" />
        <text x="72" y="214" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          ft
        </text>
      </g>
      <text x="48" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.75">
        One-way length (ft)
      </text>

      {/* Voltage */}
      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round">
        <path
          d="M 44 268 Q 46 264 52 264 H 108 Q 114 264 116 270 V 308 Q 114 314 108 314 H 52 Q 46 314 44 308 Z"
          strokeWidth="1.1"
        />
        <path d="M 62 286 L 74 298 L 98 274" strokeWidth="1.2" />
        <text x="70" y="306" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none">
          V
        </text>
      </g>
      <text x="48" y="332" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.75">
        System voltage (V)
      </text>

      {/* Input → Process arrows */}
      <g stroke="currentColor" fill="currentColor" opacity="0.65" strokeWidth="1">
        <path d="M 128 128 H 198" fill="none" strokeLinecap="round" />
        <path d="M 194 124 L 202 128 L 194 132" fill="none" strokeLinejoin="round" />
        <path d="M 128 210 H 198" fill="none" strokeLinecap="round" />
        <path d="M 194 206 L 202 210 L 194 214" fill="none" />
        <path d="M 128 290 H 198" fill="none" strokeLinecap="round" />
        <path d="M 194 286 L 202 290 L 194 294" fill="none" />
      </g>

      {/* ── PROCESS ── */}
      <text
        x="248"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 228 104 Q 230 98 238 98 H 442 Q 450 98 452 106 V 198 Q 450 206 442 206 H 238 Q 230 206 228 198 Z"
          strokeWidth="1.2"
        />
        {/* Ampacity table sketch */}
        <text x="248" y="124" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1. Ampacity lookup
        </text>
        <path d="M 248 134 H 420" strokeWidth="0.6" opacity="0.5" />
        <text x="256" y="152" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          AWG 10 → 30 A max
        </text>
        <text x="256" y="168" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          AWG 6 → 50 A max
        </text>
        <text x="256" y="184" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          pick gauge ≥ load I
        </text>

        <path
          d="M 228 218 Q 230 212 238 212 H 442 Q 450 212 452 220 V 312 Q 450 320 442 320 H 238 Q 230 320 228 312 Z"
          strokeWidth="1.2"
        />
        <text x="248" y="238" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Voltage drop check
        </text>
        <path d="M 248 248 H 420" strokeWidth="0.6" opacity="0.5" />
        <text x="256" y="268" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.85">
          drop% ≈ 2·I·R·L / V
        </text>
        <text x="256" y="286" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          round-trip (+ and −)
        </text>
        <text x="256" y="304" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          target ~3% on DC bus
        </text>
      </g>

      {/* Process → Output arrow */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 462 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
      </g>

      {/* ── OUTPUT ── */}
      <text
        x="548"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 536 104 Q 538 98 546 98 H 676 Q 684 98 686 106 V 254 Q 684 262 676 262 H 546 Q 538 262 536 254 Z"
          strokeWidth="1.3"
        />
        {/* Thick cable cross-section */}
        <circle cx="611" cy="168" r="36" strokeWidth="1.4" />
        <circle cx="611" cy="168" r="22" strokeWidth="0.9" opacity="0.5" />
        <circle cx="611" cy="168" r="8" strokeWidth="0.8" opacity="0.35" />
        <text
          x="611"
          y="230"
          textAnchor="middle"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          4 AWG
        </text>
        <text
          x="611"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          recommended gauge
        </text>
      </g>

      {/* Cable run sketch along bottom */}
      <g filter="url(#pencil-grain)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <circle cx="72" cy="376" r="10" strokeWidth="1" />
        <text x="66" y="380" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          +
        </text>
        <path d="M 88 376 Q 200 372 360 376 T 632 376" strokeWidth="2.2" />
        <path d="M 88 382 Q 200 386 360 382 T 632 382" strokeWidth="0.8" opacity="0.5" />
        <circle cx="648" cy="376" r="10" strokeWidth="1" />
        <text x="644" y="380" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          −
        </text>
        <text x="360" y="368" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          L (one-way) × 2 = round-trip for drop
        </text>
      </g>
    </svg>
  );
}
