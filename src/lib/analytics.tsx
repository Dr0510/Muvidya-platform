"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag?.("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Meta Pixel
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    window.fbq?.("track", action, { content_category: category, content_name: label });
  }
}

export function trackFormSubmission(formName: string) {
  trackEvent("form_submission", "lead", formName);
}

export function trackDemoRequest() {
  trackEvent("demo_request", "conversion", "Demo Booking Form");
}

export function trackWorkshopEnquiry() {
  trackEvent("workshop_enquiry", "conversion", "Workshop Enquiry Form");
}

export function trackNewsletterSignup() {
  trackEvent("newsletter_signup", "engagement", "Newsletter");
}

export function trackWhatsappClick() {
  trackEvent("whatsapp_click", "engagement", "WhatsApp Button");
}