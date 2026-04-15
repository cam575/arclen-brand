"use client"

import type { ReactNode } from "react"

/**
 * Internal SVG filter for liquid glass distortion.
 * Renders once at the top of the LiquidGlassButton.
 */
function LiquidGlassFilterSVG() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass-btn"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves={1} seed={1} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation={2} result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale={70} xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation={4} result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

interface LiquidGlassButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

/**
 * LiquidGlassButton — premium decorative button using SVG turbulence
 * displacement filter behind the surface. Multi-layer reflex shadows mimic
 * polished glass. Place over interesting backgrounds for the displacement to
 * read clearly.
 */
export function LiquidGlassButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: LiquidGlassButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-md px-10 text-sm font-medium text-white transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div
        className="absolute inset-0 z-0 rounded-full"
        style={{
          boxShadow: [
            "0 0 8px rgba(0,0,0,0.03)",
            "0 2px 6px rgba(0,0,0,0.08)",
            "inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09)",
            "inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85)",
            "inset 1px 1px 1px -0.5px rgba(255,255,255,0.6)",
            "inset -1px -1px 1px -0.5px rgba(255,255,255,0.6)",
            "inset 0 0 6px 6px rgba(255,255,255,0.12)",
            "inset 0 0 2px 2px rgba(255,255,255,0.06)",
            "0 0 12px rgba(0,0,0,0.15)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0 -z-10 overflow-hidden rounded-md"
        style={{ backdropFilter: 'url("#liquid-glass-btn")' }}
      />
      <span className="pointer-events-none relative z-10">{children}</span>
      <LiquidGlassFilterSVG />
    </button>
  )
}
