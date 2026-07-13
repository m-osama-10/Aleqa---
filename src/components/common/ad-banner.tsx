"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { fetchActiveAds, trackAdImpression, trackAdClick } from "@/lib/services/ads";
import { useAppStore } from "@/lib/store/app-store";
import type { Ad, AdPlacement } from "@/types/db";
import { useLang } from "@/lib/i18n";

interface AdBannerProps {
  placement?: AdPlacement;
  className?: string;
}

/** Dynamic ad banner loaded from Supabase. Dismissible per-session. */
export function AdBanner({ placement = "home", className = "" }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const { settings } = useAppStore();
  const { lang } = useLang();
  const isRtl = lang === "ar";

  useEffect(() => {
    if (settings.ads_enabled === false) return;
    let active = true;
    fetchActiveAds(placement).then((ads) => {
      if (active && ads.length) setAd(ads[0]);
    });
    return () => {
      active = false;
    };
  }, [placement, settings.ads_enabled]);

  useEffect(() => {
    if (ad?.id) trackAdImpression(ad.id);
  }, [ad?.id]);

  if (!ad || dismissed || settings.ads_enabled === false) return null;

  const handleclick = () => {
    trackAdClick(ad.id);
    if (ad.link_url) window.open(ad.link_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-emerald-500/5 shadow-sm ${className}`}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground hover:text-foreground"
        aria-label={isRtl ? "إغلاق" : "Dismiss"}
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex gap-3 p-3 sm:p-4">
        {ad.image_url && (
           
          <img
            src={ad.image_url}
            alt={ad.title}
            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
            loading="lazy"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="mb-1 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
            {isRtl ? "إعلان" : "SPONSORED"}
          </span>
          <h4 className="line-clamp-1 text-sm font-bold text-foreground">{ad.title}</h4>
          {ad.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {ad.description}
            </p>
          )}
          {ad.button_text && (
            <button
              onClick={handleclick}
              className="mt-2 inline-flex w-fit items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              {ad.button_text}
              <ExternalLink className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
