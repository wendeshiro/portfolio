import ProjectCard from "@/components/ProjectCard";
import Can from "@/images/home/can.webp";
import PowerBank from "@/images/home/power-bank.webp";

export default function Design() {
  return (
    <main className="relative flex flex-col items-center pt-8 pb-16 md:pt-10 md:pb-30">
      <section className="mb-10 md:mb-18">
        <p className="text-secondary/20 text-6xl tracking-[-0.18em] uppercase select-none md:text-9xl">
          Craft<span className="mr-[0.2em] ml-[0.2em]">&</span>Ref
          <span className="mr-[0.13em] ml-[0.13em]">i</span>ne
        </p>
      </section>
      <section className="grid gap-8 px-5 md:max-w-screen-2xl md:grid-cols-3 md:gap-10 md:px-20">
        <ProjectCard
          title="Orchard Brew Can Design"
          subtitle="Illustrator / Photoshop / Blender / React Three Fiber (Three.js)"
          description="A refreshing visual identity for a contemporary fruit tea collection with interactive 3D product displays."
          imageSrc={Can}
          href="/design/can-design"
        />
        <ProjectCard
          title="Power Bank Commercial"
          subtitle="After Effects / Video Editing / Motion Graphics / Filming / Storyboarding"
          description="A fast-paced promotional video for a multifunctional power bank."
          imageSrc={PowerBank}
          href="/design/power-bank"
        />
      </section>
    </main>
  );
}
