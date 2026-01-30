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
        <h1 className="font-serif text-5xl font-medium">{title}</h1>
        <span className="absolute -top-2 -right-16 rounded-full border border-gray-600 px-3 py-0.5 text-sm text-gray-800">
          {year}
        </span>
      </div>
      <p className="text-xl text-gray-600">{description}</p>
    </motion.div>
  );
}
