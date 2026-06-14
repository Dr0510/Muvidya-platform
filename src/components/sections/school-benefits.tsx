"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { SCHOOL_BENEFITS } from "@/lib/constants";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen: Icons.BookOpen,
  GraduationCap: Icons.GraduationCap,
  FlaskConical: Icons.FlaskConical,
  BarChart3: Icons.BarChart3,
};

export function SchoolBenefits() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Benefits for Schools"
          subtitle="Comprehensive STEM education solutions designed for institutions"
          badge="For Schools"
        />

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {SCHOOL_BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevation-high hover:border-primary/20"
              >
                {/* Gradient accent strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} opacity-40`} />

                <div className="flex items-start gap-5">
                  <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}