"use client"

interface GlassOverlayCardProps {
  /** Headline text — uses serif font for editorial feel. */
  headline?: string
  /** Brand initials shown top-right. */
  brand?: string
  /** Footer link/url. */
  link?: string
  /** Color palette for the backing card. */
  variant?: "blue" | "ember"
  className?: string
}

/**
 * GlassOverlayCard — layered card composition: a solid gradient card sits
 * behind a frosted glass overlay with masked borders. Text uses
 * background-clip: text for a multi-color gradient reveal.
 *
 * Showpiece component — use for hero moments, not as a repeating content
 * holder. Two color variants: blue (default) or ember.
 */
export function GlassOverlayCard({
  headline = "Transforming technology to serve the people",
  brand = "ARC",
  link = "arclen.com",
  variant = "blue",
  className,
}: GlassOverlayCardProps) {
  const cardW = "21.1em"
  const cardH = "12.8em"
  const offset = "2em"

  // Brand-aligned gradients matching the Blue Accent / Ember CTA system
  const isEmber = variant === "ember"

  const backingGradient = isEmber
    ? [
        "radial-gradient(ellipse 70% 80% at 15% 25%, rgba(255,211,122,0.5) 0%, transparent 60%)",
        "linear-gradient(135deg, #FFAA40 0%, #FF8C42 30%, #F07020 65%, #E85D04 100%)",
      ].join(", ")
    : [
        "radial-gradient(ellipse 70% 80% at 15% 25%, rgba(160,210,255,0.5) 0%, transparent 60%)",
        "linear-gradient(135deg, #4AB4FF 0%, #1A9FF8 30%, #0098F3 65%, #0064F0 100%)",
      ].join(", ")

  const borderAccent = isEmber ? "#E85D04" : "#0064F0"

  // Text-clip gradient — pulls from the chosen palette
  const textClipBackground = isEmber
    ? [
        "linear-gradient(rgba(255,255,255,0) 3.125em, #FFB347 3.375em, #FF8C42 4.5em)",
        "linear-gradient(90deg, #FF8C42 13em, #FFB347 17.1em, transparent 19.1em)",
        "linear-gradient(90deg, rgba(255,255,255,0.5) 4em, rgba(255,255,255,0.2))",
      ].join(", ")
    : [
        "linear-gradient(rgba(255,255,255,0) 3.125em, #4AB4FF 3.375em, #1A9FF8 4.5em)",
        "linear-gradient(90deg, #1A9FF8 13em, #4AB4FF 17.1em, transparent 19.1em)",
        "linear-gradient(90deg, rgba(255,255,255,0.5) 4em, rgba(255,255,255,0.2))",
      ].join(", ")

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        width: cardW,
        height: cardH,
        fontSize: "clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem)",
      }}
    >
      {/* Solid gradient card behind — uses brand accent gradient */}
      <div
        className="absolute rounded-2xl overflow-hidden"
        style={{
          width: cardW,
          height: cardH,
          top: offset,
          left: `calc(${offset} * -1)`,
          backgroundImage: backingGradient,
          boxShadow: `0 0.25em 0.5em rgba(0,0,0,0.25), 0 0 40px ${isEmber ? "rgba(232,93,4,0.20)" : "rgba(0,100,240,0.20)"}`,
        }}
      >
        {/* Subtle reflex highlight on the backing card */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: [
              "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.4)",
              "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.2)",
            ].join(", "),
          }}
        />
      </div>

      {/* Frosted glass card on top */}
      <div
        className="absolute overflow-hidden rounded-2xl"
        style={{
          width: cardW,
          height: cardH,
          top: `calc(${offset} * -1)`,
          left: offset,
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05))",
        }}
      >
        {/* Subtle reflex highlight on the overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: [
              "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.55)",
              "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.15)",
            ].join(", "),
          }}
        />
        {/* Top-left white border fade */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid white",
            maskImage: "linear-gradient(135deg, white, transparent 50%)",
            WebkitMaskImage: "linear-gradient(135deg, white, transparent 50%)",
          }}
        />
        {/* Bottom-right brand border fade */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: `1px solid ${borderAccent}`,
            maskImage: "linear-gradient(135deg, transparent 50%, white)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 50%, white)",
          }}
        />

        {/* Text content with background-clip reveal */}
        <div
          className="relative z-10 flex h-full flex-wrap items-start justify-between p-5"
          style={{
            color: "transparent",
            backgroundImage: textClipBackground,
            backgroundSize: "calc(100% - 4em) 50%, 100% 50%, 100% 100%",
            backgroundPosition: "0 0, 0 100%, 0 0",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <h3
            className="w-3/4 text-[1.5em] font-bold leading-[1.17]"
            style={{ fontFamily: "serif" }}
          >
            {headline}
          </h3>
          <span className="w-1/4 text-end text-[1.5em] font-bold leading-[1.17]">
            {brand}
          </span>
          <span className="mt-auto ml-auto text-[0.75em]">{link}</span>
        </div>
      </div>
    </div>
  )
}
