"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/design/can-design/can-hero.webp";
import LabelPeach from "@/images/design/can-design/label-peach.png";
import LabelOrange from "@/images/design/can-design/label-orange.png";
import LabelApple from "@/images/design/can-design/label-apple.png";
import ColorImg from "@/images/design/can-design/color.svg";
import TypographyImg from "@/images/design/can-design/typography.svg";
import FinalMockupImg from "@/images/design/can-design/final-mockup.webp";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import ScrollSpyNav from "@/components/ScrollSpyNav";
import BackButton from "@/components/BackButton";
import CanScene from "@/components/CanScene";

export default function CanDesign() {
  const [activateCanScene, setActivateCanScene] = useState(false);

  const handleHeroAnimationComplete = useCallback(() => {
    setActivateCanScene(true);
  }, []);

  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Orchard Brew Can Design"
          year={2025}
          description="A refreshing visual identity for a contemporary fruit tea collection with interactive 3D product displays."
        />
      </header>
      <ScrollSpyNav
        sections={[
          { id: "overview", label: "Overview" },
          {
            id: "interactive-3d-can",
            label: "Interactive 3D Can",
          },
          { id: "labels", label: "Labels" },
          {
            id: "color-palette-typography",
            label: "Color Palette & Typography",
          },
        ]}
      />
      <ParallaxImage
        src={HeroImg}
        alt="Orchard Brew Can Design hero"
        onAnimationComplete={handleHeroAnimationComplete}
      />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              Orchard Brew is a contemporary{" "}
              <span className="text-primary">fruit tea series</span> for
              on-the-go urban professionals, bringing together the authentic
              flavors of real tea and fruit in a modern, convenient format. The
              requirement was to develop a{" "}
              <span className="text-primary">cohesive visual identity</span> for
              three distinct flavors—Peach Oolong, Orange Jasmine, and Apple
              Black Tea—that feels both vibrant and natural.
            </p>
          }
          secondaryText={
            <>
              <p>
                A minimalist layout was employed to ensure immediate flavor
                recognition in a crowded market. This approach creates a
                striking shelf presence, effectively communicating the brand’s
                commitment to fresh, botanical-inspired ingredients for
                health-conscious consumers.
              </p>
              <p>
                *This is an academic project created for educational purposes.
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
              content:
                "Illustrator, Photoshop, Blender, React Three Fiber (Three.js), Drei",
            },
          ]}
        />
        <SectionDivider />

        <CanScene shouldActivate={activateCanScene} />
        <SectionDivider marginTop="md:mt-5" />

        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
          id="labels"
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
          id="color-palette-typography"
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
                className="h-auto w-70 md:w-87.5"
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
                className="h-auto w-70 md:w-87.5"
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
            className="h-[80vh] w-auto rounded-xl object-cover shadow-2xl shadow-black/5 md:h-[90vh]"
            unoptimized
          />
        </motion.section>
      </section>
    </main>
  );
}
