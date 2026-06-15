import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{7,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(200, "School/Institution name must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
});

const studentCountField = z.string().optional().or(z.literal(""));

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s()-]{7,15}$/, "Please enter a valid phone number"),
  schoolName: z.string().min(2, "School name is required").max(200),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  gradeLevel: z.string().optional().or(z.literal("")),
  subjectArea: z.string().optional().or(z.literal("")),
  studentCount: studentCountField,
  preferredDate: z.string().optional().or(z.literal("")),
  preferredTime: z.string().optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export const workshopEnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s()-]{7,15}$/, "Please enter a valid phone number"),
  schoolName: z.string().min(2, "School name is required").max(200),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  workshopType: z.string().min(1, "Please select a workshop type"),
  gradeLevel: z.string().optional().or(z.literal("")),
  studentCount: studentCountField,
  duration: z.string().optional().or(z.literal("")),
  preferredDate: z.string().optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{7,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
export type DemoRequestData = z.infer<typeof demoRequestSchema>;
export type WorkshopEnquiryData = z.infer<typeof workshopEnquirySchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;