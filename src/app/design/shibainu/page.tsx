"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import HeroImg from "@/images/design/shibainu/shibainu-hero.webp";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function Shibainu() {
  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Shiba Inu Motion Graphic Video"
          year={2025}
          description="A short animated introduction to the Shiba Inu."
        />
      </header>
      <ParallaxImage src={HeroImg} alt="Shibainu hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              This project is a short motion graphics animation introducing the
              Shiba Inu dog breed. Using playful visual elements, animated
              typography, and smooth transitions, the video presents key
              characteristics of Shiba Inus. Designed to be engaging and
              informative, the animation communicates information through clear
              visual storytelling and rhythmic motion design.
            </p>
          }
          secondaryText={
            <>
              <p>
                *This is an academic project created for educational purposes.
              </p>
            </>
          }
          details={[
            {
              label: "Tools & Skills",
              content: "After Effects, Illustrator, Motion Graphics Design",
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
              Final Animation
            </h2>
            <div className="flex h-auto items-center justify-center overflow-hidden rounded-lg bg-[#f9e7d6] p-4 md:h-auto md:px-20 md:py-8">
              <video
                controls
                playsInline
                preload="auto"
                poster="/videos/shibainu/shibainu-placeholder.webp"
                className="w-full rounded-lg shadow-lg md:max-w-270"
              >
                <source src="/videos/shibainu/shibainu.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
