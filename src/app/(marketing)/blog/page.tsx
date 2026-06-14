import type { Metadata } from "next";
import { BlogHero } from "./blog-hero";
import { BlogPosts } from "./blog-posts";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Explore MuVidya's blog for STEM education insights, tips, project ideas, and success stories from schools across India.",
  openGraph: {
    title: "MuVidya Blog — STEM Education Insights",
    description:
      "Tips, project ideas, and success stories from the world of STEM education.",
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogPosts />
      <NewsletterSection />
      <CTASection />
    </>
  );
}