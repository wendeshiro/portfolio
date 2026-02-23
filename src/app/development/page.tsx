"use client";

import ProjectCard from "@/components/ProjectCard";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";
import Portfolio from "@/images/home/portfolio.webp";
import Eat from "@/images/home/eat.webp";
import {
  categoryCardSectionMotionProps,
  categoryCardVariants,
  categoryTitleMotionProps,
} from "@/lib/categoryPageAnimations";
import { motion } from "framer-motion";

export default function Development() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-primary/20 text-6xl tracking-[-0.18em] uppercase select-none md:text-9xl"
        >
          bu<span className="mr-[0.1em] ml-[0.1em]">i</span>ld
          <span className="mr-[0.2em] ml-[0.2em]">&</span>Iterate
        </motion.p>
      </section>
      <motion.section
        {...categoryCardSectionMotionProps}
        className="grid gap-8 px-5 md:max-w-screen-2xl md:grid-cols-3 md:gap-10 md:px-20"
      >
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="SafeSpace"
          subtitle="React Native / TypeScript / AWS Lambda / LLM"
          description="Enhancing workplace safety for women and gender-diverse tradespeople with AI-generated reports and actionable insights."
          imageSrc={SafeSpace}
          href="/development/safespace"
        />
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="Plan-it"
          subtitle="React / JavaScript / External APIs"
          description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
          imageSrc={Planit}
          href="/development/plan-it"
        />
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="Portfolio Website"
          subtitle="Next.js / TypeScript / Framer Motion"
          description="A responsive portfolio website built with Next.js and Tailwind CSS, focusing on clarity and scalable structure."
          imageSrc={Portfolio}
          href="/development/portfolio-website"
        />
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="What Should I Eat"
          subtitle="Vanilla JavaScript / Dynamic Rendering / HTML / CSS"
          description="A blind-box food discovery web app."
          imageSrc={Eat}
          href="/development/eat"
        />
      </motion.section>
    </main>
  );
}
