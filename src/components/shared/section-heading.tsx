"use client";

import { cn } from "@/lib/utils";
import { AnimatedSection } from "./section-wrapper";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  gradient?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  gradient = true,
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={cn("mb-12 md:mb-16", className)}>
      <div className={cn(align === "center" ? "text-center" : "text-left")}>
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
            gradient
              ? "gradient-text"
              : "text-foreground"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={align === "left" ? { marginLeft: 0 } : undefined}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}