import { motion } from "framer-motion";

type ProjectTitleProps = {
  title?: string;
  year?: string | number;
  description?: string;
};

export default function ProjectTitle({
  title = "Title",
  year = "2025",
  description = "Description",
}: ProjectTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
      whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation settings
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% in view, only once
      className="flex flex-col gap-3"
    >
      <div className="relative w-fit">
        <span className="mb-2 inline-block rounded-full border border-gray-600 px-3 py-0.5 text-xs text-gray-800 md:absolute md:-top-3 md:-right-16 md:text-sm">
          {year}
        </span>
        <h1 className="font-serif text-3xl font-medium md:text-5xl">{title}</h1>
      </div>
      <p className="text-base text-gray-600 md:text-xl">{description}</p>
    </motion.div>
  );
}
