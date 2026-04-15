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
 * DashNavItem — sidebar nav row for dashboards. Mirrors the canonical
 * `.db-nav-item` / `.db-nav-item-active` styling from the Arclen dashboard:
 * glass accent fill, directional bevel border, inset highlight + outer glow,
 * left accent bar, top highlight line.
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
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 450,
    color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
    borderRadius: 10,
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    textDecoration: "none",
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
    if (active) return
    e.currentTarget.style.background = "rgba(255,255,255,0.05)"
    e.currentTarget.style.color = "rgba(255,255,255,0.95)"
  }

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (active) return
    e.currentTarget.style.background = "transparent"
    e.currentTarget.style.color = "rgba(255,255,255,0.6)"
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={base}
    >
      {/* Left accent bar — glowing pill */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: 3,
            borderRadius: "0 3px 3px 0",
            background: "linear-gradient(180deg, #FF8C42 0%, #E85D04 100%)",
            boxShadow: "0 0 8px rgba(232,93,4,0.4)",
            zIndex: 2,
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
              "linear-gradient(90deg, transparent 0%, rgba(255,160,60,0.6) 50%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
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
