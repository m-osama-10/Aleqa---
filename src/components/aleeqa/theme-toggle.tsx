"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

/* Mounted flag computed via useSyncExternalStore so we render a stable
   placeholder during SSR and the first client paint, then switch to the
   resolved theme on the next tick — avoids hydration mismatch with
   next-themes (which only knows the theme on the client). */
const subscribeMounted = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot
  );

  const isDark = mounted && theme === "dark";
  const label = lang === "ar" ? "الوضع الليلي" : "Dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className
      )}
      aria-label={label}
      title={label}
    >
      {/* Render a stable placeholder icon until mounted to avoid SSR mismatch. */}
      {mounted ? (
        isDark ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
      {mounted
        ? isDark
          ? lang === "ar"
            ? "نهاري"
            : "Light"
          : lang === "ar"
            ? "ليلي"
            : "Dark"
        : ""}
    </button>
  );
}
