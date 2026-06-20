"use client";

import { cn } from "@/lib/utils";

interface EscooterConnectorLossGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: amps + connector R + session → I²R loss W & Wh.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterConnectorLossGuideIllustration({
  className,
}: EscooterConnectorLossGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-connector-loss-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="escl-guide-title escl-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="escl-guide-title">E-scooter connector power loss flow diagram</title>
      <desc id="escl-guide-desc">
        Inputs: current draw in amps, connector type with contact resistance,
        and session duration in minutes. Process: power loss equals current
        squared times resistance; session waste equals power times time.
        Output: connector heat watts and wasted watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-escl-grid-minor"
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
          id="bp-escl-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-escl-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-escl-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-escl-grid-major)"
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
        FIG. 1 — CONNECTOR POWER LOSS
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
        filter="url(#bp-escl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Current draw */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 104 Q 72 96 92 112 Q 112 128 132 108" strokeWidth="0.9" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          current
        </text>
        <text x="48" y="124" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          12 A
        </text>

        {/* Connector type XT30/60/90 */}
        <path
          d="M 36 148 Q 38 144 44 144 H 168 Q 174 144 176 150 V 228 Q 174 234 168 234 H 44 Q 38 234 36 228 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="156" width="20" height="14" strokeWidth="0.7" rx="1" />
        <rect x="76" y="158" width="24" height="18" strokeWidth="0.8" rx="1" />
        <rect x="104" y="160" width="28" height="22" strokeWidth="0.8" rx="1" />
        <text x="62" y="166" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="ui-monospace, monospace" stroke="none">
          30
        </text>
        <text x="88" y="170" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          60
        </text>
        <text x="118" y="174" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none">
          90
        </text>
        <text x="48" y="152" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          connector
        </text>
        <text x="48" y="208" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          XT60 · 0.8 mΩ
        </text>
        <text x="48" y="222" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          contact resistance
        </text>

        {/* Session duration */}
        <path
          d="M 36 244 Q 38 240 44 240 H 168 Q 174 240 176 246 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="266" r="14" strokeWidth="1" />
        <path d="M 72 266 V 254" strokeWidth="1" />
        <path d="M 72 266 L 82 272" strokeWidth="0.9" />
        <text x="48" y="256" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          session
        </text>
        <text x="96" y="270" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          30 min
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 112 H 218" strokeLinecap="round" />
        <path d="M 214 108 L 222 112 L 214 116" strokeLinejoin="round" />
        <path d="M 186 188 H 218" strokeLinecap="round" />
        <path d="M 214 184 L 222 188 L 214 192" />
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
        filter="url(#bp-escl-pencil)"
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
          Contact I²R loss
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none">
          P = I² × R
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          12² × 0.0008 Ω
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          = 0.12 W heat
        </text>
        <text x="256" y="204" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          Wh = P × (min ÷ 60)
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          0.12 × 0.5 = 0.06 Wh
        </text>

        {/* Connector pair with heat */}
        <rect x="320" y="244" width="20" height="12" strokeWidth="0.8" rx="1" />
        <rect x="348" y="244" width="20" height="12" strokeWidth="0.8" rx="1" />
        <path d="M 340 250 H 348" strokeWidth="1" />
        <path d="M 332 238 Q 340 232 348 238" strokeWidth="0.6" opacity="0.5" />
        <path d="M 356 238 Q 364 232 372 238" strokeWidth="0.6" opacity="0.5" />
        <text x="346" y="236" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          heat
        </text>

        <text x="256" y="268" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          loose pins ↑ R — reseat if warm
        </text>
        <text x="256" y="288" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          XT30 1.5mΩ · XT60 0.8 · XT90 0.5
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
        filter="url(#bp-escl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="124" textAnchor="middle" fill="currentColor" fontSize="26" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          0.12 W
        </text>
        <text x="612" y="144" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          connector loss
        </text>

        <path d="M 560 160 H 664" strokeWidth="0.6" opacity="0.4" />

        <text x="612" y="188" textAnchor="middle" fill="currentColor" fontSize="22" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          0.06 Wh
        </text>
        <text x="612" y="208" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          session waste
        </text>

        <circle cx="612" cy="248" r="20" strokeWidth="0.9" />
        <path d="M 602 248 Q 612 238 622 248 Q 612 258 602 248" strokeWidth="0.7" opacity="0.6" />
        <text x="612" y="252" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          warm
        </text>

        <text x="612" y="282" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          ride or charge current
        </text>
        <text x="612" y="296" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          scales with I² not I
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-escl-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          pair resistance at pin joint — doubles if both + and − connectors counted separately
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          144
        </text>
        <text x="105" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="125" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          0.0008 Ω
        </text>
        <text x="185" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="205" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          0.12 W at XT60
        </text>
      </g>
    </svg>
  );
}
