import type { Variants } from "framer-motion";

export const categoryTitleMotionProps = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export const categoryCardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const categoryCardVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const categoryCardSectionMotionProps = {
  initial: "hidden",
  animate: "visible",
  variants: categoryCardContainerVariants,
} as const;
