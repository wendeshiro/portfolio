"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasInternalHistory } from "@/lib/navigationHistory";

type BackButtonProps = {
  className?: string;
};

const SHOW_AFTER_SCROLL_PERCENT = 0.01; // Show after scrolling 1% of the page

export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const progress = window.scrollY / scrollableHeight;
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

  function handleBack() {
    if (typeof window === "undefined") return;

    if (hasInternalHistory()) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back" // +10px to align with the right edge of the content
      className={`focus-visible:ring-primary/40 fixed top-20 left-[calc((100vw-min(100vw,80rem))/2+10px)] z-51 hidden -translate-x-full rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-sm font-medium tracking-[0.08em] text-black/80 shadow-[0_4px_14px_rgba(15,23,42,0.05)] backdrop-blur-lg transition-all select-none hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfdfd] focus-visible:outline-none xl:inline-flex xl:transition-opacity xl:duration-500 xl:ease-out ${isVisible ? "xl:pointer-events-auto xl:opacity-100" : "xl:pointer-events-none xl:opacity-0"} ${className}`}
    >
      ← BACK
    </button>
  );
}
