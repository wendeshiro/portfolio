import ProjectCard from "@/components/ProjectCard";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";

export default function Development() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <p className="text-primary/20 text-6xl tracking-[-0.2em] uppercase select-none md:text-9xl">
          code <span className="mr-[0.2em] ml-[0.2em]">&</span> bu
          <span className="mr-[0.1em] ml-[0.1em]">i</span>ld
        </p>
      </section>
      <section className="grid gap-8 px-5 md:max-w-screen-2xl md:grid-cols-3 md:gap-10 md:px-20">
        <ProjectCard
          title="SafeSpace"
          subtitle="React Native / TypeScript / AWS Lambda / LLM"
          description="Enhancing workplace safety for women and gender-diverse tradespeople with AI-generated reports and actionable insights."
          imageSrc={SafeSpace}
          href="/development/safespace"
        />
        <ProjectCard
          title="Plan-it"
          subtitle="React / JavaScript / External APIs"
          description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
          imageSrc={Planit}
          href="/development/plan-it"
        />
        <ProjectCard
          title="Plan-it"
          subtitle="React / JavaScript / External APIs"
          description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
          imageSrc={Planit}
          href="/development/plan-it"
        />
      </section>
    </main>
  );
}
