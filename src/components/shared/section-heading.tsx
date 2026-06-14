"use client";

import { cn } from "@/lib/utils";
import { AnimatedSection } from "./section-wrapper";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  badge?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  badge,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-h2 md:text-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}