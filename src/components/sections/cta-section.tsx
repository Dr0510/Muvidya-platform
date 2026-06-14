"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/section-wrapper";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-14 shadow-2xl shadow-indigo-500/25">
            {/* Background orbs */}
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            {/* Premium grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="relative flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
                <Sparkles className="h-3 w-3" />
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 max-w-2xl">
                Ready to Transform Your STEM Education?
              </h2>
              <p className="text-white/85 text-sm md:text-base max-w-xl mb-8">
                Join 500+ schools across India already using MuVidya to inspire the next generation of innovators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-amber-950 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
                >
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/12 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
