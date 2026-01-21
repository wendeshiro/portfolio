"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import Image from "next/image";
import HeroImg from "@/images/design/can-design/hero.webp";
import LabelPeach from "@/images/design/can-design/label-peach.png";
import LabelOrange from "@/images/design/can-design/label-orange.png";
import LabelApple from "@/images/design/can-design/label-apple.png";
import ColorImg from "@/images/design/can-design/color.svg";
import TypographyImg from "@/images/design/can-design/typography.svg";
import FinalMockupImg from "@/images/design/can-design/final-mockup.webp";

export default function CanDesign() {
  return (
    <div className="max-w-full py-36">
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <ProjectTitle
          title="Orchard Brew Can Design"
          year={2025}
          description="A refreshing visual identity for a contemporary fruit tea collection."
        />
      </div>
      <ParallaxImage
        src={HeroImg}
        alt="Orchard Brew Can Design hero"
        className="mt-6 mb-12 h-160 2xl:h-[85vh]"
        unoptimized
      />
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <div>
          <div className="mb-6 text-4xl">Overview</div>
          <ProjectOverview
            description={
              <>
                <p className="text-2xl">
                  Orchard Brew is a contemporary{" "}
                  <span className="text-primary">fruit tea series</span>{" "}
                  designed to bridge the gap between traditional tea culture and
                  modern ready-to-drink convenience. The requirement was to
                  develop a
                  <span className="text-primary">
                    {" "}
                    cohesive visual identity
                  </span>{" "}
                  for three distinct flavors—Peach Oolong, Orange Jasmine, and
                  Apple Black Tea—that feels both vibrant and natural.
                </p>
                <p className="text-base text-gray-600">
                  By utilizing a minimalist layout and bold color blocking, the
                  design provides a clear shelf presence, effectively
                  communicating the brand’s commitment to fresh,
                  botanical-inspired ingredients for health-conscious consumers.
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
        </div>
        <div>
          <div>
            <hr className="mt-20 mb-6 border-t border-gray-300" />
            <div className="mb-6 text-4xl">Labels</div>
          </div>
          <div className="flex justify-between gap-18">
            <p className="w-2/5 text-lg">
              The challenge was to maintain a unified brand language across
              three distinct flavor profiles while ensuring each design
              effectively showcased its unique fruit and tea pairing through
              strategic color hierarchy.
            </p>
            <div className="flex w-3/5 flex-col gap-8">
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
        </div>
        <div>
          <div>
            <hr className="mt-20 mb-6 border-t border-gray-300" />
            <div className="mb-6 text-4xl">Color Palette & Typography</div>
          </div>
          <div className="flex justify-between gap-18">
            <div className="flex w-1/2 flex-col items-center">
              <p className="mb-10 text-lg">
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
            <div className="flex w-1/2 flex-col items-center">
              <p className="mb-10 text-lg">
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
        </div>
        <div className="flex flex-col items-center">
          <hr className="mt-20 mb-6 w-full border-t border-gray-300" />
          <Image
            src={FinalMockupImg}
            alt="final mockup"
            placeholder="blur"
            className="h-[90vh] w-auto rounded-xl object-cover shadow-2xl shadow-black/5"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
