"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/development/portfolio/portfolio-hero.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import ComingSoon from "@/images/coming-soon.webp";

export default function PortfolioWebsite() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Portfolio Website Design & Development"
          year={"2026"}
          description="A responsive portfolio website built with Next.js and Tailwind CSS, focusing on clarity and scalable structure."
        />
      </header>
      <ParallaxImage
        src={HeroImg}
        alt="Portfolio Website Design & Development hero"
      />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              This portfolio website was created to present technical and
              creative work in a clear and structured manner. Many portfolios
              suffer from cluttered layouts and slow performance, making it
              difficult to assess strengths quickly. The solution prioritizes{" "}
              <span className="text-primary">
                organized content hierarchy, responsive design, and scalable
                structure
              </span>{" "}
              to ensure clarity, usability, and long-term maintainability.
            </p>
          }
          details={[
            {
              label: "Development Skills",
              content:
                "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, Matter.js, Lenis, Git, GitHub, ESLint, Prettier",
            },
            {
              label: "Design Skills",
              content:
                "UI/UX Design (Wireframing, Design System, Layout, Visual Hierarchy), Photoshop (Product Mockups)",
            },
          ]}
          links={[
            {
              label: "GitHub Repo",
              url: "https://github.com/wendeshiro/portfolio",
              icon: "github",
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
