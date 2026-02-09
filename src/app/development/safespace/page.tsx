"use client";
import { useEffect, useRef, useState } from "react";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import ScrollSpyNav from "@/components/ScrollSpyNav";
import LeftArrow from "@/components/icons/left-arrow";
import RightArrow from "@/components/icons/right-arrow";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import HeroImg from "@/images/development/plan-it/plan-it-hero.webp";
import { AnimatePresence, motion } from "framer-motion";
import Map from "@/images/development/safespace/map.webp";
import ExternalLink from "@/components/ExternalLink";
import CompetitiveMatrix from "@/images/development/safespace/competitive-matrix.png";
import InfoPopover from "@/components/InfoPopover";
import PhotoView from "@/components/PhotoView";
import PersonaPri from "@/images/development/safespace/persona-primary.webp";
import PersonaSec from "@/images/development/safespace/persona-secondary.webp";

export default function SafeSpace() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const activeSlideRef = useRef<HTMLDivElement | null>(null);
  const lastVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const currentVideo =
      activeSlideRef.current?.querySelector<HTMLVideoElement>("video") ?? null;
    const previousVideo = lastVideoRef.current;

    if (previousVideo && previousVideo !== currentVideo) {
      previousVideo.pause();
      previousVideo.currentTime = 0;
    }

    lastVideoRef.current = currentVideo;
  }, [activeFeatureIndex]);

  const features: Array<{
    title: string;
    description: string;
    media:
      | { type: "video"; src: string; poster: string }
      | { type: "image"; src: StaticImageData; alt: string };
  }> = [
    {
      title: "AI-Powered Reporting",
      description: "From voice recordings to reports and actionable insights.",
      media: {
        type: "video",
        src: "/videos/safespace/recording.mp4",
        poster: "/videos/safespace/recording-placeholder.webp",
      },
    },
    {
      title: "Guided AI Conversations",
      description:
        "Respond to Safi’s questions and receive reports with actionable insights.",
      media: {
        type: "video",
        src: "/videos/safespace/safi-figma.mp4",
        poster: "/videos/safespace/safi-figma-placeholder.webp",
      },
    },
    {
      title: "Incident Map",
      description: "Understand site safety through nearby public reports.",
      media: {
        type: "image",
        src: Map,
        alt: "Incident map showing nearby safety reports",
      },
    },
    {
      title: "Community Safety Feed",
      description:
        "Browse and explore detailed safety reports shared by the community.",
      media: {
        type: "video",
        src: "/videos/safespace/post.mp4",
        poster: "/videos/safespace/post-placeholder.webp",
      },
    },
  ];

  const activeFeature = features[activeFeatureIndex];
  const featureLabel = String(activeFeatureIndex + 1).padStart(2, "0");

  function handlePrevFeature() {
    setSlideDirection(-1);
    setActiveFeatureIndex((index) =>
      index === 0 ? features.length - 1 : index - 1,
    );
  }

  function handleNextFeature() {
    setSlideDirection(1);
    setActiveFeatureIndex((index) =>
      index === features.length - 1 ? 0 : index + 1,
    );
  }

  function handleFeatureSelect(index: number) {
    if (index === activeFeatureIndex) return;
    setSlideDirection(index > activeFeatureIndex ? 1 : -1);
    setActiveFeatureIndex(index);
  }

  return (
    <main className="max-w-full py-16 md:py-36">
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="SafeSpace: Building Safer Worksites with AI"
          year={2025}
          description="Enhancing workplace safety for women and gender-diverse tradespeople with AI-generated reports and actionable insights."
        />
      </header>
      <ScrollSpyNav
        sections={[
          { id: "overview", label: "Overview" },
          { id: "discovery-phase", label: "Discovery Phase" },
          { id: "design-process", label: "Design Process" },
          { id: "development-process", label: "Development Process" },
        ]}
      />
      <ParallaxImage src={HeroImg} alt="Plan-it Trip Planning Web App hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              SafeSpace is an{" "}
              <span className="text-primary">AI-powered safety platform</span>{" "}
              for{" "}
              <span className="text-primary">
                women and gender-diverse tradespeople
              </span>{" "}
              that transforms recordings and{" "}
              <span className="whitespace-nowrap">AI-guided</span> conversations
              into structured reports and actionable insights, while enabling
              anonymous sharing of site safety insights to support both workers
              and management in{" "}
              <span className="text-primary">improving workplace safety.</span>
            </p>
          }
          secondaryText={
            <>
              <p>
                Women and gender-diverse tradespeople often{" "}
                <InfoPopover
                  ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                  popoverWidthClass="w-80 md:w-95"
                  content={
                    <>
                      According to a{" "}
                      <ExternalLink
                        fontWeight="medium"
                        href="https://www.ywcahalifax.com/wp-content/uploads/2024/03/YWCA-Halifax-SGBH-Key-Findings-Report-2024-with-recomendations.pdf"
                      >
                        YWCA Halifax report
                      </ExternalLink>
                      , 91% of women and gender-diverse tradespeople surveyed
                      experienced harassment throughout their careers. (YWCA
                      Halifax, 2024).
                    </>
                  }
                >
                  face challenging work environments
                </InfoPopover>
                , intimidating reporting processes, and lack of information
                about job site safety. SafeSpace addresses these challenges by
                providing preventative insights, AI-assisted support to reduce
                reporting stress, and a desktop web platform that turns
                fragmented reports into actionable insights for management.
              </p>
              <p>
                *This is a concept project created for educational purposes.
              </p>
            </>
          }
          details={[
            {
              label: "Deliverables",
              content: "Mobile App, Web App, HiFi Prototype",
            },
            {
              label: "Tech Stack",
              content:
                "React Native (Expo), TypeScript, AWS Lambda, LLM Integration, Git, GitHub, React, Next.js, JavaScript",
            },
            {
              label: "Design & UX Skills",
              content: "UI/UX Design, User Research, Figma",
            },
            {
              label: (
                <InfoPopover
                  ariaLabel="Main Responsibilities details"
                  popoverWidthClass="w-90 md:w-108"
                  content={
                    <>
                      <p className="mb-2 font-semibold">Main Contributions</p>
                      <div className="space-y-2 leading-relaxed">
                        <p>
                          <span className="font-semibold">
                            Mobile Development:
                          </span>{" "}
                          Developed core features, including audio recording,
                          AI-powered report generation from recordings, and the
                          &quot;Posts&quot; & &quot;My Reports and
                          Recordings&quot; sections. Built most of the app’s
                          reusable components and UI layouts.
                        </p>
                        <p>
                          <span className="font-semibold">
                            Web Development:
                          </span>{" "}
                          Independently handled the entire development of the
                          desktop web application.
                        </p>
                        <p>
                          <span className="font-semibold">
                            UI/UX Design & Research:
                          </span>{" "}
                          Contributed to competitive analysis, user research,
                          and sitemap creation. Created Figma wireframes for the
                          audio recording feature.
                        </p>
                        <p>
                          <span className="font-semibold">
                            Project Management:
                          </span>{" "}
                          Introduced Gantt charts to the team workflow, ensuring
                          smooth cross-functional collaboration and maintaining
                          alignment across all project phases.
                        </p>
                        <p className="text-sm text-gray-700">
                          *This project was completed by a cross-functional team
                          of 8 (3 developers, 3 designers, 1 marketer, and 1
                          project manager).
                        </p>
                      </div>
                    </>
                  }
                >
                  Main Responsibilities
                </InfoPopover>
              ),
              content:
                "Mobile and web development, UI/UX Design and Research, Project Management",
            },
          ]}
          links={[
            {
              label: "GitHub (Mobile App)",
              url: "https://github.com/Crite-Spranberries/SafeSpace",
              icon: "github",
            },
            {
              label: "GitHub (Web App)",
              url: "https://github.com/wendeshiro/SafeSpace-Web-Supplement",
              icon: "github",
            },
          ]}
        />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="bg-tertiary/8 relative mt-10 flex h-auto items-center justify-center overflow-hidden rounded-2xl px-6 pt-5 pb-10 md:h-[80vh] md:pt-10"
        >
          <button
            type="button"
            aria-label="Previous feature"
            onClick={handlePrevFeature}
            className="border-tertiary/30 text-tertiary/70 hover:bg-tertiary/10 absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border text-2xl transition-colors hover:cursor-pointer md:left-8"
          >
            <LeftArrow
              className="absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2"
              aria-hidden="true"
            />
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFeatureIndex}
              initial={{ opacity: 0, x: slideDirection * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection * -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              ref={activeSlideRef}
              className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-15 md:px-15"
            >
              <div className="bg-tertiary/25 overflow-hidden rounded-[30px] p-2.5 shadow-2xl md:p-3">
                <div className="aspect-496/1080 max-w-50 overflow-hidden rounded-[20px] md:max-w-65 md:rounded-[18px] 2xl:max-w-70">
                  {activeFeature.media.type === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={activeFeature.media.poster}
                      className="object-cover"
                    >
                      <source src={activeFeature.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={activeFeature.media.src}
                      alt={activeFeature.media.alt}
                      placeholder="blur"
                      unoptimized
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="order-first flex flex-col justify-center gap-2 md:order-0 md:w-130 md:gap-4">
                <p className="text-tertiary/40 text-[45px] leading-none font-bold tracking-wide md:text-[66px]">
                  {featureLabel}
                </p>
                <p className="text-2xl tracking-wide md:text-4xl">
                  {activeFeature.title}
                </p>
                <p className="text-base tracking-wide md:text-2xl">
                  {activeFeature.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            type="button"
            aria-label="Next feature"
            onClick={handleNextFeature}
            className="border-tertiary/30 text-tertiary/70 hover:bg-tertiary/10 absolute top-1/2 right-4 z-51 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border text-2xl transition-colors hover:cursor-pointer md:right-8"
          >
            <RightArrow
              className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2"
              aria-hidden="true"
            />
          </button>
          <div className="absolute right-0 bottom-3.5 left-0 flex items-center justify-center gap-3 md:bottom-5">
            {features.map((_, index) => (
              <button
                key={`feature-indicator-${index}`}
                type="button"
                aria-label={`Go to feature ${index + 1}`}
                onClick={() => handleFeatureSelect(index)}
                className={`h-1 rounded-full transition-all duration-300 hover:cursor-pointer ${
                  index === activeFeatureIndex
                    ? "bg-tertiary/60 w-14"
                    : "bg-tertiary/25 w-8"
                }`}
              />
            ))}
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
          id="discovery-phase"
        >
          <h2 className="mb-3 font-serif text-2xl font-medium md:mb-6 md:text-4xl md:font-normal">
            Discovery Phase
          </h2>
          <section className="mb-4 md:mb-8">
            <h3 className="mb-5 font-serif text-xl font-semibold md:mb-2 md:text-2xl">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="bg-primary/70 inline-block h-[1em] w-0.5 rounded-full"
                />
                Competitive Analysis
              </span>
            </h3>
            <div className="flex flex-col gap-5 md:flex-row md:gap-13">
              <div className="space-y-3 text-base leading-relaxed md:w-1/2 md:text-lg">
                <p>
                  While SafeSpace has no single direct competitor, an analysis
                  was conducted across platforms in workplace safety, mental
                  health, and support communities, including{" "}
                  <ExternalLink
                    href="https://www.ccohs.ca/"
                    fontWeight="medium"
                  >
                    CCOHS
                  </ExternalLink>
                  ,{" "}
                  <ExternalLink
                    href="https://becklar.com/workforce-safety/"
                    fontWeight="medium"
                  >
                    WorkerSafety Pro
                  </ExternalLink>
                  ,{" "}
                  <ExternalLink
                    href="https://www.ourcommunia.com/"
                    fontWeight="medium"
                  >
                    Communia
                  </ExternalLink>
                  ,{" "}
                  <ExternalLink
                    href="https://www.headspace.com/"
                    fontWeight="medium"
                  >
                    Headspace
                  </ExternalLink>
                  , and{" "}
                  <ExternalLink href="https://womanact.ca/" fontWeight="medium">
                    WomanACT
                  </ExternalLink>
                  .
                </p>
                <p>
                  <span className="font-semibold">Current solutions</span>{" "}
                  provide compliance, social connection, and mindfulness, but
                  suffer from{" "}
                  <span className="font-semibold">
                    complex interfaces, poor mobile responsiveness, and lack
                    personalized guidance
                  </span>
                  , leaving users lost in dense resources.
                </p>
                <p>
                  SafeSpace offers AI-driven reporting and a community incident
                  map for anonymous, actionable site safety insights.
                </p>
              </div>
              <Image
                src={CompetitiveMatrix}
                alt="Competitive Matrix"
                className="order-first md:order-0 md:w-1/2"
              />
            </div>
          </section>
          <motion.section
            initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
            whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
            transition={{ duration: 1, ease: "easeOut" }} // Animation settings
            viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
            className="mb-2 md:mb-17"
          >
            <h3 className="mb-2 font-serif text-xl font-semibold md:text-2xl">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="bg-primary/70 inline-block h-[1em] w-0.5 rounded-full"
                />
                User Research & Insight
              </span>
            </h3>
            <div className="flex flex-col gap-5 text-base leading-relaxed md:gap-15 md:text-lg">
              <p className="md:w-1/2">
                To better understand real-world challenges and safety concerns
                experienced by women and gender-diverse tradespeople, a
                <span className="whitespace-nowrap"> mixed-methods</span> study
                was conducted using a{" "}
                <span className="text-primary">
                  Google Forms survey and{" "}
                  <span className="whitespace-nowrap">in-depth</span> interviews
                </span>
                , which captured both{" "}
                <span className="text-primary">
                  quantitative and qualitative
                </span>{" "}
                patterns of workplace stress, reporting behaviors, and mobile
                usage.
              </p>

              <div className="relative w-full">
                <div className="overflow-x-auto pb-10 md:overflow-visible md:pb-0">
                  <div className="flex w-max flex-row justify-start gap-9 pr-5 md:w-full md:justify-center md:gap-15">
                    <div className="relative flex shrink-0 flex-col items-start gap-5 pr-6 md:pr-10">
                      <p className="text-primary text-lg font-medium md:text-xl">
                        Pain Point
                      </p>
                      <p className="text-lg opacity-0 md:text-xl">↓</p>
                      <p className="text-primary text-lg font-medium md:text-xl">
                        Action Point
                      </p>
                      <p className="text-lg opacity-0 md:text-xl">↓</p>
                      <p className="text-primary text-lg font-medium md:text-xl">
                        Potential Impact
                      </p>
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 right-0 h-60 w-px -translate-y-1/2 bg-black/10"
                      />
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-5">
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-80 md:w-95"
                        content={
                          <>
                            A majority of respondents worry that reporting
                            incidents through official channels could lead to
                            professional blacklisting or social isolation.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">
                          Fear of Retaliation
                        </p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-80 md:w-95"
                        content={
                          <>
                            Enable confidential reporting with{" "}
                            <span className="whitespace-nowrap">
                              AI-generated
                            </span>
                            , objective reports that minimize personal exposure.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">
                          Anonymous Reporting
                        </p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <p className="text-center text-lg md:text-xl">
                        Safer Reporting Experience
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-5">
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-80 md:w-95"
                        content={
                          <>
                            Respondents often enter new job sites with no prior
                            knowledge of the site’s safety history or culture.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">
                          Lack of Site Knowledge
                        </p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-80 md:w-95"
                        content={
                          <>
                            Provide a community-powered map with real-time
                            transparency into site safety before arrival.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">Incident Map</p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <p className="text-center text-lg md:text-xl">
                        Proactive Risk Assessment
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-5">
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-65 md:w-95"
                        content={
                          <>
                            Feelings of isolation in male-dominated workplaces.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">
                          Psychological Isolation
                        </p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <InfoPopover
                        ariaLabel="Challenges faced by women and gender-diverse tradespeople"
                        popoverWidthClass="w-80 md:w-95"
                        content={
                          <>
                            Allow public sharing of incident reports to surface
                            workplace safety trends across sites.
                          </>
                        }
                      >
                        <p className="text-lg md:text-xl">Community Feed</p>
                      </InfoPopover>
                      <p className="text-lg md:text-xl">↓</p>
                      <p className="text-center text-lg md:text-xl">
                        Visibility of Safety Trends
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-white/95 to-transparent md:hidden"
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
            whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
            transition={{ duration: 1, ease: "easeOut" }} // Animation settings
            viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
            className="mb-4 md:mb-8"
          >
            <h3 className="mb-5 font-serif text-xl font-semibold md:mb-8 md:text-2xl">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="bg-primary/70 inline-block h-[1em] w-0.5 rounded-full"
                />
                User Personas
              </span>
            </h3>
            <PhotoView className="flex flex-row items-center justify-center gap-12 md:gap-30">
              <Image
                src={PersonaPri}
                alt="Primary User Persona"
                className="h-[30vh] w-auto cursor-pointer rounded-2xl shadow-xl md:h-[70vh]"
              />
              <Image
                src={PersonaSec}
                alt="Secondary User Persona"
                className="h-[30vh] w-auto cursor-pointer rounded-2xl shadow-xl md:h-[70vh]"
              />
            </PhotoView>
          </motion.section>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
          id="design-process"
        >
          <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
            Design Process
          </h2>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          id="development-process"
        >
          <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
            Development Process
          </h2>
        </motion.section>
      </section>
    </main>
  );
}
