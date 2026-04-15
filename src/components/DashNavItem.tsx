"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"

interface DashNavItemProps {
  children: ReactNode
  active?: boolean
  icon?: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

/**
 * DashNavItem — sidebar nav row for dashboards. Active state shows a left ember
 * accent bar, a top highlight line, and an ember tint on the icon.
 */
export function DashNavItem({
  children,
  active,
  icon,
  onClick,
  className,
  style,
}: DashNavItemProps) {
  const base: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 500,
    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
    borderRadius: 12,
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.2s ease",
    background: active
      ? "linear-gradient(180deg, rgba(232,93,4,0.10) 0%, rgba(232,93,4,0.04) 100%)"
      : "transparent",
    border: active ? "1px solid rgba(232,93,4,0.15)" : "1px solid transparent",
    ...style,
  }

  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (active) return
    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
    e.currentTarget.style.color = "rgba(255,255,255,0.7)"
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (active) return
    e.currentTarget.style.background = "transparent"
    e.currentTarget.style.color = "rgba(255,255,255,0.5)"
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={base}
    >
      {/* Left accent bar */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: "15%",
            bottom: "15%",
            width: 3,
            borderRadius: 999,
            background: "linear-gradient(180deg, #E85D04, #F07020)",
          }}
        />
      )}
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
              "linear-gradient(90deg, transparent, rgba(232,93,4,0.3), transparent)",
          }}
        />
      )}
      {icon && (
        <span style={{ display: "flex", color: active ? "#E85D04" : "inherit" }}>
          {icon}
        </span>
      )}
      {children}
    </div>
  )
}
