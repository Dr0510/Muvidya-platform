"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/section-wrapper";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-950 to-background">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(99_102_241_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(99_102_241_/_0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-36 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <AnimatedSection delay={100}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-100 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>India's Leading STEM Education Platform</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span>Where Young Minds</span>
                <br />
                <span className="gradient-text">Build the Future</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl">
                Empower the next generation with hands-on STEM education.
                Robotics kits, coding workshops, and innovative learning experiences
                for schools and students across India.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                >
                  Book a Free Demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/workshops"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <Play className="h-5 w-5" />
                  Explore Workshops
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">500+</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">Schools Partnered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">50K+</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">Students Impacted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">200+</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">Workshops Done</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={600} direction="scale" className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-primary to-accent blur-2xl opacity-20" />
              <div className="relative rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-6">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary-100">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      N-Byte Explorer Kit
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3">
                      {["Robotics", "Coding", "AI/ML", "IoT"].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}