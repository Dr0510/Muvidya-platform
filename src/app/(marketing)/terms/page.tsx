import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_CONFIG.name} Terms of Service - Terms and conditions for using our website and services.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <p>Last updated: June 15, 2026</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing or using {SITE_CONFIG.name}'s website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Description of Services</h2>
        <p>
          {SITE_CONFIG.name} provides STEM education products, robotics learning platforms, workshops, and related educational services for schools and students across India.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. User Obligations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate information when using our forms</li>
          <li>Not misuse our services for any unlawful purpose</li>
          <li>Respect intellectual property rights</li>
          <li>Not attempt to disrupt our services</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. Intellectual Property</h2>
        <p>
          All content, trademarks, and intellectual property on our website are owned by {SITE_CONFIG.name}. You may not reproduce, distribute, or create derivative works without our express permission.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Limitation of Liability</h2>
        <p>
          {SITE_CONFIG.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
            {SITE_CONFIG.email}
          </a>.
        </p>
      </div>
    </div>
  );
}