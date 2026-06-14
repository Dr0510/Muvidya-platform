"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AnalyticsProvider } from "@/lib/analytics";
import { ClerkProvider } from "@clerk/nextjs";

declare global {
  interface Window {
    __INITIAL_THEME__?: string;
  }
}

export type Theme = "light" | "dark" | "system";
type ThemeContextValue = {
  /** The user's chosen theme preference (light, dark, or system) */
  theme: Theme;
  /** The actual resolved theme after applying system preference */
  resolvedTheme: "light" | "dark";
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Cycle through: light → dark → system → light */
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "muvidya-theme";

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage may be unavailable
  }
  return null;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemTheme();
  return theme;
}

function AnalyticsProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </Suspense>
  );
}

function getInitialSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  // Use the global set by the inline script in layout.tsx for SSR consistency
  if (typeof window.__INITIAL_THEME__ !== "undefined") {
    return window.__INITIAL_THEME__ as Theme;
  }
  const stored = getStoredTheme();
  if (stored) return stored;
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from the global set by the inline <script> for SSR consistency
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  // Initialize systemDark for SSR consistency
  const [systemDark, setSystemDark] = useState(getInitialSystemDark);
  const [mounted, setMounted] = useState(false);
  const initialSyncDone = useRef(false);

  // Resolved theme for actual use
  const resolvedTheme: "light" | "dark" = useMemo(() => {
    if (theme === "system") return systemDark ? "dark" : "light";
    return theme;
  }, [theme, systemDark]);

  // Listen to system preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);

    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!initialSyncDone.current) {
      initialSyncDone.current = true;
      // Sync dataset if it doesn't match resolved theme
      const stored = getStoredTheme();
      if (stored && stored !== "system") {
        // User had a specific preference stored
        if (document.documentElement.dataset.theme !== stored) {
          document.documentElement.dataset.theme = stored;
        }
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply smooth transition class
    document.documentElement.classList.add("theme-transitioning");

    // Apply resolved theme to dataset
    document.documentElement.dataset.theme = resolvedTheme;

    // Store user's chosen preference (not resolved)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage may be unavailable
    }

    // Remove transitioning class after animation
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 400);

    return () => clearTimeout(timeout);
  }, [resolvedTheme, theme, mounted]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      if (current === "light") return "dark";
      if (current === "dark") return "system";
      return "light";
    });
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeSync mounted={mounted} />
    </ThemeContext.Provider>
  );
}

function ThemeSync({ mounted }: { mounted: boolean }) {
  useEffect(() => {
    if (!mounted) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        const valid = event.newValue === "light" || event.newValue === "dark" || event.newValue === "system";
        if (valid) {
          const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          const resolved = event.newValue === "system" ? systemPref : event.newValue;
          document.documentElement.dataset.theme = resolved;
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [mounted]);

  return null;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <AnalyticsProviderWrapper>
          {children}
        </AnalyticsProviderWrapper>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgb(var(--color-surface))",
              color: "rgb(var(--color-foreground))",
              border: "1px solid rgb(var(--color-border))",
              borderRadius: "12px",
              fontSize: "14px",
              boxShadow: "var(--shadow-md)",
            },
            success: {
              iconTheme: {
                primary: "rgb(var(--color-success))",
                secondary: "rgb(var(--color-primary-foreground))",
              },
            },
            error: {
              iconTheme: {
                primary: "rgb(var(--color-destructive))",
                secondary: "rgb(var(--color-primary-foreground))",
              },
            },
          }}
        />
      </ThemeProvider>
    </ClerkProvider>
  );
}