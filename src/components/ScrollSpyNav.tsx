"use client";

import { useEffect, useState } from "react";
// import { useLenis } from "lenis/react";

interface ScrollSpySection {
  id: string;
  label: string;
}

interface ScrollSpyNavProps {
  sections: ScrollSpySection[];
}

export default function ScrollSpyNav({ sections }: ScrollSpyNavProps) {
  // Track which section is active and whether the nav should be visible.
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);

  // const lenis = useLenis();

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    let rafId: number | null = null;

    // Update active section based on viewport midpoint and toggle visibility after Overview.
    const updateActive = () => {
      const midpoint = window.innerHeight / 2;
      let currentId = sections[0].id;
      const firstEl = document.getElementById(sections[0].id);

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= midpoint) {
          currentId = id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
      setIsVisible(
        firstEl ? firstEl.getBoundingClientRect().top <= midpoint : false,
      );
    };

    // Throttle scroll/resize work into a single animation frame.
    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Update URL without adding history
  const handleLinkClick = (
    // e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    // e.preventDefault();

    // lenis?.scrollTo(`#${id}`);

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Page sections"
      aria-hidden={!isVisible}
      // Fixed right-side nav with fade-in once Overview reaches mid-viewport.
      className={
        "group fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 duration-500 md:flex " +
        (isVisible ? "opacity-100" : "pointer-events-none opacity-0")
      }
    >
      {/* Single list: bars always visible, labels reveal with hover box. */}
      <div className="flex flex-col items-end gap-2 rounded-xl border border-transparent px-4 py-3 opacity-40 transition-all duration-500 group-hover:border-gray-200 group-hover:bg-white/80 group-hover:shadow-lg group-hover:backdrop-blur hover:opacity-100">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleLinkClick(section.id)}
              aria-current={isActive ? "location" : undefined}
              className="flex items-center gap-3"
            >
              <span
                className={
                  "max-w-0 translate-x-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap opacity-0 duration-400 group-hover:max-w-50 group-hover:translate-x-0 group-hover:opacity-100 " +
                  (isActive ? "font-bold" : "text-gray-700")
                }
              >
                {section.label}
              </span>
              <span
                className={
                  "h-1 w-3 rounded-full transition-all duration-500 " +
                  (isActive ? "bg-foreground/80 w-5" : "bg-gray-400/70")
                }
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
