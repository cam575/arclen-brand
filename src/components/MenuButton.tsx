"use client"
import { useState } from "react"
import {
  blur,
  saturate,
  fill,
  highlight,
  shadows,
  easing,
  glassBorder,
  insetBevel,
} from "../theme"
import { MenuToggleIcon } from "./MenuToggleIcon"

export interface MenuButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function MenuButton({ isOpen, onClick, className }: MenuButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`relative w-9 h-9 md:w-10 md:h-10 z-70 flex items-center justify-center rounded-full ${className ?? ""}`}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: `all 0.3s ${easing.smooth}`,
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 28%, ${fill.default.from} 0%, ${fill.default.to} 70%)`,
          backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          boxShadow: insetBevel("default"),
        }}
      />
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 45% at 40% 25%, ${highlight.default.from} 0%, transparent 100%)`,
        }}
      />
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={glassBorder("default", 135)}
      />
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: hovered ? shadows.depthHover : shadows.subtle,
          transition: "box-shadow 0.3s ease",
        }}
      />
      <MenuToggleIcon
        open={isOpen}
        strokeWidth={isOpen ? 3 : 2.4}
        className={`relative z-10 transition-all duration-300 ${
          isOpen
            ? "size-3.5 md:size-4 text-[#E85D04]"
            : "size-4 md:size-5"
        }`}
        duration={400}
      />
    </button>
  )
}
