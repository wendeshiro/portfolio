import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface ProjectDetail {
  label: string;
  content: ReactNode;
}

export interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectOverviewProps {
  primaryText?: ReactNode;
  secondaryText?: ReactNode;
  details?: ProjectDetail[];
  links?: ProjectLink[];
}

export default function ProjectOverview({
  primaryText,
  secondaryText,
  details = [],
  links = [],
}: ProjectOverviewProps) {
  // If no content is provided, render nothing
  if (
    !primaryText &&
    !secondaryText &&
    details.length === 0 &&
    links.length === 0
  ) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
      whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
      transition={{ duration: 1, ease: "easeOut" }} // Animation settings
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% in view, only once
    >
      <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
        Overview
      </h2>
      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-20">
        <div className="flex flex-col gap-5 md:w-3/5">
          <div className="text-xl leading-relaxed md:text-2xl">
            {primaryText}
          </div>
          <div className="flex flex-col gap-3 text-base text-gray-600 md:text-lg">
            {secondaryText}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-2/5">
          {details.map((item, index) => (
            <div key={index} className="text-base md:text-lg">
              <p className="text-gray-600">{item.label}</p>
              <div>{item.content}</div>
            </div>
          ))}

          {links.length > 0 && (
            <div className="text-primary mt-2 flex flex-wrap gap-8 text-base md:text-lg">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {link.label}{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
