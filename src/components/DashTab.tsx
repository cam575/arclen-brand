"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"

interface DashTabProps {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

/**
 * DashTab — horizontal tab for dashboard tabbar groups. Mirrors the canonical
 * `.db-tab` / `.db-tab-active` styling from the Arclen dashboard: glass accent
 * fill, directional bevel border, inset bevel + outer glow, top highlight line,
 * bottom pulsing ember bar.
 *
 * Requires the `tab-ember-pulse` keyframe (shipped in arclen-brand/src/glass.css).
 */
export function DashTab({
  children,
  active,
  disabled,
  onClick,
  className,
  style,
}: DashTabProps) {
  const base: CSSProperties = {
    position: "relative",
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 450,
    color: disabled
      ? "rgba(255,255,255,0.15)"
      : active
        ? "rgba(255,255,255,0.95)"
        : "rgba(255,255,255,0.6)",
    borderRadius: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    overflow: "hidden",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    whiteSpace: "nowrap",
    ...(active
      ? {
          background:
            "linear-gradient(180deg, rgba(232,93,4,0.10) 0%, rgba(232,93,4,0.04) 100%)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          border: "1px solid rgba(232,93,4,0.08)",
          borderTopColor: "rgba(232,93,4,0.5)",
          borderLeftColor: "rgba(232,93,4,0.15)",
          borderBottomColor: "rgba(232,93,4,0.2)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,160,60,0.35)",
            "inset 0 -1px 0 rgba(232,93,4,0.1)",
            "0 0 16px rgba(232,93,4,0.10)",
            "0 0 32px rgba(232,93,4,0.05)",
          ].join(", "),
        }
      : {
          background: "transparent",
          border: "1px solid transparent",
        }),
    ...style,
  }

  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (active || disabled) return
    e.currentTarget.style.color = "rgba(255,255,255,0.95)"
    e.currentTarget.style.background = "rgba(255,255,255,0.05)"
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (active || disabled) return
    e.currentTarget.style.color = "rgba(255,255,255,0.6)"
    e.currentTarget.style.background = "transparent"
  }

  return (
    <div
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={base}
    >
      {children}
      {/* Top highlight line */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,160,60,0.6) 50%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {/* Bottom ember glow bar with pulse */}
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
            background: "linear-gradient(90deg, #FF8C42 0%, #E85D04 50%, #FF8C42 100%)",
            boxShadow: "0 0 8px rgba(232,93,4,0.5), 0 0 20px rgba(232,93,4,0.25)",
            animation: "tab-ember-pulse 3s ease-in-out infinite",
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}
