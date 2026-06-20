"use client";

import { cn } from "@/lib/utils";

interface EscooterTireWearGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: weekly km + tread mm + surface → km life + weeks.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterTireWearGuideIllustration({
  className,
}: EscooterTireWearGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-tire-wear-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="estw-guide-title estw-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="estw-guide-title">E-scooter tyre wear life flow diagram</title>
      <desc id="estw-guide-desc">
        Inputs: weekly riding distance in kilometres, usable tread depth in
        millimetres, and primary surface type. Process: surface wear factor
        scales km per mm of tread, then divides by weekly distance. Output:
        total tread life in kilometres and weeks remaining.
      </desc>

      <defs>
        <pattern
          id="bp-estw-grid-minor"
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
          id="bp-estw-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-estw-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-estw-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-estw-grid-major)"
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
        FIG. 1 — TYRE WEAR LIFE
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
        filter="url(#bp-estw-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Weekly distance */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 108 L 72 108 M 72 108 L 92 108 M 92 108 L 112 108 M 112 108 L 132 108" strokeWidth="0.8" />
        <path d="M 132 108 L 128 104 M 132 108 L 128 112" strokeWidth="0.7" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          weekly
        </text>
        <text x="48" y="124" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          50 km/wk
        </text>

        {/* Usable tread */}
        <path
          d="M 36 152 Q 38 148 44 148 H 168 Q 174 148 176 154 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="182" r="22" strokeWidth="1" />
        <path d="M 50 182 H 94" strokeWidth="0.8" />
        <path d="M 72 160 V 204" strokeWidth="0.6" opacity="0.5" />
        <path d="M 72 182 H 88" strokeWidth="1.2" />
        <text x="48" y="164" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          tread
        </text>
        <text x="100" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1.5 mm
        </text>
        <text x="48" y="212" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          usable depth
        </text>

        {/* Surface type */}
        <path
          d="M 36 238 Q 38 234 44 234 H 168 Q 174 234 176 240 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 256 H 140" strokeWidth="0.6" opacity="0.5" />
        <path d="M 52 256 Q 72 248 92 256 Q 112 264 132 252 Q 148 242 156 256" strokeWidth="0.8" />
        <rect x="52" y="268" width="16" height="12" strokeWidth="0.6" rx="1" />
        <rect x="72" y="268" width="16" height="12" strokeWidth="0.6" rx="1" />
        <text x="48" y="250" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          surface
        </text>
        <text x="48" y="292" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          urban 1.35×
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 115 H 218" strokeLinecap="round" />
        <path d="M 214 111 L 222 115 L 214 119" strokeLinejoin="round" />
        <path d="M 186 186 H 218" strokeLinecap="round" />
        <path d="M 214 182 L 222 186 L 214 190" />
        <path d="M 186 268 H 218" strokeLinecap="round" />
        <path d="M 214 264 L 222 268 L 214 272" />
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
        filter="url(#bp-estw-pencil)"
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
          Abrasion rate
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          km/mm = 450 ÷ wear ×
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          450 ÷ 1.35 = 333 km/mm
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          life km = km/mm × tread
        </text>
        <text x="256" y="200" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          333 × 1.5 = 500 km
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          wk = life ÷ weekly km
        </text>
        <text x="256" y="244" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          500 ÷ 50 = 10 wk
        </text>

        {/* Tread wearing down over distance */}
        <rect x="320" y="260" width="48" height="20" strokeWidth="0.9" rx="1" />
        <path d="M 328 268 H 360 M 328 274 H 360" strokeWidth="0.5" opacity="0.6" />
        <path d="M 376 270 H 400 M 400 270 L 396 266 M 400 270 L 396 274" strokeWidth="0.7" />
        <rect x="408" y="264" width="48" height="16" strokeWidth="0.9" rx="1" />
        <path d="M 416 270 H 448" strokeWidth="0.5" opacity="0.4" />

        <text x="256" y="288" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          rough/brick wears faster than asphalt
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
        filter="url(#bp-estw-pencil)"
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
          500 km
        </text>
        <text x="612" y="140" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          tread life
        </text>

        <path d="M 560 156 H 664" strokeWidth="0.6" opacity="0.4" />
        <path d="M 560 156 H 612" strokeWidth="1.1" />

        <text x="612" y="188" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          10 wk
        </text>
        <text x="612" y="210" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          weeks remaining
        </text>

        <circle cx="612" cy="248" r="18" strokeWidth="0.9" />
        <path d="M 612 230 V 266 M 594 248 H 630" strokeWidth="0.6" opacity="0.5" />
        <path d="M 612 248 H 626" strokeWidth="1" strokeDasharray="2 2" />

        <text x="612" y="282" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          inspect tread weekly
        </text>
        <text x="612" y="296" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          solid & pneumatic tyres
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-estw-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          surface factors — smooth 1.0× · urban 1.35× · rough/brick 1.8×
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          500 km
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          50 km/wk
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="215" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          10 weeks to replacement
        </text>
      </g>
    </svg>
  );
}
