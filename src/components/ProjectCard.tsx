import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

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
  const containerClassName = [
    "overflow-hidden sm:rounded-3xl rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      {href ? (
        <Link
          href={href}
          aria-label={typeof title === "string" ? title : "Project link"}
          className="group block"
        >
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-2xl bg-gray-200 sm:rounded-3xl">
            {imageContent ? (
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
                {imageContent}
              </div>
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt={
                  imageAlt ??
                  (typeof title === "string" ? title : "Project image")
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 640px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            ) : null}
          </div>

          <div className="px-4 pt-3 pb-4 sm:px-7 sm:pt-5 sm:pb-6 2xl:px-6 2xl:pb-7">
            <p className="text-xl font-bold text-black sm:text-2xl md:text-3xl">
              {title}
            </p>
            <p className="mt-2 truncate text-sm text-gray-700 sm:mt-3 sm:text-base">
              {subtitle}
            </p>
            <p className="mt-1.5 text-base text-gray-800 sm:mt-2 sm:text-lg">
              {description}
            </p>
          </div>
        </Link>
      ) : (
        <>
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200">
            {imageContent ? (
              <div className="absolute inset-0">{imageContent}</div>
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt={
                  imageAlt ??
                  (typeof title === "string" ? title : "Project image")
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 640px"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="px-4 pt-3 pb-4 sm:px-7 sm:pt-5 sm:pb-6 2xl:px-6 2xl:pb-7">
            <p className="text-xl font-bold text-black sm:text-2xl md:text-3xl">
              {title}
            </p>
            <p className="mt-2 truncate text-sm text-gray-700 sm:mt-3 sm:text-base">
              {subtitle}
            </p>
            <p className="mt-1.5 text-base text-gray-800 sm:mt-2 sm:text-lg">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
