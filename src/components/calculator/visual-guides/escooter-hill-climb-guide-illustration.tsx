"use client";

import { cn } from "@/lib/utils";

interface EscooterHillClimbGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: SOC + voltage + motor W + mass → P_eff → max grade %.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterHillClimbGuideIllustration({
  className,
}: EscooterHillClimbGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-hill-climb-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="eshc-guide-title eshc-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="eshc-guide-title">E-scooter hill climb grade flow diagram</title>
      <desc id="eshc-guide-desc">
        Inputs: nominal pack voltage, state of charge, motor power, total mass,
        and minimum crawl speed. Process: apply SOC and voltage sag to effective
        motor power, then solve hill-climb physics for maximum grade percent.
        Output: maximum sustainable climb grade.
      </desc>

      <defs>
        <pattern
          id="bp-eshc-grid-minor"
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
          id="bp-eshc-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-eshc-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-eshc-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-eshc-grid-major)"
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
        FIG. 1 — HILL CLIMB GRADE
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
        filter="url(#bp-eshc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Voltage + SOC */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="24" height="20" strokeWidth="0.8" rx="1" />
        <text x="64" y="114" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          36V
        </text>
        <rect x="80" y="100" width="24" height="20" strokeWidth="0.6" rx="1" opacity="0.5" />
        <text x="92" y="114" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          48
        </text>
        <rect x="108" y="100" width="24" height="20" strokeWidth="0.6" rx="1" opacity="0.5" />
        <text x="120" y="114" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          52
        </text>
        <path d="M 52 132 H 156" strokeWidth="0.6" opacity="0.4" />
        <path d="M 52 132 H 104" strokeWidth="1.2" />
        <text x="48" y="128" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          SOC
        </text>
        <text x="48" y="158" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          50% charge
        </text>

        {/* Motor + mass */}
        <path
          d="M 36 182 Q 38 178 44 178 H 168 Q 174 178 176 184 V 248 Q 174 254 168 254 H 44 Q 38 254 36 248 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="208" r="12" strokeWidth="0.9" />
        <path d="M 72 196 V 220 M 60 208 H 84" strokeWidth="0.6" opacity="0.5" />
        <text x="48" y="194" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          motor
        </text>
        <text x="96" y="208" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          500 W
        </text>
        <circle cx="72" cy="236" r="7" strokeWidth="0.8" />
        <path d="M 72 243 V 252 M 65 248 H 79" strokeWidth="0.7" />
        <text x="96" y="242" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          89 kg
        </text>

        {/* Crawl speed */}
        <path
          d="M 36 262 Q 38 258 44 258 H 168 Q 174 258 176 264 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 278 L 72 268 L 92 278 L 112 272" strokeWidth="0.8" />
        <text x="48" y="270" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          crawl
        </text>
        <text x="48" y="294" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          8 km/h min
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 130 H 218" strokeLinecap="round" />
        <path d="M 214 126 L 222 130 L 214 134" strokeLinejoin="round" />
        <path d="M 186 216 H 218" strokeLinecap="round" />
        <path d="M 214 212 L 222 216 L 214 220" />
        <path d="M 186 280 H 218" strokeLinecap="round" />
        <path d="M 214 276 L 222 280 L 214 284" />
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
        filter="url(#bp-eshc-pencil)"
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
          Hill climb physics
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          P_eff = P × (SOC/100) × η_V
        </text>
        <text
          x="256"
          y="156"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          500 × 0.50 × 0.89 ≈ 222 W
        </text>
        <text
          x="256"
          y="180"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          P = m·g·sin(θ)·v
        </text>
        <text
          x="256"
          y="200"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          grade % = tan(θ) × 100
        </text>
        <text
          x="256"
          y="224"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          max ≈ 8.6% grade
        </text>

        {/* Hill slope diagram */}
        <path d="M 300 268 L 440 268 L 440 228" strokeWidth="1" />
        <path d="M 300 268 L 420 248" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="448" y="252" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          θ
        </text>
        <circle cx="380" cy="256" r="10" strokeWidth="0.8" />
        <path d="M 376 252 L 384 260 M 384 252 L 376 260" strokeWidth="0.5" />

        {/* Voltage sag drop */}
        <path d="M 256 248 H 280 V 264 H 304" strokeWidth="0.8" />
        <text x="256" y="244" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          sag ↓ torque
        </text>
        <text x="256" y="284" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          20% SOC → ~3% grade @ 36V
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
        filter="url(#bp-eshc-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        {/* Incline gauge */}
        <path d="M 572 148 Q 612 108 652 148" strokeWidth="1" />
        <path d="M 612 148 L 628 132" strokeWidth="1.2" />
        <text x="612" y="100" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          max grade
        </text>

        <text
          x="612"
          y="200"
          textAnchor="middle"
          fill="currentColor"
          fontSize="32"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          8.6%
        </text>
        <text
          x="612"
          y="224"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          @ 50% SOC · 36 V
        </text>
        <text
          x="612"
          y="246"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          19.7% w/o sag
        </text>
        <text
          x="612"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          44% est. motor power
        </text>
        <text
          x="612"
          y="288"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          8 km/h crawl speed
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-eshc-pencil)"
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
          low SOC + 36 V = steep torque drop — slide SOC to find climb cutoff
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          222 W
        </text>
        <text x="115" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="135" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          m·g·v
        </text>
        <text x="175" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          →
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          8.6% max slope
        </text>
      </g>
    </svg>
  );
}
