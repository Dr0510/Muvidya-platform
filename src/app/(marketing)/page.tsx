import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { LearningOutcomes } from "@/components/sections/learning-outcomes";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { SchoolBenefits } from "@/components/sections/school-benefits";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProductShowcase />
      <LearningOutcomes />
      <ProjectShowcase />
      <SchoolBenefits />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}
