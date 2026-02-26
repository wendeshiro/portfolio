"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/development/eat/eat-hero.webp";
import Snippet01 from "@/images/development/eat/snippet-01.webp";
import Snippet02 from "@/images/development/eat/snippet-02.webp";
import Snippet03 from "@/images/development/eat/snippet-03.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function Eat() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="What Should I Eat"
          year={2025}
          description="A blind-box food discovery web app."
        />
      </header>
      <ParallaxImage src={HeroImg} alt="Plan-it Trip Planning Web App hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              This web app was designed for individuals who struggle to decide
              what to eat. The challenge was to create an engaging and intuitive
              experience that supports both spontaneous discovery and
              intentional browsing. The solution combines a{" "}
              <span className="text-primary">“blind box”</span> randomizer with
              category-based browsing, allowing users to explore dishes
              effortlessly while maintaining a sense of control and flexibility.
            </p>
          }
          secondaryText={
            <p>
              *This is an academic project created for educational purposes.
            </p>
          }
          details={[
            {
              label: "Deliverables",
              content: "Desktop Web Application",
            },
            {
              label: "Tools",
              content: "Vanilla JavaScript, HTML, CSS, Git, GitHub",
            },
            {
              label: "Skills",
              content:
                "DOM Manipulation, Event Handling, Fetch API, Dynamic Content Rendering, URL Parameter Handling",
            },
            {
              label: "Main Responsibilities",
              content:
                "Web Application Development, Animation design and implementation",
            },
          ]}
          links={[
            {
              label: "Live App",
              url: "https://wendeshiro.github.io/What-Should-I-Eat/",
              icon: "globe",
            },
            {
              label: "GitHub Repo",
              url: "https://github.com/wendeshiro/What-Should-I-Eat",
              icon: "github",
            },
          ]}
        />
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.4 }} // Trigger animation when x% in view, only once
          className="relative"
        >
          <h2 className="mb-7 font-serif text-2xl font-medium md:text-4xl md:font-normal">
            Product Demo
          </h2>
          <div className="flex h-auto items-center justify-center overflow-hidden rounded-xl bg-[#FFC709]/20 p-4 md:h-auto md:px-20 md:py-8">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/eat/eat-demo-placeholder.webp"
              className="w-full rounded-xl shadow-xl md:max-w-270"
            >
              <source src="/videos/eat/eat-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-10"
        >
          <div className="top-24 self-start md:sticky md:w-2/5">
            <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
              Blind Box Implementation
            </h2>
            <ol className="space-y-3 text-base md:text-lg">
              <li>
                1. Load dish data from dishes{" "}
                <span className="text-primary font-medium">.json</span>.
              </li>
              <li>
                2. <span className="text-primary font-medium">Filter</span>{" "}
                candidate dishes by selected category or subCategory.
              </li>
              <li>
                3. Generates a{" "}
                <span className="text-primary font-medium">random index</span>{" "}
                to display a dish when a blind box is clicked.
              </li>
              <li>
                4. Pass the dish ID via{" "}
                <span className="text-primary font-medium">
                  URL query string
                </span>{" "}
                and render the matching dish on the details page based on the id
                parameter.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-8 md:mt-17 md:w-3/5">
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
              <Image
                src={Snippet01}
                alt="snippet01"
                placeholder="blur"
                unoptimized
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
              <Image
                src={Snippet02}
                alt="snippet02"
                placeholder="blur"
                unoptimized
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
              <Image
                src={Snippet03}
                alt="snippet03"
                placeholder="blur"
                unoptimized
              />
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
