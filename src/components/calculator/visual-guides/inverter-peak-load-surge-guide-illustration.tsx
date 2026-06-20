"use client";

import { cn } from "@/lib/utils";

interface InverterPeakLoadSurgeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: motor loads + surge factors → cont / peak / inverter tier.
 * Modal only (not embedded in page DOM by default).
 */
export function InverterPeakLoadSurgeGuideIllustration({
  className,
}: InverterPeakLoadSurgeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "inverter-peak-load-surge-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="ipls-guide-title ipls-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="ipls-guide-title">Inverter peak load and surge flow diagram</title>
      <desc id="ipls-guide-desc">
        Inputs: multiple appliance loads with running watts and surge factors.
        Process: sum running watts for continuous load; calculate surge margins
        as running times factor minus one; peak adds the largest margin plus
        thirty-five percent of the second largest for staggered motor starts.
        Output: continuous watts, peak watts, and a recommended pure-sine
        inverter tier with surge rating.
      </desc>

      <defs>
        <pattern
          id="bp-ipls-grid-minor"
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
          id="bp-ipls-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-ipls-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-ipls-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-ipls-grid-major)"
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
        FIG. 1 — INVERTER PEAK &amp; SURGE
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
        filter="url(#bp-ipls-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        {/* Load 1 fridge */}
        <circle cx="52" cy="108" r="6" strokeWidth="0.8" />
        <path d="M 48 108 H 56 M 52 104 V 112" strokeWidth="0.5" />
        <text x="64" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          fridge
        </text>
        <text x="64" y="118" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          150 W · 3×
        </text>

        {/* Load 2 AC */}
        <rect x="46" y="132" width="12" height="10" strokeWidth="0.7" />
        <path d="M 52 142 V 148" strokeWidth="0.6" />
        <text x="64" y="140" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          A/C
        </text>
        <text x="64" y="154" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1,200 W · 5×
        </text>

        {/* Load 3 pump */}
        <circle cx="52" cy="176" r="7" strokeWidth="0.8" />
        <path d="M 48 176 H 56 M 52 172 L 52 180" strokeWidth="0.6" />
        <text x="64" y="172" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          pump
        </text>
        <text x="64" y="186" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          750 W · 4×
        </text>

        <path d="M 48 200 H 160" strokeWidth="0.5" opacity="0.4" />
        <text x="48" y="216" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          running W + surge factor
        </text>
        <text x="48" y="234" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          margin = W × (factor − 1)
        </text>
        <text x="48" y="252" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          AC: 1,200×4 = 4,800 W
        </text>
        <text x="48" y="268" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          pump: 750×3 = 2,250 W
        </text>
        <text x="48" y="284" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          fridge: 150×2 = 300 W
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
        motors 3×–7× · resistive ~1×
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
        filter="url(#bp-ipls-pencil)"
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
          1. Continuous load
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          Σ running W
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          150+1,200+750 = 2,100 W
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Staggered surge peak
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          peak = cont + max margin
        </text>
        <text x="256" y="218" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          + 0.35 × 2nd margin
        </text>
        <text x="256" y="238" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          2,100+4,800+788 ≈ 7,690 W
        </text>

        <path d="M 238 252 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="272" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Inverter tier (+15% headroom)
        </text>
        <text x="256" y="292" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          pure-sine · ~2× surge class
        </text>
      </g>

      {/* Staggered start timeline */}
      <g filter="url(#bp-ipls-pencil)" stroke="currentColor" fill="none" opacity="0.5">
        <line x1="36" y1="336" x2="200" y2="336" strokeWidth="0.8" />
        <path d="M 196 332 L 200 336 L 196 340" strokeWidth="0.7" />
        <text x="36" y="328" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          time →
        </text>
        <line x1="80" y1="328" x2="80" y2="344" strokeWidth="1" />
        <text x="84" y="332" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          A/C surge
        </text>
        <line x1="130" y1="330" x2="130" y2="342" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="134" y="332" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          pump 35%
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
        filter="url(#bp-ipls-pencil)"
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
          load summary
        </text>
        <text x="556" y="128" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          cont
        </text>
        <text x="592" y="128" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2,100 W
        </text>
        <text x="556" y="148" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          peak
        </text>
        <text x="592" y="148" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          7,690 W
        </text>

        <path d="M 548 158 H 684" strokeWidth="0.6" opacity="0.4" />

        <text x="616" y="178" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          recommended inverter
        </text>
        <text x="616" y="206" textAnchor="middle" fill="currentColor" fontSize="22" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          4,000 W
        </text>
        <text x="616" y="226" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          continuous
        </text>
        <text x="616" y="252" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          8,000 W surge
        </text>
        <text x="616" y="272" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          pure-sine tier
        </text>
        <text x="616" y="294" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          vs naive 9,450 W all-at-once
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-ipls-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="228" y="352" width="456" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="240" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          staggered starts save peak W vs every motor surging together
        </text>
        <text x="240" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          verify LRA · surge seconds on inverter datasheet
        </text>
      </g>
    </svg>
  );
}
