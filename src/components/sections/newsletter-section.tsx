"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterData } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setIsSuccess(true);
      toast.success("Subscribed successfully! Check your email for updates.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium mb-4">
                <Mail className="h-3 w-3" />
                <span>Stay Updated</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get STEM Resources & Updates
              </h3>
              <p className="text-primary-100 text-sm max-w-md">
                Subscribe to receive new product launches, workshop schedules, and free STEM resources.
              </p>
            </div>

            <div className="w-full max-w-md">
              {isSuccess ? (
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0" />
                  <p className="text-white font-medium">You're subscribed! Welcome to MuVidya community.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className={cn(
                        "w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 text-sm border border-white/20",
                        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40",
                        errors.email && "border-red-300"
                      )}
                    />
                    {errors.email && (
                      <p className="absolute -bottom-5 left-0 text-xs text-red-200">{errors.email.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 rounded-xl bg-white text-primary-600 font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}