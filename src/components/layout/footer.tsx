"use client";

import Link from "next/link";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">{SITE_CONFIG.name}</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of innovators with hands-on STEM education, 
              robotics kits, and coding workshops across India.
            </p>
            <div className="space-y-2.5">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              {[
                { label: "Facebook", href: SITE_CONFIG.social.facebook },
                { label: "Instagram", href: SITE_CONFIG.social.instagram },
                { label: "YouTube", href: SITE_CONFIG.social.youtube },
                { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
                { label: "Twitter / X", href: SITE_CONFIG.social.twitter },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Programs</h4>
            <ul className="space-y-3">
              {["School Partnership", "Workshops", "Teacher Training", "STEM Labs", "Online Courses"].map(
                (program) => (
                  <li key={program}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span>{program}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}