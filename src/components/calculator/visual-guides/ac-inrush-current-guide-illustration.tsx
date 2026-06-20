"use client";

import { cn } from "@/lib/utils";

interface AcInrushCurrentGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: P + V + inrush × → I_run, I_peak, breaker B/C/D.
 * Modal only (not embedded in page DOM by default).
 */
export function AcInrushCurrentGuideIllustration({
  className,
}: AcInrushCurrentGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "ac-inrush-current-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="aic-guide-title aic-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="aic-guide-title">AC inrush current flow diagram</title>
      <desc id="aic-guide-desc">
        Inputs: nominal power in watts, operating voltage, and inrush factor.
        Process: calculate running amps from power divided by voltage, peak
        inrush as running times factor, then size breaker for continuous load
        and magnetic trip curve type B, C, or D. Output: nominal amps, peak
        inrush amps, and recommended breaker rating.
      </desc>

      <defs>
        <pattern
          id="bp-aic-grid-minor"
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
          id="bp-aic-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-aic-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-aic-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-aic-grid-major)"
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
        FIG. 1 — AC INRUSH &amp; BREAKER SIZING
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
        filter="url(#bp-aic-pencil)"
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
          nominal power
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1,800 W
        </text>

        <text x="48" y="142" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          operating voltage
        </text>
        <text x="48" y="160" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          120 V
        </text>

        <text x="48" y="180" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          inrush factor
        </text>
        <text x="48" y="198" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          6×
        </text>
        <text x="48" y="212" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          peak ÷ running
        </text>

        {/* Motor sketch */}
        <circle cx="56" cy="238" r="14" strokeWidth="0.9" />
        <path d="M 56 224 V 252 M 42 238 H 70" strokeWidth="0.6" opacity="0.5" />
        <text x="76" y="234" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          motor / compressor
        </text>
        <text x="76" y="248" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          startup spike ~50–200 ms
        </text>

        {/* Mini inrush waveform */}
        <path d="M 48 268 H 72 V 288 H 96 V 276 H 120 V 288 H 168" strokeWidth="0.8" />
        <text x="48" y="264" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          I vs time
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
        filter="url(#bp-aic-pencil)"
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
          1. Running amps
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          I_run = P ÷ V
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          1,800 ÷ 120 = 15 A
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Peak inrush
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          I_peak = I_run × factor
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          15 × 6 = 90 A
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Breaker + curve
        </text>
        <text x="256" y="272" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ≥ max(1.25×I_run, I_peak ÷ trip×)
        </text>
        <text x="256" y="290" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          Type B 5× · C 7.5× · D 12.5×
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
        filter="url(#bp-aic-pencil)"
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
          nominal · peak · breaker
        </text>

        <text x="616" y="138" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          15 A run
        </text>
        <text x="616" y="168" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          90 A peak
        </text>
        <text x="616" y="192" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          6× inrush spike
        </text>

        <rect x="564" y="204" width="104" height="28" strokeWidth="0.9" rx="2" />
        <text x="616" y="222" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          20 A Type C
        </text>

        <text x="616" y="252" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          6× factor → Type C curve
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          verify local code &amp; mfr data
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-aic-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          magnetic trip band — not thermal overload · soft-start lowers effective factor
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          resistive loads: Type B · small motors: Type C · high inrush: Type D
        </text>
      </g>
    </svg>
  );
}
