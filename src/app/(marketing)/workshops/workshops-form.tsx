"use client";

import { AnimatedSection } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { WorkshopEnquiryForm } from "@/components/forms/workshop-enquiry-form";

export function WorkshopsForm() {
  return (
    <section className="py-16 md:py-20 bg-surface-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Enquire Now"
          title="Book a Workshop"
          subtitle="Ready to bring STEM to your school? Fill out the form below and our team will get back to you within 24 hours."
        />

        <AnimatedSection>
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border/60 bg-surface p-6 md:p-8 shadow-sm">
              <WorkshopEnquiryForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}