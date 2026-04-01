"use client";

import React from "react";
import {
  accent,
  fill,
  highlight,
  blur,
  saturate,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";
import { hexToRgbInline } from "./helpers";

// ═══════════════════════════════════════════════
// GlassSlider — Range slider with glass thumb
// ═══════════════════════════════════════════════

interface GlassSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  variant?: GlassVariant;
  className?: string;
}

export function GlassSlider({
  value = 50,
  onChange,
  variant = "default",
  className = "",
}: GlassSliderProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "4px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      {/* Active fill */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `${value}%`,
          height: "4px",
          borderRadius: "2px",
          background: isAccent
            ? `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`
            : "rgba(255,255,255,0.85)",
          boxShadow: isAccent
            ? `0 0 12px rgba(${hexToRgbInline(accent.primary)},0.4)`
            : "0 0 8px rgba(255,255,255,0.2)",
        }}
      />
      {/* Thumb */}
      <div
        style={{
          position: "absolute",
          left: `${value}%`,
          transform: "translateX(-50%)",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          cursor: "grab",
        }}
      >
        {/* Glass fill */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: isAccent
              ? `radial-gradient(circle at 38% 30%, ${fill.accent.from} 0%, ${fill.accent.to} 70%)`
              : `radial-gradient(circle at 38% 30%, ${fill.default.from} 0%, ${fill.default.to} 70%)`,
            backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
            WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
            boxShadow: insetBevel(variant),
          }}
        />
        {/* Convex highlight */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(ellipse 55% 40% at 40% 25%,
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
          }}
        />
        {/* Shadow */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          }}
        />
      </div>
      {/* Hidden input */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{
          position: "absolute",
          width: "100%",
          height: "40px",
          opacity: 0,
          cursor: "pointer",
          zIndex: 2,
        }}
      />
    </div>
  );
}
