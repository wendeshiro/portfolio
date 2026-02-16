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
import { useState, Suspense, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Center,
  useTexture,
  Html,
  // ContactShadows,
} from "@react-three/drei";
import FruitTeaCan from "@/components/FruitTeaCan";
import ScrollSpyNav from "@/components/ScrollSpyNav";
import BackButton from "@/components/BackButton";

const FLAVORS = [
  {
    id: "peach",
    name: "Peach",
    texture: "/model-textures/label-for-blender-peach.png",
    color: "bg-[#e87a90]",
  },
  {
    id: "orange",
    name: "Orange",
    texture: "/model-textures/label-for-blender-orange.png",
    color: "bg-[#fb8500]",
  },
  {
    id: "apple",
    name: "Apple",
    texture: "/model-textures/label-for-blender-apple.png",
    color: "bg-[#f9443c]",
  },
];

export default function CanDesign() {
  const [currentTexture, setCurrentTexture] = useState(FLAVORS[0].texture);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Show loader until Canvas is mounted AND first assets finish loading
  const showCanvasLoader = !canvasReady || !assetsLoaded;

  // Defer texture preloading and 3D canvas until after the hero animation
  // completes, preventing main-thread contention that causes clipPath stutter.
  const handleHeroAnimationComplete = useCallback(() => {
    FLAVORS.forEach((flavor) => {
      useTexture.preload(flavor.texture);
    });
    setCanvasReady(true);

    // Give textures time to decode, then hide loader
    window.setTimeout(() => {
      setAssetsLoaded(true);
    }, 800);
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setCanvasReady(true);
      // Also hide loader after fallback triggers
      window.setTimeout(() => {
        setAssetsLoaded(true);
      }, 1000);
    }, 1800);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative max-w-full py-16 md:py-36">
      <BackButton />
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Orchard Brew Can Design"
          year={2025}
          description="A refreshing visual identity for a contemporary fruit tea collection."
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
              <p>*This is a concept work created for educational purposes.</p>
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
                "Illustrator, Photoshop, Blender, React Three Fiber (Three.js)",
            },
          ]}
        />
        <SectionDivider />

        <section className="relative mt-5 flex h-[80vh] w-full flex-col items-center overflow-hidden pt-5 md:h-[90vh] md:pt-0">
          {/* label control panel */}
          <div className="absolute top-1 left-2 z-10 flex w-full justify-center md:top-0 md:right-2 md:left-auto md:h-full md:w-36 md:flex-col">
            <div className="flex flex-row space-x-4 md:flex-col md:space-y-2">
              {FLAVORS.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => setCurrentTexture(flavor.texture)}
                  className={`flex w-25 items-center justify-center rounded-2xl border px-3 py-2 transition-all duration-600 ease-out md:w-full md:justify-start md:border-2 md:px-5 ${
                    currentTexture === flavor.texture
                      ? "scale-105 border-gray-600"
                      : "border-transparent hover:border-gray-300"
                  } `}
                >
                  {/* color dot */}
                  <div
                    className={`h-3 w-3 rounded-full md:h-5 md:w-5 ${flavor.color} mr-2 shadow-sm md:mr-3`}
                  ></div>

                  {/* Text */}
                  <div>
                    <p
                      className={`text-sm font-semibold transition-colors md:text-lg ${currentTexture === flavor.texture ? "text-black" : "text-gray-700"}`}
                    >
                      {flavor.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3D can section */}
          <div
            id="interactive-3d-can"
            className="relative h-full w-[80vw] md:w-full"
          >
            {canvasReady ? (
              <Canvas
                camera={{ position: [2, 1, 2], fov: isMobile ? 3.5 : 2.5 }}
              >
                <Environment preset="city" />
                <ambientLight intensity={0.6} />
                <spotLight
                  position={[-3, -2, 2]}
                  angle={0.2}
                  penumbra={0.5}
                  intensity={7}
                />

                {/* Float
            - speed for how fast it moves, higher is faster
            - rotationIntensity for how much it rotates, higher is more
            - floatIntensity for how much it moves up and down, higher is more
            - floatingRange for the vertical movement range, [min, max]
          */}
                <Suspense
                  fallback={
                    <Html center>
                      <div>Loading 3D Model...</div>
                    </Html>
                  }
                >
                  <Float
                    speed={0.7}
                    rotationIntensity={3}
                    floatIntensity={1.5}
                    floatingRange={[-0.005, 0.005]}
                  >
                    {/* only change textureUrl to switch designs, no re-mounting, so position stays
                     */}
                    {/* scale can size by scale prop */}
                    <Center rotation={[-0.1, 0.0, 0.4]}>
                      <FruitTeaCan textureUrl={currentTexture} scale={1} />
                    </Center>
                  </Float>
                </Suspense>

                {/* bottom shadow */}
                {/* <ContactShadows
                position={[0, -0.1, 0]}
                opacity={0.4}
                scale={1}
                blur={2}
              /> */}

                {/* Interactive controller: allows mouse drag to view */}
                <OrbitControls makeDefault enableZoom={false} />
              </Canvas>
            ) : null}

            {showCanvasLoader && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <div className="rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Loading 3D Model...
                </div>
              </div>
            )}
          </div>
        </section>
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
