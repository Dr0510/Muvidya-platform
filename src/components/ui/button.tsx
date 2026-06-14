import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-600 text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-surface-muted text-foreground border border-border/70 hover:bg-primary/8 hover:border-primary/40 hover:text-primary hover:shadow-sm hover:shadow-primary/10 active:scale-[0.98]",
  outline:
    "border border-border/70 bg-transparent text-foreground hover:bg-muted hover:border-foreground/20 active:scale-[0.98]",
  ghost:
    "bg-transparent text-muted-foreground hover:text-foreground hover:bg-surface-muted hover:shadow-sm active:scale-[0.98]",
  accent:
    "bg-gradient-to-r from-accent to-accent-600 text-accent-foreground shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
          "relative overflow-hidden group",
          className
        )}
        {...props}
      >
        {/* Shimmer overlay for primary/accent */}
        {(variant === "primary" || variant === "accent") && (
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : icon ? (
            <span className="shrink-0">{icon}</span>
          ) : null}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps, ButtonVariant, ButtonSize };