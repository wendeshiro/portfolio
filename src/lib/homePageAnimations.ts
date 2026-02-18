import type { Variants } from "framer-motion";

export const homeCardSectionMotionProps = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 },
} as const;

export const homeHeroTextMotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.6 },
} as const;

export const homeHeroTextContainerVariants: Variants = {
  hidden: {},
  visible: {},
};

export const homeHeroTextLetterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", y: 18 },
  visible: (delay: number = 0) => ({
    opacity: [0, 0.7, 1],
    filter: ["blur(10px)", "blur(6px)", "blur(0px)"],
    y: [18, 8, 0],
    transition: { duration: 0.9, ease: "easeOut", delay },
  }),
};
