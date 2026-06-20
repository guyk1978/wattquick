"use client";

import { cn } from "@/lib/utils";

interface EscooterWeightLimitGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: rider kg vs rated max → stress × → motor load W.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterWeightLimitGuideIllustration({
  className,
}: EscooterWeightLimitGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-weight-limit-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="eswl-guide-title eswl-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="eswl-guide-title">E-scooter rider weight limit flow diagram</title>
      <desc id="eswl-guide-desc">
        Inputs: rider mass including gear, manufacturer rated maximum rider
        weight, and motor rated power. Process: stress factor equals rider mass
        divided by rated limit; effective motor load scales with that factor.
        Output: overload kilograms and whether the rider exceeds the rated
        limit.
      </desc>

      <defs>
        <pattern
          id="bp-eswl-grid-minor"
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
          id="bp-eswl-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-eswl-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-eswl-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-eswl-grid-major)"
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
        FIG. 1 — RIDER WEIGHT LIMIT
      </text>
      <path
        d="M 34 52 H 300"
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
        filter="url(#bp-eswl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rider mass */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="112" r="9" strokeWidth="0.9" />
        <path d="M 72 121 V 136 M 60 128 H 84" strokeWidth="0.8" />
        <rect x="88" y="108" width="16" height="20" strokeWidth="0.7" rx="1" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          rider + bag
        </text>
        <text x="48" y="142" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          110 kg
        </text>

        {/* Rated max */}
        <path
          d="M 36 164 Q 38 160 44 160 H 168 Q 174 160 176 166 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 176 H 148" strokeWidth="0.6" opacity="0.4" />
        <path d="M 52 176 H 132" strokeWidth="1.1" />
        <text x="48" y="172" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          rated max
        </text>
        <text x="48" y="208" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          100 kg limit
        </text>

        {/* Motor rated W */}
        <path
          d="M 36 234 Q 38 230 44 230 H 168 Q 174 230 176 236 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="258" r="14" strokeWidth="1" />
        <path d="M 72 244 V 272 M 58 258 H 86" strokeWidth="0.6" opacity="0.5" />
        <text x="48" y="246" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          hub motor
        </text>
        <text x="96" y="264" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          500 W
        </text>
        <text x="48" y="288" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          nameplate rating
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 120 H 218" strokeLinecap="round" />
        <path d="M 214 116 L 222 120 L 214 124" strokeLinejoin="round" />
        <path d="M 186 192 H 218" strokeLinecap="round" />
        <path d="M 214 188 L 222 192 L 214 196" />
        <path d="M 186 264 H 218" strokeLinecap="round" />
        <path d="M 214 260 L 222 264 L 214 268" />
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
        filter="url(#bp-eswl-pencil)"
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
          Load stress
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          stress = rider ÷ rated
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          110 ÷ 100 = 1.10×
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          overload = rider − rated
        </text>
        <text x="256" y="200" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          110 − 100 = +10 kg
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          motor load = stress × W
        </text>
        <text x="256" y="244" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          1.10 × 500 = 550 W eff.
        </text>

        {/* Deck flex + motor strain sketch */}
        <path d="M 320 268 H 420" strokeWidth="1" />
        <path d="M 320 268 Q 340 256 360 268 Q 380 280 400 268 Q 420 256 440 268" strokeWidth="0.9" />
        <circle cx="380" cy="256" r="8" strokeWidth="0.8" />
        <path d="M 376 252 L 384 260 M 384 252 L 376 260" strokeWidth="0.5" />

        <text x="256" y="288" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          deck flex · climb current ↑
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
        filter="url(#bp-eswl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="118" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          1.10×
        </text>
        <text x="612" y="140" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          stress factor
        </text>

        <circle cx="612" cy="178" r="22" strokeWidth="1.1" />
        <path d="M 600 178 H 624 M 612 166 V 190" strokeWidth="1" />
        <text x="612" y="152" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          OVER
        </text>

        <text x="612" y="218" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          +10 kg overload
        </text>
        <text x="612" y="240" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          550 W effective
        </text>
        <text x="612" y="262" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          motor & deck wear ↑
        </text>
        <text x="612" y="282" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          within limit if ≤ 1.00×
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-eswl-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          manufacturer limit includes clothing & backpack — not bare rider weight
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          95 kg
        </text>
        <text x="110" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          100
        </text>
        <text x="165" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="185" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          0.95× OK · 110 kg → 1.10× over
        </text>
      </g>
    </svg>
  );
}
