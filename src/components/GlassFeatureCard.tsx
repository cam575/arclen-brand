"use client"

const RING_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 487 487'%3E%3Ccircle cx='243' cy='243.5' r='233' style='fill:none;opacity:.1;stroke:%23aaa;stroke-linecap:round;stroke-miterlimit:10;stroke-width:18px'/%3E%3Ccircle cx='243.5' cy='243.5' r='243' style='fill:none;stroke:%23111;stroke-linecap:round;stroke-miterlimit:10'/%3E%3Ccircle cx='243' cy='243.5' r='222' style='fill:none;stroke:%23111;stroke-linecap:round;stroke-miterlimit:10'/%3E%3Cpath d='m10,243.5C10,114.82,114.32,10.5,243,10.5' style='fill:none;stroke:%23ddd;stroke-linecap:round;stroke-miterlimit:10;stroke-width:18px'/%3E%3C/svg%3E`

interface GlassFeatureCardProps {
  /** Hero image URL — typically the torus. */
  imageSrc?: string
  imageAlt?: string
  title?: string
  body?: string
  buttonLabel?: string
  onButtonClick?: () => void
}

/**
 * GlassFeatureCard — premium feature card with three wobbling accent cards
 * behind it, two rotating ring ornaments, a top light bar, and a hero image.
 *
 * Requires keyframes `glass-wobble` and `glass-rotate` (shipped in
 * arclen-brand/src/glass.css).
 *
 * The component renders absolutely-positioned ornaments around its center, so
 * place it inside a `relative` container that's at least 700px tall × 600px wide.
 */
export function GlassFeatureCard({
  imageSrc = "/images/torus/torus-v3.png",
  imageAlt = "",
  title = "Design Smarter, Not Harder",
  body = "Unlock powerful tools to create pixel-perfect designs in record time.",
  buttonLabel = "Get Started",
  onButtonClick,
}: GlassFeatureCardProps) {
  return (
    <>
      {/* Accent cards — wobbling behind */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {[18, 22, 26].map((dur, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 top-[10%] mx-auto h-[500px] w-[330px] rounded-2xl opacity-80"
            style={{
              zIndex: -1,
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow:
                "inset 0 2px 2px 0 rgba(232,93,4,0.15), inset 0 -2px 2px 0 rgba(0,0,0,0.15)",
              transformOrigin: "20% 80%",
              animation: `glass-wobble ${dur}s ease-in-out ${
                i === 1 ? "-6s" : i === 2 ? "-18s" : "0s"
              } infinite ${i === 1 ? "reverse" : "normal"}`,
            }}
          />
        ))}

        {/* Rotating ring — left */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            left: "calc(50% - 230px)",
            top: "264px",
            width: "164px",
            height: "164px",
            zIndex: -2,
            backgroundImage: `url("${RING_SVG}")`,
            backgroundSize: "contain",
            animation: "glass-rotate 22s linear infinite",
          }}
        />
        {/* Rotating ring — right (smaller) */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            left: "calc(50% + 100px)",
            top: "142px",
            width: "100px",
            height: "100px",
            zIndex: -2,
            backgroundImage: `url("${RING_SVG}")`,
            backgroundSize: "contain",
            animation: "glass-rotate 18s linear -10s infinite",
          }}
        />

        {/* Top light bar */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[calc(10%-42px)] mx-auto h-[6px] w-[284px] rounded-[10px]"
          style={{
            background: "#fffef9",
            boxShadow:
              "0 0 1px 1px #ffc78e, 0 1px 2px 1px rgba(255,148,41,0.47), 0 2px 6px 1px rgba(233,139,45,0.47), 0 4px 12px 0 rgba(255,158,61,0.6), 0 12px 20px 12px rgba(255,128,0,0.27)",
          }}
        />
      </div>

      {/* Main card — absolutely positioned to share coordinate system with the
          accent cards (top-[10%]) so the top light bar sits 42px ABOVE the card. */}
      <div
        className="absolute left-1/2 top-[10%] flex h-[500px] w-[320px] -translate-x-1/2 flex-col justify-end rounded-2xl p-6 pr-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(41,41,41,0.67) 0%, rgba(25,25,25,0.8) 50%)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          boxShadow:
            "inset 0 2px 2px 0 rgba(231,196,160,0.5), inset 0 -2px 2px 0 rgba(0,0,0,0.2)",
          color: "#ccc",
          textShadow: "1px 1px 3px rgba(51,51,51,0.67)",
        }}
      >
        {/* Hero image (torus by default) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={imageAlt}
          src={imageSrc}
          className="pointer-events-none absolute left-0 right-0 top-8 mx-auto w-[80%] select-none object-contain"
        />

        <h2 className="mb-2 mt-2 text-[1.1em] font-semibold">{title}</h2>
        <p className="mb-2 text-[0.9em] font-bold text-white/50">{body}</p>

        {/* Button */}
        <div
          onClick={onButtonClick}
          className="mt-3 w-fit cursor-pointer rounded-full px-9 py-2 text-[14px]"
          style={{
            background: "rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.12), inset 120px 0 100px -100px rgba(0,0,0,0.8), 0 0 0 0 rgba(255,255,255,0.04)",
            transition: "box-shadow 400ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 0 1px rgba(255,255,255,0.12), inset 200px 0 100px -100px rgba(0,0,0,0.67), -4px 0 8px 2px rgba(255,255,255,0.08)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 0 1px rgba(255,255,255,0.12), inset 120px 0 100px -100px rgba(0,0,0,0.8), 0 0 0 0 rgba(255,255,255,0.04)"
          }}
        >
          {buttonLabel}
        </div>
      </div>
    </>
  )
}
