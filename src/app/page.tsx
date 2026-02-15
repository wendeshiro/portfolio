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
  const SECTION_SNAP_AMOUNT = 0.7;
  const SECTION_SNAP_OFFSET = 0;

  // - Start 0.9 means the section's start is at 90% of the viewport)
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
        duration: 0.6, // Longer duration creates a more pronounced easing effect.
      });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 900);
    },
    [lenis, SECTION_SNAP_OFFSET],
  );

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
        <section className="flex h-[calc(100vh-7rem)] flex-col items-center justify-center">
          <div className="text-[81px] leading-[1.2] tracking-wider">
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
          <p className="mt-7 text-[24px] tracking-wide">
            I build products with{" "}
            <span className="text-primary">design thinking</span> and a{" "}
            <span className="text-primary">marketing-driven mindset</span>,
            bridging the gap between{" "}
            <span className="text-primary">code and commerce</span>.
          </p>
        </section>

        <section ref={devRef} id="dev" className="relative">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 md:pt-20">
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
              <p className="text-primary/40 font-semibold md:text-2xl">
                Web • Mobile • LLM • API
              </p>
              <a
                href="/development"
                className="border-primary text-primary hover:bg-primary rounded-2xl border px-7 py-2.5 text-base transition-colors duration-300 hover:text-white"
              >
                All Development Projects →
              </a>
            </div>

            <div className="mt-auto">
              <div className="flex w-max animate-[marquee_100s_linear_infinite] whitespace-nowrap">
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
        </section>

        <section ref={designRef} id="design" className="relative">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 pb-8 md:pt-20">
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
              <p className="text-secondary/50 font-semibold md:text-2xl">
                Graphic • UI/UX • Video • Motion
              </p>
              <a
                href="/design"
                className="border-secondary text-secondary hover:bg-secondary rounded-2xl border px-7 py-2.5 text-base transition-colors duration-300 hover:text-white"
              >
                All Design Work →
              </a>
            </div>

            <div className="mt-auto">
              <div className="flex w-max animate-[marquee_100s_linear_infinite] whitespace-nowrap">
                <p className="text-secondary/40 mr-10 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
                </p>
                <p className="text-secondary/40 shrink-0 text-[clamp(64px,10vw,170px)] leading-none font-bold tracking-[0.12em] uppercase">
                  DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={marketingRef} id="marketing" className="relative mb-10">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-10 pt-12 pb-8 md:pt-20">
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

            <div className="mt-auto">
              <div className="flex w-max animate-[marquee_100s_linear_infinite] whitespace-nowrap">
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
        </section>
      </main>
    </>
  );
}
