"use client";

import ProjectCard from "@/components/ProjectCard";
import {
  HOME_HERO_LETTER_DURATION,
  homeCardSectionMotionProps,
  homeHeroTextLetterVariants,
  homeHeroTextMotionProps,
} from "@/lib/homePageAnimations";
import { categoryTitleMotionProps } from "@/lib/categoryPageAnimations";
import {
  HOME_SEC_HERO_LETTER_DURATION,
  createHomeSecHeroCharDelayMap,
  homeSecHeroTextLetterVariants,
  homeSecHeroTextMotionProps,
} from "@/lib/homeSecHeroTextAnimations";
import {
  hasShownHomeScrollHint,
  markHomeHeroTextPlayed,
  markHomeScrollHintShown,
  shouldPlayHomeHeroText,
} from "@/lib/homeVisitState";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";
import Can from "@/images/home/can.webp";
import PowerBank from "@/images/home/power-bank.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import ECommerce from "@/images/home/ecommerce.webp";
import SaaS from "@/images/home/saas.webp";

type HeroLineSegment = {
  text: string;
  className?: string;
  phase: 1 | 2 | 3 | 4;
  startOffset?: number;
};

type HomeSecHeroTextSegment = {
  text: string;
  className?: string;
  priority?: boolean;
};

const heroHeadingLines: HeroLineSegment[][] = [
  [
    { text: "Hi, ", phase: 1 },
    { text: "I'm Wende, ", phase: 1, startOffset: 0.12 },
  ],
  [{ text: "A software", phase: 2, startOffset: 0.2 }],
  [
    {
      text: "Developer",
      className: "text-primary font-medium",
      phase: 2,
      startOffset: 0.2,
    },
    { text: " with a", phase: 3, startOffset: 0.3 },
  ],
  [
    {
      text: "Design",
      className: "text-secondary font-medium",
      phase: 3,
      startOffset: 0.3,
    },
    { text: " background", phase: 3, startOffset: 0.3 },
    { text: " and", phase: 4, startOffset: 0.3 },
  ],
  [
    {
      text: "Marketing",
      className: "text-tertiary font-medium",
      phase: 4,
      startOffset: 0.3,
    },
    { text: " experience of ", phase: 4, startOffset: 0.3 },
    { text: "5+", className: "mr-[0.15em]", phase: 4, startOffset: 0.7 },
    { text: "years.", phase: 4, startOffset: 0.7 },
  ],
];

const HERO_PHASE_START_DELAY: Record<1 | 2 | 3 | 4, number> = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
};

const HERO_LETTER_STAGGER = 0.04; // The delay between each letter's animation within the same segment.
const SECONDARY_HERO_DELAY_AFTER_MAIN = 0;

function getHeroCharDelay(segment: HeroLineSegment, charIndex: number) {
  return (
    HERO_PHASE_START_DELAY[segment.phase] +
    (segment.startOffset ?? 0) +
    charIndex * HERO_LETTER_STAGGER
  );
}

const homeSecHeroTextSegments: HomeSecHeroTextSegment[] = [
  { text: "I build " },
  { text: "thoughtful, scalable", className: "text-primary", priority: true },
  { text: " digital solutions " },
  {
    text: "that bridge",
  },
  {
    text: " technology, design, and business needs.",
    className: "text-primary",
    priority: true,
  },
];

const homeSecHeroSegmentStartIndices = homeSecHeroTextSegments.reduce<number[]>(
  (indices, segment, index) => {
    if (index === 0) {
      indices.push(0);
      return indices;
    }

    const previousStart = indices[index - 1] ?? 0;
    const previousLength = Array.from(
      homeSecHeroTextSegments[index - 1]?.text ?? "",
    ).length;
    indices.push(previousStart + previousLength);
    return indices;
  },
  [],
);

const homeSecHeroFullText = homeSecHeroTextSegments
  .map((segment) => segment.text)
  .join("");
