"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { LIQUID_GLASS_SHADOW } from "./brand-styles"

interface LiquidGlassButtonProps {
  children: ReactNode
  /** Optional icon rendered to the left of the label. */
  icon?: ReactNode
  /** Active/selected state shows the ember tint with stronger inset glow. */
  active?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  /** Pill (rounded-full) or rounded-md. Default: pill. */
  shape?: "pill" | "rounded"
  className?: string
  style?: CSSProperties
}

/**
 * LiquidGlassButton — frosted glass button with the same 6-layer inset reflex
 * shadow stack as LiquidGlassSwitcher (Apple/Figma aesthetic). Works on any
 * background, no SVG filter required.
 *
 * Pair with LiquidGlassSwitcher and other liquid-glass surfaces.
 */
export function LiquidGlassButton({
  children,
  icon,
  active = false,
  onClick,
  type = "button",
  disabled = false,
  shape = "pill",
  className = "",
  style,
}: LiquidGlassButtonProps) {
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    padding: "0 28px",
    fontSize: 14,
    fontWeight: 500,
    color: active ? "#E85D04" : "rgba(255,255,255,0.85)",
    borderRadius: shape === "pill" ? "99em" : "12px",
    backgroundColor: active ? "rgba(232,93,4,0.08)" : "rgba(187,187,188,0.06)",
    backdropFilter: "blur(8px) saturate(150%)",
    WebkitBackdropFilter: "blur(8px) saturate(150%)",
    boxShadow: active
      ? [
          "inset 0 0 0 1px rgba(232,93,4,0.15)",
          "inset 1px 2px 0px -1px rgba(255,255,255,0.20)",
          "inset -1px -2px 0px -1px rgba(0,0,0,0.15)",
          "0 2px 8px rgba(232,93,4,0.15)",
        ].join(", ")
      : LIQUID_GLASS_SHADOW,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.4s cubic-bezier(1, 0, 0.4, 1)",
    border: "none",
    outline: "none",
    ...style,
  }

  const handleEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || active) return
    e.currentTarget.style.color = "rgba(255,255,255,1)"
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"
  }

  const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || active) return
    e.currentTarget.style.color = "rgba(255,255,255,0.85)"
    e.currentTarget.style.backgroundColor = "rgba(187,187,188,0.06)"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={baseStyle}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </button>
  )
}
