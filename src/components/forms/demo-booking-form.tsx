"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export function DemoBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoRequestData>({
    resolver: zodResolver(demoRequestSchema),
  });

  const onSubmit = async (data: DemoRequestData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      toast.success("Demo request submitted successfully! We'll contact you within 24 hours.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You! 🎉</h3>
        <p className="text-muted-foreground mb-6">
          Your demo request has been received. Our team will reach out within 24 hours to schedule your personalized demo.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="text-primary font-semibold hover:text-primary-600 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name *</label>
          <input
            {...register("name")}
            placeholder="Your full name"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.name ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.email ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+91 98765 43210"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.phone ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">School Name *</label>
          <input
            {...register("schoolName")}
            placeholder="Name of your school"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.schoolName ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.schoolName && <p className="text-xs text-destructive mt-1">{errors.schoolName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">City *</label>
          <input
            {...register("city")}
            placeholder="City"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.city ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">State *</label>
          <input
            {...register("state")}
            placeholder="State"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.state ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.state && <p className="text-xs text-destructive mt-1">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Grade Level</label>
          <select {...register("gradeLevel")} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="">Select grade</option>
            <option value="primary">Primary (1-5)</option>
            <option value="middle">Middle (6-8)</option>
            <option value="high">High (9-12)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Subject Area</label>
          <select {...register("subjectArea")} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="">Select subject</option>
            <option value="robotics">Robotics</option>
            <option value="coding">Coding</option>
            <option value="ai">AI/ML</option>
            <option value="iot">IoT</option>
            <option value="general">General STEM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">Student Count</label>
          <input
            {...register("studentCount")}
            type="number"
            placeholder="Number of students"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">Message (Optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Any specific requirements or questions..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 font-semibold text-sm shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Free Demo"
        )}
      </button>
    </form>
  );
}