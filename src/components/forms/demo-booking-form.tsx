"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, Calendar, School, MapPin, Users } from "lucide-react";
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 🎉</h3>
        <p className="text-gray-600 mb-6">
          Your demo request has been received. Our team will reach out within 24 hours to schedule your personalized demo.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
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

      <div className="grid sm:grid-cols-3 gap-5">
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject Area</label>
          <select {...register("subjectArea")} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
            <option value="">Select subject</option>
            <option value="robotics">Robotics</option>
            <option value="coding">Coding</option>
            <option value="ai">AI/ML</option>
            <option value="iot">IoT</option>
            <option value="general">General STEM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Count</label>
          <input
            {...register("studentCount")}
            type="number"
            placeholder="Number of students"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (Optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Any specific requirements or questions..."
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
          "Request Free Demo"
        )}
      </button>
    </form>
  );
}