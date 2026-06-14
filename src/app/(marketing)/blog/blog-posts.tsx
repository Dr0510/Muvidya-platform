"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Calendar, Clock, ArrowRight, Bot, Code, Brain, Cpu, GraduationCap, Lightbulb } from "lucide-react";

const POSTS = [
  {
    slug: "why-stem-education-matters",
    title: "Why STEM Education Matters for Your Child's Future",
    excerpt: "Discover how STEM education builds critical thinking, creativity, and problem-solving skills that prepare students for the careers of tomorrow.",
    date: "June 12, 2026",
    readTime: "5 min read",
    category: "STEM Education",
    icon: GraduationCap,
    gradient: "from-primary to-primary-600",
  },
  {
    slug: "getting-started-with-robotics",
    title: "Getting Started with Robotics: A Beginner's Guide",
    excerpt: "Everything you need to know to start your robotics journey — from choosing the right kit to building your first robot.",
    date: "June 5, 2026",
    readTime: "7 min read",
    category: "Robotics",
    icon: Bot,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    slug: "python-for-kids",
    title: "Python for Kids: Making Programming Fun and Accessible",
    excerpt: "Learn how teaching Python to kids can be engaging and rewarding with the right approach and tools.",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Coding",
    icon: Code,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "ai-in-classrooms",
    title: "AI in Classrooms: Preparing Students for an AI-Driven World",
    excerpt: "How schools across India are integrating AI education and why it matters for the next generation.",
    date: "May 20, 2026",
    readTime: "8 min read",
    category: "Artificial Intelligence",
    icon: Brain,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    slug: "diy-stem-projects",
    title: "5 DIY STEM Projects You Can Do at Home",
    excerpt: "Simple, fun, and educational STEM projects using everyday materials. Perfect for weekend learning adventures.",
    date: "May 14, 2026",
    readTime: "4 min read",
    category: "Projects",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "iot-for-students",
    title: "IoT for Students: Connecting the Physical and Digital Worlds",
    excerpt: "Explore how Internet of Things (IoT) projects are helping students understand real-world technology applications.",
    date: "May 7, 2026",
    readTime: "6 min read",
    category: "IoT",
    icon: Cpu,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export function BlogPosts() {
  return (
    <section className="py-16 md:py-20 bg-surface-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Latest Articles"
          title="Read, Learn, and Get Inspired"
          subtitle="Explore our collection of articles, guides, and success stories from the world of STEM education."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, index) => {
            const Icon = post.icon;
            return (
              <AnimatedSection key={post.slug} className="h-full">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border/70 bg-surface overflow-hidden transition-all duration-300 hover:shadow-elevation-high hover:-translate-y-1.5">
                    {/* Card header with gradient */}
                    <div className={`bg-gradient-to-br ${post.gradient} p-6`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <span className="inline-block w-fit rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-3">
                        {post.category}
                      </span>

                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform duration-200" />
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}