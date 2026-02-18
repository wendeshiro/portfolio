import type { Variants } from "framer-motion";

export const homeSecHeroTextMotionProps = {
  initial: "hidden",
  animate: "visible",
} as const;

export const HOME_SEC_HERO_LETTER_DURATION = 1;

export const homeSecHeroTextLetterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", y: 18 },
  visible: (delay: number = 0) => ({
    opacity: [0, 0.7, 1],
    filter: ["blur(10px)", "blur(6px)", "blur(0px)"],
    y: [18, 8, 0],
    transition: {
      duration: HOME_SEC_HERO_LETTER_DURATION,
      ease: "easeOut",
      delay,
    },
  }),
};

export const HOME_SEC_HERO_START_OFFSET = 0.2;
const HOME_SEC_HERO_BATCH_SIZE = 7; // Number of letters to animate together
const HOME_SEC_HERO_BATCH_GAP = 0.1; // Time gap between batches in seconds
const HOME_SEC_HERO_BATCH_JITTER = [0, 0.008, 0.016, 0.004]; // lower jitter values for a more cohesive animation

type HomeSecHeroDelayOptions = {
  startOffset?: number;
  priorityIndices?: number[];
};

function hashToUnit(index: number) {
  const value = Math.sin((index + 1) * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createScatteredOrder(letterIndices: number[]) {
  return [...letterIndices].sort((a, b) => hashToUnit(a) - hashToUnit(b));
}

function createRevealOrder(
  letterIndices: number[],
  priorityIndices: number[] = [],
) {
  const prioritySet = new Set(priorityIndices);
  const priorityLetters = letterIndices.filter((index) =>
    prioritySet.has(index),
  );
  const normalLetters = letterIndices.filter(
    (index) => !prioritySet.has(index),
  );
  return [
    ...createScatteredOrder(priorityLetters),
    ...createScatteredOrder(normalLetters),
  ];
}

export function createHomeSecHeroCharDelayMap(
  text: string,
  options: HomeSecHeroDelayOptions = {},
) {
  const { startOffset = HOME_SEC_HERO_START_OFFSET, priorityIndices = [] } =
    options;
  const chars = Array.from(text);
  const letterIndices = chars
    .map((char, index) => (char.trim().length > 0 ? index : -1))
    .filter((index) => index >= 0);

  const revealOrder = createRevealOrder(letterIndices, priorityIndices);

  const delays = new Array<number>(chars.length).fill(startOffset);

  revealOrder.forEach((charIndex, orderIndex) => {
    const batchIndex = Math.floor(orderIndex / HOME_SEC_HERO_BATCH_SIZE);
    const jitter =
      HOME_SEC_HERO_BATCH_JITTER[orderIndex % HOME_SEC_HERO_BATCH_SIZE] ?? 0;
    delays[charIndex] =
      startOffset + batchIndex * HOME_SEC_HERO_BATCH_GAP + jitter;
  });

  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i]?.trim().length) continue;

    let prevLetterIndex: number | undefined;
    for (let cursor = letterIndices.length - 1; cursor >= 0; cursor -= 1) {
      const index = letterIndices[cursor];
      if (index !== undefined && index < i) {
        prevLetterIndex = index;
        break;
      }
    }

    delays[i] =
      prevLetterIndex !== undefined
        ? (delays[prevLetterIndex] ?? startOffset)
        : startOffset;
  }

  return delays;
}
