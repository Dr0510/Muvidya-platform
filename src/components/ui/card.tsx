import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ElevationLevel = "low" | "medium" | "high";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  elevation?: ElevationLevel;
}

const elevationStyles: Record<ElevationLevel, string> = {
  low: "shadow-elevation-low border-border/70",
  medium: "shadow-elevation-medium border-border/80",
  high: "shadow-elevation-high border-border/90",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glow = false, elevation = "low", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card p-6 transition-all duration-300",
        elevationStyles[elevation],
        hover && "hover:-translate-y-1.5 hover:shadow-elevation-high hover:border-primary/20 cursor-pointer",
        glow && "hover:shadow-primary/15",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold text-foreground tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 pt-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };