"use client";

import Link from "next/link";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "STEM Kits", href: "/products" },
    { label: "N-Byte Explorer", href: "/products/n-byte-explorer" },
    { label: "Workshops", href: "/workshops" },
    { label: "Brochures", href: "/brochures" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">{SITE_CONFIG.name}</span>
                <p className="text-[10px] text-gray-500 tracking-wider uppercase">{SITE_CONFIG.tagline}</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of innovators with hands-on STEM education, 
              robotics kits, and coding workshops across India.
            </p>
            <div className="space-y-3">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.email}
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {[
                { label: "Facebook", href: SITE_CONFIG.social.facebook },
                { label: "Instagram", href: SITE_CONFIG.social.instagram },
                { label: "YouTube", href: SITE_CONFIG.social.youtube },
                { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
                { label: "Twitter", href: SITE_CONFIG.social.twitter },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-400 transition-colors text-sm font-medium"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}