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

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        initial={{ scale: 1.2, filter: "blur(15px)", opacity: 0.5 }}
        whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative -top-[20%] h-[140%] w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          placeholder="blur"
          className={imageClassName}
          {...props}
        />
      </motion.div>
    </div>
  );
}
