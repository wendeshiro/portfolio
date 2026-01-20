"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";

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
        className="mt-6 mb-12 h-160"
      />
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <div className="mb-6 text-4xl">Overview</div>
        <ProjectOverview
          description={
            <>
              <p className="text-2xl">
                SafeSpace is an AI-powered safety platform for gender-diverse
                tradespeople, transforming voice recordings and guided chats
                into actionable site reports and community insights.
              </p>
              <p className="text-base text-gray-600">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical
              </p>
            </>
          }
          details={[
            {
              label: "Deliverables",
              content: "Static Mockup, Interactive 3D Mockup, Dieline, Proof",
            },
            {
              label: "Tools & Skills",
              content: "Illustrator / Photoshop / Blender / Three.js",
            },
            {
              label: "Tools & Skills",
              content: "Illustrator / Photoshop / Blender / Three.js",
            },
            {
              label: "Tools & Skills",
              content: "Illustrator / Photoshop / Blender / Three.js",
            },
          ]}
          links={[
            {
              label: "Github Repo",
              url: "https://github.com/wendeshiro/portfolio",
            },
            {
              label: "Project Website",
              url: "https://github.com/wendeshiro",
            },
          ]}
        />
      </div>
    </div>
  );
}
