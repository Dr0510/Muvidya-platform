import type { Metadata } from "next";
import { WorkshopsHero } from "./workshops-hero";
import { WorkshopsList } from "./workshops-list";
import { WorkshopsForm } from "./workshops-form";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "STEM Workshops",
  description:
    "Explore MuVidya's hands-on STEM workshops — robotics, coding, AI, and IoT. Perfect for schools and students across India. Book a workshop today!",
  openGraph: {
    title: "STEM Workshops by MuVidya",
    description:
      "Hands-on robotics, coding, AI, and IoT workshops for schools across India.",
  },
};

export default function WorkshopsPage() {
  return (
    <>
      <WorkshopsHero />
      <WorkshopsList />
      <WorkshopsForm />
      <FAQSection />
      <CTASection />
    </>
  );
}