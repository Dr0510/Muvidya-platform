"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { DemoBookingForm } from "@/components/forms/demo-booking-form";
import { SITE_CONFIG } from "@/lib/constants";

const contactInfo = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
  { icon: Clock, label: "Response Time", value: "Within 24 hours" },
];

export function ContactSection() {
  return (
    <SectionWrapper className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to bring STEM education to your school? Let's talk."
          badge="Contact"
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-sm">
                  <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                );
              }
              return <div key={item.label}>{content}</div>;
            })}
          </div>

          {/* Booking Form */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-1">Book a Free Demo</h3>
            <p className="text-sm text-muted-foreground mb-6">Fill in your details and our team will get back to you.</p>
            <DemoBookingForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}