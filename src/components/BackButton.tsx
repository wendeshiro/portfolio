"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
};

export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back" // +10px to align with the right edge of the content
      className={`focus-visible:ring-primary/40 fixed top-20 left-[calc((100vw-min(100vw,80rem))/2+10px)] z-51 hidden -translate-x-full rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-sm font-medium tracking-[0.08em] text-black/80 shadow-[0_4px_14px_rgba(15,23,42,0.05)] backdrop-blur-lg transition-all duration-300 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfdfd] focus-visible:outline-none sm:inline-flex ${className}`}
    >
      ← BACK
    </button>
  );
}
