"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";

export default function CanDesign() {
  return (
    <div className="max-w-full py-36">
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <ProjectTitle
          title="Orchard Brew Can Design"
          year={2025}
          description="A refreshing visual identity for a contemporary fruit tea collection."
        />
      </div>
      <ParallaxImage
        src="/images/design/can-design/can-hero.webp"
        alt="Orchard Brew Can Design hero"
        className="mt-6 h-160"
      />
    </div>
  );
}
