"use client";

import { AnimatedSection } from "@/components/shared/section-wrapper";
import { STATS } from "@/lib/constants";

export function AboutStats() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-14 shadow-2xl shadow-indigo-500/25">
          {/* Background orbs */}
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STATS.map((stat, index) => (
              <AnimatedSection key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium">
                  {stat.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}