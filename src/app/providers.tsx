"use client";

import { createContext, Suspense, useContext, useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AnalyticsProvider } from "@/lib/analytics";
import { ClerkProvider } from "@clerk/nextjs";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "muvidya-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function AnalyticsProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </Suspense>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getPreferredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
  }, [theme, mounted]);

  const setTheme = (nextTheme: Theme) => setThemeState(nextTheme);

  const toggleTheme = () => {
    setThemeState((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeStatus mounted={mounted} />
    </ThemeContext.Provider>
  );
}

function ThemeStatus({ mounted }: { mounted: boolean }) {
  useEffect(() => {
    if (!mounted) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
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