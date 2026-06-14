"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/section-wrapper";
import { MessageCircle } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
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
            <MessageCircle className="h-3 w-3" />
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6"
          >
            Let's{" "}
            <span className="gradient-text">
              Talk STEM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about our products, workshops, or partnership programs?
            We'd love to hear from you. Reach out and our team will respond within 24 hours.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
}