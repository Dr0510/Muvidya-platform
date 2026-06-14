"use client";

import type { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionWrapper({ id, className, children, ...props }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("section-padding", className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
  children?: React.ReactNode;
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
};

export function AnimatedSection({
  delay = 0,
  direction = "up",
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  const variant = directionVariants[direction];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: delay * 0.001, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}