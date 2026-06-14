"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { LEARNING_OUTCOMES } from "@/lib/constants";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  BrainCircuit: Icons.BrainCircuit,
  Lightbulb: Icons.Lightbulb,
  Palette: Icons.Palette,
  Handshake: Icons.Handshake,
  Monitor: Icons.Monitor,
  Microscope: Icons.Microscope,
};

export function LearningOutcomes() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Students Will Learn"
          subtitle="Our curriculum builds essential 21st-century skills through hands-on project-based learning"
          badge="Learning Outcomes"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {LEARNING_OUTCOMES.map((outcome, index) => {
            const Icon = iconMap[outcome.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-medium hover:border-primary/30"
              >
                <div className={`shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground mb-1">{outcome.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{outcome.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}