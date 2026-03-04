"use client";

import { useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";
import BrochureMockup from "@/images/design/gallery/brochure-mockup.webp";
import EAdvertMockup from "@/images/design/gallery/e-advert-mockup.webp";
import IllustratorTrace01 from "@/images/design/gallery/illustrator-trace01.webp";
import IllustratorTrace02 from "@/images/design/gallery/illustrator-trace02.webp";
import MenuMockup from "@/images/design/gallery/menu-mockup.webp";
import MoviePoster from "@/images/design/gallery/movie-poster.webp";
import OutfitAppMockup from "@/images/design/gallery/outfit-app-mockup.webp";
import ShoppingApp from "@/images/design/gallery/shopping-app.webp";
import TypographyPoster01 from "@/images/design/gallery/typography-poster01.webp";
import TypographyPoster02 from "@/images/design/gallery/typography-poster02.webp";
import TypographyPoster03 from "@/images/design/gallery/typography-poster03.webp";
import WireframingPractice from "@/images/design/gallery/wireframing-practice.webp";
import Can from "@/images/home/can.webp";
import PowerBank from "@/images/home/power-bank.webp";
import {
  categoryCardSectionMotionProps,
  categoryCardVariants,
  categoryTitleMotionProps,
} from "@/lib/categoryPageAnimations";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { PhotoProvider, PhotoView as PhotoViewItem } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type GalleryImage = {
  src: StaticImageData;
  alt: string;
  title: string;
  widthClass: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: OutfitAppMockup,
    alt: "Outfit Recommendation App",
    title: "Outfit Recommendation App",
    widthClass: "md:w-[35rem]",
  },
  {
    src: ShoppingApp,
    alt: "Furniture Shopping App",
    title: "Furniture Shopping App",
    widthClass: "md:w-[44rem]",
  },
  {
    src: WireframingPractice,
    alt: "Wireframing Practice",
    title: "Wireframing Practice",
    widthClass: "md:w-[40rem]",
  },
  {
    src: BrochureMockup,
    alt: "Travel Itinerary Brochure",
    title: "Travel Itinerary Brochure",
    widthClass: "md:w-[39rem]",
  },
  {
    src: EAdvertMockup,
    alt: "Tech Exhibition Digital Signage",
    title: "Tech Exhibition Digital Signage",
    widthClass: "md:w-[51rem]",
  },
  {
    src: IllustratorTrace01,
    alt: "Adobe Illustrator Tracing Practice 01",
    title: "Adobe Illustrator Tracing Practice 01",
    widthClass: "md:w-[28rem]",
  },
  {
    src: IllustratorTrace02,
    alt: "Adobe Illustrator Tracing Practice 02",
    title: "Adobe Illustrator Tracing Practice 02",
    widthClass: "md:w-[35rem]",
  },
  {
    src: MenuMockup,
    alt: "Restaurant Menu",
    title: "Restaurant Menu",
    widthClass: "md:w-[44rem]",
  },
  {
    src: MoviePoster,
    alt: "Detective Movie Poster",
    title: "Detective Movie Poster",
    widthClass: "md:w-[60rem]",
  },
  {
    src: TypographyPoster01,
    alt: "Typography poster 01",
    title: "Typography Poster 01",
    widthClass: "md:w-[25rem]",
  },
  {
    src: TypographyPoster02,
    alt: "Typography poster 02",
    title: "Typography Poster 02",
    widthClass: "md:w-[25rem]",
  },
  {
    src: TypographyPoster03,
    alt: "Typography poster 03",
    title: "Typography Poster 03",
    widthClass: "md:w-[25rem]",
  },
];

export default function Design() {
  const lenis = useLenis();

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!lenis) return;
      if (visible) {
        lenis.stop();
      } else {
        lenis.start();
      }
    },
    [lenis],
  );

  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-secondary/20 text-6xl tracking-[-0.18em] uppercase select-none md:text-9xl"
        >
          Craft<span className="mr-[0.2em] ml-[0.2em]">&</span>Ref
          <span className="mr-[0.13em] ml-[0.13em]">i</span>ne
        </motion.p>
      </section>
      <motion.section
        {...categoryCardSectionMotionProps}
        className="grid gap-8 px-5 md:max-w-screen-2xl md:grid-cols-3 md:gap-10 md:px-20"
      >
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="Orchard Brew Can Design"
          subtitle="Illustrator / Photoshop / Blender / React Three Fiber (Three.js)"
          description="A refreshing visual identity for a contemporary fruit tea collection with interactive 3D product displays."
          imageSrc={Can}
          href="/design/can-design"
        />
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="Power Bank Commercial"
          subtitle="After Effects / Video Editing / Motion Graphics / Filming / Storyboarding"
          description="A fast-paced promotional video for a multifunctional power bank."
          imageSrc={PowerBank}
          href="/design/power-bank"
        />
      </motion.section>

      <section className="mb-10 md:mt-22 md:mb-10">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-secondary/30 text-6xl tracking-[-0.15em] uppercase select-none md:text-7xl"
        >
          Design
          <span className="mr-[0.13em] ml-[0.25em]">Gallery</span>
        </motion.p>
      </section>
      <section className="w-full px-5 md:max-w-screen-2xl md:px-21">
        <div className="flex flex-wrap items-start justify-center gap-6">
          {galleryImages.map((image) => (
            <div key={image.alt} className={`w-full ${image.widthClass}`}>
              <PhotoProvider
                onVisibleChange={handleVisibleChange}
                toolbarRender={({ onScale, scale }) => (
                  <>
                    <svg
                      className="PhotoView-PhotoSlider__toolbarIcon mr-2 cursor-pointer text-white/80 duration-300 hover:text-white"
                      width="36"
                      height="36"
                      viewBox="0 0 768 768"
                      fill="currentColor"
                      onClick={() => onScale(scale + 0.7)}
                    >
                      <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
                    </svg>
                    <svg
                      className="PhotoView-PhotoSlider__toolbarIcon mr-1 cursor-pointer text-white/80 duration-300 hover:text-white"
                      width="36"
                      height="36"
                      viewBox="0 0 768 768"
                      fill="currentColor"
                      onClick={() => onScale(scale - 0.7)}
                    >
                      <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
                    </svg>
                  </>
                )}
              >
                <PhotoViewItem src={image.src.src}>
                  <div className="group relative cursor-pointer overflow-hidden rounded-md">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      placeholder="blur"
                      className="h-auto w-full transition-transform duration-400 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-black/50 px-4 py-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-medium tracking-wide text-white md:text-base">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </PhotoViewItem>
              </PhotoProvider>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
