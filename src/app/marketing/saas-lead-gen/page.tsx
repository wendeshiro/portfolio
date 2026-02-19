"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/marketing/saas/saas-hero.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import ComingSoon from "@/images/coming-soon.webp";

export default function SaaSLeadGen() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="SaaS Lead Gen Landing Page"
          year={"2025"}
          description="A conversion-focused SaaS webinar landing page optimized through keyword research and strategic persuasion elements."
        />
      </header>
      <ParallaxImage
        src={HeroImg}
        alt="SaaS Lead Generation Landing Page hero"
      />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              This SaaS webinar lead generation landing page was designed to
              improve registration conversion. Copy was optimized through
              keyword research, while layout emphasized{" "}
              <span className="text-primary">
                a clear value proposition, sense of urgency, social proof and
                testimonials, distinct benefits and a compelling CTA.
              </span>{" "}
              These solutions enhanced clarity, trust and conversion performance
              in response to the requirement for a streamlined, high-impact lead
              capture experience.
            </p>
          }
          secondaryText={
            <>
              <p>
                *This is an academic project created for educational purposes.
                There is no commercial affiliation with Hootsuite.
              </p>
            </>
          }
          details={[
            {
              label: "Tools",
              content: "Google Trends, WordStream, Wishpond",
            },
            {
              label: "Skills",
              content: "Keyword Research, SEO Copywriting, Landing Page Design",
            },
          ]}
          links={[
            {
              label: "Live Landing Page",
              url: "https://liwende.wishpondpages.com/social-media-trends-webinar-2025/",
              icon: "globe",
            },
          ]}
        />
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
        >
          <Image
            src={ComingSoon}
            alt="Coming Soon"
            className="w-full rounded-2xl"
          />
        </motion.section>
      </section>
    </main>
  );
}
