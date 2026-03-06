"use client";

import { useCallback, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import BackToTop from "@/components/BackToTop";
import BrochureMockup from "@/images/design/gallery/brochure-mockup.webp";
import EAdvertMockup from "@/images/design/gallery/e-advert-mockup.webp";
import MenuMockup from "@/images/design/gallery/menu-mockup.webp";
import MoviePoster from "@/images/design/gallery/movie-poster.webp";
import OutfitAppMockup from "@/images/design/gallery/outfit-app-mockup.webp";
import ShoppingApp from "@/images/design/gallery/shopping-app.webp";
import WireframingPractice from "@/images/design/gallery/wireframing-practice.webp";
import Can from "@/images/home/can.webp";
import PowerBank from "@/images/home/power-bank.webp";
import Shibainu from "@/images/home/shibainu.webp";
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
  description: string;
  widthClass: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: OutfitAppMockup,
    alt: "Outfit Recommendation App",
    title: "Outfit Recommendation App",
    description: "Figma, UI/UX Design",
    widthClass: "md:w-[35rem]",
  },
  {
    src: ShoppingApp,
    alt: "Furniture Shopping App",
    title: "Furniture Shopping App",
    description: "Figma, UI/UX Design",
    widthClass: "md:w-[44rem]",
  },
  {
    src: WireframingPractice,
    alt: "Wireframing Practice",
    title: "Wireframing Practice",
    description: "Figma, UI/UX Design",
    widthClass: "md:w-[40rem]",
  },
  {
    src: BrochureMockup,
    alt: "Travel Itinerary Brochure",
    title: "Travel Itinerary Brochure",
    description: "InDesign, Photoshop",
    widthClass: "md:w-[39rem]",
  },
  {
    src: EAdvertMockup,
    alt: "Tech Exhibition Digital Signage",
    title: "Tech Exhibition Digital Signage",
    description: "InDesign, Photoshop",
    widthClass: "md:w-[39rem]",
  },
  {
    src: MoviePoster,
    alt: "Detective Movie Poster",
    title: "Detective Movie Poster",
    description: "Photoshop, Adobe Illustrator",
    widthClass: "md:w-[40rem]",
  },
  {
    src: MenuMockup,
    alt: "Restaurant Menu",
    title: "Restaurant Menu",
    description: "InDesign, Adobe Illustrator",
    widthClass: "md:w-[60rem]",
  },
];

export default function Design() {
  const lenis = useLenis();
  const gallerySectionRef = useRef<HTMLElement>(null);
  const GALLERY_SCROLL_OFFSET = -60; // Match navbar height so the gallery title remains visible after scroll.

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

  const handleScrollHintClick = useCallback(() => {
    if (!lenis || !gallerySectionRef.current) return;

    lenis.scrollTo(gallerySectionRef.current, {
      duration: 1,
      offset: GALLERY_SCROLL_OFFSET,
    });
  }, [lenis, GALLERY_SCROLL_OFFSET]);

  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-8 md:pb-30">
      <BackToTop />
      <section className="mb-10 md:mb-12">
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
        <ProjectCard
          isCategoryCard
          variants={categoryCardVariants}
          title="Shiba Inu Motion Graphic Video"
          subtitle="After Effects / Motion Graphics / Illustrator"
          description="A short animated introduction to the Shiba Inu."
          imageSrc={Shibainu}
          href="/design/shibainu"
        />
      </motion.section>

      <motion.button
        type="button"
        aria-label="Scroll to design gallery section"
        onClick={handleScrollHintClick}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-secondary/80 mt-5 flex cursor-pointer flex-col items-center md:mt-3"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 9, 0], opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          <span className="block h-5 w-5 rotate-45 border-r-2 border-b-2" />
        </motion.span>
        <motion.p
          className="text-secondary mt-4 select-none"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          Explore Gallery
        </motion.p>
      </motion.button>

      <section ref={gallerySectionRef} className="mt-10 mb-5 md:mt-22 md:mb-10">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-secondary/30 text-4xl tracking-[-0.15em] uppercase select-none md:text-7xl"
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
                      className="h-auto w-full transition-transform duration-400 sm:group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-0 bg-black/45 px-4 py-3 opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                      <p className="text-sm font-medium tracking-wide text-white md:text-base">
                        {image.title}
                      </p>
                      <p className="text-xs text-gray-300 md:text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </PhotoViewItem>
              </PhotoProvider>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-500 md:mt-15">
          *All designs in this gallery were created for educational purposes
          only. Any company names, logos, or brands shown are used for
          demonstration purposes and have no commercial affiliation.
        </p>
      </section>
    </main>
  );
}
