"use client";
import { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  className?: string; // Class for the container
  imageClassName?: string; // Class for the image itself
}

export default function ParallaxImage({
  src,
  alt,
  className = "h-160",
  imageClassName = "object-cover",
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="relative -top-[25%] h-[150%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className={imageClassName}
          {...props}
        />
      </motion.div>
    </div>
  );
}
