"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Smart Home Automation",
    description: "IoT-based home automation system using sensors and relay modules",
    category: "iot",
    image: "/images/projects/smart-home.jpg",
    tags: ["IoT", "Arduino", "Sensors"],
    difficulty: "Intermediate",
    students: "Grade 8-10",
  },
  {
    title: "Line Following Robot",
    description: "Autonomous robot that follows a path using IR sensors",
    category: "robotics",
    image: "/images/projects/line-follower.jpg",
    tags: ["Robotics", "Sensors", "Motors"],
    difficulty: "Beginner",
    students: "Grade 6-8",
  },
  {
    title: "AI Image Classifier",
    description: "Machine learning model that classifies images using TensorFlow",
    category: "ai",
    image: "/images/projects/ai-classifier.jpg",
    tags: ["AI/ML", "Python", "TensorFlow"],
    difficulty: "Advanced",
    students: "Grade 11-12",
  },
  {
    title: "Weather Station",
    description: "Environmental monitoring system with real-time data visualization",
    category: "iot",
    image: "/images/projects/weather-station.jpg",
    tags: ["IoT", "Sensors", "Data Viz"],
    difficulty: "Intermediate",
    students: "Grade 7-9",
  },
  {
    title: "Gesture Controlled Car",
    description: "Control a robotic car using hand gestures and accelerometer",
    category: "robotics",
    image: "/images/projects/gesture-car.jpg",
    tags: ["Robotics", "Sensors", "Wireless"],
    difficulty: "Advanced",
    students: "Grade 9-12",
  },
  {
    title: "Smart Watering System",
    description: "Automated plant watering system using soil moisture sensors",
    category: "iot",
    image: "/images/projects/smart-watering.jpg",
    tags: ["IoT", "Automation", "Sensors"],
    difficulty: "Beginner",
    students: "Grade 6-8",
  },
];

const categories = ["all", "robotics", "iot", "ai"] as const;
type Category = (typeof categories)[number];

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Student Projects"
          subtitle="Real projects built by students using MuVidya STEM kits"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat === "all" ? "All Projects" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300">
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-medium">
                        {project.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 text-[10px] font-medium">
                        {project.students}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                    <div className="flex items-center gap-3 text-xs font-medium text-primary-600">
                      <span className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/workshops">
            <Button variant="outline" size="lg" className="gap-2">
              Start Building Your Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}