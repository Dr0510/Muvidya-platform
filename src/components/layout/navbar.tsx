"use client";

import { forwardRef, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import type { NavItem } from "@/lib/constants";
import {
  X,
  LogIn,
  LayoutDashboard,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

/* ───────────────────────────────────────────
   Animation Variants
   ─────────────────────────────────────────── */

const MOBILE_OVERLAY = {
  closed: { opacity: 0, transition: { duration: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
} satisfies Record<string, { opacity: number; transition?: { duration: number } }>;

const MOBILE_PANEL = {
  closed: { x: "100%" },
  open: {
    x: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 300, mass: 0.8 },
  },
} satisfies Record<string, { x: number | string; transition?: Record<string, unknown> }>;

const MOBILE_ITEM = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
} satisfies Record<string, unknown>;

const DROPDOWN_VARIANTS = {
  closed: {
    opacity: 0,
    y: -4,
    scaleY: 0.95,
    transition: { duration: 0.15, ease: "easeIn" as const },
    pointerEvents: "none" as const,
  },
  open: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
    pointerEvents: "auto" as const,
  },
} satisfies Record<string, unknown>;

/* ───────────────────────────────────────────
   Desktop NavLink Component
   ─────────────────────────────────────────── */

function DesktopNavLink({
  item,
  pathname,
  index,
}: {
  item: NavItem;
  pathname: string;
  index: number;
}) {
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);
  const hasDropdown = item.children && item.children.length > 0;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const content = (
    <>
      <span
        className={cn(
          "relative z-10 flex items-center gap-1.5 transition-colors duration-200",
          isActive ? "text-primary" : "text-muted-foreground group-hover/nav:text-foreground"
        )}
      >
        {item.label}
        {hasDropdown && (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              dropdownOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}
      </span>

      {/* Active/underline indicator - clean single line */}
      <span
        className={cn(
          "absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-primary",
          "origin-left transition-transform duration-300 ease-out",
          isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-75"
        )}
        aria-hidden="true"
      />
    </>
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={triggerRef}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={hasDropdown ? dropdownOpen : undefined}
        aria-haspopup={hasDropdown ? "true" : undefined}
        className={cn(
          "group/nav relative flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold",
          "transition-all duration-200",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
          "hover:bg-primary/8"
        )}
      >
        {content}
      </Link>

      {/* Dropdown menu */}
      {hasDropdown && (
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              variants={DROPDOWN_VARIANTS}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "absolute left-0 top-full mt-1 w-56 origin-top",
                "rounded-xl border border-border/60 bg-surface/95 backdrop-blur-xl shadow-lg shadow-black/5"
              )}
              role="menu"
              aria-label={`${item.label} sub-navigation`}
            >
              <div className="p-1.5">
                {item.children!.map((child) => {
                  const isChildActive =
                    pathname === child.href ||
                    pathname.startsWith(`${child.href.split("?")[0]}/`);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      role="menuitem"
                      aria-current={isChildActive ? "page" : undefined}
                      className={cn(
                        "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                        isChildActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-surface-muted/80 hover:text-foreground"
                      )}
                    >
                      <span className="font-semibold">{child.label}</span>
                      {child.description && (
                        <span className="text-xs text-muted-foreground/70">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────
   Mobile NavItem Component
   ─────────────────────────────────────────── */

function MobileNavItem({
  item,
  pathname,
  index,
}: {
  item: NavItem;
  pathname: string;
  index: number;
}) {
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);
  const hasDropdown = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(false);

  // Close expanded on route change
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <motion.div
      custom={index}
      variants={MOBILE_ITEM}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="flex flex-col">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200",
            isActive
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-muted-foreground hover:bg-surface-muted/70 hover:text-foreground"
          )}
          onClick={(e) => {
            if (hasDropdown) {
              e.preventDefault();
              setExpanded(!expanded);
            }
          }}
        >
          <span>{item.label}</span>
          <span className="flex items-center gap-1.5">
            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
            {hasDropdown && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden="true"
              />
            )}
          </span>
        </Link>

        {/* Mobile sub-items */}
        <AnimatePresence>
          {hasDropdown && expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-border/40 pl-3">
                {item.children!.map((child) => {
                  const isChildActive =
                    pathname === child.href ||
                    pathname.startsWith(`${child.href.split("?")[0]}/`);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={isChildActive ? "page" : undefined}
                      className={cn(
                        "flex flex-col rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                        isChildActive
                          ? "bg-primary/5 text-primary"
                          : "text-muted-foreground hover:bg-surface-muted/50 hover:text-foreground"
                      )}
                    >
                      <span className="font-medium">{child.label}</span>
                      {child.description && (
                        <span className="text-xs text-muted-foreground/60">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   Hamburger Button (morphing animation)
   ─────────────────────────────────────────── */

const HamburgerButton = forwardRef<
  HTMLButtonElement,
  { isOpen: boolean; onClick: () => void }
>(function HamburgerButton({ isOpen, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors duration-200 hover:bg-surface-muted/80 md:hidden"
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-panel"
    >
      <div className="flex w-5 flex-col items-center justify-center gap-[4.5px]">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="block h-[2px] w-5 rounded-full bg-current origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block h-[2px] w-5 rounded-full bg-current"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="block h-[2px] w-5 rounded-full bg-current origin-center"
        />
      </div>
    </button>
  );
});

/* ───────────────────────────────────────────
   Navbar Main Component
   ─────────────────────────────────────────── */

export function Navbar() {
  const { isSignedIn } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Track scroll position
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Body scroll lock
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Focus trap & Escape key for mobile menu
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-sm shadow-black/5 border-b border-border/40"
          : "bg-transparent border-b border-transparent"
      )}
      role="banner"
    >

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* ── Logo ── */}
        <Link
          href="/"
          className={cn(
            "relative flex min-w-0 shrink-0 items-center gap-3 group",
            scrolled && "scale-95"
          )}
          style={{ transition: "transform 0.3s ease" }}
          aria-label={`${SITE_CONFIG.name} home`}
        >
          {/* Logo image */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-600 opacity-15" />
            <Image
              src="/images/brand/muvidya-logo.png"
              alt={`${SITE_CONFIG.name} logo`}
              width={36}
              height={36}
              className="relative h-8 w-8 object-contain"
              priority
            />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="truncate text-sm font-bold tracking-tight text-foreground sm:text-base">
              {SITE_CONFIG.name}
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item, i) => (
            <DesktopNavLink
              key={item.href}
              item={item}
              pathname={pathname}
              index={i}
            />
          ))}
        </nav>

        {/* ── Desktop Right Actions ── */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />

          {isSignedIn ? (
            <div className="flex items-center gap-2.5 border-l border-border/60 pl-3">
              <Link
                href="/admin/dashboard"
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
                  "text-muted-foreground transition-all duration-200",
                  "hover:bg-primary/5 hover:text-primary hover:border-primary/30",
                  "border border-transparent"
                )}
              >
                <LayoutDashboard className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-9 w-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-surface transition-all duration-200 hover:ring-primary/40",
                  },
                }}
              />
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
                "text-muted-foreground transition-all duration-200",
                "hover:bg-primary/5 hover:text-primary hover:border-primary/30",
                "border border-border/60 bg-surface-muted/80"
              )}
            >
              <LogIn
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span>Sign In</span>
            </Link>
          )}

          {/* Primary CTA */}
          <Link
            href="/contact"
            className={cn(
              "group relative inline-flex items-center gap-2 rounded-xl",
              "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-amber-950",
              "shadow-sm shadow-amber-500/25 transition-all duration-300",
              "hover:shadow-md hover:shadow-amber-500/35 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
            )}
          >
            <Calendar className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <span>Book Free Demo</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <HamburgerButton
            ref={hamburgerRef}
            isOpen={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* ── Mobile Navigation (Slide-out Drawer) ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              variants={MOBILE_OVERLAY}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              ref={mobilePanelRef}
              id="mobile-navigation-panel"
              key="mobile-panel"
              variants={MOBILE_PANEL}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw]",
                "bg-surface/95 backdrop-blur-2xl",
                "flex flex-col shadow-2xl shadow-black/10 md:hidden"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label={`${SITE_CONFIG.name} home`}
                >
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary-600 opacity-15" />
                    <Image
                      src="/images/brand/muvidya-logo.png"
                      alt={`${SITE_CONFIG.name} logo`}
                      width={28}
                      height={28}
                      className="relative h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-foreground">
                    {SITE_CONFIG.name}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted/80 hover:text-foreground"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-4"
                aria-label="Mobile navigation"
              >
                <div className="flex flex-col gap-0.5">
                  {NAV_ITEMS.map((item, i) => (
                    <MobileNavItem
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      index={i}
                    />
                  ))}
                </div>
              </nav>

              {/* Bottom CTA Section (sticky) */}
              <div className="px-4 py-4 flex flex-col gap-3">
                {isSignedIn ? (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:from-primary/15 hover:to-primary/10"
                  >
                    <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                    Open Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface-muted/80 px-4 py-3.5 text-sm font-bold text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign In
                  </Link>
                )}

                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 py-3.5 text-sm font-bold text-amber-950 shadow-sm shadow-amber-500/25 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/35 hover:brightness-110"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book a Free Demo</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}