const homeSecHeroPriorityIndices = homeSecHeroTextSegments.flatMap(
  (segment, segmentIndex) => {
    if (!segment.priority) return [];

    const startIndex = homeSecHeroSegmentStartIndices[segmentIndex] ?? 0;
    return Array.from(segment.text)
      .map((char, charIndex) =>
        char.trim().length > 0 ? startIndex + charIndex : -1,
      )
      .filter((index) => index >= 0);
  },
);
const mainHeroMaxCharDelay = Math.max(
  ...heroHeadingLines.flatMap((line) =>
    line.flatMap((segment) =>
      Array.from(segment.text).map((_, charIndex) =>
        getHeroCharDelay(segment, charIndex),
      ),
    ),
  ),
);
const homeSecHeroStartOffset =
  mainHeroMaxCharDelay +
  HOME_HERO_LETTER_DURATION +
  SECONDARY_HERO_DELAY_AFTER_MAIN;
const homeSecHeroCharDelayMap = createHomeSecHeroCharDelayMap(
  homeSecHeroFullText,
  {
    startOffset: homeSecHeroStartOffset,
    priorityIndices: homeSecHeroPriorityIndices,
  },
);
const homeSecHeroMaxCharDelay = Math.max(...homeSecHeroCharDelayMap);
const homeSecHeroEndDelay =
  homeSecHeroMaxCharDelay + HOME_SEC_HERO_LETTER_DURATION;

