"use client";

import { AnimatedSection } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Bot, Code, Brain, Cpu, Clock, Users, School, Award } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Code,
  Brain,
  Cpu,
};

const WORKSHOPS = [
  {
    value: "robotics",
    label: "Robotics",
    icon: "Bot",
    description:
      "Build and program robots from scratch. Learn about motors, sensors, and autonomous systems through hands-on projects.",
    duration: "1-3 days",
    level: "Beginner to Advanced",
    color: "from-cyan-500 to-blue-600",
  },
  {
    value: "coding",
    label: "Coding & Programming",
    icon: "Code",
    description:
      "Master programming fundamentals with block-based coding, Python, and C++. Create games, apps, and animations.",
    duration: "2-5 days",
    level: "Beginner to Advanced",
    color: "from-violet-500 to-purple-600",
  },
  {
    value: "ai",
    label: "Artificial Intelligence",
    icon: "Brain",
    description:
      "Explore the world of AI and machine learning. Build intelligent systems that can see, speak, and make decisions.",
    duration: "2-4 days",
    level: "Intermediate to Advanced",
    color: "from-rose-500 to-pink-600",
  },
  {
    value: "iot",
    label: "IoT & Electronics",
    icon: "Cpu",
    description:
      "Connect the physical world to the digital. Build smart devices, environmental monitors, and home automation systems.",
    duration: "2-3 days",
    level: "Intermediate to Advanced",
    color: "from-emerald-500 to-teal-600",
  },
];

const FEATURES = [
  { icon: Clock, label: "Flexible Duration", desc: "1 to 5 day programs" },
  { icon: Users, label: "Small Batches", desc: "Max 30 students per session" },
  { icon: School, label: "On-Site & Online", desc: "At your school or virtually" },
  { icon: Award, label: "Certification", desc: "Certificates for all participants" },
];

export function WorkshopsList() {
  return (
    <>
      {/* Workshop Categories */}
      <section className="py-16 md:py-20 bg-surface-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Workshop Categories"
            title="Choose Your STEM Adventure"
            subtitle="From robotics to AI, find the perfect workshop for your students. All materials and equipment provided."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {WORKSHOPS.map((workshop) => {
              const Icon = ICON_MAP[workshop.icon] || Bot;
              return (
                <AnimatedSection key={workshop.value} className="h-full">
                  <div className="group relative h-full rounded-2xl border border-border/70 bg-surface p-6 md:p-8 transition-all duration-300 hover:shadow-elevation-high hover:-translate-y-1.5">
                    <div className="flex items-start gap-5">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${workshop.color} text-white shadow-sm`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {workshop.label}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {workshop.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground border border-border/40">
                            <Clock className="h-3 w-3" />
                            {workshop.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground border border-border/40">
                            <Users className="h-3 w-3" />
                            {workshop.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshop Features */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Choose Us"
            title="Workshop Experience"
            subtitle="Every workshop is designed to provide maximum learning impact with minimal disruption to your school schedule."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.label}>
                  <div className="flex flex-col items-center text-center rounded-2xl border border-border/70 bg-surface p-6 transition-all duration-300 hover:shadow-elevation-medium hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {feature.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}