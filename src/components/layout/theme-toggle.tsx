"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200",
        "hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-primary/30",
        isDark
          ? "border-border text-foreground bg-surface/60"
          : "border-border text-foreground bg-surface/60"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}