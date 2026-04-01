"use client";

import React from "react";
import {
  accent,
  type GlassVariant,
} from "../theme";
import { hexToRgbInline } from "./helpers";

// ═══════════════════════════════════════════════
// GlassDivider — Horizontal glass separator
// ═══════════════════════════════════════════════

interface GlassDividerProps {
  variant?: GlassVariant;
  className?: string;
}

export function GlassDivider({
  variant = "default",
  className = "",
}: GlassDividerProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "1px",
        background: `linear-gradient(90deg,
          transparent 0%,
          ${isAccent ? `rgba(${hexToRgbInline(accent.primary)},0.3)` : "rgba(255,255,255,0.12)"} 50%,
          transparent 100%)`,
      }}
    />
  );
}
