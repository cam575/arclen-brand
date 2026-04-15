"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"

interface DashTabProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

/**
 * DashTab — horizontal tab for dashboard tabbar groups. Active tab gets a bottom
 * ember bar that pulses (3s ease-in-out infinite). Requires the `tab-ember-pulse`
 * keyframe (shipped in arclen-brand/src/glass.css).
 */
export function DashTab({ children, active, onClick, className, style }: DashTabProps) {
  const base: CSSProperties = {
    position: "relative",
    padding: "10px 24px",
    fontSize: 13,
    fontWeight: 500,
    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: active
      ? "linear-gradient(180deg, rgba(232,93,4,0.10) 0%, rgba(232,93,4,0.04) 100%)"
      : "transparent",
    ...style,
  }

  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (active) return
    e.currentTarget.style.color = "rgba(255,255,255,0.7)"
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (active) return
    e.currentTarget.style.color = "rgba(255,255,255,0.45)"
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={base}
    >
      {children}
      {/* Bottom ember bar */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 3,
            borderRadius: "3px 3px 0 0",
            background: "linear-gradient(90deg, #E85D04, #F07020)",
            boxShadow: "0 0 12px rgba(232,93,4,0.4)",
            animation: "tab-ember-pulse 3s ease-in-out infinite",
          }}
        />
      )}
    </div>
  )
}
