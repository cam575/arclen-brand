"use client";

import React from "react";
import {
  blur,
  shadows,
  topLine,
  saturate,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";

// ═══════════════════════════════════════════════
// GlassLayers — Renderless glass overlay spans
// ═══════════════════════════════════════════════
//
// Renders the same 5-layer glass treatment as
// GlassCard, but as raw <span>s that can be placed
// inside ANY parent element (div, Link, button…).
//
// USAGE:
//   <div style={{ position: "relative", borderRadius: "16px" }}>
//     <GlassLayers />
//     <div style={{ position: "relative", zIndex: 1 }}>{content}</div>
//   </div>
//
// The parent element MUST have:
//   position: relative  (for absolute spans)
//   border-radius        (for inherit to work)
// ═══════════════════════════════════════════════

export type GlassLayersVariant = "default" | "accent" | "danger" | "danger-subtle" | "positive-subtle" | "warning-subtle";

interface GlassLayersProps {
  variant?: GlassLayersVariant;
  /** Override the border gradient angle (default 180 = top-to-bottom) */
  borderAngle?: number;
  /** Override the depth shadow (e.g. for hover states) */
  shadow?: string;
  /** When true, brightens border + top line for hover state */
  hovered?: boolean;
  /** Cursor position (0-100) for ambient spotlight. Only renders when provided. */
  mousePos?: { x: number; y: number };
}

export function GlassLayers({
  variant = "default",
  borderAngle = 180,
  shadow,
  hovered = false,
  mousePos,
}: GlassLayersProps) {
  const isAccent = variant === "accent";
  const isDanger = variant === "danger" || variant === "danger-subtle";
  const isSubtle = variant === "danger-subtle";
  const isPositive = variant === "positive-subtle";
  const isWarning = variant === "warning-subtle";

  // Pick colors based on variant
  const fillGradient = isWarning
    ? "linear-gradient(180deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.025) 100%)"
    : isPositive
    ? "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.025) 100%)"
    : isDanger
    ? isSubtle
      ? "linear-gradient(180deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.025) 100%)"
      : "linear-gradient(180deg, rgba(239,68,68,0.06) 0%, rgba(239,68,68,0.015) 100%)"
    : isAccent
    ? "linear-gradient(180deg, rgba(232,93,4,0.06) 0%, rgba(232,93,4,0.02) 100%)"
    : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)";

  const convexFrom = isWarning
    ? "rgba(245,158,11,0.08)"
    : isPositive
    ? "rgba(34,197,94,0.08)"
    : isDanger
    ? isSubtle
      ? "rgba(239,68,68,0.08)"
      : "rgba(239,68,68,0.06)"
    : isAccent
    ? "rgba(255,160,60,0.08)"
    : "rgba(255,255,255,0.06)";

  const topLineColor = isWarning
    ? "rgba(245,158,11,0.4)"
    : isPositive
    ? "rgba(34,197,94,0.4)"
    : isDanger
    ? isSubtle
      ? "rgba(239,68,68,0.4)"
      : "rgba(239,68,68,0.4)"
    : isAccent
    ? topLine.accent
    : topLine.default;

  const bevelVariant: GlassVariant = isAccent ? "accent" : "default";
  const bevelShadow = isWarning
    ? "inset 0 1px 0 rgba(245,158,11,0.3), inset 0 -1px 0 rgba(245,158,11,0.1)"
    : isPositive
    ? "inset 0 1px 0 rgba(34,197,94,0.3), inset 0 -1px 0 rgba(34,197,94,0.1)"
    : isDanger
    ? isSubtle
      ? "inset 0 1px 0 rgba(239,68,68,0.3), inset 0 -1px 0 rgba(239,68,68,0.1)"
      : "inset 0 1px 0 rgba(239,68,68,0.35), inset 0 -1px 0 rgba(239,68,68,0.1)"
    : insetBevel(bevelVariant);

  // Border gradient
  const borderStyle = isWarning
    ? {
        border: "1px solid transparent" as const,
        background: `transparent padding-box, linear-gradient(${borderAngle}deg,
          rgba(245,158,11,0.45) 0%,
          rgba(245,158,11,0.15) 30%,
          rgba(245,158,11,0.1) 50%,
          rgba(245,158,11,0.12) 70%,
          rgba(245,158,11,0.2) 100%
        ) border-box`,
      }
    : isPositive
    ? {
        border: "1px solid transparent" as const,
        background: `transparent padding-box, linear-gradient(${borderAngle}deg,
          rgba(34,197,94,0.45) 0%,
          rgba(34,197,94,0.15) 30%,
          rgba(34,197,94,0.1) 50%,
          rgba(34,197,94,0.12) 70%,
          rgba(34,197,94,0.2) 100%
        ) border-box`,
      }
    : isDanger
    ? {
        border: "1px solid transparent" as const,
        background: `transparent padding-box, linear-gradient(${borderAngle}deg,
          rgba(239,68,68,${isSubtle ? 0.45 : 0.5}) 0%,
          rgba(239,68,68,${isSubtle ? 0.15 : 0.15}) 30%,
          rgba(239,68,68,${isSubtle ? 0.1 : 0.08}) 50%,
          rgba(239,68,68,${isSubtle ? 0.12 : 0.1}) 70%,
          rgba(239,68,68,${isSubtle ? 0.2 : 0.2}) 100%
        ) border-box`,
      }
    : glassBorder(bevelVariant, borderAngle);

  // Spotlight color matches variant
  const spotlightColor = isAccent
    ? "rgba(255,160,60,0.07)"
    : isWarning
    ? "rgba(245,158,11,0.07)"
    : isPositive
    ? "rgba(34,197,94,0.07)"
    : isDanger
    ? "rgba(239,68,68,0.07)"
    : "rgba(255,255,255,0.06)";

  return (
    <>
      {/* Glass body — fill + backdrop blur + inset bevel */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: fillGradient,
          backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
          boxShadow: bevelShadow,
        }}
      />
      {/* Cursor-tracking ambient light (only when mousePos provided) */}
      {mousePos && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, ${spotlightColor} 0%, transparent 100%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Convex highlight */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `linear-gradient(180deg, ${convexFrom} 0%, transparent 35%, rgba(0,0,0,0.03) 100%)`,
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
          background: `linear-gradient(90deg, transparent 0%, ${topLineColor} 50%, transparent 100%)`,
          pointerEvents: "none",
          transition: "filter 0.3s ease",
          filter: hovered ? "brightness(1.5)" : "brightness(1)",
        }}
      />
      {/* 3D bevel border */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          ...borderStyle,
          pointerEvents: "none",
          transition: "filter 0.3s ease",
          filter: hovered ? "brightness(1.4)" : "brightness(1)",
        }}
      />
      {/* Shadow */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: shadow || shadows.depth,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
