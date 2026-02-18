"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const SHARED_CLASSES = {
  contentWrapper: "px-4 pt-3 pb-4 sm:px-7 sm:pt-4 sm:pb-6 2xl:px-6 2xl:pb-7",
  titleBase: "text-xl font-semibold text-black",
  titleDefault: "md:text-3xl",
  titleCategory: "md:text-2xl",
  subtitle: "mt-1 truncate text-sm text-gray-700 md:text-base",
  descriptionBase: "mt-1.5 text-sm text-gray-800",
  descriptionDefault: "md:text-lg",
  descriptionCategory: "md:text-base",
};

interface ProjectCardProps {
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  href: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  className?: string;
  isCategoryCard?: boolean;
  variants?: Variants;
  custom?: number;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  href,
  className,
  isCategoryCard = false,
  variants,
  custom,
}: ProjectCardProps) {
  const useParentVariants = Boolean(variants);
  const containerClassName = [
    "overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg select-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const titleClassName = [
    SHARED_CLASSES.titleBase,
    isCategoryCard ? SHARED_CLASSES.titleCategory : SHARED_CLASSES.titleDefault,
  ].join(" ");
  const descriptionClassName = [
    SHARED_CLASSES.descriptionBase,
    isCategoryCard
      ? SHARED_CLASSES.descriptionCategory
      : SHARED_CLASSES.descriptionDefault,
  ].join(" ");

  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial={useParentVariants ? undefined : { opacity: 0, y: 50 }}
      animate={useParentVariants ? undefined : { opacity: 1, y: 0 }}
      transition={
        useParentVariants ? undefined : { duration: 0.5, ease: "easeOut" }
      }
      className={containerClassName}
    >
      <Link
        href={href}
        aria-label={typeof title === "string" ? title : "Project link"}
        className="group block"
      >
        <div className="relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={
                imageAlt ??
                (typeof title === "string" ? title : "Project image")
              }
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : null}
        </div>

        <div className={SHARED_CLASSES.contentWrapper}>
          <p className={titleClassName}>{title}</p>
          <p className={SHARED_CLASSES.subtitle}>{subtitle}</p>
          <p className={descriptionClassName}>{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
