"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { STUDENT_BENEFITS } from "@/lib/constants";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Zap: Icons.Zap,
  Rocket: Icons.Rocket,
  Award: Icons.Award,
  Users: Icons.Users,
  FolderOpen: Icons.FolderOpen,
  MessagesSquare: Icons.MessagesSquare,
};

export function StudentBenefits() {
  return (
    <SectionWrapper id="student-benefits" className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Benefits for Students"
          subtitle="Empowering young minds with future-ready skills and experiences"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-4 group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}