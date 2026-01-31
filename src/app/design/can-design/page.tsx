"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/design/can-design/hero.webp";
import LabelPeach from "@/images/design/can-design/label-peach.png";
import LabelOrange from "@/images/design/can-design/label-orange.png";
import LabelApple from "@/images/design/can-design/label-apple.png";
import ColorImg from "@/images/design/can-design/color.svg";
import TypographyImg from "@/images/design/can-design/typography.svg";
import FinalMockupImg from "@/images/design/can-design/final-mockup.webp";
import { motion } from "framer-motion";

export default function CanDesign() {
  return (
    <main className="max-w-full py-16 md:py-36">
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Orchard Brew Can Design"
          year={2025}
          description="A refreshing visual identity for a contemporary fruit tea collection."
        />
      </header>
      <ParallaxImage
        src={HeroImg}
        alt="Orchard Brew Can Design hero"
        className="mt-6 mb-12 h-86 md:h-160 2xl:h-[85vh]"
        unoptimized
      />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          description={
            <>
              <p className="text-xl leading-relaxed md:text-2xl">
                Orchard Brew is a contemporary{" "}
                <span className="text-primary">fruit tea series</span> for
                on-the-go urban professionals, bringing together the authentic
                flavors of real tea and fruit in a modern, convenient format.
                The requirement was to develop a{" "}
                <span className="text-primary">cohesive visual identity</span>{" "}
                for three distinct flavors—Peach Oolong, Orange Jasmine, and
                Apple Black Tea—that feels both vibrant and natural.
              </p>
              <p className="text-base text-gray-600 md:text-lg">
                A minimalist layout was employed to ensure immediate flavor
                recognition in a crowded market. This approach creates a
                striking shelf presence, effectively communicating the brand’s
                commitment to fresh, botanical-inspired ingredients for
                health-conscious consumers.
              </p>
              <p className="text-base text-gray-600 md:text-lg">
                *This is a concept work created for educational purposes.
              </p>
            </>
          }
          details={[
            {
              label: "Deliverables",
              content: "Static Mockup, Interactive 3D Mockup, Dieline, Proof",
            },
            {
              label: "Tools & Skills",
              content: "Illustrator / Photoshop / Blender / Three.js",
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
          <div className="flex flex-col md:flex-row md:justify-between md:gap-18">
            <div className="top-24 space-y-6 self-start md:sticky md:w-2/5">
              <h2 className="font-serif text-2xl font-medium md:text-4xl md:font-normal">
                Labels
              </h2>
              <p className="text-base md:text-lg">
                The design incorporates fruit and tea elements to evoke a
                sensory connection to the ingredients.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-8 md:mt-18 md:w-3/5">
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/5">
                <Image src={LabelPeach} alt="peach label" placeholder="blur" />
              </div>
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/5">
                <Image
                  src={LabelOrange}
                  alt="orange label"
                  placeholder="blur"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/5">
                <Image src={LabelApple} alt="apple label" placeholder="blur" />
              </div>
            </div>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
        >
          <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
            Color Palette & Typography
          </h2>
          <div className="flex flex-col gap-18 md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:w-1/2">
              <p className="mb-10 text-base md:text-lg">
                A vibrant palette of peach pink, bright orange, and deep apple
                red was chosen to evoke immediate sensory recognition of the
                flavors, creating an energetic and appetizing shelf presence.
              </p>
              <Image
                src={ColorImg}
                alt="color palette"
                width={350}
                height={350}
              />
            </div>
            <div className="flex flex-col items-center md:w-1/2">
              <p className="mb-10 text-base md:text-lg">
                Lexend Deca was selected for its clean, geometric forms,
                enhancing readability and reinforcing the brand’s modern,
                approachable personality while balancing the bold visual
                elements of the fruit imagery.
              </p>
              <Image
                src={TypographyImg}
                alt="typography"
                width={400}
                height={400}
              />
            </div>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="flex flex-col items-center"
        >
          <Image
            src={FinalMockupImg}
            alt="final mockup"
            placeholder="blur"
            className="h-[90vh] w-auto rounded-xl object-cover shadow-2xl shadow-black/5"
            unoptimized
          />
        </motion.section>
      </section>
    </main>
  );
}
