"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { STATS } from "@/lib/constants";
import { Award, Building2, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Award, Building2, GraduationCap, Users];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function TrustSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-surface-muted to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {STATS.map((stat, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-colors duration-300 hover:border-primary/20 hover:bg-surface-muted"
              >
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}