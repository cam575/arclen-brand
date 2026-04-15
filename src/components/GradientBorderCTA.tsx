"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

interface GradientBorderCTAProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  /** Pill (rounded-full) or rounded (12px). Default: rounded. */
  shape?: "pill" | "rounded"
  className?: string
  style?: CSSProperties
}

/**
 * GradientBorderCTA — premium dark CTA with an ember gradient border, top
 * ember glow blob, and shimmer sweep on hover. Pairs with GlowButton as a
 * cooler primary alternative — same ember energy, but black core for sites
 * that want less heat in the foreground.
 *
 * Stays in the ember family (no blue) per brand gradient guidelines.
 */
export function GradientBorderCTA({
  children,
  icon,
  onClick,
  type = "button",
  disabled = false,
  shape = "rounded",
  className = "",
  style,
}: GradientBorderCTAProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isLifted = hovered && !disabled && !pressed
  const radius = shape === "pill" ? "99em" : "12px"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPressed(false)
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: pressed
          ? "scale(0.97)"
          : isLifted
            ? "translateY(-1px)"
            : "translateY(0)",
        transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {/* Top ember glow blob — sits above the button */}
      <span
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: -18,
          left: "5%",
          right: "5%",
          height: 50,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(255,170,80,0.85) 0%, rgba(232,93,4,0.45) 30%, transparent 65%)",
          filter: "blur(3px)",
          opacity: isLifted ? 1 : 0.7,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Button body — ember gradient border, black inner */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 50,
          padding: "0 28px",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.005em",
          color: "#FFFFFF",
          borderRadius: radius,
          background:
            "linear-gradient(#0A0A0A, #0A0A0A) padding-box, linear-gradient(160deg, #FFAA40 0%, #FF8918 25%, #E85D04 55%, #9F4E00 85%, #5A2800 100%) border-box",
          border: "1px solid transparent",
          overflow: "hidden",
          boxShadow: isLifted
            ? "0 8px 24px rgba(232,93,4,0.30), 0 0 40px rgba(232,93,4,0.15)"
            : "0 4px 12px rgba(232,93,4,0.20), 0 0 24px rgba(232,93,4,0.08)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Inner top warm glow */}
        <span
          aria-hidden="true"
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: "5%",
            right: "5%",
            top: 0,
            height: 50,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,170,64,0.40) 0%, rgba(255,137,24,0.18) 40%, transparent 70%)",
            transform: "translateY(-55%)",
          }}
        />

        {/* Shimmer sweep on hover */}
        <span
          aria-hidden="true"
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            transform: isLifted ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.6s ease",
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,200,140,0.18) 45%, rgba(255,200,140,0.28) 50%, rgba(255,200,140,0.18) 55%, transparent 65%)",
          }}
        />

        {icon && (
          <span style={{ display: "flex", position: "relative", zIndex: 1 }}>{icon}</span>
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      </span>
    </button>
  )
}
