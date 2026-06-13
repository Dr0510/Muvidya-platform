"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function SectionWrapper({ children, className, id, delay = 0 }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-24 lg:py-28",
        "scroll-mt-24 transition-colors duration-300",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export function AnimatedSection({
  children,
  className,
  id,
  direction = "up",
  delay = 0,
}: SectionWrapperProps & { direction?: "up" | "left" | "right" | "scale" }) {
  const directionClasses = {
    up: "translate-y-0",
    left: "translate-x-0",
    right: "translate-x-0",
    scale: "scale-100",
  };

  return (
    <div
      id={id}
      className={cn(
        "transition-all duration-500 ease-out",
        directionClasses[direction],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}