"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to submit");
      }

      setIsSuccess(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
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
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent! 🎉</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. Our team will respond within 24 hours.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="text-primary font-semibold hover:text-primary-600 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name *</label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address *</label>
          <input
            id="contact-email"
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
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
          <input
            id="contact-phone"
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
          <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground/80 mb-1.5">Subject *</label>
          <input
            id="contact-subject"
            {...register("subject")}
            placeholder="What is this about?"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              errors.subject ? "border-destructive/60" : "border-border"
            )}
          />
          {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/80 mb-1.5">Message *</label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={4}
          placeholder="Tell us about your requirements, questions, or feedback..."
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground resize-none transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            errors.message ? "border-destructive/60" : "border-border"
          )}
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-600 text-primary-foreground font-semibold text-sm shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}