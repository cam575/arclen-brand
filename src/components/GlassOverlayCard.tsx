"use client"

interface GlassOverlayCardProps {
  /** Headline text — uses serif font. */
  headline?: string
  /** Brand initials shown top-right. */
  brand?: string
  /** Footer link/url. */
  link?: string
  className?: string
}

/**
 * GlassOverlayCard — layered card composition: a solid blue gradient card
 * sits behind a frosted glass overlay with masked borders. Text uses
 * background-clip: text for a multi-color gradient reveal.
 */
export function GlassOverlayCard({
  headline = "Transforming technology to serve the people",
  brand = "ARC",
  link = "arclen.com",
  className,
}: GlassOverlayCardProps) {
  const cardW = "21.1em"
  const cardH = "12.8em"
  const offset = "2em"

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        width: cardW,
        height: cardH,
        fontSize: "clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem)",
      }}
    >
      {/* Solid gradient card behind */}
      <div
        className="absolute rounded-2xl"
        style={{
          width: cardW,
          height: cardH,
          top: offset,
          left: `calc(${offset} * -1)`,
          background: "linear-gradient(90deg, #0064F0, #0098f3)",
          boxShadow: "0 0.25em 0.375em rgba(0,0,0,0.1)",
        }}
      />

      {/* Frosted glass card on top */}
      <div
        className="absolute overflow-hidden rounded-2xl"
        style={{
          width: cardW,
          height: cardH,
          top: `calc(${offset} * -1)`,
          left: offset,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
        }}
      >
        {/* Top-left white border fade */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid white",
            maskImage: "linear-gradient(135deg, white, transparent 50%)",
            WebkitMaskImage: "linear-gradient(135deg, white, transparent 50%)",
          }}
        />
        {/* Bottom-right blue border fade */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid #0064F0",
            maskImage: "linear-gradient(135deg, transparent 50%, white)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 50%, white)",
          }}
        />

        {/* Text content with background-clip reveal */}
        <div
          className="relative z-10 flex h-full flex-wrap items-start justify-between p-5"
          style={{
            color: "transparent",
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0) 3.125em, #6690ff 3.375em, #80e8e0 4.5em)",
              "linear-gradient(90deg, #80e8e0 13em, #6690ff 17.1em, transparent 19.1em)",
              "linear-gradient(90deg, rgba(255,255,255,0.5) 4em, rgba(255,255,255,0.2))",
            ].join(", "),
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
