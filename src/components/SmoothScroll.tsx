"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
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
