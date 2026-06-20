"use client";

import { cn } from "@/lib/utils";

interface EscooterBrakePadWearGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: weekly km + regen % + hills → km/pad → weeks.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterBrakePadWearGuideIllustration({
  className,
}: EscooterBrakePadWearGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-brake-pad-wear-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="esbp-guide-title esbp-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="esbp-guide-title">E-scooter brake pad wear flow diagram</title>
      <desc id="esbp-guide-desc">
        Inputs: weekly riding distance, regen braking share percentage, and
        hilly route share. Process: adjust baseline pad life by regen and hill
        wear factors, then divide by weekly kilometres. Output: kilometres
        per pad set and weeks until replacement.
      </desc>

      <defs>
        <pattern
          id="bp-esbp-grid-minor"
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
          id="bp-esbp-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-esbp-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-esbp-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-esbp-grid-major)"
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
        FIG. 1 — BRAKE PAD WEAR
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
        filter="url(#bp-esbp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Weekly km */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 108 H 120 M 120 108 L 116 104 M 120 108 L 116 112" strokeWidth="0.7" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          weekly
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          50 km/wk
        </text>

        {/* Regen share */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 208 Q 174 214 168 214 H 44 Q 38 214 36 208 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="172" r="12" strokeWidth="0.9" />
        <path d="M 72 160 V 184 M 60 172 H 84" strokeWidth="0.6" opacity="0.5" />
        <path d="M 64 164 L 80 180 M 80 164 L 64 180" strokeWidth="0.5" opacity="0.4" />
        <text x="48" y="156" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          regen
        </text>
        <text x="96" y="176" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          20% share
        </text>
        <text x="48" y="204" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          motor slows you
        </text>

        {/* Hilly route */}
        <path
          d="M 36 224 Q 38 220 44 220 H 168 Q 174 220 176 226 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 244 L 72 232 L 92 248 L 112 236 L 132 252 L 152 240" strokeWidth="0.9" />
        <text x="48" y="236" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          hills
        </text>
        <text x="48" y="284" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          30% hilly
        </text>
        <text x="48" y="296" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          friction on descents
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 112 H 218" strokeLinecap="round" />
        <path d="M 214 108 L 222 112 L 214 116" strokeLinejoin="round" />
        <path d="M 186 178 H 218" strokeLinecap="round" />
        <path d="M 214 174 L 222 178 L 214 182" />
        <path d="M 186 260 H 218" strokeLinecap="round" />
        <path d="M 214 256 L 222 260 L 214 264" />
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
        filter="url(#bp-esbp-pencil)"
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
          Pad abrasion
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          regen × = 1 + (100−regen)/200
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          1 + 80/200 = 1.40×
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          hill × = 1 + hilly/100
        </text>
        <text x="256" y="200" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          1 + 30/100 = 1.30×
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          km/pad = 1200 ÷ (regen × hill)
        </text>
        <text x="256" y="244" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          = 659 km
        </text>
        <text x="256" y="268" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          wk = 659 ÷ 50 = 13 wk
        </text>

        {/* Brake caliper + pad wear */}
        <rect x="360" y="280" width="24" height="16" strokeWidth="0.8" rx="1" />
        <path d="M 372 280 V 268 M 364 272 H 380" strokeWidth="0.7" />
        <path d="M 360 296 H 384" strokeWidth="1" />
        <path d="M 360 296 H 378" strokeWidth="0.6" opacity="0.4" />

        <text x="256" y="296" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          less regen + more hills = faster wear
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
        filter="url(#bp-esbp-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="128" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          659 km
        </text>
        <text x="612" y="148" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          per pad set
        </text>

        <path d="M 560 164 H 664" strokeWidth="0.6" opacity="0.4" />
        <path d="M 560 164 H 612" strokeWidth="1.1" />

        <text x="612" y="192" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          13 wk
        </text>
        <text x="612" y="212" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          until swap
        </text>

        <rect x="584" y="228" width="16" height="24" strokeWidth="0.9" rx="1" />
        <rect x="604" y="228" width="16" height="24" strokeWidth="0.9" rx="1" />
        <path d="M 592 236 H 600 M 612 236 H 620" strokeWidth="0.5" opacity="0.5" />
        <path d="M 584 252 H 620" strokeWidth="0.8" />
        <path d="M 584 252 H 608" strokeWidth="0.6" opacity="0.4" />

        <text x="612" y="272" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          inspect every 400 km
        </text>
        <text x="612" y="288" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          steep descents need friction
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-esbp-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          baseline 1200 km/pad — regen offloads flats; hills rely on pad friction
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1200
        </text>
        <text x="110" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (1.40 × 1.30)
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="220" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          659 km pad life
        </text>
      </g>
    </svg>
  );
}
