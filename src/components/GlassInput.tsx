"use client";

import React, { useState } from "react";
import {
  accent,
  text,
  blur,
  saturate,
  radius,
  insetBevel,
} from "../theme";
import { hexToRgbInline } from "./helpers";

// ═══════════════════════════════════════════════
// GlassInput — Text input with glass styling
// ═══════════════════════════════════════════════

interface GlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  type?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export function GlassInput({
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  name,
  id,
  disabled = false,
  required,
  autoComplete,
  className = "",
}: GlassInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        borderRadius: radius.input,
      }}
    >
      {/* Glass background */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.medium})`,
          WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.medium})`,
          boxShadow: insetBevel("default"),
        }}
      />
      {/* Border */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: "1px solid transparent",
          background: `transparent padding-box,
            linear-gradient(180deg,
              ${focused ? `rgba(${hexToRgbInline(accent.primary)},0.45)` : "rgba(255,255,255,0.15)"} 0%,
              ${focused ? `rgba(${hexToRgbInline(accent.primary)},0.1)` : "rgba(255,255,255,0.04)"} 100%
            ) border-box`,
          transition: "all 0.2s ease",
          pointerEvents: "none",
        }}
      />
      {/* Focus glow */}
      {focused && (
        <span
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "inherit",
            boxShadow: `0 0 20px rgba(${hexToRgbInline(accent.primary)},0.15)`,
            pointerEvents: "none",
          }}
        />
      )}
      {icon && (
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            paddingLeft: "16px",
            color: focused ? accent.primary : text.muted,
            transition: "color 0.2s ease",
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        name={name}
        id={id}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: icon ? "14px 16px 14px 12px" : "14px 16px",
          background: "transparent",
          border: "none",
          outline: "none",
          color: text.primary,
          fontSize: "14px",
          fontFamily: "var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif)",
        }}
      />
    </div>
  );
}
