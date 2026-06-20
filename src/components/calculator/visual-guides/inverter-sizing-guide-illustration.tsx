"use client";

import { cn } from "@/lib/utils";

interface InverterSizingGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: peak load + margin → minimum inverter watts.
 * Modal only (not embedded in page DOM by default).
 */
export function InverterSizingGuideIllustration({
  className,
}: InverterSizingGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "inverter-sizing-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="invs-guide-title invs-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="invs-guide-title">Inverter sizing flow diagram</title>
      <desc id="invs-guide-desc">
        Inputs: simultaneous peak load in watts and safety margin percent.
        Process: minimum inverter size equals peak load times one plus margin
        divided by one hundred. Output: minimum continuous inverter rating in
        watts with headroom for surge and expansion.
      </desc>

      <defs>
        <pattern
          id="bp-invs-grid-minor"
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
          id="bp-invs-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-invs-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-invs-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-invs-grid-major)"
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
        FIG. 1 — INVERTER SIZING
      </text>
      <path
        d="M 34 52 H 280"
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
        filter="url(#bp-invs-pencil)"
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
          simultaneous loads
        </text>

        {/* Load stack bars */}
        <rect x="48" y="112" width="120" height="12" strokeWidth="0.8" rx="1" />
        <text x="52" y="121" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          fridge 600 W
        </text>

        <rect x="48" y="128" width="80" height="12" strokeWidth="0.8" rx="1" />
        <text x="52" y="137" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          lights 400 W
        </text>

        <rect x="48" y="144" width="100" height="12" strokeWidth="0.8" rx="1" />
        <text x="52" y="153" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          tools 800 W
        </text>

        <path d="M 48 168 H 168" strokeWidth="0.6" opacity="0.45" />
        <text x="48" y="186" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          peak = 1,800 W
        </text>
        <text x="48" y="202" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          worst-case on together
        </text>

        <path d="M 48 218 H 168" strokeWidth="0.5" opacity="0.4" />

        <text x="48" y="234" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          safety margin
        </text>
        <text x="48" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          25%
        </text>
        <text x="48" y="268" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          surge · expansion
        </text>

        {/* AC bus sketch */}
        <line x1="48" y1="284" x2="168" y2="284" strokeWidth="0.7" />
        <circle cx="48" cy="284" r="3" strokeWidth="0.7" />
        <circle cx="168" cy="284" r="3" strokeWidth="0.7" />
        <text x="72" y="280" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          AC bus
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
        filter="url(#bp-invs-pencil)"
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
          1. Sum peak load
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          peak W = Σ running loads
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          600 + 400 + 800 = 1,800 W
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Apply margin
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          min W = peak × (1 + margin%)
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          1,800 × 1.25 = 2,250 W
        </text>

        {/* Capacity bar diagram */}
        <rect x="256" y="236" width="180" height="14" strokeWidth="0.8" rx="1" />
        <rect x="256" y="236" width="144" height="14" strokeWidth="0.9" rx="1" />
        <text x="256" y="232" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          inverter rating bar
        </text>
        <text x="260" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          peak
        </text>
        <text x="402" y="247" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          +25%
        </text>

        <text x="238" y="278" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          motors may need higher surge tier
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
        filter="url(#bp-invs-pencil)"
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
          minimum inverter size
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          2,250 W
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          continuous rating
        </text>

        {/* Inverter box sketch */}
        <rect x="564" y="200" width="104" height="56" strokeWidth="1" rx="2" />
        <text x="616" y="224" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pure sine
        </text>
        <text x="616" y="240" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          ≥ 2,250 W cont.
        </text>
        <path d="M 616 256 V 268" strokeWidth="0.7" />
        <path d="M 608 268 H 624" strokeWidth="0.7" />

        <text x="616" y="292" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          check surge W on datasheet
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-invs-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          size from simultaneous running watts—not every device nameplate in the building
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pumps and compressors: use inverter-peak-load-surge for start-up spikes
        </text>
      </g>
    </svg>
  );
}
