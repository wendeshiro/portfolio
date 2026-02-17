"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import {
  incrementInternalHistory,
  decrementInternalHistory,
} from "@/lib/navigationHistory";

// Persist scroll positions across navigations so back/forward restores them.
const scrollPositions = new Map<string, number>();

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const isPopstateRef = useRef(false);

  useEffect(() => {
    // Track back/forward navigation via popstate so we can skip scroll-to-top.
    function handlePopstate() {
      isPopstateRef.current = true;
    }

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  useEffect(() => {
    /*
      Synchronize Lenis scrolling with GSAP's ticker.
      This ensures that scroll-based animations are synced with the smooth scroll position,
      preventing any jitter or lag.
     */
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLayoutEffect(() => {
    const previousPathname = previousPathnameRef.current;
    const isInitialRender = previousPathname === null;
    const hasPathChanged = previousPathname !== pathname;

    // Save scroll position of the page we're leaving.
    if (!isInitialRender && hasPathChanged && previousPathname) {
      scrollPositions.set(
        previousPathname,
        lenisRef.current?.lenis?.scroll ?? window.scrollY,
      );
    }

    previousPathnameRef.current = pathname;

    if (isInitialRender || !hasPathChanged) return;
    if (window.location.hash) return;

    // On back/forward navigation, restore saved scroll position.
    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      decrementInternalHistory();
      const savedPosition = scrollPositions.get(pathname) ?? 0;

      // Use requestAnimationFrame to ensure the DOM has rendered before restoring.
      requestAnimationFrame(() => {
        lenisRef.current?.lenis?.scrollTo(savedPosition, { immediate: true });
      });
      return;
    }

    // Forward (push) navigation – track depth for BackButton.
    incrementInternalHistory();

    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.1, // Higher values respond faster with less perceived scroll effort.
        duration: 1, // The time taken to reach the scroll target. Higher values (1.0 - 2.0) create a more pronounced easing effect.
        smoothWheel: true, // Enable smooth scrolling with the mouse wheel.
        anchors: { offset: -60 }, // Offset anchor jumps so section titles sit below the navbar.
      }}
    >
      {children}
    </ReactLenis>
  );
}
