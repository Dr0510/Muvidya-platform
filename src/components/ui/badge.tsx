import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline" | "success";
  size?: "sm" | "md";
}

const variantStyles: Record<string, string> = {
  default: "bg-muted text-muted-foreground border-border/40",
  primary: "bg-primary/10 text-primary border-primary/15",
  secondary: "bg-surface-muted text-muted-foreground border-border/40",
  accent: "bg-accent/10 text-accent border-accent/15",
  outline: "bg-transparent text-foreground border-border/50",
  success: "bg-success/10 text-success border-success/15",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2.5 py-0.5 text-[11px] rounded-full",
  md: "px-3 py-1 text-xs rounded-full",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-semibold border",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export type { BadgeProps };