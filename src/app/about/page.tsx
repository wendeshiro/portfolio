"use client";

import {
  categoryCardSectionMotionProps,
  categoryCardVariants,
  categoryTitleMotionProps,
} from "@/lib/categoryPageAnimations";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-primary/20 inline-flex gap-x-4 text-6xl tracking-[-0.18em] uppercase select-none md:gap-x-8 md:text-9xl"
        >
          <span>About</span>
          <span>Me</span>
        </motion.p>
      </section>
      <motion.section
        {...categoryCardSectionMotionProps}
        className="space-y-5 px-8 text-center font-serif text-lg leading-relaxed text-gray-800 md:space-y-3 md:text-xl"
      >
        <motion.p variants={categoryCardVariants}>
          My name is Wende, and I also go by Wendell.
        </motion.p>
        <motion.p variants={categoryCardVariants}>
          This name reflects both the sound of my Chinese name and a meaning I
          resonate with—a wanderer driven by exploration.
        </motion.p>
        <motion.p variants={categoryCardVariants}>
          I see myself the same way—curious, independent, and constantly
          exploring new ideas, technologies, and creative possibilities.
        </motion.p>
      </motion.section>
    </main>
  );
}
