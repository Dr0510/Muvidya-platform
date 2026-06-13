"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Brain, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "N-Byte Explorer Kit",
    description: "All-in-one robotics and coding kit with sensors, motors, and microcontroller board.",
    category: "kit",
    features: ["Microcontroller Board", "10+ Sensors", "Motors & Wheels", "Project Guidebook"],
    gradient: "from-cyan-500 to-blue-600",
    popular: true,
  },
  {
    title: "AI/ML Learning Module",
    description: "Advanced AI and machine learning module for high school students.",
    category: "kit",
    features: ["AI Models", "Python SDK", "Pre-trained Models", "Computer Vision"],
    gradient: "from-violet-500 to-purple-600",
    popular: false,
  },
  {
    title: "IoT Discovery Kit",
    description: "Explore Internet of Things with sensors, actuators, and cloud connectivity.",
    category: "kit",
    features: ["WiFi Module", "Cloud Dashboard", "Sensor Suite", "Mobile App"],
    gradient: "from-amber-500 to-orange-600",
    popular: false,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  robotics: <Bot className="h-5 w-5" />,
  coding: <Code className="h-5 w-5" />,
  ai: <Brain className="h-5 w-5" />,
  iot: <Cpu className="h-5 w-5" />,
};

export function ProductShowcase() {
  return (
    <SectionWrapper id="products" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our STEM Products"
          subtitle="Comprehensive learning kits designed for hands-on STEM education"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br p-6 ${product.gradient}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(255_255_255_/_0.12)_0%,transparent_70%)]" />
                  <div className="relative text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <Sparkles className="h-3 w-3" />
                      {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label}
                    </div>
                    {product.popular && (
                      <Badge variant="default" className="bg-white/20 text-white">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{product.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-700">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/products">
            <Button variant="outline" size="lg" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}