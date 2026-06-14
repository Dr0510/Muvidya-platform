"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Smart Home Automation",
    description: "Students built IoT-based smart home systems with sensors and relays controlled via mobile app.",
    image: "/images/projects/project-1.jpg",
    tags: ["IoT", "Arduino", "Mobile App"],
    students: "Grade 9-10",
  },
  {
    title: "Line Following Robot",
    description: "Autonomous robot that follows a path using IR sensors — a classic robotics project with modern twists.",
    image: "/images/projects/project-2.jpg",
    tags: ["Robotics", "Sensors", "C++"],
    students: "Grade 7-8",
  },
  {
    title: "AI Image Classifier",
    description: "Students trained a machine learning model to classify objects using TensorFlow and Python.",
    image: "/images/projects/project-3.jpg",
    tags: ["AI/ML", "Python", "TensorFlow"],
    students: "Grade 11-12",
  },
  {
    title: "Weather Station",
    description: "Environmental monitoring station that measures temperature, humidity, and air quality with data logging.",
    image: "/images/projects/project-4.jpg",
    tags: ["IoT", "Sensors", "Data Analysis"],
    students: "Grade 8-10",
  },
];

export function ProjectShowcase() {
  return (
    <SectionWrapper className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Student Projects That Inspire"
          subtitle="See what young minds create with MuVidya kits and guidance — real projects from real students"
          badge="Student Work"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevation-high"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-4xl">🚀</span>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{project.students}</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-foreground mb-1.5">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                  ))}
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group/link"
                >
                  View project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}