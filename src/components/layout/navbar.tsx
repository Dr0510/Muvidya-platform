"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { Menu, X, Sparkles, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { isSignedIn } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-surface/85 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 group" aria-label={`${SITE_CONFIG.name} home`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:block">
              {SITE_CONFIG.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isSignedIn ? (
            <div className="flex items-center gap-3 border-l border-border pl-3">
              <Link
                href="/admin/dashboard"
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-full ring-2 ring-primary/20",
                  },
                }}
              />
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign In
            </Link>
          )}

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Book Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-muted md:hidden"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-surface md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <ThemeToggle />
                <span className="text-sm font-semibold text-muted-foreground">
                  {isSignedIn ? "Signed in" : "Guest"}
                </span>
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="grid grid-cols-1 gap-3 pt-3">
                {isSignedIn ? (
                  <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center justify-center rounded-xl bg-surface-muted px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    Open Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-muted px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign In
                  </Link>
                )}

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/25"
                >
                  Book a Free Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}