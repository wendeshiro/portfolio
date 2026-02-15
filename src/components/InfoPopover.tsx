"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type InfoPopoverProps = {
  children: ReactNode;
  content: ReactNode;
  popoverWidthClass: string;
  popoverPositionClassName?: string;
  ariaLabel: string;
  id?: string;
  triggerClassName?: string;
  popoverClassName?: string;
  wrapperClassName?: string;
};

export default function InfoPopover({
  children,
  content,
  popoverWidthClass,
  popoverPositionClassName,
  ariaLabel,
  id,
  triggerClassName,
  popoverClassName,
  wrapperClassName,
}: InfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const reactId = useId();
  const popoverId = id ?? reactId;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (wrapperRef.current && target) {
        if (!wrapperRef.current.contains(target)) {
          setIsOpen(false);
        }
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resolvedTriggerClassName = twMerge(
    "hover:text-primary underline decoration-dotted decoration-1 underline-offset-6 transition-colors hover:cursor-pointer",
    triggerClassName,
  );

  const resolvedPopoverClassName = twMerge(
    "absolute top-full z-11 mt-2 rounded-lg border border-black/10 bg-white px-7.5 py-4 text-base text-gray-900 shadow-xl md:px-6",
    popoverPositionClassName ?? "left-0",
    popoverWidthClass,
    popoverClassName,
  );

  const resolvedWrapperClassName = twMerge(
    "relative inline-flex items-center",
    wrapperClassName,
  );

  return (
    <span ref={wrapperRef} className={resolvedWrapperClassName}>
      <button
        type="button"
        className={resolvedTriggerClassName}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {children}
      </button>
      {isOpen && (
        <span
          id={popoverId}
          role="dialog"
          aria-label={ariaLabel}
          className={resolvedPopoverClassName}
        >
          <button
            type="button"
            className="absolute top-2 right-3 text-3xl text-gray-500 transition-colors hover:cursor-pointer hover:text-gray-700 md:text-2xl"
            aria-label="Close details"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          {content}
        </span>
      )}
    </span>
  );
}
