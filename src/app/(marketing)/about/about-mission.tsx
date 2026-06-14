"use client";

import { AnimatedSection } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Lightbulb, Heart, Target, Eye } from "lucide-react";

const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We believe in learning by doing. Our hands-on approach sparks curiosity and encourages creative problem-solving through real-world projects.",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Passion for Education",
    description:
      "Every product and workshop is designed with love for teaching. We're committed to making quality STEM education accessible to all students.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Target,
    title: "Quality Assured",
    description:
      "From curriculum alignment to hardware durability, we maintain the highest standards. Our kits are tested, trusted, and loved by 500+ schools.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Eye,
    title: "Future-Ready Skills",
    description:
      "We prepare students for tomorrow's world. Coding, robotics, AI — our programs build the skills that matter for 21st-century careers.",
    gradient: "from-violet-600 to-purple-500",
  },
];

export function AboutMission() {
  return (
    <section className="py-16 md:py-20 bg-surface-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Mission"
          title="Why We Do What We Do"
          subtitle="At MuVidya, we're driven by a simple belief: every child is born curious. Our mission is to nurture that curiosity and turn it into a lifelong love for learning and innovation."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} className="h-full">
                <div className="group relative h-full rounded-2xl border border-border/70 bg-surface p-6 transition-all duration-300 hover:shadow-elevation-high hover:-translate-y-1.5">
                  {/* Gradient icon */}
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}