function splitTextWithWhitespace(text: string) {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

export default function Home() {
  const lenis = useLenis();
  const [playHeroTextAnimation] = useState(shouldPlayHomeHeroText);
  const [showHeroScrollHint, setShowHeroScrollHint] = useState(
    hasShownHomeScrollHint,
  );
  const scrollHintAlreadyShown = hasShownHomeScrollHint();
  const devRef = useRef<HTMLElement>(null);
  const designRef = useRef<HTMLElement>(null);
  const marketingRef = useRef<HTMLElement>(null);
  const snapLockRef = useRef(false);
  const lastSnappedRef = useRef<"dev" | "design" | "marketing" | null>(null);
  const mountTimeRef = useRef(0);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (playHeroTextAnimation) {
      markHomeHeroTextPlayed();
    }
  }, [playHeroTextAnimation]);

  useEffect(() => {
    if (hasShownHomeScrollHint()) return;

    const timeoutId = window.setTimeout(
      () => {
        markHomeScrollHintShown();
        setShowHeroScrollHint(true);
      },
      playHeroTextAnimation ? homeSecHeroEndDelay * 1000 : 0,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [playHeroTextAnimation]);

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
  const heroTextContainerMotionProps = playHeroTextAnimation
    ? {}
    : categoryTitleMotionProps;

  return (
    <>
      <motion.div style={{ backgroundColor }} className="fixed inset-0 -z-10" />
      <main className="relative mx-auto">
        <section className="relative h-[calc(100vh-5rem)] md:h-[calc(100vh-7rem)]">
          <section className="relative flex h-[calc(100vh-5rem)] flex-col items-center justify-center px-5 select-none md:h-[calc(100vh-8rem)] md:px-5">
            <div className="w-auto max-w-350">
              <motion.div {...heroTextContainerMotionProps} className="w-full">
                <motion.div
                  {...(playHeroTextAnimation ? homeHeroTextMotionProps : {})}
                  className="w-full text-[clamp(30px,5.5vw,86px)] leading-normal font-light tracking-wider md:leading-[1.2]"
                >
                  {heroHeadingLines.map((line, lineIndex) => (
                    <p
                      key={`line-${lineIndex}`}
                      className={
                        lineIndex === heroHeadingLines.length - 1
                          ? "whitespace-normal"
                          : "whitespace-nowrap"
                      }
                    >
                      {line.map((segment, segmentIndex) => (
                        <span
                          key={`segment-${lineIndex}-${segmentIndex}`}
                          className={segment.className}
                        >
                          {lineIndex === heroHeadingLines.length - 1
                            ? (() => {
                                let segmentCharOffset = 0;
                                return splitTextWithWhitespace(
                                  segment.text,
                                ).map((token, tokenIndex) => {
                                  const tokenLength = Array.from(token).length;
                                  const tokenStartOffset = segmentCharOffset;
                                  segmentCharOffset += tokenLength;

                                  if (token.trim().length === 0) {
                                    return (
                                      <span
                                        key={`char-${lineIndex}-${segmentIndex}-${tokenIndex}`}
                                        aria-hidden
                                      >
                                        {token}
                                      </span>
                                    );
                                  }

                                  return (
                                    <span
                                      key={`char-${lineIndex}-${segmentIndex}-${tokenIndex}`}
                                      className="inline-block"
                                    >
                                      {Array.from(token).map(
                                        (char, charIndex) =>
                                          playHeroTextAnimation ? (
                                            <motion.span
                                              key={`char-${lineIndex}-${segmentIndex}-${tokenIndex}-${charIndex}`}
                                              custom={getHeroCharDelay(
                                                segment,
                                                tokenStartOffset + charIndex,
                                              )}
                                              variants={
                                                homeHeroTextLetterVariants
                                              }
                                              className="inline-block will-change-[filter,opacity]"
                                            >
                                              {char}
                                            </motion.span>
                                          ) : (
                                            <span
                                              key={`char-${lineIndex}-${segmentIndex}-${tokenIndex}-${charIndex}`}
                                              className="inline-block"
                                            >
                                              {char}
                                            </span>
                                          ),
                                      )}
                                    </span>
                                  );
                                });
                              })()
                            : Array.from(segment.text).map((char, charIndex) =>
                                char === " " ? (
                                  <span
                                    key={`char-${lineIndex}-${segmentIndex}-${charIndex}`}
                                    aria-hidden
                                  >
                                    {" "}
                                  </span>
                                ) : playHeroTextAnimation ? (
                                  <motion.span
                                    key={`char-${lineIndex}-${segmentIndex}-${charIndex}`}
                                    custom={getHeroCharDelay(
                                      segment,
                                      charIndex,
                                    )}
                                    variants={homeHeroTextLetterVariants}
                                    className="inline-block will-change-[filter,opacity]"
                                  >
                                    {char}
                                  </motion.span>
                                ) : (
                                  <span
                                    key={`char-${lineIndex}-${segmentIndex}-${charIndex}`}
                                    className="inline-block"
                                  >
                                    {char}
                                  </span>
                                ),
                              )}
                        </span>
                      ))}
                    </p>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                {...heroTextContainerMotionProps}
                className="w-full md:pl-[0.4em]"
              >
                <motion.p
                  {...(playHeroTextAnimation ? homeSecHeroTextMotionProps : {})}
                  className="mt-5 w-full text-[15.5px] leading-[1.7] tracking-wider break-normal wrap-normal md:mt-4 md:text-2xl"
                >
                  {homeSecHeroTextSegments.map((segment, segmentIndex) => (
                    <span
                      key={`sec-hero-segment-${segmentIndex}`}
                      className={segment.className}
                    >
                      {(() => {
                        let segmentCharOffset = 0;
                        return splitTextWithWhitespace(segment.text).map(
                          (token, tokenIndex) => {
                            const tokenLength = Array.from(token).length;
                            const tokenStartOffset = segmentCharOffset;
                            segmentCharOffset += tokenLength;

                            if (token.trim().length === 0) {
                              return (
                                <span
                                  key={`sec-hero-token-${segmentIndex}-${tokenIndex}`}
                                  aria-hidden
                                >
                                  {token}
                                </span>
                              );
                            }

                            return (
                              <span
                                key={`sec-hero-token-${segmentIndex}-${tokenIndex}`}
                                className="inline-block"
                              >
                                {Array.from(token).map((char, charIndex) =>
                                  playHeroTextAnimation ? (
                                    <motion.span
                                      key={`sec-hero-char-${segmentIndex}-${tokenIndex}-${charIndex}`}
                                      custom={
                                        homeSecHeroCharDelayMap[
                                          (homeSecHeroSegmentStartIndices[
                                            segmentIndex
                                          ] ?? 0) +
                                            tokenStartOffset +
                                            charIndex
                                        ] ?? homeSecHeroStartOffset
                                      }
                                      variants={homeSecHeroTextLetterVariants}
                                      className="inline-block will-change-[filter,opacity]"
                                    >
                                      {char}
                                    </motion.span>
                                  ) : (
                                    <span
                                      key={`sec-hero-char-${segmentIndex}-${tokenIndex}-${charIndex}`}
                                      className="inline-block"
                                    >
                                      {char}
                                    </span>
                                  ),
                                )}
                              </span>
                            );
                          },
                        );
                      })()}
                    </span>
                  ))}
                </motion.p>
              </motion.div>
            </div>
          </section>
          {showHeroScrollHint ? (
            <motion.button
              type="button"
              aria-label="Scroll to development section"
              onClick={handleHeroScrollHintClick}
              initial={scrollHintAlreadyShown ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-primary/50 absolute bottom-12 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center md:bottom-0"
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
            </motion.button>
          ) : null}
        </section>

        <motion.section
          {...homeCardSectionMotionProps}
          ref={devRef}
          id="dev"
          className="relative mt-20 md:mt-3"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-20 md:px-10 md:pt-22">
            <div className="grid gap-8 md:grid-cols-2 md:gap-15">
              <ProjectCard
                title="SafeSpace"
                subtitle="React Native / TypeScript / AWS Lambda / LLM"
                description="Enhancing workplace safety for women and gender-diverse tradespeople with AI-generated reports and actionable insights."
                imageSrc={SafeSpace}
                href="/development/safespace"
              />
              <ProjectCard
                title="Plan-it"
                subtitle="React / JavaScript / External APIs"
                description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
                imageSrc={Planit}
                href="/development/plan-it"
              />
            </div>

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center md:mt-5 md:mb-3 md:flex-row md:items-center md:justify-between md:self-auto">
              <p className="text-primary/50 self-center text-sm font-semibold select-none md:self-auto md:text-2xl">
                Web • Mobile • LLM • API
              </p>
              <a
                href="/development"
                className="border-primary text-primary hover:bg-primary/10 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 select-none md:px-7 md:py-2.5 md:text-base"
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
          {...homeCardSectionMotionProps}
          ref={designRef}
          id="design"
          className="relative mt-10 md:mt-15"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-10 md:px-10 md:pt-22">
            <div className="grid gap-8 md:grid-cols-2 md:gap-15">
              <ProjectCard
                title="Orchard Brew Can Design"
                subtitle="Illustrator / Photoshop / Blender / React Three Fiber (Three.js)"
                description="A refreshing visual identity for a contemporary fruit tea collection with interactive 3D product displays."
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

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center md:mt-5 md:mb-3 md:flex-row md:items-center md:justify-between md:self-auto">
              <p className="text-secondary/60 self-center text-sm font-semibold select-none md:self-auto md:text-2xl">
                Graphic • UI/UX • Video • Motion
              </p>
              <a
                href="/design"
                className="border-secondary-dark text-secondary-dark hover:bg-secondary/15 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 select-none md:px-7 md:py-2.5 md:text-base"
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
          {...homeCardSectionMotionProps}
          ref={marketingRef}
          id="marketing"
          className="relative mt-10 mb-10 md:mt-15"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pt-10 md:px-10 md:pt-22">
            <div className="grid gap-8 md:grid-cols-2 md:gap-15">
              <ProjectCard
                title="E-commerce Growth Marketing"
                subtitle="Data & Financial Analysis / Market Research / Amazon PPC / SEO"
                description="Managed e-commerce marketing across the Amazon US and JP marketplaces, driving over USD $350K in average monthly revenue."
                imageSrc={ECommerce}
                href="/marketing/ecommerce"
              />
              <ProjectCard
                title="SaaS Lead Gen Landing Page"
                subtitle="Keyword Research / SEO Copywriting / Landing Page Design"
                description="A conversion-focused SaaS webinar landing page optimized through keyword research and strategic persuasion elements."
                imageSrc={SaaS}
                href="/marketing/saas-lead-gen"
              />
            </div>

            <div className="mt-4 mb-4 flex flex-col gap-3 self-center md:mt-5 md:mb-3 md:flex-row md:items-center md:justify-between md:self-auto">
              <p className="text-tertiary/50 self-center text-center text-sm font-semibold select-none md:self-auto md:text-left md:text-2xl">
                E-commerce • Market Research • Data Analytics • Paid Media
              </p>
              <a
                href="/marketing"
                className="border-tertiary text-tertiary hover:bg-tertiary/10 w-fit self-center rounded-2xl border px-5 py-2 text-sm transition-colors duration-300 select-none md:px-7 md:py-2.5 md:text-base"
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
