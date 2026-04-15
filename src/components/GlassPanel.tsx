"use client"

import type { CSSProperties, ReactNode } from "react"

interface GlassPanelProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  /** Tailwind rounded class. Default: "rounded-2xl". */
  rounded?: string
}

/**
 * GlassPanel — frosted glass overlay with directional border fades
 * (top-left white, bottom-right brand). Use as a reusable card surface.
 */
export function GlassPanel({
  children,
  className = "",
  style,
  rounded = "rounded-2xl",
}: GlassPanelProps) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={style}>
      {/* Frosted blur */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(12px) saturate(1.4)",
          WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        }}
      />
      {/* Glass fill — gradient white tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
        }}
      />
      {/* Top-left white border fade */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          border: "1px solid white",
          maskImage: "linear-gradient(135deg, white, transparent 50%)",
          WebkitMaskImage: "linear-gradient(135deg, white, transparent 50%)",
        }}
      />
      {/* Bottom-right brand border fade */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          border: "1px solid rgba(255,255,255,0.5)",
          maskImage: "linear-gradient(135deg, transparent 50%, white)",
          WebkitMaskImage: "linear-gradient(135deg, transparent 50%, white)",
        }}
      />
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
