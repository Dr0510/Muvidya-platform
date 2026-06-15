"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/section-wrapper";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-background">
      {/* Background elements - theme aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/[0.06] to-background" />
        <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--color-primary)_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--color-primary)_/_0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 py-20 md:py-28 lg:py-32">
          {/* Left Column */}
          <div className="space-y-8">
            <AnimatedSection delay={100}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                India's Leading STEM Education Platform
              </span>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
                <span className="gradient-text">Learn by Building</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Empower the next generation with hands-on STEM education.
                Robotics workshops, coding programs, and innovative learning experiences
                for schools and students across India.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 text-base font-bold text-amber-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/35 hover:brightness-110 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Free Demo
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/workshops"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface-muted/50 px-8 py-4 text-base font-bold text-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
                >
                  Explore Workshops
                </Link>
              </div>
            </AnimatedSection>

          </div>

          {/* Right Column - Product Image Showcase */}
          <AnimatedSection delay={600} direction="scale" className="hidden lg:block">
            <div className="relative">
              {/* Glow effect behind the image */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-3xl animate-pulse-glow" />
              
              {/* Main product image card */}
              <div className="relative rounded-[2rem] border border-border/40 bg-surface/50 p-4 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5">
                  <Image
                    src="/images/products/n-byte-explorer-kit.jpg"
                    alt="N-Byte Learning Platform"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Badge overlay */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    N-Byte Learning Platform
                  </div>

                  {/* Feature tags at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {["Robotics", "Coding", "AI/ML", "IoT"].map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating secondary image */}
                <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-xl overflow-hidden border-2 border-border/40 shadow-lg rotate-6 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/images/products/n-byte-explorer-kit-2.jpg"
                    alt="N-Byte Learning Platform detail"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}