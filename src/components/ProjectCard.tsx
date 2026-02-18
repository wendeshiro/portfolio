import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

const SHARED_CLASSES = {
  contentWrapper: "px-4 pt-3 pb-4 sm:px-7 sm:pt-4 sm:pb-6 2xl:px-6 2xl:pb-7",
  title: "text-xl font-semibold text-black md:text-3xl",
  subtitle: "mt-1 truncate text-sm text-gray-700 md:text-base",
  description: "mt-1.5 text-sm text-gray-800 md:text-lg",
};

interface ProjectCardProps {
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  href: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  href,
  className,
}: ProjectCardProps) {
  const containerClassName = [
    "overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <Link
        href={href}
        aria-label={typeof title === "string" ? title : "Project link"}
        className="group block"
      >
        <div className="relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? (typeof title === "string" ? title : "Project image")}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : null}
        </div>

        <div className={SHARED_CLASSES.contentWrapper}>
          <p className={SHARED_CLASSES.title}>{title}</p>
          <p className={SHARED_CLASSES.subtitle}>{subtitle}</p>
          <p className={SHARED_CLASSES.description}>{description}</p>
        </div>
      </Link>
    </div>
  );
}
