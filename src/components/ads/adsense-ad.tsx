"use client";

import { useEffect, useRef } from "react";

/**
 * Google AdSense ad unit component.
 *
 * Usage:
 *   <AdSenseAd slot="1234567890" format="auto" />
 *
 * The AdSense library (adsbygoogle.js) is loaded globally in layout.tsx.
 * This component pushes an ad request to the AdSense queue on mount.
 *
 * Props:
 *   - slot: the ad slot ID (from your AdSense dashboard)
 *   - format: "auto" (default) | "fluid" | "rectangle" | "horizontal" | "vertical"
 *   - responsive: true (default) — enables responsive ads
 *   - layout: optional layout key (e.g. "in-article")
 *   - style: optional inline styles
 *   - className: optional CSS classes
 */
export function AdSenseAd({
  slot,
  format = "auto",
  responsive = true,
  layout,
  style,
  className = "",
}: {
  slot: string;
  format?: string;
  responsive?: boolean;
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Push the ad to the AdSense queue
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ??=
        []).push({});
    } catch {
      // AdSense not loaded yet or blocked — silently ignore
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-3474575203383848"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
      {...(layout ? { "data-ad-layout": layout } : {})}
    />
  );
}
