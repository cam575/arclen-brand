"use client";

import React, { useState, useCallback, forwardRef } from "react";
import {
  text,
  blur,
  shadows,
  fill,
  highlight,
  saturate,
  easing,
  radius,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";

// ═══════════════════════════════════════════════
// GlassButton — Pill-shaped glass button
// ═══════════════════════════════════════════════

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: GlassVariant;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      icon,
      disabled = false,
      onClick,
      href,
      type = "button",
      fullWidth = false,
      className = "",
      style = {},
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [focused, setFocused] = useState(false);
    const isAccent = variant === "accent";

    const sizes = {
      sm: { padding: "10px 24px", fontSize: "13px" },
      md: { padding: "14px 36px", fontSize: "15px" },
      lg: { padding: "18px 48px", fontSize: "17px" },
    };

    const transform = pressed && !disabled
      ? "translateY(0) scale(0.97)"
      : hovered && !disabled
        ? "translateY(-2px)"
        : "translateY(0)";

    // Focus ring — visible on keyboard focus, hidden on mouse click
    const focusRing = focused && !pressed
      ? isAccent
        ? "0 0 0 2px rgba(232,93,4,0.5), 0 0 0 4px rgba(232,93,4,0.2)"
        : "0 0 0 2px rgba(255,255,255,0.4), 0 0 0 4px rgba(255,255,255,0.1)"
      : "none";

    const sharedStyle: React.CSSProperties = {
      position: "relative",
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      justifyContent: fullWidth ? "center" : undefined,
      alignItems: "center",
      gap: "10px",
      border: "none",
      borderRadius: radius.pill,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif)",
      fontWeight: 500,
      letterSpacing: "0.01em",
      color: isAccent ? text.primary : text.secondary,
      transition: `transform 0.3s ${easing.smooth}, opacity 0.3s ${easing.smooth}, box-shadow 0.3s ${easing.smooth}`,
      transform,
      opacity: disabled ? 0.4 : 1,
      outline: "none",
      overflow: "hidden",
      textDecoration: "none",
      boxShadow: focusRing,
      ...sizes[size],
      ...style,
    };

    // Unified pointer handlers — work on both mouse and touch
    const onEnter = useCallback(() => { if (!disabled) setHovered(true); }, [disabled]);
    const onLeave = useCallback(() => { setHovered(false); setPressed(false); }, []);
    const onDown = useCallback(() => { if (!disabled) setPressed(true); }, [disabled]);
    const onUp = useCallback(() => setPressed(false), []);
    const onFocus = useCallback((e: React.FocusEvent) => {
      // Only show focus ring for keyboard focus (not mouse click)
      if (e.target.matches(":focus-visible")) setFocused(true);
    }, []);
    const onBlur = useCallback(() => setFocused(false), []);

    const interactionProps = {
      onMouseEnter: onEnter,
      onMouseLeave: onLeave,
      onMouseDown: onDown,
      onMouseUp: onUp,
      onTouchStart: onDown,
      onTouchEnd: onUp,
      onFocus,
      onBlur,
    };

    const inner = (
      <>
        {/* Accent: solid dark-ember undercoat so blur doesn't wash out color */}
        {isAccent && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "linear-gradient(180deg, rgba(232,93,4,0.22) 0%, rgba(232,93,4,0.10) 100%)",
              pointerEvents: "none",
            }}
          />
        )}
        {/* Glass body */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: isAccent
              ? "linear-gradient(180deg, rgba(255,200,120,0.10) 0%, rgba(232,93,4,0.08) 50%, rgba(232,93,4,0.04) 100%)"
              : `linear-gradient(180deg, ${fill.default.from} 0%, ${fill.default.to} 100%)`,
            backdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
            WebkitBackdropFilter: `blur(${blur.heavy}px) saturate(${saturate.heavy})`,
            boxShadow: isAccent
              ? "inset 0 1px 0 rgba(255,160,60,0.45), inset 0 -1px 0 rgba(232,93,4,0.15)"
              : insetBevel(variant),
          }}
        />
        {/* Convex highlight */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: isAccent
              ? `linear-gradient(180deg, rgba(255,180,80,0.18) 0%, rgba(255,140,40,0.04) 25%, transparent 50%, rgba(0,0,0,0.08) 100%)`
              : `linear-gradient(180deg,
                ${highlight.default.from} 0%,
                ${highlight.default.mid} 30%,
                transparent 50%,
                rgba(0,0,0,0.06) 100%)`,
            pointerEvents: "none",
          }}
        />
        {/* 3D bevel border */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            ...(isAccent
              ? {
                  border: "1px solid transparent",
                  background: `transparent padding-box,
                    linear-gradient(180deg,
                      rgba(255,160,60,0.55) 0%,
                      rgba(232,93,4,0.25) 30%,
                      rgba(232,93,4,0.15) 50%,
                      rgba(232,93,4,0.18) 70%,
                      rgba(255,140,60,0.35) 100%
                    ) border-box`,
                }
              : glassBorder(variant, 180)),
            pointerEvents: "none",
          }}
        />
        {/* Accent: bottom ember bar — slides in on hover */}
        {isAccent && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              left: hovered ? "15%" : "40%",
              right: hovered ? "15%" : "40%",
              height: "2px",
              borderRadius: "1px",
              background: "linear-gradient(90deg, transparent 0%, #E85D04 30%, #FF8C42 50%, #E85D04 70%, transparent 100%)",
              boxShadow: "0 0 6px rgba(232,93,4,0.35)",
              opacity: hovered ? 1 : 0,
              transition: `opacity 0.35s ${easing.smooth}, left 0.35s ${easing.smooth}, right 0.35s ${easing.smooth}`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
        {/* Accent: top highlight line */}
        {isAccent && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,160,60,0.5) 50%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
        {/* Shadow — transitions smoothly between rest and hover */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow: hovered
              ? isAccent
                ? `0 12px 40px rgba(232,93,4,0.3), 0 0 60px rgba(232,93,4,0.12), 0 0 12px rgba(232,93,4,0.15)`
                : shadows.depthHover
              : isAccent
                ? `0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(232,93,4,0.14), 0 0 40px rgba(232,93,4,0.07)`
                : shadows.depth,
            transition: `box-shadow 0.4s ${easing.smooth}`,
            pointerEvents: "none",
          }}
        />
        {/* Content */}
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {icon && (
            <span style={{ display: "flex", opacity: 0.8 }}>{icon}</span>
          )}
          {children}
        </span>
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={sharedStyle}
            {...interactionProps}
          >
            {inner}
          </a>
        );
      }
      return (
        <a
          href={href}
          className={className}
          style={sharedStyle}
          {...interactionProps}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={className}
        style={sharedStyle}
        {...interactionProps}
      >
        {inner}
      </button>
    );
  }
);
GlassButton.displayName = "GlassButton";
