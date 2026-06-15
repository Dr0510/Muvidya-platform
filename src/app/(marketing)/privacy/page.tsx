import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE_CONFIG.name} Privacy Policy - How we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">1. Introduction</h2>
        <p>
          {SITE_CONFIG.name} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal identification information (name, email address, phone number)</li>
          <li>Educational institution details</li>
          <li>Usage data (pages visited, time spent on site)</li>
          <li>Cookies and tracking technologies</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. How We Use Your Information</h2>
        <p>We use collected information for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Providing and maintaining our services</li>
          <li>Responding to inquiries and demo requests</li>
          <li>Sending educational resources and updates</li>
          <li>Improving our website and services</li>
          <li>Compliance with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Protection</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Third-Party Services</h2>
        <p>
          We may use third-party services for analytics, payment processing, and communication. These services have their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact Us</h2>
        <p>
          For questions about this Privacy Policy, contact us at{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
            {SITE_CONFIG.email}
          </a>.
        </p>
      </div>
    </div>
  );
}