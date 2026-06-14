import type { Metadata } from "next";
import { AboutHero } from "./about-hero";
import { AboutMission } from "./about-mission";
import { AboutStats } from "./about-stats";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "About MuVidya",
  description:
    "Discover MuVidya's mission to transform STEM education across India. Learn about our journey, team, and commitment to inspiring the next generation of innovators.",
  openGraph: {
    title: "About MuVidya",
    description:
      "Discover MuVidya's mission to transform STEM education across India.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <CTASection />
    </>
  );
}