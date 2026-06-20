"use client";

import { cn } from "@/lib/utils";

interface CampingFridgeRuntimeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: battery Wh + rated fridge Wh + ambient → runtime h.
 * Modal only (not embedded in page DOM by default).
 */
export function CampingFridgeRuntimeGuideIllustration({
  className,
}: CampingFridgeRuntimeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "camping-fridge-runtime-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="cfr-guide-title cfr-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="cfr-guide-title">Camping fridge runtime flow diagram</title>
      <desc id="cfr-guide-desc">
        Inputs: battery energy in watt-hours, fridge rated daily use at lab
        temperature, and ambient heat level. Process: scale rated draw by ambient
        factor for compressor duty cycle, then divide battery by adjusted daily
        use. Output: estimated runtime in hours.
      </desc>

      <defs>
        <pattern
          id="bp-cfr-grid-minor"
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
          id="bp-cfr-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-cfr-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-cfr-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-cfr-grid-major)"
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
        FIG. 1 — CAMPING FRIDGE RUNTIME
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
        filter="url(#bp-cfr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Battery Wh */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="28" height="28" strokeWidth="0.9" rx="2" />
        <path d="M 60 108 H 72 M 60 116 H 72 M 60 124 H 72" strokeWidth="0.5" opacity="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          battery
        </text>
        <text
          x="92"
          y="120"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1200 Wh
        </text>

        {/* Fridge rated Wh/day */}
        <path
          d="M 36 152 Q 38 148 44 148 H 168 Q 174 148 176 154 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="162" width="32" height="40" strokeWidth="0.9" rx="2" />
        <path d="M 60 172 H 76 M 60 182 H 76 M 60 192 H 76" strokeWidth="0.5" opacity="0.5" />
        <circle cx="88" cy="182" r="6" strokeWidth="0.7" />
        <path d="M 88 176 V 188 M 82 182 H 94" strokeWidth="0.5" />
        <text
          x="48"
          y="158"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          fridge rated
        </text>
        <text
          x="48"
          y="208"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          350 Wh/day
        </text>
        <text
          x="48"
          y="218"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          @ 77°F lab
        </text>

        {/* Ambient heat */}
        <path
          d="M 36 234 Q 38 230 44 230 H 168 Q 174 230 176 236 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="258" r="14" strokeWidth="1" />
        <path
          d="M 72 240 V 236 M 72 280 V 284 M 56 258 H 52 M 88 258 H 92 M 60 246 L 56 242 M 84 246 L 88 242 M 60 270 L 56 274 M 84 270 L 88 274"
          strokeWidth="0.6"
        />
        <path d="M 96 252 Q 108 244 120 256 Q 132 268 144 260" strokeWidth="0.8" opacity="0.6" />
        <text
          x="48"
          y="246"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          ambient
        </text>
        <text
          x="48"
          y="284"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          mild 1.0×
        </text>
        <text
          x="48"
          y="294"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          70–85°F
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 115 H 218" strokeLinecap="round" />
        <path d="M 214 111 L 222 115 L 214 119" strokeLinejoin="round" />
        <path d="M 186 186 H 218" strokeLinecap="round" />
        <path d="M 214 182 L 222 186 L 214 190" />
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
        filter="url(#bp-cfr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Compressor duty cycle
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          draw = rated × ambient factor
        </text>
        <text
          x="256"
          y="160"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          350 × 1.0 = 350 Wh/day
        </text>
        <text
          x="256"
          y="184"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          h = (Wh ÷ draw) × 24
        </text>
        <text
          x="256"
          y="208"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          (1200 ÷ 350) × 24 = 82 h
        </text>

        {/* Duty cycle waveform - more ON time in heat */}
        <path d="M 280 228 H 440" strokeWidth="0.6" opacity="0.4" />
        <path d="M 280 228 H 320 V 244 H 360 V 228 H 400 V 244 H 440 V 228" strokeWidth="0.9" />
        <text
          x="280"
          y="224"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          compressor ON/OFF
        </text>
        <text
          x="360"
          y="256"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          hot = longer ON cycles
        </text>

        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          heat raises daily Wh draw
        </text>
        <text
          x="256"
          y="294"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          cool 0.85× · mild 1.0× · hot 1.35×
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
        filter="url(#bp-cfr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        {/* Fridge + battery timeline */}
        <rect x="568" y="118" width="36" height="48" strokeWidth="1" rx="2" />
        <path d="M 576 130 H 596 M 576 142 H 596 M 576 154 H 596" strokeWidth="0.5" opacity="0.6" />
        <rect x="616" y="132" width="24" height="32" strokeWidth="0.9" rx="2" />
        <path d="M 624 140 H 632 M 624 148 H 632 M 624 156 H 632" strokeWidth="0.5" opacity="0.6" />

        <text
          x="612"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          82 h
        </text>
        <text
          x="612"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          ~3.4 days
        </text>
        <text
          x="612"
          y="234"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          350 Wh/day draw
        </text>
        <text
          x="612"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          mild ambient
        </text>
        <text
          x="612"
          y="274"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          12V compressor fridge
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-cfr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          hot ambient = more compressor run time = fewer battery days
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (1200 ÷ 350)
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="160" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          24 h
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="215" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          82 h fridge runtime
        </text>
      </g>
    </svg>
  );
}
