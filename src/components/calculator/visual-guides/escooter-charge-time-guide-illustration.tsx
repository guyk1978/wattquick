"use client";

import { cn } from "@/lib/utils";

interface EscooterChargeTimeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Wh + V + charger A + η → compare charge hours.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterChargeTimeGuideIllustration({
  className,
}: EscooterChargeTimeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-charge-time-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="esct-guide-title esct-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="esct-guide-title">E-scooter charge time flow diagram</title>
      <desc id="esct-guide-desc">
        Inputs: battery capacity in watt-hours, pack voltage, charger current
        in amps, and charge efficiency. Process: charger watts equals voltage
        times amps; charge hours equals capacity divided by effective charger
        power. Output: refill time with comparison across 2, 3, and 4 amp
        bricks at 36 and 48 volts.
      </desc>

      <defs>
        <pattern
          id="bp-esct-grid-minor"
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
          id="bp-esct-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-esct-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-esct-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-esct-grid-major)"
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
        FIG. 1 — E-SCOOTER CHARGE TIME
      </text>
      <path
        d="M 34 52 H 320"
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
        filter="url(#bp-esct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Battery Wh + voltage */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="32" height="28" strokeWidth="0.9" rx="2" />
        <path d="M 60 108 H 76 M 60 116 H 76 M 60 124 H 76" strokeWidth="0.5" opacity="0.6" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          pack
        </text>
        <text x="96" y="120" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          360 Wh
        </text>
        <text x="48" y="142" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          36 V · 48 V
        </text>

        {/* Charger amps 2/3/4A */}
        <path
          d="M 36 164 Q 38 160 44 160 H 168 Q 174 160 176 166 V 248 Q 174 254 168 254 H 44 Q 38 254 36 248 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="172" width="28" height="20" strokeWidth="0.8" rx="1" />
        <path d="M 58 182 H 74 M 64 176 V 188" strokeWidth="0.6" />
        <text x="88" y="186" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2 A
        </text>
        <rect x="52" y="198" width="28" height="20" strokeWidth="0.8" rx="1" />
        <path d="M 58 208 H 74 M 64 202 V 214" strokeWidth="0.6" />
        <text x="88" y="212" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3 A
        </text>
        <rect x="52" y="224" width="28" height="20" strokeWidth="0.8" rx="1" />
        <path d="M 58 234 H 74 M 64 228 V 240" strokeWidth="0.6" />
        <text x="88" y="238" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          4 A
        </text>
        <text x="48" y="168" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          charger brick
        </text>

        {/* Charge efficiency */}
        <path
          d="M 36 264 Q 38 260 44 260 H 168 Q 174 260 176 266 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 280 H 156" strokeWidth="0.8" />
        <path d="M 52 280 H 140" strokeWidth="1.2" />
        <text x="48" y="274" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          charge η
        </text>
        <text x="48" y="296" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          88%
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 120 H 218" strokeLinecap="round" />
        <path d="M 214 116 L 222 120 L 214 124" strokeLinejoin="round" />
        <path d="M 186 208 H 218" strokeLinecap="round" />
        <path d="M 214 204 L 222 208 L 214 212" />
        <path d="M 186 282 H 218" strokeLinecap="round" />
        <path d="M 214 278 L 222 282 L 214 286" />
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
        filter="url(#bp-esct-pencil)"
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
          Refill rate
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          W = V × A
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          h = Wh ÷ (W × η)
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          36V·2A: 360÷(72×0.88)
        </text>
        <text x="256" y="200" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          = 5.7 h
        </text>

        {/* 36V comparison bars */}
        <text x="256" y="224" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          36 V @ 360 Wh
        </text>
        <text x="256" y="242" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2A
        </text>
        <path d="M 276 238 H 420" strokeWidth="0.5" opacity="0.4" />
        <path d="M 276 238 H 412" strokeWidth="1.1" />
        <text x="428" y="242" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          5.7h
        </text>
        <text x="256" y="260" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          3A
        </text>
        <path d="M 276 256 H 420" strokeWidth="0.5" opacity="0.4" />
        <path d="M 276 256 H 368" strokeWidth="1" />
        <text x="428" y="260" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          3.8h
        </text>
        <text x="256" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          4A
        </text>
        <path d="M 276 274 H 420" strokeWidth="0.5" opacity="0.4" />
        <path d="M 276 274 H 332" strokeWidth="1" />
        <text x="428" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2.8h
        </text>

        {/* Pack filling */}
        <rect x="360" y="288" width="32" height="20" strokeWidth="0.8" rx="2" />
        <path d="M 368 294 H 384 M 368 300 H 384" strokeWidth="0.5" opacity="0.5" />
        <path d="M 392 298 H 416 M 416 298 L 412 294 M 416 298 L 412 302" strokeWidth="0.7" />

        <text x="256" y="298" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          higher A = shorter time · watch pack heat
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
        filter="url(#bp-esct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="112" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          charge time
        </text>

        <text x="612" y="148" textAnchor="middle" fill="currentColor" fontSize="28" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          5.7 h
        </text>
        <text x="612" y="168" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          36V · 2A · 360 Wh
        </text>

        <text x="548" y="192" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          48 V (same A)
        </text>
        <text x="556" y="212" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2A → 4.3h
        </text>
        <text x="556" y="228" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          3A → 2.8h
        </text>
        <text x="556" y="244" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          4A → 2.1h
        </text>

        <text x="612" y="272" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          72 W @ 2A
        </text>
        <text x="612" y="290" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          slow overnight · fast heats small packs
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-esct-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          2A brick ≈ 72 W on 36 V; 4A ≈ 144 W — taper above ~80% SOC extends real time
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          360 Wh
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          63 W eff.
        </text>
        <text x="205" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="225" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          ~5.7 h full charge
        </text>
      </g>
    </svg>
  );
}
