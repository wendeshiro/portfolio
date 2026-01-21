import React from "react";

export interface ProjectDetail {
  label: string;
  content: React.ReactNode;
}

export interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectOverviewProps {
  description?: React.ReactNode;
  details?: ProjectDetail[];
  links?: ProjectLink[];
}

export default function ProjectOverview({
  description,
  details = [],
  links = [],
}: ProjectOverviewProps) {
  // If no content is provided, render nothing
  if (!description && details.length === 0 && links.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between gap-20">
        <div className="flex w-3/5 flex-col gap-5">{description}</div>

        <div className="flex w-2/5 flex-col gap-4">
          {details.map((item, index) => (
            <div key={index} className="text-lg">
              <p className="text-gray-600">{item.label}</p>
              <div>{item.content}</div>
            </div>
          ))}

          {links.length > 0 && (
            <div className="text-primary mt-2 flex flex-wrap gap-8 text-lg">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
