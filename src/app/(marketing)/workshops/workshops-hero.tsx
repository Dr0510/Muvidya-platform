"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/section-wrapper";
import { GraduationCap } from "lucide-react";

export function WorkshopsHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient orbs */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15 mb-6"
          >
            <GraduationCap className="h-3 w-3" />
            Hands-On Learning
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6"
          >
            STEM Workshops That{" "}
            <span className="gradient-text">
              Inspire
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            From robotics to AI, our hands-on workshops bring STEM to life. 
            Each session is designed to engage, challenge, and inspire students 
            to explore the world of technology and innovation.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
}