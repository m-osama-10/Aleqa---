"use client";

import { Moon, Sun, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { useAppStore } from "@/lib/store/app-store";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useAppStore();
  const { lang } = useLang();
  const isRtl = lang === "ar";

  // Cycle through: system → light → dark → system
  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const Icon = theme === "dark" ? Sun : theme === "light" ? Moon : Settings;
  const label =
    theme === "dark"
      ? isRtl ? "ليلي" : "Dark"
      : theme === "light"
      ? isRtl ? "نهاري" : "Light"
      : isRtl ? "تلقائي" : "System";

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className
      )}
      aria-label={isRtl ? "تبديل المظهر" : "Toggle theme"}
      title={isRtl ? "المظهر: " + label : "Theme: " + label}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
