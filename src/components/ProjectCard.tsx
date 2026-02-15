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
  const containerClassName = ["overflow-hidden rounded-3xl bg-white", className]
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
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-gray-200">
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
        </Link>
      ) : (
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
      )}

      <div className="px-8 pt-4 pb-6">
        <p className="text-3xl font-bold text-black">{title}</p>
        <p className="mt-3 text-base text-gray-700">{subtitle}</p>
        <p className="mt-2 text-lg text-black">{description}</p>
      </div>
    </div>
  );
}
