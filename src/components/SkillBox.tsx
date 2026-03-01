"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SkillBoxProps = {
  devSkill?: string[];
  devSkillGroups?: SkillGroup[];
  designSkill?: string[];
  marketingSkill?: string[];
  languageSkill?: string[];
  className?: string;
};

type SkillGroup = {
  title: string;
  skills: string[];
};

type CategoryKey = "development" | "design-marketing" | "languages";

type SkillCategory = {
  key: CategoryKey;
  label: string;
  skills: string[];
  groups?: SkillGroup[];
};

export default function SkillBox({
  devSkill = [],
  devSkillGroups = [],
  designSkill = [],
  marketingSkill = [],
  languageSkill = [],
  className,
}: SkillBoxProps) {
  const developmentSkills = useMemo(
    () =>
      devSkillGroups.length > 0
        ? devSkillGroups.flatMap((group) => group.skills)
        : devSkill,
    [devSkill, devSkillGroups],
  );

  const designMarketingGroups = useMemo(
    () =>
      [
        { title: "Design", skills: designSkill },
        { title: "Marketing", skills: marketingSkill },
      ].filter((group) => group.skills.length > 0),
    [designSkill, marketingSkill],
  );

  const designMarketingSkills = useMemo(
    () => designMarketingGroups.flatMap((group) => group.skills),
    [designMarketingGroups],
  );

  const categories = useMemo<SkillCategory[]>(
    () => [
      {
        key: "development",
        label: "Development",
        skills: developmentSkills,
        groups: devSkillGroups,
      },
      {
        key: "design-marketing",
        label: "Design & Marketing",
        skills: designMarketingSkills,
        groups: designMarketingGroups,
      },
      { key: "languages", label: "Languages", skills: languageSkill },
    ],
    [
      devSkillGroups,
      developmentSkills,
      languageSkill,
      designMarketingGroups,
      designMarketingSkills,
    ],
  );

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(() => {
    const firstWithSkills = categories.find(
      (category) => category.skills.length > 0,
    );
    return firstWithSkills?.key ?? "development";
  });

  const activeCategoryData = categories.find(
    (category) => category.key === activeCategory,
  );
  const activeSkills = activeCategoryData?.skills ?? [];
  const activeGroups = (activeCategoryData?.groups ?? []).filter(
    (group) => group.skills.length > 0,
  );
  const hasGroupedSkills = activeGroups.length > 0;

  return (
    <div className={`w-full ${className ?? ""}`}>
      <h2 className="text-center text-xl font-medium tracking-wide md:text-2xl">
        Skills & Tools
      </h2>
      <div className="mt-5 flex flex-col gap-4 md:mt-7 md:gap-6">
        <div className="w-full self-center md:border-b md:border-black/30">
          <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-center md:gap-8">
            {categories.map((category) => {
              const isActive = category.key === activeCategory;

              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={`relative cursor-pointer rounded-full px-3 py-2 text-left text-lg transition-colors md:rounded-none md:px-0 md:pb-2.5 md:whitespace-nowrap ${
                    isActive
                      ? "text-primary bg-primary/10 md:bg-transparent"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {category.label}
                  {isActive && (
                    <motion.span
                      layoutId="skillbox-active-bar"
                      className="bg-primary absolute right-0 -bottom-px left-0 hidden h-0.5 rounded-full md:block"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 40,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <AnimatePresence mode="wait" initial={false}>
            {activeSkills.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={
                  hasGroupedSkills
                    ? "mt-1 space-y-5 md:space-y-6"
                    : "mt-1 flex flex-wrap gap-x-3 gap-y-4 md:gap-4"
                }
              >
                {hasGroupedSkills
                  ? activeGroups.map((group, groupIndex) => (
                      <section
                        key={`${group.title}-${groupIndex}`}
                        className="space-y-2.5"
                      >
                        <h3 className="text-lg font-medium tracking-wide">
                          {group.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-4">
                          {group.skills.map((skill, skillIndex) => (
                            <span
                              key={`${group.title}-${skill}-${skillIndex}`}
                              className="rounded-full border border-black/35 bg-white/70 px-4 py-2 text-base leading-none md:py-3"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    ))
                  : activeSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border border-black/35 bg-white/70 px-4 py-2 text-base leading-none md:py-3"
                      >
                        {skill}
                      </span>
                    ))}
              </motion.div>
            ) : (
              <motion.p
                key={`${activeCategory}-empty`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-xl text-black/60"
              >
                No skills added in this category yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
