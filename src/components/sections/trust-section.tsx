"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedSection } from "@/components/shared/section-wrapper";
import { STATS } from "@/lib/constants";
import { Sparkles, Building2, Users, GraduationCap, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const statIcons = [Building2, Users, GraduationCap, Trophy];

export function TrustSection() {
  return (
    <SectionWrapper className="bg-muted/30 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15 mb-4">
            <Sparkles className="h-3 w-3" />
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Trusted by Schools Across India
          </h2>
          <p className="mt-3 text-muted-foreground">
            Numbers speak louder than words — here's our reach so far
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevation-medium hover:border-primary/30"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 mx-auto transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}