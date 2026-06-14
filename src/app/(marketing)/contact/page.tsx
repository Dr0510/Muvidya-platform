import type { Metadata } from "next";
import { ContactHero } from "./contact-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MuVidya. Book a free demo, ask questions, or learn more about our STEM education products and workshops.",
  openGraph: {
    title: "Contact MuVidya",
    description:
      "Book a free demo or get in touch with our team to learn more about STEM education solutions.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <CTASection />
    </>
  );
}