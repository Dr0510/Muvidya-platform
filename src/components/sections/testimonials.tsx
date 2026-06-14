"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Avatar } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <SectionWrapper className="bg-background border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What People Say"
          subtitle="Hear from educators, parents, and students about their MuVidya experience"
          badge="Testimonials"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border/50 bg-card p-8 md:p-10 shadow-sm"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-5" />
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-7">
                &ldquo;{TESTIMONIALS[current].content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <Avatar
                  src={TESTIMONIALS[current].image}
                  alt={TESTIMONIALS[current].name}
                  fallback={TESTIMONIALS[current].name.split(" ").map(n => n[0]).join("")}
                  size="lg"
                />
                <div>
                  <p className="font-bold text-foreground">{TESTIMONIALS[current].name}</p>
                  <p className="text-sm text-muted-foreground">{TESTIMONIALS[current].role}</p>
                  <p className="text-xs text-muted-foreground/60">{TESTIMONIALS[current].school}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-border/50 bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-border/50 bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}