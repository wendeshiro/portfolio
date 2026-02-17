"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/design/power-bank/power-bank-hero.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import Storyboard01 from "@/images/design/power-bank/storyboard-01.webp";
import Storyboard02 from "@/images/design/power-bank/storyboard-02.webp";
import PhotoView from "@/components/PhotoView";

export default function PlanIt() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Power Bank Commercial"
          year={2025}
          description="A fast-paced promotional video for a multifunctional power bank."
        />
      </header>
      <ParallaxImage src={HeroImg} alt="Plan-it Trip Planning Web App hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              This project is a{" "}
              <span className="text-primary">promotional video</span> for a
              multifunctional <span className="text-primary">power bank</span>,
              using fast-paced editing and motion graphics to present its core
              features and real-world use cases. Created to capture attention in
              a competitive market, the video communicates product value through
              dynamic visuals, rhythmic pacing, and a structured feature-driven
              presentation.
            </p>
          }
          secondaryText={
            <>
              <p>
                *This is a conceptual project created for educational purposes.
                There is no commercial affiliation with Anker.
              </p>
            </>
          }
          details={[
            {
              label: "Tools & Skills",
              content:
                "After Effects, Photoshop, Illustrator, Storyboarding, Filming, Video Editing, Motion Graphics Design",
            },
          ]}
        />
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
        >
          <div className="flex flex-col">
            <h2 className="mb-7 font-serif text-2xl font-medium md:text-4xl md:font-normal">
              Final Promotional Video
            </h2>
            <div className="bg-primary/10 flex h-auto items-center justify-center overflow-hidden rounded-xl p-4 md:h-auto md:px-20 md:py-8">
              <video
                controls
                playsInline
                preload="auto"
                poster="/videos/power-bank/power-bank-placeholder.webp"
                className="w-full rounded-xl shadow-lg md:max-w-270"
              >
                <source
                  src="/videos/power-bank/power-bank.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
        >
          <div className="flex flex-col">
            <h2 className="mb-8 font-serif text-2xl font-medium md:text-4xl md:font-normal">
              Storyboard
            </h2>
            <PhotoView className="flex flex-col items-center justify-center gap-8 md:gap-12">
              <Image
                src={Storyboard01}
                alt="storyboard01"
                placeholder="blur"
                className="cursor-pointer rounded-2xl shadow-lg md:w-[70vw]"
              ></Image>
              <Image
                src={Storyboard02}
                alt="storyboard02"
                placeholder="blur"
                className="cursor-pointer rounded-2xl shadow-lg md:w-[70vw]"
              ></Image>
            </PhotoView>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
