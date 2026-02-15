import ProjectCard from "@/components/ProjectCard";
import SafeSpace from "@/images/home/safespace.webp";
import Planit from "@/images/home/planit.webp";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl">
      <section className="flex-row items-center justify-center">
        <div className="text-[81px] leading-[1.2] tracking-wide">
          <p>Hi, I&apos;m Wende, </p>
          <p>A full-stack</p>
          <p>
            <span className="text-primary">Developer</span> with a
          </p>
          <p>
            <span className="text-secondary">Design</span> background and
          </p>
          <p>
            <span className="text-tertiary">Marketing</span> experience of 5+
            years.
          </p>
        </div>
        <p className="mt-5 text-2xl">
          I build products with{" "}
          <span className="text-primary">design thinking</span> and a{" "}
          <span className="text-primary">marketing-driven mindset</span>,
          bridging the gap between{" "}
          <span className="text-primary">code and commerce</span>.
        </p>
      </section>
      <section className="bg-primary/10 relative right-1/2 left-1/2 -mx-[50vw] mt-16 h-screen w-screen">
        <div className="mx-auto flex h-full max-w-7xl flex-col px-6 pt-12 pb-8 md:px-8 md:pt-16">
          <div className="grid gap-13 md:grid-cols-2">
            <ProjectCard
              title="SafeSpace"
              subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
              description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
              imageSrc={SafeSpace}
              href="/development/safespace"
            />
            <ProjectCard
              title="Plan-it"
              subtitle="React Native / LLM / Expo / AWS Lambda / React / Next.js"
              description="SafeSpace is an AI-powered safety platform for gender-diverse tradespeople, transforming voice recordings and guided chats into actionable site reports and community insights."
              imageSrc={Planit}
              href="/development/plan-it"
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-primary/40 text-2xl font-semibold md:text-3xl">
              Web • Mobile • LLM • API
            </p>
            <a
              href="/development"
              className="border-primary text-primary hover:bg-primary rounded-2xl border px-7 py-2.5 text-base transition-colors hover:text-white"
            >
              All Development Projects →
            </a>
          </div>

          <div className="mt-auto h-35">
            <div className="flex w-max animate-[marquee_100s_linear_infinite] whitespace-nowrap">
              <p className="text-primary/35 mr-10 shrink-0 text-[clamp(64px,10vw,140px)] leading-none font-bold tracking-[0.12em] uppercase">
                DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT
              </p>
              <p className="text-primary/35 shrink-0 text-[clamp(64px,10vw,140px)] leading-none font-bold tracking-[0.12em] uppercase">
                DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT DEVELOPMENT
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
