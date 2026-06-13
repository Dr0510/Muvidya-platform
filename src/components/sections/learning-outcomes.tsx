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
    <SectionWrapper id="outcomes" className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Learning Outcomes"
          subtitle="Developing future-ready skills through hands-on STEM education"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_OUTCOMES.map((outcome, index) => {
            const Icon = iconMap[outcome.icon] || Icons.BrainCircuit;
            return (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${outcome.bgColor} ${outcome.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{outcome.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{outcome.description}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${outcome.color.replace('text-', 'from-').replace('500', '500')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}