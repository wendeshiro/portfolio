import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProjectSubtitle() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "center 0.25"], // start when top of element is at 80% of viewport, end when center is at 25%
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.hr
      ref={ref}
      style={{ scaleX, originX: 0 }} // Bind scroll value to scaleX
      className="mt-20 mb-6 border-t border-gray-300"
    />
  );
}
