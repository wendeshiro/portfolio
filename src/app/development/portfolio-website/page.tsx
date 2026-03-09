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
import BarredHeading from "@/components/BarredHeading";
import Naming from "@/images/development/portfolio/naming.webp";
import Eslint from "@/images/development/portfolio/eslint.webp";
import Ci from "@/images/development/portfolio/ci.webp";
import ExternalLink from "@/components/ExternalLink";

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
              label: "Frontend",
              content:
                "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, Matter.js",
            },
            {
              label: "Tools & Workflow",
              content:
                "Git, GitHub, ESLint, Prettier, GitHub Actions (CI), Vercel",
            },
            {
              label: "AI Tools",
              content: "GitHub Copilot, OpenAI Codex, Context7 (MCP)",
            },
            {
              label: "Design",
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
          id="engineering-standards"
        >
          <h2 className="mb-3 font-serif text-2xl font-medium md:mb-6 md:text-4xl md:font-normal">
            Engineering Standards
          </h2>
          <section className="mb-5 md:mb-10">
            <div className="flex flex-col md:relative md:flex-row md:gap-13">
              <div className="md:sticky md:top-24 md:w-1/2 md:self-start">
                <BarredHeading text="Naming Conventions & Project Structure" />
                <p className="mt-2 mb-5 text-base leading-relaxed md:text-lg">
                  Clear naming conventions and a well-structured project setup
                  were established to ensure clarity, consistency, and
                  maintainability.{" "}
                  <span className="text-primary font-medium">
                    Git and GitHub
                  </span>{" "}
                  were used for version control and structured development
                  workflow.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg md:w-1/2">
                <Image
                  src={Naming}
                  alt="Naming Conventions and Project Structure"
                  placeholder="blur"
                />
              </div>
            </div>
          </section>
          <motion.section
            initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
            whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
            transition={{ duration: 1, ease: "easeOut" }} // Animation settings
            viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
            className="mb-5 md:mb-8"
          >
            <div className="flex flex-col md:relative md:flex-row md:gap-13">
              <div className="md:sticky md:top-24 md:w-1/2 md:self-start">
                <BarredHeading text="Code Quality Practices" />
                <div className="mt-2 mb-5 space-y-3 text-base leading-relaxed md:text-lg">
                  <p>
                    <span className="text-primary font-medium">ESLint</span> is
                    configured with strict rules to prevent common issues and
                    enforce consistent coding standards.
                  </p>
                  <p>
                    <span className="text-primary font-medium">Prettier</span>{" "}
                    and{" "}
                    <span className="text-primary font-medium">
                      prettier-plugin-tailwindcss
                    </span>{" "}
                    are used to maintain consistent formatting and automatically
                    organize Tailwind utility classes, improving overall
                    readability and maintainability.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg md:w-1/2">
                <Image
                  src={Eslint}
                  alt="Code Quality Practices"
                  placeholder="blur"
                />
              </div>
            </div>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
            whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
            transition={{ duration: 1, ease: "easeOut" }} // Animation settings
            viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
            className="mb-5 md:mb-8"
          >
            <div className="flex flex-col md:relative md:flex-row md:gap-13">
              <div className="md:sticky md:top-24 md:w-1/2 md:self-start">
                <BarredHeading text="Continuous Integration (CI)" />
                <div className="mt-2 mb-5 space-y-3 text-base leading-relaxed md:text-lg">
                  <p>
                    Automated CI pipeline using{" "}
                    <ExternalLink
                      className="text-primary"
                      fontWeight="medium"
                      href="https://github.com/wendeshiro/portfolio/blob/main/.github/workflows/ci.yml"
                    >
                      GitHub Actions
                    </ExternalLink>
                    . On every push and pull request, it runs linting,{" "}
                    <span className="text-primary font-medium">
                      duplicate-ID checks
                    </span>
                    , type checking, and build verification.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg md:w-1/2">
                <Image
                  src={Ci}
                  alt="Continuous Integration"
                  placeholder="blur"
                />
              </div>
            </div>
          </motion.section>
        </motion.section>
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
            className="w-full rounded-lg"
          />
        </motion.section>
      </section>
    </main>
  );
}
