"use client";

import ExternalLink from "@/components/ExternalLink";
import SkillBox from "@/components/SkillBox";
import {
  categoryCardSectionMotionProps,
  categoryCardVariants,
  categoryTitleMotionProps,
} from "@/lib/categoryPageAnimations";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-20 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <motion.p
          {...categoryTitleMotionProps}
          className="text-primary/20 inline-flex gap-x-4 text-6xl tracking-[-0.18em] uppercase select-none md:gap-x-8 md:text-9xl"
        >
          <span>About</span>
          <span>Me</span>
        </motion.p>
      </section>

      <div className="flex flex-col items-center px-5 md:max-w-7xl">
        <motion.section
          {...categoryCardSectionMotionProps}
          className="space-y-3 text-center font-serif text-lg leading-relaxed text-gray-800 md:space-y-3 md:text-xl"
        >
          <motion.p variants={categoryCardVariants}>
            My name is Wende, and I also go by Wendell.
          </motion.p>
          <motion.p variants={categoryCardVariants}>
            This name reflects both the sound of my Chinese name and a meaning I
            resonate with—a wanderer driven by exploration.
          </motion.p>
          <motion.p variants={categoryCardVariants}>
            I see myself the same way—curious, independent, and constantly
            exploring new ideas, technologies, and creative possibilities.
          </motion.p>
        </motion.section>

        <motion.section
          {...categoryCardSectionMotionProps}
          className="mt-10 text-lg md:mt-18 md:text-xl"
        >
          <motion.div
            className="flex items-center justify-center space-x-8 md:space-x-15"
            variants={categoryCardVariants}
          >
            <div className="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                />
              </svg>
              <ExternalLink
                href="https://www.linkedin.com/in/wende05"
                fontWeight="medium"
              >
                LinkedIn{" "}
              </ExternalLink>
            </div>
            <div className="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={23}
                height={23}
                viewBox="0 0 24 24"
                className="text-current"
              >
                <path
                  fill="currentColor"
                  d="M10.303 16.652c-2.837-.344-4.835-2.385-4.835-5.028c0-1.074.387-2.235 1.031-3.008c-.279-.709-.236-2.214.086-2.837c.86-.107 2.02.344 2.708.967c.816-.258 1.676-.386 2.728-.386s1.913.128 2.686.365c.666-.602 1.848-1.053 2.708-.946c.3.581.344 2.085.064 2.815c.688.817 1.053 1.913 1.053 3.03c0 2.643-1.998 4.641-4.877 5.006c.73.473 1.224 1.504 1.224 2.686v2.235c0 .644.537 1.01 1.182.752c3.889-1.483 6.94-5.372 6.94-10.185c0-6.081-4.942-11.044-11.022-11.044c-6.081 0-10.98 4.963-10.98 11.044a10.84 10.84 0 0 0 7.112 10.206c.58.215 1.139-.172 1.139-.752v-1.719a2.8 2.8 0 0 1-1.032.215c-1.418 0-2.256-.773-2.857-2.213c-.237-.58-.495-.924-.989-.988c-.258-.022-.344-.129-.344-.258c0-.258.43-.451.86-.451c.623 0 1.16.386 1.719 1.181c.43.623.881.903 1.418.903s.881-.194 1.375-.688c.365-.365.645-.687.903-.902"
                ></path>
              </svg>
              <ExternalLink
                href="https://github.com/wendeshiro"
                fontWeight="medium"
              >
                GitHub{" "}
              </ExternalLink>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          {...categoryCardSectionMotionProps}
          className="mt-14 w-full md:mt-20"
        >
          <motion.div variants={categoryCardVariants}>
            <SkillBox
              devSkill={[
                "TypeScript",
                "JavaScript",
                "React",
                "Next.js",
                "React Native",
                "Expo",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Framer Motion",
                "React Three Fiber (R3F)",
                "Node.js",
                "Express.js",
                "LLM API Integration",
                "AWS Lambda",
                "SQL",
                "PostgreSQL",
                "MySQL",
                "Git / GitHub",
                "WordPress",
              ]}
              designSkill={[
                "Figma",
                "Adobe Illustrator",
                "Adobe Photoshop",
                "Adobe InDesign",
                "Adobe After Effects",
                "Adobe Premiere Pro",
                "UI/UX Design",
                "Wireframing",
                "Prototyping",
                "User Research",
                "Blender",
              ]}
              marketingSkill={[
                "Data & Financial Analysis",
                "Market Research",
                "SEO",
                "Amazon PPC (Paid Media)",
                "Google Analytics 4",
              ]}
              softSkill={[
                "Agile Methodology",
                "Microsoft Excel (Advanced Functions, Pivot Tables, Statistical Analysis)",
                "PowerPoint",
                "Team Management",
                "Mentoring",
              ]}
              languageSkill={[
                "English (Working Proficiency)",
                "Japanese (Working Proficiency, JLPT-N1 Certification)",
                "Mandarin (Native)",
                "French (Beginner)",
              ]}
              className="mx-auto"
            />
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
