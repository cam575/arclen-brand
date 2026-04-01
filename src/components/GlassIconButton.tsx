"use client";

import React, { useState } from "react";
import {
  accent,
  blur,
  shadows,
  fill,
  highlight,
  saturate,
  easing,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";

// ═══════════════════════════════════════════════
// GlassIconButton — Circular glass button
// ═══════════════════════════════════════════════

interface GlassIconButtonProps {
  children: React.ReactNode;
  variant?: GlassVariant;
  size?: number;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
  as?: "button" | "span" | "div";
}

export function GlassIconButton({
  children,
  variant = "default",
  size = 48,
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  className = "",
  as: Tag = "button",
}: GlassIconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isAccent = variant === "accent";

  return (
    <Tag
      {...(Tag === "button" ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onClick, disabled, type: "button" as const } : { role: "img" as const })}
      aria-label={ariaLabel}
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        cursor: Tag === "button" ? (disabled ? "not-allowed" : "pointer") : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isAccent ? accent.primary : "rgba(255,255,255,0.6)",
        transition: `all 0.3s ${easing.smooth}`,
        transform: hovered && !disabled ? "scale(1.08)" : "scale(1)",
        opacity: disabled ? 0.4 : 1,
        outline: "none",
        background: "transparent",
      }}
    >
      {/* Glass body */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: isAccent
            ? `radial-gradient(circle at 35% 28%, ${fill.accent.from} 0%, ${fill.accent.to} 70%)`
            : `radial-gradient(circle at 35% 28%, ${fill.default.from} 0%, ${fill.default.to} 70%)`,
          backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          boxShadow: insetBevel(variant),
          pointerEvents: "none",
        }}
      />
      {/* Convex highlight */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(ellipse 65% 45% at 40% 25%,
            ${isAccent ? highlight.accent.from : highlight.default.from} 0%,
            transparent 100%)`,
          pointerEvents: "none",
        }}
      />
      {/* 3D bevel border */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          ...glassBorder(variant, 135),
          pointerEvents: "none",
        }}
      />
      {/* Shadow */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: hovered
            ? isAccent
              ? shadows.accentGlow
              : shadows.depthHover
            : shadows.subtle,
          transition: "box-shadow 0.3s ease",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</span>
    </Tag>
  );
}
