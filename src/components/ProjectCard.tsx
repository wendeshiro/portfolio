import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

const SHARED_CLASSES = {
  contentWrapper: "px-4 pt-3 pb-4 sm:px-7 sm:pt-4 sm:pb-6 2xl:px-6 2xl:pb-7",
  title: "text-xl font-bold text-black md:text-3xl",
  subtitle: "mt-2 truncate text-sm text-gray-700 md:mt-3 md:text-base",
  description: "mt-1.5 text-sm text-gray-800 md:mt-2 md:text-lg",
};

interface ProjectCardProps {
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  href?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imageContent?: ReactNode;
  className?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  href,
  imageContent,
  className,
}: ProjectCardProps) {
  const hasLink = Boolean(href);

  const containerClassName = [
    "overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mediaWrapperClassName = hasLink
    ? "relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200"
    : "relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200";

  const mediaContentClassName = hasLink
    ? "absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
    : "absolute inset-0";

  const imageClassName = hasLink
    ? "object-cover transition-transform duration-500 ease-out group-hover:scale-110"
    : "object-cover";

  const cardBody = (
    <>
      <div className={mediaWrapperClassName}>
        {imageContent ? (
          <div className={mediaContentClassName}>{imageContent}</div>
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={
              imageAlt ?? (typeof title === "string" ? title : "Project image")
            }
            fill
            className={imageClassName}
          />
        ) : null}
      </div>

      <div className={SHARED_CLASSES.contentWrapper}>
        <p className={SHARED_CLASSES.title}>{title}</p>
        <p className={SHARED_CLASSES.subtitle}>{subtitle}</p>
        <p className={SHARED_CLASSES.description}>{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <div className={containerClassName}>
        <Link
          href={href}
          aria-label={typeof title === "string" ? title : "Project link"}
          className="group block"
        >
          {cardBody}
        </Link>
      </div>
    );
  }

  return <div className={containerClassName}>{cardBody}</div>;
}
