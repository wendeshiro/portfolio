import type { Variants } from "framer-motion";

export const homeTitleMotionProps = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const homeCardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const homeCardVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const homeCardSectionMotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: homeCardContainerVariants,
} as const;
