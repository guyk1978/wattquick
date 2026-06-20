"use client";

import { cn } from "@/lib/utils";

interface PowerFactorGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: kW + kVA → PF = kW ÷ kVA → power factor.
 * Modal only (not embedded in page DOM by default).
 */
export function PowerFactorGuideIllustration({
  className,
}: PowerFactorGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "power-factor-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="pf-guide-title pf-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pf-guide-title">Power factor flow diagram</title>
      <desc id="pf-guide-desc">
        Inputs: real power in kilowatts and apparent power in kilovolt-amperes.
        Process: power factor equals real power divided by apparent power, the
        cosine of the phase angle on the power triangle. Output: power factor
        as a decimal and percentage.
      </desc>

      <defs>
        <pattern
          id="bp-pf-grid-minor"
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
          id="bp-pf-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-pf-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-pf-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-pf-grid-major)"
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
        FIG. 1 — POWER FACTOR
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
        filter="url(#bp-pf-pencil)"
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
          real power (useful work)
        </text>
        <text x="48" y="124" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          8 kW
        </text>

        <path d="M 48 140 H 168" strokeWidth="0.5" opacity="0.4" />

        <text x="48" y="156" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          apparent power (total VA)
        </text>
        <text x="48" y="176" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          10 kVA
        </text>

        {/* Motor load sketch */}
        <circle cx="56" cy="206" r="12" strokeWidth="0.9" />
        <path d="M 56 194 V 218 M 44 206 H 68" strokeWidth="0.6" opacity="0.5" />
        <text x="76" y="202" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          motor / inductive
        </text>
        <text x="76" y="216" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          V and I out of phase
        </text>

        <text x="48" y="244" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          require kW ≤ kVA
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
        filter="url(#bp-pf-pencil)"
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
          1. Power factor
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          PF = kW ÷ kVA
        </text>
        <text x="256" y="152" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          8 ÷ 10 = 0.80
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Power triangle
        </text>

        {/* Triangle: kW base, kVAR vertical, kVA hypotenuse */}
        <path d="M 280 248 H 360 V 208 H 280 Z" strokeWidth="0.9" />
        <text x="312" y="262" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          8 kW
        </text>
        <text x="364" y="232" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          6 kVAR
        </text>
        <text x="318" y="214" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          10 kVA
        </text>
        <path d="M 280 248 A 12 12 0 0 0 288 238" strokeWidth="0.6" />
        <text x="286" y="246" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          θ
        </text>

        <text x="256" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          PF = cos θ = kW ÷ kVA
        </text>
        <text x="256" y="294" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          not the same as efficiency
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
        filter="url(#bp-pf-pencil)"
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
          power factor
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          0.80
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          80% useful / apparent
        </text>

        {/* PF bar */}
        <rect x="564" y="200" width="104" height="14" strokeWidth="0.8" rx="1" />
        <rect x="564" y="200" width="83" height="14" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12" rx="1" />
        <text x="568" y="211" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          PF
        </text>
        <text x="652" y="211" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          1.0
        </text>

        <text x="616" y="244" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          20% tied in reactive exchange
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          PF cannot exceed 1.0
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-pf-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          low PF raises feeder current · utility penalties · consider correction caps
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pair with kVA→kW: kW = kVA × PF
        </text>
      </g>
    </svg>
  );
}
