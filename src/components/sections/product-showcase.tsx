"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Cpu, Bot, Code } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const products = [
  {
    title: "N-Byte Explorer Kit",
    description: "Complete robotics kit with microcontroller, sensors, motors, and project guidebook for hands-on STEM learning.",
    icon: Cpu,
    gradient: "from-primary to-primary-600",
    tags: ["Ages 8-18", "Beginner friendly"],
    image: "/images/products/n-byte-explorer-kit.jpg",
    slug: "n-byte-explorer-kit-robotics",
  },
  {
    title: "STEM Books & Guides",
    description: "Comprehensive curriculum-aligned textbooks and activity guides for schools and self-learning.",
    icon: Microscope,
    gradient: "from-accent to-accent-600",
    tags: ["Curriculum aligned", "CBSE/ICSE"],
    image: null,
    slug: null,
  },
  {
    title: "Robotics Workshop",
    description: "On-site workshops conducted by expert instructors. Build working robots in just two days.",
    icon: Bot,
    gradient: "from-stem-tech to-purple-600",
    tags: ["1-5 day programs", "All materials"],
    image: null,
    slug: null,
  },
  {
    title: "Coding Programs",
    description: "From block-based coding to Python and AI/ML — structured learning paths for every level.",
    icon: Code,
    gradient: "from-stem-science to-cyan-600",
    tags: ["Scratch to Python", "AI/ML basics"],
    image: null,
    slug: null,
  },
];

export function ProductShowcase() {
  return (
    <SectionWrapper className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Everything You Need for STEM Education"
          subtitle="Comprehensive products and programs designed to inspire the next generation of innovators"
          badge="What We Offer"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevation-high",
                  product.image ? "border border-border/70 bg-card" : "border border-border/70 bg-card p-6 hover:border-primary/30"
                )}
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 z-10 h-1 bg-gradient-to-r ${product.gradient} opacity-60`} />

                  {product.image ? (
                    <>
                      {/* Image area */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      {/* Icon overlay */}
                      <div className={`absolute top-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${product.gradient} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    {/* Content area */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-2">{product.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
                        ))}
                      </div>
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200 group/link"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* No image - icon + text layout */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} text-white mb-4 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
                      ))}
                    </div>

                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200 group/link"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}