"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { DemoBookingForm } from "@/components/forms/demo-booking-form";
import { WorkshopEnquiryForm } from "@/components/forms/workshop-enquiry-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";

const tabs = [
  { id: "demo", label: "Book a Demo" },
  { id: "workshop", label: "Workshop Enquiry" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<TabId>("demo");

  return (
    <SectionWrapper id="contact" className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Ready to start your STEM journey? Book a demo or enquire about our workshops"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900">Let's Talk STEM</h3>
              <p className="text-gray-500 leading-relaxed">
                Have questions about our products, workshops, or partnership opportunities? 
                Our team is here to help.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {[
                { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: MapPin, label: "Location", value: SITE_CONFIG.address },
                { icon: Clock, label: "Response Time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100"
            >
              <h4 className="font-bold text-gray-900 mb-2">Prefer WhatsApp?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Chat with our team instantly on WhatsApp for quick queries.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.number.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 p-1.5 bg-gray-100 rounded-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "demo" ? <DemoBookingForm /> : <WorkshopEnquiryForm />}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}