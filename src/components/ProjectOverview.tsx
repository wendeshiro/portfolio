import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface ProjectDetail {
  label: ReactNode;
  content: ReactNode;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: "globe" | "github" | ReactNode;
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
      id="overview"
    >
      <h2 className="mb-6 font-serif text-2xl font-medium md:text-4xl md:font-normal">
        Overview
      </h2>
      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-20">
        <div className="flex flex-col gap-5 md:w-3/5">
          <div className="text-xl leading-relaxed md:text-2xl">
            {primaryText}
          </div>
          <div className="flex flex-col gap-3 text-base text-gray-700 md:text-lg">
            {secondaryText}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-2/5">
          {details.map((item, index) => (
            <div key={index} className="text-base md:text-lg">
              <div className="text-gray-600">{item.label}</div>
              <div>{item.content}</div>
            </div>
          ))}

          {links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-8 text-base md:text-lg">
              {links.map((link, index) => {
                const renderIcon = (icon?: "globe" | "github" | ReactNode) => {
                  if (!icon) return null;
                  if (icon === "globe") {
                    return (
                      <span
                        className="mr-1.5 inline-block align-middle"
                        aria-hidden
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          className="text-current"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          >
                            <circle cx={12} cy={12} r={10}></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20"></path>
                          </g>
                        </svg>
                      </span>
                    );
                  }

                  if (icon === "github") {
                    return (
                      <span
                        className="mr-1.5 inline-block align-middle"
                        aria-hidden
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          className="text-current"
                        >
                          <path
                            fill="currentColor"
                            d="M10.303 16.652c-2.837-.344-4.835-2.385-4.835-5.028c0-1.074.387-2.235 1.031-3.008c-.279-.709-.236-2.214.086-2.837c.86-.107 2.02.344 2.708.967c.816-.258 1.676-.386 2.728-.386s1.913.128 2.686.365c.666-.602 1.848-1.053 2.708-.946c.3.581.344 2.085.064 2.815c.688.817 1.053 1.913 1.053 3.03c0 2.643-1.998 4.641-4.877 5.006c.73.473 1.224 1.504 1.224 2.686v2.235c0 .644.537 1.01 1.182.752c3.889-1.483 6.94-5.372 6.94-10.185c0-6.081-4.942-11.044-11.022-11.044c-6.081 0-10.98 4.963-10.98 11.044a10.84 10.84 0 0 0 7.112 10.206c.58.215 1.139-.172 1.139-.752v-1.719a2.8 2.8 0 0 1-1.032.215c-1.418 0-2.256-.773-2.857-2.213c-.237-.58-.495-.924-.989-.988c-.258-.022-.344-.129-.344-.258c0-.258.43-.451.86-.451c.623 0 1.16.386 1.719 1.181c.43.623.881.903 1.418.903s.881-.194 1.375-.688c.365-.365.645-.687.903-.902"
                          ></path>
                        </svg>
                      </span>
                    );
                  }

                  return (
                    <span className="mr-1.5 inline-block align-middle">
                      {icon as ReactNode}
                    </span>
                  );
                };

                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-primary flex items-center duration-300"
                  >
                    {renderIcon(link.icon)}
                    <span className="align-middle underline decoration-dotted decoration-1 underline-offset-7 transition-colors">
                      {link.label}
                    </span>
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
