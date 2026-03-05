"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { requestHomeSnapPause } from "@/lib/homeSnapControl";

type BackToTopProps = {
  className?: string;
};

const SHOW_AFTER_SCROLL_PERCENT = 0.9; // Show after scrolling 90% of the page.

export default function BackToTop({ className = "" }: BackToTopProps) {
  const lenis = useLenis();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (pageHeight <= 0) {
        setIsVisible(false);
        return;
      }

      // Progress over full page height, not only scrollable distance.
      const progress = (window.scrollY + viewportHeight) / pageHeight;
      setIsVisible(progress >= SHOW_AFTER_SCROLL_PERCENT);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function handleBackToTop() {
    if (pathname === "/") {
      requestHomeSnapPause();
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      aria-label="Back to top"
      className={`focus-visible:ring-primary/40 fixed right-6 bottom-17 z-51 inline-flex items-center justify-center rounded-full border border-black/10 bg-white/55 px-2 py-2 text-sm font-medium tracking-[0.08em] text-black/80 shadow-[0_4px_14px_rgba(15,23,42,0.05)] backdrop-blur-lg transition-all duration-500 ease-out select-none hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfdfd] focus-visible:outline-none sm:right-8 sm:bottom-20 ${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        className="rotate-90"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M11.354 6.646a.5.5 0 0 1 0 .708L7.207 11.5H18a.5.5 0 0 1 0 1H7.207l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0"
          strokeWidth={0.5}
          stroke="currentColor"
        />
      </svg>
    </button>
  );
}
