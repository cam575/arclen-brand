"use client"

import { useState, type ReactNode } from "react"

export interface LiquidGlassSwitcherOption {
  value: string
  label?: string
  icon: ReactNode
}

interface LiquidGlassSwitcherProps {
  options: LiquidGlassSwitcherOption[]
  /** Initial selected value; uncontrolled. */
  defaultValue?: string
  /** Controlled value. */
  value?: string
  onChange?: (value: string) => void
  className?: string
  /** Total width in px. Default 244. */
  width?: number
}

const SWITCHER_FILTER_DATA = "data:image/webp;base64,UklGRq4vAABXRUJQVlA4WAoAAAAQAAAA5wEAhwAAQUxQSOYWAAABHAVpGzCrf9t7EiJCYdIGTDpvURGm9n7K+YS32rZ1W8q0LSSEBCQgAQlIwEGGA3CQOAAHSEDCJSEk4KDvUmL31vrYkSX3ufgXEb4gSbKt2LatxlqIgNBBzbM3ikHVkvUvq7btKpaOBCQgIRIiAQeNg46DwgE4oB1QDuKgS0IcXBykXieHkwdjX/4iAhZtK3ErSBYGEelp+4aM/5/+z14+//jLlz/++s/Xr4//kl9C8Ns8DaajU+lPX/74+viv/eWxOXsO+eHL3/88/ut/2b0zref99evjX8NLmNt1fP7178e/jJcw9k3G//XP49/Iy2qaa7328Xkk9ZnWx0VUj3bcyCY4Pi7C6reeEagEohnRCbQQwFmUp9ggYQj8MChjTSI0Ck7G/bh6P5ykNU9yP+10G8I2UAwXeQ96DQwNjqyPu/c4tK+5CtGOK0oM7AH5f767lHpotXVYYI66B+HjMhHj43C5wok3YDH4/vZFZRkB7rNnEfC39WS2Q3K78y525wFNTPf5f+/fN9YI1YyDvjuzV5rQtsfn1Ez1ka3PkeGxOZ6IODxDJqCLpF7vdb9Z3s/ufLr6jf/55zbW3LodwwVVg7Lmao+p3eGcqDFDGuuKnlBZAPSbnkYtTX+mZl2y57Gq85F3tDv7m7/yzpjXHoVA3YUObsHz80W3IUK1E8yRqggxTMzD4If2230ys7RDxWrLu9o9GdSWNwNRC2yMIg+HkTVT3BOZER49XLBMdljemLFMjw8VwZ8OdBti4lWdt7c7dzaSc5yILtztsTMT1GFGn/tysM23nF3xbOsnh/eQGKkxhWGEalljCvWZ+LDE+9t97uqEfb08rdYwZGhheLzG2SJzKS77OIAVgPDjf9jHt6c+0mjinS/v13iz9RV3vsPdmbNG1E+nD6s83jBrBEnlBiTojuJogGJNtzxtsIoD2CFuXYipzhGWHhWqCBSqd7l7GMrnuHzH6910FO+XYwgcDxoFRJNk2GUcpQ6I/GhLmqisuBS6uSFpfAz3Yb9Yatyed7r781ZYfr3+3FfXs1MykSbVcg4GiOKX19SZ9xFRwhG+UZGiROjsXhePVu12fCZTJ3CJ4Z3uXnyxz28RutHa5yCKG6jgfTBPuA9jHL7YdlAa2trNEr7BLANd3qNYcWZqnkvlDe8+F5Q/9k8jCFk17ObrIf0O/5U/iDnqcqA70mURr8FUN5pmQEzDcxuWvOPd1+KrbO4fd0vXK5OTtYEy5C2TA5L4ok6Y31WHR9ZR9lQr6IjwruSd775W6NVa2zz1fir2k1GWnT573Eu3mfMjIikYZkM4MDCnTWbmLrpK/Hs0KD5C8rZ3n0tnw0j76WuU8P1YBIjsvcESbnOQMY+gGC/sd/gG+hKKtDijJHhrcSj/GHa/FZ8oGLXeLx1IW+c"

