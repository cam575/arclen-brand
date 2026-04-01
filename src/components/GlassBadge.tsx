"use client";

import React from "react";
import {
  accent,
  text,
  fill,
  blur,
  saturate,
  radius,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";

// ═══════════════════════════════════════════════
// GlassBadge — Small glass tag/chip
// ═══════════════════════════════════════════════

export type GlassBadgeVariant = GlassVariant | "success" | "danger";

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: GlassBadgeVariant;
  size?: "sm" | "md";
  shape?: "pill" | "rounded-sm";
  /** Solid dark backing so card content doesn't show through */
  opaque?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BADGE_COLORS: Record<string, { text: string; fill: string; borderTop: number; borderMid: number; bevelTop: string; bevelBottom: string }> = {
  success: {
    text: "#22C55E",
    fill: "rgba(34,197,94,0.08)",
    borderTop: 0.5,
    borderMid: 0.15,
    bevelTop: "rgba(34,197,94,0.35)",
    bevelBottom: "rgba(34,197,94,0.1)",
  },
  danger: {
    text: "#EF4444",
    fill: "rgba(239,68,68,0.08)",
    borderTop: 0.5,
    borderMid: 0.15,
    bevelTop: "rgba(239,68,68,0.35)",
    bevelBottom: "rgba(239,68,68,0.1)",
  },
};

export function GlassBadge({
  children,
  variant = "default",
  size = "md",
  shape = "pill",
  opaque = false,
  className = "",
  style: styleProp = {},
}: GlassBadgeProps) {
  const isAccent = variant === "accent";
  const colorVariant = BADGE_COLORS[variant];

  const textColor = colorVariant ? colorVariant.text : isAccent ? accent.primary : text.secondary;
  const bgFill = colorVariant ? colorVariant.fill : isAccent ? fill.flat.accent : fill.flat.default;
  const bevelShadow = colorVariant
    ? `inset 0 1px 0 ${colorVariant.bevelTop}, inset 0 -1px 0 ${colorVariant.bevelBottom}`
    : insetBevel(isAccent ? "accent" : "default");
  const borderGrad = colorVariant
    ? {
        border: "1px solid transparent" as const,
        background: `transparent padding-box, linear-gradient(180deg,
          rgba(${variant === "success" ? "34,197,94" : "239,68,68"},${colorVariant.borderTop}) 0%,
          rgba(${variant === "success" ? "34,197,94" : "239,68,68"},${colorVariant.borderMid}) 50%,
          rgba(${variant === "success" ? "34,197,94" : "239,68,68"},0.2) 100%
        ) border-box`,
      }
    : glassBorder(isAccent ? "accent" : "default");

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: size === "sm" ? "4px 10px" : "6px 14px",
        borderRadius: shape === "rounded-sm" ? radius.input : radius.pill,
        fontSize: size === "sm" ? "10px" : "12px",
        fontWeight: 500,
        fontFamily: "var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif)",
        color: textColor,
        letterSpacing: "0.02em",
        ...styleProp,
      }}
    >
      {/* Opaque backing — prevents card content showing through */}
      {opaque && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "#131316",
          }}
        />
      )}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: bgFill,
          ...(!opaque && {
            backdropFilter: `blur(${blur.medium}px) saturate(${saturate.medium})`,
            WebkitBackdropFilter: `blur(${blur.medium}px) saturate(${saturate.medium})`,
          }),
          boxShadow: bevelShadow,
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          ...borderGrad,
        }}
      />
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: size === "sm" ? "4px" : "6px", whiteSpace: "nowrap" }}>{children}</span>
    </span>
  );
}
