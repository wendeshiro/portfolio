"use client";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: StaticImageData | string;
  alt?: string;
  unoptimized?: boolean;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  mb?: string;
}

export default function ParallaxImage({
  src,
  alt,
  unoptimized = true,
  priority = true,
  placeholder = "blur",
  mb = "mb-12",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative mt-6 ${mb} h-86 w-full overflow-hidden md:h-160 2xl:h-[85vh]`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.2, ease: [0.3, 0, 0.15, 1] }}
    >
      <motion.div style={{ y }} className="relative -top-[20%] h-[140%] w-full">
        <Image
          src={src}
          alt={alt || "Parallax Image"}
          fill
          priority={priority}
          placeholder={placeholder}
          unoptimized={unoptimized}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