/**
 * LiquidGlassSwitcher — iOS-style segmented theme/option toggle. Uses an
 * SVG displacement filter for the liquid glass distortion. Active option
 * gets an ember tint with multi-layer inset shadows.
 */
export function LiquidGlassSwitcher({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  className = "",
  width = 244,
}: LiquidGlassSwitcherProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value,
  )
  const value = controlledValue ?? internalValue

  const handleChange = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <>
      {/* SVG filter for liquid distortion */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="liquid-glass" primitiveUnits="objectBoundingBox">
          <feImage
            result="map"
            width="100%"
            height="100%"
            x="0"
            y="0"
            href={SWITCHER_FILTER_DATA}
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="map"
            scale="0.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <fieldset
        className={`flex items-center justify-center border-none ${className}`}
        style={{
          position: "relative",
          width: `${width}px`,
          height: "70px",
          padding: "10px",
          gap: "6px",
          borderRadius: "99em",
          backgroundColor: "rgba(187,187,188,0.08)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          boxShadow: [
            // Wet-glass top specular
            "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.55)",
            // Base reflex stack
            "inset 0 0 0 1px rgba(255,255,255,0.08)",
            "inset 1.8px 3px 0px -2px rgba(255,255,255,0.27)",
            "inset -2px -2px 0px -2px rgba(255,255,255,0.24)",
            "inset -3px -8px 1px -6px rgba(255,255,255,0.18)",
            "inset -0.3px -1px 4px 0px rgba(0,0,0,0.24)",
            "inset -1.5px 2.5px 0px -2px rgba(0,0,0,0.40)",
            // Warm + cool corner catchlights
            "inset 8px 8px 16px -10px rgba(255,180,120,0.15)",
            "inset -8px -8px 16px -10px rgba(100,180,255,0.10)",
            // Outer drop shadow for elevation
            "0 1px 2px rgba(0,0,0,0.20)",
            "0 8px 24px rgba(0,0,0,0.25)",
          ].join(", "),
        }}
      >
        <legend className="sr-only">Choose option</legend>
        {options.map((opt) => {
          const isActive = value === opt.value
          return (
            <label
              key={opt.value}
              className="relative cursor-pointer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                borderRadius: "99em",
                color: isActive ? "#E85D04" : "rgba(255,255,255,0.4)",
                transition: "all 0.4s cubic-bezier(1, 0, 0.4, 1)",
                background: isActive
                  ? "rgba(232,93,4,0.12)"
                  : "transparent",
                boxShadow: isActive
                  ? [
                      // Sharper ember specular on active
                      "inset 0 1px 0.5px -0.5px rgba(255,210,160,0.75)",
                      "inset 0 0 0 1px rgba(232,93,4,0.20)",
                      "inset 1px 2px 0px -1px rgba(255,200,140,0.30)",
                      "inset -1px -2px 0px -1px rgba(0,0,0,0.20)",
                      // Bottom ember glow (follows the circle curve)
                      "inset 0 -8px 12px -6px rgba(232,93,4,0.40)",
                      "0 2px 8px rgba(232,93,4,0.25)",
                      "0 0 20px rgba(232,93,4,0.15)",
                    ].join(", ")
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (isActive) return
                e.currentTarget.style.color = "rgba(255,255,255,0.8)"
                e.currentTarget.style.background = "rgba(255,255,255,0.06)"
              }}
              onMouseLeave={(e) => {
                if (isActive) return
                e.currentTarget.style.color = "rgba(255,255,255,0.4)"
                e.currentTarget.style.background = "transparent"
              }}
            >
              <input
                type="radio"
                name="liquid-glass-switcher"
                value={opt.value}
                checked={isActive}
                onChange={() => handleChange(opt.value)}
                className="sr-only"
              />
              {opt.icon}
              {opt.label && <span className="sr-only">{opt.label}</span>}
            </label>
          )
        })}
      </fieldset>
    </>
  )
}
