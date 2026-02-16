"use client";

import ProjectCard from "@/components/ProjectCard";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";
import { useLenis } from "lenis/react";

export default function Home() {
  const lenis = useLenis();
  const devRef = useRef<HTMLElement>(null);
  const designRef = useRef<HTMLElement>(null);
  const marketingRef = useRef<HTMLElement>(null);
  const snapLockRef = useRef(false);
  const lastSnappedRef = useRef<"dev" | "design" | "marketing" | null>(null);

  const SECTION_COLOR_START = 0.5;
  const SECTION_COLOR_END = 0.2;
  const SECTION_SNAP_AMOUNT = 0.5; // The scroll progress ratio at which a section is considered "snapped" into view.
  const SECTION_SNAP_OFFSET = 0;

  const { scrollYProgress: devProgress } = useScroll({
    target: devRef,
    offset: [`start ${SECTION_COLOR_START}`, `start ${SECTION_COLOR_END}`],
  });

  const { scrollYProgress: designProgress } = useScroll({
    target: designRef,
    offset: [`start ${SECTION_COLOR_START}`, `start ${SECTION_COLOR_END}`],
  });

  const { scrollYProgress: marketingProgress } = useScroll({
    target: marketingRef,
    offset: [`start ${SECTION_COLOR_START}`, `start ${SECTION_COLOR_END}`],
  });

  const snapToSection = useCallback(
    (target: HTMLElement | null) => {
      if (!lenis || !target || snapLockRef.current) return;

      snapLockRef.current = true;
      lenis.scrollTo(target, {
        offset: SECTION_SNAP_OFFSET,
        duration: 1.2, // Longer duration creates a more pronounced easing effect.
      });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 900);
    },
    [lenis, SECTION_SNAP_OFFSET],
  );

  const handleHeroScrollHintClick = useCallback(() => {
    snapToSection(devRef.current);
  }, [snapToSection]);

  useLenis(() => {
    const sections = [
      { id: "dev" as const, element: devRef.current },
      { id: "design" as const, element: designRef.current },
      { id: "marketing" as const, element: marketingRef.current },
    ].filter(
      (
        section,
      ): section is {
        id: "dev" | "design" | "marketing";
        element: HTMLElement;
      } => Boolean(section.element),
    );

    if (sections.length === 0 || snapLockRef.current) return;

    const viewportHeight = window.innerHeight;
    let best: {
      id: "dev" | "design" | "marketing";
      element: HTMLElement;
      ratio: number;
      top: number;
    } | null = null;

    for (const section of sections) {
      const rect = section.element.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0),
      );
      const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (!best || ratio > best.ratio) {
        best = {
          id: section.id,
          element: section.element,
          ratio,
          top: rect.top,
        };
      }
    }

    if (!best) return;

    if (best.ratio < SECTION_SNAP_AMOUNT * 0.5) {
      lastSnappedRef.current = null;
      return;
    }

    if (best.ratio >= SECTION_SNAP_AMOUNT) {
      const almostAligned =
        Math.abs(best.top - Math.abs(SECTION_SNAP_OFFSET)) < 8;
      if (lastSnappedRef.current === best.id || almostAligned) return;

      lastSnappedRef.current = best.id;
      snapToSection(best.element);
    }
  });

  function clampProgress(progress: number) {
    return Math.min(1, Math.max(0, progress));
  }

  function mixRgb(
    from: { r: number; g: number; b: number },
    to: { r: number; g: number; b: number },
    progress: number,
    alpha = 0.1,
  ) {
    const p = clampProgress(progress);
    const r = Math.round(from.r + (to.r - from.r) * p);
    const g = Math.round(from.g + (to.g - from.g) * p);
    const b = Math.round(from.b + (to.b - from.b) * p);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const backgroundColor = useTransform(
    [devProgress, designProgress, marketingProgress],
    (values) => {
      const dev = values[0] as number;
      const design = values[1] as number;
      const marketing = values[2] as number;

      // Define colors
      const white = { r: 252, g: 253, b: 253 };
      const primary = { r: 23, g: 138, b: 254 };
      const secondary = { r: 0, g: 195, b: 163 };
      const tertiary = { r: 123, g: 95, b: 255 };

      if (marketing > 0) {
        return mixRgb(secondary, tertiary, marketing, 0.1);
      } else if (design > 0) {
        return mixRgb(primary, secondary, design, 0.1);
      } else if (dev > 0) {
        const p = clampProgress(dev);
        return `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${0.1 * p})`;
      }

      return `rgb(${white.r}, ${white.g}, ${white.b})`;
    },
  );

  return (
    <>
      <motion.div style={{ backgroundColor }} className="fixed inset-0 -z-10" />
      <main className="relative mx-auto">
        <section className="relative flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
          <div className="text-[81px] leading-[1.2] font-light tracking-wider">
            <p>Hi, I&apos;m Wende, </p>
            <p>A full-stack</p>
            <p>
              <span className="text-primary font-medium">Developer</span> with a
            </p>
            <p>
              <span className="text-secondary font-medium">Design</span>{" "}
              background and
            </p>
            <p>
              <span className="text-tertiary font-medium">Marketing</span>{" "}
              experience of 5+ years.
            </p>
          </div>
          <p className="mt-6 text-[24px] tracking-wide">
            I build products with{" "}
            <span className="text-primary">design thinking</span> and a{" "}
            <span className="text-primary">marketing-driven mindset</span>,
            bridging the gap between{" "}
            <span className="text-primary">code and commerce</span>.
          </p>

          <button
            type="button"
            aria-label="Scroll to development section"
            onClick={handleHeroScrollHintClick}
            className="text-primary/50 absolute bottom-1 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center"
          >
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="block"
                animate={{ y: [0, 9, 0], opacity: [0.25, 1, 0.25] }} // Animate up and down with fading effect. y higher creates a more pronounced movement.
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.2, // higher delay creates a more staggered effect between the three arrows.
                  repeatDelay: 0.2,
                }}
              >
                <span className="block h-4 w-4 rotate-45 border-r-2 border-b-2" />
              </motion.span>
            ))}
          </button>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 15 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 2% in view, only once
          ref={devRef}
          id="dev"
          className="relative"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 md:pt-22">
            <div className="grid gap-15 md:grid-cols-2">
              <ProjectCard
                title="SafeSpace"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={SafeSpace}
                href="/development/safespace"
              />
              <ProjectCard
                title="Plan-it"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={Planit}
                href="/development/plan-it"
              />
            </div>

            <div className="mt-5 mb-5 flex items-center justify-between">
              <p className="text-primary/50 font-semibold md:text-2xl">
                Web • Mobile • LLM • API
              </p>
              <a
                href="/development"
                className="border-primary text-primary hover:bg-primary rounded-2xl border px-7 py-2.5 text-base transition-colors duration-300 hover:text-white"
              >
                All Development Projects →
              </a>
            </div>

            <div className="relative left-1/2 mt-auto w-screen -translate-x-1/2 overflow-x-clip">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-primary/35 mr-10 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT
                  DEVELOPMENT DEVELOPMENT
                </p>
                <p className="text-primary/35 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT
                  DEVELOPMENT DEVELOPMENT
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 2% in view, only once
          ref={designRef}
          id="design"
          className="relative"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 pb-8 md:pt-22">
            <div className="grid gap-15 md:grid-cols-2">
              <ProjectCard
                title="SafeSpace"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={SafeSpace}
                href="/development/safespace"
              />
              <ProjectCard
                title="Plan-it"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={Planit}
                href="/development/plan-it"
              />
            </div>

            <div className="mt-5 mb-5 flex items-center justify-between">
              <p className="text-secondary/60 font-semibold md:text-2xl">
                Graphic • UI/UX • Video • Motion
              </p>
              <a
                href="/design"
                className="border-secondary text-secondary hover:bg-secondary rounded-2xl border px-7 py-2.5 text-base transition-colors duration-300 hover:text-white"
              >
                All Design Work →
              </a>
            </div>

            <div className="relative left-1/2 mt-auto w-screen -translate-x-1/2 overflow-x-clip">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-secondary/40 mr-10 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
                </p>
                <p className="text-secondary/40 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 2% in view, only once
          ref={marketingRef}
          id="marketing"
          className="relative mb-10"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 pb-8 md:pt-22">
            <div className="grid gap-15 md:grid-cols-2">
              <ProjectCard
                title="SafeSpace"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={SafeSpace}
                href="/development/safespace"
              />
              <ProjectCard
                title="Plan-it"
                subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
                description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
                imageSrc={Planit}
                href="/development/plan-it"
              />
            </div>

            <div className="mt-5 mb-5 flex items-center justify-between">
              <p className="text-tertiary/50 font-semibold md:text-2xl">
                E-commerce • Market Research • Data Analytics • Paid Media
              </p>
              <a
                href="/marketing"
                className="border-tertiary text-tertiary hover:bg-tertiary rounded-2xl border px-7 py-2.5 text-base transition-colors duration-300 hover:text-white"
              >
                All Marketing Cases →
              </a>
            </div>

            <div className="relative left-1/2 mt-auto w-screen -translate-x-1/2 overflow-x-clip">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-tertiary/40 mr-10 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  MARKETING MARKETING MARKETING MARKETING MARKETING MARKETING
                  MARKETING
                </p>
                <p className="text-tertiary/40 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  MARKETING MARKETING MARKETING MARKETING MARKETING MARKETING
                  MARKETING
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
