"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/section-wrapper";
import { Newspaper } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15 mb-6"
          >
            <Newspaper className="h-3 w-3" />
            Blog & Resources
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6"
          >
            Insights & Ideas for{" "}
            <span className="gradient-text">
              STEM Education
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Tips, project ideas, success stories, and the latest in STEM education 
            from the MuVidya team. Stay inspired and informed.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
}