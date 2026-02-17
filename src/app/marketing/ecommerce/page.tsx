"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/marketing/ecommerce/ecommerce-hero.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import ComingSoon from "@/images/coming-soon.webp";

export default function ECommerce() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="E-commerce Growth Marketing"
          year={"2018–2023"}
          yearPositionClass="xl:-right-28"
          description="Professional experience in data-driven e-commerce marketing with a focus on analytics and growth."
        />
      </header>
      <ParallaxImage src={HeroImg} alt="Plan-it Trip Planning Web App hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              Managed e-commerce marketing across the Amazon US and JP
              marketplaces, driving over USD $350K in average monthly revenue.
              Main responsibilities included{" "}
              <span className="text-primary">
                data and financial, market research, marketing and advertising
                strategy development, SEO strategy
              </span>{" "}
              and Amazon PPC campaign management, as well as inventory and
              logistics planning.
            </p>
          }
          secondaryText={
            <>
              <p>
                *This page summarizes my five years of professional experience,
                skills, and achievements as an Amazon E-commerce Supervisor and
                Specialist.
              </p>
            </>
          }
          details={[
            {
              label: "Tools",
              content:
                "Amazon Seller Central, Amazon Advertising (SP, SB, SD), Microsoft Excel (Advanced Functions & Pivot Tables)",
            },
            {
              label: "Growth & Analytics",
              content:
                "Market Research, Data & Financial Analysis, Financial Modeling, Customer Review Analysis",
            },
            {
              label: "Execution & Leadership",
              content:
                "SEO, Product Listing Optimization, Inventory & Logistics Planning, Team Management & Mentorship, Cross-functional Collaboration",
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
