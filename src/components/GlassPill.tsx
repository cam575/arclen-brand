"use client"

import type { ReactNode } from "react"

interface GlassPillProps {
  children: ReactNode
  /** Active state shows the ember-to-blue gradient border + inner gradient fill. */
  active?: boolean
  /** Faded state lowers opacity to 0.3 — useful for disabled options. */
  faded?: boolean
  onClick?: () => void
  className?: string
}

/**
 * GlassPill — segmented selector pill. Used in tab groups, theme switchers,
 * and option toggles. Active state uses the signature gradient border.
 */
export function GlassPill({ children, active, faded, onClick, className }: GlassPillProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl px-10 py-3.5 ${onClick ? "cursor-pointer" : ""} ${className ?? ""}`}
      style={{ opacity: faded ? 0.3 : 1 }}
    >
      {active ? (
        <>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(#000, #000) padding-box, linear-gradient(90deg, #e07a00 0%, #e04a10 30%, #555 50%, #00d4ff 100%) border-box",
              border: "2.5px solid transparent",
              backdropFilter: "blur(6px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-[2.5px] rounded-[13px]"
            style={{
              background:
                "linear-gradient(90deg, #9f4e00 0%, #a22904 30%, #000 50%, #0098f3 100%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.03)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          />
        </>
      )}
      <span className="relative text-[14px] font-medium leading-7 text-white/80">
        {children}
      </span>
    </div>
  )
}
