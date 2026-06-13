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
    <SectionWrapper id="testimonials" className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What People Say"
          subtitle="Hear from educators, parents, and students about their MuVidya experience"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <Quote className="h-10 w-10 text-primary-200 mb-6" />
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
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
                  <p className="font-bold text-gray-900">{TESTIMONIALS[current].name}</p>
                  <p className="text-sm text-gray-500">{TESTIMONIALS[current].role}</p>
                  <p className="text-xs text-gray-400">{TESTIMONIALS[current].school}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all"
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
                    index === current ? "w-8 bg-primary-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all"
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