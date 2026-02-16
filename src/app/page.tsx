"use client";

import ProjectCard from "@/components/ProjectCard";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";
import Can from "@/images/home/can.webp";
import PowerBank from "@/images/home/power-bank.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

export default function Home() {
  const lenis = useLenis();
  const devRef = useRef<HTMLElement>(null);
  const designRef = useRef<HTMLElement>(null);
  const marketingRef = useRef<HTMLElement>(null);
  const snapLockRef = useRef(false);
  const lastSnappedRef = useRef<"dev" | "design" | "marketing" | null>(null);
  const mountTimeRef = useRef(0);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const SECTION_COLOR_START = 0.5;
  const SECTION_COLOR_END = 0.2;
  const SECTION_SNAP_AMOUNT = 0.5; // The scroll progress ratio at which a section is considered "snapped" into view. smaller values make it easier to trigger snapping, while larger values require more of the section to be visible before snapping occurs.
  const SECTION_SNAP_OFFSET = 0;
  const MOBILE_SNAP_BREAKPOINT = 640;

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
        duration: 1, // Longer duration creates a more pronounced easing effect.
      });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 1100); // Duration + small buffer to ensure the lock is released after scrolling completes.
    },
    [lenis, SECTION_SNAP_OFFSET],
  );

  const handleHeroScrollHintClick = useCallback(() => {
    snapToSection(devRef.current);
  }, [snapToSection]);

  useLenis(() => {
    // Grace period after mount to prevent snap from interfering with scroll restoration.
    if (Date.now() - mountTimeRef.current < 1500) return;

    if (window.innerWidth < MOBILE_SNAP_BREAKPOINT) {
      lastSnappedRef.current = null;
      return;
    }

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
      const secondary = { r: 121, g: 252, b: 230 };
      const tertiary = { r: 183, g: 168, b: 250 };

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
        <section className="relative flex h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 sm:px-10 md:h-[calc(100vh-8rem)] md:px-0">
          <div className="text-[30px] font-light tracking-wider sm:text-[52px] md:text-[81px] md:leading-[1.2] 2xl:text-[86px]">
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
              experience of 5<span className="mr-[0.1em]">+</span>
              years.
            </p>
          </div>
          <p className="mt-5 text-[14px] leading-[1.8] tracking-wide sm:text-[17px] md:mt-4 md:text-[23.7px] 2xl:mt-6 2xl:text-[25.2px]">
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
            className="text-primary/50 absolute bottom-12 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center md:bottom-2"
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
          className="relative mt-20 sm:mt-2"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-20 sm:px-8 md:px-10 md:pt-22">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-15 2xl:gap-20">
              <ProjectCard
                title="SafeSpace"
                subtitle="React Native (Expo) / TypeScript / AWS Lambda / LLM"
                description="Enhancing workplace safety for women and gender-diverse tradespeople with AI-generated reports and actionable insights."
                imageSrc={SafeSpace}
                href="/development/safespace"
              />
              <ProjectCard
                title="Plan-it"
                subtitle="React / JavaScript / Vite / External APIs / Third-Party Libraries"
                description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
                imageSrc={Planit}
                href="/development/plan-it"
              />
            </div>

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center sm:flex-row sm:items-center sm:justify-between sm:self-auto md:mt-5 md:mb-3">
              <p className="text-primary/50 self-center text-sm font-semibold sm:self-auto sm:text-base md:text-2xl">
                Web • Mobile • LLM • API
              </p>
              <a
                href="/development"
                className="border-primary text-primary hover:bg-primary/10 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 sm:px-7 sm:py-2.5 sm:text-base"
              >
                All Development Projects →
              </a>
            </div>

            <div className="absolute top-6 left-1/2 z-10 w-screen -translate-x-1/2 overflow-x-clip md:relative md:top-auto md:left-1/2 md:z-auto md:mt-auto md:-translate-x-1/2">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-primary/35 mr-10 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT
                  DEVELOPMENT DEVELOPMENT
                </p>
                <p className="text-primary/35 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
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
          className="relative mt-10 sm:mt-0"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-10 sm:px-8 md:mt-15 md:px-10 md:pt-22">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-15 2xl:gap-20">
              <ProjectCard
                title="Orchard Brew Can Design"
                subtitle="Illustrator / Photoshop / Blender / React Three Fiber (Three.js)"
                description="A refreshing visual identity for a contemporary fruit tea collection."
                imageSrc={Can}
                href="/design/can-design"
              />
              <ProjectCard
                title="Power Bank Commercial"
                subtitle="After Effects / Video Editing / Motion Graphics / Filming / Storyboarding"
                description="A fast-paced promotional video for a multifunctional power bank."
                imageSrc={PowerBank}
                href="/design/power-bank"
              />
            </div>

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center sm:flex-row sm:items-center sm:justify-between sm:self-auto md:mt-5 md:mb-3">
              <p className="text-secondary/60 self-center text-sm font-semibold sm:self-auto sm:text-base md:text-2xl">
                Graphic • UI/UX • Video • Motion
              </p>
              <a
                href="/design"
                className="border-secondary-dark text-secondary-dark hover:bg-secondary/15 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 sm:px-7 sm:py-2.5 sm:text-base"
              >
                All Design Work →
              </a>
            </div>

            <div className="absolute -top-3 left-1/2 z-10 w-screen -translate-x-1/2 overflow-x-clip md:relative md:top-auto md:left-1/2 md:z-auto md:mt-auto md:-translate-x-1/2">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-secondary/30 mr-10 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
                </p>
                <p className="text-secondary/30 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
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
          className="relative mt-10 mb-10 sm:mt-0"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-10 sm:px-8 md:mt-15 md:px-10 md:pt-22">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-15 2xl:gap-20">
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

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center sm:flex-row sm:items-center sm:justify-between sm:self-auto md:mt-5 md:mb-3">
              <p className="text-tertiary/50 self-center text-center text-sm font-semibold sm:self-auto sm:text-base md:text-2xl">
                E-commerce • Market Research • Data Analytics • Paid Media
              </p>
              <a
                href="/marketing"
                className="border-tertiary text-tertiary hover:bg-tertiary/10 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 sm:px-7 sm:py-2.5 sm:text-base"
              >
                All Marketing Cases →
              </a>
            </div>

            <div className="absolute -top-3 left-1/2 z-10 w-screen -translate-x-1/2 overflow-x-clip md:relative md:top-auto md:left-1/2 md:z-auto md:mt-auto md:-translate-x-1/2">
              <div
                className="flex w-max animate-[marquee_200s_linear_infinite] whitespace-nowrap select-none"
                onCopy={(e) => e.preventDefault()}
              >
                <p className="text-tertiary/35 mr-10 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  MARKETING MARKETING MARKETING MARKETING MARKETING MARKETING
                  MARKETING
                </p>
                <p className="text-tertiary/35 shrink-0 text-[clamp(36px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
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
