"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * GlowButton — primary CTA with ember gradient fill, glow stack, and shine sweep on hover.
 * Use for the highest-priority action on a page.
 */
export function GlowButton({
  children,
  icon,
  onClick,
  type = "button",
  disabled = false,
  className,
  style,
}: GlowButtonProps) {
  const handleEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    e.currentTarget.style.transform = "translateY(-2px)"
    e.currentTarget.style.boxShadow =
      "0 8px 32px rgba(232,93,4,0.5), 0 0 80px rgba(232,93,4,0.2)"
    const shine = e.currentTarget.querySelector<HTMLSpanElement>("[data-glow-shine]")
    if (shine) shine.style.transform = "translateX(100%)"
  }

  const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(0)"
    e.currentTarget.style.boxShadow =
      "0 4px 20px rgba(232,93,4,0.4), 0 0 60px rgba(232,93,4,0.15)"
    const shine = e.currentTarget.querySelector<HTMLSpanElement>("[data-glow-shine]")
    if (shine) shine.style.transform = "translateX(-100%)"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 24px",
        fontSize: 14,
        fontWeight: 600,
        color: "#FFFFFF",
        background: "linear-gradient(135deg, #E85D04 0%, #F07020 50%, #FF8C42 100%)",
        border: "none",
        borderRadius: 9999,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow:
          "0 4px 20px rgba(232,93,4,0.4), 0 0 60px rgba(232,93,4,0.15)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
      <span
        data-glow-shine
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 55%, transparent 65%)",
          transform: "translateX(-100%)",
          transition: "transform 0.6s ease",
          pointerEvents: "none",
        }}
      />
    </button>
  )
}
