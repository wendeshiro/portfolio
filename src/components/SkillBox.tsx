"use client";

import { useMemo, useState } from "react";

type SkillBoxProps = {
  devSkill?: string[];
  designSkill?: string[];
  marketingSkill?: string[];
  softSkill?: string[];
  languageSkill?: string[];
  className?: string;
};

type CategoryKey =
  | "development"
  | "design"
  | "marketing"
  | "soft-skills"
  | "languages";

type SkillCategory = {
  key: CategoryKey;
  label: string;
  skills: string[];
};

export default function SkillBox({
  devSkill = [],
  designSkill = [],
  marketingSkill = [],
  softSkill = [],
  languageSkill = [],
  className,
}: SkillBoxProps) {
  const categories = useMemo<SkillCategory[]>(
    () => [
      { key: "development", label: "Development", skills: devSkill },
      { key: "design", label: "Design", skills: designSkill },
      { key: "marketing", label: "Marketing", skills: marketingSkill },
      { key: "soft-skills", label: "Soft Skills", skills: softSkill },
      { key: "languages", label: "Languages", skills: languageSkill },
    ],
    [designSkill, devSkill, languageSkill, marketingSkill, softSkill],
  );

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(() => {
    const firstWithSkills = categories.find(
      (category) => category.skills.length > 0,
    );
    return firstWithSkills?.key ?? "development";
  });

  const activeSkills =
    categories.find((category) => category.key === activeCategory)?.skills ??
    [];

  return (
    <div className={`w-full ${className ?? ""}`}>
      <h2 className="text-center text-xl font-medium tracking-wide md:text-2xl">
        Skills & Tools
      </h2>
      <div className="mt-5 flex flex-col gap-5 md:mt-7 md:grid md:grid-cols-[100px_10px_1000px] md:gap-x-6">
        <div className="flex flex-wrap gap-2 md:flex-col md:gap-2">
          {categories.map((category) => {
            const isActive = category.key === activeCategory;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`cursor-pointer rounded-full px-3 py-2 text-left text-lg transition-colors md:h-12 md:rounded-none md:px-0 md:py-0 ${
                  isActive
                    ? "text-primary bg-primary/10 md:bg-transparent"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="relative hidden md:block">
          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/45" />
          <div className="relative flex flex-col gap-3.5">
            {categories.map((category) => (
              <div
                key={category.key}
                className="flex h-11 items-center justify-center"
              >
                <span
                  className={`w-1 rounded-full transition-colors ${
                    category.key === activeCategory ? "bg-primary h-10" : "h-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          {activeSkills.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-4 md:gap-4">
              {activeSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-black/35 bg-white/70 px-4 py-2 text-base leading-none md:py-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xl text-black/60">
              No skills added in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
