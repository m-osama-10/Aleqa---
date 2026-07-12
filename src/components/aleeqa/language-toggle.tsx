"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className
      )}
      aria-label="Toggle language"
      title={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "ar" ? "EN" : "ع"}
    </button>
  );
}
