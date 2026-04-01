"use client";

import React, { useState } from "react";
import {
  blur,
  shadows,
  topLine,
  saturate,
  easing,
  radius,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";
import { GlassNoise } from "./GlassEffects";

// ═══════════════════════════════════════════════
// GlassCard — Elevated glass container
// ═══════════════════════════════════════════════

interface GlassCardProps {
  children: React.ReactNode;
  variant?: GlassVariant;
  padding?: string;
  hover?: boolean;
  /** Add frosted noise texture. `true` = default opacity (0.08), or pass a number for custom opacity. */
  noise?: boolean | number;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  variant = "default",
  padding = "24px",
  hover = true,
  noise = false,
  className = "",
  style = {},
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isAccent = variant === "accent";

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      onMouseEnter={hover ? () => setHovered(true) : undefined}
      onMouseLeave={hover ? () => { setHovered(false); setMousePos({ x: 50, y: 50 }); } : undefined}
      onMouseMove={hover ? handleMouseMove : undefined}
      className={className}
      style={{
        position: "relative",
        padding,
        borderRadius: radius.card,
        transition: `all 0.3s ${easing.smooth}`,
        transform: hover && hovered ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {/* Glass body */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: isAccent
            ? "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(232,93,4,0.1) 50%, rgba(232,93,4,0.05) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
          backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          boxShadow: insetBevel(variant),
          pointerEvents: "none",
        }}
      />
      {/* Cursor-tracking ambient light */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, ${
            isAccent ? "rgba(255,160,60,0.07)" : "rgba(255,255,255,0.06)"
          } 0%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
      {/* Frosted noise texture (opt-in) */}
      {noise && <GlassNoise opacity={typeof noise === "number" ? noise : undefined} />}
      {/* Convex highlight */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `linear-gradient(180deg,
            ${isAccent ? "rgba(255,160,60,0.08)" : "rgba(255,255,255,0.06)"} 0%,
            transparent 35%,
            rgba(0,0,0,0.03) 100%)`,
          pointerEvents: "none",
        }}
      />
      {/* Top highlight line */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: topLine.inset,
          right: topLine.inset,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${
            isAccent ? topLine.accent : topLine.default
          } 50%, transparent 100%)`,
          pointerEvents: "none",
          transition: "filter 0.3s ease",
          filter: hover && hovered ? "brightness(1.5)" : "brightness(1)",
        }}
      />
      {/* 3D bevel border */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          ...glassBorder(variant, 180),
          pointerEvents: "none",
          transition: "filter 0.3s ease",
          filter: hover && hovered ? "brightness(1.4)" : "brightness(1)",
        }}
      />
      {/* Shadow */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: hover && hovered ? shadows.depthHover : shadows.depth,
          transition: "box-shadow 0.3s ease",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "inherit", flexDirection: "inherit", flex: "1 1 auto" }}>{children}</div>
    </div>
  );
}
