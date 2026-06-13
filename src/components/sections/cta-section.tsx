"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Start Your STEM Journey Today</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ready to Empower the Next Generation of Innovators?
          </h2>
          
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Join 500+ schools across India in transforming STEM education. 
            Get hands-on with MuVidya's comprehensive learning solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-600 font-bold text-lg hover:shadow-xl hover:shadow-black/20 transition-all duration-200 hover:scale-105"
            >
              Book a Free Demo
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              Explore Products
            </Link>
          </div>

          <p className="text-sm text-primary-200/80">
            No commitment required. Free consultation and demo for schools.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}