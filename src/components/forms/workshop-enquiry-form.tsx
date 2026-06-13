"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workshopEnquirySchema, type WorkshopEnquiryData } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { WORKSHOP_CATEGORIES } from "@/lib/constants";

export function WorkshopEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkshopEnquiryData>({
    resolver: zodResolver(workshopEnquirySchema),
  });

  const onSubmit = async (data: WorkshopEnquiryData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/workshop-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      toast.success("Workshop enquiry submitted successfully! We'll get back to you within 24 hours.");
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Workshop Enquiry Received! 🎉</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest! Our team will reach out within 24 hours to discuss workshop options for your school.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
          <input
            {...register("name")}
            placeholder="Your full name"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.name ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.email ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+91 98765 43210"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.phone ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">School Name *</label>
          <input
            {...register("schoolName")}
            placeholder="Name of your school"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.schoolName ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.schoolName && <p className="text-xs text-red-500 mt-1">{errors.schoolName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
          <input
            {...register("city")}
            placeholder="City"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.city ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
          <input
            {...register("state")}
            placeholder="State"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.state ? "border-red-300" : "border-gray-200"
            )}
          />
          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Workshop Type *</label>
          <select
            {...register("workshopType")}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              errors.workshopType ? "border-red-300" : "border-gray-200"
            )}
          >
            <option value="">Select workshop type</option>
            {WORKSHOP_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.workshopType && <p className="text-xs text-red-500 mt-1">{errors.workshopType.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
          <select {...register("duration")} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
            <option value="">Select duration</option>
            <option value="1-day">1 Day</option>
            <option value="2-days">2 Days</option>
            <option value="3-days">3 Days</option>
            <option value="5-days">5 Days (Week-long)</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Grade Level</label>
          <select {...register("gradeLevel")} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
            <option value="">Select grade</option>
            <option value="primary">Primary (1-5)</option>
            <option value="middle">Middle (6-8)</option>
            <option value="high">High (9-12)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Students</label>
          <input
            {...register("studentCount")}
            type="number"
            placeholder="Approximate count"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Requirements (Optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Any specific topics, dates, or requirements..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Workshop Enquiry"
        )}
      </button>
    </form>
  );
}