
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/app/providers";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const themeLabels: Record<string, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
};

const cycleOrder: ("light" | "dark" | "system")[] = ["light", "dark", "system"];

export function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Icon = mounted ? themeIcons[theme] : Sun;
  const label = mounted ? themeLabels[theme] : themeLabels.light;
  const nextTheme = mounted ? cycleOrder[(cycleOrder.indexOf(theme) + 1) % cycleOrder.length] : "dark";
  const nextLabel = mounted ? themeLabels[nextTheme] : themeLabels.dark;

  // Determine if the current theme matches system (for visual indicator)
  const isUsingSystem = mounted && theme === "system";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200",
        "hover:bg-surface-muted/80 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none",
        "border-border/60 text-foreground bg-surface/50"
      )}
      aria-label={mounted ? `Switch to ${nextLabel}` : "Toggle theme"}
      title={mounted ? label : "Toggle theme"}
    >
      <span className="relative flex items-center justify-center">
        {mounted && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "flex items-center justify-center",
                theme === "light" && "text-amber-500",
                theme === "dark" && "text-indigo-400",
                theme === "system" && "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </AnimatePresence>
        )}

        {!mounted && (
          <span className="flex items-center justify-center text-amber-500">
            <Sun className="h-4 w-4" aria-hidden="true" />
          </span>
        )}

        {/* System auto-detection dot indicator */}
        {isUsingSystem && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full",
              resolvedTheme === "dark" ? "bg-indigo-400" : "bg-amber-500"
            )}
          />
        )}
      </span>

      {/* Tooltip */}
      <span
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-surface px-2 py-1 text-[11px] font-medium text-foreground shadow-sm",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        )}
        role="tooltip"
      >
        {label}
      </span>
    </button>
  );
}
