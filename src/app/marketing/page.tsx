"use client";

import ProjectCard from "@/components/ProjectCard";
import ECommerce from "@/images/home/ecommerce.webp";
import SaaS from "@/images/home/saas.webp";
import {
  categoryCardSectionMotionProps,
  categoryCardVariants,
  categoryTitleMotionProps,
} from "@/lib/categoryPageAnimations";
import { motion } from "framer-motion";

export default function Marketing() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-tertiary/20 text-5xl tracking-[-0.18em] uppercase select-none md:text-9xl"
        >
          Analyze<span className="mr-[0.25em] ml-[0.15em]">&</span>Ampl
          <span className="mr-[0.13em] ml-[0.13em]">i</span>fy
        </motion.p>
      </section>
      <motion.section
        {...categoryCardSectionMotionProps}
        className="grid gap-8 px-5 md:max-w-screen-2xl md:grid-cols-2 md:gap-10 md:px-20"
      >
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="E-commerce Growth Marketing"
          subtitle="Data & Financial Analysis / Market Research / Amazon PPC / SEO"
          description="Managed e-commerce marketing across the Amazon US and JP marketplaces, driving over USD $350K in average monthly revenue."
          imageSrc={ECommerce}
          href="/marketing/ecommerce"
        />
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="SaaS Lead Gen Landing Page"
          subtitle="Keyword Research / SEO Copywriting / Landing Page Design"
          description="A conversion-focused SaaS webinar landing page optimized through keyword research and strategic persuasion elements."
          imageSrc={SaaS}
          href="/marketing/saas-lead-gen"
        />
      </motion.section>
    </main>
  );
}
