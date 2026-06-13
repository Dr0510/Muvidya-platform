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
    <SectionWrapper id="school-benefits" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Benefits for Schools"
          subtitle="Comprehensive STEM education solutions for educational institutions"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {SCHOOL_BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Icons.BookOpen;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-primary-100 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}